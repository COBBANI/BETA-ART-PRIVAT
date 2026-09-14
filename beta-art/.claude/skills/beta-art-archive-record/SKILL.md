---
name: beta-art-archive-record
description: >
  Add or update a BETA ART Archive entry — a photograph with full provenance
  record. Use whenever the user says "add a photo to the archive", "new archive
  entry", "arşive fotoğraf ekle", "provenance record for a photo", or asks to
  document an existing image with source, rights, and retrieval information.
---

# beta-art-archive-record

A BETA ART Archive entry is **a photograph + its evidence record**. The photo
alone is not the product — the evidence is what makes it valuable.

Every archive entry must pass the Trust Engine (→ `/beta-art-trust-engine`).
This skill covers the archive-specific workflow and the minimum required fields
for a published entry.

Reference: `beta-art/docs/BETA-ART-IS-MODELI-v2.md` §3A, §7.

---

## Minimum fields for a published archive entry

An entry is publishable when ALL of these are filled (use "unknown" or "not
stated" explicitly, never blank):

| Layer | Required field | Acceptable values |
|---|---|---|
| SOURCE | `maker` | Full name, or "unknown" |
| SOURCE | `capture_date` | YYYY-MM-DD, YYYY-MM, or "approx. YYYY" |
| SOURCE | `source_type` | original / derivative / commissioned / archive |
| CONTEXT | `subject` | Factual description of what is depicted |
| VERIFY | `edit_disclosure` | none / crop+exposure / post-processed / AI-generated |
| VERIFY | `verification_status` | verified / partially-verified / unverified |
| RIGHTS | `copyright_holder` | "© Name YYYY" |
| RIGHTS | `licence` | Personal / Commercial / Extended / Custom / Exclusive |
| RIGHTS | `ai_restriction` | yes / no / not stated |
| RETRIEVE | `searchable_by` | 3–5 keywords or phrases |

---

## Archive entry structure

### Core fields

```yaml
id: BETA-PHOTO-XXXX           # sequential, four-digit zero-padded
title: "Name of the work"      # display title — concise, not a sentence
slug: work-name-slug           # URL-safe, matches gallery card

maker: "Full Name"
capture_date: "2026-04-12"
capture_location: "Nordmarka, Oslo, Norway"
source_type: original

subject: >
  A lone pine tree at the edge of a frozen lake in winter morning light.
  No people. No structures.

edit_disclosure: "Crop and exposure adjustment only. No compositing."
verification_status: verified
verification_date: "2026-04-15"

copyright: "© Betül Andersen 2026"
licence: Commercial
ai_restriction: "yes — not licensed for AI training or data mining"
consent_status: "not required — no people depicted, public land"

searchable_by:
  - winter landscape
  - pine tree
  - frozen lake
  - Nordmarka
  - Norway nature
  - long exposure

retrieval_test: FOUND
retrieval_question: "Find a winter forest image from Norway with no people, early 2026"

retention_period: indefinite
storage_location: Beta Art primary storage + backup
exit_package: NO   # set to YES when exit package is prepared
```

### Optional extended fields

```yaml
model_consent: "not applicable"
property_consent: "not applicable"
capture_device: "Sony A7 IV + 24-70mm f/2.8"
edition: "01 / 20"
format_options: ["40 × 60 cm", "60 × 90 cm", "80 × 120 cm"]
provenance_notes: ""
uncertainty_notes: ""
```

---

## Where entries live in the codebase

The archive entries are maintained in the BETA PHOTO `app.js` (gallery product
list) and in the admin panel's `PRODUCTS` / `BETAID_RECORDS`. For a full new
archive entry, three places must be updated:

1. **`beta-photo/app.js`** — `products` object  
   (slug, name, desc, bg color)

2. **`beta-photo/index.html`** — gallery card HTML  
   (`<article data-product="...">`)

3. **`beta-photo/admin.html`** — `PRODUCTS` and `BETAID_RECORDS` (when sold)

For the Trust Engine record, store in:
4. **`beta-art/docs/`** — `archive-entry-<slug>.md`  
   (or structured JSON in `beta-art/reference/photos/`)

→ See `/beta-photo-product` skill for steps 1–3.  
→ See `/beta-photo-betaid` skill for BETA-ID registration when a print is sold.

---

## Licence types

| Licence | Use case | Typical restrictions |
|---|---|---|
| **Personal** | Private, non-commercial use | No publication, no commercial |
| **Commercial** | Brand, advertising, corporate | Territory, media, time limited |
| **Extended** | Merchandise, products, resale | Larger circulation, products |
| **Custom / Exclusive** | Tailored rights package | Negotiated per deal |

**Pricing variables:** usage type · duration · territory · circulation · exclusivity · media · AI/data rights

---

## Verification standards

BETA ART does not claim absolute truth. It claims documented evidence.

| Claim | How to document |
|---|---|
| "This photo is original" | Original file accessible, metadata intact, maker confirmed |
| "No AI generation" | Maker statement + no evidence of generation artifacts |
| "Date is accurate" | Camera metadata confirmed, not overridden post-capture |
| "Location is correct" | GPS metadata, or maker interview, or cross-reference with context |
| "No people without consent" | Visual inspection documented |

If a claim cannot be verified: write "unverified — [reason]". Never write the claim without the evidence basis.

---

## Gotchas

- **Titles are not captions.** `title` is a name for the work (e.g. "Mellom fjell"). The `subject` field is the factual description. These are different.
- **Edit disclosure is not an apology.** "Crop and exposure adjustment" is normal and acceptable — document it. "Undisclosed heavy retouching" is what destroys trust.
- **AI restriction defaults to "not stated" if absent.** Do not mark it "no" unless the rights holder has explicitly permitted AI training. The absence of a restriction is not permission.
- **Slug must match everywhere.** The slug in `app.js`, `index.html`, `admin.html`, and the Trust Engine record must be identical. A mismatch breaks the gallery card and the BETA-ID verification.
