---
name: run-beta-photo
description: >
  Run, screenshot, and drive the BETA PHOTO static site (index.html, sell.html,
  admin.html). Use whenever asked to run, start, screenshot, test, preview, or
  verify any page of the BETA PHOTO gallery app. Covers filter interaction,
  modal, cart, admin panel, and behavior tracking.
---

# run-beta-photo

BETA PHOTO is a pure HTML + CSS + JS static gallery site served with Python's
built-in HTTP server. The driver uses **Playwright + Chromium** (pre-installed at
`/opt/pw-browsers/chromium`). No build step — server runs directly from the
`beta-photo/` directory.

## Prerequisites

```bash
# From repo root — installs playwright into node_modules (already in package.json)
cd /home/user/BETA-ART
npm install

# playwright is in node_modules after npm install
# Chromium is pre-installed; do NOT run playwright install
```

## Start the server

**Critical: serve from inside `beta-photo/`**, not the repo root.  
`index.html` references `/styles.css` and `/app.js` as absolute paths —  
if the root is the repo root, those 404 and the JS never executes.

```bash
python3 -m http.server 8000 --directory /home/user/BETA-ART/beta-photo &
SRV_PID=$!
# verify
curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/app.js  # → 200
```

## Agent path (chromium-cli via Playwright)

Paste and run this script to drive the app. Screenshots land next to the script or at the path you specify.

```js
// driver.mjs  (run with: node driver.mjs)
import { chromium } from 'playwright';

const BASE = 'http://localhost:8000';
const SS   = (p) => `${process.cwd()}/${p}`;

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 900 });

// ── index / gallery ────────────────────────────────────────────────────
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await page.screenshot({ path: SS('hero.png') });

// filter: 'landskap' | 'urban' | 'abstrakt' | 'alle'
await page.click('[data-filter="landskap"]');
await page.waitForTimeout(400);
await page.screenshot({ path: SS('filter-landskap.png') });

// scroll gallery into view (cards below fold on load)
await page.evaluate(() => document.querySelector('.gallery-section').scrollIntoView());
await page.waitForTimeout(600);

// open product modal
await page.locator('[data-product="mellom-fjell"] .art-card-button').click();
await page.waitForTimeout(600);
// modal.hidden becomes false → product-modal overlay appears
await page.screenshot({ path: SS('modal.png') });

// close modal
await page.keyboard.press('Escape');

// ── sell.html ──────────────────────────────────────────────────────────
await page.goto(`${BASE}/sell.html`, { waitUntil: 'networkidle' });
await page.screenshot({ path: SS('sell.png') });

// ── admin.html (auth screen) ───────────────────────────────────────────
await page.goto(`${BASE}/admin.html`, { waitUntil: 'networkidle' });
await page.screenshot({ path: SS('admin-auth.png') });

// Log in as admin (set passphrase on first run, or re-enter known hash via:)
// await page.locator('#pass-input').fill('yourpassphrase');
// await page.locator('#pass-submit').click();
// await page.waitForTimeout(400);
// await page.screenshot({ path: SS('admin-panel.png') });

await browser.close();
console.log('done — screenshots in', process.cwd());
```

Run it inline (no separate file needed):

```bash
cd /home/user/BETA-ART
node -e "
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium',
    args: ['--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage']
  });
  const page = await browser.newPage();
  await page.setViewportSize({width:1280, height:900});
  await page.goto('http://localhost:8000/', {waitUntil:'networkidle'});
  await page.screenshot({path:'/tmp/bp-hero.png'});
  await page.evaluate(() => document.querySelector('.gallery-section').scrollIntoView());
  await page.waitForTimeout(600);
  await page.locator('[data-product=\"mellom-fjell\"] .art-card-button').click();
  await page.waitForTimeout(600);
  await page.screenshot({path:'/tmp/bp-modal.png'});
  await browser.close();
  console.log('Screenshots: /tmp/bp-hero.png  /tmp/bp-modal.png');
})().catch(e => { console.error(e.message); process.exit(1); });
"
```

## Key selectors

| Element | Selector |
|---|---|
| Filter buttons | `[data-filter="landskap\|urban\|abstrakt\|alle"]` |
| Gallery grid | `[data-gallery]` |
| Art card | `[data-product="<slug>"]` (6 slugs: mellom-fjell, stillhet-0614, byens-puls, nord-64, etter-regnet, siste-lys) |
| Open modal button | `[data-product="<slug>"] .art-card-button` |
| Product modal (hidden attr) | `[data-product-modal]` |
| Modal title | `[data-modal-title]` |
| Size radio | `[name="size"][value="<liten\|standard\|stor>"]` |
| Add to cart button | `[data-add-cart]` |
| Cart open button | `[data-cart-open]` |
| Admin pass input | `#pass-input` |
| Admin submit | `#pass-submit` |

## Admin panel

Login stores `localStorage['betaphoto_admin'] = '1'` and hash in
`localStorage['betaphoto_admin_hash']`.  
To pre-set admin mode in tests without logging in:

```js
await page.evaluate(() => localStorage.setItem('betaphoto_admin', '1'));
await page.reload({ waitUntil: 'networkidle' });
// → admin bar appears at bottom, tracking skipped
```

To test as a clean visitor (no tracking data):

```js
await page.evaluate(() => {
  localStorage.removeItem('betaphoto_v1');
  localStorage.removeItem('betaphoto_admin');
});
await page.reload({ waitUntil: 'networkidle' });
```

## Gotchas

- **Server root must be `beta-photo/`**, not the repo root. `/styles.css` and
  `/app.js` are absolute paths from document root; if served from repo root those
  404 and the JS never runs — the modal stays permanently hidden.
- **Gallery cards are below the fold** on a 900 px viewport. Scroll with
  `page.evaluate(() => document.querySelector('.gallery-section').scrollIntoView())`
  before clicking — the IntersectionObserver reveal animation can otherwise
  interfere with click interactivity.
- **404 for favicon/images** is expected — placeholder backgrounds are CSS colors,
  not image files. These errors are noise and don't affect functionality.
- **Admin passphrase is user-set** on first run (no default). To bypass in tests,
  set `betaphoto_admin` in localStorage directly (see above).
- **Sell.html behavior nudge** only renders if `betaphoto_v1` localStorage has
  `visits > 1`. Simulate a returning visitor by seeding the data before navigation.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `styles.css` 404 | Server started from wrong dir — use `--directory /home/user/BETA-ART/beta-photo` |
| Modal always hidden | Same root issue; JS never loads → event listeners never attach |
| Filter does nothing | Same JS load issue |
| `playwright` not found | `cd /home/user/BETA-ART && npm install` |
| Chromium not found | Pre-installed at `/opt/pw-browsers/chromium`; do NOT run `playwright install` |
| `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` | Already set in the environment; no workaround needed |
