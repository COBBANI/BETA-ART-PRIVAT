# NAVIAR CARE — Improvement record 2.1

2026-09-05 · NAVIAR-CARE-001-WEB-01 · DOC-008

## Decisions and implementation

| Phase | Evidence / problem | Decision | Rationale / next verification |
|---|---|---|---|
| Discover | Existing preview already contains booking, email/payment adapters and three languages | Extend the same source and identity | Avoid duplicate providers and redoing delivered work |
| Define | Customers may not know the service name | Add a two-question guide in nb/en/tr | Explicit task and frequency choices; no health inference |
| Design | Booking progress was expressed only as numbers | Add named steps, current-step semantics, page-title progress and time reload | Based on W3C forms guidance; browser/assistive-technology validation still pending |
| Build | Enquiries had no work state | Add new/in-progress/completed status, optimistic version checks and an audit trail | Protect changes from stale overwrites; no messages are deleted |
| Build | Free-slot removal was absent | Add admin-only closing and transaction-time availability validation | Prevent booking a slot closed between lookup and insert |
| Build | Removing and re-adding a time must preserve history | Unique start time applies to active slots only | New slot records preserve old cancelled booking durations |
| Measure | Counts must support a coordinator decision | Real requests over 30 days, cancellations in that creation cohort, unresolved real messages and next-14-day call-slot utilisation | Explicit denominators; tests excluded; no conversion or delivery-quality claim |
| Measure | Visitors requested predictive insight but data is thin | Add a transparent content-review rule alongside the existing weekly demand baseline | At least 20 views and below 30% recorded engagement triggers investigation, not a causal conclusion |
| Validate | Server behaviour and migrations changed | Run local SQLite/Worker integration tests and JavaScript syntax checks | No browser, live provider or accessibility certification claimed |
| Launch | No merchant, sender or operator values were added; Vercel listing still failed | Preserve private audience and closed commercial gates | Original Vercel reference unchanged |
| Scale | No real pilot findings exist | Collect consented evidence and voluntary feedback during a real pilot | Do not create goals or accuracy claims without a baseline |

Technical owner: current implementing agent for this code change. Business owner, service coordinator, privacy owner and finance operator still require assignment by the project owner. Current changes are implemented and locally tested; commercial launch remains blocked by the existing business/account dependencies.

## Metric contract

- Bookings: count of non-demo bookings created between the current time minus 30 days and the current time, all current statuses included.
- Cancelled: count of those bookings whose current status is cancelled; rate uses the booking count above. It is not cancellations occurring during the period. Zero denominator is unknown, not 0%.
- Open enquiries: non-demo messages currently new or in progress, without a fixed creation cutoff. List display has a 100-row limit; the total is calculated over all matching records.
- Capacity: active non-demo call slots starting from now to strictly before now plus 14 days. Numerator is slots with a confirmed booking, denominator is all those slots. This does not measure staffing or home-visit capacity. Zero denominator is unknown.
- Content: consent-limited section view/engagement event totals over the last 30 days, aggregated across languages for the review aid. These are not unique people and do not prove reading. The 20-view / 30% threshold is a provisional product rule, not a validated benchmark. Existing demand forecast guardrails remain unchanged.

## Privacy and service boundary

Guide answers stay in page memory, with no local storage, backend submission or analytics events. A visitor who chooses a service follows a booking link containing the service identifier; answer frequency is not carried into the booking. Choosing “talk first” leads to contact. The guide does not confirm availability or a price and is not a clinical assessment.

Existing message content remains visible only through the protected administration API. Status changes accept only known states and the expected record version. Existing booking and account authorization remains unchanged. No third-party account has been configured by merely naming a plugin.

## Research references

- [W3C WAI multi-page forms](https://www.w3.org/WAI/tutorials/forms/multi-page/): make form progress and the current step clear; useful source for the updated indicator and document title.
- [W3C WAI user notifications](https://www.w3.org/WAI/tutorials/forms/notifications/): explain outcomes and provide focused feedback for errors and success. Applied to message status and administrator actions.
- [Språkrådet writing guidance](https://sprakradet.no/klarsprak/om-skriving/): audience-oriented language and an understandable next step. Guide content uses equivalent simple wording across languages.

Exa was used to find primary accessibility guidance. The selected Data Analytics KPI-design skill informed the metric definitions and limited scope. The prior competitor research remains in DOC-006. No new worldwide ranking or provider integration was established.

## Verification result

21 local integration tests passed after the changes, including the original 14 cases and 7 new cases for guide routes, message state/version boundaries, slot closing and race handling, preserved booking history, metric denominators and content-review thresholds. Browser JavaScript syntax and source whitespace checks passed. Provider responses remain mocked where tested. The server build and generated migration files were checked; no original applied migration was edited.
