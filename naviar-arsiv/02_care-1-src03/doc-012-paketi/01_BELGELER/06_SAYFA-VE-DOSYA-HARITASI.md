# Sayfa haritası ve kod dosyalarının görevleri

NAVIAR-CARE-001-WEB-01 · DOC-012/06 · Belge v1.0 · 2026-09-05

Ana sayfa sırası: demo bildirimi ve gezinme; ana mesaj ve görsel; hizmet şeridi; hizmetler ve rehber; üç adımlı süreç; yakınlar; güven/karar ilkeleri; fiyat; SSS; son görüşme çağrısı; alt bilgi. Bu sıra kaynak şablondan çıkarılmıştır.

| Sayfa yolu | Kullanıcı işi | Veri / erişim |
| --- | --- | --- |
| /nb, /en, /tr | Hizmeti inceleme | Genel içerik; özel site erişim kapısı ayrıca geçerli |
| /{lang}/guide | Hizmet rehberi | Cevaplar tarayıcıda; veritabanına gönderilmez |
| /{lang}/book | Ön görüşme kaydı | Kayıt için platform oturumu |
| /{lang}/my | Kendi görüşmeleri | Kullanıcıya ait kayıtlar |
| /{lang}/contact | Destek/yardımcı/değişiklik/geri bildirim | Oturumla mesaj kaydı |
| /{lang}/enquiries | Kendi başvuruları | Kullanıcıya ait mesajlar |
| /{lang}/payment | Teklif ve ödeme durumu | Kullanıcı kayıtları; ek ödeme koşulları |
| /{lang}/privacy | Mevcut demo gizlilik metni | Ticari metnin sonlandırılması açık |
| /{lang}/terms | Mevcut demo koşulları | Ticari sözleşme yerine geçmez |
| /{lang}/admin | Yönetim | Sunucuda yönetici izin listesi |

Kanonik ana yol /{lang} şeklindedir. /{lang}/home da aynı şablonu kabul eder. Kök /, /nb adresine yönlendirir. Geçersiz sayfa 404 döndürür. Bu kitap 10 sayfa türü × 3 dil = 30 kanonik yolu esas alır; eski “27 sayfa” raporu önceki kontrol kapsamını ifade eder.

| Dosya / klasör | Sorumluluk |
| --- | --- |
| src/worker.js | HTTP yönlendirme, API, veri işlemleri, kimlik/izin, e-posta ve Stripe |
| src/render.js | HTML şablonları ve sayfaya verilen güvenli yapılandırma |
| src/client.txt | Tarayıcı form akışları, istekler, analiz ve yönetim etkileşimleri |
| src/styles.css | Tasarım sistemi ve duyarlı yerleşimler |
| src/locales.js | Ana NB/EN/TR sözlüğü ve diğer metin katmanlarının birleşimi |
| src/experience.js | Rehber ve operasyon metinleri |
| src/improvements.js | Başvuru, açılış, hata ve ek açıklamalar |
| src/studio.js | Hizmet örnekleri, kapsam ve demo çağrıları |
| src/insights.js | İçerik inceleme önerisi ve operasyon göstergeleri |
| src/readiness.js | Ortamda gerekli değerlerin varlık kontrolü |
| db/schema.ts | Sekiz tablonun Drizzle tanımları |
| drizzle/ | Sıralı SQL değişiklikleri ve şema kayıtları |
| scripts/build.mjs | Worker derlemesi ve şema kopyalama |
| vite.config.mjs | Üretimden ayrı, bellek içi SQLite ile yerel demo |
| tests/ | 30 Worker/SQLite ve 7 DOM testi |
| assets/ | Seçilen SVG logo ve ana PNG görsel |
| .env.example | Boş/kapalı örnek ayarlar; gerçek sır içermez |
| .openai/hosting.json | Mevcut site kimliği ve DB bağlaması |
| package.json / package-lock.json | Komutlar ve kilitli bağımlılıklar |
| docs/ | Önceki araştırma, platform, işletim ve teslim kayıtları |

Kaynak ZIP’i takipli 62 dosyanın tamamını içerir. Kod okuyucu HTML’si okunabilir kaynak dosyalarını dosya adına göre açar. Dosya özetleri ek envanterde bulunur.
