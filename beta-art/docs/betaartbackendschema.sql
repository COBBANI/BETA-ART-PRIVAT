-- Beta Art production data model (PostgreSQL)
-- Draft schema for implementation; review security/RLS before deployment.

create extension if not exists pgcrypto;

create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country text,
  billing_email text,
  created_at timestamptz not null default now()
);

create table users (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete set null,
  role text not null check (role in ('buyer','photographer','admin')),
  email text unique not null,
  full_name text,
  created_at timestamptz not null default now()
);

create table photographer_profiles (
  user_id uuid primary key references users(id) on delete cascade,
  country text,
  city text,
  specialties text[] default '{}',
  identity_status text not null default 'pending',
  payout_status text not null default 'pending'
);

create table assets (
  id uuid primary key default gen_random_uuid(),
  photographer_id uuid not null references users(id),
  archive_id text unique not null,
  title text not null,
  description text,
  country text,
  location text,
  captured_at timestamptz,
  industry text,
  original_object_key text not null,
  preview_object_key text not null,
  status text not null default 'review',
  created_at timestamptz not null default now()
);

create table asset_verification (
  asset_id uuid primary key references assets(id) on delete cascade,
  original_capture boolean not null default false,
  photographer_verified boolean not null default false,
  metadata_reviewed boolean not null default false,
  location_documented boolean not null default false,
  rights_reviewed boolean not null default false,
  ai_disclosure text not null default 'not_supplied',
  c2pa_status text not null default 'not_supplied',
  verified_at timestamptz,
  verified_by uuid references users(id)
);

create table releases (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid not null references assets(id) on delete cascade,
  release_type text not null check (release_type in ('model','property')),
  status text not null default 'pending',
  private_object_key text,
  notes text,
  created_at timestamptz not null default now()
);

create table lightboxes (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete cascade,
  owner_id uuid not null references users(id),
  name text not null,
  created_at timestamptz not null default now()
);

create table lightbox_assets (
  lightbox_id uuid references lightboxes(id) on delete cascade,
  asset_id uuid references assets(id) on delete cascade,
  primary key (lightbox_id, asset_id)
);

create table assignments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  buyer_id uuid not null references users(id),
  subject text not null,
  country text not null,
  location text,
  deadline date,
  budget_nok numeric(12,2),
  usage text,
  brief text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table assignment_matches (
  assignment_id uuid references assignments(id) on delete cascade,
  photographer_id uuid references users(id) on delete cascade,
  status text not null default 'invited',
  quote_nok numeric(12,2),
  primary key (assignment_id, photographer_id)
);

create table licenses (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  buyer_id uuid not null references users(id),
  asset_id uuid not null references assets(id),
  usage text not null,
  territory text not null,
  duration text not null,
  exclusivity text not null,
  price_nok numeric(12,2) not null,
  status text not null default 'draft',
  issued_at timestamptz,
  expires_at timestamptz
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  license_id uuid references licenses(id),
  assignment_id uuid references assignments(id),
  amount_nok numeric(12,2) not null,
  provider text,
  provider_reference text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references users(id),
  entity_type text not null,
  entity_id text not null,
  action text not null,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

-- Production rule:
-- only expose assets publicly when assets.status='available'
-- AND all required asset_verification checks are true.
