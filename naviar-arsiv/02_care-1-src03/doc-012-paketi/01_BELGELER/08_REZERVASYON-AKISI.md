# Rezervasyonun işleyişi ve hata durumları

NAVIAR-CARE-001-WEB-01 · DOC-012/08 · Belge v1.0 · 2026-09-05

Rezervasyon bir ön görüşme içindir. Hizmet alacak eve yardımcı atamaz ve ziyaret sözleşmesi oluşturmaz. Demo sırasında bütün sonuç mesajları bunun bir test olduğunu belirtir.

**Kullanıcı adımları:** Hizmeti ve kendisi/yakını seçeneğini belirle; açık bir görüşme saatini seç; özet, ad ve e-postayı kontrol et; test kaydını onayla. Önceden seçilen hizmet yalnızca izin verilen practical/accompany/social değerlerinden biri olabilir. Kullanıcı dil değiştirdiğinde hizmet seçimi korunabilir; kişisel alanlar URL’ye yazılmaz.

**Sunucu adımları:** Oturumu, kaynak adresini ve CSRF bilgisini doğrula; alanları doğrula; aynı kullanıcı/işlem kimliği daha önce kaydedilmişse o sonucu döndür; aktif ve doğru demo/canlı saatini kontrol et; görüşmeyi ve e-posta işini birlikte yaz; sonucu döndür. Aktif görüşme için aynı saat ikinci kez kullanılamaz.

| Senaryo | Mevcut davranış | Operatörün anlaması gereken |
| --- | --- | --- |
| Hizmet seçilmemiş | İlerleme durur | Varsayılan hizmetle yanlış talep oluşmaz |
| Tek saat var | Açık seçim gerekir | Kullanıcı iradesi korunur |
| Enter basılır | Geçerli adıma ilerler; erken gönderim engellenir | Son adım onayı ayrı kalır |
| Çift tıklama | Gönderim sürerken yeni gönderim engellenir | Aynı istemci eylemi çoğaltılmaz |
| Yanıt kaybolur | Aynı işlem kimliğiyle yeniden deneme | Kayıt oluşmuşsa aynı kayıt döner |
| Saat kapatılır/başkası alır | 409 slot_conflict | Uygunluk yenilenip yeni saat seçilir |
| Eski müsaitlik yanıtı geç gelir | Güncel listeyi ezmez | Son seçim korunur |
| İstek 20 saniyeyi aşar | Yerelleştirilmiş hata ve yeniden deneme | Başarısız yanıt, işlem olmadığının kanıtı değildir |
| Ücret ödenmiş veya ödeme bekliyor | İptal manuel incelemeye yönelir | Otomatik para iadesi yok |

Yönetici saat oluştururken başlangıç en az bir saat, en fazla 180 gün ileride olmalıdır; süre 20–120 dakika tamsayıdır. Görüşmeler arasında 10 dakika tampon denetlenir. Liste, başlangıca en az 15 dakika kalan uygun saatleri getirir. Yaz/kış saati geçişindeki belirsiz veya var olmayan yerel saat reddedilir.

**İptal:** Kişi kendi, ödeme kilidi olmayan kaydını iptal eder. Tekrarlanan iptal yeni e-posta işi çoğaltmaz. Takvime ekleme tarayıcıda ICS dosyası üretir; bağımsız takvim sağlayıcısıyla çift yönlü senkronizasyon bulunmaz.

**Bilinen sınırlar:** Form verisi sayfa yenilenmesinde veya dil değişiminde tamamen saklanmaz; uyarı gösterilir. Kaybolan sayfa belleği yeni işlem kimliği üretebilir; istemci tekrar koruması kalıcı cihazlar arası iş akışı değildir. Randevu tamamlama, ziyaret takibi, otomatik hatırlatma ve tekrar eden görüşme sistemi yoktur.

Dayanak: src/client.txt, src/worker.js, tests/client-flow.test.mjs, tests/integration.test.mjs.
