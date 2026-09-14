# Project 01 — Beta Art, the public archive

**Deliverable:** `beta-art/index.html` + `styles.css` + `script.js`
**Concept:** museum-standard archive of verified human photography, licensed direct from the maker.
**Status:** design and build complete; awaiting real plates, live prices and a form endpoint.

## Phase 1 — Discovery

Sources used: the existing Beta Art identity files (`beta-art-v3.html`, `beta-art-mark_1.html`),
the category directory (35 categories in 5 sections), and the launch shot list (14 plates, tiers A–E,
three admission tests).

Position established: this is not a stock library. It is a small archive whose value is the record
behind each frame, sold to buyers who need to answer "was this generated?" in writing.

## Phase 2 — Research

- **Customer:** art buyers, editors and marketers who need imagery that is provably human-made.
- **Existing alternative:** international stock libraries — cheap, generic, increasingly unable to
  certify provenance.
- **Differentiator:** RAW original + capture record + signed licence, all created before anyone asks.
- **Objection to remove on the page:** "is this just expensive stock?" Answered by the three tests
  and the visible accession label.

## Phase 3 — Information architecture

Hero → verification (three tests) → the archive (14 plates, filterable by tier) → figures →
category directory → licensing → photographer → FAQ → contact.

One `<h1>`. Every section answers a buyer question in order: what is this, why trust it, what can I
license, what does it cost, who made it, what if I still have doubts, how do I ask.

## Phase 4 — Design decisions

| Decision | Reason |
| --- | --- |
| Bone paper `#FBFAF7`, ink `#0F0F0F`, hairline rules | Gallery wall, not a SaaS landing page |
| Seal red used only on marks, prices and errors | The red *means* verified; spending it elsewhere devalues it |
| Fraunces at 300 for the H1 | Editorial authority without shouting |
| JetBrains Mono for every record | Catalogue numbers should look like catalogue numbers |
| Blind-emboss stage in the hero | Signature element from the identity files, carrying the aperture-seal mark |
| Accession label under each plate | The archive's proof made visible on the page itself |
| CSS-gradient placeholders instead of stock photos | Never ship borrowed imagery on a site about provenance |

## Phase 5 — Build

Static HTML/CSS/JS. `script.js` adds: sticky-header state, active-section nav, scroll progress,
reveal-on-entry, count-up figures, tier filter with an empty state, licence-form validation with
inline `role="alert"` errors and an `aria-live` status, and back-to-top.

Verified headlessly at 1440 px and 390 px: no JavaScript errors, no horizontal overflow, all
in-page anchors resolve.

## Phase 6 — SEO

Title and description carried over from the brand files; canonical `https://betaart.no/`; OG and
Twitter cards; JSON-LD `WebSite` + `Store` (price range kr 190 – kr 2 900, NOK, Vipps/Apple Pay) +
a sample `ImageObject` with `acquireLicensePage`. Category names are rendered as crawlable text —
they are the long-tail keywords for this market.

## Phase 7 — Open items

1. Replace 14 placeholder frames with verified originals; write real alt text per plate.
2. Confirm licence prices, then delete the preview notice bar.
3. Connect the licence form to the licensing inbox.
4. Add `og-cover.jpg`, `robots.txt`, sitemap.
5. Decide whether the Norwegian-language version is a second locale or a separate build.

## Next action

Shoot the three highest-ROI plates from the launch list (A1 fisher, B2 process series, C1 known
location out of season) and drop them into the grid — the layout already expects their labels.
