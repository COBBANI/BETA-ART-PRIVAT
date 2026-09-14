# Figma ↔ QBLOGG tasarım sistemi kuralları

Bu belge, Figma MCP ile bu depoya tasarım aktarırken (veya bu siteden Figma'ya
tasarım üretirken) uyulacak kuralları tek yerde toplar. Genel tasarım sistemi
belgesi `docs/tasarim-sistemi.md`; buradaki içerik Figma entegrasyonuna özel
okumadır. Çelişkide CLAUDE.md "Değişmez kurallar" kazanır.

## 1. Belirteçler (design tokens)

**Tek kaynak:** `assets/css/main.css` içindeki `:root` bloğu (açık tema) ve
`html[data-theme="dark"]` bloğu (koyu tema, satır ~43). Ayrı token dosyası,
dönüştürme sistemi (Style Dictionary vb.) YOKTUR — bilinçli sadelik.

```css
--bg / --bg-soft / --bg-card      /* zeminler */
--text / --text-muted             /* metin */
--border                          /* çizgiler (dikkat: --line diye bir belirteç YOK) */
--brand: #082C54                  /* Midnight Navy — kimlik */
--brand-2: #00D8C2                /* Electric Aqua — yalnız vurgu; METİNDE KULLANILMAZ (1,9:1) */
--brand-2-ink: #0a7d72            /* açık zeminde aqua niyetli METİN rengi (5,0:1) */
--on-brand / --logo-ink / --brand-soft / --danger
--shadow / --shadow-lg
--radius: 16px / --radius-sm: 10px
--maxw: 1140px
```

**Yazı ölçeği yedi basamaktır** — Figma'daki serbest punto değerleri en yakın
basamağa oturtulur, ham `rem`/`px` yazılmaz:
`--fs-2xs .76rem · --fs-xs .8rem · --fs-sm .85rem · --fs-md .92rem ·
--fs-base .95rem · --fs-lg 1rem · --fs-xl 1.12rem` (+ `--fs-logo` yalnız logo).
Başlıkların `clamp()` değerleri ve `em` göreli boyutlar ölçeğin dışındadır.

**Figma değişken eşlemesi:** Figma'da renk stili açılacaksa adları bire bir
CSS değişkeninden alın (`brand`, `brand-2-ink`, `bg-soft`…), yeni ara ton
üretmeyin. Figma'dan gelen bir hex, listedeki bir belirtece denk gelmiyorsa
tasarım koda girmeden önce belirteçlerden birine yuvarlanır.

## 2. Bileşen kütüphanesi

Bileşen çatısı yoktur; "bileşen" = tekrar eden sınıf desenleri. Kaynak:
`assets/css/main.css` (tek dosya) + sayfa HTML'leri.

| Desen | Sınıf | Not |
|---|---|---|
| Düğme | `.btn` + `.btn--primary/.btn--ghost/.btn--block/.btn--lg` | `<a>` veya `<button>` |
| Kart | `.card`, plan kartı `.plan` (+`.plan--featured`) | |
| Bölüm | `.section` (+`.section--soft`), başlık bloğu `.section-head`, `.kicker` | |
| Izgara | `.wrap` (maks `--maxw`), `.wrap--narrow`, `.posts`, `.plans`, `.footer-grid` | |
| Rozet/etiket | `.tag`, chip `.chip` | |
| Form | `.field`, hata `.field-msg`, `[aria-invalid]` | |
| Makale | `.article-body` (+`--plain`), `.article-note`, `.article-toc`, `.article-sources` | |
| Tablo | `.table-wrap` (overflow sarıcı) + `.cmp-table` | |

Storybook/dokümantasyon sitesi yok; canlı referans `npm run dev` →
http://localhost:8000.

## 3. Çatı ve derleme

- **Çatı YOK:** saf HTML + CSS + vanilla JS (`assets/js/app.js`). React/Vue
  kodu üretmeyin; Figma'dan kod çıkarırken hedef her zaman bu üçlüdür.
- **Derleme adımı YOK, bağımlılık YOK.** `npm` yalnız denetim betikleri için.
  Yeni paket/CDN eklemek yasak (CLAUDE.md kural 8; CSP de engeller).
- Dağıtım: Vercel, statik kopya (`vercel.json` buildCommand).

## 4. Varlık yönetimi

- Marka varlıkları `assets/brand/` — 14 dosya, hepsi `scripts/marka-uret.py`
  betiğinden çıkar; **elle SVG/PNG eklenmez**, betik güncellenir
  (yeniden üretilebilirlik kuralı, CLAUDE.md kural 7).
- Yazı tipleri `assets/fonts/` (Inter, kendi sunucumuzda; kaynak ve lisans
  kaydı `assets/fonts/KAYNAK.md`). Dış font servisi kullanılmaz.
- CDN yok; her şey aynı origin'den. Görsel eklemek gerekirse önce ikon/SVG
  düşünülür — sitede bit-eşlem görsel neredeyse yoktur (og-image hariç).

## 5. İkon sistemi

- **Emoji yasak.** Her ikon satır içi SVG: 24×24 ızgara, `fill="none"`,
  `stroke="currentColor"`, `stroke-width="1.7"`, yuvarlak uç ve birleşim.
- Yazı ikonları `assets/js/app.js → ICONS` kaydında adla durur
  (ör. `icon: 'coin'`); sayfa ikonları doğrudan HTML'e gömülür.
- İstisna: `→ ↑ ☾ ☀` metin işaretleri yazı tipiyle çizilir.
- Figma'dan ikon alırken: 24×24'e oturt, stroke'u 1.7'ye ve `currentColor`'a
  çevir, dolguyu kaldır; dekoratifse `aria-hidden="true"`.

## 6. Stil yaklaşımı

- Tek global stil dosyası: `assets/css/main.css`. CSS Modules/utility
  framework yok; sınıf adları Türkçe-İngilizce karışık BEM-vari düz adlar.
- **RTL zorunluluğu:** yön bağımlı özellik yazılmaz — `margin-inline-start`,
  `inset-inline-start`, `padding-inline`, `text-align:start`. Figma'nın
  ürettiği `left/right` değerleri çevrilir. Yeni bölüm Arapçada denenir.
- Koyu tema değişkenlerle kendiliğinden çalışır; bileşen içinde tema koşulu
  yazmak yerine belirteç kullanılır.
- Kesme noktaları: `1180px`, `860px`, `620px`, `360px` (max-width) +
  `prefers-reduced-motion` ve `print` blokları. Yeni kesme noktası açmadan
  önce bu dördüne oturmayı deneyin.
- Erişilebilirlik tabanı: 44px dokunma hedefi, `:focus-visible` halkası,
  `.sr-only` yardımıcısı, kontrast ölçülü (bkz. belirteç yorumları).

## 7. Proje yapısı ve metin kuralı

```
index/work/blog/post/gizlilik/kosullar/kalite/ornek(.html) + 404.html   sayfalar
assets/css/main.css      tek stil dosyası
assets/js/config.js      yayın ayarları (tek yapılandırma noktası)
assets/js/i18n.js        10 dil sözlüğü (QB_I18N)
assets/js/posts.js       blog içeriği (QB_POSTS)
assets/js/app.js         tüm davranış
scripts/*.mjs|py         denetim + üretim betikleri
docs/*.md                sistem belgeleri
```

- **Görünen her metin sözlükten gelir:** HTML'e `data-i18n="anahtar"` yazılır,
  Türkçesi yalnız JS-kapalı yedektir. Figma'daki metinler koda alınırken
  önce `i18n.js`'e ON dilde anahtar açılır (CLAUDE.md kural 1) — tek dilde
  metin gömmek en sık yapılan hatadır.
- Menü/altbilgi değişikliği TÜM sayfalara birden uygulanır.
- Her değişiklikten sonra: `npm run check` + `npm run guvenlik` yeşil olmadan
  commit yok.

## Figma'ya aktarım (code → design) notu

Siteden Figma'ya sayfa üretilecekse: renkleri yukarıdaki belirteç adlarıyla
stillendirin, Inter kullanın, 1140px içerik genişliği + 620px mobil çerçeve
ikilisiyle çalışın; ikonları `ICONS` kaydındaki adlarıyla bileşenleştirin.
