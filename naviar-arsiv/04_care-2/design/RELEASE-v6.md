# NAVIAR CARE 2 — concept and website handoff 6.0

Date: 5 September 2026. Project: NAVIAR-CARE-002.

## Completed scope

The Turkish master concept is `CONCEPT-v6-tr.md`. It replaces the initial concept's outdated implementation description while retaining earlier decisions as history. It covers the audience, proposed Norway adult pilot, service journey, operational responsibilities, professional onboarding, failure recovery, business model, pricing method, all website routes, source architecture, data use, operating instructions, acceptance evidence and the separate requirements for an actual healthcare launch.

The existing 27 localized website pages remain in place. All three About pages now explain the proposed pilot audience, pre-booking information, follow-up responsibility and recovery from missing language support or technical problems. No application or clinical data collection is added.

The quick demo now uses the next three Oslo calendar dates instead of fixed September 2026 dates. Localized dates show the correct weekday and year in summaries. The fixed UTC+02 label is removed because the Oslo offset changes seasonally. The date note explicitly states that these days are illustrative; the selectable hours and the empty day remain controlled examples. No clinician availability is inferred.

## Validation

- `npm test`: 12 automated tests passed, comprising 11 retained server/forecast tests and one new sample-calendar test covering Oslo midnight, year rollover and both daylight-saving transitions.
- The existing catalog checks passed: 42 sample profiles, 113 language records, all 12 previously identified relationships, filters and preparation state.
- The existing calendar grouping checks passed.
- Static checks passed: 27 localized pages, local routes and anchors, assets, demo labels, private-field wording, and dependency order. Added checks require the service scope in all About pages and the quick-demo calendar helper and visible note.
- Production build passed. Provider calls remain mocked. No real email, charge or consultation is created.

No new browser, assistive-technology, physical-device or independent penetration test was performed. Prior visual work remains documented in REVIEW-v4.md. This release does not certify accessibility, medical safety or legal compliance.

## Operating instructions

Use the main site or `/studio-demo/?lang=tr` (`nb` and `en` are also supported) for a memory-only example. For persistent test reservations, the owner generates 14 days of illustrative slots on `/tr/insights/`, then uses `/tr/booking/`. The user can reserve, move, cancel, export and delete their own technical examples. Email confirmations are drafts and payment is a simulation unless a separately authorized provider sandbox is configured and verified.

Keep the existing owner-private audience. The canonical site is https://naviar-care-2.andersen-betul.chatgpt.site . Publication status is verified separately through the hosting response; a committed source file alone is not deployment evidence.

## Remaining operational dependencies

Verified healthcare provider and clinical lead; actual clinician and interpreter capacity; approved scope and jurisdiction; real prices/terms; identity/video/clinical-record systems; privacy roles and supplier arrangements; scheduled retention and restore drills; user/accessibility testing; real provider sandbox evidence. These are not presented as completed clinical capabilities.

The source remains in the existing project repository. The master concept and readable website-copy handoff are saved as user documents. No old Vercel deployment or custom domain is changed.
