# Beta Art — Final Work v2

Production-oriented implementation of the **Beta Art verified human photography archive**.

The design principle is simple: a plate is not public because it looks authentic. It becomes public only after the archive can document the source, capture record, maker identity and delivered file.

## What is implemented

### Public archive
- Premium editorial/museum-style responsive homepage
- Grid and index collection views
- Supabase as the production source of truth
- Plate detail pages with public provenance hashes
- Private image storage with time-limited signed URLs
- RAW originals never exposed publicly
- Personal, Commercial, Extended and Custom/Exclusive licensing paths
- Expanded licence request scope: territory, duration, media, campaign, reach and exclusivity
- 10-locale interface foundation with persistent language choice and dynamic `<html lang>`
- Client metadata plus build-time pre-rendered SEO pages for published plates
- `robots.txt`, generated `sitemap.xml`, Open Graph card and 404 page

### Verification / trust model
- RAW file and delivered image are uploaded to separate **private** Supabase Storage buckets
- SHA-256 hashes are calculated **server-side** in a Supabase Edge Function
- EXIF is read server-side when available; missing fields are never fabricated
- Photographer identity must be independently verified by an admin
- Verification produces a cryptographic provenance hash
- Verification events are immutable at database level
- Publication is separately approved after verification
- PostgreSQL has an independent publication `CHECK` constraint
- RLS limits public reads to fully verified, published plates
- Authenticated photographers do **not** receive column privileges for verification/publication fields
- Any provenance-affecting metadata/file change automatically invalidates verification and unpublishes the plate
- Asset paths are constrained to the assigned photographer namespace

### Admin workflow
`/admin` includes:
- Authentication and admin-role check
- Pending plate creation
- Metadata editing
- Delivered-image upload
- RAW upload
- Photographer identity verification
- Capture-record confirmation
- Server-side hash/exif/provenance verification
- Reject / publish / unpublish controls
- Publication gate status dashboard
- Licence request inbox, quote and status workflow

### Spam / request protection
Public licence requests are submitted through the `submit-license-request` Edge Function rather than direct table inserts. It includes:
- Server-side Zod validation
- Honeypot support
- Privacy-preserving IP fingerprinting
- Five requests/hour/network rate limit
- No raw IP address stored in the database

## Local setup

```bash
cp .env.example .env
npm install
npm run dev
```

Set:

```env
VITE_SITE_URL=https://beta-art.com
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
VITE_ALLOW_PLACEHOLDERS=false
VITE_SHOW_DEV_NOTICE=false
```

`VITE_ALLOW_PLACEHOLDERS=true` is intended only for development layout work. Placeholder records remain `pending` and `published=false` in the database.

## Supabase setup

Install/login to the Supabase CLI and link the project, then apply both migrations in order:

```bash
supabase db push
```

The migrations create the archive schema, RLS policies, private Storage buckets and the verification security model.

Deploy both functions:

```bash
supabase functions deploy verify-plate
supabase functions deploy submit-license-request
```

Set a private random salt for request rate limiting:

```bash
supabase secrets set LICENSE_RATE_LIMIT_SALT="replace-with-a-long-random-secret"
```

Supabase supplies `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to hosted Edge Functions. Never expose the service-role key in `VITE_*` variables or client code.

## Create the first admin

1. Create/sign up a user in Supabase Auth.
2. Run this once in the Supabase SQL editor, replacing the email:

```sql
update public.profiles
set role = 'admin'
where id = (select id from auth.users where email = 'you@example.com');
```

For a photographer account:

```sql
update public.profiles
set role = 'photographer', display_name = 'Photographer Name'
where id = (select id from auth.users where email = 'photographer@example.com');
```

The photographer cannot self-set identity verification, plate verification or publication status.

## Production plate workflow

1. Create the plate in `/admin`.
2. Assign it to the correct photographer account.
3. Upload a delivered image to `plate-images`.
4. Upload the RAW source to `plate-raw`.
5. Add capture record fields without inventing missing information.
6. Verify the photographer identity.
7. Review the capture record and run **Compute hashes & verify**.
8. The Edge Function downloads both private assets and computes their SHA-256 values.
9. It extracts EXIF when available and seals a provenance record hash.
10. Review the completed publication gate.
11. Publish separately.

Changing a source file, photographer, catalogue identity or capture record later automatically returns the plate to `pending` and removes it from public view until reverified.

## SEO build

```bash
npm run build
```

After Vite builds, `scripts/prerender-seo.mjs`:
- queries only RLS-public published plates with the anon key,
- creates static `/plates/<slug>/index.html` pages with unique title/description/canonical/JSON-LD,
- creates static wrappers for contact/privacy/licence/admin routes,
- generates `dist/sitemap.xml`.

The RAW bucket and internal verification details are never used in SEO output.

## Quality checks

```bash
npm run lint
npm run test
npm run build
# or
npm run check
```

The publication tests assert that a plate remains blocked if any required trust signal is missing.

## Before launch

Technical provenance does not replace legal review. Before taking real payments or licensing work, replace the development legal notices with lawyer-reviewed Privacy and Licence Terms for the jurisdictions where Beta Art operates. Also replace all placeholder imagery and the placeholder photographer portrait with verified originals.
