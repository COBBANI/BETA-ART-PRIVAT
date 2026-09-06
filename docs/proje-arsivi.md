# Proje arşivi — bilinen tüm web sayfası projeleri

Bu belge, bu oturumda karşılaşılan **her web sayfası/proje**yi tek yerde
kataloglar. Amaç: önce ne olduğunu netleştirmek, **sonra** hangilerinin
birleştirileceğine karar vermek (kullanıcı talimatı, 30.08.2026). Hiçbir
satır tahminle doldurulmadı — kaynağı olmayan alan `bilinmiyor` yazar.

**Durum sütunu kodları:** `aktif` (bu oturumda üzerinde çalışılıyor) ·
`referans` (dosyaları paylaşıldı, kod tabanı burada değil) · `bilinmiyor`
(içerik görülemedi, yalnızca URL var).

---

## 1. QBLOGG

| Alan | Değer |
|---|---|
| Konum | bu depo (`BETA-ART`, GitHub `andersenbetul-alt/beta-art`) |
| Canlı adres | qblogg.vercel.app (kişisel Vercel hesabı, `andersenbetul-9635s-projects`) |
| Amaç | İçerik hattı stüdyosu — SEO blog, LinkedIn serisi, sosyal içerik, newsletter, çok dilli yayın |
| Teknik | Saf HTML/CSS/JS, derleme yok |
| Durum | **aktif** |

## 2. Naviar

| Alan | Değer |
|---|---|
| Konum | Marka çalışması bu depoda: `brand/naviar/`, `docs/naviar/`. Sitesi ayrı depo(lar)da (`betulandersen-droid` hesabı) |
| Vercel projeleri | `naviar-care-1`, `naviar-consult` (takım: BET - ART, `team_xNtowH7U0jXQrI53DFJFzH2o`) |
| Amaç | İkinci marka/kimlik — bu depoda yalnızca logo/marka tasarım çalışması |
| Durum | **referans** (sitesi bu oturumun kapsamı dışında) |

## 3. Beta Privat (muhasebe/vergi katmanı)

| Alan | Değer |
|---|---|
| Konum | `beta-privat/` bu depoda |
| Kaynak | Oturum başında paylaşılan `package.json` ("small-business", BAB/BAC/BAP, MVA, forskuddsskatt) |
| Amaç | Beta Art'ın iç nakit/vergi/abonelik iş akışı — bir web sitesi değil |
| Durum | **aktif** (yalnızca iskelet + kapsam belgesi var) |
| Not | Aşağıdaki "BETA ART Privat" (madde 4) ile **isim çakışması var, aynı şey değil** — kullanıcı 30.08'de bunları ayrı doğruladı |

## 4. BETA ART Privat — BAP-01

| Alan | Değer |
|---|---|
| Alt yol | `/privat/` (bazı belgelerde `archive.beta-art.com` alt alan adı önerisi) |
| Klasör (kaynak sistemde) | `beta-art-privat/` |
| Amaç | Doğrulanmış insan fotoğrafçılığı arşivi, katalog plakaları, köken kaydı, doğrudan lisanslama, edisyonlar |
| Kaynak | Statik prototip dosyaları paylaşıldı: `index.html`, `i18n.js`, `404.html`, `styles.css`, `script.js`, `tools.js`, `release.js`, `README.md`, `CONTENTMAP.md`, `DEPLOYMENT.md`, `ROUTE-CONFIG.md`, `sitemap.xml`, `vercel.json` |
| Canlı önizlemeler | `beta-art-archive-five.vercel.app` (erken, yalnızca Archive), `beta-art-contact1-9jsgs8q95-andersenbetul-9635s-projects.vercel.app` (Archive+Business birlikte, daha yeni) |
| Fotoğrafçı | Betül Öner (site içeriğinde adı geçiyor) |
| GoDaddy Airo venture | `7fb63a87-ebcb-45cc-b31e-98897df478c7` — kullanıcı 30.08'de doğruladı: madde 10 ve 11'deki Airo linkleri de bu venture'a ait, aynı proje |
| **Temel alınan sayfa** | Kullanıcı 30.08'de bu GoDaddy Airo venture sayfasını (`dashboard.godaddy.com/venture/website?ventureId=7fb63a87-...`) BETA ART Privat için **temel** ilan etti — statik prototip (yukarıdaki dosyalar) ve Final Work v2 (madde 5) değil. Sayfanın kendisi (görsel içerik) bu ortamdan hâlâ görülemiyor (`EGRESS_BLOCKED`); ama **altyapı kaynak dosyaları** paylaşıldı (aşağıya bakın). |
| **Üçüncü teknik implementasyon (GoDaddy Airo App Builder)** | 30.08'de paylaşılan dosyalar (`AiroErrorBoundary.tsx`, `PageNotFound.tsx`, `airo-secrets.ts`, `frontmatter.ts`, `index.ts`) gösteriyor ki bu, statik prototip ve Final Work v2/Supabase'den **ayrı, üçüncü bir kod tabanı**: Vite + React + TypeScript, GoDaddy'nin kendi "AAB" (Airo App Builder) iskeletiyle. İçerik `src/content/pages/*.json` ve `src/content/data/<koleksiyon>/*.json\|md` altında tutuluyor, `schemas.ts`'teki Zod şemalarıyla derleme anında doğrulanıyor, bileşenlere yalnızca `virtual:content` sanal modülü üzerinden geliyor (doğrudan JSON import'u derleme hatası veriyor). Sırlar (`getSecret`) dışa aktarılmış/bağımsız projelerde ortam değişkenlerinden okunuyor (`#airo/secrets` stub'ı). |
| Durum | **referans** (görsel içerik hâlâ görülemiyor; altyapı kaynak kodu doğrulandı) |

## 5. BETA ART Final Work v2 (Privat'ın üretim uygulaması)

| Alan | Değer |
|---|---|
| İlişki | BAP-01'in (madde 4) üretim-hedefli uygulama referansı, `beta-art-privat/app-reference/final-work-v2/` altında saklanıyor (kaynak sistemde) |
| Teknik | React + Vite + TypeScript + Supabase (Auth, Storage, Edge Functions, RLS) |
| Kaynak | `README.md`, `package.json`, `.env.example` paylaşıldı — `src/`, migration veya Edge Function kaynak kodu paylaşılmadı |
| Durum | **referans**, çalıştırılamaz/doğrulanamaz durumda (kaynak kod eksik) |

## 6. BETA ART Business — BAB-02

| Alan | Değer |
|---|---|
| Alt yol | `/business/` (`business.beta-art.com` alt alan adı önerisi de var) |
| Klasör (kaynak sistemde) | `beta-art-business/` |
| Amaç | İnşaat/yapı sektöründe proje kapanışı sonrası belge/kurtarılabilirlik hizmeti — "Prosjektet avsluttes. Dokumentasjonen skal ikke." |
| Kaynak | `PROJECTMANIFEST.md`, `PROJECT-CODES.md`, `ROUTE-MAP.md` üzerinden biliniyor; kendi kod dosyaları bu oturumda paylaşılmadı |
| Durum | **referans** (yalnızca üst-belgeler görüldü) |

## 7. BETA ART Galleri og Utstilling Event — BAG-03

| Alan | Değer |
|---|---|
| Alt yol | `/events/` (`events.beta-art.com` alt alan adı önerisi de var) |
| Klasör (kaynak sistemde) | `beta-art-gallery-event/` |
| Amaç | Sanatçılar, eserler, seriler, sergiler, açılışlar, kültürel etkinlik programı |
| Kaynak | Yalnızca üst-belgelerde (`PROJECTMANIFEST.md` vb.) geçiyor; kendi kod dosyaları paylaşılmadı |
| Durum | **referans**, içerik büyük ölçüde eksik (belgede "event-specific names, dates, venues... still required" diyor) |

## 8. BETA ART DNS-administrasjon

| Alan | Değer |
|---|---|
| Ne olduğu | Üç mülkün (4/6/7) DNS/domain planlamasını gösteren tek sayfalık statik araç |
| Önemli | Sayfanın kendisi açıkça belirtiyor: **canlı DNS değişikliği yapmıyor**, yalnızca taslak/kontrol listesi |
| Domain önerisi | `beta-art.com` kökü + `archive.`/`events.`/`business.` alt alan adları — bu, madde 4/6/7'deki `/privat/`+`/events/`+`/business/` yol-tabanlı modelle **çelişiyor** (aynı kaynak sistemde iki farklı barındırma modeli önerilmiş, henüz kesinleşmemiş) |
| Durum | **referans** |

## 9. BETA ART — Three Properties (giriş/kapı sayfası)

| Alan | Değer |
|---|---|
| Ne olduğu | 4/6/7'yi `beta-art-privat/`, `beta-art-gallery-event/`, `beta-art-business/` göreli bağlantılarıyla listeleyen tek sayfalık hub |
| Durum | **referans** |

## 10. GoDaddy Airo Builder — çözüldü, madde 4'e ait

| Alan | Değer |
|---|---|
| URL | `airo-builder.godaddy.com/develop/68v0scym3h?itc=account.products.vt_aab` |
| Erişim | Bu ortamdan **erişilemiyor** (`EGRESS_BLOCKED`) — muhtemelen oturum açma da gerektiriyor |
| Hangi projeye ait | **BETA ART Privat (madde 4)** — kullanıcı 30.08'de doğruladı, aynı GoDaddy venture (`7fb63a87-...`) |

## 11. airo.ai paylaşım linki — çözüldü, madde 4'e ait

| Alan | Değer |
|---|---|
| URL | `airo.ai/share/Njh2MHNjeW0zaDpjNDA6WG56T2RRenYyNHNj` |
| Erişim | Bu ortamdan **erişilemiyor** (`EGRESS_BLOCKED`) |
| Hangi projeye ait | **BETA ART Privat (madde 4)** — kullanıcı 30.08'de doğruladı, aynı GoDaddy venture (`7fb63a87-...`) |

## 12. Field Notes — The Beta Art Journal

| Alan | Değer |
|---|---|
| Canlı adres | `betaart.no/field-notes/` — **dikkat: `beta-art.com` değil, farklı bir domain** (`betaart.no`) |
| Kaynak | `index.html`, `post.html`, `script.js`, `styles.css` paylaşıldı (30.08.2026) |
| Amaç | Beta Art'ın dergi/blog'u — köken, yöntem, Norveç'te ışık, lisanslama ekonomisi üzerine denemeler |
| Bağlantı verdiği kardeş sayfalar | `../beta-art/index.html` ("the archive"), `../beta-art-business/index.html` ("Business") — yani bu üçlüde klasör adları `beta-art/` ve `beta-art-business/`, madde 4/6/7'nin `beta-art-privat/`/`beta-art-gallery-event/`/`beta-art-business/` adlandırmasından **farklı** |
| PROJECTMANIFEST.md'deki durumu | Manifesto bunu zaten biliyor ve **kaynak-inceleme malzemesi** olarak işaretlemiş: "üç proje adlandırmasıyla tam eşleşmiyor çünkü üçüncü mülk Galeri değil Journal... `source-review/intake-2026-08-30/three-sites-latest/` altında saklanıyor, üretim klasörlerine karıştırılmadı" |
| Durum | **referans**, kaynak sistemde zaten "üretime alınmadı" diye işaretli — yine de üçüncü bir domain (`betaart.no`) ortaya çıkardığı için not edildi |

## 13. BETA ART Private (dördüncü kod tabanı, "Privat" değil "Private")

| Alan | Değer |
|---|---|
| Kaynak | `index.html` (madde 4/12'den bağımsız, `../assets/styles.css` + `../assets/app.js` kullanıyor) + `verify/index.html` (BETA-ID doğrulama alt sayfası) — 30.08.2026 paylaşıldı |
| Yazım farkı | **"Private"**, madde 4'teki "Privat" değil — başlıkta, `<title>`'da, footer'da tutarlı biçimde "Private" yazıyor |
| Klasör yapısı | `private/index.html`, `private/verify/index.html`, kardeşi `business/`, paylaşılan `assets/styles.css`+`assets/app.js` — madde 4'ün `beta-art-privat/` veya madde 12'nin `beta-art/` adlandırmasından **farklı, dördüncü bir klasör şeması** |
| Doğrulama kapısı | **Sekiz** adım: Original, Identity, Capture, Rights, AI disclosure, Conflict gate, Provenance, C2PA — `ASSETSTATUS.md`'nin "beş kontrol"ünden ve "Beta proof chain"in altı adımından **farklı, üçüncü bir sayı** |
| BETA-ID doğrulama | `verify/` sayfası bir demo kayıt numarası (`BETA-PHOTO-DEMO-0001`) sorgulatıyor; sayfa `noindex`, "no production certificates are issued from this prototype" diyor |
| Durum | **referans** — hiçbir üst-belgede (`PROJECTMANIFEST.md` dahil) bu spesifik varyanttan söz edilmiyor, kaynağı/tarihi bilinmiyor |

## 14. `beta-art.com` kök alan adı — gerçek canlı içerik (30.08.2026 akşamı)

| Alan | Değer |
|---|---|
| Ne olduğu | Kullanıcının **birebir yapıştırdığı**, gerçek `https://beta-art.com/` kök sayfasının metni — ilk kez bir önizleme değil, kök alan adının kendisi. `EGRESS_BLOCKED` yüzünden bu ortamdan hâlâ doğrudan görülemiyor; yalnızca kullanıcının yapıştırdığı kadarı biliniyor. |
| Ayrıca gelen alt sayfalar | `/categories` (35 kategori, 5 bölüm: Global 16, Norveç-özel 5, Norveç sektörleri 5, Editoryal 5, Özel/Yeni 4), FAQ referans belgesi ("16 ENTRIES · HUMAN AUTHORED"), `/request-a-shoot` (özel çekim brief formu), sepet sayfası (Norveççe: "Handlekurv") |
| Yapı | **Tek, bütünleşik bir sayfa** — Hero → Verification (3 yöntem) → Collection (Volume I, 12 plaka) → Exhibitions & Events (3 sergi) → Photographer bio → Licensing (4 katman) → Request form → FAQ (16 soru) → Footer |
| **Önemli bulgu** | Bu sayfanın nav/footer'ında **"Business" veya "Galeri" bağlantısı yok** — yalnızca Archive (Collection/Verification/Photographer/Categories/Industries) ve Licensing var. Madde 9'daki "üç mülk hub" modelinin **kök alan adında karşılığı yok**; "Exhibitions & Events" madde 7'nin (Galeri) ayrı bir mülk olması varsayımının aksine kök sayfanın kendi içine gömülü bir bölümü. |
| Fiyatlandırma (kesinleşti) | Personal kr190'dan (sabit sayı — tutarlı). Commercial/Extended/Custom & Exclusive: **"Price on request"** (sayı yok — üç önceki varyanttan farklı, muhtemelen kasıtlı) |
| Doğrulama (kesinleşti) | **3 yöntem** (Method I/II/III: RAW arşivi → capture kaydı+C2PA → fotoğrafçı imzalı lisans) — madde 4'teki statik "Privat" prototipiyle **birebir örtüşüyor** |
| Plaka isimleri (kesinleşti) | First Light (2026.0142), Into the Pines (2026.0143), Sea of Fog (2026.0144), Still Water (2026.0145), PALM (2026.0146), Blue Hour Grid (2026.0147), Night Crossing (2026.0148), Golden Hour (2026.0149), Portrait in Amber (2026.0150, *Available*), The Maker (2026.0151, *Available*), Slow Morning (2026.0152), Low Tide (2026.0153) — 12'sinden yalnızca 2'si "Available", kalanı "Awaiting verified original" |
| Fotoğrafçı biyografisi | "84,000+ frames captured since 2012", teslimat 24 saat içinde, RAW dosya talep üzerine gösteriliyor |
| Rota listesi (kesinleşti) | `/#collection`, `/#verification`, `/#photographer`, `/categories`, `/industries`, `/#licensing`, `/#request`, `/privacy`, `/cookie-settings`, `/license-terms` (İngilizce) **ve** `/lisensbetingelser` (Norveççe — aynı sayfaya mı gidiyor belirsiz), `/kontakt` (footer'da "Angrerett og refusjon" etiketiyle — isim/URL uyuşmazlığı not edildi), `/request-a-shoot` |
| Detaylı karşılaştırma | `docs/beta-art/privat-icerik-analizi.md` — bu madde eklendiğinde o belge de güncellendi |
| Durum | **En yetkili kaynak.** Madde 4'ün (BETA ART Privat statik prototip) canlıdaki en yakın karşılığı bu — birleştirme kararında "son söz" bu olmalı. |

**Vercel proje ipucu (30.08.2026, henüz erişilemedi):** kullanıcı
`https://vercel.com/project-hxi/<proje>` biçiminde üç bağlantı paylaştı:
`beta-art`, `beta-art-archive`, `beta-art-private` — üçü de aynı takım
slug'ında (`project-hxi`), üçü de bir dağıtım URL'si değil, **Vercel proje
adı**. Bu oturuma bağlı Vercel hesabı yalnızca "BET - ART" takımını görüyor
(`team_xNtowH7U0jXQrI53DFJFzH2o`); `project-hxi` bu listede yok, üçü için
de `get_project` 403 Forbidden döndü, paylaşılabilir bağlantı oluşturma
da başarısız oldu, tahmini dağıtım adresi (`beta-art-archive.vercel.app`)
`WebFetch` ile de `EGRESS_BLOCKED`. Yani üçü de **bu hesabın erişimi
olmayan başka bir Vercel hesabı/takımında**. Kod kaynağı hâlâ
doğrulanamadı ama artık üç proje adı var — kullanıcı panelde
Settings → Git'e bakıp bağlı GitHub deposu adını (`owner/repo`) paylaşırsa
`add_repo` ile doğrudan koda bakılabilir; bu Vercel MCP bağlantısından
tekrar deneme aynı sonucu verir.

## 15. Bu oturumda yayınlanmış artifact'ler — 30.08.2026 envanteri

Bu depoyla ilgisiz görünse de, bu Claude Code oturumu boyunca (özetlemeden
önceki kısımda) `Artifact` aracıyla 8 Beta Art ile ilgili sayfa yayınlanmış
ve `docs/`e hiç işlenmemiş. `@ARTIFACTS` ile listelenip okundu, önemli
bulgular:

**"BETA ART — Project Catalogue"** (yayınlanmış artifact, 30.08.2026) — bu
oturumun kendi ürettiği, madde 1-14'ten daha düzenli bir 12-proje kataloğu,
kod sistemiyle (`BA · 2026 P · 001` gibi):

| Kod | Proje | Durum | Konum |
|---|---|---|---|
| P·001 | Beta Art Privat | ● Yayında (beta-art.com) | React+Vite+Supabase+C2PA |
| P·002 | Beta Art Privat — Statik | ◐ Geliştirme | `beta-art-static/beta-art/` (yerelde yok, aşağı bkz.) |
| F·001 | Beta Photo | ◐ Geliştirme (MVP) | `project-hxi` |
| B·001 | Beta Art Business | ◐ Geliştirme (ön lansman) | `beta-art-static/beta-art-business/`, 9 makale, 36 doküman (yerelde yok) |
| G·001 | Galleri og Utstilling Event | ○ Planlandı, Sonbahar 2026 Oslo | `beta-art-static/beta-art-gallery-event/` (yerelde yok) |
| J·001 | Field Notes — The Beta Art Journal | ● Yayında | `project-hxi` |
| N·001 | Beta Art Norway Archive | ◐ Geliştirme | `project-hxi` |
| N·002 | Beta Art Industry Archive | ◐ Geliştirme | `project-hxi` |
| Q·001 | Beta Art QR (v3) | ● Yayında | `project-hxi` |
| A·001 | Beta Art Archive Platform (dahili, noindex) | ● Yayında | `project-hxi` |
| A·002 | Beta Art Platform (iş ortağı arayüzü) | ● Yayında | `project-hxi` |
| T·001 | Beta Art v8 — Airo SSR | ◎ Spesifikasyon | React+Airo SSR+Tailwind+shadcn, 42 Radix bileşeni |
| T·002 | Beta Art v3 — Referans | ◎ Referans | beta-art.com'un önceki tasarım iterasyonu |

**Bu, `project-hxi`'nin (madde 14'teki Vercel ipucu) yalnızca `beta-art`/
`beta-art-archive`/`beta-art-private` değil, en az 8 ayrı Beta Art
projesini barındıran ana hesap olduğunu doğruluyor** — F·001, J·001,
N·001, N·002, Q·001, A·001, A·002 hepsi aynı hesapta. Erişim durumu
değişmedi (hâlâ 403/erişilemez), ama kapsamın büyüklüğü artık netleşti.

**Kayıp yerel dosyalar:** kataloğun P·002/B·001/G·001 satırlarındaki
`beta-art-static/…` yol adları bu konteynerin dosya sisteminde **yok**
(`find /` ile arandı, sonuç yok). Ya bu bir konteyner/oturum sıfırlamasında
kayboldu, ya da bu yollar hiç dosya üretilmeden yalnızca planlanan konum
olarak yazıldı — hangisi olduğu belirsiz. Yayınlanmış artifact'lerin
kendisi (aşağıda) sunucu tarafında hâlâ duruyor, o yüzden içerik tamamen
kayıp değil, ama yerel kaynak dosyaları (varsa) geri getirilemez.

**Logo/mark tutarsızlığı — "TEK LOGO" kuralına aykırı bir bulgu:** iki ayrı
artifact iki farklı "mark" gösteriyor:
- **"Beta Art Brand"** kanonik bir birincil mark tanımlıyor: halka (r=44) +
  4 kiriş "blade" + merkez nokta (`#8B1515`), gerçek dosya yollarıyla
  (`brand/beta-art/master/`, `beta-art/public/assets/brand/`) — kesinleşmiş
  gibi sunulmuş.
- **"Beta Art Logos"** ise dört **kararsız** konsept sunuyor (Plate/Field/
  Glyph/Horizon) — "Studio draft" etiketli, henüz seçim yapılmamış.
- Bu oturumun kendi ürettiği `beta-art-privat.html`/`beta-art-hub.html`
  (madde 10/11, React Privat artifact) ise **üçüncü, farklı bir mark**
  kullanıyor: halka + 6 kollu pusula gülü (asterisk) deseni + merkez nokta.

Üçü aynı anda doğru olamaz — kullanıcının "TEK LOGO KULLANIYORUZ BUTUN
BETA ART PROJELERINDE" talimatı bu üç mark'tan **hangisinin gerçekten
kanonik olduğu** netleşmeden karşılanmış sayılamaz. Şu an elde üç aday var,
sıfır kesinleşmiş karar.

**Doğrulanan iyi haber:** **"Beta Art Archive"** (4891c4bd) ve **"BETA ART
Business"** (be610802) artifact'leri incelendi — ikisi de React uygulaması.
"Beta Art Archive"nin metni madde 14'teki gerçek `beta-art.com` yapıştırmasıyla
**birebir eşleşiyor** ("Price on request", "Portrait in Amber", FAQ soruları
vs.) — yani "BU SAYFAYI GELISTIRIYORUZ" talebi bu oturumda zaten bir React
yeniden-üretimiyle karşılanmış, `beta-art-hub.html` taslağı gereksiz kalmış.
"BETA ART Business" ise CLAUDE.md'deki mevcut Business tanımıyla tutarlı,
ek detaylar taşıyor: "Databehandleravtale" (veri işleyen sözleşmesi), faz/
bölge/durum filtreli demo arşiv, ve fiyatlandırma notu — "Tallene er
hypoteser for kundesamtaler, ikke endelig prisliste" (rakamlar müşteri
görüşmesi için hipotez, kesin fiyat listesi değil) — CLAUDE.md'nin "rakamlar
örnek" ilkesiyle birebir örtüşüyor.

**30.08.2026, gece — "Beta Art Archive" güncellendi, logo çakışması bu
artifact için çözüldü.** Kullanıcı `@BET ART LOGOLARINI KULLAN` dedi ve
kardeş bir oturuma (`session_01VJ9qrepAV3P4ZV9fVFxovR`, "Beta art logo
tasarımları", dal `claude/beta-art-logo-designs-vnxhwn`) işaret etti — o
oturum tam olarak "Beta Art Logos" ve "Beta Art Brand" artifact'lerini
üretmiş ve şu an "Herhangi birini güncellememi veya birleştirmemi ister
misin?" diye kullanıcı girdisi bekliyor (durum: SESSION_STATUS_BUCKET_BLOCKED).
Bu, üç mark adayından **"Beta Art Brand"**'ı (halka r=44 + 4 kiriş + merkez
nokta `#8B1515`) kanonik ilan ediyor. Buna göre "Beta Art Archive" artifact'i
sıfırdan (React kaynağı da kayıptı) yeniden kuruldu:
- `src/components/SealMark.tsx`'e "Beta Art Brand" artifact'inin gerçek
  SVG'si birebir kopyalandı (kaynak dosyadan `grep`lendi, elle çizilmedi).
- Kök sayfaya ek olarak dört yeni sayfa eklendi — hepsi madde 14'teki
  birebir yapıştırılan metinden: `/categories` (35 kategori, 5 bölüm),
  FAQ referans belgesi (16 soru, kategori filtreli sekmeler), `/request-a-shoot`
  (brief formu), sepet sayfası (Norveççe metin korunarak).
- Plaka `category` (landscape/city/portrait) etiketleri gerçek sayfanın
  düz metninde görünmüyordu (yalnızca filtre düğmeleri görünüyordu) — bu
  yüzden statik "Privat" prototipinden (madde 4) yeniden kullanıldı, kod
  içi yorumla kaynağı işaretlendi; uydurulmadı.
- `Select`/`Accordion`/`Checkbox`/`Sheet` yerine düz `<select>`/`<details>`/
  `<input type=checkbox>` kullanıldı — Privat React inşasında (madde 10/11)
  aynı Parcel sürümünün Radix `@radix-ui/primitive` bundling hatasına daha
  önce çarpılmıştı, bu bilgiyle önceden kaçınıldı.
- Güncellenmiş artifact aynı URL'e yayınlandı:
  https://claude.ai/code/artifact/4891c4bd-69ae-4884-82eb-50153c1a91b5

**Paylaşılan tasarım sistemi belgesi:** kullanıcı "BU STILL BUTUN BETA
PROJELERINDE KULLANALIM" dedi — mühür/renk/tipografi/yazım kararları artık
`docs/beta-art/tasarim-sistemi.md`'de tek kaynakta, sayfaya özgü olmayan
paylaşılan bir belge olarak duruyor (kullanıcı talimatı: "SADECE BU SAYFA
ICIN DUSUNCUKLERIMIZ KALSIN DIGER ILGILI OLANLARI DIGER BETA PROJELERINE
AKTARALIM"). O belgede: mühür SVG'si, renk tablosu, Fraunces+Inter+
JetBrains Mono eşleşmesi, "klarspråk" (kısa/sade dil) yazım kuralı, ve
8-dil i18n modeli.

**"BETA ART Business" (be610802) stil güncellemesi:** React kaynağı
kayıp olduğu için içerik/yapıya dokunulmadı — yalnızca Google Fonts
(Fraunces+JetBrains Mono) ve mühür SVG'si CSS override ile enjekte edildi
(`.brandmark` sınıfı arka plan görseli olarak). Aynı URL'e yayınlandı.

**"Beta Art Archive" — nav düzeltmesi ve 8 dilli arayüz (30.08.2026 gece):**
- Kullanıcı GoDaddy Airo Builder önizlemesinin (`68v0scym3h.preview.c40.airoapp.ai`)
  gerçek metnini paylaştı — nav'da ayrı bir "Events" bağlantısı (`#events`)
  ve "Contact"ın aslında `/request-a-shoot`'a gittiğini doğruladı (mailto
  değil). İkisi de düzeltildi.
- Kullanıcı 8 dil istedi: Norveççe, Türkçe, İngilizce, İtalyanca, Fransızca,
  İspanyolca, Portekizce, Almanca. `docs/beta-art/tasarim-sistemi.md`'de
  kararlaştırılan iki-katmanlı modelle kuruldu: İngilizce (kaynak, birebir)
  ve Norveççe (gerçek pazar) tam içerik katmanı; kalan altı dil arayüz
  kabuğu (nav/buton/etiket/form/footer, ~90 anahtar × 8 dil) tam çevrili,
  büyük içerik blokları (35 kategori, 16 SSS, 12 plaka detayı, lisans
  madde metinleri, sergi/fotoğrafçı metni) şimdilik İngilizceye düşüyor —
  eksik anahtar sessizce İngilizceye düşmesi QBLOGG'daki gibi bir güvenlik
  ağı, çözüm değil. Tam içerik çevirisi (özellikle Norveççe) sonraki aşama.
- Mastheadta dil seçici (`<select>`, LANGS listesi) eklendi, tercih
  `localStorage`'da (`beta-art-lang`) kalıcı.
- Footer'daki Norveççe hukuk bağlantı etiketleri (Personvernerklæring vb.)
  **kasıtlı olarak çevrilmedi** — gerçek `beta-art.com` bunları İngilizce
  sayfasında bile Norveççe gösteriyor, bu bir çeviri eksikliği değil.

**Aynı gece — "Beta Art Archive" pazaryerine dönüştü (dört turda netleşen talep):**
1. "BU SAYFADA INSANLAR RESIMLERINI YUKLEYIP SATABILIRLER" — ilk hâliyle
   çok-katkıcılı bir pazaryeri gibi okunuyor, gerçek `beta-art.com`'un
   "no anonymous uploads" (madde 14) ifadesiyle çelişiyor gibi görünmüştü.
2. "VERIZE EDEBILIRLER" — çelişki çözüldü: yükleyenler **doğrulamadan**
   geçiyor (aynı 3 yöntem), "anonim değil" ile "çoklu fotoğrafçı" birbirini
   dışlamıyor.
3. "BEN KENDI FOTOGRAFLARINI KENDI SAYFAMDA SATACAGIM" — kullanıcı kendi
   fotoğraflarını da aynı akıştan satacağını netleştirdi.
4. "PROFESYONEL FOTOGRAFCILARDA SATABILIR ONLARIN SATISLARINDAN KOMISYON
   ALMIS OLUYORUZ YANI" — son hâl: hem sahibi hem dışarıdan profesyonel
   fotoğrafçılar satabilir, Beta Art her satıştan komisyon alır. Komisyon
   **yüzdesi uydurulmadı** — sitenin kendi "Price on request" disipliniyle
   tutarlı olarak "şartlar doğrudan sizinle belirlenir" deniyor.

Kurulan: `/sell` sayfası (nav'a "Sell" eklendi) — Ad/E-posta/Portfolyo
bağlantısı/Kamera-ekipman/Mesaj formu, 3 adımlı süreç açıklaması (gönder →
doğrulan → yayına gir ve öde), "Yeni program" notu. Her plakaya
`photographer` alanı eklendi (mevcut 12 plaka için gerçek site isim
vermediğinden marka adı "Beta Art" kullanıldı, kişisel isim uydurulmadı) —
koleksiyon kartlarında artık görünür.

**Aynı gece — plaka detay sayfası: "provenance zaman çizelgesi"**
Kullanıcı: "Collection — statik ızgara değil, her eserin sayfası bir
'provenance zaman çizelgesi' gösteriyor: kaynak → çekim bağlamı →
doğrulama adımı → sergi." Kurulan: her plaka artık tıklanabilir, kendi
sayfasında 4 aşamalı bir zaman çizelgesi gösteriyor — **hiçbiri uydurulmadı**:
kaynak/çekim bağlamı zaten plaka verisinde vardı; doğrulama durumu plakanın
`status`'üne göre (available→3 yöntem tamam, pending→yalnızca ilk adım);
sergi bağlantısı gerçek: "Volume I — Opening Exhibition" açıkça "Twelve
original prints" diyor, yani 12 plakanın hepsi doğrulanmış olarak o
sergiye bağlı — bu çıkarım değil, doğrudan kaynak metinden.

**Aynı gece — iki küçük, açıkça yeni ek:** kullanıcının "Events" (doğrulama
anının sahnede canlı gösterilmesi — "ritüel, kağıt iş değil") ve
"Photographer" (fotoğrafçının kimliğinin de doğrulanması — 2026'da
yapay-zekâ sahte kimliklerine karşı güncel bir konumlanma) notları,
Exhibitions bölümüne bir "Verification, live." kutusu ve Photographer
bölümüne bir "✓ Identity verified" rozeti olarak eklendi — ikisi de kodda
ve görsel olarak gerçek site metninden **açıkça ayrı** işaretli.

**Aynı gece, hemen ardından — Artsy referansı ikinci kez gelince kuruldu.**
Kullanıcı aynı sanat pazaryeri navigasyon örneğini (Log In/Register,
Artworks/Artists/Auctions/Galleries/Events/News/Price Database, Buy/Sell)
tekrar gönderince bunu "şimdi kur" olarak okudum. İki riskli öğe
(**Auctions**, **Price Database**) için önce sordum:
- **Auctions**: kullanıcı "Hayır, atla" dedi — sitenin sabit fiyat/lisans
  modeliyle ("Price on request", pazarlıkla) çelişiyor, kurulmadı.
- **Price Database**: kullanıcı "Kategori bazlı fiyat aralığı rehberi"
  seçti — gerçek satış verisi değil, mevcut 4 lisans katmanının nasıl
  fiyatlandığını açıklayan bir bilgi sayfası olarak kuruldu.

Kurulan üç yeni sayfa (`/artists`, `/prices`, `/auth`), hepsi nav'a
eklendi, "profesyonel tasarım" ve "insan psikolojisi" (güven sinyalleri,
bilişsel yük) talimatlarıyla:
- **Artists**: doğrulanmış fotoğrafçı dizini — şu an tek kayıt ("Beta Art",
  ✓ rozetiyle), ölçeklenecek şekilde kurulu; altta "fotoğrafçı olarak
  katıl" CTA'sı `/sell`'e bağlanıyor.
- **Prices**: 4 lisans katmanının (Personal/Commercial/Extended/Custom)
  nasıl fiyatlandığını açıklıyor — "Guide — not a live price list" etiketi
  ve "neden sabit rakam yok" açıklamasıyla; **hiçbir rakam uydurulmadı**,
  yalnızca gerçek Personal fiyatı (kr190) ve "Price on request" mantığı
  yeniden anlatıldı.
- **Auth**: giriş/kayıt sekmeli önizleme formu (diğer formlar gibi veri
  göndermiyor) — Sell akışının artık bir hesap kavramı gerektirdiğini
  yansıtıyor.

**Nav taşma düzeltmesi:** 11 öğeye çıkan üst menü 1400px'te "Log in"
yazısının satır kırmasına sebep oldu — ekran görüntüsüyle yakalandı,
mobil menü kesme noktası `lg`'den `xl`'e taşınarak (ve `Industries`
birincil nav'dan çıkarılıp yalnızca footer'da bırakılarak) düzeltildi.

**Aynı gece — iş geliştirme (BD) kalite geçişi.** Kullanıcı "Business
developer olsan bu sayfada neyi değiştirirdin" diye sordu. Üç gözlem,
üçü de rakam uydurmadan kuruldu:
1. **Koleksiyonun %83'ü "Awaiting verified original"** — ilk izlenimde
   "iş bitmemiş" gibi okunuyordu. Collection başlığının altına, bunun
   editoryal bir disiplin olduğunu açıklayan bir cümle eklendi ("Volume I
   releases one verified plate at a time...").
2. **En güçlü güven rakamı ("84,000+ frames since 2012") üçüncü
   paragrafta gömülüydü.** Hero'nun hemen altına, zaten var olan dört
   gerçek rakamı (84,000+ kare, 2012, 3 yöntem, 12 plaka) taranabilir bir
   şerite çıkaran `StatStrip` bileşeni eklendi — hiçbir yeni sayı
   uydurulmadı.
3. **"Neden stok fotoğraf değil" hiç söylenmiyordu.** Verification
   bölümünün altına kısa, dürüst bir karşılaştırma kutusu eklendi.

npm run check dışı bir hata: Almanca çeviride düz tırnak (`"`) JS dize
sınırlayıcısıyla çakıştı, build'i kırdı — düzeltme: tipografik tırnak
(`„…"`) kullanıldı.

**Aynı gece — çok disiplinli ekip merceğiyle üçüncü kalite geçişi.**
Kullanıcı 9 rollük bir "web sitesi ekibi" çerçevesi paylaşıp "bu projede
gerekli düzeltmeleri yap" dedi. Dokuz rolü simüle etmek yerine her
merceğin gerçekten neyi değiştireceğine bakıp üç somut düzeltme kuruldu:
- **SEO**: SPA hiç `<title>` güncellemiyordu (her sayfa aynı statik
  başlığı taşıyordu), `<meta name="description">` ve OG etiketleri hiç
  yoktu. `DocumentTitle` bileşeni eklendi (rotaya göre başlık), `index.html`'e
  description/theme-color/OG etiketleri eklendi.
- **Erişilebilirlik**: 5 süs amaçlı gradient görsel bloğuna (gerçek
  fotoğraf değil, yer tutucu) `aria-hidden="true"` eklendi — ekran
  okuyucular artık anlamsız bir renk geçişini "görsel" olarak okumuyor.
- **Servis tasarımı**: sepet ikonu/sayfası vardı ama hiçbir yerde "sepete
  ekle" eylemi yoktu — tamamen kopuktu. Yalnızca `status: "available"`
  (doğrulanmış, sabit fiyatlı Personal) plakalar için "Add to cart"
  eklendi — Commercial/Extended/Custom "Price on request" olduğu için
  talep formunda kalmaya devam ediyor, bu bilinçli bir ayrım. `cartContext`
  (localStorage'da kalıcı), mastheadta sayaç rozeti, gerçek sepet
  listesi/toplam/kaldırma kuruldu.

Ardından kullanıcı ayrı bir "Konsept Araştırma ve Değerlendirme Ekibi"
çerçevesi (11 rol, 10 adımlı süreç, 100 puanlık rubrik) paylaştı — bu,
web sitesini değil, **Beta Art'ın iş fikrinin kendisini** puanlamak için.
Bu değerlendirme ayrı bir sohbet yanıtında yapıldı (kod değişikliği değil),
burada kayıt altına alınmıyor çünkü bir web sitesi/kod kararı değil bir
iş değerlendirmesi — istenirse ayrı bir belgeye dökülebilir.

**Aynı gece, hemen ardından — mark kararı geri alındı.** Kullanıcı üç
**gerçek üretilmiş** OG/sosyal görsel paylaştı — Business, Field Notes ve
"Three Properties" hub sayfaları için, hepsi `beta-art.com` filigranlı.
Üçü de **6 kollu pusula/diyafram deseni** kullanıyor (halka + altı kısa
açılı çubuk + kırmızı merkez nokta) — **"Beta Art Brand" artifact'inin
4-kirişli mark'ı DEĞİL**. Bu, o artifact'in kendi "kanonik" etiketinden
daha güçlü bir kanıt: üç ayrı gerçek çıktıda fiilen kullanılan mark bu.

Karar geri alındı: `SealMark.tsx` bu oturumun kendi `beta-art-privat.html`/
`beta-art-hub.html` taslaklarında zaten kullandığı 6 kollu deseni geri
aldı (aynı path verisi, birebir) — dolayısıyla üç mark adayından biri artık
**gerçek üretim kanıtıyla doğrulanmış**: halka (r=46, sw=4) + altı kısa
çubuk (`M50 30 75.81 11.92M67.32 40 84.99 47.86…`) + merkez nokta
(`#8B1A1A`, r=7). "Beta Art Brand" ve "Beta Art Logos" artifact'leri
(madde 15 üstü) artık **kullanılmayan keşif** olarak okunmalı, kanonik
değil. Güncellenmiş artifact yine aynı URL'e yayınlandı.

**31.08.2026 — Geri bildirim alanı eklendi (iş fikri puanlamasındaki
kanıt boşluğuna doğrudan yanıt).** "Konsept Araştırma ve Değerlendirme
Ekibi" rubriğiyle iş fikri puanlanırken "Hedef kitlenin talebi" 15 puanlık
kalemi **BİLİNMİYOR** işaretlendi — gerçek kullanıcı görüşmesi/doğrulama
verisi yok. Kullanıcı doğrudan bu satıra yanıt yazdı: "Hiç gerçek kullanıcı
görüşmesi VE GERI BILDIRIM ALANI ACALIM WEB SAYFASINDA." Buna karşılık
Beta Art Archive artifact'ine yeni bir `/feedback` sayfası eklendi: 1-5
kullanım olasılığı, "burada lisans için öder miydin" (Evet/Hayır/Fiyata
bağlı), açık yorum, isteğe bağlı e-posta. Bu oturumda arka uç yok — gönderim
`previewNotice` deseniyle (diğer tüm formlarla aynı) önizleme kalıyor, gerçek
veri toplamıyor; sayfa metni bunu açıkça söylüyor ("Nothing here is scripted
or filtered"). Nav (masthead + mobil) ve footer'a bağlantı eklendi, 8 dilin
hepsine `navFeedback`/`feedback*` anahtarları eklendi. Bu, "hedef kitle
talebi bilinmiyor" boşluğunu **kapatmıyor** — gerçek ziyaretçi yanıtı
toplanana kadar boşluk açık kalır — ama artık boşluğu kapatmaya yönelik
gerçek bir mekanizma var, uydurma bir sayı değil.

**31.08.2026 — Kurucu geçmişi: gerçek bir köken hikâyesi eklendi.**
Konsept puanlamasındaki "Kurucu ve ekip uyumu BİLİNMİYOR" satırına
"Kurucunun fotoğrafçılık geçmişi/ağı bu oturumda doğrulanabilir" yanıtı
geldi; ben icat etmemek için kullanıcıdan somut bilgi istedim (AskUserQuestion,
kullanıcı seçenekleri geçti, doğrudan yazdı): "İlk fotoğraf makinasını
henüz 7 yaşındayken babamın resim albümlerini bulduğumda gördüğüm şu
resimde babamın elindeki foto idi." Bu gerçek, kullanıcının kendi verdiği
bir bilgi — `Artists.tsx`'teki `artistsFoundingBio`'ya ikinci cümle olarak
eklendi (8 dilde), kurucu isimsiz/cinsiyetsiz kalacak şekilde ("they/their"),
Roman dillerinde bu cümlenin ilk cümlesinden gelen dilbilgisel eril isim
uyumu (fondateur/fondatore/fundador/Gründer) korunarak. Kod yorumunda
kaynağı ve tarihi belirtildi. Ayrıca kullanıcı bir vitrindeki eski
rangefinder kamera fotoğrafı da paylaştı — ikinci fotoğrafın ilk fotoğraftaki
kamerayla ilişkisi netleşmedi, siteye işlenmedi.

**31.08.2026 — Köken hikayesi Adobe Express'te 3 kareli görsele döküldü.**
`/STORY TELLE` + `@ADOBE` isteği netleştirildi (AskUserQuestion): sıfırdan
tasarım, Beta Art marka sistemiyle, 3 kareli mini hikaye dizisi (1080×1080).
`create_visual_design_express_skill` playbook'u izlendi; hesap `auth`
doğrulandı. Yazı tipleri Adobe Fonts kütüphanesinde birebir yoktu —
**Fraunces→Spectral ExtraBold** (benzerlik eşleşmesi, kanonik siteninkiyle
aynı değil) ve **JetBrains Mono→IBM Plex Mono** ikame edildi, Inter 18pt
birebir bulundu. SealMark'ın gerçek path verisi (ring+6 spoke+kırmızı
merkez) satır içi SVG olarak kullanıldı — uydurma yeni bir mark değil.
Kullanıcının paylaştığı gerçek aile fotoğrafı (babası, kamerayla) **görsele
gömülmedi** — bu özel bir aile fotoğrafı, açık izin olmadan yayına
dönüştürülecek bir varlığa gömülmesi doğru değil; onun yerine metin (aynı
`artistsFoundingBio` cümlesi, 3 kareye bölünmüş) kullanıldı. Export başarılı,
3/3 slayt, içerik/yazı tipi kaybı yok. Express dokümanı: `urn:aaid:sc:EU:
2f5cd884-521d-4744-9ff7-9638b65d4cf1`.

**31.08.2026 — Fotoğrafçılar kendini tanıtabilir (kapsamı daraltıldı).**
"BU SAYFAYA FOTOGRAFCILAR KENDI BLOGG BOLUMDE KENDILERINI TANITABILIRLER"
isteği AskUserQuestion ile netleştirildi: tam bir blog sistemi değil (ayrı
yazı listesi/URL, veri modeli gerektirir — reddedildi), `Sell.tsx`
formuna "Introduce yourself" alanı eklendi. Onaylanan fotoğrafçının bu
metni `/artists`'te adının yanında görünecek — `artistsFoundingBio`'nun
zaten kullandığı aynı slot, Beta Art'ın kendi biyografisiyle aynı desen.
`artistsJoinBody` da "kendi cümlelerinizle" notunu almak üzere 8 dilde
güncellendi.

**31.08.2026 — Nav/footer gerçek kök sayfayla yeniden karşılaştırıldı.**
Kullanıcı `beta-art.com` kök sayfasının header nav + footer'ının güncel
metnini tekrar birebir yapıştırdı ("GUNCELLE WEB SAYFASINI"). Karşılaştırma
iki fark buldu: (1) gerçek header nav'da **Industries** ve **Contact**
(→ `/request-a-shoot`) var, bizim primary nav'da yoktu (yalnızca footer'da
Industries vardı) — ikisi de eklendi (Contact, `request-a-shoot` sayfasına
yönlendiriyor, gerçek sitenin kendi yönlendirmesiyle aynı). (2) gerçek
footer'ın Archive sütununda **Events yok** (header nav'da var, footer'da
yok) — bizim footer'ımızdan Events kaldırıldı, header'da kaldı. Hero
tagline (`footerTagline`) ve `/request-a-shoot` form alanları (Name/Email/
Company/Project type/Location/Preferred date/Budget/Brief) zaten birebir
eşleşiyordu, değişmedi. Kendi eklerimiz (Artists/Prices/Sell/Feedback)
sıralı listelerin sonuna eklenmiş durumda, kaynaklı öğelerle karışmıyor.

---

## Bilinen isim çakışmaları (birleştirme kararından önce çözülmeli)

- **"Privat"** üç farklı şeyde geçiyor: `beta-privat/` (madde 3, muhasebe), "BETA ART Privat" BAP-01 (madde 4, fotoğraf arşivi). Kullanıcı 30.08'de bunların ayrı olduğunu doğruladı.
- **Barındırma modeli çelişkisi — kısmen çözüldü**: madde 4/6/7'nin kendi belgeleri (`ROUTE-CONFIG.md`, `DEPLOYMENT.md`) yol-tabanlı (`/privat/`) diyor; madde 8 (DNS admin) alt-alan-adı-tabanlı (`archive.beta-art.com`) öneriyor. **Madde 14'te görülen gerçek kök alan adı ikisini de kullanmıyor** — Archive/Privat içeriği doğrudan `beta-art.com` kökünde, yol/alt-alan-adı ön eki olmadan yayında. Business/Galeri'nin nerede olduğu (ayrı alan adı mı, hiç yayında değil mi) hâlâ bilinmiyor.
- **BETA ART Privat/Private için dört ayrı kod tabanı var**: (1) statik HTML prototip "Privat" (madde 4) — **madde 14'teki canlı kök alan adıyla fiyatlandırma hariç neredeyse birebir örtüşüyor, en güçlü aday**, (2) React+Vite+Supabase "Final Work v2" (madde 5), (3) GoDaddy Airo App Builder (Vite+React+TS, kendi içerik eklentisi, madde 4'e bağlı — kullanıcı 30.08'de bunu temel ilan etti), (4) statik HTML "Private" — `assets/app.js` (madde 13, kaynağı bilinmiyor). Diğer üçünün akıbeti (tamamen bırakılıyor mu, referans mı kalıyor) henüz netleşmedi.
- **İki farklı domain aynı markayı taşıyor**: `beta-art.com` (madde 4/6/7/8/9/**14 — artık canlı içeriğiyle doğrulandı**) ve `betaart.no` (madde 12, Field Notes). `beta-art.com` artık gerçek, çalışan bir üretim sitesi olduğu doğrulandı; `betaart.no`'nun hâlâ yayında olup olmadığı bilinmiyor.
- **Doğrulama kapısındaki adım sayısı — kök alan adı 3'ü doğruladı**: `ASSETSTATUS.md` "beş doğrulama kontrolü" diyor, önizleme sitesindeki "Beta proof chain" altı adım (Human→Camera→RAW→Edit→Rights→Licence), madde 13'teki kapı sekiz adım (Original/Identity/Capture/Rights/AI disclosure/Conflict gate/Provenance/C2PA). **Madde 14'teki gerçek kök alan adı 3 adım kullanıyor (Method I/II/III), madde 4'ün statik prototipiyle birebir aynı.** Bu artık en yetkili sayı — 5/6/8 adımlı listeler farklı taslak aşamalarına ait olmalı.
- **"Üç mülk" modeli kök alan adında görünmüyor**: madde 9'daki hub sayfası Privat/Galeri/Business'ı ayrı mülkler olarak listeliyordu. Madde 14'teki gerçek `beta-art.com` kökü bunun yerine **tek, bütünleşik bir Archive/Privat sayfası** — Business veya Galeri'ye nav/footer'da hiç bağlantı yok, "Exhibitions & Events" ayrı bir mülk değil kök sayfanın bir bölümü. Business ve Galeri'nin gerçekte nerede/yayında olup olmadığı hâlâ **bilinmiyor**.

## Sıradaki adım

Kullanıcı talimatı: önce bu katalog (bu belge), **sonra** hangi projelerin
birleştirileceğine karar verilecek. 10 ve 11 numaralı satırlar 30.08'de
madde 4'e (BETA ART Privat) bağlandı — hepsi aynı GoDaddy Airo venture'ı.
**30.08 akşamı madde 14 eklendi**: kullanıcının birebir yapıştırdığı gerçek
`beta-art.com` kök içeriği, madde 4'ün (statik "Privat" prototip) en yakın
canlı karşılığı olduğunu gösterdi — fiyatlandırma (Personal sabit, üstü
"Price on request") ve doğrulama adım sayısı (3) artık bu kaynaktan
kesinleşti. Kalan açık soru: Business (madde 6) ve Galeri (madde 7) gerçek
kök alan adında hiç görünmüyor — bunlar yayında mı, hiç mi yayınlanmadı,
yoksa ayrı bir alan adında mı, bilinmiyor.

**Açık engel:** madde 4 için "temel" ilan edilen GoDaddy Airo sayfasının
içeriği bu ortamdan görülemiyor (`EGRESS_BLOCKED`, oturum açma da gerekebilir).
Kök alan adının kendisi de aynı sebeple doğrudan görülemiyor — yalnızca
kullanıcının yapıştırdığı kadarı biliniyor (madde 14).
