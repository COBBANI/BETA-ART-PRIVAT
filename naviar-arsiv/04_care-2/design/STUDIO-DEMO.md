# NAVIAR CARE 2 — Web Design Platform Studio uygulaması

Proje: **NAVIAR-CARE-002** · İnceleme tarihi: **5 Eylül 2026**

## Örnek kullanıcı isteği

“NAVIAR CARE 2, Norveç’te kişinin kendini rahat ifade ettiği dilde dijital doktor görüşmesine erişimini hedefliyor. Mevcut Norveççe, İngilizce ve Türkçe sitemi incele. Figma, Wix Studio, Webflow, Framer ve özel geliştirmeyi bakım, çok dillilik, randevu ve taşınabilirlik açısından karşılaştır. Uygun yaklaşımı seçip randevu deneyiminin çalışan bir demosunu hazırla. Dil, kapsam ve ücret anlaşılır olsun. Hata ve boş durumları da göster. Gerçek hasta, ödeme veya e-posta işlemi yapmadan test et; biten işleri ve sınırları açıkça teslim et.”

Bu örnek, mevcut projede bağımsız bir tasarım denemesidir. NAVIAR CARE 1’in günlük yaşam desteği hizmetiyle birleştirilmez. Yeni proje kimliği oluşturulmadı.

## 1. Discover / Mevcut durum ve kapsam

Kaynak incelemesi, mevcut uygulamada 27 dil sayfası; test rezervasyon API’si; e-posta taslakları; test ödeme adaptörü; izinli genel içerik ölçümü ve yönetim ekranı bulunduğunu doğruladı. HTML üretimi Python ile, sunucu tarafı Cloudflare uyumlu Worker ve D1 ile yürütülüyor. Mevcut özel Sites projesi ve kaynak deposu kullanıldı.

Bu çalışma için `dist/studio-demo/` altında bağımsız bir deneyim eklendi. Önceki rezervasyon sistemi, 27 sayfanın içeriği, veri tabanı şeması ve erişim ayarları değiştirilmedi. Canlı yayın güncellenmedi. Eski Vercel adresinde işlem yapılmadı.

Hedef kullanıcı: Norveç için tasarlanan hizmetin dilini, kapsamını ve sonraki adımını anlamak isteyen yetişkin ziyaretçi. Gerçek yaş uygunluğu veya klinik kabul kuralı bu demoda belirlenmez.

Bütçe, içerik düzenleme sorumlusu ve düzenli teknik bakım kapasitesi kesinleşmiş değil. Bu nedenle aşağıdaki seçim mevcut yatırımın korunmasına yöneliktir; nihai satın alma kararı veya toplam sahip olma maliyeti hesabı değildir.

## 2. Define / Platform kararı

**Seçim: mevcut özel uygulamayı koru, tasarım değişikliğini bağımsız bir demo ile doğrula.** Mevcut işlevleri taşımadan, kullanıcı akışını incelemeye açmak bu kapsamda daha az yeniden geliştirme gerektirir. Bu bir proje değerlendirmesidir; dünya sıralaması değildir. Temel bedeli, kaynak kodu ve entegrasyonlar için sürekli teknik bakım ihtiyacıdır.

| Aday | Doğrulanan özellik / kaynak | NAVIAR CARE 2 için değerlendirme ve açık konu |
|---|---|---|
| Figma Design + Figma Sites | Figma Sites duyarlı sayfalar tasarlamayı ve yayınlamayı destekler. Güncel fiyat sayfası Sites betasını Full seat kapsamına alır. [Figma Sites](https://www.figma.com/sites/), [planlar](https://www.figma.com/pricing/) | Tasarım sistemi ve düzenlenebilir ekranlar için değerli. Mevcut kimlik, takvim, ödeme ve klinik hizmet işleyişinin taşınması ayrıca doğrulanmalıdır. Bu turda Figma dosyası oluşturulmadı. |
| Wix Studio | Görsel geliştirme ve iş araçları; Wix Bookings tarafında takvim, personel planlama, ödeme ve iptal politikaları sunuluyor. [Wix Studio](https://www.wix.com/studio), [Wix Bookings](https://www.wix.com/scheduling-software) | Teknik olmayan içerik yönetimi için aday. NAVIAR’ın üç dildeki tüm işlem mesajlarının kapsamı, ülkeye göre ödeme sağlayıcısı, dışa aktarım sınırları ve gerekli ücretli plan bu oturumda kesinleşmedi. Mevcut uygulamanın yerine doğrudan geçirilmedi. |
| Webflow | Kod dışa aktarımı ücretli Workspace planlarıyla sunulur; lokalize sayfa/içerik, CMS işlevleri ve form işleme dışa aktarıma dahil değildir. [Resmî dışa aktarım belgesi](https://help.webflow.com/hc/en-us/articles/33961386739347-How-do-I-export-my-Webflow-site-code) | Görsel içerik sitesi için aday. Üç dil ve bağımsız barındırma birlikte önemliyken dışa aktarım sınırı ilave taşıma işi yaratır. Mevcut sunucu akışları ayrıca kurulmalıdır. |
| Framer | Dil ve bölge uyarlaması sunulur. Güncel fiyat sayfası çeviri dillerini ek paket kapsamında listeler. [Yerelleştirme](https://www.framer.com/academy/lessons/localization), [fiyatlandırma](https://www.framer.com/pricing/) | Pazarlama yüzeyi için aday. NAVIAR’ın kalıcı rezervasyon, sahiplik ve ödeme akışlarının uyumu; ihracat/taşınabilirlik koşulları ayrıca incelenmelidir. Burada toplam maliyet veya klinik uygunluk iddiası yok. |
| Mevcut özel uygulama | Kaynak kodunda üç dil, Worker API’si, D1, e-posta taslakları ve test ödeme kontrolleri incelendi; mevcut 11 sunucu testi yeniden geçti. | Seçilen yol. Yeniden platform kurmayı gerektirmeden deneme yapılabilir. Bakım, operatör takibi ve gerçek sağlayıcı doğrulaması sürer. Kaynak taşınabilirliği, kimlik ve veri tabanı bağlantılarının hiç uyarlama olmadan taşınacağı anlamına gelmez. |

Kaynaklar 5 Eylül 2026’da açıldı. Wix’in ayrıntılı çok dillilik yardım sayfası alınamadı; bu nedenle Bookings’in bütün üç dil kapsamı doğrulandı denmedi. Fiyat sayfaları ülke, faturalama dönemi ve ek pakete göre değişebilir; herhangi bir abonelik satın alınmadı ve doğrulanmamış toplam fiyat yazılmadı.

Figma Design bir tasarım çalışma alanıdır; Figma Sites ayrıca yayın ürünüdür. Vercel ve bu projedeki Sites barındırma/yayın katmanıdır. Bir tasarım aracını bağlamak, klinik hizmet sağlayıcısını veya ödeme hesabını doğrulamaz.

## 3. Design / Hizmet ve ekran akışı

| Aşama | Ziyaretçinin yaptığı | Bu demoda sonuç | Gerçek hizmette doğrulanacak sorumluluk |
|---|---|---|---|
| Anlama | Hizmet kapsamı ve ücret bilgisini okur. | Ücretin belirlenmediğini, video görüşmenin planlanan hizmet olduğunu görür. | Klinik kapsamı ve toplam fiyatı onaylayan işletmeci. |
| Dil | Site dilini ve görüşme tercihini ayrı seçer. | Sayfa dili değişince örnek görüşme seçimi korunur. | Hekim dil yeterliği veya tercüman planlaması. |
| Saat | Örnek takvimden bir saat seçer. | Dolu saat seçilemez; boş gün açıklama verir. | Doğrulanmış gerçek takvim ve çakışma kontrolü. |
| Kontrol | Dil, gün, saat dilimi ve test tutarını gözden geçirir. | Eksik seçim ve test açıklaması için anlaşılır hata mesajı alır. | Uygunluk, hizmet şartları, iptal ve iade koşulları. |
| Örnek onay | Demo onayını açar. | Kalıcı randevu oluşturulmaz; durum sadece açık sayfada kalır. | Kimlik, gerçek rezervasyon ve doğrulanmış bildirim. |
| Sonuç | E-posta örneğini ve ödeme sonucu örneklerini inceler. | Gönderim veya tahsilat olmaz. | Teslimat doğrulaması, ödeme bildirimi ve hata çözümü. |

Tasarım, mevcut yeşil paleti, logo adayını ve temsili görseli kullanır. Masaüstünde hizmet özeti ve randevu bölümü yan yanadır. Mobil CSS, randevu kontrolünü öne alır. Site dili ile görüşme dili ayrılır; doktor bulunduğu veya belirli sürede yanıt alınacağı vaat edilmez. [Klarspråk yaklaşımı](https://sprakradet.no/klarsprak/) doğrultusunda kısa açıklama ve doğrudan eylem adları kullanıldı. İnsanlarla anlama testi henüz yapılmadı.

Yeniden kullanılabilir öğeler: dil düğmeleri, hizmet özeti, adım göstergesi, yerel select, radio saatleri, hata mesajı, kontrol özeti, onay kutusu, sonuç paneli, yerel dialog, FAQ ve acil yardım bağlantıları. Yeni sahte doktor profili, görüş, hasta öyküsü veya başarı oranı eklenmedi.

## 4. Build / Çalışan demo ve veri sınırları

- Türkçe, İngilizce ve Norveççe Bokmål: başlıklar, seçenekler, hata mesajları, onay ve e-posta önizlemesi çevrildi.
- 7–9 Eylül 2026 yalnızca örnek tarih; görünen saatler Europe/Oslo ve bu tarihlerde UTC+02:00. Bir örnek gün boş, bir örnek saat dolu.
- 100 NOK önceki uygulamayla tutarlı teknik test tutarıdır; gerçek muayene bedeli değildir. Başarılı ve başarısız ödeme butonları yalnızca yerel sonuç metnini değiştirir.
- E-posta bir diyalog içinde görüntülenir. Alıcı adresi girilmez, e-posta gönderilmez.
- Seçimler yalnızca sayfanın belleğinde bulunur. Sayfa yenilenince silinir. Site dilinin URL’de tutulması, görüşme tercihlerinin URL’ye eklenmesi anlamına gelmez.
- Yeni demo ağ isteği, çerez, localStorage, sessionStorage, reklam takibi veya analiz SDK’sı eklemez. Barındırma katmanındaki erişim günlüklerinin yokluğu iddia edilmez.
- Meta açıklaması ve HTML dili çevrilir. Demo `noindex,nofollow` olarak hazırlanmıştır. Bağımsız demo için uydurma canonical/hreflang adresleri yazılmadı; mevcut site rotaları korunur.

Norveç için acil durumda 113, fastlege erişilemiyorsa ve yardım bekleyemiyorsa 116 117 bağlantıları [Helsenorge açıklamasıyla](https://www.helsenorge.no/en/help-services-in-the-municipalities/out-of-hours-medical-service/) karşılaştırıldı. Demo klinik triyaj veya tıbbi öneri üretmez.

Mevcut ölçüm sistemi bu yeni demoya bağlanmadı. Gelecekte genel içeriğin anlaşılmasını değerlendirmek için izinli toplu ölçümler ve kullanıcı görev testleri kullanılabilir. Görünür süre, bir metnin okunduğunu veya anlaşıldığını kanıtlamaz. Görüşme dili, belirti veya sağlık ihtiyacından kişisel tahmin üretilmez. Kaynakta bulunan sekiz haftalık veri eşiği de kendi başına tahmin kalitesi kanıtı değildir; temsil ve hata değerlendirmesi gerekir.

## 5. Validate / Kanıt ve kalan testler

| Kontrol | Sonuç | Kanıtın sınırı |
|---|---|---|
| Mevcut sunucu testleri | 11/11 geçti. | Sağlayıcı çağrıları taklit edilir; gerçek e-posta veya Stripe teslimatı test edilmedi. |
| Mevcut katalog | 42 örnek profil, 113 dil ilişkisi ve 12 bilinen farklılık kontrolü geçti. | Gerçek hekim yetkisi veya dil yeterliği doğrulaması değildir. |
| Mevcut sayfalar ve yeni dosyalar | 27 dil sayfası ve uyumluluk/hata dosyaları kontrol edildi; yeni demo varlıkları ve kimlikleri doğrulandı. | Genel bağlantı ve kaynak kontrolü, görüntü kalitesi denetimi değildir. |
| Yeni istemci akışı | 3 dilde 33 durum kontrolü geçti. | Gerçek istemci betiği hafif DOM olay taklidinde çalıştırıldı. Tarayıcı yerleşimi, native dialog ve yardımcı teknoloji davranışını kanıtlamaz. |
| Hata/boş senaryoları | Saat seçmeden devam; dolu saat; boş gün; onay olmadan ilerleme; başarısız ödeme sonucu; yeniden başlatma kontrol edildi. | Simülasyonun sınırları içinde. |
| Çeviri ve veri yolları | Görünen metin anahtarlarının 3 dilde karşılığı var; betikte ağ ve kalıcı tarayıcı depolama çağrısı bulunmadı. | Klinik veya profesyonel çeviri onayı değildir. |
| Metin kontrastı | Dört ana metin/zemin çiftinde 11,13:1; 6,56:1; 11,69:1; 8,77:1 hesaplandı. | [W3C 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) eşiğiyle karşılaştırılan seçili çiftlerdir; tüm WCAG ölçütlerini kapsamaz. |
| Tarayıcı | Türkçe DOM açıldı ve ana içerik/kontrol yapısı görüldü. | Ortak önizleme başka projeye geçti. Yeni demonun görsel, mobil ve tarayıcı etkileşim denetimi tamamlanamadı. Başka projeye ait ekran görüntüsü teslimden çıkarıldı. |
| Derleme | Mevcut üretim derlemesi geçti. | Gerçek hizmete veya canlı yayına geçildiği anlamına gelmez. |

Bekleyen doğrulamalar: 320 ve 390 piksel mobil görünüm, geniş masaüstü, %200 metin büyütme, gerçek klavye sırası ve odak dönüşü, ekran okuyucu, gerçek cihazlar, üç dilde görev bazlı anlama testi. [W3C reflow açıklaması](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) kontrol referansıdır. Tam erişilebilirlik uygunluğu beyanı verilmedi.

## 6. Launch / Karar kaydı ve sonraki adım

| Faz | Karar | Gerekçe |
|---|---|---|
| Discover | CARE 2 ayrı proje olarak korundu. | Doktor erişimi ile yaşlılara günlük destek farklı hizmet sorumlulukları taşır. |
| Define | Mevcut özel uygulamada devam. | Üç dil ve test altyapısını yeniden taşıma ihtiyacını azaltır. |
| Design | Site dili, görüşme dili ve gerçek dil kapasitesi ayrıldı. | Kullanıcının doğrulanmamış kapasiteyi hizmet vaadi sanmasını önler. |
| Build | Bağımsız, veri göndermeyen demo. | Gerçek sistemleri açmadan deneyim gözden geçirilebilir. |
| Validate | Sunucu/olay taklidi testleri ile tarayıcı testleri ayrı raporlandı. | Kanıtın kapsamı korunur; test sayısı hazır hizmet iddiasına dönüşmez. |
| Launch | Yeni çalışma kaydedilir; mevcut canlı yayın korunur. | Bu talep beceri örneği ve inceleme çalışmasıdır. |

META değerlendirmesi: projenin önceliği daha fazla araç bağlamak değil, tek bir doğrulanabilir hasta yolculuğudur. Tasarım, özel yayın ve çalışan klinik hizmet üç ayrı durum olarak izlenmelidir. Düzenlenebilir Figma dosyası yararlı olabilir; bu örneği tamamlamak için zorunlu değildir. Önceki Figma ekip seçimi açık konusunu çözmüş gibi gösterilmedi.

En yakın uygulama işi: bu demodaki dil/özeti küçük bir kullanıcı grubuyla doğrulayıp kabul edilen öğeleri mevcut giriş gerektiren rezervasyon ekranına taşımak. Ardından gerçek sağlayıcı, klinik sorumlu, dil kapasitesi, fiyat, güvenli görüşme/kayıt, veri sorumluluğu, bildirim ve ödeme entegrasyonları için ayrı açılış kanıtı gerekir. Bu liste hukuki veya klinik uygunluk belgesi değildir.
