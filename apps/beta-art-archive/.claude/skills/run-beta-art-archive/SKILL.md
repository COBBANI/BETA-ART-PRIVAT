---
name: run-beta-art-archive
description: Beta Art Privat arşiv sitesini (apps/beta-art-archive — React + Vite SPA) bu konteynerde kur, başlat, sür ve ekran görüntüsü al. "Beta Art'ı çalıştır", "siteyi başlat/sür", "screenshot/ekran görüntüsü al", "admin panelini göster", "tarayıcıda doğrula", "sayfayı göreyim" gibi istekler geldiğinde bu beceriyi yükle. Sürücü: build + `vite preview` + headless Chromium (driver.mjs). Yollar apps/beta-art-archive köküne görelidir.
owner: Beta Art
---

# run-beta-art-archive

`apps/beta-art-archive`, React 18/19 + TypeScript + Vite ile yazılmış tek
sayfalık (SPA) bir web uygulamasıdır — kanıt temelli insan fotoğrafçılığı
arşivi. Yönlendirme durum-tabanlıdır (URL router yok); gizli yönetici
paneli `#admin` hash'iyle açılır.

Sürme yolu: `npm run build` → `vite preview` (derlenmiş çıktıyı sunar) →
headless Chromium'u **driver.mjs** ile sür. Chromium ve Playwright bu
konteynerde global kuruludur (`/opt/pw-browsers/chromium`,
`/opt/node22/lib/node_modules`); ayrıca kurulum yapma.

Aşağıdaki her komut bu oturumda, bu konteynerde çalıştırıldı. Yollar
`apps/beta-art-archive/` köküne görelidir.

## Ön koşullar

Ek `apt-get` gerekmez. Global araçlar hazır:
- Chromium: `/opt/pw-browsers/chromium`
- Playwright (global): `/opt/node22/lib/node_modules/playwright`

Proje bağımlılıkları kuruluysa atla; değilse:

```bash
npm ci
```

## Build

```bash
npm run build   # tsc -b && vite build → dist/ (~2-3 sn)
```

## Çalıştır (ajan yolu — ÖNCE bunu kullan)

Derlenmiş çıktıyı arka planda sun, sonra sürücüyle ekran görüntüsü al:

```bash
# 1. Derlenmiş çıktıyı sun (arka planda, boş bir port seç)
npx vite preview --port 4173 >/tmp/preview.log 2>&1 &
sleep 3

# 2. Ana sayfayı sür + ekran görüntüsü
node .claude/skills/run-beta-art-archive/driver.mjs \
  http://localhost:4173/ /tmp/home.png

# 3. Gizli yönetici panelini sür (demo satışlar tohumlanır → grafik dolu gelir)
node .claude/skills/run-beta-art-archive/driver.mjs \
  "http://localhost:4173/#admin" /tmp/admin.png --admin
```

`driver.mjs` çıktısı (her koşuda): açılan URL, sayfa başlığı, ilk `h1`,
yazılan ekran görüntüsü yolu ve varsa sayfa hataları. Ekran görüntüsü
yoksa ya da `page errors` satırı varsa iş bitmemiştir — logu oku.

**driver.mjs argümanları:**
- `<url>` — açılacak tam URL (ör. `http://localhost:4173/` veya `.../#admin`)
- `<out.png>` — yazılacak ekran görüntüsü yolu
- `--admin` — yüklemeden önce `localStorage`'a iki demo satış tohumlar
  (yönetici paneli + gelir grafiği boş görünmesin diye)
- `--wait <ms>` — yüklemeden sonra ek bekleme (varsayılan 500)

Doğrulanmış sonuç (bu oturum): ana sayfa başlığı
"Beta Art — Verified Human Photography", `h1` "Verified Human Photography.";
`#admin` başlığı "Sales tracking — Beta Art", `h1` "Sales tracking ·
Salgsoversikt", 3 demo satış + aylık gelir çubuk grafiği görünür.

### Kendi duman testini yazmak

Bir davranışı doğrulamak için (öneri şeridi, satış hesabı, filtre) ayrı bir
Playwright betiğini `NODE_PATH` ile global playwright'e yönlendirerek
çalıştır — CommonJS `require` NODE_PATH'i onurlandırır:

```bash
NODE_PATH=/opt/node22/lib/node_modules node - <<'EOF'
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage();
  await p.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  console.log((await p.title()));
  await b.close();
})();
EOF
```

## Çalıştır (insan yolu)

```bash
npm run dev      # http://localhost:5173 — geliştirme sunucusu, HMR'li
```

Headless konteynerde tarayıcı penceresi açılmaz; insan yolu yalnızca
gerçek bir masaüstünde işe yarar. Ajan her zaman yukarıdaki `vite preview`
+ driver yolunu kullanır.

## Gotchas (bu oturumda bedeli ödendi)

- **ESM `import` NODE_PATH'i yok sayar.** `driver.mjs` bu yüzden global
  playwright'i `createRequire` + mutlak yolla (`/opt/node22/lib/node_modules/playwright`)
  yükler, `import ... from "playwright"` ile değil. Elle Playwright
  betiği yazarken CommonJS `require` (heredoc `node - <<EOF`) NODE_PATH'i
  onurlandırır; ESM yolu onurlandırmaz.
- **Hash-only gezinme tam yeniden yükleme tetiklemez.** Router başlangıç
  sayfasını `window.location.hash`'ten okur; `#admin`'e Playwright içinde
  `page.goto('.../#admin')` ile TAZE gidersen (ya da ayrı context) panel
  açılır. Zaten açık bir sayfada hash değiştirmek remount etmez — driver
  bu yüzden her koşuda taze `goto` yapar.
- **`vite preview` `dist/`i sunar, kaynağı değil.** Değişikliği görmek için
  önce `npm run build`. `npm run dev` (5173) kaynağı canlı sunar ama
  headless'ta sürülmesi gereken preview çıktısı 4173'tür.
- **Port çakışması:** önceki bir `vite preview` süreci portu tutuyorsa
  başka bir port seç (4174, 4175…). Süreç öldürmeyi (`pkill`) asla
  commit/dosya-yazma komutlarıyla aynı zincire koyma — belirsiz çıkışla
  (exit 144) zinciri keser.

## Troubleshooting

| Belirti | Çözüm |
|---|---|
| `ERR_MODULE_NOT_FOUND: playwright` | ESM import kullanılmış; driver `createRequire`+mutlak yol kullanır. Elle betikte `node - <<EOF` (CommonJS) + `NODE_PATH=/opt/node22/lib/node_modules`. |
| Ekran görüntüsü boş / hero yok | `vite preview` henüz ayağa kalkmamış; `sleep 3` artır veya `/tmp/preview.log`'a bak. |
| `#admin` boş panel | `--admin` bayrağını unuttun (demo satış tohumlanmaz); ya da hash'e taze `goto` yapılmadı. |
| `EADDRINUSE` | Port dolu; `--port`'u değiştir. |
