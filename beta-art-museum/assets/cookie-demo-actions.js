document.addEventListener("click", (event) => {
const button = event.target.closest("[data-preview-action]");
if (!button) return;
switch(button.dataset.previewAction) {
case "action1": { baCookieShow(); break; }
case "action2": { baCookieReset(); break; }
case "action3": { refreshState(); break; }
case "action4": { baCookieReset(); break; }
case "action5": { baCookieDecision('all'); break; }
case "action6": { baCookieDecision('necessary'); break; }
}
});
