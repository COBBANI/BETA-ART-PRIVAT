# Project 03 — Field Notes, the journal

**Deliverable:** `beta-art-blog/index.html`, ten `j-*.html` essays, `feed.xml`, `styles.css`, `script.js`
**Concept:** the Beta Art journal — how a verified archive gets built, written from inside it.
**Status:** ten essays published, each on its own URL, with an RSS feed; awaiting a newsletter provider.

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

Ten entries in five topics, filterable on the page. Every one of them is written in
full and has its own page — an earlier build advertised ten headlines that all
resolved to the same file, which is a promise the site could not keep:

| Topic | Purpose |
| --- | --- |
| Provenance | The trust argument — accession labels, content credentials, withheld locations |
| Method | The working discipline — three tests, filing habits, access before shooting |
| Light | Genuinely useful field knowledge — blue hour this far north, metering fog |
| Trade | The economics — pricing "just for social", pictures worth avoiding at launch |
| Market | Who actually buys photography in Norway, in four tiers by purchase frequency |

Lead essay: *The picture is not the proof. The paperwork is.*

One entry corrects the site in public. *How long blue hour actually lasts at 59° north*
carries a computed twilight table, and the numbers contradict what an earlier version of
the index claimed — twilight at this latitude is longest in midwinter and shortest at the
equinoxes, not the other way round. The card on the index was rewritten to match the
table rather than the table quietly dropped.

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

Canonical URLs on the preview host, switchable to the real domain in one command
(`python3 tools/domain.py --set betaart.no`); OG and Twitter cards; JSON-LD `Blog` on the
index and `Article` on every essay; an RSS feed at `/feed.xml`, derived from the pages
rather than maintained beside them. Each entry title is a real query someone would type,
and every essay cross-links to the archive and the business desk — internal links carrying intent.

## Phase 7 — Open items

1. Connect the newsletter form to a provider and write the welcome letter. Until then the
   form is honest about storing nothing, and the RSS feed is the working subscription.
2. Add author byline detail once the archive is public under a real name.
3. Repurpose each essay into a LinkedIn post and a newsletter issue — one research pass,
   three assets.
4. Replace the placeholder figures. Every essay carries a gradient where a plate belongs;
   the captions already name the accession numbers they are waiting for.
5. Norwegian versions of the essays, following the `/no/` pattern used on the business site.

## Next action

Point the archive's verification section at *The three tests every frame has to pass*. It is now
a real page, it is the piece that converts a curious reader into someone who trusts the licence,
and nothing on the archive links to it yet.
