# NAVIAR Consult — Teknik Mimari ve İşletim Devri

**Proje:** P-010 / NVC-001 · **Kaynak sürümü:** WEB-11 · **Belgeleme tarihi:** 5 Eylül 2026

Bu belge, NAVIAR Consult’un eldeki kaynak kodunu ve işletim tasarımını açıklar. NAVIAR Care ayrı projedir. Kaynak incelemesi salt okunur yapılmıştır; uygulama değiştirilmemiş, yeni müşteri kaydı, gönderim veya tahsilat oluşturulmamıştır. Dosya yolları, aksi belirtilmedikçe NAVIAR Consult kaynak deposuna göredir. Dış servis belgeleri bu arşiv çalışmasında yeniden araştırılmamıştır; aşağıdaki teknik davranışlar yerel uygulamaya dayanır.

## 1. Sürüm, kapsam ve teslim sınırı

İncelenen commit `785123a41caa7bf2e1dd8767dcec5127d1e17b77`, açıklaması “Document service process and clarify multilingual customer journey” olan WEB-11 kaydıdır. İnceleme anında 174 dosya git tarafından izlenmekte, çalışma ağacında değişiklik bulunmamaktadır. Önceki DOC-10 belgesindeki 172 kaynak sayısı tarihsel sürüme aittir; bugünkü envanter yerine kullanılmamalıdır.

Üç dilde 14 sayfa türü, toplam 42 müşteri görünümü vardır. `/admin` bu sayıya dahil değildir. Önceki teslim kaydı, sitenin `https://naviar-consult.andersen-betul.chatgpt.site` adresinde özel incelemeye yayımlandığını bildirir. Bu belgeleme görevi yayını yeniden gerçekleştirmemiş veya canlı ortamın tüm ayarlarını yeniden doğrulamamıştır. Yerel kaynakta özelliğin bulunması, gerçek sağlayıcı bağlantısının çalıştığı anlamına gelmez.

WEB-11 kayıtları, müşteri kabulü ve ödeme bayraklarının kapalı olduğunu, gerçek sağlayıcı ayarlarının tamamlanmadığını belirtir. Bağımsız `NVC-001-WEB-11_Onizleme.html` gönderimsiz inceleme dosyasıdır. Sunuculu sitenin izinli ölçüm API’si farklı çalıştığı için bütün siteye “hiç veri göndermez” denmemelidir. Kaynak: `README.md`, `docs/NVC-001-WEB-11_Surec_ve_Dogrulama.md`, DOC-11 süreç rehberi.

## 2. Uygulama katmanları

Uygulama React 19 ve TypeScript ile yazılmıştır. `package.json`, Next 16 paketini ve App Router yapısını içerir; derleme/çalıştırma Vite, vinext ve Cloudflare eklentisi üzerinden yapılır. Sunucu girişi `worker/index.ts`, kalıcı veri erişimi Cloudflare D1/SQLite üzerindedir. Bunu doğrudan standart Vercel dağıtımı olarak tanımlamak doğru değildir.

| Katman | Kaynak | Sorumluluk |
|---|---|---|
| Dil ve içerik | `content/nb.json`, `content/en.json`, `content/tr.json`, `lib/content.ts` | Aynı sayfa kimliklerinin metinleri, yolları ve ilgili içerikler |
| Sayfa sunumu | `app/[lang]/[[...slug]]/page.tsx`, `components/site`, `app/globals.css` | Sunucu çıktısı, metadata, formlar, yöntem ve hizmet sunumu |
| İş kuralları | `lib/workflow.ts`, `lib/email.ts`, `lib/offers.ts` | Randevu geçişleri, kuyruk ve teklif doğrulaması |
| API | `app/api` | Girdi, yetki, çalışma durumu ve sağlayıcı sınırları |
| Veri | `db/schema.ts`, `lib/database.ts`, `drizzle` | Şema, sorgu, benzersizlik ve eklemeli geçişler |
| Platform | `vite.config.ts`, `worker/index.ts` | Worker yönlendirmesi, bağlar, yanıt başlıkları |

Yöntem sayfası `components/site/process-journey.tsx` üzerinden altı adımı, her adımın çıktısını ve iki tarafın rolünü gösterir. WEB-11 bu sunumu geliştirmiş; yeni veritabanı veya ticari sağlayıcı etkinleştirmesi yapmamıştır. İç işletim belgeleri `docs` içindedir ve genel varlık dizini değildir.

## 3. Veri sözlüğü

Şemada 11 tablo vardır. `bookings`, iletişim ve kuruluş bilgilerini, hizmet/dil seçimini, tarih aralığı tercihini, durumunu, kesin saati ve revizyonu tutar. Tıbbi dosya veya tanı alanı yoktur. `meeting_claims`, tek danışmanın 15 dakikalık zaman dilimlerini benzersiz anahtarla sahiplenir. `email_outbox`, değişmez mesaj içeriğini ve gönderim/teslim izlerini saklar.

`offers`, kod hash’i, teklif referansı, tutar, para birimi, süre ve sağlayıcı oturumunu tutar. `payments`, oturumun son ödeme durumunu; `payment_events`, işlenen olay kimliklerini saklar. `content_daily` ve `feedback_daily`, günlük toplamlardır. `feedback_receipts`, tekrar kontrolü için hash ve süre kaydıdır. `email_delivery_events`, teslim olaylarını; `rate_buckets`, genel dakika kotalarını içerir.

Şema geçişleri `drizzle/0000`–`0003` dosyalarındadır. Uygulama isteği sırasında tablo oluşturmaya çalışmaz. Çoklu kayıt işlemleri D1 `batch` kullanır; revizyon koşulları ve benzersiz anahtarlar yarış durumlarını sınırlar. Kaynak: `db/schema.ts`, `lib/database.ts`, `lib/workflow.ts`, `app/api/booking/route.ts`.

## 4. Başvuru ve randevu işletimi

`POST /api/booking`, önce kabul hazırlığını kontrol eder. Aktif değilse `503 intake_inactive` döner. Aktif akışta şema yalnız tanımlı alanları kabul eder: UUID, ad, e-posta, kuruluş, hizmet, dil, tarih, günün bölümü, boş robot tuzağı ve kabul işareti. Tercih tarihi Europe/Oslo takviminde yarından başlayıp 180. güne kadar uzanır; bu alan gerçek müsaitlik takvimi değildir.

Talep, müşteriye alındı mesajı ve kurum içi bildirim aynı grup işleminde kaydedilir. Aynı UUID ve aynı veriyle tekrar gönderim mevcut kaydı döndürür; değişen veri `409 idempotency_conflict` üretir. İlk e-posta denemesi başarısız olsa da kaydedilmiş başvuru başarı olarak kalır. Genel başvuru kotası dakikada 15’tir; kişi başına limit değildir.

| Mevcut durum | İzin verilen sonraki durum |
|---|---|
| `pending` | `contacted`, `closed`, `confirmed` |
| `contacted` | `closed`, `confirmed` |
| `confirmed` | `cancelled` |
| `closed`, `cancelled` | Bu sürümde sonraki geçiş yok |

Yönetici `POST /api/admin` ile kesin tarih ve saat onaylar. Sistem 30 dakikalık görüşmeye 15 dakika ara ekleyerek üç zaman dilimini ayırır. Çakışma tüm işlem grubunu başarısız kılar. Europe/Oslo yaz/kış saatinde olmayan veya iki farklı ana karşılık gelen saatler reddedilir. Kesin zaman en az bir saat ileride ve en fazla 181 gün içindedir.

Revizyon numarası eski ekranın daha yeni kaydı ezmesini engeller; işlem UUID’si ve parmak izi tekrarın aynı işlem olup olmadığını denetler. İptal zaman haklarını serbest bırakır. E-posta ayarı yoksa yeni onay engellenir; mevcut görüşme iptal edilebilir ve manuel bildirim gereği kaydedilir. Otomatik dış takvim senkronizasyonu bulunmadığından danışman takvimini ayrıca kontrol etmelidir. Kaynak: `lib/booking-date.ts`, `lib/security.ts`, `lib/workflow.ts`, `app/api/admin/route.ts`.

## 5. E-posta kuyruğu ve sorun çözümü

Her mesajın alıcısı, göndereni, yanıt adresi, konusu ve gövdesi oluşturulduğu andaki değerlerle saklanır. Tekrar, değişmiş başvuru üzerinden yeni mesaj üretmez. Resend çağrısındaki idempotency anahtarı kuyruk kimliğidir. Kuyruk işleyicisi en fazla 10 mesajı, 60 saniyelik sahiplenmeyle işler; sağlayıcı çağrısının bekleme sınırı 12 saniyedir.

Gönderim durumları `pending`, `sending`, `accepted`, `review`, `superseded`; teslim durumu ayrı alan olarak `unconfirmed`, `sent`, `delayed`, `delivered`, `failed`, `bounced`, `complained` değerlerini kullanır. Sağlayıcı kabulü teslim değildir; teslim alıcı sunucusuna varışı gösterir, okunmayı göstermez. İptal edilmiş veya revizyonu değişmiş görüşmenin bekleyen onayı `superseded` olur.

Geçici hata için ilk bekleme 60 saniyedir ve denemelerle ikiye katlanır; sağlayıcının daha uzun `Retry-After` süresi korunur. Ağ/timeout, 408, 5xx, hız sınırlaması ve belirli geçici 409 hataları yeniden denenebilir. Kalıcı 4xx/kota sorunu, beş başarısız deneme veya 23 saatlik pencerenin aşılması inceleme gerektirir. Operatör özgün mesajı sağlayıcı panelinde araştırmalı; belirsiz bir mesajı yeni anahtarla körlemesine yeniden oluşturmamalıdır.

`POST /api/resend/webhook`, ham gövde üzerinde Svix HMAC-SHA256 imzasını ve beş dakikalık toleransı doğrular. Tekrar olayları ayıklanır. API yanıtından erken gelen teslim kaydı, sağlayıcı kimliği elde edildiğinde eşleştirilir; düşük öncelikli geç olay daha güçlü durumu geriye götürmez.

İlk gönderim başvuru/onay/iptal sırasında denenir. Vadesi gelen tekrarlar yönetimdeki düğme ve `POST /api/admin/operations` üzerinden işlenebilir. `worker/index.ts` yalnız `fetch` içerir; zamanlanmış kuyruk işçisi bağlanmış değildir. Sürekli işletim için zamanlayıcı, görevli, yedek ve bildirim rutini gerekir. Kaynak: `lib/email.ts`, `lib/mail-retry.ts`, `lib/mail-delivery.ts`, `lib/mail-signature.ts`, `docs/NVC-001-OPS-07_Eposta_ve_Olcum.md`.

## 6. Teklif ve tahsilat

Ödeme, önceden yazılı olarak kararlaştırılmış teklif üzerine kuruludur. Yetkili yönetici `/api/admin/operations` üzerinden teklif referansı, tamsayı tutar, dil ve anlaşma işaretini gönderir. Para birimi `nok` olarak sunucuda belirlenir. Özel kod iki UUID’den oluşur; veritabanında kodun SHA-256 hash’i saklanır. Teklifin süresi oluşturulduğundan itibaren 23 saattir.

`POST /api/offer`, kodla teklif özetini verir. `POST /api/checkout`, kabul edilmiş ve süresi geçmemiş tekliften Stripe Checkout oturumu üretir. Tutar istemci isteğinden alınmaz. Aynı teklif sabit sağlayıcı idempotency anahtarıyla aynı oturuma bağlanır. Yeni oturum için en az 30 dakikalık süre gerekir; dönen adresin `checkout.stripe.com` olması doğrulanır.

`GET /api/payment-status`, oturum kimliğini yalnız `HttpOnly`, `Secure`, `SameSite=Lax` ödeme çereziyle eşleşen teklifte doğrular. Başarı dönüş adresi tek başına ödeme kanıtı değildir. Sağlayıcı yanıtı ve Stripe webhook’u oturum, teklif, tutar, para birimi ve test/canlı modu eşleşmesini denetler.

`POST /api/stripe/webhook`, imzalı ham gövdeyi doğrular; tamamlanma, gecikmeli başarı/başarısızlık ve süre dolumu olaylarını işler. Olay kimliği tekrarı ikinci kayıt etkisi oluşturmaz. `paid` durumu geç gelen başarısızlıkla gerilemez. Yeni satış kapalıyken, gerekli sağlayıcı anahtarları mevcutsa eski ödemeleri doğrulama yolu korunur. Otomatik iade, faturalama veya muhasebe entegrasyonu bu kaynaklarda uygulanmış değildir. Kaynak: `lib/offers.ts`, ilgili beş ödeme API dosyası.

## 7. Ölçüm, tercih ve saklama

İsteğe bağlı ölçüm ve kişiselleştirme başlangıçta kapalıdır. Tercih yerel tarayıcıda 180 gün tutulabilir; açılan içerik kimlikleri bellek içindedir. Ölçüm yalnız izin verilen dokuz genel sayfa için sayfa/dil, görüntülenme, kaba etkin süre ve kaydırma seviyelerini gönderir. Form değerleri, e-posta, sağlık veya vaka ayrıntıları şemaya dahil değildir.

Gönüllü geri bildirim genel ölçüm tercihinden ayrıdır. Yalnız sınırlı yanıt/konu kimlikleri kabul edilir; serbest metin yoktur. Tekrar kimliği ve yük hash’i 24 saat tutulur. Aynı yanıt tekrar sayılmaz; değiştirilmiş tekrar reddedilir. `/api/feedback` şirket/politika hazırlığı gerektirir. `/api/events` aynı hazırlık kapısını kullanmaz, ancak `consent:true` ve alan listesi zorunludur; demo durumunun ölçümü kendiliğinden durdurduğu varsayılmamalıdır.

Yönetim raporu bugün dahil 30 UTC takvim gününü gösterir. Günlük içerik/geri bildirim toplamları son 90 UTC günü kapsar. E-posta teslim olayları 90 günlük zaman sınırıyla temizlenir; son mesaj durumu korunur. Süresi dolmuş tekrar ve kota kayıtları da temizlenir. Temizlik sonraki ölçüm, geri bildirim veya yönetim okumasında çalışır; bağımsız zamanlanmış temizlik yoktur.

Başvuru, teklif, ödeme ve mesaj içeriği tabloları için aynı otomatik silme uygulanmamıştır. Ticari işletimden önce bu kayıtların saklama, erişim ve silme sorumlusu ayrıca belirlenmelidir. Rapor görüntülenmeyi insan veya talep sayısı saymaz. Etkin süre gizli sekmede ve 60 saniyelik hareketsizlikte durur; ani tarayıcı kapanışında olay kaybolabilir. Eğitilmiş talep tahmin modeli bulunmaz. Kaynak: `components/site/shell.tsx`, `lib/measurement.ts`, `lib/database.ts`, `app/api/events/route.ts`, `app/api/feedback/route.ts`.

## 8. Yetki ve gerekli ayarlar

Yönetim, ChatGPT kimlik başlığındaki e-postanın `ADMIN_EMAIL` ile eşleşmesini gerektirir. `/admin` giriş ve yetki kontrolünü birlikte yapar; yönetim API’leri yetkisize 403 döner. Bu tasarım Sites’ın güvenilir kimlik katmanına dayanır. Farklı barındırmaya taşınırken başlıkların doğrulanmış kimlik katmanı tarafından üretildiği yeniden sağlanmalıdır; test ortamındaki boş Cloudflare modülü üretim kimlik sistemi değildir.

| Ayar grubu | Koddaki değişken adları |
|---|---|
| İşletme ve politika | `LEGAL_NAME`, `ORG_NUMBER`, `BUSINESS_EMAIL`, `POLICIES_APPROVED` |
| Yönetim | `ADMIN_EMAIL` |
| Yeni müşteri kabulü | `INTAKE_ENABLED` |
| E-posta | `RESEND_API_KEY`, `EMAIL_FROM`, `NOTIFICATION_EMAIL`, `RESEND_WEBHOOK_SECRET` |
| Tahsilat | `PAYMENTS_ENABLED`, `COMMERCIAL_TERMS_APPROVED`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` |

Bayrağı açmak tek başına yeterli değildir; `lib/config.ts` ilgili ayarların birlikte varlığını kontrol eder. Ancak varlık kontrolü gerçek DNS, hesap sahipliği veya ticari onay kanıtı değildir. Özel site erişimi dış webhook’ları engelleyebilir; erişim tasarımı yönetim yetkisini koruyarak çözülmelidir.

JSON çağrıları aynı origin, gövde boyutu ve sıkı alan denetimi kullanır. Webhook’lar origin yerine sağlayıcı imzasını kullanır. Worker indekslemeyi kapatır, özel önbellek politikasını ve güvenlik başlıklarını ekler. Genel dakika kotaları temel kötüye kullanım sınırıdır; tam bot savunması veya güvenlik sertifikası değildir. Kaynak: `app/chatgpt-auth.ts`, `lib/admin.ts`, `lib/security.ts`, `lib/config.ts`, `.env.example`, `worker/index.ts`.

## 9. Günlük devir ve geri yükleme

Görevli, bekleyen talepleri ve dış takvimi kontrol eder; kesin saati ayrıca onaylar. Sonra inceleme gereken e-postaları, geciken tekrarları ve teklif/tahsilat eşleşmelerini gözden geçirir. Yönetim ekranı kayıtları son 100 kayıtla sınırlar; daha büyük işletim için sayfalama veya kontrollü raporlama planlanmalıdır. Şirket kimliği, danışman kapasitesi, doğrulanmış gönderici, gerçek ödeme hesabı, dış webhook erişimi, kuyruk zamanlayıcısı ve tahsilat/iade denemesi ticari açılışın somut eksikleridir.

Ana kod kaynağı siteye bağlı git deposudur. Kod zaten orada saklandığı için belge arşivine ikinci bir kaynak ZIP’i eklenmesi gerekmez. Geri yüklemede mevcut işi silmek yerine bağlı depodan ayrı bir çalışma kopyası alınmalı ve yukarıdaki commit seçilmelidir. Örnek inceleme komutu: `git switch --detach 785123a41caa7bf2e1dd8767dcec5127d1e17b77`. Bu komut mevcut çalışan kopyada otomatik uygulanmamıştır.

Depo komutları `npm run install:ci`, `npm run build`, `npm test`, `npm run lint`, `npm run db:generate` olarak tanımlıdır. `npm test` önce derleme yapar; başarıyla derlenmiş sürümde test komutu `node --import ./tests/register.mjs --test tests/*.test.mjs` olur. Node gereksinimi `>=22.13.0`’dır. Çalıştırma ve yayın sırasında güncel Sites prosedürü kullanılmalıdır; bu belge dağıtım işlemi yapmaz.

Git, işletim veritabanı ve korumalı ayarların yedeği değildir. Önceki kaydedilmiş Site sürümü arayüzü geri alabilir; veri geçişleri ayrı değerlendirilmelidir. Gerçek kayıt oluştuğunda veritabanı yedeği, geri yükleme denemesi, kayıp toleransı ve sorumlu atanmalıdır. Kod geri dönüşünün başvuru/ödeme kayıtlarını kendiliğinden sildiği varsayılmamalıdır.

## 10. Doğrulama kanıtı

`docs/NVC-001-WEB-11_Surec_ve_Dogrulama.md`, başarılı derleme, 80 geçen test, sıfır başarısız/atlanan test ve temiz `git diff --check` sonucu kaydeder. Önceki `naviar-closure/NVC-001-QA-10_Test_Gunlugu.txt` dosyasının son özeti de 80/80’dir. Bu arşiv görevi testleri yeniden çalıştırmamıştır; kaydedilmiş kanıtı ve ilgili test kaynaklarını incelemiştir.

Kapsam, 42 sayfanın sunucu çıktısını, kapalı işlem kapılarını, yetkisiz yönetimi, Oslo tarihlerini, eşzamanlı başvuruları, randevu çakışmalarını, kuyruk kurtarmasını, imzaları ve ölçüm sınırlarını içerir. Gerçek sağlayıcı hesabında tahsilat/teslimat kanıtı değildir. WEB-11 için yeni mobil görsel inceleme kaydı yoktur; WEB-07 görüntü kontrolleri tarihsel kanıttır. Devir alan ekip ticari açılışı bu sınırlar ve açık hesap gereksinimleriyle planlamalıdır.
