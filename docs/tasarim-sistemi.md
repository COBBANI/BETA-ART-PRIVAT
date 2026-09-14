# QBLOGG tasarım sistemi — kurallar

Figma MCP entegrasyonu için istendi, ama asıl işlevi daha geniş: bir Figma
tasarımını (ya da herhangi bir dış tasarımı) bu depoya çevirirken hangi
belirteçlerin, hangi kalıpların ve hangi sınırların geçerli olduğunu söyler.

**Her madde depodan ölçüldü**, ezberden yazılmadı. Sayılar 26.08.2026 itibarıyla
(22.08'den beri main.css'e 6 commit daha girdi: karşılaştırma tablosu, TOC,
yazdırma CSS'i — sayılar buna göre güncellendi).

---

## 0. Önce bunu bilin: burada çatı yok

| | |
|---|---|
| UI çatısı | **Yok** — React, Vue, Svelte hiçbiri |
| Stil kütüphanesi | **Yok** — Tailwind, styled-components, CSS Modules hiçbiri |
| Derleyici / paketleyici | **Yok** — Vite, webpack, esbuild hiçbiri |
| Bağımlılık | Sitede **sıfır** |
| Derleme adımı | **Yok** — dosyalar sunucuya olduğu gibi kopyalanır |

Bu bir eksiklik değil, `CLAUDE.md`'de kayıtlı bilinçli bir karar. Figma'dan
gelen bir bileşen React JSX olarak değil, **düz HTML + satır içi stil** olarak
çevrilir.

`npm run dev` yalnızca `python3 -m http.server` çalıştırır.

---

## 1. Tasarım belirteçleri

### Nerede

Tek yer: `assets/css/main.css` içindeki `:root` bloğu (satır 1–40) ve koyu
tema için `html[data-theme="dark"]` (satır 41–58). Başka hiçbir dosyada
belirteç tanımı yok.

### Biçim

Düz CSS özel değişkenleri. Dönüştürme sistemi (Style Dictionary, Theo, DTCG
JSON) **yok** ve eklenmemeli — tarayıcı doğrudan okuyor.

```css
:root {
  --brand: #082C54;        /* Midnight Navy — kimlik rengi */
  --brand-2: #00D8C2;      /* Electric Aqua — yalnızca vurgu */
  --brand-2-ink: #0a7d72;  /* beyaz üzerinde 4,4:1 — metin için */
  --on-brand: #ffffff;     /* marka rengi üzerindeki metin — 13,2:1 */
  --logo-ink: #082C54;     /* logo halkası; temaya göre döner */
}
```

### Değişmez kural: ham değer yazılmaz

Doğrudan hex yazmayın. `var(--brand)`, `var(--text)` kullanın ki koyu tema
kendiliğinden çalışsın. Aynı kural yazı boyutunda da geçerli — ham `rem`
yerine ölçek basamakları.

### Renk belirteçleri

| Belirteç | Açık | Koyu | Not |
|---|---|---|---|
| `--bg` | `#ffffff` | `#0c0e14` | |
| `--bg-soft` | `#f6f7fb` | `#12141c` | |
| `--bg-card` | `#ffffff` | `#151823` | |
| `--text` | `#14161c` | `#eef0f6` | |
| `--text-muted` | `#5b6172` | `#9aa1b5` | |
| `--border` | `#e4e7f0` | `#242838` | |
| `--brand` | `#082C54` | **`#00D8C2`** | Koyu temada yer değiştirir |
| `--brand-2` | `#00D8C2` | `#7ce9dd` | |
| `--on-brand` | `#ffffff` | `#08202f` | Marka üzerindeki metin |
| `--brand-2-ink` | `#0a7d72` | `var(--brand-2)` | Metinde kullanılacak aqua |

**Aqua tuzağı.** `#00D8C2` beyaz üzerinde **1,8:1**'dir (WCAG göreli
parlaklık formülüyle yeniden hesaplandı, 26.08.2026 — önceki "1,9:1" hatalı
yuvarlamaydı, CLAUDE.md'nin rakamı doğruydu) — WCAG AA'nın (4,5:1)
çok altında, metinde **kullanılamaz**. Açık zeminde aqua metin gerekiyorsa
`var(--brand-2-ink)` kullanın. Figma'dan gelen bir tasarımda aqua metin varsa
bu bir hatadır, çevirmeyin — dönüştürün.

Koyu temada `--brand` navy'den aqua'ya döner: navy koyu zeminde ayrışmıyor.
Yani "marka rengi" temaya bağlı bir değişkendir, sabit bir hex değil.

### Yazı ölçeği

Sekiz basamak. Önce 21 farklı boyut vardı, 53 beyanda dağılmıştı; komşu
bileşenler arasında tırtıklı hizalama üretiyordu.

```css
--fs-2xs: .76rem;  --fs-xs: .8rem;   --fs-sm: .85rem;  --fs-md: .92rem;
--fs-base: .95rem; --fs-lg: 1rem;    --fs-xl: 1.12rem; --fs-logo: 1.16rem;
```

Ölçeğin dışında kalan üç durum: başlıkların `clamp()` değerleri, `em` cinsinden
göreli boyutlar (ilk harf, `code`) ve `--fs-logo` — logo oranı marka belgesinde
ölçülü, ölçeğe yuvarlanmıyor.

### Diğer belirteçler

```css
--radius: 16px;  --radius-sm: 10px;  --maxw: 1140px;
--shadow / --shadow-lg   (iki katmanlı, temaya göre ayrı)
```

---

## 2. Bileşen kitaplığı

**Yoktur.** Bileşen mimarisi, Storybook, bileşen dokümantasyonu — hiçbiri yok.

Yerine geçen şey: `assets/css/main.css` içinde **119 benzersiz sınıf** (629
satır), sekiz HTML sayfasında elle kullanılıyor. Sayfa iskeleti (menü +
altbilgi) sekiz dosyada **tekrar eder**: `index`, `work`, `blog`, `post`,
`gizlilik`, `kosullar`, `kalite`, `ornek` (`404` kasıtlı hariç).

Ayrıca `demo/` dizininde ayrı bir kalıp var: **Action Pages** (`cv-action-page`,
`q-work-audit`). Bunlar `main.css`'i **yüklemez** — tek dosyalık, kendi
`<style>` bloğunda aynı marka belirteçlerini (`--brand`, `--brand-2-ink`,
sekiz basamaklı ölçek yerine sadeleştirilmiş kendi değişkenleri) tekrar tanımlar,
çünkü bağımsız/paylaşılabilir kalmaları gerekiyor. Figma'dan bir satış/anket
sayfası çeviriyorsanız hedef `main.css` değil, bu desendir.

> **Figma'dan bileşen çevirirken:** menüyü ya da altbilgiyi değiştiriyorsanız
> **sekiz dosyayı birden** güncelleyin (`.claude/skills/qblogg-sayfa-iskeleti/`
> bu senkronu ve kendi doğrulama betiğini taşır). `npm run check` çiftlenen id
> ve script'i yakalar ama eksik menü bağlantısını yakalamaz.

JavaScript'te bileşene en yakın şey `assets/js/app.js` içindeki
`cardHTML(post, seviye)` — dize döndüren bir işlev, sınıf değil.

---

## 3. Çatı ve kütüphaneler

Sitede sıfır bağımlılık. `package.json` yalnızca betikleri tanımlıyor.

Depoda geliştirme araçları var ama **siteye girmiyorlar**: Playwright (tarayıcı
testi), fonttools + brotli (marka üretimi, `scripts/requirements.txt`'te sabit
sürümlü).

Betik yükleme sırası **anlamlıdır**, değiştirmeyin:

```html
<script src="assets/js/config.js"></script>   <!-- yayın ayarları -->
<script src="assets/js/i18n.js"></script>     <!-- 10 dil × 233 anahtar -->
<script src="assets/js/posts.js"></script>    <!-- blog içeriği -->
<script src="assets/js/app.js"></script>      <!-- hepsini kullanır -->
```

Hepsi `window.QB_*` küresel değişkenleri üzerinden konuşuyor. Modül yok.

---

## 4. Varlık yönetimi

| Klasör | Boyut | İçerik |
|---|---|---|
| `assets/fonts/` | 204 KB | Inter, dört alt küme + `inter.css` + `OFL.txt` |
| `assets/js/` | 460 KB | Dört dosya; büyüğü `posts.js` (10 yazı × 10 dil) |
| `assets/brand/` | 116 KB | 14 kimlik varlığı — **betikten üretilir, elle düzenlenmez** |
| `assets/css/` | 36 KB | Tek dosya |
| `assets/downloads/` | 12 KB | Lead magnet |
| `assets/img/` | 4 KB | |

**CDN yok ve olmayacak.** Yazı tipleri kendi sunucumuzda:

> Google Fonts CDN'i ziyaretçinin IP adresini Google'a gönderir; GDPR açısından
> riskli olduğu için (Münih Bölge Mahkemesi, 3 O 17493/20) dosyalar yerelde.

Bu, `assets/fonts/inter.css` başında kayıtlı. Figma bir Google Fonts bağlantısı
öneriyorsa **kabul etmeyin** — fontu indirip alt kümeye ayırın.

`vendor/inter-4.001/` (60 MB) Inter'in resmi dağıtımıdır, **yayına çıkmaz** —
`.vercelignore`'da. Hak paketi kanıtı olarak duruyor.

### Optimizasyon

Alt kümeleme `unicode-range` ile: latin, latin-ext, cyrillic, cyrillic-ext.
Ağırlık ekseni (400–800) tek bir değişken dosyada — `main.css`'te kullanılan
beş ağırlığın (400/500/600/700/800) hepsi gerçekten kullanılıyor, kırpılacak
fazlalık yok (30.08.2026'da doğrulandı). Arapça, Çince ve Devanagari **sistem
yazı tiplerine** düşer — `--font` yığınında tanımlı.

`font-display: swap` her `@font-face`'te.

**Ölçülmüş gerçek: "ziyaretçi yalnızca kendi dilinin baytını indirir" iddiası
tam doğru değil.** Playwright ile doğrulandı (30.08.2026): `?lang=en` ile
açılan sayfa bile `inter-latin-ext.woff2`'yi (85 KB — en büyük dosya, temel
`inter-latin.woff2`'den bile büyük) indiriyor, oysa nihai İngilizce metinde
tek bir latin-ext karakteri yok. Sebep: betikler `</body>`'den hemen önce
yükleniyor (kural 3 gereği — JS kapalıyken görünen Türkçe yedek), tarayıcı
bu Türkçe metni JS onu değiştirmeden önce bir an boyar; ğ/ş gibi karakterler
latin-ext'i tetikliyor ve indirme, metin değiştirildikten sonra bile devam
ediyor. Düzeltmek betik yükleme sırasını (ilk boyamadan önce dil değiştirme)
değiştirmeyi gerektirir — bu, hızlı ilk boyama ile gereksiz 85 KB arasında
gerçek bir ödünleşim, tek satırlık bir düzeltme değil.

---

## 5. İkon sistemi

### Değişmez kural: emoji kullanılmaz

> Emoji'yi işletim sistemi çizer — Windows, Android ve macOS üç farklı görünüm
> verir, marka kendi görselinin kontrolünü kaybeder.

Görünen her ikon **satır içi SVG**dir.

### İki depo

**Yazı ikonları** — `assets/js/app.js` içindeki `ICONS` kaydı, 15 ikon
(11 içerik ikonu + 4 paylaşım kanalı glifi):

```
question · coin · blocks · phone · banknote · compass · bulb · chart ·
envelope · link · gear · linkedin · x · facebook · whatsapp
```

Yalnızca yol gövdesi saklanır; sarmalayıcıyı `iconSVG(name)` üretir:

```js
function iconSVG(name) {
  var body = ICONS[name];
  if (!body) return '';
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + body + '</svg>';
}
```

Bir yazı ikonu `posts.js` içinde adla seçilir: `icon: 'coin'`.

**Sayfa ikonları** — doğrudan HTML'e gömülür, kayıtta durmaz.

### İkon çizim kuralı

24×24 ızgara · `fill="none"` · `stroke="currentColor"` · `stroke-width="1.7"` ·
yuvarlak uç ve birleşim.

`currentColor` önemli: ikon bulunduğu metnin rengini alır, yani tema
değişiminde kendiliğinden döner. Figma'dan gelen bir ikonda sabit renk varsa
`currentColor`'a çevirin.

**İstisna:** ok ve tema düğmesindeki tek renkli metin işaretleri
(`→ ↑ ☾ ☀`) — bunlar yazı tipiyle çizilir, SVG değildir.

---

## 6. Stil yaklaşımı

### Metodoloji

Hiçbiri. Düz CSS, tek dosya, 629 satır. Sınıf adları anlamsal ve kısa:
`.cta-box`, `.posts`, `.share-btn`, `.article-note`.

### Küresel stiller

Hepsi küresel — kapsam mekanizması yok. `main.css` sırayla: belirteçler →
sıfırlama → tipografi → düzen → bileşenler → medya sorguları.

### Duyarlılık

**6 medya sorgusu**: dördü `max-width` (`1180px`, `860px`, `620px`, `360px`)
+ `prefers-reduced-motion` + `print`. Mobil kırılma noktaları:

- `≤1180px` / `≤860px` — düzen daralması (menü/ızgara kırılımı)
- `≤620px` — dil seçici ikona düşer, logo yalnızca sembol
- `≤360px` — tema düğmesi gizlenir

Izgaralar `min()` ile korunur — sabit `minmax` yatay taşma üretiyordu:

```css
grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
```

### RTL — değişmez kural

Yön bağımlı CSS yazmayın:

| Yazmayın | Yazın |
|---|---|
| `margin-left` | `margin-inline-start` |
| `left` | `inset-inline-start` |
| `padding-right` | `padding-inline-end` |

Arapça sitenin on dilinden biri. Yeni bir bölüm eklediğinizde Arapçaya geçip
bakın.

### Erişilebilirlik zorunlulukları

- Gövde metni **4,5:1** (WCAG AA)
- Dokunma hedefi **44px** (`.share-btn` bu yüzden 44px)
- Renk tek başına bilgi taşımaz

---

## 7. Proje yapısı

```
*.html                  9 sayfa — 8'i iskelet tekrar eder, 404 hariç
assets/css/main.css     tek stil dosyası
assets/js/config.js     yayın ayarları — yayına almak için tek dokunulacak dosya
assets/js/i18n.js       10 dil × 233 anahtar
assets/js/posts.js      blog içeriği, her yazı 10 dilde
assets/js/app.js        dil, tema, liste, yazı sayfası, formlar
assets/brand/           14 kimlik varlığı (üretilir)
assets/fonts/           Inter alt kümeleri + lisans
scripts/                doğrulama ve üretim betikleri
engine/                 Curiosity Engine — site değil, üretim hattı
docs/                   marka, gelir, içerik ve denetim belgeleri
vendor/                 Inter resmi dağıtımı (yayına çıkmaz)
```

Özellik klasörü kalıbı yok; dosya sayısı az olduğu için düz yapı yeterli.

---

## Figma'dan çeviri yaparken kontrol listesi

1. **Renkler** belirteçten mi geliyor? Ham hex varsa `var(--…)`'ya çevirin
2. **Aqua metin** var mı? `--brand-2-ink`'e çevirin — `#00D8C2` metinde 1,8:1
3. **Yazı boyutları** sekiz basamağa oturuyor mu? Ham `rem` yazmayın
4. **İkonlar** satır içi SVG mi, 24×24 / 1.7 / `currentColor` mı?
5. **Emoji** var mı? Varsa ikona çevirin
6. **Yön bağımlı CSS** var mı? Mantıksal özelliklere çevirin
7. **Metin** `data-i18n` ile mi geliyor? HTML'deki Türkçe yalnızca yedektir
8. **Koyu tema** kendiliğinden çalışıyor mu? Belirteç kullandıysanız evet
9. **Dokunma hedefi** 44px mi?
10. **Yeni dış servis** mi bağlanıyor? `vercel.json` → CSP `connect-src`'ye
    eklenmezse istek sessizce engellenir

Sonra: `npm run check` · `npm run guvenlik` · `npm run gorunurluk`.

## Sınırlar

- **Figma koltuğu `View`** (22.08.2026'da `whoami` ile ölçüldü) — Figma'da
  dosya oluşturamıyorum, yalnızca okuyabilirim
- Belirteçler tek yönlü akar: bu depo kaynaktır, Figma değil. Figma'daki bir
  değişiklik buraya elle taşınır
