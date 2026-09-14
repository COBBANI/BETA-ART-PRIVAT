#!/usr/bin/env python3
"""One page per plate.

Two documents require this and neither can work without it. The master prompt:
"Each photograph gets its own shareable URL." The QR plate labels: "Each QR
links to the plate's verification page." A QR code printed on a physical label
that resolves to a page which does not exist is worse than no QR code.

The pages are generated from the plate records the collection grid already
holds, so the catalogue and the plate pages cannot disagree.

    python3 tools/../build_plates.py
"""
import os
import re
import json
import html

ROOT = "/home/user/BETA-ART"
OUT = os.path.join(ROOT, "beta-art")
SITE = "https://beta-art.com"
HUB = "https://start.beta-art.com"

src = open(os.path.join(OUT, "index.html"), encoding="utf-8").read()
i = src.find('id="collection"')
j = src.find("</section>", i)

PLATES = []
for a in re.findall(r'<article class="plate.*?</article>', src[i:j], re.S):
    acc_line = re.search(r"</span>([^<]*)</p>", a).group(1).strip()
    acc, _, rest = acc_line.partition("·")
    PLATES.append(dict(
        title=re.search(r"<h3>(.*?)</h3>", a).group(1),
        category=re.search(r'data-category="([^"]*)"', a).group(1),
        keywords=re.search(r'data-keywords="([^"]*)"', a).group(1),
        frame=re.search(r"plate-frame (plate-\d+)", a).group(1),
        accession=acc.strip(),
        note=rest.strip() or "Capture details to be supplied",
        status=(re.search(r'class="status[^"]*">(.*?)</p>', a) or [None, "Awaiting verified original"])[1]
               if re.search(r'class="status[^"]*">(.*?)</p>', a) else "Awaiting verified original",
    ))

# a stable slug from the title: this is the address a printed QR resolves to,
# so it must never change once a label exists
def slug(t):
    return re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-")

for p in PLATES:
    p["slug"] = slug(p["title"])
    p["url"] = "%s/plate-%s.html" % (SITE, p["slug"])

TIERS = [("Personal", "kr 190", "Private, non-commercial use. One project, one user."),
         ("Commercial", "kr 890", "One business: marketing, web, social and print to 5 000 copies."),
         ("Extended", "kr 2 900", "Unlimited print, campaigns, products for resale, one client sublicence."),
         ("Custom &amp; exclusive", "Price on request", "Exclusivity windows, buy-outs and commissioned work.")]

HEAD = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} — Plate {acc} · Beta Art</title>
<meta name="description" content="{desc}">
<meta name="author" content="Betül Öner">
<meta name="copyright" content="© 2026 Beta Art — Betül Öner. All rights reserved worldwide.">
<meta name="rights" content="All rights reserved. Licensed use only, on the terms named on the invoice.">
<meta name="robots" content="index,follow,noai,noimageai">
<link rel="canonical" href="{url}">
<meta name="theme-color" content="#FBFAF7">
<meta property="og:url" content="{url}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Beta Art">
<meta property="og:title" content="{title} — Plate {acc}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="{site}/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Beta Art Archive — verified human photography.">
<meta name="twitter:image" content="{site}/og.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23FBFAF7'/%3E%3Ccircle cx='16' cy='16' r='4' fill='%238B1A1A'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>

<header class="masthead" id="top">
<div class="wrap masthead-inner">
<a class="wordmark" href="index.html" aria-label="Beta Art, home">
<svg class="seal-mark" viewBox="0 0 100 100" aria-hidden="true">
<g fill="none" stroke="currentColor" stroke-width="4">
<circle cx="50" cy="50" r="46"/>
<path d="M50 30 75.81 11.92M67.32 40 84.99 47.86M67.32 60 76.66 84.02M50 70 24.19 88.08M32.68 60 15.01 52.14M32.68 40 23.34 15.98"/>
</g>
<circle cx="50" cy="50" r="7" fill="currentColor"/>
</svg>
<span class="wordmark-text">
<span class="wordmark-name">BETA ART</span>
<span class="wordmark-sub">Verified human photography</span>
</span>
</a>
<nav class="nav" id="primary-nav" aria-label="Primary">
<a href="index.html#collection">Collection</a>
<a href="index.html#verification">Verification</a>
<a href="index.html#photographer">Photographer</a>
<a href="index.html#licensing">Licensing</a>
<a href="index.html#request">Contact</a>
</nav>
<div class="masthead-actions">
<div class="lang-slot" id="lang-slot"></div>
<button class="menu-btn" id="menu-btn" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu">
<span class="burger" aria-hidden="true"></span>
</button>
</div>
</div>
</header>
"""

FOOT = """
<footer class="footer">
<div class="wrap">
<p class="human-mark"><svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="7.1" fill="none" stroke="currentColor" stroke-width="1.4"></circle><path d="M4.7 8.2 7 10.5 11.3 5.7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"></path></svg><span data-i18n="mark.human">Human approved</span></p>
<p class="human-mark-note" data-i18n="mark.human.note">Nothing is published here until a person has seen it and approved it.</p>
<p class="fine-print" data-i18n="legal.copyright">© 2026 Beta Art — Betül Öner. All rights reserved worldwide. Every photograph, catalogue record and page design is a protected work.</p>
<nav aria-label="Legal">
<a href="{hub}/legal.html">Legal notice</a>
<a href="{hub}/legal.html#licence">Licence terms</a>
<a href="{hub}/legal.html#privacy">Privacy</a>
<a href="{hub}/legal.html#ai">AI &amp; training data</a>
<a href="mailto:hallo@beta-art.com">hallo@beta-art.com</a>
</nav>
</div>
</footer>
<script src="i18n.js"></script>
<script src="script.js"></script>
</body>
</html>
"""


def page(p, prev, nxt):
    desc = ("%s — plate %s in the Beta Art archive. Original photograph, RAW file on record, "
            "licensed directly from the photographer from kr 190." % (p["title"], p["accession"]))
    ld = [
      {"@context": "https://schema.org", "@type": "ImageObject",
       "name": p["title"], "identifier": p["accession"], "url": p["url"],
       "description": desc, "inLanguage": "en",
       "keywords": p["keywords"], "genre": p["category"],
       "creator": {"@type": "Person", "name": "Betül Öner"},
       "copyrightHolder": {"@type": "Person", "name": "Betül Öner"},
       "copyrightYear": 2026,
       "creditText": "Beta Art — Betül Öner",
       "acquireLicensePage": p["url"] + "#licensing",
       "license": HUB + "/legal.html#licence",
       "offers": [{"@type": "Offer", "name": n, "price": pr.replace("kr ", "").replace(" ", ""),
                   "priceCurrency": "NOK", "availability": "https://schema.org/InStock",
                   "url": p["url"] + "#licensing"}
                  for n, pr, _ in TIERS if pr.startswith("kr")]},
      {"@context": "https://schema.org", "@type": "BreadcrumbList",
       "itemListElement": [
         {"@type": "ListItem", "position": 1, "name": "Archive", "item": SITE + "/"},
         {"@type": "ListItem", "position": 2, "name": "Collection", "item": SITE + "/#collection"},
         {"@type": "ListItem", "position": 3, "name": p["title"]}]},
    ]
    tiers = "\n".join(
      '<div><dt>%s</dt><dd>%s<span>%s</span></dd></div>' % (n, pr, d) for n, pr, d in TIERS)

    return HEAD.format(title=p["title"], acc=p["accession"], desc=html.escape(desc, quote=True),
                       url=p["url"], site=SITE) + f"""
<main id="main">

<article class="plate-page">
<div class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">
<a href="index.html" data-i18n="crumb.home">Archive</a> <span aria-hidden="true">·</span>
<a href="index.html#collection">Collection</a> <span aria-hidden="true">·</span>
<span aria-current="page">{p['title']}</span>
</nav>
</div>

<div class="wrap plate-layout">
<div class="plate-stage">
<div class="plate-frame {p['frame']} plate-large" role="img"
     aria-label="Placeholder for {p['title']} — awaiting the verified original"></div>
<p class="mono-note">Preview is a placeholder. The verified original is released only after a licence
is issued, at full resolution, with the capture record attached.</p>
</div>

<div class="plate-detail">
<p class="eyebrow">Plate {p['accession']} · {p['category'].title()}</p>
<h1>{p['title']}</h1>
<p class="status is-pending">{p['status']}</p>

<h2 class="visually-hidden">Catalogue record</h2>
<dl class="record">
<div><dt>Accession</dt><dd>{p['accession']}</dd></div>
<div><dt>Title</dt><dd>{p['title']}</dd></div>
<div><dt>Category</dt><dd>{p['category'].title()}</dd></div>
<div><dt>Capture record</dt><dd>{p['note']}</dd></div>
<div><dt>RAW original</dt><dd>On record. Available for inspection on request.</dd></div>
<div><dt>Made by</dt><dd>A person, with a physical camera. Nothing generated, composited or AI-enhanced.</dd></div>
<div><dt>Keywords</dt><dd>{p['keywords'].replace(',', ' · ')}</dd></div>
</dl>

<p class="fine-print">This page is the permanent address for plate {p['accession']}. The QR code on the
printed label resolves here, and it will keep resolving here — an accession number is issued once and
is never reused.</p>

<div class="actions">
<a class="btn btn-solid" href="index.html#request">Request this plate</a>
<a class="btn btn-outline" href="#licensing">Licence tiers</a>
</div>
</div>
</div>

<section class="section" id="licensing">
<div class="wrap">
<div class="section-head">
<p class="eyebrow">Licensing</p>
<h2>What you can buy, and what it costs.</h2>
<p class="lead">Every tier is granted to the entity named on the invoice, for the media, term and
territory stated there. Licences are non-exclusive unless exclusivity is bought separately. No tier,
at any price, permits use as training data for a generative model.</p>
</div>
<dl class="record record-tiers">
{tiers}
</dl>
<p class="fine-print">Prices are starting points in NOK excluding VAT. The full terms are in the
<a href="{HUB}/legal.html#licence">licence section of the legal notice</a>, which governs every sale.</p>
</div>
</section>

<section class="section" id="verification">
<div class="wrap">
<div class="section-head">
<p class="eyebrow">Verification</p>
<h2>How this plate is evidenced.</h2>
</div>
<ol class="tick-list">
<li><strong>The RAW original is archived.</strong> Every plate begins as a RAW file from a physical
camera. Originals are held offline and can be produced on request.</li>
<li><strong>The capture record travels with the image.</strong> Camera, lens, exposure, place and date
accompany the file. Where the equipment supports it, C2PA credentials are embedded at capture.</li>
<li><strong>The licence is signed by the maker.</strong> You license directly from the photographer —
a written licence, a proper invoice, and a numbered certificate. No intermediary.</li>
</ol>
</div>
</section>

<nav class="pager" aria-label="Other plates">
<div class="wrap pager-inner">
<a class="pager-prev" href="plate-{prev['slug']}.html"><span class="eyebrow">Previous plate</span>{prev['title']}</a>
<a class="pager-all" href="index.html#collection">All twelve plates</a>
<a class="pager-next" href="plate-{nxt['slug']}.html"><span class="eyebrow">Next plate</span>{nxt['title']}</a>
</div>
</nav>

</article>
</main>
<script type="application/ld+json">
{json.dumps(ld, ensure_ascii=False, indent=1)}
</script>
""" + FOOT.format(hub=HUB)


for n, p in enumerate(PLATES):
    prev = PLATES[n - 1]
    nxt = PLATES[(n + 1) % len(PLATES)]
    open(os.path.join(OUT, "plate-%s.html" % p["slug"]), "w", encoding="utf-8").write(page(p, prev, nxt))
print("%d plate sayfası yazıldı" % len(PLATES))

# link the collection grid to them, so the pages are reachable and the QR
# address is discoverable from the catalogue itself
idx = open(os.path.join(OUT, "index.html"), encoding="utf-8").read()
changed = 0
for p in PLATES:
    old = "<h3>%s</h3>" % p["title"]
    new = '<h3><a href="plate-%s.html">%s</a></h3>' % (p["slug"], p["title"])
    if new in idx:
        continue
    if old in idx:
        idx = idx.replace(old, new, 1)
        changed += 1
open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(idx)
print("koleksiyon ızgarasında %d başlık bağlandı" % changed)
