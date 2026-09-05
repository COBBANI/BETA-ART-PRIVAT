# NAVIAR CARE — Web Design Platform Studio uygulama örneği

**Proje:** NAVIAR CARE 1 · **Arşiv:** NAVIAR-CARE-001-WEB-01 · **Kaynak:** SRC-03  
**Tarih / kaynak kontrolü:** 5 Eylül 2026  
**Çalışma:** Platform değerlendirmesi → hizmet yolculuğu → tasarım ve kod → doğrulama → özel yayın.  
**Durum:** Son inceleme sürümü 4 yayımlandı. Ticari hizmet açılışı tamamlanmadı.

**Güncel teslim ve kabul durumu Bölüm 10’dadır.** Bölüm 1–9, önceki çalışma ve sürüm 3 kaydını korur.

## 1. Gerçekçi örnek kullanıcı isteği

> “NAVIAR CARE’in mevcut Norveççe, İngilizce ve Türkçe sitesini incele. Figma, Wix Studio, Webflow, Framer ve özel geliştirmeyi ihtiyaçlarıma göre karşılaştır. Gereksiz taşımadan kaçın. Yaşlı bir kişinin veya yakınının yardım talep ettiği akışı sadeleştir; ödemeyi ve bilgi paylaşım yetkisini ayır. Hata durumlarını, mobil erişimi ve dil değişimini iyileştir. Çalışan özel sürümü, doğrulama sonuçlarını ve karar kaydını teslim et.”

Örnek, bu projede daha önce verilen yetkilere ve hizmet ilkelerine dayanır. Yeni bir ticari hizmet, satıcı hesabı veya dışarıya mesaj gönderimi başlatılmadı.

## 2. Mevcut durum ve gereksinimler

| Konu | Doğrulanan durum / çalışma varsayımı |
| --- | --- |
| Kitle | Evinde yaşamak isteyen yaşlılar; yakınları; yardımcı adayları; operasyon sorumlusu |
| Hizmet | Günlük pratik ve sosyal destek; tıbbi hizmet taahhüdü yok |
| İncelenen sürüm | naviar-care-src03.andersen-betul.chatgpt.site; mevcut SRC-03 projesi |
| Kaynak | Git deposu kurtarıldı. Başlangıç revizyonu aa4db7b852bff9b841f9847391cecf55d050fee6 |
| Uygulama | React 19 / Vinext; Cloudflare Worker; D1; mevcut NB, EN ve TR rotaları |
| İş kuralları | Hesaba ait kayıtlar, ayrı alıcı onayı, test teklifleri, çakışma kontrolü, olay kayıtları |
| Entegrasyon | Ortamda yalnızca operasyon e-postası değişkeni kayıtlı. Stripe ve Resend bağlantı değişkenleri yok. Gizli değer okunmadı |
| Editör / bakım | Kullanıcı içerik sahibi; teknik bakım sorumlusu ve süreklilik bütçesi henüz belirlenmemiş |
| Bütçe | Yeni abonelik veya taşıma bütçesi verilmemiş. Bu örnekte yeni ücretli hizmet satın alınmadı |
| Taşınabilirlik | Kaynak Git'te; veri, kimlik ve barındırma katmanlarının taşınması ayrı çalışma gerektirir |

Mevcut Vercel adresleri bu çalışmada değiştirilmedi. Önceki belgelerdeki Vercel erişim sorunu yeniden başarıyla çözülmüş gibi sunulmaz.

## 3. Platform karşılaştırması

Bu tablo genel kalite sıralaması değildir. “Uygunluk” sütunu bu projeye ilişkin tasarım ve mühendislik değerlendirmesidir.

| Seçenek | Güncel birincil kaynak bulgusu | NAVIAR CARE için değerlendirme |
| --- | --- | --- |
| Figma Design / Figma Sites | Figma Sites duyarlı web yayını ve CMS sunuyor; Figma Design'dan tasarım aktarımı mümkün. Sites beta erişimi Full seat ile listeleniyor. [Sites](https://www.figma.com/sites/), [planlar](https://www.figma.com/pricing/) | Figma'yı yalnızca prototip aracı saymak güncel değil. Ancak NAVIAR CARE'in alıcı yetkileri ve operasyon akışlarının hazır karşılığı bu araştırmada doğrulanmadı. Ayrı bir tasarım dosyası bu küçük değişikliği tamamlamak için gerekli görülmedi. |
| Wix Studio + Bookings | Wix Bookings randevu, takvim, çalışan ve müşteri yönetimi ile ödeme ve hatırlatma özelliklerini açıklıyor. Norveç listesinde Stripe ve Vipps var. [Bookings](https://www.wix.com/app-market/bookings), [ülke bazında ödeme](https://support.wix.com/en/article/available-payment-providers-in-your-country) | Basit bir hizmet işletmesinin görsel düzenleme ve rezervasyon ihtiyacına güçlü aday. Ödeyen/alıcı yetki ayrımı, görev yetkinliği ve özel olay işleyişi ayrıca kanıtlanmalı. NB/EN/TR rezervasyon ve işlem e-postalarının bütün kapsamı bu turda doğrulanamadı; ilgili yardım sayfaları erişilemedi. |
| Webflow | Yerelleştirme; içerik, sayfa ve SEO seçenekleri sunuyor. Kod dışa aktarımı yerelleştirilmiş sayfaları, CMS/ödeme işlevlerini ve form işleyişini bütünüyle taşımıyor. [Yerelleştirme](https://webflow.com/feature/localize), [kod dışa aktarımı](https://help.webflow.com/hc/en-us/articles/33961386739347-How-do-I-export-my-Webflow-site-code) | Zengin hizmet anlatımı ve editoryal içerik için aday. Mevcut hizmet uygulamasını sadece dışa aktarılan dosyalarla yeniden kurabileceğimiz varsayımı yanlış olur. İşlemsel katman ayrıca tasarlanmalı. |
| Framer | Fiyat sayfasında yerelleştirme ek paketi var. Dışa aktarma hakkında iki resmî sayfa birbiriyle çelişiyor: biri yayımlanan dosyaların taşınabileceğini, diğeri bağımsız HTML dışa aktarımının sunulmadığını söylüyor. [Fiyatlar](https://www.framer.com/pricing), [veri taşıma](https://www.framer.com/help/articles/porting-your-data-from-framer/), [HTML dışa aktarma](https://www.framer.com/help/articles/can-i-export-my-website-to-html-and-self-host-it/) | Pazarlama sitesi tasarımında aday. Taşınabilirlik garantisi verilmedi; satın alma veya geçiş öncesinde bu çelişki sağlayıcıyla netleştirilmeli. Mevcut iş akışı ayrıca bir uygulama gerektirir. |
| Mevcut özel uygulama | Kod ve mevcut kabul testleri incelendi. Sunucu tarafında sahiplik ve alıcı onayı sınırları, zaman tutma, test ödeme ve bildirim bağdaştırıcıları var. | **Bu örnek için seçildi.** Mevcut kayıt ve kurallar korunurken somut kullanıcı akışı geliştirilebiliyor. Bedeli: sürekli teknik bakım, operasyon ve güvenlik sorumluluğu gerekir. |

**Fiyat doğrulamasının sınırı:** 5 Eylül 2026 tarihinde [Wix Studio plan sayfası](https://www.wix.com/studio/plans) okunabilir fiyat vermedi. Figma'da Professional Full seat için 16 USD/ay değeri görüldü; aylık/yıllık seçim koşulu ayrıca teyit edilmeli. [Webflow](https://webflow.com/pricing) Basic için yıllık faturalamada 15 USD/ay, Premium için 25 USD/ay gösteriyor; yerelleştirme/işlemsel kapsam dahil toplam maliyet değildir. Framer ek diller için dil başına 20 USD/ay gösteriyor; vergi ve ödeme dönemi koşulları var. Bunlar teklif veya NAVIAR CARE toplam bütçesi değildir. Seçilen mevcut uygulamanın barındırma, sağlayıcı ve bakım maliyeti hesap ekstresi üzerinden ayrıca belirlenmeli.

**Taşıma kararı:** Bu turda taşıma yok. Bir geçiş ileride gerekirse URL/301 yönlendirme haritası, üç dilin içerik aktarımı, hesap kimlikleri, veri taşınması, ödeme referansları, çift rezervasyonu önleme ve geri dönüş planı birlikte ele alınmalı. Eski bağlantıların yeni platformda kendiliğinden çalışacağı varsayılmamalı.

## 4. Hizmet yolculuğu ve tasarım

| Adım | Kullanıcının sorusu | Tasarım / davranış |
| --- | --- | --- |
| Hizmeti bul | Ne tür destek alabilirim? | Mevcut altı hizmet, kısa açıklamalar ve doğrudan talep bağlantısı korundu |
| Zaman seç | Ne zaman, ne kadar süre? | Oslo yerel saati; ileri tarih doğrulaması; zamanın tercih olduğu açıklaması |
| Kişi ve tercih | Kim yardım alacak, aile ne görecek? | Kendi adına / başkası adına seçim; paylaşım tercihi; başkası adına onay engeli |
| Gözden geçir | Tam olarak ne göndereceğim? | Hizmet, tarih/süre, test adı, posta kodu ve paylaşım tercihinin görünür özeti; doğrudan düzenleme |
| Talebi kaydet | Randevu kesinleşti mi? | Test kaydı ve randevu ayrımı; şimdi 0 NOK; gerçek görevlendirme yok |
| Sonrası | Nereden değiştiririm? | Taleplerim bağlantısı, iptal/değişiklik açıklaması; otomatik e-posta gönderilmediği açık |

Görsel yön: mevcut lacivert/petrol marka, geniş boşluk ve okunabilir kontroller korunarak talep akışı belirginleştirildi. Dört adımlı gezinme ve inceleme grupları eklendi. Tasarımda sahte yardımcı, puan, müşteri yorumu veya güvenlik rozeti yaratılmadı.

**Kodlanan değişiklikler:**

- Alanlara özel üç dilli hata metinleri; hataların özeti ve ilgili alana giden bağlantılar.
- Hata özetine ve yeni adım başlığına odak yönetimi; `aria-invalid`, `aria-describedby`, adım durumu ve form semantiği.
- Özette hizmet, zaman, kişi ve tercih için düzenleme bağlantıları; düzenleme sonrası özete dönüş.
- Dil değiştirildiğinde ilk URL hizmetinin kullanıcının yeni seçimini sıfırlamasına neden olan etkinin ayrılması.
- Aile sayfası, form ve hesap ekranında paylaşımın bu sürümde erişim açmadığının belirtilmesi.
- Başkası için talepte alıcı onayının bekleneceği ve başka hesaptan onayın henüz açılamadığı açıklaması.
- Mobil menüde Taleplerim; mobilde de görülebilen yardımcı bilgi bölümü; esneyen düğmeler ve uzun metinler.
- Otomatik e-posta yok ifadesi ve taslağın sayfa kapatılınca saklanmadığı açıklaması.
- Tarayıcı testinde görülen `crypto.randomUUID` hatası için güçlü rastgele baytlar kullanan uyumlu kimlik üretimi. MDN `randomUUID` için güvenli bağlam gerekliliğini, `getRandomValues` için güvenli olmayan bağlam desteğini açıklıyor. [randomUUID](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID), [getRandomValues](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues)
- Beyaz üstündeki altın odak renginin karşıtlığı 2,97:1'den 4,42:1'e çıkarıldı.

26 yeni ortak metin anahtarı eklendi; ortak sözlük 282 anahtara ulaştı. Her anahtarın NB/EN/TR karşılığı var. Hizmet ve e-posta katalogları bu anahtar sayısına dahil değildir.

## 5. Sürüm 3 test sonuçları ve sınırları (önceki kayıt)

| Kontrol | Sonuç | Kanıt / sınır |
| --- | --- | --- |
| TypeScript | Geçti | Son kaynak üzerinde `tsc --noEmit` |
| Üretim derlemesi | Geçti | Vinext Worker, istemci ve sunucu çıktıları |
| 25 mevcut kabul senaryosu | Geçti | `npm run test:care`; geçici SQLite ve sentetik sağlayıcı yanıtları. Gerçek Stripe/Resend işlemi değil |
| 36 dil/sayfa üretimi | Geçti | `node scripts/verify-studio.mjs`; tek h1, demo uyarısı, yerel bağlantı haritası, eksik içerik kontrolü |
| 282 çeviri anahtarı | Geçti | Her anahtar için dolu üç dil dizisi; insan dil/kullanılabilirlik testi değil |
| Seçilen renkler | Geçti | Ana metin 12,45:1; ana düğme 9,08:1; ikincil metin 5,95:1; alan hatası 8,16:1; hata özeti 8,54:1; odak/beyaz 4,42:1 |
| Masaüstü tarayıcı | Kısmi | Ana sayfa görseli ve yeni ilk talep adımının DOM'u görüldü. Açılışta kimlik üretimi hatası saptanıp kodu düzeltildi |
| Formun tarayıcıda uçtan uca kaydı | Tamamlanmadı | Ortak test önizlemesi iki denemede başka projelere geçti. Son düzeltme tarayıcıda yeniden doğrulanamadı |
| Mobil / klavye / ekran okuyucu | Tamamlanmadı | Duyarlı stiller ve odak mantığı kodlandı; gerçek etkileşim ve yardımcı teknoloji testleri bekliyor |
| Gerçek ödeme / e-posta teslimi | Çalıştırılmadı | Sağlayıcı hesap bağlantıları yok; dışarıya mesaj veya gerçek tahsilat yok |

Renk ölçümleri bütün durum ve arka planları kapsamaz. Tam WCAG, güvenlik veya hukuki uygunluk iddia edilmez. Eski demo uyarısı ana sayfa ekran görüntüsünde görüldü; bu ekran görüntüsü son talep akışının başarılı testi olarak kullanılmaz.

## 6. Entegrasyon ve ölçüm durumu

Rezervasyon test kaydıdır. Gerçek yardımcı takvimi, bağımsız alıcı/aile hesabı, kimlik/referans/eğitim kontrolleri ve görevli destek operasyonu açılmış sayılmaz. Başkası adına kayıtta paylaşım kapalı ve durum alıcı onayı bekliyor olarak kalır.

Ödeme için mevcut test bağdaştırıcısı korundu; Stripe test anahtarı ve imzalı webhook yapılandırması yok. E-posta için şablon/önizleme kuyruğu var; gönderici ve Resend bağlantısı yok. Bu turda hiçbir alıcıya e-posta gönderilmedi.

Mevcut izinli içerik olayları ve gönüllü sonraki bilgi ihtiyacı formu korundu. Yeni izleyici eklenmedi. Kullanıcı davranışı sağlık, kırılganlık veya satın alma gücü hakkında çıkarıma dönüştürülmedi. Gerçek geçmiş veri bulunmadığından talep tahmini ve personel planı üretilmedi.

## 7. Karar ve değişiklik kaydı

| Aşama | Karar | Gerekçe / doğrulama |
| --- | --- | --- |
| Discover | Mevcut SRC-03 kaynak ve teslim belgesi esas alındı | Aynı isimli diğer NAVIAR projeleriyle karışmaması |
| Define | Bu turda özel uygulamayı sürdür | Var olan iş kurallarını taşımadan iyileştirebilmek |
| Design | Paylaşım tercihini mevcut erişimden açıkça ayır | Kullanıcı yanlışlıkla aileye bilgi verildiğini düşünmesin |
| Build | Talep akışı, hata/düzenleme, mobil menü, kimlik üretimi düzeltildi | Somut kod değişiklikleri |
| Validate | Otomatik ve tarayıcı kanıtlarını ayrı kaydet | 25 test ve 36 üretim kontrolü, tarayıcı akışının yerini tutmaz |
| Launch | Aynı özel inceleme adresini kullan | Ticari hizmet açılışı ve Vercel geçişi yok |
| Measure | Veri olmadan tahmin üretme | Mevcut ölçüm sınırları korundu |

## 8. Kullanıcının deneyebileceği kısa senaryo

1. Sitede Türkçe'yi seçip Yardım iste bağlantısını açın.
2. Seçim yapmadan Devam et'e basın; alan bağlantılı hata özetini kontrol edin.
3. Bir hizmet, gelecekte bir Oslo saati, test adı ve dört haneli posta kodu seçin.
4. Dil değiştirin; son hizmet ve diğer seçimlerin korunduğunu kontrol edin.
5. Özette Zamanı düzenle'ye basın; değiştirip özete dönün.
6. Kişi ve tercihleri düzenle'den Başkası için seçeneğini deneyin; paylaşım ve alıcı onayı açıklamasını okuyun.
7. Test onayını verip kaydı oluşturun. Randevunun kesinleşmediğini ve e-posta gönderilmediğini görün.
8. Taleplerim'den test kaydına gidin. Mobil menüde aynı bağlantıyı bulun.

Bunlar kullanıcı doğrulama adımlarıdır; tamamlanmış tarayıcı testleri gibi sunulmaz.

## 9. Sürüm 3 yayın kaydı (önceki kayıt)

Özel yayın doğrulandı: [NAVIAR CARE](https://naviar-care-src03.andersen-betul.chatgpt.site).

- Yayın durumu: succeeded; 2026-09-05T10:15:03.488045+00:00.
- Site sürümü: 3; ortam revizyonu: 1.
- Kaynak revizyonu: 4705f731b0b01dc9a489056428064d5d6fbaa7f0.
- Aynı kaynak revizyonunun üretim paketi kaydedildi ve yayımlandı.
- Erişim: yalnızca mevcut sahibi; genel erişime açılmadı.
- Tarayıcı test sınırı sürüyor; başarılı yayın sonucu, formun uçtan uca test edildiği anlamına gelmez.


## 10. Son inceleme sürümü — 5 Eylül 2026

### Teslim kararı

[NAVIAR CARE son sürüm](https://naviar-care-src03.andersen-betul.chatgpt.site) aynı özel adreste yayımlandı. Kullanıcının “FINISH THIS PROJEKT” talebi üzerine mevcut uygulamadaki hata kurtarma ve form erişimi düzeltildi; uygulanabilen doğrulamalar tamamlandı. **Bu teslim, test uygulamasının güncel sürümüdür. NAVIAR CARE’in gerçek müşterilere hizmet veren ticari operasyonu tamamlanmış veya açılmış değildir.**

Arşiv kodu NAVIAR-CARE-001-WEB-01 ve SRC-03 kaynağı korundu. Diğer NAVIAR projeleri ve eski Vercel adresleri değiştirilmedi.

### Son değişiklikler

- Tarayıcı yerel tercih kaydını engellese de rezervasyon ekranı çalışmaya devam eder. Analiz varsayılan olarak kapalıdır; izin geri alınabilir. Tercih yalnızca açık sayfada tutulabiliyorsa kullanıcıya açıklanır.
- İçerik etkileşimi, kullanıcı sonradan izin verdiğinde de ölçülebilir. Hesap, gizlilik, operasyon ve yardım talebi ayrıntıları içerik analitiğine dahil edilmez.
- Oturum açmanın sayfayı yenileyerek henüz gönderilmemiş form seçimlerini sıfırlayacağı formun başında açıklanır. Kullanıcı kaydetmek istiyorsa önce giriş yapabilir.
- Kayıt yükleme başarısızlığı artık boş hesap gibi gösterilmez. Yenileme açıklaması sunulur; kayıtların silindiği ileri sürülmez.
- Süresi/değişikliği uyuşmayan kayıt, geçersiz Oslo saati ve manuel inceleme gerektiren silme işlemleri için somut açıklamalar vardır.
- Ödeme bağlantısı yapılandırılmamışsa hesap ekranı bunu ödeme düğmesi yerine gösterir. İşletme ekranı veri kaydı bağlantısının tanımlı olup olmadığını da kullanır; bu gösterge hizmet sağlığı garantisi değildir.
- Tarih, saat, test adı ve posta kodunun erişilebilir adları sabitlendi. Hata ve yardımcı açıklamalar ayrı ilişkilendirilir.
- Oturum durumu için hem hesap kimliği hem hesap e-postası gerekir. Eksik kimlik başlıklarıyla kullanıcı giriş yapmış gibi gösterilmez.
- Önceki HTTP önizleme kimlik üretimi düzeltmesi dört adım boyunca yeniden denendi; aynı hata görülmedi.

### Güncel doğrulama kanıtı

| Kontrol | Sonuç | Kapsam / sınır |
| --- | --- | --- |
| Kabul senaryoları | 26/26 geçti | Kayıt kalıcılığı, hesaplar arası erişim, alıcı onayı, çakışma ve süreli teklif, iptal, yeniden zamanlama, dört olay türü, ödeme bildirimi, e-posta tekrarları, analitik ve durum uç noktası. Geçici SQLite ve sentetik sağlayıcı yanıtları kullanıldı. |
| Depolama engeli | Geçti | Tercih okuma/yazmada SecurityError benzetildi. Analiz kendiliğinden açılmadı; izin verme ve geri alma çalıştı. Bu bir otomatik modül kontrolüdür. |
| Dil ve sayfa üretimi | 36/36 geçti | Üç dil × 12 görünüm; ana başlık, mevcut içerik, test uyarısı ve bağlantı haritası kontrol edildi. |
| Ortak çeviri dizisi | 287 anahtar × 3 dil | Boş çeviri yok. Hizmet ve e-posta dizileri bu ortak anahtar sayısından ayrıdır. Bağımsız insan çeviri onayı değildir. |
| Tür kontrolü ve son derleme | Geçti | Son kaynak derlendi; yeni şema değişikliği veya veri taşıma yok. |
| Masaüstü form | Geçti, oturumsuz senaryo | Türkçe hizmet seçimi → tarih → örnek kişi → özet. Örnek: QA Test, 0150, 12 Ocak 2027 10:00 Oslo. |
| Hata yolu ve klavye | Geçti, seçili etkileşimler | Boş hizmet/tarih hataları; odak hata özetinde. Hata bağlantısıyla hizmet kontrolüne erişim, Space ile seçim ve tarih için klavye girişi. |
| Dil değişimi | Geçti | Türkçe özette İngilizce seçildi. Hizmet, tarih, saat, süre, örnek ad ve posta kodu korundu; HTML dili en oldu. |
| Özetten düzenleme | Geçti | Kişi düzenlemesinden “For someone else” seçilip özete dönüldü. Alıcı onayı ve paylaşım kontrolleri kaldırıldı; bekleyen onay açıklaması gösterildi. |
| Oturumsuz gönderim | Geçti | API giriş gerektirdi. Hata özeti odaklandı ve örnek bilgiler formda kaldı. Kalıcı yeni kayıt oluşturulmadı. |
| Mobil Türkçe rezervasyon | Geçti, seçili görünüm | 390 ve 320 piksel iframe genişliğinde ölçüm. İç alanlar 375 ve 305 piksel; scrollWidth aynı, yatay taşma yok. Menü açılıp kapandı; Taleplerim bağlantısı görünür. Görsel kontrol yapıldı. Gerçek telefon testi değildir. |
| Norveççe mobil ana sayfa | Tamamlanmadı | Bu kontrol sırasında ortak önizleme kapandı ve tarayıcı bağlantısı yanıt vermedi. Sonuç başarılı diye kaydedilmedi. |
| Oturumlu tarayıcı kaydı / yönetimi | Tamamlanmadı | Önizleme oturumsuzdu. Başarılı kalıcı kayıt, teklif, iptal ve yeniden zamanlama API kabul testlerinde doğrulandı; tarayıcıda giriş yapılarak tamamlandığı ileri sürülmez. |
| Ekran okuyucu / bütün cihazlar | Yapılmadı | Seçili klavye ve dar ekran kontrolleri tam erişilebilirlik uygunluk değerlendirmesi değildir. |
| Sağlayıcı işlemleri | Yapılmadı | Gerçek Stripe sandbox oturumu ve Resend teslimi çalıştırılmadı. Gerçek tahsilat veya e-posta yok. |

Seçili renk oranları önceki tabloda yer aldığı şekliyle yeniden geçti. Tarih alanı otomasyonun doğrudan doldurma yöntemiyle uygulama durumuna geçmedi; yerel tarih kontrolüne klavyeyle girilerek dört adım tamamlandı. Bu otomasyon sınırı gizlenmedi; uygulama doğrulamaları atlanmadı.

### Aynı uygulamada deneme sırası

1. Türkçe, Norsk veya English seçin. Kaydı saklamak için **formu doldurmadan önce** hesabınıza giriş yapın.
2. Yardım iste’den bir hizmet ve gelecekte geçerli Oslo saati seçin. Yalnızca örnek ad ve posta kodu kullanın.
3. Kendiniz için talepte kendi isteğinizi onaylayın. Başkası adına talep, bağımsız onay özelliği açılmadığından beklemede kalır.
4. Özette bilgi, tercih ve sıfır mevcut ödeme tutarını kontrol edin. Test kabulünü seçip kaydedin.
5. Taleplerim’den kaydı görün. Test kaydını iptal edebilir veya yeniden zamanlayabilirsiniz; ödeme başladıysa ilgili sınırlar geçerlidir.
6. Yetkili operasyon hesabıyla Operasyon ve ölçüm’den test kaynağı ve örnek fiyat teklifi oluşturulabilir. Aynı kaynakta çakışan saatler ve 15 dakikalık boşluk denetlenir. TEST-01 gerçek yardımcı değildir.
7. Taleplerim’den test teklifi onaylanabilir. Sağlayıcı bağlantısı olmadığı sürece ödeme alınmaz. E-posta önizlemesi operasyon kuyruğunda görülebilir.
8. Dört sorun türünden biri kaydedilebilir. Yetkili kişi dosyayı üstlenip incelendi kaydı ekler. Bu işaret anlaşmazlığı çözmez veya ücret iadesi yapmaz.

### Ticari açılış için açık kalan işler

Bu liste yalnızca hesap anahtarlarından oluşmaz; gerçek hizmet akışının tamamlanması da gerekir.

| Açık iş | Mevcut sınır | Sonraki tamamlanma kanıtı / sorumlu rol |
| --- | --- | --- |
| Müşteri ve alıcı hesapları | ChatGPT özel inceleme hesabı var; bağımsız alıcı onayı ve aile erişimi etkin değil | Ayrı kullanıcılarla davet, onay, ret, yetki geri alma, bildirim kesme ve ödeyen kişinin erişim sınırları. Ürün sahibi ve teknik sorumlu. |
| Gerçek rezervasyon ve ziyaret | TEST kaynakları var; gerçek yardımcı atama, ziyaret tamamlama ve yeniden eşleştirme yok | Doğrulanmış yardımcı takvimiyle deneme; gelmeme/kapı açılmama/kapsam değişikliği ve tamamlanma akışları. Operasyon sorumlusu. |
| Ödeme ve itiraz çözümü | Stripe test bağdaştırıcısı var; satıcı hesabı, sandbox bağlantısı, iade ve yardımcıya ödeme işletimi yok | Bağlı test hesabında ödeme, iptal, iade ve uyuşmazlık sonuçları; ardından yetkili işletmenin canlı kurulumu. Mali işler ve teknik sorumlu. |
| E-posta teslimi | Üç dilde şablon ve önizleme kuyruğu var; Resend ve doğrulanmış gönderici yok | Doğrulanmış alan adı/gönderici; yetkili test alıcısında teslim, geri dönen mesaj ve tekrar kontrolü. Alan adı ve iletişim sorumlusu. |
| Yardımcı doğrulaması ve destek | Başvuru kaydı var; kimlik, referans, eğitim, sigorta ve görevli destek doğrulanmadı | İş türüne uygun kontrol kanıtları, görevli kişi, yedek kişi ve hizmet saatleri. İşletme sahibi. |
| Ticari içerik ve hizmet koşulları | Pilot kapsamı, toplam fiyatlar, işletme iletişimi ve nihai koşullar kesinleşmedi | İşletmenin onayladığı bölge, kapsam, fiyat ve iletişim bilgileri; ilgili uzman incelemesi. İşletme sahibi. |
| Ölçüm ve talep tahmini | İzinli olaylar ve gönüllü geri bildirim var; gerçek tarihçe yok | Temsil edici veri ve karşılaştırmalı tahmin değerlendirmesi. Veri/operasyon sorumlusu. |
| Son kullanıcı kabulü | Seçili tarayıcı ve mobil kontroller tamamlandı; oturumlu uçtan uca tarayıcı kaydı ve kullanıcı denemesi eksik | Yaşlı kullanıcı ve yakınıyla anlaşılabilirlik, cihaz ve yardımcı teknoloji denemeleri; bulguların kapatılması. Ürün sahibi. |

Gizli API anahtarları veya şifreler sohbetten istenmedi. Eksik işletme bilgileri, çalışanlar, onaylar veya sağlayıcı bağlantıları uydurulmadı. Ticari açılış bu kanıtlar gelmeden tamamlandı sayılmaz.

### Sürüm 4 yayın kanıtı

- Sonuç: succeeded, 2026-09-05T15:35:17.996433+00:00.
- Adres: https://naviar-care-src03.andersen-betul.chatgpt.site
- Site sürümü: 4; ortam revizyonu: 1.
- Kaynak revizyonu: e5a5708994119b8c40d557132598b8c09e97bbe7.
- Son kaynak gönderildi, o kaynaktan oluşturulan aynı paket kaydedildi ve yayımlandı.
- Ortamda yalnızca OPERATIONS_EMAIL tanımı bulunuyor. Gizli değeri açılmadı.
- Erişim aynı özel kapsamda kaldı. Ticari genel erişim açılmadı.
- Geçici mobil test sayfası yayın paketine dahil edilmedi.
