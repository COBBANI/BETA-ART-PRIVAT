# Figma integration — what this codebase actually is

Written for anyone (or any agent) about to move designs between Figma and this
repository. Read the last section first if you are in a hurry: the write path
is currently closed, and the reason is an account seat, not a technical one.

Every number below was measured, not remembered.

---

## 0. The two facts that decide everything

**1. The Figma account has a View seat.** `whoami` returns
`Tatil Matil · andersen.betul@gmail.com · Tatil Matil's team · seat: View ·
tier: starter`. A View seat can read files. It cannot create them, cannot write
Variables, cannot publish a library. **Every "push tokens to Figma" workflow is
blocked until that becomes an Editor seat.** Nothing in this document works
around that, and nothing should try to.

**2. Most pages here are generated.** They are written once as data in
`tools/generators/` and built. A Figma-to-code flow that writes HTML will have
its work silently erased on the next build. See §7 — this is the single most
important rule in the repository.

---

## 1. Token definitions

**There is no token file.** No DTCG JSON, no Style Dictionary, no Tokens
Studio, no transformation pipeline. Tokens are CSS custom properties declared
in a `:root` block, once per property:

| Where | Tokens in `:root` |
|---|---|
| `index.html` (inline `<style>`) | 28 |
| `beta-art/styles.css` | 34 |
| `beta-art-business/styles.css` | 35 |
| `beta-art-blog/styles.css` | 34 |

**23 are shared by all four** and constitute the actual design system:

```
--f-display --f-body --f-mono
--seal --on-seal --muted
--space-1 --space-2 --space-3 --space-4 --space-5 --space-6
--space-8 --space-10 --space-12 --space-14 --space-16 --space-20
--mono-sm --mono-md --mono-lg
--dur --ease
```

The scales, from `index.html`:

```css
:root {
  /* spacing, 4px base */
  --space-1: .25rem;  --space-2: .5rem;   --space-3: .75rem;  --space-4: 1rem;
  --space-5: 1.25rem; --space-6: 1.5rem;  --space-8: 2rem;    --space-10: 2.5rem;
  --space-12: 3rem;   --space-14: 3.5rem; --space-16: 4rem;   --space-20: 5rem;

  /* small type — three steps, 12px floor */
  --mono-sm: .75rem;    /* 12px — navigation, roles, copyright */
  --mono-md: .8125rem;  /* 13px — labels, buttons, the approval mark */
  --mono-lg: .875rem;   /* 14px — wordmark */

  --dur: 200ms;
  --ease: cubic-bezier(.2, 0, 0, 1);
}
```

Colour is **not** fully shared, by design. Three properties are on paper
(`--paper #FBFAF7`, `--ink #0F0F0F`); the desk inverts to ink
(`--void #0F0F0F`, `--text #F3F0E9`). `--seal #8B1A1A` is constant across all
four and is the only accent.

**If you map these to Figma Variables**, use two collections: one
mode-independent (spacing, type, motion — identical everywhere) and one with
`paper` / `ink` modes for colour.

### The gate you must not break

`tools/tokens.py` fails the build if a custom property is defined twice in one
rule block, if any `var(--x)` does not resolve, or if any `font-size` falls
below 12px. It exists because a generated token block once silently redefined
`--ease` in three stylesheets and changed every transition. **Any tool that
emits tokens into an existing `:root` must diff against what is already there.**

```bash
python3 tools/tokens.py     # must exit 0
```

---

## 2. Component library

**There is none** — no React components, no Web Components, no Storybook, no
component documentation. The de-facto library is a set of class names used
consistently across 97 HTML pages:

| Class | Uses | What it is |
|---|---|---|
| `.wrap` | 640 | the layout container — `width: min(100% - 3rem, 1240px)` |
| `.btn` | 459 | base button; variants `.btn-seal` 223, `.btn-line` 165, `.btn-sm` 104, `.btn-block` 121 |
| `.tag` | 776 | the small mono label above a section |
| `.svc-block` | 306 | a service entry on the desk |
| `.side-card` | 155 | the aside card |
| `.human-mark` | 102 | the approval mark — paired with `.human-mark-note` 98 |
| `.tick-list` | 120 | the checked list |
| `.lead` | 141 | the opening paragraph, `max-width: 62ch` |

Treat these as the component inventory. If a Figma component does not map to
one of them, it is new and needs a decision, not an invention.

---

## 3. Frameworks, libraries, build

There are none, and that is a standing constraint from `CLAUDE.md`:

> The only external dependency on any page is Google Fonts. No bundler, no npm
> install to view a page, no server needed to read one. Keep it that way.

Measured: **no `package.json`, no `node_modules`, no Tailwind config, zero
React/Vue/Svelte imports, 12 hand-written JS files.** The build system is a set
of Python generators plus a Node script that drives a real browser for the
render gate.

**Do not introduce a framework, a CSS-in-JS library, or a token build step to
serve a Figma workflow.** If a Figma integration needs one, the integration is
wrong for this codebase.

---

## 4. Asset management

Eight raster files total, all PNG, all at property roots:

```
og.png                            1200×630   social preview, one per property
apple-touch-icon.png              180×180    home-screen icon, one per property
```

No CDN, no image pipeline, no responsive `srcset`, no WebP. Assets are
committed and served from the same origin. `tools/qc.py` fails on any file over
10 MB in a published folder — the realistic accident on a photography site is a
RAW original landing next to the HTML.

The touch icons are **generated**, not drawn:
`tools/generators/build_touch_icons.py` reads the seal SVG out of the page and
renders it in a browser, so the icon cannot drift from the mark.

---

## 5. Icon system

**189 inline `<svg>` elements. Zero `.svg` files. No icon font, no sprite
sheet, no icon library.**

Every icon is written directly into the HTML, with `aria-hidden="true"` when
decorative:

```html
<svg class="seal-mark" viewBox="0 0 100 100" aria-hidden="true">
  <g fill="none" stroke="currentColor" stroke-width="4">
    <circle cx="50" cy="50" r="46"/>
    <path d="M50 30 75.81 11.92M67.32 40 84.99 47.86…"/>
  </g>
  <circle cx="50" cy="50" r="7" fill="#8B1A1A"/>
</svg>
```

Two conventions that matter:

- **`stroke="currentColor"`** so the mark inherits the surrounding text colour.
  That is why the same SVG works on paper and on ink.
- **The favicon is a `data:` URI**, not a file — zero requests. Keep it that
  way; the apple-touch-icon exists only because iOS ignores SVG favicons.

There is no naming convention because there is no icon set to name. If you
import icons from Figma, inline them and give them `currentColor`.

---

## 6. Styling approach

Plain CSS. One stylesheet per property, plus an inline `<style>` on the hub.
No CSS Modules, no preprocessor.

**Responsive:** 52 `clamp()` declarations for fluid type, and 34 media queries
across the three stylesheets. Breakpoints actually in use:

```
400  460  560  640  720  880  940  980  981  1061  1180
```

They are not a scale, and that is worth knowing before you add one — several
exist to solve a specific overflow at a specific width, and the comment at the
declaration usually says which.

**A cascade rule that has already cost time:** media queries add no
specificity. A later rule beats a narrower breakpoint. Override blocks belong
at the end of the file, and there is a comment there saying so.

---

## 7. Project structure — and the rule that overrides everything

```
/                      hub          4 html, i18n.js, sitemap.xml, og.png
/no/                   hub in Norwegian (generated)
beta-art/              archive      15 html + styles.css + i18n.js + plates.json
beta-art-business/     desk         69 html + styles.css + i18n.js  (+ /no/, 26 pages)
beta-art-blog/         journal      13 html + styles.css + i18n.js
tools/                 14 gates + generators/
docs/                  decisions, reviews, review packets
skill-observations/    the log of mistakes waiting to become gates
```

### Never hand-edit a generated page

From `CLAUDE.md`:

> Most pages are **not written by hand**. They are written once as data in
> `tools/generators/` and generated… **Never hand-edit a generated page.** Edit
> the data table, re-run the builder, re-run the gates.

`tools/generators/README.md` says which builder writes what. The data tables
are `data.py` (25 services), `data_no.py` (their Norwegian), `posts.py`,
`journal.py`, `chrome_i18n.py`.

**For a Figma-to-code flow this is the whole integration contract:** output
goes into a data table or a generator, never into an HTML file. A design handed
straight to `beta-art-business/s-branding.html` is erased the next time
`build.py` runs, and erased silently.

### i18n contract

1 770 `data-i18n` attributes across the site, 12 languages. The pattern is
index-mapped arrays, not objects:

```js
var K = ["label", "h1", "lead", …];        // keys
var V = { "en": [...], "no": [...], … };   // values, same order as K
```

**A new string means adding to `K` and to all 12 arrays in `V`.** `qc.py` fails
if the arrays are different lengths. Norwegian is written, not translated —
`data_no.py` holds its own copy — and `klarsprak.py` gates it against
Språkrådet's plain-language rules.

---

## 8. Before you commit anything

```bash
python3 tools/check.py          # all correctness gates
node  tools/render-check.js     # a real browser, four widths
```

Fourteen gates. All currently exit zero. A design change that breaks one is not
finished, and the gate is usually right — when a 12px type floor was introduced
it reopened a header-overflow bug that had been fixed once before, and
`render-check` went from 0 findings to 83 before it came back to 0.

---

## 9. What is actually possible today

| Direction | Status |
|---|---|
| Figma → read a file, extract tokens/screens | **Works.** View seat is enough. |
| Figma → generate code | Works, but output must go into a generator or data table (§7). |
| Code → push tokens as Figma Variables | **Blocked.** View seat. |
| Code → create or publish a Figma library | **Blocked.** View seat. |
| Round-trip token sync | **Blocked**, and would also need a DTCG source of truth that does not exist yet (§1). |

If Figma is going to become part of this project's workflow, the order is:
an Editor seat, then a DTCG token file generated *from* the CSS custom
properties (not hand-kept alongside them), then Variable sync. Doing it in any
other order produces two sources of truth, which is the failure this repository
is built to avoid.
