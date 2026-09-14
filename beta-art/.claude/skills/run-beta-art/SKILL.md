---
name: run-beta-art
description: Beta Art (React + TanStack Start + Vite + Supabase fotoğraf arşivi) uygulamasını bu konteynerde çalıştır, sür ve ekran görüntüsü al — "beta-art'ı çalıştır", "run", "smoke test", "screenshot/ekran görüntüsü", "sayfayı göreyim", "tarayıcıda doğrula", "plaka sayfasını göster" istendiğinde bu beceriyi kullan. Vite dev sunucusu başlatma + gerçek Chromium ile sürüş tek komutta.
---

# Beta Art'ı çalıştırma ve sürme

React 19 + TanStack Start/Router + Vite 8 + Tailwind 4 + Supabase, Lovable
tabanlı bir fotoğraf/lisans arşivi. Ajan yolu: bu klasördeki **driver.mjs** —
Vite dev sunucusunu kendi açar, gerçek Chromium ile sürer, kapatır. Yollar
`beta-art/`'tan (bu deponun alt klasörü, repo kökü değil).

## Önkoşul

`beta-art/node_modules/` zaten kurulu değilse: `npm install` (bu depoda
zaten kuruluydu, tekrar kurmaya gerek kalmadı). python3/node/Playwright +
Chromium (`/opt/pw-browsers/chromium`) bu konteynerde küresel hazır —
ayrıca kurulum yapma.

## Çalıştır (ajan yolu — önce bunu kullan)

```bash
cd beta-art

# Ana sayfa + plaka detay sayfası (first-light) uçtan uca smoke test:
node .claude/skills/run-beta-art/driver.mjs smoke /tmp/beta-art-run

# Tek sayfanın tam ekran görüntüsü (lazy görseller yüklenmiş halde):
node .claude/skills/run-beta-art/driver.mjs shot /plates/first-light /tmp/beta-art-run
node .claude/skills/run-beta-art/driver.mjs shot / /tmp/beta-art-run
```

Görüntüler verilen dizine `.png` düşer. Sunucu zaten 8080'de çalışıyorsa
driver onu yeniden kullanır; kendisi açtıysa işi bitince kapatır.

## Çalıştır (insan yolu)

```bash
cd beta-art
npx vite dev --host 127.0.0.1 --port 8080   # düz `npm run dev` bu konteynerde ÇÖKER, bkz. Gotchas
# http://127.0.0.1:8080/ — Ctrl-C ile kapat
```

## Build / Lint

```bash
cd beta-art
npm run build   # ✓ built in ~800ms, .output/ + .wrangler/ üretir (ikisi de .gitignore'da — commit etmeden sil)
npm run lint     # eslint .
```

## Gotchas (hepsi bu konteynerde yaşandı)

- **Düz `npm run dev` (`vite dev`, host verilmeden) bu konteynerde ÇÖKER:**
  `Error: listen EAFNOSUPPORT: address family not supported :::8080` —
  Vite varsayılan olarak `::` (IPv6 wildcard) dinlemeye çalışıyor, bu
  konteyner IPv6'yı desteklemiyor. **Çözüm: `--host 127.0.0.1` zorunlu**
  (driver.mjs bunu zaten yapıyor). `vite.config.ts`'deki
  `@lovable.dev/vite-tanstack-config`'in "sandbox detection"i bu konteyner
  tipini tanımıyor — host'u otomatik düzeltmiyor.
- **Supabase (`*.supabase.co`) ve Google Fonts (`fonts.googleapis.com`)
  bu konteynerin egress proxy'si tarafından engelli** (`ERR_TUNNEL_
  CONNECTION_FAILED` / `ERR_CONNECTION_RESET`) — bu bir uygulama hatası
  değil, ortam sınırı. Sonuç: plaka detay sayfasındaki `co_viewed_plates`
  RPC'si ve `plate_view_events` insert'i her zaman sessizce başarısız olur
  (`plateInterest.ts` fire-and-forget olduğu için sayfa çökmez), "You might
  also like" bölümü gerçek eş-görüntüleme verisi yerine soğuk-başlangıç
  yedeğine (katalog sırasına göre henüz görülmemiş plakalar) düşer — bu
  **tasarlanmış davranış**, bkz. `src/routes/plates.$slug.tsx`
  `useAlsoLikePlates`. driver.mjs bu iki host'tan gelen ağ hatalarını smoke
  testte bilinçli olarak yok sayıyor (`BEKLENEN_EGRESS_HATASI`).
- **`loading="lazy"` görseller (`src/routes/index.tsx` katalog ızgarası,
  `plates.$slug.tsx`) `page.screenshot({fullPage:true})`'de boş/bej kutu
  kalıyor** — Chromium'un otomatik fullPage kaydırması IntersectionObserver
  tabanlı lazy-load'ı güvenilir tetiklemiyor. driver.mjs ekran görüntüsünden
  önce sayfayı 800px adımlarla kaydırıp başa dönüyor (`kaydirYukle`); kendi
  betiğini yazacaksan aynı deseni kopyala, yoksa görseller boş çıkar.
- **Playwright depo kökünden import EDİLEMEZ** (`ERR_MODULE_NOT_FOUND`).
  driver.mjs bunu `createRequire('/opt/node22/lib/node_modules/')` ile
  çözüyor — `run-qblogg/driver.mjs` ile aynı desen.
- **`.env`'de yalnızca public/anon Supabase anahtarları var** (proje ID,
  URL, anon/publishable key) — gizli bir sır yok, ama yine de commit etme.
- **README.md güvenilmez** — Lovable'ın ürettiği jenerik "AI ile üretildi"
  metni ve genel `git clone && npm i && npm run dev` talimatı; gerçek host
  ayarını, IPv6 çökmesini veya egress engellerini anlatmıyor.

## Sorun giderme

| Belirti | Çözüm |
|---|---|
| `EAFNOSUPPORT: :::8080` | `vite dev --host 127.0.0.1` kullan, düz `npm run dev` değil |
| `ERR_MODULE_NOT_FOUND: playwright` | createRequire deseni (yukarıda) |
| Ekran görüntüsünde katalog kartları boş/bej | scroll-önce-screenshot yapılmamış — driver.mjs'i kullan |
| Smoke'ta "requestfailed" hatası (supabase.co/fonts.googleapis.com) | Beklenen egress engeli — gerçek regresyon değil, `BEKLENEN_EGRESS_HATASI` zaten filtreliyor |
| Port 8080 doluyken sunucu açılmıyor | `fuser -k 8080/tcp` (run-qblogg'daki gibi `pkill -f` KULLANMA — bu araç çağrısını tamamen öldürebilir) |
