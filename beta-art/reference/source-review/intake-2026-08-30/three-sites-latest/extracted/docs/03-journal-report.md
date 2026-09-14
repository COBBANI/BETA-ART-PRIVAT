# Project 03 — Field Notes, the journal

**Deliverable:** `beta-art-blog/index.html`, `post.html`, `styles.css`, `script.js`
**Concept:** the Beta Art journal — how a verified archive gets built, written from inside it.
**Status:** design and build complete, one full essay published; awaiting a newsletter provider.

## Phase 1 — Discovery

Source: the launch shot list (`skuddliste`) — the three admission tests, tiers A–E with concrete
shoot ideas, the "pictures to avoid" table, the season strategy, the equipment notes and the
per-plate workflow.

That document is already the editorial calendar. Every entry on the site maps to a real working
question rather than an invented content topic.

## Phase 2 — Why the journal exists commercially

It is not a hobby blog. It does three jobs:

1. **Proof of standard.** Buyers reading the method trust the archive more than they would trust a
   claims page.
2. **Organic acquisition.** Provenance, C2PA, licensing terms and Norwegian light are searchable
   topics with a small, high-intent audience.
3. **List building.** The newsletter converts readers into people who can be told when new plates
   land — the cheapest route back to the archive and the desk.

## Phase 3 — Editorial plan

Eight entries in four topics, filterable on the page:

| Topic | Purpose |
| --- | --- |
| Provenance | The trust argument — accession labels, content credentials, withheld locations |
| Method | The working discipline — three tests, filing habits, access before shooting |
| Light | Genuinely useful field knowledge — blue hour this far north, metering fog |
| Trade | The economics — pricing "just for social", pictures worth avoiding at launch |

Lead essay published in full: *The picture is not the proof. The paperwork is.*

## Phase 4 — Design decisions

| Decision | Reason |
| --- | --- |
| Newspaper masthead with dateline and issue number | A periodical, not a feed; signals ongoing publication |
| Double rules and a numbered entry list | Distinct from the archive grid and the desk's data rows |
| Fraunces for body copy on this site only | It is the reading site; long-form deserves the serif |
| Two-column page with a sticky sidebar | Room for the shot-list index and the plate of the month |
| Dark reading mode with a remembered preference | People read essays at night; the archive does not need this |
| Reading-progress bar on the essay page only | Useful where there is length to measure, noise elsewhere |
| Seal red on kickers, drop cap and pull quote | Brand continuity without competing with the text |

## Phase 5 — Build

`script.js` handles: theme toggle with `localStorage` (falling back to `prefers-color-scheme`),
mobile menu, reading progress on essay pages, reveal-on-entry, combined search + topic filtering
with an empty state, and newsletter validation with an `aria-live` status.

Verified headlessly at 1440 px and 390 px: no JavaScript errors, no horizontal overflow.

## Phase 6 — SEO

Canonical URLs under `https://betaart.no/field-notes/`; OG and Twitter cards; JSON-LD `Blog` on the
index and `Article` on the essay. Each entry title is written as a real query someone would type,
and every essay cross-links to the archive and the business desk — internal links carrying intent.

## Phase 7 — Open items

1. Connect the newsletter form to a provider and write the welcome letter.
2. Publish the remaining seven entries; the excerpts are already the briefs.
3. Add per-entry pages (`post.html` is the working template) and an RSS feed.
4. Add author byline detail once the archive is public under a real name.
5. Repurpose each essay into a LinkedIn post and a newsletter issue — one research pass, three assets.

## Next action

Write entry two, *The three tests every frame has to pass* — it is the piece the archive's
verification section links to, and the one that converts a curious reader into someone who trusts
the licence.
