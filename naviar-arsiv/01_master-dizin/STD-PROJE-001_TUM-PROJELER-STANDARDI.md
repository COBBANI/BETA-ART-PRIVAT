# STD-PROJE-001 — Tüm projeler için çalışma ve arşiv standardı

Sürüm: 1.3 | İlk kayıt tarihi: 2026-09-04 | Güncelleme tarihi: 2026-09-05 (UTC) | Dayanak: kullanıcının açık talepleri.

## Kullanıcının kalıcı çalışma tercihi

Her proje için proje adı ve numarası belirlenecek; konsept içeriğini açıklayan numaralı belge hazırlanacak; web sayfasının kaynak kodu teslim edilecek; web sayfası profesyonel tasarım, içerik ve kullanılabilirlik ilkeleriyle geliştirilecek. Bu yaklaşım tüm projelere uygulanacak.

Kullanıcının ek talebi: “BUNU HAFIZANA KAYDET VE HER PROJE ICIN KULLAN”. Bu talebin konusu, aşağıda tam metni bulunan /AUTOPROMPT — Konsept ve İş Modeli Geliştirme çerçevesidir. Çerçeve tüm projelerde varsayılan çalışma yöntemi olarak kullanılacak; kullanıcıdan her seferinde komutu yeniden yazması istenmeyecek. Uygulamanın ayrıntı düzeyi projenin niteliğine, aşamasına ve mevcut görevin kapsamına uyarlanacak. Kullanıcının sonraki açık yönlendirmeleri önceliklidir.

Bu dosya, tercihin tekrar kullanılabilir yazılı kaydıdır. Sohbetler arası kişisel hafıza ayarlarının güncellendiğine dair teknik onay değildir.

Varsayılan komut dizisi: `/PLAN /SERVICE-DESIGN /SAFETY /GDPR /ACCESSIBILITY /RISK` → `/RESEARCH /LATEST /PRIMARY /CITE /FACTCHECK` → `/DESIGN /WIREFRAME /ARCHITECTURE /SEO /TEST` → `/TRUTHMODE /REDTEAM /CRITIQUE /GAPS` → `/REWRITE /CLEAR /HUMANIZE /PROOFREAD` → `/PLAN /EXECUTE /VERIFY`. `/PROOFREA`, `/PROOFREAD` olarak yorumlanır. Bunlar kullanıcının çalışma kısayollarıdır; kendi başlarına araç çalıştırmaz veya sistem kurmaz. Uygulama ve kanıt kuralları EK-KOMUT bölümündedir.

## Proje kimliği ve ayrımı

1. Her ayrı web konsepti ayrı proje kimliği taşır. Aynı sitenin birebir kopyaları yeni proje sayılmaz.
2. Mevcut arşiv kontrol edilir; kullanılan numaralar sessizce değiştirilmez veya başka projeye atanmaz.
3. Marka, web projesi, belge, sürüm ve deployment kimlikleri birbirinden ayrılır.
4. Kaynak eşleştirme doğrulanamıyorsa numara öneri olarak işaretlenir; sahte geçmiş kaydı oluşturulmaz.
5. Kaynak URL, ilişkili marka, dosya yolu, oluşturulma tarihi biliniyorsa kaynağı ve çalışma tarihi kaydedilir.

## Her proje için teslimat

| Belge | İçerik |
|---|---|
| DOC-001 | Proje kimliği, konsept, hedef kitle, sorun, değer önerisi, kapsam, hizmet veya ürün modeli |
| DOC-002 | Tasarım kararları, kullanıcı yolculukları, sayfa içeriği ve erişilebilirlik yaklaşımı |
| DOC-003 | Kaynak kod, çalıştırma açıklaması, bağımlılıklar ve teknik sınırlar |
| DOC-004 | Yapılan kontroller, açık eksikler, yayın durumu ve değişiklik günlüğü |

Küçük projelerde DOC-001, DOC-002 ve DOC-004 tek ana belgede birleştirilebilir; ilgili bölüm numaraları korunur. Kod ayrıca gerçek çalışabilir dosya olarak verilir.

## İsimlendirme

Dosya: PROJE-KODU_DOC-001_KONSEPT_v1.0.uzanti
Sürümler v1.0, v1.1, v2.0 biçiminde ilerler. Sürüm numarası arşiv/proje numarasını değiştirmez.

Örnek: NAVIAR-CARE-001-WEB-01_DOC-001_KONSEPT_v1.0.html

## Tasarım ve geliştirme standardı

- Kullanıcı amacını ilk ekranda anlaşılır kıl; hedef kitlenin dilinde açık metin yaz.
- Tutarlı tipografi, renk, boşluk, düğme ve gezinme sistemi kullan.
- Mobil ekranları, klavyeyle erişimi, okunabilirliği ve hata durumlarını düşün.
- Gerçek olmayan fiyat, referans, müşteri sayısı, sertifika, hizmet kapasitesi ve iletişim bilgisi ekleme.
- Çalışmayan form veya ödeme işlemini çalışıyormuş gibi gösterme.
- Uygun araç ve becerileri ihtiyaca göre seç; sırf mevcut diye hepsini kullanma.
- İlgili kaynakları koru; başka projeleri izinsiz birleştirme veya üzerine yazma.
- Doğrulanmış olan, önerilen ve tamamlanmamış olanı ayrı belirt.

## İzlenebilirlik

Önemli kararları tarih, aşama, gerekçe, önceki durum, yeni durum ve sonraki adımla kaydet.
Aşamalar: Discover → Define → Design → Validate → Build → Launch → Measure → Scale.

Her teslimde yapılan iş, test edilen kapsam, açık engeller ve gerçek yayın durumu açıklanır. Kodun hazırlanması, canlı sitenin güncellenmesiyle aynı şey değildir.

Bu standart yeni çalışmaların varsayılan yöntemidir. Tüm geçmiş projelerin bu oturumda tamamlandığı veya kendiliğinden sürekli arka planda geliştirileceği anlamına gelmez.

## /AUTOPROMPT — KONSEPT VE İŞ MODELİ GELİŞTİRME

Bu komut herhangi bir projenin konseptini ve iş modelini (forretningsmodell) geliştirmek için kullanılır. Proje adı belirtilmemişse konuşmada üzerinde çalışılan proje esas alınır.

### 1. Amaç

Bu projenin geliştirilmesini proje lideri olarak üstlen. Strateji, hizmet tasarımı, müşteri deneyimi, operasyon, finans, teknoloji ve pazarlama açısından birlikte değerlendir.

Çalışmanın sonunda şu soruların cevaplandığı, gerekçeleri belgelenmiş ve uygulanabilir bir iş modeli oluştur:

Kimin hangi sorununu çözüyoruz, nasıl değer yaratıyoruz, hizmeti nasıl sunuyoruz, kim neden ödeme yapıyor ve bu model hangi koşullarda sürdürülebilir oluyor?

### 2. Başarı ölçütleri ve teslimatlar

Aşağıdaki çıktıları birbirini besleyen sırayla hazırla:

- **Mevcut durum ve proje kimliği:** Erişilebilir proje belgelerini, önceki kararları ve mevcut web sitesini incele. Projenin adını, varsa arşiv numarasını, gelişim aşamasını, mevcut varlıklarını ve açık sorularını kaydet. Mevcut numaralandırmayı koru; bulunamıyorsa önerdiğin numarayı açıkça belirt.

- **Problem ve müşteri analizi:** Kullanıcıyı, müşteriyi, ödeme yapanı ve karar vereni ayır. Hangi durumda hangi sorunla karşılaştıklarını, sorunun sıklığını ve etkisini, bugün kullandıkları çözümleri ve çözüm değiştirme nedenlerini açıkla. Öncelikli müşteri segmentini gerekçelendir.

- **Pazar ve alternatifler:** Güncel kaynaklarla doğrudan rakipleri, dolaylı alternatifleri ve müşterinin hiçbir şey yapmama seçeneğini incele. Fiyat, hedef kitle, hizmet kapsamı, erişim kanalı ve farklılaşmayı karşılaştır. Pazar büyüklüğü için yöntemini ve varsayımlarını göster.

- **Konsept seçenekleri:** En az üç anlamlı konsept alternatifi geliştir. Her biri için müşteri faydasını, gelir mekanizmasını, teslimat biçimini, maliyetleri, bağımlılıkları ve temel riskleri açıkla. Alternatifleri müşteri ihtiyacı, uygulanabilirlik, ekonomik sürdürülebilirlik ve doğrulanabilirlik açısından karşılaştır. Önerdiğin yönü ve elediğin seçeneklerin gerekçesini yaz.

- **Değer önerisi:** “Kimin için, hangi ihtiyaca, hangi çözümle, hangi faydayı sunuyoruz?” sorusuna açık bir cevap oluştur. Mevcut alternatiflerden farkımızı somutlaştır. Henüz kanıtlanmamış faydaları vaat olarak sunma.

- **İş modeli:** Business Model Canvas’ın dokuz alanını doldur: müşteri segmentleri, değer önerisi, kanallar, müşteri ilişkileri, gelir kaynakları, temel kaynaklar, temel faaliyetler, ortaklar ve maliyet yapısı. Alanlar arasındaki ilişkileri ve çelişkileri açıkla.

- **Hizmet tasarımı ve operasyon:** Müşterinin ilk temastan hizmet sonrası takibe kadar yolculuğunu tasarla. Her aşamadaki temas noktalarını, sorumluları, arka plandaki işleri ve gerekli sistemleri göster. Gecikme, iptal, hizmet aksaması, şikâyet ve ödeme uyuşmazlığı durumlarının nasıl yönetileceğini belirle. Birden fazla kullanıcı tarafı varsa bağlantılı yolculuklar oluştur.

- **Hizmet paketleri ve fiyatlandırma:** Başlangıçta sunulabilecek paketleri oluştur. Her paket için kapsamı, kapsam dışını, teslimatı, süresi, sorumlusu ve fiyatlandırma mantığını yaz. Fiyat önerilerini ödeme isteği ve gerçek teslimat maliyetiyle sınanacak hipotezler olarak işaretle.

- **Ekonomik model:** Gelir, sabit ve değişken maliyet, müşteri edinme maliyeti, müşteri başına katkı, kapasite ve başabaş noktasını hesapla. Düşük, temel ve yüksek senaryolar kur. Kullanılan formülleri ve varsayımları göster; kurucunun emeğini ücretsiz kabul etme.

- **Doğrulama planı:** En kritik varsayımları önem ve belirsizlik düzeyine göre sırala. Her biri için müşteri görüşmesi, teklif testi, manuel hizmet denemesi veya ücretli pilot gibi uygun bir deney belirle. Deneyin süresini, maliyetini, ölçümünü ve devam/değiştir/durdur eşiğini önceden yaz. İlgi göstermeyi ödeme davranışıyla eş tutma.

- **Pazara giriş ve uygulama:** İlk müşterilere ulaşma yöntemini, satış sürecini ve ortaklık fırsatlarını belirle. İlk 30, 60 ve 90 günün işlerini; sorumlu rol, bağımlılık, tahmini kaynak ihtiyacı ve tamamlanma ölçütüyle planla. İlk uygulanabilir hizmet sürümünü tanımla; yazılım ihtiyacını bu hizmetin gereksinimlerinden çıkar.

- **Karar ve değişiklik kaydı:** Discover → Define → Design → Validate → Build → Launch → Measure → Scale aşamalarına göre kararları kaydet. Her kayıt tarih, karar, dayanak, alternatifler, değişiklik nedeni ve yeniden değerlendirme koşulu içersin. Geçmiş tasarım tarihlerini veya karar gerekçelerini uydurma.

### 3. Kapsam ve çalışma sınırları

Genel tavsiyeler yerine bu projeye özgü öneriler üret. Mevcut konsepti gerektiğinde sorgula; her fikri otomatik olarak onaylama.

Doğrulanmış bilgi, varsayım, öneri ve bilinmeyenleri ayır. Eksik bilgileri sessizce tamamlama. Danışmanlık ve hizmet projelerinde uzmanlık, yöntem, hizmet kalitesi ve operasyonu merkeze al.

Mevzuat, erişilebilirlik, güvenlik veya kişisel veri gereksinimleri iş modelini etkiliyorsa bunları ilgili resmî kaynaklarla değerlendir.

### 4. Yetki ve ilerleme biçimi

Mevcut yetkiler kapsamında erişilebilir belgeleri incele, araştırma yap, hesaplamalar ve taslaklar oluştur. Rutin ve geri alınabilir çalışmalarda her adımda onay isteme.

Yeni harcama, sözleşme, dışarıya mesaj gönderme, veri silme veya kamuya yayımlama için mevcut yetkinin kapsamını kontrol et. Gerekli onayı, incelenebilir çalışma hazır olduğunda iste.

### 5. Kullanılacak araçlar

Amaca uygun dosya inceleme, web araştırması, hesaplama, tablo ve belge araçlarını kullan. Araçları ihtiyaca göre seç. Erişemediğin belge, hesap veya sistemi açıkça belirt.

### 6. Kanıt ve kalite standardı

Pazar, rakip, fiyat ve mevzuat iddialarının kaynaklarını ve tarihlerini göster. Finansal sonuçları girdilere ve formüllere bağla. Gerçek müşteri verisi yoksa bunu belirt.

Yapılmayan görüşmeyi, çalıştırılmayan testi, yayımlanmayan siteyi veya kaydedilmeyen belgeyi tamamlanmış gibi sunma. Belgeleri kaydettiğinde dosya bağlantılarını paylaş.

### 7. Tamamlanma ve durma koşulları

Çalışmayı; önerilen konsept, iş modeli, ekonomik senaryolar, doğrulama deneyleri, 90 günlük plan ve karar kaydı hazır olduğunda tamamla.

Her teslimatı hazır, varsayıma dayalı veya engelli olarak işaretle. Kritik bilgi ya da erişim eksikse önce bağımsız ilerleyebilen işleri tamamla, ardından yalnızca gerekli soruyu sor.

Sonunda en önemli kararı, en büyük belirsizliği ve hemen yapılacak ilk üç işi açıkça yaz.

Şimdi mevcut proje bağlamını incele ve çalışmaya başla.

## Sürüm değişiklik kaydı

| Sürüm | Tarih (UTC) | Değişiklik | Dayanak |
|---|---|---|---|
| 1.0 | 2026-09-04 | Proje kimliği, belgeler, kod, tasarım ve arşiv standardı | Önceki kayıt |
| 1.1 | 2026-09-04 | /AUTOPROMPT tam metni ve tüm projelerde varsayılan kullanım tercihi eklendi; önceki kurallar korundu | Kullanıcının “BUNU HAFIZANA KAYDET VE HER PROJE ICIN KULLAN” talebi |
| 1.2 | 2026-09-05 | Üç dilli web içeriği, hizmet akışları, entegrasyon kabul ölçütleri, analitik ve talep tahmini uygulama standardı eklendi | Kullanıcının profesyonel web sitesi ve bağlı sistemler talebi |
| 1.3 | 2026-09-05 | Altı komut grubu teslimat ve kanıtla eşleştirildi; araştırma kaydı, risk/başarısızlık senaryoları ve doğrulama protokolü eklendi; genel form alanları daraltıldı | Kullanıcının komut dizisi ve her projede uygulama talebi |

## EK WEB — Profesyonel web ve hizmet geliştirme standardı

Kayıt: STD-PROJE-001 / EK-WEB / v1.2. Bu ek, ayrı bir müşteri projesi numarası oluşturmaz.

**Mevcut çalışma durumu:** Ortak gereksinimler, üç dilli arayüz metinleri ve uygulama kabul ölçütleri hazırlandı. Bu konuşmada hedef web sitesi ve kaynak proje doğrulanamadı. Siteye özgü kod, tasarım, çeviri, rezervasyon, e-posta, ödeme veya analitik kurulumu yapılmadı. Canlı sistem testi ve güvenlik taraması çalıştırılmadı. Aşağıdaki maddeler bu sistemlerin kurulması ve doğrulanması için çalışma tarifidir.

### A. Hedefi ve iş sonucunu belirleme

İşe mevcut site URL’si, kaynak proje/depo, arşiv kimliği ve işletme eşleşmesini doğrulayarak başla. NAVIAR Consult, NAVIAR Care 1 ve NAVIAR Care 2 ayrı projelerdir. Bağlantı benzerliği veya son düzenleme tarihi tek başına eşleştirme kanıtı değildir.

Her site için kullanıcı görevi tanımla: doğru hizmeti bulmak, koşulları anlamak, uygun zamanı seçmek, başvuru göndermek veya satın almak. Satıcının kapasitesi, yanıt sorumlusu, hizmetin kapsamı ve müşteri desteği bu akışa bağlanır. Gelir elde etmeyi, hizmetin gerçekten ve kaliteli sunulmasıyla birlikte değerlendir.

Hedef site belirlendiğinde aynı müşteriye hitap eden 3–5 gerçek siteyi karşılaştır. İçerik açıklığı, hizmet seçimi, işlem adımları, mobil kullanım ve güven kanıtları için gözlenen örneği ve uygulanma gerekçesini kaydet. “Dünyanın en iyi sitesi” veya birincilik iddiası üretme; kaliteyi aşağıdaki ölçütlerle değerlendir. Henüz siteye özgü rakip karşılaştırması yapılmadı.

### B. Sayfa yapısı ve üç dilde içerik

Varsayılan diller Norveççe Bokmål (nb), İngilizce (en) ve Türkçe (tr). Norveç’e yönelik projelerde başlangıç dili Bokmål olur. Mevcut URL yapısı incelenir; gerekirse /nb/, /en/, /tr/ yolları ve eski adresler için yönlendirme planı kullanılır.

Sayfa kapsamı projeye uyarlanır: ana sayfa, hizmet/ürün listesi, detay sayfası, çalışma yöntemi, doğrulanmış ekip/işletme bilgisi, kaynaklar, sık sorulan sorular, rezervasyon veya satın alma, iletişim, işlem durumu ve ilgili koşullar. Kullanıcıya yararı olmayan boş sayfalar açılmaz. Gerçek bilgi sağlanmadıkça ekip, referans, istatistik, fiyat veya yanıt süresi yayımlanmaz.

İlk ekran kimin için hangi yardımın sunulduğunu, bir sonraki adımı ve bilinen süre/fiyatı açıklar. Başlıklar açıklayıcı, cümleler kısa ve etkin, düğmeler eyleme özgü olur. Bu editoryal yaklaşım [Språkrådet’in yazım önerilerine](https://sprakradet.no/klarsprak/om-skriving/generelle-skriverad-bokmal/) dayanır; hazırlanan metinler hedef kullanıcıyla ayrıca sınanır.

Her dil sürümü aynı hizmet kapsamını, para birimini, fiyatı, koşulu ve işlem durumunu aktarır. Dili değiştirmek kullanıcıyı aynı içeriğin diğer diline götürür. Meta başlık/açıklama, HTML dil bilgisi, sitemap, canonical ve karşılıklı hreflang eşleşmeleri denetlenir. [Google’ın yerelleştirilmiş sayfa rehberi](https://developers.google.com/search/docs/specialty/international/localized-versions) dil sürümlerinin kendilerini ve diğer sürümleri doğru adreslerle belirtmesini açıklar.

**Hazır ortak metin sözlüğü:** Bu metinler site içeriğinin tamamının çevrildiği anlamına gelmez. İşlem sonucu bildiren metinler yalnızca gerçek sistem durumunda gösterilir.

| İçerik anahtarı | Norsk bokmål | English | Türkçe |
|---|---|---|---|
| nav.services | Tjenester | Services | Hizmetler |
| nav.how | Slik fungerer det | How it works | Nasıl çalışır? |
| nav.contact | Kontakt oss | Contact us | Bize ulaşın |
| language.label | Velg språk | Choose language | Dil seçin |
| booking.start | Bestill en time | Book an appointment | Randevu alın |
| booking.service | Velg tjeneste | Choose a service | Hizmet seçin |
| booking.time | Velg dato og tidspunkt | Choose a date and time | Tarih ve saat seçin |
| booking.timezone | Tidssone: Europe/Oslo | Time zone: Europe/Oslo | Saat dilimi: Europe/Oslo |
| booking.request_received | Vi har mottatt forespørselen din. Timen er ikke bekreftet ennå. | We have received your request. Your appointment is not confirmed yet. | Talebinizi aldık. Randevunuz henüz onaylanmadı. |
| booking.confirmed | Timen din er bekreftet. | Your appointment is confirmed. | Randevunuz onaylandı. |
| booking.unavailable | Tidspunktet er ikke lenger ledig. Velg et annet. | This time is no longer available. Choose another. | Bu saat artık uygun değil. Başka bir saat seçin. |
| booking.reschedule | Endre tidspunkt | Reschedule | Randevu saatini değiştirin |
| booking.cancel | Avbestill timen | Cancel appointment | Randevuyu iptal edin |
| contact.submit | Send melding | Send message | Mesaj gönderin |
| contact.received | Vi har mottatt meldingen din. | We have received your message. | Mesajınızı aldık. |
| form.required | Fyll ut dette feltet. | Complete this field. | Bu alanı doldurun. |
| form.error | Vi kunne ikke sende skjemaet. Prøv igjen. | We could not submit the form. Please try again. | Formu gönderemedik. Tekrar deneyin. |
| payment.continue | Gå til betaling | Continue to payment | Ödemeye geçin |
| payment.pending | Vi venter på bekreftelse på betalingen. | We are waiting for payment confirmation. | Ödeme onayını bekliyoruz. |
| payment.confirmed | Betalingen er bekreftet. | Your payment is confirmed. | Ödemeniz onaylandı. |
| payment.failed | Betalingen kunne ikke fullføres. | The payment could not be completed. | Ödeme tamamlanamadı. |
| privacy.preferences | Personverninnstillinger | Privacy settings | Gizlilik ayarları |
| cookies.accept | Godta valgfrie informasjonskapsler | Accept optional cookies | İsteğe bağlı çerezleri kabul edin |
| cookies.reject | Avvis valgfrie informasjonskapsler | Reject optional cookies | İsteğe bağlı çerezleri reddedin |
| cookies.save | Lagre valgene mine | Save my choices | Seçimlerimi kaydedin |
| feedback.helpful | Var denne informasjonen nyttig? | Was this information useful? | Bu bilgi yararlı oldu mu? |

İletişim formunda yalnızca yanıtlamak için gerekli alanlar zorunlu tutulur. Genel başlangıç önerisi mesaj ve yanıt isteniyorsa bir iletişim kanalıdır. Ad, telefon ve ayrı konu alanı ancak gerekçeli ihtiyaç varsa zorunlu olur; anonim geri bildirim iletişim bilgisi gerektirmez. Sağlık ve danışmanlık projelerinde genel formda tanı veya hassas dosya istenmez; bu alanlara hassas bilgi yazılmaması açıklanır. Pazarlama aboneliği işlem mesajlarından ayrı tutulur.

### C. Rezervasyon, e-posta ve ödeme sözleşmeleri

Aşağıdaki gereksinimler ürün tasarım kararlarıdır. Sağlayıcıya özgü uygulama, hedef sistem seçildikten sonra o sağlayıcının güncel resmî belgeleriyle doğrulanacaktır.

| Sistem | Kurulacak davranış | Çalışıyor sayılması için kanıt | Gerekli işletme girdisi |
|---|---|---|---|
| Rezervasyon | Hizmet, süre, yetkili kişi, müsaitlik, ara süre, saat dilimi; iptal ve saat değişikliği; sunucuda çakışma önleme | Aynı saate eşzamanlı iki talebin ikinci bir onay üretmemesi; tekrarlanan gönderimin tek kayıt oluşturması; iptal ve saat değişikliğinin takvime yansıması | Hizmetler, süreler, çalışma saatleri, takvim hesabı, iptal koşulları |
| E-posta | Doğrulanmış gönderici, işlem şablonları, sorumlu gelen kutusu, teslimat hata takibi, tekrar deneme | Yetkili test alıcısına ulaşan onay; kalıcı hata ve tekrar deneme kayıtları; tekrarlı olayın ikinci onay oluşturmaması | Gönderici alan adı, sorumlu adres, e-posta hesabı |
| Ödeme | Resmî güvenli ödeme bileşeni; sunucuda fiyat; ödeme bekliyor/başarısız/onaylı/iade durumları; mutabakat | Test ortamında başarılı ve başarısız ödeme; sahte veya tekrar gelen bildirimin işlem yaratmaması; yanlış tutar/para biriminin reddi; iade kaydı | Satıcı hesabı, gerçek fiyat, para birimi, vergi durumu, iade koşulları |
| Müşteri takibi | Başvuru, atama, teklif, hizmet, takip ve şikâyet durumu; rol bazlı erişim | Yetkisiz kişinin kaydı okuyamaması/değiştirememesi; sorumluya atama; değişiklik kaydı | Yetkili roller, yanıt hedefi, saklama ihtiyacı |

Rezervasyon ve ödeme akışı, iş modeline göre eşleştirilir. Ödeme gerekiyorsa geçici saat tutma süresi ve ödeme zaman aşımı tanımlanır. Saat serbest kaldıktan sonra gelen geç ödeme otomatik randevu yaratmaz; iade veya yeniden planlama sürecine gider. Ödeme gerekmeyen hizmetlerde ödeme adımı eklenmez. Randevu onayı başarısız e-posta nedeniyle kaybolmaz; kullanıcı hesabı veya güvenli işlem durumundan görülebilir.

Ödeme onayı tarayıcının dönüş adresinden alınmaz. Sağlayıcının imzalı bildirimi sunucuda doğrulanır; işlem kimliği, tutar, para birimi ve yerel kayıt eşleştirilir. Aynı bildirim ikinci kez işlendiğinde ikinci satış veya e-posta oluşmaz. Gerçek karttan deneme çekimi yapılmaz. E-posta gönderimi, alıcıya ulaştığı kanıtlanmadan “teslim edildi” sayılmaz.

E-posta alan adı için sağlayıcının istediği doğrulama ve SPF/DKIM/DMARC yapılandırması değerlendirilir. Hesap anahtarları sunucuda tutulur; kullanıcıdan sohbet içine parola veya gizli anahtar yapıştırması istenmez.

### D. Ölçüm ve talep tahmini

**Karar hedefi:** İçerik iyileştirme önceliğini, işlemdeki terk noktalarını ve hizmet kapasitesini gerçek kanıtla belirlemek. Site ve veri kaynakları belli olmadığı için aşağıdaki KPI’lar aday tanımlardır; güncel performans, oran veya tahmin sonucu hesaplanmadı. Veri sahibi ve iş modeli doğrulanınca en fazla üç ana ölçüt seçilir.

| Aday ölçüt | Hesap ve tane düzeyi | Kaynak / karar | Sınırlama |
|---|---|---|---|
| Rezervasyon tamamlanma oranı | Aynı başlangıç kohortunda belirlenen süre içinde onaylanan benzersiz akış / başlayan benzersiz akış | İzin kapsamındaki başlangıçlar ve sunucuda doğrulanmış randevular; formdaki engelleri inceleme | Süre penceresi hizmete göre sabitlenir; izin veren örneklem ve tüm operasyon kayıtları aynı paydada karıştırılmaz |
| Ödeme tamamlanma oranı | Aynı kohortta belirlenen süre içinde ödenen benzersiz ödeme oturumu / başlatılan benzersiz ödeme oturumu | Ödeme sağlayıcısı ve sunucu kayıtları; ödeme engelleri | Test işlemleri dışlanır; iadeler ayrı izlenir; sonradan gelen ödemeler olgunlaşmış kohorta işlenir |
| Hizmetin tamamlanması | Dönemde gerçekleşmesi planlanmış ve değerlendirme süresi dolmuş randevular içinde tamamlananların oranı | Operasyon kayıtları; kapasite ve hizmet kalitesi | Müşteri iptali, sağlayıcı iptali ve gelmeme ayrı gösterilir; erken satış sayısı hizmet başarısı değildir |

Destekleyici ölçümler: içerik bazında yararlılık yanıtları, izin kapsamındaki etkileşim, form hataları ve başvuru yanıt süresi. Kalite koruyucuları: sağlayıcı kaynaklı iptal oranı ve hata/şikâyet oranı. Gelir, iadeler ve teslimat maliyeti gerektiğinde ayrıca değerlendirilir. Başlangıç verisi görülmeden satış artışı veya dönüşüm hedef yüzdesi uydurulmaz. Sıfır payda “veri yok” olarak gösterilir.

**Olay sözlüğü taslağı:** Her olay için sorumlu, saklama süresi, erişim ve geçerli veri işleme koşulu siteye göre kaydedilir. Hassas içerik veya hizmet tanımlayıcıları davranış analitiğine aktarılmaz.

| Olay | Doğru tetikleme | Asgari özellikler / kural |
|---|---|---|
| service_view | Görüntülenen, analitiğe uygun hizmet sayfası | Onaylı genel içerik kodu, dil; ham URL/sorgu parametreleri yok |
| content_engaged | Önceden tanımlı etkin süre ve görünür içerik eşiği | İçerik kodu, eşik sürümü, süre aralığı; okuma/anlama kanıtı değildir |
| booking_started | Kullanıcı rezervasyon işlemine başlar | Rastgele akış kimliği, dil; pazarlama analitiği için yalnızca uygun izinle |
| booking_confirmed | Sunucu kaydı gerçekten onaylanır | Tekilleştirilmiş olay/işlem kimliği; operasyon kaydı ayrı tutulur |
| inquiry_submitted | Sunucu başvuruyu başarıyla kaydeder | Olay kimliği, dil; form içeriği gönderilmez |
| checkout_started | Sağlayıcıda geçerli ödeme oturumu oluşur | Rastgele oturum kimliği, para birimi |
| payment_confirmed | Sunucu doğrulanmış ödeme bildirimini işler | Tekilleştirilmiş işlem kimliği, tutar, para birimi; yetkili operasyon raporu |
| feedback_submitted | Kullanıcı yararlılık sorusunu yanıtlar | Genel içerik kodu, evet/hayır; serbest metin analitiğe gönderilmez |

E-posta, telefon, ad, serbest mesaj, tanı, vaka bilgisi ve hassas URL parametreleri analitik olaylarından dışlanır. Kimlik yerine rastgele kod kullanılması tek başına veriyi anonim yapmaz. Hassas danışmanlık/sağlık sayfalarında ziyaret davranışı dahi bilgi açığa çıkarabilir; bu alanlar pazarlama takibinden ve oturum kaydından hariç tutulur. [Datatilsynet’in analiz ve takip rehberi](https://www.datatilsynet.no/personvern-pa-ulike-omrader/internett-og-apper/rad-for-analyse-og-sporing-pa-nettsted/) bu riskleri ve veri minimizasyonunu ele alır.

İsteğe bağlı takip için uygun önceden izin, açık amaç seçimi ve kolay geri çekme uygulanır; ret seçeneği gizlenmez veya daha zor yapılmaz. Teknik olarak zorunlu işlevler ayrı değerlendirilir. [Datatilsynet’in güncel rıza rehberi](https://www.datatilsynet.no/personvern-pa-ulike-omrader/internett-og-apper/bruk-av-informasjonskapsler-og-andre-sporingsteknologier/) esas alınır. Çerez reddinin rezervasyon gibi temel işlevleri bozmadığı test edilir.

**Tahminin aşamaları:**

1. Veri yokken kullanıcının açıkça seçtiği konuya göre ilgili içerik gösterilir. Bu davranış “öğrenilmiş tahmin” olarak tanıtılmaz.
2. Güvenilir toplulaştırılmış veri oluşunca hizmet türü başına haftalık talep ve kapasite raporlanır. Kapanış günleri, kampanyalar, iptaller ve veri kesintileri işaretlenir; eksik kayıt sıfır talep sayılmaz.
3. Kapasite planlama için gelecek haftanın talebi gibi tek bir tahmin hedefi belirlenir. Basit son dönem veya mevsimsel karşılaştırma modeli başlangıç ölçütü olur; yöntem veri aralığı ve mevsimselliğe göre seçilir.
4. Zaman sırası korunarak geriye dönük test yapılır. Daha karmaşık yöntem hata, belirsizlik ve işletme yararı bakımından başlangıç yöntemini geliştirmiyorsa kullanılmaz. Evrensel bir “30 gün veri yeter” kuralı konmaz.
5. Model sapması ve veri kapsamı izlenir; veri yetersizse tahmin yerine veri eksikliği gösterilir. Bir kişinin hastalığı veya hassas durumu gezinme davranışından çıkarılmaz.

### E. Tasarım, performans ve yayın kabul ölçütleri

Tek bir görsel sistem oluştur: marka varlıkları, tipografi, renkler, boşluklar, form alanları, düğmeler ve durum bildirimleri. Mobilde içerik sırası kullanıcı görevini izler. Fotoğraf ve logoların kaynağı ve kullanım hakkı kaydedilir. Yazı içine gömülü metinli görseller temel bilgiyi taşımamalıdır. Tasarım arayüzü kurulum ayrıntılarıyla doldurulmaz.

Kalite hedefi [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/) ölçütleri üzerinden değerlendirilir; bu belge erişilebilirlik sertifikası değildir. Klavye erişimi, görünür odak, etiketler, hata bildirimi, kontrast, metin büyütme, ekran okuyucu akışı ve mobil taşma elle ve uygun araçlarla incelenir. Otomatik tarama tek başına yeterli sayılmaz.

Performans için gerçek kullanıcı ölçümünde mobil ve masaüstü ayrı izlenerek 75. yüzdelikte LCP ≤ 2,5 saniye, INP ≤ 200 ms ve CLS ≤ 0,1 hedeflenir. Bunlar [Core Web Vitals eşikleridir](https://web.dev/articles/vitals); henüz bu siteler için ölçülmüş sonuç değildir. Alan verisi yokken laboratuvar ölçümü tanı koymak için kullanılır ve sınırı raporlanır.

| Kontrol | Kabul kanıtı |
|---|---|
| Üç dil | Eksik içerik anahtarı yok; fiyat, kapsam, şart ve sonuç metinleri eşdeğer; dil geçişi doğru sayfaya gider |
| Mobil ve erişim | Temel işlemler klavyeyle yapılır; odak kaybolmaz; yatay taşma ve okunamayan hata yok |
| Başvurular | Başarılı kayıt, doğrulama hatası, bağlantı kesintisi ve tekrar gönderme davranışı gözlenir |
| Rezervasyon | Çakışma, saat dilimi/yaz saati, iptal, değişiklik ve geç ödeme senaryoları çalışır |
| E-posta ve ödeme | Sağlayıcı test kanıtı, tekilleştirme, hata geri dönüşü ve mutabakat doğrulanır |
| Yetkilendirme | Müşteri ve yönetici rolleri için izin verilmeyen okuma/yazma reddedilir |
| Analitik | İzin öncesi isteğe bağlı olay yok; geri çekme çalışır; hassas veri sızmaz; sonuçlar sunucuyla uzlaşır |
| Güvenilir işletim | İzleme, yetkili sorumlu, yedekten dönüş kanıtı, hata takibi ve geri alma yöntemi kaydedilir |
| Arama görünürlüğü | Gerçek sayfa başlıkları, sitemap, yönlendirmeler, canonical ve dil eşleşmeleri kontrol edilir |

### F. Araç ve platform seçimi

Birincil barındırma ve içerik sistemi mevcut projeye göre seçilir. Aynı siteyi birden fazla sağlayıcıda sırf araç kullanmak için çoğaltma. Kullanıcının seçtiği araçlar aşağıdaki amaçlara göre değerlendirilir; bu tablo hepsinin bağlandığı veya çalıştırıldığı anlamına gelmez.

| Seçilen araç | Bu işte uygun kullanım |
|---|---|
| Exa | Güncel kaynak ve karşılaştırma araştırması; v1.2 kaydı bu aracın kullanıldığını belirtiyor; v1.3'te yeniden çalıştırılmadı |
| Data Analytics | Olay tanımı, ölçütler, veri kalitesi, raporlama ve talep tahmini; v1.2 kaydı KPI tasarım becerisinin kullanıldığını belirtiyor; v1.3'te yeniden çalıştırılmadı |
| Malwarebytes | Hedef URL belirlendiğinde bağlantı/alan adı itibar kontrolü; uygulamanın tüm güvenliğini kanıtlamaz |
| Wix | Hedef mevcut Wix sitesiyse o sitenin hizmet ve entegrasyonlarını düzenleme |
| Vercel | Hedef uyumlu kaynak projeyse geliştirme önizlemesi, dağıtım ve işletim |
| WebsitePublisher | Hedef bu platformdaysa mevcut sayfa ve desteklenen entegrasyonları düzenleme |
| Lovable | Doğrulanmış ilgili projede uygulama geliştirme |
| Figma | Mevcut marka ve hedef siteye göre arayüz, bileşen ve prototip |
| Adobe | Gerçek proje görsellerini hazırlama ve iyileştirme |
| Canva | Uygun mevcut marka belgeleri ve iletişim varlıkları |

### G. Önceliklendirme ve takip

Öncelik 0: hedef site/kaynak eşleşmesi, hizmet kapsamı, gerçek iletişim ve sağlayıcı hesap durumu. Öncelik 1: üç dilde temel içerik ve kullanılabilirlik; çalışan başvuru, rezervasyon ve gerekiyorsa ödeme. Öncelik 2: operasyon yönetimi, ölçüm, performans, arama görünürlüğü ve hizmet sonrası takip. Öncelik 3: güvenilir veriyle deneyler, kapasite tahmini ve yararlı kişiselleştirme.

Siteye özgü her kayıt şu alanları taşır: proje kimliği, görev, sorumlu rol, aşama, bağımlılık, kaynak, teslimat, test kanıtı, açık engel ve durum. Durum sözlüğü: planlandı / uygulandı / test ortamında doğrulandı / canlıda doğrulandı / engelli.

**v1.2 hazırlanırken kaydedilen kararlar (2026-09-05):**

- Discover: Konuşma ve mevcut standart incelendi; tekil site eşleşmesi bulunamadı. Hedef URL gerekli.
- Define: İstenen sistemler ortak web standardına eklendi; üçüncü taraf hesap veya canlı site değişikliği yapılmadı.
- Design: Ortak üç dilli arayüz sözlüğü ve işlem durumları hazırlandı; görsel site tasarımı hedef belirlendikten sonra hazırlanacak.
- Measure: Ölçüm ve tahmin taslağı yazıldı; veri erişimi olmadan gerçek performans ve tahmin iddiası yapılmadı.

Kaynak erişim tarihi: 2026-09-05. Belgedeki hedefler ve ürün kararları, kaynaklarda yer alan genel rehberlerden ayrıdır; projeye özgü test sonuçları değildir.

## EK-KOMUT — Uygulama ve doğrulama protokolü / v1.3

Bu ek /AUTOPROMPT ve EK-WEB ile birlikte uygulanır. Dar kapsamlı bir düzeltmede ilgili adımlar seçilir; her küçük iş için tüm araştırma ve iş modeli yeniden üretilmez. Yeni konsept geliştirmede /AUTOPROMPT teslimatlarının tamamı ele alınır. Önceki kanıt yalnızca kapsamı ve güncelliği uygunsa yeniden kullanılır.

### 1. Komutların somut karşılığı

| Komut grubu | Yapılacak iş ve çıktı | Tamamlanma kanıtı |
|---|---|---|
| /PLAN /SERVICE-DESIGN | Problem, kullanıcı, ödeyen, hizmet kapsamı, yolculuk, sorumlular ve bağımlılıklar | Öncelikli kullanıcı görevi ve her aşama için sorumlusu belirli hizmet akışı; bilinmeyenler görünür |
| /SAFETY /GDPR /ACCESSIBILITY /RISK | Hizmet zararı, erişim engeli, kişisel veri akışı ve işletim risklerini değerlendirme | İlgili risk, gerekçeli öncelik, kontrol, sorumlu rol, kanıt ihtiyacı ve kalan risk kaydı |
| /RESEARCH /LATEST /PRIMARY /CITE /FACTCHECK | Güncel birincil kaynaklardan proje sorularını araştırma; çelişkileri değerlendirme | İddia–kaynak–tarih–kapsam eşleşmesi; doğrulanan bilgi ve yorum ayrı |
| /DESIGN /WIREFRAME /ARCHITECTURE /SEO /TEST | Sayfa yapısı, mobil/masaüstü taslağı, sistem sınırları, dil/arama yapısı ve test senaryoları | Gözden geçirilebilir taslak, veri akışı ve beklenen davranış; çalıştırılan testler ayrıca kayıtlı |
| /TRUTHMODE /REDTEAM /CRITIQUE /GAPS | Konseptin, ekonominin ve işlemlerin başarısızlık nedenlerini sorgulama | Kanıtsız vaatler, karşı kanıtlar, kötüye kullanım ve bağımlılıklar; gerekçeli devam/değiştir/durdur kararı |
| /REWRITE /CLEAR /HUMANIZE /PROOFREAD | Metni açık, doğal ve tutarlı yazma; nb/en/tr anlam eşitliğini koruma | Önce/sonra farkı, terim tutarlılığı, doğrulanmış fiyat/kapsam/koşul eşitliği |
| /PLAN /EXECUTE /VERIFY | Öncelikli değişikliği uygulama, gerçek davranışı kontrol etme, sonucu kaydetme | Dosya veya sürüm, ortam, uygulanan değişiklik, gözlenen sonuç ve kalan engel |

Kanıt etiketleri: **doğrulanmış bilgi**, **varsayım**, **öneri**, **bilinmeyen**. Belge teslim durumu: **hazır**, **varsayıma dayalı**, **engelli**. Sistem durumu: **planlandı**, **uygulandı**, **test ortamında doğrulandı**, **canlıda doğrulandı**, **engelli**. Hazır bir tarif, tarif ettiği sistemin kurulduğunu göstermez.

### 2. Araştırma ve karar kaydı

Her önemli iddia için şu alanları tut: iddia kimliği, tam iddia, birincil kaynak bağlantısı, yayın/güncelleme tarihi mevcutsa o tarih, erişim tarihi, ülke ve kapsam, ilgili kanıt, sınırlama, çelişen bulgu, etkilenen karar ve yeniden kontrol koşulu. Erişim tarihini yayın tarihi olarak sunma. Arama sonucu özeti içeriği okumaya yetmiyorsa kaynağı aç; erişilemeyeni doğrulanmış sayma.

Rakip kıyasında hedef segment belli olduktan sonra 3–5 anlamlı alternatif seç. Her biri için kullanıcı görevi, fiyatın görünen kapsamı, seçim/ödeme adımları ve güven kanıtını incele. Yalnızca görülen davranışı kaydet; rakibin satış oranını, trafiğini veya kârlılığını tahminle gerçekmiş gibi yazma. Açık fiyat yoksa “kamuya açık fiyat bulunamadı” yaz. Görsel beğeni ile iş sonucunu ayır.

Bu sürümde kontrol edilen kaynaklar aşağıdadır. Bunlar genel standardı destekler; henüz belirlenmeyen site için hukuki uygunluk veya performans sonucu oluşturmaz.

| Kaynak | Kontrol edilen dayanak | Standarda uygulama |
|---|---|---|
| [Språkrådet — Generelle skriveråd](https://sprakradet.no/klarsprak/om-skriving/generelle-skriverad-bokmal/) | Okura göre yazma, önemli bilgiyi öne alma, anlaşılır cümle ve kelimeler | Hizmet faydası, bilinen süre/maliyet ve sonraki adımı açık yaz |
| [W3C — WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Erişilebilirlik başarı ölçütleri | AA kalite hedefini ilgili ölçütlerle değerlendir; ülke/sektör için zorunlu asgari yükümlülüğü ayrıca belirle |
| [Datatilsynet — Cookies](https://www.datatilsynet.no/personvern-pa-ulike-omrader/internett-og-apper/cookies/) | Norveç'te 1 Ocak 2025'te yürürlüğe giren değişiklikler, geçerli rıza ve dar zorunluluk istisnaları | İsteğe bağlı takibi rızadan önce başlatma; reddetme ve geri çekme kolaylığını kontrol et; çerezsiz yaklaşımı otomatik muaf sayma |
| [Datatilsynet — Samtykke](https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/behandlingsgrunnlag/veileder-om-behandlingsgrunnlag/samtykke/) | Rızanın özgür, belirli, bilgilendirilmiş ve geri çekilebilir olması; bağımlılık ilişkilerindeki sınırlamalar | Her işlem amacının dayanağını ayrı değerlendir; çalışan veya danışan için rızayı otomatik varsayma |
| [Datatilsynet — Innebygd personvern](https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/innebygd-personvern-og-personvern-som-standard/) | Gizliliğin geliştirme aşamalarında ele alınması | Veri akışını, alan ihtiyacını ve erişim sınırlarını tasarıma dahil et |
| [Google Search Central — Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions) | Dil sayfaları arasında kendini ve diğer sürümleri gösteren karşılıklı tam URL eşleşmeleri | nb/en/tr dil bağlantılarını ilgili sayfalar arasında doğrula |
| [OWASP — ASVS](https://owasp.org/www-project-application-security-verification-standard/) | Uygulama güvenliği doğrulama gereksinimleri; sayfada kararlı sürüm 5.0.0 olarak belirtiliyor | Projeyle ilgili kontrolleri seç; gereksinim numarası kullanılıyorsa sürümle birlikte kaydet |

Erişim tarihi: 2026-09-05. Uutilsynet'in açılması denenen gereksinim sayfasına erişilemedi; bu sürümde Norveç kamu/özel sektör için ayrıntılı zorunlu WCAG eşlemesi doğrulanmadı. Site, işletme türü ve hedef pazar belirlendiğinde ilgili resmî mevzuat kapsamı tamamlanır. Daha eski EK-WEB kaynaklarının tamamı bu sürümde yeniden denetlenmedi.

### 3. Hizmet tasarımını işletime bağlama

Aşağıdaki tablo siteye uyarlanacak bir başlangıç taslağıdır; atanmış gerçek kişiler veya taahhüt edilmiş yanıt süreleri içermez.

| Aşama | Kullanıcının ihtiyacı / ön yüz | Arka plandaki iş / sorumlu rol | Aksama halinde davranış |
|---|---|---|---|
| Keşfetme | Kimin için hangi hizmet, kapsam ve bilinen bedel | İçerik sahibi hizmet kaydını güncel tutar | Uygun olmayan talebe kapsamı açıkla; doğrulanmış alternatif varsa göster |
| Seçim | Paketleri, koşulları ve uygun zamanı karşılaştırma | Operasyon kapasite ve müsaitliği yönetir | Uygun saat yoksa gerçeğe uygun durum ve alternatif başvuru yolu |
| İşlem | Gerekli bilgiyi verme; gerekiyorsa ödeme | Sunucu doğrulaması, çakışma önleme, ödeme mutabakatı; operasyon/finans | Bağlantı kesintisinde mevcut işlemi sorgula; yeniden deneme ikinci işlem yaratmasın |
| Teslimat | Onay, hazırlık bilgisi ve hizmete erişim | Hizmet sorumlusu teslimatı ve gerekli kayıtları yönetir | Uzman yokluğu veya gecikmede bildirim, yeniden planlama ve ilgili iade süreci |
| Takip | Sonucu değerlendirme, destek veya şikâyet | Destek/kalite sorumlusu kayıt ve çözümü takip eder | Yanıt gecikmesini görünür kıl; sorumluluğu ve eskalasyonu tanımla |

Birden fazla taraf varsa ayrı yolculuklar oluştur; hangi bilgilerin taraflar arasında paylaşılabileceğini açıkça tanımla. Hizmet süresi, kapasite, teslimat maliyeti ve şikâyet yükü ekonomik modele girer. Kurucunun emeği ve destek maliyeti hesaba katılmadan sürdürülebilirlik sonucu çıkarılmaz.

### 4. Taslak, mimari ve kişisel veri sınırları

Wireframe teslimi en az şu durumları kapsar: hizmet seçimi, detay ve bilinen fiyat, form, işlem özeti, başarı, bekleme, hata ve iptal/değişiklik. Mobilde temel görev sırası korunur. Bilinmeyen işletme bilgileri taslakta işaretlenir; gerçek vaat gibi yayımlanmaz.

Teknoloji ve sağlayıcı seçimi kaynak proje incelendikten sonra yapılır. Mimari kayıtta tarayıcı, uygulama sunucusu, işlem verisi, takvim, ödeme sağlayıcısı, e-posta kuyruğu ve analitik arasındaki veri akışı ve güven sınırı açıklanır. Bu bölüm yeni altyapının kurulduğu anlamına gelmez.

Kişisel veri kaydı her amaç için şu soruları yanıtlar: kim sorumlu; hangi alan gerekli; hangi dayanak değerlendirildi; kim erişebilir; hangi sağlayıcıya ve ülkeye aktarılır; ne kadar ve neden saklanır; erişim/düzeltme/silme talebi nasıl ele alınır; yüksek risk değerlendirmesi ve gerekiyorsa etki değerlendirmesi kimin sorumluluğundadır? Yükümlülükler işletme ve hizmet kapsamına göre doğrulanır. Gizlilik sayfası yazmak tek başına bu işleri tamamlamaz.

### 5. /REDTEAM — Risk ve karşı senaryo kaydı

Bu tablo mevcut bir sitede keşfedilmiş açıkların listesi değildir. Uygulanacak hizmette kontrol edilecek risk senaryolarıdır. Olasılık ve etki hedef sistem görülmeden puanlanmaz; sorumlu roller gerçek kişilere henüz atanmadı.

| Risk | Sınanacak karşı senaryo | Kontrol / gerekli kanıt | Sorumlu rol |
|---|---|---|---|
| Yetkisiz veri erişimi | A kullanıcısı B kullanıcısının kayıt kimliğini kullanır | Sunucu erişimi reddeder; yetkili normal akış çalışır | Teknik / güvenlik |
| Çifte rezervasyon veya ödeme | Aynı saate iki talep; yinelenen veya sırası değişmiş ödeme bildirimi | Tek geçerli işlem; durum gerilemesi yok; tutar ve mutabakat doğru | Teknik / operasyon / finans |
| Geç ödeme | Saat tutma süresi dolduktan sonra ödeme onayı gelir | Çakışan randevu açılmaz; kayıtlı iade veya yeniden planlama akışı | Operasyon / finans |
| Yanlış başarı mesajı | E-posta sağlayıcısı veya ağ başarısız olur | Gerçek işlem durumu korunur; gönderim/teslimat ayrımı ve kurtarma yolu açık | Teknik / destek |
| Gereksiz takip | Kullanıcı izni reddeder veya geri çeker | İsteğe bağlı istekler durur; temel işlem devam eder | Gizlilik / veri |
| Erişim engeli | Fare kullanamayan kişi hata veren formu tamamlar | Klavye, odak, hata açıklaması ve yardımcı teknolojiyle tamamlama gözlenir | UX / QA |
| Dil kaynaklı yanlış karar | Fiyat veya iptal koşulu tek dilde değişir | nb/en/tr karşılaştırması farkı yakalar | İçerik / operasyon |
| Ekonomik sürdürülemezlik | Talep artar; teslimat ve destek kapasitesi yetmez | Kapasite, katkı ve destek emeğini içeren senaryo; kabul sınırı | Proje lideri / finans |
| Yanıltıcı vaat veya tahmin | Referanssız sonuç iddiası; kaydırmadan hassas ihtiyaç çıkarımı | İddia kanıtı yoksa metin düzeltilir; hassas profil çıkarılmaz | İçerik / hizmet / veri |

Önceliklendirme: önce kullanıcı zararını, veri ifşasını, yanlış tahsilatı veya temel işlemin yapılamamasını çöz. Diğer işleri kanıtlanan kullanıcı etkisi, belirsizlik, bağımlılık ve maliyete göre sırala. Kritik bilinmeyenlerin çözülmesi görünüm iyileştirmelerinden önce gelir.

### 6. Test kaydı ve bitiş koşulu

Her çalıştırılan kontrolde test kimliği, sürüm/commit, ortam, önkoşul, kullanılan veri türü, adımlar, beklenen davranış, gözlenen sonuç, kanıt bağlantısı, tarih ve kalan sorun yazılır. Başarılı, başarısız, engelli ve çalıştırılmadı durumları ayrı tutulur. Planlanan testi başarılı olarak işaretleme.

Doğrulama değişikliğin riskine göre yapılır. Basit metin düzeltmesinde içerik/dil ve ilgili görünüm kontrolü yeterli olabilir. Rezervasyon, ödeme veya yetkilendirme değişikliğinde ilgili uçtan uca ve başarısızlık senaryoları gerekir. Otomatik tarama, insanla kullanılabilirlik denemesinin veya tam erişilebilirlik değerlendirmesinin yerine geçmez.

Bitirme kaydı dört soruya yanıt verir: ne değişti, neden değişti, nasıl doğrulandı, hangi sınır kaldı? Yayın veya dış hesap işlemi için gereken yetki mevcut konuşmaya göre değerlendirilir; rutin ve geri alınabilir hazırlıklarda tekrar izin istenmez. Eksik zorunlu bilgi varsa bağımsız işler tamamlandıktan sonra tek odaklı soru sorulur.

### 7. Bu sürümün gerçek durumu ve kararları

| İş | Durum | Dayanak / kalan sınır |
|---|---|---|
| Kayıtlı standart incelemesi | Hazır | v1.2 tam metni incelendi; /AUTOPROMPT ve EK-WEB korundu |
| Komut eşlemesi, risk ve doğrulama protokolü | Hazır | Bu ekte yazılı gereksinimler; çalışan site sonucu değildir |
| Genel kaynak kontrolü | Hazır | Yukarıdaki yedi birincil kaynak incelendi; kaynak kapsamı ve erişim sınırı belirtildi |
| İş modeli, rakipler ve siteye özgü tasarım | Engelli | Düzenlenecek site/proje tekil olarak belirlenmedi |
| Site kodu ve entegrasyon kurulumu | Engelli | Hedef URL ve ilişkili kaynak proje bilinmiyor; sağlayıcı hesap durumu incelenmedi |
| Canlı test, tarama ve yayın | Çalıştırılmadı | Bu sürümde site üzerinde işlem yapılmadı |

2026-09-05 / Define: Altı komut grubu tüm projelere uyarlanacak varsayılan çalışma protokolüne bağlandı. Gerekçe: istekleri teslimata ve kanıta dönüştürmek. Elenen yaklaşım: her turda aynı genel gereksinimleri yeniden üretmek. Yeniden değerlendirme koşulu: kullanıcının kapsamı değiştirmesi.

2026-09-05 / Design: İletişim alanlarını gereksinime göre zorunlu tutma kararı eklendi. Gerekçe: genel formda gereksiz veri toplamayı azaltmak. Yeniden değerlendirme koşulu: gerçek hizmetin ek kimlik veya iletişim alanı gerektirmesi.

2026-09-05 / Validate: Hedef site belirlenmediği için siteye özgü sonuç iddiaları açık bırakıldı. En önemli açık bilgi hedef projedir. Sonraki işler: (1) tam site URL'sini proje/kaynakla eşleştir, (2) öncelikli müşteri görevi üzerinde mevcut davranışı ve rakipleri incele, (3) ilk değişiklik grubunu uygula ve ilgili kontrolleri çalıştır. Bu kayıtta geleceğe yönelik bir otomasyon kurulmadı.
