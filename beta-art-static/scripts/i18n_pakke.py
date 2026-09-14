#!/usr/bin/env python3
"""A review packet for one language's interface strings.

Norwegian has 15 000 words spread over 27 pages, so its packet is a document.
Every other language is different: there are no page bodies, only the strings in
the language switcher — the navigation, the headings, the buttons, the copyright
line, the human-approved mark. Small, and on every single page.

That makes each of those reviews a sitting rather than a project, and worth
making easy to start. This lays the English and the target language side by
side, key by key, so a reviewer corrects in place instead of hunting.

    python3 tools/i18n_pakke.py tr        write docs/13-review-tr.md
    python3 tools/i18n_pakke.py --list    what each language costs to review
"""

import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FILES = [
    ("i18n.js", "Hub — the front door, shown on the entry page"),
    ("beta-art/i18n.js", "Beta Art — the archive"),
    ("beta-art-business/i18n.js", "Beta Art Business — the desk"),
    ("beta-art-blog/i18n.js", "Field Notes — the journal"),
]


def read_array(src, after):
    """One JSON array out of a JS file, by brace counting."""
    i = src.find(after)
    if i < 0:
        return None
    i = src.find("[", i)
    depth, j, in_str, esc = 0, i, False, False
    while j < len(src):
        c = src[j]
        if esc:
            esc = False
        elif c == "\\":
            esc = True
        elif c == '"':
            in_str = not in_str
        elif not in_str:
            if c == "[":
                depth += 1
            elif c == "]":
                depth -= 1
                if depth == 0:
                    try:
                        return json.loads(src[i:j + 1])
                    except ValueError:
                        return None
        j += 1
    return None


def load(rel, code):
    src = open(os.path.join(ROOT, rel), encoding="utf-8").read()
    keys = read_array(src, "var K=")
    en = read_array(src, '"en":')
    tgt = read_array(src, '"%s":' % code)
    if not (keys and en and tgt):
        return None
    return list(zip(keys, en, tgt))


def names():
    rec = json.load(open(os.path.join(ROOT, "languages.json"), encoding="utf-8"))
    return {l["code"]: l for l in rec["languages"]}


def listing():
    reg = names()
    print("%-4s %-12s %8s %8s  %s" % ("", "LANGUAGE", "STRINGS", "WORDS", "STATUS"))
    for code, l in reg.items():
        if code == "en":
            continue
        n = w = 0
        for rel, _ in FILES:
            rows = load(rel, code)
            if rows:
                n += len(rows)
                w += sum(len(t.split()) for _k, _e, t in rows)
        print("%-4s %-12s %8d %8d  %s" % (code, l["name"], n, w, l["status"]))
    print("\nNo language has page bodies of its own except Norwegian, which has 27.")


def packet(code):
    reg = names()
    if code not in reg:
        print("%s is not in languages.json" % code)
        return 1
    lang = reg[code]

    out = ["# Review packet — %s (%s)" % (lang["name"], lang["endonym"]),
           "",
           "Every %s string on the site, next to the English it stands beside."
           % lang["name"],
           "There are no %s page bodies: this is the whole of it. These strings "
           "appear" % lang["name"],
           "on all 100 pages, so a mistake here is a mistake everywhere.",
           "",
           "**This is not a translation check.** Do not ask whether it matches the "
           "English",
           "word for word. Ask whether a %s reader would write it that way, and "
           "whether" % lang["name"],
           "it means what the English means. Where the two must differ to read "
           "naturally,",
           "they should differ.",
           "",
           "Correct in the right-hand column. When it is done, set the row in "
           "`languages.json`",
           "to `\"status\": \"reviewed\"` with your name and the date, then run "
           "`python3 tools/languages.py --write`.",
           ""]

    total = 0
    for rel, title in FILES:
        rows = load(rel, code)
        if not rows:
            out += ["---", "", "## %s" % title, "",
                    "_No %s strings found in `%s`._" % (lang["name"], rel), ""]
            continue
        total += len(rows)
        out += ["---", "", "## %s" % title, "", "`%s` — %d strings" % (rel, len(rows)), "",
                "| Key | English | %s |" % lang["name"], "| --- | --- | --- |"]
        for k, en, tgt in rows:
            cell = lambda t: t.replace("|", "\\|").replace("\n", " ")
            out.append("| `%s` | %s | %s |" % (k, cell(en), cell(tgt)))
        out.append("")

    out += ["---", "", "## What a machine already checked",
            "",
            "So you do not have to: every language has the same number of strings "
            "as English",
            "(a missing one is a build error), none are empty, none are left in "
            "English by",
            "accident, and none are written in the wrong script. What no machine "
            "checked is",
            "whether any of it sounds like a person wrote it.", ""]

    path = os.path.join(ROOT, "docs", "13-review-%s.md" % code)
    open(path, "w", encoding="utf-8").write("\n".join(out) + "\n")
    print("wrote %s — %d strings" % (os.path.relpath(path, ROOT), total))
    return 0


def main():
    args = [a for a in sys.argv[1:] if a != "--list"]
    if "--list" in sys.argv or not args:
        listing()
        return 0
    return packet(args[0])


if __name__ == "__main__":
    sys.exit(main())
