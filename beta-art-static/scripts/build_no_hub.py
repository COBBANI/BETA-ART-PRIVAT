#!/usr/bin/env python3
"""The hub's front door, at a Norwegian address.

The twelve-language switcher runs in the browser and never changes the URL, so
a search engine sees one English page and nothing else. `build_no.py` already
solved this for the desk; this does the same for the hub.

Nothing here is translated. Every string on the hub page carries a `data-i18n`
key, and Norwegian for all thirty-one of them is already written in `i18n.js`
— the same copy the switcher has always shown. This lifts that copy onto a
real, indexable address rather than inventing a second Norwegian.

Following the same rules as the desk's Norwegian pages: no client-side
switcher, because a page whose body is Norwegian should not have its chrome
silently become Turkish. An explicit link to the English page instead, and
hreflang in both directions.

    python3 tools/generators/build_no_hub.py
"""

import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
# Written, not translated — the same rule the rest of the Norwegian follows.
NO_TITLE = "BETA ART — tre nettsteder, ett arkiv"
NO_DESC = ("Inngangen til de tre nettstedene til Beta Art: det verifiserte "
           "arkivet, rettighetskontoret for bedrifter og tidsskriftet Field Notes.")

EN_URL = "https://start.beta-art.com/"
NO_URL = "https://start.beta-art.com/no/"


def read_array(src, after):
    """One JSON array out of the i18n file, by brace counting.

    The archive keeps all twelve languages on one line, so a line-anchored
    regex is no use here.
    """
    i = src.find(after)
    if i < 0:
        return None
    i = src.find("[", i)
    depth, j, in_str, esc = 0, i, False, False
    while j < len(src):
        c = src[j]
        if esc:
            esc = False
        elif c == "\\":
            esc = True
        elif c == '"':
            in_str = not in_str
        elif not in_str:
            if c == "[":
                depth += 1
            elif c == "]":
                depth -= 1
                if depth == 0:
                    return json.loads(src[i:j + 1])
        j += 1
    return None


def norwegian():
    src = open(os.path.join(ROOT, "i18n.js"), encoding="utf-8").read()
    keys = read_array(src, "var K=")
    no = read_array(src, '"no":')
    if not keys or not no or len(keys) != len(no):
        sys.exit("i18n.js: keys and Norwegian values do not line up")
    return dict(zip(keys, no))


def build():
    no = norwegian()
    src = open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()

    missing = [k for k in re.findall(r'data-i18n="([^"]+)"', src) if k not in no]
    if missing:
        sys.exit("no Norwegian for: %s" % ", ".join(missing))

    out = src

    # the page is Norwegian, and says so
    out = out.replace('<html lang="en">', '<html lang="no">', 1)

    # swap each translatable element's text for the Norwegian already written
    def swap(m):
        whole, key = m.group(0), m.group(1)
        if key not in no:
            return whole
        return re.sub(r">[^<]*<", ">" + no[key].replace("\\", "\\\\") + "<", whole, count=1)

    out = re.sub(r'<(?:p|h1|h2|h3|span|a)[^>]*data-i18n="([^"]+)"[^>]*>[^<]*</(?:p|h1|h2|h3|span|a)>',
                 swap, out)

    # attribute translations carry their own key; the Norwegian page has no
    # switcher to drive them, so they are resolved once, here
    for key, val in no.items():
        out = out.replace('data-i18n-attr="%s"' % key, 'data-i18n-attr-done="%s"' % key)

    # no client-side switcher on a Norwegian page
    out = out.replace('<script src="i18n.js"></script>', "", 1)
    out = re.sub(r'<div class="lang-slot" id="lang-slot"></div>',
                 '<p class="lang-pair"><a href="../" hreflang="en" lang="en">English</a>'
                 '<span aria-current="true">Norsk</span></p>', out, count=1)

    # addresses: this page lives one level down
    out = out.replace('href="legal.html', 'href="../legal.html')
    out = out.replace('href="report.html', 'href="../report.html')
    out = out.replace('href="i18n.js"', 'href="../i18n.js"')
    out = out.replace('src="i18n.js"', 'src="../i18n.js"')
    out = out.replace('<link rel="canonical" href="%s">' % EN_URL,
                      '<link rel="canonical" href="%s">' % NO_URL, 1)

    # hreflang, both directions
    alt = ('<link rel="alternate" hreflang="no" href="%s">\n'
           '<link rel="alternate" hreflang="en" href="%s">\n'
           '<link rel="alternate" hreflang="x-default" href="%s">' % (NO_URL, EN_URL, EN_URL))
    out = out.replace('<link rel="canonical" href="%s">' % NO_URL,
                      '<link rel="canonical" href="%s">\n%s' % (NO_URL, alt), 1)
    out = out.replace('<meta property="og:locale" content="en_GB">', "", 1)
    out = out.replace('<title>', '<meta property="og:locale" content="nb_NO">\n<title>', 1)

    # The title and the description carry no data-i18n key, so the swap above
    # never reached them: the Norwegian hub shipped with an English title and
    # an English description. Those are the two strings a search engine shows,
    # on the page built specifically to be found in Norwegian.
    out = re.sub(r"<title>.*?</title>", "<title>%s</title>" % NO_TITLE, out,
                 count=1, flags=re.S)
    for prop in ('name="description"', 'property="og:description"'):
        out = re.sub(r'<meta %s content="[^"]*">' % prop,
                     '<meta %s content="%s">' % (prop, NO_DESC), out, count=1)
    out = re.sub(r'<meta property="og:title" content="[^"]*">',
                 '<meta property="og:title" content="%s">' % NO_TITLE, out, count=1)

    d = os.path.join(ROOT, "no")
    os.makedirs(d, exist_ok=True)
    open(os.path.join(d, "index.html"), "w", encoding="utf-8").write(out)
    print("wrote no/index.html  (%d bytes)" % len(out.encode("utf-8")))

    # and the English page points here — hreflang is only honest in both directions
    en = open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
    if "hreflang" not in en:
        en = en.replace('<link rel="canonical" href="%s">' % EN_URL,
                        '<link rel="canonical" href="%s">\n%s' % (EN_URL, alt), 1)
        open(os.path.join(ROOT, "index.html"), "w", encoding="utf-8").write(en)
        print("added hreflang to index.html")
    else:
        print("index.html already carries hreflang")


if __name__ == "__main__":
    build()
