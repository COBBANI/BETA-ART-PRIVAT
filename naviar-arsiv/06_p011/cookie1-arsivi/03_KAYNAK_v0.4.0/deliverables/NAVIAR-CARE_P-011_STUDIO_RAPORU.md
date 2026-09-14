# NAVIAR CARE · P-011 — Web Design Platform Studio uygulaması

**Tarih:** 5 Eylül 2026 · **Sürüm:** 0.4.0 · **Durum:** Kaynak kod ve etkileşimli demo; canlı hizmet değil.

## 1. Gerçekçi örnek kullanıcı talebi

> NAVIAR CARE P-011, yaşlı kişiler ve yakınları için tıbbi olmayan günlük yaşam desteği geliştiriyor. Mevcut Norveççe, İngilizce ve Türkçe site için Figma, Wix Studio, Webflow, Framer ve özel geliştirmeyi karşılaştır. Mevcut yatırımı koruyan yaklaşımı seç. Hizmet seçimi, açık kapsam, fiyatın ne zaman açıklanacağı, başvuru, gözden geçirme, sonuç ve değişiklik yolculuğunu çalışır bir örnekte göster. E-posta, ödeme, analiz ve tahmini gerçek durumlarıyla belirt. Hata yolunu ve erişilebilirliği kontrol et; kaynakları ve karar kaydını teslim et.

Bu talep bu gösterim için hazırlanmıştır. Kullanıcının belirttiği bir bütçe, satın alma kararı veya yeni üretim yetkisi olarak yorumlanmaz.

## 2. Proje ve mevcut durum

| Başlık | Dayanak ve karar |
|---|---|
| Proje | NAVIAR CARE; mevcut ana arşiv kimliği P-011 korundu. |
| Hedef | Yaşlı kişiler için günlük destek; yakınların ayrı ve sınırlı katılımı. |
| Hizmet | Sohbet ve yürüyüş, küçük günlük işler, sınırları belirlenmiş dijital yardım. |
| Diller | Norveççe Bokmål, İngilizce, Türkçe. |
| Kaynak | Önceki `NAVIAR-CARE_P-011_COOKIE1_KAYNAK_v0.3.0.zip` geri alındı ve incelendi. |
| Teknik durum | Harici npm bağımlılığı olmayan Node 24 uygulaması; yerel SQLite, test sağlayıcı adaptörleri, statik çıktı. |
| Eski hedef URL | `https://beta-art-cookie1.vercel.app/`; bu çalışma o dağıtımın kaynak eşleşmesini doğrulamadı veya canlı sayfayı güncellemedi. |
| Editör ve bakım | İçerik sahibi ve teknik bakım sorumlusu henüz belirlenmedi. Kodun işletilmesi için teknik sorumluluk gerekiyor. |
| Bütçe | Kullanıcı bütçesi bilinmiyor. Yeni abonelik, satın alma veya taşıma yapılmadı. |
| Alan adı | Kullanılacak alan adı ve kayıt firması belirtilmedi; önceki konuşmada doğru Vercel projesine erişim de engelliydi. Bağlantı yapılmadı. |

## 3. Platform karşılaştırması

Kontrol tarihi **05.09.2026**. Aşağıdaki ürün özellikleri resmî kaynaklara; projeye uygunluk değerlendirmesi ise kaynak kod incelemesine dayanan mesleki yargıya dayanır. Evrensel bir “en iyi platform” sıralaması değildir.

| Seçenek | Doğrulanan özellik ve sınır | Bu proje için değerlendirme |
|---|---|---|
| Figma Design + Figma Sites | Figma Design tasarım/prototipleme aracıdır; Sites ayrıca duyarlı site yayımlayabilir ve özel alan adı bağlayabilir. Dolayısıyla Figma yalnızca çizim aracı olarak değerlendirilmedi. | Tasarım sistemi ve görsel iş birliği için uygun. Bu projenin başvuru, yetki, iptal ve sağlayıcı akışlarının Figma Sites üzerinde uçtan uca karşılanması bu çalışmada doğrulanmadı. |
| Wix Studio | Wix Bookings çevrim içi randevu ve ödeme sağlar; gerçek rezervasyon almak için ücretli plana yükseltme gerekir. Bokmål/Norveççe, İngilizce ve Türkçe desteklenir; rezervasyon formu metinleri elle çevrilmelidir. | Teknik olmayan içerik yöneticisi için güçlü alternatif. Mevcut özel akışın ve geçmiş verinin yeniden kurulması gerekir. |
| Webflow | Localize, sayfa ve CMS yerelleştirmesini destekler; yerel Ecommerce özellikleriyle yerelleştirme uyumlu değildir. Kod dışa aktarımı vardır. | İçerik ağırlıklı bir pazarlama sitesi için aday. Randevu/ödeme akışını üçüncü taraf çözümle tasarlamak gerekir; Ecommerce sınırı genel Stripe bağlantısını imkânsız kılar anlamına gelmez. |
| Framer | Dil ve yerelleştirilmiş yollar desteklenir. Yayımlanmış siteyi HTML paketi olarak dışa aktarıp kendi sunucunda barındırma desteklenmez. | Görsel tanıtım sayfası için aday. Kullanıcının kaynak kodu taşıma beklentisi ve özel operasyon akışları açısından ek bağımlılık getirir. |
| Mevcut özel geliştirme | Kod, üç dil, sunucu doğrulaması, yerel test veritabanı ve ödeme/e-posta adaptörleri dosyalarda mevcut. Vercel bir barındırma seçeneğidir; geliştirme yöntemi değildir. | **Bu gösterim için seçildi.** Mevcut yapının üzerine gözden geçirme ve bağımsız demo eklendi. Üretime uygun kalıcı veri, işletme hesapları ve teknik bakım hâlâ gerekir. |

Kaynaklar: [Figma Sites](https://www.figma.com/sites/), [Figma alan adı](https://help.figma.com/hc/en-us/articles/31414274019863-Manage-a-custom-domain-for-your-site), [Wix Bookings](https://support.wix.com/en/article/wix-bookings-about-wix-bookings), [Wix çeviri kapsamı](https://support.wix.com/en/article/wix-bookings-translating-your-site), [Webflow Localize sınırları](https://help.webflow.com/hc/en-us/articles/33961240752147-Webflow-Localize-overview), [Webflow dışa aktarım](https://help.webflow.com/hc/en-us/articles/33961386739347-How-do-I-export-my-Webflow-site-code), [Framer dil yolları](https://www.framer.com/updates/localized-page-paths), [Framer dışa aktarım sınırı](https://www.framer.com/help/articles/can-i-export-my-website-to-html-and-self-host-it/).

### Plan, ödeme ve maliyet kontrolü

Rakamlar erişilen resmî sayfalardaki USD göstergeleridir; Norveç'e özel teklif veya toplam işletme maliyeti değildir. Vergi, faturalama dönemi, işlem ücretleri, alan adı, posta ve bakım ayrıca değerlendirilir.

| Seçenek | Görülen maliyet/plan bilgisi | Kararı etkileyen nokta |
|---|---|---|
| Figma | Professional Full seat sayfası 16 USD/ay gösteriyor. | Sites özel alan adı yardım metni hâlâ 2025'e kadar ücretsiz beta bilgisi içeriyor. Bunu 2026 için ücretsiz barındırma garantisi olarak kullanmadım. |
| Wix Studio | Standard, yıllık abonelik gösteriminde 27 USD/ay; Bookings ve ödeme kullanan işletmeler için uygun plan olarak tanımlanıyor. | Norveç için nihai para birimi ve fiyat satın alma ekranında teyit edilmeli. |
| Webflow | Localize Essential, eklenen dil sayısına bağlı olarak 9 USD/ay gösteriyor. | Temel site planı ve işlem entegrasyonları toplam maliyete eklenir. |
| Framer | Dil eklentisi sayfada dil başına 20 USD/ay gösteriyor; özel alan adı için ücretli plan gerekir. | Ana plan ve gerekli ek diller birlikte değerlendirilir. |
| Özel kod + Vercel | Vercel Pro 20 USD/ay gösteriyor; kullanıma ve ek koltuklara bağlı ücretler var. | Bu ücret veritabanı, sağlayıcı işlemleri ve geliştirici bakımını karşılamaz. Bu projeyi Vercel Pro'ya geçirmedim. |

Kaynaklar: [Figma Professional](https://www.figma.com/professional/), [Figma beta alan adı koşulları](https://help.figma.com/hc/en-us/articles/31414274019863-Manage-a-custom-domain-for-your-site), [Wix Studio fiyat](https://www.wix.com/studio/plans), [Studio plan kapsamı](https://support.wix.com/en/article/wix-studio-upgrading-sites), [Webflow fiyat](https://webflow.com/pricing), [Framer fiyat](https://www.framer.com/pricing), [Vercel fiyat](https://vercel.com/pricing).

Wix'in resmî listesinde Norveç için Stripe, PayPal, Vipps ve Klarna gibi sağlayıcılar yer alıyor. **Wix Payments'ın Norveç'te kullanılabildiği sonucu çıkarılmadı.** Hesap kabulü, ürün türü, tekrarlayan ödeme ve gerçek para birimi ayrıca doğrulanmalıdır. [Norveç sağlayıcı listesi](https://support.wix.com/en/article/available-payment-providers-in-your-country)

### Seçim ve taşıma bedeli

Mevcut kodu geliştirmek, bu örnekte metinleri ve yerel test altyapısını korur. Wix'e geçiş, içerik transferi yanında başvuru alanlarının, randevu kurallarının, izin ayrımlarının, üç dilin ve sağlayıcı durumlarının yeniden sınanmasını gerektirir. Framer veya Webflow'a geçişte de özel uygulama hizmetleri ayrıca ele alınır. Gerçek bütçe ve bakım kapasitesi bilinmediği için üretim platformu kararı koşulludur.

Gelecekte geçiş seçilirse: önce doğru dağıtım/depo eşleşmesi ve mevcut yollar çıkarılır; sonra içerik ve veri haritası, yönlendirmeler, dil bağlantıları, gizli verilerin taşınması, kabul testleri ve geri alma planı hazırlanır. Kaynak koduna sahip olmak tek başına üretim taşınabilirliğini sağlamaz.

## 4. Tasarım ve hizmet yolculuğu

Mevcut koyu mavi ve yeşil kimlik korundu. Büyük başlıklarla sakin bir sayfa düzeni, daha okunur açıklamalar, 44 piksel dil düğmeleri, görünür klavye odağı ve mobil yerleşim kuralları kullanıldı. Yeni logo, müşteri yorumu, klinik garanti veya gerçek fiyat uydurulmadı.

| Aşama | Uygulanan davranış |
|---|---|
| Desteği bul | Üç hizmet kartı; seçilen kartın görünür ve erişilebilir adı güncellenir. |
| Kapsamı anla | Hizmet sınırları, yakınların yetkisi ve ödeme ile bilgi erişiminin ayrılığı açıklanır. |
| Fiyatı anla | Fiyatın anlaşmadan önce açıklanacağı; demo ücret almadığı belirtilir. |
| Bilgileri yaz | Kendi iletişim bilgileri, posta kodu, destek türü, ilk iletişim tarihi ve okundu onayı. |
| Hatayı düzelt | Seçilen dilde mesaj, hatalı alana odak ve alan ile hata arasında erişilebilir ilişki. |
| Gözden geçir | Gönderilecek bilgiler ve fiyat durumu özetlenir; kullanıcı düzenleyebilir veya gönderimi tamamlayabilir. |
| Sonucu gör | Talep ve kesin randevu ayrılır. Bağımsız demoda sonucun yalnızca tarayıcı belleğinde olduğu belirtilir. |
| Değiştir/iptal et | Gönderimden önce düzenleme; demo sonrasında durum sorgulama ve iptal. Gerçek yeniden planlama üretim için tamamlanmamıştır. |

Acil numaraları Helsenorge üzerinden kontrol edildi: 113 acil durum; 116 117 legevakt. Site günlük destek konseptidir. [Helsenorge](https://www.helsenorge.no/en/help-services-in-the-municipalities/out-of-hours-medical-service/)

## 5. Bu turda ne değişti?

- Gönderim öncesi özet ve düzenleme penceresi eklendi.
- Üç dilde doğrulama, yeni açıklamalar ve düğme metinleri eklendi; dil anahtarları eşleşiyor.
- Destek seçimlerinin erişilebilir adları ayrılaştırıldı; hatalı alana odak eklendi.
- Bazı küçük açıklamalar ve dokunma hedefleri büyütüldü.
- Tek HTML dosyasında örnek veri, talep, durum, iptal ve bir defalık bağlantı hatası gösterimi eklendi.
- Bağımsız demoda ağ bağlantıları içerik güvenliği ilkesiyle kapatıldı; form ve analiz gönderimi yapılmaz.
- Demo dil değişimi sayfayı yeniden yüklemeden çalışacak şekilde düzenlendi. Dil değişimi ve yenileme örnek verileri sıfırlar; bu davranış açıklanır.
- HTTP test ortamında `crypto.randomUUID` kullanımı nedeniyle oluşan durma hatası, `crypto.getRandomValues` temelli istek kimliğiyle giderildi. Sunucudaki güvenlik jetonları değiştirilmedi.

## 6. Doğrulama ve kanıt sınırı

**13 otomatik test geçti:** önceki 10 sistem testi ve 3 yeni yolculuk/demo testi. Yeni testler yanlış veri, imkânsız tarih, onaysız gönderim, yinelenen demo talebi, jeton denetimi, iptal, yeni oturumda sıfırlanma, hata sonrası yeniden deneme ve kapalı ödeme davranışını kapsar. Derleme ve JavaScript sözdizimi kontrolü tamamlandı.

| Kontrol | Sonuç |
|---|---|
| Tarayıcıda Norveççe sayfa ve demo | Açıldı; hizmetler, etiketler ve demo durumu görüldü. |
| Boş form | Norveççe ad hatası gösterildi; odak `name` alanına geçti. |
| Örnek veri → gözden geçirme | Hizmet, ad, e-posta, posta kodu, tarih ve fiyat durumu özetlendi. |
| Demo tamamlama ve iptal | `DEMO-001` üretildi; sunucuya gönderilmediği belirtildi; iptal durumu görüntülendi. |
| Masaüstü yatay taşma | Bir ölçümde pencere 1363 px, belge 1348 px; o durumda yatay taşma görülmedi. Tam görsel denetim değildir. |
| Son üç dil geçişi | Metin anahtarları ve çıktı otomatik doğrulandı. Son yerinde dil değiştirme düzenlemesi tarayıcıda tekrar doğrulanamadı. |
| Mobil, menü, klavye döngüsü, ekran okuyucu | Mobil test çerçevesi kaynakta hazır; tarayıcı önizlemesi başka NAVIAR sürümüne yöneldiği için tamamlanamadı. Geçti olarak raporlanmadı. |
| E-posta/ödeme | Sahte sağlayıcı yanıtlarıyla test; gerçek sağlayıcıya gönderim veya tahsilat yapılmadı. |
| Güvenlik/erişilebilirlik uygunluğu | Sertifika, kapsamlı sızma testi veya WCAG/GDPR uygunluk beyanı yok. |

Tarayıcıda gözlemlenen sonuçlar, sonraki dil başlatma düzenlemesinden önceki durum için kanıttır. Son dosya sözdizimi, derleme ve otomatik sistem testlerinden geçmiştir; son sürümün tüm tarayıcı akışlarını tamamlanmış saymamak gerekir.

## 7. Analiz, tahmin ve entegrasyonların gerçek durumu

Bağımsız demo analiz verisi göndermez. Kaynak uygulamada analiz isteğe bağlıdır; içerik bölümünde görünür kalma olayı metnin okunduğunu veya anlaşıldığını kanıtlamaz. Hizmet kartına tıklamaya göre sonraki adım göstermek, kişinin gelecekteki davranışını tahmin eden bir yapay zekâ modeli değildir.

Önceki talep tahmini kodu korunmuştur: en az 12 tamamlanmış hafta ve geçmiş haftalarda karşılaştırma gerekir; mevcut gerçek talep verisi yok. Kaynakta test edilen çıktı, doğrulanmış ticari talep tahmini değildir.

Rezervasyon: yerel test talebi ve insan değerlendirmesi altyapısı var; gerçek yardımcı takvimi ve hizmet kapasitesi bağlı değil. E-posta: kuyruk ve test adaptörü var; teslim alındığı doğrulanmış değil. Ödeme: test Checkout ve imza kontrolleri var; gerçek satıcı hesabı ve tahsilat etkin değil. Statik Vercel API'si kalıcı veri gereksinimi nedeniyle 503 döndürmeye devam eder.

## 8. Kısa karar kaydı ve sonraki adım

| Aşama | Karar | Gerekçe |
|---|---|---|
| Discover | P-011 ve v0.3.0 kaynak paketi korundu. | Başka NAVIAR projeleriyle yanlış birleştirmeyi önlemek. |
| Define | Tıbbi olmayan destek ve üç dil temel kapsam olarak tutuldu. | Bilinen hizmet konseptiyle tutarlılık. |
| Design | Gönderim öncesi özet, daha okunur açıklamalar ve belirgin demo. | Kullanıcının ne yaptığını ve sonraki adımı anlaması. |
| Build | Mevcut özel kod genişletildi; platform taşınmadı. | Yeniden kurma yükünü sınırlamak ve mevcut testleri korumak. |
| Validate | Geçen testler ve eksik tarayıcı kontrolleri ayrı kaydedildi. | Demo veya test kanıtını canlı hizmete genellememek. |
| Launch | Canlı dağıtım ve alan adı değişikliği yapılmadı. | Doğru proje erişimi ve alan adı bilgisi eksik; işlem sağlayıcıları da tamamlanmış değil. |

Önce son sürüm 320/390 px mobilde ve masaüstünde klavyeyle tamamlanmalı, ardından yaşlı kullanıcılar ve yakınlarıyla anlaşılabilirlik değerlendirilmeli. Canlıya geçiş için doğru depo/Vercel projesi, kullanılacak alan adı ve kayıt firması; ayrıca işletme kimliği, hizmet alanı, takvim, fiyat/iptal koşulları, kalıcı veri ve doğrulanmış sağlayıcı hesapları gerekir.

**Teslim:** `NAVIAR-CARE_P-011_STUDIO_DEMO.html`, `NAVIAR-CARE_P-011_STUDIO_KAYNAK_v0.4.0.zip`, bu rapor. Eski paket bu gösterimden ayrı tutulur.
