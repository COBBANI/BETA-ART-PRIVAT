# NAVIAR CARE — Baştan sona hizmet ve web konsepti

**Proje:** NAVIAR CARE / SRC-03  
**Belge kodu:** NAVIAR-CARE-SRC03-CONCEPT-20260905 · **Belge sürümü:** 1.0  
**Tarih:** 5 Eylül 2026 · **Belge dili:** Türkçe  
**Kaynak uygulama:** özel inceleme sürümü 5, `255ee9b2f98e5cfab344ede26f876908d0ab6877`  
**Mevcut web sitesi:** [Türkçe](https://naviar-care-src03.andersen-betul.chatgpt.site/tr) · [Norsk](https://naviar-care-src03.andersen-betul.chatgpt.site/nb) · [English](https://naviar-care-src03.andersen-betul.chatgpt.site/en)

Bu belge, yaşlılara günlük destek sunan SRC-03 projesinin hizmet modelini, müşteri deneyimini, web tasarımını ve teknik uygulamasını bir araya getirir. Mevcut kodla doğrulanan özellikler “mevcut”; işletme kararı veya yeni uygulama gerektirenler “öneri” olarak belirtilmiştir. Özel inceleme uygulaması kullanılabilir; ticari hizmet açılmamıştır.

## 1. Konseptin özü

**NAVIAR CARE, evinde yaşamaya devam etmek isteyen yaşlıların günlük işlerde ve sosyal yaşamda destek almasını sağlayan, insan koordinasyonuyla yürütülen tıbbi olmayan hizmettir.** Yardım alan kişi ne yapılacağını, ziyaret zamanını ve hangi bilginin kiminle paylaşılacağını belirler. Yakını destek önerebilir ve gelecekte ödemeyi üstlenebilir; bu rol kişiye otomatik bilgi erişimi sağlamaz.

Hizmetin değeri yalnızca bir yardımcı bulmak değildir. İhtiyacı anlaşılır bir göreve dönüştürmek, göreve uygun kişiyi belirlemek, toplam fiyatı önceden açıklamak, ziyaretin gerçekleşmesini takip etmek ve sorun olduğunda sorumluluğu üstlenmektir. Web sitesi bu sürecin kullanıcıya görünen kapısıdır; saha operasyonu olmadan tek başına hizmeti yerine getirmez.

Vizyon: İnsanların kendi evlerinde gündelik hayat üzerindeki söz hakkını koruyarak destek alabilmesi. Misyon: Küçük ama önemli günlük ihtiyaçları, anlaşılır koşullar ve sürdürülebilir insan desteğiyle karşılamak. Sağlık sonucu, yalnızlığın belirli oranda azalması veya evde daha uzun kalma süresi için ölçülmemiş sonuç vaadi verilmez.

## 2. Proje kimliği ve marka

| Alan | Karar |
| --- | --- |
| Kullanıcıya görünen marka | NAVIAR CARE |
| Bu çalışmanın kaynak kimliği | SRC-03 |
| İlk referans | https://beta-art-series1.vercel.app/ |
| Güncel özel inceleme | https://naviar-care-src03.andersen-betul.chatgpt.site |
| Ana pazar yaklaşımı | Norveç odaklı tasarım; ilk hizmet bölgesi işletme tarafından doğrulanacak |
| Diller | Norveççe Bokmål, İngilizce, Türkçe |
| Kapsam | Tıbbi olmayan günlük destek |
| Marka ilişkisi | NAVIAR Consult işyeri danışmanlığından ve klinik proje kaynaklarından ayrı hizmet kaydı |

SRC-03 korunur; diğer NAVIAR kaynaklarının numaraları bu belgeyle değiştirilmez. Eski adresteki Beta Art ifadesi kamuya açık marka tutarlılığı bakımından çözülmesi gereken konudur. Doğrulanmış alan adı seçildikten sonra kaynak adreslerle yönlendirme planı hazırlanmalıdır. Mevcut logo kullanılır; bu çalışma marka tescil araştırması veya tescil garantisi değildir.

Marka cümlesi: **“Günlük destek. Sizin tercihlerinizle.”** Bu cümle hizmetin temel davranışını anlatır. Hastane dili, çocuklaştıran hitaplar ve korku üzerinden satış yerine kişiye doğrudan, yetişkin bir birey olarak seslenilir.

## 3. Hangi ihtiyacı çözüyoruz?

Bir alışverişin yapılması, telefonun ayarlanması veya dışarı çıkarken eşlik bulunması günlük hayatı kolaylaştırabilir. Yardım arayan kişi görev sınırını, gelecek kişiyi, toplam fiyatı ve bir sorun yaşarsa kime ulaşacağını anlamak ister. Yakını ise destek verebilmek isterken kişinin tercihlerini ihlal etmemelidir. Yardımcı da nerede, ne kadar süreyle ve hangi sınırlar içinde çalışacağını önceden bilmelidir.

Başlangıç hipotezi şudur: Bu üç taraf için aynı ziyaretin koşullarını açıklaştırmak, belirsizliği ve koordinasyon yükünü azaltacaktır. Bu bir doğrulanmış müşteri araştırması sonucu değildir. Pilot görüşmeleriyle sınanacak hizmet hipotezidir.

## 4. Hedef kullanıcılar ve ihtiyaçlar

| Kullanıcı | Yapmak istediği iş | Tasarımın karşılığı |
| --- | --- | --- |
| Yardım alan kişi | Günlük işi için destek bulmak ve kontrolü korumak | Açık hizmet seçimi; ziyaret ve paylaşım için ayrı karar |
| Yakını | Yakınına destek organize etmek | Ayrı başlatma yolu; alıcının onayı; ödeme ile bilgi erişiminin ayrılması |
| Yardımcı | Yetkin olduğu görevleri açık koşullarla üstlenmek | Görev kapsamı, ulaşım, süre, ücret ve durdurma hakkı |
| Operasyon sorumlusu | Uygun eşleştirme ve sorunsuz ziyaret sağlamak | İnceleme kuyruğu, kapasite, olay kaydı ve sorumlu ataması |
| İşletme sahibi | Kaliteyi ve ekonomik sürdürülebilirliği yönetmek | Ziyaret maliyeti, iptal, kapasite ve memnuniyet raporları |

Dijital deneyimi sınırlı kullanıcılar için gelecekte telefonla destekli talep oluşturma önerilir. Doğrulanmış telefon numarası ve görevli ekip olmadan numara veya “hemen arayın” vaadi yayımlanmaz. Temsil gerektiren durumlarda yalnızca akrabalık beyanına dayanılmaz; uygun yetki süreci ayrıca kurulmalıdır.

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

## 6. Ayırt edici hizmet yaklaşımı

Önerilen marka deneyimi, her ziyaret öncesinde beş sorunun yanıtlanmasıdır:

1. **Ne yapılacak?** Kullanıcı görev kapsamını kendi kelimeleriyle anlayabilmeli.
2. **Kim gelecek?** Göreve uygunluğu doğrulanmış kişi ve değişiklik durumu açıklanmalı.
3. **Ne zaman ve ne kadar süre?** Başlangıç, süre ve gecikme halinde haberleşme net olmalı.
4. **Toplam ne ödenecek?** Yol, malzeme ve diğer ücretlerin dahil olup olmadığı görünmeli.
5. **Kim neyi görebilecek?** Bilgi paylaşımı, ziyaret ve ödemeden ayrı seçilmeli.

Bu yapı “ziyaret özeti” ekranına ve operasyon kontrolüne birlikte yansır. Bir özelliğin web sayfasında yazması yeterli değildir; ilgili koşulun arka planda da doğrulanması gerekir. Aynı yardımcıyla devam etme isteği alınır, ancak müsaitlik ve uygunluk doğrulanmadan garanti verilmez. Bu yaklaşımın dünyada ilk veya rakipsiz olduğu ileri sürülmez.

## 7. Hizmet paketleri ve gelir modeli

**Önerilen başlangıç modeli:** Yönetilen hizmet. NAVIAR CARE talebi alır, görevi netleştirir, uygun yardımcıyı seçer ve ziyaretin takibini üstlenir. Serbest ilan pazarının tüm sorumluluğu kullanıcıya bırakan deneyimi başlangıç modeli olarak seçilmemiştir. Yardımcıların çalışan mı yoksa bağımsız sağlayıcı mı olacağı işletme kararı ve ilgili yükümlülük değerlendirmesi gerektirir.

| Paket önerisi | Kullanıcıya sunduğu şey | Açılma koşulu |
| --- | --- | --- |
| Tek ziyaret | Bir veya birkaç uyumlu günlük görev için önceden fiyatlanan ziyaret | Bölge, süre, yardımcı ve toplam fiyatın onayı |
| Düzenli destek | Belirli aralıklarla tekrar eden ziyaret talebi | Kapasite, süreklilik, iptal ve yenileme koşullarının pilotta doğrulanması |
| Yakınımla planlama | Yakının talebi başlatması ve ödemeyi üstlenmesi | Alıcının bağımsız onayı ve ayrı paylaşım yetkisi |

Paket adları ve süreleri ticari fiyat listesi değildir. Mevcut kod test ziyaretinde süre seçimi sağlar; abonelik tahsilatı veya tekrarlayan ziyaret serisi kurulu değildir. Kamu kurumlarına satış ve kurumsal anlaşmalar sonraki fazda değerlendirilir; mevcut sözleşme varmış gibi gösterilmez.

Fiyatlandırma, yardımcı emeği, işveren/tedarik maliyetleri, ulaşım, koordinasyon, sigorta, ödeme sağlayıcısı, iptal riski ve işletme payını karşılamalıdır. Ziyaret başına katkı = vergi hariç gelir − o ziyarete bağlı değişken maliyetler. Komisyon oranı, vergi uygulaması ve nihai fiyat bu belgeyle belirlenmez. Fiyat kesinleşmeden “ücretsiz”, “en ucuz” veya sabit saat ücreti kullanılmaz.

## 8. Kullanıcı yolculukları

### Yardım alan kişi

Kişi ana sayfadan destek türünü seçer. Talep akışında tercih ettiği zamanı, süreyi ve kimin yardım alacağını belirtir. Özette görev, zaman, paylaşım tercihi ve fiyatın henüz netleşmediğini görür. Test talebini kaydettikten sonra hesabında izler, uygun durumlarda saati değiştirir veya iptal eder. Ticari modelde operasyonun uygunluk değerlendirmesi ve gerçek teklifinden sonra ziyaret onaylanacaktır.

### Yakını

Yakını aynı hizmet kataloğundan “başka biri için” yolunu seçer. Alıcının kararının beklendiği açıkça belirtilir. Mevcut uygulamada bu kayıt beklemede kalır; başka hesabın alıcı olarak davet edilmesi ve yetki doğrulaması henüz açılmamıştır. Hedef modelde alıcı ziyaret onayını ve belirli kişiye verilecek bilgi yetkisini ayrı verir. Ödeme belgesi, ziyaret ayrıntıları ve özel notlar aynı erişim düzeyine sahip olmaz.

### Yardımcı

Yardımcı uygun olduğu hizmetleri ve bölgesini belirtir. Başvuru “doğrulanmamış” durumunda açılır. Hedef operasyon; kimlik kontrolü, aranmış referans, görev bazlı yetkinlik, eğitim, çalışma koşulları ve sigorta kontrolünden sonra görevlendirme yapar. Yardımcı, görevin uygun olmadığını düşündüğünde işi durdurabilmeli ve koordinatöre ulaşabilmelidir. Başvuru yapmak işe kabul veya görev garantisi değildir.

### Koordinatör

Koordinatör talebi inceleyip kapsamı, alıcı onayını, kapasiteyi ve fiyatı kontrol eder. Test sürümünde gerçek kişi yerine test kaynağı kullanılır. Hedef modelde görevli kişi, kabul ettiği ziyaretleri ve gerekli asgari bilgileri görür. Ziyaret sonrası kayıt ve olası itiraz aynı ziyaret kimliği üzerinden takip edilir.

## 9. Hizmetin sahadaki işleyişi

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

## 10. İstisna ve şikâyet yönetimi

| Durum | İlk eylem | Kullanıcıya açıklanacak |
| --- | --- | --- |
| Yardımcı gelmedi | Koordinatör durum ve alternatif kapasiteyi kontrol eder | Güncel durum; yeni saat veya iptal seçeneği |
| Kapı açılmadı | Önceden kararlaştırılmış iletişim planı uygulanır | Eve zorla girilmez; belirlenen yetkili kişiye uygun kapsamda ulaşılır |
| Ek iş istendi | Kapsam ve süre yeniden değerlendirilir | Yeni ücret ve görev, işe başlanmadan onaylanır |
| Ödeme itirazı | Ödeme sorumlusu işlem ve hizmet kayıtlarını inceler | İnceleme durumu; henüz iade yapılmadıysa bu açıkça belirtilir |
| Yardımcı işi güvenli bulmuyor | Görev durdurulur ve koordinatöre bildirilir | Güvenli alternatif veya iptal süreci |

Mevcut uygulamada ilk dört kategori için olay kaydı ve sorumlu üstlenme akışı vardır. “İncelendi” işareti, sorunun çözüldüğü veya paranın iade edildiği anlamına gelmez. Acil bir olay web formunun izlenmesini beklememelidir; bu site acil yardım veya nöbetçi hizmet değildir.

## 11. Web sitesi bilgi mimarisi

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

## 12. Görsel tasarım sistemi

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

## 13. Dil ve ana sayfa metinleri

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

## 14. Talep, rezervasyon ve ödeme mantığı

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

## 15. Teknik mimari ve kodun yapısı

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

## 16. Kimlik, gizlilik ve veri paylaşımı

Özel uygulama Sites/ChatGPT oturumuna bağlıdır. Kayıtların sahibi sunucuda belirlenir; istemcinin gönderdiği kullanıcı kimliğine güvenilmez. Operasyon yetkisi ayrıca kontrol edilir. Kamuya açık müşteriler için giriş yöntemi, yardımcı hesabı ve alıcı yetkilendirmesi henüz çözülmüş kabul edilmez.

Mevcut testte hesap kimliği/e-postası, test adı, posta kodu, hizmet, zaman ve tercihler tutulur. Açık adres, tanı ve banka bilgisi istenmez. Gerçek hizmette adresin ne zaman gerektiği, kimlerin hangi süreyle görebileceği ve silme/erişim talepleri ayrı tanımlanacaktır. Akrabalık veya ödeme yapma, bilgi paylaşım yetkisi değildir.

İşletme açılışından önce veri sorumlusu, işleme amaçları ve dayanakları, veri işleyen sözleşmeleri, saklama ve aktarım düzeni belgelenmelidir. Bu belge kesin bir hukuki uygunluk görüşü değildir; seçilecek çalışma modeli değerlendirmeyi etkiler. Analiz için zorunlu olmayan izleme varsayılan kapalı tutulur; ret ve kabul anlaşılır biçimde sunulur. [Datatilsynet çerez rehberi](https://www.datatilsynet.no/personvern-pa-ulike-omrader/internett-og-apper/cookies/)

## 17. E-posta, bildirim ve destek

Mevcut Resend bağdaştırıcısı işlem bildirimleri için şablon ve kalıcı kuyruk içerir. Deneme e-postası yalnızca tanımlı test alıcısına yöneliktir; hesap ve gönderici alan adı bağlı değildir. Sağlayıcının mesajı kabul etmesi alıcıya teslim edildiğini kanıtlamaz. Açılış öncesinde gönderici doğrulaması, yetkili alıcıya teslim, geri dönüş ve tekrar denemeler sınanmalıdır. [Resend gönderim API'si](https://resend.com/docs/api-reference/emails/send-email)

Önerilen bildirimler: talep alındı, yeni teklif, değişen saat, iptal sonucu ve izin verilmişse ziyaret tamamlandı. İşlem e-postaları ile pazarlama aboneliği ayrıdır. E-postaya adres, sağlık bilgisi veya ayrıntılı özel görev notu eklenmez; gerektiğinde kullanıcı kendi güvenli hesabına yönlendirilir.

Destek kanalı için işletme sahibinin isimli sorumlu ve çalışma saatleri belirlemesi gerekir. “7/24 destek”, otomatik SMS veya teslim edilmiş mesaj iddiası kullanılmaz.

## 18. Ölçüm ve talep tahmini

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

## 19. Araştırmadan tasarıma alınan kararlar

Aşağıdaki inceleme 5 Eylül 2026 tarihinde açık birincil sayfalarla sınırlıdır. Rakiplerin operasyon kalitesini veya güvenlik düzeyini doğrulamaz. Benimsenen noktalar NAVIAR için tasarım çıkarımıdır.

| İncelenen hizmet | Gözlenen düzen | NAVIAR'a alınan karar |
| --- | --- | --- |
| [SeniorSupport](https://seniorsupport.no/tjenester/praktisk-hjelp) | Günlük görev örnekleri, fiyat/ziyaret koşulları ve sabit ziyaret yaklaşımı | Somut görevleri öne çıkar; gerçek toplam fiyatı randevudan önce açıkla |
| [Nyby](https://nyby.com/about) | Kurumlar ve yerel kaynaklar arasında görev paylaşımı | İnsan koordinasyonunu ve görev uygunluğunu modelin parçası yap |
| [Mio Omsorg](https://mio.no/omsorg/) | Hizmet alanı, iletişim ve kurumsal kimliğe erişim | Doğrulanmış işletme kimliğini ve destek yolunu görünür kıl |

Rakip fiyatları NAVIAR fiyatı olarak alınmadı; rakip müşteri sözleri veya görselleri kullanılmadı. Dünyanın en iyi sitesi veya kanıtlanmış pazar liderliği gibi bir sıralama iddiası yoktur.

## 20. Pilot, açılış ve büyüme

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

## 21. Mevcut durum ve canlı açılış dosyası

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

## 22. Bu teslimdeki dosyalar nasıl kullanılır?

**Tam konsept:** Bu Markdown belgesi ve aynı metnin tarayıcıda okunabilen HTML sürümü. HTML belgesinin yazdırma görünümü de vardır.

**Bağımsız web tasarımı:** `NAVIAR-CARE_SRC03_Web-Tasarim.html` dosyasını tarayıcıda açın. Üç dil, hizmetler, yakınların rolü, güvenlik, SSS ve yerel seçim özeti incelenebilir. Kaynakları `design-preview` klasöründedir. Bu dosyada talep sunucuya gönderilmez; hesap, e-posta ve ödeme bağlantısı yoktur. Tam uygulamaya giden bağlantılar açıkça etiketlidir.

**Tam uygulama kodu:** Kaynak ZIP, mevcut özel uygulamanın React/TypeScript arayüzünü, API'yi, şemayı, testleri, kilitli bağımlılıkları, yeni bağımsız önizleme kaynağını ve teknik rehberi içerir. `node_modules`, gerçek ortam sırları, kullanıcı kayıtları ve derlenmiş yayın paketi dahil edilmez. Kurulum ve kontroller `docs/KODU-CALISTIRMA.md` içindedir.

Bu teslimde genel erişim açılmaz ve eski Vercel projesi değiştirilmez. Kod yeni bir işletme veya doğrulanmış ticari hizmet oluşturduğu iddiasıyla sunulmaz.

## 23. Karar ve değişiklik günlüğü

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
