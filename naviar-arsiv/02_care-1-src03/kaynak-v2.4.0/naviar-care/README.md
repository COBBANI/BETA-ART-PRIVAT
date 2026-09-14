# NAVIAR CARE

Project archive: **NAVIAR-CARE-001-WEB-01**
Version: 2.4 verified demo release, 2026-09-05
Source reference: https://betaartcategorydirectory.vercel.app/

The original static concept is now a server-rendered, three-language service preview. The project name is NAVIAR CARE; numerals remain only in its stable archive identifier and existing URL.

## Run and build

Node 22.13+; `npm ci`, `npm run db:generate` after intentional schema changes, `npm run build`, `npm test`. Node 24 was used for integration tests because its built-in SQLite driver is available. The production Worker has no runtime package dependencies. `src/worker.js` and `src/render.js` own application behavior, `src/locales.js` owns language content, `src/client.txt` owns browser behavior and `src/styles.css` owns presentation. `scripts/build.mjs` bundles the Worker and copies generated D1 migrations. Author source under src, not generated dist.

The host manifest retains the existing Site identity. This project uses Sites/Cloudflare Worker and D1, not a Vercel-compatible static export. The previous Vercel URL was not modified. Rehosting this backend on Vercel requires adapting D1 and platform authentication; copying dist as a static directory is not valid.

## Included

- Own-enquiry status page, launch prerequisite checklist, consented next-step counts, independent forecast selection/evaluation and obsolete email-confirmation suppression.

- Three-language service guide with explicit, locally held choices; no answer storage or profiling.
- Versioned administrator enquiry workflow, removable free slots with race protection, real-only operational metrics and cautious content-review suggestions.

- Norwegian Bokmål, English and Turkish: home, service content, booking, own bookings, contact/helper enquiry, payment status, privacy, terms and protected administration.
- Named services, practical/nonmedical scope, separate family guidance, transparent preview status, original illustrative imagery, responsive layout, keyboard focus, accessible labels and native FAQ.
- Administrator-created call slots, Europe/Oslo conversion with DST ambiguity rejection, 10-minute scheduling buffers, persistent bookings, unique active booking per slot, idempotent submissions, user ownership, cancellation and calendar export.
- Persistent contact enquiries, price offers with written scope, server-priced Stripe hosted Checkout adapter, signed raw-body webhooks, event deduplication and manual-review protection for payments/cancellation.
- Booking/cancellation email outbox through Resend with idempotency, explicit preview suppression and bounded manual retry. Provider acceptance is not delivery confirmation. Contact enquiries are stored in the admin inbox; they are not automatically forwarded to email.
- Optional content-view/engagement counts, permission controls, aggregate administration and an honestly gated weekly demand baseline. No diagnoses, sensitive profiling, session replay or third-party tracking scripts.

## Readiness

Default mode is preview. All booking/contact writes require platform authentication. Preview requests require fabricated name and an email ending .test or .invalid. No home visits, real charges or outgoing mail are enabled. Start by visiting `/nb/admin`, adding a future test call slot, and booking it through `/nb/book`. Test slots are never offered in live mode.

Production runtime keys are listed in `.env.example`. `SERVICE_OPEN=true` alone is insufficient: business identity, service area, contact email and launch review must also be set. Payments additionally require explicit enablement, a live Stripe secret and webhook secret. Configure secrets through hosted environment settings; never put them in source or browser code. Production activation requires independent account/domain verification and commercial operating decisions; these are not established by this implementation.

Admin access is an explicit server-side allowlist of platform-authenticated email claims. Do not publish this Worker outside the Sites dispatcher without replacing the trusted-header authentication model. The current private audience is preserved.

## Payment operations

Checkout reads amount and offer scope from the database. Pending checkout freezes offer edits and cancellation. Browser redirects do not mark a booking paid. Subscribe to checkout.session.completed, checkout.session.async_payment_succeeded, checkout.session.async_payment_failed and checkout.session.expired. Raw body signatures are checked with a 5-minute timestamp tolerance. Amount, currency, session, offer version and live/test mode must match. Expired sessions reopen an offer with a new version. Refunds, disputes, paid cancellation and reconciliation use the provider dashboard and responsible operator; automatic refunds are not implemented. The current private site cannot accept unauthenticated provider webhooks: public reachability must be reviewed before enabling real payments, without widening the admin audience.

## Validation and limitations

Automated integration tests use a real local SQLite database with a D1-compatible adapter and the bundled Worker. They cover three-language route rendering, ownership, CSRF, idempotency, slot conflicts, cancellation, preview safeguards, DST, analytics permission/deduplication, durable messages, payment gating, signed webhook replay/mismatch and forecast data limits. The tests do not establish live Cloudflare database behavior, delivery through Resend, real Stripe checkout or browser/mobile/accessibility conformance. No real card was charged and no email was sent. See docs for service blueprint, sources, integration status and launch gaps.

## Web Design Platform Studio example · 2026-09-05

The current name remains NAVIAR CARE, archive NAVIAR-CARE-001-WEB-01. Existing source and private audience were retained after reviewing Figma Sites, Wix Studio, Webflow, Framer and custom development. See docs/NAVIAR-CARE-001-WEB-01_DOC-009_PLATFORM-STUDIO.md.

Changes: selected v0.3 logo (unaltered supplied SVG), progressive service examples and exclusions, explicit preview booking labels, visible price link and written-offer checklist, three-part pre-booking explanation, no implicit service selection, safe service-only language-link retention and an actionable empty-calendar contact link. Content is aligned in Bokmål, English and Turkish. New scope examples are proposed service-design boundaries for this preview, not evidence of an operating service.

Vite is a development-only adapter for supervised browser QA. `npm run dev` runs the built Worker against an in-memory SQLite fixture with one fabricated future slot and a fabricated local administrator. It does not read production configuration, credentials or data. Production packaging contains only the Worker built from src/worker.js and the existing database migrations. Do not deploy the Vite development server. Rebuild after changing source; restart the supervised preview to load the new bundle.

Validation: 21 existing integration tests pass. 27 rendered language routes and 4 served assets pass; single H1, unique IDs, label/ARIA references, localized service retention and no default service are checked. Source color-pair contrast: body 11.63:1, muted 6.31:1, primary action 11.69:1, error 7.10:1, focus outline against paper 4.21:1. These are sampled source checks, not an accessibility audit. The supervised preview started, but the browser connection failed twice before any page could be opened. No browser, viewport, keyboard, assistive-technology, live-provider or production-database test is claimed.

## Integrated 2.3 validation

The independently added service details, supplied SVG logo, pricing checklist, preview booking language and Vite QA fixture were preserved alongside enquiry tracking, readiness and analytics changes. The standalone Node preview adapter was removed as redundant; use the existing Vite dev command. The latest integrated suite contains 27 tests. Browser QA remains blocked by the browser URL policy; no new browser attempt was made to bypass it.

## Completion review · CARE 1 · 5 September 2026

The existing booking reliability changes are retained: explicit slot selection, Enter-key step handling, duplicate-submit protection, stable retry identity after a lost response, stale availability-response protection, service-aware language links and booking-list refresh. Requests time out with translated recovery guidance. Optional measurement does not automatically interrupt demo visitors.

Validation after integrating the remote checkout-recovery release: 36 automated client/Worker integration tests passed. Production adapters remain gated; no live provider transaction or email delivery is claimed. This is a completed private demo release, not an operational home-support service. CARE 2 remains a separate healthcare-preparation demo at https://naviar-care-2.andersen-betul.chatgpt.site.

## Final 2.4 handover

See docs/NAVIAR-CARE-001-WEB-01_DOC-010_HANDOVER.md for the Turkish owner guide, release inventory, activation inputs and operating limits. This completes the current private development release, not commercial service activation.

Known Stripe sessions are retrieved instead of recreated. Unknown attempts retain their first timestamp and stop retrying after 23 hours, before provider idempotency keys may expire; older legacy attempts require operator reconciliation. Expired sessions require a fresh offer version and consent. The additive 0006 migration preserves existing data. The integrated release passes all 36 tests (30 Worker/SQLite integration tests and 6 DOM flow tests), including client-flow and payment-retry checks. Provider and browser limitations still apply.
