# Kod birleştirme ve Vercel hazırlığı — 7 Eylül 2026

Ana kaynak: `andersenbetul-alt/BETA-ART-PRIVAT`, başlangıç commit'i `d52f484bc1ec83ce2a3be351376d5cf10173d8d3`.

## Birleştirme kararı

Yüklenen repository belgeleri tam kaynak arşivi değildir. `TAMAMLANMIS_KODLAR.md` içindeki HTML, CSS, i18n ve yazı örneklerinde kesilmiş bölümler bulunur. `TUMU_REPO_KODLARI.md` içindeki backend dosyaları da kesilmiştir. Aynı belgedeki minimal package.json/vercel.json örnekleri gerçek deponun ayarlarıyla çelişir. Bunlarla çalışan kaynakların üzerine yazılmadı; tam GitHub kaynakları esas alındı.

İki `(1)` belgesi ilk kopyalarıyla birebir aynıdır. Müze tasarımındaki 18 HTML yüklemesi SHA-256 karşılaştırmasıyla 6 farklı sayfaya indirildi. Kaynak isimleri ve özetleri `beta-art-museum/source-manifest.json` dosyasındadır. Kullanıcının eski audit ve gjenstår belgeleri tarihsel planlardır; güncel teknik veya hukuki doğrulama sayılmaz.

## Sonradan eklenen dokuz tam ZIP

`BETA-ART-PRIVAT-main.zip`, `(1).zip` ve `(2).zip` birebir aynıdır.
Sonradan yüklenen altı kopya da aynı özete sahiptir; toplam dokuz arşiv birebir aynıdır.
Ortak SHA-256 özeti: `ea09b2f7c8cb88aa8203800eeb0fc669d52b3773931b460d6cfbe61539f6942a`.
Her arşivdeki 649 dosyanın içeriği başlangıç GitHub commit'i ile birebir karşılaştırıldı:
649 aynı, 0 yeni, 0 farklı, 0 eksik. Yeni bir kaynak sürümü eklemiyorlar;
birleştirilen teslimde her kaynak dosyası bir kez yer alır.

## Düzeltilen sorunlar

| Bulgu | Düzeltme |
|---|---|
| .vercelignore bütün scripts dizinini dışlıyordu; CLI yüklemesinde build betiği eksik kalabiliyordu | Gerekli iki build betiği yüklemeye dahil edildi |
| Build betiği eksik kaynakta başka isimli BETA-ART deposunu indiriyordu | Ağdan kaynak değiştiren fallback kaldırıldı; kaynak eksikse hata verir |
| dist temizlenmiyor; tekrar build assets/assets üretebiliyordu | Node build, girişleri denetledikten sonra çıktıyı temizler ve açık dosya listesiyle üretir |
| Statik yayın için gereksiz bağımlılık kurulumu riski | Vercel installCommand boş; build yalnızca Node standart kitaplığını kullanır |
| Kredi düşümü/kullanım kaydı ve ödeme/hak işlemleri kısmi kalabiliyordu | SQLite savepoint ile atomik işlem ve hata halinde rollback |
| Kredi miktarları kesir, metin veya sonlu olmayan sayı kabul edebiliyordu | Güvenli tam sayı ve bakiye taşma kontrolleri |
| Miras alınmış nesne anahtarları işlem adı sayılabiliyordu | Yalnızca CREDIT_COST'un kendi anahtarları kabul edilir |
| Müze sayfaları birbirine bağlı değildi; footer bağlantıları boştaydı | Ortak gezinme ve doğru sayfa bağlantıları |
| Inline tıklama kodları sıkı script CSP ile çalışmıyordu | Harici JS ve addEventListener ile bağlantı |
| Müze örnek fotoğrafları gerçek lisans siparişi oluşturabiliyordu | Açık önizleme etiketi; sipariş gönderimi kapalı |
| Çerez demosu doğrulanmamış betaart.no alanına analitik gönderebiliyordu | Demo analitik yüklemesi kapalı |
| Kapalı müze panelleri klavye odağı alabiliyordu | inert, dialog rolleri, odak dönüşü ve Tab sınırı |
| İletişim taslağı kapanmış AB ODR platformuna yönlendiriyordu | Eski yönlendirme EN/NO metinlerinden kaldırıldı |

## Vercel proje ayrımı

| Proje | Root Directory | Build Command | Output Directory |
|---|---|---|---|
| QBLOGG | `.` | `node scripts/build-static.mjs` | `dist` |
| Master | `master` | `node build.mjs` | `dist` |
| BETA ART müze önizlemesi | `beta-art-museum` | `node build.mjs` | `dist` |

Üçü de framework Other ve boş installCommand kullanır. SQLite içerik/ödeme motoru bu statik yayınların sunucu hizmeti değildir. Mevcut `beta-art/` React uygulaması ayrı ürün olarak korunmuştur; bu çalışmada build edilmedi.

## Doğrulama

- QBLOGG sağlık kontrolü: 8 kontrol, 0 uyarı; 10 dil × 252 anahtar, 11 yazı.
- Mevcut güvenlik betiği: 13 geçti, 0 yüksek, 0 orta, 2 bilgi. Bu sonuç kapsamlı sızma testi veya hukuki uyumluluk belgesi değildir.
- Node test çalıştırıcısı: 13 test, 13 başarılı. Mevcut ödeme, puanlama, görünürlük ve Master testleriyle yeni rollback/build regresyonları dahil.
- 15 JavaScript dosyasında söz dizimi kontrolü geçti.
- QBLOGG, Master ve müze build işlemleri geçti.
- 6 müze sayfasında jsdom etkileşim kontrolü: başlatma, EN/NO dil değişimi olan sayfalar, kategori filtresi, detay, siparişin kapalı olması, çerez seçimleri ve marka indirme düğmesinin bağlanması geçti.
- Müze HTML dosyalarındaki yerel bağlantı, parça kimliği ve tekrarlanan id kontrolü geçti.
- Chromium indirmesi 502/zaman aşımı verdi: gerçek tarayıcıda görsel, responsive, ağ üzerinden CSP ve erişilebilirlik kontrolü tamamlanmadı. jsdom görsel tarayıcı testi değildir.

## Tamamlanmayan işler

Canlı dağıtım ve hesap taşıması yapılmadı. Gerçek fotoğraflar/RAW kanıtları, biyografi ve işletme kimliği bekliyor. privacy.html yalnızca eksik belgeyi açıklayan sayfadır. Hukuki sayfalar ve çerez bileşen dokümanı taslaktır. Ana müze sayfası İngilizce, beş yardımcı sayfa EN/NO'dur. noindex korunur. Canlı ödeme, analitik ve AI API çağrıları sınanmadı.

GitHub hesabına taşıma için hedef kullanıcı/organizasyon adı gerekir. GitHub Projects panoları, repository ve Vercel projeleri farklı kayıtlardır; pano numaraları uygulama kimliğine dönüştürülmedi.

## Teknik kaynaklar

- [Vercel proje yapılandırması](https://vercel.com/docs/project-configuration)
- [Vercel ve SQLite](https://vercel.com/kb/guide/is-sqlite-supported-in-vercel)
- [SQLite savepoints](https://www.sqlite.org/lang_savepoint.html)
- [AB ODR platformunun kapanışı](https://consumer-redress.ec.europa.eu/site-relocation_en)
