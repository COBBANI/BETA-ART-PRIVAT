/* Knowledge Hub — search and topic filter.
   An article matches when its topic is selected and its text contains the query. */
(function () {
"use strict";

var search = document.getElementById("search");
var buttons = document.querySelectorAll(".tag-btn");
var entries = Array.prototype.slice.call(document.querySelectorAll("#entry-list .entry"));
var empty = document.getElementById("empty-state");
if (!entries.length) return;

var topic = "all";

function topics(el) {
  return (el.getAttribute("data-topic") || "").split(/\s+/);
}

function filter() {
  var q = search ? search.value.trim().toLowerCase() : "";
  var shown = 0;
  entries.forEach(function (entry) {
    var topicOk = topic === "all" || topics(entry).indexOf(topic) !== -1;
    var textOk = !q || entry.textContent.toLowerCase().indexOf(q) !== -1;
    var match = topicOk && textOk;
    entry.hidden = !match;
    if (match) shown++;
  });
  if (empty) empty.hidden = shown !== 0;
}

if (search) search.addEventListener("input", filter);

buttons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    topic = btn.getAttribute("data-topic");
    buttons.forEach(function (b) {
      var active = b === btn;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    });
    filter();
    if (history.replaceState) {
      history.replaceState(null, "", topic === "all" ? location.pathname : "#" + topic);
    }
  });
});

/* deep link: blog.html#automation opens with that topic selected */
(function fromHash() {
  var h = (location.hash || "").slice(1);
  if (!h) return;
  var btn = document.querySelector('.tag-btn[data-topic="' + h + '"]');
  if (btn) btn.click();
})();

filter();
})();
