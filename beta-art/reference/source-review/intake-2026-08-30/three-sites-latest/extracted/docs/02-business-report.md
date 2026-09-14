# Project 02 — Beta Art Business, the rights desk

**Deliverable:** `beta-art-business/index.html` + `styles.css` + `script.js`
**Concept:** the B2B side of the archive — cleared rights, subscriptions, framework agreements and
commissioned capture for Norwegian buyers.
**Status:** design and build complete; awaiting confirmed pricing and a CRM/inbox endpoint.

## Phase 1 — Discovery

Source: the internal market document *Bransjer som kjøper bilder* — 30+ industries ranked in four
tiers, plus a top-ten priority customer list with a stated reason and action per segment.

That document is a sales asset, not just research. The site is built directly on it, so a visitor
recognises their own segment within seconds.

## Phase 2 — Research

- **Customer:** agencies, e-commerce teams, in-house marketing, public bodies, and the Norwegian
  industries with budget and no authentic coverage (offshore, maritime, tourism, health).
- **Problem they pay to solve:** they need imagery they can use commercially *and* defend — under
  disclosure rules, procurement rules or an editorial standards review.
- **Current solution:** international stock plus ad-hoc freelance shoots, with rights scattered
  across e-mail threads.
- **Willingness to pay:** established by the tiering — Tier 1 buys often, Tier 3 has the largest
  budgets and the thinnest supply.

## Phase 3 — Offer design

Three ways to buy, deliberately outcome-shaped rather than technology-shaped:

| Package | Price (draft) | For |
| --- | --- | --- |
| Startup | kr 9 900 / yr · kr 2 900 / project | Small teams, 12 plates |
| Agency | kr 48 000 / yr · kr 6 900 / project | 60 pooled plates, all paid media, Nordics |
| Enterprise & public | On request | Framework agreement, exclusivity, commissions, DAM delivery |

A billing toggle swaps annual and per-project figures in place, so a visitor never has to hunt for
the number that matches how they buy.

## Phase 4 — Information architecture

Hero (with a live-looking rights record) → market map (four tiers, filterable) → figures → ten
priority segments → packages → framework agreements + the audit-answer block → assurance → FAQ →
enquiry form.

This follows the conversion order: what is this → is it for me → what does it cost → can it survive
procurement/audit → what if I object → contact.

## Phase 5 — Design decisions

| Decision | Reason |
| --- | --- |
| Inverted palette: ink ground, bone type | Same brand, different room — the desk is not the gallery |
| Faint grid field behind the hero | Operational, infrastructural; reads as a system, not a portfolio |
| The rights-record card as the hero's second element | Shows the actual deliverable instead of describing it |
| "Training data — excluded by contract" in green | The single strongest differentiator, stated where buyers look first |
| Mono data rows, sharp corners, 1 px seams | Reads like a register; distinct from the archive's paper |
| Seal red only on CTAs, tier labels and figures | Decisions are red; everything else is quiet |

## Phase 6 — Build

`script.js` adds: sticky-bar state, active-section nav, reveal-on-entry, count-up figures, the tier
filter, the billing toggle, enquiry-form validation (including a consent checkbox with its own
error), a dismissible privacy notice stored in `localStorage`, and back-to-top.

Verified headlessly at 1440 px and 390 px: no JavaScript errors, no horizontal overflow.

## Phase 7 — SEO

Canonical `https://betaart.no/business/`; OG and Twitter cards; JSON-LD `Organization` (with
`parentOrganization` pointing at Beta Art) + `Service` describing licensing, clearance and
commissioned capture. Industry names appear as crawlable text in both English and their Norwegian
forms in the ticker — the phrases these buyers actually search.

## Phase 8 — Open items

1. Confirm package prices and minimum terms; remove "draft figures" note.
2. Wire the enquiry form to the desk inbox or CRM, with an autoresponder.
3. Add real case notes once two or three agreements can be described publicly.
4. Produce the Norwegian-language version — public buyers will need bokmål documentation.
5. Add a downloadable one-page rate card as the lead magnet.

## Next action

Contact the two Tier 1 segments with the highest fit (advertising agencies in Oslo/Bergen/Stavanger,
and Norwegian online retailers) using the Agency package as the opening offer — the page and the
pricing needed to close that conversation now exist.
