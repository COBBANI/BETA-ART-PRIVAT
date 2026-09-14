# Teknik mimari ve veri modeli

NAVIAR-CARE-001-WEB-01 · DOC-012/07 · Belge v1.0 · 2026-09-05

Uygulama sunucuda HTML üreten bir Worker’dır. Tarayıcı aynı kökendeki API’ye istek yapar. D1 bağlaması DB adıyla alınır; kod D1 uyumlu prepare/bind/first/all/run/batch yöntemlerini kullanır. Üretim Worker’ının çalışma anında harici npm bağımlılığı yoktur; geliştirme ve derlemede paketler kullanılır.

**Güven sınırı:** Platform geçidi kullanıcı oturumunu doğrular ve oai-authenticated-user-id / oai-authenticated-user-email başlıklarını Worker’a verir. Worker bunları güvenilir sayar. Başka barındırmaya taşınırken bu başlıkların dışarıdan taklit edilememesi sağlanmalı veya gerçek bir oturum doğrulama katmanıyla değiştirilmelidir. Sadece HTML dosyalarını Vercel’e yüklemek bu mimariyi taşımaz.

| Tablo | Başlıca alanlar | Temel kural |
| --- | --- | --- |
| slots | id, start, end, demo, active | Aktif başlangıç saatinde benzersizlik |
| bookings | id, slot_id, owner, idem, service, name, email, locale, relationship, status, demo, created | owner + idem benzersiz; confirmed durumunda slot benzersiz |
| bookings teklif alanları | total, offer_details, offer_version, payment, stripe_session, checkout_started | Fiyat kuruş/øre tamsayı; sürüm ve ilk ödeme denemesi saklanır |
| messages | id, owner, idem, name, email, topic, body, locale, demo, created, status, version, updated | owner + idem benzersiz; eşzamanlı durum değişimi sürümle denetlenir |
| outbox | id, booking_id, kind, state, attempts, provider_id, created, last_attempt | Onay/iptal e-posta işinin ve tekrar denemesinin kaydı |
| webhook_events | id, created | Aynı sağlayıcı olayının yeniden uygulanmasını önler |
| events | id, session, kind, section, locale, day, created, live | Oturum/olay/bölüm/gün benzersiz; gerçek veri işareti |
| audit | id, actor, action, target, created | Belirli yönetim ve iptal işlemlerinin izi |
| rate_limits | key, count, expires | Dakika başına istek sayacı |

Zamanlar veritabanında milisaniye cinsinden Unix zamanıdır. Kullanıcıya Europe/Oslo saatine çevrilir. Analiz günleri ve haftalık tahmin UTC üzerinden hesaplanır; iki takvim anlamı birbirine karıştırılmamalıdır.

**İlişki:** slots → bookings → outbox. Kullanıcı sahipliği uygulama katmanındaki owner alanıyla tutulur; ayrı kullanıcı/profil tablosu yoktur. Mesajlar rezervasyondan bağımsızdır. webhook_events yalnızca olay kimliği tutar; ayrıntılı mali mutabakat defteri değildir.

**Değişiklikler:** SQL değişiklikleri 0000’dan 0006’ya sıralıdır. Son değişiklik bookings.checkout_started alanını ekler. Çalışmış migration dosyaları geriye dönük değiştirilmemelidir; yeni ihtiyaç için yeni dosya oluşturulur. D1 migration yaklaşımı: [Cloudflare D1](https://developers.cloudflare.com/d1/reference/migrations/).

**Kapasite sınırı:** slots küresel görüşme takvimidir. Yardımcı kimliği, çoklu ekip, bölgeye göre kapasite veya aynı anda farklı çalışanların müsaitliği modellenmemiştir. Bunlar ek veri modeli ve hizmet tasarımı gerektirir.

Tam alan ve indeks tanımları kaynak ZIP’indeki db/schema.ts ve drizzle/ klasöründedir; CSV veri sözlüğü eklenmiştir.
