#!/usr/bin/env python3
"""Derive the structured data the pages already contain in their markup.

A breadcrumb trail is drawn on forty pages and none of it reached a search
result, because a trail a person can see is not a trail a crawler can read.
The same for sixteen answered questions on the archive. Rather than hand-write
JSON-LD forty times and let it drift from the visible page, this reads what
the page actually shows and emits the machine-readable form of exactly that.

Idempotent: running it twice changes nothing. Run it after any build.

    python3 tools/enrich.py
"""

import html
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROPS = {"": "", "beta-art": "", "beta-art-business": "", "beta-art-blog": ""}

MARK = "<!-- derived structured data — tools/enrich.py -->"


def strip(t):
    return html.unescape(re.sub(r"<[^>]+>", "", t)).strip()


def canonical(src):
    m = re.search(r'<link rel="canonical" href="([^"]+)"', src)
    return m.group(1) if m else None


def breadcrumb(src, url):
    """Read the visible <nav class="crumbs"> and say the same thing in JSON-LD."""
    m = re.search(r'<nav class="crumbs"[^>]*>(.*?)</nav>', src, re.S)
    if not m:
        return None
    base = url.rsplit("/", 1)[0]
    items, pos = [], 0
    for part in re.finditer(r'<a href="([^"]+)"[^>]*>(.*?)</a>|<span aria-current="page">(.*?)</span>',
                            m.group(1), re.S):
        href, label, current = part.group(1), part.group(2), part.group(3)
        pos += 1
        name = strip(label if label is not None else current)
        if not name:
            pos -= 1
            continue
        entry = {"@type": "ListItem", "position": pos, "name": name}
        if href:
            entry["item"] = href if href.startswith("http") else base + "/" + href.lstrip("./")
        items.append(entry)
    if len(items) < 2:
        return None
    return {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": items}


def faq(src):
    """Every <details><summary>question</summary><p>answer</p></details> pair."""
    qa = []
    for d in re.findall(r"<details[^>]*>(.*?)</details>", src, re.S):
        s = re.search(r"<summary[^>]*>(.*?)</summary>", d, re.S)
        if not s:
            continue
        answer = strip(d[s.end():])
        q = strip(s.group(1))
        if not q or len(answer) < 20:
            continue
        qa.append({"@type": "Question", "name": q,
                   "acceptedAnswer": {"@type": "Answer", "text": answer}})
    if len(qa) < 4:
        return None
    return {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": qa}


def existing_types(src):
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


def main():
    touched = 0
    for sub in PROPS:
        base = os.path.join(ROOT, sub)
        for f in sorted(os.listdir(base)):
            if not f.endswith(".html") or f == "404.html":
                continue
            path = os.path.join(base, f)
            src = open(path, encoding="utf-8").read()

            # drop anything this tool wrote last time, so it can be re-derived
            src = re.sub(re.escape(MARK) + r".*?</script>\n?", "", src, flags=re.S)

            url = canonical(src)
            have = existing_types(src)
            blocks = []

            if url and "BreadcrumbList" not in have:
                b = breadcrumb(src, url)
                if b:
                    blocks.append(b)
            if "FAQPage" not in have:
                q = faq(src)
                if q:
                    blocks.append(q)

            if blocks:
                emitted = "".join(
                    '%s\n<script type="application/ld+json">\n%s\n</script>\n'
                    % (MARK, json.dumps(b, ensure_ascii=False, indent=1)) for b in blocks)
                src = src.replace("</body>", emitted + "</body>", 1)
                touched += 1
                print("  %-46s %s" % (os.path.join(sub, f) if sub else f,
                                      ", ".join(b["@type"] for b in blocks)))
            open(path, "w", encoding="utf-8").write(src)

    print("\n  %d page(s) enriched" % touched)
    return 0


if __name__ == "__main__":
    sys.exit(main())
