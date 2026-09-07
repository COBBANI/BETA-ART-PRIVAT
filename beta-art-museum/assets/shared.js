// Prevent keyboard focus entering closed off-screen panels.
for (const id of ['detailPanel', 'drawer']) {
  const panel = document.getElementById(id);
  if (!panel) continue;
  let priorFocus;
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', id === 'drawer' ? 'Preview order' : 'Photograph preview');
  panel.setAttribute('aria-modal', 'true');
  const sync = () => {
    const open = panel.classList.contains('open');
    if (open && panel.inert) priorFocus = document.activeElement;
    panel.inert = !open;
    panel.setAttribute('aria-hidden', String(!open));
    if (open) panel.querySelector('button')?.focus();
    else if (priorFocus?.isConnected) { priorFocus.focus(); priorFocus = null; }
  };
  new MutationObserver(sync).observe(panel, {attributes:true,attributeFilter:['class']});
  sync();
  panel.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const items = [...panel.querySelectorAll('button, a[href], input, select, [tabindex="0"]')].filter(el => !el.disabled && el.getClientRects().length);
    const first = items[0], last = items.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  });
}
