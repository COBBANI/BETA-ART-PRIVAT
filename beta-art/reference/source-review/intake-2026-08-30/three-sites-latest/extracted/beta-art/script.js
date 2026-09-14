/* Beta Art — archive site behaviour. No dependencies, no build step. */
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

  /* ---------- Scroll: sticky rule, progress bar, active section ---------- */
  var masthead = document.querySelector(".masthead");
  var progress = document.getElementById("progress-bar");
  var links = nav ? Array.prototype.slice.call(nav.querySelectorAll("a")) : [];
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  function onScroll() {
    if (masthead) masthead.classList.toggle("is-scrolled", window.scrollY > 8);

    if (progress) {
      var scrollable = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      progress.style.width = Math.max(0, Math.min(1, ratio)) * 100 + "%";
    }

    var current = null;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= 140) current = sections[i];
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
  window.addEventListener("resize", onScroll);
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

  /* ---------- Archive figures ---------- */
  var counters = document.querySelectorAll("[data-count]");

  function runCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";

    function format(value) {
      return value.toLocaleString("en-US") + suffix;
    }

    if (reduced) { el.textContent = format(target); return; }

    var duration = 1400, start = null;
    function step(now) {
      if (start === null) start = now;
      var t = Math.min((now - start) / duration, 1);
      el.textContent = format(Math.round(target * (1 - Math.pow(1 - t, 3))));
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

  /* ---------- Collection filter ---------- */
  var chips = document.querySelectorAll(".chip");
  var plates = document.querySelectorAll("#plates .plate");
  var emptyState = document.getElementById("empty-state");

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var filter = chip.getAttribute("data-filter");

      chips.forEach(function (c) {
        var active = c === chip;
        c.classList.toggle("is-active", active);
        c.setAttribute("aria-pressed", String(active));
      });

      var shown = 0;
      plates.forEach(function (plate) {
        var match = filter === "all" || plate.getAttribute("data-category") === filter;
        plate.hidden = !match;
        if (match) shown++;
      });

      if (emptyState) emptyState.hidden = shown !== 0;
    });
  });

  /* ---------- Licence request form ---------- */
  var form = document.getElementById("licence-form");
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
      setError("email", emailOk ? "" : "Please enter a valid email address.");
      if (!emailOk) firstInvalid = firstInvalid || form.elements.email;

      var usage = form.elements.usage.value.trim();
      setError("usage", usage.length >= 15 ? "" : "Describe the intended use in a sentence or two.");
      if (usage.length < 15) firstInvalid = firstInvalid || form.elements.usage;

      if (firstInvalid) {
        if (status) status.textContent = "";
        firstInvalid.focus();
        return;
      }

      // No backend here: connect a form endpoint or licensing inbox before launch.
      if (status) status.textContent = "Request received. We answer licence enquiries within 48 hours.";
      form.reset();
    });
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
