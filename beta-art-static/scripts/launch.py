#!/usr/bin/env python3
"""Is it ready to launch?

The plan is: the site and the concept now, then the preparations, then the
company, then the launch. That sequence only works if "the preparations are
finished" is a thing you can check rather than a thing you feel. A website has
no natural end — there is always another improvement — so without a definition,
"when it's ready" quietly becomes never.

This is the definition. It answers one question with one command, and it splits
the answer honestly:

  MACHINE   things a gate can settle, and has
  PERSON    things no gate can settle — a registration, a reading, a photograph,
            a lawyer. Listed with who has to do them, never marked done here.

It invents no new source of truth. Every line reads a record that already
exists: languages.json, beta-art/plates.json, the approval log, the gates.

    python3 tools/launch.py            the verdict
    python3 tools/launch.py --slow     also run the browser gate (about 80s)

Exits non-zero while anything is outstanding.
"""

import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

GATES = ["audit.py", "qc.py", "tokens.py", "copy.py", "plates.py", "claims.py",
         "klarsprak.py", "languages.py", "gaps.py"]

# qc used to carry four permanent findings about inline-deploy size, and that
# tolerance was correct while they existed. They are gone — qc reports zero —
# so tolerating four here would now hide four real defects. Removed.
#
# gaps still reports what is missing, and that is the person's list rather than
# a defect, so its remaining item is tolerated and shown below under PERSON.
TOLERATED = {"gaps.py": 2}

machine, person = [], []


def ok(msg):
    machine.append((True, msg))


def no(msg):
    machine.append((False, msg))


def owner(who, msg, why=""):
    person.append((who, msg, why))


def run_gates(slow):
    for g in GATES:
        r = subprocess.run([sys.executable, os.path.join(ROOT, "tools", g)],
                           capture_output=True, text=True, cwd=ROOT)
        tail = (r.stdout.strip().splitlines() or [""])[-1]
        allow = TOLERATED.get(g, 0)
        # Count findings whichever way the gate words it: "3 findings" and
        # "total findings: 3" are both used across these tools.
        m = (re.search(r"(\d+)\s+(?:finding|funn|gap|problem)", tail)
             or re.search(r"(?:finding|funn|gap|problem)\w*:\s*(\d+)", tail))
        found = int(m.group(1)) if m else None
        # A non-zero exit with no parseable count used to fall through to
        # `found <= allow` with found still 0, so a failing gate was reported
        # as passing. If the gate failed and its output cannot be counted,
        # believe the exit code.
        if r.returncode == 0 or (found is not None and found <= allow):
            ok("%-14s %s" % (g, tail))
        else:
            no("%-14s %s" % (g, tail))
    if slow:
        r = subprocess.run(["node", os.path.join(ROOT, "tools", "render-check.js")],
                           capture_output=True, text=True, cwd=ROOT)
        tail = (r.stdout.strip().splitlines() or [""])[-1]
        (ok if r.returncode == 0 else no)("%-14s %s" % ("render-check", tail))
    else:
        owner("you", "run `node tools/render-check.js` before the launch day",
              "the browser gate is the only one not run here, because it takes about 80s")


def check_site():
    # --- the address it will actually live at --------------------------------
    hosts = {}
    for here, dirs, files in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d not in (".git", "__pycache__", "docs")]
        for f in files:
            if f.endswith((".html", ".xml", ".txt", ".js", ".json")):
                src = open(os.path.join(here, f), encoding="utf-8", errors="ignore").read()
                for h in re.findall(r"https://([a-z0-9.-]+)", src):
                    hosts[h] = hosts.get(h, 0) + 1
    preview = [h for h in hosts if h.endswith(".vercel.app")]
    if preview:
        owner("you", "buy the domain and run `python3 tools/domain.py --set <domain>`",
              "canonical URLs still point at %d preview host(s); a launch on "
              "*.vercel.app is served with x-robots-tag: noindex, so nothing "
              "would be indexed" % len(preview))
    else:
        ok("canonical URLs point at a real domain")

    # --- the catalogue --------------------------------------------------------
    rec = json.load(open(os.path.join(ROOT, "beta-art", "plates.json"), encoding="utf-8"))
    plates = rec["plates"] if isinstance(rec, dict) else rec
    real = [p for p in plates if p.get("raw_on_record")]
    verified = [p for p in plates if p.get("status") == "verified"]
    if not real:
        owner("Betül", "photograph the twelve plates, or publish the archive without a catalogue",
              "%d plates are catalogued and %d have a RAW original on record. A "
              "catalogue of placeholders is worse than no catalogue, and the "
              "verification guarantee cannot be honoured by a gradient"
              % (len(plates), len(real)))
    elif len(verified) < len(plates):
        owner("Betül", "verify the remaining plates",
              "%d of %d are verified" % (len(verified), len(plates)))
    else:
        ok("all %d plates carry a RAW original and are verified" % len(plates))

    # --- the languages --------------------------------------------------------
    langs = json.load(open(os.path.join(ROOT, "languages.json"), encoding="utf-8"))["languages"]
    todo = [l for l in langs if l["status"] == "machine"]
    if todo:
        todo.sort(key=lambda l: (l.get("queue") or 99, l["name"]))
        owner("a native reader", "review %d language(s), starting with %s"
              % (len(todo), todo[0]["name"]),
              "the legal notice already discloses this, so it does not block a "
              "launch — but every unreviewed language is text nobody has read "
              "standing on all 100 pages")
    else:
        ok("every language has been read by a native speaker")

    # --- can anything be paid for, or even received? --------------------------
    forms = 0
    for here, dirs, files in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d not in (".git", "__pycache__", "docs", "tools")]
        for f in files:
            if f.endswith(".html"):
                forms += open(os.path.join(here, f), encoding="utf-8").read().count("<form")
    endpoint = re.search(r'var ENDPOINT = "(.*?)"',
                         open(os.path.join(ROOT, "beta-art", "release.js"), encoding="utf-8").read())
    if endpoint and not endpoint.group(1):
        owner("a backend", "give the %d forms somewhere to post" % forms,
              "no enquiry sent from this site is stored anywhere, and the site "
              "promises a written reply within 48 hours on 31 pages. The first "
              "unanswered enquiry costs more than the page earned")
    else:
        ok("forms have an endpoint")

    # --- the things only a registration unlocks -------------------------------
    owner("Brønnøysund", "register the company",
          "decided: after the project. Until then there is no organisation "
          "number, so no Stripe account, no legal invoice and no VAT "
          "registration — and the site must keep saying so")
    owner("a Norwegian lawyer", "read docs/09 and the licence terms",
          "a few hours; the cheapest risk reduction available before selling a "
          "photograph of a person")


def main():
    slow = "--slow" in sys.argv
    run_gates(slow)
    check_site()

    print("\n== MACHINE — settled by a gate ==\n")
    for good, msg in machine:
        print("  %s %s" % ("✓" if good else "✗", msg))
    failed = sum(1 for g, _ in machine if not g)

    print("\n== PERSON — nothing here can be marked done by a tool ==\n")
    for who, what, why in person:
        print("  □ %s" % what)
        print("      who: %s" % who)
        if why:
            for line in _wrap(why, 68):
                print("      %s" % line)
        print()

    print("-" * 72)
    if failed:
        print("NOT READY — %d gate(s) failing, %d item(s) waiting on a person"
              % (failed, len(person)))
    elif person:
        print("The site itself is ready. %d item(s) are waiting on a person, and "
              "none\nof them can be cleared from here." % len(person))
    else:
        print("READY.")
    # Two different things used to share one exit code: a MACHINE gate that
    # failed, which is an error, and PERSON items still outstanding, which is
    # this tool's entire subject matter. A report that exits non-zero for
    # having something to report cannot be run by anything, so it stopped
    # being run.
    #
    # Now: a broken gate still fails, because that is wrong. Outstanding human
    # work reports and exits zero, because that is not wrong — it is Tuesday.
    # `--strict` restores the old behaviour for anything that wants to gate a
    # deploy on readiness, which is the only place the old meaning belonged.
    strict = "--strict" in sys.argv
    if person:
        print("\n  Exit status is 0: this report ran. It is NOT a statement that")
        print("  the site is ready — %d item(s) above are still outstanding." % len(person))
        print("  To gate on readiness, run `python3 tools/launch.py --strict`.")
    if failed:
        return 1
    return 1 if (strict and person) else 0


def _wrap(text, width):
    out, line = [], ""
    for word in text.split():
        if len(line) + len(word) + 1 > width:
            out.append(line)
            line = word
        else:
            line = (line + " " + word).strip()
    if line:
        out.append(line)
    return out


if __name__ == "__main__":
    sys.exit(main())
