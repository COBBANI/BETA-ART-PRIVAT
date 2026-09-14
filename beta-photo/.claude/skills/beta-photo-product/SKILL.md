---
name: beta-photo-product
description: >
  Add a new photo product (verk) to the BETA PHOTO gallery. Use whenever the
  user says "legg til et nytt verk", "nytt fotografi", "add product", "add photo",
  "new artwork", or asks to expand the gallery with a new piece.
---

# beta-photo-product

Adds a new photo product to the BETA PHOTO gallery. A "verk" lives in two
places that must stay in sync: `app.js` (product data + event logic) and
`index.html` (gallery card HTML).

## Checklist for a new verk

### 1. Decide the slug and metadata

| Field | Rule |
|---|---|
| `slug` | kebab-case, URL-safe (e.g. `arktisk-natt`) |
| `category` | one of `landskap`, `urban`, `abstrakt` |
| `name` | display title in Norwegian |
| `desc` | one-sentence description in Norwegian |
| `bg` | dark CSS color for the art placeholder (hex or `rgba`) |

### 2. Add to `app.js` — products object

Open `beta-photo/app.js` and find the `products` object (around line 120).
Add an entry:

```js
// Inside the products = { ... } object:
'arktisk-natt': { name: 'Arktisk natt', desc: 'Nordlyset bøyer seg over et islagt hav.', bg: '#0A1520' },
```

Keep alphabetical order by slug within the object is helpful but not required.

### 3. Add to `admin.html` — PRODUCTS object

Open `beta-photo/admin.html` and find the `PRODUCTS` constant (same structure).
Add the identical entry so the admin panel shows the correct product name and
description in its gallery view and code generator.

```js
// Inside PRODUCTS = { ... }:
'arktisk-natt': { name: 'Arktisk natt', desc: 'Nordlyset bøyer seg over et islagt hav.', bg: '#0A1520', cat: 'landskap' },
```

Note: `admin.html` also has a `cat` field — add the category string.

### 4. Add gallery card to `index.html`

Find `<div class="gallery-grid" data-gallery>` in `beta-photo/index.html`
and insert the new `<article>` card. Copy an existing card as template:

```html
<article class="art-card reveal" data-category="landskap" data-product="arktisk-natt">
  <button class="art-card-button" type="button" aria-label="Se demoen Arktisk natt">
    <div class="art-placeholder" style="background:#0A1520">
      <span class="art-label">Arktisk natt</span>
    </div>
  </button>
</article>
```

Card size variants:
- Default: `art-card` — square
- Tall (portrait): `art-card art-card-tall` — takes 2 rows
- Wide (landscape): `art-card art-card-wide` — takes 2 columns

Choose the variant that fits the composition of the photograph.

### 5. Verify

```bash
# Start server from beta-photo/ dir
python3 -m http.server 8000 --directory /home/user/BETA-ART/beta-photo &
# Take screenshot and confirm card appears
node -e "
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox','--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  await page.setViewportSize({width:1280,height:900});
  await page.goto('http://localhost:8000/', {waitUntil:'networkidle'});
  await page.evaluate(() => document.querySelector('.gallery-section').scrollIntoView());
  await page.waitForTimeout(500);
  await page.screenshot({path:'/tmp/bp-new-product.png'});
  // open the new card
  const btn = page.locator('[data-product=\"arktisk-natt\"] .art-card-button');
  const exists = await btn.count();
  console.log('card exists:', exists > 0);
  if (exists) { await btn.click(); await page.waitForTimeout(600); await page.screenshot({path:'/tmp/bp-new-modal.png'}); }
  await browser.close();
})().catch(e => { console.error(e.message); process.exit(1); });
"
```

## Current products (keep in sync)

| Slug | Name | Category |
|---|---|---|
| `mellom-fjell` | Mellom fjell | landskap |
| `stillhet-0614` | Stillhet 06:14 | landskap |
| `byens-puls` | Byens puls | urban |
| `nord-64` | Nord 64 | abstrakt |
| `etter-regnet` | Etter regnet | urban |
| `siste-lys` | Det siste lyset | landskap |

## Gotchas

- Both `app.js` and `admin.html` have a `products`/`PRODUCTS` object — **update both**.
  The comment in admin.html says "// Speil app.js" — keep them in sync.
- The `art-placeholder` background color should be a dark tone — the gallery has
  a dark theme and light backgrounds look broken.
- After adding a card, run the `/run-beta-photo` skill to visually confirm the
  modal opens and shows the correct title/description.
