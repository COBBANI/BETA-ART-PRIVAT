---
name: naviar-care-ship
description: >
  NAVIAR CARE landing sayfasını (naviar-care/) derle, doğrula ve yayına
  hazırla — kaynak App.tsx değişikliğinden tek dosyalık bundle'a, WCAG
  taramasından commit/artifact'a kadar tüm boru hattı. naviar-care
  altında herhangi bir düzenleme, "bundle et", "yeniden derle", "WCAG /
  axe kontrolü", "landing'i yayınla/güncelle", "naviar deploy" veya yeni
  bölüm/özellik ekleme istendiğinde MUTLAKA bu beceriyi kullan; adımları
  elle yeniden icat etme — betikler burada. Sayfayı "çalıştır",
  "ekran görüntüsü al" veya "tarayıcıda test et" istekleri de buraya
  girer: verify.mjs sayfayı Chromium'da açar ve görüntü alır.
---

# naviar-care-ship — derle, doğrula, yayınla

NAVIAR CARE landing'i React tek-dosya bundle olarak yaşar
(`naviar-care/index.html`, ~420 KB, dışa SIFIR istek). Vite projesi
repoda DURMAZ; bu beceri onu her seferinde taze kurar. Yapı girdileri
repodadır: `naviar-care/src/` (App.tsx, index.css, main.tsx),
`index.dev.html`, `tailwind.config.js`,
`assets/fonts-inline.html` (gömülü latin woff2 seti — DM Sans variable,
DM Mono 400, Playfair 700).

## Boru hattı

```bash
S=.claude/skills/naviar-care-ship/scripts
bash $S/setup.sh /tmp/nc-build      # 1) taze vite projesi + repo kaynaklarını bindir
# (kaynak düzenlemeleri /tmp/nc-build/src/App.tsx üzerinde YAPILMAZ —
#  repo naviar-care/src/App.tsx düzenlenir, sonra setup yeniden koşulur;
#  tek kaynak repodur)
bash $S/build.sh /tmp/nc-build      # 2) font linklerini söker, bundle eder, gömülü fontları enjekte eder
mkdir -p /tmp/nc-verify && cd /tmp/nc-verify && npm i --no-save playwright axe-core
node  $S/verify.mjs /tmp/nc-build/bundle.html   # 3) axe WCAG 2.1 AA (0 ihlal şart) + smoke + sıfır dış istek
# (verify bağımlılıkları TEMİZ bir dizinden kurulur/koşulur — aşağıdaki
#  gotcha; ekran görüntüsü bundle'ın yanına düşer: /tmp/nc-build/verify-shot.png.
#  Görüntüye BAK — geçen testler yanlış render'ı yakalamaz.)
cp /tmp/nc-build/bundle.html naviar-care/index.html   # 4) ürünleştir
```

Sonra: `git add` (yalnız dokunulan dosyalar — asla `-A`), commit
(gövdede ne/niçin + doğrulama sonucu), `git push -u origin <dal>`,
artifact'ı AYNI url ile yeniden yayınla (yeni url açma).

## Kırmızı çizgiler (gerekçeleriyle)

- **axe 0 ihlal olmadan yayın yok.** Uu-tilsynet yükümlülüğü ve
  uyum-ilkeleri madde 5; 41 kontrast ihlali bir kez temizlendi, geri
  gelmesin.
- **Dış istek sıfır kalır.** Fontlar gömülüdür; Google Fonts linki
  bundle'a sızarsa GDPR duruşu ve CSP (`vercel.json`) bozulur.
  `verify.mjs` bunu sınar.
- **Renkler App.tsx'teki mevcut paletten** (#173d3a, #d8ef75, #d9ebe2,
  #f7f5ef, #576b68, #cbd8d0, #fffdf8, #0a7d72, #7db5ad, #7fa8a2).
  #637774 açık zeminde 4.35:1'dir ve metinde KULLANILMAZ — #576b68
  kullanılır (5.19:1). Koyu zeminlerde #7db5ad/#7fa8a2.
- **Fiyat/istatistik = örnek.** Yeni rakam eklerken "eksempeltall"
  işaretini koru (CLAUDE.md madde 8).
- **Navi şeffaflığı.** Chat asistanına dokunuyorsan "Automatisk
  assistent — ikke et menneske" etiketi ve sağlık-verisi uyarısı kalır.
- **Davranış sistemi rıza kapılıdır.** `track()` çağrıları yalnızca
  consent=all iken yazar; yeni sinyal eklerken bu kapıyı delme.

## Gotchas (hepsi bu oturumda gerçekten yaşandı)

- **`npm i --no-save X`, önceki `--no-save` paketleri SİLER.** playwright
  kuruluyken `npm i --no-save axe-core` çalıştırmak playwright'ı uçurdu.
  Her zaman birlikte kur: `npm i --no-save playwright axe-core`.
- **playwright@1.48 bu Chromium'la açılmaz** ("Old Headless mode has
  been removed"). `playwright@latest` kullan; `executablePath:
  '/opt/pw-browsers/chromium'` şart, `playwright install` yasak
  (PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1).
- **html-inline dış URL'yi dosya sanır** (`ENOENT ...fonts.googleapis`).
  build.sh bu yüzden font linklerini bundle öncesi söker, gömülüleri
  sonra enjekte eder — index.dev.html'e font linki eklersen sökme
  regex'inin onu yakaladığından emin ol.
- **DM Mono'nun 700 kesimi yok.** `fontWeight: 700` yazarsan tarayıcı
  sahte kalınlaştırır; gömülü sette yalnız 400 var. Mono'da 400 kullan.
- **Yumuşak kaydırma ekran görüntüsünü bozar.** `scrollIntoView` sonrası
  hemen çekilen kare eski konumu gösterir — `scrollBehavior='auto'` yap
  ya da bekle.
- **verify.mjs bağımlılıkları çalıştırıldığı dizinden çözer** (bilinçli:
  beceri dizinine node_modules koymuyoruz). Farklı dizinden koşarken
  önce o dizinde `npm i --no-save playwright axe-core`.
- **Scaffold dizininde npm kurulumu ÇÖKEBİLİR.** `/tmp/nc-build` içinde
  `npm i --no-save playwright axe-core` arborist hatası verdi ("Cannot
  read properties of null (reading 'matches')") — scaffold'un
  node_modules'u pnpm düzeninde ve npm ona aşı tutturamıyor. Çözüm:
  boş bir dizine kur (`/tmp/nc-verify`) ve verify'ı ORADAN koş; bundle
  yolunu mutlak ver.

## Sorun giderme

| Belirti | Çözüm |
|---|---|
| `Cannot find package 'playwright'` (verify) | Çalıştığın dizinde `npm i --no-save playwright axe-core` |
| npm `Cannot read properties of null (reading 'matches')` | Scaffold dizinine kurma — boş dizine kur, verify'ı oradan koş |
| `ENOENT ... https:/fonts.googleapis...` (bundle) | Font linki sökülmemiş — build.sh kullan, elle bundle etme |
| axe `color-contrast` ihlali | Yeni renk mi ekledin? Palet dışına çıkma; #637774 metinde yasak |
| Bundle'da `fonts.googleapis` çıktı | build.sh'ın enjeksiyon assert'i durdurur; index.dev.html'deki linkleri kontrol et |
| Ekran görüntüsü yanlış bölümü gösteriyor | smooth scroll — `documentElement.style.scrollBehavior='auto'` sonra kaydır |

## Doğrulama derinleştirme

Etkileşim değiştirdiysen (modal, chat, davranış, cookie) verify.mjs'in
smoke'u yetmez — bu oturumdaki desenlerle senaryo testi yaz (Playwright,
`executablePath: '/opt/pw-browsers/chromium'`): rıza aç/kapa, form
doldur, chat yönlendirmesi. Referans senaryolar commit geçmişinde
(`behavior-test`, `nextstep-test`, `chat-test` mesajları).

## Yayın hedefleri — her ship'te ÜÇÜ BİRDEN (kullanıcı talimatı, 03.09.2026)

1. **Ekran görüntüsü:** tam sayfayı ~3400px'lik parçalara bölerek çek
   (tek parça 10000px+ upload'da 400 verir) ve SendUserFile ile gönder.
2. **Canlı site:** naviar-care-live (BET-ART,
   `team_xNtowH7U0jXQrI53DFJFzH2o`) — `mcp__Vercel__deploy_to_vercel`
   ile TEK dosya gönder: `naviar-care/deploy/vercel.json` (depodaki
   dosyanın kendisi — tek kaynak; buildCommand dalı klonlar,
   index.html'i dist'e koyar). target=production. Push otomatik
   dağıtmaz; her ship'te bunu elle tetikle. READY olana dek
   get_deployment ile izle, sonra canlı URL'yi Playwright ile açıp
   doğrula (başlık + h1).
3. **Artifact:** aynı konuşmada `naviar-care/index.html`'i aynı yola
   publish etmek yeter; başka oturumdan `url` parametresiyle.

Alan adı: naviarcare.com kullanıcıya ait; panelden naviar-care-live'a
bağlanması kullanıcı adımı (A @ 76.76.21.21, CNAME www
cname.vercel-dns.com — panel ekranı esastır).
