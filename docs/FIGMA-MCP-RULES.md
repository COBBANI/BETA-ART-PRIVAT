# BETA-ART — Figma MCP Integration Rules

> Measured and written 2026-08-30. Every token, path and value verified against live source files.  
> When a Figma design is brought in via MCP, map its decisions onto the sub-project listed below —
> **never blend conventions across sub-projects.** Each sub-project is an independent design system.

---

## 0. Sub-project Map

| Dir | Product | Stack | Design system owner |
|---|---|---|---|
| `/` (root) | **QBLOGG** | Vanilla HTML/CSS/JS | `assets/css/main.css` |
| `beta-art/` | **Beta Art** | React 19 + TanStack + Tailwind v4 | `beta-art/src/styles.css` |
| `naviar/` | **NAVIAR CARE** | Next.js (source TBD) | See §4 |
| `agents/eve-chat-template/` | **Eve Chat** | Next.js + Tailwind v4 + eve | `agents/eve-chat-template/app/globals.css` |
| `agents/eve-slack-agent/` | **Eve Slack** | TypeScript (no UI) | — |

---

## 1. Token Definitions

### 1A — QBLOGG root (`assets/css/main.css`)

Single source. Plain CSS custom properties, no build step, no DTCG/Style Dictionary.

#### Color palette

```css
/* Light mode :root */
--bg:           #ffffff;
--bg-soft:      #f6f7fb;
--bg-card:      #ffffff;
--text:         #14161c;
--text-muted:   #5b6172;
--border:       #e4e7f0;
--brand:        #082C54;   /* Midnight Navy */
--brand-2:      #00D8C2;   /* Electric Aqua — DECORATION ONLY on light bg */
--brand-soft:   rgba(8,44,84,.08);
--on-brand:     #ffffff;   /* 13.2:1 on --brand */
--brand-2-ink:  #0a7d72;   /* Accessible aqua text, 5.0:1 on white */
--logo-ink:     #082C54;
--danger:       #b3261e;   /* 6.3:1 on white */
--shadow:       0 1px 2px rgba(16,20,40,.04), 0 12px 32px rgba(16,20,40,.07);
--shadow-lg:    0 2px 4px rgba(16,20,40,.05), 0 24px 60px rgba(16,20,40,.12);
--radius:       16px;
--radius-sm:    10px;
--maxw:         1140px;

/* Dark mode html[data-theme="dark"] */
--bg:           #0c0e14;
--bg-soft:      #12141c;
--bg-card:      #151823;
--text:         #eef0f6;
--text-muted:   #9ea5b9;   /* 7.2:1 on --bg-card */
--border:       #242838;
--brand:        #00D8C2;   /* Navy swaps to Aqua — navy is invisible on dark */
--brand-2:      #7ce9dd;
--brand-soft:   rgba(0,216,194,.13);
--on-brand:     #08202f;
--logo-ink:     #ffffff;
--brand-2-ink:  var(--brand-2);
--danger:       #f28b82;
```

**Critical constraint: `#00D8C2` on white = 1.9:1 — fails WCAG AA.**
- Use `--brand-2` only for decorative shapes/borders/icons on light bg.
- For aqua-tinted text on light bg: always `--brand-2-ink` (`#0a7d72`, 5.0:1).
- For text on `--brand` (navy): always `--on-brand` (`#fff`, 13.2:1).

#### Type scale (8 steps)

```css
--fs-2xs:  .76rem;
--fs-xs:   .80rem;
--fs-sm:   .85rem;
--fs-md:   .92rem;
--fs-base: .95rem;
--fs-lg:   1rem;
--fs-xl:   1.12rem;
/* Headings live outside the scale — clamp() values: */
/* h1: clamp(2.1rem, 5.4vw, 3.6rem)  h2: clamp(1.6rem, 3.4vw, 2.35rem) */
```

#### Font stack

```css
--font: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue',
        Arial, 'Noto Sans', 'Noto Sans Arabic', 'Noto Sans Devanagari',
        'Noto Sans SC', sans-serif;
```

Inter is **self-hosted** from `assets/fonts/` (subset, WOFF2).  
Do not load Inter from Google Fonts in QBLOGG pages — it is already in the font stack.

#### Spacing

No spacing tokens. Layout uses Flexbox/Grid with `gap`. The `.container` class sets `max-width: var(--maxw)` with `padding-inline: 1.5rem`. Do not write `margin-left`/`margin-right` — use `margin-inline-*` for RTL safety.

---

### 1B — Beta Art (`beta-art/src/styles.css`)

Tailwind v4. Tokens declared in `@theme inline {}` and `:root {}`.  
Philosophy: **museum archive, sharp corners, warm paper, crimson accent.**

```css
/* @theme inline — Tailwind v4 design tokens */
--radius-sm: 0;
--radius-md: 0.125rem;
--radius-lg: 0.125rem;
--radius-xl: 0.125rem;

--font-display: "Fraunces", ui-serif, Georgia, serif;
--font-sans:    "Inter", ui-sans-serif, system-ui, sans-serif;
--font-mono:    "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;

/* :root — shadcn/ui CSS variable convention */
--radius:                 0.125rem;   /* near-zero, intentionally sharp */
--paper:                  #fbfaf7;    /* warm off-white */
--ink:                    #0f0f0f;    /* near-black */
--background:             #fbfaf7;
--foreground:             #0f0f0f;
--card:                   #f3f0e9;    /* warm beige */
--card-foreground:        #0f0f0f;
--popover:                #fbfaf7;
--popover-foreground:     #0f0f0f;
--primary:                #0f0f0f;
--primary-foreground:     #fbfaf7;
--secondary:              #f3f0e9;
--secondary-foreground:   #1f1d1b;
--muted:                  #f3f0e9;
--muted-foreground:       #85817a;
--accent:                 #8b1a1a;    /* dark crimson — the only hue */
--accent-foreground:      #fbfaf7;
--destructive:            #8b1a1a;
--destructive-foreground: #fbfaf7;
--border:                 #e4e0d8;
--input:                  #e4e0d8;
--ring:                   #8b1a1a;
```

**No dark mode** — Beta Art is intentionally single-palette (museum-print aesthetic).

Custom utilities (apply with `@apply` or directly as classes):
- `label` — uppercase mono caption text, 0.6875rem, 0.18em spacing
- `display` — Fraunces 400, −0.02em tracking, 1.02 line-height
- `rule-top` — 1px solid border-top
- `focus-ring` — 2px crimson outline
- `btn-ink` / `btn-outline-ink` — the two button styles
- `plate-frame` — image card with 1.018 hover scale (700ms cubic)

---

### 1C — Eve Chat Template (`agents/eve-chat-template/app/globals.css`)

Tailwind v4 + shadcn/ui. oklch color space. **Achromatic palette** (no brand hue — zero chroma).  
Dark mode via `.dark` class (not `data-theme`).

```css
/* @theme inline */
--font-sans:  "Geist", "Geist Fallback", ui-sans-serif, system-ui, sans-serif;
--font-mono:  "Geist Mono", "Geist Mono Fallback", ui-monospace, ...;
--radius:     0.625rem;   /* 10px */

/* Light :root,.light — oklch */
--background:          oklch(0.971 0 0);   /* near white */
--foreground:          oklch(0.16 0 0);    /* very dark */
--card:                oklch(1 0 0);       /* white */
--primary:             oklch(0.19 0 0);    /* near black */
--secondary:           oklch(0.94 0 0);
--muted:               oklch(0.94 0 0);
--muted-foreground:    oklch(0.6 0 0);
--accent:              oklch(0.94 0 0);
--destructive:         oklch(0.577 0.245 27.325);  /* red */
--border:              oklch(0.916 0 0);
--ring:                oklch(0.708 0 0);

/* Dark .dark — oklch */
--background:          oklch(0.145 0 0);
--foreground:          oklch(0.985 0 0);
--card:                oklch(0.205 0 0);
--primary:             oklch(0.922 0 0);
--muted-foreground:    oklch(0.708 0 0);
--destructive:         oklch(0.704 0.191 22.216);
--border:              oklch(1 0 0 / 10%);
--ring:                oklch(0.556 0 0);
```

Theme toggle: add/remove `.dark` class on `<html>`. Custom Tailwind variant:  
`@custom-variant dark (&:where(.dark, .dark *))`.

Special: `.shimmer-text` — `background-clip: text` shimmer animation for AI response states.

---

## 2. Component Library

### QBLOGG root

No component library — all UI is hand-written CSS + DOM manipulation in `assets/js/app.js`.  
Component patterns are class-based: `.card`, `.btn`, `.pill`, `.section`, `.hero`, `.nav`, `.footer`.  
No Storybook. No component isolation — everything is page-scope.

When importing a Figma design into QBLOGG:
1. Map Figma color styles → `var(--brand)`, `var(--text)`, etc.
2. Map Figma text styles → `var(--fs-*)` scale or `clamp()` for headings.
3. Write new CSS in `main.css` under the relevant section (not inline).
4. Never add a `<style>` block to an HTML page — styles belong in `main.css`.
5. Any visible text must use `data-i18n` + `i18n.js` — hard-coded strings are YEDEKs (fallbacks only).

### Beta Art

shadcn/ui (new-york style) — full Radix UI primitive suite in `beta-art/src/components/ui/`.  
Higher-level page components in `beta-art/src/components/`:
`SiteHeader`, `SiteFooter`, `LegalPage`, `Breadcrumbs`, `DevelopmentNotice`,
`LicenseRequestForm`, `ProvenancePanel`, `TrustStrip`.

Icons: `lucide-react` 0.575.0. Import: `import { IconName } from 'lucide-react'`.

Forms: `react-hook-form` + `zod` + `@hookform/resolvers`. Always validate with zod schema.

When mapping Figma into Beta Art:
1. Use shadcn/ui primitives — do not write a custom button if `<Button>` exists.
2. Apply `display` utility for Fraunces serif headings, `label` for uppercase captions.
3. Keep everything sharp — `rounded-none` or `rounded-sm` only; no `rounded-lg`.
4. Use `--accent` (`#8b1a1a` crimson) sparingly — it is the single hue in the entire palette.
5. Grid: TanStack Router `<Link>` for navigation, never `<a href>` directly.

### Eve Chat Template

shadcn/ui + `eve` framework. Read `node_modules/eve/dist/docs/public/` before modifying agent logic.  
Components follow Next.js App Router conventions (`app/`, `components/`).

When mapping Figma into Eve Chat:
1. All styling through Tailwind v4 utility classes — no inline styles.
2. Dark mode via `.dark` class on root — all token pairs must have both light and dark values.
3. Geist is the sole typeface (loaded via Next.js font system, not Google Fonts).
4. No accent hue — the UI is deliberately achromatic; new colored elements need justification.

---

## 3. Frameworks & Libraries

### QBLOGG root

| Layer | Choice |
|---|---|
| Framework | None — pure HTML/CSS/JS |
| Styling | Vanilla CSS custom properties |
| Build | None — files copied directly to Vercel `dist/` by `vercel.json` buildCommand |
| Icons | Custom inline SVG, `ICONS` object in `app.js` |
| Fonts | Self-hosted Inter subset (WOFF2), Noto family fallbacks |
| i18n | Custom `QB_I18N` object in `i18n.js` |
| Analytics | None currently |

Script load order (immutable): `config.js` → `i18n.js` → `posts.js` → `app.js`.  
All inter-script communication is via `window.QB_*` globals. Do not use ES modules — the project uses `var` globals deliberately.

### Beta Art

| Layer | Choice |
|---|---|
| Framework | React 19 + TanStack Start 1.168.32 |
| Router | TanStack Router 1.170.18 (file-based routes in `src/routes/`) |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite` plugin, no config file) |
| Components | shadcn/ui new-york, Radix UI |
| Icons | `lucide-react` 0.575.0 |
| Data | Supabase (`@supabase/supabase-js` 2.112.3) |
| State | `@tanstack/react-query` 5.101.1 |
| Forms | `react-hook-form` + `zod` + `@hookform/resolvers` |
| Runtime | Bun |
| Build | Vite 8.2.0 + TypeScript 5.8.3 |
| Extra UI | `recharts`, `cmdk`, `vaul` (drawer), `sonner` (toasts), `embla-carousel-react` |

### Eve Chat Template

| Layer | Choice |
|---|---|
| Framework | Next.js 16.3.1 (App Router) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui, Radix UI 1.6.7 |
| Icons | `lucide-react` 1.33.0 |
| Agent | `eve` 0.39.3 + Vercel AI SDK `ai` 7.0.70 |
| Auth | `better-auth` 1.7.1 |
| DB | Drizzle ORM 0.45.2 + Neon DB |
| Cache | Upstash Redis |
| Fonts | Geist + Geist Mono (Next.js font system) |
| Markdown | `streamdown` 2.5.0 (streaming markdown renderer) |
| Runtime | pnpm 10.12.4 |

---

## 4. Asset Management

### QBLOGG root

```
assets/
  css/          main.css (only stylesheet)
  js/           config.js, i18n.js, posts.js, app.js
  fonts/        Inter variable + static subsets (WOFF2); KAYNAK.md with license
  brand/        14 brand files (SVG + PNG) — generated by scripts/marka-uret.py
  images/       page images
  downloads/    lead magnet HTML
```

**Cache policy** (from `vercel.json`):
- `assets/fonts/*` and `assets/brand/*` → `immutable, max-age=31536000` (1 year)
- `assets/css/*` and `assets/js/*` → `must-revalidate, max-age=0`
- Fonts are permanently cached — never rename a font file without versioning it.

**CDN:** Vercel Edge Network. No third-party CDN. No external image hosts.

**Image references:** All relative (`assets/images/filename.webp`). No absolute URLs in HTML.

**Adding a new external fetch endpoint:** Always add to `connect-src` in `vercel.json` CSP or requests will be silently blocked. Run `npm run guvenlik` to catch missing CSP entries.

### Beta Art

Assets co-located with routes or in `public/`. Supabase Storage used for plate images.  
Reference via Supabase signed URLs or Vite's `import` + asset hash system.

### Eve Chat Template

Static assets in `public/`. Image optimization via Next.js `<Image>` component.  
Files uploaded by users go through server-side route handlers (not directly to storage).

---

## 5. Icon System

### QBLOGG — Custom inline SVG

All page icons are **inline SVG only**. No icon font, no external sprite, no emoji.  
Drawing standard (enforced by `docs/tasarim-sistemi.md`):

```
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="1.7"
stroke-linecap="round"
stroke-linejoin="round"
aria-hidden="true"
focusable="false"
```

**ICONS registry** (`assets/js/app.js`, lines ~21–39):  
Content icons: `question`, `coin`, `blocks`, `phone`, `banknote`, `compass`, `bulb`, `chart`, `envelope`, `link`, `gear`  
Social share icons: `linkedin`, `x`, `facebook`, `whatsapp`

Usage in posts — reference by name in post data:
```js
{ icon: 'coin' }   // resolved by iconSVG('coin') in app.js
```

Usage in page HTML — embed SVG directly, do not use `<img>` for icons.

To add a new icon:
1. Draw on 24×24 grid with the stroke standard above.
2. Register in the `ICONS` object in `app.js`.
3. Add a name for it — names are English nouns, lowercase.

### Beta Art / Eve Chat — Lucide React

```tsx
import { Camera, Archive, ExternalLink } from 'lucide-react'

<Camera className="h-4 w-4" />
<Archive size={16} strokeWidth={1.5} />
```

Naming follows lucide naming convention (PascalCase in import, kebab-case in docs).

### Brand Icons — `assets/brand/`

15 files, all generated. Never hand-edit. Regenerate with `python3 scripts/marka-uret.py`.  
Verify with `npm run marka-dogrula` (checks dimensions and SHA-256 against docs).

| File | Use |
|---|---|
| `qblogg-symbol.svg` | Full-color symbol, all digital uses |
| `qblogg-symbol-navy.svg` | Single color, light backgrounds |
| `qblogg-symbol-white.svg` | Single color, dark backgrounds |
| `qblogg-lockup-horizontal.svg` | Word + symbol, general use |
| `qblogg-lockup-horizontal-white.svg` | Word + symbol, dark backgrounds |
| `qblogg-favicon.svg` | `<link rel="icon">` |
| `favicon-32.png` | Legacy favicon |
| `apple-touch-icon.png` | iOS home screen |
| `og-image.png` | Open Graph / social cards |

---

## 6. Styling Approach

### QBLOGG — Vanilla CSS, method-free

No BEM, no CSS Modules, no CSS-in-JS.  
Single file (`main.css`). Class names are semantic nouns and compound English.

**RTL safety (mandatory for all new code):**
```css
/* Wrong — breaks Arabic layout */
margin-left: 1rem;
left: 0;
text-align: left;

/* Correct — works for all 10 languages including Arabic (dir="rtl") */
margin-inline-start: 1rem;
inset-inline-start: 0;
text-align: start;
```

**Responsive breakpoints** (all `max-width`, mobile-last):
- `≤1180px` — nav collapses
- `≤860px` — grid goes to single column
- `≤620px` — lang button collapses to symbol-only
- `≤360px` — secondary controls hidden

**Dark mode:** `html[data-theme="dark"]` selector — never `@media (prefers-color-scheme)` alone (the site has a manual toggle; the attribute wins). Tokens handle everything; do not write color literals inside a `[data-theme]` block.

**Typography rules:**
- Use `var(--fs-*)` tokens for body/UI text; never raw `rem` values.
- Headings may use `clamp()` outside the scale.
- First-letter caps and `<code>` may use `em`-relative sizes.
- No `em` for layout — only for typographic rhythm within a text element.

**Global styles declared in `main.css`:**
- CSS reset (box-sizing, margin/padding)
- `:focus-visible` outline in `--brand`
- `@media (prefers-reduced-motion)` — disables transitions/animations
- Scrollbar styling
- Print styles

### Beta Art — Tailwind v4 + shadcn/ui

No global CSS class methodology. Tailwind utilities + `@utility` custom classes.  
Component styles co-located with components.  
`cn()` helper from `src/lib/utils.ts` for conditional class merging:

```tsx
import { cn } from '@/lib/utils'

<div className={cn('base-classes', condition && 'conditional-class')} />
```

Responsive: Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`).

### Eve Chat Template — Tailwind v4 + shadcn/ui

Same as Beta Art pattern. Dark mode via `.dark` class (not data attribute).  
Streaming states styled with `.shimmer-text` class.

---

## 7. Project Structure

```
/home/user/BETA-ART/               ← Git root
│
├── index.html                     ← QBLOGG home
├── work.html                      ← Contact/brief
├── blog.html                      ← Post list
├── post.html                      ← Post detail (?slug=)
├── gizlilik.html                  ← Privacy
├── kosullar.html                  ← Terms
├── 404.html                       ← Not found
├── sitemap.xml
├── robots.txt
├── feed.xml                       ← RSS
│
├── assets/
│   ├── css/main.css               ← SINGLE stylesheet (all QBLOGG styles)
│   ├── js/
│   │   ├── config.js              ← QB_CONFIG (email, domain, prices, endpoints)
│   │   ├── i18n.js                ← QB_LANGS + QB_I18N (10 langs × 209 keys)
│   │   ├── posts.js               ← QB_POSTS (blog content, all 10 langs)
│   │   └── app.js                 ← QB_BOOT, ICONS, all DOM logic
│   ├── fonts/                     ← Self-hosted Inter + Noto subsets
│   ├── brand/                     ← 14 generated brand files (SVG + PNG)
│   └── images/                    ← Page images
│
├── beta-art/                      ← Beta Art sub-project
│   ├── src/
│   │   ├── routes/                ← TanStack Router file-based routes
│   │   │   ├── index.tsx          ← Landing page
│   │   │   ├── plates.$slug.tsx   ← Plate detail
│   │   │   ├── contact.tsx
│   │   │   ├── auth.tsx
│   │   │   └── admin.tsx
│   │   ├── components/
│   │   │   ├── ui/                ← shadcn/ui primitives
│   │   │   ├── SiteHeader.tsx
│   │   │   ├── SiteFooter.tsx
│   │   │   ├── LicenseRequestForm.tsx
│   │   │   └── ProvenancePanel.tsx
│   │   ├── styles.css             ← Tailwind v4 @theme + :root tokens
│   │   └── lib/utils.ts           ← cn() helper
│   ├── package.json
│   └── components.json            ← shadcn/ui config
│
├── naviar/
│   └── README.md                  ← Stub; source at betulandersen-droid/naviar-care-1
│
├── agents/
│   ├── eve-chat-template/
│   │   ├── app/
│   │   │   ├── globals.css        ← Tailwind v4 + shadcn tokens (oklch)
│   │   │   ├── layout.tsx
│   │   │   └── (routes)/
│   │   ├── components/
│   │   │   └── ui/               ← shadcn/ui primitives
│   │   ├── agent/agent.ts        ← defineAgent({model: "anthropic/claude-sonnet-5"})
│   │   └── package.json
│   └── eve-slack-agent/          ← TypeScript only, no UI
│
├── docs/
│   ├── tasarim-sistemi.md        ← QBLOGG design system reference (canonical)
│   ├── logo-sistemi.md           ← Brand geometry spec
│   ├── marka-tescili.md          ← Trademark filing notes
│   ├── naviar/
│   │   ├── NAVIAR-LOGO-KARAR.md  ← NAVIAR brand decisions (P1–P9)
│   │   └── LOGO-SKILLS-CLEARANCE-STACK-v1.0.md
│   └── proje-gunlugu.md          ← Project changelog
│
├── engine/                        ← Curiosity Engine (content pipeline, no UI)
├── scripts/                       ← check.mjs, marka-uret.py, bundle tools
├── demo/                          ← Action page demos (static HTML)
│
├── CLAUDE.md                      ← QBLOGG project memory for Claude
├── MONOREPO.md                    ← Project map and Vercel bindings
├── ROADMAP.md
├── vercel.json                    ← Vercel config + CSP + cache headers
└── .gitignore
```

---

## 8. Figma → Code Mapping Guide

### Step 1: Identify the target sub-project

Map the Figma frame to the correct sub-project before doing anything else.  
Each has an incompatible stack; do not merge conventions.

### Step 2: Map Figma styles to tokens

| Figma element | QBLOGG token | Beta Art token | Eve Chat token |
|---|---|---|---|
| Primary background | `--bg` (`#fff`) | `--background` (`#fbfaf7`) | `oklch(0.971 0 0)` |
| Card surface | `--bg-card` | `--card` (`#f3f0e9`) | `oklch(1 0 0)` |
| Body text | `--text` (`#14161c`) | `--foreground` (`#0f0f0f`) | `oklch(0.16 0 0)` |
| Muted text | `--text-muted` (`#5b6172`) | `--muted-foreground` (`#85817a`) | `oklch(0.6 0 0)` |
| Border | `--border` (`#e4e7f0`) | `--border` (`#e4e0d8`) | `oklch(0.916 0 0)` |
| Brand primary | `--brand` (`#082C54`) | `--accent` (`#8b1a1a`) | none |
| Accent / CTA | `--brand-2-ink` (`#0a7d72`) | `--accent` | `--destructive` for danger |
| Button text on brand | `--on-brand` (`#fff`) | `--accent-foreground` (`#fbfaf7`) | — |
| Focus ring | `--brand` (navy) | `--ring` (`#8b1a1a`) | `--ring` |
| Danger | `--danger` (`#b3261e`) | `--destructive` (`#8b1a1a`) | `oklch(0.577 0.245 27.325)` |

### Step 3: Map Figma type styles

| Figma role | QBLOGG | Beta Art | Eve Chat |
|---|---|---|---|
| Display / H1 | `clamp(2.1rem, 5.4vw, 3.6rem)`, Inter 700 | Fraunces 400 (`display` utility) | Geist, `text-4xl` |
| H2 | `clamp(1.6rem, 3.4vw, 2.35rem)`, Inter 600 | Fraunces 400, smaller | Geist, `text-2xl` |
| Body | `var(--fs-base)` = `.95rem`, Inter 400 | Inter 400 | Geist 400 |
| Caption / label | `var(--fs-xs)` = `.80rem` | `label` utility (mono, uppercase) | Geist Mono, small |
| Code | `code` element, `em`-relative | JetBrains Mono | Geist Mono |

### Step 4: Map Figma components

**QBLOGG:** Write plain HTML + CSS class. No component abstraction.  
**Beta Art:** Find the shadcn/ui primitive first. Use it. Compose with custom wrapper only if needed.  
**Eve Chat:** Same as Beta Art. Check `components/ui/` before writing custom UI.

### Step 5: RTL check (QBLOGG only)

After implementing: switch to Arabic (`ar`) and verify layout doesn't break.  
QBLOGG serves Arabic with `dir="rtl"` on `<html>`. All layout properties must be logical.

---

## 9. What Not to Do

1. **Do not mix sub-project tokens.** NAVIAR CARE gold (`#D4AF37`) must never appear in QBLOGG files.
2. **Do not use `#00D8C2` (aqua) as text on white.** Use `--brand-2-ink` instead.
3. **Do not hard-code strings in QBLOGG HTML.** Every visible string needs `data-i18n`.
4. **Do not add `<style>` blocks to QBLOGG HTML pages.** Only `main.css`.
5. **Do not hand-edit brand SVG/PNG files.** Regenerate with `python3 scripts/marka-uret.py`.
6. **Do not add external endpoints without updating `connect-src` in `vercel.json`.**
7. **Do not use emoji as icons in QBLOGG.** Inline SVG only (OS renders emoji differently).
8. **Do not use `margin-left` / `padding-left` / `left:` in QBLOGG.** Use logical properties.
9. **Do not load Inter from Google Fonts in QBLOGG.** It is self-hosted in `assets/fonts/`.
10. **Do not mix dark mode strategies.** QBLOGG = `data-theme` attr. Eve Chat = `.dark` class.

---

## 10. Validation Checklist (run after any change)

```bash
# QBLOGG (run from /home/user/BETA-ART/)
npm run check       # i18n completeness, broken links, duplicate ids, sitemap
npm run guvenlik    # XSS, CSP, RTL, privacy, tabnabbing
npm run gorunurluk  # published posts vs. 16-rule visibility gate

# Beta Art (run from /home/user/BETA-ART/beta-art/)
bun run typecheck   # TypeScript
bun run lint        # ESLint

# Eve Chat (run from /home/user/BETA-ART/agents/eve-chat-template/)
pnpm typecheck
pnpm lint
```

`check.mjs` is mandatory before every commit on QBLOGG. Red output → do not commit.

---

*Source files verified 2026-08-30. Re-verify against live files when any design token changes.*
