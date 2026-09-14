# API sözleşmesi ve örnek istekler

NAVIAR-CARE-001-WEB-01 · DOC-012/09 · Belge v1.0 · 2026-09-05

API aynı kökende JSON kullanır. Normal POST işlemlerinde Content-Type: application/json, Origin: SITE_ORIGIN ve x-csrf-token başlığı gerekir. Token sayfadaki page-config JSON’unda verilir; aynı oturuma ait HttpOnly naviar_csrf çereziyle eşleştirilir. Stripe webhook’u ayrı imza doğrulamasından geçer.

| Yöntem / yol | İşlev ve giriş | Çıktı / yetki |
| --- | --- | --- |
| GET /api/status | Açılış ve entegrasyon varlık durumu | open, email, payment, authenticated; sır değerleri yok |
| GET /api/slots | Uygun saatleri getir | slots; en fazla 80 |
| GET /api/bookings | Kendi görüşmelerini getir | bookings; son 100; oturum |
| POST /api/bookings | slotId, idem, service, relationship, name, email, locale | booking; yeni kayıtta 201; oturum |
| POST /api/bookings/{id}/cancel | Boş JSON | ok; sahip/yönetici kontrolü |
| GET /api/enquiries | Kendi mesajlarını getir | messages; son 100; oturum |
| POST /api/contact | idem, name, email, topic, body, locale | id, demo; 201; oturum |
| POST /api/checkout | id, offerVersion, acceptTerms: true | url veya paid/pending; sahiplik ve açılış kapıları |
| POST /api/analytics | consent, session, kind, section, locale | ok/excluded; analiz çerezi ve açık izin |
| GET /api/admin/overview | Yönetim özeti | Kayıtlar, mesajlar, kuyruk, göstergeler; yönetici |
| POST /api/admin/slots | start: yerel YYYY-MM-DDTHH:mm, duration | id; 201; yönetici |
| POST /api/admin/close-slot | id | ok; yalnızca boş gelecek saat; yönetici |
| POST /api/admin/message-status | id, status, version | ok, version; yönetici |
| POST /api/admin/offer | id, total, details | ok; total øre tamsayı; yönetici |
| POST /api/admin/retry-email | Boş JSON | ok; uygun en fazla 10 iş; yönetici |
| POST /api/admin/maintenance | Boş JSON | ok; eski analiz/sayaç silme; yönetici |
| POST /api/webhooks/stripe | Ham sağlayıcı olay gövdesi ve stripe-signature | received; imza, olay ve tutar eşleşmesi |

Bu tablo önerilen istemci kullanım yöntemlerini listeler. Kaynakta /api/status ve /api/admin/overview dalları yöntemi açık bir GET koşuluyla sınırlamaz; bu nedenle kapsamlı HTTP yöntem uygunluğu sağlandığı iddia edilmez. GET/POST ayrımının sıkılaştırılması teknik borç kaydına alınmıştır.

**Görüşme isteği gövdesi — yalnızca kurgusal test örneği:**

```json
{
  "slotId": "API-den-gelen-gercek-test-slot-id",
  "idem": "ayni-yeniden-denemede-korunan-islem-kimligi",
  "service": "practical",
  "relationship": "self",
  "name": "Deneme Kisi",
  "email": "deneme@example.test",
  "locale": "tr"
}
```

slotId, /api/slots yanıtındaki kimlikle değiştirilmelidir. Örnek doğrudan gerçek hizmet oluşturma komutu değildir. Kimlik başlıkları istemci tarafından üretilmez; platform geçidi tarafından doğrulanır.

**Başvuru sınırları:** ad en fazla 80; e-posta 254; mesaj 1500 karakter. topic: support, helper, change veya feedback. status: new, in_progress, closed. Ad/e-posta bilgileri otomatik olarak bir alıcıya gönderilmez.

**Yaygın hatalar:** 400 validation/test_email/invalid_time; 401 signin; 403 forbidden/origin/consent; 404 not_found; 409 slot_conflict/stale_message/offer_changed/manual_review/payment_review; 413 too_large; 415 content_type; 429 rate_limit; 502 payment_provider; 503 payment_unavailable/storage_unavailable. Hata gövdesi {"error":"kod"} biçimindedir. İstemci kodları kullanıcı diline çevirir; SQL veya anahtar değeri göstermez.

Normal POST istek sayacı dakika kovasında 60 isteğe kadar izin verir. Boyut kontrolü Content-Length ve okunan metin uzunluğuna dayanır; akış okumasını baştan sınırlayan kapsamlı kaynak tüketimi koruması sayılmamalıdır.
