---
name: beta-photo-betaid
description: >
  Register a new BETA-ID certificate for a sold BETA PHOTO print. Use whenever
  the user says "ny BETA-ID", "registrer et solgt verk", "add BETA-ID", "new
  certificate", or mentions registering an artwork sale with a BETA-ID number.
---

# beta-photo-betaid

BETA-ID is a numbered authenticity record for each physical print sold.
Format: `BETA-PHOTO-NNNN` (four-digit zero-padded number).

The records live in `BETAID_RECORDS` inside `beta-photo/admin.html`.
There is **no separate database** — the records are hardcoded in admin.html
(intentional: the admin panel is the single source of truth, not user-editable by visitors).

## What you need from the user

Before editing, collect:
- **BETA-ID number** — next sequential number (admin panel shows existing ones)
- **Artwork title** — matches a slug in the gallery (e.g. `Mellom fjell`)
- **Edition** — e.g. `01 / 20` (print number / edition size)
- **Format** — e.g. `60 × 90 cm`
- **Date** — sale or registration date, YYYY-MM-DD

## Where to edit

File: `beta-photo/admin.html`  
Search for: `const BETAID_RECORDS = {`  
It is in the `<script>` block near line 557.

### Add a new entry:

```js
const BETAID_RECORDS = {
  'BETA-PHOTO-0001': { title: 'Mellom fjell',   edition: '01 / 20', format: '60 × 90 cm', date: '2026-04-12' },
  'BETA-PHOTO-0002': { title: 'Stillhet 06:14', edition: '03 / 20', format: '40 × 60 cm', date: '2026-04-14' },
  // ADD HERE ↓
  'BETA-PHOTO-0003': { title: 'Byens puls',      edition: '01 / 10', format: '80 × 120 cm', date: '2026-09-02' },
};
```

Keep entries in BETA-ID number order. Pad the number to 4 digits.

## Verify in admin panel

```bash
python3 -m http.server 8000 --directory /home/user/BETA-ART/beta-photo &
# Open admin.html, log in, click BETA-ID tab → new record appears in table
```

Or with Playwright:

```js
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:8000/admin.html', { waitUntil: 'networkidle' });

  // Pre-set admin auth to skip login for testing
  await page.evaluate(() => {
    localStorage.setItem('betaphoto_admin', '1');
    // Set a known hash (sha256 of 'test') so auth screen is bypassed:
    localStorage.setItem('betaphoto_admin_hash',
      '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08');
  });
  await page.reload({ waitUntil: 'networkidle' });
  await page.screenshot({ path: '/tmp/betaid-panel.png' });

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
```

## BETA-ID format rules

- Always `BETA-PHOTO-` prefix + 4-digit number
- Edition format: `NN / NN` (sold number / total edition size)
- Format: use `×` (multiplication sign U+00D7), not `x`
- Date: ISO format `YYYY-MM-DD`

## The public verification flow

Buyers verify their print at `index.html#verifisering` by entering their
BETA-ID. The verification section in `index.html` calls into `app.js` which
checks the BETA-ID against `DEMO_RECORDS` (a parallel object in app.js).

**Important:** `app.js` also has `DEMO_RECORDS` — this is what visitors see
on the public site. After adding to `BETAID_RECORDS` in `admin.html`, also add
the same entry to `DEMO_RECORDS` in `app.js`:

```js
// In app.js, find DEMO_RECORDS = { ... } and add:
'BETA-PHOTO-0003': {
  title: 'Byens puls',
  edition: '01 / 10',
  format: '80 × 120 cm',
  date: '2026-09-02',
  verified: true,
},
```

## Gotchas

- There are **two objects to update**: `BETAID_RECORDS` in `admin.html` and
  `DEMO_RECORDS` in `app.js`. Miss one and either the admin view or the public
  verification will be out of date.
- The admin panel's "Generer ny BETA-ID" code generator (in the BETA-ID tab)
  produces the exact code snippet — use it if the user is logged into admin.
- Use the multiplication sign `×` (U+00D7) in format strings — not the letter x.
