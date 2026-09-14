---
name: run-beta-art
description: >
  Build, launch, and drive the BETA ART React/TanStack Start web app. Use
  whenever you need to run, screenshot, test, or interact with the beta-art
  app — to start the dev server, take screenshots of plates or the gallery,
  fill the licence form, or verify a page renders correctly after changes.
---

# run-beta-art

The BETA ART app is a React 19 + TanStack Start (SSR) app built with Vite,
Tailwind CSS v4, Radix UI, and Supabase. It is driven with `chromium-cli`
(Playwright) against the Vite dev server at `http://127.0.0.1:5173`.

Base directory for all commands: `beta-art/` inside the repo root.

---

## Prerequisites

```bash
# All commands run from beta-art/
cd /home/user/BETA-ART/beta-art

# Node package manager: bun (bun.lock ships with private registry pinning;
# use public npm registry on first install or after deleting the lock).
# If node_modules is absent:
bun install --registry https://registry.npmjs.org
# The bun.lock.bak holds the original private-registry lockfile — leave it.
```

No system packages beyond what is pre-installed (Chromium at
`/opt/pw-browsers/chromium`). Do NOT run `playwright install`.

---

## Vite config: IPv4 override (already applied)

`vite.config.ts` includes `vite: { server: { host: "127.0.0.1", port: 5173 } }`.
This overrides the `@lovable.dev/vite-tanstack-config` plugin default of `::` (IPv6)
which fails in containers without IPv6. If the dev server fails with
`EAFNOSUPPORT :::8080`, the config was reverted — restore it:

```ts
// vite.config.ts — add vite: block inside defineConfig({...})
vite: {
  server: { host: "127.0.0.1", port: 5173, strictPort: false },
},
```

---

## Run (agent path — Playwright via chromium-cli)

### 1. Start the dev server (background)

```bash
cd /home/user/BETA-ART/beta-art
bun run dev > /tmp/ba-vite.log 2>&1 &
sleep 10
grep -q "Local:" /tmp/ba-vite.log && echo "READY" || cat /tmp/ba-vite.log
```

Expected: `VITE v8.2.2  ready in ~800 ms` then `Local: http://127.0.0.1:5173/`

### 2. Drive with Playwright

Playwright is installed in the **repo root** `node_modules/`, not in `beta-art/`:

```js
const { chromium } = require('/home/user/BETA-ART/node_modules/playwright');
```

Full inline script:

```js
const { chromium } = require('/home/user/BETA-ART/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium',
    args: ['--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  // Home — gallery + license form
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle', timeout: 30000 });
  console.log('Home title:', await page.title());
  await page.screenshot({ path: '/tmp/ba-home.png' });

  // Gallery section
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(400);
  await page.screenshot({ path: '/tmp/ba-gallery.png' });

  // Plate detail page
  await page.goto('http://127.0.0.1:5173/plates/first-light', { waitUntil: 'networkidle', timeout: 20000 });
  console.log('Plate title:', await page.title());
  await page.screenshot({ path: '/tmp/ba-plate.png', fullPage: true });

  // Verification data (dl element)
  const verif = await page.locator('dl').first().innerText();
  console.log('Verification snippet:', verif.slice(0, 120));

  await browser.close();
  console.log('Done. Screenshots in /tmp/ba-*.png');
})().catch(e => { console.error(e.message); process.exit(1); });
```

Run with: `node -e "<paste script above>"`

### 3. Stop the server

```bash
pkill -f "vite dev" 2>/dev/null || kill $(lsof -ti:5173) 2>/dev/null
```

---

## Key selectors

| Element | Selector |
|---|---|
| Home hero h1 | `h1` (text "Photographywith proof.") |
| Plate cards (12 total) | `a[href*="/plates/"]` |
| Plate card image | `img[src*="plate"]` |
| Plate detail h1 | `h1` (plate title, e.g. "First Light") |
| Plate verification data | `dl` (first dl on the page) |
| Nav links | `nav a` |
| License request form | `form` (on home page, scroll down) |

---

## Routes

| Route | Description |
|---|---|
| `/` | Home: hero, 12-plate gallery grid, license request form |
| `/plates/:slug` | Plate detail: image, verification dl, capture metadata |
| `/auth` | Sign in — Supabase email/password auth |
| `/contact` | Contact & Licence Requests page |
| `/_authenticated/admin` | Admin panel (requires Supabase session) |
| `/privacy`, `/license-terms`, `/refunds` | Legal pages |

Current plate slugs (from `src/data/collection.ts`):
`first-light`, `into-the-pines`, `sea-of-fog`, `still-water`, `palm`,
`winter-line`, `quiet-harbor`, `last-blue`, `open-field`, `city-edge`,
`morning-fog`, `bare-branches`

---

## Run (human path)

```bash
cd /home/user/BETA-ART/beta-art
bun run dev
# Browser opens at http://127.0.0.1:5173/
```

---

## Gotchas

- **`bun install` fails with 403**: The original `bun.lock` pins package URLs to a
  Lovable private registry (`europe-west4-npm.pkg.dev/lovable-core-prod/…`) which
  returns 403 in this environment. Fix: `mv bun.lock bun.lock.bak` then
  `bun install --registry https://registry.npmjs.org`. The `bun.lock.bak` is kept
  so the original pinned hashes are not lost.

- **Dev server binds to `::` (IPv6) by default**: The `@lovable.dev/vite-tanstack-config`
  plugin forces `host: "::"` and `port: 8080`. This causes `EAFNOSUPPORT` in
  containers without IPv6. The fix is already in `vite.config.ts` as a `vite: { server: { host: "127.0.0.1" } }` override — the non-sandbox code path respects user config.

- **Playwright module location**: `playwright` is installed in the **repo root**
  (`/home/user/BETA-ART/node_modules/playwright`), not inside `beta-art/`. Always
  `require('/home/user/BETA-ART/node_modules/playwright')`, never `require('playwright')`.

- **Plate data is all PLACEHOLDER**: Every record in `src/data/collection.ts` has
  `verification.status: "Awaiting verified original"` — this is by design (no real
  RAW originals yet). Do not edit collection data to make verification pass; it
  must come from a real archive record via `/beta-art-archive-record`.

- **Supabase not connected locally**: Auth and admin features call Supabase. Without
  `.env` containing `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, auth fails
  gracefully — the page renders but login returns an error. The public gallery and
  plate pages work without Supabase.

- **SSR via TanStack Start**: The app runs as an SSR server (TanStack Start + Nitro)
  in production. The dev server (`vite dev`) runs client-side hydration mode — good
  enough for UI verification. For SSR-specific testing, use `bun run build` and
  `bun run preview`.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `EAFNOSUPPORT :::8080` on `bun run dev` | Ensure `vite.config.ts` has `vite: { server: { host: "127.0.0.1" } }` override |
| `Cannot find module 'playwright'` | Use full path: `require('/home/user/BETA-ART/node_modules/playwright')` |
| `bun install` fails with 403 | `mv bun.lock bun.lock.bak && bun install --registry https://registry.npmjs.org` |
| Page blank / hydration error | Check `/tmp/ba-vite.log` for Vite compile errors |
| Admin page redirects to `/auth` | Expected — Supabase session required; `.env` must have VITE_SUPABASE_* keys |
