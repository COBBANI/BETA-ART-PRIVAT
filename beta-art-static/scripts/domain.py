#!/usr/bin/env python3
"""The domain, in one place.

The host name was hard-coded 1527 times across 97 files — in every canonical
tag, every og:url, every hreflang, every sitemap, every robots.txt and inside
the JSON-LD. That made "which domain is this" not a decision but a mass edit,
which is the same as not being able to decide.

    python3 tools/domain.py --show                 what is in the files now
    python3 tools/domain.py --plan betaart.no      what a switch would change
    python3 tools/domain.py --set betaart.no       make the switch
    python3 tools/domain.py --set vercel           go back to the preview hosts

The mapping below is the decision. The archive sits at the apex because the
printed QR labels say `betaart.no` and each one has to resolve to a plate
page; a flagship on a subdomain would make every printed label wrong.

One thing this tool does not fix: the legal notice lives on the hub, so after
a switch it sits at start.betaart.no/legal.html and every property depends on
a fourth deployment staying alive for its terms to be readable. Moving
legal.html into the archive, at the apex, is the right follow-up — it is a
file move plus a link rewrite, not a rename, so it is deliberately out of
scope here.
"""

import argparse
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# property directory → (preview host, subdomain under a real domain)
PROPS = [
    ("beta-art",          "beta-art.com",  ""),          # apex
    ("beta-art-business", "business.beta-art.com", "business"),
    ("beta-art-blog",     "notater.beta-art.com",  "notater"),
    ("",                  "start.beta-art.com",          "start"),     # the hub
]

EXT = (".html", ".xml", ".txt", ".js", ".json", ".md")


def hosts_for(domain):
    """Return {preview host: target host} for the requested domain."""
    out = {}
    for _, preview, sub in PROPS:
        if domain == "vercel":
            out[preview] = preview
        else:
            out[preview] = domain if not sub else "%s.%s" % (sub, domain)
    return out


def files():
    out = []
    for base, dirs, names in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d not in (".git", "__pycache__", "node_modules")]
        for n in sorted(names):
            if n.endswith(EXT):
                out.append(os.path.join(base, n))
    return out


def current():
    """Every host that appears in a canonical tag, counted."""
    seen = {}
    for p in files():
        try:
            src = open(p, encoding="utf-8").read()
        except (UnicodeDecodeError, OSError):
            continue
        for h in re.findall(r"https://([a-z0-9.-]+\.(?:no|com|app))", src):
            seen[h] = seen.get(h, 0) + 1
    return seen


def apply(domain, dry):
    mapping = hosts_for(domain)
    # longest first, so a shorter host never matches inside a longer one
    order = sorted(mapping, key=len, reverse=True)
    touched, edits = 0, 0
    for p in files():
        try:
            src = open(p, encoding="utf-8").read()
        except (UnicodeDecodeError, OSError):
            continue
        out = src
        for h in order:
            if mapping[h] != h:
                out = out.replace(h, mapping[h])
        # going back to preview hosts means reversing the mapping
        if domain == "vercel":
            back = {}
            for _, preview, sub in PROPS:
                for d in sorted({v for v in current() if v.endswith((".no", ".com"))}, key=len, reverse=True):
                    root = d.split(".", 1)[1] if d.count(".") > 1 else d
                    want = root if not sub else "%s.%s" % (sub, root)
                    if want == d:
                        back[d] = preview
            for h in sorted(back, key=len, reverse=True):
                out = out.replace(h, back[h])
        if out != src:
            n = sum(1 for _ in re.finditer("|".join(re.escape(h) for h in order), src))
            edits += n
            touched += 1
            if not dry:
                open(p, "w", encoding="utf-8").write(out)
    return touched, edits


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument("--show", action="store_true", help="report the hosts in the files now")
    g.add_argument("--plan", metavar="DOMAIN", help="show what a switch would change")
    g.add_argument("--set", metavar="DOMAIN", help="rewrite every reference (or 'vercel' to revert)")
    args = ap.parse_args()

    if args.show:
        print("Hosts referenced in the repository:\n")
        for h, n in sorted(current().items(), key=lambda x: -x[1]):
            print("  %5d × %s" % (n, h))
        print("\nRun --plan <domain> to see what a switch would touch.")
        return 0

    domain = args.plan or args.set
    if domain != "vercel" and not re.match(r"^[a-z0-9-]+(\.[a-z0-9-]+)+$", domain):
        print("Not a domain: %s" % domain)
        return 2

    mapping = hosts_for(domain)
    print("Mapping:\n")
    for sub, preview, _ in PROPS:
        label = sub or "hub"
        print("  %-18s %s  ->  %s" % (label, preview, mapping[preview]))
    print()

    touched, edits = apply(domain, dry=bool(args.plan))
    verb = "would change" if args.plan else "changed"
    print("  %s %d reference(s) across %d file(s)" % (verb, edits, touched))
    if args.plan:
        print("\n  Nothing was written. Add --set to apply.")
    else:
        print("\n  Now run: python3 tools/sitemap.py && python3 tools/audit.py")
        print("  And point the DNS at Vercel before the canonicals resolve.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
