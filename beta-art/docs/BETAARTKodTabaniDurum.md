# BETA ART — Kod tabanının gerçek durumu

Dosya dosya açılarak yapılmış inceleme · 16 Ağustos 2026

Bu, dosya envanterinin ekidir. Envanter "adlar bozuk" diyordu; bu doküman dosyaları
içeriklerinden tanımlayıp **kod tabanının aslında ne yaptığını** ortaya koyuyor.

---

## Ana bulgu

**Canlı kod tabanı, terk edilmiş ürünün kendisi.** Doğrulanmış, tahmin değil.

Ana sayfa bileşeninden birebir alınan metinler:

- `BETA ART — The Verified Human Photography Archive`
- `An archive of verified human photography, licensed directly from the photographer.`
- `Twelve original photographs, each catalogued, sealed and licensed directly from the photographer.`
- `provenance is the product`

Ve yapısal veride üç kez `https://schema.org/InStock` — yani Google'a satılık ürün
olarak bildirilen bir katalog.

Bu, Vedtak 3, 11, 12 ve 15'in tamamının tersi: İngilizce, lisans satışı, on iki plate,
provenance başlıkta. Sitede yayında olan buysa, tanıtım yaptığın her prosjektleder
farklı bir şirket görüyor.

Not: `betaart.no` otomatik erişime kapalı olduğu için siteyi doğrudan açamadım.
Yukarıdakiler kodun içeriğinden. Yayındakinin bu kod olup olmadığını sadece sen
doğrulayabilirsin — tarayıcıda aç, kaynağı görüntüle, "Verified Human" ara.

---

## Ad ↔ içerik eşlemesi

Kayma sistematik değil — ne alfabetik ne liste sırasında sabit bir ofset var, yani
toplu geri çevirme mümkün değil. Ama çekirdek dosyalar içerikten tanımlanabildi:

| Snapshot'taki ad | Gerçekte ne |
|---|---|
| `entry_test.ts` | **Ana sayfa** bileşeni |
| `entry.ts` | Kontakt sayfası |
| `GET.ts` | FAQ sayfası |
| `llms-txt_test.ts` | Personvern sayfası |
| `indexnow-key_test.ts` | Lisansbetingelser sayfası |
| `llms-txt.ts` | QR sayfası |
| `indexnow-key.ts` | Foto/plate detay sayfası |
| `router-hooks.ts` | `src/lib/seo-routes.ts` |
| `package.json` | `src/server/entry.ts` (Express + sitemap + robots) |
| `tailwind_config.js` | `src/server/llms-txt.ts` |
| `robots.txt` | `vite.config.ts` |
| `vitest_config.ts` | `globals.css` |
| `routes.tsx` | `src/lib/utils.ts` |
| `Dashboard.tsx` | `license_terms.json` içeriği |
| `api-client.ts` | `Website.md` dokümantasyonu |
| `index.ts` | `.gitignore` |
| `parse.ts` | `.npmrc` |
| `README.md` | `llms-txt` testleri |
| `Header.tsx` | `missingModule.ts` (3 satırlık stub) |

Bu tablo okumak için yeterli, çalışmak için değil. Kod yazılacaksa Lovable'dan
klasör yapısı korunarak yeniden dışa aktarım şart.

---

## SEO düzeltmeleri: uygulanmamış

Daha önce dört SEO sorunu tespit edilip düzeltme dosyaları üretilmişti. Bu snapshot'ta
**hiçbiri uygulanmamış.** `seo-routes.ts`, olduğu gibi:

```ts
export const seoRoutes: SeoRoute[] = [
  { path: "/",                  changefreq: "weekly",  priority: 1.0 },
  { path: "/personvern",        changefreq: "monthly", priority: 0.8 },
  { path: "/lisensbetingelser", changefreq: "monthly", priority: 0.8 },
  { path: "/qr",                changefreq: "monthly", priority: 0.8 },
  { path: "/faq",               changefreq: "monthly", priority: 0.8 },
  { path: "/kontakt",           changefreq: "monthly", priority: 0.7 },
  { path: "/kontakt",           changefreq: "monthly", priority: 0.8 },   // ← çift
];
```

Çift `/kontakt` duruyor. Sunucu `src/server/entry.ts` içinde bu diziyi doğrudan
sitemap'e döküyor (`seoRoutes.map(...)` → `<urlset>`), yani sitemap'te de çift.

Dangling `@id` sorunu da duruyor. `entry.ts` ve `GET.ts` içinde:

```ts
isPartOf: { '@id': `${site}/#website` },
about:    { '@id': `${site}/#organization` },
```

Bu iki düğüm **hiçbir dosyada tanımlanmıyor.** Arama tüm kod tabanında sadece bu dört
referansı buluyor, tanım yok. Yani her sayfa var olmayan iki düğüme işaret ediyor.

**İki olasılık var:** ya yamalar hiç uygulanmadı, ya da bu snapshot yamalardan önce
alındı. İkisi de aynı sonuca çıkıyor — düzeltmeleri gerçek kod tabanında doğrulamadan
"yapıldı" sayma.

---

## Rota listesi ne anlatıyor

`/`, `/personvern`, `/lisensbetingelser`, `/qr`, `/faq`, `/kontakt`.

`/lisensbetingelser` ve `/qr` eski modelin rotaları. `/prosjekt`, `/arkiv`, `/apenhet`
gibi yeni modelin ihtiyaç duyacağı hiçbir rota yok. Dinamik foto rotası da sitemap'e
girmiyor — bu aslında doğru, ama doğru olmasının sebebi bir karar değil, o rotanın
`seoRoutes`'a hiç eklenmemiş olması.

---

## Lisans şartları kodun içinde duruyor

`Dashboard.tsx` adıyla duran dosya, dört kademeli lisans şartlarının tam JSON metni:

- `A · Personal` — `kr 190`
- Yürürlük tarihi: `[DATE]` — doldurulmamış
- İletişim: `hello@betaart.no`
- Sürüm: `1.0`

Bu metin `/lisensbetingelser` rotasından servis ediliyor. Yani yayındaysa, internette
yürürlük tarihi belli olmayan bir hukuki metin var. Yer tutucu içeren bir sözleşme
metni yayınlamak, hiç yayınlamamaktan daha kötüdür.

---

## Google Fonts — kodda da var

`globals.css` (snapshot'ta `vitest_config.ts`) ilk satırında:

```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces...');
```

Sperreliste A4'te tarif ettiğim düzeltme sadece statik HTML'lerde değil, burada da
yapılmalı. Kod tabanında onay bannerı da yok.

---

## Yapılacaklar — güncellendi

| # | İş | Kim |
|---|---|---|
| 1 | Tarayıcıda `betaart.no` aç, kaynakta "Verified Human" ara | Sen · 2 dk |
| 2 | Eski model canlıysa: siteyi kaldır ya da tek sayfaya indir | Sen |
| 3 | Jurist mektubu | Sen · 15 dk |
| 4 | Enkeltpersonforetak | Sen · 30 dk |
| 5 | Lovable'dan klasör yapılı yeniden dışa aktarım | Sen · 10 dk |
| 6 | Metodoloji revizyonu · Kontinuitet · Kontakt §03 | Ben |

**Madde 2 yeni ve önemli.** Eğer eski site canlıysa, seçenek şu: ya tamamen indir, ya
da `betaart-no.html`'i yerine koy. İkincisi daha iyi ama org.nr ve åpenhet dokümanları
olmadan yapılamaz — yani madde 3 ve 4'e bağlı.

Aradaki boşlukta en dürüst seçenek, siteyi tek sayfalık bir "under etablering" notuna
indirmek. Yanlış ürünü anlatan cilalı bir site, hiç site olmamasından daha zararlı.

---

*Teknik inceleme. Hukuki, mali veya sigorta tavsiyesi değildir.*
