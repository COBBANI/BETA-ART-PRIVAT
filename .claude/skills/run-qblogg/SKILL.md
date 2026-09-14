---
name: run-qblogg
description: QBLOGG sitesini bu konteynerde çalıştır, sür ve ekran görüntüsü al — "siteyi çalıştır", "run", "smoke test", "screenshot/ekran görüntüsü", "sayfayı göreyim", "tarayıcıda doğrula" istendiğinde bu beceriyi kullan. Sunucu başlatma + Playwright sürüşü tek komutta.
---

# QBLOGG'u çalıştırma ve sürme

Saf statik site (derleme YOK, bağımlılık YOK) + `uye/` alt uygulaması.
Ajan yolu: bu klasördeki **driver.mjs** — sunucuyu kendi açar, gerçek
Chromium ile sürer, kapatır. Yollar depo kökünden.

## Önkoşul

Yok. python3, node ve Playwright (küresel, `/opt/node22/lib/node_modules`)
+ Chromium (`/opt/pw-browsers/chromium`) bu konteynerde hazır. `apt`/`npm
install` ÇALIŞTIRMA.

## Çalıştır (ajan yolu — önce bunu kullan)

```bash
# 7 kritik akışlı smoke test + ana sayfa görüntüsü (çıkış kodu 0/1):
node .claude/skills/run-qblogg/driver.mjs smoke /tmp/qblogg-run

# Tek sayfanın tam ekran görüntüsü (reveal animasyonu sabitlenmiş):
node .claude/skills/run-qblogg/driver.mjs shot "post.html?slug=ai-icerik-studyosu" /tmp/qblogg-run

# Yeni bir demo/Action Page eklediğinde aynı desenle görüntüle:
node .claude/skills/run-qblogg/driver.mjs shot "demo/q-work-audit.html" /tmp/qblogg-run
```

Görüntüler verilen dizine `.png` düşer. 8000'i çok aşan sayfa
yüksekliğinde SendUserFile reddeder — sürücü 0.75 ölçek kullanır; yine
aşarsa driver'daki `deviceScaleFactor`ı düşür.

## Çalıştır (insan yolu)

```bash
npm run dev        # python3 -m http.server 8000; Ctrl-C ile kapat
```

## Denetimler (commit öncesi zorunlu ikili + diğerleri)

```bash
npm run check      # 10 dil × anahtar bütünlüğü, sitemap, bağlantılar
npm run guvenlik   # XSS/CSP/veri koruma taraması
npm run gorunurluk # yayınlanmış yazıların görünürlük denetimi
npm run onizleme   # 8 sayfayı tek tıklanabilir HTML'e gömer (paylaşım için)
```

## demo/ — Action Pages deseni

`demo/*.html` + `.js` (ör. `cv-action-page`, `q-work-audit`): tek dosya,
bağımlılık yok, hesap/veri gönderimi yok — satış demoları ve Faz 0
doğrulama araçları. Smoke test artık bunlardan birini (Q Work Audit)
uçtan uca sürüyor: görev seç, süre gir, gönder, sonuç kartında `mailto:`
CTA'sının oluştuğunu doğrula. Yeni bir Action Page eklersen aynı deseni
smoke'a ekle; `vercel.json`'daki `buildCommand`a da dosya adlarını
eklemeyi unutma, yoksa dağıtımda 404 verir.

## panel/ — içerik paneli (ayrı uygulama, 02.09.2026 eklendi)

`panel/index.html`: `uye/` ile aynı desen — ayrı, bağımlılıksız tek dosya,
ana site derlemesine dahil değil. GitHub kişisel erişim jetonu (PAT) ile
giriş yapıp `config.js`'e PR açan ve yeni yazı fikrini Issue'ya çeviren bir
editör aracı (`docs/icerik-paneli.md`). Smoke test yalnızca giriş ekranının
göründüğünü doğruluyor — gerçek bir PAT olmadan GitHub API çağrılarını
sürmek mümkün değil (ve olmamalı, gerçek bir depoya yazar).

## Gotchas (hepsi bu konteynerde yaşandı)

- **`pkill -f "http.server"` bu araç çağrısının TAMAMINI öldürür.** Sunucuyu
  önceki bir çağrıda arkaplanda başlatıp sonra `pkill -f "http.server 8000"`
  ile durdurmayı denersem, o Bash aracı çağrısı çıkış kodu **144** ve **sıfır
  çıktıyla** ölüyor — komutta pkill'den önce veya sonra ne olursa olsun
  (tek başına `pkill -f "http.server 8000"; echo done` bile "done"u hiç
  yazdırmadan 144 veriyor). 6 denemede 4 kez tekrarlandı; `kill <pid>` ve
  `fuser -k 8000/tcp` ise sorunsuz çalışıyor (ikisi de doğrulandı). **Sonuç:
  sunucuyu asla `pkill -f` ile durdurma.** Zaten gerek yok — driver.mjs
  kendi başlattığı sunucuyu Node içinden (`process.kill(-srv.pid)`) kapatıyor
  ve zaten açık bir sunucuyu tespit edip yeniden kullanıyor. Port temizlemek
  gerekirse `fuser -k 8000/tcp` veya `kill <pid>` kullan.
- **Playwright depo kökünden import EDİLEMEZ** (`ERR_MODULE_NOT_FOUND`;
  ESM, NODE_PATH'i de yok sayar). driver.mjs bunu
  `createRequire('/opt/node22/lib/node_modules/')` ile çözer — kendi
  betiğini yazacaksan aynı deseni kopyala.
- **Egress proxy `*.vercel.app` ve `esm.sh`'i engeller** — canlı site bu
  konteynerden curl/tarayıcıyla açılamaz; canlı doğrulama Vercel MCP
  araçlarıyla (`web_fetch_vercel_url`) yapılır. CDN gerekirse paket
  vendor'lanır (örnek: `uye/lib/`).
- **Reveal animasyonu** ekran görüntüsünde fold-altı kartları boş
  gösterir; sürücü `.reveal{opacity:1!important}` enjekte eder.
- **Dil otomatik seçilir** — Playwright'ın varsayılan locale'i en olduğu
  için sayfa İngilizce açılır; Türkçe görmek için `?lang=tr` ekle.
- **Dağıtım = siteyi güncellemek değil**: canlı site `main`'i klonlayan
  vercel.json tarifiyle yayınlanır. Yerel değişiklik canlıya "main'e push
  + dağıtımı yeniden tetikleme" ile gider (CLAUDE.md "Bilinen sınırlar").
  Dağıtım öncesi: çalışma ağacı temiz + dal push'lu olmalı
  (qblogg-operasyon becerisi, madde 3).
- **LibreOffice/pandoc bu konteynerde çalışmıyor** — belge doğrulaması
  için qblogg-operasyon becerisindeki alternatifi kullan.

## Sorun giderme

| Belirti | Çözüm |
|---|---|
| `ERR_MODULE_NOT_FOUND: playwright` | createRequire deseni (yukarıda); betiği scratchpad'e taşımak da çalışır |
| `sunucu 5 sn içinde açılmadı` | 8000 portunu tutan eski süreç: `fuser -k 8000/tcp` (ASLA `pkill -f http.server` — yukarıdaki gotcha) sonra tekrar |
| Görüntüde kartlar boş | reveal sabitleme enjekte edilmemiş — driver'ı kullan |
| SendUserFile 400 | Görüntü >8000px — deviceScaleFactor'ı düşür |
