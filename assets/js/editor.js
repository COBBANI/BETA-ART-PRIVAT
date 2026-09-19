/* QBLOGG — Editör Paneli
 *
 * Hedef kitle: sitenin sahibi / içerik yöneticisi.
 * Ziyaretçiler bu dosyayı görmez: URL'de ?dev=1 yoksa ilk satırda çıkılır.
 *
 * Açmak için: herhangi bir sayfada URL'nin sonuna ?dev=1 ekleyin.
 * Örnek: https://qblogg.com/?dev=1
 *        https://qblogg.com/blog.html?dev=1
 *
 * Panel şunları gösterir:
 *   - Yapılandırma durumu (config.js — her alan ayarlı mı?)
 *   - Ziyaretçi verisi simülatörü (bu tarayıcının behavior verileri)
 *   - İçerik listesi (posts.js — tüm yazılar)
 *   - Hızlı bağlantılar (GitHub, Vercel, dosya düzenleme)
 */
(function () {
  'use strict';

  /* ── Editör modunda değilse hemen çık ────────────────────── */
  try {
    if (!new URLSearchParams(location.search).has('dev')) return;
  } catch (e) { return; }

  /* ════════════════════════════════════════════════════════════
     YARDIMCILAR
  ════════════════════════════════════════════════════════════ */

  var CFG   = window.QB_CONFIG || {};
  var POSTS = window.QB_POSTS  || [];
  var GITHUB_REPO = 'https://github.com/andersenbetul-alt/BETA-ART';

  function val(v) { return v && String(v).trim(); }

  /* Config alanı: { ok, warn, info } → renk seç */
  function row(label, value, status, note) {
    /* status: 'ok' | 'warn' | 'info' */
    var icon  = status === 'ok' ? '✓' : status === 'warn' ? '⚠' : 'ℹ';
    var color = status === 'ok' ? '#4ade80' : status === 'warn' ? '#fbbf24' : '#60a5fa';
    var display = value
      ? (value.length > 36 ? value.slice(0, 34) + '…' : value)
      : (note || '—');
    return '<div class="ed-row">' +
      '<span class="ed-icon" style="color:' + color + '">' + icon + '</span>' +
      '<span class="ed-lbl">' + label + '</span>' +
      '<span class="ed-val" title="' + (value || '') + '">' + display + '</span>' +
    '</div>';
  }

  /* ════════════════════════════════════════════════════════════
     BÖLÜM: Yapılandırma Durumu
  ════════════════════════════════════════════════════════════ */

  function configSection() {
    var s = CFG.social || {};
    var p = CFG.prices  || {};
    var l = CFG.payLinks || {};
    var newsOk  = val(CFG.newsletterEndpoint) && CFG.newsletterEndpoint.indexOf('tatil') === -1;
    var newsWarn = val(CFG.newsletterEndpoint) && CFG.newsletterEndpoint.indexOf('tatil') !== -1;

    return '<div class="ed-section">' +
      '<div class="ed-sh">Yapılandırma</div>' +
      row('mailTo',             val(CFG.mailTo),      val(CFG.mailTo) ? 'ok' : 'warn') +
      row('siteUrl',            val(CFG.siteUrl),     val(CFG.siteUrl) ? 'ok' : 'warn') +
      row('social.linkedin',    val(s.linkedin),      val(s.linkedin) ? 'ok' : 'warn', 'ayarlanmamış') +
      row('social.x',           val(s.x),             val(s.x) ? 'ok' : 'warn', 'ayarlanmamış') +
      row('social.medium',      val(s.medium),        val(s.medium) ? 'ok' : 'warn', 'ayarlanmamış') +
      row('social.substack',    val(s.substack),      val(s.substack) ? 'ok' : 'warn', 'ayarlanmamış') +
      row('social.youtube',     val(s.youtube),       val(s.youtube) ? 'ok' : 'info', '6. ay planında') +
      row('newsletterEndpoint',
          val(CFG.newsletterEndpoint),
          newsOk ? 'ok' : newsWarn ? 'warn' : 'warn',
          newsWarn ? '⚠ test hesabı (tatil)' : 'ayarlanmamış') +
      row('formEndpoint',       val(CFG.formEndpoint), val(CFG.formEndpoint) ? 'ok' : 'info', 'mailto taslağı açılıyor') +
      row('prices',
          (!val(p.p1) && !val(p.p2) && !val(p.p3)) ? '' : (p.p1 + ' / ' + p.p2 + ' / ' + p.p3),
          (!val(p.p1) && !val(p.p2) && !val(p.p3)) ? 'info' : 'ok',
          'i18n varsayılanları kullanılıyor') +
      row('payLinks',
          (!val(l.p1) && !val(l.p2) && !val(l.p3)) ? '' : 'ayarlı',
          (!val(l.p1) && !val(l.p2) && !val(l.p3)) ? 'warn' : 'ok',
          'Stripe kurulmamış') +
    '</div>';
  }

  /* ════════════════════════════════════════════════════════════
     BÖLÜM: Ziyaretçi Verisi Simülatörü
  ════════════════════════════════════════════════════════════ */

  var LS_BEHAVIOR = 'qb_behavior';
  var STAGES = ['Keşfet', 'İncele', 'Değerlendir', 'Karar ver'];

  function loadBehavior() {
    try {
      var d = JSON.parse(localStorage.getItem(LS_BEHAVIOR) || 'null') || {};
      return {
        views: Array.isArray(d.views) ? d.views : [],
        cats:  (d.cats && typeof d.cats === 'object') ? d.cats : {},
        pkg:   (d.pkg  && typeof d.pkg  === 'object') ? d.pkg  : {}
      };
    } catch (e) { return { views: [], cats: {}, pkg: {} }; }
  }

  function calcStage(d) {
    var v = d.views.length;
    var pkgTotal = Object.keys(d.pkg).reduce(function (s, k) { return s + (d.pkg[k] || 0); }, 0);
    if (pkgTotal >= 4 || v >= 6) return 3;
    if (pkgTotal >= 1 || v >= 3) return 2;
    if (v >= 1)                  return 1;
    return 0;
  }

  function visitorSection(el) {
    var d = loadBehavior();
    var stage = calcStage(d);
    var catStr = Object.keys(d.cats).map(function (k) {
      return k + ' (' + d.cats[k] + ')';
    }).join(', ') || '—';
    var pkgStr = Object.keys(d.pkg).map(function (k) {
      return k + ' (' + d.pkg[k] + ')';
    }).join(', ') || '—';

    el.innerHTML =
      '<div class="ed-section">' +
        '<div class="ed-sh">Ziyaretçi Verisi <span class="ed-muted">(bu tarayıcı)</span></div>' +
        '<div class="ed-kv"><span>Görüntüleme</span><b>' + d.views.length + ' yazı</b></div>' +
        '<div class="ed-kv"><span>Kategoriler</span><b>' + catStr + '</b></div>' +
        '<div class="ed-kv"><span>Paket etkileşimi</span><b>' + pkgStr + '</b></div>' +
        '<div class="ed-kv"><span>Aşama</span><b style="color:' +
          ['#60a5fa','#4ade80','#fbbf24','#f87171'][stage] + '">' +
          STAGES[stage] + ' (' + stage + ')</b></div>' +
        '<button class="ed-btn" id="edClear">Verileri Temizle</button>' +
      '</div>';

    el.querySelector('#edClear').addEventListener('click', function () {
      try { localStorage.removeItem(LS_BEHAVIOR); } catch (e) {}
      try { sessionStorage.removeItem('qb_ns_dismissed'); } catch (e) {}
      visitorSection(el);
      var pill = document.getElementById('behPill');
      if (pill) pill.remove();
    });
  }

  /* ════════════════════════════════════════════════════════════
     BÖLÜM: İçerik Listesi
  ════════════════════════════════════════════════════════════ */

  function postsSection() {
    if (!POSTS.length) return '<div class="ed-section"><div class="ed-sh">İçerik</div><div class="ed-muted">QB_POSTS yüklenemedi</div></div>';

    var items = POSTS.map(function (p) {
      var title = (p.t && (p.t.tr || p.t.en)) || p.slug;
      var blocks = (p.b && p.b.tr) ? p.b.tr.length : '?';
      return '<div class="ed-post">' +
        '<span class="ed-slug">' + p.slug.slice(0, 22) + '</span>' +
        '<span class="ed-cat">' + (p.category || '') + '</span>' +
        '<span class="ed-blk">' + blocks + ' blok</span>' +
      '</div>';
    }).join('');

    return '<div class="ed-section">' +
      '<div class="ed-sh">İçerik <span class="ed-muted">(' + POSTS.length + ' yazı)</span></div>' +
      '<div class="ed-posts-list">' + items + '</div>' +
    '</div>';
  }

  /* ════════════════════════════════════════════════════════════
     BÖLÜM: Hızlı Bağlantılar
  ════════════════════════════════════════════════════════════ */

  function linksSection() {
    var links = [
      { label: 'GitHub Repo',          href: GITHUB_REPO },
      { label: 'config.js düzenle',    href: GITHUB_REPO + '/edit/claude/qbook-k332h7/assets/js/config.js' },
      { label: 'posts.js düzenle',     href: GITHUB_REPO + '/edit/claude/qbook-k332h7/assets/js/posts.js' },
      { label: 'i18n.js düzenle',      href: GITHUB_REPO + '/edit/claude/qbook-k332h7/assets/js/i18n.js' },
      { label: 'Vercel Paneli',         href: 'https://vercel.com/dashboard' },
      { label: 'npm run check (GitHub Actions)', href: GITHUB_REPO + '/actions' }
    ];

    return '<div class="ed-section">' +
      '<div class="ed-sh">Hızlı Bağlantılar</div>' +
      links.map(function (lk) {
        return '<a class="ed-link" href="' + lk.href + '" target="_blank" rel="noopener">→ ' + lk.label + '</a>';
      }).join('') +
    '</div>';
  }

  /* ════════════════════════════════════════════════════════════
     STİL
  ════════════════════════════════════════════════════════════ */

  function injectStyles() {
    var el = document.createElement('style');
    el.textContent =
      '#edPanel{position:fixed;inset-inline-end:0;top:0;bottom:0;width:300px;' +
        'z-index:9999;overflow-y:auto;background:#111827;color:#e5e7eb;' +
        'font-family:ui-monospace,monospace;font-size:12px;line-height:1.5;' +
        'border-inline-start:1px solid #374151;box-shadow:-4px 0 24px rgba(0,0,0,.5)}' +
      '#edPanel *{box-sizing:border-box}' +
      '.ed-header{display:flex;align-items:center;justify-content:space-between;' +
        'padding:14px 16px;background:#1f2937;border-bottom:1px solid #374151;' +
        'position:sticky;top:0;z-index:1}' +
      '.ed-logo{font-weight:700;letter-spacing:.04em;color:#60a5fa;font-size:13px}' +
      '.ed-close{background:none;border:none;color:#9ca3af;cursor:pointer;' +
        'font-size:18px;padding:2px 6px;border-radius:4px;line-height:1}' +
      '.ed-close:hover{color:#e5e7eb;background:#374151}' +
      '.ed-section{padding:14px 16px;border-bottom:1px solid #1f2937}' +
      '.ed-sh{font-size:10px;font-weight:700;text-transform:uppercase;' +
        'letter-spacing:.1em;color:#6b7280;margin-block-end:10px}' +
      '.ed-muted{color:#6b7280;font-size:11px;font-weight:400}' +
      '.ed-row{display:grid;grid-template-columns:16px 1fr auto;gap:4px 8px;' +
        'align-items:center;margin-block-end:5px;min-height:20px}' +
      '.ed-icon{font-size:11px;line-height:1}' +
      '.ed-lbl{color:#9ca3af;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
      '.ed-val{color:#d1d5db;text-align:end;white-space:nowrap;overflow:hidden;' +
        'text-overflow:ellipsis;max-width:100px;font-size:11px}' +
      '.ed-kv{display:flex;justify-content:space-between;margin-block-end:5px;gap:8px}' +
      '.ed-kv span{color:#9ca3af}' +
      '.ed-kv b{color:#d1d5db;text-align:end}' +
      '.ed-btn{margin-block-start:10px;background:#374151;border:none;color:#d1d5db;' +
        'padding:5px 10px;border-radius:5px;cursor:pointer;font-size:11px;width:100%}' +
      '.ed-btn:hover{background:#4b5563}' +
      '.ed-posts-list{max-height:180px;overflow-y:auto}' +
      '.ed-post{display:grid;grid-template-columns:1fr auto auto;gap:4px 8px;' +
        'padding:4px 0;border-bottom:1px solid #1f2937;align-items:center}' +
      '.ed-slug{color:#d1d5db;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
      '.ed-cat{color:#60a5fa;font-size:10px;white-space:nowrap}' +
      '.ed-blk{color:#6b7280;font-size:10px;white-space:nowrap}' +
      '.ed-link{display:block;color:#93c5fd;text-decoration:none;padding:4px 0;font-size:12px}' +
      '.ed-link:hover{color:#bfdbfe;text-decoration:underline}' +
      '[dir=rtl] #edPanel{inset-inline-end:0;inset-inline-start:auto}';
    document.head.appendChild(el);
  }

  /* ════════════════════════════════════════════════════════════
     PANEL OLUŞTUR VE GÖSTER
  ════════════════════════════════════════════════════════════ */

  function buildPanel() {
    var panel = document.createElement('div');
    panel.id = 'edPanel';
    panel.setAttribute('role', 'complementary');
    panel.setAttribute('aria-label', 'Editör Paneli');

    /* Başlık */
    var header = document.createElement('div');
    header.className = 'ed-header';
    header.innerHTML =
      '<span class="ed-logo">QBLOGG DEV</span>' +
      '<button class="ed-close" id="edClose" title="Kapat (×)">×</button>';
    panel.appendChild(header);

    /* Yapılandırma durumu */
    panel.insertAdjacentHTML('beforeend', configSection());

    /* Ziyaretçi verisi — güncellenen alan */
    var visitorEl = document.createElement('div');
    panel.appendChild(visitorEl);
    visitorSection(visitorEl);

    /* İçerik listesi */
    panel.insertAdjacentHTML('beforeend', postsSection());

    /* Hızlı bağlantılar */
    panel.insertAdjacentHTML('beforeend', linksSection());

    /* Sayfa bilgisi */
    panel.insertAdjacentHTML('beforeend',
      '<div class="ed-section">' +
        '<div class="ed-sh">Sayfa</div>' +
        '<div class="ed-kv"><span>URL</span><b style="max-width:160px;overflow:hidden;' +
          'text-overflow:ellipsis;white-space:nowrap" title="' + location.href + '">' +
          location.pathname.split('/').pop() + '</b></div>' +
        '<div class="ed-kv"><span>Dil</span><b>' +
          (document.documentElement.lang || 'tr') + '</b></div>' +
        '<div class="ed-kv"><span>Tema</span><b>' +
          (document.documentElement.getAttribute('data-theme') || 'system') + '</b></div>' +
      '</div>');

    document.body.appendChild(panel);

    panel.querySelector('#edClose').addEventListener('click', function () {
      panel.remove();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') panel.remove();
    });
  }

  /* ════════════════════════════════════════════════════════════
     BAŞLAT
  ════════════════════════════════════════════════════════════ */

  function init() {
    injectStyles();
    buildPanel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
