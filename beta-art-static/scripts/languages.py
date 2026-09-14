#!/usr/bin/env python3
"""The language-review status, written from the record rather than remembered.

The human-approved mark sits on 67 pages in twelve languages and says a person
has seen what is published. Eleven of those twelve were written by a machine and
have never been read by anyone who speaks them, so section 5 of the legal notice
states where the claim stops.

The decision was to keep the mark and let that paragraph shrink as reviews come
in. A paragraph that shrinks by hand is a paragraph that goes stale: the day
Norwegian is signed off, somebody has to remember this sentence exists, in a
file they are not otherwise editing. So the sentence is generated from
languages.json, and this checks that it still matches.

    python3 tools/languages.py            check
    python3 tools/languages.py --write    regenerate the sentence in legal.html

Exits non-zero on any finding.
"""

import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RECORD = os.path.join(ROOT, "languages.json")
NOTICE = os.path.join(ROOT, "legal.html")

OPEN = "<!-- generated from languages.json — tools/languages.py -->"
CLOSE = "<!-- /languages.json -->"

findings = []


def bad(msg):
    findings.append(msg)


def load():
    with open(RECORD, encoding="utf-8") as f:
        return json.load(f)["languages"]


TALL = {1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six",
        7: "seven", 8: "eight", 9: "nine", 10: "ten", 11: "eleven",
        12: "twelve", 13: "thirteen", 14: "fourteen", 15: "fifteen",
        16: "sixteen", 17: "seventeen", 18: "eighteen", 19: "nineteen",
        20: "twenty"}


def tallord(n):
    """A legal notice spells its numbers out."""
    return TALL.get(n, str(n))


def joined(names):
    if not names:
        return ""
    if len(names) == 1:
        return names[0]
    return ", ".join(names[:-1]) + " and " + names[-1]


def sentence(langs):
    """What the notice says, at whatever state the record is actually in.

    Four states have to read as English, not as a template with the numbers
    swapped: nothing reviewed, one reviewed, several reviewed, all reviewed.
    """
    source = [l for l in langs if l["status"] == "source"]
    done = [l for l in langs if l["status"] == "reviewed"]
    todo = [l for l in langs if l["status"] == "machine"]
    todo.sort(key=lambda l: (l.get("queue") or 99, l["name"]))
    src = joined([l["name"] for l in source]) or "English"

    if not todo:
        return ("<p><strong>It covers the translations too:</strong> every language "
                "on this site has been read and corrected by a native speaker. Who "
                "read which, and when, is recorded with the source.</p>")

    out = ["<p><strong>It does not yet cover:</strong> this site is written in "
           "%s languages. The %s is written and reviewed by a person."
           % (tallord(len(langs)), src)]

    if len(done) == 1:
        l = done[0]
        out.append(" %s has since been read and corrected by a native speaker "
                   "(%s, %s)." % (l["name"], l["reviewer"], l["date"]))
    elif done:
        out.append(" %s have since been read and corrected by native speakers."
                   % joined(["%s (%s, %s)" % (l["name"], l["reviewer"], l["date"])
                             for l in done]))

    out.append(" %s %s written by a machine and %s not been read by a native "
               "speaker of %s."
               % (joined([l["name"] for l in todo]),
                  "was" if len(todo) == 1 else "were",
                  "has" if len(todo) == 1 else "have",
                  "that language" if len(todo) == 1 else "those languages"))

    nxt = todo[0]
    out.append(" That is a fact about this build, not a permanent state: %s is "
               "next%s, and this paragraph shrinks as each language is signed off."
               % (nxt["name"],
                  " for a %s" % nxt["scope"] if nxt.get("scope") else ""))
    out.append("</p>")
    return "".join(out)


def main():
    write = "--write" in sys.argv
    langs = load()

    # ---- the record has to be able to back what it claims -----------------
    for l in langs:
        if l["status"] == "reviewed" and not (l.get("reviewer") and l.get("date")):
            bad("%s is marked reviewed with no reviewer or no date. A review "
                "nobody signed is not a review — the same rule the archive "
                "applies to a plate marked verified." % l["name"])
        if l["status"] not in ("source", "machine", "reviewed"):
            bad("%s has status %r, which is not one of source, machine, reviewed"
                % (l["name"], l["status"]))
        if l.get("date") and not re.fullmatch(r"\d{4}-\d{2}-\d{2}", l["date"]):
            bad("%s has date %r — use YYYY-MM-DD" % (l["name"], l["date"]))

    # ---- the switcher and the record have to agree ------------------------
    hub = open(os.path.join(ROOT, "i18n.js"), encoding="utf-8").read()
    m = re.search(r"var L=(\[.*?\]);", hub, re.S)
    if m:
        offered = {c for c, _n, _d in json.loads(m.group(1))}
        recorded = {l["code"] for l in langs}
        for c in sorted(offered - recorded):
            bad("the switcher offers %s and languages.json does not list it" % c)
        for c in sorted(recorded - offered):
            bad("languages.json lists %s and the switcher does not offer it" % c)

    # ---- and the notice has to say what the record says --------------------
    notice = open(NOTICE, encoding="utf-8").read()
    want = sentence(langs)
    block = re.search(re.escape(OPEN) + r"(.*?)" + re.escape(CLOSE), notice, re.S)
    if not block:
        bad("legal.html has no generated language block — run --write once to "
            "create it")
    elif block.group(1).strip() != want:
        if write:
            notice = notice[:block.start(1)] + want + notice[block.end(1):]
            open(NOTICE, "w", encoding="utf-8").write(notice)
            print("legal.html rewritten from languages.json")
        else:
            bad("legal.html no longer says what languages.json records — run "
                "tools/languages.py --write")

    if write and not block:
        old = re.search(r"<p><strong>It does not yet cover the translations.*?</p>",
                        notice, re.S)
        if old:
            notice = notice[:old.start()] + OPEN + want + CLOSE + notice[old.end():]
            open(NOTICE, "w", encoding="utf-8").write(notice)
            print("legal.html: language paragraph is now generated")
            findings.clear()

    n = sum(1 for l in langs if l["status"] == "reviewed")
    print("%d language(s) · %d read by a native speaker · %d finding(s)"
          % (len(langs), n, len(findings)))
    for f in findings:
        print("   · %s" % f)
    return 1 if findings else 0


if __name__ == "__main__":
    sys.exit(main())
