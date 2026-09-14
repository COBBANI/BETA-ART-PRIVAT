# NAVIAR CARE 2 — NAVIAR-CARE-002 / Demo delivery 5.0

Date: 5 September 2026. This release completes and connects the reviewable website demo. It is not a clinical service launch.

## Concept and scope

NAVIAR CARE 2 is a planned digital consultation service centered on language understanding, preparation and a clear next step. The website supports Norwegian Bokmål, English and Turkish. It remains distinct from NAVIAR CARE 1, the neighborhood assistance concept for older adults.

The service journey is: understand scope → clarify language needs → prepare questions → review clinician information → select an eligible appointment → review total price and terms → consultation → documented next step. Only illustrative preparation, profile discovery and technical reservation/payment/email workflows are implemented here. Clinical eligibility, urgency, diagnosis and specialty selection are not automated.

## Delivered behavior

- All 27 translated core pages retain a prominent service-demo notice. The quick example is now reached directly from each localized home page and from test booking. Its home and saved-reservation links follow the selected website language.
- The existing forest-green visual system, logo and labelled AI illustration remain in use.
- The quick example includes consultation-language preference, sample days/times, review, acknowledgement, payment success/failure examples and an email preview. All choices stay in page memory; fixed September 2026 dates are explicitly illustrative.
- Persistent test booking now groups available slots by Europe/Oslo calendar date. Choosing another date or time clears the acknowledgement. A completed save clears the selection and acknowledgement before another reservation.
- Test reservations can be moved, cancelled, exported to a calendar and deleted by their creator. Draft confirmations use all three languages. No emails are sent automatically.
- The 42 sample profiles and 113 language records use one catalogue. All 12 previously reported language relationships are reconciled. Displayed language listings do not assert verified clinical proficiency or availability.
- The professional information page separates public profile information from private email, referee contacts and documents. No application or document upload is collected.
- The existing owner dashboard, optional aggregate content measurement, privacy explanation and provider configuration guards are preserved. Current configured runtime values cover owner access and consent signing; no email or payment-provider credentials are configured.

## Acceptance evidence for this release

1. Eleven existing server tests pass: authentication/owner/origin restrictions, reservation persistence/collision/idempotency, reschedule rollback, cancellation/deletion, input restrictions, consent, email drafts, payment simulation, mocked provider checkout, signed-webhook checks, Oslo DST and aggregate forecast gating.
2. Catalogue tests pass: 42 sample profiles, 113 language records, all 12 known differences, matching/filtering and preparation state.
3. New calendar checks cover empty input, chronological ordering, non-mutation, Oslo midnight boundaries and both DST transitions.
4. Static checks pass: 27 localized pages plus the standalone demo and compatibility/error pages; local routes, assets, anchors, unique IDs, demo notices, private-field wording and scripts. Home/booking-to-demo links exist in every language.
5. Built Worker smoke checks pass: 27 translated routes, quick demo, scripts, styles and visual assets; unauthenticated bookings return 401, unknown page returns 404 and missing slash redirects correctly.
6. Modified JavaScript syntax checks and the production build pass.

These are code-level checks and an in-process Worker smoke test. No new browser, screen-reader, physical-device or authenticated hosted end-to-end test was performed in this release. Previous visual checks are recorded separately in REVIEW-v4.md. No live Stripe transaction, outgoing email or medical appointment was created.

## Operating the private demo

- Home: `/`, `/en/`, `/tr/`.
- Quick example: `/studio-demo/?lang=nb`, `/studio-demo/?lang=en`, `/studio-demo/?lang=tr`.
- Persistent technical reservations: `/booking/`, `/en/booking/`, `/tr/booking/`.
- Owner operations: `/insights/`, `/en/insights/`, `/tr/insights/`.
- If the test calendar is empty, the owner opens Operations and uses “Create test times for the next 14 days,” then returns to Test booking. These are illustrative slots, never clinician availability.
- Preview confirmations on the booking page. Payment simulations use a 100 NOK technical example and charge nothing. Provider checkout remains unavailable until a permitted test setup is configured and independently verified.
- Retention cleanup currently runs when owner operations are opened or test times are created; it is not an always-on deletion scheduler. Use “Delete my test reservations and email drafts” for immediate removal of your own examples.

## Phase decision log

| Phase | Decision | Reason |
|---|---|---|
| Discover | Reuse the existing CARE 2 Site and source | Preserve the archive identity and completed operational work |
| Define | Finish a private demonstration | The supplied concept and acceptance criteria describe a demo; actual clinical partners are not verified |
| Design | Connect the quick example and persistent test workflow | Visitors can complete an example and return to the main site |
| Build | Date-first calendar in the existing interface | Avoid a long list of all test times; keep the service timezone explicit |
| Validate | Reuse existing gates and add focused calendar checks | Address the changed behavior without representing simulations as provider verification |
| Launch | Publish to the existing owner-private audience under “FINISH THIS PROJEKT” | Deliver the completed reviewable result without changing access to public |
| Measure | Retain optional generic aggregates only | Current demo activity cannot establish clinical needs or reliable market demand |

## Separate requirements for a real service

The next operational phase needs an identified healthcare provider and clinical lead, verified registration and language capacity, jurisdiction/eligibility decisions, actual prices and terms, qualified interpreter scheduling, appropriate identity/video/clinical-record services, data-controller and supplier arrangements, clinical escalation ownership, retention scheduling and restoration checks, accessibility/user testing and provider sandbox evidence. A Figma file is optional design collateral, not a release dependency. The original Vercel deployments and any custom domain have not been changed by this release.

## Sources rechecked on 5 September 2026

- Helsenorge emergency and out-of-hours contact: https://www.helsenorge.no/hjelpetilbud-i-kommunene/legevakt/
- Datatilsynet privacy by design and by default: https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/innebygd-personvern-og-personvern-som-standard/

These references support service-boundary and privacy design choices. They are not evidence of regulatory approval or a completed legal assessment.
