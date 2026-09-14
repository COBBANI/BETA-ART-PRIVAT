/* BETA PHOTO — app.js
 * Interaktivitet: filter, modal, handlekurv, verifisering, skjema, reveal-animasjon.
 * Behavior tracking: anonym atferd i localStorage — ingen PII.
 */

'use strict';

(function () {

  /* ── Behavior tracking (anonym, kun localStorage) ──────────────────────
   * Lagrer: sett verk, kategorihistorikk, størrelsesvalg, handlevogn-intensjon.
   * Ingen persondata. Brukes kun til å personalisere sidene for samme nettleser.
   * ──────────────────────────────────────────────────────────────────────── */
  const BP_KEY = 'betaphoto_v1';

  const Behavior = (function () {
    function empty() {
      return { viewed: [], catHistory: [], sizePref: null, cartAttempts: [], visits: 0, lastVisit: null };
    }
    let _d = null;
    function _get() {
      if (_d) return _d;
      try { _d = JSON.parse(localStorage.getItem(BP_KEY)) || empty(); } catch { _d = empty(); }
      return _d;
    }
    function _save() { try { localStorage.setItem(BP_KEY, JSON.stringify(_d)); } catch {} }

    return {
      trackVisit() {
        const b = _get();
        b.visits = (b.visits || 0) + 1;
        b.lastVisit = Date.now();
        _save();
      },

      trackView(id, cat) {
        const b = _get(); const now = Date.now();
        const ex = b.viewed.find(v => v.id === id);
        if (ex) { ex.count++; ex.ts = now; ex._t = now; }
        else     { b.viewed.unshift({ id, cat, ts: now, count: 1, ms: 0, _t: now }); if (b.viewed.length > 20) b.viewed.length = 20; }
        _save();
      },

      trackViewClose(id) {
        const b = _get(); const v = b.viewed.find(x => x.id === id);
        if (v && v._t) { v.ms = (v.ms || 0) + Date.now() - v._t; delete v._t; _save(); }
      },

      trackCategory(cat) {
        const b = _get();
        b.catHistory.unshift(cat);
        if (b.catHistory.length > 10) b.catHistory.length = 10;
        _save();
      },

      trackSize(s) { _get().sizePref = s; _save(); },

      trackCart(id) {
        const b = _get();
        if (!b.cartAttempts.includes(id)) { b.cartAttempts.push(id); _save(); }
      },

      reset() { try { localStorage.removeItem(BP_KEY); _d = null; } catch {} },

      isReturning()      { return (_get().visits || 0) > 1; },
      sizePref()         { return _get().sizePref; },
      viewCount(id)      { return _get().viewed.find(v => v.id === id)?.count || 0; },
      recentViewed(n)    { return _get().viewed.slice(0, n || 4); },

      topCat() {
        const h = _get().catHistory.filter(c => c !== 'alle');
        const f = {};
        h.forEach(c => { f[c] = (f[c] || 0) + 1; });
        return Object.entries(f).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
      },
    };
  })();

  /* Expose for sell.html (same origin, same localStorage) */
  window.__bpBehavior = Behavior;

  let _currentViewId = null;

  /* ── Reveal on scroll ─────────────────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('is-visible')),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── Header shadow on scroll ─────────────────────────────────────────── */
  const header = document.querySelector('[data-header]');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 8);
    }, { passive: true });
  }

  /* ── Gallery filter ──────────────────────────────────────────────────── */
  const filterButtons = document.querySelectorAll('[data-filter]');
  const gallery       = document.querySelector('[data-gallery]');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const active = btn.dataset.filter;
      if (!gallery) return;

      gallery.querySelectorAll('[data-category]').forEach(card => {
        card.hidden = active !== 'alle' && card.dataset.category !== active;
      });

      Behavior.trackCategory(active);
    });
  });

  /* ── Product modal ───────────────────────────────────────────────────── */
  const modal      = document.querySelector('[data-product-modal]');
  const modalTitle = modal && modal.querySelector('[data-modal-title]');
  const modalDesc  = modal && modal.querySelector('[data-modal-description]');
  const modalArt   = modal && modal.querySelector('[data-modal-art]');

  const products = {
    'mellom-fjell':  { name: 'Mellom fjell',    desc: 'Landskap fra norsk høyfjell, tatt i gylden time.',        bg: '#1A1F2B' },
    'stillhet-0614': { name: 'Stillhet 06:14',  desc: 'Kystlandskap i rolig morgenlys, stille og dypt.',         bg: '#1C2420' },
    'byens-puls':    { name: 'Byens puls',       desc: 'Urban rytme fanget i en enkelt eksponering.',             bg: '#1F1A1A' },
    'nord-64':       { name: 'Nord 64',          desc: 'Abstraksjon inspirert av nordlys og arktisk lys.',        bg: '#161B20' },
    'etter-regnet':  { name: 'Etter regnet',     desc: 'Arkitektur speilet i regnvåt asfalt etter storm.',       bg: '#1A1C1F' },
    'siste-lys':     { name: 'Det siste lyset',  desc: 'Kveldslys som legger seg over et stille fjordlandskap.', bg: '#221E16' },
  };

  if (gallery && modal) {
    gallery.querySelectorAll('[data-product]').forEach(card => {
      card.querySelector('[aria-label]').addEventListener('click', () => {
        const key  = card.dataset.product;
        const cat  = card.dataset.category || '';
        const prod = products[key] || {};

        if (modalTitle) modalTitle.textContent   = prod.name || key;
        if (modalDesc)  modalDesc.textContent     = prod.desc || '';
        if (modalArt)   modalArt.style.background = prod.bg   || '';

        /* Restore size preference */
        const savedSize = Behavior.sizePref();
        if (savedSize) {
          const sizeInput = modal.querySelector(`[name="size"][value="${CSS.escape(savedSize)}"]`);
          if (sizeInput) sizeInput.checked = true;
        }

        /* Repeat-view badge */
        const existingBadge = modal.querySelector('[data-view-badge]');
        if (existingBadge) existingBadge.remove();
        const vc = Behavior.viewCount(key);
        if (vc > 0 && modalTitle) {
          const badge = document.createElement('p');
          badge.dataset.viewBadge = '';
          badge.style.cssText = 'font-family:"JetBrains Mono",monospace;font-size:.7rem;color:#7FB69B;margin-top:.4rem;letter-spacing:.04em';
          badge.textContent = vc === 1
            ? 'Du har sett dette verket før.'
            : `Du har sett dette verket ${vc + 1} ganger.`;
          modalTitle.after(badge);
        }

        Behavior.trackView(key, cat);
        _currentViewId = key;

        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        modal.querySelector('[data-modal-close]')?.focus();
      });
    });

    modal.querySelectorAll('[data-modal-close]').forEach(el => {
      el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });

    /* Track size selection */
    modal.querySelectorAll('[name="size"]').forEach(radio => {
      radio.addEventListener('change', () => Behavior.trackSize(radio.value));
    });
  }

  function closeModal() {
    if (_currentViewId) { Behavior.trackViewClose(_currentViewId); _currentViewId = null; }
    if (modal) modal.hidden = true;
    document.body.style.overflow = '';
  }

  /* ── Cart ────────────────────────────────────────────────────────────── */
  const cartDrawer   = document.querySelector('[data-cart-drawer]');
  const cartBackdrop = document.querySelector('[data-drawer-backdrop]');
  const cartCount    = document.querySelector('[data-cart-count]');
  const cartItems    = document.querySelector('[data-cart-items]');
  const cartEmpty    = document.querySelector('[data-cart-empty]');
  const cartTotal    = document.querySelector('[data-cart-total]');
  const cartTotalVal = document.querySelector('[data-cart-total-value]');
  const toast        = document.querySelector('[data-toast]');

  let cart = [];

  document.querySelectorAll('[data-cart-open]').forEach(el =>
    el.addEventListener('click', openCart));
  document.querySelectorAll('[data-cart-close]').forEach(el =>
    el.addEventListener('click', closeCart));
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);

  function openCart() {
    if (cartDrawer)   { cartDrawer.hidden = false; cartDrawer.removeAttribute('aria-hidden'); }
    if (cartBackdrop) cartBackdrop.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    if (cartDrawer)   { cartDrawer.setAttribute('aria-hidden', 'true'); }
    if (cartBackdrop) cartBackdrop.hidden = true;
    document.body.style.overflow = '';
  }

  const addBtn = modal && modal.querySelector('[data-add-cart]');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const sizeInput = modal.querySelector('[name="size"]:checked');
      const title     = modalTitle ? modalTitle.textContent : 'Fotografi';
      const size      = sizeInput ? sizeInput.value : '40 × 60 cm';
      const price     = sizeInput ? parseInt(sizeInput.dataset.price, 10) : 3490;
      if (_currentViewId) Behavior.trackCart(_currentViewId);
      cart.push({ title, size, price });
      renderCart();
      closeModal();
      showToast(`«${title}» lagt i kurven`);
    });
  }

  function renderCart() {
    if (!cartItems || !cartEmpty || !cartTotal || !cartCount) return;
    cartCount.textContent = cart.length;

    if (cart.length === 0) {
      cartItems.innerHTML = '';
      cartEmpty.hidden    = false;
      cartTotal.hidden    = true;
      return;
    }

    cartEmpty.hidden = true;
    cartTotal.hidden = false;
    cartItems.innerHTML = cart.map((item, i) => `
      <div style="border-bottom:1px solid #2E2E2A;padding:1rem 0;display:flex;justify-content:space-between;align-items:flex-start;gap:1rem">
        <div>
          <div style="font-size:.9rem">${item.title}</div>
          <div style="font-size:.75rem;color:#9A9792">${item.size}</div>
        </div>
        <div style="display:flex;align-items:center;gap:.75rem">
          <span style="font-family:'JetBrains Mono',monospace;font-size:.875rem">${item.price.toLocaleString('nb-NO')} kr</span>
          <button onclick="removeCartItem(${i})" style="background:none;border:none;color:#9A9792;cursor:pointer;font-size:1rem">×</button>
        </div>
      </div>
    `).join('');

    const total = cart.reduce((s, it) => s + it.price, 0);
    if (cartTotalVal) cartTotalVal.textContent = total.toLocaleString('nb-NO') + ' kr';
  }

  window.removeCartItem = function (index) {
    cart.splice(index, 1);
    renderCart();
  };

  /* ── Toast ───────────────────────────────────────────────────────────── */
  let toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 3000);
  }

  /* ── BETA-ID verification ────────────────────────────────────────────── */
  const verifyBtn    = document.querySelector('[data-verify-button]');
  const verifyInput  = document.getElementById('verify-id');
  const verifyResult = document.querySelector('[data-verification-result]');

  const DEMO_RECORDS = {
    'BETA-PHOTO-0001': { title: 'Mellom fjell',  edition: '01 / 20', format: '60 × 90 cm', date: '2026-04-12', status: 'Verifisert' },
    'BETA-PHOTO-0002': { title: 'Stillhet 06:14', edition: '03 / 20', format: '40 × 60 cm', date: '2026-04-14', status: 'Verifisert' },
  };

  if (verifyBtn && verifyInput && verifyResult) {
    verifyBtn.addEventListener('click', runVerify);
    verifyInput.addEventListener('keydown', e => { if (e.key === 'Enter') runVerify(); });
  }

  function runVerify() {
    const id  = verifyInput.value.trim().toUpperCase();
    const rec = DEMO_RECORDS[id];
    verifyResult.hidden = false;

    if (rec) {
      verifyResult.innerHTML = `
        <div style="border:1px solid #7FB69B;padding:1.5rem;margin-top:1rem">
          <div style="color:#7FB69B;font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;margin-bottom:1rem">${rec.status}</div>
          <dl style="display:grid;grid-template-columns:auto 1fr;gap:.4rem 1.5rem;font-size:.875rem">
            <dt style="color:#9A9792">ID</dt>         <dd style="font-family:monospace">${id}</dd>
            <dt style="color:#9A9792">Tittel</dt>     <dd>${rec.title}</dd>
            <dt style="color:#9A9792">Opplag</dt>     <dd>${rec.edition}</dd>
            <dt style="color:#9A9792">Format</dt>     <dd>${rec.format}</dd>
            <dt style="color:#9A9792">Registrert</dt> <dd>${rec.date}</dd>
          </dl>
        </div>`;
    } else {
      verifyResult.innerHTML = `
        <div style="border:1px solid #8B1A1A;padding:1.5rem;margin-top:1rem;color:#9A9792;font-size:.875rem">
          ID <strong style="font-family:monospace;color:#F3F0E9">${id || '—'}</strong> ble ikke funnet i registeret.
          Bruk demo-ID: <strong style="font-family:monospace;color:#F3F0E9">BETA-PHOTO-0001</strong>
        </div>`;
    }
  }

  /* ── Launch form ─────────────────────────────────────────────────────── */
  const launchForm = document.querySelector('[data-launch-form]');
  const formNote   = document.querySelector('[data-form-note]');

  if (launchForm && formNote) {
    launchForm.addEventListener('submit', e => {
      e.preventDefault();
      formNote.textContent = 'Takk — du varsles før lanseringen.';
      launchForm.reset();
    });
  }

  /* ── Personalisation ─────────────────────────────────────────────────── */

  /* Restore last-used category filter for returning visitors */
  function restoreLastFilter() {
    if (!gallery || !filterButtons.length) return;
    const top = Behavior.topCat();
    if (!top) return;
    const btn = [...filterButtons].find(b => b.dataset.filter === top);
    if (btn) btn.click();
  }

  /* Inject "Nylig sett" row below gallery section */
  function renderRecentlyViewed() {
    const recent = Behavior.recentViewed(4).filter(v => products[v.id]);
    if (recent.length < 2) return;

    const gallerySection = document.querySelector('.gallery-section');
    if (!gallerySection || document.getElementById('nylig-sett')) return;

    const section = document.createElement('section');
    section.id = 'nylig-sett';
    section.setAttribute('aria-label', 'Nylig sett');
    section.style.cssText = 'padding:2.5rem 2rem;max-width:72rem;margin:0 auto;border-top:1px solid #2A2824';

    const cards = recent.map(v => {
      const p = products[v.id];
      const times = v.count > 1 ? `· ${v.count} ganger` : '';
      return `
        <article role="button" tabindex="0" data-recent-product="${v.id}"
                 aria-label="Åpne ${p.name}"
                 style="background:#171614;border:1px solid #2A2824;padding:1rem;cursor:pointer;transition:border-color .15s"
                 onmouseover="this.style.borderColor='#C8A96E'" onmouseout="this.style.borderColor='#2A2824'">
          <div style="height:4rem;background:${p.bg};margin-bottom:.75rem"></div>
          <div style="font-size:.825rem;color:#F3F0E9;margin-bottom:.2rem">${p.name}</div>
          <div style="font-family:'JetBrains Mono',monospace;font-size:.625rem;color:#6B6760;letter-spacing:.04em">${v.cat}${times}</div>
        </article>`;
    }).join('');

    section.innerHTML = `
      <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:1.25rem;gap:1rem;flex-wrap:wrap">
        <p style="font-family:'JetBrains Mono',monospace;font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:#6B6760">Nylig sett</p>
        <button data-clear-recent style="background:none;border:none;font-family:'JetBrains Mono',monospace;font-size:.625rem;letter-spacing:.08em;text-transform:uppercase;color:#6B6760;cursor:pointer;padding:0">Tøm historikk</button>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:1rem">
        ${cards}
      </div>`;

    gallerySection.after(section);

    /* Wire click → reopen modal */
    section.querySelectorAll('[data-recent-product]').forEach(el => {
      const id = el.dataset.recentProduct;
      const open = () => {
        const card = gallery && gallery.querySelector(`[data-product="${id}"]`);
        if (card) card.querySelector('[aria-label]')?.click();
      };
      el.addEventListener('click', open);
      el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });

    /* Clear button */
    section.querySelector('[data-clear-recent]')?.addEventListener('click', () => {
      Behavior.reset();
      section.remove();
    });
  }

  /* ── Init ────────────────────────────────────────────────────────────── */
  const _isAdmin = localStorage.getItem('betaphoto_admin') === '1';

  if (_isAdmin) {
    /* Admin mode: skip all behaviour tracking, show floating bar */
    const _ab = document.createElement('div');
    _ab.id = 'bp-admin-bar';
    _ab.innerHTML =
      '<span style="color:var(--warm);letter-spacing:.1em">■ ADMIN</span>' +
      '<a href="admin.html" style="color:var(--text);text-decoration:none">→ Panel</a>' +
      '<button onclick="localStorage.removeItem(\'betaphoto_admin\');location.reload()" ' +
        'style="background:none;border:1px solid var(--line);color:var(--text-dim);' +
        'padding:.2rem .7rem;cursor:pointer;font-family:inherit;font-size:inherit">' +
        'Avslutt' +
      '</button>';
    _ab.style.cssText =
      'position:fixed;bottom:0;inset-inline-start:0;inset-inline-end:0;z-index:9999;' +
      'display:flex;align-items:center;gap:1.5rem;padding:.5rem 1.5rem;' +
      'background:var(--surface);border-top:1px solid var(--warm);' +
      'font-family:"JetBrains Mono",monospace;font-size:.7rem;letter-spacing:.05em';
    document.body.appendChild(_ab);
  } else {
    Behavior.trackVisit();
    if (Behavior.isReturning()) {
      restoreLastFilter();
      renderRecentlyViewed();
    }
  }

})();
