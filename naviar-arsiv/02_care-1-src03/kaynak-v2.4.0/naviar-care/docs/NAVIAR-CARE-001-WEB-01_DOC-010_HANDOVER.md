# NAVIAR CARE — teslim ve açılış kaydı

Belge: **NAVIAR-CARE-001-WEB-01_DOC-010** · Sürüm **2.4.0** · 5 Eylül 2026

## Teslim edilen sürüm

NAVIAR CARE’in mevcut özel geliştirme sürümü tamamlandı. Bu teslim, gerçek müşteriye açık bir hizmetin işletilmeye başladığı anlamına gelmez. Günlük pratik yardım, eşlik ve sosyal destek kapsamı korunur; klinik hizmet, otomatik yardımcı atama veya tamamlanmış kimlik doğrulama iddiası yoktur.

Özel site: https://naviar-care-1.andersen-betul.chatgpt.site

| Bölüm | Teslim durumu | Kullanım sınırı |
|---|---|---|
| Tasarım ve metin | Bokmål, İngilizce ve Türkçe; sade dil, hizmet rehberi, kapsam ve fiyat açıklamaları | Kullanıcılarla okunabilirlik ve erişilebilirlik testi yapılmadı |
| Rezervasyon | Ön görüşme saatleri, kalıcı kayıt, tekrar gönderim ve çakışma koruması, iptal, takvim dosyası | Önizlemede test rezervasyonu; gerçek ev ziyareti veya personel ataması değil |
| İletişim | Korumalı mesaj kutusu, kullanıcının kendi başvuruları, yönetici durum takibi | Mesajlar otomatik olarak e-postaya iletilmez |
| Yönetim | Saatler, başvurular, yazılı fiyat teklifleri, operasyon sayıları, açılış eksikleri | Yalnızca yetkili hesaplar |
| E-posta | Resend bağlantı kodu, gönderim kuyruğu, sınırlı yeniden deneme | Hesap/gönderici bağlı değil; gerçek gönderim kapalı |
| Ödeme | Stripe Checkout bağlantı kodu, sunucudan fiyat, imzalı bildirim doğrulaması | Hesap bağlı değil; gerçek tahsilat kapalı |
| İçerik analizi | Açık izinle bölüm görüntüleme, görünür kalma ve sonraki adım tıklamaları | Önizleme ve yönetici trafiği sayılmaz; okunduğu veya anlaşıldığı kanıtlanmaz |
| Talep tahmini | Yeterli gerçek kayıt olduğunda haftalık ön görüşme talebi için sınırlı karşılaştırma | Şu anda gerçek veri yok; kişisel ihtiyaç veya sağlık tahmini yok |

## Bu teslimde kapatılan teknik sorunlar

Rezervasyon formunda Enter tuşu doğru adıma ilerler. Tek bir müsait saat bulunsa da kullanıcı açıkça seçer. Çift gönderim engellenir; bağlantı yanıtı kaybolursa aynı işlem kimliğiyle yeniden deneme yapılır. Eski müsaitlik yanıtı daha yeni listeyi değiştiremez. Hizmet seçimi dil bağlantılarında güncellenir. Görüşmelerim ekranında yükleme hatasından sonra Yenile düğmesiyle yeniden deneme yapılabilir. Yavaş isteklerde üç dilde açıklama gösterilir.

Bu altı akış DOM düzeyinde sentetik yanıtlarla kontrol edilir; gerçek tarayıcı, yerleşik form doğrulaması veya ekran görünümü testi değildir.

Ödeme yeniden denemesi artık bilinen Stripe oturumunu sorgular; aynı teklif için yeni oturum oluşturmaz. İlk girişimin zamanı veritabanında korunur. Yanıtı kaybolan girişim, aynı anahtarla yalnızca ilk 23 saat içinde yeniden denenebilir. Daha eski veya zamanı bilinmeyen girişim koordinatör incelemesine yönlendirilir. Stripe anahtarlarının en az 24 saat sonra kaldırılabilmesi nedeniyle bu sınır koruyucu bir ürün kararıdır.

Süresi dolmuş oturum sağlayıcıdan doğrulanınca teklif sürümü yenilenir ve kullanıcıdan tekrar kabul istenir. Tamamlanmış oturum ikinci bir satış başlatmaz. Ödeme tutarı, para birimi, rezervasyon, teklif sürümü, gerçek/test modu ve yönlendirme adresi denetlenir. Ödendi durumu imzalı sağlayıcı bildirimiyle belirlenir.

Kaynaklar: [Stripe tekrar istek kuralları](https://docs.stripe.com/api/idempotent_requests), [Stripe oturum sorgulama](https://docs.stripe.com/api/checkout/sessions/retrieve). Erişim: 5 Eylül 2026.

## Deneme kullanım sırası

1. Aynı hesapla `/tr/admin` sayfasını açın ve gelecek için bir test saati ekleyin. Saatler Europe/Oslo olarak işlenir.
2. `/tr/guide` sayfasında hizmet seçin. `/tr/book` üzerinden o saati ayırın. Uydurma ad ve `deneme@example.test` gibi test e-postası kullanın.
3. `/tr/my` sayfasında kaydı görün, takvime ekleyin veya iptal edin.
4. `/tr/contact` üzerinden bir test mesajı gönderin. `/tr/enquiries` sayfasında görün. Yönetimden durumunu değiştirip yeniden kontrol edin.
5. Aynı sayfalarda dil menüsünden Bokmål veya İngilizceyi seçin. Dil değiştirilirken doldurulmuş kişisel form yanıtları taşınmaz.

Testler gerçek kişilere mesaj veya ödeme göndermez. Boş analiz ekranı ve veri yetersizliği bildirimi önizlemede beklenen durumdur.

## Gerçek açılış için gereken girdiler ve işler

| Sorumlu | Gereken | Tamamlanma kanıtı |
|---|---|---|
| İşletme sahibi | Resmî işletme adı/numarası, hizmet bölgesi, iletişim adresi, seçilen alan adı | Doğrulanmış işletme kaydı ve alan adı yönetimine erişim |
| İşletme ve koordinatör | Onaylı ücretler, iptal/iade kuralları, gerçek müsaitlik, yardımcı kabulü ve hizmet sorumlulukları | Kullanıcıya gösterilecek nihai metin ve işletim kararı |
| Hesap sahibi | Stripe satıcı hesabı; Resend gönderici hesabı ve doğrulanmış e-posta alan adı | Sağlayıcı hesap ekranlarında tamamlanmış doğrulama |
| Teknik sorumlu | Müşteri oturumu ve dışarıdan erişilebilir Stripe bildirim adresi | Yetkisiz kişi yönetim ve müşteri verisine erişemeden sağlayıcı testinin geçmesi |
| Teknik ve işletme | Tarayıcı/telefon/klavye kontrolleri, sağlayıcı testi, yedekten geri yükleme, veri saklama ve düzenli bakım | Tarihli test kaydı ve sorumlu kişi |

Özel sitenin giriş kapısı dış sağlayıcı bildirimlerini de engeller. Bu nedenle yalnızca ödeme anahtarlarını eklemek yeterli değildir; müşteri erişimi ve bildirim adresi birlikte tamamlanmalıdır. Mevcut özel erişim bu teslimde genişletilmez.

Anahtarları sohbet, kaynak kodu veya dosyalara koymayın; barındırma ortamının gizli değişken alanında bağlayın. `SERVICE_OPEN`, `PAYMENTS_ENABLED` ve `LAUNCH_REVIEW_COMPLETE` şu an `false` kalır. `ADMIN_EMAILS` ve hız sınırlama sırrı zaten vardır; yeniden oluşturulmaları gerekmez. `.env.example` gerekli ayar adlarını içerir.

## Ödeme ve e-posta sorununu yönetme

Ödeme incelemesi gereken kaydı rezervasyon referansıyla Stripe hesabında bulun. Sonucu belirsiz ödeme için yeni bağlantı oluşturmayın. İade, itiraz ve ücretli iptal sorumlu operatör tarafından sağlayıcı hesabında ele alınır; otomatik iade sistemi yoktur. Kayıt düzeltmesini kanıt, tarih ve sorumluyla belgeleyin. Başarısız e-posta yönetimde yeniden denenebilir; sağlayıcı kabulü teslim edildiği kanıtı değildir. İptal edilmiş rezervasyonun eski onayı tekrar gönderilmez.

## Doğrulama ve geri dönüş

Birleştirilmiş sürümde 36 otomatik test geçti (30 sunucu/SQLite, 6 DOM akışı): üç dil, kalıcı kayıt, erişim sınırları, çakışma ve tekrar istekleri, iptal, yaz saati, analiz izni, ödeme tutarı/imzası/yeniden denemesi ve e-posta hataları. Testler yerel SQLite ve sentetik sağlayıcı yanıtları kullanır. Gerçek tahsilat veya e-posta gönderimi yapılmadı.

Önceki tarayıcı denemesi URL politikası, son deneme ise tarayıcı ortamının başlangıç hatası nedeniyle tamamlanamadı; alternatif bir yolla bu sınırlamalar aşılmadı. Mobil görünüm, yardımcı teknolojiler, gerçek sağlayıcılar ve barındırılan veritabanı için uçtan uca onay yoktur. Güvenlik sertifikası veya mevzuata uygunluk belgesi verilmez.

Veritabanı değişikliği `0006_bent_wolf_cub.sql`: nullable `checkout_started` sütunu. Eski kayıtlar korunur. Önceki 2.3 sürümüyle uyumlu ek bir sütundur; geri dönüşte göç dosyası veya veritabanı silinmez. Ticari açılıştan önce geri yükleme provası yapılmalıdır.

## Dosya ve karar kaydı

Bu DOC-010 yeni teslim kaydıdır; DOC-005 işletim, DOC-006 araştırma, DOC-008 geliştirme ve iki DOC-009 tasarım kaydı tarihçe olarak korunur. Proje adı yalnızca NAVIAR CARE’dir. Mevcut kod deposu ve özel site sürümlenir. Eski Vercel adresleri ve ayrı sağlık konsepti bu teslimle değiştirilmez veya birleştirilmez. Hiçbir ek ücretli abonelik satın alınmadı.
