# NAVIAR CARE 2 — operational test edition

**Current delivery: concept and website demo release 6.0, 5 September 2026.** See `design/CONCEPT-v6-tr.md` for the complete service concept, source map and launch dependencies, and `design/RELEASE-v6.md` for changes and acceptance evidence. This release expands the service scope in all three languages and keeps the quick-example calendar current in Europe/Oslo. The source and earlier design records below are retained as history.

Project: NAVIAR-CARE-002. Release: 3.0, 5 September 2026.

Extends the preserved 2.0 source snapshot with persistent test reservations, translated email previews, test payment simulation, provider adapters, optional content measurement and an owner dashboard. This is not an operating healthcare service. Profiles, languages and time slots are illustrative. No symptoms, medical records, identity numbers or document uploads are collected.

## Source and design

`build_content.py`, `content.json` and `catalog.json` generate the original seven pages per language. `build_operations.py` adds booking and operations pages, updates privacy, and adds opt-in measurement controls. Norwegian Bokmål, English and Turkish share the same catalog and actions. Existing logo and illustration are preserved. The front end uses system fonts, responsive layouts, keyboard controls and visible focus indicators.

`server/operations.mjs` implements the API as a Cloudflare-compatible Worker using Sites D1. `db/schema.ts` and generated `drizzle` migrations own the schema. `scripts/build.mjs` embeds public assets and stages the Worker and migrations. The previous static-only manifest was upgraded, preserving its project ID.

The inherited 2.0 snapshot was copied into an isolated checkout before editing. Its existing changes were retained. Source history continues from the original remote main without force pushing.

## Test flows

1. Open `/tr/insights/` (or `/insights/`, `/en/insights/`) as the owner and create test slots for the next 14 days.
2. Open the matching `/booking/` route; choose a time in Europe/Oslo and acknowledge test mode.
3. Reserve, reschedule or cancel. Reservations persist across requests and are isolated by the verified platform user ID. A partial unique index prevents conflicting active bookings; per-owner idempotency keys prevent duplicate creates.
4. Preview translated confirmation, change and cancellation emails. They remain drafts unless sending is explicitly enabled for a single approved test recipient.
5. Try successful and failed payment simulations. 100 NOK is a technical test amount, not a clinical price. No card is charged.
6. Change the optional measurement choice in the footer. Only generic home, about and language pages are eligible. Search text, clinical choices, profile pages, booking and operations are excluded.
7. The owner dashboard shows totals and a truthful empty state. No individual browsing history or healthcare prediction is available.

## Production runtime values

Configure through the hosting platform, never commit keys or place them in the manifest.

- `ADMIN_EMAILS`: explicit verified owner email allowlist, derived from platform ownership metadata. Absence fails closed.
- `CONSENT_SECRET`: secret used to sign the necessary measurement preference cookie.
- `STRIPE_SECRET_KEY`: optional `sk_test_` only; live keys are refused.
- `STRIPE_WEBHOOK_SECRET`: optional test webhook secret. Raw-body signatures, five-minute timestamp checks, test mode, session, amount, currency and event uniqueness are validated.
- `RESEND_API_KEY`, `EMAIL_FROM`: optional approved sending service and verified domain.
- `EMAIL_TEST_SEND=enabled` plus `TEST_RECIPIENT`: explicit opt-in for sending to the signed-in user's verified matching test address only. No automatic send is enabled by this release.

Keys alone do not make a clinical system operational. The current owner-private site may prevent external Stripe delivery to its webhook. A publicly reachable, signature-verified webhook ingress and provider sandbox verification are required before enabling provider checkout. Return URLs are never treated as payment evidence.

## Privacy, reliability and retention

No app localStorage, session replay, advertising SDK, external font or health profiling. Required auth is supplied by Sites verified headers, not a client claim. Mutation APIs require exact same-origin JSON. Health/free-text fields are rejected. SQL uses bound parameters, D1 atomic batches and generated schema migrations. API responses are private and uncached. The Worker sets CSP, frame denial, MIME-sniffing protection and restrictive device permissions.

The optional signed preference cookie lasts up to 180 days. Separate consent receipts record the choice and policy version. Aggregates store UTC day, generic page, locale, event kind and count. A short-lived random event key deduplicates each page load; it is not a cross-page browsing identifier. Engagement is a proxy: 20 visible seconds plus 25% scrolling or a short page, not proof of reading or understanding. Samples exclude visitors declining measurement and are not representative demand estimates.

Bookings/outbox and webhook events have a 30-day cleanup threshold, generic aggregates 90 days, consent receipts 180 days, event dedup keys one day. Cleanup runs on owner summary/seed operations; this is NOT a scheduled deletion guarantee. An always-on scheduler and operator monitoring are required for production. Users can delete their own test reservations and outbox immediately. Hosting logs are managed separately.

Stripe and Resend external calls have bounded timeouts and idempotency. Email retries are limited to three within 23 hours of draft creation to stay inside the provider's 24-hour idempotency window. Provider acceptance is labelled sent, not delivered. A process crash while an email is in `sending` needs operator reconciliation. Cancelled test payments are marked for refund review; there is no automated refund or promise of one.

## Aggregate forecasting

`server/forecast.mjs` prepares a small baseline for weekly consented content views. It requires an explicit production-data flag and at least eight complete suitable weeks. The last two weeks form a holdout; a four-week mean is compared to the last-week baseline. Output is an estimate and holdout absolute error, not a confidence interval or causal claim. Current operations pass no production data, so the dashboard correctly reports insufficient production data. No health need, illness, eligibility or personal treatment inference is performed.

## Checks and limitations

`npm test` uses Node's SQLite-backed D1 test adapter for API checks. Eleven tests cover auth/owner/origin restrictions, booking collisions and persistence, reschedule rollback, cancellation/deletion, input limits, consent/signatures/deduplication, email previews, test-only payment adapters, signed webhook replay/mismatch checks, Oslo DST, and forecast gating. Provider calls are mocked: no actual Stripe or Resend transaction was executed. The inherited catalog test checks 42 sample profiles, 113 language joins and 12 reconciled relations. Static checks verify 27 localized pages plus compatibility routes, assets, anchors, script order and demo labels. Browser/device or assistive-technology QA was not performed; WCAG compliance is not claimed.

## Before any public clinical launch

Resolve the legal healthcare provider, jurisdiction and licensing, qualified clinicians and clinical language verification, patient eligibility, pricing, interpreter scheduling, clinical records and secure video provider, emergency/escalation workflow, cancellations and refunds, data controller/contact channel, legal bases and supplier agreements, authentication appropriate to the care context, data protection impact review where required, retention scheduler, monitoring/backup restore drill, independent accessibility/user testing and real provider sandbox tests. No BankID, Helsenorge, real clinician schedule, regulated clinical record system or live healthcare readiness is claimed.

Selected tools were used according to fit: Exa for official benchmarks, Malwarebytes for limited link reputation, Data Analytics for KPI design, and Sites for the existing host. WebsitePublisher was evaluated as an alternative. The original Vercel link was not changed because authorized source/deployment access was unavailable. Wix/Lovable alternate deployments and Adobe/Canva/Figma duplicates were not created; the design remains maintainable in one site.

## Primary references, accessed 5 September 2026

- Plain language: https://sprakradet.no/klarsprak/
- Norwegian measurement consent: https://www.nkom.no/internett/informasjonskapsler-cookies
- Patient task separation benchmark: https://www.kry.no/
- Booking clarity benchmark: https://www.drdropin.no/en/video
- Eligibility/language/appointment benchmark: https://www.helsenorge.no/en/appointments/municipal-online-doctor/
- Stripe Checkout sessions: https://docs.stripe.com/api/checkout/sessions/create
- Stripe webhooks: https://docs.stripe.com/webhooks
- Resend send API: https://resend.com/docs/api-reference/emails/send-email
- Resend idempotency: https://resend.com/docs/dashboard/emails/idempotency-keys

## Design revision 4 — 5 September 2026

The three-language design has been revised with a service summary, clearer test-booking review, readable mobile controls and emergency navigation. Browser QA found and resolved 320 px heading overflow and a frontend startup dependency on `crypto.randomUUID`. See `design/REVIEW-v4.md` for decisions, current evidence and the pending Figma handoff. `npm run dev` provides an isolated Vite preview; production remains the existing embedded-asset Worker. This revision is saved for review; it does not by itself publish the changes or activate clinical services.
