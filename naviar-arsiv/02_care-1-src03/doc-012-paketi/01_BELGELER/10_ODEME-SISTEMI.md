# Fiyat teklifi ve ödeme sistemi

NAVIAR-CARE-001-WEB-01 · DOC-012/10 · Belge v1.0 · 2026-09-05

Ödeme kodu Stripe hosted Checkout içindir. Bu teslimde gerçek tahsilat yapılmamıştır. Mevcut özel site erişim kapısı haricî Stripe bildirimlerini engelleyebilir; dış bildirim erişimi çözülmeden gerçek ödeme etkinleştirilmemelidir.

**Teklif akışı:** Yönetici kayıt için toplam NOK tutarını ve yazılı kapsamı girer. Arayüz NOK’u 100 ile çarpıp API’ye øre tamsayı olarak iletir. Sunucu 100–10.000.000 øre aralığını kabul eder; bu teknik sınır bir fiyat listesi değildir. Her yeni teklif offer_version alanını artırır. Kullanıcı teklifi ve koşulları okuyup aynı sürümü kabul eder.

**Ödeme oturumu:** Sunucu bedeli tarayıcıdan almaz; kayıtlı tekliften alır. payment alanını checkout_pending yaparak teklif düzenleme ve iptali kilitler. Stripe isteği care/{bookingId}/{offerVersion} tekrar anahtarıyla yapılır. Bilinen stripe_session varsa yeni satış oturumu oluşturmak yerine o oturum sorgulanır.

İlk denemenin zamanı checkout_started içinde saklanır. Oturumu bilinmeyen bir denemede 23 saat dolduysa veya eski kaydın zamanı yoksa sistem payment_review döndürür. Bu, sağlayıcının tekrar anahtarının süresi dolduktan sonra ikinci tahsilat başlatmamak için uygulanan ürün kuralıdır. Stripe tekrar işleme dayanağı: [Idempotent requests](https://docs.stripe.com/api/idempotent_requests).

| Durum | Anlamı | Sonraki işlem |
| --- | --- | --- |
| not_requested | Henüz teklif yok | Koordinatör kapsamı netleştirir |
| offered | Yazılı teklif hazır | Kullanıcı güncel sürümü değerlendirir |
| checkout_pending | Ödeme başlatıldı veya sonucu bekleniyor | Bildirim ve sağlayıcı durumu izlenir |
| paid | Uygun imzalı olay ödeme durumunu doğruladı | İptal/iade operatör incelemesine gider |
| failed | Asenkron ödeme başarısız bildirildi | Durum incelenir; gerekirse yeni teklif |

**Neden dönüş sayfası yeterli değil?** Kullanıcının başarı adresine gelmesi ödeme kanıtı sayılmaz. Webhook ham gövdeyle imza kontrolünden geçer; zaman toleransı 5 dakikadır. Oturum, tutar, NOK para birimi, teklif sürümü ve canlı/test modu eşleşmelidir. Aynı event.id ikinci kez uygulanmaz. Tam gövde ve imza yaklaşımı: [Stripe webhooks](https://docs.stripe.com/webhooks).

Desteklenen olaylar: checkout.session.completed; checkout.session.async_payment_succeeded; checkout.session.async_payment_failed; checkout.session.expired. Süresi dolan oturum doğrulanırsa teklif yeniden offered olur ve sürüm artar; yeniden kabul gerekir. payment_status unpaid olan bir tamamlanma kaydı tek başına paid yapmaz.

**İşletim sınırları:** Otomatik iade, muhasebe/fatura, itiraz ve abonelik sistemi yoktur. Bunlar yetkili operatörün ayrı sürecidir. Kod sk_live_ anahtar önekini şart koştuğu için gerçek sağlayıcı test modu uçtan uca kurulumu hazır sayılmaz; önce ayrılmış test ortamı tasarlanmalıdır. Bu turdaki ödeme testleri sahte sağlayıcı yanıtlarıyla yereldir.
