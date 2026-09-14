# NAVIAR Consult — Proje ve belge arşivi
NVC-001-DOC-12 · P-010 / NVC-001 · 5 Eylül 2026

> WEB-11 esas alınarak hazırlanan proje el kitabı ve arşiv rehberi. Hizmet konsepti ve özel web incelemesi teslim edilmiş; ticari açılış beklemektedir.

NAVIAR Consult; yöneticiler, İK ekipleri ve çalışanlar için işe devam, hastalık izni takibi, işyerinde uyarlama ve yönetici desteği alanlarında tasarlanan bir danışmanlık hizmetidir. Web sitesi bu hizmeti anlatır, hizmet seçimini kolaylaştırır ve başvurunun sonraki adımını açıklar.

Bu teslim, mevcut belgeleri ve tarihsel sürümleri bir araya getirir; hizmet, teknik işletim ve tasarım için tamamlayıcı rehberler sunar. NAVIAR Care, aynı marka ailesindeki ayrı bir projedir. Diğer projelerin tamamlandığı veya Vercel hesabındaki tüm yayınların doğrulandığı anlamına gelmez.

| Kayıt | Bu teslimdeki dayanak |
| --- | --- |
| Güncel web | WEB-11; 14 sayfa türü ve 3 dilde 42 görünüm |
| Kaynak durumu | 174 izlenen dosya; kayıtlı commit ve temiz çalışma ağacı |
| Arşiv kaynakları | 210 dosya/paket tarandı; 145 benzersiz tarihsel dosya birleştirildi |
| Tekrarlar | 101 aynı içerik eşleştirmesi; özgün adlar sicilde |
| Test kanıtı | Önceki ham günlük ve WEB-11 kaydı 80/80; bu tur yeniden çalıştırılmadı |
| Site durumu | Aktif, özel erişim; platform sürüm numarası 8 |

## Okuma sırası

Önce bu el kitabını okuyun. Ayrıntılı hizmet ve doldurulabilir şablonlar SVC-12; teknik işletim OPS-12; tasarım ve dil rehberi WEB-12 dosyasındadır. Özgün belgelerin tamamına paket içindeki BASLANGIC.html ve belge sicilinden ulaşılır.

Web: https://naviar-consult.andersen-betul.chatgpt.site

# Hizmet konsepti ve sınırlar
NAVIAR Start, kurum rutinlerinde açıklık ve uygulanabilir iyileştirmeler oluşturmak için tasarlanmış ilk sınırlı hizmettir.

## Müşterinin satın aldığı çalışma

Hedef, tek kurum veya bölümde mevcut rutinleri anlamak, en önemli belirsizlikleri görünür kılmak ve sorumluları belli bir 30 günlük plan hazırlamaktır. Danışmanlık ana hizmettir; Arbeidsnærvær OS sonraki gelişim yönü olarak değerlendirilir.

| Kapsam öğesi | Mevcut tasarım |
| --- | --- |
| Görüşmeler | Yöneticilerle 2 × 45 dakika; çalışan veya temsilcilerle en fazla 2 gönüllü × 30 dakika |
| Belge ve atölye | En fazla üç rutin/şablon; 60 dakikalık ortak değerlendirme |
| Emek ve zaman | Toplam 12 saat; kararlaştırılan başlangıçtan 10 iş gününde ana teslim |
| Takip | Başlangıçtan 30 takvim günü sonra; ana teslimden sonraki yeni bir 30 gün değildir |
| Çıktılar | Süreç haritası, en fazla beş bulgu, üç öncelik, 30 günlük plan ve takip kaydı |

## Ticari taslak

19.900 NOK, uygulanabilecek KDV hariç deneme fiyatı hipotezidir. Kesinleşmiş müşteri fiyatı veya kanıtlanmış ödeme isteği olarak sunulmaz. Her işte kapsam, tutar, tarihler, vergi, ödeme ve değişiklik koşulları yazılı olarak kararlaştırılır.

Follow ve Resolve geliştirme aşamasındadır. Bu adların web sitesinde bulunması, hazır danışman kapasitesi veya satışa açık standart paket bulunduğunu göstermez.

## Hizmet sınırı

Tıbbi değerlendirme, tedavi, hukuki temsil, ihbar soruşturması ve bireysel vakaların sürekli yönetimi Start kapsamına dahil değildir. Kurumsal rutin iyileştirme planı, bireysel resmî takip planının yerine geçmez. Başvuru formunda sağlık raporu veya ayrıntılı vaka dosyası istenmez.

> Eski belgelerdeki 90 günlük Start tanımı tarihsel farktır. Bu teslimin hizmet dayanağı WEB-11’deki 30 günlük kapsamdır.

# İşveren, çalışan ve hizmet adımları
İşverenin hizmeti satın alması ile çalışanın görüşmeye katılması farklı ihtiyaç ve beklentilerdir. Her iki tarafın rolü önceden açıklanır.

| Adım | Somut çıktı |
| --- | --- |
| Netleştirme | Amaç, kapsam, roller ve bilgi paylaşımını açıklayan görev belgesi |
| Anlama | Yönetici ve çalışan deneyimleri; eksik katılım ve paylaşım sınırlarıyla özet |
| Mevcut durumu inceleme | Kaynakları, yorumları ve açık sorularıyla süreç haritası; en fazla beş bulgu |
| Birlikte değerlendirme | Seçim gerekçesi kaydedilmiş üç öncelikli iyileştirme |
| Uygulama | Her eylemin sorumlusu, tarihi ve tamamlanma kanıtıyla 30 günlük plan |
| Öğrenme | Yapılanlar, kalanlar ve sonraki kararı gösteren takip kaydı |

## İşverenin yolu

İşveren kapsamı inceler, ilk ihtiyacını açıklar, karar sorumlusunu belirler ve kararlaştırılan rutinlere erişim sağlar. Danışmanla yazılı görevi netleştirdikten sonra kurum içindeki eylem sahiplerini atar. Ham çalışan görüşme notlarına otomatik erişim taahhüt edilmez.

## Çalışanın yolu

Çalışan neden davet edildiğini, danışmanın rolünü, görüşmenin amacını ve hangi bilginin kimlerle paylaşılacağını öğrenir. Start görüşmeleri gönüllü tasarlanmıştır. Dil, katılım ve erişilebilirlik ihtiyaçları önceden konuşulur; üç dilli site otomatik tercüman hizmeti demek değildir.

## Kabul ölçütü ve kayıt

Her bulgunun dayanağı bulunmalı; gözlem ile yorum ayrılmalı; eylem sahipleri ve tarihler belli olmalıdır. Katılım veya web etkileşimi sağlık, performans ya da bağlılık puanına dönüştürülmez. SVC-12; görev belgesi, teklif özeti, görüşme notu ve eylem/takip şablonlarını içerir.

# Web sitesi ve tasarım sistemi
Site aynı hizmet gerçeklerini Norveççe Bokmål, İngilizce ve Türkçe sunar. Müşteri görünümü sayısı 42’dir; yönetim ekranı bu sayıya dahil değildir.

## Sayfa mimarisi

Ana sayfa, hizmetler, Start, çalışan bilgilendirmesi, çalışma yöntemi, örnek çıktı, başvuru, hakkında, bilgi merkezi, iki bilgi yazısı, ödeme, gizlilik ve koşullar toplam 14 sayfa türünü oluşturur. Dil değişimi aynı sayfanın karşılığına gider. 42 gerçek yol WEB-12 sayfa sicilinde kayıtlıdır.

| Tasarım kararı | Uygulamadaki karşılığı |
| --- | --- |
| Anlaşılır hizmet seçimi | Ziyaretçinin dört ihtiyaç arasından açık seçim yapması ve ilgili sayfaya yönelmesi |
| Yöntemin görünür olması | Altı adım, adım başına belge çıktısı, kapsam özeti ve iki tarafın rolü |
| Görsel dil | Koyu lacivert/petrol, açık yüzeyler ve sınırlı altın vurgular; başlıklarda serif kullanımı |
| Duyarlı düzen | Kaynakta mobil menü için son 1050 px kuralı; süreç düzeninde 850/560 px eşikleri |
| Form geri bildirimi | Seçilen dilde alan hataları, hata özeti ve ilk hatalı alana odak |

## İçerik işletimi

Hizmet kapsamı, fiyat durumu, randevu açıklamaları ve gizlilik gerçekleri tek bir değişiklik kaydıyla üç dilde birlikte güncellenir. Sayfa başlıkları ve metadata aynı içerik kimliğine bağlıdır. Sadece çeviri akıcılığını kontrol etmek, üç dilde farklı ticari vaatler oluşmasını önlemeye yetmez.

## Erişilebilirlik kanıtının sınırı

Önceki WEB-07’de mobil menü, dar ekran, dil geçişi ve form hataları incelendi. WEB-11 için bu arşiv turunda yeni tarayıcı veya mobil görsel inceleme yapılmadı. Mevcut uygulamalar erişilebilirlik sertifikası sayılmaz; küçük menü hedefi ve gerçek katılımcılarla görev denemeleri sonraki inceleme konusudur.

> WEB-11 önizlemesi bağımsız, gönderimsiz HTML’dir. Tarihsel HTML dosyaları eski görünümleri saklar; güncel işlem doğruluğunun kanıtı olarak kullanılmaz.

# Başvuru, bildirim ve ödeme
Kayıt alınması, kesin saatin onayı, e-posta teslimi ve tahsilat dört ayrı olay olarak izlenir.

## Başvuru ve danışman onayı

Aktif akışta talep ve bildirim kuyruğu birlikte kaydedilir. Aynı kimlikle aynı verinin tekrar gönderimi yeni başvuru üretmez. E-posta hatası kaydedilmiş talebi silmez. Ziyaretçinin tarih tercihi müsaitlik takvimi değildir; danışman dış takvimi kontrol edip kesin Europe/Oslo saatini ayrıca onaylar.

| Kayıt | Uygulanan durum ayrımı |
| --- | --- |
| Başvuru | pending → contacted / closed / confirmed; contacted → closed / confirmed; confirmed → cancelled |
| Saat | 30 dakika görüşme + 15 dakika ara; çakışan zaman dilimleri reddedilir |
| E-posta | Kuyruğa alınma, sağlayıcı kabulü, teslim, gecikme ve geri dönüş ayrı izlenir |
| Ödeme | Yazılı anlaşma, özel teklif kodu, kabul, sağlayıcı oturumu ve sunucu doğrulaması |

## E-posta sorunları

Kalıcı kuyruk, sınırlı deneme, gecikmeli tekrar ve sağlayıcı teslim bildirimleri uygulanmıştır. Sağlayıcı kabulü okunma veya teslim kanıtı değildir. Belirsiz kayıt tekrar gönderilmeden önce sağlayıcıda incelenmelidir. Zamanlanmış kuyruk işçisi bağlı değildir; mevcut tekrar yolu yönetim işlemiyle çalışır.

## Ödeme doğrulaması

Teklif tutarı ve NOK para birimi sunucudan gelir. İmzalı ödeme olayları oturum, teklif, tutar ve para birimiyle eşleştirilir. Başarı dönüş sayfası tek başına tahsilat kanıtı değildir. Otomatik iade, fatura ve muhasebe bağlantısı tamamlanmış sayılmaz.

> WEB-11 teslim kaydı müşteri kabulü ve ödemeyi kapalı gösterir. Bu arşiv görevi gerçek hesapları yeniden etkinleştirmedi veya müşteri işlemi oluşturmadı. Ayrıntılı API, hata kurtarma ve ayar adları OPS-12’dedir.

# Veri, ölçüm ve teknik işletim
Uygulama React/TypeScript ve App Router yapısı kullanır; çalışma yolu Vite/vinext ve Cloudflare Worker, kalıcı kayıt D1/SQLite üzerindedir.

## Kalıcı veri

11 tablo; başvurular, zaman hakları, e-posta kuyruğu, teklifler, ödemeler, işlenmiş olaylar, içerik/geri bildirim toplamları ve tekrar/kota kayıtlarını kapsar. Tanı veya tıbbi dosya alanı yoktur. Bununla birlikte serbest iletişim alanlarına yazılabilecek gereksiz bilgiler için işletim sorumluluğu sürer.

| Veri/işlev | Kodda gözlenen kapsam |
| --- | --- |
| Raporlama | Bugün dahil 30 UTC takvim günü |
| Günlük toplamlar | Son 90 UTC günü; sonraki temizleme çağrısında daha eski kayıtlar silinir |
| Tercih | İsteğe bağlı ölçüm ve kişiselleştirme; tercih tarayıcıda tutulur |
| Öneri | Ziyaretçinin açık seçimine göre yönlendirme; eğitilmiş talep tahmin modeli yok |
| İşlem kayıtları | Başvuru, teklif, ödeme ve mesaj gövdesi için aynı otomatik silme uygulanmamış |

## Ölçümün anlamı

Görüntülenme kişi sayısı değildir; etkin süre okuduğunu anlama kanıtı değildir. Gönüllü geri bildirim sınırlı seçeneklerden oluşur. Form alanları veya vaka ayrıntıları ölçüm verisine dahil edilmez. Demo olması ölçümü kendiliğinden kapatmaz; sunuculu site ile gönderimsiz HTML farklıdır.

## İşletim sorumluluğu

Yönetim, Sites kimliği ve yetkili e-posta eşleşmesine dayanır. Başka bir barındırmaya taşınırken güvenilir kimlik katmanı yeniden kurulmalıdır. Gerçek işletimden önce veri erişimi, işlem kayıtlarının saklama/silme düzeni, görevli ve yedeği belirlenmelidir. Bu belge hukuki uygunluk veya güvenlik sertifikası değildir.

# Geliştirme ve karar geçmişi
Faz kaydı, projenin neden bu hâle geldiğini gösterir. Her fazda dış kullanıcı araştırması veya ticari pilot yapılmış olduğu iddia edilmez.

| Faz | Karar veya teslim |
| --- | --- |
| Discover | Dağınık kaynakları bul; Consult ve Care’i ayır; mevcut proje kimliğini koru |
| Define | Danışmanlığı ana hizmet; Start’ı ilk sınırlı paket olarak belirle |
| Design | İşveren/çalışan bilgi yolları, üç dil ve açık sonraki adım |
| Validate | Rota, tarih, tekrar gönderim, yetki, çakışma ve sağlayıcı olaylarını sınayan kontroller |
| Build | WEB-03/04 farklarını onaylı talep modelinde birleştir; kuyruk ve teklif ödemesini kur |
| Launch | Özel inceleme yayını; gerçek ticari açılış ayrı |
| Measure | Toplu içerik ölçümü ve gönüllü geri bildirim; sağlık çıkarımı yok |
| Scale | Pilot, kapasite ve teslim kalitesi oluşunca kapsamı yeniden değerlendir |

## Eski kayıtların yorumlanması

45 görünüm önceki sürümün, 42 görünüm güncel mimarinin sayısıdır. DOC-10’daki 172 kaynak sayısı tarihsel; WEB-11 kaynağında 174 dosya vardır. OPS-05 tarihsel işaretlenmiştir; sonraki e-posta işleyişi OPS-07 ve güncel kodda açıklanır. 30 günlük rapor dönemi, 90 günlük toplu saklama dönemiyle karıştırılmaz.

## Test kanıtı

DOC-10 ham test günlüğü ve WEB-11 doğrulama kaydı 80 geçen, sıfır başarısız/atlanan kontrol bildirir. Bu tur kod değiştirilmedi ve uygulama testleri tekrarlanmadı. Arşiv için dosya bütünlüğü, kaynak eşleştirmesi, sayfa sicili ve yeni belgenin düzeni denetlenir.

> WEB-11 belge/kod etiketi ile platformun sürüm numarası 8 farklı numaralandırmalardır. Birbirlerinin yerine kullanılmaz.

# Ticari açılış ve görev devri
Konsept, web incelemesi ve bu arşiv teslimi tamamlanabilir; gerçek müşteri kabulü ancak işletme girdileri ve gerçek işlem kanıtları oluştuğunda açılır.

| Sorumlu rol | Tamamlanacak iş ve kanıt |
| --- | --- |
| İşletme sahibi | Doğrulanmış unvan, kuruluş numarası, iş e-postası; kapsam, ücret ve nihai politikalar |
| Hizmet sorumlusu | Danışman takvimi, kapasite, onay rutini; isim verilmiş görevli ve yedek |
| Teknik / işletim | Doğrulanmış gönderici; teslim/geri dönüş denemesi ve kuyruk zamanlayıcısı |
| Finans / teknik | Gerçek ödeme hesabı; teklif, tahsilat, iade ve uzlaştırma denemesi |
| Teknik | Özel erişimin dış webhook’lara etkisi; yönetim yetkisini koruyan çözüm |
| Veri sorumlusu | İşlem kayıtlarının saklama/silme ve erişim düzeni; veritabanı geri yükleme denemesi |
| Hizmet / kalite | Gerçek pilot; işveren ve çalışan geri bildirimi; düzeltme kararı |

## Günlük işletim sırası

Görevli bekleyen talepleri inceler, dış takvimi kontrol eder, kesin saatleri veya iptalleri işler. İnceleme gerektiren e-postaları çözer ve tekliflerle ödeme durumlarını karşılaştırır. Görevlendirme, yanıt hedefi ve yedek kişi henüz isimleriyle belirlenmemiştir.

## Açılış kararı nasıl kaydedilir?

Her iş için sorumlu adı, hedef tarih, tamamlanma kanıtı ve açık kalan risk yazılır. Son karar işletme sahibi tarafından tarihli bir kayıtla verilir. Bayrakların açılması, hesap sahipliği, DNS veya gerçek işlem başarısının tek başına kanıtı değildir.

> Açılış kaydı taslağı: [Tarih] · [Sorumlu] · [Hesap/test kanıtları] · [Kalan işler] · [Karar] · [Geri dönüş sorumlusu]. Bu alanlar doldurulmadan tamamlanmış müşteri kabulü olarak sunulmaz.

# Arşiv kullanımı ve geri yükleme
Arşiv numarası: ARC-NVC-001-ALL-DOCS-20260905. Yeni rehberler önce okunur; özgün belgeler tarihsel kanıt olarak korunur.

| Klasör | İçerik |
| --- | --- |
| 01_Guncel_Rehberler | Bu el kitabı; hizmet, teknik işletim, tasarım ve arşiv rehberleri |
| 02_Belge_Orijinalleri | Word/PDF belgeler, sunumlar, şablonlar, karar ve araştırma kaynakları |
| 03_Tarihsel_Web | Önceki HTML görünümleri; dosya sicili güncel WEB-11’i belirtir |
| 04_Arsivlerden_Belgeler | Eski ZIP paketlerinden çıkarılan belge ekleri |
| 05_Siciller | Özgün ad, kaynak, dosya eşleştirmesi ve 42 sayfalık güncel web sicili |
| 06_Kaynak_Kayitlari | WEB-11 kaynak kimliği, 174 dosyalık referans ve site durum kaydı |
| 07_Dogrulama_Gorselleri | Önceki tarayıcı incelemelerinin görüntü kayıtları |

## Koruma ve eşleştirme

Aynı içeriğe sahip kopyalar SHA-256 ile eşleştirilir; özgün adları ve kaynak konumları sicilde ayrı satır olarak korunur. Orijinaller silinmedi veya yeniden yazılmadı. Eski ZIP’lerin belge ekleri pakete alındı; kaynak ZIP’ler kendi kayıtlarında korunur. Korunan araştırma raporları ve ayrı site yüzeyleri referansla gösterilir.

## Web kaynağı ve işletim verisi

Güncel kaynak kodu bağlı git deposundadır. Referans commit: 785123a41caa7bf2e1dd8767dcec5127d1e17b77. Arşivde yeniden bir kod deposu yaratılmaz. Kod kimliği, gizli ayarların veya işletim veritabanının yedeği değildir. Geri yüklemede ayrı çalışma kopyası ve kontrollü veri planı kullanılmalıdır.

## Son kontrol ve kapanış

BASLANGIC.html içinden dosyaları açın; SHA256SUMS.txt içerik bütünlüğünü, ZIP yanındaki doğrulama dosyası paket bütünlüğünü gösterir. Yeni sözleşme, mevzuat veya klinik vaat üretilmedi. Eski hukuki/ticari şablonlar tarihsel ve onaysızdır; güncel müşteri taahhüdü sayılmaz.
