/* Beta Art Business — rights desk behaviour. No dependencies, no build step. */
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

  /* ---------- Scroll state + active section ---------- */
  var bar = document.querySelector(".bar");
  var links = nav ? Array.prototype.slice.call(nav.querySelectorAll("a")) : [];
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

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

  /* ---------- Reveal on entry ---------- */
  var revealables = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    revealables.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Desk figures ---------- */
  var counters = document.querySelectorAll("[data-count]");

  function runCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    if (reduced || target === 0) { el.textContent = String(target); return; }

    var duration = 1300, start = null;
    function step(now) {
      if (start === null) start = now;
      var t = Math.min((now - start) / duration, 1);
      el.textContent = String(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { counterObserver.observe(el); });
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- Market map: tier filter ---------- */
  var tierButtons = document.querySelectorAll(".toggle-btn");
  var tierGroups = document.querySelectorAll(".tier-group");

  tierButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var tier = btn.getAttribute("data-tier");

      tierButtons.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });

      tierGroups.forEach(function (group) {
        group.hidden = !(tier === "all" || group.getAttribute("data-tier") === tier);
      });
    });
  });

  /* ---------- Packages: annual / per project ---------- */
  var periodButtons = document.querySelectorAll(".period-btn");
  var swappable = document.querySelectorAll(".value, .unit");

  periodButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var period = btn.getAttribute("data-period");

      periodButtons.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });

      swappable.forEach(function (el) {
        var next = el.getAttribute("data-" + period);
        if (next) el.textContent = next;
      });
    });
  });

  /* ---------- Enquiry form ---------- */
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

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstInvalid = null;

      var name = form.elements.name.value.trim();
      setError("name", name.length >= 2 ? "" : "Please enter your name.");
      if (name.length < 2) firstInvalid = firstInvalid || form.elements.name;

      var email = form.elements.email.value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
      setError("email", emailOk ? "" : "Please enter a valid work email address.");
      if (!emailOk) firstInvalid = firstInvalid || form.elements.email;

      var brief = form.elements.brief.value.trim();
      setError("brief", brief.length >= 15 ? "" : "A sentence or two on the intended use, please.");
      if (brief.length < 15) firstInvalid = firstInvalid || form.elements.brief;

      var consent = form.elements.consent.checked;
      setError("consent", consent ? "" : "We need your consent to prepare a quote.");
      if (!consent) firstInvalid = firstInvalid || form.elements.consent;

      if (firstInvalid) {
        if (status) status.textContent = "";
        firstInvalid.focus();
        return;
      }

      // No backend here: wire this to the desk inbox or CRM before launch.
      if (status) status.textContent = "Enquiry logged. The desk replies within one working day.";
      form.reset();
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

  /* ---------- Back to top ---------- */
  var toTop = document.getElementById("to-top");
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });
  }

  /* ---------- Year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
