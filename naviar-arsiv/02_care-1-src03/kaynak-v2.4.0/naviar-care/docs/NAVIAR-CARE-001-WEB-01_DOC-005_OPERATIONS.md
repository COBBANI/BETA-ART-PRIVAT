# NAVIAR CARE — service operations and launch register

Date: 2026-09-05 · Archive: NAVIAR-CARE-001-WEB-01 · Document: DOC-005

## Service blueprint

| Stage | Customer experience | Operator action | Failure/recovery |
|---|---|---|---|
| Discover | Select practical help, accompaniment or social time | Publish verified scope, coverage and accessible contact route | Explain what is outside scope; do not substitute medical advice |
| Call | Choose an administrator-published time, receive an account record | Maintain actual coordinator availability | Unique database constraint prevents double booking; retry returns existing record |
| Clarify | Discuss own wishes; a relative may enquire without supplying the older person's details | Clarify participation, authority, scope and safe delivery | Paying and accessing private information remain separate; no family portal access is implied |
| Offer | Read written scope and a total price | Verify service, tax treatment, terms and named delivery owner before offering | Freeze offer edits while checkout is pending; do not infer agreement from browsing |
| Visit | Know who will arrive, when and for what tasks | Screen/train helpers, plan backup, define arrival and escalation | No-show, unanswered door, additional task and dispute each need a responsible coordinator |
| Follow-up | Discuss what should change | Record factual feedback, manage complaint and agreed changes | Paid cancellation/refund reviewed manually; no automatic clinical or trust scoring |

There are no confirmed workers, operating company facts, service areas, delivery promises, testimonials, memberships or insurance assertions in the current site. The preview is not a statement that those operational foundations exist.

## Responsibilities requiring assignment

Founder/operating company: commercial scope, contracts, price and launch decision. Service coordinator: staffing, availability, handover, no-show and unanswered-door handling. Privacy owner: minimisation, retention, subject-access and deletion requests, processors and disclosure. Finance owner: tax treatment, settlement, refunds, disputes and reconciliation. Technical owner: secrets, access controls, monitoring, migrations and recovery. Helper lead: screening, training, boundaries, supervision and incident escalation. These are roles to assign, not claims that a team is employed.

## Integration register

| System | Built | Evidence | Remaining input/status |
|---|---|---|---|
| Three-language site | All principal routes and equivalent UI content | Static route and content-key tests | Native-speaker and older-user evaluation still needed |
| Call booking | Slots, buffers, unique active claim, record ownership, cancellation, .ics export | SQLite-backed Worker tests | Real coordinator calendar, phone and service opening not verified; preview only |
| Contact/helper enquiry | Persistent protected messages with limited fields | Replay and access-boundary tests | Admin inbox is the receiver; automatic forwarding is not implemented |
| Transactional email | Resend booking/cancellation outbox, idempotency and manual retry | Preview suppression and local adapter tests | Account, verified sender domain, SPF/DKIM/DMARC and authorized delivery test required |
| Payments | Stripe hosted checkout adapter, database-priced scoped offer, signed webhooks | Local synthetic signature/replay/amount tests | Merchant activation, prices/terms/tax, endpoint reachability, live keys and provider sandbox test required |
| Refunds/disputes | Paid cancellation blocked for manual review | Guard in server | Operator handles provider dashboard; automatic refund API and webhook reconciliation not implemented |
| Analytics | Explicit opt-in, section views, 10-second visible engagement, language dimension | Consent rejection and event-deduplication tests | No actual visitor findings yet; admin visits excluded |
| Demand | Ten complete weeks, at least eight active weeks and forty requests required by this provisional product rule | Empty/thin-data and viable-baseline test | No production data; no forecast claim; thresholds are not universal statistical validity criteria |
| Security | Trusted dispatcher identity, admin allowlist, prepared SQL, CSRF, rate limits, headers and escaping | Relevant local tests | No penetration test, security certification or external code audit |
| Recovery | Source control and immutable migration history | Committed source | D1 export/backups and restoration drill still require operator procedure |

## Measurement dictionary

`view`: section intersects viewport at the configured threshold. `engaged`: ten cumulative foreground seconds while section is visible. Neither is proof of reading or comprehension. Records contain only generated session hash, event kind, whitelisted section, language and date/time. No email, name, free text, account id, health facts or URL query is sent to this event table. Analytics session identity is in memory; it is not durable user tracking. Consent preference is stored as a first-party cookie for 180 days; denial is equally available. No tracking starts before consent, and withdrawal stops observers and new events.

Views and engaged views are shown as counts by section and language for the last 30 days. They are consent-limited and exclude administrator activity and all preview-mode traffic. From version 2.2, whitelisted book_click, guide_click and contact_click events record clicks originating inside marked content sections. Counts are deduplicated per destination, section, in-memory page session and UTC day. Hero/footer clicks and completed bookings are not attributed. No user-level cross-page funnel is built. Bookings and message records are operational records, not analytics events. No attribution, conversion rate or causal lift is claimed. Test appointments are explicitly excluded from demand forecasts.

## Demand baseline

Updated in 2.2: target is total non-demo call requests for the current full UTC calendar week, with the exact week shown. The current partial week is excluded from training. Ten completed weeks are used: compare rolling four-week mean and previous-week baselines on weeks 5–8, select the lower-MAE method there, and evaluate that fixed method on held-out weeks 9–10. The selected method then uses the latest available completed weeks for its current-week estimate. Two evaluation weeks are inadequate to establish predictive reliability. The displayed range is the 10th–90th order-statistic span of historical weekly counts, not a calibrated prediction interval. No individual or health-related predictions are made. The readiness threshold is a provisional product guard; meaningful statistical forecasting may require more data and seasonal coverage. Current data is insufficient.

## Data retention and launch gates

The administration maintenance action deletes analytics older than 90 days and expired rate-limit entries. It is not an independently scheduled cleanup job; assign a regular maintenance process before launch. Preview data must be purged through a reviewed migration/maintenance procedure before live operation. Do not delete real bookings or accounting records on an invented retention schedule. Production retention, consent evidence, legal basis, processors, international transfers, complaints and accessibility requirements need a real operator review.

The public site, customer authentication and Stripe webhook exposure are a deployment design decision: private Sites is suitable for this owner preview, but external webhook callers cannot cross its sign-in gate. Do not enable merchant payments until the webhook is reachable and admin/data access remain restricted. Keeping the commercial gates closed is a functional limitation, not proof of legal compliance.

Version 2.2 analytics migration adds a live provenance marker, defaulting legacy events to excluded. Only newly accepted live, non-admin events enter dashboard summaries; historical rows are preserved.

## Final 2.4 payment retry protection

See DOC-010_HANDOVER.md. Existing Stripe sessions are retrieved, not recreated. A checkout with no known session may only reuse its original provider idempotency key for 23 hours after the first stored attempt; unknown legacy timestamps or older attempts require manual reconciliation. Verified expired sessions advance the offer version and require renewed consent. Retrieving a completed session does not itself mark the booking paid. Migration 0006 is additive and preserves data. No merchant or sender account was connected in this release.
