/* Beta Art Business — platform behaviour. No dependencies, no build step. */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById("menu-btn");
  var nav = document.getElementById("primary-nav");

  function closeMenu() {
    if (!nav || !menuBtn) return;
    nav.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.addEventListener("click", function (e) { if (e.target.tagName === "A") closeMenu(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  }

  /* ---------- Scroll state and active section ---------- */
  var bar = document.querySelector(".bar");
  var links = nav ? Array.prototype.slice.call(nav.querySelectorAll("a")) : [];
  var sections = links.map(function (a) {
    var href = a.getAttribute("href");
    return href && href.charAt(0) === "#" ? document.querySelector(href) : null;
  }).filter(Boolean);

  function onScroll() {
    if (bar) bar.classList.toggle("is-scrolled", window.scrollY > 8);
    var current = null;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= 130) current = sections[i];
    }
    links.forEach(function (a) {
      a.classList.toggle("is-active", !!current && a.getAttribute("href") === "#" + current.id);
    });
  }

  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () { onScroll(); ticking = false; });
  }, { passive: true });
  onScroll();

  /* ---------- Smart service finder ------------------------------------
     Routes a stated problem to a service, a package and a realistic
     budget. Deliberately opinionated: one recommendation, not a menu.
  --------------------------------------------------------------------- */

  var ROUTES = {
    job: {
      title: "Private track — get seen by a human reader",
      body: "The bottleneck is almost never talent; it is that the CV never clears the screening system and the profile does not say what you actually do. Start with the application set, then the profile.",
      track: "Private", pkg: "Starter or Private Pro", budget: "kr 1 200 – 8 900", time: "5–10 working days",
      includes: ["CV rebuilt for applicant-tracking systems", "Tailored application letter template", "LinkedIn headline, about and experience", "Interview preparation session"],
      service: "CV / LinkedIn / portfolio"
    },
    startup: {
      title: "Business track — everything a new company is asked for",
      body: "A new company needs three things quickly: a name and mark it can use everywhere, a page that explains what it sells, and an invoice-ready identity. Do those first; everything else can wait.",
      track: "Business", pkg: "Professional", budget: "kr 28 000 – 45 000", time: "3–5 weeks",
      includes: ["Logo, colour and type system", "One-page website with a clear offer", "Usage guide your team can follow", "Templates for offers and invoices"],
      service: "Branding / logo"
    },
    website: {
      title: "Business track — a site your team can maintain",
      body: "The question is scope, not technology. If you sell one thing, a landing page will out-perform a five-page site. If you sell many, structure matters more than design.",
      track: "Business", pkg: "Starter for one page, Professional for a full site", budget: "kr 9 900 – 34 000", time: "2–8 weeks",
      includes: ["Design and build, mobile-first", "Content structure and writing", "Accessibility and performance pass", "Analytics and a handover session"],
      service: "Website"
    },
    customers: {
      title: "Business track — be found, then convert",
      body: "More customers is usually two separate problems: nobody arrives, and those who do arrive do not act. We fix the arriving part with SEO and content, and the acting part with a landing page.",
      track: "Business", pkg: "Professional", budget: "kr 18 000 – 40 000", time: "4–8 weeks",
      includes: ["Technical SEO and structure", "Category and service pages written", "Conversion-focused landing page", "Monthly reporting for three months"],
      service: "SEO"
    },
    automate: {
      title: "Business track — hand the repetition to a workflow",
      body: "Start with the task you do more than five times a week and hate most. One automation that works beats a platform nobody adopts.",
      track: "Business", pkg: "Premium", budget: "kr 14 000 – 79 000", time: "3–6 weeks",
      includes: ["Process mapping of the current work", "One automation built and tested", "Chatbot or AI assistant where it fits", "Documentation so it survives staff changes"],
      service: "AI automation / chatbot"
    },
    social: {
      title: "Either track — stop deciding what to post daily",
      body: "Consistency beats brilliance on social. A month planned in one sitting, designed in one pass, published on a schedule.",
      track: "Private or Business", pkg: "Monthly retainer", budget: "kr 3 900 – 7 900 / month",
      time: "First calendar in 10 days",
      includes: ["Monthly content calendar", "Designed posts in platform formats", "Captions written in your voice", "Monthly performance note"],
      service: "Social media"
    },
    income: {
      title: "Either track — build the thing that earns",
      body: "An income stream needs something to sell, somewhere to sell it and a reason to be found. We would start with the offer and the shop, not the logo.",
      track: "Private or Business", pkg: "Professional", budget: "kr 24 000 – 60 000", time: "4–10 weeks",
      includes: ["Offer and pricing structure", "E-commerce or booking set-up", "Payment and delivery configured", "Launch content and first campaign"],
      service: "E-commerce"
    }
  };

  var finderResult = document.getElementById("finder-result");

  function showRoute(key) {
    var r = ROUTES[key];
    if (!r || !finderResult) return;

    setText("finder-title", r.title);
    setText("finder-body", r.body);
    setText("finder-track", r.track);
    setText("finder-package", r.pkg);
    setText("finder-budget", r.budget);
    setText("finder-time", r.time);

    var list = document.getElementById("finder-includes");
    if (list) {
      list.innerHTML = "";
      r.includes.forEach(function (item) {
        var li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
      });
    }

    var service = document.getElementById("service");
    if (service) {
      Array.prototype.slice.call(service.options).forEach(function (opt) {
        if (opt.textContent === r.service) service.value = opt.value;
      });
    }

    finderResult.hidden = false;
    finderResult.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" });
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  document.querySelectorAll(".option").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".option").forEach(function (b) { b.classList.toggle("is-chosen", b === btn); });
      showRoute(btn.getAttribute("data-need"));
    });
  });

  var finderReset = document.getElementById("finder-reset");
  if (finderReset) {
    finderReset.addEventListener("click", function () {
      document.querySelectorAll(".option").forEach(function (b) { b.classList.remove("is-chosen"); });
      if (finderResult) finderResult.hidden = true;
      var widget = document.getElementById("finder-widget");
      if (widget) widget.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    });
  }

  /* ---------- Pricing track toggle ---------- */
  var trackButtons = document.querySelectorAll(".track-btn");
  trackButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var track = btn.getAttribute("data-track");

      trackButtons.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });

      document.querySelectorAll(".value").forEach(function (el) {
        var next = el.getAttribute("data-" + track);
        if (next) el.textContent = next;
      });

      document.querySelectorAll(".tier-note").forEach(function (el) {
        var next = el.getAttribute("data-" + track + "-note");
        if (next) el.textContent = next;
      });
    });
  });

  /* ---------- AI Studio: browser-only document builders ---------- */

  /* ---------- Market map view toggle ---------- */
  var marketButtons = document.querySelectorAll(".market-btn");
  marketButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var view = btn.getAttribute("data-market");
      marketButtons.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });
      var tiers = document.getElementById("market-tiers");
      var priority = document.getElementById("market-priority");
      if (tiers) tiers.hidden = view !== "tiers";
      if (priority) priority.hidden = view !== "priority";
    });
  });

  var TOOLS = {
    brief: {
      title: "Website brief",
      text: "WEBSITE BRIEF — Beta Art\n\n1. Company / person:\n2. What you sell, in one sentence:\n3. Who buys it:\n4. The single action a visitor should take:\n5. Pages you think you need:\n6. Three sites you like, and why:\n7. Content you already have (text, photos, logo):\n8. Content you need written:\n9. Languages required:\n10. Deadline and reason for it:\n11. Budget range:\n12. Who approves the work:\n\nNotes:\n"
    },
    logo: {
      title: "Logo brief",
      text: "LOGO BRIEF — Beta Art\n\n1. Name exactly as it should be set:\n2. Tagline, if any:\n3. What the business does:\n4. Three words it should feel like:\n5. Three words it must never feel like:\n6. Where it will appear (sign, app icon, invoice, vehicle, packaging):\n7. Smallest size it must stay legible at:\n8. Colours to use or avoid:\n9. Competitors whose marks you must not resemble:\n10. Existing materials to match:\n11. Deadline:\n\nNotes:\n"
    },
    cv: {
      title: "CV skeleton",
      text: "CV — [Full name]\n[City] · [email] · [phone] · [LinkedIn]\n\nSUMMARY\nOne sentence on what you do, one on the result you produce, one on what you are looking for.\n\nEXPERIENCE\n[Role] — [Company] — [Month Year – Month Year]\n· Did what, for whom, with what result. Lead with the result.\n· Use a number in at least half the lines.\n· Name the tools only where they are the point.\n\n[Role] — [Company] — [Month Year – Month Year]\n·\n·\n\nEDUCATION\n[Qualification] — [Institution] — [Year]\n\nSKILLS\nGroup by what an employer searches for, not by your own categories.\n\nLANGUAGES\n[Language] — [level]\n\nCHECKLIST\n· One page for under ten years of experience, two above.\n· No photo unless the market expects one.\n· File name: firstname-lastname-cv.pdf\n"
    },
    seo: {
      title: "SEO checklist",
      text: "SEO CHECKLIST — Beta Art\n\nTECHNICAL\n[ ] One H1 per page, describing the page\n[ ] Title tag under 60 characters, unique per page\n[ ] Meta description written, not generated\n[ ] Every image has real alt text\n[ ] Sitemap.xml submitted, robots.txt correct\n[ ] Pages load in under 2.5s on mobile\n[ ] HTTPS everywhere, no mixed content\n[ ] Canonical set on duplicated pages\n\nSTRUCTURE\n[ ] One page per thing you sell\n[ ] URLs readable and stable\n[ ] Internal links from strong pages to new ones\n[ ] Breadcrumbs on deep pages\n\nCONTENT\n[ ] Each page answers one real question\n[ ] The question appears in the title and first paragraph\n[ ] Local terms used where buyers are local\n[ ] Contact and prices findable without a form\n\nMEASUREMENT\n[ ] Analytics installed and privacy-compliant\n[ ] Search Console verified\n[ ] Three tracked goals defined\n"
    },
    social: {
      title: "Social media calendar",
      text: "SOCIAL CALENDAR — four weeks\n\nWEEK 1\nMon — Proof: a result, a number, a before/after\nWed — Process: how the work is actually done\nFri — Person: who is behind the business\n\nWEEK 2\nMon — Question you are asked constantly, answered\nWed — Product or service in use\nFri — Something you disagree with in your field\n\nWEEK 3\nMon — Case: problem, work, result\nWed — Practical tip your customers can use today\nFri — Behind the scenes, unpolished\n\nWEEK 4\nMon — Customer words, with permission\nWed — What you are working on next\nFri — Recap and one clear call to action\n\nRULES\n· One idea per post.\n· First line has to earn the second.\n· Post fewer times, but never miss a planned slot.\n"
    },
    plan: {
      title: "Business plan outline",
      text: "BUSINESS PLAN OUTLINE — Beta Art\n\n1. THE OFFER\nWhat you sell, to whom, for how much.\n\n2. THE PROBLEM\nWhat the customer does today instead of buying from you.\n\n3. WHY YOU\nWhat you can do that a competitor cannot copy this quarter.\n\n4. MARKET\nSize, where the buyers already gather, how they buy.\n\n5. PRICING\nUnit price, cost, margin, and the cheapest realistic competitor.\n\n6. ROUTE TO MARKET\nThe first ten customers by name or by channel.\n\n7. OPERATIONS\nWho does the work, what is outsourced, what breaks first at scale.\n\n8. NUMBERS\nMonth 1–12: revenue, costs, cash. Be pessimistic once and see if it still works.\n\n9. RISKS\nThe three that would actually stop you, and what you would do.\n\n10. NEXT 90 DAYS\nThree outcomes, dated, with the first action for each.\n"
    }
  };

  TOOLS.apply = {
  title: "Application letter",
  text: "APPLICATION LETTER \u2014 Beta Art\n\n[Your name]\n[City] \u00b7 [email] \u00b7 [phone]\n\n[Company]\n[Role], reference [number]\n[Date]\n\nOPENING \u2014 one sentence\nWhy this role at this company, specifically. Not \"I am writing to apply\".\nName the thing about them you actually noticed.\n\nPARAGRAPH 1 \u2014 the match\nThe two requirements in the advert you meet most strongly, each with one\npiece of evidence. A number if you have one.\n\nPARAGRAPH 2 \u2014 the proof\nOne short story: a situation, what you did, what came of it. Three sentences.\nThis is the paragraph they remember.\n\nPARAGRAPH 3 \u2014 the gap, if there is one\nName it before they find it. \"I have not worked in [x]; I have done [nearest\nthing] and here is why it transfers.\" Confidence, not apology.\n\nCLOSE \u2014 one sentence\nWhat you want to happen next. Ask for the conversation.\n\n[Name]\n\nCHECKLIST\n\u00b7 One page. Always.\n\u00b7 Their words from the advert, not your usual vocabulary.\n\u00b7 No sentence that would fit any other application.\n\u00b7 File name: firstname-lastname-application-[company].pdf\n"
};
TOOLS.idea = {
  title: "Business idea test",
  text: "BUSINESS IDEA \u2014 Beta Art test sheet\n\nAnswer these before building anything. An idea that survives all eight is\nworth a month of your time. One that fails 3 or 6 is worth a conversation,\nnot a company.\n\n1. THE IDEA, IN ONE SENTENCE\nI sell [what] to [whom] so they can [outcome].\n\n2. THE BUYER\nName three real people or companies who would buy it. Actual names.\nIf you cannot name three, you have a market theory, not a market.\n\n3. WHAT THEY DO TODAY INSTEAD\nEvery buyer already solves this somehow \u2014 badly, expensively, or by\nignoring it. What is the incumbent? \"Nothing\" is usually wrong.\n\n4. WHY THEY WOULD SWITCH\nThe switch has a cost: learning, risk, explaining it to a colleague.\nWhat makes it worth paying?\n\n5. PRICE\nUnit price. Cost to deliver. Margin. Cheapest realistic competitor.\nIf margin is under 30%, say why that is survivable.\n\n6. FIRST TEN CUSTOMERS\nBy name or by channel. Not \"social media\". Where exactly, and who reaches out?\n\n7. WHAT BREAKS FIRST AT SCALE\nAt 10 customers, at 100. Usually it is you.\n\n8. THE CHEAPEST TEST\nWhat is the smallest thing that would tell you this is wrong?\nDo that first, this week, before anything is built.\n\nVERDICT\nStrongest answer: ______  Weakest answer: ______\nNext action, dated: ______\n"
};
TOOLS.outline = {
  title: "Blog outline",
  text: "BLOG OUTLINE \u2014 Beta Art\n\nWORKING TITLE\nThe question a reader would actually type, phrased as a statement.\n\nTHE ONE QUESTION THIS ANSWERS\nIf you cannot write it in a single line, the piece is two pieces.\n\nWHO IS READING\nWhat they already know. What they are afraid of. What they will do next\nif this is any good.\n\nTHE ARGUMENT IN ONE SENTENCE\nWrite it now. If the piece drifts, this is what you come back to.\n\nSTRUCTURE\n1. Opening \u2014 the situation the reader recognises. No throat-clearing.\n2. Section \u2014 [claim]  \u00b7 evidence: [what makes it true]\n3. Section \u2014 [claim]  \u00b7 evidence:\n4. Section \u2014 [claim]  \u00b7 evidence:\n5. The uncomfortable part \u2014 where your own advice does not apply.\n   Include this. It is why the rest gets believed.\n6. Close \u2014 what to do on Monday.\n\nEVIDENCE I ACTUALLY HAVE\n\u00b7\n\u00b7\n\nWHAT I AM LEAVING OUT\nList it. Half of editing is deciding what belongs in the next piece.\n\nSEARCH\nTitle under 60 characters:\nDescription, 140\u2013160 characters:\nThe question in the first paragraph: yes / no\nInternal links to my own commercial pages:\n"
};
var toolOutput = document.getElementById("tool-output");
  var toolBody = document.getElementById("tool-body");

  document.querySelectorAll(".tool").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var tool = TOOLS[btn.getAttribute("data-tool")];
      if (!tool || !toolOutput || !toolBody) return;

      document.querySelectorAll(".tool").forEach(function (b) { b.classList.toggle("is-chosen", b === btn); });
      setText("tool-title", tool.title);
      toolBody.value = tool.text;
      toolOutput.hidden = false;
      toolBody.focus();
    });
  });

  var toolCopy = document.getElementById("tool-copy");
  if (toolCopy) {
    toolCopy.addEventListener("click", function () {
      if (!toolBody) return;
      toolBody.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      if (navigator.clipboard && !ok) navigator.clipboard.writeText(toolBody.value);
      setText("tool-note", "Copied. Paste it into the quote request or keep it for yourself.");
    });
  }

  /* ---------- Quote form ---------- */
  var form = document.getElementById("enquiry-form");
  var status = document.getElementById("form-status");

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

    var name = form.elements.name.value.trim();
    setError("name", name.length >= 2 ? "" : "Please enter your name.");
    if (name.length < 2) firstInvalid = firstInvalid || form.elements.name;

    var email = form.elements.email.value.trim();
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    setError("email", emailOk ? "" : "Please enter a valid email address.");
    if (!emailOk) firstInvalid = firstInvalid || form.elements.email;

    var brief = form.elements.brief.value.trim();
    setError("brief", brief.length >= 15 ? "" : "A sentence or two about the problem, please.");
    if (brief.length < 15) firstInvalid = firstInvalid || form.elements.brief;

    var consent = form.elements.consent.checked;
    setError("consent", consent ? "" : "We need your consent to prepare a quote.");
    if (!consent) firstInvalid = firstInvalid || form.elements.consent;

    return firstInvalid;
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstInvalid = validate();
      if (firstInvalid) {
        if (status) status.textContent = "";
        firstInvalid.focus();
        return;
      }
      // No backend here: connect a form endpoint or the studio inbox before launch.
      if (status) status.textContent = "Request received. A written scope and price follow within 48 hours, from hallo@beta-art.com.";
      form.reset();
    });
  }

  var summaryBtn = document.getElementById("quote-summary");
  if (summaryBtn && form) {
    summaryBtn.addEventListener("click", function () {
      var lines = [
        "BETA ART — PROJECT BRIEF",
        "",
        "I am: " + form.elements.track.value,
        "What I need: " + form.elements.service.value,
        "Name: " + form.elements.name.value,
        "Email: " + form.elements.email.value,
        "Budget: " + form.elements.budget.value,
        "Needed by: " + (form.elements.deadline.value || "not set"),
        "",
        "The problem:",
        form.elements.brief.value || "(describe the situation here)"
      ].join("\n");

      if (toolOutput && toolBody) {
        setText("tool-title", "Your project brief");
        toolBody.value = lines;
        toolOutput.hidden = false;
        toolOutput.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
        setText("tool-note", "Copy this and email it to hallo@beta-art.com, or send the form above.");
      }
    });
  }

  /* ---------- Cookie notice ---------- */
  var cookie = document.getElementById("cookie");
  var cookieOk = document.getElementById("cookie-ok");
  var seen = null;
  try { seen = localStorage.getItem("beta-art-business-notice"); } catch (e) { /* private mode */ }

  if (cookie && seen !== "seen") {
    cookie.hidden = false;
    if (cookieOk) {
      cookieOk.addEventListener("click", function () {
        cookie.hidden = true;
        try { localStorage.setItem("beta-art-business-notice", "seen"); } catch (e) { /* ignore */ }
      });
    }
  }

  /* ---------- Back to top and year ---------- */
  var toTop = document.getElementById("to-top");
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });
  }
})();
