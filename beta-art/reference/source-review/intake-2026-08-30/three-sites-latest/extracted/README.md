# BETA ART — three web properties

One brand, three separate concepts, three independently designed static sites.
No build step, no framework, no dependency beyond the brand's three webfonts.

```
index.html                 Entry hub linking the three properties
beta-art/                  Project 01 — the public archive
beta-art-business/         Project 02 — the B2B rights desk
beta-art-blog/             Project 03 — Field Notes, the journal
docs/                      Phase reports per project
```

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000     # then visit http://localhost:8000
```

## Brand system (shared across all three)

Taken from the existing Beta Art identity files, so the three sites read as one company.

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#FBFAF7` | Gallery ground (archive, journal) |
| `--paper-2` | `#F3F0E9` | Secondary surfaces |
| `--ink` | `#0F0F0F` | Type; the ground for Business |
| `--muted` | `#85817A` | Labels, secondary type |
| `--rule` | `#E4E0D8` | Hairline rules |
| `--seal` | `#8B1A1A` | Wax-seal red — verification and decisions only |

- **Display type** — Fraunces (300/400/500)
- **Body type** — Inter
- **Records type** — JetBrains Mono, used for every label, catalogue number and price
- **Mark** — an aperture that is also a seal; the red dot is applied only where a work passed all three tests
- **Signature elements** — the blind-emboss stage (archive hero) and the **accession label** that appears with every plate

Fonts load from Google Fonts with full local fallbacks (Georgia / system sans / system mono), so
the pages render correctly offline — only the typefaces change.

## The three concepts

### Project 01 — `beta-art/` · The archive
Museum standard: bone paper, hairline rules, editorial serif. Fourteen launch plates across five
tiers, each with an accession label; the three verification tests; the 35-category directory in
five sections; licence tiers kr 190 / kr 890 / kr 2 900 / custom.

### Project 02 — `beta-art-business/` · The rights desk
The same brand with the gallery lights off: ink ground, grid field, mono data rows. Built on the
Norwegian market map — 30+ buying industries in four tiers, ten priority segments — plus packages,
framework agreements (rammeavtale), an audit-answer block and an enquiry form.

### Project 03 — `beta-art-blog/` · Field Notes
A periodical: centred masthead, double rules, numbered entry list, two-column page, dark reading
mode and a reading-progress bar on the essay page. Content comes from the working method — the
three tests, shot planning, light this far north, licence pricing.

## Shared behaviour

Each site ships its own `script.js` (vanilla, IIFE, no dependencies) implementing only what that
concept needs: sticky header state, active-section nav, reveal-on-scroll (disabled under
`prefers-reduced-motion`), animated figures, filters, form validation with inline errors and ARIA
live status, plus a theme toggle (journal) and a notice banner (business).

Accessibility: skip links, visible focus rings, `aria-pressed` / `aria-expanded` on controls,
`role="alert"` errors, `aria-live` status, reduced-motion support, and semantic landmarks with a
single `<h1>` per page.

SEO: per-page title and description, canonical, Open Graph and Twitter cards, and JSON-LD
(`WebSite` + `Store` + `ImageObject`, `Organization` + `Service`, `Blog` + `Article`).

## Before launch

1. Replace every `.plate-frame` / `.frame` placeholder with the verified original `<img>` (each one
   is marked with a *replacement point* comment) and write real `alt` text.
2. Connect the three forms to a real endpoint — they validate client-side and then stop.
3. Confirm prices and licence terms, then remove the development-preview notice bars.
4. Point canonicals and OG URLs at the live hosts and add real `og-cover.jpg` images.
5. Add `robots.txt` and a sitemap once the URLs are final.

Phase-by-phase reports for each project are in [`docs/`](docs/).
