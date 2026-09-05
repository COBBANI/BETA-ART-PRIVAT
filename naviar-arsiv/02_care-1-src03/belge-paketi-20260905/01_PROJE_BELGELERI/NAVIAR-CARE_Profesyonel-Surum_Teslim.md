# NAVIAR CARE / SRC-03 — Tamamlama ve konsept belgesi

**Belge:** NAVIAR-CARE-SRC03-DELIVERY-20260905  
**Güncelleme:** 5 Eylül 2026, 19:09 UTC  
**Uygulama sürümü:** 5  
**Sonuç:** Özel inceleme uygulaması tamamlandı ve yayımlandı. Gerçek müşteriye hizmet verme aşaması açık değildir.

[Siteyi aç](https://naviar-care-src03.andersen-betul.chatgpt.site/nb) · [English](https://naviar-care-src03.andersen-betul.chatgpt.site/en) · [Türkçe](https://naviar-care-src03.andersen-betul.chatgpt.site/tr)

Bu bölüm güncel durumu belirler. Aşağıda korunan sürüm 2 raporu tarihsel ayrıntıdır; oradaki sürüm ve test sayıları güncel kabul edilmemelidir.

## 1. Konsept ve hizmetin amacı

NAVIAR CARE, evinde yaşamaya devam etmek isteyen yaşlıların günlük işlerde destek almasını sağlayan tıbbi olmayan hizmet konseptidir. Yardım alan kişinin kendi kararını vermesi merkezdedir. Yakınlar talep başlatabilir ve gelecekte ödeme yapabilir; ödeme yapmak kişinin ziyaret bilgilerine erişim hakkı sağlamaz.

Ana ihtiyaç, alışveriş, dışarı çıkma, evde küçük işler veya telefon kullanımı için anlaşılır ve düzenli destek bulmaktır. NAVIAR CARE'in tasarım ilkesi, görev, zaman, toplam fiyat, yardımcının uygunluğu ve bilgi paylaşımının ziyaret öncesinde ayrı ayrı açıklanmasıdır. Aynı yardımcıyla devam etme isteği alınabilir; müsaitlik doğrulanmadan süreklilik garantisi verilmez.

Bu yaklaşımın marka açısından ayırt edici tarafı, kişinin özerkliğini hizmetin her adımına taşımasıdır: ne yapılacağını seçmek, fiyatı görmek, ziyareti onaylamak ve kimin hangi bilgiyi alacağını belirlemek. Dünyada ilk olduğu veya tescil güvencesi bulunduğu iddia edilmez.

### Hizmet kataloğu

| Hizmet | İçerik | Uygulamadaki durum |
|---|---|---|
| Alışveriş ve küçük işler | Market, posta ve yakın çevrede işler | Test talebi açılabilir |
| Sohbet ve arkadaşlık | Sohbet, sesli okuma, birlikte vakit | Test talebi açılabilir |
| Yürüyüş ve eşlik | Yürüyüşe veya randevuya eşlik | Test talebi açılabilir |
| Telefon ve tablet desteği | Görüntülü görüşme, fotoğraf, basit ayarlar | Test talebi açılabilir |
| Evde küçük işler | Hafif toparlama, bitki bakımı, kararlaştırılmış görevler | Test talebi açılabilir |
| Bahçe ve mevsimlik işler | Sulama, süpürme ve hafif dış işler | Test talebi açılabilir |

Tıbbi işlem, tanı, ilaç yönetimi ve acil yardım bu konsepte dahil değildir. Yardımcıya BankID, PIN veya banka kartı verilmez. Görev sınırı, güvenlik ve yetkinlik açısından uygun olmayan ek iş durdurulur; yeni kapsam ve ücret ayrıca kararlaştırılır.

Hizmet bölgesi ve gerçek fiyat listesi henüz doğrulanmadı. Oslo/Viken veya Alicante, aktif operasyon bölgesi olarak varsayılmadı. NAVIAR Consult'un işyeri danışmanlığı ve NAVIAR CARE 2'nin klinik konsepti bu kaynakla birleştirilmedi.

## 2. Üç tarafın yolculuğu

| Taraf | İnceleme sürümünde yaptığı işlem | Gerçek hizmete geçişte gereken |
|---|---|---|
| Yardım alan kişi | Destek, zaman, test adı, posta kodu ve tercih seçer; özeti kontrol eder; talebi kaydeder; kendi kayıtlarını görür | Doğrulanmış iletişim, hizmet adresi, uygun yardımcı, gerçek teklif ve hizmet koşulları |
| Yakını | Başkası için talep başlatabilir; kayıt alıcının onayını bekler | Alıcının bağımsız onayı, belirli yakına verilen yetki, kapsam/süre ve yetkiyi geri alma |
| Yardımcı | Tercihlerini belirterek test başvurusu yapar; başvuru doğrulanmamış kalır | Kimlik, referans, eğitim, göreve uygun beceri ve takvim doğrulaması |
| Operasyon | Yetkili hesapla talepleri inceler; test kaynağı ve tutar seçer; olay kaydını üstlenir | İsimli sorumlu, görev saatleri, gerçek yardımcı havuzu, bildirim ve saha takibi |

Talep akışı dört adımdır: destek → zaman → kişi ve tercihler → kontrol ve kayıt. “Talep kaydedildi” ifadesi “yardımcı atanmış randevu” anlamına gelmez. Giriş yapılmadan form denenebilir; kayıt için giriş gerekir. Form taslağı sayfa yenilenmesinden sonra saklanmaz; bu durum kullanıcıya açıklanır.

## 3. Tamamlanan uygulama

- Norveççe Bokmål, İngilizce ve Türkçe; her dilde 12 sayfa görünümü.
- 287 ortak metin anahtarı, 12 hizmet başlık/açıklama satırı ve 2 e-posta satırı: güncel içerik kataloğunda **301 çeviri satırı**.
- Hesaba bağlı kalıcı test talepleri, tekrar gönderimi ayıklama, iptal, zaman değişikliği ve veri indirme/silme.
- Test kaynağı için çakışmayı engelleyen zaman ayırma, en az 15 dakika ara ve en fazla 24 saat teklif tutma.
- Kullanıcılar arasında kayıt erişimini sınırlandırma; ayrı operasyon yetkisi.
- Yardımcı gelmedi, kapı açılmadı, ek iş ve ödeme itirazı için kalıcı olay kaydı.
- E-posta önizlemesi/kuyruğu ve Stripe test ödeme bağdaştırıcıları.
- İzne bağlı toplu içerik ölçümü ve gönüllü sabit seçenekli geri bildirim.
- Gerçek veri yokken sonuç üretmeyen talep tahmini başlangıç modülü.
- Mobil düzen, açıklamalı form hataları ve görünür odak tasarımı.

### Bu turda giderilen iki sorun

**Sayfanın ilk yüklenişindeki dil bilgisi:** İngilizce ve Türkçe sayfaların HTML dili başlangıçta “nb” geliyordu. Tarayıcı kodu çalıştıktan sonra düzelmesi, ilk yanıttaki hatayı ortadan kaldırmıyordu. Sunucu artık dili sayfa adresinden belirliyor. Üç dilin ana sayfası ve talep sayfası, tarayıcı kodu çalışmadan doğru dil bilgisi veriyor.

**Standart test kapsamı:** Eski genel test komutu başlangıç şablonuna ait kontrolleri çalıştırıyor, hizmet kabul testlerini kapsamıyordu. Yayın kontrolü artık hizmet kabul senaryolarını, dil/sayfa kontrollerini, saklama engeli durumundaki analiz tercihlerini ve derlenmiş sunucunun yönlendirme/erişim kontrollerini içeriyor.

Teknik gerekçe için 5 Eylül 2026 tarihinde [Next.js layout parametreleri](https://nextjs.org/docs/app/api-reference/file-conventions/layout) ve [headers arayüzü](https://nextjs.org/docs/app/api-reference/functions/headers) incelendi. Çözüm mevcut Vinext derlemesi üzerinde doğrulandı; framework sürümleri değiştirilmedi.

## 4. Güncel test ve yayın kanıtı

| Kontrol | Sonuç | Kapsam sınırı |
|---|---|---|
| Hizmet kabul testleri | 26/26 geçti | SQLite ve sentetik sağlayıcı yanıtları |
| Sayfa ve dil kontrolleri | 36/36 geçti | Sunucu tarafında bileşen oluşturma; tarayıcı etkileşimi değildir |
| Derlenmiş sunucu testleri | 3/3 geçti | Ana/eski yönlendirmeler, altı dil/sayfa yanıtı, bilinmeyen sayfalar, yetkisiz API, güvenlik başlıkları |
| Analiz tercihinin saklanamaması | Geçti | Tarayıcı depolama hatası taklidi; izin varsayılan kapalı |
| TypeScript ve derleme | Geçti | Mevcut kilitli bağımlılıklar |
| Seçilmiş renk çiftleri | Geçti | Metin kontrastı 5,95–12,45; hata metinleri 8,16/8,54; odak 4,42 |
| Mevcut yayına HTTP erişimi | /nb, /en, /tr ve /api/status: 200 | Güncellemeden önceki sürüm için HTTP kontrolü; oturumlu rezervasyon testi değildir |
| Son yayın | **succeeded, 19:09:14 UTC** | Aynı özel inceleme adresi; ortam revizyonu 1 |

Kaynak: `255ee9b2f98e5cfab344ede26f876908d0ab6877`. Site: `appgprj_6a9b750d3c1081918f3676dbc136bbe1`. Kaydedilmiş sürüm: 5. Yayın kaydı: `appgdep_6a9c68bf07f48191a0c59e7806d426f5`.

Bu turda ekran okuyucu, gerçek cihaz, klavye ile uçtan uca tarayıcı yolculuğu veya Lighthouse ölçümü yapılmadı. Geçen testler, tam erişilebilirlik veya güvenlik sertifikası değildir. E-posta gönderilmedi; gerçek veya sağlayıcı sandbox ödemesi yapılmadı.

## 5. Gerçekte açık ve kapalı sistemler

| Sistem | Güncel durum | Gerekli sonraki kanıt |
|---|---|---|
| Özel web yayını | Açık; yalnızca mevcut özel erişim kapsamında | Genel yayına geçiş kararı ve işletme hazırlığı |
| Kalıcı veri | Yayında kullanılabilir | Gerçek müşteri kimliği, saklama/geri yükleme ve yetki modelinin pilot doğrulaması |
| Operasyon hesabı | Sunucuda yetki ayarı mevcut | İsimli destek ve vardiya sorumlusu |
| Gerçek rezervasyon | Kapalı; yalnızca test kaynağı | Gerçek yardımcı, takvim, kapasite ve ulaşım süresi |
| Aile paylaşımı | Kapalı | Alıcı daveti ve doğrulanmış temsil/paylaşım yetkisi |
| Ödeme | Kapalı; kod test anahtarlarıyla sınırlı | Satıcı hesabı, onaylı fiyat, sandbox işlemi, iade ve mutabakat modeli |
| E-posta | Kapalı; sağlayıcı hesabı bağlı değil | Doğrulanmış gönderici, yetkili test alıcısı ve teslim sonucu |
| Talep tahmini | İşletme sonucu üretmiyor | Yeterli gerçek günlük veri ve geçmiş dönem hata ölçümü |
| Eski Vercel adresi | Bu çalışmada güncellenmedi | Doğru Vercel projesine erişim veya doğrulanmış kaynak repo |
| Özel alan adı | Bu çalışmada bağlanmadı | Kullanılacak alan adı ve yönetim erişimi |

Bağlı Vercel takımında `beta-art-series1` proje okuması bu turda 404 döndü. Eski URL'nin kapandığı sonucuna varılmadı; bu hesap üzerinden değiştirilebilir proje bulunamadı. Ayrı bir üçüncü web sitesi açılmadı.

## 6. İşletme modeli ve açılış dosyası

Başlangıç için önerilen ticari yapı, kapsamı tanımlı ziyaret için toplam fiyatın önceden teklif edilmesidir. Kesin fiyat, komisyon veya abonelik bu çalışmada onaylanmadı. Fiyat hesabı; yardımcı emeği, yol süresi, koordinasyon, sigorta, sağlayıcı maliyeti ve işletme payını içermelidir. Tekrarlı ziyaret modeli ancak operasyon ve iptal koşulları sınandıktan sonra açılmalıdır.

Aşağıdaki kayıtlar işletme sahibi tarafından gerçek bilgilerle tamamlanmalıdır. Rollere kişi atanmış sayılmaz.

| Kayıt | Karar / bilgi | Sorumlu rol | Kapanış kanıtı |
|---|---|---|---|
| B-01 | Yasal işletme adı, kayıt bilgisi ve iletişim noktası | İşletme sahibi | Doğrulanmış işletme kaydı ve ulaşılabilir iletişim |
| B-02 | Hizmet bölgesi, saatleri ve sunulacak görevler | Operasyon sorumlusu | Açık hizmet kataloğu ve kapsama haritası |
| B-03 | Fiyat, vergi uygulaması, iptal/ek iş/iade koşulları | İşletme ve ödeme sorumlusu | Kullanıcıya gösterilecek onaylı fiyat ve koşullar |
| B-04 | Yardımcı çalışma modeli, eğitim, kimlik, referans ve sigorta | Yardımcı kabul sorumlusu | Görev bazlı uygunluk kayıtları |
| B-05 | Alıcı onayı, aile yetkisi, gizlilik ve saklama düzeni | Veri sorumluluğunu üstlenen işletme | Gerçek hesaplarla yetki ve geri alma testi |
| B-06 | Ödeme hesabı ve bildirim adresi | İşletme sahibi | Güvenli hesap bağlantısı; sırlar sohbet metnine yazılmaz |
| B-07 | Ödeme, iade, e-posta teslimi ve hata tekrarları | Teknik/operasyon sorumlusu | Sağlayıcıdan alınmış gerçek test sonuçları |
| B-08 | Yardımcı gelmeme, kapı açılmama, ek iş, itiraz | Vardiya ve operasyon sorumlusu | Dört senaryonun prova kaydı |
| B-09 | Yaşlı kullanıcı, yakını ve yardımcıyla kullanılabilirlik | Hizmet tasarımı sorumlusu | Üç dilde görev sonuçları ve giderilmiş sorunlar |
| B-10 | Pilot kararı ve alan adı | İşletme sahibi | İsimli sorumlularla pilot başlangıç kaydı |

Somut bir tehlike veya acil durumda bu test sitesinin bildirim kuyruğuna güvenilmez. Gerçek bir nöbetçi hizmet devrede değildir. Testte olay kaydının “incelendi” olarak işaretlenmesi, uyuşmazlığın çözüldüğü veya para iadesi yapıldığı anlamına gelmez.

## 7. Karar kaydı ve sonraki aşamalar

| Aşama | 5 Eylül 2026 kararı | Gerekçe / reddedilen yaklaşım | Durum ve sonraki doğrulama |
|---|---|---|---|
| Discover | SRC-03 kimliğini ve mevcut özel Site kaydını koru | CARE/Consult/klinik kaynaklarını birleştirmek kaynak takibini bozardı | Tamamlandı; eski Vercel erişimi açık konu |
| Define | Altı tıbbi olmayan görev ve alıcı özerkliği | Doğrulanmamış kapsam ve hizmet garantisi verilmez | İnceleme kapsamı tamam; B-01–B-05 bekliyor |
| Design | Üç dil, dört adım, önce toplam fiyat ve alıcı onayı | Ödeme yapanın otomatik bilgi erişimi reddedildi | Uygulandı; hedef kullanıcı testi gerekli |
| Validate | Gerçek ürün testlerini genel yayın kontrolüne ekle | Başlangıç şablonu testleri yeterli değildi | 26 + 3 senaryo ve 36 sayfa kontrolü geçti |
| Build | Sunucudaki belge dili hatasını gider | Yalnızca tarayıcı çalışınca dil düzeltmek yetersizdi | Geçti; kaynak kalıcı Git kaydında |
| Launch | Aynı özel adreste sürüm 5 yayımla | Hesap ve işletme bilgisi olmadan gerçek hizmet açılmaz | succeeded; ticari pilot açılmadı |
| Measure | İzne bağlı toplu sinyaller ve gönüllü açık cevaplar | Gezinmeden sağlık veya okuduğunu anlama çıkarımı yapılmaz | Test altyapısı hazır; gerçek veri yok |
| Scale | Tekrarlı ziyaret ve tahmini doğrulanmış operasyona bağla | Veri olmadan personel/talep sonucu üretilmez | Pilot sonuçlarını bekliyor |

İlk sonraki iş, yeni tasarım oluşturmak değil; B-01–B-06 kayıtlarındaki işletme bilgileri ve hesap bağlantılarını tamamlamaktır. Bu bilgiler olmadan gerçek rezervasyon, ödeme, bildirim ve saha hizmeti tamamlandı olarak kapatılamaz.

---

# Önceki ayrıntılı teslim kaydı — sürüm 2 / tarihsel

Aşağıdaki metin kaynak ve karar geçmişini korumak için bırakılmıştır. Güncel durum yukarıdaki sürüm 5 bölümüdür.

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
