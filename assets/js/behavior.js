/* QBLOGG — davranış izleme, öneri motoru ve yolculuk rehberi
 *
 * İki sistem bir arada:
 *
 * 1. GEÇMİŞ SİSTEMİ (behavior tracking)
 *    blog.html  → "Son okunanlar", kategori izleme
 *    post.html  → görüntülemeyi kaydet
 *    index.html → paket etkileşimi, davranışa göre öneri rozeti
 *
 * 2. SONRAKI ADIM SİSTEMİ (next step guidance)
 *    Tüm sayfalar → ziyaretçinin yolculuk aşamasını hesapla,
 *    sayfa yarısına gelince veya 20 sn dolunca kayan pill göster:
 *      Aşama 0 — Keşfet  → Örnek çalışma
 *      Aşama 1 — İncele  → Paket karşılaştırma
 *      Aşama 2 — Değerlendir → Brief gönder
 *      Aşama 3 — Karar ver   → Bugün başlayalım
 *
 * Veri: localStorage (qb_behavior). Sunucuya hiçbir şey gitmez.
 * Kişisel veri yok: slug + kategori adları tutulur.
 */
(function () {
  'use strict';

  var LS_KEY  = 'qb_behavior';
  var SS_DISMISSED = 'qb_ns_dismissed'; /* sessionStorage: pill kapatıldı mı */
  var MAX_VIEWS = 20;

  /* ══════════════════════════════════════════════════
     YARDIMCILAR
  ══════════════════════════════════════════════════ */

  function getLang() {
    try {
      return localStorage.getItem('qb_lang') ||
             document.documentElement.lang ||
             'tr';
    } catch (e) { return 'tr'; }
  }

  function t(key) {
    var lang = getLang();
    var i18n = window.QB_I18N;
    if (!i18n) return key;
    var d = i18n[lang] || i18n.tr || {};
    return d[key] || (i18n.en && i18n.en[key]) || key;
  }

  function load() {
    try {
      var raw = localStorage.getItem(LS_KEY);
      var d = raw ? JSON.parse(raw) : null;
      if (!d || typeof d !== 'object') d = {};
      return {
        views: Array.isArray(d.views) ? d.views : [],
        cats:  (d.cats && typeof d.cats === 'object') ? d.cats : {},
        pkg:   (d.pkg  && typeof d.pkg  === 'object') ? d.pkg  : {}
      };
    } catch (e) {
      return { views: [], cats: {}, pkg: {} };
    }
  }

  function save(data) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch (e) {}
  }

  function isDismissed() {
    try { return !!sessionStorage.getItem(SS_DISMISSED); } catch (e) { return false; }
  }

  function dismiss() {
    try { sessionStorage.setItem(SS_DISMISSED, '1'); } catch (e) {}
  }

  function trackView(slug, cat) {
    if (!slug) return;
    var d = load();
    d.views = d.views.filter(function (v) { return v.s !== slug; });
    d.views.unshift({ s: slug, c: cat || '', t: Date.now() });
    if (d.views.length > MAX_VIEWS) d.views = d.views.slice(0, MAX_VIEWS);
    if (cat) d.cats[cat] = (d.cats[cat] || 0) + 1;
    save(d);
  }

  function trackPkg(pkg) {
    if (!pkg) return;
    var d = load();
    d.pkg[pkg] = (d.pkg[pkg] || 0) + 1;
    save(d);
  }

  function findPost(slug) {
    var posts = window.QB_POSTS || [];
    for (var i = 0; i < posts.length; i++) {
      if (posts[i].slug === slug) return posts[i];
    }
    return null;
  }

  function pickTitle(post) {
    var lang = getLang();
    return (post.t && (post.t[lang] || post.t.en || post.t.tr)) || post.slug;
  }

  /* ══════════════════════════════════════════════════
     YOLCULUK AŞAMASI HESAPLA
  ══════════════════════════════════════════════════ */

  /*
   * Dört aşama:
   *   0 Keşfet      — henüz yazı okumadı
   *   1 İncele      — 1–2 yazı okudu
   *   2 Değerlendir — 3–5 yazı VEYA paket etkileşimi
   *   3 Karar ver   — 6+ yazı VEYA yüksek paket etkileşimi
   */
  function getStage(d) {
    var views = d.views.length;
    var pkgTotal = Object.keys(d.pkg).reduce(function (s, k) { return s + (d.pkg[k] || 0); }, 0);

    if (pkgTotal >= 4 || views >= 6) return 3;
    if (pkgTotal >= 1 || views >= 3) return 2;
    if (views >= 1)                  return 1;
    return 0;
  }

  /*
   * Her aşama + sayfa bileşimi için sonraki adım:
   * { label: i18n anahtarı, url: hedef }
   */
  var STEPS = [
    /* aşama 0 */ {
      'blog':      { label: 'ns.discover', url: 'ornek.html' },
      'post':      { label: 'ns.discover', url: 'ornek.html' },
      'index':     { label: 'ns.blog',     url: 'blog.html' },
      'default':   { label: 'ns.discover', url: 'ornek.html' }
    },
    /* aşama 1 */ {
      'blog':      { label: 'ns.packages', url: 'index.html#packages' },
      'post':      { label: 'ns.packages', url: 'index.html#packages' },
      'index':     { label: 'ns.quality',  url: 'kalite.html' },
      'ornek':     { label: 'ns.packages', url: 'index.html#packages' },
      'kalite':    { label: 'ns.packages', url: 'index.html#packages' },
      'default':   { label: 'ns.packages', url: 'index.html#packages' }
    },
    /* aşama 2 */ {
      'default':   { label: 'ns.evaluate', url: 'work.html' }
    },
    /* aşama 3 */ {
      'default':   { label: 'ns.decide',   url: 'work.html' }
    }
  ];

  function getNextStep(stage, page) {
    var map = STEPS[stage] || STEPS[0];
    return map[page] || map['default'];
  }

  /* ══════════════════════════════════════════════════
     STİL ENJEKSİYONU
  ══════════════════════════════════════════════════ */

  function injectStyles() {
    if (document.getElementById('beh-styles')) return;
    var el = document.createElement('style');
    el.id = 'beh-styles';
    el.textContent =

      /* --- Geçmiş sistemi --- */
      '.beh-section{margin-block-end:28px}' +
      '.beh-head{display:flex;align-items:center;justify-content:space-between;' +
        'margin-block-end:12px;gap:10px}' +
      '[dir=rtl] .beh-head{flex-direction:row-reverse}' +
      '.beh-title{margin:0;font-size:var(--fs-sm);font-weight:600;' +
        'color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em}' +
      '.beh-clear{background:none;border:none;padding:2px 0;font-size:var(--fs-xs);' +
        'color:var(--text-muted);cursor:pointer;text-decoration:underline;' +
        'text-underline-offset:3px;line-height:1}' +
      '.beh-clear:hover{color:var(--text)}' +
      '.beh-row{display:flex;flex-wrap:wrap;gap:10px}' +
      '.beh-card{display:inline-block;padding:8px 14px;' +
        'border:1px solid var(--border);border-radius:var(--radius-sm);' +
        'font-size:var(--fs-sm);color:var(--text);text-decoration:none;' +
        'background:var(--bg-card);line-height:1.4;' +
        'transition:border-color .18s,background .18s}' +
      '.beh-card:hover{border-color:var(--brand);background:var(--bg)}' +
      '.beh-badge{display:inline-block;margin-block-end:10px;' +
        'padding:3px 10px;border-radius:var(--radius-sm);' +
        'background:var(--brand);color:#fff;font-size:var(--fs-xs);' +
        'font-weight:700;text-transform:uppercase;letter-spacing:.05em}' +

      /* --- Sonraki adım pill --- */
      '@keyframes behSlide{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}' +
      '.beh-pill{position:fixed;inset-inline-end:20px;bottom:20px;z-index:900;' +
        'background:var(--bg-card);border:1px solid var(--border);' +
        'border-radius:var(--radius-sm);padding:14px 16px;' +
        'box-shadow:var(--shadow-lg);width:270px;' +
        'animation:behSlide .28s ease}' +
      '[dir=rtl] .beh-pill{inset-inline-end:20px;inset-inline-start:auto}' +
      '.beh-pill-steps{display:flex;align-items:center;gap:5px;margin-block-end:10px}' +
      '.beh-dot{width:8px;height:8px;border-radius:50%;background:var(--border);flex-shrink:0}' +
      '.beh-dot.on{background:var(--brand)}' +
      '.beh-dot-sep{flex:1;height:1px;background:var(--border)}' +
      '.beh-stage-lbl{font-size:var(--fs-xs);color:var(--text-muted);' +
        'margin-inline-start:8px;font-weight:600;white-space:nowrap}' +
      '.beh-pill-body{display:flex;align-items:center;justify-content:space-between;gap:8px}' +
      '.beh-ns-lbl{font-size:var(--fs-2xs);color:var(--text-muted);' +
        'text-transform:uppercase;letter-spacing:.06em;margin-block-end:3px}' +
      '.beh-ns-cta{font-size:var(--fs-sm);font-weight:600;color:var(--text);' +
        'text-decoration:none;display:block;line-height:1.3}' +
      '.beh-ns-cta:hover{color:var(--brand)}' +
      '.beh-pill-close{background:none;border:none;padding:4px;' +
        'color:var(--text-muted);cursor:pointer;font-size:16px;line-height:1;' +
        'flex-shrink:0;border-radius:4px}' +
      '.beh-pill-close:hover{color:var(--text);background:var(--bg-soft)}';

    document.head.appendChild(el);
  }

  /* ══════════════════════════════════════════════════
     GEÇMİŞ SİSTEMİ — blog.html
  ══════════════════════════════════════════════════ */

  function initBlog() {
    var d = load();
    var recentViews = d.views.slice(0, 3);

    if (recentViews.length) {
      var cards = recentViews.reduce(function (acc, v) {
        var post = findPost(v.s);
        if (!post) return acc;
        var a = document.createElement('a');
        a.className = 'beh-card';
        a.href = 'post.html?slug=' + encodeURIComponent(v.s);
        a.textContent = pickTitle(post);
        acc.push(a);
        return acc;
      }, []);

      if (cards.length) {
        var section = document.createElement('div');
        section.className = 'beh-section';

        var head = document.createElement('div');
        head.className = 'beh-head';

        var h = document.createElement('h3');
        h.className = 'beh-title';
        h.textContent = t('beh.recent');
        head.appendChild(h);

        var clearBtn = document.createElement('button');
        clearBtn.type = 'button';
        clearBtn.className = 'beh-clear';
        clearBtn.textContent = t('beh.clear');
        clearBtn.addEventListener('click', function () {
          save({ views: [], cats: {}, pkg: {} });
          section.remove();
        });
        head.appendChild(clearBtn);

        var row = document.createElement('div');
        row.className = 'beh-row';
        cards.forEach(function (c) { row.appendChild(c); });

        section.appendChild(head);
        section.appendChild(row);

        var postList = document.getElementById('postList');
        if (postList && postList.parentNode) {
          postList.parentNode.insertBefore(section, postList);
        }
      }
    }

    /* Kategori chip tıklamalarını izle */
    var catChips = document.getElementById('catChips');
    if (catChips) {
      catChips.addEventListener('click', function (e) {
        var chip = e.target.closest('[data-cat]');
        if (chip && chip.dataset.cat && chip.dataset.cat !== 'all') {
          var d2 = load();
          d2.cats[chip.dataset.cat] = (d2.cats[chip.dataset.cat] || 0) + 1;
          save(d2);
        }
      });
    }
  }

  /* ══════════════════════════════════════════════════
     GEÇMİŞ SİSTEMİ — post.html
  ══════════════════════════════════════════════════ */

  function initPost() {
    try {
      var params = new URLSearchParams(location.search);
      var slug = params.get('slug');
      if (!slug) return;
      var post = findPost(slug);
      trackView(slug, post ? post.category : '');
    } catch (e) {}
  }

  /* ══════════════════════════════════════════════════
     GEÇMİŞ SİSTEMİ — index.html
  ══════════════════════════════════════════════════ */

  function initIndex() {
    var plans = document.querySelectorAll('.plan[data-pkg]');

    plans.forEach(function (plan) {
      var pkg = plan.dataset.pkg;
      if (!pkg) return;
      plan.addEventListener('mouseenter', function () { trackPkg(pkg); }, { passive: true });
      plan.addEventListener('click', function () { trackPkg(pkg); });
    });

    var d = load();
    var suggested = getSuggestedPkg(d);
    if (!suggested) return;

    var target = document.querySelector('.plan[data-pkg="' + suggested + '"]');
    if (!target) return;

    var badge = document.createElement('span');
    badge.className = 'beh-badge';
    badge.textContent = t('beh.suggested');
    target.insertBefore(badge, target.firstChild);
  }

  function getSuggestedPkg(d) {
    var views    = d.views.length;
    var cats     = Object.keys(d.cats).length;
    var p3clicks = d.pkg.p3 || 0;
    var p2clicks = d.pkg.p2 || 0;

    if (p3clicks >= 2 || views >= 7 || cats >= 3) return 'p3';
    if (p2clicks >= 1 || views >= 3 || cats >= 2) return 'p2';
    if (views >= 1)                               return 'p1';
    return null;
  }

  /* ══════════════════════════════════════════════════
     SONRAKI ADIM SİSTEMİ — tüm sayfalar
  ══════════════════════════════════════════════════ */

  /* Aşama adları (i18n key'leri) */
  var STAGE_LABELS = ['ns.s0', 'ns.s1', 'ns.s2', 'ns.s3'];

  function buildPill(stage, step) {
    var pill = document.createElement('div');
    pill.className = 'beh-pill';
    pill.id = 'behPill';
    pill.setAttribute('role', 'complementary');
    pill.setAttribute('aria-label', t('ns.label'));

    /* İlerleme noktaları */
    var stepsRow = document.createElement('div');
    stepsRow.className = 'beh-pill-steps';
    for (var i = 0; i < 4; i++) {
      if (i > 0) {
        var sep = document.createElement('span');
        sep.className = 'beh-dot-sep';
        stepsRow.appendChild(sep);
      }
      var dot = document.createElement('span');
      dot.className = 'beh-dot' + (i <= stage ? ' on' : '');
      stepsRow.appendChild(dot);
    }
    var stageLbl = document.createElement('span');
    stageLbl.className = 'beh-stage-lbl';
    stageLbl.textContent = t(STAGE_LABELS[stage]);
    stepsRow.appendChild(stageLbl);
    pill.appendChild(stepsRow);

    /* CTA + kapat */
    var body = document.createElement('div');
    body.className = 'beh-pill-body';

    var left = document.createElement('div');

    var lbl = document.createElement('div');
    lbl.className = 'beh-ns-lbl';
    lbl.textContent = t('ns.label');
    left.appendChild(lbl);

    var cta = document.createElement('a');
    cta.className = 'beh-ns-cta';
    cta.href = step.url;
    cta.textContent = t(step.label) + ' →';
    left.appendChild(cta);

    var closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'beh-pill-close';
    closeBtn.setAttribute('aria-label', t('ns.close'));
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', function () {
      pill.remove();
      dismiss();
    });

    body.appendChild(left);
    body.appendChild(closeBtn);
    pill.appendChild(body);

    return pill;
  }

  function showPill(stage, step) {
    if (isDismissed()) return;
    if (document.getElementById('behPill')) return;

    var pill = buildPill(stage, step);
    document.body.appendChild(pill);
  }

  function initNextStep(page) {
    /* Brief sayfasında gösterme — ziyaretçi zaten dönüşüm noktasında */
    if (page === 'work') return;

    var d = load();
    var stage = getStage(d);
    var step  = getNextStep(stage, page);

    /* Tetiğin birini bekle: %50 kaydırma veya 20 saniye */
    var triggered = false;

    function trigger() {
      if (triggered) return;
      triggered = true;
      scrollOff();
      clearTimeout(timer);
      showPill(stage, step);
    }

    function onScroll() {
      var scrolled = window.scrollY + window.innerHeight;
      var total = document.documentElement.scrollHeight;
      if (total > 0 && scrolled / total >= 0.5) trigger();
    }

    function scrollOff() {
      window.removeEventListener('scroll', onScroll, { passive: true });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    var timer = setTimeout(trigger, 20000);

    /* İlk kontrol: sayfa zaten scroll edilmiş mi */
    onScroll();
  }

  /* ══════════════════════════════════════════════════
     SAYFA ALGILAMA VE BAŞLATMA
  ══════════════════════════════════════════════════ */

  function init() {
    injectStyles();

    var page = location.pathname.split('/').pop().replace('.html', '') || 'index';

    try {
      var pp = new URLSearchParams(location.search).get('page');
      if (pp) page = pp;
    } catch (e) {}

    /* Geçmiş sistemi */
    if (page === 'blog')                       initBlog();
    else if (page === 'post')                  initPost();
    else if (page === 'index' || page === '')  initIndex();

    /* Sonraki adım sistemi — tüm sayfalarda */
    initNextStep(page);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
