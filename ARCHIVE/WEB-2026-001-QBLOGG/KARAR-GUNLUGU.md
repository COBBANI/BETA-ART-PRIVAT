# WEB-2026-001 — KARAR GÜNLÜĞÜ

Promptun madde 7 formatı. Kaynak: `CLAUDE.md` "Değişmez kurallar" + `docs/`.
Aşağıdakiler QBLOGG'un kalıcı mimari kararlarının arşiv özetidir; her biri
CLAUDE.md'de yürürlükte. Tarihler kararın belgelendiği güne göre yaklaşık;
kesin commit için git geçmişine bakılmalı.

---

## DEC-2026-08-22-001 – Sıfır bağımlılık, derleme yok

- **Tarih:** ~2026-08-22
- **Proje:** WEB-2026-001
- **Proje aşaması:** Define
- **Kararı alan:** Betul
- **Konu:** Teknik yığın.
- **Seçilen çözüm:** Saf HTML/CSS/JS; çatı ve derleme adımı yok.
- **Seçilme nedeni:** Site herhangi bir statik sunucuya olduğu gibi yüklenebilsin; bakım yükü minimum.
- **Reddedilen seçenekler:** Next.js/çatı tabanlı — bağımlılık ve derleme getirir.
- **Etkilenen kod dosyaları:** tüm site.
- **Kararın durumu:** Yürürlükte (CLAUDE.md "Teknik yapı").
- **Yeniden değerlendirme:** Yeni bağımlılık eklemeden önce gerçekten gerekli mi doğrulanır.

## DEC-2026-08-22-002 – On dil + Arapça RTL + metin sözlükten

- **Tarih:** ~2026-08-22
- **Proje:** WEB-2026-001
- **Proje aşaması:** Design
- **Konu:** Çok dillilik ve yön.
- **Seçilen çözüm:** 10 dil (tr,en,zh,hi,es,ar,fr,pt,ru,no); görünen her metin `data-i18n` ile sözlükten; yön-bağımsız CSS (`margin-inline-start`).
- **Seçilme nedeni:** Dil bütünlüğü + Arapça RTL kırılmasın; HTML'deki metin yalnız JS-kapalı yedek.
- **Etkilenen kod dosyaları:** `assets/js/i18n.js`, tüm HTML.
- **Kararın durumu:** Yürürlükte (Değişmez kural 1–3).

## DEC-2026-08-22-003 – Token renkler + çizilen ikon (emoji yok)

- **Tarih:** ~2026-08-22
- **Proje:** WEB-2026-001
- **Proje aşaması:** Design
- **Konu:** Marka görsel kontrolü.
- **Seçilen çözüm:** Renkler `:root` değişkenlerinden (ham hex yasak); ikonlar satır içi SVG (24×24, currentColor); emoji yasak.
- **Seçilme nedeni:** Koyu tema kendiliğinden çalışsın; emoji'yi OS çizer, marka kontrolü kaybolur. Aqua metinde kullanılamaz (kontrast 1,8:1) → `--brand-2-ink`.
- **Kararın durumu:** Yürürlükte (Değişmez kural 4–5).

## DEC-2026-08-22-004 – İki katmanlı içerik modeli (tr/en tam, 8 dil özet)

- **Tarih:** ~2026-08-22
- **Proje:** WEB-2026-001
- **Proje aşaması:** Build
- **Konu:** Blog içerik yoğunluğu.
- **Seçilen çözüm:** `tr`/`en` tam makale (30–55 blok); kalan 8 dil özet katmanı (3 blok). `check.mjs` ayrı eşiklerle denetler.
- **Seçilme nedeni:** Diller arası yoğunluk çok farklı; tek kelime sayısı en yoğun dili cezalandırır. Görünürlük için `orig`+`src` (≥3 kaynak) zorunlu.
- **Kararın durumu:** Yürürlükte (CLAUDE.md "İki katmanlı içerik").

## DEC-2026-08-22-005 – Kimlik işi tescil standardında + uydurma yasağı

- **Tarih:** ~2026-08-22
- **Proje:** WEB-2026-001
- **Proje aşaması:** Validate
- **Konu:** Marka varlıkları ve iddialar.
- **Seçilen çözüm:** Her logo/ikon betikten üretilir (yeniden üretilebilir), kaynak+hak kaydı, EUIPO başvuru biçimi (`marka-tescil.mjs`), belge–dosya ölçü doğrulaması (`marka-dogrula`). Marka müsaitliği/tescil edilebilirliği hakkında doğrulanmamış hiçbir şey yazılmaz.
- **Seçilme nedeni:** Kurum siteleri bu ortamda engelli; yalnız alıntıyla doğrulanan kriterler kaynağıyla kaydedilir.
- **Kararın durumu:** Yürürlükte (Değişmez kural 7–8).

---

**Not:** QBLOGG'un tam karar tarihçesi `docs/proje-gunlugu.md` ve
`docs/denetim/*` içindedir; bu dosya arşiv özeti tutar, o belgeleri
kopyalamaz. Yeni büyük karar alındığında hem oraya hem buraya işlenir.
