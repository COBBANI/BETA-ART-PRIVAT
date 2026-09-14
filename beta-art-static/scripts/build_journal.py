#!/usr/bin/env python3
"""Build the journal's essays, and make the index tell the truth.

The index advertised ten entries. Every one of them pointed at post.html. This
generates the nine missing pages from journal.py, renames the tenth to a
descriptive URL, and rewrites every link on the index so it goes where the
headline says it goes.
"""

import os
import re
import shutil
import subprocess

import journal

ROOT = "/home/user/BETA-ART"
BLOG = os.path.join(ROOT, "beta-art-blog")
HOST = "https://notater.beta-art.com"

LEAD = dict(slug="picture-is-not-the-proof", topic="provenance", date="2026-07-28",
            shown="28 July 2026", read="9 min",
            title="The picture is not the proof. The paperwork is.",
            short="The picture is not the proof")

ALL = [LEAD] + journal.J          # newest first, as the index shows them
BY_SLUG = {e["slug"]: e for e in ALL}


def page_url(slug):
    return "j-%s.html" % slug


# ---------------------------------------------------------------- chrome ----
CHROME = os.path.join(BLOG, "post.html")
if not os.path.exists(CHROME):
    CHROME = os.path.join(BLOG, page_url(LEAD["slug"]))   # already renamed by a previous run
src = open(CHROME, encoding="utf-8").read()
HEAD_TAIL = re.search(r'(<meta name="copyright".*?</head>)', src, re.S).group(1)
HEAD_OPEN = re.search(r"(<!DOCTYPE html>.*?)<title>", src, re.S).group(1)
FONTS = re.search(r'(<link rel="icon".*?rel="stylesheet">)\n<meta name="copyright"',
                  src, re.S).group(1)
MASTHEAD = re.search(r'(<body class="reading">.*?</header>)', src, re.S).group(1)
COLOPHON = re.search(r'(<footer class="colophon">.*?</footer>)', src, re.S).group(1)


def esc(t):
    return t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


def plain(t):
    """Meta-description text: no markup, no smart-quote surprises in an attribute."""
    t = re.sub(r"<[^>]+>", "", t)
    return t.replace("&mdash;", "—").replace("&amp;", "&").replace('"', "&quot;")


def body_html(body):
    out = []
    first = True
    for kind, val in body:
        if kind == "p":
            cls = ' class="opening"' if first else ""
            out.append("      <p%s>%s</p>" % (cls, val))
            first = False
        elif kind == "h2":
            out.append("\n      <h2>%s</h2>" % val)
        elif kind == "q":
            out.append("\n      <blockquote>%s</blockquote>" % val)
        elif kind in ("ul", "ol"):
            items = "\n".join("        <li>%s</li>" % i for i in val)
            out.append("      <%s>\n%s\n      </%s>" % (kind, items, kind))
        elif kind == "table":
            cap, heads, rows = val
            th = "".join("<th scope=\"col\">%s</th>" % h for h in heads)
            tr = "\n".join(
                "          <tr><th scope=\"row\">%s</th>%s</tr>"
                % (r[0], "".join("<td>%s</td>" % c for c in r[1:])) for r in rows)
            out.append(
                '      <div class="table-scroll">\n'
                '        <table class="field-table">\n'
                '          <caption>%s</caption>\n'
                '          <thead><tr>%s</tr></thead>\n'
                '          <tbody>\n%s\n          </tbody>\n'
                '        </table>\n      </div>' % (cap, th, tr))
    return "\n\n".join(out)


def neighbours(slug):
    i = [e["slug"] for e in ALL].index(slug)
    order = [e for j, e in enumerate(ALL) if j != i]
    # the three that follow it in the run of entries, then wrap
    rot = order[i:] + order[:i]
    return rot[:4]


def prev_next(slug):
    i = [e["slug"] for e in ALL].index(slug)
    newer = ALL[i - 1] if i > 0 else None
    older = ALL[i + 1] if i + 1 < len(ALL) else None
    return newer, older


def essay_foot(e):
    further = "\n".join(
        '          <li><a href="%s">%s</a></li>' % (page_url(n["slug"]), n["title"])
        for n in neighbours(e["slug"]))
    newer, older = prev_next(e["slug"])
    steps = []
    if newer:
        steps.append('<a class="step step-prev" href="%s"><span>Newer entry</span>%s</a>'
                     % (page_url(newer["slug"]), newer["title"]))
    if older:
        steps.append('<a class="step step-next" href="%s"><span>Older entry</span>%s</a>'
                     % (page_url(older["slug"]), older["title"]))
    return """    <footer class="essay-foot wrap measure">
      <div class="author">
        <span class="author-initials" aria-hidden="true">BA</span>
        <div>
          <p class="author-name">The archivist</p>
          <p class="author-bio">Writes Field Notes from the Beta Art archive. Shoots coast, workshop
            and work life along the Norwegian seaboard; files everything twice.</p>
        </div>
      </div>

      <div class="essay-end">
        <p class="kicker">Before you go</p>
        <p>Field Notes follows one archive being built &mdash; the decisions, the mistakes and the
        parts that did not work. One entry when there is something worth reading, and nothing
        in between.</p>
        <p class="essay-end-actions">
          <a class="btn" href="index.html#subscribe">Get the next entry by email</a>
          <a class="btn btn-quiet" href="https://beta-art.com/#collection">See the collection</a>
        </p>
      </div>

      <nav class="essay-nav" aria-label="Entries either side of this one">
        %s
      </nav>

      <nav class="further" aria-label="Further reading">
        <h2 class="side-title">Further reading</h2>
        <ul>
%s
        </ul>
      </nav>

      <p class="cross-link">Licensing a plate for commercial use? <a href="https://beta-art.com/#licensing">The archive</a> handles licence tiers and quotes; <a href="https://business.beta-art.com/">Beta Art Business</a> handles commissions, framework agreements and the wider digital work.</p>
    </footer>""" % ("\n        ".join(steps), further)


def build(e):
    url = "%s/%s" % (HOST, page_url(e["slug"]))
    desc = plain(e["desc"])
    head = """%s<title>%s &mdash; Field Notes</title>
<meta name="description" content="%s">
<meta name="robots" content="index,follow,noai,noimageai">
<link rel="canonical" href="%s">
<link rel="alternate" type="application/rss+xml" title="Field Notes" href="https://notater.beta-art.com/feed.xml">
<meta name="theme-color" content="#FBFAF7">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Field Notes &mdash; The Beta Art Journal">
<meta property="og:title" content="%s">
<meta property="og:description" content="%s">
<meta property="og:image" content="%s/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Beta Art Field Notes &mdash; what the work actually looks like.">
<meta name="twitter:image" content="%s/og.png">
<meta property="og:url" content="%s">
<meta property="article:published_time" content="%s">
<meta name="twitter:card" content="summary_large_image">
%s
%s""" % (HEAD_OPEN, plain(e.get("seotitle", e["title"])), desc, url, plain(e["title"]), desc,
         HOST, HOST, url, e["date"], FONTS, HEAD_TAIL)

    ld = """<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": %s,
  "description": %s,
  "datePublished": "%s",
  "inLanguage": "en",
  "articleSection": "%s",
  "author": { "@type": "Person", "name": "Bet\\u00fcl \\u00d6ner" },
  "copyrightHolder": { "@type": "Person", "name": "Bet\\u00fcl \\u00d6ner" },
  "copyrightYear": 2026,
  "isPartOf": { "@type": "Blog", "@id": "%s/#blog" },
  "publisher": { "@type": "Organization", "name": "Beta Art", "url": "https://start.beta-art.com/" },
  "mainEntityOfPage": "%s"
}
</script>""" % (jsonstr(plain(e["title"])), jsonstr(desc), e["date"],
                journal.TOPICS[e["topic"]], HOST, url)

    return """%s
%s

<main id="main">
  <article class="essay">
    <header class="essay-head wrap measure">
      <p class="kicker"><a href="index.html#entries">Essay &middot; %s</a></p>
      <h1>%s</h1>
      <p class="standfirst">%s</p>
      <p class="byline">By <strong>the archivist</strong> &middot; %s &middot; %s read</p>
    </header>

    <figure class="essay-figure">
      <div class="frame %s" role="img" aria-label="%s"></div>
      <figcaption class="wrap measure">
        <span class="seal-dot" aria-hidden="true"></span>%s
      </figcaption>
    </figure>

    <div class="essay-body wrap measure">
%s
    </div>

%s
  </article>
</main>

%s

%s

<script src="i18n.js"></script>
<script src="script.js"></script>
</body>
</html>
""" % (head, MASTHEAD, journal.TOPICS[e["topic"]], e["title"], e["lead"],
       e["shown"], e["read"], e["frame"], esc(e["fig"]), e["cap"],
       body_html(e["body"]), essay_foot(e), COLOPHON, ld)


def jsonstr(t):
    return '"%s"' % t.replace("\\", "\\\\").replace('"', '\\"').replace("—", "\\u2014")


# ------------------------------------------------------------- the pages ----
for e in journal.J:
    out = os.path.join(BLOG, page_url(e["slug"]))
    open(out, "w", encoding="utf-8").write(build(e))
    print("wrote", page_url(e["slug"]))

# ---------------------------------------------------- the lead, renamed ----
lead_path = os.path.join(BLOG, page_url(LEAD["slug"]))
if os.path.exists(os.path.join(BLOG, "post.html")):
    shutil.move(os.path.join(BLOG, "post.html"), lead_path)
    print("renamed post.html ->", page_url(LEAD["slug"]))

t = open(lead_path, encoding="utf-8").read()
t = t.replace("%s/post.html" % HOST, "%s/%s" % (HOST, page_url(LEAD["slug"])))
if "og:site_name" not in t:
    t = t.replace('<meta property="og:type" content="article">',
                  '<meta property="og:type" content="article">\n'
                  '<meta property="og:site_name" content="Field Notes &mdash; The Beta Art Journal">')
if "article:published_time" not in t:
    t = t.replace('<meta name="twitter:card" content="summary_large_image">',
                  '<meta property="article:published_time" content="2026-07-28">\n'
                  '<meta name="twitter:card" content="summary_large_image">')
if "articleSection" not in t:
    t = t.replace('"datePublished": "2026-07-28",',
                  '"datePublished": "2026-07-28",\n  "articleSection": "Provenance",\n'
                  '  "isPartOf": { "@type": "Blog", "@id": "%s/#blog" },' % HOST)
# Four links back to the index is not further reading. Replace them with the
# real prev/next pair and four real essays.
foot = essay_foot(LEAD)
new_navs = foot[foot.index('      <nav class="essay-nav"'):foot.index('      <p class="cross-link">')]
t = re.sub(r'      <nav class="further".*?</nav>\n\n', new_navs, t, flags=re.S)
open(lead_path, "w", encoding="utf-8").write(t)

# ------------------------------------------------------------- the index ----
idx = open(os.path.join(BLOG, "index.html"), encoding="utf-8").read()

idx = idx.replace('<h2 class="lead-title"><a href="post.html">',
                  '<h2 class="lead-title"><a href="%s">' % page_url(LEAD["slug"]))
idx = idx.replace('<a class="read-on" href="post.html"',
                  '<a class="read-on" href="%s"' % page_url(LEAD["slug"]))

OLDHEAD = {"blue-hour": "Blue hour is shorter than you think this far north"}

for e in journal.J:
    # each entry card carries its own headline; point it at its own page
    head = OLDHEAD.get(e["slug"], e["short"])
    head = head.replace("&ldquo;", '"').replace("&rdquo;", '"')
    old = '<h3><a href="post.html">%s</a></h3>' % head
    if old in idx:
        idx = idx.replace(old, '<h3><a href="%s">%s</a></h3>' % (page_url(e["slug"]), e["title"]))
    else:
        print("!! index card not matched:", e["slug"], "|", head)

# most-read block
most = [("picture-is-not-the-proof", "The picture is not the proof", "9 min"),
        ("who-buys-photography", "Who buys photography in Norway", "11 min"),
        ("just-for-social", "Pricing &ldquo;just for social&rdquo;", "8 min"),
        ("blue-hour", "How long blue hour lasts up here", "5 min")]
idx = re.sub(r'<ol class="ranked">.*?</ol>',
             '<ol class="ranked">\n' + "\n".join(
                 '          <li><a href="%s">%s</a><span>%s</span></li>'
                 % (page_url(s), t_, m) for s, t_, m in most) + "\n        </ol>",
             idx, flags=re.S)

# the blue-hour card claimed something the computed table contradicts
idx = re.sub(r'<p class="excerpt">Nineteen minutes in February.*?</p>',
             '<p class="excerpt">%s</p>' % BY_SLUG["blue-hour"]["excerpt"], idx, flags=re.S)

open(os.path.join(BLOG, "index.html"), "w", encoding="utf-8").write(idx)
print("index rewritten")

left = idx.count('href="post.html"')
print("remaining post.html links on index:", left)
