# QA raporu — WEB-2026-002

**Tarih:** 5 Eylül 2026  
**Sürüm:** `v0.1 demo`

## Kontrol edilenler

| Kontrol | Sonuç | Kanıt |
|---|---|---|
| Gerekli dosya ve varlıklar | PASS | `node scripts/check.mjs` |
| HTML doctype, title, viewport ve tek H1 | PASS | `scripts/check.mjs` |
| Görsellerde alt metin | PASS | `scripts/check.mjs` |
| Bokmål/English/Türkçe içerik anahtarları | PASS | 129 anahtar; üç dil sözlüğü |
| JSON içerik modeli ve Vercel ayarı | PASS | JSON parse kontrolü |
| JavaScript syntax | PASS | `node --check app.js` |
| Formun dış veri gönderimini engellemesi | PASS | `preventDefault()`; `fetch`, `XMLHttpRequest`, `sendBeacon` yok |
| Responsive CSS | PASS | 780 px ve 420 px breakpoint’leri; reduced-motion kuralı |
| Noindex hazırlığı | PASS | `robots.txt` tüm yolları kapatır |
| Gerçek ödeme/e-posta/CRM/analitik | BAĞLI DEĞİL | Bu prototipte entegrasyon yok |

## Tarayıcı doğrulama durumu

Bulut tarayıcı, çalışma alanındaki `127.0.0.1` adresine `ERR_BLOCKED_BY_CLIENT` ile erişemedi. `file://` erişimi de tarayıcı URL politikası tarafından reddedildi. Bu nedenle aşağıdaki kontroller bu ortamda gerçek tarayıcı etkileşimi olarak tamamlanamadı:

- masaüstü ve mobil ekran görüntüsü
- gerçek dil düğmesi tıklaması
- mobil menünün açılıp kapanması
- formun hata ve başarı durumunun tarayıcıda gözlenmesi
- klavye sırası ve gerçek kontrast incelemesi

Bu, prototipin çalışmadığını göstermez; yalnızca mevcut çalışma ortamında canlı DOM doğrulaması yapılamadığını gösterir. Gerçek yayından önce bu liste Chrome/Firefox üzerinde yeniden çalıştırılmalıdır.

## Manuel yayın öncesi kabul kriterleri

1. `?lang=nb`, `?lang=en` ve `?lang=tr` yollarında tüm görünür içerik eşdeğer olmalı.
2. Form başarı mesajından sonra hiçbir ağ isteği oluşmamalı; canlı form açılırsa bu davranış değişikliği ayrıca belgelenmeli.
3. 390 px genişlikte yatay kaydırma olmamalı.
4. Tab ile tüm menü, dil düğmeleri, bağlantılar, alanlar ve disclosure bileşenleri erişilebilir olmalı.
5. Gerçek fiyat, sorumluluk, sigorta, yardımcı kontrolleri ve personvern metni onaylanmadan yayın yapılmamalı.
