# The team, measured against what exists

Your twenty-role model is right, and it is the reason most agency websites are
worse than they look: they are made by designers and developers only, so the
strategy, the service, the trust and the law arrive late or never.

This takes the twenty roles and does the one thing an org chart normally does
not — it holds each of them against **this repository, today**, and says what
already exists, what is half-done, and what has not been started. A chart of
roles you have not hired is a wish. A chart with the work measured against it
is a plan.

Counted from the repo at the time of writing: 100 pages, 26 Norwegian pages,
17 tooling scripts, 9 automated gates, 14 documents, 45 commits, 6 pages with a
form, **0 lines of backend, 0 real photographs, 0 analytics**.

---

## The twenty roles, against the work

| # | Role | On this project | State |
|---|---|---|---|
| 1 | Product Manager | Deciding what ships and in what order; the source-of-truth documents | **Done, by you.** The master prompt, the checklist and the site-content pack are exactly this artefact |
| 2 | Business Strategist | Three properties, four revenue lines, the price ladder, the payment architecture | **Mostly done.** `docs/05` sets the model; the one open decision is merchant-of-record vs Stripe, split by property |
| 3 | Service Designer | What actually happens from enquiry to delivered file: quote → scope → work → invoice → licence | **Half.** The quote flow and the seven-step process exist on the page. Nothing behind them exists |
| 4 | UX Researcher | Talking to real buyers before building more | **Not started, and it is the biggest gap.** Every word on the site is a hypothesis |
| 5 | UX Designer | Site architecture, the 20-point structure, the guided quote flow, the finder | **Done.** 100 pages with a real information architecture |
| 6 | UI Designer | The visual system across four properties | **Done, with a known debt** — 63 font sizes, 40 spacing values, four names for the same component |
| 7 | Brand Designer | The mark, palette, typography, the ✓ HUMAN APPROVED seal | **Done.** Weak point: the mark's colour is hard-coded in the SVG rather than following the theme |
| 8 | Copywriter / UX Writer | Every word on 100 pages, in English and Norwegian | **Done, with one correction.** Norwegian is written, not translated — but the *lead paragraph* on all 25 Norwegian service pages was machine-assembled from the meta description until this round. `tools/klarsprak.py` now measures the Norwegian; a native klarspråk review is still owed, and `docs/11` is the packet for it |
| 9 | Frontend Developer | Static HTML/CSS/JS, no framework, no build step | **Done** |
| 10 | Backend Developer | Accounts, payments, forms, the consent record | **Zero.** This is the single hardest blocker: six forms exist and not one of them stores anything |
| 11 | Full-Stack / Tech Lead | Architecture, the generators, the gates | **Done** — the site is generated from data files, so nothing drifts |
| 12 | Mobile Developer | An app | **Not needed yet.** The site is responsive and verified at 320–1600px. An app before a backend is a way to have two broken things |
| 13 | SEO Specialist | Sitemaps, canonicals, hreflang, structured data, per-language URLs | **Done.** Blocked only by `x-robots-tag: noindex` on `*.vercel.app` until a real domain is attached |
| 14 | CRO Specialist | Turning a visitor into an enquiry | **Not started**, and it cannot start: there is nothing to measure |
| 15 | Data Analyst | What people do on the site | **Not started.** No analytics is installed, and the privacy policy names a processor that does not exist — that has to be fixed either way |
| 16 | QA / Test Engineer | Testing on real devices | **Automated part done** — nine gates, one of which opens every page in a real browser at four widths. The human part, on real phones, is not done |
| 17 | Accessibility Specialist | WCAG 2.2 AA | **Done and measured.** Contrast computed rather than eyeballed, 24px targets, keyboard focus restored, dark-mode flash fixed |
| 18 | Cybersecurity Specialist | CSP, HSTS, frame protection, PCI posture | **Headers done.** The real work starts the day a payment or a login exists |
| 19 | GDPR / Privacy Specialist | Lawful basis, retention, granular consent, notice-and-action | **Done to the limit of a static site.** `docs/09`, the release form, the report form, sections 12–13 of the legal notice |
| 20 | Growth / Marketing | Getting anyone to arrive | **Not started.** Correctly — there is nothing to buy yet |

---

## What that table actually says

Roles 5, 6, 7, 8, 9, 11, 13, 17, 19 are **substantially done**. That is nine of
twenty, and they are the ones that produce artefacts a machine can check.

Roles 4, 10, 14, 15, 20 are **at zero**. That is not laziness in the sequencing.
Four of the five are blocked by the same thing.

**The blocker is role 10.** Six forms exist — quote, contact, newsletter, model
release, notice, download request — and not one of them stores anything. Until
that changes:

- the CRO specialist has nothing to optimise
- the data analyst has nothing to analyse
- growth would spend money driving people to a form that loses them
- and the model release, which is a legal record, is not a record

One backend, and five roles unblock at once. Nothing else on this list has that
ratio.

**The exception is role 4.** UX research is blocked by nothing. It needs ten
conversations with people who might actually pay — a Norwegian agency, a small
shop owner, a photo buyer — and it is the only role that can invalidate the
other nineteen. Every claim on 100 pages is currently a hypothesis written
carefully. Careful is not the same as tested.

---

## The core team, corrected for this project

Your 7–9 is right in size. I would change two seats:

| Seat | Why |
|---|---|
| Product Manager | You. Already doing it |
| **Backend Developer** | First hire, not a middle one. It unblocks five roles |
| Full-Stack / Tech Lead | Can be the same person at this size |
| Service Designer | The gap between "the page says 48 hours" and "someone answers in 48 hours" |
| UX/UI Designer | Part-time. The system exists; it needs maintaining, not inventing |
| UX Writer | Part-time. Same reason |
| **Growth/SEO** | **Later than your list has it.** Traffic to a site that cannot take money is a cost |
| QA / Security consultant | Day rate, at the payment milestone |
| **GDPR consultant** | **Add this seat.** A few hours from a Norwegian lawyer on `docs/09` and the licence terms closes the largest unquantified risk in the project |

The two seats your list has that I would not fill yet: **Mobile Developer** and
**Conversion Specialist**. Both are correct roles at the wrong time.

---

## The order to hire in

Tied to revenue, not to the shape of the chart.

1. **A lawyer, for a few hours.** Not a hire. `docs/09` Tier 3 and the licence
   terms. Cheapest risk reduction available, and it gates everything that
   involves selling a photograph of a person.
2. **UX research, ten conversations.** Can be you. Before more is built.
3. **Backend developer.** Forms that store, payments that clear, a consent
   record that exists. Five roles unblock.
4. **Service designer**, once there is a real order to design around.
5. **Analytics**, the day the backend ships — and the privacy policy corrected
   the same day.
6. **Growth**, when there is something to buy and a number that says the page
   converts.
7. **Everything else**, as the work demands it.

---

## What I cannot be

I have filled a good deal of 5, 6, 8, 9, 11, 13, 16, 17 and 19 in this
repository, and some of 1, 2 and 7. Three things on your list I cannot do, and
it is worth being exact about which:

- **UX research (4).** I can write the interview guide. I cannot be the ten
  people. Nothing I produce substitutes for a Norwegian shop owner saying "I
  would never pay that."
- **Trust & Safety judgement.** I can build the notice form and the policy —
  both exist. Deciding a contested case, where someone claims a photograph
  harms them and the law is unclear, is a person's job with a person's
  accountability.
- **Legal sign-off (19).** I checked the provisions rather than paraphrasing
  them, and corrected two claims that were wrong. That is research, not advice,
  and it does not carry liability. A lawyer's does.

---

## One thing in your note that needs an answer

You wrote: *"if you are developing a system that brings elderly people, family
members and service providers together on one platform"* — and for that system,
Service Designer, Accessibility, Trust & Safety and GDPR become critical.

That is completely right, and it describes **a different product** from the
three properties in this repository. A care-coordination platform is a
different risk profile, a different regulatory position (health-adjacent data,
vulnerable users, duty of care) and a different team shape.

So: is that a fourth Beta Art property, a separate company, or was it an
example? The answer changes the hiring order above, and it changes it a lot —
that platform needs the Trust & Safety and Accessibility seats **first**, where
a photography archive needs them **carefully but later**.
