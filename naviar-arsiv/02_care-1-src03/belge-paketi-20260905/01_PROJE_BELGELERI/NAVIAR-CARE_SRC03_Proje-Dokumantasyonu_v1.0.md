# NAVIAR CARE

# Baştan sona proje dokümantasyonu

## 1. Proje kimliği ve doğrulanmış son durum

**NAVIAR CARE / SRC-03**, evinde yaşamayı sürdüren yaşlılara tıbbi olmayan günlük destek sağlamak için geliştirilen hizmet ve web uygulamasıdır. Bu belge, fikrin hizmet modeline, içeriğe, tasarıma ve çalışan test uygulamasına nasıl dönüştürüldüğünü açıklar. İşletme, tasarım, geliştirme ve operasyon ekipleri için ortak başvuru kaydıdır.

**Belge kodu:** NAVIAR-CARE-SRC03-DOC-20260905. **Belge sürümü:** 1.0. **Tarih:** 5 Eylül 2026. **Dil:** Türkçe. **Belgelenen yayın:** özel inceleme sürümü 5.

Güncel yayın kaydı bu belgeleme sırasında yeniden kontrol edildi: site etkin, son yayın başarılı ve erişim özel. Bu, gerçek müşterilere hizmet verildiği anlamına gelmez. Kaynak kodu incelendi; uygulamanın tüm testleri bu belgeleme turunda yeniden çalıştırılmadı. Önceki test sonuçları 16. bölümde kaynaklarıyla ayrılmıştır.

| Görünüm | Adres veya dosya | Ne işe yarar? |
| --- | --- | --- |
| Türkçe uygulama | [Türkçe web sitesi](https://naviar-care-src03.andersen-betul.chatgpt.site/tr) | Hesaba bağlı özel inceleme |
| Norveççe uygulama | [Norsk Bokmål](https://naviar-care-src03.andersen-betul.chatgpt.site/nb) | Aynı hizmetin Norveççe görünümü |
| İngilizce uygulama | [English](https://naviar-care-src03.andersen-betul.chatgpt.site/en) | Aynı hizmetin İngilizce görünümü |
| İlk referans | [Eski Vercel sitesi](https://beta-art-series1.vercel.app/) | Bu çalışmada güncellenmeyen kaynak adres |
| Bağımsız tasarım | NAVIAR-CARE_SRC03_Web-Tasarim.html | Sunucuya veri göndermeyen yerel önizleme |
| Kaynak teslimi | NAVIAR-CARE_SRC03_Web-Kodu.zip | Tam uygulama ve bağımsız tasarımın kaynakları |

**Durum sözlüğü:** “Mevcut”, kod veya yayın kaydıyla desteklenen inceleme özelliğidir. “Önceki test”, eski teslimde kaydedilmiş doğrulamadır. “Öneri”, henüz uygulanmış kabul edilmeyen hizmet kararıdır. “Bekliyor”, canlı kullanım için gereken açık iştir.

Ana proje adı NAVIAR CARE ve bu web kaynağının kimliği SRC-03 olarak korunur. SRC-01, SRC-02, klinik CARE 2 ve NAVIAR Consult için bu belge tamamlanma veya teknik birleştirme iddiası taşımaz. Önceki arşiv kimlikleri yeniden numaralandırılmaz. Eski belgelerde geçen farklı dosya ve test sayıları kendi tarihleriyle okunmalıdır.

## 2. Proje nasıl yapıldı?

**Başlangıç ve sorun tanımı.** Kullanıcının paylaştığı beta-art-series1 adresi, yaşlıları ve yakınlarını yerel yardımcılarla buluşturan Naviar içeriği taşıyordu. Önceki incelemede marka/adres uyumsuzluğu, Oslo–Viken–Alicante kapsam karışıklığı, doğrulanması gereken telefon ve demo özelliklerinin gerçek hizmet gibi anlaşılma riski kaydedildi. Bunlar önceki incelemenin bulgularıdır; eski site bu belge için yeniden denetlenmedi.

**Kaynakların ayrılması.** Mevcut kayıt SRC-03 olarak korundu. Eski Vercel projesi bağlı hesaptan düzenlenebilir biçimde bulunamadığı için aynı adrese kod gönderildiği iddia edilmedi. Yeni inceleme uygulaması mevcut Sites kaydında sürdürüldü. Çalışma dizininde başka bir çalışmaya ait değişiklikler görülünce kaynaklar ayrı çalışma alanında tamamlandı.

**Hizmet tasarımı.** Destek alan kişi, yakını, yardımcı ve koordinatör için ayrı roller tanımlandı. Kapsam altı tıbbi olmayan görev grubuna indirildi. Talep, alıcı onayı, teklif, ziyaret onayı ve ödeme farklı aşamalar olarak modellendi. Ödeyen kişinin otomatik bilgi erişimi kazanması engellendi.

**İçerik ve tasarım.** Norveççe Bokmål, İngilizce ve Türkçe içerikler ortak anahtarlarla yazıldı. Kısa eylem adları, açık test açıklamaları, geniş kontroller ve sade hizmet seçimi kullanıldı. Mevcut marka öğeleri korundu; temsili görseller gerçek müşteri veya yardımcı kanıtı gibi sunulmadı.

**Uygulama.** React/TypeScript arayüzüne dört adımlı talep formu, hesap ve operasyon görünümleri eklendi. Worker API, D1/SQLite tabloları, teklif zamanı ayırma, iptal/değişiklik ve olay kaydı geliştirildi. Ödeme ve e-posta için test bağdaştırıcıları yazıldı. Analiz yalnızca sınırlı ve izinli olaylar için kuruldu.

**Sürüm 2 geliştirmeleri.** Önceki kayıtta 5 Eylül 2026, 02:59 UTC yayını; atomik zaman çakışması kontrolü, 15 dakika ara, süreli teklif, ödeme başladıktan sonra değişiklik sınırı, vaka üstlenme, e-posta kuyruğu ve gönüllü geri bildirimle belgelenmiştir. Bu sürümün 25 kabul testi güncel sürüm 5 sayısının yerine kullanılmaz.

**Sürüm 5 son kontrolü.** Genel test komutunun başlangıç şablonunu kontrol edip gerçek hizmet testlerini kapsamaması giderildi. İngilizce ve Türkçe sayfaların ilk HTML yanıtında Norveççe tanıtılması düzeltildi: Worker sayfa dilini URL'den belirleyerek kök yerleşime aktarır. Böylece dil, tarayıcı kodunun sonradan düzeltmesine bağlı kalmaz.

**Yayın ve kod teslimi.** Sürüm 5 aynı özel adreste 5 Eylül 2026, 19:09 UTC civarında başarıyla yayımlandı. Ardından 23 bölümlük konsept, tek dosyalık üç dilli tasarım ve çalıştırma rehberini içeren kaynak ZIP teslim edildi. Kaynak ZIP'e eklenen bağımsız tasarımın özel yayına yeni sürüm olarak dağıtıldığı varsayılmaz.

**Bu belgeyle yapılan iş.** Güncel yayın durumu tekrar okundu; konsept, teslim raporu, içerik CSV'si ve kaynak kodu karşılaştırıldı. API, veri modeli, bakım sınırları, test kapsamı ve teslim dosyaları tek belgede toplandı. Bu belgeleme çalışması web sitesine yeni özellik veya işletme hesabı eklemez.

Geliştirme anlatımı mevcut kaynak ve teslim kayıtlarına dayanır. Toplam çalışma saati, proje bütçesi, gerçek müşteri görüşmesi sayısı veya tüm ara sürümlerin ayrıntısı kayıtlarda doğrulanmadığından üretilmemiştir.

## 3. Konsept, ihtiyaç ve marka vaadi

**NAVIAR CARE, evinde yaşamaya devam etmek isteyen yaşlıların günlük işlerde ve sosyal yaşamda destek almasını sağlayan, insan koordinasyonuyla yürütülen tıbbi olmayan hizmettir.** Yardım alan kişi ne yapılacağını, ziyaret zamanını ve hangi bilginin kiminle paylaşılacağını belirler. Yakını destek önerebilir ve gelecekte ödemeyi üstlenebilir; bu rol kişiye otomatik bilgi erişimi sağlamaz.

Hizmetin değeri yalnızca bir yardımcı bulmak değildir. İhtiyacı anlaşılır bir göreve dönüştürmek, göreve uygun kişiyi belirlemek, toplam fiyatı önceden açıklamak, ziyaretin gerçekleşmesini takip etmek ve sorun olduğunda sorumluluğu üstlenmektir. Web sitesi bu sürecin kullanıcıya görünen kapısıdır; saha operasyonu olmadan tek başına hizmeti yerine getirmez.

Vizyon: İnsanların kendi evlerinde gündelik hayat üzerindeki söz hakkını koruyarak destek alabilmesi. Misyon: Küçük ama önemli günlük ihtiyaçları, anlaşılır koşullar ve sürdürülebilir insan desteğiyle karşılamak. Sağlık sonucu, yalnızlığın belirli oranda azalması veya evde daha uzun kalma süresi için ölçülmemiş sonuç vaadi verilmez.

### Çözülen ihtiyaç

Bir alışverişin yapılması, telefonun ayarlanması veya dışarı çıkarken eşlik bulunması günlük hayatı kolaylaştırabilir. Yardım arayan kişi görev sınırını, gelecek kişiyi, toplam fiyatı ve bir sorun yaşarsa kime ulaşacağını anlamak ister. Yakını ise destek verebilmek isterken kişinin tercihlerini ihlal etmemelidir. Yardımcı da nerede, ne kadar süreyle ve hangi sınırlar içinde çalışacağını önceden bilmelidir.

Başlangıç hipotezi şudur: Bu üç taraf için aynı ziyaretin koşullarını açıklaştırmak, belirsizliği ve koordinasyon yükünü azaltacaktır. Bu bir doğrulanmış müşteri araştırması sonucu değildir. Pilot görüşmeleriyle sınanacak hizmet hipotezidir.

### Ayırt edici yaklaşım

Önerilen marka deneyimi, her ziyaret öncesinde beş sorunun yanıtlanmasıdır:

1. **Ne yapılacak?** Kullanıcı görev kapsamını kendi kelimeleriyle anlayabilmeli.
2. **Kim gelecek?** Göreve uygunluğu doğrulanmış kişi ve değişiklik durumu açıklanmalı.
3. **Ne zaman ve ne kadar süre?** Başlangıç, süre ve gecikme halinde haberleşme net olmalı.
4. **Toplam ne ödenecek?** Yol, malzeme ve diğer ücretlerin dahil olup olmadığı görünmeli.
5. **Kim neyi görebilecek?** Bilgi paylaşımı, ziyaret ve ödemeden ayrı seçilmeli.

Bu yapı “ziyaret özeti” ekranına ve operasyon kontrolüne birlikte yansır. Bir özelliğin web sayfasında yazması yeterli değildir; ilgili koşulun arka planda da doğrulanması gerekir. Aynı yardımcıyla devam etme isteği alınır, ancak müsaitlik ve uygunluk doğrulanmadan garanti verilmez. Bu yaklaşımın dünyada ilk veya rakipsiz olduğu ileri sürülmez.

Marka cümlesi: **Günlük destek. Sizin tercihlerinizle.** Mevcut logo korunur; tescil veya rakipsizlik garantisi verilmez.

## 4. Kullanıcılar ve yolculuklar

| Kullanıcı | Yapmak istediği iş | Tasarımın karşılığı |
| --- | --- | --- |
| Yardım alan kişi | Günlük işi için destek bulmak ve kontrolü korumak | Açık hizmet seçimi; ziyaret ve paylaşım için ayrı karar |
| Yakını | Yakınına destek organize etmek | Ayrı başlatma yolu; alıcının onayı; ödeme ile bilgi erişiminin ayrılması |
| Yardımcı | Yetkin olduğu görevleri açık koşullarla üstlenmek | Görev kapsamı, ulaşım, süre, ücret ve durdurma hakkı |
| Operasyon sorumlusu | Uygun eşleştirme ve sorunsuz ziyaret sağlamak | İnceleme kuyruğu, kapasite, olay kaydı ve sorumlu ataması |
| İşletme sahibi | Kaliteyi ve ekonomik sürdürülebilirliği yönetmek | Ziyaret maliyeti, iptal, kapasite ve memnuniyet raporları |

Dijital deneyimi sınırlı kullanıcılar için gelecekte telefonla destekli talep oluşturma önerilir. Doğrulanmış telefon numarası ve görevli ekip olmadan numara veya “hemen arayın” vaadi yayımlanmaz. Temsil gerektiren durumlarda yalnızca akrabalık beyanına dayanılmaz; uygun yetki süreci ayrıca kurulmalıdır.

### Yardım alan kişi

Kişi ana sayfadan destek türünü seçer. Talep akışında tercih ettiği zamanı, süreyi ve kimin yardım alacağını belirtir. Özette görev, zaman, paylaşım tercihi ve fiyatın henüz netleşmediğini görür. Test talebini kaydettikten sonra hesabında izler, uygun durumlarda saati değiştirir veya iptal eder. Ticari modelde operasyonun uygunluk değerlendirmesi ve gerçek teklifinden sonra ziyaret onaylanacaktır.

### Yakını

Yakını aynı hizmet kataloğundan “başka biri için” yolunu seçer. Alıcının kararının beklendiği açıkça belirtilir. Mevcut uygulamada bu kayıt beklemede kalır; başka hesabın alıcı olarak davet edilmesi ve yetki doğrulaması henüz açılmamıştır. Hedef modelde alıcı ziyaret onayını ve belirli kişiye verilecek bilgi yetkisini ayrı verir. Ödeme belgesi, ziyaret ayrıntıları ve özel notlar aynı erişim düzeyine sahip olmaz.

### Yardımcı

Yardımcı uygun olduğu hizmetleri ve bölgesini belirtir. Başvuru “doğrulanmamış” durumunda açılır. Hedef operasyon; kimlik kontrolü, aranmış referans, görev bazlı yetkinlik, eğitim, çalışma koşulları ve sigorta kontrolünden sonra görevlendirme yapar. Yardımcı, görevin uygun olmadığını düşündüğünde işi durdurabilmeli ve koordinatöre ulaşabilmelidir. Başvuru yapmak işe kabul veya görev garantisi değildir.

### Koordinatör

Koordinatör talebi inceleyip kapsamı, alıcı onayını, kapasiteyi ve fiyatı kontrol eder. Test sürümünde gerçek kişi yerine test kaynağı kullanılır. Hedef modelde görevli kişi, kabul ettiği ziyaretleri ve gerekli asgari bilgileri görür. Ziyaret sonrası kayıt ve olası itiraz aynı ziyaret kimliği üzerinden takip edilir.

## 5. Hizmet kataloğu ve sınırlar

| Hizmet | Dahil olan örnek işler | Görev sınırı |
| --- | --- | --- |
| Alışveriş ve küçük işler | Market, posta ve yakındaki kararlaştırılmış işler | BankID, PIN veya kart teslimi yok; harcama sınırı ve makbuz süreci açılıştan önce belirlenir |
| Sohbet ve arkadaşlık | Sohbet, sesli okuma, kart oyunu | Terapi veya sağlık izlemi olarak sunulmaz |
| Yürüyüş ve eşlik | Yürüyüşte veya randevuya giderken eşlik | Tıbbi nakil, kaldırma/transfer veya araçla taşıma kendiliğinden dahil olmaz |
| Telefon ve tablet desteği | Görüntülü arama, fotoğraf, basit ayarlar | Şifre, banka işlemi veya kimlik doğrulama bilgileri yardımcıya verilmez |
| Evde küçük işler | Hafif toparlama, bitki bakımı, önceden belirlenmiş işler | Ağır temizlik, elektrik işleri, yüksekten çalışma ve ağır kaldırma dışarıda tutulur |
| Bahçe ve mevsimlik işler | Sulama, süpürme, hafif dış işler | Tehlikeli makine kullanımı ve ağır işler kapsam dışıdır |

İlaç verme, tanı, yara bakımı, kişisel bakım ve acil müdahale bu hizmete dahil değildir. Hizmet kataloğu, iş başında sınırsız yeni görev kabulü anlamına gelmez. Kullanıcı ek iş isterse yardımcı kapsamı ve güvenliği değerlendirir; gerekiyorsa koordinatör yeni süre ve toplam fiyat oluşturur. Kullanıcının onayı olmadan ek ücretli işe başlanmaz.

Hizmet bölgeleri henüz doğrulanmamıştır. Oslo/Viken veya Alicante mevcut hizmet alanı olarak yazılmaz. Posta kodu alınması, o bölgede yardımcı bulunduğu anlamına gelmez.

## 6. Hizmet paketleri ve iş modeli

**Önerilen başlangıç modeli:** Yönetilen hizmet. NAVIAR CARE talebi alır, görevi netleştirir, uygun yardımcıyı seçer ve ziyaretin takibini üstlenir. Serbest ilan pazarının tüm sorumluluğu kullanıcıya bırakan deneyimi başlangıç modeli olarak seçilmemiştir. Yardımcıların çalışan mı yoksa bağımsız sağlayıcı mı olacağı işletme kararı ve ilgili yükümlülük değerlendirmesi gerektirir.

| Paket önerisi | Kullanıcıya sunduğu şey | Açılma koşulu |
| --- | --- | --- |
| Tek ziyaret | Bir veya birkaç uyumlu günlük görev için önceden fiyatlanan ziyaret | Bölge, süre, yardımcı ve toplam fiyatın onayı |
| Düzenli destek | Belirli aralıklarla tekrar eden ziyaret talebi | Kapasite, süreklilik, iptal ve yenileme koşullarının pilotta doğrulanması |
| Yakınımla planlama | Yakının talebi başlatması ve ödemeyi üstlenmesi | Alıcının bağımsız onayı ve ayrı paylaşım yetkisi |

Paket adları ve süreleri ticari fiyat listesi değildir. Mevcut kod test ziyaretinde süre seçimi sağlar; abonelik tahsilatı veya tekrarlayan ziyaret serisi kurulu değildir. Kamu kurumlarına satış ve kurumsal anlaşmalar sonraki fazda değerlendirilir; mevcut sözleşme varmış gibi gösterilmez.

Fiyatlandırma, yardımcı emeği, işveren/tedarik maliyetleri, ulaşım, koordinasyon, sigorta, ödeme sağlayıcısı, iptal riski ve işletme payını karşılamalıdır. Ziyaret başına katkı = vergi hariç gelir − o ziyarete bağlı değişken maliyetler. Komisyon oranı, vergi uygulaması ve nihai fiyat bu belgeyle belirlenmez. Fiyat kesinleşmeden “ücretsiz”, “en ucuz” veya sabit saat ücreti kullanılmaz.

## 7. Saha operasyonu ve istisnalar

| Aşama | Kullanıcıya görünen | Operasyonda yapılacak | Sorumlu rol | Sorun halinde |
| --- | --- | --- | --- | --- |
| İhtiyaç | Görev ve tercih seçimi | Kapsam ve bölge değerlendirmesi | Koordinatör | Uygun olmayan görev açık gerekçeyle geri çevrilir |
| Onay | Alıcının kararının alınması | Alıcı ve temsil/paylaşım yetkisinin doğrulanması | Yetki sorumlusu | Onay tamamlanana kadar görevlendirme yapılmaz |
| Eşleştirme | Önerilen kişi ve zaman | Yetkinlik, takvim ve ulaşım kontrolü | Koordinatör | Alternatif kullanıcıya sunulur; sessizce kişi değiştirilmez |
| Teklif | Toplam fiyat ve şartlar | Maliyet, ödeme ve süre sınırlarının kaydı | Operasyon/ödeme | Süresi dolan teklif yenilenir |
| Ziyaret | Anlaşılan görev | Başlangıç, bitiş ve kapsam takibi | Yardımcı | Ek iş ve güvenlik sorunu koordinatöre gider |
| Tamamlama | Tamamlanma bilgisi | İşlem kaydı ve varsa izinli bildirim | Koordinatör | İtiraz varsa inceleme açılır |
| Takip | Geri bildirim ve yeniden talep | Kalite ve maliyet değerlendirmesi | Kalite sorumlusu | Düzeltici aksiyon ve kapanış kanıtı kaydedilir |

Bu tabloda rol tanımları vardır; gerçek personele atama yapılmış değildir. Yanıt ve destek saatleri, görevli ekip doğrulanınca yayımlanır. Pilot için ziyaret öncesi ve sonrası kontrol araması önerilir; henüz yapılmış değildir.

### İstisna ve şikâyet yönetimi

| Durum | İlk eylem | Kullanıcıya açıklanacak |
| --- | --- | --- |
| Yardımcı gelmedi | Koordinatör durum ve alternatif kapasiteyi kontrol eder | Güncel durum; yeni saat veya iptal seçeneği |
| Kapı açılmadı | Önceden kararlaştırılmış iletişim planı uygulanır | Eve zorla girilmez; belirlenen yetkili kişiye uygun kapsamda ulaşılır |
| Ek iş istendi | Kapsam ve süre yeniden değerlendirilir | Yeni ücret ve görev, işe başlanmadan onaylanır |
| Ödeme itirazı | Ödeme sorumlusu işlem ve hizmet kayıtlarını inceler | İnceleme durumu; henüz iade yapılmadıysa bu açıkça belirtilir |
| Yardımcı işi güvenli bulmuyor | Görev durdurulur ve koordinatöre bildirilir | Güvenli alternatif veya iptal süreci |

Mevcut uygulamada ilk dört kategori için olay kaydı ve sorumlu üstlenme akışı vardır. “İncelendi” işareti, sorunun çözüldüğü veya paranın iade edildiği anlamına gelmez. Acil bir olay web formunun izlenmesini beklememelidir; bu site acil yardım veya nöbetçi hizmet değildir.

## 8. Web sitesi: sayfa haritası ve içerik görevleri

Mevcut uygulama her dilde aşağıdaki 12 görünümü içerir. `/nb` Norveççe, `/en` İngilizce, `/tr` Türkçe içindir.

| Sayfa | Yol örneği | Kullanıcının sorusu / ana eylemi |
| --- | --- | --- |
| Ana sayfa | `/tr` | Bu hizmet bana uygun mu? Destek seç |
| Hizmetler | `/tr/services` | Hangi işler yapılabilir? |
| Talep | `/tr/booking` | Ne zaman, kimin için destek istiyorum? |
| Yakınlar | `/tr/family` | Nasıl destek olurum, hangi bilgiyi görebilirim? |
| Güvenlik | `/tr/safety` | Gelecek kişi nasıl değerlendirilir? |
| Yardımcı ol | `/tr/helper` | Başvuru koşulları neler? |
| Yardımcı başvurusu | `/tr/jobs` | Uygun olduğum görevler için başvur |
| Taleplerim | `/tr/account` | Talebimi gör, değiştir veya iptal et |
| Operasyon | `/tr/operations` | Yetkili görevli olarak incele ve takip et |
| İletişim | `/tr/contact` | Destek düzeni ve mevcut erişim durumu |
| Gizlilik | `/tr/privacy` | Hangi bilgiler tutuluyor? |
| Koşullar | `/tr/terms` | Bu test ne anlama geliyor? |

Ana sayfanın sırası: görünür test açıklaması → marka ve dil seçimi → somut hizmet cümlesi → destek seçimi → üç temel ilke → altı hizmet → üç adımda süreç → yakınların rolü → sık sorulan sorular → politika ve hesap bağlantıları. Doğrulanmış ekip profilleri ve izinli müşteri deneyimleri ancak gerçek içerik sağlandığında eklenir.

### Sayfalar arasındaki ilişki

Ana sayfa ziyaretçiyi hizmet seçimine ve talep akışına götürür. Hizmetler sayfası kapsamı, yakınlar sayfası onay ve paylaşımı, güvenlik sayfası yardımcı değerlendirmesini açıklar. Yardımcı ol sayfasından başvuruya gidilir. Taleplerim görünümü kullanıcının kendi kayıtlarını; Operasyon görünümü yetkili görevlinin inceleme kuyruğunu sunar.

Talep, hesap ve operasyon sayfaları hassas işlem alanlarıdır. Genel içerik ölçümü bu sayfalardaki kişisel alanlara yayılmaz. Geri bildirim, ana sayfa/hizmetler/yakınlar/güvenlik içeriklerinde sabit seçeneklerle alınır. Gizlilik ve koşullar bağlantıları testin kapsamını açıklamaya devam eder.

Eski dosya yolları aynı uygulama içinde 308 yönlendirmeleriyle karşılanır: index.html ana sayfaya, trenger-hjelp.html talebe, familie.html yakınlara, oppdrag.html yardımcı başvurusuna, trygghet.html güvenliğe, bli-hjelper.html yardımcı sayfasına, personvern.html gizliliğe ve drift.html operasyona gider. Bu yönlendirmeler eski Vercel alan adının taşındığı anlamına gelmez.

## 9. Görsel tasarım, erişilebilirlik ve arama görünürlüğü

Mevcut tasarımın yönü sakin, anlaşılır ve yetişkin kullanıcıya saygılıdır. Beyaz zemin, koyu lacivert metin ve petrol yeşili eylemler korunur. Ev hayatına ait temsili görsel kullanılır; görsel gerçek müşteri veya doğrulanmış yardımcı kanıtı olarak sunulmaz.

| Tasarım öğesi | Değer / uygulama |
| --- | --- |
| Ana metin | `#10384A` |
| Ana eylem | `#0B5152` üzerine beyaz |
| Destek yüzeyi | `#EDF5F5` |
| İkincil metin | `#52676F` |
| Hata | `#912B24` |
| Klavye odağı | `#A96A00`, görünür dış çizgi |
| Yazı | Arial/Helvetica; ana vurgu için Georgia; uzak font bağımlılığı yok |
| Gövde | Yaklaşık 17 px; esnek `rem` ölçüleri ve rahat satır aralığı |
| Ana düğme | Yaklaşık 54 px yükseklik; açık eylem adı |
| Yerleşim | Masaüstünde en fazla 1260 px; mobilde tek/iki sütuna geçiş |
| Hareket | Kısa geçişler; azaltılmış hareket tercihine uyum |

Tasarım hedefi WCAG 2.2 AA'dır. Klavye erişimi, alan etiketleri, hata açıklamaları, kontrast ve yakınlaştırma birlikte değerlendirilmelidir. Bu hedef, tüm yasal erişilebilirlik yükümlülüklerinin doğrulandığı anlamına gelmez. [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)

### Uygulanan kararların amacı

Hizmet adları eylem ve somut görev üzerinden verilir. Tek ana eylem, ziyaretçiyi ne yapacağı konusunda yönlendirir. Form hatası ilgili alanı açıklayarak düzeltme ister; yalnızca renge dayanmaz. Mobil yerleşim geniş masaüstü düzenini dar ekrana uyarlar. Yerel yazı tipleri uzak font isteğini ortadan kaldırır.

Sayfa başlıkları ve dil alternatifleri tanımlıdır. İnceleme sitesi noindex/nofollow kullanır. Genel açılışta indeksleme, seçilen alan adı, gerçek hizmet bölgesi, işletme bilgileri ve yönlendirmeler birlikte ele alınmalıdır. Mevcut sürüm için organik trafik, Lighthouse puanı veya tam erişilebilirlik uygunluğu kanıtlanmış değildir.

## 10. Üç dilde web içeriği ve editoryal düzen

| Öğenin amacı | Norsk Bokmål | English | Türkçe |
| --- | --- | --- | --- |
| Marka cümlesi | Praktisk hjelp. På dine premisser. | Everyday help. On your terms. | Günlük destek. Sizin tercihlerinizle. |
| Ana başlık | Hjemme er livet ditt. | Your life. Your home. | Hayatınız. Eviniz. |
| Destek cümlesi | Vi hjelper med hverdagen. | A little help along the way. | Günlük işlerde yanınızdayız. |
| Ana eylem | Be om hjelp | Request help | Yardım iste |
| Yakınlar | For pårørende | For families | Yakınlar için |
| Ödeme ve erişim | Betaling gir ikke automatisk innsyn. | Paying does not automatically give access. | Ödeme yapmak otomatik bilgi erişimi sağlamaz. |
| Fiyat | Totalpris | Total price | Toplam fiyat |

Üç dilde aynı hizmet kapsamı, aynı fiyat durumu ve aynı yetki anlamı korunur. Kelimesi kelimesine çeviri yerine doğal ve açık dil kullanılır. Önce kullanıcının sorusu yanıtlanır; bir sonraki adım söylenir; “kesin rezervasyon” ile “talep” karıştırılmaz. Bu editoryal tercih [Språkrådet'in açık dil önerileriyle](https://sprakradet.no/klarsprak/om-skriving/generelle-skriverad-bokmal/) uyumludur.

Metinlerin kaynağı `lib/content.ts` içindeki sabit anahtarlardır. Mevcut katalog 287 ortak anahtar, altı hizmetin başlık/açıklaması ve iki e-posta satırından oluşur. Yeni bağımsız tasarım önizlemesi aynı kataloğu kullanır; yerel önizlemeye özgü birkaç açıklama kendi üç dilli dosyasındadır.

### İçerik dosyasının kullanımı

NAVIAR-CARE_Icerik_NB-EN-TR.csv dosyası bu belgeleme sırasında doğrudan sayıldı: **301 kayıt**, dört sütun: key, nb, en, tr. Bu sayı 301 sayfa anlamına gelmez; her kayıt aynı öğenin üç dildeki karşılığını taşır. 287 ortak metin anahtarı, 12 hizmet başlık/açıklama kaydı ve 2 e-posta kaydı vardır.

İçerik değişikliğinde önce amaç ve hizmet kapsamı belirlenir; ardından aynı anahtarın üç dildeki anlamı güncellenir. lib/content.ts ana kaynaktır; e-posta metinleri lib/care-integrations.ts içindedir. Sadece CSV'nin değiştirilmesi siteyi otomatik güncellemez. Çeviri kontrolü, hedef kullanıcıların görevi ve sonraki adımı anlayabildiği testlerle tamamlanmalıdır.

Örneğin “Talep kaydedildi” bir randevu vaadi değildir. “Test teklifi onaylandı” gerçek yardımcı atandığını söylemez. “E-posta sağlayıcısı kabul etti” mesajın teslim edildiği anlamına gelmez. “İncelendi” ise para iadesi veya uyuşmazlık çözümü değildir. Bu ayrımlar üç dilde korunur.

Tam metinler ayrı içerik CSV'sinde; aşağıdaki Ek A'da kritik kullanıcı mesajlarının Türkçe kaynak karşılıkları bulunmaktadır.

## 11. Talep, takvim ve durum mantığı

Mevcut kayıt akışı dört adımdır: destek → zaman → kişi ve tercihler → kontrol ve test kaydı. Europe/Oslo saatleri ve yaz/kış saati belirsizlikleri sunucuda kontrol edilir. Girişsiz seçim yapılabilir; kalıcı kayıt için giriş gerekir. Mevcut giriş akışı sayfayı yenileyebildiğinden kaydetmek isteyen kullanıcı formdan önce giriş yapmalıdır.

| Durum | Anlamı |
| --- | --- |
| `requested` | Kullanıcının test talebi kaydedildi |
| `consent_pending` | Başkası için talep; alıcının onayı bekleniyor |
| `quoted` | Test kaynağı ve toplam tutar içeren teklif var |
| `confirmed` | Test teklifi onaylandı; gerçek yardımcı atanmış sayılmaz |
| `cancelled` | Talep iptal edildi |
| `disputed` | İşlem elle inceleme gerektiriyor |

Test kaynağı için çakışma engeli, en az 15 dakika ara ve en fazla 24 saat teklif tutma mevcuttur. Bunlar gerçek yardımcı takvimi ve ulaşım planlamasının yerine geçmez. Saat değişikliğinde eski teklif geçersiz olur. Ödeme başladıktan sonra iptal/değişiklik daha sıkı kontrole girer; çift tahsilat yaratabilecek yeni ödeme sessizce başlatılmaz.

Ödeme hedefi, kart verisini NAVIAR formuna almayan sağlayıcı sayfasıdır. Mevcut Stripe bağdaştırıcısı test anahtarlarıyla sınırlıdır. Sunucu tutarı, imzalı bildirim, olay tekrarı ve oturum eşleşmesi kontrol edilir. Tarayıcının başarı sayfasına dönmesi ödeme kanıtı değildir. Gerçek hesap, sağlayıcı testi, vergi, iade ve yardımcıya ödeme modeli açılış işidir. [Stripe webhook belgeleri](https://docs.stripe.com/webhooks)

### Doğrulama ve değişiklik kuralları

Kaynak kodu; altı hizmetten biri, 30/60/90/120 dakikalık süre, geçerli gelecek Oslo tarihi, dört haneli Norveç posta kodu, test adı ve açık test onayı ister. Posta kodunun biçim olarak kabul edilmesi hizmet kapasitesi bulunduğunu göstermez. “Bugün” veya “düzenli” tercihi otomatik acil hizmet ya da tekrarlayan randevu serisi yaratmaz.

Tekrar gönderilen aynı talep aynı kimlik ve içerikle yeni kayıt oluşturmaz. Aynı kimlikle farklı içerik gönderilirse çakışma döner. Değişikliklerde revision alanı önceki sürümü kontrol eder; başka bir işlemle değişmiş kayıt kullanıcıya yeniden gösterilmelidir. Teklif tutarı sunucuda belirlenir ve para biriminin en küçük birimiyle saklanır. NOK için 450,00 gösterimi 45000 birime karşılık gelir; geliştirici bu ayrımı API entegrasyonunda korumalıdır.

Ödeme akışı başladıktan sonra iptal veya zaman değişikliği otomatik sürdürülmez. Olay bildirimi ayrı kaydedilir; ödeme bağlantısını kapatma denemesi başarısız olsa bile olay kaybolmaz. İnceleme tamamlanmış ödemeyi otomatik iade etmez.

## 12. Teknik mimari ve veri modeli

Mevcut teknoloji korunur: React 19, TypeScript, Vinext/Vite ile App Router yapısı, Cloudflare Worker, D1/SQLite ve Drizzle şeması. Kesin bağımlılık sürümleri `package-lock.json` dosyasındadır. Siteye özgü kimlik ve bağlantılar ayrı yapılandırmadadır. Bu paket standart bir Next.js uygulamasını Vercel'e tek tıklamayla taşıma vaadi içermez; altyapı değişikliği ayrı uyarlama gerektirir.

| Dosya/alan | Görevi |
| --- | --- |
| `components/care-app.tsx` | Sayfalar, dört adımlı talep, hesap ve operasyon arayüzü |
| `app/globals.css` | Marka renkleri, bileşenler, mobil ve odak görünümü |
| `lib/content.ts` | Üç dilde ortak metin ve hizmet kataloğu |
| `lib/care-api.ts` | Talep, hesap, operasyon, analiz ve bildirim uçları |
| `lib/care-domain.mjs` | Zaman, doğrulama, durum ve tahmin kuralları |
| `lib/care-integrations.ts` | Stripe test ödemesi ve Resend bağdaştırıcısı |
| `db/schema.ts` | Talep, teklif zamanı, başvuru, olay, analiz ve ödeme olay tabloları |
| `app/chatgpt-auth.ts` | Mevcut özel inceleme kimlik desteği |
| `worker` ve `build` | Worker giriş noktası ve derleme yardımcıları |
| `scripts` ve `tests` | Hizmet kabulü, içerik ve derlenmiş yanıt kontrolleri |
| `design-preview` | Bu belgeyle teslim edilen bağımsız tasarımın okunabilir HTML/CSS/JS kaynağı |

Başlıca veri tabloları: `care_requests`, `care_reservations`, `care_applications`, `care_cases`, `care_outbox`, `care_payment_events`, `care_analytics`, `care_feedback`, `care_audit`. Alıcı daveti, temsil belgesi ve gerçek yardımcı takvimi bu tablolardan varmış gibi türetilmez; açılış için ayrı model ve uygulama gerekir.

API örnekleri: `GET /api/status`, `GET/POST /api/bookings`, `POST /api/applications`, `POST /api/analytics`, `POST /api/feedback`, `GET /api/operations`, `GET/DELETE /api/me`, `POST /api/webhooks/stripe`. Kayıt değiştirme ve operasyon komutlarının kesin sözleşmesi `lib/care-api.ts` içindedir; istemci tarafındaki düğmeler sunucu yetkisinin yerine geçmez.

### İstek nasıl işlenir?

Tarayıcı dil yoluna bir sayfa isteği yapar. Worker, eski yolları yönlendirir; API isteklerini careApi işleyicisine verir; diğer sayfalar için dili URL'den belirleyip Vinext/React yanıtını üretir. Arayüz içerik kataloğunu ve sunucu API'sini kullanır. API kimliği, sahipliği, işlem durumunu ve girdiyi denetledikten sonra D1 üzerinde sorgu veya işlem yürütür. Sağlayıcı bağlantısı varsa ödeme ve e-posta ayrı bağdaştırıcılara gider.

| Tablo | Temel amaç | İlişki |
| --- | --- | --- |
| care_requests | Sahip, hizmet, zaman, durum, ödeme bilgisi | Ana test talebi |
| care_reservations | Test kaynağı, zaman aralığı, süreli ayırma | Talep başına kayıt |
| care_applications | Yardımcı adayının test başvurusu | Başvuran hesaba ait |
| care_cases | Olay nedeni, sorumluluk ve inceleme | Talebe bağlı |
| care_outbox | E-posta ve ödeme bağlantısı kapatma işi | Talebe bağlı |
| care_payment_events | İşlenmiş ödeme olayının kimliği | Talebe bağlı |
| care_audit | Aktör, eylem ve zaman | Talebe bağlı |
| care_analytics | Sınırlı içerik olayları | Hesap kimliği tutulmaz |
| care_feedback | Sabit seçenekli içerik geri bildirimi | Hesap kimliği tutulmaz |

Talebe bağlı tablolarda silme ilişkileri ve gerekli indeksler şemada tanımlıdır. Gerçek müşteri adresi, doğrulanmış yardımcı takvimi veya alıcı daveti mevcut veri modelinde tamamlanmış kabul edilmez.

### Kaynak paketindeki sürümler

package.json; React 19.2.6, TypeScript 5.9.3, Vinext 0.0.50, Vite 8.0.13, Drizzle ORM 0.45.2, Wrangler 4.92.0 ve Next 16.2.6 kayıtlarını taşır. Bunlar incelenen paketin sürümleridir; yeni sürüm önerisi veya güncellik iddiası değildir. Tekrarlanabilir kurulum için package-lock.json esas alınır.

## 13. Kimlik, erişim ve gizlilik

Özel uygulama Sites/ChatGPT oturumuna bağlıdır. Kayıtların sahibi sunucuda belirlenir; istemcinin gönderdiği kullanıcı kimliğine güvenilmez. Operasyon yetkisi ayrıca kontrol edilir. Kamuya açık müşteriler için giriş yöntemi, yardımcı hesabı ve alıcı yetkilendirmesi henüz çözülmüş kabul edilmez.

Mevcut testte hesap kimliği/e-postası, test adı, posta kodu, hizmet, zaman ve tercihler tutulur. Açık adres, tanı ve banka bilgisi istenmez. Gerçek hizmette adresin ne zaman gerektiği, kimlerin hangi süreyle görebileceği ve silme/erişim talepleri ayrı tanımlanacaktır. Akrabalık veya ödeme yapma, bilgi paylaşım yetkisi değildir.

İşletme açılışından önce veri sorumlusu, işleme amaçları ve dayanakları, veri işleyen sözleşmeleri, saklama ve aktarım düzeni belgelenmelidir. Bu belge kesin bir hukuki uygunluk görüşü değildir; seçilecek çalışma modeli değerlendirmeyi etkiler. Analiz için zorunlu olmayan izleme varsayılan kapalı tutulur; ret ve kabul anlaşılır biçimde sunulur. [Datatilsynet çerez rehberi](https://www.datatilsynet.no/personvern-pa-ulike-omrader/internett-og-apper/cookies/)

### Sunucu tarafındaki erişim sınırı

API, Sites ortamının sağladığı doğrulanmış kullanıcı başlıklarını okur. İnceleme dışı bir ortama taşınırsa bu başlıkların istemci tarafından taklit edilememesi sağlanmalıdır; yalnızca arayüzde oturum açma düğmesi koymak aynı güven sınırını kurmaz. Operasyon yetkisi ayrı hesap tanımıyla kontrol edilir. Kullanıcının başka bir talebin kimliğini bilmesi o kaydı okuyabildiği anlamına gelmez.

Durum ucu ve Stripe bildirim ucu dışındaki API işlemleri oturum ister; analiz ve geri bildirim kayıt uçları da bu genel oturum kontrolünün arkasındadır. Analiz tablolarında hesap kimliği tutulmaması, kayıt uçlarının kamuya açık olduğu anlamına gelmez. Veri değiştiren normal isteklerde kaynak alan adı ve içerik türü denetlenir. Stripe bildirimi bunun yerine imza doğrulamasıyla kontrol edilir.

### Veri indirme ve silme

GET /api/me kullanıcının test taleplerini, başvurularını ve olaylarını JSON olarak indirir. DELETE /api/me uygun test kayıtlarını siler. Ödenmiş, ödeme oturumu açılmış veya itirazlı kayıt varsa otomatik silme 409 ile durur ve elle inceleme gerekir. Bu teknik davranış gerçek hizmetin bütün saklama ve hukuki yükümlülüklerini tek başına tanımlamaz.

Kaynak kodunda CSP, içerik türü koruması, referrer ve cihaz izinleri başlıkları vardır. Bazı CSP kuralları inline betik/stil kullanımına izin verir. Bunlar uygulanmış kontrollerdir; bağımsız sızma testi veya Malwarebytes sertifikası değildir. Bu proje belgesine parola, API anahtarı, özel erişim belirteci veya müşteri verisi alınmamıştır.

## 14. Ödeme, e-posta ve bildirim entegrasyonları

Mevcut Resend bağdaştırıcısı işlem bildirimleri için şablon ve kalıcı kuyruk içerir. Deneme e-postası yalnızca tanımlı test alıcısına yöneliktir; hesap ve gönderici alan adı bağlı değildir. Sağlayıcının mesajı kabul etmesi alıcıya teslim edildiğini kanıtlamaz. Açılış öncesinde gönderici doğrulaması, yetkili alıcıya teslim, geri dönüş ve tekrar denemeler sınanmalıdır. [Resend gönderim API'si](https://resend.com/docs/api-reference/emails/send-email)

Önerilen bildirimler: talep alındı, yeni teklif, değişen saat, iptal sonucu ve izin verilmişse ziyaret tamamlandı. İşlem e-postaları ile pazarlama aboneliği ayrıdır. E-postaya adres, sağlık bilgisi veya ayrıntılı özel görev notu eklenmez; gerektiğinde kullanıcı kendi güvenli hesabına yönlendirilir.

Destek kanalı için işletme sahibinin isimli sorumlu ve çalışma saatleri belirlemesi gerekir. “7/24 destek”, otomatik SMS veya teslim edilmiş mesaj iddiası kullanılmaz.

### Mevcut bağlantıların gerçek durumu

Ödeme bağdaştırıcısı yalnızca sk_test_ önekli Stripe anahtarlarını, bildirim sırrını ve HTTPS uygulama adresini kabul eder. Canlı ödeme olayı reddedilir. Aynı ödeme girişimi için oturum yeniden kullanılır; bildirimde istek, oturum, tutar ve NOK para birimi eşleştirilir. Gerçek satıcı hesabı, sağlayıcı sandbox işlemi, yardımcıya ödeme ve iade uygulaması tamamlanmış değildir.

E-posta için RESEND_API_KEY, MAIL_FROM ve MAIL_TEST_RECIPIENT gerekir. Tanımlı test alıcısı dışına otomatik müşteri gönderimi yapılmaz. Kuyruk en çok üç deneme, iki dakikalık kilit/bekleme ve 23 saatten sonra elle inceleme davranışı içerir. Yeniden deneme düğmeleri otomatik çalışan zamanlayıcı değildir. Mevcut işlem şablonu test talebinin kaydedildiğini bildirir; tüm ziyaret yaşam döngüsü bildirimleri uygulanmış sayılmaz.

### Ortam değişkenleri

| Değişken | Kullanım |
| --- | --- |
| APP_ORIGIN | Doğru HTTPS dönüş adresi |
| STRIPE_SECRET_KEY | Sadece test ödeme anahtarı |
| STRIPE_WEBHOOK_SECRET | Bildirim imzası doğrulama |
| RESEND_API_KEY | E-posta sağlayıcısı erişimi |
| MAIL_FROM | Doğrulanacak gönderici |
| MAIL_TEST_RECIPIENT | Açıkça yetkilendirilmiş test alıcısı |
| OPERATIONS_USER_ID | Yetkili operasyon hesabı |
| OPERATIONS_EMAIL | Kullanıcı kimliği tanımlı değilse kullanılan eşleştirme |

Gerçek değerler kod deposuna veya belgeye yazılmaz. .env.example boş alan adlarını gösterir. DB, çalışma ortamındaki veritabanı bağlantısıdır. Başka bir site için mevcut proje kimliği gelişigüzel tekrar kullanılmaz.

## 15. Analiz, geri bildirim ve tahmin

Amaç insanların özel durumunu tahmin etmek değil, hangi bilgilerin arandığını ve hizmetin nerede aksadığını anlamaktır. Sayfanın görünmesi, kaydırma veya süre sinyali kişinin metni okuduğunu ya da anladığını kanıtlamaz. Kullanıcının açıkça seçtiği hizmete göre ilgili kapsam açıklaması önerilebilir.

| Gösterge | Tanım | Kullanılacağı karar |
| --- | --- | --- |
| Talep tamamlama | Aynı dönemde geçerli kaydedilen talep / başlayan akış | Formdaki gereksiz yükü azaltma; ölçüm kapsamı eşleştirilir |
| Teklif kabulü | Kabul edilen teklif / verilen geçerli teklif | Fiyat ve uygunluk değerlendirmesi |
| Gerçekleşen ziyaret | Tamamlanan gerçek ziyaret / onaylanan gerçek ziyaret | Operasyon kalitesi; test kayıtları hariç |
| Zamanında başlangıç | Kararlaştırılmış toleransta başlayan / gerçekleşen ziyaret | Planlama ve kapasite |
| Kullanıcı memnuniyeti | Yanıt dağılımı ve yanıt verenlerin oranı birlikte | Kalite iyileştirmesi; herkesin görüşü gibi genellenmez |
| Ziyaret katkısı | Ziyaret geliri eksi değişken maliyetler | Sürdürülebilir fiyat ve bölge kararı |
| Şikâyet çözümü | Açılan, üstlenilen ve sonuçlandırılan olaylar ayrı | Sorumluluk ve iyileştirme |

Mevcut analiz sınırlı olay alanları kullanır, serbest metin ve hesap kimliği toplamaz, küçük rapor gruplarını gizler. Son 90 gün raporlanır; daha eski veriler için bakım işlemi gerekir. Otomatik zamanlanmış temizlik kurulmuş sayılmaz.

Mevcut tahmin prototipi 84 tam günlük veri tabanı ve 28 günlük geçmiş testle basit haftalık modelleri karşılaştırır; test verisini reddeder. Bu eşikler her mevsimi veya her hizmeti açıklamak için yeterlilik garantisi değildir. Gerçek veri yokken talep tahmini veya personel önerisi üretilmez. Sağlık durumu, bilişsel durum veya aile ilişkileri gezinmeden çıkarılmaz.

### Kodda ölçülen olaylar

page_view, content_engaged, service_view ve booking_started izin listesindedir. İşlem gerçekleştiğini öne süren payment_confirmed gibi istemci olayları kabul edilmez. Tekrarlanan olay kimliği yeniden sayılmaz. İçerik ve geri bildirim grupları en az beş kayıt olduğunda gösterilir; bu eşik tek başına anonimlik güvencesi değildir.

Talep tahmini bir başlangıç fonksiyonudur; kendi başına veri beslemesi, otomatik günlük hesaplama veya görevli personel planlaması kurmaz. 84 günlük tam veri ve 28 günlük geçmiş dönem karşılaştırması vardır. Ortalama mutlak hata ile geçen haftanın aynı günü ve dört haftalık aynı gün ortalaması karşılaştırılır. Çıktı aralığı kalibre edilmiş güven aralığı değildir. Mevcut test verisiyle tahmin üretimi kapalıdır.

## 16. Doğrulama kayıtları ve testlerin anlamı

Bu bölümdeki uygulama testi sayıları 5 Eylül 2026 tarihli teslim raporu ve kod rehberinden alınmıştır. **Bu belge hazırlanırken tüm uygulama testleri yeniden yürütülmedi.** Yayın kaydı tekrar kontrol edildi, kaynak dosyalar okundu ve içerik CSV'si sayıldı. Belgenin kendi sayfa düzeni ayrıca kontrol edilir.

| Kontrol | Önceki sonuç | Kanıtın sınırı |
| --- | --- | --- |
| Hizmet kabulü | 26/26 geçti | SQLite ve sentetik sağlayıcı yanıtları |
| Derlenmiş sunucu | 3/3 geçti | Yönlendirme, dil/başlık ve yetkisiz erişim |
| Bağımsız tasarım | 4/4 geçti | Yerel model, dil ve veri göndermeme sınırı |
| Dil/sayfa üretimi | 36/36 geçti | 3 dil × 12 sunucu görünümü |
| Analiz tercihi saklama hatası | Geçti | Saklama engelinde varsayılan kapalı davranış |
| TypeScript ve derleme | Geçti | O günkü kilitli kaynak bağımlılıkları |
| Seçilmiş kontrast çiftleri | Geçti | Raporlanan çiftler; tüm ekranların denetimi değil |
| Güncel özel yayın kaydı | Yeniden doğrulandı | Sürüm 5; succeeded; özel erişim |
| İçerik kataloğu | Yeniden sayıldı | 301 satır; nb/en/tr sütunları dolu |

Önceki yanıtlardaki **29 senaryo**, 26 hizmet + 3 derlenmiş sunucu kontrolüdür. **33 senaryo** buna 4 bağımsız tasarım kontrolünün eklenmesidir. **36 dil/sayfa kontrolü** ayrı kapsamdır; 36 farklı kullanıcı yolculuğu veya 36 tarayıcı testi değildir. Eski 25 test ve 270 satır sayıları sürüm 2 geçmişine aittir.

Hizmet testleri; kayıt ve tekrar gönderim, hesaplar arası erişim, alıcı onayı engeli, olaylar, sunucu yetkisi, analiz sınırları, ödeme imzası ve eşleşmesi, veri silme, yardımcı başvurusu, zaman çakışması, teklif süresi, ödeme yarışı, vaka üstlenme, kuyruk denemeleri ve tahmin veri sınırlarını kapsar. Test kodu tests/care/acceptance.test.mjs içindedir.

Ekran okuyucu, gerçek cihaz, klavye ile oturumlu uçtan uca yolculuk, hedef yaşlı kullanıcılarla anlama testi, gerçek sağlayıcı sandbox ödemesi, e-posta teslimi, saha ziyareti ve bağımsız güvenlik denetimi tamamlanmış olarak kaydedilmemiştir. Bunlar için “geçti” sonucu üretilmez.

## 17. Kararlar ve değişiklik günlüğü

| Aşama | Karar | Gerekçe / reddedilen seçenek | Sahip ve durum | Sonraki doğrulama |
| --- | --- | --- | --- | --- |
| Discover | SRC-03 ve sürüm 5 kaynak alındı | Ayrı CARE/Consult kaynaklarını karıştırma reddedildi | Proje hazırlığı; doğrulandı | Eski Vercel kaynağı erişimi |
| Define | Yönetilen günlük destek modeli önerildi | Kontrolsüz ilan deneyimi pilot için seçilmedi | İşletme sahibi; öneri | Sorumluluk ve maliyet kararı |
| Design | Mevcut marka ve üç dil korundu | Gereksiz yeni marka/site oluşturulmadı | Tasarım; uygulandı | Hedef kullanıcı testi |
| Validate | Kaynak ve bağımsız önizleme için ayrı kanıt | Yerel HTML'nin gerçek rezervasyon gibi sunulması reddedildi | Teknik; teslim kontrolü | Gerçek tarayıcı/saha testi |
| Build | Tek dosya önizleme ve okunabilir kaynak eklendi | Sunucu işlevlerini dosyada taklit eden kayıt oluşturulmadı | Teknik; uygulandı | Teknik teslim raporu |
| Launch | Mevcut özel yayın korundu | İşletme bilgileri olmadan genel açılış yapılmadı | İşletme sahibi; bekliyor | Açılış dosyasının tamamlanması |
| Measure | Açık tercihler ve toplu ölçüm | Hassas durum çıkarımı reddedildi | Veri/operasyon; pilot bekliyor | Gerçek veri kalitesi |
| Scale | Bölge ve düzenli ziyaret kanıta bağlandı | Kanıtsız uluslararası kapsam reddedildi | İşletme sahibi; öneri | Pilot kalite ve maliyet sonuçları |

Tüm satırlar 5 Eylül 2026 tarihli bu konsept çalışmasına aittir. “İşletme sahibi” bir sorumlu rolüdür; henüz ismen atanmış proje ekibi olduğunu göstermez.

### Bu belgeye ait yeni kayıt

5 Eylül 2026 / Document–Validate: SRC-03'ün geliştirme öyküsü, konsepti, web yapısı, veri modeli, API sözleşmesi ve kurulum adımları tek dokümantasyonda birleştirildi. Yayın ile kaynak ZIP'in farklı rolleri açıklandı. Ticari açılış, e-posta gönderimi veya ödeme etkinleştirilmedi. Kaynak teslimlerin önceki kimlikleri korundu.

## 18. Pilot ve canlı açılış planı

Önerilen pilot, tek doğrulanmış bölgede, sınırlı görev kataloğu ve eğitimli küçük yardımcı havuzuyla başlar. İlk aşamada eşleştirme insan tarafından yapılır. Başarı yalnızca talep sayısıyla ölçülmez; alıcının kararını anlayabilmesi, doğru kişiye doğru görevin verilmesi, iptal/olay yönetimi ve sürdürülebilir maliyet birlikte değerlendirilir.

| Faz | Somut çıktı | Bir sonraki faza geçiş ölçütü |
| --- | --- | --- |
| Discover | Yaşlı kullanıcı, yakını ve yardımcı görüşmeleri | Temel ihtiyaç ve yanlış anlaşılan kavramlar belgelendi |
| Define | İşletme, bölge, görev, fiyat ve sorumluluklar | İsimli sahipler ve onaylı hizmet koşulları |
| Design | Üç dil, ziyaret özeti ve destekli başvuru | Hedef kullanıcılar görevi ve sonraki adımı anlayabiliyor |
| Validate | Gerçekçi görevlerle kullanılabilirlik ve saha provası | Kritik yetki, güvenlik ve ödeme sorunları kapalı |
| Build | Gerçek hesap, takvim ve bildirim entegrasyonları | Sağlayıcı testleri ve erişim sınırları kanıtlandı |
| Launch | Sınırlı ticari pilot | Görevli ekip ve olay müdahalesi hazır |
| Measure | Kalite, maliyet ve tekrar talep değerlendirmesi | Düzenli hizmeti destekleyen yeterli operasyon kanıtı |
| Scale | Yeni bölge veya düzenli ziyaret modeli | Her yeni bölgede kapasite, kalite ve maliyet tekrar doğrulandı |

Büyümede ilk kanallar, doğrulanmış bölgeye yönelik açık web içeriği, kullanıcı yönlendirmeleri ve uygun yerel iş birlikleridir. Kurum ortaklığı, belediye onayı veya müşteri referansı gerçekten sağlanmadan logolar ve iddialar yayımlanmaz. Sınırlı pilotun bütçesi ve takvimi işletme sahibi tarafından belirlenecektir.

### Açık işler

| Alan | Mevcut | Açılış için gereken |
| --- | --- | --- |
| Üç dilli web | Kod ve özel sürüm mevcut | Hedef kullanıcıyla dil ve erişilebilirlik doğrulaması |
| Talep ve hesap | Kalıcı test kayıtları mevcut | Kamuya açık müşteri kimliği ve saha süreci |
| Yardımcı | Doğrulanmamış başvuru kaydı | Kimlik, referans, eğitim, sözleşme ve sigorta |
| Aile onayı | Başkası adına kayıt bekletilir | Alıcı daveti, yetki kapsamı, süresi ve geri alma |
| Takvim | Test kaynağında çakışma engeli | Gerçek yardımcı takvimi ve ulaşım süresi |
| Ödeme | Test bağdaştırıcısı ve sentetik testler | Satıcı, fiyat/vergi, sandbox, iade ve mutabakat |
| E-posta | Şablon ve kuyruk | Gönderici hesabı ve yetkili alıcıya teslim kanıtı |
| Destek | Olay kayıtları ve rol atama | İsimli vardiya, iletişim ve çözüm yetkisi |
| Analiz | İzne bağlı toplu sinyaller | Veri kalitesi ve saklama bakımının işletilmesi |
| Tahmin | Başlangıç modeli | Gerçek geçmiş veri ve işe yararlılık ölçümü |
| Alan adı | Mevcut özel Site adresi | Seçilen alan adı ve yönetim erişimi |

Öncelik sırası: işletme ve bölge → fiyat/çalışma modeli → doğrulanmış yardımcı → alıcı yetkisi → ödeme/e-posta → saha pilotu → genel açılış. Teknik bir dosyanın bitmesi bu operasyon adımlarının tamamlandığı anlamına gelmez.

### Açılışta işin sahibini belirleme

İşletme sahibi, yasal işletme kimliği, gerçek iletişim noktası, hizmet bölgesi, fiyat ve çalışma modeli için karar verir. Operasyon sorumlusu yardımcı kabulü, kapasite, ulaşım ve dört istisna sürecini doğrular. Teknik sorumlu gerçek hesap, alıcı yetkisi, ödeme/e-posta ve yedekten dönüş kanıtını hazırlar. Kullanıcı deneyimi sorumlusu yaşlı kişi, yakını ve yardımcıyla üç dilde görev testlerini yürütür. Bunlar önerilen sorumlu rollerdir; isimli ekip atandığı anlamına gelmez.

Pilot başlangıç tarihi ve bütçesi doğrulanmamıştır. Teknik testlerin geçmiş olması ticari açılış onayı yerine geçmez. Genel erişim kararı ancak bu listedeki gerçek işletme girdileri ve hizmet provası tamamlandığında değerlendirilir.

## 19. Kodu çalıştırma, bakım ve teslim

### Kaynak paketini kullanma

NAVIAR-CARE_SRC03_Web-Kodu.zip içindeki NAVIAR-CARE-SRC03 klasörü tam uygulamayı ve design-preview kaynağını içerir. Bağımlılıklar, .git geçmişi, gerçek ortam sırları ve müşteri kayıtları teslim paketine dahil değildir. Yerel tasarım HTML dosyası sunucuya talep göndermez; giriş/ödeme/e-posta sistemi içermez. Tam uygulama ise doğru sunucu ve kimlik ortamına ihtiyaç duyar.

### Geliştirici kurulumu

Node.js 22.13 veya üzeri ve Bash/GNU araçları beklenir. Önceki teslim Node 24.19 ile doğrulanmıştır. Windows kullanıcısı için paket rehberi WSL2/Linux ortamını belirtir. Kaynak klasöründe çalıştırılır:

```bash
npm ci
npm run dev
```

Bu iki komut arayüz geliştirmesini başlatır. Sites kimliği ve D1 bağlantısı kendiliğinden oluşmaz. Yerel ekranda formun açılması kayıt ve yetki sisteminin doğru kurulduğunu göstermez. Mevcut özel ortam veya uyumlu Worker/D1 kurulumuyla birlikte değerlendirilmelidir.

### Değişiklikten sonra doğrulama

```bash
npm test
npm run preview:export
npm run test:preview
```

npm test derlemeyi, hizmet kabulünü, içerik kontrollerini ve derlenmiş sunucu testlerini çalıştırır. preview:export tek dosya tasarımı yeniden üretir. test:preview bu tasarımın dört kontrolünü çalıştırır. Kesin betikler package.json içindedir; başarılı sonuç alınmadan yeni test sayısı raporlanmaz.

### Neyi nerede değiştirmeli?

| İhtiyaç | Kaynak dosyası |
| --- | --- |
| Üç dilde metin | lib/content.ts |
| Sayfalar ve form | components/care-app.tsx |
| Renk, tipografi, mobil düzen | app/globals.css |
| İş kuralı ve zaman | lib/care-domain.mjs |
| Kayıt ve operasyon komutları | lib/care-api.ts |
| Ödeme/e-posta | lib/care-integrations.ts |
| Veri modeli ve migration | db/schema.ts ve drizzle klasörü |
| Sunucu dil/yönlendirme | worker/index.ts ve app/layout.tsx |
| Bağımsız HTML görünümü | design-preview/index.template.html |
| Bağımsız etkileşim | design-preview/preview.js ve preview-model.mjs |

### Bakım düzeni

Her değişiklikte kaynak revizyonu, etkilediği metin/dil, veritabanı değişikliği, test sonucu ve yayın kimliği kaydedilmelidir. Şema değişirse migration dosyası da teslimin parçasıdır. Uygulama ve şema birlikte değerlendirilmeden yalnızca eski kodu yayımlamak güvenli geri dönüş kanıtı sayılmaz. Veritabanı yedeği, geri yükleme provası ve olay sorumlusu canlı açılış için açık iştir.

Analiz/geri bildirim için 90 günden eski kayıtları silen manuel bakım komutu mevcuttur; takvimli otomatik temizlik kurulmuş değildir. E-posta ve ödeme bağlantısı kapatma işleri yetkili operasyon müdahalesi gerektirebilir. Sayfanın haftalık erişim kontrolü, konuşmada önceden etkin bir görev olarak bildirilmiştir; bu belge o görevin ayarlarını yeniden doğrulamaz ve ikinci bir görev oluşturmaz.

Bu belgeleme çalışmasında kod veya şema değiştirilmedi ve yeniden yayın yapılmadı. Genel alan adı bağlantısı ve eski Vercel projesinin güncellenmesi açık konu olarak korunur.

## 20. Kaynak, sürüm ve dosya envanteri

### Kanıt sırası

Yayın erişimi için güncel Site ve deployment kaydı; uygulama davranışı için kaynak kodu; geçmiş kontroller için sürüm 5 teslim raporu; önerilen hizmet modeli için tam konsept belgesi esas alındı. Daha eski kurulum/düzen belgelerindeki sayılar tarihsel kayıt olarak okundu. Aynı marka altında bulunan başka kaynakların tamamlandığı bu kanıtlardan çıkarılmadı.

| Kaynak | Kullanım |
| --- | --- |
| NAVIAR-CARE_SRC03_Tam-Konsept.md | 23 bölümlük hizmet ve web konsepti |
| NAVIAR-CARE_Profesyonel-Surum_Teslim.md | Sürüm 5 durumu; önceki test ve yayın kanıtı |
| NAVIAR-CARE_Kurulum-ve-Kabul.md | Sürüm 2 test prosedürünün tarihsel kaydı |
| NAVIAR-CARE_PROJE-DUZENI.md | Proje adı, SRC kimlikleri ve dosyalama düzeni |
| NAVIAR-CARE_Icerik_NB-EN-TR.csv | 301 üç dilli içerik kaydı |
| NAVIAR-CARE_SRC03_Web-Kodu.zip | UI, API, şema, test ve çalıştırma rehberi |
| Site ve deployment kaydı | Güncel özel erişim ve başarılı sürüm 5 yayını |

### Yayın ile ZIP ilişkisi

Özel yayın sürümü 5, uygulamanın çevrimiçi inceleme halidir. Kaynak ZIP'in Git arşiv açıklaması 911f93067573336337a89540293a496f9aa30c2d revizyonunu taşır; ZIP, bağımsız tasarım önizlemesini de içerir. Bu ek tasarımın sürüm 5'e sonradan yayımlandığı iddia edilmez. Teknik denetimde farklı revizyonlar tek bir aynı-dosya kanıtı olarak kullanılmamalıdır.

Kaynak uygulama kimliği: appgprj_6a9b750d3c1081918f3676dbc136bbe1. Yeniden okunan başarılı yayın: appgdep_6a9c68bf07f48191a0c59e7806d426f5. Bu kimlikler proje izlenebilirliği içindir; hesap sırları değildir.

### Dış başvuru kaynakları

Açık dil için [Språkrådet yazım önerileri](https://sprakradet.no/klarsprak/om-skriving/generelle-skriverad-bokmal/), erişilebilirlik hedefi için [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/), ödeme olayları için [Stripe webhook belgeleri](https://docs.stripe.com/webhooks), çerez/izleme değerlendirmesi için [Datatilsynet çerez rehberi](https://www.datatilsynet.no/personvern-pa-ulike-omrader/internett-og-apper/cookies/) kullanılır. Bu dört sayfa 5 Eylül 2026 tarihinde yeniden açıldı. Bunlar proje için bir sertifika veya hukuki uygunluk kararı vermez.

Önceki konsept ve teslim raporunda SeniorSupport, Nyby, Mio Omsorg, Papa, Home Instead ve Birdie hizmet sayfaları tasarım referansı olarak kaydedilmiştir. Bu belgede onların güncel fiyatı, pazar konumu veya hizmet performansı yeniden araştırılmadı. Önceki araştırma kayıtlarının ürün kararına dönüşen ortak noktaları: somut görev anlatımı, insan koordinasyonu, doğrulanmış işletme kimliği ve alıcının seçimine bağlı yakın iletişimidir.

### Arşiv düzeni

Bu belge ve düzenlenebilir metni NAVIAR CARE projesinin 01_BELGELER bölümünde tutulur. Mevcut konsept, içerik ve kaynak teslimler ayrı kimlikleriyle korunur. Kaynak kodunun esas çalışma yeri Git kaydıdır. Bu belge mevcut bütün NAVIAR dosyalarının yeniden taşındığı, tüm logoların incelendiği veya başka web projelerinin birleştirildiği anlamına gelmez.

## 21. Ek A: kritik web mesajları

Aşağıdaki metinler içerik CSV’sinden aynen alınmıştır. Anahtar, geliştiricinin ilgili metni bulmasını sağlar. Bütün 301 kaydın Norveççe, İngilizce ve Türkçe karşılıkları ayrı CSV dosyasındadır.

### signinFirst

Kaydetmek istiyorsanız formu doldurmadan önce giriş yapın. Giriş sırasında sayfa yenilenir ve seçimler silinir. Formu kaydetmeden de deneyebilirsiniz.

### sharingInactive

Bu önizlemede paylaşım etkin değildir. Seçiminiz tercih olarak kaydedilir. Aile üyelerine erişim verilmez.

### recipientPendingNotice

Bu talep, yardım alan kişinin onayını bekleyecek. Bu önizlemede başka bir hesaptan onay verme açık değildir.

### previewNextBody

Test talebini Taleplerim bölümünde görebilir, değiştirebilir veya iptal edebilirsiniz. Yardımcı gönderilmez ve ödeme alınmaz.

### noAutomaticEmail

Bu test otomatik e-posta göndermez. Kayıt bilgisi burada ve Taleplerim bölümünde görünür.

### localDraftNote

Burada geri dönerken veya dil değiştirirken seçimler korunur. Sayfayı kapatırsanız veya yenilerseniz taslak saklanmaz.

### calendarBody

Her teklif, zamanı en fazla 24 saat ayırır. Aynı test kaynağının ziyaretleri çakışamaz; arada en az 15 dakika gerekir. Test kaynağı, onaylı yardımcı değildir.

### acceptedSaved

Test teklifi onaylandı. Gerçek yardımcı rezerve edilmedi.

### emailSent

E-posta sağlayıcısı kabul etti. Teslimat doğrulanmadı.

### caseReviewNote

İncelendi işareti, incelemeyi kaydeder. İtirazı sonuçlandırmaz, iade yapmaz veya ödemeyi yeniden açmaz.

### analyticsRetentionBody

Bu görünüm son 90 günü kapsar. Testte silme elle çalıştırılır. Gerçek kullanımdan önce otomatik silme kurulmalıdır.

### feedbackBody

Yanıtlamak isteğe bağlıdır. Seçimlerinizi ve yanıtladığınız sayfayı hesabınızla ilişkilendirmeden kaydederiz. Bu form rezervasyon veya destek mesajı oluşturmaz.

## 22. Ek B: API başvuru tablosu

Kesin davranış lib/care-api.ts ve lib/care-domain.mjs dosyalarında tanımlıdır. Aşağıdaki tablo incelenen kaynağın özetidir; üretim API'si sözleşmesi olarak sürüm garantisi vermez.

| Yöntem / yol | Erişim | İşlem |
| --- | --- | --- |
| GET /api/status | Durum bilgisi | Test modu, oturum ve entegrasyon hazır olma işaretleri |
| GET /api/bookings | Oturum | Kullanıcının son 100 talebi |
| POST /api/bookings | Oturum + origin | Doğrulanmış test talebi; tekrar gönderim kontrolü |
| PATCH /api/bookings/:id | Kayıt sahibi + origin | sharing, cancel, reschedule, accept, report, checkout |
| POST /api/applications | Oturum + origin | Doğrulanmamış yardımcı başvurusu |
| POST /api/analytics | Oturum + origin + izin | Sınırlı olay kaydı |
| POST /api/feedback | Oturum + origin | Sabit seçenekli gönüllü yanıt |
| GET /api/operations | Operasyon yetkisi | Talep, olay, bildirim ve toplu içerik görünümü |
| POST /api/operations | Operasyon yetkisi + origin | quote, send_test_email, retry_expiry, claim_case, resolve_case, maintenance |
| GET /api/me | Oturum | Test verilerini JSON indirme |
| DELETE /api/me | Oturum + origin | Uygun kayıtları silme; ödeme/itiraz varsa inceleme |
| POST /api/webhooks/stripe | Sağlayıcı imzası | Test ödemesini tutar/oturum/olay ile doğrulama |

Normal JSON istekleri için boyut sınırı, tür kontrolü ve şema doğrulaması vardır. Talep oluşturma hesap başına saatte 20 kayıt sınırına; yardımcı başvurusu hesap başına beş kayıt sınırına sahiptir. Bunlar bütün uçlar için kapsamlı kötüye kullanım veya DDoS savunması değildir.

Başlıca hata durumları: 401 oturum eksik, 403 yetki/origin uygun değil, 404 kayıt bulunamadı veya görünmüyor, 409 sürüm/zaman/durum/ödeme çatışması, 429 hız sınırı, 503 depolama veya entegrasyon hazır değil. Kullanıcı, hata aldıktan sonra özellikle ödeme için sessizce yeni işlem başlatmaya yönlendirilmemelidir.

## 23. Ek C: kısa kabul ve devir senaryosu

Bu prosedür inceleme ortamı içindir. Gerçek kişisel, sağlık, adres veya kart bilgisi kullanılmaz. Sağlayıcı mesajı gönderme bu belgeleme görevinin parçası değildir.

1. Özel siteye kendi hesabınızla giriş yapın; formun dilini seçin. Kayıt yapılacaksa giriş formdan önce tamamlanmalıdır.
2. Bir destek türü, gelecekte Oslo zamanı, süre ve “kendim için” seçeneği belirleyin. Temsili ad ve test posta kodu girin; özeti kontrol edip test talebini kaydedin.
3. Taleplerim sayfasını yenileyin. Kaydın kaldığını ve kesin gerçek randevu olarak sunulmadığını kontrol edin.
4. Yetkili operasyon görünümünde TEST-01 gibi bir test kaynağı ve örnek test tutarıyla teklif hazırlayın. Tutar bir ticari fiyat önerisi değildir.
5. Aynı kaynağa çakışan bir zaman için ikinci teklif vermeyi deneyin. Çakışma reddedilmeli; süreli teklif kullanıcıya gösterilmelidir.
6. Teklifi kullanıcı hesabından onaylayın. Gerçek yardımcı atandığı veya para çekildiği söylenmemelidir.
7. Ödeme başlamadan saat değişikliği yapın veya iptal edin. Eski teklif geçersiz olmalı, ayrılan zaman uygun biçimde bırakılmalıdır.
8. “Başka biri için” yeni test talebi açın. Kayıt alıcı onayında beklemeli; yakına otomatik erişim veya teklif verilmemelidir.
9. Temsili olay oluşturun. Yetkili kişi üstlenmeden inceleme tamamlandı olarak işaretleyememeli; inceleme iade anlamına gelmemelidir.
10. Uygun test verisini indirin ve silme davranışını deneyin. Ödeme/itiraz engeli varsa “silindi” mesajı verilmemelidir.

Her denemede kaynak sürümü, ortam, tarih, beklenen sonuç ve gözlenen sonuç kaydedilir. Bu senaryonun belgede yer alması yeniden çalıştırıldığı anlamına gelmez.
