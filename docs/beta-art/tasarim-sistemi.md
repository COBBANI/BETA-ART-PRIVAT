# Beta Art — paylaşılan tasarım sistemi (30.08.2026)

Bu belge QBLOGG'un `docs/tasarim-sistemi.md`'sinin karşılığı — ama Beta
Art için, ve **tek bir sayfaya özgü değil**: burada yazılanlar Privat,
Archive, Business, Galeri/Events dahil **tüm Beta Art mülklerinde**
uygulanmalı. Bir sayfaya özgü kararlar (o sayfanın kendi nav'ı, kendi
route'ları) `docs/proje-arsivi.md`'deki o mülkün maddesinde kalır — burada
yalnızca paylaşılan, mülkler-arası kararlar var.

## Kaynak — neden bu karar kesinleşti

30.08.2026 akşamı kullanıcı üç **gerçek üretilmiş** OG/sosyal görsel
paylaştı (Business, Field Notes, "Three Properties" hub — hepsi
`beta-art.com` filigranlı). Bu, herhangi bir tasarım-keşfi artifact'inin
kendi "kanonik" iddiasından daha güçlü kanıt: gerçekten üretimde kullanılan
stil bu. Detaylı gerekçe ve karşılaştırma `docs/proje-arsivi.md` madde 15'te.

## Mühür (logo)

Tek mark, tüm mülklerde aynı: halka + 6 kollu pusula/diyafram deseni +
kırmızı merkez nokta.

```svg
<svg viewBox="0 0 100 100" fill="none">
  <g stroke="currentColor" stroke-width="4">
    <circle cx="50" cy="50" r="46"/>
    <path d="M50 30 75.81 11.92M67.32 40 84.99 47.86M67.32 60 76.66 84.02M50 70 24.19 88.08M32.68 60 15.01 52.14M32.68 40 23.34 15.98"/>
  </g>
  <circle cx="50" cy="50" r="7" fill="#8B1A1A"/>
</svg>
```

Kural: `stroke` her zaman `currentColor` (temaya göre döner), merkez nokta
her zaman sabit `#8B1A1A`. **"Beta Art Brand" (4 kirişli halka) ve "Beta
Art Logos" (Plate/Field/Glyph/Horizon dört konsepti) artık kanonik değil**
— kullanılmayan keşif olarak kalıyorlar, yeni işte referans alınmasınlar.

## Renkler

| Rol | Açık zemin | Koyu zemin |
|---|---|---|
| Kağıt (bone paper) | `#FBFAF7` | `#14130F` |
| Kağıt 2 (kart/section arka planı) | `#F3F0E9` | `#1C1A16` |
| Mürekkep (metin) | `#0F0F0F` | `#F3F0E9` |
| Muted (ikincil metin) | `#67635B` | `#9C968A` |
| Çizgi (border) | `#E4E0D8` | `#322E28` |
| Mühür kırmızısı (vurgu) | `#8B1A1A` | `#C4453A` |

Doğrudan hex yazmak yerine bu tablodan CSS değişkeni/HSL token üretin
(bkz. `beta-art-site/src/index.css` — shadcn HSL formatına çevrilmiş hali).

## Tipografi

- **Display / başlık**: Fraunces (opsz 9..144, wght 300–600) — italik
  kelime vurgusu için (`<em>` veya `italic` class) kullanılıyor, gerçek OG
  görsellerdeki gibi ("*working*", "*actually looks like*", "*Verified at
  the source*").
- **Gövde**: Inter (400/500/600).
- **Etiket/kayıt katmanı ("record label")**: JetBrains Mono — eyebrow
  metinleri, buton yazıları, form label'ları, footer bağlantıları için;
  hepsi büyük harf + geniş `letter-spacing` (~0.12–0.22em).

Google Fonts linki (tüm mülklerde aynı):
```
https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap
```

## Yazım üslubu — "klarspråk"

Kullanıcı talimatı (30.08.2026): metinler web tasarımcılarının yazdığı gibi
— **kısa, sade dil** ("klarspråk", Norveç/İskandinav kamu-dili standardı).
Kural: kısa cümle, gereksiz sıfat yok, doğrudan fiil. Bu, **gerçek
`beta-art.com` metnini değiştirmek için değil** — o metin birebir kalıyor,
kaynağı doğrulanmış. Kural yeni yazılan her şey için geçerli: form
label'ları, buton metni, hata/durum mesajları, çeviriler, ileride eklenecek
her yeni bölüm.

## Çok dillilik

QBLOGG'un i18n modeliyle aynı disiplin (bkz. QBLOGG CLAUDE.md madde 1):
istenen 8 dil — Norveççe, Türkçe, İngilizce, İtalyanca, Fransızca,
İspanyolca, Portekizce, Almanca.

**01.09.2026'dan itibaren tam çeviri modeli** (kullanıcının açık talebi:
"bütün tekstler tam olarak bütün dillere"). Önceki iki katmanlı model
(kabuk çevrilir, içerik İngilizce kalır) bu tarihte kapatıldı:

- **İngilizce**: kaynak katman, `beta-art.com`'dan birebir — hiç değişmez.
  Diğer yedi dil bu katmanın çevirisidir; olgu/rakam eklenmez.
- **UI metinleri** `src/lib/i18n.ts`'te 8 sözlükte durur (8 dil × aynı
  anahtar kümesi); eksik anahtar sessizce İngilizceye düşer — güvenlik
  ağı, çözüm değil.
- **İçerik blokları** (3 doğrulama yöntemi, 3 sergi, 4 lisans katmanı,
  16 SSS, 35 kategori, 12 plaka detayı) `src/lib/data.ts`'te
  `Record<Lang, string>` tipindedir — TypeScript her metinde 8 dilin
  varlığını derlemede zorlar.
- **Çevrilmeyenler**: eser (plaka) adları, "Life Flower" manifesto adı,
  fotoğrafçı künyesi, teknik terimler (RAW, EXIF, C2PA, sRGB), yer
  adları, `kr 190` ve e-posta adresi.

Detay ve hangi mülkte hangi dilin uygulandığı `docs/proje-arsivi.md`'de
ilgili madde altında izlenir — bu belge yalnızca **kuralı** taşır.
