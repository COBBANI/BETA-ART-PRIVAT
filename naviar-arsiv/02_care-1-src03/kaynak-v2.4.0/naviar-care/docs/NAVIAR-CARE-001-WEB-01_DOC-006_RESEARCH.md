# NAVIAR CARE — research and design decisions

Date: 2026-09-05 · Document DOC-006 · Archive NAVIAR-CARE-001-WEB-01

## Observed patterns

- SeniorSupport practical help: clear task examples, regular versus occasional support, a visible starting process. Adopt concrete service examples and agreement before a visit; do not copy its fees, testimonials, coverage or guarantees. https://seniorsupport.no/tjenester/praktisk-hjelp
- Seniorene booking: distinguish a request received from an assignment accepted and an agreed time. Adopt explicit intermediate states and a named operational receiver. https://www.seniorene.no/bestilling
- Good Life Sorted home help: nonmedical scope and a personalised helper relationship; start with wishes and practical tasks. Adopt scope clarity and understandable next steps, without reproducing brand or promising its operating model. https://goodlifesorted.com/services/home-help/
- Språkrådet: familiar wording, audience needs, clear next action and text testing. Applied to equivalent Norwegian Bokmål, English and Turkish content. Native-speaker/customer testing remains open. https://sprakradet.no/klarsprak/om-skriving/
- Datatilsynet: optional tracking needs deliberate permission and understandable choice. Implemented equal allow/decline controls and withdrawal. This is a technical design choice, not a legal compliance certificate. https://www.datatilsynet.no/personvern-pa-ulike-omrader/internett-og-apper/bruk-av-informasjonskapsler-og-andre-sporingsteknologier/
- Stripe: raw-body signature verification and provider-verified payment outcome. https://docs.stripe.com/webhooks and https://docs.stripe.com/checkout/fulfillment and https://docs.stripe.com/api/idempotent_requests
- Resend: idempotency key and provider acceptance distinction; retry policy accounts for its 24-hour deduplication window. https://resend.com/docs/api-reference/emails/send-email

No worldwide ranking, proprietary benchmark score or comparative claim of being the world's best was established.

## Visual direction

Existing forest-green and light neutral identity retained, with stronger type hierarchy, a photographic hero, deliberate asymmetry, accessible controls and consistent spacing. The image is original AI-generated illustration, not a real client or helper testimonial. No unverified logo certification was added. The source image is kept in assets/hverdag.png and bundled into the Worker.

## Tool selection

Exa supported service research. Malwarebytes checked the supplied Vercel URL and returned unknown; this is not a safe verdict or an application audit. Data Analytics guidance informed honest counts, denominators and the decision to show no invented trend. Sites supports this project's existing repository, private preview, Worker and D1. Vercel remains the original reference target, but no Vercel update was performed. Wix, WebsitePublisher and Lovable are alternate hosting/application systems; creating duplicates merely to invoke them was rejected. Adobe, Canva and Figma were not used to claim assets or design files that were not supplied. Existing brand direction and original imagery were implemented in source. A plugin's availability does not mean its account integration is installed in this website.

## Decision log

| Phase | Date | Decision | Rationale | Status/next validation |
|---|---|---|---|---|
| Discover | 2026-09-05 | Preserve NAVIAR CARE / WEB-01 identity and existing private Site | User corrected name; source verified | Existing project, no duplicate |
| Define | 2026-09-05 | Practical/social support; first-call booking distinct from home visit | Avoid representing unconfirmed staffing as real availability | Operator scope to confirm |
| Design | 2026-09-05 | Equivalent nb/en/tr, role-aware copy and photographed everyday scene | Clarity, dignity and accessibility | Native speakers and older-user tasks pending |
| Build | 2026-09-05 | Worker/D1 upgrade of static source | Durable reservations, messages and access checks need a server | Local integration tests passed |
| Validate | 2026-09-05 | Database-backed tests plus source checks | Exercise meaningful failures and boundaries | Browser, provider and production data validation remain open |
| Launch | 2026-09-05 | Keep commercial gate closed and current owner-only audience | Company, region, price, merchant and sender are unknown | Activate only after concrete setup |
| Measure | 2026-09-05 | Optional minimal engagement events, no health profiling | User requested insight into content and demand | No real data yet |
| Scale | 2026-09-05 | Baseline forecasting only when sufficient history exists | Avoid fictional accuracy or inferred individual needs | Expand evaluation with actual demand and seasonality |
