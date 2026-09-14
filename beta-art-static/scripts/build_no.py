#!/usr/bin/env python3
"""Norwegian pages, at their own addresses.

The twelve-language switcher runs in the browser and never changes the URL, so
a search engine sees one English page per address and nothing else. For a
studio selling to Norway that is the single largest gap on the site: the
market it sells to cannot find it in the language it reads.

These are real pages at /no/, indexable, linked to their English counterparts
with hreflang in both directions. They carry no client-side switcher — a page
whose body is Norwegian should not have its chrome silently become Turkish —
but they do carry an explicit link to the English version, and the English
pages now link here.

    python3 build_no.py
"""
import sys, os, json, html, re
sys.path.insert(0, os.path.dirname(__file__))
from data import S
from data_no import NO

OUT = "/home/user/BETA-ART/beta-art-business/no"
SITE = "https://business.beta-art.com"
HUB = "https://start.beta-art.com"
os.makedirs(OUT, exist_ok=True)

BY = {s["slug"]: s for s in S}
ORDER = [s["slug"] for s in S]


def strip(t):
    return html.unescape(re.sub(r"<[^>]+>", "", t))


def head(title, desc, slug):
    en = "%s/s-%s.html" % (SITE, slug) if slug else "%s/" % SITE
    no = "%s/no/s-%s.html" % (SITE, slug) if slug else "%s/no/" % SITE
    return f"""<!DOCTYPE html>
<html lang="no">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{html.escape(desc, quote=True)}">
<meta name="author" content="Betül Öner">
<meta name="copyright" content="© 2026 Beta Art — Betül Öner. Alle rettigheter forbeholdt verden over.">
<meta name="robots" content="index,follow,noai,noimageai">
<link rel="canonical" href="{no}">
<link rel="alternate" hreflang="no" href="{no}">
<link rel="alternate" hreflang="en" href="{en}">
<link rel="alternate" hreflang="x-default" href="{en}">
<meta name="theme-color" content="#0F0F0F">
<meta property="og:url" content="{no}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Beta Art Business">
<meta property="og:locale" content="nb_NO">
<meta property="og:locale:alternate" content="en_GB">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{html.escape(desc, quote=True)}">
<meta property="og:image" content="{SITE}/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Beta Art Business — digitalt arbeid for folk og bedrifter.">
<meta name="twitter:image" content="{SITE}/og.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%230F0F0F'/%3E%3Ccircle cx='16' cy='16' r='4' fill='%238B1A1A'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../styles.css">
</head>
<body>
<a class="skip-link" href="#main">Til innholdet</a>

<header class="bar" id="top">
  <div class="wrap bar-inner">
    <a class="mark" href="index.html" aria-label="Beta Art Business, hjem">
      <svg class="seal-mark" viewBox="0 0 100 100" aria-hidden="true">
        <g fill="none" stroke="currentColor" stroke-width="4">
          <circle cx="50" cy="50" r="46"/>
          <path d="M50 30 75.81 11.92M67.32 40 84.99 47.86M67.32 60 76.66 84.02M50 70 24.19 88.08M32.68 60 15.01 52.14M32.68 40 23.34 15.98"/>
        </g>
        <circle cx="50" cy="50" r="7" fill="#C43A2E"/>
      </svg>
      <span class="mark-text">BETA ART <strong>BUSINESS</strong></span>
    </a>
    <nav class="nav" id="primary-nav" aria-label="Hovedmeny">
      <a href="index.html#privat">Privat</a>
      <a href="index.html#bedrift">Bedrift</a>
      <a href="index.html#ai-ansatte">AI-ansatte</a>
      <a href="../index.html#pricing">Priser</a>
      <a href="../blog.html">Kunnskapsbank</a>
    </nav>
    <div class="bar-actions">
      <p class="lang-pair"><a href="{en}" hreflang="en" lang="en">English</a><span aria-current="true">Norsk</span></p>
      <a class="btn btn-seal btn-sm" href="../quote.html">Få et tilbud</a>
      <button class="menu-btn" id="menu-btn" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Åpne meny">
        <span class="burger" aria-hidden="true"></span>
      </button>
    </div>
  </div>
</header>
"""


FOOT = f"""
<footer class="footer">
<div class="wrap footer-grid">
<div>
<p class="mark-text">BETA ART <strong>BUSINESS</strong></p>
<p class="footnote">Digitalt arbeid for folk og bedrifter — nettsider, merkevare, innhold,
AI-automatisering. En del av Beta Art, arkivet for verifisert menneskelig fotografi.</p>
<ul class="social" aria-label="Beta Art i sosiale medier">
<li><a href="https://www.instagram.com/betaart.no" rel="me noopener">Instagram</a></li>
<li><a href="https://www.linkedin.com/company/beta-art" rel="me noopener">LinkedIn</a></li>
</ul>
</div>
<nav aria-label="Tjenester"><p class="tag">Tjenester</p><a href="index.html#privat">Privat</a><a href="index.html#bedrift">Bedrift</a><a href="index.html">Alle tjenester</a><a href="index.html#ai-ansatte">AI-ansatte</a></nav>
<nav aria-label="Selskapet"><p class="tag">Selskapet</p><a href="../about.html" hreflang="en" lang="en">Om oss (engelsk)</a><a href="../ai-staff.html" hreflang="en" lang="en">Våre egne AI-ansatte (engelsk)</a><a href="../quote.html">Få et tilbud</a></nav>
<nav aria-label="Juridisk"><p class="tag">Juridisk</p><a href="{HUB}/legal.html#terms">Vilkår</a><a href="{HUB}/legal.html#privacy">Personvern</a><a href="{HUB}/legal.html#refunds">Refusjon</a><a href="{HUB}/legal.html#ai">AI og data</a><a href="{HUB}/legal.html#accessibility">Universell utforming</a><a href="{HUB}/report.html">Meld fra om innhold</a><a href="mailto:hallo@beta-art.com">Kontakt</a></nav>
</div>
<div class="wrap footer-base">
<p class="human-mark"><svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="7.1" fill="none" stroke="currentColor" stroke-width="1.4"></circle><path d="M4.7 8.2 7 10.5 11.3 5.7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"></path></svg><span>Godkjent av menneske</span></p>
<p class="human-mark-note">Ingenting publiseres her før et menneske har sett på det og godkjent det.</p>
<p class="footnote">© 2026 Beta Art — Betül Öner. Alle rettigheter forbeholdt verden over, så langt
gjeldende rett tillater. Navnet Beta Art, merket, tjenestestrukturen og sidedesignet er vernede verk.</p>
<button class="to-top" id="to-top" type="button">Til toppen ↑</button>
</div>
</footer>
<script src="../script.js"></script>
</body>
</html>
"""



# Prices and timescales come from the one data table so the numbers cannot
# drift between languages. Only the wording around them is translated.
_PRICE = [
    ("from kr ", "fra kr "),
    (" setup, then kr ", " i oppsett, deretter kr "),
    (" / month", " per måned"),
    (" / piece", " per stykk"),
]
_TIME = [
    ("working days", "virkedager"),
    ("weeks, staged", "uker, i etapper"),
    ("weeks, then monthly", "uker, deretter månedlig"),
    ("weeks to live", "uker til den er i drift"),
    ("weeks per piece", "uker per stykk"),
    ("week per piece", "uke per stykk"),
    ("weeks", "uker"),
    ("week", "uke"),
    ("First calendar in 10 days", "Første kalender om 10 dager"),
    ("First piece in 2 uker", "Første stykk om 2 uker"),
    ("Within 2 uker", "Innen 2 uker"),
]


def pris(v):
    for a, b in _PRICE:
        v = v.replace(a, b)
    return v


def tid(v):
    for a, b in _TIME:
        v = v.replace(a, b)
    return v


def li(items):
    return "\n".join("<li>%s</li>" % x for x in items)


def service(slug, prev, nxt):
    en, no = BY[slug], NO[slug]
    title = no["title"]
    lead = no["lead"]                         # det som står på siden
    # Metabeskrivelsen er en annen tekst med en annen jobb: den skal fylle et
    # søkeresultat. Den ble tidligere skrevet rett inn i <p class="lead"> også,
    # så tretten av sidene åpnet med overskriften, en tankestrek og
    # problemavsnittet — fire av dem kuttet midt i en setning med ellipse.
    desc = lead
    if len(desc) < 70:
        # Trettn av de norske ledeavsnittene er kortere enn et søkeresultat.
        # De fylles ut med den første hele setningen om hva vi gjør — aldri
        # med et avkuttet fragment. Passer den ikke, står ledeavsnittet alene:
        # en kort beskrivelse er bedre enn en setning som stopper midt i.
        neste = no["solution"].split(". ")[0].strip().rstrip(".")
        if neste and len(desc) + len(neste) + 2 <= 158:
            desc = desc.rstrip(".") + ". " + neste + "."
    ld = {"@context": "https://schema.org", "@type": "Service",
          "name": strip(title), "description": desc, "inLanguage": "no",
          "serviceType": strip(title), "areaServed": "NO",
          "provider": {"@type": "Organization", "name": "Beta Art Business", "url": SITE + "/"},
          "url": "%s/no/s-%s.html" % (SITE, slug),
          "offers": {"@type": "Offer", "priceCurrency": "NOK",
                     "description": pris(en["price"]), "availability": "https://schema.org/InStock"}}
    crumbs = {"@context": "https://schema.org", "@type": "BreadcrumbList",
              "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Hjem", "item": SITE + "/no/"},
                {"@type": "ListItem", "position": 2, "name": "Tjenester", "item": SITE + "/no/"},
                {"@type": "ListItem", "position": 3, "name": strip(title)}]}
    faq = {"@context": "https://schema.org", "@type": "FAQPage", "inLanguage": "no",
           "mainEntity": [{"@type": "Question", "name": q,
                           "acceptedAnswer": {"@type": "Answer", "text": a}}
                          for q, a in no["faq"]]}

    steps = "\n".join(
      '<li><span class="step-no">%02d</span><h3>%s</h3>%s</li>'
      % (i + 1, t, ("<p>%s</p>" % b) if b else "") for i, (t, b) in enumerate(no["process"]))
    faqs = "\n".join(
      "<details><summary>%s</summary><p>%s</p></details>" % (q, a) for q, a in no["faq"])
    also = "\n".join('<li>%s</li>' % x for x in no["extras"])

    return head("%s — Beta Art Business" % strip(title), desc, slug) + f"""
<main id="main">

<section class="svc-hero">
<div class="grid-bg" aria-hidden="true"></div>
<div class="wrap">
<nav class="crumbs" aria-label="Brødsmuler">
<a href="index.html">Hjem</a> <span aria-hidden="true">·</span>
<a href="index.html#{'privat' if en['track'] == 'private' else 'bedrift'}">{'Privat' if en['track'] == 'private' else 'Bedrift'}</a>
<span aria-hidden="true">·</span> <span aria-current="page">{strip(title)}</span>
</nav>
<p class="tag">{no['tag']}</p>
<h1>{title}</h1>
<p class="lead">{lead}</p>
<div class="actions">
<a class="btn btn-seal" href="../quote.html?service={slug}">Få et tilbud</a>
<a class="btn btn-line" href="{SITE}/s-{slug}.html" hreflang="en" lang="en">Read this in English</a>
</div>
</div>
</section>

<section class="section">
<div class="wrap svc-body">
<div class="svc-main">

<article class="svc-block" id="hvem">
<h2>Hvem dette er for</h2>
<ul class="tick-list">
{li(no['audience'])}
</ul>
</article>

<article class="svc-block" id="problem">
<h2>Hva som vanligvis går galt</h2>
<p>{no['problem']}</p>
</article>

<article class="svc-block" id="losning">
<h2>Hva vi gjør i stedet</h2>
<p>{no['solution']}</p>
</article>

<article class="svc-block" id="prosess">
<h2>Stegene, i rekkefølge</h2>
<ol class="process">
{steps}
</ol>
</article>

<article class="svc-block" id="leveranse">
<h2>Hva du faktisk får</h2>
<ul class="tick-list">
{li(no['delivers'])}
</ul>
</article>

<article class="svc-block" id="faq">
<h2>Ofte stilte spørsmål</h2>
<div class="faq">
{faqs}
</div>
</article>

</div>

<aside class="svc-side" aria-label="Pris og omfang">
<div class="side-card">
<p class="tag">Pris</p>
<p class="side-price">{pris(en["price"])}</p>
<dl class="finder-meta">
<div><dt>Leveringstid</dt><dd>{tid(en["time"])}</dd></div>
<div><dt>Revisjoner</dt><dd>To runder inkludert</dd></div>
<div><dt>Filer</dt><dd>Alle overlevert</dd></div>
</dl>
<a class="btn btn-seal btn-block" href="../quote.html?service={slug}">Få et tilbud</a>
<p class="footnote">Prisen er et utgangspunkt i norske kroner uten MVA. Hvert oppdrag prises
skriftlig etter en brief, og vi sender ingen faktura før dere har godkjent omfanget.</p>
</div>

<div class="side-card">
<p class="tag">Kjøpes ofte sammen med</p>
<ul class="side-list">
{also}
</ul>
</div>

<div class="side-card">
<p class="tag">Det som alltid gjelder</p>
<ul class="tick-list">
<li>Skriftlig omfang og fast pris før arbeid starter</li>
<li>To revisjonsrunder inkludert</li>
<li>Alle filer og tilganger overlevert</li>
<li>Materialet ditt trener aldri en modell</li>
</ul>
</div>
</aside>
</div>
</section>

<section class="section svc-next">
<div class="wrap">
<nav class="pager" aria-label="Andre tjenester">
<a class="pager-prev" href="s-{prev}.html"><span class="tag">Forrige</span>{strip(NO[prev]['title'])}</a>
<a class="pager-all" href="index.html">Alle tjenester</a>
<a class="pager-next" href="s-{nxt}.html"><span class="tag">Neste</span>{strip(NO[nxt]['title'])}</a>
</nav>
</div>
</section>

</main>
<script type="application/ld+json">
{json.dumps([ld, crumbs, faq], ensure_ascii=False, indent=1)}
</script>
""" + FOOT


for i, slug in enumerate(ORDER):
    prev = ORDER[i - 1]
    nxt = ORDER[(i + 1) % len(ORDER)]
    open(os.path.join(OUT, "s-%s.html" % slug), "w", encoding="utf-8").write(service(slug, prev, nxt))
print("%d norsk tjenesteside skrevet" % len(ORDER))


# ------------------------------------------------------------- the hub page
def card(slug, n):
    en, no = BY[slug], NO[slug]
    return ('<article class="card"><span class="card-no">%02d</span>'
            '<h3><a href="s-%s.html">%s</a></h3><p>%s</p>'
            '<p class="card-price">%s</p></article>'
            % (n, slug, no["title"], no["lead"], pris(en["price"])))


priv = [s for s in ORDER if BY[s]["track"] == "private"]
biz = [s for s in ORDER if BY[s]["track"] == "business"]

hub_ld = [
  {"@context": "https://schema.org", "@type": "WebPage",
   "name": "Beta Art Business — tjenester på norsk", "inLanguage": "no",
   "url": SITE + "/no/",
   "description": "Alle %d tjenester fra Beta Art Business, på norsk: nettsider, merkevare, "
                  "innhold, SEO, AI-automatisering og tre AI-ansatte." % len(ORDER),
   "publisher": {"@type": "Organization", "name": "Beta Art", "url": HUB + "/"}},
  {"@context": "https://schema.org", "@type": "BreadcrumbList",
   "itemListElement": [
     {"@type": "ListItem", "position": 1, "name": "Beta Art Business", "item": SITE + "/"},
     {"@type": "ListItem", "position": 2, "name": "Norsk"}]},
]

hub = head("Tjenester på norsk — Beta Art Business",
           "Alle %d tjenester fra Beta Art Business, på norsk: nettsider, merkevare, innhold, "
           "SEO, AI-automatisering og tre AI-ansatte som er på vakt hele døgnet." % len(ORDER),
           None) + f"""
<main id="main">

<section class="svc-hero">
<div class="grid-bg" aria-hidden="true"></div>
<div class="wrap">
<p class="tag">Digitalt studio · Privat og bedrift</p>
<h1>{len(ORDER)} tjenester. Hver med sin egen side.</h1>
<p class="lead">Beta Art Business bygger de praktiske tingene folk og bedrifter faktisk trenger —
en nettside som selger, en merkevare som henger sammen, innhold som fortsetter å komme, og
automatisering som fjerner det repeterende. Ett studio, en fast prosess, en skriftlig pris.</p>
<div class="actions">
<a class="btn btn-seal" href="../quote.html">Få et tilbud</a>
<a class="btn btn-line" href="{SITE}/" hreflang="en" lang="en">Read this in English</a>
</div>
<p class="footnote">Sidene om selskapet, kunnskapsbanken og våre egne AI-ansatte finnes foreløpig
bare på engelsk, og er lenket som det. Tjenestesidene under er skrevet på norsk — ikke oversatt.</p>
</div>
</section>

<section class="section" id="privat">
<div class="wrap">
<div class="head split-head">
<div>
<p class="tag">Beta Art Privat · {len(priv)} tjenester</p>
<h2>For folk</h2>
</div>
<p class="lead">Arbeidet som avgjør om noen ringer tilbake: CV og søknader, LinkedIn, en
personlig side, portefølje, innhold og bilder.</p>
</div>
<div class="cards">
{chr(10).join(card(s, i + 1) for i, s in enumerate(priv))}
</div>
</div>
</section>

<section class="section" id="bedrift">
<div class="wrap">
<div class="head split-head">
<div>
<p class="tag">Beta Art Bedrift · {len(biz)} tjenester</p>
<h2>For selskaper</h2>
</div>
<p class="lead">Alt en liten bedrift må ha på plass og sjelden har tid til: nettside, merkevare,
synlighet, innhold, drift — og tre AI-ansatte som svarer når kontoret er stengt.</p>
</div>
<div class="cards">
{chr(10).join(card(s, i + 1) for i, s in enumerate(biz))}
</div>
<p class="footnote">Prisene er utgangspunkt i norske kroner uten MVA. Hvert oppdrag prises
skriftlig etter en brief, og vi sender ingen faktura før dere har godkjent omfanget.</p>
</div>
</section>

<section class="enquiry" id="ai-ansatte">
<div class="wrap"><div class="head">
<p class="tag">AI-ansatte · På vakt hele døgnet</p>
<h2>Tre roller som ikke går hjem klokka fire.</h2>
<p class="lead">Selskapet ditt fortsetter å få telefoner, henvendelser og papirarbeid etter at
kontoret er stengt. Disse tre svarer på dem. Ingenting de produserer når en kunde før et menneske
har godkjent det.</p>
<div class="actions">
<a class="btn btn-seal" href="s-ai-receptionist.html">AI-resepsjonist</a>
<a class="btn btn-line" href="s-ai-sales-assistant.html">AI-salgsassistent</a>
<a class="btn btn-line" href="s-ai-office-assistant.html">AI-kontorassistent</a>
</div>
</div></div>
</section>

</main>
<script type="application/ld+json">
{json.dumps(hub_ld, ensure_ascii=False, indent=1)}
</script>
""" + FOOT

open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(hub)
print("norsk oversiktsside skrevet")
