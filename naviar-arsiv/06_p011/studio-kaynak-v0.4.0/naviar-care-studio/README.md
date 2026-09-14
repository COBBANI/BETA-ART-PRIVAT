# NAVIAR CARE · P-011 · DRAFT-NC-COOKIE1

Sürüm 0.4.0 · 5 Eylül 2026 · Geliştirme ve değerlendirme paketi

Norveççe Bokmål, İngilizce ve Türkçe bir günlük yaşam desteği sitesi; yerel başvuru veritabanı, sınırlı yönetim paneli, test ödeme bağlantısı, e-posta kuyruğu, izinli içerik sayaçları ve haftalık talep tahmin başlangıcı içerir. Gerçek müşteri hizmetine açılmış değildir.

Hedef: https://beta-art-cookie1.vercel.app/. Bu paketin o adrese dağıtıldığı iddia edilmez. P-011 üst proje doğrulandı; cookie1 sürümüne ait mevcut alt proje numarası doğrulanamadığı için DRAFT-NC-COOKIE1 geçici çalışma referansıdır. Mevcut CARE1, CARE2, CONSULT ve Lovable projeleriyle birleştirilmedi.

## Hızlı inceleme

`deliverables/NAVIAR-CARE_P-011_STUDIO_DEMO.html` dosyasını tarayıcıda açın. Dil düğmeleri, hizmet seçimi, SSS ve metin pencereleri bu tek dosyada bulunur. Bağımsız dosya veritabanına bağlanmaz; yalnızca tarayıcı belleğinde işaretli örnek talep oluşturur ve iptal eder. Dil değişimi örnek verileri sıfırlar. Gerçek gönderim yapmaz. Gerçek akış için aşağıdaki yerel sunucuyu çalıştırın.

## Yerel çalıştırma

Node.js 24 veya üstü gerekir. Harici npm paketi yoktur.

```bash
npm test
npm start
```

`http://localhost:4173/nb/`, `/en/` ve `/tr/` adreslerini açın. `data/care.sqlite` ilk çalıştırmada oluşturulur. Yalnızca hayali test bilgileri kullanın.

Yönetim: `/operations`. `.env.example` dosyasını `.env` olarak kopyalayıp en az 32 karakterlik rastgele bir `ADMIN_ACCESS_KEY` belirleyin. `.env` hiçbir zaman kaynak paketine veya istemciye eklenmemelidir.

```bash
node --env-file=.env server.mjs
```

`APP_ORIGIN` tarayıcıda kullandığınız protokol, alan adı ve portla tam eşleşmelidir; sondaki `/` kullanılmamalıdır. Başka port seçerseniz `PORT` ve `APP_ORIGIN` birlikte değişmelidir. Üretim kimliği, fiyatı veya personel bilgisi uydurmayın.

## İşlevlerin durumu

| İşlev | Pakette çalışan kapsam | Canlı kullanım için kalan |
|---|---|---|
| Dil ve içerik | Üç kamuya açık dil, ortak içerik anahtarları, SSR sayfaları | Ana dil editörleri ve hedef kullanıcılarla değerlendirme |
| Başvuru | Girdi kontrolü, tek kayıt, tercih edilen tarih, gizli yönetim jetonu | Müşteri kimliği doğrulaması ve güvenilir geri dönüş kanalı |
| Randevu | İnsan incelemesi sonrası test onayı, aynı kaynak için çakışma kontrolü | Gerçek personel takvimi, tatil/izin, müşteri teklif kabulü, yeniden planlama |
| Yönetim | Sunucuda erişim anahtarı, süreli HttpOnly oturum, sınırlı liste | Kişisel hesaplar, MFA, roller, kalıcı oturum ve kayıt denetimi |
| Ödeme | Sunucu tutarı, Stripe test Checkout adaptörü, imzalı webhook ve tekrar kontrolü | Satıcı hesabı, kesin koşullar, kalıcı veri, uzlaşım ve iade süreci |
| E-posta | Üç dilde şablon, tekrar güvenli kuyruk, kontrollü test alıcısı | Doğrulanmış alan adı, SPF/DKIM/DMARC, müşteri bildirimi, bounce/delivery webhook |
| Analiz | Reddedilebilir ve geri alınabilir izin; toplu bölüm olayları | Canlı ortam kalite takibi ve gerçek örneklem |
| Talep tahmini | Tam hafta sayımları, veri yetersizliği kontrolü, basit model karşılaştırması | En az 12 tam hafta, gerçek veri kalitesi ve kapasite değerlendirmesi |
| Vercel | Statik geliştirme çıktısı; API açıkça 503 döner | Kalıcı veritabanı adaptörü, dağıtık eşzamanlılık ve gerçek hedef proje erişimi |

## Sağlayıcı testleri

Stripe yalnızca `sk_test_` anahtarını ve `STRIPE_WEBHOOK_SECRET` değerini kabul eder. Tutar yönetimde test teklifi olarak onaylanmalı; test randevusu insan kontrolüyle kesinleşmelidir. İstemcinin gönderdiği tutar kullanılmaz. Yönlendirme dönüşü ödeme kanıtı değildir. İade ve ödeme mutabakatı bu pakette otomatik değildir.

Resend için `RESEND_API_KEY`, `MAIL_FROM` ve operatörün kontrol ettiği `MAIL_TEST_RECIPIENT` gerekir. Kuyruk kendiliğinden çalışmaz. Oturum açılmış yönetim API'sinde `/api/admin/outbox/dispatch` açıkça çağrılırsa yalnızca test alıcısına gönderir. `accepted_by_provider`, teslim edildi anlamına gelmez. Bu çalışmada gerçek sağlayıcıya e-posta veya ödeme isteği gönderilmedi; adaptörler sahte sağlayıcı yanıtlarıyla sınandı.

## Dosyalar

- `public/content.js`: üç dilde ana metin kaynağı.
- `public/render.js`, `public/styles.css`, `public/app.js`: kamuya açık sayfa ve etkileşimler.
- `public/operations.*`: Norveççe test yönetimi; kamuya açık sayfa çevirilerine dahil olmayan iç araç.
- `src/domain.mjs`: doğrulama, imza ve tahmin kuralları.
- `src/store.mjs`: SQLite işlemleri, çakışma, kuyruk ve toplu sayaçlar.
- `src/providers.mjs`: test Stripe ve Resend adaptörleri.
- `server.mjs`: yerel HTTP uygulaması ve erişim sınırları.
- `tests/system.test.mjs`: 13 sistem/yolculuk testi.
- `docs/`: kararlar, ölçüm sözleşmesi, hizmet operasyonu ve doğrulama raporu.

`npm run build` statik `dist` üretir. `node portable.mjs` bağımsız inceleme dosyasını yeniler. API işlevleri statik HTML içinde çalışmaz. `vercel.json` yalnızca geliştirme önizlemesi içindir; `api/index.mjs` bilerek veritabanı gereksinimi hatası döndürür. Yerel SQLite dosyasını Vercel'in geçici dosya sistemi üzerinde çalıştırmayın.

## Bilinen sınırlar

Tarayıcıda Norveççe demo için alan hatası, gözden geçirme, tamamlama ve iptal görüldü. Son dil değiştirme düzenlemesi ile mobil, klavye ve ekran okuyucu kontrolleri tamamlanmadı. Ayrıntılı ve güncel kanıt sınırı `deliverables/NAVIAR-CARE_P-011_STUDIO_RAPORU.md` dosyasındadır. WCAG uygunluk sertifikası veya güvenlik denetimi yapılmış değildir.

Başvuru yönetim jetonu sadece açık sayfanın belleğindedir. Yenileme, başka cihaz veya ilk yanıtın ağda kaybolması için kurtarma akışı henüz yoktur. Üretim sürümünde tek kullanımlık, süreli e-posta bağlantısıyla tamamlanmalıdır. E-posta kuyruğunda yalnızca ilk talep bildirimi vardır; değişiklik/iptal/randevu bildirimleri eklenmelidir. Yönetim paneli gerçek operasyon aracı olarak açılmamalıdır.

30 günlük temizlik yalnızca iptal edilmiş veya incelenmemiş, ödenmemiş test başvurularını siler. Onaylanmış/ödenmiş kayıtlar ve denetim kayıtları için işletmeye özgü saklama politikası gerekir. Toplu talep sayımları kişi verisi içermez; gelecekteki silme ve düzeltmeler için tanımlar belgelenmelidir. Oran sınırı ve yönetim oturumları tek sunucu belleğindedir. Şifreli üretim depolaması, yedekleme, geri yükleme ve dağıtık kilitleme kurulmadı.

## Studio gösterimi v0.4.0

Güncel platform kararı ve test kapsamı için `deliverables/NAVIAR-CARE_P-011_STUDIO_RAPORU.md` dosyasını okuyun. `public/demo.js` ağsız demo motorunu, `public/journey.js` alan kontrollerini içerir. `preview-server.mjs` gözetimli tarayıcı testi içindir; geçici bellek veritabanı kullanır. `public/qa.html` mobil boyut kontrol sayfasıdır. `docs/01`–`06` önceki v0.3.0 tarihçesini korur.
