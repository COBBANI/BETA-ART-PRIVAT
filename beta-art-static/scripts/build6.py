import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from data import S
from build import head, FOOT, SITE, HUB

OUT = "/home/user/BETA-ART/beta-art-business"
BY = {s["slug"]: s for s in S}

# Beta Art runs the three roles it sells. Each entry states the scope it has
# here, and — more usefully for a buyer — the boundary it is held to.
STAFF = [
 dict(slug="ai-receptionist", n="01", name="AI receptionist",
   status="In setup",
   since="Rules written 18 August 2026 · not yet answering",
   here="First contact on hallo@beta-art.com and the site's chat. It answers what a service "
        "costs, how long it takes, what is included, and what we do not sell. It books the "
        "first call straight into the studio calendar.",
   may=["Quote the published starting price of any of the 25 services",
        "State the published delivery window",
        "Book a first call into an open slot",
        "Say plainly that it is not a person, in the first message"],
   maynot=["Quote a project price — every project is priced in writing after a brief",
           "Promise a delivery date for work that has not been scoped",
           "Discuss an existing client's work with anyone",
           "Discount, negotiate or waive a term"],
   escalate="Anything about an existing project, anything legal, anything where the honest "
            "answer is \"it depends\" — passed to Betül with the whole conversation attached, "
            "same working day.",
   ),
 dict(slug="ai-sales-assistant", n="02", name="AI sales assistant",
   status="In setup",
   since="Rules written 18 August 2026 · not yet answering",
   here="Handles the brief that arrives through the quote form. It reads what was written, "
        "works out which of the 25 services actually fits, and says so — including when the "
        "answer is that we are the wrong studio.",
   may=["Route a brief to the service that fits it",
        "Ask the four questions that decide whether a project is worth a meeting",
        "Say that Beta Art is not the right supplier for this piece of work",
        "Send the written scope template for Betül to complete"],
   maynot=["Send a price. Every quote is written and signed by a person",
           "Start work, commission anything, or accept a deadline",
           "Claim a case study, a client name or a result",
           "Follow up more than twice"],
   escalate="Every brief that qualifies goes to a person before any price is named. The "
            "assistant never closes; it prepares.",
   ),
 dict(slug="ai-office-assistant", n="03", name="AI office assistant",
   status="In setup",
   since="Rules written 18 August 2026 · not yet answering",
   here="The studio's own administration: the inbox sorted each morning, invoices drafted "
        "from the agreed scope, the EHF 3.0 fields checked before anything goes out, and the "
        "quiet chases sent on the day they are due.",
   may=["Sort the inbox into decide / read / no action",
        "Draft an invoice from an agreed scope, as a draft",
        "Check an invoice against the EHF 3.0 required fields",
        "Send a payment reminder on the agreed schedule"],
   maynot=["Send an invoice. Every invoice is approved by a person first",
           "Touch client files, source files or delivery folders",
           "Write to a client in Betül's name without approval",
           "Change a price, a term or a date on any document"],
   escalate="Anything it drafts waits as a draft. Nothing it writes reaches a client without "
            "a person opening it first.",
   ),
]

def block(x):
    svc = BY[x["slug"]]
    return f"""<li class="staff-file" id="{x['slug']}">
<div class="staff-file-head">
<p class="staff-role">Role {x['n']}</p>
<h3><a href="s-{x['slug']}.html">{x['name']}</a></h3>
<p class="staff-status">{x['status']} · {x['since']}</p>
</div>
<p class="staff-here">{x['here']}</p>
<div class="staff-rules">
<div>
<p class="tag">It may</p>
<ul class="tick-list">{''.join(f'<li>{i}</li>' for i in x['may'])}</ul>
</div>
<div>
<p class="tag">It may not</p>
<ul class="bar-list">{''.join(f'<li>{i}</li>' for i in x['maynot'])}</ul>
</div>
</div>
<p class="staff-escalate"><strong>Escalation.</strong> {x['escalate']}</p>
<p class="footnote"><a href="s-{x['slug']}.html">The same role, for your company →</a>
{svc['price']}</p>
</li>"""

ld = {"@context": "https://schema.org", "@type": "WebPage",
      "name": "The operating document for Beta Art's own AI employees",
      "description": "What Beta Art's own AI receptionist, sales assistant and office "
                     "assistant may do, what they may not, and where a person takes over.",
      "url": f"{SITE}/ai-staff.html", "inLanguage": "en",
      "publisher": {"@type": "Organization", "name": "Beta Art", "url": HUB + "/"}}

page = head(
 "The AI employees we run ourselves — Beta Art Business",
 "The operating document for Beta Art's own AI receptionist, sales assistant and office "
 "assistant — what each may do, what it may not, and where a person takes over.",
 f"{SITE}/ai-staff.html") + f"""
<main id="main">

<section class="svc-hero">
<div class="grid-bg" aria-hidden="true"></div>
<div class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">
<a href="index.html">Home</a> <span aria-hidden="true">·</span>
<a href="services.html#business">Business</a> <span aria-hidden="true">·</span>
<span aria-current="page">Our own AI employees</span>
</nav>
<p class="tag">The operating document · Published before launch</p>
<h1>The rules, before we switch them on.</h1>
<p class="lead">Beta Art is putting the same three roles it sells to work in its own studio: a
receptionist on first contact, a sales assistant on the quote form, and an office assistant on
the administration. None of them is answering yet. What is finished is the part that matters —
the document that says what each may do, what it may not, and where a person takes over. It is
published here first, in the same form a client receives on day one, because a boundary written
after something goes wrong is not a boundary.</p>
</div>
</section>

<section class="section">
<div class="wrap">
<div class="head">
<p class="tag">Why this page exists</p>
<h2>An AI employee is only as good as the list of things it may not do.</h2>
<p class="lead">Every supplier will tell you what their automation can do. The useful question is
the other one: what happens when it does not know, what is it forbidden from saying, and who
finds out. Those answers are below for our own three, in the same form we write them for a
client. If a supplier cannot give you this page for their own operation, ask why.</p>
</div>

<div class="note-band">
<p class="footnote"><strong>Status, and why it says what it says.</strong> All three read
<em>In setup</em> today. The rules below are written and the access boundaries are in place;
none of the three is answering yet. We could have written <em>in operation</em> and nobody
would have checked — which is exactly why it would have been worthless. Beta Art sells
verification at the source; the first thing that has to survive it is our own page. The line
changes on the day it changes, with the date, and this note stays here so you can tell the
difference between a status and a slogan.</p>
</div>

<ol class="staff-files">
{chr(10).join(block(x) for x in STAFF)}
</ol>
</div>
</section>

<section class="section">
<div class="wrap">
<div class="head">
<p class="tag">The standing rules</p>
<h2>Four rules that apply to all three, here and at a client.</h2>
</div>
<ol class="priority">
<li><h3>It says what it is</h3><p>Each of the three states in its first message that it is not a
person. Not in a footnote, not on request — in the greeting. A conversation that begins with a
false impression is worthless as sales and indefensible as practice.</p></li>
<li><h3>It never invents a price or a date</h3><p>It quotes the published starting price and the
published delivery window, both of which are on the service page and both of which a person
wrote. Anything specific to a project is quoted in writing by a person.</p></li>
<li><h3>Nothing reaches a client unread</h3><p>Everything the office assistant produces waits as a
draft. The sales assistant prepares a scope; it does not send one. The receptionist books a call;
it does not agree work.</p></li>
<li><h3>Two supervised weeks, then a monthly read</h3><p>Every conversation is reviewed daily for
the first fortnight and the answers corrected. After that it is a monthly read of what it could
not answer — which is the list that tells you what the business has stopped explaining properly.</p></li>
</ol>
</div>
</section>

<section class="section">
<div class="wrap">
<div class="head">
<p class="tag">Data</p>
<h2>What is kept, for how long, and who can delete it.</h2>
</div>
<div class="note-band">
<p class="footnote">Every conversation with any of the three is stored as text under Beta Art's
control, not a vendor's. Retention is twelve months for enquiries that did not become work, and
the life of the contract plus the statutory accounting period for those that did. You can ask for
a copy or for deletion at any time, and the request is handled by a person. None of the three has
access to client source files, delivery folders or archive originals — that access is scoped away
from them, not merely discouraged. The lawful basis, the processors and the transfer position are
set out in the <a href="{HUB}/legal.html#privacy">privacy section of the legal notice</a>, which
covers every jurisdiction Beta Art operates in.</p>
</div>
</div>
</section>

<section class="enquiry">
<div class="wrap"><div class="head">
<p class="tag">The same three, for you</p>
<h2>Put one on duty.</h2>
<p class="lead">Each role is sold as a setup fee plus a monthly fee, because staff are not a
project. You get this document, filled in for your business, before anything goes live.</p>
<div class="actions">
<a class="btn btn-seal" href="quote.html?service=ai-receptionist">Start with the receptionist</a>
<a class="btn btn-line" href="index.html#ai-staff">Compare the three roles</a>
</div>
</div></div>
</section>

</main>
<script type="application/ld+json">
{json.dumps(ld, ensure_ascii=False, indent=1)}
</script>
""" + FOOT

open(os.path.join(OUT, "ai-staff.html"), "w", encoding="utf-8").write(page)
print("ai-staff.html yazıldı")
