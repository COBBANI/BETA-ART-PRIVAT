#!/usr/bin/env python3
"""RSS for the two things on this project that are actually periodicals.

A journal without a feed asks the reader to remember to come back. The pages
already carry everything a feed needs — canonical URL, title, description and a
publication date — so the feed is derived from them rather than maintained
alongside them. Nothing here can drift out of step with the pages, because
there is nothing here to keep in step.

    python3 tools/feed.py
"""

import os
import re
import sys
from email.utils import format_datetime
from datetime import datetime, timezone

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# property dir, article filename prefix, feed title, feed description
FEEDS = [
    ("beta-art-blog", "j-", "Field Notes — The Beta Art Journal",
     "How a verified photography archive is built: provenance, planning, light "
     "and licensing."),
    ("beta-art-business", "b-", "Beta Art Business — Insights",
     "Practical notes on websites, automation, search and running a small "
     "business in Norway."),
]


def meta(src, name, attr="name"):
    m = re.search(r'<meta %s="%s" content="([^"]*)"' % (attr, re.escape(name)), src)
    return m.group(1) if m else None


def date_of(src):
    d = meta(src, "article:published_time", "property")
    if not d:
        m = re.search(r'"datePublished"\s*:\s*"([0-9-]+)"', src)
        d = m.group(1) if m else None
    if not d:
        return None
    return datetime.strptime(d[:10], "%Y-%m-%d").replace(tzinfo=timezone.utc)


def unescape(t):
    return (t.replace("&mdash;", "—").replace("&amp;", "&")
             .replace("&lt;", "<").replace("&gt;", ">").replace("&quot;", '"'))


def cdata(t):
    return "<![CDATA[%s]]>" % unescape(t).replace("]]>", "]]&gt;")


def build(sub, prefix, title, desc):
    base = os.path.join(ROOT, sub)
    items = []
    for f in sorted(os.listdir(base)):
        if not (f.startswith(prefix) and f.endswith(".html")):
            continue
        src = open(os.path.join(base, f), encoding="utf-8").read()
        url = re.search(r'<link rel="canonical" href="([^"]+)"', src)
        when = date_of(src)
        if not url or not when:
            print("   skipped %s/%s — no canonical or no date" % (sub, f))
            continue
        head = re.search(r"<h1[^>]*>(.*?)</h1>", src, re.S)
        head = re.sub(r"<[^>]+>", "", head.group(1)).strip() if head else f
        items.append((when, url.group(1), head, meta(src, "description") or "",
                      re.search(r'"articleSection"\s*:\s*"([^"]+)"', src)))
    items.sort(key=lambda x: x[0], reverse=True)

    home = re.match(r"(https?://[^/]+)/", items[0][1]).group(1) + "/" if items else ""
    out = ['<?xml version="1.0" encoding="UTF-8"?>',
           '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
           "  <channel>",
           "    <title>%s</title>" % unescape(title),
           "    <link>%s</link>" % home,
           "    <description>%s</description>" % desc,
           "    <language>en</language>",
           "    <copyright>© 2026 Beta Art — Betül Öner. All rights reserved "
           "worldwide. No text or image here may be used as AI training data.</copyright>",
           '    <atom:link href="%sfeed.xml" rel="self" type="application/rss+xml"/>' % home]
    if items:
        out.append("    <lastBuildDate>%s</lastBuildDate>" % format_datetime(items[0][0]))
    for when, url, head, d, section in items:
        out += ["    <item>",
                "      <title>%s</title>" % cdata(head),
                "      <link>%s</link>" % url,
                "      <guid isPermaLink=\"true\">%s</guid>" % url,
                "      <pubDate>%s</pubDate>" % format_datetime(when),
                "      <description>%s</description>" % cdata(d)]
        if section:
            out.append("      <category>%s</category>" % section.group(1))
        out.append("    </item>")
    out += ["  </channel>", "</rss>", ""]

    path = os.path.join(base, "feed.xml")
    text = "\n".join(out)
    old = open(path, encoding="utf-8").read() if os.path.exists(path) else None
    if old != text:
        open(path, "w", encoding="utf-8").write(text)
    print("  %-20s %2d item(s)  %s" % (sub, len(items),
                                       "unchanged" if old == text else "written"))
    return len(items)


def main():
    print("Beta Art — feeds")
    total = 0
    for f in FEEDS:
        total += build(*f)
    return 0 if total else 1


if __name__ == "__main__":
    sys.exit(main())
