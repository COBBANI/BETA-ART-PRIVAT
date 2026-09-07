# BETA ART — Birleştirilmiş müze tasarımı

18 yüklemedeki 6 benzersiz HTML sayfası. Kaynak eşleştirmeleri ve SHA-256 değerleri `source-manifest.json` dosyasındadır. Kopyalar içerik kaybı olmadan tekilleştirildi.

Bu proje `beta-art/` React uygulamasından ve kökteki QBLOGG sitesinden ayrıdır.
Vercel: Root Directory `beta-art-museum`, Framework Other, Install Command boş,
Build Command `node build.mjs`, Output Directory `dist`.
Yerel: `node build.mjs` ve `python3 -m http.server 8001 --directory dist`.

## Sınırlar

- Önizlemedir; gerçek fotoğraf, RAW/EXIF kanıtları, işletme bilgileri ve fiyat onayı yoktur.
- Örnek görseller Unsplash kaynaklıdır; bunlara ait yazılmış kamera, tarih ve model izinleri doğrulanmış kabul edilemez.
- Sipariş gönderimi ve Plausible yükleme kapalıdır. Sepet yalnızca tasarım demosudur.
- Beş yardımcı sayfa EN/NO içerir; müze ana sayfası İngilizcedir.
- `cookie-demo.html` entegrasyon örneğidir; tüm siteye kurulmuş bir onay sistemi değildir.
- Asıl privacy belgesi verilmedi. `privacy.html` eksikliği açıklar; tamamlanmış hukuki metin değildir.
- Diğer hukuki ve biyografik metinler kullanıcıdan gelen taslaklardır, doğrulanmış uyumluluk beyanı değildir.
- Google Fonts ve Unsplash dış kaynakları ağ erişimi gerektirir.
- Üretim açılışından önce taslak yer tutucular, haklar, iletişim ve hukuki bilgiler tamamlanmalı; noindex o zaman kaldırılmalıdır.
