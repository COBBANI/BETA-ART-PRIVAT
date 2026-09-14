import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from data import S
from build import head, FOOT, SITE, HUB, strip, li

OUT = "/home/user/BETA-ART/beta-art-business"
priv = [s for s in S if s["track"] == "private"]
buss = [s for s in S if s["track"] == "business"]

def cards(group):
    return "\n".join(f"""<a class="svc-card" href="s-{s['slug']}.html">
<span class="card-no">{s['n']}</span>
<h3>{s['title']}</h3>
<p>{s['lead']}</p>
<p class="card-price">{s['price']} · {s['time']}</p>
<span class="card-go">Read the service →</span>
</a>""" for s in group)

ld = {"@context":"https://schema.org","@type":"ItemList","name":"Beta Art Business services",
 "numberOfItems":len(S),
 "itemListElement":[{"@type":"ListItem","position":i+1,"name":strip(s["title"]),
   "url":f"{SITE}/s-{s['slug']}.html"} for i,s in enumerate(S)]}

page = head("Services — Beta Art Business",
  f"All {len(S)} Beta Art services, each with its own page: the problem, the solution, the process, what you receive, and the price.",
  f"{SITE}/services.html",
 alt=('<link rel="alternate" hreflang="en" href="' + SITE + '/services.html">\n'
      '<link rel="alternate" hreflang="no" href="' + SITE + '/no/">\n'
      '<link rel="alternate" hreflang="x-default" href="' + SITE + '/services.html">')) + f"""
<main id="main">
<section class="svc-hero">
<div class="grid-bg" aria-hidden="true"></div>
<div class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">
<a href="index.html">Home</a> <span aria-hidden="true">·</span> <span aria-current="page">Services</span>
</nav>
<p class="tag">All services</p>
<h1>{len(S)} services. Every one has its own page.</h1>
<p class="lead">Each page answers the same six questions in the same order: who it is for, what
usually goes wrong, what we do instead, how the work runs, what you receive, and what it costs.
No page makes you email us to find out the price.</p>
<div class="actions">
<a class="btn btn-seal" href="index.html#finder">Not sure? Use the finder</a>
<a class="btn btn-line" href="quote.html">Get a quote</a>
</div>
</div>
</section>

<section class="section" id="private">
<div class="wrap">
<div class="head split-head">
<div>
<p class="tag">Beta Art Private · {len(priv)} services</p>
<h2>For people</h2>
<p class="lead">The work that decides whether you get the interview, the client or the first
hundred followers — done properly, once.</p>
</div>
</div>
<div class="svc-grid">
{cards(priv)}
</div>
</div>
</section>

<section class="section" id="business">
<div class="wrap">
<div class="head split-head">
<div>
<p class="tag">Beta Art Business · {len(buss)} services</p>
<h2>For companies</h2>
<p class="lead">Everything a small or mid-sized company needs to look credible, be found, and
stop doing the same manual task twice a day.</p>
</div>
</div>
<div class="svc-grid">
{cards(buss)}
</div>
<p class="footnote">Prices are indicative starting points in NOK excluding VAT. Every project is
quoted in writing after the brief; nothing is charged before a scope is agreed. Full terms in the
<a href="{HUB}/legal.html#terms">legal notice</a>.</p>
</div>
</section>

<section class="enquiry">
<div class="wrap">
<div class="head">
<p class="tag">Still not sure</p>
<h2>Describe the problem instead of picking a service.</h2>
<p class="lead">Most people do not arrive knowing whether they need a landing page, a funnel or a
chatbot. Say what is actually going on and we will name the service — including when the answer
is that you do not need one yet.</p>
<div class="actions">
<a class="btn btn-seal" href="quote.html">Start the quote flow</a>
<a class="btn btn-line" href="index.html#finder">Use the service finder</a>
</div>
</div>
</div>
</section>
</main>
<script type="application/ld+json">
{json.dumps(ld, ensure_ascii=False, indent=1)}
</script>
""" + FOOT
open(os.path.join(OUT, "services.html"), "w", encoding="utf-8").write(page)
print("services.html yazıldı")

# ---------- ABOUT ----------
about = head("About — Beta Art Business",
  "Why Beta Art exists: one studio, a written scope, a fixed price, and a person responsible for every delivery.",
  f"{SITE}/about.html") + f"""
<main id="main">
<section class="svc-hero">
<div class="grid-bg" aria-hidden="true"></div>
<div class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">
<a href="index.html">Home</a> <span aria-hidden="true">·</span> <span aria-current="page">About</span>
</nav>
<p class="tag">About</p>
<h1>Why Beta Art exists.</h1>
<p class="lead">Not because the world needed another agency. Because the two things a small
company actually wants — knowing what it will cost, and knowing who is responsible — had become
the two hardest things to get.</p>
</div>
</section>

<section class="section">
<div class="wrap svc-body">
<div class="svc-main">

<article class="svc-block">
<p class="tag">The starting point</p>
<h2>Two industries stopped answering simple questions</h2>
<p class="prose">Ask a digital agency what a website costs and you get a meeting. Ask who will
do the work and you get a team page. Ask what happens if it is late and you get a silence. Small
companies and individuals are the ones who feel this worst, because they have neither the budget
to absorb a bad outcome nor the procurement department to prevent one.</p>
<p class="prose">At the same time, photography stopped being able to prove itself. An image that
looks like a photograph can now be produced by someone who never left the room. That mattered to
us directly, because the archive side of Beta Art sells photographs — and a photograph that
cannot show where it came from is worth less every year.</p>
<p class="prose">Both problems have the same shape: the buyer cannot verify what they are being
sold. Beta Art is built around fixing that, in both directions.</p>
</article>

<article class="svc-block">
<p class="tag">What that means in practice</p>
<h2>Four commitments, written into the agreement</h2>
<ul class="tick-list">
<li><strong>A written scope and a fixed price before work starts.</strong> Not an hourly estimate.
If the scope changes, you approve the change before anything is built.</li>
<li><strong>A named person is responsible for every delivery.</strong> AI is used where it genuinely
helps — drafting, sorting, research — and never as a substitute for judgement. We will tell you
which parts were machine-assisted if you ask.</li>
<li><strong>You own the result.</strong> Source files, accounts and documentation transfer on full
payment. Nothing is held hostage to keep you on a retainer.</li>
<li><strong>Your material never trains a model.</strong> Where an AI service must be used, the
training-excluded or enterprise mode is used, and we name the service.</li>
</ul>
</article>

<article class="svc-block">
<p class="tag">Who</p>
<h2>One studio, in Norway</h2>
<p class="prose">Beta Art is the trading name of a sole enterprise established in Norway and owned
by <strong>Betül Öner</strong> — photographer, proprietor, and the person who answers the email.
The studio runs three connected properties: this one, the
<a href="https://beta-art.com/">photography archive</a>, and
<a href="https://notater.beta-art.com/">Field Notes</a>, the journal that documents
how the archive is built.</p>
<p class="prose">Small is a deliberate choice, and it has a cost we will name: we cannot take
everything, and we will say no to work that needs a team we do not have. What you get in exchange
is that the person who quoted the job is the person who delivers it.</p>
</article>

<article class="svc-block">
<p class="tag">Honestly</p>
<h2>What we are not</h2>
<ul class="line-list">
<li><strong>Not a recruiter.</strong> The career services make you better at the process; they do
not find you a job.</li>
<li><strong>Not an SEO shop selling rankings.</strong> Nobody can guarantee a position. We guarantee
the work and document it.</li>
<li><strong>Not a platform reseller.</strong> We recommend the tool your team can maintain, not the
one that pays a commission.</li>
<li><strong>Not big.</strong> If your project needs fifteen people, we will tell you at the brief
stage rather than at the deadline.</li>
</ul>
</article>

</div>

<aside class="svc-side">
<div class="side-card">
<p class="tag">The studio</p>
<ul class="side-list">
<li>Betül Öner · Beta Art · Norway</li>
<li>Sole enterprise, established in Norway</li>
<li>Working hours Mon–Fri, 09:00–17:00 CET</li>
<li>Quote turnaround 48 hours</li>
</ul>
<a class="btn btn-seal btn-block" href="quote.html">Get a quote</a>
</div>
<div class="side-card">
<p class="tag">The three properties</p>
<ul class="side-list">
<li><a href="index.html">Beta Art Business</a> — the digital studio</li>
<li><a href="https://beta-art.com/">The archive</a> — verified human photography</li>
<li><a href="https://notater.beta-art.com/">Field Notes</a> — the journal</li>
</ul>
</div>
<div class="side-card">
<p class="tag">Registration</p>
<p class="footnote">Company registration number, VAT number and registered address are published
in the legal notice once the enterprise registration is complete. Until then invoices are issued
without VAT and marked accordingly. We would rather say that than imply otherwise.</p>
<a class="btn btn-line btn-block btn-sm" href="{HUB}/legal.html#ownership">Read the legal notice</a>
</div>
</aside>
</div>
</section>

<section class="enquiry">
<div class="wrap">
<div class="head">
<p class="tag">Next step</p>
<h2>Tell us the problem.</h2>
<p class="lead">Six questions, four minutes, and a written price within 48 hours.</p>
<div class="actions">
<a class="btn btn-seal" href="quote.html">Get a quote</a>
<a class="btn btn-line" href="services.html">See all {len(S)} services</a>
</div>
</div>
</div>
</section>
</main>
""" + FOOT
open(os.path.join(OUT, "about.html"), "w", encoding="utf-8").write(about)
print("about.html yazıldı")
