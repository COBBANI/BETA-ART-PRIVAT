---
name: beta-art-business-pilot
description: >
  Run a BETA ART Business customer qualification conversation or Completed
  Project Rescue pilot. Use whenever the user mentions a potential B2B customer,
  asks about qualifying a construction firm, running a project rescue, testing
  retrieval, or preparing a pilot delivery package. Also use for drafting the
  FOUND/PARTIAL/NOT FOUND retrieval test report.
---

# beta-art-business-pilot

BETA ART Business sells one thing in Phase 1:

> **Dokumentasjon som overlever prosjektet.**
> Can the next responsible person find the correct original later?

Core metric: **FOUND / PARTIAL / NOT FOUND** on a retrieval test.

Reference: `beta-art/docs/BETA-ART-IS-MODELI-v2.md` §9, §10.

---

## The customer journey (9 steps)

### Step 1 — Discover

Customer says something like:
> "Vi avsluttet prosjektet, men informasjon er spredt overalt."
> "Filene er et sted, men vi vet ikke hvor."
> "Vi trenger dokumentasjonen fra 2023."

This is the entry signal. Do NOT ask for files yet.

### Step 2 — Qualification (first conversation)

Ask these questions. Record answers. Do NOT request files yet.

```
1. Hva slags prosjekt er det? (type, size, completion year)
2. Når ble prosjektet avsluttet?
3. Hvor er materialene nå? (SharePoint, Dropbox, Procore, hard drives, email?)
4. Hvem vil bruke dette etterpå? (new project manager, client, HSE, insurance?)
5. Hva kan du IKKE finne i dag?
6. Gi meg 3–5 eksempler på spørsmål du ville stille om dette prosjektet.
   (= real retrieval questions the customer needs answered)
```

Output from Step 2: a **qualification note** — one page, structured:
- Project type + year
- Material locations
- Known gaps
- 3–5 retrieval test questions (verbatim from customer)
- Assessment: pilot-ready / more info needed

### Step 3 — Pilot scope

Select ONE project. Agree on scope in writing:
- Which project
- Material sources included (which folders, platforms, drives)
- Material sources excluded (and why)
- Deliverables Beta Art will produce
- Timeline
- Fee

### Step 4 — Intake

Before receiving any files, confirm:
- Lawful access: customer has the right to share these files
- Privacy: no personal data of individuals without proper basis (GDPR)
- Confidentiality: agree NDA if needed

Then receive materials. Log every source:

```
INTAKE LOG
Source: [SharePoint / email / USB / Procore / ...]
Received: [date]
Format: [file types, folder structure]
Volume: [approximate file count / GB]
Contact: [who provided it]
```

### Step 5 — Source inventory (Rescue)

For each material source:
1. List what exists (file types, date ranges, naming conventions)
2. Identify originals vs. derivatives (originals = RAW, uncompressed, first export)
3. Extract or reconstruct metadata (date, location, author, project context)
4. Flag exceptions (missing metadata, unclear authorship, duplicates, gaps)

Output: **Source Inventory** — structured table:

| File/Folder | Type | Date range | Originals? | Metadata quality | Notes |
|---|---|---|---|---|---|
| ... | | | | | |

### Step 6 — Retrieval testing

Take the 3–5 retrieval questions from Step 2.
For each question:

```
RETRIEVAL TEST
Question: "Find original photos of the north facade membrane installation, February 2024."
Result: FOUND / PARTIAL / NOT FOUND
Files: [list of files if found]
Confidence: High / Medium / Low
Notes: [caveats, quality of match, alternatives offered]
```

Aggregate into a **Retrieval Test Report**:
- Total questions: N
- FOUND: N
- PARTIAL: N
- NOT FOUND: N
- Key gaps:

### Step 7 — Delivery package

What the customer receives:

| Deliverable | Format |
|---|---|
| Structured archive | Folder hierarchy + naming standard |
| Source manifest | All sources, what was included/excluded, why |
| Metadata export | CSV or structured JSON per file/folder |
| Exception register | What is missing, unclear, or unresolvable |
| Retrieval test results | FOUND / PARTIAL / NOT FOUND per question |
| Exit package | How to access, export, migrate this archive later |
| Closeout summary | 1-page narrative: what was done, what was found, key recommendations |

### Step 8 — Review

After delivery, one review meeting:
- Did we answer the retrieval questions?
- What was the FOUND rate?
- What surprised the customer?
- What would they pay to have done for another project?

Record answers. This drives Step 9 and future pricing.

### Step 9 — Expansion

Signals that expansion is warranted:
- Customer paid and is satisfied
- Customer has 2+ more projects with same problem
- Customer wants recurring access
- Customer has referrals

Expansion paths: more projects → organisation-wide → continuity service → recurring.

---

## Qualification note template

```markdown
# Beta Art Business — Qualification Note
Customer: [name / firm]
Date: [YYYY-MM-DD]
Interviewer: Beta Art

## Project
- Type: [construction / renovation / fit-out / infrastructure / ...]
- Completed: [year]
- Size: [m² / value / team size — approximate]

## Material locations
- [System 1]: [description]
- [System 2]: [description]

## Known gaps
- [What the customer says they cannot find]

## Retrieval test questions (verbatim)
1. [exact wording]
2. [exact wording]
3. [exact wording]

## Assessment
- Pilot-ready: YES / NO / MORE INFO NEEDED
- Recommended next step: [pilot offer / follow-up meeting / not a fit]
- Notes:
```

---

## Pricing principle (Phase 1)

Do NOT publish fixed prices. Offer is scoped and priced per pilot.

Variables that affect price:
- Number of material sources
- Volume of files
- Number of retrieval test questions
- Quality of existing metadata
- Timeline urgency
- Delivery format required

---

## Key phrases for customer conversations (Norwegian)

| Situation | Phrase |
|---|---|
| Opening | "Vi hjelper deg å gjøre ferdig prosjektdokumentasjon tilgjengelig — ikke bare lagret, men søkbar og forståelig." |
| Value | "Kan neste ansvarlige person finne riktig original dokumentasjon?" |
| CTA | "Vurder ett avsluttet prosjekt." |
| Retrieval | "Vi tester om dokumentasjonen faktisk svarer på de spørsmålene dere vil stille om ett år." |
| Not a DAM | "Vi selger ikke et nytt system. Vi redder det dere allerede har." |

---

## Gotchas

- **Do NOT ask for files in Step 2.** Asking too early signals you're
  a generic file service. Qualification first; intake only after scoping.
- **FOUND/PARTIAL/NOT FOUND is the product.** This percentage is what
  the customer actually paid for — not the folder structure.
- **Customers before software.** Phase 1 is deliberately semi-manual.
  Do not over-engineer the process before 3 paying pilots.
- **Privacy before intake.** Never receive files without confirming
  lawful basis. GDPR applies to construction documentation if it contains
  personal data (worker photos, names, etc.).
