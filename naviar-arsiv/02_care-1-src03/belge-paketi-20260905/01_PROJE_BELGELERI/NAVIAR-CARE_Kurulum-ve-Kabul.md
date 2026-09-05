# NAVIAR CARE — İnceleme ve kurulum rehberi

**Belge kodu:** NAVIAR-CARE-SRC03-RUNBOOK-20260905 · **Belge sürümü:** 1.0  
**Tarih:** 5 Eylül 2026 · **Uygulama sürümü:** 2  
**Kapsam:** Yaşlılar için tıbbi olmayan günlük destek · Özel test uygulaması.

Uygulama: [NAVIAR CARE](https://naviar-care-src03.andersen-betul.chatgpt.site)

Bu rehber, yayımlanan test sürümünün nasıl deneneceğini ve gerçek hizmet için hangi bağlantıların eksik olduğunu gösterir. Gerçek kişi, ev adresi, sağlık bilgisi veya kart bilgisi test formuna yazılmaz. Test sırasında gerçek yardımcı gönderilmez.

## 1. Önizleme bağlantıları

| Dil | Ana sayfa | Talep | Taleplerim | Yönetim |
| --- | --- | --- | --- | --- |
| Norsk Bokmål | [/nb](https://naviar-care-src03.andersen-betul.chatgpt.site/nb) | [/nb/booking](https://naviar-care-src03.andersen-betul.chatgpt.site/nb/booking) | [/nb/account](https://naviar-care-src03.andersen-betul.chatgpt.site/nb/account) | [/nb/operations](https://naviar-care-src03.andersen-betul.chatgpt.site/nb/operations) |
| English | [/en](https://naviar-care-src03.andersen-betul.chatgpt.site/en) | [/en/booking](https://naviar-care-src03.andersen-betul.chatgpt.site/en/booking) | [/en/account](https://naviar-care-src03.andersen-betul.chatgpt.site/en/account) | [/en/operations](https://naviar-care-src03.andersen-betul.chatgpt.site/en/operations) |
| Türkçe | [/tr](https://naviar-care-src03.andersen-betul.chatgpt.site/tr) | [/tr/booking](https://naviar-care-src03.andersen-betul.chatgpt.site/tr/booking) | [/tr/account](https://naviar-care-src03.andersen-betul.chatgpt.site/tr/account) | [/tr/operations](https://naviar-care-src03.andersen-betul.chatgpt.site/tr/operations) |

Site yalnızca sahibine açıktır. Yönetim görünümü ayrıca sunucuda yetkili hesap kontrolü yapar. Henüz müşteri hesabı açılan kamuya açık hizmet değildir.

## 2. Bir test talebini baştan sona deneyin

1. Türkçe talep sayfasında bir hizmet seçin. Gelecekte bir gün ve saat girin. Saat dilimi **Europe/Oslo**.
2. “Kendim için” seçin. “Test Kullanıcı” gibi temsili bir ad ve `0150` gibi test posta kodu kullanın. Test onayını verip talebi kaydedin.
3. Taleplerim sayfasını yenileyin. Aynı kayıt görünmelidir. Kayıt henüz randevu değildir.
4. Yönetim sayfasında ilgili kaydı bulun. `TEST-01` kaynak kodu ve örneğin `450` NOK test tutarıyla teklif oluşturun. Bu tutar ticari fiyat önerisi değildir.
5. Taleplerim görünümünde toplam fiyatı ve teklifin son yanıt zamanını görün. Test teklifini onaylayın. Gerçek yardımcı atanmaz.
6. Ödeme başlamadıysa saati değiştirin veya iptal edin. Saat değişikliği eski fiyatı geçersiz kılar; yeni teklif gerekir. İptal, ayrılan test zamanını serbest bırakır.
7. “Başka biri için” ayrı bir talep açın. Bu kayda fiyat teklifinin verilemediğini ve paylaşım yetkisinin açılamadığını kontrol edin. Ödeyen kişi alıcı yerine onay veremez.

**Çakışma örneği:** Aynı gün 10:00–11:00 aralığında `TEST-01` için teklif tutarken aynı kaynağa 10:30 başlangıçlı başka teklif verilemez. Sonraki uygun başlangıç, başka engel yoksa 11:15'tir. Farklı test kaynakları bağımsızdır. Bu sabit ara gerçek yol süresi hesabı değildir.

**Teklif süresi:** En fazla 24 saat; ziyaret daha erkense ziyaret başlangıcına kadar. Süresi dolmuş teklif onaylanmaz. Operasyon sorumlusu müsaitliği yeniden kontrol ederek yeni teklif hazırlamalıdır.

**Haftalık tercih:** Form haftalık yardım isteğini kaydeder. Takvime otomatik olarak sonsuz veya çok haftalı ziyaret serisi eklenmez. Her ziyaret ayrıca kararlaştırılır.

## 3. Dört sorun türü ve sorumlu kişi

Taleplerim sayfasındaki “Sorun bildir” eylemi şu kayıtları açar:

| Olay | İlk karar | İnceleme sorumlusu |
| --- | --- | --- |
| Yardımcı gelmedi | İş tamamlandı sayılmaz; yeni zaman/iptal değerlendirilir | Operasyon koordinatörü |
| Kapı açılmadı | İzinsiz girilmez; önceden kararlaştırılan iletişim planı izlenir | Nöbet sorumlusu |
| Ek iş istendi | Ek iş durur; kapsam, yetkinlik, süre, fiyat ve yeni onay netleşir | Operasyon koordinatörü |
| Ödeme tartışmalı | Yeni ödeme bağlantısı engellenir; mevcut bağlantı için kapatma denenir | Ödeme sorumlusu |

Yönetici önce **“Bu kaydı üstlen”**, ardından **“Kaydı incelendi olarak işaretle”** adımlarını kullanır. Hesap kimliği ve zaman kaydedilir. Başka bir sorumluya atanmış kaydı sessizce devralamaz.

İnceleme işareti hizmeti tamamlamaz, itirazı sonuçlandırmaz, ödeme açmaz veya iade yapmaz. Ödeme sağlayıcısında tamamlanmış işlem için ayrı mutabakat ve belgeli karar gerekir. Bu testte nöbet ekibi yoktur; form acil yardım kanalı değildir.

## 4. E-posta ve ödeme bağlantıları

| Bağlantı | Güvenli yapılandırma alanı | Beklenen kanıt |
| --- | --- | --- |
| Stripe test hesabı | `STRIPE_SECRET_KEY` — sadece test anahtarı | Sağlayıcının test oturumu ve eşleşen ödeme kaydı |
| Stripe webhook | `STRIPE_WEBHOOK_SECRET` | İmza, oturum, NOK tutarı ve tekrar olay kontrolü |
| Uygulama dönüş adresi | `APP_ORIGIN` | Ödeme dönüşünün aynı site hesabına ulaşması |
| Resend | `RESEND_API_KEY` | Sağlayıcı kabul kaydı |
| Doğrulanmış e-posta alan adı | `MAIL_FROM` | Alan adı doğrulaması, SPF/DKIM/DMARC kontrolleri |
| Açıkça izin verilen test alıcısı | `MAIL_TEST_RECIPIENT` | Bu kişiye gönderim için açık yetki ve gerçek teslim testi |

Anahtarlar dokümanlara, kaynak koduna veya sohbet metnine yazılmamalı. Hesap bağlantısı veya güvenli ortam değişkeni alanından eklenmelidir. Bu çalışmada sağlayıcı anahtarları girilmedi ve e-posta gönderilmedi.

**E-posta kuyruğu:** Üç dilde konu ve metin önizlenebilir. Aynı mesaj için eşzamanlı gönderim kilidi vardır. Başarısız deneme sonrası en az iki dakika beklenir; en çok üç deneme yapılır. İlk denemeden 23 saat sonra elle kontrol gerekir. Sağlayıcının “kabul etti” yanıtı teslim/okuma kanıtı değildir. Otomatik müşteri e-postası ve teslim/bounce webhooks henüz etkin değildir.

**Ödeme bağlantısı:** Teklifin ödeme anahtarı paylaşım ayarından bağımsızdır. Mevcut açık Stripe oturumu yeniden kullanılır. Sonucu belirsiz girişim 23 saatten sonra yeni anahtarla otomatik tekrarlanmaz. Süresi dolan oturum ve iade için operasyon incelemesi gerekir. Gerçek tahsilat anahtarları kod tarafından kabul edilmez.

**Olay sırasında bağlantı:** Kapatma başarısız olursa kuyrukta yeniden denenebilir kayıt görünür. Olay bildirimi kaybolmaz. Kapatılmış bağlantı, daha önce alınmış parayı geri ödemez.

## 5. İçerik ölçümü ve sonraki ihtiyaç

- Analiz izni başlangıçta kapalıdır; kabul ve ret seçenekleri görünürdür.
- İçerik etkileşimi, görünür sekmede süre ve sayfa ilerlemesi sinyalidir. Okundu veya anlaşıldı diye raporlanmaz.
- Ana sayfa, hizmetler, yakınlar ve güvenlik sayfalarında gönüllü iki soruluk geri bildirim bulunur. Sabit seçenekler: bilgi bulundu mu; sonra fiyat, rezervasyon, yakın erişimi, gelen kişi veya iletişim bilgisi mi isteniyor?
- Geri bildirim hesabın kimliğiyle ilişkilendirilmez; serbest metin veya sağlık verisi alanı yoktur. Yanıt bir destek bileti oluşturmaz.
- Yönetim en az beş olay/yanıt içeren grupları gösterir. Sayılar benzersiz kişi sayısı değildir.
- Raporlar son 90 günü kapsar. Daha eski analiz/geri bildirim kayıtları yönetimden silinebilir. Otomatik zamanlama henüz yoktur.
- Tahmin modülü test verisini reddeder. Gerçek, yeterli ve düzenli veri olmadan “gelecek hafta şu hizmet istenecek” sonucu göstermez.

İçerik kalitesini doğrulamak için sonraki çalışma, üç dilde hedef kullanıcıların metni okuyup görevleri tamamlamasını gözlemlemektir. Bir anket veya tıklama sayacı bu testi tek başına karşılamaz.

## 6. Açılıştan önce tamamlanacak işler

| Öncelik | İş | Gerekli karar veya erişim |
| --- | --- | --- |
| 1 | Orijinal alan adını güncelleme | `beta-art-series1` projesinin bağlı olduğu Vercel hesabı/takımı veya kaynak reposu |
| 1 | Alıcı onayı ve aile yetkisi | Bağımsız alıcı hesabı, davet, kapsam ve geri alma süreci |
| 1 | Yardımcıların görev yetkisi | eID sağlayıcısı, gerçek referans araması, eğitim ve görev bazlı yeterlilik |
| 1 | Hizmet ve operasyon | Bölge, fiyat, destek saatleri, isimli sorumlular, sigorta ve sözleşmeler |
| 2 | Sağlayıcı doğrulaması | Stripe test, Resend gönderici alan adı ve yetkili test alıcısı |
| 2 | Saha akışları | Başlangıç/bitiş onayı, rota, tekrarlı ziyaretler, yardımcı değişikliği ve gerçek takvim |
| 2 | Para hareketleri | İade, mutabakat, komisyon ve yardımcıya ödeme modeli |
| 3 | Yayın kabulü | Hedef kullanıcı, mobil, klavye/ekran okuyucu, yük, yedek/geri yükleme ve gizlilik incelemesi |
| 3 | Sürekli ölçüm | Otomatik silme ve teslim hatası takibi; gerçek veri sonrası tahmin kıyaslaması |

Bu liste aktif entegrasyonların değil, kalan açılış işlerinin kaydıdır. Vercel'de ilk hedef okuması 403 döndü; erişilebilen ikinci takımda proje bulunmadı. Eski Vercel adresleri bu sürümle değiştirilmedi.

## 7. Kanıt ve dosya düzeni

- 25 sunucu/iş kuralı kabul senaryosu geçti.
- 36 dil/sayfa bileşimi sunucu render kontrolünden geçti.
- 256 arayüz anahtarı + 12 hizmet metni + 2 e-posta metni = 270 üç dilli katalog satırı.
- TypeScript ve üretim derlemesi geçti.
- Sağlayıcı yanıtları sentetik testlerle doğrulandı; gerçek Stripe/Resend teslim kanıtı yoktur.
- Tarayıcı görsel kontrolü, gerçek cihaz, ekran okuyucu veya performans puanı ölçülmedi.
- Kaynak revizyonu: `aa4db7b852bff9b841f9847391cecf55d050fee6`.
- Yayın: sürüm 2, 5 Eylül 2026 02:59 UTC, `succeeded`, ortam revizyonu 1.

Belgeler NAVIAR CARE / 01_BELGELER altında; kaynak adresi NAVIAR CARE / 04_WEB_KAYNAKLARI / SRC-03 altında tutulur. Tasarım ve diğer CARE belgeleri mevcut proje klasörlerinde korunur.
