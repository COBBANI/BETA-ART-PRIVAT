#!/usr/bin/env python3
"""A promise on a page has to be a promise in the notice.

Every other gate on this project checks a mechanism: does the HTML parse, does
the contrast pass, does the catalogue record back what the plate claims. None of
them read what the site actually promises a customer, and that turned out to be
where the drift was.

Three real faults, found by hand, are the reason this file exists:

  · The hub promised a refund if a verified plate turned out to be machine-made.
    The legal notice said generated imagery is never accessioned — an intention
    with no remedy — and the archive's own FAQ said refunds were limited to
    delivery failures, contradicting the hub outright.
  · "Within 48 hours" appeared on thirty-one pages and in no terms anywhere.
  · The fourth item on the guarantees card said one thing in English and a
    different thing in Norwegian, on all fifty pages, for the same service.

So: each claim below names the words that state it, the section of the notice
that has to back it, and the wording that would contradict it. A claim that
appears on a page and nowhere in the notice is a promise nobody has to keep.

    python3 tools/claims.py
    python3 tools/claims.py --report   list every page each claim appears on

Exits non-zero on any finding.
"""

import os
import re
import sys
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NOTICE = os.path.join(ROOT, "legal.html")

# id, what it promises, how it is said (any match counts), the anchor in the
# legal notice that must back it, the words that must appear under that anchor,
# and any wording that would contradict the claim wherever it appears.
CLAIMS = [
    dict(
        id="verification-guarantee",
        commits='refunded in full|comes back in full',
        promise="a machine-generated plate sold as verified is refunded in full",
        said=[r"licence fee is refunded in full",
              r"licence fee comes back in\s+full",
              r"lisensbel\u00f8pet refunderes"],
        anchor="verification-guarantee",
        backed=[r"refunded in full", r"no time limit"],
        contradicts=[r"refunds are limited to\s+technical delivery failures or duplicate charges"],
    ),
    dict(
        id="reply-48h",
        commits='promised|guarantee|free of charge',
        promise="a written scope and a fixed price within 48 hours",
        said=[r"within 48 hours", r"innen 48 timer"],
        anchor="terms",
        backed=[r"within 48 hours"],
        contradicts=[],
    ),
    dict(
        id="two-revisions",
        commits='are included|inkludert',
        promise="two revision rounds are included",
        said=[r"[Tt]wo revision rounds", r"To revisjonsrunder"],
        anchor="terms",
        backed=[r"[Tt]wo revision rounds are included"],
        contradicts=[r"one revision round is included"],
    ),
    dict(
        id="source-files",
        promise="the client receives the source files",
        said=[r"[Aa]ll source files handed over", r"Alle filer og tilganger overlevert"],
        anchor="terms",
        backed=[r"you receive the economic rights", r"code and configuration"],
        contradicts=[],
    ),
    dict(
        id="no-training",
        commits='never|aldri',
        promise="client material is never used to train a model",
        said=[r"never trains a model", r"trener aldri en modell"],
        anchor="ai",
        backed=[r"never submitted to a model that trains on it"],
        contradicts=[],
    ),
    dict(
        id="withdrawal-14",
        commits='you have|right to withdraw|right of withdrawal',
        promise="consumers have 14 days to withdraw",
        said=[r"14-day right of withdrawal", r"14 days? to withdraw", r"14 dagers angrerett"],
        anchor="refunds",
        backed=[r"14 days", r"Angrerettloven"],
        contradicts=[r"all sales are final"],
    ),
    dict(
        # The mark is on 67 pages in 12 languages and reads, in each of them,
        # "nothing is published here until a person has seen it and approved
        # it". Eleven of those twelve languages were written by a machine and
        # have never been read by anyone who speaks them — including the
        # sentence making the claim. The mark is not withdrawn; its edges are
        # stated, and the notice has to keep stating them.
        id="human-approved",
        commits="[Aa] person decides what goes up",
        promise="nothing is published until a person has approved it",
        said=[r"Human approved", r"Menneskelig godkjent"],
        anchor="human-approved",
        backed=[r"[Aa] person decides what goes up",
                # holds in both states: while languages are outstanding, and
                # on the day the last one is signed off
                r"read by a native speaker"],
        contradicts=[],
    ),
]

# A promise made in one language and not the other is two different contracts.
# Each pair is (English wording, the Norwegian wording that must accompany it).
TRANSLATED = [
    ("<li>Written scope, fixed price</li>",
     "<li>Skriftlig omfang og fast pris f\u00f8r arbeid starter</li>"),
    ("<li>Two revision rounds included</li>",
     "<li>To revisjonsrunder inkludert</li>"),
    ("<li>All source files handed over</li>",
     "<li>Alle filer og tilganger overlevert</li>"),
    ("<li>Your material never trains a model</li>",
     "<li>Materialet ditt trener aldri en modell</li>"),
]

findings = defaultdict(list)


def note(section, msg):
    findings[section].append(msg)


def pages():
    out = []
    for sub in ["", "beta-art", "beta-art-business", "beta-art-blog"]:
        base = os.path.join(ROOT, sub)
        for here, dirs, files in os.walk(base):
            dirs[:] = [d for d in dirs if d not in
                       (".git", "tools", "docs", "__pycache__", "img",
                        "beta-art", "beta-art-business", "beta-art-blog")]
            for f in sorted(files):
                if f.endswith(".html"):
                    out.append(os.path.relpath(os.path.join(here, f), ROOT))
            if sub == "":
                break       # the hub is the repository root
    return sorted(set(out))


def section_of(notice, anchor):
    """The text of one <article id="..."> in the legal notice."""
    m = re.search(r'<article id="%s".*?</article>' % re.escape(anchor), notice, re.S)
    if m:
        return m.group(0)
    # the guarantee lives under a heading inside a section, not its own article
    m = re.search(r'<h3 id="%s".*?(?=<h3|</article>)' % re.escape(anchor), notice, re.S)
    return m.group(0) if m else None


def main():
    report = "--report" in sys.argv
    notice = open(NOTICE, encoding="utf-8").read()
    src = {p: open(os.path.join(ROOT, p), encoding="utf-8").read() for p in pages()}
    where = {}

    for c in CLAIMS:
        # ---- is it backed, and under the right heading? -------------------
        body = section_of(notice, c["anchor"])
        if body is None:
            note("unbacked", "%s: the notice has no section '#%s' to carry it"
                 % (c["id"], c["anchor"]))
            continue
        blocks = re.findall(r"<(?:p|li)[^>]*>.*?</(?:p|li)>", body, re.S)
        matched = []
        for phrase in c["backed"]:
            hits = [b for b in blocks if re.search(phrase, b)]
            if not hits and re.search(phrase, body):
                hits = [body]           # the phrase sits in a heading or bare text
            if not hits:
                note("unbacked", "legal.html #%s does not say \u201c%s\u201d, so the promise "
                     "\u201c%s\u201d is made on the site and kept nowhere"
                     % (c["anchor"], phrase, c["promise"]))
            matched += hits
        # The words are there, but only in passing. A mention is not an
        # undertaking: this is what let the 48-hour promise look backed when
        # its commitment sentence had been taken out. Backing may run across
        # several paragraphs — the human-approved mark states what it covers in
        # one and what it does not cover in the next — so the undertaking has
        # to appear somewhere in the backing, not in every part of it.
        if matched and c.get("commits") and not any(re.search(c["commits"], h) for h in matched):
            note("mentioned, not promised",
                 "legal.html #%s carries the words but never undertakes anything, so "
                 "\u201c%s\u201d is described rather than owed" % (c["anchor"], c["promise"]))

        # ---- where is it said? --------------------------------------------
        said_on = [p for p, s in src.items()
                   if p != "legal.html" and any(re.search(w, s) for w in c["said"])]
        where[c["id"]] = said_on
        if not said_on and c["id"] != "verification-guarantee":
            note("orphan clause", "the notice carries %s and no page ever makes the "
                 "promise \u2014 either say it or drop the clause" % c["id"])

        # ---- does anything contradict it? ----------------------------------
        for p, s in src.items():
            for bad in c["contradicts"]:
                if re.search(bad, s):
                    note("contradiction", "%s contradicts %s: it still says \u201c%s\u201d"
                         % (p, c["id"], re.sub(r"\\s\+", " ", bad)))

    # ---- the same promise in both languages -------------------------------
    for en, no in TRANSLATED:
        en_pages = {p for p, s in src.items() if en in s}
        no_pages = {p for p, s in src.items() if no in s}
        if en_pages and not no_pages:
            note("one language only", "%d page(s) promise \u201c%s\u201d and no Norwegian "
                 "page promises its equivalent" % (len(en_pages), re.sub(r"<[^>]+>", "", en)))
        elif en_pages and len(no_pages) != len(en_pages):
            note("one language only", "\u201c%s\u201d appears on %d English page(s) but its "
                 "Norwegian equivalent on %d" % (re.sub(r"<[^>]+>", "", en),
                                                 len(en_pages), len(no_pages)))

    if report:
        for c in CLAIMS:
            print("%-24s %d page(s)" % (c["id"], len(where.get(c["id"], []))))
            for p in where.get(c["id"], [])[:6]:
                print("     %s" % p)
            if len(where.get(c["id"], [])) > 6:
                print("     \u2026 and %d more" % (len(where[c["id"]]) - 6))
        print()

    total = 0
    for section in sorted(findings):
        items = findings[section]
        total += len(items)
        print("%s \u2014 %d" % (section, len(items)))
        for m in items[:12]:
            print("   \u00b7 %s" % m)
        if len(items) > 12:
            print("   \u00b7 \u2026 and %d more" % (len(items) - 12))
        print()
    print("%d claim(s) checked across %d page(s) \u00b7 %d finding(s)"
          % (len(CLAIMS), len(src), total))
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main())
