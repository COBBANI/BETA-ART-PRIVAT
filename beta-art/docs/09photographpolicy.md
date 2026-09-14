# What Beta Art will never publish

A decision, not a discussion. Four tiers: what is criminal, what is refused as
policy even where it is lawful, what is publishable only with a document on
file, and where the law of one country would make a lawful Norwegian
photograph unlawful abroad.

The last tier is the one people get wrong. Beta Art licenses **worldwide**.
A photograph that is lawful to publish in Norway can be unlawful for a buyer
to use in Paris or Rome. When a licence has no territorial limit, the strictest
rule in the territory governs — so the strictest rule is the house rule.

**What this is.** A working policy grounded in the law of the home jurisdiction
(Norway/EEA) and the markets sold into (EU, UK, US). The provisions cited below
were checked against primary or near-primary sources. It is not legal advice,
and Tier 3 in particular should be read by a Norwegian lawyer before the first
commercial licence crosses a border.

---

## Tier 0 — Never. Criminal, and reported.

No release cures these. No fee makes them available. No "artistic intent"
argument is entertained.

| | |
|---|---|
| **Sexual images of a minor** | Criminal everywhere Beta Art operates or sells. Not published, not stored, not "kept for reference". Reported. |
| **Intimate images shared without consent** | Norway: **straffeloven § 267a**, in force since 1 July 2021 — unlawfully making available offensive or clearly private images. Fine or up to one year; up to two years where gross. |
| **Images taken by intrusion** | Hidden cameras, long lenses into private space, images made where the subject had a reasonable expectation of privacy. Norway: **§ 266** covers photographing in a way that, through frightening or bothersome conduct, infringes a person's peace. |
| **Terrorist content** | Removal orders under **Regulation (EU) 2021/784** run on a one-hour clock. Nothing here is worth that. |

### The category most likely to be reached by accident

`§ 267a` does not stop at nudity. It reaches images of a person **subjected to
violence or humiliation, or who is injured, ill, heavily intoxicated, or in
psychological distress.**

That is documentary photography's exact blind spot. A powerful frame of
someone at their worst moment, made in a public place, with no consent, is
precisely what the provision was written for. **Beta Art does not publish it,
however good the photograph is.** If the picture depends on someone's
degradation for its force, it is out.

---

## Tier 1 — Never. Beta Art policy, stricter than the law.

Lawful somewhere. Still refused, because the archive's proposition is
provenance and dignity, and a policy that bends is not a policy.

- **Anything generated, composited or enhanced by generative AI.** The archive
  guarantees this in writing with a refund attached. Enforced by
  `tools/plates.py`, at any status, not only at sale.
- **Photographs of identifiable people in distress, grief, medical care,
  arrest, addiction or destitution** — the Tier 0 line, extended past where the
  criminal law stops.
- **Children as the subject of a commercial licence**, even with a guardian's
  release. A child cannot consent, and a guardian cannot foresee where an
  unlimited licence will place their child's face in ten years. Children may
  appear in the archive with a release; they are not sold on the Commercial or
  Extended tiers.
- **Deceptive documentary.** A staged photograph presented as observed, or a
  caption that places a picture somewhere it was not taken. The capture record
  is the product; a false one is fraud, not a mistake.
- **Photographs of sacred or ceremonial practice** without the permission of
  the community concerned — including Sámi cultural and religious contexts,
  where the standard is asked-and-granted, not merely lawful.
- **Anyone else's photograph.** Not as a placeholder, not "temporarily", not
  in a draft that happens to be reachable.

---

## Tier 2 — Only with a document on file, refused without.

Publishable, and only when the paper exists **before** publication. The
catalogue check refuses these, so the rule cannot be forgotten under deadline.

| Subject | Document required | Note |
|---|---|---|
| Any recognisable person | **Model release** | Norway: **åndsverkloven § 104** — a photograph depicting a person may not be reproduced or displayed publicly without consent. |
| Anyone under 18 | Release signed by a **parent or guardian** | And the child is asked. See Tier 1 on commercial licensing. |
| Recognisable private property, interiors, a named home | **Property release** | Required in several markets for commercial use; cheap to obtain, expensive to lack. |
| Artwork, sculpture or mural in frame | Permission from the **artwork's** rights holder | The photograph and the thing photographed are two separate copyrights. |
| A prominent trade mark, logo or livery | Permission, or exclude the tier | Editorial use differs from commercial; the licence tier decides which rules apply. |
| Cultural heritage in Italy | **Authorisation from the public authority** | Italy requires authorisation to publish photographs depicting cultural goods. |

### The exceptions in § 104, and why the archive does not lean on them

`§ 104` permits publication without consent where the image has **current and
general public interest**, where **the person is secondary** to the main
content, where it shows **gatherings, outdoor processions or events of public
interest**, or as **advertising for the photographer's own business** where the
subject does not object.

Those are real exceptions and they are how press photography functions. **Beta
Art does not rely on them for licensed work.** They are defences at the moment
of publication by a newspaper; they are not a basis for selling a stranger's
face to an advertiser three years later. Where a plate depends on an exception
to be lawful, it is editorial-only or it is not published.

One more detail worth holding: the protection under `§ 104` runs for the
person's **lifetime plus fifteen years** after the end of the year of death. An
archive is a long-lived thing. A release should outlive the shoot.

---

## Tier 3 — Lawful in Norway, unlawful for a buyer abroad.

Worldwide licensing means the buyer's jurisdiction decides. These are the
traps that turn a good sale into an indemnity claim.

**Freedom of panorama.** Whether a photograph of a building, sculpture or
monument in a public place may be used commercially varies by country, and the
EU has not harmonised it. Germany, Portugal, Spain and the United Kingdom
permit commercial use. **France and Italy restrict it** — in France a work
primarily based on a publicly displayed work needs the author's authorisation
unless the protected work is incidental; in Italy, publishing photographs
depicting cultural goods requires authorisation from the public authorities.

**The house rule that follows:** a plate whose subject is a recognisable
building, monument or public artwork **less than roughly seventy years past its
creator's death** is not offered on the Commercial or Extended tiers without
the architect's or artist's permission on file. Landscape, weather, sea and
forest are unaffected — which is most of what this archive is.

**Personality rights.** Several jurisdictions are stricter than Norway on
images of people. Germany's *Recht am eigenen Bild* and France's *droit à
l'image* are the well-known ones; some countries require consent even to take
the photograph. **This has not been checked country by country and should not
be treated as settled here.** The safe operating rule until it is: a signed
release covering worldwide commercial use, or no commercial tier.

**Military, security and infrastructure.** Photography of installations,
airports, borders and some government buildings is restricted or criminal in
many countries. If a plate shows one, it does not go up until it is checked.

**Drones.** Flight and imaging rules vary widely and change often. A drone
plate needs the flight to have been lawful where it was made, and that has to
be recorded with the plate.

---

## How this is enforced, rather than believed

The rules above are worth nothing as prose. What makes them real:

1. **`beta-art/plates.json`** holds the record — people present, release
   status, generative status, source file.
2. **`tools/plates.py`** exits non-zero rather than let the catalogue publish a
   plate showing a person without a release, a plate marked verified with no
   RAW, a plate exported from a Firefly generation, or a duplicate accession
   number.
3. **`beta-art/release.html`** is where consent is actually given — four
   separate questions, not one bundled checkbox, because consent under the GDPR
   must be specific, and a bundled one is not consent.
4. **`report.html`** is how anyone tells us we got it wrong, and section 13 of
   the legal notice is what we promise to do about it.

A rule nobody can enforce is a sentence. A rule that fails the build is a rule.

---

## What still needs a lawyer

Named honestly, because the alternative is a document that sounds more certain
than it is:

- Tier 3 in full, country by country, for the markets actually sold into.
- The interaction between `§ 104` consent, the GDPR lawful basis, and a
  worldwide perpetual licence — three regimes that do not use the same words
  for the same thing.
- Whether the Commercial and Extended tiers as drafted can be sold at all for
  plates showing people, given the indemnity in the licence terms.
- The child-photograph position. Tier 1 takes the strict line by choice; a
  lawyer should say whether it is also the required one.

A review of this document and the licence terms together costs a few thousand
kroner. It is the cheapest insurance in the project, and the only item on this
list that cannot be closed from a keyboard.
