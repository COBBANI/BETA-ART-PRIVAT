import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from build import head, FOOT, SITE, HUB
OUT = "/home/user/BETA-ART/beta-art-business"

CASES = [
 ("Retail · Nordics","A shop that nobody could find","seo",
  "Good products, no organic traffic, everything running through paid ads. Every kroner of revenue was rented.",
  "Technical audit first: forty pages competing for four terms, no titles, 4.1s mobile load. Fixed the technical layer, rebuilt the product structure to one page per thing sold, then wrote twelve category texts around what buyers actually search.",
  [("Organic sessions","+64%"),("Ad spend","−28%"),("Time to result","4 months")],
  "The ad spend fell because the organic traffic replaced it, not because we touched the campaigns."),
 ("Services · Oslo","Quotes taking three days","ai-automation",
  "Every enquiry was answered by hand. The person who could price the job was also the person doing the job, so quotes went out late — often after the customer had already booked someone else.",
  "Mapped the actual quoting process, not the documented one. Built a form that classifies the request, drafts the quote from a price table, and books the call. A person approves every quote before it leaves; the machine does the typing.",
  [("Response time","3 days → 20 min"),("Won deals","+31%"),("Build time","3 weeks")],
  "The human approval step was kept deliberately. Removing it would have saved another two minutes and cost the trust."),
 ("Private · Career","Sixty applications, four replies","cv",
  "A strong candidate with fifteen years of experience whose CV was never reaching a human reader. Two-column layout, job titles in a sidebar, parsed as an empty document by the screening software.",
  "Rebuilt in one column with real headings and results before responsibilities. LinkedIn rewritten around the ten searches recruiters in that field actually run. Two interview sessions, including the salary question.",
  [("Interviews","4 in 6 weeks"),("Outcome","Offer accepted"),("Package","Private Pro")],
  "Nothing was invented. The same fifteen years, in a format the first reader could actually read."),
 ("Manufacturing · Vestland","Three systems, one person carrying data","process-automation",
  "Orders arrived in one system, invoices lived in another, projects in a third. One employee spent most of a week moving the same numbers between them, and the errors were the expensive kind.",
  "Mapped the chain end to end, then automated it in stages so value arrived before the whole programme finished. Systems connected, data entered once, exceptions surfaced to a named person rather than hidden in a log.",
  [("Manual hours","−22 h / week"),("Entry errors","Near zero"),("Delivery","Staged over 9 weeks")],
  "Staged delivery meant they could have stopped after stage two and kept the gain. They did not, but the option was real."),
]

def case(c):
    tag,title,slug,problem,work,figs,note = c
    figures = "".join(f"<div><dt>{a}</dt><dd>{b}</dd></div>" for a,b in figs)
    return f"""<article class="case case-full">
<p class="tag">{tag}</p>
<h3>{title}</h3>
<p><strong>Problem.</strong> {problem}</p>
<p><strong>Work.</strong> {work}</p>
<dl class="case-figures">{figures}</dl>
<p class="footnote">{note}</p>
<a class="card-go" href="s-{slug}.html">The service behind this →</a>
</article>"""

cases = head("Case notes — Beta Art Business",
  "Four projects written as problem, work and result — including what we deliberately did not do.",
  f"{SITE}/cases.html") + f"""
<main id="main">
<section class="svc-hero">
<div class="grid-bg" aria-hidden="true"></div>
<div class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">
<a href="index.html">Home</a> <span aria-hidden="true">·</span> <span aria-current="page">Cases</span>
</nav>
<p class="tag">Case notes</p>
<h1>Problem, work, result.</h1>
<p class="lead">Not a gallery. Each note states the problem the client had, what was actually done,
and what came of it — including the decisions we made against our own convenience.</p>
</div>
</section>
<section class="section">
<div class="wrap">
<div class="head"><p class="tag">Four shapes of problem</p><h2>What the work looked like.</h2></div>
<div class="cases cases-stack">
{chr(10).join(case(c) for c in CASES)}
</div>
<div class="note-band">
<p class="footnote"><strong>On these numbers.</strong> Figures are illustrative placeholders while
client approval to publish real numbers is pending. When a real figure replaces a placeholder it
will be marked with the client's name and the month it was measured — a number without a source is
not evidence, and we would rather say that than let you assume otherwise.</p>
</div>
</div>
</section>
<section class="enquiry">
<div class="wrap"><div class="head">
<p class="tag">Next step</p><h2>Your problem is probably one of these shapes.</h2>
<p class="lead">Describe it and we will name the service — including when the answer is that you do not need one yet.</p>
<div class="actions"><a class="btn btn-seal" href="quote.html">Get a quote</a><a class="btn btn-line" href="services.html">See all services</a></div>
</div></div>
</section>
</main>
""" + FOOT
open(os.path.join(OUT,"cases.html"),"w",encoding="utf-8").write(cases)
print("cases.html yazıldı")

RES = [
 ("CV template pack","Three one-column CV layouts that parse cleanly in applicant-tracking systems, in .docx.","cv","docx"),
 ("Business plan outline","The ten-section outline we use ourselves, with the questions each section has to answer.","website","txt"),
 ("AI prompt pack","Fifteen tested prompts for job applications, content and research — with the reasoning behind each.","ai-assistant","txt"),
 ("SEO checklist","Technical, structure, content and measurement, in the order they actually matter.","seo","txt"),
 ("Website brief builder","Twelve questions that replace the first meeting. Fill it in and any supplier can quote you.","website","tool"),
 ("Social media calendar","A four-week posting plan with the post types that work, and the rules that keep it going.","social-media","txt"),
]
def res(r):
    t,d,slug,kind = r
    label = {"docx":"Word template","txt":"Plain text","tool":"Browser tool"}[kind]
    action = ('<a class="btn btn-line btn-block btn-sm" href="index.html#studio">Open in AI Studio</a>'
              if kind=="tool" else
              '<a class="btn btn-line btn-block btn-sm" href="index.html#studio">Generate it in AI Studio</a>')
    return f"""<article class="res-card">
<p class="tag">{label}</p>
<h3>{t}</h3>
<p>{d}</p>
{action}
<a class="card-go" href="s-{slug}.html">Related service →</a>
</article>"""

resources = head("Free resources — Beta Art Business",
  "Templates, checklists and prompt packs you can use without buying anything: CV templates, business plan outline, SEO checklist, social calendar.",
  f"{SITE}/resources.html") + f"""
<main id="main">
<section class="svc-hero">
<div class="grid-bg" aria-hidden="true"></div>
<div class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">
<a href="index.html">Home</a> <span aria-hidden="true">·</span> <span aria-current="page">Free resources</span>
</nav>
<p class="tag">Free resources</p>
<h1>Take these. No email required.</h1>
<p class="lead">Every one of these is generated in your browser by the AI Studio and never leaves
it. There is no signup wall, no drip sequence and no newsletter you have to escape — if the
template is all you need, that is a fine outcome.</p>
<div class="actions">
<a class="btn btn-seal" href="index.html#studio">Open the AI Studio</a>
<a class="btn btn-line" href="services.html">See the paid services</a>
</div>
</div>
</section>
<section class="section">
<div class="wrap">
<div class="head"><p class="tag">The library</p><h2>Five things you can use today.</h2></div>
<div class="res-grid">
{chr(10).join(res(r) for r in RES)}
</div>
<p class="footnote">These are ours to give: © 2026 Beta Art — Betül Öner. Use them for your own
work freely, including commercially. Do not resell them as a product or publish them as your own
templates. Full terms in the <a href="{HUB}/legal.html#ip">legal notice</a>.</p>
</div>
</section>
<section class="enquiry">
<div class="wrap"><div class="head">
<p class="tag">When the template is not enough</p>
<h2>The template gives you the shape. We fill it in.</h2>
<p class="lead">A checklist tells you what is wrong. Fixing it is the work. If you would rather
hand that over, the service pages carry the price before you have to ask.</p>
<div class="actions"><a class="btn btn-seal" href="quote.html">Get a quote</a><a class="btn btn-line" href="services.html">All services</a></div>
</div></div>
</section>
</main>
""" + FOOT
open(os.path.join(OUT,"resources.html"),"w",encoding="utf-8").write(resources)
print("resources.html yazıldı")
