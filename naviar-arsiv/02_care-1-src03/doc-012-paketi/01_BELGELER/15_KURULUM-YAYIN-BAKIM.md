# Kurulum, ortam ayarları, yayın ve bakım

NAVIAR-CARE-001-WEB-01 · DOC-012/15 · Belge v1.0 · 2026-09-05

Kaynak ZIP’indeki naviar-care/ klasörü proje köküdür. Node 24.19.0 bu teslimde kullanılmıştır. README Node 22.13+ belirtir; yerel SQLite testleri ve Vite adaptörü için bu turda doğrulanan Node 24 ortamını kullanmak en doğrudan yeniden üretim yoludur.

```bash
cd naviar-care
npm ci
npm run build
npm test
```

Bu turda bağımlılıklar npm ci --ignore-scripts ile kuruldu; derleme ve testler başarılı oldu. Kilit dosyasına sadık kalın. Testler dist/server/index.js dosyasını içe aktarır: src değişikliğinden sonra önce derleme yapılmalıdır. Yalnızca npm test çalıştırmak eski derlenmiş sürümü sınayabilir.

**Yerel geliştirme:** npm run dev -- --port 4173 komutu Vite adaptörünü başlatır. vite.config.mjs içindeki SITE_ORIGIN http://terminal.local:4173 olarak sabittir. Mevcut ortamda bu adres kullanılır. Kendi bilgisayarında localhost kullanacak geliştirici yalnızca yerel adaptörün kökenini aynı adrese uyarlamalıdır; aksi halde POST CSRF denetimi reddedebilir. Bu adaptör kendiliğinden bir sahte kullanıcı ve gelecek test saati oluşturur, bellekteki SQLite’ı sunucu kapanınca kaybeder. Üretimde çalıştırılmamalıdır.

| Ortam anahtarı | Amaç / varsayılan yaklaşım |
| --- | --- |
| SITE_ORIGIN | Tam, güvenilir HTTPS kökeni; CSRF ve bağlantılar |
| ADMIN_EMAILS | Virgülle ayrılmış doğrulanmış yönetici e-postaları |
| RATE_LIMIT_SECRET | İstek sayaç kimliğini özetlemede kullanılan gizli değer |
| SERVICE_OPEN | Varsayılan false; tek başına açılış sağlamaz |
| LAUNCH_REVIEW_COMPLETE | Varsayılan false; işletim incelemesinin kaydı |
| OPERATOR_NAME | Doğrulanmış sorumlu işletme adı |
| SERVICE_AREA | Gerçek hizmet bölgesi |
| CONTACT_EMAIL | İşletmenin doğrulanmış iletişim adresi |
| CONTACT_PHONE | İsteğe bağlı doğrulanmış telefon |
| RESEND_API_KEY / EMAIL_FROM | E-posta sağlayıcı anahtarı ve doğrulanmış gönderici |
| PAYMENTS_ENABLED | Varsayılan false; ek ödeme koşulları gerekir |
| STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET | Gizli ödeme ve bildirim anahtarları |
| DB | D1 çalışma zamanı bağlaması; .env dosyası metni değildir |

**Derleme:** scripts/build.mjs dist klasörünü yeniden üretir, Worker’ı paketler, mevcut site kimliği ve SQL değişikliklerini dist/.openai altına kopyalar. Şema kasıtlı değiştiğinde npm run db:generate ile yeni migration üretilir; SQL incelenmeden gerçek veriye uygulanmaz. Sadece belge hazırlanırken yeni migration üretmeye gerek yoktur.

**Mevcut yayın:** Sites/Cloudflare Worker + D1. Aynı site kimliği korunmalıdır. Bu teslim yeni yayın oluşturmaz. Vercel taşıması ayrı bir projedir: Worker çalışma zamanı, D1 bağlantısı, kimlik doğrulama, sırlar, CSRF kökeni ve Stripe bildirim erişimi yeniden bağlanmalıdır. Mevcut özel erişimi sırf bildirim gelsin diye bütünüyle açmak doğru bir dağıtım tasarımı değildir.

**Bakım önerisi:** Günlük başvuru/kuyruk kontrolü; haftalık kapasite ve hata incelemesi; sorumlu bir takvimle analiz temizliği; bağımlılık değişikliklerinde sürüm kaydı ve ilgili testler; düzenli yedek/geri yükleme provası. Bunlar oluşturulmuş otomasyon görevleri değildir.

**Geri dönüş:** Kaynak sürümüne dönmek veritabanını otomatik geri döndürmez. Önce eski kodun mevcut şemayla uyumunu kontrol et; yedek ve sağlayıcı işlemlerini koru; veri kaybı riski olan SQL’i ayrı incele. Üretim geri yükleme provası yapılmamıştır.
