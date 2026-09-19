---
name: run-engine
description: Curiosity Engine üretim hattını (engine/ — Node 22, node:sqlite, ağsız RSS) bu konteynerde çalıştır, sür ve doğrula. "Motoru çalıştır", "engine/run.mjs", "hattı sür", "demo çalıştır", "board/panel", "dashboard screenshot", "puanlama/scoring test et", "smoke test" istendiğinde bu beceriyi yükle. Birincil yol: smoke.sh (demo hattı + testler). Panel için: dashboard.html'i statik sun + Chromium ile ekran görüntüsü. Yollar engine/ köküne görelidir. Bu QBLOGG sitesi ya da beta-art-archive değildir.
owner: Beta Art
---

# run-engine

`engine/`, QBLOGG'un **Curiosity Engine**'i — bir web sitesi değil, üretim
hattı: RSS sinyalleri topla → kümele → puanla → karar ver → kuyruğa al, sonra
seçilen konu için araştır → yaz. Node 22'nin yerleşik `node:sqlite`'ıyla
çalışır; **ek bağımlılık, ağ ya da API anahtarı gerekmez** (demo modunda).
Otomatik yayın yoktur — yayın kararı insanda.

İki sürülebilir yüzey:
1. **CLI hattı** (asıl iş katmanı — çoğu değişiklik `score.mjs`/`features.mjs`/
   `cluster.mjs`/`billing.mjs` içselini etkiler): `smoke.sh` demo hattını +
   birim testlerini fikstürle deterministik koşturur.
2. **Panel** (`dashboard.html`): `engine/data/board.json`'u `fetch` ile
   okuyan statik sayfa — statik sunucu + headless Chromium ile ekran görüntüsü.

Aşağıdaki her komut bu oturumda, bu konteynerde çalıştırıldı. Yollar
`engine/` köküne görelidir; komutlar depo kökünden de çalışır.

## Ön koşullar

Ek `apt-get` / `npm install` gerekmez:
- Node 22 (`node --version` → v22.x) — `node:sqlite` yerleşik gelir.
- `engine/` içinde `package.json` yok; betikler doğrudan `node <dosya>.mjs`
  ile koşar, veri dizinini (`engine/data/`) betik konumundan çözer.
- Panel ekran görüntüsü için: global Chromium (`/opt/pw-browsers/chromium`)
  + global Playwright (`/opt/node22/lib/node_modules`) — hazır.

## Çalıştır (ajan yolu — ÖNCE bunu kullan)

Tüm hattı + testleri tek komutta doğrula:

```bash
bash engine/.claude/skills/run-engine/smoke.sh
```

Dört aşamayı sürer ve `SMOKE: PASS`/`FAIL` basar:
1. `node run.mjs --demo` — fikstürle tarama+puanlama, `data/board.json` üretir
2. `node run.mjs --board` — son tabloyu yazdırır
3. `node write.mjs --next --dry` — yazı zincirini API çağırmadan anlatır
4. `node --test ./*.test.mjs` — score/billing/visibility birim testleri

Doğrulanmış sonuç (bu oturum): 4/4 PASS; demo 30 sinyal → 16 konu, kuyruğa
"günün en iyi 3" (eşik 85+ pratikte çıkmaz — README'deki bilinen sınır 2).

### Tek tek komutlar (elle sürmek için)

```bash
node engine/run.mjs --demo      # fikstür; ağsız, anahtarsız
node engine/run.mjs --board     # son tabloyu yazdır
node engine/write.mjs --next --dry   # zinciri anlat, API çağırma
node --test engine/*.test.mjs   # birim testleri
```

`node:sqlite` her koşuda stderr'e "experimental feature" uyarısı basar — bu
gürültüdür, hata değil. `smoke.sh` bunu `NODE_OPTIONS=--no-warnings` ile
susturur; elle koşarken uyarıyı yok say.

### Panel ekran görüntüsü (web yüzeyi)

`dashboard.html` `./data/board.json`'u `fetch` eder, yani `file://` ile
CORS'a takılır — statik sunucudan sunulmalı. Önce board üret, sonra sun ve
sür:

```bash
node engine/run.mjs --demo >/dev/null 2>&1        # board.json güncel olsun
( cd engine && python3 -m http.server 8091 >/tmp/engine-http.log 2>&1 & )
sleep 2
SS=/tmp NODE_PATH=/opt/node22/lib/node_modules node - <<'EOF'
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  await p.goto('http://localhost:8091/dashboard.html', { waitUntil: 'networkidle' });
  await p.waitForTimeout(600);
  await p.screenshot({ path: process.env.SS + '/engine-dashboard.png' });
  console.log('board yüklendi:', (await p.textContent('body')).includes('Live Curiosity'));
  await b.close();
})();
EOF
```

Doğrulanmış: panel başlığı "Curiosity Engine — Live Curiosity", istatistik
kutuları (konu/hot/yayına aday/taslak/fikir bankası/ort. final) + "Trending
Now" tablosu render olur.

## Canlı mod (opsiyonel, ağ ister)

```bash
node engine/run.mjs --live            # anahtarsız canlı RSS kaynakları
node engine/run.mjs --live --gsc q.csv  # Search Console CSV'sini de katar
node engine/write.mjs --next          # gerçek yazı zinciri — ANTHROPIC_API_KEY gerekir
```

Bu ortamda egress proxy bazı kaynakları engelleyebilir; `--live` ve gerçek
`write` doğrulanmadı. Ajan yolu her zaman `--demo`'dur (deterministik, ağsız).

## Gotchas (bu oturumda görüldü)

- **Panel `file://` ile çalışmaz.** `fetch('./data/board.json')` CORS'a takılır;
  mutlaka `python3 -m http.server` (ya da başka statik sunucu) ile `engine/`
  kökünden sun.
- **ESM `import` NODE_PATH'i yok sayar.** Panel ekran görüntüsü heredoc'u
  CommonJS `require('playwright')` kullanır ve `NODE_PATH`'i onurlandırır;
  `import ... from "playwright"` yazma.
- **`node:sqlite` uyarısı hata değil.** Her koşuda stderr'e düşer; çıkış kodu
  0'dır. Testleri/aşamaları çıkış koduyla değerlendir, stderr'deki uyarıyla değil.
- **Eşik 85+ pratikte çıkmaz** (README bilinen sınır 2): yalnızca RSS
  vekilleriyle konular 40–75 bandında; kuyruk bu yüzden "günün en iyi 3"e
  düşer. Bu beklenen davranış, bir hata değil.
- **`engine/` içinde `package.json` yok.** `npm run` arama; betikleri doğrudan
  `node engine/<dosya>.mjs` ile koş. Veri dizini betik konumuna göre çözülür,
  bu yüzden komut depo kökünden de, `engine/` içinden de çalışır.

## Troubleshooting

| Belirti | Çözüm |
|---|---|
| Panel boş / "board.json bulunamadı" | Önce `node engine/run.mjs --demo` ile board üret; paneli `file://` değil HTTP ile sun. |
| `ERR_MODULE_NOT_FOUND: playwright` | ESM import kullanılmış; heredoc'ta `node - <<EOF` (CommonJS) + `NODE_PATH=/opt/node22/lib/node_modules`. |
| `EADDRINUSE :8091` | Port dolu; `--http.server`'a başka port ver ve URL'yi güncelle. |
| stderr'de "SQLite is an experimental feature" | Normal; `NODE_OPTIONS=--no-warnings` ile sustur. |
