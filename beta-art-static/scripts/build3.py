import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from data import S
from build import head, FOOT, SITE, HUB, strip

OUT = "/home/user/BETA-ART/beta-art-business"
opts = "\n".join(f'<option value="{s["slug"]}">{strip(s["title"])} — {s["price"]}</option>' for s in S)

# ---------------- QUOTE: smart multi-step flow ----------------
quote = head("Get a quote — Beta Art Business",
  "A guided brief: sector, goal, budget, deadline and needs. You get a written scope and a fixed price within 48 hours.",
  f"{SITE}/quote.html") + f"""
<main id="main">
<section class="svc-hero">
<div class="grid-bg" aria-hidden="true"></div>
<div class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">
<a href="index.html">Home</a> <span aria-hidden="true">·</span> <span aria-current="page">Get a quote</span>
</nav>
<p class="tag">Guided brief</p>
<h1>Six questions, then a written price.</h1>
<p class="lead">This is not a contact form. Each answer narrows what we recommend, and the summary
at the end is a brief you can copy, edit and send — or keep for another supplier. Nothing is sent
until you press send, and nothing runs in the background.</p>
</div>
</section>

<section class="section">
<div class="wrap">
<div class="flow" id="flow">
<ol class="flow-rail" id="flow-rail" aria-label="Progress">
<li class="is-current" data-step="1">Sector</li>
<li data-step="2">Goal</li>
<li data-step="3">Budget</li>
<li data-step="4">Deadline</li>
<li data-step="5">Needs</li>
<li data-step="6">Contact</li>
</ol>

<form class="flow-form" id="flow-form" novalidate>

<fieldset class="flow-step is-active" data-step="1">
<legend><span class="step-mark">01</span> What kind of buyer are you?</legend>
<p class="footnote">This decides whether you see Private or Business pricing, and which terms apply.</p>
<div class="option-grid">
<button type="button" class="option" data-pick="sector" data-value="private">A private person</button>
<button type="button" class="option" data-pick="sector" data-value="company">A company</button>
<button type="button" class="option" data-pick="sector" data-value="public">A public body</button>
<button type="button" class="option" data-pick="sector" data-value="ngo">An NGO or association</button>
</div>
</fieldset>

<fieldset class="flow-step" data-step="2">
<legend><span class="step-mark">02</span> What are you actually trying to do?</legend>
<p class="footnote">Say the situation, not the product. We will name the service.</p>
<div class="option-grid">
<button type="button" class="option" data-pick="goal" data-value="job">Get a job or be found by recruiters</button>
<button type="button" class="option" data-pick="goal" data-value="startup">Start a company properly</button>
<button type="button" class="option" data-pick="goal" data-value="website">Build or replace a website</button>
<button type="button" class="option" data-pick="goal" data-value="customers">Get more customers</button>
<button type="button" class="option" data-pick="goal" data-value="automate">Stop doing a task by hand</button>
<button type="button" class="option" data-pick="goal" data-value="social">Grow on social media</button>
<button type="button" class="option" data-pick="goal" data-value="sell">Sell online</button>
<button type="button" class="option" data-pick="goal" data-value="measure">Understand my own numbers</button>
</div>
</fieldset>

<fieldset class="flow-step" data-step="3">
<legend><span class="step-mark">03</span> What is the budget?</legend>
<p class="footnote">An honest range saves both of us a meeting. If it is too low for the job we
will say so and suggest the smaller version.</p>
<div class="option-grid">
<button type="button" class="option" data-pick="budget" data-value="Under kr 10 000">Under kr 10 000</button>
<button type="button" class="option" data-pick="budget" data-value="kr 10 000 – 40 000">kr 10 000 – 40 000</button>
<button type="button" class="option" data-pick="budget" data-value="kr 40 000 – 100 000">kr 40 000 – 100 000</button>
<button type="button" class="option" data-pick="budget" data-value="Over kr 100 000">Over kr 100 000</button>
<button type="button" class="option" data-pick="budget" data-value="Not decided">Not decided yet</button>
</div>
</fieldset>

<fieldset class="flow-step" data-step="4">
<legend><span class="step-mark">04</span> When do you need it?</legend>
<div class="option-grid">
<button type="button" class="option" data-pick="deadline" data-value="Within 2 weeks">Within 2 weeks</button>
<button type="button" class="option" data-pick="deadline" data-value="Within 1 month">Within a month</button>
<button type="button" class="option" data-pick="deadline" data-value="1–3 months">One to three months</button>
<button type="button" class="option" data-pick="deadline" data-value="No fixed date">No fixed date</button>
</div>
<div class="field"><label for="deadline-note">A date it is tied to — optional</label>
<input id="deadline-note" name="deadline_note" type="text" placeholder="e.g. a trade fair on 12 October"></div>
</fieldset>

<fieldset class="flow-step" data-step="5">
<legend><span class="step-mark">05</span> What is the problem, in your own words?</legend>
<div class="field">
<label for="brief">Describe the situation</label>
<textarea id="brief" name="brief" rows="5" required placeholder="What is happening now, what you have tried, and what a good outcome would look like."></textarea>
<p class="error" data-error="brief" role="alert" hidden></p>
</div>
<div class="field">
<label for="service">A specific service, if you already know</label>
<select id="service" name="service">
<option value="">Not sure — recommend one</option>
{opts}
</select>
</div>
</fieldset>

<fieldset class="flow-step" data-step="6">
<legend><span class="step-mark">06</span> Where do we send the price?</legend>
<div class="field-row">
<div class="field"><label for="name">Name</label><input id="name" name="name" type="text" autocomplete="name" required><p class="error" data-error="name" role="alert" hidden></p></div>
<div class="field"><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="email" required><p class="error" data-error="email" role="alert" hidden></p></div>
</div>
<div class="field"><label for="org">Organisation — optional</label><input id="org" name="org" type="text" autocomplete="organization"></div>
<label class="consent"><input type="checkbox" id="consent" name="consent" required><span>Beta Art may process these details to prepare a quote. See the <a href="{HUB}/legal.html#privacy">privacy notice</a>.</span></label>
<p class="error" data-error="consent" role="alert" hidden></p>
</fieldset>

<div class="flow-nav">
<button class="btn btn-line" type="button" id="flow-back" hidden>Back</button>
<button class="btn btn-seal" type="button" id="flow-next">Next</button>
<button class="btn btn-seal" type="submit" id="flow-send" hidden>Send the brief</button>
</div>
<p class="form-status" id="form-status" role="status" aria-live="polite"></p>
</form>

<aside class="flow-side" id="flow-side" hidden aria-live="polite">
<h2 class="tag">Recommended so far</h2>
<h3 id="rec-title">—</h3>
<p id="rec-body">Answer the first two questions and a recommendation appears here.</p>
<dl class="finder-meta">
<div><dt>Service</dt><dd id="rec-service">—</dd></div>
<div><dt>Package</dt><dd id="rec-package">—</dd></div>
<div><dt>Typical range</dt><dd id="rec-budget">—</dd></div>
<div><dt>Typical delivery</dt><dd id="rec-time">—</dd></div>
</dl>
<a class="btn btn-line btn-block btn-sm" id="rec-link" href="services.html">Read the service page</a>
<p class="footnote" id="rec-note"></p>
</aside>
</div>

<div class="tool-output" id="brief-output" hidden>
<div class="tool-head"><h4>Your brief</h4><button type="button" class="btn-mini" id="brief-copy">Copy</button></div>
<textarea id="brief-body" rows="16" aria-label="Generated brief"></textarea>
<p class="footnote" id="brief-note">Copy this and email it to hallo@beta-art.com, or keep it — it works
as a brief for any supplier.</p>
</div>
</div>
</section>

<section class="section">
<div class="wrap">
<div class="head"><p class="tag">What happens next</p><h2>After you press send.</h2></div>
<ol class="process">
<li><span class="step-no">01</span><h3>Within 48 hours</h3><p>A written scope, a fixed price and a delivery date — or an honest note that we are not the right studio.</p></li>
<li><span class="step-no">02</span><h3>You approve in writing</h3><p>Nothing is charged and no work starts before that. Nothing said in a chat binds either side.</p></li>
<li><span class="step-no">03</span><h3>Work begins</h3><p>Progress at agreed checkpoints, not a silence followed by a reveal.</p></li>
<li><span class="step-no">04</span><h3>You receive everything</h3><p>Files, source, accounts and a handover note. You own the result outright.</p></li>
</ol>
</div>
</section>
</main>
<script src="quote.js"></script>
""" + FOOT
open(os.path.join(OUT, "quote.html"), "w", encoding="utf-8").write(quote)
print("quote.html yazıldı")
