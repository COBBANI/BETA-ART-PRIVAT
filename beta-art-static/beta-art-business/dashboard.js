/* Client dashboard preview — tab switching only.
   No data leaves the page and none is stored; the content is sample markup. */
(function () {
"use strict";
var tabs = Array.prototype.slice.call(document.querySelectorAll(".dash-tab"));
if (!tabs.length) return;

function select(tab) {
  tabs.forEach(function (t) {
    var on = t === tab;
    t.classList.toggle("is-active", on);
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
    var panel = document.getElementById(t.getAttribute("aria-controls"));
    if (panel) panel.hidden = !on;
  });
}

tabs.forEach(function (tab, i) {
  tab.addEventListener("click", function () { select(tab); });
  tab.addEventListener("keydown", function (e) {
    var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    var next = tabs[(i + d + tabs.length) % tabs.length];
    select(next);
    next.focus();
  });
});

select(tabs[0]);
})();
