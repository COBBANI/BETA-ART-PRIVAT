#!/usr/bin/env python3
"""Field Notes, at a Norwegian address.

Same reasoning as `build_no.py` and `build_no_hub.py`: the twelve-language
switcher never changes the URL, so a search engine sees one English page per
address. For a journal written from inside a Norwegian archive, about the
Norwegian market, that is the wrong way round.

The Norwegian copy lives in `data_no_journal.py`, keyed by the English string.
It is written rather than translated, which is why it is a data table and not
a call to something automatic.

The essays themselves stay English for now, and every link to one says so with
`hreflang` and `lang` — the same honesty `build_no.py` applies to the desk's
English pages. A Norwegian index over English essays is a real thing a Nordic
publication does; a Norwegian index pretending the essays are Norwegian is not.

    python3 tools/generators/build_no_journal.py
"""

import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from data_no_journal import NO  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SUB = "beta-art-blog"

# Written, not translated — the same rule the rest of the Norwegian follows.
NO_DESC = ("Beta Arts tidsskrift om hvordan vi bygger et verifisert fotoarkiv: "
           "proveniens, de tre testene, opptaksplanlegging, lyset i nord og hva "
           "det koster å lisensiere.")

EN_URL = "https://notater.beta-art.com/"
NO_URL = "https://notater.beta-art.com/no/"


def build():
    src = open(os.path.join(ROOT, SUB, "index.html"), encoding="utf-8").read()
    out = src

    out = out.replace('<html lang="en">', '<html lang="no">', 1)

    # Substitute the longest strings first: "9 min" is a substring of several
    # longer byline strings, and replacing it early would corrupt them.
    done = 0
    for en in sorted(NO, key=len, reverse=True):
        needle = ">" + en + "<"
        if needle in out:
            out = out.replace(needle, ">" + NO[en] + "<")
            done += 1

    # every remaining link into an English essay says which language it lands in
    out = re.sub(r'<a([^>]*?)href="(j-[^"]+\.html)"',
                 r'<a\1hreflang="en" lang="en" href="../\2"', out)

    # no client-side switcher on a Norwegian page — the chrome must not
    # silently become Turkish under a Norwegian body
    out = re.sub(r'<script src="[^"]*i18n\.js"></script>', "", out)
    out = re.sub(r'<div class="lang-slot"[^>]*></div>',
                 '<p class="lang-pair"><a href="../" hreflang="en" lang="en">English</a>'
                 '<span aria-current="true">Norsk</span></p>', out, count=1)

    # addresses: this page sits one level down
    out = re.sub(r'href="(?!http|#|mailto:|\.\./)([^"]+)"', r'href="../\1"', out)
    out = re.sub(r'src="(?!http|data:|\.\./)([^"]+)"', r'src="../\1"', out)
    out = out.replace('href="../../', 'href="../')

    alt = ('<link rel="alternate" hreflang="no" href="%s">\n'
           '<link rel="alternate" hreflang="en" href="%s">\n'
           '<link rel="alternate" hreflang="x-default" href="%s">' % (NO_URL, EN_URL, EN_URL))
    out = re.sub(r'<link rel="canonical" href="[^"]*">',
                 '<link rel="canonical" href="%s">\n%s' % (NO_URL, alt), out, count=1)
    out = out.replace('<title>', '<meta property="og:locale" content="nb_NO">\n<title>', 1)

    # The title and the description carry no data-i18n key, so the substitution
    # above never reached them and the Norwegian page went out with an English
    # title. That is the one string a search engine shows, on the page whose
    # entire reason for existing is to be found in Norwegian.
    out = re.sub(r"<title>.*?</title>",
                 "<title>Field Notes — tidsskriftet til Beta Art</title>", out,
                 count=1, flags=re.S)
    out = re.sub(r'<meta name="description" content="[^"]*">',
                 '<meta name="description" content="%s">' % NO_DESC, out, count=1)
    out = re.sub(r'<meta property="og:title" content="[^"]*">',
                 '<meta property="og:title" content="Field Notes — tidsskriftet '
                 'til Beta Art">', out, count=1)
    out = re.sub(r'<meta property="og:description" content="[^"]*">',
                 '<meta property="og:description" content="%s">' % NO_DESC, out, count=1)

    d = os.path.join(ROOT, SUB, "no")
    os.makedirs(d, exist_ok=True)
    open(os.path.join(d, "index.html"), "w", encoding="utf-8").write(out)
    print("wrote %s/no/index.html — %d of %d strings substituted" % (SUB, done, len(NO)))

    untouched = [en for en in NO if ">" + en + "<" in out]
    if untouched:
        print("  still English on the page: %s" % ", ".join(repr(u)[:40] for u in untouched[:5]))

    # hreflang is only honest in both directions
    en_path = os.path.join(ROOT, SUB, "index.html")
    en_src = open(en_path, encoding="utf-8").read()
    if "hreflang" not in en_src:
        en_src = re.sub(r'<link rel="canonical" href="([^"]*)">',
                        lambda m: '<link rel="canonical" href="%s">\n%s' % (m.group(1), alt),
                        en_src, count=1)
        open(en_path, "w", encoding="utf-8").write(en_src)
        print("  added hreflang to %s/index.html" % SUB)


if __name__ == "__main__":
    build()
