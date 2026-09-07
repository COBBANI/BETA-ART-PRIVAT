
(function () {
  var GH = { owner: 'andersenbetul-alt', repo: 'BETA-ART-PRIVAT', base: 'main', configPath: 'assets/js/config.js' };
  var API = 'https://api.github.com';
  var el = function (id) { return document.getElementById(id); };
  var PAT_KEY = 'panel_pat';

  function gh(path, opts) {
    opts = opts || {};
    // Yalnızca gerekli başlıklar: her ikisi de (Authorization, JSON gövdeli
    // istekte Content-Type) tarayıcıda önden CORS denetimi (preflight)
    // tetikler — GitHub'ın API'si bunu destekliyor (dokümante edilmiş CORS
    // desteği), ama gereksiz başlık eklemek (ör. X-GitHub-Api-Version)
    // önden denetimin onaylaması gereken başlık listesini büyütmekten
    // başka bir işe yaramıyor; bilinçli olarak dışarıda bırakıldı.
    var headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem(PAT_KEY), 'Accept': 'application/vnd.github+json' };
    if (opts.body) headers['Content-Type'] = 'application/json';
    headers = Object.assign(headers, opts.headers || {});
    return fetch(API + path, Object.assign({}, opts, { headers: headers }))
      .then(function (res) {
        return res.json().then(function (body) {
          if (!res.ok) throw new Error((body && body.message) || ('GitHub hatası: ' + res.status));
          return body;
        });
      });
  }

  function b64encode(str) { return btoa(unescape(encodeURIComponent(str))); }
  function b64decode(str) { return decodeURIComponent(escape(atob(str))); }

  // config.js'i dosyanın geri kalanına dokunmadan, yalnız hedeflenen alanları
  // değiştirerek güncelliyor — tam yeniden üretim değil, satır bazlı yama.
  // Bu yüzden yorumlar/biçimlendirme her zaman korunur.
  function patchConfig(text, v) {
    function esc(s) { return String(s || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'"); }
    function setInBlock(blockKey, fieldKey, val) {
      var blockRe = new RegExp('(' + blockKey + ':\\s*\\{)([^}]*)(\\})');
      text = text.replace(blockRe, function (m, open, body, close) {
        var fieldRe = new RegExp("(" + fieldKey + ":\\s*)'[^']*'");
        if (fieldRe.test(body)) body = body.replace(fieldRe, "$1'" + esc(val) + "'");
        return open + body + close;
      });
    }
    function setTop(key, val) {
      var re = new RegExp('(\\n\\s*' + key + ":\\s*)'[^']*'");
      text = text.replace(re, "$1'" + esc(val) + "'");
    }
    setInBlock('social', 'linkedin', v.linkedin);
    setInBlock('social', 'x', v.x);
    setInBlock('social', 'youtube', v.youtube);
    setInBlock('social', 'substack', v.substack);
    setInBlock('social', 'medium', v.medium);
    setTop('mailTo', v.mailTo);
    setTop('formEndpoint', v.formEndpoint);
    return text;
  }

  function readConfigValues(text) {
    function inBlock(blockKey, fieldKey) {
      var blockRe = new RegExp(blockKey + ':\\s*\\{([^}]*)\\}');
      var bm = text.match(blockRe);
      if (!bm) return '';
      var fm = bm[1].match(new RegExp(fieldKey + ":\\s*'([^']*)'"));
      return fm ? fm[1] : '';
    }
    function top(key) {
      var m = text.match(new RegExp('\\n\\s*' + key + ":\\s*'([^']*)'"));
      return m ? m[1] : '';
    }
    return {
      linkedin: inBlock('social', 'linkedin'), x: inBlock('social', 'x'),
      youtube: inBlock('social', 'youtube'), substack: inBlock('social', 'substack'),
      medium: inBlock('social', 'medium'),
      mailTo: top('mailTo'), formEndpoint: top('formEndpoint')
    };
  }

  // Dal yoksa main'in ucundan yeni bir dal açar; varsa olduğu gibi kullanır.
  function ensureBranch(name) {
    return gh('/repos/' + GH.owner + '/' + GH.repo + '/git/ref/heads/' + name)
      .then(function () { return name; })
      .catch(function () {
        return gh('/repos/' + GH.owner + '/' + GH.repo + '/git/ref/heads/' + GH.base)
          .then(function (ref) {
            return gh('/repos/' + GH.owner + '/' + GH.repo + '/git/refs', {
              method: 'POST',
              body: JSON.stringify({ ref: 'refs/heads/' + name, sha: ref.object.sha })
            });
          })
          .then(function () { return name; });
      });
  }

  function openPR(branch, title, body) {
    return gh('/repos/' + GH.owner + '/' + GH.repo + '/pulls', {
      method: 'POST',
      body: JSON.stringify({ title: title, head: branch, base: GH.base, body: body })
    }).catch(function (err) {
      // Aynı dal için PR zaten açıksa GitHub 422 döner — kullanıcıya var olanı bulmasını söyle.
      throw new Error('PR açılamadı (' + err.message + ') — dal zaten pushlanmış olabilir: ' +
        'https://github.com/' + GH.owner + '/' + GH.repo + '/compare/' + GH.base + '...' + branch);
    });
  }

  function goster(id) {
    ['giris', 'panel'].forEach(function (s) { el(s).hidden = s !== id; });
  }

  // ---- Giriş ----
  el('girisForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = el('girisBtn'), msg = el('girisMsg');
    var token = el('pat').value.trim();
    btn.disabled = true; msg.className = 'msg'; msg.textContent = 'Doğrulanıyor…';
    sessionStorage.setItem(PAT_KEY, token);
    gh('/user').then(function (u) {
      el('kullaniciAdi').textContent = ', ' + (u.login || '');
      el('repoAdi').textContent = GH.owner + '/' + GH.repo;
      goster('panel');
      el('cikis').hidden = false;
      yukleAyarlar();
    }).catch(function (err) {
      sessionStorage.removeItem(PAT_KEY);
      msg.className = 'msg err'; msg.textContent = 'Giriş başarısız: ' + err.message;
    }).finally(function () { btn.disabled = false; });
  });

  el('cikis').addEventListener('click', function () {
    sessionStorage.removeItem(PAT_KEY);
    location.reload();
  });

  // ---- Sekmeler ----
  el('tabAyarlar').addEventListener('click', function () { secTab('ayarlar'); });
  el('tabYazi').addEventListener('click', function () { secTab('yazi'); });
  function secTab(hangi) {
    el('tabAyarlar').setAttribute('aria-selected', String(hangi === 'ayarlar'));
    el('tabYazi').setAttribute('aria-selected', String(hangi === 'yazi'));
    el('panelAyarlar').hidden = hangi !== 'ayarlar';
    el('panelYazi').hidden = hangi !== 'yazi';
  }

  // ---- Site ayarları ----
  var configSha = null;
  function yukleAyarlar() {
    gh('/repos/' + GH.owner + '/' + GH.repo + '/contents/' + GH.configPath + '?ref=' + GH.base)
      .then(function (file) {
        configSha = file.sha;
        var text = b64decode(file.content);
        var v = readConfigValues(text);
        el('s_linkedin').value = v.linkedin; el('s_x').value = v.x;
        el('s_youtube').value = v.youtube; el('s_substack').value = v.substack;
        el('s_medium').value = v.medium; el('c_mailTo').value = v.mailTo;
        el('c_formEndpoint').value = v.formEndpoint;
        el('ayarlarYukleniyor').hidden = true;
        el('ayarlarForm').hidden = false;
      })
      .catch(function (err) {
        el('ayarlarYukleniyor').textContent = 'Yüklenemedi: ' + err.message;
      });
  }

  el('ayarlarForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = el('ayarlarGonder'), msg = el('ayarlarMsg');
    btn.disabled = true; msg.className = 'msg'; msg.textContent = 'Gönderiliyor…';
    var v = {
      linkedin: el('s_linkedin').value.trim(), x: el('s_x').value.trim(),
      youtube: el('s_youtube').value.trim(), substack: el('s_substack').value.trim(),
      medium: el('s_medium').value.trim(), mailTo: el('c_mailTo').value.trim(),
      formEndpoint: el('c_formEndpoint').value.trim()
    };
    var branch = 'panel/config-' + Date.now();
    ensureBranch(branch)
      .then(function () {
        return gh('/repos/' + GH.owner + '/' + GH.repo + '/contents/' + GH.configPath + '?ref=' + branch);
      })
      .then(function (file) {
        var text = b64decode(file.content);
        var yeni = patchConfig(text, v);
        return gh('/repos/' + GH.owner + '/' + GH.repo + '/contents/' + GH.configPath, {
          method: 'PUT',
          body: JSON.stringify({
            message: 'Panel: config.js güncelle',
            content: b64encode(yeni), sha: file.sha, branch: branch
          })
        });
      })
      .then(function () {
        return openPR(branch, 'Panel: site ayarlarını güncelle',
          'İçerik panelinden gönderildi. `npm run check` ve `npm run guvenlik` merge öncesi çalıştırılmalı.');
      })
      .then(function (pr) {
        msg.className = 'msg ok';
        msg.innerHTML = '';
        var a = document.createElement('a'); a.href = pr.html_url; a.target = '_blank';
        a.rel = 'noopener'; a.textContent = 'PR açıldı — incelemek için tıklayın →';
        msg.appendChild(a);
      })
      .catch(function (err) { msg.className = 'msg err'; msg.textContent = 'Başarısız: ' + err.message; })
      .finally(function () { btn.disabled = false; });
  });

  // ---- Yeni yazı öner (issue) ----
  el('yaziForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = el('yaziGonder'), msg = el('yaziMsg');
    btn.disabled = true; msg.className = 'msg'; msg.textContent = 'Gönderiliyor…';
    var baslik = el('y_baslik').value.trim();
    var kategori = el('y_kategori').value;
    var ozet = el('y_ozet').value.trim();
    var kaynaklar = el('y_kaynaklar').value.trim();
    var govde = '**Kategori:** ' + kategori + '\n\n**Gerekçe:** ' + ozet +
      (kaynaklar ? '\n\n**Bilinen kaynaklar:**\n' + kaynaklar : '') +
      '\n\n---\nİçerik panelinden gönderildi. Üretim: `qblogg-blog-yazisi` becerisi ' +
      '(en az üç kaynak, orijinal katkı, görünürlük denetimi zorunlu).';
    gh('/repos/' + GH.owner + '/' + GH.repo + '/issues', {
      method: 'POST',
      body: JSON.stringify({ title: 'Yeni yazı önerisi: ' + baslik, body: govde, labels: ['yeni-yazi-onerisi'] })
    }).then(function (issue) {
      msg.className = 'msg ok'; msg.innerHTML = '';
      var a = document.createElement('a'); a.href = issue.html_url; a.target = '_blank';
      a.rel = 'noopener'; a.textContent = 'Issue açıldı →';
      msg.appendChild(a);
      el('yaziForm').reset();
    }).catch(function (err) {
      msg.className = 'msg err'; msg.textContent = 'Başarısız: ' + err.message;
    }).finally(function () { btn.disabled = false; });
  });

  // ---- Oturum devam ediyor mu? ----
  if (sessionStorage.getItem(PAT_KEY)) {
    gh('/user').then(function (u) {
      el('kullaniciAdi').textContent = ', ' + (u.login || '');
      el('repoAdi').textContent = GH.owner + '/' + GH.repo;
      goster('panel'); el('cikis').hidden = false; yukleAyarlar();
    }).catch(function () { sessionStorage.removeItem(PAT_KEY); goster('giris'); });
  } else {
    goster('giris');
  }
})();
