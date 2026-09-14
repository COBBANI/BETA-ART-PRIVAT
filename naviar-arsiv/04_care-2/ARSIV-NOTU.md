# NAVIAR CARE 2 (NAVIAR-CARE-002) arşivi — bu klasör nedir?

Kullanıcının 05.09.2026 gecesi bu oturuma parça parça yüklediği
**NAVIAR CARE 2** kaynak ve belge dosyalarının olduğu gibi arşividir.
SRC-03'ten (NAVIAR-CARE-001-WEB-01) AYRI bir projedir: ChatGPT proje
kimliği farklı (`appgprj_6a9b4bd1…` ↔ SRC-03 `appgprj_6a9b750d…`),
sitesi https://naviar-care-2.andersen-betul.chatgpt.site/tr/ ,
paket adı `naviar-care-2-operations` v3.0.0, teslim sürümü 6.0.

**Konsept:** dil ihtiyacı önceden netleştirilen çevrim içi doktor
görüşmesi hazırlığı ("Dine ord. Din vei videre."). Belgelerin kendi
ifadesiyle: gerçek sağlık hizmeti, hekim görüşmesi, canlı ödeme ve
otomatik e-posta AÇIK DEĞİL; 42 klinisyen profili ve 113 dil kaydı
örnektir (`example: true`, `licenseVerified: false`), semptom/kimlik/
sağlık verisi toplanmaz. **Bu kod bu depoda ÇALIŞTIRILMAZ** —
ChatGPT Sites ortamına bağlıdır (Worker + Sites D1).

## Yerleşim (package.json'daki `npm test` ve README'ye göre restore)

- `checks/` — 4 test/denetim dosyası (operations.test.mjs,
  sample-calendar.test.mjs, catalog-model.cjs, static.py)
- `server/` — operations.mjs (Worker API), forecast.mjs
- `scripts/` — build.mjs; export-handoff.py (ad tahmini: yükleme adı
  "exporthandoff.py", tire konumu README/paketten doğrulanamadı)
- `design/` — teslim belgeleri: CONCEPT-v6-tr.md (ana konsept, DOS-001
  v6.0), RELEASE-v5.md, RELEASE-v6.md, REVIEW-v4.md, STUDIO-DEMO.md
- kök: catalog.json, content.json, package.json, package-lock.json,
  drizzle.config.ts, vite.config.mjs, README.md,
  `_gitignore` (nokta-dosya etkisiz adla), `openai-hosting.json`
  (özgün yolu `.openai/hosting.json`)

## Eksik parçalar (yüklenmedi — README/testlerin atıf yaptıkları)

- `build_content.py`, `build_operations.py` (sayfa üreticileri)
- `db/schema.ts` ve `drizzle/0000_outgoing_puck.sql` göçü
- `dist/` çıktıları (model.js, site.js, operations.js,
  studio-demo/sample-calendar.js, studio.js) ve site kaynak/varlıkları
- content.json'daki `photoalt` bir kadın fotoğrafına atıf yapıyor;
  fotoğraf sohbete satır içi görsel olarak geldi, DOSYA olarak
  gelmedi — kökeni/lisansı da kayıtlı değil, kullanılmadan önce ikisi
  de tamamlanmalı.

Sonradan gelen parçalar bu ağaca aynı yerleşimle eklenir; md5 ile
yükleme kopyasına eşitlik doğrulanır.

## belge-arsivi-v6/ (eklendi: 05.09.2026 gece, ikinci parti)

CARE 2 **belge arşivi v6 / arşiv revizyonu 3** paketinden gelen iki dosya:

- `NAVIAR-CARE-002_Arsiv-Dizini_v6.html` — paketin kendi dizin sayfası
  (18 belge sayar: 3 güncel v6 teslimi + 14 geçmiş/kaynak kaydı +
  1 ortak CARE 1–2 test raporu; ayrıca envanter JSON ve SHA256SUMS'a
  bağlantı verir). md5 `20eeb4fc…`.
- `NAVIAR-CARE-2-demo.html` — dizinde "Geçmiş demo tasarımı" olarak
  kayıtlı dosya; boyut dizindeki kayıtla birebir (21 769 bayt).
  md5 `8d0aa885…`. İçinde stüdyo karar kaydı + üç dilli (nb/en/tr)
  çevrimdışı demo; "not a live service" beyanı korunuyor.

**Ad notu:** yükleme sistemi tirelerı düşürüyor (`NAVIARCARE2demo.html`,
`NAVIARCARE002_ArsivDizini_v6.html` geldi); adlar paketin kendi
dizinindeki özgün yazıma göre geri kuruldu. Demo 3, dizin 2 kez
yüklendi — hepsi bayt bayt aynı, birer kopya arşivlendi.

**Eksik:** paketin kalan 17 belgesi (v6 teslim html+md, web metinleri,
DOS-001/002 PDF'leri, REG-001, REV-001/002, SRC-001…003 kopyaları,
Tasarim-v4.jpg, Platform-Karari, Studio-Demo_v1.0.html,
Teslim-Kaydi_v5.0.html, TEST-RAPORU) + `NAVIAR-CARE-002_Arsiv-Envanteri_v6.json`
+ `SHA256SUMS.txt` henüz yüklenmedi — SHA doğrulaması onlar gelince yapılacak.
