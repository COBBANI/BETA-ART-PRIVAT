#!/usr/bin/env python3
"""Beta Art — what is missing, rather than what is broken.

audit.py, qc.py and render-check.js all ask "is this correct?". This asks a
different question: "is this finished?" It looks for the things whose absence
costs something — structured data a search engine would use, form fields a
password manager cannot fill, pages with no way onward, headers nobody set.

    python3 tools/gaps.py
"""

import json
import os
import re
import sys
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROPS = {"hub": "", "archive": "beta-art",
         "business": "beta-art-business", "journal": "beta-art-blog"}

gaps = defaultdict(list)


def note(section, msg):
    gaps[section].append(msg)


def pages():
    out = []
    for sub in PROPS.values():
        base = os.path.join(ROOT, sub)
        for f in sorted(os.listdir(base)):
            if f.endswith(".html") and f != "404.html":
                out.append((sub, f, os.path.join(base, f)))
    return out


def read(p):
    return open(p, encoding="utf-8").read()


def ld_types(src):
    out = set()
    for block in re.findall(r'<script type="application/ld\+json">(.*?)</script>', src, re.S):
        try:
            data = json.loads(block)
        except ValueError:
            continue
        for obj in (data if isinstance(data, list) else [data]):
            if isinstance(obj, dict) and "@type" in obj:
                out.add(obj["@type"])
    return out


# ------------------------------------------------------- structured data
def check_structured_data():
    for sub, f, path in pages():
        src = read(path)
        types = ld_types(src)
        rel = os.path.join(sub, f) if sub else f

        # a page with a breadcrumb trail should say so in a form a search
        # engine can render as a trail
        if '<nav class="crumbs"' in src and "BreadcrumbList" not in types:
            note("structured data", "%s draws a breadcrumb but has no BreadcrumbList — "
                 "the trail never reaches a search result" % rel)

        # a page with an accordion of questions is a FAQ whether or not it says so
        n_q = len(re.findall(r"<summary>", src))
        if n_q >= 4 and "FAQPage" not in types:
            note("structured data", "%s answers %d questions with no FAQPage markup — "
                 "they cannot appear as rich results" % (rel, n_q))

        if not types:
            note("structured data", "%s carries no structured data at all" % rel)


# ------------------------------------------------------------------ forms
AUTOCOMPLETE = {
    "name": "name", "email": "email", "org": "organization",
    "organisation": "organization", "company": "organization",
    "phone": "tel", "tel": "tel",
}


def check_forms():
    for sub, f, path in pages():
        src = read(path)
        rel = os.path.join(sub, f) if sub else f
        for m in re.finditer(r"<(input|textarea|select)\b([^>]*)>", src):
            attrs = m.group(2)
            nm = re.search(r'name="([^"]+)"', attrs)
            typ = re.search(r'type="([^"]+)"', attrs)
            if not nm:
                continue
            name = nm.group(1)
            kind = typ.group(1) if typ else "text"
            if kind in ("hidden", "checkbox", "radio", "submit", "button"):
                continue
            want = AUTOCOMPLETE.get(name)
            if want and "autocomplete=" not in attrs:
                note("forms", '%s: <%s name="%s"> has no autocomplete="%s" — a browser '
                     "cannot fill it and the visitor retypes it" % (rel, m.group(1), name, want))
            if kind == "email" and "inputmode" not in attrs and m.group(1) == "input":
                pass  # type=email already picks the right keyboard
        if "<form" in src and 'novalidate' not in src and 'required' not in src:
            note("forms", "%s has a form with no required attributes — the browser "
                 "cannot help before the JavaScript runs" % rel)


# ------------------------------------------------------------- navigation
def check_reachability():
    """A page nothing links to is a page nobody finds."""
    inbound = defaultdict(set)
    for sub, f, path in pages():
        src = read(path)
        for href in re.findall(r'href="([^"#?]+\.html)', src):
            inbound[(sub, os.path.basename(href))].add(f)
    for sub, f, path in pages():
        if f == "index.html":
            continue
        n = len(inbound[(sub, f)] - {f})
        if n == 0:
            note("reachability", "%s is linked from nowhere — it exists only if you "
                 "know the URL" % (os.path.join(sub, f) if sub else f))
        elif n == 1:
            note("reachability", "%s has a single inbound link — one edit away from "
                 "being orphaned" % (os.path.join(sub, f) if sub else f))


# ------------------------------------------------------------------- copy
def check_thin_and_duplicate():
    seen_title, seen_desc = {}, {}
    for sub, f, path in pages():
        src = read(path)
        rel = os.path.join(sub, f) if sub else f
        body = re.sub(r"<script.*?</script>|<style.*?</style>", " ", src, flags=re.S)
        words = len(re.findall(r"[A-Za-zÀ-ÿ]+", re.sub(r"<[^>]+>", " ", body)))
        if words < 300:
            note("thin pages", "%s has about %d words — too little for a page that "
                 "should rank for anything" % (rel, words))
        t = re.search(r"<title>(.*?)</title>", src, re.S)
        d = re.search(r'<meta name="description" content="([^"]*)"', src)
        if t:
            key = t.group(1).strip()
            if key in seen_title:
                note("duplicate metadata", "%s and %s share a title — search engines "
                     "pick one and drop the other" % (rel, seen_title[key]))
            seen_title[key] = rel
        if d:
            key = d.group(1).strip()
            if key in seen_desc:
                note("duplicate metadata", "%s and %s share a description" % (rel, seen_desc[key]))
            seen_desc[key] = rel


# ------------------------------------------------------- conversion path
def check_next_step():
    """Every page should say what to do next. A page that ends is a page that loses."""
    for sub, f, path in pages():
        if sub != PROPS["business"]:
            continue
        src = read(path)
        rel = os.path.join(sub, f)
        if "<form" in src:
            continue          # the page is the conversation
        tail = src[src.rfind("</main>") - 6000: src.rfind("</main>")] if "</main>" in src else src
        if "quote.html" not in tail and "mailto:" not in tail:
            note("conversion", "%s ends without a way to start a conversation" % rel)


# ----------------------------------------------------------------- policy
def check_headers():
    cfg = os.path.join(ROOT, "vercel.json")
    if not os.path.exists(cfg):
        note("headers", "no vercel.json — the site sends no security headers at all: "
             "no Content-Security-Policy, no X-Content-Type-Options, no "
             "Referrer-Policy, no Permissions-Policy, and no 404 rewrite")
        return
    src = read(cfg)
    for h in ("Content-Security-Policy", "X-Content-Type-Options",
              "Referrer-Policy", "Permissions-Policy", "Strict-Transport-Security"):
        if h not in src:
            note("headers", "vercel.json does not set %s" % h)


def check_language_signals():
    """A twelve-language switcher that never changes the URL is invisible to a
    search engine. Report it per property, and only where it is still true."""
    for label, sub in PROPS.items():
        base = os.path.join(ROOT, sub)
        idx = os.path.join(base, "index.html")
        if not os.path.exists(idx):
            continue
        src = read(idx)
        if "i18n.js" not in src:
            continue
        langs = sorted({d for d in os.listdir(base)
                        if len(d) == 2 and os.path.isdir(os.path.join(base, d))})
        if "hreflang" in src and langs:
            continue          # real per-language addresses exist
        note("language", "%s offers twelve languages from one address%s. Until each "
             "language has its own URL, eleven of them are invisible to search — "
             "adding hreflang without the pages would be a false signal."
             % (label, " (%s/ exists but the home page does not link it)"
                % ", ".join(langs) if langs else ""))


def check_journal_depth():
    base = os.path.join(ROOT, PROPS["journal"])
    posts = [f for f in os.listdir(base) if f.endswith(".html") and f not in ("index.html", "404.html")]
    if len(posts) < 5:
        note("depth", "the journal has %d entry page(s). A journal with one entry is "
             "an announcement, not a journal" % len(posts))
    base = os.path.join(ROOT, PROPS["archive"])
    plates = [f for f in os.listdir(base) if re.match(r"(plate|p)-", f)]
    if not plates:
        note("depth", "the archive has no per-plate pages. The master prompt requires "
             "each photograph to have its own shareable URL, and licensing a plate "
             "from a page nobody can link to is a hard sell")


def main():
    print("Beta Art — what is missing\n")
    check_structured_data()
    check_forms()
    check_reachability()
    check_thin_and_duplicate()
    check_next_step()
    check_headers()
    check_language_signals()
    check_journal_depth()

    total = 0
    for section in sorted(gaps):
        items = gaps[section]
        total += len(items)
        print("%s — %d" % (section, len(items)))
        for m in items[:14]:
            print("   · %s" % m)
        if len(items) > 14:
            print("   · … and %d more" % (len(items) - 14))
        print()
    print("total gaps: %d" % total)
    # An inventory of unfinished work is not a failure — `git status` does not
    # exit non-zero for a dirty tree. `--strict` is there for anything that
    # wants to gate on it.
    if total:
        print("\nExit status is 0: this is a list of what is missing, not a "
              "defect report.\nTo gate on it, run `python3 tools/gaps.py --strict`.")
    return 1 if ("--strict" in sys.argv and total) else 0


if __name__ == "__main__":
    sys.exit(main())
