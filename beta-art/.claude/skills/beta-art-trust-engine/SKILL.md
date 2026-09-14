---
name: beta-art-trust-engine
description: >
  Apply the BETA ART Trust Engine framework to document a visual record, archive
  entry, or project file. Use whenever the user asks to document provenance,
  fill in a source record, assess what evidence exists for an image, check what
  rights or context is missing, or prepare an entry for the BETA ART archive.
  Also use when auditing an existing record for completeness.
---

# beta-art-trust-engine

The Trust Engine is BETA ART's shared methodology across all three services
(Archive, Business, Assignments). Every record passes through the same seven
layers. A record is only as strong as its weakest layer.

**SOURCE → CONTEXT → VERIFY → RIGHTS → RETRIEVE → RETAIN → EXPORT**

Reference: `beta-art/docs/BETA-ART-IS-MODELI-v2.md` §4.

---

## The seven layers

### 1. SOURCE
*Where did this come from?*

| Field | Description |
|---|---|
| `maker` | Who created this? Full name or pseudonym, role (photographer, author, company) |
| `source_type` | original / derivative / scan / archive / commissioned |
| `original_file` | Path or ID of the primary/unedited file |
| `capture_device` | Camera model, lens, scanner — if relevant |
| `capture_date` | YYYY-MM-DD or YYYY-MM (if exact date unknown, note confidence) |
| `capture_location` | GPS or named location, address, project reference |
| `source_confidence` | High / Medium / Low — how certain are we of the above? |

**Red flags:** "unknown photographer", no original file, no capture date → document the gap, do not invent.

### 2. CONTEXT
*Why was this created? What was happening?*

| Field | Description |
|---|---|
| `project` | Project name, code, or ID |
| `project_phase` | Design / Construction / Completion / Defects / Ongoing |
| `subject` | What is depicted — described as a fact-finder would |
| `purpose` | Why was this image taken? (documentation, editorial, marketing, evidence) |
| `people_in_image` | Named individuals if relevant — or "none visible", "unidentified" |
| `notes` | Any other context the next person needs |

**Note:** For construction/project work, context is often the most valuable field. A photo with no context can be useless; the same photo with project + phase + subject becomes evidence.

### 3. VERIFY
*What was actually checked?*

| Field | Description |
|---|---|
| `verification_status` | verified / partially-verified / unverified / disputed |
| `verified_by` | Who checked what — name or role |
| `verification_date` | When was this checked? |
| `verification_method` | How was it checked? (metadata inspection, source interview, cross-reference, on-site) |
| `edit_disclosure` | What edits were made? (none / crop+exposure / composited / AI-generated / unknown) |
| `uncertainty_notes` | What remains uncertain? Be specific. |

**BETA ART principle:** We do not guess what is real. We document what the evidence supports. Uncertainty is documented, not hidden.

### 4. RIGHTS
*Who owns it? Who can use it?*

| Field | Description |
|---|---|
| `copyright_holder` | Name + year (e.g. "© Betül Andersen 2024") |
| `licence` | Personal / Commercial / Extended / Custom / Exclusive |
| `licence_restrictions` | Geography, time period, media, circulation |
| `ai_restriction` | Is use for AI training prohibited? (yes / no / not stated) |
| `data_mining_restriction` | Is scraping/mining prohibited? |
| `consent_status` | Model consent obtained? Property consent? Where required. |
| `consent_file` | Reference to consent form if applicable |
| `rights_notes` | Anything the next person needs to know before using |

**Note for construction sector:** Client often owns rights to documentation of their project. Confirm in contract before archiving.

### 5. RETRIEVE
*Can the next person find this?*

| Field | Description |
|---|---|
| `searchable_by` | What terms would find this? (project name, date, location, subject, person) |
| `retrieval_test` | Was a test question successfully answered using this record? (FOUND / PARTIAL / NOT FOUND) |
| `retrieval_question` | The exact question that was tested |
| `retrieval_result` | What was returned and how confident |
| `linked_records` | Related files, documents, metadata entries |

**The test:** Can someone unfamiliar with the project find this record in 2 years using a natural-language question?

### 6. RETAIN
*How long is this kept? Under what conditions?*

| Field | Description |
|---|---|
| `retention_period` | How long should this be kept? (e.g. "10 years", "indefinite", "until project close + 5 years") |
| `retention_basis` | Why? (legal requirement, contractual, business need, archive value) |
| `storage_location` | Where is the original stored? |
| `backup_status` | Is there a backup? Where? |
| `deletion_flag` | Should this be deleted at a future date? |
| `gdpr_basis` | If personal data: legal basis for retention (contract / legitimate interest / consent) |

### 7. EXPORT
*What happens when the customer leaves?*

| Field | Description |
|---|---|
| `export_format` | What format will files be exported in? (original, JPEG, PDF, ZIP) |
| `export_includes` | What metadata/documentation goes with the files? |
| `export_excludes` | What stays with Beta Art? |
| `exit_package` | Yes/No — has an exit package been prepared? |
| `migration_path` | Where would this go if Beta Art closes? |

---

## Record audit: quick completeness check

Run this audit on any record before marking it archive-ready:

```
SOURCE      □ maker  □ capture_date  □ original_file  □ source_confidence
CONTEXT     □ subject  □ project  □ purpose
VERIFY      □ verification_status  □ edit_disclosure  □ uncertainty_notes
RIGHTS      □ copyright_holder  □ licence  □ ai_restriction  □ consent_status
RETRIEVE    □ searchable_by  □ retrieval_test done
RETAIN      □ retention_period  □ storage_location  □ backup_status
EXPORT      □ exit_package
```

Score: Count checked boxes.
- 21/21 = Archive-ready
- 15–20 = Acceptable, document gaps
- Under 15 = Incomplete — do not publish/deliver without filling gaps

**Gaps are NOT failures.** Document them with a note: "not available at intake", "unknown — no response from client", "omitted intentionally: [reason]". Leaving a field blank without a note is the failure.

---

## Quick-fill template (plain text)

```
BETA ART TRUST ENGINE RECORD
ID: [BETA-PHOTO-XXXX or project code]
Date: YYYY-MM-DD
Prepared by:

SOURCE
  maker:
  source_type:
  original_file:
  capture_date:
  capture_location:
  source_confidence:

CONTEXT
  project:
  subject:
  purpose:
  notes:

VERIFY
  status:
  edit_disclosure:
  uncertainty:

RIGHTS
  copyright:
  licence:
  ai_restriction:
  consent:

RETRIEVE
  searchable_by:
  retrieval_test: FOUND / PARTIAL / NOT FOUND
  retrieval_question:

RETAIN
  retention_period:
  storage_location:
  gdpr_basis:

EXPORT
  exit_package: YES / NO
  format:
```

---

## Gotchas

- **Never invent source data.** If the photographer is unknown, write "unknown". If the date is approximate, write "approx. 2024-Q1". An invented fact in a provenance record destroys the record's value.
- **Edit disclosure is mandatory.** Every archive entry must state whether the image was edited and how. "None" is a valid answer; blank is not.
- **AI restriction defaults to stated.** If the rights holder has not addressed AI training, do not assume it is permitted. Document: "AI/data-mining restriction: not stated — confirm before licensing for AI use."
- **Retrieval test before delivery.** A Business project is not done until at least one retrieval test is passed. FOUND rate is the deliverable.
