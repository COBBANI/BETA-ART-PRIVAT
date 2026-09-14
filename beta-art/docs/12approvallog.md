# Approval log

The mark on every page says a person has seen what is published and approved it.
This is where that person says so, with a date, so the claim rests on a record
rather than on everybody's memory of a conversation.

One rule, the same one the archive applies to a plate marked verified and the
language record applies to a review marked done: **an approval names who, when,
and what it covers.** An approval without those is not an approval.

---

## 2026-08-20 — the build at `748fdb7`

**Approved by:** Betül Öner, owner.
**How it was reviewed:** all 100 pages rendered from the build and viewed as a
contact sheet, plus close looks at fifteen pages across the four properties, at
360, 1024 and 1440 px, in light and dark.

**What this approval covers**

- The four properties as designed and written: the hub, the archive, the
  business desk and the journal.
- All 100 pages as they stood at this commit, in **English** — the layout, the
  structure, the imagery placeholders, the prices shown, and the English copy.
- The nine automated gates passing: HTML, quality control, conversion copy,
  claims against the legal notice, catalogue integrity, plain-language findings,
  the language record, and a real browser at four widths.

**What this approval does not cover, and cannot**

- **The eleven machine-written languages.** Norwegian, Turkish, Spanish, French,
  German, Portuguese, Russian, Arabic, Chinese, Japanese and Hindi have not been
  read by a native speaker. Approving the build is not approving text nobody has
  read. Section 5 of the legal notice says this in public, and `languages.json`
  is where each language changes status.
- **Legal sign-off.** The provisions in the notice were researched, not advised
  on. `docs/09` and the licence terms still want a few hours from a Norwegian
  lawyer.
- **The facts left blank on purpose** — organisation number, registered address,
  the archive's real size, the photographer's city. Nothing here invents them.
- **Anything about a live site.** Nothing was published on this date. The build
  exists in the repository only.

---

## 2026-08-20 — two architecture decisions

**Decided by:** Betül Öner, owner. Recorded in `docs/05` section 0.

- **Merchant of record: Stripe for everything.** No split between the archive
  and the desk, no Lemon Squeezy. Beta Art is the seller, and therefore owns the
  VAT liability everywhere it sells — including EU OSS for digital sales to
  consumers, where a supplier outside the EU has no threshold. To be confirmed
  with the accountant before the first invoice.
- **The payment service runs on Render, Frankfurt.** The four websites stay on
  Vercel. A website deploy cannot take the till down.

Neither is built. These are decisions about what will be built.

---

## 2026-08-21 — the mark, and the line that goes with it

**Approved by:** Betül Öner, owner.
**How it was reviewed:** the seal rendered from the page's own SVG at 200, 96,
48 and 24 px, on paper and on ink, and in the header lockup beside the
wordmark. The four home-screen icons were reviewed at actual size.

**What this approval covers**

- **The seal**: a ring, six rays, and a filled mark in seal red at the centre —
  `circle r=46`, six ray strokes, `circle r=7 fill #8B1A1A`, on a 100×100
  viewBox. One colour plus the seal red, no gradient, no photograph.
- **The lockup**: the seal beside `BETA ART` set in the mono face at .26em
  tracking, as it already appears in every header.
- **The slagord**: *Made by a human. Verified at the source.* — with
  *Laget av et menneske. Verifisert ved kilden.* and *Bir insan yaptı.
  Kaynağında doğrulandı.* Recorded in `docs/15-slagord.md` with the shorter
  lines that hang off it.

**What this approval does not cover, and cannot**

- **Any registration.** This is the owner accepting the mark for use on the
  site. It is not a trade mark filing, not a search for earlier rights, and not
  an opinion that the mark is registrable. `betaart.com` without the hyphen is
  registered to somebody else — that is a finding for a lawyer, not a blocker
  cleared here.
- **The journal's mark.** `beta-art-blog/index.html` carries no inline seal, so
  its home-screen icon is generated from the favicon and shows the centre mark
  without the rays. The three other properties are consistent; the journal is
  not, and this approval does not pretend otherwise.

---

## What would change this record

Each of these is one line in this file when it happens, and none of them are
things a machine can write for you:

- a language reviewed → also set its row in `languages.json`, then run
  `python3 tools/languages.py --write`
- the lawyer's read of `docs/09` and the licence terms
- the first real photograph replacing a placeholder → also `beta-art/plates.json`
- the day the site is actually published, and from which commit
