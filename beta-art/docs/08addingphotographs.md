# Adding a photograph

The short answer: **Lightroom**. You are already in it, it is the only program
here that can write the capture record the archive promises, and one export
preset made once does the rest forever.

---

## 1. The export preset — make it once

In Lightroom: **File → Export**, set the values below, then **Add** at the
bottom-left of the preset list and call it `Beta Art — web plate`.

| Setting | Value | Why |
|---|---|---|
| Format | JPEG | WebP is smaller but Lightroom's export is less predictable |
| Quality | 80 | Above this the file grows and nothing visible improves |
| Colour space | **sRGB** | Anything else shifts colour in a browser |
| Resize | Long edge **2400 px** | Sharp on a retina screen, small enough to load |
| Sharpening | Screen, Standard | |
| **Metadata** | **All metadata**, *not* "Copyright Only" | ← the important one |
| Remove location info | **unticked** | |
| Add copyright watermark | off | the site watermarks previews itself |

**The metadata setting is the whole brand.** The archive's argument is that
the capture record travels with the image — camera, lens, exposure, place,
date. Lightroom's default web presets strip exactly that. Export with
*Copyright Only* and every plate page has empty fields on the one thing the
site says makes it trustworthy.

Before exporting, fill in the copyright once in Lightroom's **Metadata**
panel: Copyright `© 2026 Betül Öner`, Copyright Status `Copyrighted`, Rights
Usage Terms `Licensed use only — betaart.no`. Lightroom will carry it into
every export from then on.

---

## 2. Getting the file into the site

Three ways, easiest first.

**a. GitHub in the browser.** Open the repository, go to `beta-art/img/`,
press **Add file → Upload files**, drag the JPEGs in, write a commit message,
commit. No software, no terminal. This is the least tooling of any option.

**b. Lightroom → a folder → GitHub.** Export with the preset above into any
folder, then do (a). This is (a) with a step you were doing anyway.

**c. Ask me.** I can read your Lightroom catalogue through the Adobe
connector — I have already looked at all five photographs in it. I cannot
download the originals from this environment (the transfer host is blocked
here), so the file still has to travel through (a) or (b), but I can write the
catalogue entry, the alt text and the page from what I can see.

---

## 3. Register the plate

One entry in `beta-art/plates.json` per photograph. Nothing else in the site
needs editing — the collection grid, the plate page, the sitemap and the
structured data are all generated from it.

```json
{
  "accession": "2026.0154",
  "title": "Low Tide",
  "slug": "low-tide",
  "category": "landscape",
  "keywords": ["low tide", "sand", "coast"],
  "image": "2026-0154-low-tide.jpg",
  "location": "Jæren, Norway",
  "captured": "2026-03-14T06:47:00+01:00",
  "camera": "Nikon Z8",
  "lens": "24–70 mm f/2.8",
  "exposure": "f/8 · 1/160 · ISO 64",
  "raw_on_record": true,
  "people": false,
  "release": null,
  "status": "verified"
}
```

Name the file after the accession number — `2026-0154-low-tide.jpg`. The
number is the permanent identifier a printed QR label resolves by; a filename
that matches it means nobody has to look anything up.

Then:

```
python3 tools/plates.py --report     # checks the catalogue
python3 tools/sitemap.py             # picks up the new page
python3 tools/audit.py               # the usual gate
```

---

## 4. What the check refuses to let you publish

`tools/plates.py` exits non-zero rather than let the catalogue claim what it
cannot back:

- A plate showing a recognisable person cannot be `verified` without a
  release recorded. This is the archive's own FAQ answer, enforced.
- A plate cannot be `verified` while `raw_on_record` is false. Verification
  *is* the RAW; without it the word is decoration.
- A plate cannot name an image file that does not exist.
- An accession number cannot be used twice. A printed label resolves by it,
  and a reused number makes a physical object point at the wrong photograph.
- A `verified` plate cannot have a half-filled capture record. Gaps look like
  omissions; an empty record reads as honest, a partial one does not.

Set `status` to `awaiting-original` until all of that is true. The site
already says "Awaiting verified original" on those plates and means it.

---

## 5. Two things worth deciding before the first plate goes live

**The archive currently says the photographs are "primarily in Norway and the
Nordics".** The five photographs in the Lightroom catalogue are two sequoia
groves, a canyon with a river, a coastline with mountains, and a portrait.
None is Norway. Either the sentence changes to match the work, or the launch
set does — but they cannot both stay as they are on a site whose argument is
that its claims are checkable.

**Adobe Stock.** If the same photographs are also sold there, the Extended
licence as written forbids the buyer from reselling on a stock site while
Beta Art does exactly that. That is not a contradiction in law — you own them
— but it reads as one, and it weakens "licensed directly from the
photographer, no intermediaries". Worth a sentence in the licence terms
saying plainly which images are exclusive to the archive and which are not.
Silence on it is the only version that becomes a problem after a sale.

---

## 6. Adobe Stock: you cannot get them back

You asked about uploading the images from the contributor portfolio. That
route does not exist, and it is worth knowing before you plan around it.

Adobe Stock is not a file store. There is no way for a contributor to download
their own published content, and licensing your own images from your portfolio
breaches the Contributor terms and can close the account. Adobe's own position
is that contributors keep their own archive of originals — not least as proof
of ownership if anyone ever disputes it.

So the originals have to come from where they already are:

| Where | What is there | How it travels |
|---|---|---|
| **Lightroom** | 5 photographs | Export preset above → GitHub upload |
| **Creative Cloud** | 57 assets, including `.psdc` Photoshop cloud documents | Open in Photoshop → Export As → GitHub upload |
| **Your own drive or phone** | the true originals and RAWs | straight to the export step |

I can see all of them through the Adobe connector and can write the catalogue
entry from what I see. I cannot move the files: the Adobe transfer host is
blocked from this environment. The file itself always travels through you.

---

## 7. The thing that has to be decided before any of it goes up

The Creative Cloud account holds **57 assets, and around forty of them are
Firefly generative-image files**. Their names are the prompts:

> "Add a subtle, soft reflection of…" · "Remove distracting background
> elements…" · "Add a shallow depth-of-field effect…" · "Enhance
> micro-textures of materials…" · "Enhance lighting for realism…"

I looked at three. They are real photographs of yours — a pink wall with a
climbing plant, a child wading in shallow water — with generative content
added or removed. They are yours, editing them is entirely your right, and
selling them is your business.

But the archive says this, in its own voice, on its own front page:

> "Nothing is generated, composited or enhanced by AI. The RAW files are
> archived and can be produced on request. **That is the whole point of Beta
> Art.**"

and in the licence terms it is a **warranty with a refund attached**: if a
photograph turns out not to meet that standard, the licence is refunded in
full and the plate is removed from sale.

**So the line has to be drawn, and it is not a matter of taste:**

| Property | Generative AI |
|---|---|
| **Beta Art archive** | **never.** Not one plate. Not "just a small fix." |
| Beta Art Business | openly — it sells AI work and says so |
| Field Notes | say so in the entry when used |

`tools/plates.py` now enforces it. A plate with `generative: true`, or one
exported from a `.ffgenimg` file, fails the check at any status — not only at
publication. The guarantee is checked rather than trusted, because a guarantee
nobody checks is the kind that gets discovered by a buyer.

Two more things from the same look:

- The child in the "remove distracting background elements" photograph is
  recognisable. A release for a child needs a parent or guardian's signature,
  and no commercial licence can be issued without it.
- Adobe Stock requires generative content to be declared on submission. If any
  of these went up, they need that flag. I have no way to see what was
  declared — only you can check that in the contributor portal.
