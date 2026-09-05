# E-posta ve başvuru iletişimi

NAVIAR-CARE-001-WEB-01 · DOC-012/11 · Belge v1.0 · 2026-09-05

Rezervasyon veya iptal sırasında bir outbox kaydı oluşur. Demo işlerinde durum suppressed olur ve gerçek gönderim yapılmaz. Ticari açılış kapıları, RESEND_API_KEY ve EMAIL_FROM uygun olduğunda bağlantı kodu Resend’e metin e-postası gönderebilir.

| Kuyruk durumu | Anlamı |
| --- | --- |
| pending | Gönderim işi bekliyor |
| blocked | Açılış/gönderici yapılandırması eksik |
| suppressed | Test kaydı; gönderim kapalı |
| superseded | İptal olmuş görüşmenin eski onayı durduruldu |
| failed | Gönderim başarısız veya belirsiz eski deneme |
| sent | Sağlayıcı isteği kabul etti; alıcıya teslim kanıtı değil |

Onay için kayıt kimliği {bookingId}/confirm, iptal için {bookingId}/cancel olur. Sağlayıcı tekrar anahtarı care/{outboxId} biçimindedir. attempts sayacı ve ilk last_attempt zamanı saklanır. Yönetici yeniden deneme eylemi, üç denemeden az ve uygun durumda en fazla 10 işi işler. İlk denemesi 23 saati aşan iş otomatik yeniden gönderilmez; operatör mutabakatı gerekir.

Resend belgeleri tekrar anahtarlarının 24 saatlik koruma sağladığını belirtir; kodun 23 saat sınırı bunun altında seçilmiş bir uygulama kararıdır. [Resend idempotency keys](https://resend.com/docs/dashboard/emails/idempotency-keys).

**E-posta içeriği:** NAVIAR CARE başlığı, kayıt/iptal metni, Europe/Oslo saatine göre tarih, rezervasyon referansı, kullanıcının kendi görüşmeleri bağlantısı ve kapsam açıklaması. Konu, metin ve tarih kayıt diline göre seçilir. Reklam bülteni, randevu hatırlatma serisi veya pazarlama otomasyonu yoktur.

**İletişim başvurusu farklıdır:** /contact formu messages tablosuna yazar; otomatik e-posta yönlendirmesi yapmaz. Yönetici başvuruyu ekranından okur ve durumunu günceller. “Mesajınız kaydedildi” ifadesi “e-posta gönderildi” şeklinde değiştirilmemelidir.

**Açılış prosedürü — öneri:** Gönderici alan adını işletme hesabında doğrula; ayrı test ortamında temsilî onay/iptal iletisini kontrol et; teslim/ret sonuçlarını incele; doğru dil, saat ve bağlantıları teyit et; sorumlu operatörü belirle. Üretim adreslerine bu belgede test gönderilmez.

**Arıza akışı:** Kayıt mevcut mu kontrol et; outbox durumuna bak; sağlayıcının kabul edip etmediğini kontrol et; sonucu belirsiz eski işi yeni kimlikle körlemesine tekrar gönderme; sonuca göre yetkili operatör kararı kaydet. Otomatik zamanlanmış kuyruk işleyici ve teslim webhook’u mevcut değildir.
