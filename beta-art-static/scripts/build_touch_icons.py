#!/usr/bin/env python3
"""An icon for the home screen, because iOS will not read the favicon.

Every page here declares its favicon as an inline SVG data URI. That is the
right call — no file, no request, no dependency — and it works everywhere
except the one place it matters most for a portfolio: iOS ignores SVG
favicons entirely, so a Beta Art page saved to a home screen has been showing
a blank tile or a screenshot of the page.

The fix is one 180x180 PNG per property, at the property root. Safari falls
back to `/apple-touch-icon.png` when a page declares no icon link of its own,
so this covers every page in every property without touching a single line of
HTML — which matters because most of those pages are generated.

The mark is not redrawn here. It is the seal SVG already in the page, rendered
by the same browser the render gate uses, so the icon cannot drift from the
mark it is supposed to be.

    python3 tools/generators/build_touch_icons.py
"""

import json
import os
import re
import subprocess
import sys
import tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# each property, its source page, and the ground the mark sits on
PROPS = [
    ("", "index.html", "#FBFAF7"),                       # hub — paper
    ("beta-art", "index.html", "#FBFAF7"),               # archive — paper
    ("beta-art-business", "index.html", "#0F0F0F"),      # the desk — ink
    ("beta-art-blog", "index.html", "#FBFAF7"),          # journal — newsprint
]

SIZE = 180  # what iOS asks for; it downsamples for every smaller tile


def seal_svg(path):
    """The mark exactly as the page declares it.

    Preferring the inline seal, and falling back to the favicon data URI —
    the journal carries no inline seal but does declare a favicon, and that
    favicon is its mark. Either way the icon comes from the page rather than
    from a copy that can drift.
    """
    src = open(path, encoding="utf-8").read()
    m = re.search(r'<svg[^>]*class="seal-mark".*?</svg>', src, re.S)
    if not m:
        # The journal has no seal, and that is deliberate: its masthead is a
        # newspaper wordmark with a dateline, not a logo. But an icon does a
        # different job — it identifies one of four properties on a home
        # screen, and the guidance is explicit that inconsistent icons make
        # people mistake one product for several. The journal's own dateline
        # says "Beta Art", so it gets the Beta Art seal here while its
        # masthead stays exactly as designed.
        #
        # Falling back to the favicon was the first attempt and it was wrong:
        # that mark is drawn on a 32px canvas with r=4, so scaled to 180 it
        # filled 24x22 of the tile against the seal's 92x94, and its detail
        # collapsed at small sizes (luminance spread 212 against 255).
        return seal_svg(os.path.join(ROOT, "index.html"))
    svg = m.group(0)
    # the mark inherits its stroke from the page; state it so a standalone
    # render is not black-on-black
    if "currentColor" in svg:
        svg = svg.replace("currentColor", "#0F0F0F")
    return svg


def main():
    node = "/opt/node22/bin/node"
    pw = "/opt/node22/lib/node_modules/playwright"
    if not os.path.exists(pw):
        sys.exit("playwright not found at %s" % pw)

    jobs = []
    for sub, page, bg in PROPS:
        svg = seal_svg(os.path.join(ROOT, sub, page))
        if not svg:
            print("  %-20s no seal mark found in %s — skipped" % (sub or "hub", page))
            continue
        if bg == "#0F0F0F":                       # on ink, the mark is bone-white
            svg = svg.replace("#0F0F0F", "#F3F0E9")
        jobs.append({"out": os.path.join(ROOT, sub, "apple-touch-icon.png"),
                     "svg": svg, "bg": bg, "label": sub or "hub"})

    if not jobs:
        sys.exit("nothing to render")

    script = """
const { chromium } = require(%s);
const jobs = %s;
(async () => {
  const b = await chromium.launch();
  for (const j of jobs) {
    const p = await b.newPage({ viewport: { width: %d, height: %d } });
    await p.setContent(
      `<style>html,body{margin:0;height:100%%;display:grid;place-items:center;` +
      `background:${j.bg}}svg{width:74%%;height:74%%}</style>` + j.svg);
    await p.screenshot({ path: j.out, omitBackground: false });
    console.log("  " + j.label.padEnd(20) + " " + j.out.split("/").slice(-2).join("/"));
    await p.close();
  }
  await b.close();
})();
""" % (json.dumps(pw), json.dumps(jobs), SIZE, SIZE)

    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as fh:
        fh.write(script)
        tmp = fh.name
    env = dict(os.environ, PLAYWRIGHT_BROWSERS_PATH="/opt/pw-browsers")
    r = subprocess.run([node, tmp], capture_output=True, text=True, env=env, cwd=ROOT)
    os.unlink(tmp)
    print(r.stdout.strip())
    if r.returncode != 0:
        sys.exit(r.stderr.strip()[:400])

    for j in jobs:
        n = os.path.getsize(j["out"])
        print("  %-20s %d bytes" % (j["label"], n))


if __name__ == "__main__":
    main()
