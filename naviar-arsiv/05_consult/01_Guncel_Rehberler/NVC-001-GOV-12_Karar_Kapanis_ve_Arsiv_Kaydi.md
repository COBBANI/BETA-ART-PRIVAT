# NAVIAR Consult — karar, kapanış ve arşiv kaydı

Belge: NVC-001-GOV-12 · Tarih: 5 Eylül 2026 · Arşiv: ARC-NVC-001-ALL-DOCS-20260905

## Kapsam ve kimlik

Bu teslim, kullanıcının “Bütün belgeleri yaz ve arşivle” talebine karşılık NAVIAR Consult’un mevcut belgelerini, tarihsel web görünümlerini, araştırma dayanaklarını ve kaynak kayıtlarını birleştirir. Güncel hizmet dayanağı WEB-11’dir. NVC-001 hizmet kimliği korunmuştur; P-010 mevcut sitenin proje etiketi olarak kaydedilir. Önceki portföy sicillerinde aynı P numarasının farklı projeler için kullanılmış olması nedeniyle bu paket bütün portföyü yeniden numaralandırmaz.

NAVIAR Care ayrı hizmettir. Aramada çıkan ayrı NAVIAR Consult web yüzeyleri kendi kimlikleriyle kaynak sicilinde kalır; ana WEB-11 kaynağına dönüştürülmez. Klasördeki HXI adını taşıyan kayıt yanlış proje ilişkisi olarak işaretlenmiştir. Portföy genel P-000 arşiv politikası, Consult’un hizmet konsepti olarak kullanılmaz.

## Karar sicili

| Kayıt | Faz | Karar | Gerekçe | Durum / sonraki kanıt |
| --- | --- | --- | --- | --- |
| D12-01 | Discover | Güncel kaynak ve eski belge havuzlarını birlikte incele | Sadece son teslim klasörü eski şablonları ve araştırmaları kapsamıyordu | İki proje belge klasörü ve ad temelli arama tarandı |
| D12-02 | Define | Hizmet kapsamını 30 günlük Start ile anlat | Eski 90 gün tanımı güncel içerikle uyuşmuyor | Güncel rehberlerde uygulandı; eski kaynak değiştirilmedi |
| D12-03 | Design | Ana el kitabı, üç uzmanlık rehberi ve açılabilir dosya dizini üret | Kurucu ve devir ekibi hem genel resmi hem ayrıntıyı bulabilmeli | DOC-12, SVC-12, OPS-12, WEB-12 |
| D12-04 | Validate | Yeni arşiv kontrolünü önceki uygulama testlerinden ayır | 80/80 kaydını bu tur yeniden çalıştırılmış gibi göstermemek | Arşiv QA kaydı ayrı; önceki test günlüğü tarihsel |
| D12-05 | Build | Aynı içerikleri hash ile eşleştir, tüm kaynak adlarını sicilde koru | Tekrarları azaltırken belge kökeni kaybolmamalı | 101 içerik eşleştirmesi; özgünler korunuyor |
| D12-06 | Launch | Sitenin yayınına ve erişimine dokunma | Mevcut görev belge yazımı ve arşivleme | Site salt okunur kontrol edildi; aktif/özel erişim |
| D12-07 | Measure | 30 gün rapor ile 90 gün toplam saklamasını ayır | İki farklı süre müşteriye ve işletime yanlış aktarılmamalı | Rehberlere işlendi; işlem gövdelerinin saklama işi açık |
| D12-08 | Scale | Gerçek pilot ve hesap açılışını açık iş olarak koru | Demo teslimi ticari sonuç veya kapasite kanıtı değil | İsim verilmiş sorumlular ve işlem kanıtları bekliyor |

## Tamamlanan teslim

Ana el kitabı hizmet konseptini, iki tarafın rollerini, web tasarımını, işlem akışlarını, teknik yapıyı, gelişim tarihini ve arşiv kullanımını açıklar. Hizmet rehberi görev, teklif, görüşme ve eylem/takip şablonlarını içerir. Teknik rehber API’leri, veri tablolarını, durum geçişlerini, gönderim sorunlarını, ödeme doğrulamasını ve geri yükleme sınırlarını açıklar. Tasarım rehberi 14 sayfa kimliğinin üç dildeki gerçek yollarını ve uygulanan görsel kuralları belgeler.

Ana belge çıktısı Word ve Markdown’dır. Arşivde mevcut Word, PDF, eski Office sunumları, HTML, Markdown, test kayıtları ve sayfa sicilleri kendi formatlarında korunur. Eski belgelerin metni bu tur güncelleştirilmedi; taslak sözleşmeler, fiyat listeleri ve mevzuat sunumları güncel/onaylı müşteri belgeleri sayılmaz. Yeni bağlayıcı sözleşme veya hukuki doğrulama üretilmedi.

## Arşiv kapsamı ve istisnalar

210 dosya/paket ve üç kayıtlı metin okundu veya içerik koruması için alındı. Eski ZIP’lerden uygun belge ekleri çıkarıldı. 145 benzersiz tarihsel dosya pakette tutulur; buna yeni rehberler ve siciller eklenir. Aynı içerik için tek kopya ve birden fazla köken kaydı bulunur. Eski ZIP’lerin tamamı yeniden paketlenmez; özgün kaynak kayıtlarında korunur. Güncel git deposu yeniden kopyalanmaz; 174 dosyanın yol, boyut ve SHA-256 değerleri tam commit ile referans sicilindedir.

Değiştirilemez araştırma raporları, ayrı site yüzeyleri ve genel logo/görsel varlıkları özgün kaynaklarıyla referans sicilindedir. Ekran incelemesi kanıtı olan görseller ise arşive dahil edilmiştir. Kayıtlı üç metnin tüm satırları okundu, bildirilen UTF-8 byte boyutlarıyla eşitlik doğrulandı. Bu, ilgili dış kaynaklardaki iddiaların güncel olarak doğrulandığı anlamına gelmez.

Tarama, erişilebilir ve NAVIAR Consult’a bağlanan bu kaynak havuzlarıyla sınırlıdır. Diğer sohbetlerin eksiksiz dökümü, Vercel hesabının tamamı, ulaşılmayan sağlayıcı hesapları veya gerçek müşteri veritabanı arşivlendi iddiası yoktur.

## Kalan işlerin devir formu

| İş | Sorumlu atanması | Tamamlanma kanıtı |
| --- | --- | --- |
| Şirket ve politikalar | [İşletme sahibi] | Doğrulanmış şirket/iletişim ve nihai hizmet koşulları |
| Hizmet kapasitesi | [Danışman ve yedek] | Takvim, onay/iptal rutini ve yanıt hedefi |
| E-posta işletimi | [Teknik/operasyon] | Gönderici doğrulaması, teslim/geri dönüş testi, zamanlanmış tekrar |
| Ödeme | [Finans/teknik] | Gerçek hesap, tahsilat/iade ve uzlaştırma kayıtları |
| Erişim ve veri | [Teknik/veri sorumlusu] | Webhook erişimi, korunan yönetim, işlem kayıtlarının saklama düzeni |
| Pilot | [Hizmet sorumlusu] | İşveren/çalışan geri bildirimi, teslim kalitesi ve düzeltme kararı |

## Arşivi açma ve bütünlük

ZIP’i bir klasöre çıkarıp BASLANGIC.html dosyasını açın. Dosya dizini yeni rehberleri önce gösterir; eski kaynakları adla aramanızı sağlar. CSV sicilindeki `arsiv_yolu` alanı paketteki dosyayı, `kaynak` özgün konumu, `durum` dahil/aynı içerik/referans ayrımını verir. Arşiv içindeki SHA256SUMS.txt kendisi dışında tüm teslim dosyalarının hash’lerini listeler. ZIP yanındaki .sha256 dosyası ZIP’in hash’ini verir.

Özgün araştırma ve logo kaynakları yerlerinde korunur. Yeni sürüm istenirse yeni tarih/sürüm kaydı üretilmeli; eski dosya kökenleri sessizce değiştirilmemelidir. Belgelerdeki şirket, kişi ve tarih boşlukları gerçek bilgi geldikçe doldurulur; tamamlanmış gibi uydurulmaz.

## Kapanış kararı

Belgeleme ve arşiv teslimi tamamlandıktan sonra bu çalışma kapanır. Kullanıcının işletme sahibi adına ticari kabul kararı verdiği varsayılmaz. Gerçek müşteri kabulü, e-posta ve ödeme açılışı; yukarıdaki devir işlerinin kanıtlarıyla ayrı karara bağlanacaktır.
