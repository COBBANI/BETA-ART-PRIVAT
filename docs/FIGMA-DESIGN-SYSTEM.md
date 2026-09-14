# BETA ART — Design System Reference for Figma Integration

> Generated 2026-08-30. Use this document to orient Figma work to the codebase.
> All four sub-projects share the same brand DNA but differ in implementation stack.

---

## 1. Project Structure

```
BETA-ART/                          ← monorepo root
├── beta-art-static/               ← plain HTML/CSS/JS (no build step)
│   ├── beta-art/                  ← Privat archive (light paper theme)
│   ├── beta-art-business/         ← B2B construction (dark operational theme)
│   ├── beta-art-blog/             ← Journal / blog
│   └── beta-art-gallery-event/    ← Galleri og Utstilling Event (new)
├── beta-art-final/                ← React 18 + Vite + Supabase (archive licensing)
│   └── src/
│       ├── components/            ← PlateCard, Header, Footer, LicenseRequestForm
│       ├── pages/                 ← HomePage, PlatePage, AdminPage, …
│       ├── styles.css             ← light paper CSS custom properties
│       └── lib/i18n.tsx
├── beta-art-v8/                   ← Airo SSR + React + Tailwind + shadcn/ui
│   └── src/
│       ├── components/ui/         ← 42 shadcn/ui primitives
│       ├── globals.css            ← HSL token definitions
│       └── pages/
└── beta-art/                      ← docs, reference, source-review archive
    ├── docs/
    └── reference/
```

---

## 2. Design Token Definitions

### 2A. Static Sites (`beta-art-static/*/styles.css`)

All static sub-sites share a single CSS custom property vocabulary defined in each
site's `styles.css` under `:root`. **No token transformation pipeline — raw CSS vars.**

#### Dark Operational Theme (business, gallery-event)

```css
/* beta-art-static/beta-art-business/styles.css */
:root {
  /* Ground */
  --void:       #0F0F0F;
  --surface:    #171614;
  --surface-2:  #1F1D1B;

  /* Edges */
  --edge:       #302C27;
  --edge-soft:  #221F1C;

  /* Text */
  --text:       #F3F0E9;
  --text-2:     #CFCAC0;
  --muted:      #8B857A;

  /* Brand accent */
  --seal:       #8B1A1A;      /* seal red — dark contexts */
  --seal-bright: #C43A2E;     /* hover / active state */

  /* Status */
  --ok:         #7FB69B;
  --error:      #E88C7D;

  /* Typography */
  --f-display:  "Fraunces", Georgia, "Times New Roman", serif;
  --f-body:     "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --f-mono:     "JetBrains Mono", "SFMono-Regular", Menlo, monospace;

  /* Layout */
  --wrap:       1240px;
  --measure:    62ch;
  --ease:       cubic-bezier(.2, .7, .2, 1);

  /* Spacing scale (0.25rem steps) */
  --space-1:    0.25rem;
  --space-2:    0.5rem;
  --space-3:    0.75rem;
  --space-4:    1rem;
  --space-6:    1.5rem;
  --space-8:    2rem;
  --space-12:   3rem;
  --space-16:   4rem;
  --space-20:   5rem;

  /* Mono type sizes */
  --mono-sm:    .75rem;
  --mono-md:    .8125rem;
  --mono-lg:    .875rem;
}
```

#### Light Paper Theme (beta-art archive, beta-art-final)

```css
/* beta-art-final/src/styles.css */
:root {
  --paper:    #f4f0e8;
  --paper-2:  #ebe6dd;
  --ink:      #171512;
  --muted:    #6b665e;
  --line:     #d5cfc4;
  --accent:   #7d3f2d;   /* seal red — warm, lighter on paper */
}
```

### 2B. React + Tailwind + shadcn/ui (`beta-art-v8/src/globals.css`)

Tokens expressed as HSL triples so Tailwind's opacity modifier syntax works:
`bg-primary/50` → `hsl(var(--primary) / 0.5)`.

```css
/* beta-art-v8/src/globals.css */
:root {
  --background:         45 33% 98%;
  --foreground:         0 0% 4%;
  --card:               45 33% 98%;
  --card-foreground:    0 0% 4%;
  --popover:            45 33% 98%;
  --popover-foreground: 0 0% 4%;

  --primary:            0 68% 32%;   /* seal red */
  --primary-foreground: 0 0% 100%;

  --secondary:          42 25% 88%;
  --secondary-foreground: 27 5% 20%;

  --muted:              42 25% 92%;
  --muted-foreground:   27 5% 40%;

  --accent:             42 25% 88%;
  --accent-foreground:  27 5% 20%;

  --destructive:        0 84% 60%;
  --border:             35 17% 86%;
  --input:              35 17% 86%;
  --ring:               0 68% 32%;

  /* Typography */
  --font-sans:    "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-heading: "Fraunces", Georgia, serif;
  --font-serif:   "Fraunces", Georgia, serif;
  --font-mono:    "JetBrains Mono", "Fira Code", monospace;

  /* Radius */
  --radius:        0.5rem;
  --radius-button: calc(var(--radius) - 2px);

  /* Shadow scale */
  --shadow-2xs: 0 1px hsl(0 0% 0% / 0.05);
  --shadow-xs:  0 1px 2px hsl(0 0% 0% / 0.05);
  --shadow-sm:  0 1px 3px hsl(0 0% 0% / 0.1), 0 1px 2px -1px hsl(0 0% 0% / 0.1);
  --shadow-md:  0 4px 6px -1px hsl(0 0% 0% / 0.1), 0 2px 4px -2px hsl(0 0% 0% / 0.1);
  --shadow-lg:  0 10px 15px -3px hsl(0 0% 0% / 0.1);
  --shadow-xl:  0 20px 25px -5px hsl(0 0% 0% / 0.1);
  --shadow-2xl: 0 25px 50px -12px hsl(0 0% 0% / 0.25);
}
```

**Tailwind mapping** (`beta-art-v8/tailwind.config.js`):

```js
theme: {
  extend: {
    colors: {
      border:      'hsl(var(--border))',
      input:       'hsl(var(--input))',
      ring:        'hsl(var(--ring))',
      background:  'hsl(var(--background))',
      foreground:  'hsl(var(--foreground))',
      primary: {
        DEFAULT:    'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      // ... full shadcn token set
    },
    fontFamily: {
      sans:    ['var(--font-sans)'],
      heading: ['var(--font-heading)'],
      serif:   ['var(--font-serif)'],
      mono:    ['var(--font-mono)'],
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
    },
  },
}
```

---

## 3. Typography

| Role       | Family            | Weight | Notes                              |
|------------|-------------------|--------|------------------------------------|
| Display    | Fraunces          | 700    | Serif — hero titles, section heads |
| Body       | Inter             | 400/500| Sans — all running text            |
| Mono       | JetBrains Mono    | 400    | Code, plate numbers, metadata      |

Fonts are loaded from Google Fonts in all static HTML pages and declared as CSS vars
in both the static `styles.css` and the v8 `globals.css`. No local font files are
bundled — ensure Google Fonts URLs are in the CSP `font-src` directive.

---

## 4. Component Library

### 4A. Static Sites — Hand-Written HTML + CSS

No component library. Components are hand-authored HTML blocks styled via CSS custom
properties. Recurring patterns:

- **`.seal-mark` / `.emboss-mark`** — inline SVG aperture/seal logo marks
- **`.plate-card`** — photograph archive card (image, metadata strip, status badge)
- **`.section-header`** — `<hgroup>` with label + heading pattern
- **`.cta-block`** — call-to-action with headline, body, button

### 4B. React Archive (`beta-art-final/src/components/`)

Hand-written React components, no UI library:

| File                  | Purpose                                  |
|-----------------------|------------------------------------------|
| `PlateCard.tsx`       | Photograph plate display with provenance |
| `Header.tsx`          | Site header + language switcher          |
| `Footer.tsx`          | Footer with links                        |
| `LicenseRequestForm.tsx` | License inquiry form (Supabase)       |

### 4C. Airo SSR (`beta-art-v8/src/components/ui/`) — shadcn/ui Primitives

42 Radix UI-based primitives, all customised to the seal-red / warm-paper palette:

```
accordion       alert           alertdialog     aspectratio
avatar          badge           breadcrumb      button
calendar        card            carousel        checkbox
collapsible     command         contextmenu     dialog
drawer          dropdownmenu    form            hovercard
input           inputotp        label           menubar
navigationmenu  pagination      popover         progress
resizable       scrollarea      select          separator
sheet           skeleton        slider          sonner
switch          table           tabs            textarea
toggle          tooltip
```

All primitives are in `beta-art-v8/src/components/ui/<name>.tsx` and use
`class-variance-authority` (cva) for variant slots. Customise via the CSS vars in
`globals.css`, not by editing primitive files directly.

---

## 5. Icon System

### Static Sites

Icons are **inline SVG only** — no icon font, no sprite sheet, no external library.

**Specification:**

```
Viewport:      100×100 (large decorative marks) or 24×24 (UI icons)
fill:          "none"
stroke:        "currentColor"
stroke-width:  4 (100×100 marks) or 1.7 (24×24 UI icons)
stroke-linecap:  "round"
stroke-linejoin: "round"
```

**The aperture mark** (the brand logo, used as favicon and section accent):

```html
<svg class="seal-mark" viewBox="0 0 100 100" aria-hidden="true">
  <g fill="none" stroke="currentColor" stroke-width="4">
    <!-- aperture blades: 6 lines radiating from centre -->
  </g>
  <circle cx="50" cy="50" r="7" fill="var(--seal)"/>
</svg>
```

Inline SVGs in HTML pages carry explicit `aria-hidden="true"` (decorative) or
`role="img" aria-label="…"` (semantic).

### Airo SSR (`beta-art-v8`)

Two icon libraries co-exist:

| Library                  | Used for                          |
|--------------------------|-----------------------------------|
| `lucide-react` v0.454    | UI icons: `X`, `ChevronDown`, `Send`, `Check`, `AlertCircle`, `CheckCircle` |
| `@heroicons/react` v2    | Available; check pages for usage  |

Import pattern:

```tsx
import { X, ChevronDown } from 'lucide-react';
// or
import { Send, CheckCircle } from 'lucide-react';
```

---

## 6. Asset Management

### Static Sites

Assets live beside each sub-site:

```
beta-art-static/beta-art-business/assets/
├── beta-art-logo.svg                 ← primary mark (vector)
├── beta-art-verification-badge.svg   ← verification overlay
├── betaart-logo-reversed.svg         ← light-on-dark variant
├── betaartlogo-archive.svg           ← archive wordmark
├── betaartlogo-reference.png         ← raster reference
├── logo-horizontal-solid.png         ← lockup on solid ground
├── logo-horizontal-transparent.png   ← lockup on transparent ground
├── og.png                            ← Open Graph image (1200×630)
├── ASSET-STATUS.md                   ← provenance and rights record
└── LOGO-USE.md                       ← usage rules
```

Logo SVGs are generated by `scripts/marka-uret.py` (Python, stdlib only).
The script must be reproducible: running it on an empty folder produces byte-identical
output. Font outlines are sampled from the repo's own Inter variable font at `wght=700`.

**OG images:** Each sub-site has an `og.png` at 1200×630 px, referenced via
`<meta property="og:image">`.

**Favicons:** Inline data URI SVGs (no external file request):

```html
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg …%3E…%3C/svg%3E">
```

### React Archive (`beta-art-final/public/`)

```
public/
├── og-beta-art.png        ← 1200×630 OG
├── og-beta-art.svg        ← SVG source
├── robots.txt
└── placeholders/
    ├── hero.svg
    ├── maker.svg
    └── plate-001.svg … plate-012.svg   ← placeholder photograph cards
```

---

## 7. Styling Approach

### Static Sites

- **Single CSS file** per sub-site (`styles.css`); no preprocessor, no modules.
- **CSS custom properties** for all colours, fonts, spacing. Never hardcode hex in rules.
- **Logical properties** throughout: `margin-inline-start` not `margin-left`,
  `inset-inline-start` not `left`. This is mandatory — some future pages may add RTL.
- **No utility classes.** Component styles are scoped by BEM-ish class names
  (`.plate-card`, `.seal-mark`, `.section-header`).
- **Responsive:** `clamp()` on headings, `max-width: var(--wrap)` on page wrapper,
  fluid grid with `repeat(auto-fill, minmax(…, 1fr))`.

### React Archive (`beta-art-final`)

Plain CSS in `src/styles.css` imported globally. Same token vocabulary as static sites
(light paper theme variant). No CSS modules; component styles co-located or global.

### Airo SSR (`beta-art-v8`)

**Tailwind CSS v3** with `tailwindcss-animate` plugin. All design tokens are CSS
custom properties in `globals.css`; Tailwind maps them to utility classes.
Component variants use **`class-variance-authority`**. Dark mode via `class` strategy.

```tsx
// Example: button with seal-red primary colour
<Button variant="default">   // → bg-primary text-primary-foreground
<Button variant="outline">   // → border-input bg-background
<Button variant="ghost">     // → hover:bg-accent hover:text-accent-foreground
```

---

## 8. Responsive & Layout

- **Max content width:** `--wrap: 1240px` (static) / `max-w-7xl` (v8 Tailwind)
- **Reading measure:** `--measure: 62ch` — clamp prose columns at this width
- **Breakpoints (v8/Tailwind):** default Tailwind (`sm:640 md:768 lg:1024 xl:1280`)
- **Easing:** `--ease: cubic-bezier(.2, .7, .2, 1)` — used for all transitions

---

## 9. Frameworks & Build

| Sub-project         | Framework         | Build       | Styling         |
|---------------------|-------------------|-------------|-----------------|
| `beta-art-static/*` | None (plain HTML) | None        | Plain CSS       |
| `beta-art-final`    | React 18 + Vite   | `vite build`| Plain CSS       |
| `beta-art-v8`       | React + Airo SSR  | `vite build`| Tailwind + shadcn |

### `beta-art-final` key deps
```json
"react": "^18.3.1",
"react-router-dom": "^6.26.2",
"@supabase/supabase-js": "^2.45.4",
"zod": "^3.23.8",
"vite": "^5.4.2"
```

### `beta-art-v8` key deps (excerpt)
```json
"@heroicons/react": "^2.2.0",
"lucide-react": "^0.454.0",
"@lexical/react": "^0.43.0",
"@radix-ui/react-dialog": "^1.1.15",
"tailwindcss": "...",
"class-variance-authority": "...",
"clsx": "..."
```

---

## 10. Figma → Code Mapping

When importing a Figma frame into this codebase, map Figma tokens as follows:

| Figma token name          | CSS variable (dark)        | CSS variable (light/v8)        |
|---------------------------|----------------------------|--------------------------------|
| `color/ground/void`       | `--void: #0F0F0F`          | `--background (HSL 45 33% 98%)`|
| `color/ground/surface`    | `--surface: #171614`       | `--card (HSL 45 33% 98%)`      |
| `color/text/primary`      | `--text: #F3F0E9`          | `--foreground (HSL 0 0% 4%)`   |
| `color/text/muted`        | `--muted: #8B857A`         | `--muted-foreground`           |
| `color/brand/seal`        | `--seal: #8B1A1A`          | `--primary (HSL 0 68% 32%)`    |
| `color/brand/seal-bright` | `--seal-bright: #C43A2E`   | `--ring (HSL 0 68% 32%)`       |
| `color/status/ok`         | `--ok: #7FB69B`            | —                              |
| `color/status/error`      | `--error: #E88C7D`         | `--destructive (HSL 0 84% 60%)`|
| `font/display`            | Fraunces 700               | `var(--font-heading)`          |
| `font/body`               | Inter 400                  | `var(--font-sans)`             |
| `font/mono`               | JetBrains Mono 400         | `var(--font-mono)`             |
| `radius/default`          | —                          | `--radius: 0.5rem`             |
| `spacing/wrap`            | `--wrap: 1240px`           | `max-w-7xl`                    |

---

## 11. Code Connect Guidance

When using Figma Code Connect to link components:

- **Static HTML components** have no importable module — link by CSS class name and
  HTML structure pattern.
- **`beta-art-final` components** are in `src/components/`; import path:
  `import { PlateCard } from '@/components/PlateCard'`
- **`beta-art-v8` shadcn primitives** are in `src/components/ui/`; import path:
  `import { Button } from '@/components/ui/button'`
- All icon SVGs in static sites are inline — no importable icon component.
  In v8, use `import { IconName } from 'lucide-react'`.

---

*Last updated: 2026-08-30. Update this file whenever token values, font choices,
or component library decisions change.*
