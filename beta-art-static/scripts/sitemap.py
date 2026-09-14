#!/usr/bin/env python3
"""Rebuild every sitemap.xml from the pages that actually exist.

The sitemaps were written by hand and fell behind the moment the business
site grew from six pages to forty-six. This regenerates all four from the
canonical URL each page declares, so they cannot drift again.

    python3 tools/sitemap.py
"""

import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROPS = ["", "beta-art", "beta-art-business", "beta-art-blog"]

# how often a page changes, and how much it matters, by shape of filename
def rank(name):
    name = name.rsplit("/", 1)[-1]
    if name == "index.html":
        return "weekly", "1.0"
    if name in ("services.html", "blog.html", "quote.html"):
        return "weekly", "0.9"
    if name.startswith("s-"):
        return "monthly", "0.8"
    if name.startswith("b-") or name.startswith("j-"):
        return "monthly", "0.7"
    if name in ("legal.html", "privacy.html"):
        return "yearly", "0.3"
    return "monthly", "0.6"


def canonical(path):
    src = open(path, encoding="utf-8").read()
    m = re.search(r'<link rel="canonical" href="([^"]+)"', src)
    return m.group(1) if m else None


def build(sub):
    base = os.path.join(ROOT, sub)
    # a 404 is reachable by accident, never by crawl — it is noindex and
    # must not be advertised
    pages = []
    # the hub is the repository root, so the other three properties sit inside
    # it on disk while being separate deployments — never list their pages here
    SKIP = set(PROPS) | {".git", "tools", "docs", "__pycache__", "node_modules"}
    for here, dirs, files in os.walk(base):
        dirs[:] = [d for d in dirs
                   if not d.startswith(".") and os.path.join(sub, d).strip("/") not in SKIP
                   and d not in SKIP]
        for f in sorted(files):
            if f.endswith(".html") and f != "404.html":
                pages.append(os.path.relpath(os.path.join(here, f), base))
    pages.sort()
    if not pages:
        return None
    # the home page settles the host; every other page hangs off it
    home = canonical(os.path.join(base, "index.html"))
    if not home:
        print("  %s: index.html has no canonical link — skipped" % (sub or "hub"))
        return None
    host = home.rstrip("/")

    rows = []
    for name in pages:
        url = canonical(os.path.join(base, name))
        if not url:
            url = host + "/" + name
        elif name == "index.html":
            # only the property's own front door collapses to the bare host.
            # This used to be endswith(), which quietly folded every nested
            # index.html — no/index.html among them — onto the root URL: the
            # language page vanished from the sitemap and the root appeared
            # twice.
            url = host + "/"
        freq, pri = rank(name)
        rows.append((url, freq, pri))
    # home first, then by descending priority, then alphabetically
    rows.sort(key=lambda r: (-float(r[2]), r[0]))

    out = ['<?xml version="1.0" encoding="UTF-8"?>',
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for url, freq, pri in rows:
        out += ["  <url>",
                "    <loc>%s</loc>" % url,
                "    <changefreq>%s</changefreq>" % freq,
                "    <priority>%s</priority>" % pri,
                "  </url>"]
    out.append("</urlset>")

    # A URL listed twice is not a warning, it is a bug upstream: two different
    # pages resolved to one address, so one of them is not in the sitemap at
    # all. That is exactly how no/index.html went missing while the root
    # appeared twice, and nothing caught it.
    seen = [u for u, _f, _p in rows]
    dupes = sorted({u for u in seen if seen.count(u) > 1})
    if dupes:
        for u in dupes:
            print("  %s: %s is listed %d times — two pages share one address, "
                  "so one of them is missing" % (sub or "hub", u, seen.count(u)))
        return None

    return "\n".join(out) + "\n", len(rows)


def main():
    # build() returns None when it could not produce a sitemap it trusts — a
    # missing canonical, or two pages sharing one address. That used to print
    # and carry on, so this exited zero while a property had no sitemap at
    # all. A gate that cannot fail is not a gate.
    failed = []
    for sub in PROPS:
        result = build(sub)
        if not result:
            failed.append(sub or "hub")
            continue
        xml, n = result
        target = os.path.join(ROOT, sub, "sitemap.xml")
        old = open(target, encoding="utf-8").read() if os.path.exists(target) else ""
        with open(target, "w", encoding="utf-8") as fh:
            fh.write(xml)
        state = "unchanged" if old == xml else "rewritten"
        print("  %-18s %2d url(s)  %s" % (sub or "hub", n, state))
    if failed:
        print("\nno sitemap written for: %s" % ", ".join(failed))
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
