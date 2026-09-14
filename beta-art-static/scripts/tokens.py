#!/usr/bin/env python3
"""Custom properties: defined once, resolved always.

This gate exists because of a mistake, which is the only reason any of the
others exist either.

A block of spacing, type and motion tokens was appended to the `:root` of three
stylesheets that already had tokens of their own. The block included `--ease`.
All three files already defined `--ease`, with a different curve. CSS is
last-wins, so the new one silently changed the easing of every transition in
every one of those properties.

Nothing failed. `audit.py` was happy, `qc.py` was happy, the browser gate
reported zero findings, and a screenshot review would have passed it, because
the difference between two easing curves is not something you catch by looking
at a still image. It was found by reading the diff, which is not a method.

So: three checks, all of them cheap.

    1. No custom property is defined twice in the same rule block. The second
       definition wins, and nobody meant to write it.
    2. Every var(--x) resolves to a definition in the same file.
    3. Small type does not fall below the 12px floor. The legal and navigation
       text is set in the mono face, and below 12px it stops being readable —
       which was the entire point of introducing the scale.

Run it after touching any stylesheet:

    python3 tools/tokens.py
"""

import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

FILES = [
    ("index.html", "the hub"),
    ("beta-art/styles.css", "the archive"),
    ("beta-art-business/styles.css", "the desk"),
    ("beta-art-blog/styles.css", "the journal"),
]

# 12px at the default root size. Below this the mono face stops being
# reliably readable, and it carries the licence terms and the approval mark.
FLOOR_REM = 0.75

DEF = re.compile(r"(--[a-z0-9-]+)\s*:")
USE = re.compile(r"var\(\s*(--[a-z0-9-]+)")
SIZE = re.compile(r"font-size:\s*(\d*\.?\d+)rem")


def blocks(src):
    """Every {...} rule body, with the line it starts on.

    Brace counting rather than a CSS parser: the hub keeps its stylesheet
    inline in a <style> element, and no dependency is worth adding here.
    """
    out, depth, start = [], 0, None
    for i, c in enumerate(src):
        if c == "{":
            if depth == 0:
                start = i + 1
            depth += 1
        elif c == "}" and depth:
            depth -= 1
            if depth == 0:
                out.append((src.count("\n", 0, start) + 1, src[start:i]))
    return out


def check(rel, label):
    path = os.path.join(ROOT, rel)
    if not os.path.exists(path):
        return ["%s: missing" % rel]
    src = open(path, encoding="utf-8").read()
    found = []

    # 1 — the same property defined twice inside one block
    for line, body in blocks(src):
        seen = {}
        for m in DEF.finditer(body):
            name = m.group(1)
            at = line + body.count("\n", 0, m.start())
            if name in seen:
                found.append(
                    "%s:%d  %s is defined again here, having been set at line %d. "
                    "The later one wins, so the earlier is dead — and if they differ, "
                    "everything using it quietly changed."
                    % (rel, at, name, seen[name]))
            else:
                seen[name] = at

    # 2 — a var() with nothing behind it
    defined = set(DEF.findall(src))
    for m in USE.finditer(src):
        if m.group(1) not in defined:
            at = src.count("\n", 0, m.start()) + 1
            found.append("%s:%d  var(%s) resolves to nothing in this file"
                         % (rel, at, m.group(1)))

    # 3 — small type below the floor
    for m in SIZE.finditer(src):
        v = float(m.group(1))
        if v < FLOOR_REM:
            at = src.count("\n", 0, m.start()) + 1
            found.append(
                "%s:%d  font-size: %grem is %.1fpx, under the %gpx floor. If it is "
                "there to make something fit, take the width out of tracking, padding "
                "or a gap instead — that is what the header bars do."
                % (rel, at, v, v * 16, FLOOR_REM * 16))

    return found


def main():
    total = []
    print("Custom properties and the small-type floor\n")
    for rel, label in FILES:
        f = check(rel, label)
        print("  %-30s %-14s %s" % (rel, label, "ok" if not f else "%d finding(s)" % len(f)))
        total += f

    if not total:
        print("\nEvery custom property is defined once and resolves, and no type "
              "falls under %gpx." % (FLOOR_REM * 16))
        return 0

    print()
    for f in total:
        print("  · %s" % f)
    print("\ntotal findings: %d" % len(total))
    return 1


if __name__ == "__main__":
    sys.exit(main())
