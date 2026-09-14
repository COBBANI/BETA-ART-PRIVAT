# NAVIAR CARE — Web ve hizmet geliştirme kaydı

**5 Eylül 2026 · NAVIAR-CARE-001-WEB-01 · Sürüm 2.2**

Bu çalışma mevcut NAVIAR CARE projesini geliştirir. Hizmet kapsamı, evinde yaşayan yaşlılara pratik ve sosyal destektir. Ön görüşme kaydı, ev ziyareti sözleşmesi değildir. Proje adı yalnızca NAVIAR CARE olarak korunmuştur.

## Beceri için gerçekçi örnek talep

> “NAVIAR CARE’in mevcut üç dilli özel önizlemesini geliştir. Yaşlı kişi ve yakını hangi desteği seçebileceğini, görüşmesini nasıl yöneteceğini ve başvurusunun durumunu kolayca anlasın. Yönetici eksik bağlantıları ve talepleri takip etsin. İzinli içerik analizi kur; yeterli veri olmadan kişisel ihtiyaç veya güvenilir talep tahmini iddiasında bulunma. Platform seçeneklerini araştır, mevcut kodu geliştir, kritik akışları doğrula ve sonucu belgeleriyle teslim et.”

Web Design Platform Studio döngüsü bu somut proje üzerinde uygulandı: mevcut durumu bulma → platform karşılaştırması → hizmet yolculuğu ve metinler → uygulama → doğrulama → teslim. Tarayıcı aşaması denendi ancak erişim politikası tarafından engellendi; bu aşama başarılı olarak işaretlenmedi.

## Platform kararı

**Karar: mevcut özel uygulamayı geliştirmeye devam et.** Projenin sunucu kodu, kayıt sahipliği, rezervasyon çakışması koruması, üç dil ve ödeme/e-posta adaptörleri zaten bulunuyor. Taşımak bu davranışların yeniden kurulmasını ve verilerin, kimlik doğrulamanın, yönlendirmelerin yeniden doğrulanmasını gerektirir. Bu bir proje uygunluğu kararıdır; dünya sıralaması değildir.

| Seçenek | Doğrulanan özellik / bu proje için değerlendirme | Karar ve sınırlama |
|---|---|---|
| Mevcut uygulama ve Sites | Kaynak kod, özel erişim, Worker ve D1 ile kalıcı kayıtlar doğrulandı. | Seçildi. Bakım için geliştirici gerekir; görsel içerik editörü bulunmuyor. |
| Wix Studio | Bookings ve Multilingual ile hizmet, takvim ve rezervasyon sayfaları çevrilebilir. Norveççe, İngilizce ve Türkçe desteklenen otomatik metin dilleri arasında. Bazı form metinleri elle çevrilir; Harmony’de Multilingual bulunmuyor. [Wix resmî belge](https://support.wix.com/en/article/wix-bookings-translating-your-site) | Görsel işletim isteyen gelecek sürüm için aday. Hesapta görünen genel taslağın bu proje olduğu doğrulanmadı. Taşıma yapılmadı. |
| Figma / Figma Sites | Figma artık site yayımlamayı da destekliyor; yalnızca prototip aracı olarak değerlendirilmedi. [Figma yayımlama belgesi](https://help.figma.com/hc/en-us/articles/31242845959703-Publish-update-or-unpublish-a-site) | Yeni bir tasarım dosyası, mevcut özel kayıt sisteminin yerini tek başına almaz. Bu turda ayrı Figma dosyası üretilmedi. |
| Webflow | Yerelleştirilmiş içerik, tasarım ve SEO için yerel yönetim sunuyor. [Webflow Localization](https://webflow.com/webflow-way/localization/localization-overview) | Editoryal site için aday; mevcut işlem akışları için ayrıca entegrasyon incelemesi gerekir. |
| Framer | Form verisini webhook ile sunucuya gönderebilir; imza doğrulaması ve yeniden deneme davranışı belgelenmiş. [Framer webhook belgesi](https://www.framer.com/help/articles/framer-form-webhook-setup/) | Tanıtım arayüzü için aday; özel operasyonel arka uç yine gerekir. |
| Vercel | Bu oturumda proje listeleme başarısız oldu. Mevcut kod doğrudan Vercel statik çıktısı değildir. | Önceki Vercel adresleri güncellenmedi. Taşıma için veri ve giriş katmanları uyarlanmalı. |

Kontrol tarihi: 5 Eylül 2026. Fiyat teklifi, abonelik satın alımı veya kapsamlı plan/maliyet karşılaştırması yapılmadı. Editör sayısı, bakım bütçesi ve trafik bilinmediği için toplam sahip olma maliyeti çıkarılmadı. Kaynak kod Git’te korunur; başka sağlayıcıya taşınması uygulama adaptasyonu gerektirir.

## Hizmet ve tasarım

Tasarım ilkesi: yaşlı kişinin kendi kararını verebildiği, okunabilir ve sakin bir hizmet deneyimi. Mevcut görsel kimlik ve açıklamalı temsili görsel korundu. Küçük ekranda başlık boyutu ve menünün konumu iyileştirildi; yeni durum yüzeyleri aynı renk, tipografi ve aralık düzenini kullanır. Gerçek müşteri, çalışan, referans veya doğrulanmış güvenlik iddiası eklenmedi.

[Home Instead’ın danışma ve kişiye göre planlama akışı](https://www.homeinstead.com/home-care/usa/wa/seattle/133/) başlangıç görüşmesi ve takip açısından incelendi. NAVIAR CARE’in kapsamı kendi pratik/sosyal destek çerçevesidir; diğer işletmenin sağlık hizmetleri, personel sayıları veya hizmete başlama süresi benimsenmedi.

Metinlerde kısa cümleler, açık eylemler ve kullanıcıya gerekli bilgiler esas alındı. [Språkrådet’ın klarspråk yaklaşımı](https://sprakradet.no/klarsprak/) yazım için, [W3C’nin çok adımlı form rehberi](https://www.w3.org/WAI/tutorials/forms/multi-page/) rezervasyon adımlarının görünürlüğü için referans alındı. Norveççe, İngilizce ve Türkçe yeni başvuru, hata ve yönetim metinleri birlikte eklendi. Ana dili konuşan kişiler ve yaşlı kullanıcılarla kullanılabilirlik testi hâlâ gerekli.

| Aşama | Kullanıcıya sunulan | İşletmenin sorumluluğu |
|---|---|---|
| Hizmeti bul | Üç hizmet grubu ve açıklamalı seçim rehberi | Bölgeyi ve gerçek kapasiteyi açıklamak |
| Görüşme seç | Saat seçimi, adımlar, uygun saat yoksa iletişim bağlantısı | Gerçek görevli takvimini yönetmek |
| Onay ve değişiklik | Kendi görüşmeleri, iptal, takvime ekleme | Değişiklik ve iptal kurallarını doğrulamak |
| Başvuru takibi | Yeni Başvurularım sayfası; alındı / işleniyor / tamamlandı | Mesajı değerlendirip doğru durumunu kaydetmek |
| Teklif ve ödeme | Yazılı kapsam, sunucudaki toplam ücret, sağlayıcı onayı | Ücret, vergi, sözleşme, iade ve mutabakat |
| Ev ziyareti | Bu önizlemede açılmadı | Yardımcı seçimi, kimlik ve referans süreci, yedek plan, olay yönetimi |

Yakının ödeme yapması, yaşlı kişinin özel bilgilerine erişim yetkisi oluşturmaz. Başvuru ekranı yalnızca oturum sahibinin kendi gönderilerini getirir; aileyle paylaşım sistemi varmış gibi gösterilmez.

## Bu sürümde uygulananlar

- **Başvurularım:** korumalı kayıt listesi, işlem durumu, gönderim/güncelleme zamanı ve yenileme. Koordinatörün kaydettiği durum kullanıcıya yansır. Mesajlar e-posta ile otomatik iletilmez.
- **Açılış hazırlığı:** işletme, bölge, iletişim, inceleme, e-posta ve ödeme ayarlarının bulunup bulunmadığını gösteren yönetim listesi. Gizli anahtar değerleri arayüze gönderilmez. Ayar varlığı, sağlayıcı testi değildir.
- **İçerikten sonraki adım:** işaretli içerik alanlarından görüşme, rehber ve iletişime yapılan izinli tıklamaların toplu sayımı. Test modu ve yönetici trafiği sunucuda da dışlanır.
- **Tahmin düzeltmesi:** yöntem seçimi ile test verisi ayrıldı. Tahminin hangi UTC haftasına ait olduğu açıklaştırıldı.
- **E-posta düzeltmesi:** iptal edilmiş bir görüşmenin bekleyen onay mesajı yeniden denemede durdurulur. İptal mesajı kendi akışında kalır.
- **Form ve görünüm:** önceden seçilmiş hizmet zorlaması kaldırıldı; kullanıcı açıkça seçer. Form doldurulduktan sonra dil değişiminde kayıp uyarısı verilir. Hata ve boş durumlar üç dilde yazıldı.

## Ölçüm ve tahmin sözlüğü

Data Analytics’in KPI tasarım yaklaşımı kullanıldı: her sayı bir işletme kararına bağlandı, kapsam ve eksikler açıklandı.

| Gösterge | Tanım ve karar | Sınırlama |
|---|---|---|
| Yeni gerçek ön görüşmeler | Son 30 günde oluşturulmuş test dışı kayıtlar; görüşme kapasitesi planlaması | Ev ziyareti veya gelir değildir. |
| İşlem bekleyen başvurular | Test dışı, yeni veya işleniyor durumundaki mesajlar; koordinatör iş yükü | Yanıt süresi ve memnuniyet ölçümü değildir. |
| Görüşme doluluğu | Sonraki 14 gündeki rezerve saat / açık saat | Evde hizmet verecek çalışan kapasitesini göstermez. |
| Görünürlük ve süre | Bölümün görünmesi; görünür sekmede toplam 10 saniye | Okunduğunu veya anlaşıldığını kanıtlamaz. |
| Sonraki adıma tıklama | İçerik bölümü ve hedef başına sayfa ziyaretinde bir olay | Tamamlanmış rezervasyon, dönüşüm veya kişisel ihtiyaç çıkarımı değildir. |

Analizde ad, e-posta, mesaj metni, sağlık bilgisi veya hesap kimliği tutulmaz. Bellekte üretilen sayfa oturumu kimliğinin özeti, olay, bölüm, dil ve zaman tutulur. İzin çerezi 180 gün içindir. Tercih geri alındığında yeni ölçüm durur; rehber yanıtları kaydedilmez. İçerik ölçümü ana sayfadaki işaretli alanlarla sınırlıdır; özel başvuru ve rezervasyon sayfaları takip edilmez.

Haftalık tahmin: en az 40 gerçek talep ve 10 tamamlanmış haftanın en az 8’inde talep gerekir. Bu eşikler geçici ürün kurallarıdır. Önce 5–8. haftalarda dört haftalık ortalama ile önceki hafta yöntemi karşılaştırılır; seçilen yöntem 9–10. haftalarda ayrıca değerlendirilir. Son tamamlanmış verilerle içinde bulunulan tam UTC haftası için ön görüşme talebi tahmin edilir. İki test haftası güvenilirliği kanıtlamaz; geçmiş aralık güven aralığı değildir. Şu anda gerçek talep verisiyle doğrulanmış bir tahmin sonucu yoktur.

## Doğrulama ve erişim sonucu

**27 otomatik işlev testi geçti.** Gerçek yerel SQLite kayıtları ve derlenmiş Worker ile: üç dil, rezervasyon/iptal, aynı saate çift kayıt, kullanıcı ve yönetici erişimi, değişmiş mesaj sürümü, başvuru sahipliği, analiz izni ve test dışlama, ödeme tutarı/imza/tekrar işleme, e-posta hata tekrarı ve geçersiz onay durdurma, saat dilimi ve tahmin ayrımı kontrol edildi. Sağlayıcı çağrıları testlerde taklit edildi; gerçek kart veya alıcı kullanılmadı.

Tarayıcı için yalıtılmış önizleme sunucusu hazırlandı ve çalıştı. Tarayıcı ilk erişimde bağlantı hatası, ardından URL politikası engeli bildirdi. Politika için alternatif erişim yolu denenmedi. **Masaüstü/mobil görsel test, klavye ile uçtan uca test, ekran okuyucu ve gerçek cihaz kontrolü tamamlanmadı.** Kod incelemesi bunların yerine geçmiş sayılmaz.

Malwarebytes, verilen eski Vercel bağlantısı için **unknown** döndürdü. Bu bir uygulama güvenlik taraması veya güvenli olduğuna dair sertifika değildir. Exa resmî kaynak araştırmasında, Wix mevcut hesap bağlamını kontrol etmekte kullanıldı. Adobe, Canva, Figma, Lovable ve WebsitePublisher üzerinde yeni tasarım veya ikinci bir site üretilmedi; mevcut tasarım ve uygulama için gereksiz kopya oluşturulmadı.

## Gerçek kullanıma geçişte kalan işler

1. İşletme sahibi: resmî işletme adı/numarası, hizmet bölgesi, ulaşılabilir iletişim kanalı ve kullanılacak alan adı.
2. Hizmet sorumlusu: gerçek çalışanlar, kontrol ve eğitim yöntemi, ziyaret sınırları, yedek plan, şikâyet ve olay süreci.
3. Finans sorumlusu: ücretler, koşullar, iade ve vergi değerlendirmesi; Stripe hesabı ve sağlayıcı testleri.
4. İletişim sorumlusu: Resend hesabı, doğrulanmış gönderici alan adı; onaylı alıcıyla teslim testi. [Resend yeniden deneme belgesi](https://resend.com/docs/dashboard/emails/idempotency-keys) yalnızca teknik tekrar güvenliğini açıklar.
5. Teknik sorumlu: özel önizlemenin dışındaki müşteri giriş modeli ve Stripe webhook erişimi. [Stripe webhook belgesi](https://docs.stripe.com/webhooks) doğrulanmış bildirimlerin ödeme durumuna temel olmasını gerektiren uygulama tercihinin kaynağıdır. Mevcut özel adres haricî ödeme bildirimleri için uygun değildir.
6. Gizlilik ve kalite sorumlusu: gerçek işletmeye göre bilgi metinleri, veri işleyen sözleşmeleri, saklama ve hak başvurusu süreci, yedek geri yükleme denemesi ve kullanıcı testleri. Analiz silme işlemi hâlâ yönetimden başlatılır; otomatik zamanlanmış bakım kurulmuş değildir.

Gerçek e-posta gönderimi ve tahsilat kapalı kalır. Özel önizleme, kamuya açık işletme hizmetinin açıldığı anlamına gelmez. Bu kayıt hukuki uygunluk, siber güvenlik veya erişilebilirlik sertifikası değildir.

## Aşamalı karar kaydı

| Aşama | Karar / gerekçe | Durum |
|---|---|---|
| Discover | Aynı NAVIAR CARE kodu ve arşiv kimliğiyle devam | Doğrulandı |
| Define | Başvurunun kullanıcıya görünür takibini ve anlamlı sonraki adım ölçümünü önceliklendir | Uygulandı |
| Design | Açık durum dili, genişletilebilir metin ve mobil menü düzeltmesi | Uygulandı; görsel doğrulama bekliyor |
| Build | Korumalı başvuru okuma, hazırlık listesi, olay sınırları ve e-posta düzeltmesi | Tamamlandı |
| Validate | 27 yerel test; tarayıcı engeli ayrı kaydedildi | Yerel test başarılı |
| Launch | Mevcut özel hedef kitle; gerçek işlemler kapalı | İşletme ve sağlayıcı hazırlığı bekliyor |
| Measure | Önce gözlenen davranış, sonra ayrı değerlendirilen toplu tahmin | Gerçek pilot verisi bekliyor |
| Scale | Yeni platform veya gelişmiş tahmin kararını bakım kapasitesi ve gerçek pilot bulgularıyla yeniden ele al | Sonraki değerlendirme |

Önerilen ilk kullanıcı denemesi: yaşlı kullanıcı, yakını ve koordinatör rolleriyle hizmet seçimi, uygun saat bulunamaması, kayıt/iptal ve başvuru durumunu bulma görevleri. Süre, hata, yardım isteme ve anlama sorunları gözlenmeli; sonuçlar olmadan “10 saniyede başarı” veya dönüşüm artışı vaat edilmemeli.

Veri kalitesi notu: önceki sürümlerin canlı/test ayrımı bulunmayan analiz olayları silinmedi; yeni canlı veri işaretiyle yalnızca doğrulanmış canlı ölçüm bağlamındaki olaylar yönetim analizine alınır.

## Birleşen sürüm 2.3

Teslim öncesinde aynı projeye eklenmiş hizmet ayrıntıları, mevcut SVG logo, ücret kontrol listesi, açık test rezervasyonu metinleri ve hizmet seçimini dil bağlantısında koruma iyileştirmeleri bulundu. Bunlar korunarak bu kayıttaki başvuru ve analiz geliştirmeleriyle birleştirildi. İki yerel test sunucusu yerine mevcut Vite test düzeni korundu. Sonuç birleşen 2.3 sürümüdür; bu belgenin dosya adı ilk geliştirme kaydının kimliğini korur. Tarayıcı erişim engeli devam eden bir doğrulama sınırıdır.
