# Yayına alma — qblogg.com

Site saf statik; Vercel için bağımlılık kurmadan yalnız yayın dosyalarını
`dist/` içine kopyalayan bir paketleme adımı vardır.

## 1. Mevcut projeyi güncelle

| Ayar | Değer |
|---|---|
| Git deposu | `andersenbetul-alt/BETA-ART-PRIVAT` |
| Ana site Root Directory | `.` |
| Framework | Other |
| Build Command | `bash scripts/vercel-build.sh` |
| Output Directory | `dist` |
| Install Command | Boş (`vercel.json` içinde tanımlı) |

`QBLOGG` ve `qb` depoları uygulama kodu içermez. Ana site kaynağı yukarıdaki
depodur. Yönetim paneli için kök `panel`, üyelik için kök `uye` olan mevcut
Vercel projeleri kullanılır; üyelik ayarları [docs/uye-sistemi.md](docs/uye-sistemi.md).

Önce seçili sürümü yerelde doğrulayın:

```bash
npm run check
node --test scripts/deployment.test.mjs
bash scripts/vercel-build.sh
```

Vercel'de mevcut QBLOGG projesinin **Settings → Git** bağlantısını ve
**Settings → Build and Deployment** içindeki kökü yukarıdaki tabloyla
karşılaştırın. Git bağlantısı etkinse düzeltme dalına gönderim önizleme üretir.

CLI kullanılıyorsa `TAKIM_KODU` yerine mevcut projenin doğrulanmış takım kodunu
yazın; proje adını da mevcut proje kaydıyla eşleştirin:

```bash
npx vercel link --scope TAKIM_KODU --project qblogg
npx vercel
```

`READY` önizleme üzerinde ana sayfa, blog, yazı ve form akışlarını kontrol edin.
Üretim yayını için doğrulanan sürümü mevcut üretim dalına birleştirin veya aynı
kaynak klasöründe `npx vercel --prod` çalıştırın. Yalnız `vercel.json` yüklemek
artık yeterli değildir: yapılandırma, betik ve site kaynakları birlikte gerekir.
Derleme başka bir deponun güncel `main` dalını indirmez.

7 Eylül 2026 erişim kontrolünde bağlantı yalnız boş `bet-art` takımını döndürdü;
`beta-art-master` projeleri listelenemedi. Bu, yukarıdaki Git bağlantısının veya
canlı yayının etkin olduğunun doğrulandığı anlamına gelmez.

## 2. Alan adını bağla — qblogg.com (GoDaddy)

**Doğrulanan durum (20.08):** `qblogg.com` kayıtlı ve GoDaddy'de. Şu an
`160.153.0.38` adresine çözümleniyor — bu GoDaddy'nin park sayfası. Yani alan
adı sizin, ama henüz hiçbir siteye bağlı değil.

Önce Vercel panelinde: **Project → Settings → Domains → Add** → `qblogg.com`
(www'yu ayrıca eklemeyin; Vercel apex'i eklerken www'yu da sorar).

Sonra **GoDaddy → My Products → qblogg.com → DNS → Manage DNS**:

| İşlem | Tip | Ad | Değer |
|---|---|---|---|
| **Düzenle** (mevcut park kaydı) | A | `@` | `76.76.21.21` |
| **Düzenle veya ekle** | CNAME | `www` | *Vercel'in panelde gösterdiği değer* |

Mevcut `A @ → 160.153.0.38` kaydını **silmeyin, düzenleyin** — silip yeniden
eklemek yayılmayı uzatıyor.

**CNAME değerini panelden okuyun, buraya yazmayın.** Vercel bu hedefi projeye
göre veriyor (`cname.vercel-dns.com` ya da `cname.vercel-dns-N.com` olabilir);
yanlış değer sessizce çalışmaz.

GoDaddy'de ayrıca **Forwarding** (yönlendirme) açıksa kapatın — açık kalırsa
A kaydını ezip park sayfasını göstermeye devam eder. En sık gözden kaçan adım
budur.

Alternatif — alan adının ad sunucularını (nameserver) tamamen Vercel'e
devrederseniz DNS'i Vercel yönetir ve tek tek kayıt girmezsiniz. Daha kolay,
ama e-posta kayıtlarınızı (MX) da oraya taşımanız gerekir.

Yayılma genelde 10 dakika–2 saat sürer, en kötü 48 saat. HTTPS sertifikası
doğrulama biter bitmez otomatik gelir.

### www mi, www'siz mi — karar verilmiş durumda

Site şu anda **`qblogg.com`** (www'suz) üzerine kurulu: `config.js → siteUrl`,
`sitemap.xml`'deki 144 adres, JSON-LD kimlikleri ve hreflang etiketlerinin
tamamı bu adresi gösteriyor.

Vercel'de apex'i asıl adres seçin, `www.qblogg.com`'u ona **yönlendirin**
(Vercel bunu Domains ekranında tek tıkla yapıyor). İkisi de aynı içeriği
sunarsa arama motoru aynı sayfayı iki adreste görür ve ikisini de zayıflatır.

www'yu asıl adres yapmak isterseniz söyleyin: `config.js`, `sitemap.xml` ve
canonical üretimi topluca değişmeli — elle üç dosyada değiştirmeyin, tek
komutla yapılıyor.

## 3. Yayın sonrası

- `assets/js/config.js` içindeki `mailTo` adresini kendi kutunuza çevirin.
  Şu an `hello@qblogg.com` — bu adrese posta gelmiyorsa formlar boşa gider.
- Sosyal hesap adreslerini `config.js` içine girin; boş bırakılanlar altbilgide
  gösterilmiyor, ölü bağlantı oluşmuyor.
- Search Console'a `qblogg.com` mülkünü ekleyin ve `sitemap.xml` gönderin.
- Bing Webmaster Tools'a da ekleyin: AI aramalarının bir kısmı Bing dizinini
  kullanıyor.

## Yapılandırma dosyaları

`vercel.json` şunları ayarlıyor:

- **`cleanUrls` kapalı — bilinçli.** Vercel'in `cleanUrls` özelliği `/blog.html`
  adresini `/blog`'a **yönlendirir**. Bizde `/blog → /blog.html` yönlendirmesi
  olduğu için ikisi birlikte sonsuz döngü yapardı. Ayrıca sitemap, canonical ve
  bütün iç bağlantılar `.html` uzantılı; cleanUrls hepsini gereksiz bir
  yönlendirme adımına sokar ve canonical'ın yönlendirilen bir adresi
  göstermesine yol açardı. Kısa adresler (`/blog`, `/work`) yönlendirmeyle
  zaten çalışıyor
- **Önbellek** — yazı tipleri bir yıl değişmez damgalı; CSS ve JS her istekte
  doğrulanır (derleme adımı olmadığı için dosya adında sürüm damgası yok)
- **Güvenlik başlıkları** — HSTS, nosniff, referrer politikası, çerçeveleme
- **CSP** — `script-src 'self'`: satır içi script çalışmaz. Bu bilinçli.
  Yeni bir sayfaya satır içi `<script>` eklerseniz **sessizce çalışmaz**;
  kodu `assets/js/app.js` içine koyun.

`.vercelignore` motoru, dokümanları ve gerekli olmayan betikleri yükleme dışında
tutar. `scripts/vercel-build.sh` derleme için yüklenir; tarayıcıya yalnız `dist/`
sunulur. Her derleme eski çıktıyı temizler.
