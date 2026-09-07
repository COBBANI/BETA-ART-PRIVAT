# QBLOGG — çok dilli içerik stüdyosu sitesi

Saf HTML + CSS + JavaScript ile yazılmış, build adımı gerektirmeyen bir tanıtım + blog sitesi.
Konumlandırma: **AI destekli içerik stüdyosu** — şirketlere SEO blog yazısı, LinkedIn serisi,
sosyal içerik, newsletter ve çok dilli yayın satan bir hizmet işi.

**10 dil:** Türkçe, İngilizce, Çince, Hintçe, İspanyolca, Arapça (RTL), Fransızca, Portekizce, Rusça, Norveççe.

## Dosya yapısı

```
index.html          Tanıtım sayfası: hero, hizmetler, içerik akışı, paketler, son yazılar, bülten
work.html           Bizimle çalışın: müşteri briefi + yazar başvurusu, süreç, SSS
blog.html           Tüm yazılar + arama + kategori filtresi
post.html           Yazı detayı (?slug=... ile çalışır)
assets/css/main.css Tema (açık/koyu), düzen, RTL uyumlu bileşenler
assets/js/i18n.js   10 dilde arayüz metinleri (178 anahtar) + dil listesi
assets/js/posts.js  Blog yazıları: her yazının başlığı/özeti/gövdesi 10 dilde
assets/js/app.js    Dil, tema, liste/arama/filtre, yazı sayfası, sekmeler, formlar
robots.txt          Arama motoru yönergesi
sitemap.xml         9 URL × 10 dil hreflang alternatifleriyle
```

## Çalıştırma

Sunucu gerekmez, `index.html` dosyasını tarayıcıda açmak yeterli. Yerelde sunmak için:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Yayınlama

GitHub Pages: repo ayarlarından Pages → Branch olarak bu dalı ve kök (`/`) klasörünü seçin.
Vercel: QBLOGG için kök dizin `.`, framework `Other`, kurulum komutu boş,
derleme komutu `node scripts/build-static.mjs`, yayın klasörü `dist`.
`npm run build` aynı çıktıyı yerelde üretir. Tüm depo kökünü yayınlamayın.
Master panel ayrı projedir: kök `master`, derleme `node build.mjs`, çıktı `dist`.
Birleştirilen HTML müze tasarımı ayrı projedir: kök `beta-art-museum`.

Yayına almadan önce `robots.txt` ve `sitemap.xml` içindeki `https://qblogg.com` adresini
kendi alan adınızla değiştirin.

## Yeni blog yazısı eklemek

`assets/js/posts.js` içindeki diziye bir nesne ekleyin:

```js
{
  slug: 'url-icin-kisa-ad',          // post.html?slug=url-icin-kisa-ad
  category: 'platform',              // i18n'de 'cat.platform' anahtarı olmalı
  date: '2026-09-01', read: 6,
  accent: 1,                         // 1–6 arası kapak rengi
  icon: '💸',
  t: { tr: 'Başlık', en: 'Title', /* … 10 dil */ },
  e: { tr: 'Özet',  en: 'Excerpt', /* … */ },
  b: { tr: ['1. paragraf', '2. paragraf'], en: [ /* … */ ] }
}
```

Bir dil eksik kalırsa o dilde otomatik olarak İngilizce sürüm gösterilir.

## Yeni dil eklemek

1. `assets/js/i18n.js` içindeki `QB_LANGS` dizisine `{ code, name, native, dir }` ekleyin.
2. `QB_I18N.<kod>` sözlüğünü, İngilizce sözlükteki tüm anahtarlarla doldurun.
3. Yazılara aynı dil kodunu `t`, `e`, `b` alanlarında ekleyin.

Anahtar bütünlüğünü kontrol etmek için:

```bash
node -e "eval(require('fs').readFileSync('assets/js/i18n.js','utf8').replace(/window/g,'globalThis'));
const I=globalThis.QB_I18N, base=Object.keys(I.en);
globalThis.QB_LANGS.forEach(l=>{const k=Object.keys(I[l.code]||{});
console.log(l.code, k.length, base.filter(x=>!k.includes(x)).join(',')||'ok');});"
```

## Başvuru formları (work.html)

`work.html` iki sekme içerir: **marka briefi** ve **yazar başvurusu**. Statik site olduğu için
gönderim, doldurulan alanları ziyaretçinin e-posta uygulamasında hazır bir taslağa çevirir
(`mailto:`) ve aynı metni panoya kopyalar. Alıcı adresi `assets/js/app.js` içindeki
`MAIL_TO` sabitidir — kendi adresinizle değiştirin.

Sunucu tarafı bir forma geçmek isterseniz (Formspree, Netlify Forms, kendi API'niz),
`composeMail` fonksiyonundaki `mailto:` bloğunu bir `fetch` çağrısıyla değiştirin;
alan etiketleri `data-field` özniteliğinden okunduğu için gövde oluşturma mantığı aynı kalır.

## Bülten formu

Form şu an statiktir: e-posta adresi doğrulanır ve tarayıcıdaki `localStorage` içine yazılır.
Gerçek listeye bağlamak için `assets/js/app.js` içindeki `initForm` fonksiyonunda işaretli bloğu
e-posta servisinizin (Substack, Mailchimp, Buttondown, ConvertKit) API çağrısıyla değiştirin.

## Bilinen sınırlar

- Dil değişimi istemci tarafında olur; arama motorları tek bir HTML görür. Çok dilli SEO'dan tam
  verim almak için her dili ayrı URL'de sunan bir ön-render adımı (statik üretim) gerekir.
  `sitemap.xml` ve `hreflang` etiketleri `?lang=` parametreli sürümleri işaret edecek şekilde hazırdır.
- Paket fiyatları ve yazılardaki ücret/şart bilgileri örnek verilerdir; yayına almadan önce
  kendi rakamlarınızla ve platformların güncel koşullarıyla güncelleyin.
