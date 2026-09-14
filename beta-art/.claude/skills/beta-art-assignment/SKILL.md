---
name: beta-art-assignment
description: >
  Create a BETA ART Assignments brief for a commissioned photography or
  documentation shoot. Use whenever the user says "görev ver", "yeni çekim",
  "capture brief", "new assignment", "commission a photo", "document this
  location/project", or asks to define the requirements for creating new
  real-world visual documentation.
---

# beta-art-assignment

BETA ART Assignments bridges Archive and Business:

> **Can't find it? Create it in the real world.**

When the needed image or documentation does not exist in the archive or in a
client's existing files, an Assignment creates it — with full provenance built
in from the start (not retrofitted after).

Reference: `beta-art/docs/BETA-ART-IS-MODELI-v2.md` §3C, §9 (Delivery).

---

## Assignment types

| Type | Examples |
|---|---|
| **Architectural** | Completed building, facade, interior, detail |
| **Construction site** | Progress documentation, specific element, milestone |
| **Completed project** | Final state for archive, marketing, or legal record |
| **Craftsmanship** | Process documentation, material detail, installation method |
| **Workplace** | Team environment, workflow, tool/equipment in use |
| **Product in real environment** | Product used on-site or in context |
| **Editorial** | Story, portrait, place — for publication |
| **Destination/place** | Location documentation for record or licensing |

---

## Pre-shoot brief template

Every Assignment starts with a complete brief. Fill all fields before any
photography begins. This brief becomes the first layer of the Trust Engine record.

```markdown
# BETA ART ASSIGNMENT BRIEF
Brief ID: BA-ASSIGN-XXXX
Date: YYYY-MM-DD
Prepared by:

---

## 1. Assignment type
[ ] Architectural  [ ] Construction site  [ ] Completed project
[ ] Craftsmanship  [ ] Workplace          [ ] Product in context
[ ] Editorial      [ ] Destination/place  [ ] Other: ___

## 2. Brief
What exactly needs to be documented?
(Be specific: "North facade, all windows, from street level, overcast light preferred"
is a brief. "The building" is not.)

Required shots:
1.
2.
3.
...

Optional / if possible:


## 3. Required evidence
What must the images prove or document?
(Example: "That the membrane was installed correctly on all four elevations
before the cladding was fitted, with visible reference to the floor slab.")

Evidence requirement:


## 4. Metadata requirements
What metadata must be captured at shoot?

- [ ] GPS coordinates (required for location documentation)
- [ ] Exact timestamp
- [ ] Capture device / lens
- [ ] Lighting conditions (natural / artificial / mixed)
- [ ] Weather (if exterior)
- [ ] Named project reference: ___
- [ ] Additional context notes: ___

## 5. Location / context
Address or GPS:
Access requirements:
On-site contact:
Restrictions (what cannot be photographed):

## 6. Consent requirements
- [ ] No people will appear → consent not required
- [ ] People may appear in background → document with note
- [ ] Identified individuals → model release required before use
- [ ] Private property → property/location release required
- [ ] Workers on site → check employer/GDPR rules

Consent forms to prepare: ___

## 7. Rights
Copyright holder after delivery: [ ] Beta Art  [ ] Client  [ ] Shared
Intended licence: Personal / Commercial / Extended / Custom
AI/data-mining restriction: [ ] YES — prohibited  [ ] NO — permitted  [ ] To be specified

## 8. Delivery
Format: RAW + JPEG / JPEG only / TIFF / Other: ___
Resolution: Full resolution / Web-optimised / Both
Naming convention: ___
Delivery via: ___
Deadline: ___
Number of final selects: ___

## 9. Retention
Who retains originals after delivery:
Retention period: ___
Backup arrangement: ___

## 10. Provenance record
After delivery, this assignment will be entered into Beta Art Archive:
[ ] YES — full Trust Engine record  [ ] Partial record  [ ] Client files only

Archive entry slug (if YES): ___
BETA-ID to issue (if print sold): ___

## 11. Fee
Shooting: ___
Travel: ___
Production / processing: ___
Documentation / provenance prep: ___
Licensing (if separate): ___
Total: ___
Payment terms: ___
```

---

## Checklist: brief is complete when...

- [ ] Required shots listed with specific detail (not "building photos")
- [ ] Evidence requirement stated — what the images must prove
- [ ] Location and access confirmed
- [ ] Consent requirements identified and resolved before shoot
- [ ] Rights owner defined
- [ ] AI restriction decided
- [ ] Delivery format, deadline, and recipient confirmed
- [ ] Whether a Trust Engine record will be created after shoot

---

## Post-shoot: entering into Archive

After delivery, complete the Trust Engine record using `/beta-art-trust-engine`.

Key fields added post-shoot (not pre-shoot):

```
capture_date:         [actual date — from camera metadata]
capture_device:       [camera + lens used]
verification_status:  verified
verification_date:    [date record was completed]
edit_disclosure:      [what processing was done]
```

If a print is sold from this assignment, also run `/beta-photo-betaid` to
issue the BETA-ID.

---

## Pricing structure

Assignments are priced per brief. Components:

| Component | Note |
|---|---|
| Shooting fee | Daily / half-day / hourly — based on complexity and distance |
| Travel | Mileage, transit, accommodation if overnight |
| Production | File processing, selection, export |
| Documentation | Metadata structuring, provenance record, brief completion |
| Licensing | If client uses images beyond basic delivery (commercial, AI, extended) |
| Archive preparation | Adding to Beta Art archive with full Trust Engine record |

Do not quote a single line-item. Always show the components — clients understand
they are buying documentation labour alongside photography.

---

## Gotchas

- **Brief before shoot, always.** Never start an Assignment without a signed or
  confirmed brief. "We'll figure out what we need on-site" produces unusable
  documentation and breaks the provenance chain.
- **GPS is metadata, not optional.** For any location documentation, GPS
  coordinates must be captured at shoot. Retrofitting location data later
  creates an unverified record.
- **Consent before faces.** If identifiable people may appear, resolve consent
  before the shoot — not after. "We'll blur them" is not a documentation practice.
- **Edit disclosure starts at import.** Note what processing was done from the
  first import onwards. "Untouched RAW" and "crop + exposure in Lightroom" are
  both valid — both must be documented.
- **Assignment ≠ stock.** These images are created for a specific context and
  requirement. If they later enter the general archive for licensing, a separate
  licensing entry is created. Don't conflate the assignment delivery with a
  stock photo.
