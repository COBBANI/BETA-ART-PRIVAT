-- Beta Art production schema
-- Apply in a fresh Supabase project, review with your legal/security requirements,
-- then create the first admin profile manually after the user signs up.

create extension if not exists pgcrypto;

do $$ begin
  create type public.user_role as enum ('admin', 'photographer', 'viewer');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.verification_status as enum ('pending', 'verified', 'rejected');
exception when duplicate_object then null; end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'viewer',
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.plates (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  catalogue text not null unique,
  title text not null,
  location text,
  capture_date date,
  camera text,
  lens text,
  exposure text,
  raw_storage_path text,
  delivered_storage_path text,
  checksum text,
  price_nok integer not null default 190 check (price_nok >= 0),
  verification_status public.verification_status not null default 'pending',
  raw_verified boolean not null default false,
  capture_record_verified boolean not null default false,
  photographer_verified boolean not null default false,
  published boolean not null default false,
  photographer_id uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint verified_publication_guard check (
    published = false or (
      verification_status = 'verified' and
      raw_verified = true and
      capture_record_verified = true and
      photographer_verified = true and
      checksum is not null
    )
  )
);

create table if not exists public.license_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  catalogue text not null,
  intended_use text not null,
  status text not null default 'new' check (status in ('new','reviewing','quoted','licensed','declined','spam')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.plates enable row level security;
alter table public.license_requests enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin');
$$;

create or replace function public.is_photographer()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(select 1 from public.profiles p where p.id = auth.uid() and p.role in ('photographer','admin'));
$$;

drop policy if exists "public verified plates" on public.plates;
create policy "public verified plates" on public.plates
for select using (
  published = true and
  verification_status = 'verified' and
  raw_verified = true and
  capture_record_verified = true and
  photographer_verified = true and
  checksum is not null
);

drop policy if exists "admins read all plates" on public.plates;
create policy "admins read all plates" on public.plates
for select to authenticated using (public.is_admin());

drop policy if exists "photographers manage own plates" on public.plates;
create policy "photographers manage own plates" on public.plates
for all to authenticated
using (public.is_admin() or photographer_id = auth.uid())
with check (public.is_admin() or photographer_id = auth.uid());

drop policy if exists "users read own profile" on public.profiles;
create policy "users read own profile" on public.profiles
for select to authenticated using (id = auth.uid() or public.is_admin());

drop policy if exists "admins manage profiles" on public.profiles;
create policy "admins manage profiles" on public.profiles
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public can submit licence requests" on public.license_requests;
create policy "public can submit licence requests" on public.license_requests
for insert to anon, authenticated with check (
  char_length(name) between 2 and 120 and
  char_length(email) between 5 and 320 and
  char_length(catalogue) between 3 and 32 and
  char_length(intended_use) between 10 and 2000
);

drop policy if exists "admins read licence requests" on public.license_requests;
create policy "admins read licence requests" on public.license_requests
for select to authenticated using (public.is_admin());

drop policy if exists "admins update licence requests" on public.license_requests;
create policy "admins update licence requests" on public.license_requests
for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- Development seed records. They are intentionally unpublished and pending.
insert into public.plates (slug, catalogue, title, published, verification_status, raw_verified, capture_record_verified, photographer_verified)
values
('first-light','BA-001','First Light',false,'pending',false,false,false),
('into-the-pines','BA-002','Into the Pines',false,'pending',false,false,false),
('sea-of-fog','BA-003','Sea of Fog',false,'pending',false,false,false),
('still-water','BA-004','Still Water',false,'pending',false,false,false),
('palm','BA-005','PALM',false,'pending',false,false,false),
('blue-hour-grid','BA-006','Blue Hour Grid',false,'pending',false,false,false),
('night-crossing','BA-007','Night Crossing',false,'pending',false,false,false),
('golden-hour','BA-008','Golden Hour',false,'pending',false,false,false),
('portrait-in-amber','BA-009','Portrait in Amber',false,'pending',false,false,false),
('the-maker','BA-010','The Maker',false,'pending',false,false,false),
('slow-morning','BA-011','Slow Morning',false,'pending',false,false,false),
('low-tide','BA-012','Low Tide',false,'pending',false,false,false)
on conflict (catalogue) do nothing;
