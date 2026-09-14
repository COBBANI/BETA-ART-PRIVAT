import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from posts import P, CATS
from data import S
from build import head, FOOT, SITE, HUB, strip
OUT = "/home/user/BETA-ART/beta-art-business"
CATN = dict(CATS)
BY = {s["slug"]: s for s in S}

def render(body):
    out=[]
    for kind,val in body:
        if kind=="h2": out.append(f"<h2>{val}</h2>")
        elif kind=="p": out.append(f"<p>{val}</p>")
        elif kind=="ul": out.append("<ul>"+"".join(f"<li>{x}</li>" for x in val)+"</ul>")
        elif kind=="ol": out.append("<ol>"+"".join(f"<li>{x}</li>" for x in val)+"</ol>")
    return "\n".join(out)

for i,a in enumerate(P):
    prev=P[i-1]; nxt=P[(i+1)%len(P)]
    svc=BY[a["cta"][0]]
    ld={"@context":"https://schema.org","@type":"Article","headline":strip(a["title"]),
        "description":a["lead"],"datePublished":a["date"],"inLanguage":"en",
        "author":{"@type":"Person","name":"Betül Öner"},
        "copyrightHolder":{"@type":"Person","name":"Betül Öner"},"copyrightYear":2026,
        "publisher":{"@type":"Organization","name":"Beta Art","url":HUB+"/"},
        "articleSection":CATN[a["cat"]],
        "mainEntityOfPage":f"{SITE}/b-{a['slug']}.html"}
    page = head(f"{a.get('short', strip(a['title']))} — Beta Art", a["lead"], f"{SITE}/b-{a['slug']}.html") + f"""
<main id="main">
<article class="post">
<header class="svc-hero">
<div class="grid-bg" aria-hidden="true"></div>
<div class="wrap measure">
<nav class="crumbs" aria-label="Breadcrumb">
<a href="index.html">Home</a> <span aria-hidden="true">·</span>
<a href="blog.html">Knowledge Hub</a> <span aria-hidden="true">·</span>
<a href="blog.html#{a['cat']}">{CATN[a['cat']]}</a>
</nav>
<p class="tag">{CATN[a['cat']]} · {CATN[a['cat2']]}</p>
<h1>{a['title']}</h1>
<p class="lead">{a['lead']}</p>
<p class="byline">Beta Art · {a['date']} · {a['read']} read</p>
</div>
</header>

<div class="wrap measure post-body">
{render(a['body'])}
</div>

<footer class="wrap measure post-foot">
<div class="post-cta">
<p class="tag">The service behind this</p>
<h2>{svc['title']}</h2>
<p>{svc['lead']}</p>
<p class="side-price">{svc['price']}</p>
<div class="actions">
<a class="btn btn-seal" href="s-{svc['slug']}.html">Read the service page</a>
<a class="btn btn-line" href="quote.html?service={svc['slug']}">Get a quote</a>
</div>
</div>
<nav class="pager" aria-label="Other articles">
<a class="pager-prev" href="b-{prev['slug']}.html"><span class="tag">Previous</span>{prev['title']}</a>
<a class="pager-all" href="blog.html">All articles</a>
<a class="pager-next" href="b-{nxt['slug']}.html"><span class="tag">Next</span>{nxt['title']}</a>
</nav>
</footer>
</article>
</main>
<script type="application/ld+json">
{json.dumps(ld, ensure_ascii=False, indent=1)}
</script>
""" + FOOT
    open(os.path.join(OUT,f"b-{a['slug']}.html"),"w",encoding="utf-8").write(page)
print(f"{len(P)} makale sayfası yazıldı")

# ---- Knowledge Hub index ----
have={a["cat"] for a in P}|{a["cat2"] for a in P}
chips="\n".join(f'<button class="tag-btn{" is-active" if k=="all" else ""}" type="button" id="{k}" data-topic="{k}" aria-pressed="{str(k=="all").lower()}">{v}</button>'
  for k,v in [("all","All")]+[(k,v) for k,v in CATS if k in have])
_soon=[v for k,v in CATS if k not in have]
soon=", ".join(_soon)
soon_line=(f"<strong>Category still empty.</strong> {soon}. It is listed in the plan rather than shown as an "
           f"empty page \u2014 a category with no articles behind it is a promise, not a section, and we would "
           f"rather publish the piece first." if len(_soon)==1 else
           f"<strong>Categories still empty.</strong> {soon}. They are listed in the plan rather than shown as "
           f"empty pages \u2014 a category with no articles behind it is a promise, not a section, and we would "
           f"rather publish the piece first.") if _soon else ""
cards="\n".join(f"""<li class="entry" data-topic="{a['cat']} {a['cat2']}">
<p class="kicker">{CATN[a['cat']]}</p>
<h3><a href="b-{a['slug']}.html">{a['title']}</a></h3>
<p class="excerpt">{a['lead']}</p>
<p class="byline">{a['date']} · {a['read']}</p>
</li>""" for a in P)

ld={"@context":"https://schema.org","@type":"Blog","name":"Beta Art Knowledge Hub",
 "url":f"{SITE}/blog.html","inLanguage":"en",
 "publisher":{"@type":"Organization","name":"Beta Art","url":HUB+"/"},
 "blogPost":[{"@type":"BlogPosting","headline":strip(a["title"]),"datePublished":a["date"],
   "url":f"{SITE}/b-{a['slug']}.html"} for a in P]}

blog = head("Knowledge Hub — Beta Art Business",
 "Practical writing on websites, job search, automation, AI, pricing and SEO — written to answer a real question, not to fill a content calendar.",
 f"{SITE}/blog.html") + f"""
<main id="main">
<section class="svc-hero">
<div class="grid-bg" aria-hidden="true"></div>
<div class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">
<a href="index.html">Home</a> <span aria-hidden="true">·</span> <span aria-current="page">Knowledge Hub</span>
</nav>
<p class="tag">Knowledge Hub</p>
<h1>The answers we give on the phone, written down once.</h1>
<p class="lead">Every piece here started as a question a client actually asked. Nothing is published
to fill a calendar, and nothing is written to end in a sales pitch — though each one names the
service it relates to, because pretending otherwise would be silly.</p>
</div>
</section>

<section class="section">
<div class="wrap">
<div class="head"><p class="tag">{len(P)} articles</p><h2>Written to answer a question, not to fill a calendar.</h2></div>\n<div class="tools">
<div class="search">
<label class="visually-hidden" for="search">Search articles</label>
<input id="search" type="search" placeholder="Search articles…" autocomplete="off">
</div>
<div class="topics" id="topics" role="group" aria-label="Filter by topic">
{chips}
</div>
</div>
<ol class="entry-list" id="entry-list">
{cards}
</ol>
<p class="empty-state" id="empty-state" hidden>Nothing here matches that search.</p>
<div class="note-band">
<p class="footnote">{soon_line}</p>
</div>
</div>
</section>

<section class="enquiry">
<div class="wrap"><div class="head">
<p class="tag">If reading it is not enough</p>
<h2>Every article names the service that does the work.</h2>
<p class="lead">The writing is meant to be usable on its own. When it is not — because the fix is
a week of work rather than an afternoon — the service page carries the price before you have to ask.</p>
<div class="actions"><a class="btn btn-seal" href="services.html">All {len(S)} services</a><a class="btn btn-line" href="quote.html">Get a quote</a></div>
</div></div>
</section>
</main>
<script type="application/ld+json">
{json.dumps(ld, ensure_ascii=False, indent=1)}
</script>
<script src="blog.js"></script>
""" + FOOT
open(os.path.join(OUT,"blog.html"),"w",encoding="utf-8").write(blog)
print("blog.html yazıldı")
