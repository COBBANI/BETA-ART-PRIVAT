# NAVIAR CARE — SRC-03 professional review

Downloadable design source and Turkish setup guide: see `docs/KODU-CALISTIRMA.md`. Run `npm run preview:export` to create a self-contained three-language HTML preview. It creates local summaries only; no booking, email, analytics or payment is sent. The published app retains its separate account-backed test flow.

Practical non-medical help for older adults. Source inspiration: user-provided content from https://beta-art-series1.vercel.app/. Original Vercel access returned 403; this is a private review implementation, not proof the original deployment was changed.

## Run and validate

`npm test` is the complete release check: build, booking and integration acceptance scenarios, all language/page render checks, browser-storage preference fallback, and built Worker routing/security checks. Provider tests use synthetic responses and never establish real email delivery or merchant readiness. Optional UI catalog checks are available through `npm run test:components`.

Use the existing Node runtime and installed dependencies. `npm run test:care` runs acceptance tests with an in-memory SQLite database and synthetic provider responses; no money is charged and no email is sent. `npm run build` creates the Worker and client assets. Sites lifecycle uses the Sites building and hosting skills.

## Product

- Norwegian Bokmål, English and Turkish; Shared stable content keys, 6 translated services, 12 page views per language.
- Four-step request flow with Oslo local time and explicit recipient approval. Requests are not staff assignments. No real helper is dispatched.
- Durable D1 records, account isolation, optimistic revision checks, idempotent creation, rescheduling, cancellation and data export/deletion.
- Relative payer cannot consent to disclosure for someone else. Family requests remain pending. Sharing settings do not grant access to another account; family invitations and verified recipient delegation are launch work.
- Helpers apply as unverified. No identity, reliability or task competency badge is inferred from applying, stars or completed tasks.
- Four incident categories have persistent cases and role responsibility; reviewer actions are audited. Roles have no real staffing behind them in this review.
- Account owner operations access is configured server-side through a secret allowlist value. Do not expose admin controls based solely on frontend state.

## Integration states

Payments: Stripe hosted **test-only** Checkout adapter, server totals, idempotency, signed webhooks, amount/currency/session matching and recorded payment events. No merchant credentials were provided. A browser return is never proof of payment. Provider-hosted payment does not implement marketplace payouts, escrow, refunds or fiscal compliance. These require a merchant decision and separate implementation before launch.

Email: Resend adapter and durable outbox with preview, failed and sent states. Test-only recipient allowlist; no automatic emails are sent. Provider/domain verification and SPF/DKIM/DMARC are not configured. Retries stop before the provider's 24-hour idempotency window expires. Staff must reconcile ambiguous sends.

Analytics: opt-in, strict event/section/service allowlist, no form contents or account identity in event rows, event deduplication, aggregate reporting with small groups suppressed. Page views are not people; engagement is not comprehension. Booking outcomes come from server records. The development mode mixes no demo data into a claimed business forecast.

Forecast: `forecastDemand` compares the seasonal naive baseline to four-week weekday averages with a 28-day holdout. Test data and histories below 84 complete daily observations are rejected. The 84-day floor is a prototype weekly-pattern constraint, not a claim of enough data for every service or seasonal cycle. Error bands are heuristic, not calibrated confidence intervals. Real data, coverage, observed error, bias and a staffing decision must be reviewed before use.

## Before production

Configure verified business entity, approved service area, actual service prices/tax treatment/cancellation policy, staffed support owner, helper screening and competence evidence, insurance, privacy review, storage/transfer agreements and incident handling. Integrate real recipient authorisation and helper scheduling with atomic availability locks before sending anyone out. Verify payment sandbox and authorised email delivery against the actual providers. Public customer authentication is a separate launch decision; this private review uses Sites/ChatGPT identity.

## Source preservation

An independently changing source was observed in `/workspace/sites/naviar-care-src03` during the work. Implementation was isolated in `/workspace/sites/naviar-care-src03-review`; pre-existing schema tables and migration 0000 were preserved. New application tables use `care_` prefixes and migration 0001 adds them without dropping existing tables. Do not overwrite newer source commits or rewrite applied migrations.

The source is git-backed. Project documents belong under `/NAVIAR CARE`.
