#!/usr/bin/env python3
"""One command for "is this correct?", and an honest answer about "is it ready?".

There is no build step here and no test suite, so there was no single thing to
run and no single thing to read. Thirteen commands sat in one list, two of them
reporting on work only a person can do, and the result was that "the checks
pass" had no true form: whoever ran the list saw red every time and learned to
stop looking.

So this splits the question the way the tools themselves already do.

  CORRECTNESS   defects. Every one must exit zero, and this command's exit
                status is theirs. If something here is red, something is
                broken and nothing should ship.

  READINESS     gaps.py and launch.py. They report what is not finished —
                a company not registered, a domain not bought, a plate not
                photographed, a lawyer who has not read the terms. They are
                printed here because they matter, and they are deliberately
                kept out of the exit status, because a tool that returned
                success for "the company is registered" would be lying about
                the one thing this repository exists to be careful about.

    python3 tools/check.py            correctness, plus the readiness summary
    python3 tools/check.py --fast     skip the browser gate (about 80s)
    python3 tools/check.py --quiet    exit status only
"""

import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

CORRECTNESS = [
    ("sitemap.py", "URLs follow the pages, and no two share one"),
    ("feed.py", "the feeds follow the articles"),
    ("enrich.py", "breadcrumb and FAQ structured data"),
    ("audit.py", "HTML"),
    ("qc.py", "JS, CSS, i18n, prices, hosts, nothing oversized shipped"),
    ("tokens.py", "a custom property is defined once, and resolves"),
    ("classes.py", "a class on a page has a rule behind it"),
    ("copy.py", "conversion copy"),
    ("claims.py", "a promise on a page is a promise in the notice"),
    ("klarsprak.py", "Norwegian against Språkrådet's klarspråk rules"),
    ("languages.py", "the notice says what languages.json records"),
    ("plates.py", "catalogue integrity"),
]

READINESS = [
    ("gaps.py", "what is still missing"),
    ("launch.py", "ready? machine answers vs. person answers"),
]


def run(cmd):
    r = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True)
    lines = [l.strip() for l in r.stdout.strip().splitlines() if l.strip()]
    # launch.py ends on a wrapped sentence, so the last physical line is a
    # fragment ("of them can be cleared from here."). Prefer the line that
    # carries the count.
    tail = ""
    for l in reversed(lines):
        if re.search(r"\d", l):
            tail = l
            break
    if not tail:
        tail = lines[-1] if lines else ""
    return r.returncode, tail


def main():
    fast = "--fast" in sys.argv
    quiet = "--quiet" in sys.argv
    failed = []

    if not quiet:
        print("CORRECTNESS — every one of these must be zero\n")
    for name, what in CORRECTNESS:
        rc, tail = run([sys.executable, os.path.join("tools", name)])
        if rc != 0:
            failed.append(name)
        if not quiet:
            print("  %s %-14s %s" % ("✓" if rc == 0 else "✗", name, what))

    if not fast:
        rc, tail = run(["node", os.path.join("tools", "render-check.js")])
        if rc != 0:
            failed.append("render-check.js")
        if not quiet:
            print("  %s %-14s %s" % ("✓" if rc == 0 else "✗",
                                     "render-check", "a real browser, four widths"))
    elif not quiet:
        print("    %-14s skipped (--fast)" % "render-check")

    if not quiet:
        print("\nREADINESS — not part of the exit status, and not a failure\n")
        for name, what in READINESS:
            rc, tail = run([sys.executable, os.path.join("tools", name)])
            print("  □ %-14s %s" % (name, tail or what))
        print("\n  These report what is not finished — a company not registered, a")
        print("  domain not bought, a plate not photographed, terms not read. They")
        print("  exit 0 because reporting is not failing; add --strict to either to")
        print("  gate a deploy on readiness. Neither may be quieted to look clean.")

    if failed:
        if not quiet:
            print("\n%d correctness gate(s) failing: %s" % (len(failed), ", ".join(failed)))
        return 1
    if not quiet:
        print("\nAll correctness gates pass.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
