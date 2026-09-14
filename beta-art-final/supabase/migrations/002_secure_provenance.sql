-- Beta Art v2: server-trusted verification, immutable provenance, private RAW storage,
-- expanded licensing workflow, and column-level protection of verification flags.
-- This migration is designed to follow 001_beta_art.sql.

create extension if not exists pgcrypto;

do $$ begin
  create type public.verification_event_type as enum (
    'asset_uploaded', 'metadata_updated', 'photographer_verified',
    'verified', 'rejected', 'published', 'unpublished'
  );
exception when duplicate_object then null; end $$;

alter table public.profiles
  add column if not exists identity_verified_at timestamptz,
  add column if not exists identity_verification_method text,
  add column if not exists identity_verified_by uuid references auth.users(id),
  add column if not exists updated_at timestamptz not null default now();

alter table public.plates
  add column if not exists description text,
  add column if not exists alt_text text,
  add column if not exists image_storage_path text,
  add column if not exists raw_sha256 text,
  add column if not exists image_sha256 text,
  add column if not exists provenance_hash text,
  add column if not exists exif_snapshot jsonb,
  add column if not exists verified_at timestamptz,
  add column if not exists verified_by uuid references auth.users(id),
  add column if not exists published_at timestamptz,
  add column if not exists photographer_credit text;

-- Legacy delivered_storage_path/checksum are retained for backwards compatibility but are not trusted by v2.
alter table public.plates drop constraint if exists verified_publication_guard;
alter table public.plates add constraint verified_publication_guard_v2 check (
  published = false or (
    verification_status = 'verified' and
    raw_verified = true and
    capture_record_verified = true and
    photographer_verified = true and
    raw_storage_path is not null and
    image_storage_path is not null and
    raw_sha256 is not null and char_length(raw_sha256) = 64 and
    image_sha256 is not null and char_length(image_sha256) = 64 and
    provenance_hash is not null and char_length(provenance_hash) = 64
  )
);

alter table public.plates drop constraint if exists raw_path_matches_photographer;
alter table public.plates add constraint raw_path_matches_photographer check (
  raw_storage_path is null or photographer_id is null or split_part(raw_storage_path, '/', 1) = photographer_id::text
);
alter table public.plates drop constraint if exists image_path_matches_photographer;
alter table public.plates add constraint image_path_matches_photographer check (
  image_storage_path is null or photographer_id is null or split_part(image_storage_path, '/', 1) = photographer_id::text
);

create table if not exists public.verification_events (
  id uuid primary key default gen_random_uuid(),
  plate_id uuid not null references public.plates(id) on delete restrict,
  event_type public.verification_event_type not null,
  actor_id uuid references auth.users(id),
  raw_sha256 text,
  image_sha256 text,
  exif_snapshot jsonb,
  notes text,
  record_hash text not null check (char_length(record_hash) = 64),
  created_at timestamptz not null default now()
);

create index if not exists verification_events_plate_created_idx
  on public.verification_events(plate_id, created_at desc);

create table if not exists public.identity_verification_events (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete restrict,
  actor_id uuid references auth.users(id),
  method text not null,
  notes text,
  record_hash text not null check (char_length(record_hash) = 64),
  created_at timestamptz not null default now()
);
create index if not exists identity_verification_events_profile_created_idx
  on public.identity_verification_events(profile_id, created_at desc);

create or replace function public.prevent_verification_event_mutation()
returns trigger language plpgsql as $$
begin
  raise exception 'Verification events are immutable';
end $$;

drop trigger if exists verification_events_immutable on public.verification_events;
create trigger verification_events_immutable
before update or delete on public.verification_events
for each row execute function public.prevent_verification_event_mutation();

drop trigger if exists identity_verification_events_immutable on public.identity_verification_events;
create trigger identity_verification_events_immutable
before update or delete on public.identity_verification_events
for each row execute function public.prevent_verification_event_mutation();

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at before update on public.profiles
for each row execute function public.touch_updated_at();

drop trigger if exists plates_touch_updated_at on public.plates;
create trigger plates_touch_updated_at before update on public.plates
for each row execute function public.touch_updated_at();

-- Any provenance-affecting client edit automatically invalidates the previous verification.
create or replace function public.invalidate_plate_verification_on_edit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.raw_storage_path is distinct from new.raw_storage_path then
    new.raw_verified := false;
    new.raw_sha256 := null;
  end if;

  if old.image_storage_path is distinct from new.image_storage_path then
    new.image_sha256 := null;
  end if;

  if old.capture_date is distinct from new.capture_date
     or old.camera is distinct from new.camera
     or old.lens is distinct from new.lens
     or old.exposure is distinct from new.exposure
     or old.location is distinct from new.location then
    new.capture_record_verified := false;
  end if;

  if old.photographer_id is distinct from new.photographer_id then
    new.photographer_verified := false;
  end if;

  if old.raw_storage_path is distinct from new.raw_storage_path
     or old.image_storage_path is distinct from new.image_storage_path
     or old.capture_date is distinct from new.capture_date
     or old.camera is distinct from new.camera
     or old.lens is distinct from new.lens
     or old.exposure is distinct from new.exposure
     or old.location is distinct from new.location
     or old.photographer_id is distinct from new.photographer_id
     or old.catalogue is distinct from new.catalogue
     or old.title is distinct from new.title then
    new.verification_status := 'pending';
    new.provenance_hash := null;
    new.verified_at := null;
    new.verified_by := null;
    new.published := false;
    new.published_at := null;
  end if;

  return new;
end $$;

drop trigger if exists invalidate_plate_verification on public.plates;
create trigger invalidate_plate_verification
before update on public.plates
for each row execute function public.invalidate_plate_verification_on_edit();

-- Create a viewer profile automatically. Roles and identity verification are never self-service.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles(id, role, display_name)
  values (new.id, 'viewer', coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

revoke all on table public.profiles from anon, authenticated;
grant select on table public.profiles to authenticated;

-- Public access is through a deliberately narrow view. The base table remains private to
-- admins and the photographer who owns the row, preventing RAW paths/internal EXIF from leaking.
drop policy if exists "public verified plates" on public.plates;

drop view if exists public.public_plate_records;
create view public.public_plate_records
with (security_barrier = true)
as
select
  id, slug, catalogue, title, description, location, capture_date, camera, lens, exposure,
  price_nok, image_storage_path, alt_text, published, published_at,
  verification_status, verified_at, raw_verified, capture_record_verified, photographer_verified,
  raw_sha256, image_sha256, provenance_hash, photographer_credit
from public.plates
where published = true
  and verification_status = 'verified'
  and raw_verified = true
  and capture_record_verified = true
  and photographer_verified = true
  and raw_storage_path is not null
  and image_storage_path is not null
  and raw_sha256 is not null and char_length(raw_sha256) = 64
  and image_sha256 is not null and char_length(image_sha256) = 64
  and provenance_hash is not null and char_length(provenance_hash) = 64;

revoke all on public.public_plate_records from public;
grant select on public.public_plate_records to anon, authenticated;

-- Replace the v1 broad photographer policy. RLS decides which rows; column grants decide what can change.
drop policy if exists "photographers manage own plates" on public.plates;
drop policy if exists "photographers read own plates" on public.plates;
create policy "photographers read own plates" on public.plates
for select to authenticated using (public.is_admin() or photographer_id = auth.uid());

drop policy if exists "photographers create own pending plates" on public.plates;
create policy "photographers create own pending plates" on public.plates
for insert to authenticated with check (
  public.is_admin() or (
    photographer_id = auth.uid() and
    published = false and verification_status = 'pending' and
    raw_verified = false and capture_record_verified = false and photographer_verified = false
  )
);

drop policy if exists "photographers update own plate metadata" on public.plates;
create policy "photographers update own plate metadata" on public.plates
for update to authenticated
using (public.is_admin() or photographer_id = auth.uid())
with check (public.is_admin() or photographer_id = auth.uid());

-- Sensitive verification/publication columns are intentionally absent from authenticated UPDATE grants.
revoke all on table public.plates from anon, authenticated;
grant select on table public.plates to authenticated;
grant insert (
  slug, catalogue, title, description, location, capture_date, camera, lens, exposure,
  raw_storage_path, image_storage_path, alt_text, price_nok, photographer_id
) on public.plates to authenticated;
grant update (
  slug, catalogue, title, description, location, capture_date, camera, lens, exposure,
  raw_storage_path, image_storage_path, alt_text, price_nok, photographer_id
) on public.plates to authenticated;

alter table public.verification_events enable row level security;
revoke all on table public.verification_events from anon, authenticated;
grant select on table public.verification_events to authenticated;
drop policy if exists "admins read verification events" on public.verification_events;
create policy "admins read verification events" on public.verification_events
for select to authenticated using (public.is_admin());

alter table public.identity_verification_events enable row level security;
revoke all on table public.identity_verification_events from anon, authenticated;
grant select on table public.identity_verification_events to authenticated;
drop policy if exists "admins read identity verification events" on public.identity_verification_events;
create policy "admins read identity verification events" on public.identity_verification_events
for select to authenticated using (public.is_admin());

-- Sanitized public provenance: no actor identity, private paths, RAW file, or internal EXIF payload is exposed.
create or replace function public.get_plate_provenance(p_slug text)
returns table (
  id uuid,
  event_type public.verification_event_type,
  raw_sha256 text,
  image_sha256 text,
  record_hash text,
  notes text,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select e.id, e.event_type, e.raw_sha256, e.image_sha256, e.record_hash,
         null::text as notes,
         e.created_at
  from public.verification_events e
  join public.plates p on p.id = e.plate_id
  where p.slug = p_slug
    and p.published = true
    and p.verification_status = 'verified'
    and p.raw_verified = true
    and p.capture_record_verified = true
    and p.photographer_verified = true
    and p.raw_sha256 is not null
    and p.image_sha256 is not null
    and p.provenance_hash is not null
  order by e.created_at asc;
$$;
grant execute on function public.get_plate_provenance(text) to anon, authenticated;

-- Expanded licensing scope.
alter table public.license_requests drop constraint if exists license_requests_status_check;
alter table public.license_requests add constraint license_requests_status_check check (
  status in ('new','reviewing','quoted','terms_sent','approved','signed','paid','delivered','licensed','declined','spam')
);

alter table public.license_requests
  add column if not exists license_type text not null default 'commercial' check (license_type in ('personal','commercial','extended','custom')),
  add column if not exists territory text not null default 'To be confirmed',
  add column if not exists duration text not null default 'To be confirmed',
  add column if not exists media text not null default 'To be confirmed',
  add column if not exists campaign_type text,
  add column if not exists estimated_reach text,
  add column if not exists exclusivity_requested boolean not null default false,
  add column if not exists quote_amount_nok integer check (quote_amount_nok is null or quote_amount_nok >= 0),
  add column if not exists admin_notes text,
  add column if not exists quoted_at timestamptz,
  add column if not exists licensed_at timestamptz,
  add column if not exists updated_at timestamptz not null default now(),
  add column if not exists request_fingerprint text,
  add column if not exists terms_summary text,
  add column if not exists approved_at timestamptz,
  add column if not exists signed_at timestamptz,
  add column if not exists paid_at timestamptz,
  add column if not exists delivered_at timestamptz;

drop trigger if exists license_requests_touch_updated_at on public.license_requests;
create trigger license_requests_touch_updated_at before update on public.license_requests
for each row execute function public.touch_updated_at();

revoke all on table public.license_requests from anon, authenticated;
grant select on table public.license_requests to authenticated;
grant update (status, quote_amount_nok, admin_notes, terms_summary, quoted_at, approved_at, signed_at, paid_at, delivered_at, licensed_at)
  on public.license_requests to authenticated;

-- Public submissions go through submit-license-request Edge Function (service role) for
-- server-side validation, honeypot handling and privacy-preserving rate limiting.
drop policy if exists "public can submit licence requests" on public.license_requests;

create or replace function public.stamp_license_request_status()
returns trigger language plpgsql as $$
begin
  if new.status = 'quoted' and old.status is distinct from 'quoted' then new.quoted_at := now(); end if;
  if new.status = 'approved' and old.status is distinct from 'approved' then new.approved_at := now(); end if;
  if new.status = 'signed' and old.status is distinct from 'signed' then new.signed_at := now(); end if;
  if new.status = 'paid' and old.status is distinct from 'paid' then new.paid_at := now(); end if;
  if new.status = 'delivered' and old.status is distinct from 'delivered' then new.delivered_at := now(); end if;
  if new.status = 'licensed' and old.status is distinct from 'licensed' then new.licensed_at := now(); end if;
  return new;
end $$;

drop trigger if exists license_request_status_timestamps on public.license_requests;
create trigger license_request_status_timestamps before update on public.license_requests
for each row execute function public.stamp_license_request_status();

-- Storage: all source material is private. Public visitors can request signed URLs only for published image objects.
insert into storage.buckets (id, name, public, file_size_limit)
values
  ('plate-images', 'plate-images', false, 52428800),
  ('plate-raw', 'plate-raw', false, 2147483648)
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit;

drop policy if exists "published plate images readable" on storage.objects;
create policy "published plate images readable" on storage.objects
for select to anon, authenticated using (
  bucket_id = 'plate-images' and (
    exists (
      select 1 from public.public_plate_records p
      where p.image_storage_path = name
    )
    or public.is_admin()
    or (auth.uid() is not null and (storage.foldername(name))[1] = auth.uid()::text)
  )
);

drop policy if exists "authorized raw read" on storage.objects;
create policy "authorized raw read" on storage.objects
for select to authenticated using (
  bucket_id = 'plate-raw' and (
    public.is_admin() or (storage.foldername(name))[1] = auth.uid()::text
  )
);

drop policy if exists "authorized plate asset insert" on storage.objects;
create policy "authorized plate asset insert" on storage.objects
for insert to authenticated with check (
  bucket_id in ('plate-images','plate-raw') and (
    public.is_admin() or (storage.foldername(name))[1] = auth.uid()::text
  )
);

drop policy if exists "authorized plate asset update" on storage.objects;
create policy "authorized plate asset update" on storage.objects
for update to authenticated using (
  bucket_id in ('plate-images','plate-raw') and (
    public.is_admin() or (storage.foldername(name))[1] = auth.uid()::text
  )
) with check (
  bucket_id in ('plate-images','plate-raw') and (
    public.is_admin() or (storage.foldername(name))[1] = auth.uid()::text
  )
);

drop policy if exists "authorized plate asset delete" on storage.objects;
create policy "authorized plate asset delete" on storage.objects
for delete to authenticated using (
  bucket_id in ('plate-images','plate-raw') and (
    public.is_admin() or (storage.foldername(name))[1] = auth.uid()::text
  )
);

-- Useful indexes.
create index if not exists plates_public_idx on public.plates(published, verification_status, catalogue);
create index if not exists plates_photographer_idx on public.plates(photographer_id, created_at desc);
create index if not exists license_requests_status_idx on public.license_requests(status, created_at desc);
