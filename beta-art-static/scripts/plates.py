#!/usr/bin/env python3
"""The catalogue, checked against itself.

`beta-art/plates.json` is the record for every plate: what it shows, where and
when it was taken, on what, whether the RAW is held, whether anyone
recognisable is in it, and whether a release exists. Until now that record
lived inside the HTML, which meant a sentence like "release on file" was a
sentence and nothing more.

This refuses to let the catalogue claim what it cannot back:

  · a plate showing a recognisable person may not be offered for licensing
    without a release recorded against it
  · a plate may not say a photograph is verified while the RAW is not held
  · a plate may not name an image file that does not exist
  · an accession number is issued once — no duplicates, ever, because a
    printed QR label resolves by it

    python3 tools/plates.py            check
    python3 tools/plates.py --report   check, and print the catalogue

Exits non-zero on any finding.
"""

import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "beta-art", "plates.json")
IMAGES = os.path.join(ROOT, "beta-art", "img")

STATUS = {"awaiting-original", "verified", "withdrawn"}
PERMISSION = {None, "on-file", "not-required", "required", "pending"}
RELEASE = {None, "on-file", "not-required", "pending"}

problems = []


def bad(acc, msg):
    problems.append("%s — %s" % (acc, msg))


def main():
    report = "--report" in sys.argv
    plates = json.load(open(DATA, encoding="utf-8"))

    seen_acc, seen_slug = {}, {}
    for p in plates:
        acc = p.get("accession") or "(no accession)"

        if not p.get("accession"):
            bad(acc, "has no accession number")
        elif acc in seen_acc:
            bad(acc, "is used twice (%s and %s) — a printed QR resolves by it"
                % (seen_acc[acc], p.get("title")))
        else:
            seen_acc[acc] = p.get("title")

        slug = p.get("slug")
        if not slug:
            bad(acc, "has no slug, so it has no address")
        elif slug in seen_slug:
            bad(acc, "shares the address plate-%s.html with %s" % (slug, seen_slug[slug]))
        else:
            seen_slug[slug] = acc

        if p.get("status") not in STATUS:
            bad(acc, "status %r is not one of %s" % (p.get("status"), sorted(STATUS)))

        if p.get("release") not in RELEASE:
            bad(acc, "release %r is not one of %s" % (p.get("release"), sorted(x or "null" for x in RELEASE)))

        # The archive's written guarantee: "Nothing is generated, composited or
        # enhanced by AI." It carries a refund obligation, so it is checked
        # here rather than trusted. The Creative Cloud account holds around
        # forty Firefly generative edits of real photographs — adding a
        # reflection, removing background elements, adding depth of field.
        # Those belong to Beta Art Business, which sells AI work openly. They
        # can never be a plate.
        if p.get("generative"):
            if p.get("status") == "verified":
                bad(acc, "is marked verified but records a generative-AI step. The "
                         "archive guarantees no image is generated, composited or "
                         "enhanced by AI, and that guarantee carries a refund. This "
                         "plate cannot be published here.")
            else:
                bad(acc, "records a generative-AI step and does not belong in this "
                         "archive at all, at any status.")

        src = (p.get("source_file") or "").lower()
        if src.endswith((".ffgenimg", ".ffgen")) or "firefly" in src:
            bad(acc, "was exported from %s, which is a Firefly generation. Set "
                     "generative to true and move it to the business side."
                % p.get("source_file"))

        # the rule the whole archive rests on
        if p.get("people") and p.get("status") == "verified" and p.get("release") != "on-file":
            bad(acc, "shows a recognisable person and is offered as verified, but no "
                     "release is on file. It may not be licensed.")

        # Tier 2 of docs/09: publishable only with the document on file.
        # A commercial licence is the point at which each of these stops being
        # a nicety and becomes an indemnity.
        sellable = p.get("status") == "verified" and not p.get("editorial_only")
        for field, what in (("property_release", "recognisable private property"),
                            ("artwork_permission", "an artwork, sculpture or mural in frame"),
                            ("heritage_permission", "cultural heritage requiring authorisation")):
            if p.get(field) == "required":
                bad(acc, "shows %s and the permission is marked required but not "
                         "obtained. It cannot be published." % what)

        # Tier 3: worldwide licensing means the strictest territory governs.
        if p.get("architecture") and sellable and p.get("artwork_permission") not in ("on-file", "not-required"):
            bad(acc, "shows a recognisable building or monument and is offered "
                     "commercially. France and Italy restrict commercial use of such "
                     "images, and the licence has no territorial limit — record the "
                     "architect's permission or set editorial_only.")

        if p.get("drone") and not p.get("location"):
            bad(acc, "is a drone photograph with no location recorded. Flight rules "
                     "are territorial; without the place the flight cannot be shown "
                     "to have been lawful.")

        # Tier 1: a child may appear in the archive, but is not sold.
        born = p.get("subject_born")
        if p.get("people") and sellable and p.get("minor"):
            bad(acc, "shows someone under 18 and is offered on a commercial tier. "
                     "Policy: children appear in the archive with a release; they are "
                     "not sold on the Commercial or Extended tiers.")

        if p.get("status") == "verified" and not p.get("raw_on_record"):
            bad(acc, "is marked verified while the RAW original is not recorded. "
                     "Verification is the RAW; without it the word means nothing.")

        if p.get("status") == "verified" and not p.get("image"):
            bad(acc, "is marked verified but names no image file")

        img = p.get("image")
        if img:
            path = os.path.join(IMAGES, img)
            if not os.path.exists(path):
                bad(acc, "names beta-art/img/%s, which does not exist" % img)

        # a capture record that is half-filled is worse than one that is empty,
        # because the gaps look like omissions rather than unknowns
        supplied = [k for k in ("captured", "camera", "lens", "exposure") if p.get(k)]
        if supplied and len(supplied) < 4 and p.get("status") == "verified":
            missing = [k for k in ("captured", "camera", "lens", "exposure") if not p.get(k)]
            bad(acc, "is verified with a partial capture record — missing %s"
                % ", ".join(missing))

    if report:
        print("%-11s %-20s %-11s %-8s %-4s %s" % ("ACCESSION", "TITLE", "STATUS", "RELEASE", "GEN", "IMAGE"))
        for p in plates:
            print("%-11s %-20s %-11s %-8s %-4s %s"
                  % (p.get("accession", "—"), (p.get("title") or "")[:20],
                     p.get("status", "—"), p.get("release") or "—",
                     "AI!" if p.get("generative") else "no",
                     p.get("image") or "— placeholder"))
        print()

    real = sum(1 for p in plates if p.get("image"))
    verified = sum(1 for p in plates if p.get("status") == "verified")
    print("%d plate(s) · %d with a real image · %d verified" % (len(plates), real, verified))

    if problems:
        print("\n%d problem(s):" % len(problems))
        for m in problems:
            print("   · %s" % m)
        return 1
    print("no problems")
    return 0


if __name__ == "__main__":
    sys.exit(main())
