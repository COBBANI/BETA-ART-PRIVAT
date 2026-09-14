---
name: run-naviar-paaroerende-pilot
description: Naviar Pårørendepilot sayfasını yerel olarak çalıştır, screenshot al, smoke test yap — "naviar pilot çalıştır", "run", "screenshot/ekran görüntüsü", "sayfayı göreyim", "pilot formu test et" istendiğinde bu beceriyi kullan.
---

# Naviar Pårørendepilot — çalıştırma ve sürme

Statik üç dosyalı site (`index.html`, `styles.css`, `script.js`).  
Kaynak: `naviar-paaroerende-pilot/` (depo kökünden).  
Canlı: `https://naviar-paaroerende-pilot.vercel.app`  
Vercel proje ID: `prj_ZFThi6A3alSGf0SzlJTyEdWw21wY`, takım: `team_xNtowH7U0jXQrI53DFJFzH2o`

## Önkoşul

Yok. Python3, Node 22 ve Playwright (`/opt/node22/lib/node_modules/`) + Chromium (`/opt/pw-browsers/chromium`) bu konteynerde hazır. `apt`/`npm install` ÇALIŞTIRMA.

## Çalıştır (ajan yolu)

```bash
# Hero screenshot (port 8001, /tmp/naviar-ss/ altına):
node .claude/skills/run-naviar-paaroerende-pilot/driver.mjs shot hero /tmp/naviar-ss

# Pilot form bölümü screenshot:
node .claude/skills/run-naviar-paaroerende-pilot/driver.mjs shot pilot /tmp/naviar-ss

# Tam sayfa smoke (hero + form):
node .claude/skills/run-naviar-paaroerende-pilot/driver.mjs smoke /tmp/naviar-ss
```

Görüntüler `<çıktı-dizini>/<hedef>.png` olarak düşer.

## Çalıştır (insan yolu)

```bash
cd naviar-paaroerende-pilot && python3 -m http.server 8001
# → http://localhost:8001
```

## Canlı siteyi doğrulama

`*.vercel.app` bu konteynerde proxy ile engellidir. Canlı doğrulama için:

```
mcp__Vercel__web_fetch_vercel_url(url="https://naviar-paaroerende-pilot.vercel.app/")
```

## Dağıtım

Kaynak dosyaları değiştikten sonra:

```
mcp__Vercel__deploy_to_vercel(
  files=[index.html, styles.css, script.js],
  projectId="prj_ZFThi6A3alSGf0SzlJTyEdWw21wY",
  teamId="team_xNtowH7U0jXQrI53DFJFzH2o"
)
```

## Gotchas

- **Google Fonts yerel sunucuda yüklenmez** (egress engeli) — font fallback'e düşer; CSS yapısı bozulmaz, görsel hafif farklı olur. Canlı sitede doğru görünür.
- **Port 8001** kullanılıyor; QBLOGG 8000'de çalışıyorsa çakışma olmaz. İkisi aynı anda çalışabilir.
- **Playwright depo kökünden import edilemez** — driver `createRequire('/opt/node22/lib/node_modules/')` deseniyle çözer; kendi betiğini yazarsan aynı deseni kopyala.

## Sorun giderme

| Belirti | Çözüm |
|---|---|
| `EADDRINUSE 8001` | `pkill -f "http.server.*8001"` sonra tekrar |
| Görüntüde font yok | Normal — yerel sunucuda Google Fonts engelli; canlı sitede düzgün görünür |
| `ERR_MODULE_NOT_FOUND: playwright` | `createRequire('/opt/node22/lib/node_modules/')` deseni kullan |
