# Company profile — small-business plugin customization

Purpose: the single input for the small-business plugin's onboarding
(`/small-business:smb-onboard`) and for any skill that needs company
context (briefs, cash-flow, campaigns). Written 02.09.2026 from this
repo's own records; **nothing here is invented — unknowns are marked
UNKNOWN and must be filled by the owner.** Update this file when facts
change; it is the single source.

## Owner and structure

- Owner: Betül Andersen (andersen.betul@gmail.com), Norway.
- Umbrella: BET-ART (Vercel team name "BET - ART"; GitHub
  `andersenbetul-alt`, repo BETA-ART-PRIVAT).
- Legal form, org number (Brønnøysund), VAT/MVA registration: UNKNOWN —
  confirm before any payroll, invoicing or tax workflow.
- Employees: none recorded; solo founder. Payroll workflows do not
  apply yet — skip `plan-payroll` until hiring.
- Working languages: Turkish (owner), Norwegian (market), English.
- Time zone: Europe/Oslo. Weekly review slot: Monday 07:00 (existing
  SEO/AI visibility monitor).

## Business line 1 — QBLOGG (live)

- What: content studio selling content pipelines to SMB/SaaS companies
  without in-house content teams — SEO blog posts, LinkedIn series,
  social content, newsletters, multilingual publishing (10 languages).
- Status: site live at qblogg.vercel.app (Vercel project `qblogg`);
  domain qblogg.com held at GoDaddy, not yet connected.
- Primary conversion goal: brief form submissions (not traffic).
- Secondary audience: writers applying to join the studio.
- Pricing: package prices on the site are EXAMPLE data (repo rule:
  numbers are marked as examples). Real price list: UNKNOWN.
- Payments: none processed yet. Stripe is connected as a connector;
  Stripe Norway fee basis recorded in repo (domestic card 1.5% +
  1.80 kr; foreign +3.25%, currency +2%) — verify before pricing.
- Newsletter: Buttondown (POST endpoint in assets/js/config.js).
- Customers/revenue to date: none recorded in repo — treat as
  pre-revenue unless the owner states otherwise.

## Business line 2 — NAVIAR CARE (pre-launch pilot)

- What: Norwegian elderly-care coordination platform + hourly
  low-risk everyday-help marketplace (helpers matched to users;
  commission per completed service). Products: Start, Match, Assist,
  Plan, Pårørende, Partner — see naviar-care/docs/forretningsmodell.md.
- Status: landing + prototype + pilot console built; NO real
  customers, helpers or payments yet. Pilot design is manual-first.
- Domain: naviarcare.com is owned by the owner (confirmed 02.09.2026;
  registrar UNKNOWN — likely GoDaddy like qblogg.com). Not yet
  connected; target is Vercel project naviar-care-live
  (prj_soL100MluDGAjLVqte65l9aLz9Pd, BET-ART team). naviarcare.no and
  naviar.care were still available on 02.09.2026 (availability changes
  — recheck before deciding).
- All prices are EXAMPLES (e.g. 250 NOK/h + 15–25% commission).
- Hard gate: no real payments before the employment-status/tax/
  insurance questions in naviar-care/docs/hukuk-kontrol-listesi.md are
  answered by counsel. Any plugin workflow that would take money for
  NAVIAR CARE stops at this gate.
- Compliance stance (binding): no unnecessary health data, no
  automated decisions about people, human approval on every match,
  GDPR + WCAG (naviar-care/docs/uyum-ilkeleri.md).
- First institutional contact target: Drammen kommune (Tilrettelagt
  fritid).

## Business line 3 — NAVIAR Consult (P-010 / NVC-001, pre-launch)

- What: workplace-attendance consulting (arbeidsnærvær) — helping
  employers and employees handle tilrettelegging, stay-at-work and
  return-to-work with human-led advisory; digital tools are support.
- Platform: built and privately published on ChatGPT sites (3 sites,
  NO/EN/TR). Code is NOT in this repo — this repo archives concept
  and delivery records only (naviar-consult/docs/).
- Status: private review published; INTAKE and PAYMENTS disabled.
  Commercial opening blocked on: company name + org.nr, business
  email + owned domain, responsible consultant + real availability,
  Resend + Stripe accounts and tests, final terms.
- Pricing: 19,900 NOK / NAVIAR Start is a TEST HYPOTHESIS, not a
  confirmed price.
- Brand-family note: NAVIAR now has parallel builds — canonical CARE
  landing (this repo → naviar-care-live), the v0 prototype
  (naviar-care-1), ChatGPT CARE "SRC-03" private version, and the
  Consult sites. Single public line remains naviar-care-live +
  naviarcare.com; the others are private review/archive until the
  owner consolidates.

## Connected tools (verified 02.09.2026, this account)

Connected and usable by plugin workflows: Gmail, Google Calendar,
Google Drive, Canva, Stripe, Slack, Vercel, Notion, Linear, Shopify,
GoDaddy, Webflow, Wix. Installed but NOT connected: HubSpot. Not
present: QuickBooks, PayPal, Docusign, Square — accounting workflows
(month-end close, tax prep) have no bookkeeping source yet; UNKNOWN
which accounting system the owner uses (in Norway commonly Fiken/
Tripletex — unverified, ask the owner).

## Standing rules for any plugin workflow

1. Every step touching money or customers requires the owner's
   explicit approval (plugin's own rule — keep it).
2. Never present example prices as real offers; the repo marks all
   figures as examples until the owner sets real ones.
3. Nothing unverified is stated about trademark availability,
   registrability or user-test results (repo rule).
4. Customer-facing output follows the venture's own brand rules:
   QBLOGG → docs/tasarim-sistemi.md + on-brand skill; NAVIAR CARE →
   naviar-care palette and Norwegian institutional tone
   (kartlegging/koordinering/oppfølging).
5. Weekly rhythm: Monday brief fits the existing Monday 07:00 slot.

## Skill-by-skill customization (read this before running any skill)

**Briefs & pulse** — `monday-brief`, `friday-brief`, `business-pulse`:
sources are Gmail, Google Calendar, Stripe and Vercel (no CRM/books
yet). Monday brief lands in the existing Monday 07:00 Europe/Oslo
slot. Include: new brief-form emails (QBLOGG), NAVIAR henvendelser,
deploy status, calendar week. Exclude: revenue claims — pre-revenue.

**Finance** — `cash-flow-snapshot`, `close-month`, `month-end-prep`,
`month-heads-up`, `margin-analyzer`, `invoice-chase`: LIMITED. Only
money source is Stripe (no charges yet); there is no bookkeeping
connector. Do not fabricate a close — report "no accounting system
connected" until the owner names one. `invoice-chase`: no invoicing
in use; if invoicing starts, it starts in the accounting system, not
ad hoc. `margin-analyzer`/`price-check`: all current prices are
EXAMPLES; NAVIAR margins must include Stripe Norway fees (see line 1
notes) and the 15–25% commission is an example band, not policy.

**Tax** — `tax-prep`, `tax-season-organizer`: Norwegian regime
(Skatteetaten; MVA only if registered — status UNKNOWN). Deadlines
must be verified against skatteetaten.no or the owner's accountant at
run time; never stated from memory (repo rule: no unverified claims).

**Payroll** — `plan-payroll`: N/A — no employees. NAVIAR helpers are
NOT employees until the employment-status question in
naviar-care/docs/hukuk-kontrol-listesi.md is answered; do not run
payroll planning for helpers.

**Sales & CRM** — `lead-triage`, `call-list`, `sales-brief`,
`crm-cleanup`, `crm-maintenance`, `customer-pulse`,
`customer-pulse-check`: no CRM connected (HubSpot installed, not
connected). Leads live in Gmail: QBLOGG brief-form mails and NAVIAR
contact requests. Triage from Gmail; track in the repo/console, not
an imaginary CRM. NAVIAR user data: alias-only, never health data.

**Marketing** — `run-campaign`, `content-strategy`, `canva-creator`:
defer to the repo's own skills first — QBLOGG content goes through
qblogg-blog-yazisi / qblogg-turev / on-brand (brand rules in
docs/tasarim-sistemi.md); NAVIAR pages ship via naviar-care-ship.
Canva is connected for standalone visuals; respect each venture's
palette. No "guaranteed results" language, ever.

**Legal** — `contract-review`, `review-contract`: primary use is
NAVIAR helper/user agreements; review against
naviar-care/docs/hukuk-kontrol-listesi.md and flag, do not conclude —
counsel decides. Output is not legal advice.

**HR** — `job-post-builder`: used for NAVIAR helper recruitment —
Norwegian language, low-risk task scope, politiattest shown before
assignments (never stored), no health-sector claims.

**Support** — `handle-complaint`, `ticket-deflector`: NAVIAR
complaints follow the Klage flow in naviar-care/admin.html (logged,
followed up, counted toward metric 8 target 0). QBLOGG support is
plain Gmail.

**Reviews** — `quarterly-review`: NAVIAR side reads
naviar-care/docs/pilot-olcum-plani.md metrics (console CSV export);
QBLOGG side reads visibility-monitor output. Pre-revenue: judge
against pilot exit criteria, not revenue targets.

**Router/onboard** — `smb-router`, `smb-onboard`: onboarding answers
come from THIS file; when a fact is UNKNOWN here, ask the owner
rather than assuming.

## Owner to fill in (blocks some workflows until answered)

- Legal form + org number + MVA status for each line (one company or
  two?).
- Accounting system and access.
- Real price lists (QBLOGG packages; NAVIAR CARE pilot fees).
- Bank/payment accounts to reconcile against.
