/* Beta Art Business — guided quote flow.
   Six steps. Each answer narrows the recommendation shown alongside.
   Everything runs in the browser; nothing is sent until the form is submitted. */
(function () {
"use strict";

var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var form = document.getElementById("flow-form");
if (!form) return;

var answers = { sector: "", goal: "", budget: "", deadline: "", service: "" };
var step = 1, LAST = 6;

/* ---- recommendation table: goal decides the service, sector adjusts the track ---- */
var REC = {
  job:       { t:"Get seen by a human reader", s:"cv", name:"CV & job applications",
               pkg:"Starter or Private Pro", range:"kr 1 200 – 8 900", time:"5–10 working days",
               b:"The bottleneck is almost never talent — it is that the CV never clears the screening system. Start with the application set, then the profile." },
  startup:   { t:"Everything a new company is asked for", s:"branding", name:"Branding",
               pkg:"Professional", range:"kr 28 000 – 45 000", time:"3–5 weeks",
               b:"A name and mark you can use everywhere, a page that explains what you sell, and an invoice-ready identity. Those first; the rest can wait." },
  website:   { t:"A site your team can maintain", s:"website", name:"Website",
               pkg:"Starter for one page, Professional for a full site", range:"kr 9 900 – 34 000", time:"2–8 weeks",
               b:"The question is scope, not technology. If you sell one thing a landing page will out-perform a five-page site." },
  customers: { t:"Be found, then convert", s:"seo", name:"SEO",
               pkg:"Professional", range:"kr 18 000 – 40 000", time:"4–8 weeks",
               b:"Two separate problems: nobody arrives, and those who do arrive do not act. SEO and content fix the first, a landing page the second." },
  automate:  { t:"Hand the repetition to a workflow", s:"ai-automation", name:"AI automation",
               pkg:"Premium", range:"kr 14 000 – 79 000", time:"3–6 weeks",
               b:"Start with the task you do more than five times a week and hate most. One working automation beats a platform nobody adopts." },
  social:    { t:"Stop deciding what to post daily", s:"social-media", name:"Social media",
               pkg:"Monthly retainer", range:"kr 3 900 – 7 900 / month", time:"First calendar in 10 days",
               b:"Consistency beats brilliance. A month planned in one sitting, designed in one pass, published on a schedule." },
  sell:      { t:"Build the thing that earns", s:"ecommerce", name:"E-commerce",
               pkg:"Professional", range:"kr 24 000 – 60 000", time:"6–10 weeks",
               b:"Most small shops lose customers in the last three clicks. We build around the checkout, not around the theme." },
  measure:   { t:"Three questions, answered every month", s:"reporting", name:"Reporting & data analysis",
               pkg:"Starter or Professional", range:"kr 9 500 – 34 000", time:"3–5 weeks",
               b:"Agree the three questions you actually ask, then build the dashboard that answers exactly those. Not forty charts nobody reads." }
};
/* private buyers get the private-track equivalent where one exists */
var PRIVATE_SWAP = {
  website:   { s:"personal-site", name:"Personal website", range:"kr 6 900 – 12 000", time:"2–3 weeks" },
  social:    { s:"social-content", name:"Social content", range:"kr 3 900 / month", time:"First calendar in 10 days" },
  customers: { s:"portfolio", name:"Portfolio", range:"kr 8 500 – 15 000", time:"3–4 weeks" },
  automate:  { s:"ai-assistant", name:"Personal AI assistant", range:"kr 4 500 – 9 000", time:"1–2 weeks" }
};

function $(id) { return document.getElementById(id); }
function setText(id, v) { var el = $(id); if (el) el.textContent = v; }

function recommend() {
  var r = REC[answers.goal];
  var side = $("flow-side");
  if (!r || !side) return;
  var name = r.name, slug = r.s, range = r.range, time = r.time;
  var note = "";
  if (answers.sector === "private" && PRIVATE_SWAP[answers.goal]) {
    var p = PRIVATE_SWAP[answers.goal];
    name = p.name; slug = p.s; range = p.range; time = p.time;
    note = "Shown on the Private track because you selected a private person.";
  }
  if (answers.sector === "public") {
    note = "Public bodies: framework agreements and procurement terms are available — say so in the brief.";
  }
  side.hidden = false;
  setText("rec-title", r.t);
  setText("rec-body", r.b);
  setText("rec-service", name);
  setText("rec-package", r.pkg);
  setText("rec-budget", answers.budget && answers.budget !== "Not decided" ? answers.budget + " (yours)" : range);
  setText("rec-time", time);
  setText("rec-note", note);
  var link = $("rec-link");
  if (link) { link.href = "s-" + slug + ".html"; link.textContent = "Read the " + name + " page"; }
  var sel = $("service");
  if (sel && !sel.value) sel.value = slug;
}

/* ---- step machine ---- */
function show(n) {
  step = Math.max(1, Math.min(LAST, n));
  Array.prototype.forEach.call(document.querySelectorAll(".flow-step"), function (fs) {
    fs.classList.toggle("is-active", Number(fs.getAttribute("data-step")) === step);
  });
  Array.prototype.forEach.call(document.querySelectorAll("#flow-rail li"), function (li) {
    var d = Number(li.getAttribute("data-step"));
    li.classList.toggle("is-current", d === step);
    li.classList.toggle("is-done", d < step);
  });
  $("flow-back").hidden = step === 1;
  $("flow-next").hidden = step === LAST;
  $("flow-send").hidden = step !== LAST;
  var active = document.querySelector(".flow-step.is-active");
  if (active) {
    var first = active.querySelector("button.option, input, textarea, select");
    if (first) first.focus({ preventScroll: true });
    active.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" });
  }
}

Array.prototype.forEach.call(document.querySelectorAll("[data-pick]"), function (btn) {
  btn.addEventListener("click", function () {
    var key = btn.getAttribute("data-pick");
    answers[key] = btn.getAttribute("data-value");
    var group = btn.closest(".option-grid");
    if (group) Array.prototype.forEach.call(group.querySelectorAll(".option"), function (b) {
      b.classList.toggle("is-chosen", b === btn);
      b.setAttribute("aria-pressed", String(b === btn));
    });
    recommend();
    if (step < LAST) window.setTimeout(function () { show(step + 1); }, reduced ? 0 : 160);
  });
});

$("flow-next").addEventListener("click", function () { show(step + 1); });
$("flow-back").addEventListener("click", function () { show(step - 1); });

var sel = $("service");
if (sel) sel.addEventListener("change", function () { answers.service = sel.value; });

/* ---- preselect from ?service= on the service pages ---- */
(function preselect() {
  var m = /[?&]service=([a-z0-9-]+)/.exec(window.location.search);
  if (!m || !sel) return;
  var opt = sel.querySelector('option[value="' + m[1] + '"]');
  if (!opt) return;
  sel.value = m[1];
  answers.service = m[1];
  var status = $("form-status");
  if (status) status.textContent = "Starting from " + opt.textContent.split(" — ")[0] + ".";
})();

/* ---- validation ---- */
function setError(field, message) {
  var box = form.querySelector('[data-error="' + field + '"]');
  var input = form.elements[field];
  if (box) { box.textContent = message || ""; box.hidden = !message; }
  if (input) {
    if (message) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
  }
}

function validate() {
  var firstInvalid = null;
  var brief = form.elements.brief.value.trim();
  setError("brief", brief.length >= 15 ? "" : "A sentence or two about the problem, please.");
  if (brief.length < 15) firstInvalid = firstInvalid || form.elements.brief;
  var name = form.elements.name.value.trim();
  setError("name", name.length >= 2 ? "" : "Please enter your name.");
  if (name.length < 2) firstInvalid = firstInvalid || form.elements.name;
  var email = form.elements.email.value.trim();
  var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  setError("email", emailOk ? "" : "Please enter a valid email address.");
  if (!emailOk) firstInvalid = firstInvalid || form.elements.email;
  var consent = form.elements.consent.checked;
  setError("consent", consent ? "" : "We need your consent to prepare a quote.");
  if (!consent) firstInvalid = firstInvalid || form.elements.consent;
  return firstInvalid;
}

/* ---- brief the visitor can keep ---- */
function buildBrief() {
  var sv = sel && sel.options[sel.selectedIndex] ? sel.options[sel.selectedIndex].text : "not decided";
  var lines = [
    "BETA ART — PROJECT BRIEF",
    "",
    "Buyer:        " + (answers.sector || "not stated"),
    "Goal:         " + (answers.goal || "not stated"),
    "Service:      " + sv,
    "Budget:       " + (answers.budget || "not decided"),
    "Deadline:     " + (answers.deadline || "no fixed date"),
    "Tied to:      " + (form.elements.deadline_note.value.trim() || "—"),
    "",
    "Name:         " + form.elements.name.value.trim(),
    "Email:        " + form.elements.email.value.trim(),
    "Organisation: " + (form.elements.org.value.trim() || "—"),
    "",
    "THE PROBLEM",
    form.elements.brief.value.trim() || "(describe the situation here)",
    "",
    "Sent from " + window.location.host
  ];
  return lines.join("\n");
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  var firstInvalid = validate();
  var status = $("form-status");
  if (firstInvalid) {
    if (status) status.textContent = "";
    firstInvalid.focus();
    return;
  }
  var out = $("brief-output"), body = $("brief-body");
  if (out && body) {
    body.value = buildBrief();
    out.hidden = false;
    out.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }
  if (status) status.textContent = "Brief ready. A written scope and price follow within 48 hours, from hallo@beta-art.com.";
});

var copy = $("brief-copy");
if (copy) {
  copy.addEventListener("click", function () {
    var body = $("brief-body");
    if (!body) return;
    body.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
    if (navigator.clipboard && !ok) navigator.clipboard.writeText(body.value);
    setText("brief-note", "Copied. Paste it into an email to hallo@beta-art.com, or keep it — it works as a brief for any supplier.");
  });
}

show(1);
})();
