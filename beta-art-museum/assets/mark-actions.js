document.addEventListener("click", (event) => {
const button = event.target.closest("[data-preview-action]");
if (!button) return;
switch(button.dataset.previewAction) {
case "action1": { dl('mark-primary','betaart-mark-primary'); break; }
case "action2": { dlVariant('reverse','betaart-mark-reverse'); break; }
case "action3": { dlVariant('mono','betaart-mark-mono'); break; }
case "action4": { dlVariant('favicon','betaart-favicon'); break; }
case "action5": { dlLockup(); break; }
case "action6": { dlVariant('die','betaart-emboss-die'); break; }
}
});
