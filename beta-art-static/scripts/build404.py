#!/usr/bin/env python3
"""A 404 page for each property.

Called for in the launch checklist ("Skriv en enkel 404-side som leder tilbake
til galleriet") and missing from all four. A dead link on a site whose whole
argument is provenance is worse than untidy — it reads as an archive that has
lost something.
"""
import os

ROOT = "/home/user/BETA-ART"

SITES = {
 "": dict(
   host="https://start.beta-art.com", title="BETA ART", css=None,
   back="index.html", back_label="Back to the three properties",
   c_tag="label", c_fine="footnote", c_btn="btn", c_rule="--rule", c_lead="lead",
   heading="This page is not in the archive.",
   body="The address you followed does not exist here. Nothing has been removed — "
        "the link was probably mistyped, or it points at a page that was never published.",
   theme="#FBFAF7"),
 "beta-art": dict(
   host="https://beta-art.com", title="BETA ART — Archive",
   css="styles.css", back="index.html", back_label="Back to the collection",
   c_tag="eyebrow", c_fine="fine-print", c_btn="btn btn-solid", c_rule="--rule", c_lead="lead",
   heading="No plate at this accession.",
   body="Every plate in this archive has a permanent number and a permanent address. "
        "This is not one of them. Either the number was mistyped, or the plate has not "
        "been catalogued yet — nothing that was published here has been taken down.",
   theme="#FBFAF7"),
 "beta-art-business": dict(
   host="https://business.beta-art.com", title="BETA ART BUSINESS",
   css="styles.css", back="index.html", back_label="Back to the studio",
   c_tag="tag", c_fine="footnote", c_btn="btn btn-seal", c_rule="--edge", c_lead="lead",
   heading="No page at this address.",
   body="The link you followed does not point at anything. If you were looking for a "
        "particular service, every one of them has its own page and they are all listed "
        "in one place.",
   theme="#0F0F0F"),
 "beta-art-blog": dict(
   host="https://notater.beta-art.com", title="BETA ART — Field Notes",
   css="styles.css", back="index.html", back_label="Back to Field Notes",
   c_tag="kicker", c_fine="byline", c_btn="btn", c_rule="--rule", c_lead="standfirst",
   heading="This entry is not here.",
   body="Nothing has been deleted. Entries keep their addresses once published, so a "
        "missing page means the link was wrong rather than that something was withdrawn.",
   theme="#FBFAF7"),
}

EXTRA_LINKS = {
 "beta-art": [("index.html#collection", "The collection"),
              ("index.html#verification", "How verification works"),
              ("index.html#licensing", "Licence tiers")],
 "beta-art-business": [("services.html", "All services"),
                       ("blog.html", "Knowledge Hub"),
                       ("quote.html", "Get a quote")],
 "beta-art-blog": [("index.html#entries", "All entries"),
                   ("index.html#topics", "Topics")],
 "": [("legal.html", "Legal notice")],
}

FALLBACK_CSS = """
  :root { --paper:#FBFAF7; --ink:#0F0F0F; --ink-2:#1F1D1B; --muted:#67635B;
    --rule:#E4E0D8; --seal:#8B1A1A; --on-seal:#FBFAF7;
    --mono-sm:.75rem; --mono-md:.8125rem;
    --f-display:"Fraunces",Georgia,serif;
    --f-body:"Inter",-apple-system,BlinkMacSystemFont,sans-serif;
    --f-mono:"JetBrains Mono","SFMono-Regular",Menlo,monospace; }
  * { box-sizing: border-box; }
  body { margin:0; min-height:100vh; background:var(--paper); color:var(--ink);
    font-family:var(--f-body); line-height:1.6; display:flex; flex-direction:column;
    justify-content:center; }
  .wrap { width:min(100% - 3rem, 720px); margin-inline:auto; }
  a { color: var(--seal); }

  /* The other three properties link a stylesheet that already carries these.
     The hub's lives inline in index.html and this page cannot reach it, so
     every shared class it uses has to be restated here. Left out, the
     headline came up in Inter on the one page in the site where that
     happened, and the approval mark — the promise the whole archive rests
     on — rendered as an unspaced tick beside plain body text. */
  h1 { font-family: var(--f-display); font-weight: 300; font-size: clamp(2.4rem, 6vw, 4.2rem);
    margin: 0 0 1.5rem; letter-spacing: -.02em; line-height: 1.05; }
  .label { font-family: var(--f-mono); font-size: var(--mono-sm); letter-spacing: .24em;
    text-transform: uppercase; color: var(--muted); margin: 0 0 1rem; }
  .lead { max-width: 60ch; color: var(--ink-2); margin: 0; }
  .human-mark {
    display: inline-flex; align-items: center; gap: .55rem;
    margin: 0 0 .55rem; padding: .4rem .8rem;
    border: 1px solid var(--seal); color: var(--seal);
    font-family: var(--f-mono); font-size: var(--mono-md); letter-spacing: .12em;
    text-transform: uppercase; line-height: 1;
  }
  .human-mark svg { flex: none; }
  .footnote { font-family: var(--f-mono); font-size: var(--mono-md); letter-spacing: .06em;
    color: var(--muted); line-height: 1.7; }
  /* The way back was marked .btn on a page whose stylesheet never defined one,
     so it rendered as 17px of plain link text — the smallest target on the
     site, on the page most likely to be reached by accident. */
  .btn { display: inline-block; padding: .85rem 1.5rem; background: var(--ink); color: var(--paper);
    border: 1px solid var(--ink); text-decoration: none; font-family: var(--f-mono);
    font-size: .66rem; letter-spacing: .16em; text-transform: uppercase; }
  .btn:hover { background: var(--seal); border-color: var(--seal); color: var(--on-seal); }
  .btn:focus-visible { outline: 2px solid var(--seal); outline-offset: 3px; }
"""

PAGE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page not found — {title}</title>
<meta name="description" content="This page does not exist. Nothing published here has been removed.">
<meta name="author" content="Betül Öner">
<meta name="copyright" content="© 2026 Beta Art — Betül Öner. All rights reserved worldwide.">
<meta name="robots" content="noindex,follow,noai,noimageai">
<link rel="canonical" href="{host}/404.html">
<meta name="theme-color" content="{theme}">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23{fav}'/%3E%3Ccircle cx='16' cy='16' r='4' fill='%238B1A1A'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
{css}
</head>
<body>
<main id="main" class="notfound">
<div class="wrap">
<p class="{c_tag} not-found-code">Error 404</p>
<h1>{heading}</h1>
<p class="{c_lead}">{body}</p>
<p class="not-found-back"><a class="{c_btn}" href="{back}">{back_label}</a></p>
<nav class="not-found-links" aria-label="Where to go instead">
{links}
</nav>
<p class="human-mark"><svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="7.1" fill="none" stroke="currentColor" stroke-width="1.4"></circle><path d="M4.7 8.2 7 10.5 11.3 5.7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"></path></svg><span>Human approved</span></p>
<p class="{c_fine}">© 2026 Beta Art — Betül Öner. All rights reserved worldwide.
<a href="{legal}">Legal notice</a></p>
</div>
</main>
</body>
</html>
"""

CSS_404 = """
/* 404 — the page has no navigation of its own on purpose: the one thing a
   lost visitor needs is a way back, not a second chance to get lost. */
.notfound { padding: clamp(4rem, 14vw, 9rem) 0; }
.not-found-code { letter-spacing: .24em; }
.notfound h1 { max-width: 18ch; }
.not-found-links { display: flex; flex-wrap: wrap; gap: 1.4rem; margin: 2rem 0 3rem;
  padding-top: 1.6rem; border-top: 1px solid var(RULE); }
.not-found-back { margin: 2rem 0 0; }
.not-found-links a { font-family: var(--f-mono); font-size: .66rem; letter-spacing: .14em;
  text-transform: uppercase; text-decoration: none; padding-block: .5rem; }
"""

HUB = "https://start.beta-art.com/legal.html"

for sub, cfg in SITES.items():
    links = "\n".join('<a href="%s">%s</a>' % (h, t) for h, t in EXTRA_LINKS[sub])
    css = ('<link rel="stylesheet" href="%s">' % cfg["css"]) if cfg["css"] \
          else "<style>%s%s</style>" % (FALLBACK_CSS, CSS_404.replace("RULE", "--rule"))
    html = PAGE.format(
        title=cfg["title"], host=cfg["host"], theme=cfg["theme"],
        fav=cfg["theme"].lstrip("#"), css=css,
        heading=cfg["heading"], body=cfg["body"],
        c_tag=cfg["c_tag"], c_fine=cfg["c_fine"], c_btn=cfg["c_btn"],
        c_lead=cfg["c_lead"],
        back=cfg["back"], back_label=cfg["back_label"], links=links,
        legal="legal.html" if sub == "" else HUB)
    open(os.path.join(ROOT, sub, "404.html"), "w", encoding="utf-8").write(html)
    print("  wrote %s/404.html" % (sub or "."))

# the three properties with a stylesheet need the rules
for sub in ("beta-art", "beta-art-business", "beta-art-blog"):
    p = os.path.join(ROOT, sub, "styles.css")
    s = open(p, encoding="utf-8").read()
    if ".not-found-links" in s:
        continue
    rule = SITES[sub]["c_rule"]
    open(p, "a", encoding="utf-8").write("\n" + CSS_404.replace("RULE", rule).strip() + "\n")
    print("  styled %s/styles.css" % sub)
