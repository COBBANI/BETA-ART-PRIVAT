---
name: qblogg-operasyon
description: QBLOGG deposunda çalışan her oturumun operasyon kuralları — kaynak doğrulama, paylaşılan ağaçta commit sahipliği, tarif-tabanlı dağıtım kontrol listesi ve ortam sınırları. Çok adımlı işe başlarken ve dağıtım/commit öncesi uygulanır.
owner: QBLOGG
---

# QBLOGG operasyon kuralları

Bu beceri, gözlem günlüğünden (skill-observations/log.md, gözlem 1-8)
damıtılmış oturum-içi çalışma kurallarıdır. CLAUDE.md "Değişmez kurallar"
her zaman üstündür; burası onların altındaki işleyiş katmanıdır.

## 1. Kaynak doğrulama (gözlem 1, 6 — kesişen ilke #1)

- Plan/brief/spec'e başka dosyadan bir ad yazmadan önce (CSS değişkeni, id,
  dosya yolu, tablo adı) o adı kaynağından grep'le doğrula. Hafızadan yazılan
  iki ad (`--line`, `#themeToggle`) iki hata üretti.
- **Sıfır sonuçlu arama yokluğun kanıtı değildir.** Önce arama aracını
  doğrula: `grep -i` (SQL/config dosyaları büyük harf kullanır), sonra
  dosyanın varlığını/başını ikinci yöntemle (ls + head) gör.

## 2. Paylaşılan çalışma ağacında commit sahipliği (gözlem 5)

Alt-ajan (SDD uygulayıcısı) çalışırken stop-hook "commit et" diye bastırsa
bile: önce `git status --short` ile fark sahipliğini ayır; yalnız kendi
dosyalarını İSİMLE `git add <dosya>` yap. `git add -A` bu kipte yasak —
ajanın yarım işini commit'e süpürür.

## 3. Tarif-tabanlı dağıtım kontrol listesi (gözlem 7, 8)

Dağıtım depoyu klonlayan bir buildCommand ise ("tarif" deseni):

1. Dağıtımdan ÖNCE: `git status --short` boş MU + dal push'lu MU?
   (Push edilmemiş vendor dosyası ENOENT ile dağıtımı düşürdü.)
2. Dağıtımdan SONRA: build günlüğündeki commit hash'i beklediğin commit mi?
3. Yeni Vercel projesi açıldıysa: Deployment Protection kendiliğinden
   açılıyor — kapat, sonra canlı içeriği fetch ile doğrula.
4. Proje silinirse panik yok: tarif deseni sayesinde aynı adla yeniden
   dağıtım siteyi dakikalar içinde getirir; ardından 2-3. adımlar + belge
   adreslerini güncelle.

## 4. Bu ortamın bilinen sınırları ve alternatifleri (gözlem 3, 4)

- LibreOffice/pandoc/pdftoppm bu konteynerde çalışmıyor. Belge doğrulama
  alternatifi: zipfile+ElementTree ile document.xml geçerliliği ve anahtar
  metin kontrolü; görsel gerekiyorsa HTML/SVG → Playwright ekran görüntüsü
  (Chromium: /opt/pw-browsers/chromium).
- esm.sh ve *.vercel.app proxy'den engelli; dış paket gerektiğinde npm
  registry çalışıyor → kütüphaneyi vendor'la ve KAYNAK.md kaydı düş
  (sürüm, lisans, sha256).
- **Genel web fetch (WebFetch/deep-research) çoğu tüketici/pazarlama
  sitesinde EGRESS_BLOCKED verebiliyor** — yalnız *.vercel.app/esm.sh
  değil; 01.09.2026'da doğrulandı: `canva.com`, `smartbyra.no`,
  `geopriced.com` üçü de doğrudan WebFetch'te engellendi (deep-research
  workflow'unun 16 kaynağının tamamı da aynı sebeple boş döndü — hata
  görünmez, sessizce `claims: []` üretiyor). Sonuç: `WebSearch`
  sonuçlarının snippet'i güvenilir tek bilgi kaynağı olabilir; bir
  fiyat/rakam için `WebFetch` ile doğrulama denenmeli ama başarısız
  olursa **kullanıcıya elle teyit görevi olarak devredilmeli**, snippet
  kesin bilgi gibi sunulmamalı.
- Scratchpad'e stdlib modül adıyla dosya koyma (copy.py vakası import
  uzayını kırdı).

## 5. SDD plan biçimi (gözlem 2)

SDD planlarında görev başlıkları `## Task N —` ile açılır (betikler bu
deseni arar); gövde Türkçe kalabilir.

## Kullanım

Çok adımlı işe başlarken bu beceriyi yükle; özellikle dağıtım, commit ve
plan yazımı anlarında ilgili bölümü uygula. Yeni bir operasyon dersi
çıktığında önce gözlem günlüğüne, incelemede buraya işlenir.
