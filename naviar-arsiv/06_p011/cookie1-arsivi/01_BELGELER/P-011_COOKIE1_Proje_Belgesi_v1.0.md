# NAVIAR CARE | P-011

Cookie1 konsept, web tasarımı, kod ve arşiv belgesi

**5 Eylül 2026 · Belge v1.0 · Kaynak v0.4.0 · DRAFT-NC-COOKIE1**

## 1. Proje kimliği ve teslim durumu

NAVIAR CARE, evde yaşamayı sürdüren yaşlı kişiler için sınırları önceden belirlenmiş günlük yaşam desteği konseptidir. Bu belge P-011 ana proje kaydının DRAFT-NC-COOKIE1 çalışma dalını belgeler. Konsept, web tasarımı, kaynak kod, test kanıtları ve açık işler tek izlenebilir arşivde toplanmıştır.

| Alan | Kayıt |
| --- | --- |
| Ana proje | P-011 · NAVIAR CARE |
| Çalışma referansı | DRAFT-NC-COOKIE1; doğrulanmış kalıcı alt proje numarası değildir. |
| Kullanıcının verdiği hedef | https://beta-art-cookie1.vercel.app/ |
| Dosyayla doğrulanan sürüm | 0.4.0; önceki 0.3.0 ayrıca korunur. |
| Arşiv kimliği | P-011-COOKIE1-ARSIV-20260905-v1.0 |
| Arşiv tarihi | 5 Eylül 2026 |
| Teslim durumu | Belgeleme ve arşiv paketi; canlı hizmet açılışı tamamlanmış değildir. |

Bu arşivleme turunda uygulama kodu değiştirilmedi. Geri alınan v0.4.0 üzerinde 13 otomatik test yeniden geçti; statik derleme tamamlandı. Norveççe, İngilizce ve Türkçe kamuya açık içerikte 154’er anahtar bulundu. Bu sonuçlar gerçek müşteri işlemini, sağlayıcı bağlantısını veya yayınlanmış siteyi doğrulamaz.

Son konuşmada mobil ve masaüstü kontrollerinin, dil değişimlerinin ve klavye odağının tamamlandığı bildirildi. Ancak o ek düzeltmeleri temsil eden daha yeni kaynak paketi, commit veya tamamlanmış özel yayın sonucu bulunamadı. Bu beyanlar tarihçede korunur; geri alınan v0.4.0 dosyalarına ait yeni tarayıcı kanıtı olarak kullanılmaz.

## 2. Konsept ve hizmetin nasıl işleyeceği

Hizmetin merkezinde yardım alacak kişinin tercihleri bulunur. Yakını planlamaya katılabilir; rezervasyon yapma, ödeme yapma ve ziyaret bilgilerini görme yetkileri ayrı ele alınır. Birinin ödeme yapması, ziyaret ayrıntılarına otomatik erişim sağlamaz. Aynı yardımcıyla devam etme süreklilik hedefidir; doğrulanmış kapasite olmadan garanti verilmez.

| Destek alanı | Somut kapsam |
| --- | --- |
| Sohbet ve yürüyüş | Sohbet, yakın çevrede yürüyüş, randevuya eşlik. |
| Günlük küçük işler | Alışveriş listesi, basit işler ve günlük rutinlere planlı destek. |
| Dijital yardım | Telefon, tablet ve görüntülü görüşmede rehberlik; kontrol kullanıcıda. |

Sağlık değerlendirmesi, tedavi, ilaç yönetimi, kişisel hijyen, kaldırma, BankID, şifre, banka hesabına erişim ve nakit işlemleri kapsam dışında tanımlanmıştır. Eve erişim, anahtar, ulaşım ve temsil/bilgi paylaşma yetkisi görev kabulünden önce insan tarafından netleştirilir. Bu çerçeve kaynak konseptin kaydıdır; tamamlanmış bir işletme prosedürü değildir.

| Aşama | Kullanıcı ve operasyon |
| --- | --- |
| İhtiyacı tanıma | Destek türünü ve sınırları okur; kendi veya yakını için seçim yapar. |
| İlk talep | Kendi iletişim bilgilerini ve ilk temas tarihi tercihini verir. |
| İnsan incelemesi | Bölge, görev, uygunluk ve yetkiler değerlendirilir. |
| Teklif ve anlaşma | Görev, süre, toplam fiyat ve koşullar açıklanır; kabul ayrıca gerekir. |
| Planlama ve ziyaret | Gerçek yardımcı takvimi, erişim ve istisna planı doğrulanır. |
| Takip | Memnuniyet, süreklilik, şikâyet, değişiklik ve gerekiyorsa iade ele alınır. |

Ücretler, gerçek hizmet bölgesi/saatleri, personel kapasitesi, sigorta, iptal/iade koşulları ve sorumlu işletme henüz kesinleşmiş veri olarak bulunmuyor. Yeni fiyat, müşteri yorumu, klinik sonuç veya ticari başarı iddiası bu belgeye eklenmedi.

## 3. Web tasarımı ve üç dilde içerik

Web sayfası sakin, açık zeminli bir günlük destek anlatısı üzerine kurulmuştur. Girişte destek vaadi ve geliştirme durumu görünür; ardından hizmet kartları, süreç, yakınların rolü, kapsam sınırları, talep formu ve sık sorulan sorular gelir. Tasarım ve metinler public/render.js, public/styles.css ve public/content.js dosyalarından üretilir.

| Tasarım öğesi | v0.4.0 kaynağındaki değer |
| --- | --- |
| Ana zemin | paper #f8f6ef |
| Ana yazı / koyu bölüm | ink #09354f |
| Eylem rengi | green #275a45 |
| Destekleyici zemin | sage #e5eadf |
| İkincil metin / çizgi | muted #4d6268; line #d2d9cd |
| Başlık ve gövde | Georgia/Times serif; Arial/Helvetica sans-serif. Gövde 18 px / 1.65. |
| Yerleşim | En çok 1280 px, yüzde 90 genişlik; 1050, 760 ve 380 px uyarlama kuralları. |
| Etkileşim | Ana düğme en az 52 px; son Studio kuralında dil düğmesi en az 44 px. |

Geniş ekranda giriş iki sütunludur: ana anlatım ve örnek plan kartı. Üç destek kartı yan yana yer alır; dar ekranda ana içerikler tek sütuna iner. Koyu güvenlik bölümü kapsam ayrımını belirginleştirir. Görünür klavye odağı, içeriğe atlama bağlantısı, form etiketleri, hata alanıyla ilişki, semantik SSS ve azaltılmış hareket tercihi kodda bulunur. Tam erişilebilirlik sertifikası çıkarılamaz.

Mevcut logo adayı public/assets/naviar-care.svg olarak korunmuştur. Bu arşivde yeni logo seçilmedi; tescil, sahiplik veya kullanım sınıfları doğrulanmış kabul edilmez. Kaynak kimliği belgesi adayın önceki v0.3 SVG kaynağını gösterir.

Bokmål varsayılan dildir; yerel sayfa yolları /nb/, /en/ ve /tr/ şeklindedir. Ortak içerik anahtarları tutarlı anlam ve görünür sonraki adım için kullanılır. Talep, tercih edilen ilk iletişim tarihi ve kesinleşmiş randevu farklı terimlerdir. Üç dilin tüm 154 anahtarı ayrı CSV dosyasında listelenmiştir. Yönetim ekranı Norveççe iç araçtır; üç dilli kamuya açık sayfa kapsamına dahil değildir.

Klart språk yaklaşımı önceki raporda kısa ve aktif cümleler, ana bilginin başta olması, somut görevler ve belirsiz fiyat/uygunluk durumunun açık yazılması olarak belgelenmiştir. Önceki araştırma bağlantıları özgün raporlarda korunur; bu arşiv turunda yeni dil sertifikası veya güncel platform fiyat araştırması yapılmadı.

## 4. Kod mimarisi ve çalışma biçimleri

| Katman / dosya | Görevi |
| --- | --- |
| public/content.js | NB, EN ve TR metinlerinin tek kaynağı; Studio metinlerini de içerir. |
| public/render.js / styles.css | Semantik sayfa üretimi ve duyarlı görünüm. |
| public/app.js / journey.js | Hizmet seçimi, doğrulama, özet, gönderim ve sonuç etkileşimi. |
| public/demo.js / portable.mjs | Ağsız demo motoru ve bağımsız HTML üretimi. |
| server.mjs | Node HTTP sunucusu, dil yolları, API ve yönetim erişimi. |
| src/domain.mjs | Alan/tarih doğrulama, webhook imzası, analiz alanları ve tahmin. |
| src/store.mjs | SQLite işlemleri, talep tekilleştirme, çakışma, kuyruk ve sayaçlar. |
| src/providers.mjs | Stripe test Checkout ve Resend test alıcısı adaptörleri. |
| build.mjs / vercel.json | Statik geliştirme çıktısı ve önizleme yapılandırması. |
| tests/ | 10 sistem testi + 3 yolculuk/demo testi. |

Kod Node.js 24 veya üstünü ister; package.json harici npm bağımlılığı tanımlamaz. node:sqlite yerel veritabanını sağlar. Arşivdeki özgün kaynak .env.example ile örnek yapılandırma içerir; gerçek .env, müşteri veritabanı veya gizli anahtar bulunmaz.

| Çalışma biçimi | Gerçekte ne yapar? |
| --- | --- |
| Bağımsız HTML demo | Tarayıcı belleğinde örnek talep, durum, iptal ve bağlantı hatası gösterir. Gerçek ağ gönderimi, ödeme veya e-posta yoktur; yenileme/dil değişimi örnek veriyi sıfırlar. |
| Yerel Node uygulaması | Test taleplerini SQLite içine kaydeder; sınırlı yönetim, çakışma ve sağlayıcı test adaptörlerini çalıştırır. |
| Statik Vercel önizlemesi | Üç dilde sayfa üretir; api/index.mjs bilerek 503 durable_database_required döndürür. Üretim başvuru altyapısı değildir. |

Veri tabloları requests, outbox, webhook_events, events, audit, demand, demand_quality ve settings olarak tanımlanmıştır. Yerel işlemlerde tekilleştirme anahtarı ve gövde özeti aynı talebin tekrar kaydedilmesini sınırlar. Aynı yardımcı kaynağının onaylanmış zamanları en az 15 dakikalık aralık kuralıyla kontrol edilir. Gerçek personel takvimi eşzamanlaması ve çok sunuculu kilitleme tamamlanmamıştır.

Kodda 15 API yolu bulunur; yöntemleri, erişim sınırları ve amaçları API envanterinde listelenmiştir. Kamuya açık durum, talep sahibine özel işlemler ve yönetim işlemleri ayrı ele alınır. Yönetim listesi sınırlı alan döndürür; bu yapı kişisel çalışan hesapları, rol yönetimi veya tam operasyon sistemi anlamına gelmez.

## 5. Talep, e-posta, ödeme ve erişim

Form; kendi adını, kendi e-posta adresini, dört haneli Norveç posta kodunu, destek türünü, hedef kişiyi ve ilk iletişim tarihini alır. Tarih Europe/Oslo gününe göre yarından başlayarak 90 gün içindedir. Serbest sağlık açıklaması alanı bulunmaz; fazladan alanlar reddedilir. Formdaki bilgilendirmeyi okuma işareti, isteğe bağlı analiz tercihiyle ayrı tutulur.

Gönderimden önce özet gösterilir. Kullanıcı düzenlemeye geri dönebilir veya gönderimi tamamlayabilir. Yerel sunucu ilk kayıtla birlikte talebe özel bir yönetim jetonu üretir. Jetonun özeti saklanır; jeton sayfanın belleğinde tutulur. Sayfa yenileme, başka cihaz veya ilk yanıtın kaybolması için güvenilir kurtarma akışı henüz yoktur. Bu sınır gerçek müşteri açılışından önce giderilmelidir.

| Sistem | Mevcut uygulama ve sınırı |
| --- | --- |
| Yönetim | En az 32 karakter erişim anahtarı; 30 dakika HttpOnly, SameSite=Strict oturum. HTTPS kökeninde Secure eklenir. Kişisel hesap/MFA/rol yönetimi yok. |
| Ödeme | Yalnızca sk_test_ anahtarları; sunucudaki onaylı tutar ve randevu koşulu. Ham webhook imzası, 300 saniye zaman penceresi, tutar/para birimi/oturum ve olay tekrar kontrolü. |
| E-posta | Outbox kuyruğu; yapılandırılmış test alıcısı; yönetimden açık gönderim çağrısı. Sağlayıcı kabulü teslim edildi demek değildir. |
| İptal / iade | Talep iptal edilebilir. Ödenmiş kayıtta iade insan incelemesine ayrılır; otomatik para iadesi yok. |

Gerçek Stripe/Resend hesap bağlantısı, müşteriye teslim edilmiş e-posta veya gerçek tahsilat kanıtı bulunmuyor. E-posta kuyruğunda ilk talep bildirimi vardır; randevu, değişiklik ve iptal bildirimleri üretim için eklenmelidir. SPF/DKIM/DMARC, geri dönen e-postalar, ödeme mutabakatı ve iade süreçleri açık iş olarak korunur.

HTTP katmanında Origin kontrolü, JSON ve gövde boyutu sınırı, güvenlik başlıkları ve tek sunucu belleğinde oran sınırı vardır. Bu kontroller tam güvenlik denetimi veya üretim uygunluğu beyanı değildir. Eski Malwarebytes sonucunun bilinmiyor olduğu konuşmada bildirilmiştir; olumlu tarama sonucu olarak kaydedilmez.

## 6. Ölçüm, tahmin ve veri yönetimi

Bağımsız demo analiz olayı göndermez. Kaynak uygulamada kullanıcı analiz iznini kabul edebilir, reddedebilir veya geri alabilir. Toplu olaylarda gün, olay, bölüm ve dil tutulur; form bilgileri analiz olayına dahil edilmez. Kabul edilmemiş ziyaretçiler ölçüm örnekleminde görünmez.

| Ölçü | Tanım ve yorum sınırı |
| --- | --- |
| Haftalık talep | Europe/Oslo haftasına göre yeni, tekil kayıt sayısı. Test/spam ayrımı gerçek işletimde doğrulanmalı. |
| İçerik etkileşimi | Bölümün en az yüzde 50 görünür olması ve aralıksız 15 saniye eşiği. Okundu/anlaşıldı veya tekil kişi sayısı değildir. |
| Bekleyen talepler | pending_review durumundaki kayıtlar. Onaylı yanıt süresi hedefi henüz yok. |
| Gelecek hafta başlangıç tahmini | En az 12 kesintisiz, tamamlanmış ve operatörce kalite onaylı hafta gerekir. |

Tahmin kodu son haftanın değerini tekrarlama ile son dört haftanın ortalamasını karşılaştırır. Geçmiş son dört kontrol haftasında ortalama mutlak hatası düşük yöntemi seçer. Tahmin ± 2 × MAE aralığı kalibre edilmiş güven aralığı değildir; yalnızca planlama aralığıdır. Veri yokluğu sıfır talep kabul edilmez. Mevcut ticari başarı veya gerçek talep verisi bu arşivle kanıtlanmaz.

Sonraki adım önerisi, kişinin seçtiği hizmete bağlı basit bir kuraldır. Kişinin sağlık durumunu veya gelecekteki bireysel bakım ihtiyacını tahmin eden model olarak tanıtılmaz. Model seçimi ile bağımsız ileri dönem başarısı ayrı konulardır.

Yerel temizleme işlemi varsayılan 30 günlük sürede belirli iptal/bekleyen ve ödenmemiş test kayıtlarıyla eski toplu olayları ele alır; tüm veriler için tamamlanmış saklama politikası değildir. Onaylı/ödenmiş kayıtlar, denetim izi, üretim logları, şifreli depolama, yedekleme ve geri yükleme ayrıca düzenlenmelidir. Bu belge mevcut teknik tasarımı kaydeder; hukuk veya GDPR uygunluk görüşü vermez.

## 7. Sürüm geçmişi, testler ve kanıt sınırı

| Kayıt | Doğrulama düzeyi |
| --- | --- |
| v0.3.0 | Özgün kaynak ZIP, önizleme ve rapor korundu. Eski rapor 10 test ve tamamlanamamış tarayıcı kontrolünü belirtir. |
| v0.4.0 Studio | Özgün ZIP, bağımsız demo ve rapor korundu. Gözden geçirme/düzenleme ve ağsız demo eklentileri dosyada bulunur. |
| Bu arşiv turu | Node v24.19.0 ile 13 test tekrar geçti; derleme ve 154 anahtar/dil sayımı tamamlandı. |
| Son konuşmadaki ilerleme | 320/390 px, masaüstü, dil, iptal/hata/odak kontrollerinin tamamlandığı bildirildi. Ayrı sürüm veya ham tarayıcı kanıtı geri alınamadı. |
| Özel demo yayını | Yayınlanacağı bildirildi; başarılı yayın sonucu ve URL bu çalışma dalıyla eşleştirilemedi. |
| Eski hedef ve alan adı | Önceki 403 erişim sorunu kayıtlıdır. Bu turda erişim yeniden sınanmadı; alan adı ve kayıt firması bilgisi yok. |

Testler; form ve tarih doğrulamasını, fazla alan reddini, tekrarlanan gönderimin tek kaydını, zaman çakışmasını, webhook imzasını, ödeme eşleşmesini, test e-postasını, analiz iznini, tahmin veri kurallarını, üç dilde anahtar tamlığını, HTTP erişim sınırlarını ve ağsız demo akışlarını kapsar. Test çıktısı 05_KANIT_VE_KAYITLAR altında saklanır.

13 testin geçmesi; ekran okuyucu testinin, hedef kullanıcı araştırmasının, gerçek ödeme veya e-posta işleminin, alan adı bağlantısının ya da canlı site güncellemesinin geçtiği anlamına gelmez. Geçmiş raporlar değiştirilmeden korunduğundan oradaki daha eski eksik kontrol ifadeleri aynen görülebilir; bu bölüm arşivdeki kanıtların nasıl okunacağını açıklar.

Ana P-011 durum belgesindeki ortak v0.6 paket ve 109 ortak test kaydı farklı kaynak dalına aittir. Bu sayı cookie1 v0.4.0 testlerine eklenmedi. CARE1, CARE2, SRC03 ve CONSULT kayıtları da cookie1’in teknik dağıtımı olarak yeniden adlandırılmadı.

## 8. Canlıya geçişte açık işler

Aşağıdaki maddeler kaynak ve konuşma kayıtlarında açık kalan somut işlerdir. Sorumlu adları henüz verilmediği için rol olarak gösterilmiştir. Bu arşiv, bu işleri yapılmış hale getirmez.

| İş / sorumlu rol | Tamamlanma kanıtı |
| --- | --- |
| Doğru depo ve Vercel erişimi / teknik sorumlu | cookie1’in repository, branch ve commit eşleşmesi; yetkili proje erişimi. |
| Alan adı / proje sahibi | Kullanılacak alan adı ve kayıt firması; doğru projeye bağlantı, doğrulanmış DNS ve HTTPS. |
| Kalıcı veri / teknik sorumlu | Üretim adaptörü, eşzamanlılık, yedek ve başarılı geri yükleme denemesi. |
| İşletme ve hizmet / operasyon sahibi | Şirket/iletişim bilgileri, bölge, saatler, kapasite, fiyat ve koşullar. |
| Yardımcı operasyonu / hizmet sorumlusu | Takvim, eşleştirme, yetki, erişim, istisna, şikâyet ve kalite süreçleri. |
| Müşteri erişimi / teknik sorumlu | Güvenilir talep kurtarma ve teklif kabulü; kişisel yönetim hesapları/rolleri. |
| E-posta / hesap sahibi | Doğrulanmış gönderici; test teslimi ve başarısız teslim yönetimi. |
| Ödeme / işletme ve teknik sorumlu | Onaylı satıcı hesabı, tutar/koşullar, gerçek entegrasyon, mutabakat ve iade kanıtı. |
| Veri ve marka / yetkili uzmanlar | İşletmeye özgü veri düzeni; logo/marka haklarının ve kullanımının doğrulanması. |
| Sürüm kabulü / QA ve hizmet ekibi | Kesin kaynak sürümüne bağlı mobil, masaüstü, dil, klavye ve hedef kullanıcı kabul kaydı. |

Kaynakların tamamlanmasıyla kontrollü pilot planlanabilir. Uygulama teslimi, pilot işletim onayı ve canlı hizmet açılışı ayrı kilometre taşlarıdır. Bu belgede henüz belirlenmemiş bir alan adı, tarih, ücret veya sorumlu kişi uydurulmadı.

## 9. Arşivin kullanımı ve geri yükleme

| Klasör | İçerik |
| --- | --- |
| 01_BELGELER | Bu raporun Word, HTML ve Markdown sürümleri; karar/değişim kaydı. |
| 02_WEB | Özgün v0.4.0 bağımsız Studio demo HTML. |
| 03_KAYNAK_v0.4.0 | Açık kaynak dosyaları, testler, örnek ortam, logo, eski belgeler. |
| 04_ONCEKI_SURUM_v0.3.0 | Özgün önceki ZIP, önizleme ve teslim raporu. |
| 05_KANIT_VE_KAYITLAR | Özgün v0.4.0 ZIP/rapor, test tekrarı, kaynak izi ve tarihsel ana kayıtlar. |
| 06_ICERIK_VE_API | 154 satır üç dil içerik tablosu ve 15 API yolu envanteri. |
| 07_ENVANTER | Dosya yolları, boyutlar ve SHA-256 doğrulama listesi. |

Önce ZIP paketini çıkarın ve P-011_COOKIE1_Dosya_Listesi.html dosyasını açın. Demo için 02_WEB altındaki HTML dosyasını kullanın; yalnızca hayali bilgiler girin. Kaynak uygulama için 03_KAYNAK_v0.4.0 klasörüne geçin. Node.js 24+ ile npm test ve npm start komutları README içinde açıklanır. Derleme npm run build ile yeniden üretilebilir.

Geri yüklemeden sonra dosyaları 07_ENVANTER/P-011_COOKIE1_SHA256.txt listesiyle karşılaştırın. Hash listesi kendisini ve dosya dizinlerini kapsamaz; bu hariç tutmalar envanterin açıklamasında yer alır. SHA-256 dosya değişikliğini saptar; kimlik doğrulayan dijital imza değildir. Özgün v0.3.0 ve v0.4.0 ZIP dosyaları ayrıca aynen korunmuştur.

Kapsam bu konuşmadaki cookie1 dalı ve onu anlamak için gerekli P-011 kayıtlarıdır. Bütün ChatGPT projeleri, bütün NAVIAR logo çalışmaları veya diğer NAVIAR web dallarının tüm kaynakları bu ZIP’e dahil değildir. Önceki geniş NAVIAR arşiv kaydı yalnızca tarihsel bağlam olarak eklenmiştir; oradaki dosya sayıları bu paketin sayısı değildir.

Kaynak dayanakları: özgün v0.4.0 README, docs/01–07, Studio raporu, server.mjs, src/ ve public/ dosyaları; özgün v0.3.0 teslimi; P-011 ana proje ve durum kaydı; bu turdaki test çıktısı; kullanıcının aktardığı son konuşma. Dosya düzeyindeki kaynak izleri ve eski konumlar ayrı JSON dosyasında tutulur.
