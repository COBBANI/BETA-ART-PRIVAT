#!/usr/bin/env python3
"""Conversion copy, measured.

Every other quality on this project is checked rather than asserted —
contrast, links, structured data, legal claims. Copy was the exception: it was
written carefully and then trusted. This closes that.

It checks the things a conversion copywriter checks in a review, and one thing
only this project cares about: the master prompt bans six words by name, and
nothing was enforcing that.

    python3 tools/copy.py            check
    python3 tools/copy.py --report   check, and print the numbers per page

Exits non-zero on any finding.
"""

import os
import re
import sys
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROPS = ["", "beta-art", "beta-art-business", "beta-art-blog"]

# The master prompt's own "what NOT to do" list. Never enforced until now.
BANNED = ["revolutionary", "cutting-edge", "cutting edge", "seamless",
          "next-generation", "next generation", "unlock", "empower",
          "game-changer", "game changer", "leverage", "synergy",
          "best-in-class", "world-class", "state-of-the-art"]

# Calls to action that tell the reader nothing about what happens next.
WEAK_CTA = {"submit", "click here", "learn more", "read more", "find out more",
            "get started", "continue", "go", "here", "more", "send"}

findings = defaultdict(list)
stats = []


def note(section, msg):
    findings[section].append(msg)


def pages():
    out = []
    for sub in PROPS:
        base = os.path.join(ROOT, sub)
        for here, dirs, files in os.walk(base):
            dirs[:] = [d for d in dirs
                       if d not in (".git", "tools", "docs", "__pycache__", "img")
                       and os.path.relpath(os.path.join(here, d), ROOT) not in PROPS]
            for f in sorted(files):
                if f.endswith(".html") and f != "404.html":
                    out.append((sub, os.path.relpath(os.path.join(here, f), ROOT)))
            break   # only the property root; subdirectories are handled by their own entry
    # the language subdirectories still need covering
    for sub in PROPS:
        d = os.path.join(ROOT, sub, "no")
        if os.path.isdir(d):
            for f in sorted(os.listdir(d)):
                if f.endswith(".html"):
                    out.append((sub, os.path.relpath(os.path.join(d, f), ROOT)))
    return out


def visible_text(src):
    """The body copy, and only that.

    The first version of this counted the <title>, the navigation and the
    filter buttons as prose, so every page appeared to contain one enormous
    punctuation-free sentence. Chrome is not copy: a reader does not read a
    menu, and measuring it says nothing about whether the page persuades.
    """
    s = re.sub(r"<head>.*?</head>", " ", src, flags=re.S | re.I)
    s = re.sub(r"<(script|style|svg|nav|header|footer|form|select)[^>]*>.*?</\1>",
               " ", s, flags=re.S | re.I)
    s = re.sub(r"<aside[^>]*>.*?</aside>", " ", s, flags=re.S | re.I)
    # keep only what is inside <main>, where there is one
    m = re.search(r"<main[^>]*>(.*?)</main>", s, flags=re.S | re.I)
    if m:
        s = m.group(1)
    s = re.sub(r"<!--.*?-->", " ", s, flags=re.S)
    s = re.sub(r"<[^>]+>", " ", s)
    s = (s.replace("&amp;", "&").replace("&nbsp;", " ").replace("&mdash;", "—")
          .replace("&#39;", "'").replace("&quot;", '"').replace("&uuml;", "ü")
          .replace("&Ouml;", "Ö").replace("&copy;", "©"))
    return re.sub(r"\s+", " ", s).strip()


def main():
    report = "--report" in sys.argv

    for sub, rel in pages():
        path = os.path.join(ROOT, rel)
        src = open(path, encoding="utf-8").read()
        text = visible_text(src)
        low = text.lower()
        words = re.findall(r"[^\W\d_]+", text, re.U)
        if len(words) < 80:
            continue        # a form-only page has nothing to measure

        # ---- the master prompt's banned vocabulary --------------------
        for w in BANNED:
            if re.search(r"\b" + re.escape(w) + r"\b", low):
                note("banned words", '%s uses "%s" — the master prompt names it as a '
                     "word not to use" % (rel, w))

        # ---- who the page is about ------------------------------------
        # Conversion copy addresses the reader. A page where the studio
        # outnumbers the reader is a page talking about itself.
        you = len(re.findall(r"\b(you|your|yours|du|deg|din|ditt|dine)\b", low))
        we = len(re.findall(r"\b(we|our|ours|us|vi|vår|vårt|våre|oss)\b", low))
        ratio = (you / we) if we else (99.0 if you else 0.0)
        if we >= 8 and ratio < 0.8:
            note("who it is about", "%s says we/our %d times and you/your %d — the page "
                 "is about the studio, not the reader" % (rel, we, you))

        # ---- is there a next action, and is it the only one? ----------
        ctas = re.findall(r'<a[^>]+class="[^"]*\bbtn\b[^"]*"[^>]*>(.*?)</a>', src, re.S)
        ctas = [re.sub(r"<[^>]+>", "", c).strip() for c in ctas]
        ctas = [c for c in ctas if c]
        legalish = os.path.basename(rel) in ("legal.html", "report.html", "release.html")
        if not ctas and "<form" not in src and not legalish:
            note("next action", "%s offers the reader no button at all — it ends" % rel)
        for c in ctas:
            plain = re.sub(r"[^a-zà-ÿ ]", "", c.lower()).strip()
            if plain in WEAK_CTA:
                note("next action", '%s: the button says "%s", which tells the reader '
                     "nothing about what happens next" % (rel, c))

        # ---- can it be scanned? ---------------------------------------
        # Only prose. A price card or a definition list has no full stops by
        # design; counting it as one long sentence measures the markup, not
        # the writing.
        body = re.sub(r"<head>.*?</head>", " ", src, flags=re.S | re.I)
        body = re.sub(r"<(script|style|svg|nav|header|footer|aside)[^>]*>.*?</\1>",
                      " ", body, flags=re.S | re.I)
        body = re.sub(r'<(article|li|dl)[^>]*class="[^"]*\b(plate|card|staff|entry|res-card|svc-card)\b[^"]*"[^>]*>.*?</\1>',
                      " ", body, flags=re.S | re.I)
        prose = " ".join(re.sub(r"<[^>]+>", " ", x)
                         for x in re.findall(r"<p[^>]*>(.*?)</p>", body, re.S))
        prose = re.sub(r"\s+", " ", prose.replace("&amp;", "&").replace("&nbsp;", " ")).strip()
        sentences = [s for s in re.split(r"(?<=[.!?])\s+", prose) if len(s.split()) > 3]
        if sentences:
            avg = sum(len(s.split()) for s in sentences) / len(sentences)
            longest = max(sentences, key=lambda s: len(s.split()))
            if avg > 26:
                note("scannability", "%s averages %.0f words a sentence — above about 25 "
                     "people stop scanning and start skipping" % (rel, avg))
            if len(longest.split()) > 55:
                note("scannability", "%s has a %d-word sentence: “%s…”"
                     % (rel, len(longest.split()), " ".join(longest.split()[:12])))

        # ---- does the headline say anything? --------------------------
        h1 = re.search(r"<h1[^>]*>(.*?)</h1>", src, re.S)
        if h1:
            head = re.sub(r"<[^>]+>", "", h1.group(1)).strip()
            hw = head.split()
            lead = re.search(r'class="(?:lead|strapline|standfirst|sub-head)"[^>]*>(.*?)</p>',
                             src, re.S)
            lead_words = len(re.sub(r"<[^>]+>", "", lead.group(1)).split()) if lead else 0
            if len(hw) <= 3 and not re.search(r"\d", head) and lead_words < 7:
                note("headline", '%s: the headline is “%s” and no lead follows it. '
                     "A label needs a claim under it or the page opens with nothing."
                     % (rel, head))
            if len(hw) > 14:
                note("headline", '%s: the headline runs to %d words — it will be read as '
                     "a paragraph and skipped" % (rel, len(hw)))

        stats.append((rel, len(words), you, we, round(ratio, 2), len(ctas),
                      round(sum(len(s.split()) for s in sentences) / max(len(sentences), 1))))

    if report:
        print("%-46s %6s %5s %5s %6s %4s %5s"
              % ("PAGE", "WORDS", "YOU", "WE", "RATIO", "CTA", "SENT"))
        for r in sorted(stats, key=lambda x: x[4]):
            print("%-46s %6d %5d %5d %6.2f %4d %5d" % r)
        print()

    total = 0
    for section in sorted(findings):
        items = findings[section]
        total += len(items)
        print("%s — %d" % (section, len(items)))
        for m in items[:12]:
            print("   · %s" % m)
        if len(items) > 12:
            print("   · … and %d more" % (len(items) - 12))
        print()
    print("%d page(s) measured · %d finding(s)" % (len(stats), total))
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main())
