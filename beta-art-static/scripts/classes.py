#!/usr/bin/env python3
"""A class on a page has a rule behind it.

This gate exists because of a mistake, and then because the same mistake was
found four more times in one sitting.

The hub's Norwegian page needed a two-language link where the English page has
a twelve-language picker. The markup for that already existed on the desk's
Norwegian pages, so it was copied. The CSS behind it was not — it lives in the
desk's stylesheet, and the hub keeps its styles inline. The result shipped as
`EnglishNorsk`: two words with no separator, in the browser's default blue,
underlined, on a site that has no blue and no underlined links anywhere.

Nothing failed. It is valid HTML that references a class, and no gate had any
opinion about whether the class meant anything. It was found by looking at a
screenshot.

Looking for the same shape elsewhere turned up four more:

  · the hub's 404 restated `.btn` but not `h1`, so the one page most likely to
    be reached by accident had its headline in Inter while every other page in
    the site has Fraunces — and the approval mark, which is the promise the
    whole archive rests on, rendered as an unspaced tick beside body text
  · the journal's 404 opened with `.lead`, a class the archive and the desk
    define and the journal does not. Its own name for that paragraph is
    `.standfirst`
  · twenty-five Norwegian service pages wrapped their pager in `.pager-inner`,
    a class from the archive's stylesheet. On the desk the grid is on `.pager`
    itself, so the wrapper collapsed three columns into one
  · the journal's Norwegian page had the same unstyled language pair as the hub

The common thread is markup moving between four properties that share class
names but not stylesheets. That is worth a gate, and the gate is cheap:

    for every page, collect the class names it uses and the rules it can
    actually reach — its inline <style> plus every stylesheet it links — and
    report any name with nothing behind it.

A class that only JavaScript keys off is not orphaned, so the page's scripts
are read too before anything is reported.

    python3 tools/classes.py
"""

import os
import re
import sys
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP = {".git", "node_modules", "docs", "tools", "skill-observations"}

CLASS_ATTR = re.compile(r'class="([^"]*)"')
CLASS_RULE = re.compile(r"\.(-?[A-Za-z_][\w-]*)")
STYLE_TAG = re.compile(r"<style[^>]*>(.*?)</style>", re.S)
CSS_LINK = re.compile(r'<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"')
JS_SRC = re.compile(r'<script[^>]+src="([^"]+)"')
JS_INLINE = re.compile(r"<script(?![^>]*src)[^>]*>(.*?)</script>", re.S)


def local(page, href):
    """A same-origin path this page pulls in, or None for anything remote."""
    if href.startswith(("http://", "https://", "//", "data:")):
        return None
    p = os.path.normpath(os.path.join(os.path.dirname(page), href.split("?")[0]))
    return p if os.path.exists(p) else None


def reachable_css(page, src):
    """Every rule this page can actually see: inline first, then its links."""
    css = "\n".join(STYLE_TAG.findall(src))
    for href in CSS_LINK.findall(src):
        f = local(page, href)
        if f:
            css += "\n" + open(f, encoding="utf-8").read()
    return css


def reachable_js(page, src):
    js = "\n".join(JS_INLINE.findall(src))
    for href in JS_SRC.findall(src):
        f = local(page, href)
        if f:
            js += "\n" + open(f, encoding="utf-8").read()
    return js


def pages():
    for d, dirs, files in os.walk(ROOT):
        dirs[:] = [x for x in dirs if x not in SKIP and not x.startswith(".")]
        for fn in sorted(files):
            if fn.endswith(".html"):
                yield os.path.join(d, fn)


def main():
    orphans = defaultdict(list)
    n = 0
    for page in pages():
        src = open(page, encoding="utf-8").read()
        n += 1
        defined = set(CLASS_RULE.findall(reachable_css(page, src)))
        js = reachable_js(page, src)
        used = set()
        for attr in CLASS_ATTR.findall(src):
            used |= set(attr.split())
        for c in sorted(used - defined):
            if c in js:                      # a hook, not a style — not orphaned
                continue
            orphans[c].append(os.path.relpath(page, ROOT))

    print("Class names with a rule behind them\n")
    print("  %d pages read" % n)

    if not orphans:
        print("\nEvery class used on every page resolves to a rule the page can reach.")
        return 0

    print()
    for c, ps in sorted(orphans.items(), key=lambda kv: (-len(kv[1]), kv[0])):
        where = ps[0] if len(ps) == 1 else "%s and %d more" % (ps[0], len(ps) - 1)
        print("  · .%s — used on %d page(s), no rule reachable from %s"
              % (c, len(ps), where))
    print("\nA class with no rule is markup that came from another property. "
          "Either bring the rule with it, or use the name this property "
          "already has for that thing.")
    print("total findings: %d" % len(orphans))
    return 1


if __name__ == "__main__":
    sys.exit(main())
