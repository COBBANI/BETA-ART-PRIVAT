# NAVIAR CARE / SRC-03 — Kod ve tasarım rehberi

5 Eylül 2026. Bu kaynak, mevcut özel inceleme uygulamasını ve indirilebilir tasarım önizlemesini içerir. Üretim ödemesi, gerçek yardımcı görevlendirmesi veya e-posta teslimi açılmış değildir.

## En kolay inceleme

`NAVIAR-CARE_SRC03_Web-Tasarim.html` dosyasını Chrome, Edge, Firefox veya Safari ile açın. İnternet olmadan sayfa, diller, hizmet kartları, SSS ve yerel seçim özeti kullanılabilir. Sayfadaki özel uygulama bağlantıları internet ve ilgili hesaba erişim gerektirir. Yerel seçimler bu uygulamaya aktarılmaz.

Yerel dosya sunucuya istek göndermez, çerez/yerel depolama kullanmaz ve herhangi bir rezervasyon oluşturmaz. CSP kuralı bağlantı ve form gönderimini kapatır. Bu kural kaynak dosyayı ticari uygulamaya dönüştürmez.

## Kaynak uygulamayı çalıştırma

Node.js 22.13+ gereklidir; bu teslim Node 24.19 ile doğrulandı. Komutlar Bash ve GNU araçlarını kullanır. Windows için WSL2/Linux ortamı uygundur. Yerel uygulama geliştirmesi için kilitli paketler ve ağ erişimi gerekir.

```bash
npm ci
npm run dev
```

Yerel geliştirmede özel ortamın giriş ve D1 bağlamı kendiliğinden kurulmaz. Arayüzün açılması kalıcı kayıt veya oturumlu erişimin çalıştığını kanıtlamaz. Tam veri davranışı için mevcut Sites ortamı ya da ayrı yapılandırılmış uyumlu Worker/D1 geliştirme ortamı gerekir. İnternetten açılacak üretim sürümü için `.openai/hosting.json`, kimlik doğrulama ve veri bağlantıları hedef ortama uygun yönetilmelidir.

Mevcut `.openai/hosting.json` bu SRC-03 Site kimliğini içerir. Başka müşterinin sitesini oluşturmak için olduğu gibi kullanılmamalıdır. Kaynakta gerçek ortam sırları yoktur. `.env.example` yalnızca boş değişken isimlerini gösterir. Gerçek değerler güvenli ortam ayarlarından sağlanır; kullanıcıya, tarayıcı paketine veya Git'e yazılmaz.

## Doğrulama

```bash
npm test
npm run preview:export
npm run test:preview
```

`npm test` derlemeyi, 26 hizmet kabul senaryosunu, 36 dil/sayfa görünümünü, analiz depolama hatasını ve derlenmiş Worker için üç kontrolü çalıştırır. Sağlayıcı yanıtları sentetiktir. Gerçek para veya e-posta kullanılmaz. Bu kontroller tarayıcı/ekran okuyucu veya saha hizmet testleri değildir.

`npm run test:preview` yalnızca eklenen yerel tasarımın dört kontrolünü yürütür: seçim kuralları, Oslo zaman geçerliliği, yeni üç dilli açıklamalar ve dosyanın kaynak/bağlantı sınırları.

## Bağımsız tasarımı yeniden üretme

```bash
npm run preview:export
# İsteğe bağlı başka çıktı yolu:
node scripts/export-design-preview.mjs /tam/yol/NAVIAR-CARE_SRC03_Web-Tasarim.html
```

Varsayılan çıktı: `outputs/NAVIAR-CARE_SRC03_Web-Tasarim.html`.

| Değiştirmek istediğiniz alan | Dosya |
| --- | --- |
| Tam uygulamadaki üç dilli ana metinler | `lib/content.ts` |
| Tam uygulamanın ekranları | `components/care-app.tsx` |
| Ortak marka ve mobil düzen | `app/globals.css` |
| Bağımsız tasarımın semantik HTML yapısı | `design-preview/index.template.html` |
| Bağımsız tasarımın ek stilleri | `design-preview/preview.css` |
| Yerel dil değişimi, menü ve seçim özeti | `design-preview/preview.js` |
| Yalnızca bağımsız önizleme için açıklamalar | `design-preview/preview-copy.mjs` |
| Yerel seçim doğrulaması | `design-preview/preview-model.mjs` |
| Tek dosya HTML üretimi | `scripts/export-design-preview.mjs` |

Bağımsız sürüm mevcut logo ve temsili görseli dosyanın içine gömer; uzak font veya görsel çağrısı yapmaz. Mevcut API'nin yerine geçecek sahte API yazılmaz. Tam uygulamadaki test kayıtlarını denemek için mevcut özel Site kullanılır.

## Paket içeriği ve sınırlar

ZIP, bu kaynak ağacının Git'e kaydedilmiş halinden üretilir. Bağımlılıklar, geçici test dosyaları, `.git`, gerçek ortam değişkenleri ve kullanıcı verileri içermez. Standart Next.js/Vercel ortamına geçiş otomatik değildir; Worker/D1/Sites kimlik akışının uyarlanması gerekir.

Konseptin ana belgesi `NAVIAR-CARE_SRC03_Tam-Konsept.md` ve tarayıcıda okunabilen aynı adlı HTML dosyası olarak ayrıca teslim edilir. Mevcut kamuya kapalı uygulama bu çalışmada yeniden yayımlanmaz; kod teslimi ve canlı hizmet açılışı ayrı durumlardır.
