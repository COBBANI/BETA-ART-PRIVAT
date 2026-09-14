# NAVIAR CARE · Web Design Platform Studio

Archive: NAVIAR-CARE-001-WEB-01 · DOC-009 · 2026-09-05 · Implementation 2.2

## Realistic example prompt

“NAVIAR CARE için evinde yaşayan yaşlıların ve yakınlarının günlük desteği kolayca bulduğu, Norveççe–İngilizce–Türkçe bir hizmet sitesi geliştir. Mevcut çalışmayı incele; Figma, Wix Studio, Webflow, Framer ve özel geliştirmeyi güncel kaynaklarla karşılaştır. Seçtiğin yaklaşımı uygula; hizmet seçimini, fiyat beklentisini ve deneme rezervasyonunu anlaşılır yap. Çalışan özel önizleme, karar kaydı ve doğrulama raporu teslim et.”

## Brief and evidence

Audience: older adults living at home, relatives, helpers and service coordinator. Purpose: practical help, local accompaniment and companionship. No medical treatment, personal care, medication handling, BankID or bank-account access. Existing source is a Cloudflare Worker with D1, server-rendered nb/en/tr routes and authenticated records. Source was recovered from the existing Sites Git repository; the existing project identity and owner-only access were reused. The current title is NAVIAR CARE; care-1 remains in the stable URL. NAVIAR CARE 2 and NAVIAR Consult are separate.

Requirements: three languages, understandable service scope, request/call journey, transparent preview, code ownership, existing cancellation/admin/email/payment/analytics capabilities preserved. Budget, maintenance owner, service region, final prices, provider accounts and commercial launch readiness are unconfirmed. These do not block a private design demonstration. The site is not migrated to another platform.

## Platform decision · checked 5 September 2026

| Candidate | Verified fit and constraint | Cost evidence / implication | Decision for this iteration |
|---|---|---|---|
| Figma Design + Figma Sites | Design/prototyping and actual web publishing are distinct capabilities. Sites can publish websites; Full seat supports Sites. Integrated booking/clinical/private service operations for this brief were not established. | Official pricing displays Professional Full seat USD 16/month; billing selector and final checkout must be checked. This is not a complete operating-site quote. | Useful for shared editable design when that becomes necessary; no separate Figma file was requested or created. |
| Wix Studio | Wix Bookings lists Norwegian, English and Turkish; Wix Multilingual can translate services. Norway list includes Stripe, Vipps and PayPal. Wix editor sites are hosted on Wix; not a portable standalone source export. | Studio pricing page was opened but rendered no usable plan prices. Local price and Bookings/payment tier not verified; do not budget from an invented NOK amount. | Strong alternative if the owner chooses visual editing and integrated business operations; reassess after scope, plan and ownership decisions. |
| Webflow | Visual design/CMS plus localized routes. Essential Localize allows up to 3 added locales. Export excludes localized content, CMS/ecommerce data and functioning forms. | Core Workspace USD 19/month billed yearly includes code export; this is not the hosted site plan. Hosting and localization add costs; complete quote not established. | Existing three-language data flows would need rebuilding and transfer work. No demonstrated benefit justifies migration now. |
| Framer | Hosted visual site building with localization; no standalone HTML export for self-hosting. | Official page shows localization add-on USD 20/locale/month; billing cycle, base plan and tax apply. Two additional locales would add USD 40/month before those other costs. | Candidate for marketing-focused work; does not remove current booking/backend maintenance. |
| Existing custom implementation + Sites hosting | Current code already implements 3 languages, D1 records, admin, cancellation and guarded adapters. Source is available. Its D1 and Sites authentication are platform dependencies. | No new paid subscription was purchased. Total hosting, maintenance, email and payment fees are not verified. Language dictionaries have no per-locale software license in this implementation. | Selected: incrementally improve the existing system. Engineering maintenance remains necessary. |

This is a project-fit judgment, not a universal ranking. Vercel is a hosting/deployment platform, not the application framework. This Worker cannot be copied to Vercel as a static site without adapting storage and authentication. Moving platforms would also require content/record mapping, route redirects, private-access verification and re-testing operations. There is no verified estimate of those migration costs.

Official sources: [Figma pricing](https://www.figma.com/pricing/), [Figma publishing](https://help.figma.com/hc/en-us/articles/31242845959703-Publish-update-or-unpublish-a-site), [Wix language coverage](https://support.wix.com/en/article/changing-languages-in-wix-bookings), [Wix Norway providers](https://support.wix.com/en/article/available-payment-providers-in-your-country), [Wix export](https://support.wix.com/en/article/exporting-or-embedding-your-wix-site-elsewhere), [Wix Studio plans](https://www.wix.com/studio/plans), [Webflow pricing](https://webflow.com/pricing), [Webflow export scope](https://help.webflow.com/hc/en-us/articles/33961386739347-How-do-I-export-my-Webflow-site-code), [Framer pricing](https://www.framer.com/pricing/), [Framer export limits](https://www.framer.com/help/articles/can-i-export-my-website-to-html-and-self-host-it/).

## Service journey and operating handoff

| Stage | Visitor experience | Required service work | Status |
|---|---|---|---|
| Find help | Three service groups; optional guide gives an explained suggestion from explicit choices | Coordinator confirms suitability; no inference of health or hidden intent | Guide and service detail UI work; real suitability review not demonstrated |
| Understand offer | Read examples, exclusions, service area status and total-price checklist | Set area, scope, staffing, named accountable coordinator and prices | UI implemented; operating decisions pending |
| Choose a call | Explicit service selection, available call slot, relationship and contact fields | Publish real capacity and determine contact method | Authenticated test records exist; no home-visit scheduling claim |
| Confirm | Review choices and see explicit test confirmation | Confirm tasks, price, date, duration and person separately before home visit | Test call records; no real call or visit promised |
| Manage | Own records, calendar export, cancellation and contact | Handle changes, replacement, complaints and incidents | Existing functions retained; provider/live operations not verified |
| Measure | Optional consent-based section counts | Review aggregate content use; run real user tasks | Existing measurement retained; no new tracking or prediction claimed |

## Implemented changes

1. Preserve existing identity and unaltered selected v0.3 logo; add it to header/footer. No trademark clearance claim.
2. Main CTA leads to the explained service guide. Each service has expandable task examples and exclusions before a booking CTA.
3. All booking entry CTAs identify the preview. Final review says nobody will call or visit from a test booking.
4. Add direct price/region anchor and pre-booking facts. Show written-offer checklist: task, helper, date, duration, total NOK price including extras and change/cancellation/contact route.
5. Remove automatically selected practical service. Only an explicit valid service link preselects a service.
6. Preserve that service in language links. No name, email, date or free text is placed in those URLs; other form fields reset when changing languages.
7. Empty availability now includes a contact link. Existing retry and error handling remain.
8. Improve smaller text sizes, focus-compatible native controls, flexible header and stacked fact panels. Add a Vite development adapter solely for isolated browser QA; production architecture is unchanged.

The service boundaries in the new examples are design decisions for the proposed pilot. They require operating-owner review before live launch. Copy follows [Språkrådet clear-language guidance](https://sprakradet.no/klarsprak/kunnskap-om-klarsprak/kort-om-klarsprak/); native-speaker and older-user comprehension checks remain necessary. Form design uses [W3C multistep guidance](https://www.w3.org/WAI/tutorials/forms/multi-page/) and [form notifications](https://www.w3.org/WAI/tutorials/forms/notifications/).

## Transactions, privacy and measurement

Booking records and admin controls are existing implemented functions. External email delivery and live payments were not activated in this example. Existing Resend/Stripe adapters were exercised only by the existing mocked integration tests; provider acceptance is not evidence of recipient delivery, and a checkout screen is not proof of settled payment. Merchant setup, sending-domain authentication, provider test transactions, reachable signed webhooks, reconciliation and refunds need a separate verified operating step.

Analytics remains opt-in. Existing views and 10-second visibility cannot prove reading, understanding or intent. Test records are excluded from the existing demand model. No representative real data or validated predictive accuracy was supplied; this iteration claims neither. No new trackers, session replay or sensitive profiling were installed. A consent interface is not a GDPR compliance certificate. The design reference is [Datatilsynet cookie/sporing guidance](https://www.datatilsynet.no/personvern-pa-ulike-omrader/internett-og-apper/bruk-av-informasjonskapsler-og-andre-sporingsteknologier/).

## Verification evidence

| Check | Result and boundary |
|---|---|
| Existing integration suite | 21/21 pass against bundled Worker and local SQLite/D1 adapter; includes collision, ownership, cancellation, CSRF, preview guards, DST, outbox, signed payment events and insufficient forecast data |
| Language and asset routes | 27 rendered nb/en/tr routes plus 4 CSS/JS/image/logo routes pass |
| Structure | One H1, unique IDs, existing label and ARIA references in all 27 outputs |
| Explicit selection | No implicit service checked; explicit social service preserved and translated route links retained |
| Source contrast samples | Body 11.63:1; muted 6.31:1; primary action 11.69:1; error 7.10:1; focus outline on paper 4.21:1. Not exhaustive rendered-state audit |
| JavaScript and production output | Syntax and Worker build pass |
| Desktop/mobile/keyboard/browser journey | Blocked: supervised preview started, browser connection failed twice before navigation. No screenshots or browser pass claimed |
| Live email, payment, production DB | Not tested; no real external message sent or card charged |

Before public service launch: accountable operator, real service region and prices, helper/safety/change processes, legal terms/data lifecycle, authenticated customer journey and provider verification. Then keyboard/screen-reader tests and desktop/mobile tasks in all languages, including 200% text zoom, empty availability, validation error, successful booking and cancellation. Suggested task: can an older adult explain what the service includes and whether a test booking causes an actual visit?

## Decision/change log

| Phase | Decision | Reason |
|---|---|---|
| Discover | Recover latest version and selected logo, inspect implementation before choosing platform | Avoid rebuilding capabilities that already exist |
| Define | Retain name/number, scope and private audience | Keep project traceable and reviewable |
| Design | Progressive scope details, visible demo actions, price checklist | Reduce uncertainty before asking for personal information |
| Build | Extend existing Worker; only development tooling added | Preserve data and business-flow contracts |
| Validate | Keep automatic checks separate from blocked browser QA | Report only supported evidence |
| Launch | Deliver private review; external providers stay unactivated | Merchant/domain and service operation are not verified |
| Measure | Keep consented aggregate questions; no new prediction claims | No representative data or evaluation |

Tools actually used: Web Design Platform Studio, Library recovery, Sites building/hosting workflow, official web sources, source edits, build and integration checks. Browser setup was attempted and blocked. No Figma file, Wix site, Webflow site or Framer site was created; no paid account was purchased.
