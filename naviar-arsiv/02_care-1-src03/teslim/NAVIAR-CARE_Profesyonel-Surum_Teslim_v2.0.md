# NAVIAR CARE — Profesyonel web sürümü ve hizmet sistemi

**Belge:** NAVIAR-CARE-SRC03-DELIVERY-20260905  
**Tarih:** 5 Eylül 2026  
**Sürüm:** 2.0  
**Kapsam:** Evinde yaşamak isteyen yaşlılar için tıbbi olmayan, günlük pratik destek.  
**Durum:** Özel inceleme uygulaması; gerçek hizmet açılışı değildir.

**Yayımlanan özel sürüm:** [NAVIAR CARE](https://naviar-care-src03.andersen-betul.chatgpt.site)  
**Yayın doğrulaması:** 5 Eylül 2026 02:59 UTC; succeeded; sürüm 2; ortam revizyonu 1.

## 1. Sonuç ve kaynak

Norveççe Bokmål, İngilizce ve Türkçe içerik; yeniden tasarlanmış sayfalar; kalıcı talep kayıtları; hesap erişimi; iptal ve zaman değişikliği; sorun kayıtları; operasyon görünümü; Stripe test ödeme ve Resend e-posta bağdaştırıcıları; izinli içerik ölçümü ve talep tahmini için başlangıç modülü geliştirildi.

İlham kaynağı kullanıcının paylaştığı [SRC-03 web sitesi](https://beta-art-series1.vercel.app/) ve bu konuşmada verdiği sayfa metinleridir. İlk Vercel projesi okuması **403 Forbidden** döndü. İkinci kontrolde erişilebilen BET - ART takımının proje listesi boş döndü. Bu hesapta orijinal proje bulunamadı. Orijinal Vercel koduna erişildiği veya aynı adrese güncelleme yapıldığı iddia edilmez. SRC-01 ve SRC-02 ile kaynak kodu birleştirilmedi.

Kayıtlı inceleme projesi: `appgprj_6a9b750d3c1081918f3676dbc136bbe1`. Kaynak revizyonu: `aa4db7b852bff9b841f9847391cecf55d050fee6`. Git kaynağı ve derlenmiş yayın paketi aynı revizyona aittir.

Çalışma sırasında mevcut dizinde bağımsız kaynak değişiklikleri gözlendi. Çalışma `/workspace/sites/naviar-care-src03-review` içinde ayrıldı. Önceki şema ve migration korundu; yeni tablolar `care_` önekiyle eklendi. Yeni bir Site hesabı açılmadı. Kaynak kodu git üzerinden saklanır; bu belge ve içerik kataloğu NAVIAR CARE altında tutulur.

## 2. Gerçekte hangi sistemler hazır?

| Sistem | Yapılan iş | Doğrulama / kalan sınır |
| --- | --- | --- |
| Tasarım | Mevcut CARE logosu, lacivert ve petrol renkleri, geniş kontroller, mobil düzen, tek ana eylem, özgün temsili yaşam görseli | Tarayıcı üzerinde görsel/ekran okuyucu/200% yakınlaştırma denetimi yapılmadı; WCAG sertifikası iddia edilmez |
| Üç dil | 256 ortak metin anahtarı, 6 hizmetin başlık/açıklaması ve 2 e-posta metni; toplam 270 çeviri satırı | 36 dil-sayfa bileşimi sunucu render kontrolünden geçti; hedef kullanıcılarla dil testi yapılmadı |
| Talep / takvim | Dört adım, kalıcı kayıt; test kaynağı için atomik zaman ayırma, çakışma kontrolü, 15 dakika ara, en fazla 24 saat teklif tutma | Test kaynağı gerçek yardımcı değildir; tekrarlayan ziyaret serisi ve gerçek yol süresi hesaplanmaz |
| İptal / değişiklik | Bekleyen veya ödeme başlatılmamış onaylı test kaydını iptal/değiştir; ayrılan zamanı bırak; eski fiyatı geçersiz kıl | Ödeme girişimi başladıktan sonra otomatik iptal kapanır; uyuşmazlık ayrıca değerlendirilir |
| Hesap / yetki | Sunucuda sahiplik kontrolü; başka hesabın kaydını gizleme; özel yönetici izin listesi | İnceleme sürümü ChatGPT girişini kullanır; müşteriye açık kimlik sistemi kurulmadı |
| Yakınların yetkileri | Başkası için talep “mottakerens samtykke” aşamasında kalır; ödeme bilgi erişimi açmaz | Gerçek alıcı daveti, temsil yetkisi ve aile hesabı bağlantısı etkin değil |
| Yardımcı başvurusu | Kalıcı başvuru; yaş beyanı, posta kodu ve iş tercihleri | Başvuru “unverified” kalır; eID, SMS, referans ve eğitim doğrulaması yapılmaz |
| Sorun yönetimi | Yardımcı gelmedi, kapı açılmadı, ek iş ve ödeme uyuşmazlığı için kalıcı kayıt; sorumlu rol; yetkili hesabın üstlenmesi; üstlenmeden incelemeyi kapatamama | Görevli destek ekibi yok; kayıt oluşturmak nöbetçiyi aramak değildir |
| Ödeme | Stripe barındırılan test Checkout, sunucu tutarı, paylaşım tercihinden bağımsız ödeme anahtarı, mevcut oturumu yeniden kullanma, imzalı webhook, tutar/para birimi/oturum eşleştirme | API anahtarı ve satıcı bağlantısı yok; gerçek para çekme, yardımcı ödemesi, escrow ve otomatik iade etkin değil |
| E-posta | Üç dilde işlem şablonu, yönetimden önizlenen kuyruk, tek gönderim kilidi, iki dakika bekleme, en çok üç deneme, 23 saat sonrası elle kontrol | Resend hesabı, gönderici alan adı ve yetkili test alıcısı tanımlı değil; e-posta gönderilmedi |
| Analiz | Açık izin, olay izin listesi, form ve sağlık verilerini dışlama, tekrarlanan olay kimliğini eleme, küçük grupları gizleme | Olay sayısı benzersiz kişi, okuma veya anlama kanıtı değildir |
| Sonraki bilgi ihtiyacı | Hizmete göre açıklanabilir güvenlik bağlantısı; dört içerik sayfasında gönüllü “bilgiyi buldunuz mu / sırada neyi öğrenmek istersiniz” formu | Sabit seçenekler; hesapla ilişkilendirilmez; az yanıtlı gruplar gösterilmez; anket talep tahmini değildir |
| Talep tahmini | Haftalık mevsimsel temel model ve dört haftalık gün ortalaması; zaman bazlı karşılaştırma | Gerçek veri yok; canlı tahmin veya personel planı üretilmedi |

## 3. Üç zorunlu ilkenin uygulamadaki karşılığı

**Ödeyen kişi otomatik yetkili değildir.** Talebi açan hesap, yardım alan kişi ve ödeme durumu ayrı alanlardır. Başkası adına açılan kayıtta paylaşım “none” kalır; alıcının onayı olmadığı için teklif oluşturulamaz. Paylaşım ayarını değiştirmek başka bir hesaba erişim vermez. Gerçek aile paylaşımı açılmadan önce doğrulanmış alıcı, belirli aile üyesi, paylaşım kapsamı, süre ve geri alma kaydı gerekir.

**Kimlik, güvenilirlik ve yetkinlik ayrıdır.** Başvuru otomatik onaylanmaz. SMS, eID, aranmış referans, eğitim ve iş bazlı yetkinlik ayrı kanıtlar gerektirir. Puan ve on başarılı görev yeterli güvenlik kanıtı olarak kullanılmaz. Yeni sürümde doğrulanmamış yardımcı profilleri veya sahte güvenlik rozetleri gösterilmez.

**Vaat, süreç ve sorumlu eşleşir.** Uygulamadaki vaka kaydı bir sorumlu role bağlanır. Yetkili kişi “Bu kaydı üstlen” ile hesabını kayda bağlar; incelemeyi ancak üstlenen kişi işaretleyebilir. Kimlik ve zaman kaydı sunucuda saklanır. “İncelendi”, uyuşmazlığın çözüldüğü veya para iadesi yapıldığı anlamına gelmez. Gerçek sorumlu kişi ve vardiya düzeni henüz belirlenmediğinden “24/7 destek”, “SOS ekibimiz geliyor” veya “90 dakikada kapınızdayız” denmez.

## 4. Dört istisna süreci

| Olay | Uygulamadaki hareket | İnsan süreci | Açılıştan önce atanacak kişi |
| --- | --- | --- | --- |
| Yardımcı gelmedi | Vaka açılır, kayıt incelemeye geçer; tamamlandı sayılmaz | İki tarafla görüşme, yeni zaman veya iptal | Operasyon koordinatörü |
| Kapı açılmadı | Vaka açılır; otomatik ziyaret başlatılmaz | Önceden kabul edilen iletişim planı, izinsiz girişten kaçınma, somut tehlikede acil yardım | Nöbet sorumlusu |
| Ek iş istendi | Ek iş için vaka; mevcut fiyat sessizce artırılmaz | İşin kapsamı, yetkinlik, süre ve yeni fiyat için yeniden onay | Operasyon koordinatörü |
| Ödeme tartışmalı | Kayıt incelemeye geçer; yeni Checkout engellenir; açık oturum için kapatma isteği | İki tarafı dinleme, tutarın değerlendirilmesi, belgeli iade kararı | Ödeme sorumlusu |

Oturum kapatma isteği, tamamlanmış bir ödemeyi geri almaz. Ödeme gerçekleşmişse imzalı bildirim ödeme kaydını günceller; iade ayrıca karar ve sağlayıcı işlemi gerektirir. Bu sürümde yardımcıya otomatik ödeme yapılmaz. Kapatma isteği başarısız olursa kalıcı bir yeniden deneme işi kalır; olay kaydı kaybolmaz. Tamamlanmış ödeme otomatik olarak “iptal edildi” sayılmaz.

## 5. Klarspråk ve üç dil

Metinlerde okuyucunun yapacağı işlem önce gelir. Cümleler kısa ve aktif tutuldu; bir başlık bir görevi anlatır. Gerçekleşmemiş güvenlik, coğrafi kapsam, telefon desteği ve süre garantileri çıkarıldı. “Forespørsel” ile “bekreftet avtale” ayrıldı. Bu yaklaşım [Språkrådet’in genel yazım önerileri](https://sprakradet.no/klarsprak/om-skriving/generelle-skriverad-bokmal/) ve [web metinleri rehberi](https://sprakradet.no/klarsprak/om-skriving/skriverad-for-ulike-teksttypar/) temel alınarak uygulandı.

| İşlev | Bokmål | English | Türkçe |
| --- | --- | --- | --- |
| Ana eylem | Be om hjelp | Request help | Yardım iste |
| Kayıt türü | Testforespørsel | Test request | Test talebi |
| Fiyat | Totalpris | Total price | Toplam fiyat |
| Alıcı onayı | Mottakerens samtykke | Recipient consent | Yardım alan kişinin onayı |
| Destek kapsamı | Praktisk hjelp | Practical help | Günlük pratik destek |

Dil değişimi form içindeki seçimleri korur. Tarih/para gösterimi yerelleştirilir. Saatler Europe/Oslo kullanır; yaz/kış saati geçişindeki olmayan veya iki anlama gelen saatler reddedilir. Her dil için sayfa başlığı ve hreflang tanımları vardır. İnceleme sayfaları arama motoru indekslemesine kapalıdır.

Geri bildirim formu, okuyucunun bilgiyi bulup bulmadığını ve sonraki bilgi ihtiyacını açıkça sorar. Bu, hedef kullanıcılarla yapılan anlama testi yerine geçmez. [Språkrådet’in kullanıcı testi rehberi](https://sprakradet.no/klarsprak/brukartesting-av-tekstar/) doğrultusunda sonraki dil doğrulaması, yaşlı kullanıcıların görevleri kendi sözleriyle açıklaması ve formu yardımsız tamamlaması üzerinden yapılmalıdır.

## 6. Araştırmadan alınan tasarım kararları

Bu örnekler bir “dünyanın en iyi sitesi” sıralaması değildir; ilgili birincil hizmet örnekleridir.

| Kaynak | Gözlenen yaklaşım | NAVIAR CARE kararı |
| --- | --- | --- |
| [Papa](https://www.papa.com/) ve [güvenlik yaklaşımı](https://www.papa.com/trust-and-safety-at-papa) | Günlük destek ve refakat; ziyaretin farklı aşamalarını kapsayan güvenlik | Hizmet türlerini sadeleştir, güvenliği tek rozete indirgeme |
| [Home Instead hizmet süreci](https://www.homeinstead.com/home-care-services/) | İhtiyacı anlama ve görüşme sonrası hizmeti netleştirme | Talebi kesin randevudan ayır; doğrulanmamış anında müsaitlik sunma |
| [Birdie Family App](https://www.birdie.care/product-features/family-app) | Aileye ziyaret bilgisi sunan ayrı görünüm | Aile görünümünü alıcının seçimine bağla; tıbbi takip özelliklerini bu konsepte taşıma |
| [NHS dijital erişilebilirlik](https://www.england.nhs.uk/long-read/digital-accessibility/) | Erişilebilir bilgi, anlaşılır metin ve farklı ihtiyaçları değerlendirme | Büyük kontroller, görünür odak, açık hata mesajları ve dil seçenekleri |

## 7. Ölçüm ve tahmin

| Olay | Amaç | Saklanan alanlar | Sınır |
| --- | --- | --- | --- |
| page_view | İçerik sayfalarının kullanımını görmek | Olay kimliği, izin sürümü, sayfa, dil, gün | Ziyaretçi kimliği veya form içeriği yok |
| content_engaged | Görünür sekmede 20 saniye ve sayfanın en az yarısına ulaşma sinyali | Aynı sınırlı alanlar | Gerçek okuma veya anlama değildir |
| service_view | Hangi hizmetten talebe geçildiğini görmek | İzin listesindeki hizmet kodu | Serbest metin kabul edilmez |
| booking_started | Talep akışına giriş sayısını görmek | Sayfa ve dil | Kimlik, adres veya sağlık verisi yok |
| Gönüllü geri bildirim | Bulunan bilgi ve sonraki açık bilgi ihtiyacı | Sayfa, dil, evet/hayır, izin listesinden konu, gün ve yanıt kimliği | Hesap, ad, e-posta ve serbest metin yok; 5 yanıt altı gizli |
| Kalıcı talep / ödeme kaydı | İşlemsel sonuç ve mutabakat | Yetkili hesap altında gerçek sunucu kaydı | Tarayıcı “başarılı” mesajına güvenilmez |

Analiz varsayılan olarak kapalıdır; kabul ve ret aynı düzeyde sunulur. Kullanıcı seçimini yeniden açabilir. Bu tercih [Datatilsynet’in çerez ve benzer teknolojiler rehberi](https://www.datatilsynet.no/personvern-pa-ulike-omrader/internett-og-apper/bruk-av-informasjonskapsler-og-andre-sporingsteknologier/) dikkate alınarak tasarlandı. Beşten küçük rapor grupları gizlenir. Analiz ve geri bildirim raporları son 90 günü gösterir. Daha eski kayıtlar yönetim ekranındaki bakım işlemiyle silinir; otomatik bakım zamanlaması henüz kurulmadı.

Tahminin hedefi, gelecek yedi günün toplam talep sayısıdır. Modül test verisini reddeder. En az 84 kesintisiz günlük gözlem tabanı ve 28 günlük geçmişe dönük test kullanır. Bu sayı bütün mevsimleri veya her hizmeti modellemek için yeterlilik garantisi değildir. Dört haftalık aynı gün ortalaması basit “geçen hafta” modelini geçmezse basit model seçilir. Hata aralığı sezgiseldir; istatistiksel güven aralığı değildir. Canlı karar öncesinde veri kapsamı, tatiller, bölge değişiklikleri ve tahmin hatası incelenmelidir.

## 8. Ödeme ve e-posta açılışı

Ödeme uygulaması [Stripe Checkout](https://docs.stripe.com/api/checkout/sessions/create), [imzalı webhook](https://docs.stripe.com/webhooks) ve [tekrar işlem kontrolü](https://docs.stripe.com/api/idempotent_requests) belgelerindeki sağlayıcı desenlerini kullanır. Yalnızca `sk_test_` anahtarı kabul edilir. Kart bilgisi Naviar formuna yazılmaz. Sunucu tutarı ile imzalı bildirim tutarı karşılaştırılır. Paylaşım ayarı değişse de aynı teklifin ödeme girişimi değişmez. Mevcut bağlantı [Checkout Session sorgusu](https://docs.stripe.com/api/checkout/sessions/retrieve) ile kontrol edilip yeniden kullanılır. Süresi dolmuş veya sonucu belirsiz ödeme bağlantısı yerine yeni tahsilat sessizce oluşturulmaz.

E-posta bağdaştırıcısı [Resend gönderim API’si](https://resend.com/docs/api-reference/emails/send-email) ve [24 saatlik tekrar anahtarı penceresi](https://resend.com/docs/dashboard/emails/idempotency-keys) temel alınarak yazıldı. Belirsiz bir gönderim sonsuza kadar yeniden denenmez. Adres, iş açıklaması ve sağlık bilgisi e-postaya eklenmez.

| Gereken | Nerede kullanılacak | Bu çalışmadaki durum |
| --- | --- | --- |
| Yetkili Vercel erişimi veya kaynak repo | Orijinal adresin güncellenmesi | İlk okuma 403; erişilen ikinci takımın proje listesi boş |
| Şirket / satıcı hesabı, para birimi, vergi ve onaylı fiyat | Gerçek ödeme | Sağlanmadı |
| Stripe test anahtarı ve webhook sırrı | Sağlayıcı sandbox doğrulaması | Sağlanmadı |
| Resend hesabı, doğrulanmış gönderici, SPF/DKIM/DMARC | İşlem e-postaları | Sağlanmadı |
| Açıkça yetkilendirilmiş test alıcısı | E-posta teslim testi | Sağlanmadı; kimseye e-posta gönderilmedi |
| Yardımcı ödemesi / komisyon / iade modeli | Marketplace ödeme akışı | Karar ve ek uygulama gerektirir |

Gizli anahtarlar sohbet metnine veya dosyalara yapıştırılmamalı; hesap bağlantısı veya güvenli ortam değişkeni üzerinden eklenmelidir.

## 9. Doğrulama kanıtı

- TypeScript kontrolü geçti.
- Derleme geçti; Worker ve istemci çıktısı üretildi.
- 36 dil/sayfa bileşiminde render, tek ana başlık ve tanımsız içerik kontrolü geçti.
- 25 kabul senaryosu geçti. Önceki 12 senaryonun kapsamı: tekrar talep, çapraz hesap erişimi, alıcı onayı, teklif/zaman değişikliği, dört vaka türü, sunucu yetkisi, analiz sınırları, yardımcı başvurusu, silme/indirme, Oslo saat geçişleri, tahmin tabanı ve ödeme imza/idempotency kontrolleri.
- Ek 13 senaryo: eşzamanlı çakışma; 15 dakika ara; aynı teklifi değiştirme yarışı; teklif süresi; onaylı ama ödenmemiş iptal; paylaşım sonrası aynı Checkout; belirsiz yanıt sonrası aynı ödeme anahtarı; 23 saat ödeme sınırı; ödeme sırasında olay bildirimi; vaka üstlenme; eşzamanlı e-posta; e-posta deneme sınırı; geri bildirim/gizleme/silme.
- Testler SQLite ve sentetik sağlayıcı cevapları kullandı. Bunlar gerçek Stripe/Resend sandbox teslim testi veya canlı müşteri işlemi değildir.
- Malwarebytes, SRC-03 URL kontrolünde **unknown** döndürdü. Zararlı veya temiz olduğu sonucuna varılamaz. Bu kontrol uygulama güvenlik testi değildir.
- Tarayıcı üzerinden görsel etkileşim, gerçek cihaz, ekran okuyucu, klavye yolculuğu ve performans ölçümü yapılmadı. Lighthouse puanı veya tam erişilebilirlik uygunluğu iddia edilmez.

## 10. Seçilen araçların kullanımı

| Araç / grup | Kullanım kararı |
| --- | --- |
| Exa | Birincil karşılaştırma ve klarspråk araştırması |
| Malwarebytes | URL itibar kontrolü; sonuç unknown |
| Vercel | İlk hedef okuması 403; erişilebilen takımda proje yok. Orijinal adres değiştirilmedi |
| Data Analytics / Sites | Mevcut özel çalışma alanı, kalıcı veri, ölçüm ve sürüm/yayın araçları |
| WebsitePublisher, Wix, Lovable | Aynı hizmet için yeni ve ayrı bir sistem kurulmadı; mevcut kaynakla paralel müşteri kayıtları yaratılmadı |
| Adobe, Canva, Figma | Yeni hesap veya tasarım dosyası açılmadı; mevcut CARE logo kaynağı yeniden kullanıldı. Bu araçlarda çalışma yapıldığı iddia edilmez |
| Image generation | Tek temsili yaşam görseli; gerçek müşteri veya yardımcı olarak sunulmaz |

Araçların hepsini bağlamak tek başına kalite sağlamaz. Şirket verisi, rezervasyon kaydı ve ödeme yetkisi için bir ana sistem korunur.

## 11. Canlı hizmet için sıralı açılış planı

1. **İşletme kararı:** Yasal şirket, hizmet bölgesi, gerçek fiyat, iptal koşulları, destek saatleri ve isimli sorumlular. Çıktı: onaylı hizmet kataloğu.
2. **Alıcı ve yardımcı yetkileri:** Bağımsız alıcı onayı, aile delegasyonu/geri alma, kimlik sağlayıcısı, referans araması, eğitim, yetkinlik kanıtı, sigorta. Çıktı: görev için yetkili yardımcı havuzu.
3. **Gerçek rezervasyon:** Yardımcı takvimi, bölge ve yol süresi, test sürümünde çalışan atomik çakışma kontrolünü gerçek yardımcıya bağlama, tekrar eden ziyaretler ve yardımcı değişikliği onayı. Çıktı: test edilmiş gerçek atama süreci.
4. **Ödeme ve e-posta:** Hesap bağlantısı, sandbox işlemi, imzalı bildirim, yetkili e-posta teslimi, iade/mutabakat ve bildirim hataları. Çıktı: sağlayıcıdan doğrulanmış test kanıtı.
5. **Saha operasyonu:** Dört istisna için vardiya, iletişim planı, görev başlangıç/bitiş onayı ve tatbikat. Çıktı: sorumlu kişi ve sınanmış olay akışı.
6. **Yayın doğrulaması:** Gerçek kullanıcılarla üç dil, klavye, ekran okuyucu, mobil ve erişim testleri; yedek/geri yükleme, bağımlılık güncelleme, hata izleme ve gizlilik incelemesi. Çıktı: kontrollü pilot kararı.
7. **Ölçüm:** Gerçek talep verisi biriktirme; dönemsel veri kontrolü ve tahmin kıyaslaması. Çıktı: hatası ölçülmüş, açıklanabilir personel planı desteği.

Bu sıralama, arayüzde görünen bir düğmeyle çalışır saha hizmetini birbirine karıştırmadan ilerlemek içindir.


## 12. Sürüm 2 takvim ve kuyruk kararları

- **Zaman kaydı:** Operasyon sorumlusu test fiyatını ve `TEST-01` gibi bir kaynak kodunu seçer. Kaynak üzerindeki tutulan/onaylı kayıtlar kontrol edilir; eşzamanlı iki istek aynı aralığı alamaz. Bu işlem D1 toplu işlemi içinde yürütülür. [Cloudflare D1 işlem belgeleri](https://developers.cloudflare.com/d1/worker-api/d1-database/).
- **Teklif süresi:** Son yanıt zamanı, tekliften 24 saat sonrası ile ziyaret başlangıcından erken olanıdır. Süre dolduğunda onay reddedilir; zaman başka talebe açılır. Eski teklif yeni yanıtla kendiliğinden canlanmaz.
- **Ziyaret arası:** Testte 15 dakika sabit ara kullanılır. Bu, Oslo'daki gerçek ulaşım süresinin doğrulandığı anlamına gelmez.
- **Bildirim:** Önizleme, gönderiliyor, başarısız, sağlayıcı kabul etti ve elle kontrol durumları vardır. “Sağlayıcı kabul etti”, teslim edildi veya okundu demek değildir. DNS, bounce/şikâyet webhooks ve gerçek alıcı bazlı izin sistemi açılıştan önce gerekir.
- **Ödeme durdurma:** Olay bildirimi sırasında açık Checkout varsa kapatma denenir. Sorun olursa yönetimde tekrar denenebilir iş kalır. Zaten gerçekleşmiş ödeme iade edilmiş sayılmaz.
- **Eski test kayıtları:** Önceki sürümde takvimsiz oluşturulmuş teklifler, zaman kaydı olmadan ödeme açamaz. Özel inceleme verisinde bu kayıtlar elle değerlendirilir. Eski veri otomatik silinmez.
- **İnsan gerektiren sınırlar:** Başkası adına onay; gerçek yardımcı atama; uyuşmazlık kararı ve iade; ulaşım, vardiya, acil iletişim ve görev başlangıç/bitiş doğrulaması halen açılış işidir.

## 13. Sürüm kaydı

- Kaynak: `aa4db7b852bff9b841f9847391cecf55d050fee6`
- Kayıtlı Site sürümü: 2
- Migration: `0002_numerous_oracle.sql`; önceki iki migration değiştirilmedi.
- Uygulama: [NAVIAR CARE](https://naviar-care-src03.andersen-betul.chatgpt.site)
- Yayın sonucu: **5 Eylül 2026 02:59 UTC — succeeded; ortam revizyonu 1.**
