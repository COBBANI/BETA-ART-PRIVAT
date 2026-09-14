/* Field Notes — journal behaviour. Shared by index.html and post.html. */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Reading theme ---------- */
  var root = document.documentElement;
  var themeBtn = document.getElementById("theme-btn");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (!themeBtn) return;
    var dark = theme === "dark";
    themeBtn.setAttribute("aria-pressed", String(dark));
    themeBtn.setAttribute("aria-label", dark ? "Switch to light reading mode" : "Switch to dark reading mode");
  }

  var stored = null;
  try { stored = localStorage.getItem("field-notes-theme"); } catch (e) { /* private mode */ }
  if (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches) stored = "dark";
  applyTheme(stored || "light");

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("field-notes-theme", next); } catch (e) { /* ignore */ }
    });
  }

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

  /* ---------- Reading progress (essay pages) ---------- */
  var progress = document.getElementById("progress-bar");
  var essay = document.querySelector(".essay-body");

  function onScroll() {
    if (!progress || !essay) return;
    var box = essay.getBoundingClientRect();
    var span = box.height - window.innerHeight;
    var ratio = span > 0 ? (-box.top) / span : (box.top < 0 ? 1 : 0);
    progress.style.width = Math.max(0, Math.min(1, ratio)) * 100 + "%";
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

  /* ---------- Search + topic filter ---------- */
  var search = document.getElementById("search");
  var tagButtons = document.querySelectorAll(".tag-btn");
  var entries = Array.prototype.slice.call(document.querySelectorAll("#entry-list .entry"));
  var emptyState = document.getElementById("empty-state");
  var activeTopic = "all";

  function filterEntries() {
    var query = search ? search.value.trim().toLowerCase() : "";
    var shown = 0;

    entries.forEach(function (entry) {
      var topicOk = activeTopic === "all" || entry.getAttribute("data-topic") === activeTopic;
      var textOk = !query || entry.textContent.toLowerCase().indexOf(query) !== -1;
      var match = topicOk && textOk;
      entry.hidden = !match;
      if (match) shown++;
    });

    if (emptyState) emptyState.hidden = shown !== 0;
  }

  if (search) search.addEventListener("input", filterEntries);

  tagButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      activeTopic = btn.getAttribute("data-topic");
      tagButtons.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });
      filterEntries();
    });
  });

  /* ---------- Subscribe ---------- */
  var subscribeForm = document.getElementById("subscribe-form");
  var subscribeStatus = document.getElementById("subscribe-status");

  if (subscribeForm) {
    subscribeForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = subscribeForm.elements.email;
      var value = input.value.trim();
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

      if (!valid) {
        input.setAttribute("aria-invalid", "true");
        if (subscribeStatus) subscribeStatus.textContent = "Please enter a valid email address.";
        input.focus();
        return;
      }

      input.removeAttribute("aria-invalid");
      // No backend here: connect a newsletter provider before launch.
      if (subscribeStatus) subscribeStatus.textContent = "Thank you — check your inbox for the confirmation letter.";
      subscribeForm.reset();
    });
  }

  /* ---------- Year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
