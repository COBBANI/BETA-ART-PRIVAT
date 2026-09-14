-- Beta Art MVP data model v2 (PostgreSQL 15+)
-- Scope: verified documentation photography for construction projects.
-- This is an implementation draft, not a deployment-ready security policy.
-- Map current_setting('app.user_id', true) to the authenticated user in the API layer.

create extension if not exists pgcrypto;

create table organizations (
  id uuid primary key default gen_random_uuid(),
  legal_name text not null,
  organization_number text,
  country_code text not null default 'NO' check (country_code ~ '^[A-Z]{2}$'),
  billing_email text,
  created_at timestamptz not null default now(),
  archived_at timestamptz
);

create table users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text,
  platform_role text not null default 'user' check (platform_role in ('user', 'reviewer', 'admin')),
  email_verified_at timestamptz,
  created_at timestamptz not null default now(),
  disabled_at timestamptz
);

create table organization_members (
  organization_id uuid not null references organizations(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role text not null check (role in ('owner', 'project_manager', 'buyer', 'viewer')),
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table contributor_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id),
  status text not null default 'submitted' check (status in ('submitted', 'reviewing', 'approved', 'rejected', 'withdrawn')),
  experience_summary text,
  safety_training_summary text,
  reviewed_by uuid references users(id),
  reviewed_at timestamptz,
  decision_reason text,
  created_at timestamptz not null default now(),
  check (reviewed_by is null or reviewed_by <> user_id)
);

create unique index contributor_one_open_application
  on contributor_applications(user_id)
  where status in ('submitted', 'reviewing', 'approved');

create table photographer_profiles (
  user_id uuid primary key references users(id) on delete cascade,
  application_id uuid not null unique references contributor_applications(id),
  public_name text not null,
  home_country_code text not null default 'NO' check (home_country_code ~ '^[A-Z]{2}$'),
  service_regions text[] not null default '{}',
  insurance_status text not null default 'unverified' check (insurance_status in ('unverified', 'verified', 'expired')),
  contributor_status text not null default 'pending' check (contributor_status in ('pending', 'active', 'suspended', 'closed')),
  created_at timestamptz not null default now()
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id),
  project_code text not null,
  name text not null,
  purpose text not null,
  sensitivity text not null default 'internal' check (sensitivity in ('public', 'internal', 'restricted')),
  retention_until date,
  created_at timestamptz not null default now(),
  archived_at timestamptz,
  unique (organization_id, project_code)
);

create table project_members (
  project_id uuid not null references projects(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role text not null check (role in ('manager', 'photographer', 'reviewer', 'viewer')),
  created_at timestamptz not null default now(),
  primary key (project_id, user_id)
);

create table assignments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id),
  requested_by uuid not null references users(id),
  assigned_photographer_id uuid references photographer_profiles(user_id),
  documentation_type text not null check (documentation_type in ('progress', 'hse', 'quality', 'damage', 'other')),
  brief text not null,
  scheduled_from timestamptz,
  scheduled_to timestamptz,
  status text not null default 'draft' check (status in ('draft', 'quoted', 'accepted', 'in_progress', 'delivered', 'cancelled')),
  agreed_price_nok numeric(12,2) check (agreed_price_nok is null or agreed_price_nok >= 0),
  created_at timestamptz not null default now(),
  check (scheduled_to is null or scheduled_from is null or scheduled_to >= scheduled_from)
);

create table assets (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id),
  assignment_id uuid references assignments(id),
  photographer_id uuid not null references photographer_profiles(user_id),
  archive_id text not null unique,
  title text not null,
  description text,
  captured_at timestamptz not null,
  location_label text,
  precise_location jsonb,
  camera_metadata jsonb not null default '{}',
  original_object_key text not null unique,
  original_sha256 text not null unique check (original_sha256 ~ '^[0-9a-f]{64}$'),
  original_bytes bigint not null check (original_bytes > 0),
  mime_type text not null check (mime_type in ('image/jpeg', 'image/tiff', 'image/png', 'image/heic')),
  public_preview_object_key text,
  lifecycle_status text not null default 'submitted' check (lifecycle_status in ('submitted', 'under_review', 'verified', 'blocked', 'archived')),
  public_status text not null default 'private' check (public_status in ('private', 'licensed_only', 'public')),
  created_at timestamptz not null default now(),
  check (public_status = 'private' or lifecycle_status = 'verified')
);

create index assets_project_captured_idx on assets(project_id, captured_at desc);
create index assets_photographer_idx on assets(photographer_id, created_at desc);

create table asset_derivatives (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid not null references assets(id) on delete cascade,
  derivative_type text not null check (derivative_type in ('preview', 'licensed_delivery', 'thumbnail', 'redacted_copy')),
  object_key text not null unique,
  sha256 text not null check (sha256 ~ '^[0-9a-f]{64}$'),
  transformation jsonb not null default '{}',
  created_by uuid not null references users(id),
  created_at timestamptz not null default now()
);

create table verification_reviews (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid not null references assets(id) on delete cascade,
  reviewer_id uuid not null references users(id),
  decision text not null check (decision in ('pending', 'verified', 'blocked', 'changes_required', 'revoked')),
  original_file_confirmed boolean not null default false,
  photographer_identity_confirmed boolean not null default false,
  capture_metadata_reviewed boolean not null default false,
  project_link_confirmed boolean not null default false,
  rights_reviewed boolean not null default false,
  ai_origin text not null default 'unknown' check (ai_origin in ('unknown', 'camera_capture', 'generative_edit_disclosed', 'fully_synthetic')),
  c2pa_manifest jsonb,
  notes text,
  created_at timestamptz not null default now(),
  check (ai_origin <> 'fully_synthetic' or decision <> 'verified')
);

create index verification_asset_time_idx on verification_reviews(asset_id, created_at desc);

create or replace function prevent_self_verification()
returns trigger language plpgsql as $$
begin
  if exists (
    select 1 from assets a
    where a.id = new.asset_id and a.photographer_id = new.reviewer_id
  ) then
    raise exception 'A photographer cannot verify their own asset';
  end if;
  return new;
end;
$$;

create trigger verification_no_self_review
before insert or update on verification_reviews
for each row execute function prevent_self_verification();

create or replace function apply_verification_decision()
returns trigger language plpgsql as $$
begin
  if new.decision = 'verified' then
    update assets
    set lifecycle_status = 'verified'
    where id = new.asset_id;
  elsif new.decision in ('blocked', 'revoked') then
    update assets
    set lifecycle_status = 'blocked', public_status = 'private'
    where id = new.asset_id;
  elsif new.decision in ('pending', 'changes_required') then
    update assets
    set lifecycle_status = 'under_review', public_status = 'private'
    where id = new.asset_id;
  end if;
  return new;
end;
$$;

create trigger verification_updates_asset_state
after insert on verification_reviews
for each row execute function apply_verification_decision();

create table releases (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid not null references assets(id) on delete cascade,
  release_type text not null check (release_type in ('model', 'property', 'location_access', 'other')),
  status text not null default 'pending' check (status in ('pending', 'valid', 'expired', 'withdrawn', 'rejected')),
  encrypted_object_key text,
  valid_from date,
  valid_until date,
  reviewed_by uuid references users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  check (valid_until is null or valid_from is null or valid_until >= valid_from)
);

create table rights_holds (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid not null references assets(id) on delete cascade,
  reason text not null,
  status text not null default 'open' check (status in ('open', 'resolved', 'dismissed')),
  reported_by_email_hash text,
  assigned_to uuid references users(id),
  resolution text,
  created_at timestamptz not null default now(),
  closed_at timestamptz
);

create unique index asset_one_open_rights_hold on rights_holds(asset_id) where status = 'open';

create table license_terms_versions (
  id uuid primary key default gen_random_uuid(),
  version text not null unique,
  document_sha256 text not null check (document_sha256 ~ '^[0-9a-f]{64}$'),
  effective_at timestamptz not null,
  retired_at timestamptz,
  created_at timestamptz not null default now()
);

create table licenses (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id),
  buyer_id uuid not null references users(id),
  asset_id uuid not null references assets(id),
  terms_version_id uuid not null references license_terms_versions(id),
  usage text not null,
  territory text not null,
  starts_at timestamptz not null,
  expires_at timestamptz,
  exclusivity text not null default 'non_exclusive' check (exclusivity in ('non_exclusive', 'industry', 'territory', 'full')),
  price_nok numeric(12,2) not null check (price_nok >= 0),
  status text not null default 'draft' check (status in ('draft', 'awaiting_payment', 'active', 'expired', 'cancelled', 'refunded')),
  issued_at timestamptz,
  created_at timestamptz not null default now(),
  check (expires_at is null or expires_at > starts_at)
);

create index licenses_asset_active_idx on licenses(asset_id, starts_at, expires_at) where status = 'active';

create table payments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id),
  license_id uuid references licenses(id),
  assignment_id uuid references assignments(id),
  amount_nok numeric(12,2) not null check (amount_nok >= 0),
  provider text not null,
  provider_reference text not null unique,
  status text not null default 'pending' check (status in ('pending', 'authorized', 'paid', 'failed', 'refunded', 'cancelled')),
  created_at timestamptz not null default now(),
  check ((license_id is not null)::int + (assignment_id is not null)::int = 1)
);

create table consent_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  organization_id uuid references organizations(id),
  event_type text not null check (event_type in ('privacy_notice', 'license_terms', 'assignment_terms', 'marketing_opt_in', 'marketing_opt_out')),
  document_version text not null,
  occurred_at timestamptz not null default now(),
  source text not null,
  metadata jsonb not null default '{}'
);

create table audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references users(id),
  organization_id uuid references organizations(id),
  entity_type text not null,
  entity_id text not null,
  action text not null,
  metadata jsonb not null default '{}',
  previous_event_hash text,
  event_hash text not null unique check (event_hash ~ '^[0-9a-f]{64}$'),
  created_at timestamptz not null default now()
);

create index audit_entity_time_idx on audit_log(entity_type, entity_id, created_at);

create or replace function audit_log_build_hash_chain()
returns trigger language plpgsql as $$
declare
  prior_hash text;
begin
  perform pg_advisory_xact_lock(hashtextextended(new.entity_type || ':' || new.entity_id, 0));
  select a.event_hash into prior_hash
  from audit_log a
  where a.entity_type = new.entity_type and a.entity_id = new.entity_id
  order by a.id desc
  limit 1;

  new.previous_event_hash := prior_hash;
  new.event_hash := encode(
    digest(
      coalesce(prior_hash, '') || '|' ||
      new.entity_type || '|' || new.entity_id || '|' || new.action || '|' ||
      new.metadata::text || '|' || new.created_at::text,
      'sha256'
    ),
    'hex'
  );
  return new;
end;
$$;

create trigger audit_log_hash_chain
before insert on audit_log
for each row execute function audit_log_build_hash_chain();

create or replace function audit_log_append_only()
returns trigger language plpgsql as $$
begin
  raise exception 'audit_log is append-only';
end;
$$;

create trigger audit_log_no_update
before update or delete on audit_log
for each row execute function audit_log_append_only();

create or replace function enforce_verified_publication()
returns trigger language plpgsql as $$
begin
  if new.public_status <> 'private' then
    if new.lifecycle_status <> 'verified' then
      raise exception 'Only verified assets can be exposed';
    end if;
    if exists (select 1 from rights_holds h where h.asset_id = new.id and h.status = 'open') then
      raise exception 'Asset has an open rights hold';
    end if;
    if not coalesce((
      select
        v.decision = 'verified'
        and v.original_file_confirmed
        and v.photographer_identity_confirmed
        and v.capture_metadata_reviewed
        and v.project_link_confirmed
        and v.rights_reviewed
        and v.ai_origin <> 'fully_synthetic'
      from verification_reviews v
      where v.asset_id = new.id
      order by v.created_at desc, v.id desc
      limit 1
    ), false) then
      raise exception 'Required verification evidence is incomplete';
    end if;
  end if;
  return new;
end;
$$;

create trigger asset_publication_gate
before insert or update of public_status, lifecycle_status on assets
for each row execute function enforce_verified_publication();

-- Public API should query this view, never the assets table directly.
-- Precise location, private metadata, original object keys and release records are intentionally excluded.
create view public_verified_assets as
select
  a.id,
  a.archive_id,
  a.title,
  a.description,
  a.captured_at,
  a.location_label,
  a.public_preview_object_key,
  p.public_name as photographer_name
from assets a
join photographer_profiles p on p.user_id = a.photographer_id
where a.lifecycle_status = 'verified'
  and a.public_status = 'public'
  and not exists (select 1 from rights_holds h where h.asset_id = a.id and h.status = 'open');

-- Defense-in-depth baseline. Add provider-specific policies before deployment.
alter table organizations enable row level security;
alter table users enable row level security;
alter table organization_members enable row level security;
alter table projects enable row level security;
alter table project_members enable row level security;
alter table assignments enable row level security;
alter table assets enable row level security;
alter table asset_derivatives enable row level security;
alter table verification_reviews enable row level security;
alter table releases enable row level security;
alter table rights_holds enable row level security;
alter table licenses enable row level security;
alter table payments enable row level security;
alter table consent_events enable row level security;
alter table audit_log enable row level security;

revoke all on all tables in schema public from public;
revoke all on all sequences in schema public from public;
grant select on public_verified_assets to public;

comment on view public_verified_assets is
  'Minimal public projection. Production API must also enforce rate limits, caching, takedown and authorization rules.';
