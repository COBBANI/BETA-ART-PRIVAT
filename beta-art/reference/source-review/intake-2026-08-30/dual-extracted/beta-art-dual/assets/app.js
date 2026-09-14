(() => {
  const year = document.querySelectorAll('[data-year]');
  year.forEach(el => el.textContent = new Date().getFullYear());

  const verifyBtn = document.querySelector('[data-verify-id]');
  if (verifyBtn) {
    verifyBtn.addEventListener('click', () => {
      const input = document.querySelector('#beta-id');
      const out = document.querySelector('#verify-result');
      const value = (input?.value || '').trim().toUpperCase();
      if (value === 'BETA-PHOTO-DEMO-0001') {
        out.hidden = false;
        out.innerHTML = '<strong>Demo record found.</strong><br>This is a prototype BETA-ID only. It is not a verified production artwork and must not be represented as one.';
      } else {
        out.hidden = false;
        out.innerHTML = '<strong>No production record found.</strong><br>Only verified, published records will appear here after launch.';
      }
    });
  }

  const rows = [...document.querySelectorAll('[data-archive-row]')];
  const search = document.querySelector('#archive-search');
  const phase = document.querySelector('#archive-phase');
  const zone = document.querySelector('#archive-zone');
  const status = document.querySelector('#archive-status');
  if (rows.length && search) {
    const apply = () => {
      const q = search.value.trim().toLowerCase();
      rows.forEach(row => {
        const matchQ = !q || row.textContent.toLowerCase().includes(q);
        const matchPhase = !phase.value || row.dataset.phase === phase.value;
        const matchZone = !zone.value || row.dataset.zone === zone.value;
        const matchStatus = !status.value || row.dataset.status === status.value;
        row.hidden = !(matchQ && matchPhase && matchZone && matchStatus);
      });
    };
    [search, phase, zone, status].forEach(el => el?.addEventListener('input', apply));
  }
})();
