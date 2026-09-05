# QBLOGG — proje günlüğü

Projenin her aşaması ve yapılanlar bu dosyaya işlenir (kullanıcı talimatı,
22.08.2026). Yeni bir aşama kapandığında buraya tarihle eklenir; ayrıntılı iş
listesi `ROADMAP.md`'de, teknik kararların gerekçeleri `docs/` altındaki ilgili
belgelerde durur. Bu dosya hikâyeyi anlatır: ne yapıldı, neden, ne durumda.

## Konsept — QBLOGG nedir

Şirketlere içerik hattı satan bir stüdyo: tek araştırmadan yedi çıktı
(blog yazısı, LinkedIn serisi, sosyal içerik, newsletter, SEO makalesi, kısa
video senaryosu, YouTube taslağı) — on dilde. Hedef müşteri, içerik ekibi
olmayan KOBİ ve SaaS şirketleri; ikincil kitle stüdyoya katılacak yazarlar.
Sitenin tek işi ziyaretçiye **brief formunu doldurtmak**. Gelir modeli: proje
bazlı (tek makale) + tekrarlayan (aylık paketler) + ortaklık bağlantıları.
Paket fiyatları örnek başlangıç fiyatıdır ve sitede böyle işaretlenir.

## Web sayfası nasıl planlandı

**Tek dönüşüm hedefi.** Site trafik toplamak için değil, ziyaretçiye **brief
formunu doldurtmak** için planlandı. Her sayfanın bu hedefe giden yolda bir
rolü var; hedefe hizmet etmeyen özellik eklenmedi ("önce sadelik" ilkesi).

**Bilgi mimarisi — 7 sayfa, 7 rol:**

| Sayfa | Rolü |
|---|---|
| `index` | İkna hattı: hero (vaat) → hizmetler → "tek araştırmadan yedi çıktı" akışı → paketler → son yazılar (kanıt) → bülten |
| `work` | Dönüşüm noktası: marka briefi + yazar başvurusu, süreç, SSS |
| `blog` | Trafik ve güven: arama + kategori filtresiyle yazı listesi |
| `post` | Derinlik: tek yazı, kaynakça, benzer yazılar, yazı sonu teklif köprüsü |
| `gizlilik` / `kosullar` | Güven ve hukuk (TR + EN) |
| `404` | Kaybolan ziyaretçiyi ana sayfaya döndürür |

Ana sayfadaki sıralama bilinçli: önce vaat, sonra somut hizmetler, sonra
işleyiş kanıtı, en son fiyat — ziyaretçi fiyatı gördüğünde değeri zaten
görmüş oluyor.

**Teknik plan — neden çatısız?** Saf HTML+CSS+JS, sıfır bağımlılık:
site her statik sunucuya olduğu gibi yüklenir, kırılacak derleme zinciri
yok, bakım maliyeti sıfıra yakın, sayfa yükü küçük (ana sayfa tel üzerinden
~170 KB). Ödünleşim de bilinçli kabul edildi: dil değişimi istemcide
kaldığı için çok dilli SEO tam verim vermiyor; kalıcı çözüm (ön-render)
ROADMAP'te.

**Çok dillilik planı.** 10 dil; görünen her metin sözlükten (`data-i18n`),
HTML'deki Türkçe yalnızca JavaScript kapalıyken görünen yedek. İki katmanlı
içerik: tr/en tam makale, kalan sekiz dil özet katmanı — bu bir eksik değil
tasarım; on dilde tam makale bakım yükü kaliteyi düşürürdü. Arapça için tam
RTL: yön bağımlı CSS yazılmaz (`margin-inline-start` gibi mantıksal
özellikler).

**Tasarım sistemi planı.** Renkler ve yazı boyutları tek yerden
(`:root` değişkenleri) — koyu tema kendiliğinden çalışır. Emoji yasak, her
ikon satır içi SVG (marka üç işletim sisteminde aynı görünür). Kontrast
kuralları ölçülüdür: aqua beyaz üzerinde metin olamaz (1,8:1), metin için
koyulaştırılmış ton var. Ayrıntı: `docs/tasarim-sistemi.md`.

**Güven katmanı planı.** İddia varsa kaynak görünür (yazı başına en az üç
kaynak zorunlu), her yazının özgün katkısı tek cümleyle işaretli, fiyatlar
"örnek" ibaresiyle sunulur — abartılı iddia bu işte en pahalı hata sayıldı.
Ortaklık bağlantıları bildirimli ve gerekçeli.

**Doğrulanabilirlik planın parçası.** "Çalışıyor" demek yetmez; her kural
bir betikle denetlenir (`check`, `guvenlik`, `gorunurluk`, `marka-dogrula`).
Kural betiğe girmeden iş bitmiş sayılmaz — bugünkü 56 marka ölçüsü ve
8+14 site kontrolü bu planın sonucu.

## Aşama kayıtları

### 1. Temel site (önceki oturumlar)

- Saf HTML + CSS + JavaScript; **derleme adımı ve bağımlılık yok** — bilinçli
  tercih, site her statik sunucuya olduğu gibi yüklenir.
- 7 sayfa: tanıtım, bizimle çalışın (brief + yazar başvurusu), blog listesi,
  yazı detayı, gizlilik, koşullar, 404.
- **10 dil** (tr, en, zh, hi, es, ar, fr, pt, ru, no): tüm görünen metin
  sözlükten (`data-i18n`), Arapça tam RTL. İki katmanlı içerik modeli:
  tr/en tam makale, kalan sekiz dil özet katmanı.
- 10 blog yazısı × 10 dil; her yazıda özgün katkı cümlesi (`orig`) ve en az
  üç kaynak (`src`) zorunlu.
- Formlar sunucusuz çalışır (mailto taslağı); bülten Buttondown'a bağlı.

### 2. Denetim altyapısı (önceki oturumlar)

Her iş doğrulanabilir olsun diye betikler yazıldı; commit öncesi zorunlu:

- `check` — i18n eşitliği, yazı bütünlüğü, kırık bağlantı, sitemap uyumu
- `guvenlik` — XSS, KVKK, CSP, tabnabbing, mailto enjeksiyonu (14 kontrol)
- `gorunurluk` — yazıları 16 maddelik görünürlük kuralına karşı denetler
- `onizleme` — tüm siteyi tek tıklanabilir HTML dosyasına gömer
- Tarayıcı testleri Playwright ile (RTL, formlar, tema, URL durumu)

### 3. Marka kimliği (önceki oturumlar + 22.08.2026)

- Q sembolü: supercircle kâse + 45° aqua kuyruk. 22.08'de kuyruk yeniden
  tasarlandı — eski kiriş Ø (Norveççe harf!) okunuyordu; kuyruk artık
  siluetin parçası, harf renkten değil biçimden okunur.
- Renkler: Midnight Navy `#082C54` + Electric Aqua `#00D8C2`; aqua metinde
  kullanılmaz (kontrast), koyu tema değişkenlerle kendiliğinden çalışır.
- **14 kimlik varlığının tamamı betikten üretilir** (`marka-uret.py`,
  bayt bayt tekrarlanabilir): 11 SVG + favicon-32 + apple-touch-icon +
  og-image. Elle çizim yok.
- `marka-dogrula` belgedeki her ölçüyü varlıklardan yeniden ölçer (56 ölçü);
  EUIPO şekil markası zarfı hazır (`marka-tescil`), üretim testleri yapıldı.
  Fiziksel testler (nakış, gravür) ve tanınırlık testi kullanıcıda.

### 4. Gelir katmanı (önceki oturumlar; bülten 21.08.2026)

- Üç paket (örnek fiyatlarla) + brief formu + yazar başvurusu.
- Ortaklık bağlantısı altyapısı: bildirim kutusu, `rel="sponsored"`,
  gerekçe zorunluluğu (`docs/gelir-sistemi.md`).
- Bülten Buttondown'a bağlandı (21.08); kayıt karşılığı indirilebilir
  "Otomasyon Keşif Kontrol Listesi". Kullanıcı adı henüz `tatil` —
  `qblogg` hesabı açılınca değişecek (açık iş).

### 5. Curiosity Engine (önceki oturumlar)

Site değil, üretim hattının temeli: sinyal → konu → makale şeması,
ödeme/kredi şeması (`schema-billing.sql`, `billing.mjs`), 16 maddelik
görünürlük kuralının çalışan denetimi (`visibility.mjs`). Motorun taslaklara
uyguladığı ölçüt sitenin kendi yazılarına da uygulanıyor.

### 6. Yayın günü — 22.08.2026

Tek oturumda yayına giden zincir:

1. **Push engeli kalktı** — kullanıcı GitHub App'i kurdu; günlerdir yerelde
   bekleyen 80+ commit uzak depoya çıktı.
2. **`main` QBLOGG'a çevrildi** — kullanıcının açık izniyle, eski saat
   uygulamasının geçmişi korunarak (`-s ours` merge).
3. **Vercel kurulumu** — proje `qblogg`; dağıtıma tek dosya gider
   (`vercel.json`), derleme public depoyu klonlayıp siteyi `dist/`e kopyalar.
   Yani siteyi güncellemek = main'e push + dağıtımı yeniden tetiklemek.
4. **Arayüz kılavuzu düzeltmeleri** — RTL toast merkezleme (0,0 px sapma),
   `color-scheme`, `touch-action`, `text-wrap: balance`, form alanlarına
   `autocomplete`, alan yanı hata mesajları (10 dilde iki yeni anahtar),
   `beforeunload` koruması, blog filtresinin URL'ye yazılması.
5. **og:image + 404** — 1200×630 paylaşım kartı üreticiye 14. varlık olarak
   eklendi (metinsiz: on dilde tek görsel); 10 dilde markalı 404 sayfası.
6. **Alan adı süreci** — qblogg.com kullanıcıda (GoDaddy), DNS kayıtları
   doğru kuruldu ve doğrulandı. Alan adı yanlışlıkla ikinci bir Vercel
   hesabına eklendiği için sahiplik doğrulaması gerekiyor: TXT kaydı
   (`_vercel` / `vc-domain-verify=qblogg.com,589b6db6e7db7463d672`) +
   "Verify & Claim". **Bu adım açık** — kayıt henüz DNS'te görünmüyor.

Gün sonu durumu: site **yayında ve güncel** (qblogg-bet-art.vercel.app,
6/6 dağıtım başarılı), tüm denetimler yeşil; qblogg.com bağlantısı TXT
adımını bekliyor.

## Açık işler (anahtar kullanıcıda)

1. TXT kaydını GoDaddy'ye ekle → Vercel'de "Verify & Claim" → qblogg.com açılır
2. Yasal metinlerdeki 7 `[DOLDURULACAK]` alanının bilgileri
3. Buttondown'da `qblogg` hesabı
4. hello@qblogg.com posta kutusu (GoDaddy)
5. Sosyal hesap adresleri (`config.js`)

Teknik sıradaki büyük iş: her dili ayrı URL'de üreten ön-render (ROADMAP).

## 23.08.2026 — Profesyonelleştirme paketi (SDD ile 8 görev)

Kullanıcının onayladığı 7 fikirlik liste, alt-ajan güdümlü geliştirmeyle
(her görev: taze uygulayıcı → bağımsız inceleme → onay) tamamlandı;
kapanışta en güçlü modelle tüm-dal incelemesi CLEAN verdi.

1. **security.txt + yazdırma CSS'i** — RFC 9116 dosyası; makale sayfaları
   temiz yazdırılıyor (başlık/altbilgi/düğmeler gizli, dış bağlantı adresleri
   dipnot).
2. **İçindekiler (TOC)** — 3+ ara başlıklı yazılarda otomatik; özet katmanı
   dilleri bilinçli muaf; `posts.toc` 10 dilde.
3. **Paket karşılaştırma tablosu** — 8 satır, hücre verileri yalnız mevcut
   paket metinlerinden; kümülatif kapsam tek dipnotla (uydurma hücre yok);
   SVG onay işaretleri, sr-only erişilebilirlik, RTL/390px doğrulandı.
   13 yeni `cmp.*` anahtarı × 10 dil.
4. **RSS** — `npm run rss` → deterministik `feed.xml` (10 öğe); üç sayfada
   autodiscovery; dağıtım kopyasına eklendi.
5. **kalite.html** — kalite güvencesi sayfası (TR+EN): 16 kural, orig/kaynak
   zorunluluğu, iki katmanlı dil modeli, revizyon; her iddia depoya izlenebilir.
6. **ornek.html** — örnek teslimat sayfası: gerçek üretimden 7 türevin birebir
   alıntıları (alıntı sadakati programatik + bağımsız incelemeyle doğrulandı).
7. **Ödeme (site tarafı)** — `config.js → payLinks` doldurulunca paket
   kartlarında "Kartla öde" (Stripe Payment Link) düğmesi; gizlilik metnine
   ödeme paragrafı; kullanıcı için `docs/odeme-sistemi.md` panel kılavuzu.
   Not: Stripe MCP anahtarı salt-okunur — ürün/bağlantı oluşturma kullanıcıda.
8. **Arayüz denetimi düzeltmeleri** — marka adına `translate="no"`, form
   `name` öznitelikleri, paylaşım düğmeleri satır içi SVG'ye, hata mesajı
   `aria-describedby`+`aria-live`, fetch yolunda düğme kilidi, tabular-nums,
   safe-area payları, EN bloklarına `lang="en" dir="ltr"` (dört sayfa),
   `guvenlik.mjs` kapsamına kosullar/kalite/ornek.

Ayrıca: proje konsept belgesi yazıldı (`docs/konsept.md`, okur testinden
geçti; Word kopyası kullanıcıya verildi), Figma tasarım kuralları belgesi
(`docs/figma-tasarim-kurallari.md`), blog yazım yöntemi becerisi
(`.claude/skills/qblogg-blog-yazisi/`), beceri gözlem günlüğü
(`skill-observations/`). Alan adında ilerleme: kullanıcı TXT kayıtlarını
GoDaddy'ye ekledi, DNS'e yayıldı — Vercel'de "Verify & Claim" bekliyor.

Gün sonu denetim durumu: check 8/8 (10 dil × 233 anahtar, 9 sayfa,
sitemap 17 URL), güvenlik 13/13, görünürlük 10/10, marka 56 ölçü,
RSS determinizmi, Playwright akış testleri — hepsi yeşil. Dal:
`claude/qblogg-web-sayfasi-upcarm`; yayına alma kullanıcı onayı bekliyor.

## 23.08.2026 (akşam) — Yeni iş modeli çalışması başladı

Kullanıcı üç ayrı yapay zekâ analizini iletti (Norveç fagblog temaları;
gelir sistemi; TIGER 21/Campden/Long Angle/Oxford Analytica/GLG/HBR/Project
Syndicate kıyaslaması ve "Q Private Intelligence" taslağı) ve QBLOGG için
yeni iş modelinin birlikte kurulacağını bildirdi. İlk sentez `docs/is-modeli.md`
(v1 taslak) olarak yazıldı: çift katlı model (Studio bugünü öder,
Intelligence yarını kurar), B0–B4 güven merdiveni ve geçiş eşikleri,
ürün formatları (Q Answer/Brief/Risk Radar/Decision Defense…), profesör
ücret modeli, üyelik kabul çerçevesi, hukuk sınırları. Belgede her rakam
kanıt sınıfıyla işaretli: [V] doğrulanmış / [H] hipotez / [D] dış iddia —
dış araçlardan gelen rakip verileri teyit edilmeden karar dayanağı
yapılmayacak. Altı açık karar kullanıcıya listelendi (§13).

## 23.08.2026 (gece) — Vercel projesi silinmiş bulundu, site geri kuruldu

Alan adı kontrolü sırasında `qblogg` Vercel projesinin takım listesinde
olmadığı görüldü (panelde aynı gün başka projeler oluşturulurken silinmiş
olmalı; eski adresler qblogg-bet-art/qblogg-flame öldü). Kurulum tek
dosyalık olduğu için site aynı adla dakikalar içinde geri kuruldu:
yeni üretim adresi **qblogg.vercel.app** (yeni proje id). Yeni projede
kendiliğinden açılan Deployment Protection yine kapatıldı; kalite.html
canlıdan 200 + güncel içerikle doğrulandı. GoDaddy tarafı hazır
(apex/www A kayıtları Vercel'i gösteriyor, _vercel TXT yayılmış);
kalan adım: Vercel panelinde qblogg projesine qblogg.com + www ekleyip
doğrulamak — eski claim akışı silinen projeye bağlıydı, panel yeni kod
üretirse GoDaddy'deki TXT değeri onunla değiştirilecek.

## 24.08.2026 — Üye sistemi v1 (Supabase auth) kuruldu

Kullanıcı kararıyla (AskUserQuestion: ayrı uygulama · Q Brief Pro kapsamı ·
magic link) kimlik doğrulama sistemi yazıldı: `uye/` klasörü (tek dosyalık
istemci + config + kendi vercel.json'u + `schema.sql`), ana siteden tamamen
ayrı Vercel projesi olarak dağıtılacak — sitenin sıfır bağımlılık vaadi
bozulmadı. Veri modeli `engine/schema-billing.sql`'in dört tasarım kararına
referansla sadeleştirildi (entitlement ayrımı v2'ye bilinçli devir,
belgede kayıtlı). RLS: aktif olmayan üye yalnız örnek brief'leri görür.
Kurulum kılavuzu `docs/uye-sistemi.md`; kullanıcı adımı: Supabase projesi
açıp URL + anon anahtarını iletmek. Ayrıca task-observer becerisi
`.claude/skills/task-observer/` olarak depoya kalıcılaştırıldı (CC BY 4.0,
atıf korunarak).

## 24.08.2026 (devam) — Üye uygulaması canlıya çıktı (iskelet)

supabase-js CDN yerine depoya vendor'landı (2.112.4, lisans+sha256 kayıtlı) —
hem konteynerden test edilebilirlik hem CSP daralması. Playwright 7/7.
`qblogg-uye` Vercel projesi kuruldu: https://qblogg-uye.vercel.app (ayrı
proje; koruma kapatıldı; noindex). İlk dağıtım "cp: No such file" ile düştü —
neden: vendor dosyası henüz push'lanmamıştı; klon-tabanlı dağıtım çalışma
ağacını değil depoyu dağıtır (gözlem #8). Push sonrası yeşil. Örnek tohum
brief'i hazır (seed.sql, yayınlanmış yazıdan türetilmiş). Bekleyen: kullanıcı
Supabase projesi + URL/anon anahtar.

## 24.08.2026 (devam) — Yazar platformu fikri değerlendirildi (taslak)

Kullanıcı yeni yön verdi: QBLOGG, insanların kendi bloglarını yayınlayıp
kitaplarını tanıtabilecekleri bir platform olsun. Kod yazılmadan önce
değerlendirme + v1 tasarımı `docs/yazar-platformu.md`'ye yazıldı: üç model
seçeneği (öneri: davetli/küratörlü), mevcut Supabase üye sistemi üstüne
şema genişlemesi (authors/books/author_posts + niyet temelli keşif —
kullanıcının paylaştığı filtre kodu okur tarafının prototipi), gelir
seçenekleri rakamsız [H], hukuk kapıları (tanıtım işareti, koşullar
güncellemesi, avukat teyidi) ve eşikli pilot planı. Marka çelişkisi ve
"bir haftada üçüncü yön" riski belgede açıkça kayıtlı. Model + öncelik
kararı kullanıcıya soruldu; P0 inşası karar sonrası.
## 24.08.2026 (gece) — Fikir seli tek çerçevede toplandı

Aynı gün içinde dört yön geldi: yazar platformu (karar: davetli model,
platform önce; şema yazıldı `uye/schema-platform.sql`), ad tartışması
(QBOOK/QBLOOK — qbook.com dolu, qblook.com/.no müsait [V, GoDaddy]),
Action Pages hizmet modeli ve SAYFA60 kitap keşif kanalı + çok-format
merdiveni. Hepsi `docs/yazar-platformu.md`'ye işlendi (§8-10). Birleşik
tez: ödeyen müşteri okur değil, içeriğini müşteriye dönüştürmek isteyen
uzman/yazar. Önerilen sıra: önce TEK 30 günlük satış deneyi (3 ücretli
pilot kapısı), kod ve video kanalı ödeme kanıtından sonra. Panel/keşif
sayfalarının kodu bilinçli duraklatıldı; karar kullanıcıya soruldu.
## 24.08.2026 (gece, devam) — İlk ticari deney seçildi: Action Pages pilotu

Kullanıcı kararı (AskUserQuestion): 30 günlük tek deney = Action Pages.
İlk teslimatlar üretildi: `demo/cv-action-page.html` (Norveççe satış
demosu — 8 soru, belirlenimci puanlama, kişiye özel iyileştirme listesi,
veri tarayıcıdan çıkmaz; Playwright ile uçtan uca doğrulandı: 8 soru,
9/16 orta bant, 5 kişisel madde, eksik-cevap uyarısı, 0 konsol hatası)
ve `docs/action-pages-teklif.md` (teklif, [H] test fiyatları, Norveççe
ulaşım mesajı, kullanıcının adım adım satış görevleri). Demoyu yayına
alma (main + Vercel) kullanıcı onayı bekliyor.
## 24.08.2026 (gece, tescil) — Patentstyret + EUIPO başvuru hazırlığı tamamlandı

Kullanıcı talimatıyla tescil hattı uçtan uca yeniden koşuldu: marka üretimi
(15 varlık, bayt-bayt aynı — çalışma ağacında tek fark belge), tescil
zarfı (4 JPEG + sicil önizleme ✓), zarf testleri 4/4, belge doğrulama
56 ölçü ✓. Patentstyret tarafı arama özetleriyle dolduruldu (TIF/JPEG
önerisi, Altinn kanalı, 3.800 NOK/sınıf — hepsi "elle teyit" notuyla;
patentstyret.no/lovdata.no bu oturumda da EGRESS_BLOCKED). Nice sınıf
taslağı (35+41, 42 isteğe bağlı), renk beyanı önerisi ve başvuru günü
adımları docs/marka-tescili.md'ye işlendi. Yapılamayanlar dürüst listede:
sicil ön araştırması (kullanıcı tarayıcısı), ek sınıf ücreti, vekil görüşü.
Beceri arama denendi: npx skills tüm sorgularda boş (kontrol sorgusu dahil
— kayıt defteri erişimi engelli, beceri yokluğu kanıtı değil).
## 24.08.2026 (gece, denetim + standartlar) — Karma tur

(1) Sezgisel denetim: rakip siteler (Outgrow/ScoreApp/Typeform) proxy
engelli — canlı rakip ekranı alınamadı, dürüstçe kayıt edildi; kendi üç
ekranımız (index, work, demo) 13 ölçütle gerçek görüntülerden puanlandı
(docs/denetim/sezgisel-denetim-2026-08-24.md): en zayıf noktalar work
bütçe alanının dolu açılması, demoda ilerleme göstergesi yokluğu.
(2) NAVIAR "Logo Skills and Clearance Stack v1.0" depoya kopyalandı ve
QBLOGG için benimsenen bölümleri (resmî arama adresleri, kanıt şablonu,
durdurma koşulları) marka-tescili.md'ye işlendi; bu ortamda var olmayan
becerilerin karşılıkları not edildi. (3) 20 rollük ekip listesi
değerlendirildi → docs/ekip-modeli.md (roller işe alım değil denetim
merceği; ilk işe alım ancak pilot gelirle). (4) IQ1000 "güven motoru"
analizi is-modeli.md §14'e delta olarak işlendi — sıra kararı değişmedi.
## 24.08.2026 (gece, test mimarisi) — Spec-driven Playwright standardı değerlendirildi

Kullanıcının ilettiği üç katmanlı test mimarisi (specs/tests/agents +
safety/) docs/test-mimarisi.md'de karara bağlandı: araç sorusunun cevabı
Playwright (zaten standart); codegen bu konteynerde çalışmaz (etkileşimli
pencere ister) — kullanıcı makinesinin aracı; ana site için spec altyapısı
kurulmaz (sıfır bağımlılık, mevcut denetimler yeterli); asıl benimsenen
kısım uye/ platformu için 6 maddelik RLS/safety spec listesi — Supabase
anahtarları gelince Given/When/Then spec'leri + testleri yazılacak.

## 30.08.2026 — NAVIAR CARE 2: Tüm kollar lw83yy dalında birleştirildi

Kullanıcı talimatı: "NAVIAR CARE 2 ilke ilgili her proje her dosyadan
toolsdan burda birleşiyor." — iki NAVIAR CARE dalındaki tüm içerik
`claude/naviar-care-2-lw83yy`'de tek noktada toplandı ve uzak depoya
itildi (ilk kez).

`claude/naviar-care-djpgzs`'den aktarılanlar (28 dosya):
- `docs/naviar/NAVIAR-CARE-HIZMET-TARAMA.md` — hizmet tanımı, Nice
  sınıf analizi (44/45/42/35), Norveç mevzuatı (politiattest, §13),
  B2C/B2G açık noktaları
- `docs/naviar/NAVIAR-CARE-IS-MODELI-KRITIK-ANALIZ.md` — istihdam
  modeli onayı, rakip analizi (SeniorSupport/VilMer piyasada),
  R1–R9 risk kataloğu, 13 eylem maddesi, birim ekonomisi
- `docs/naviar/NAVIAR-LOGO-KARAR.md` — P9 doğrulama kaydı ve hizmet
  tanımı güncellemesi (25.08.2026 tarihli)
- `docs/naviar/care-pilot/` (25 dosya, 13 klasör): kararlar
  (decision-log 8 kırmızı madde), ölçek kapısı, tjenestevurdering
  (5,4/10), finans modelleri (.xlsx), hukuk brifingi, pazarlama
  puan kartı, operasyon el kitabı, olay SOP'u, ziyaret şablonu,
  haftalık puan kartı, referral sınırı, ürün: mvp-data-map /
  onay modeli / kabul testleri / post-pilot gereksinimleri,
  aile keşif mülakatları, pilot satış senaryosu, site MVP
  (index.html, yer tutucu e-posta), yıllık operasyon planı,
  yeni bölge başlatma kontrol listesi

Mevcut durum: 8 commit uzak depoda, tüm sağlık kontrolleri geçiyor.
Açık kalemler: decision-log'daki 8 kırmızı madde (muhasebeci/avukat
girdisi gerektiren), pilot e-postasının gerçek adresle değiştirilmesi,
P9 marka onayı (iş onayı + sınıf 44 araştırması).

## 30.08.2026 (akşam) — NaviarCare telemedicine sitesi naviar/care/ altına taşındı

Kullanıcı talimatı: "BUTUN PROJELERI BURAYA TASI" — Vercel'deki dört
projenin tamamı (naviar-care-1, naviar-consult, beta-art/NaviarCare,
hxi-music) lw83yy dalında toplanıyor. Bu oturumda: telemedicine sitesi.

Kaynak: `betulandersen-droid` hesabı erişilemez olduğundan orijinal
repo klonlanamadı. Kullanıcı Vercel'deki canlı dağıtımın sayfa içeriklerini
doğrudan sohbete yapıştırdı; 8 sayfanın tamamı bu içerikten yeniden kuruldu.

Oluşturulan dosyalar (`naviar/care/`, commit 87f695e):
- `style.css`      — tam tasarım sistemi: CSS değişkenleri, açık/koyu tema,
                     nav, hero, kart, form, tablo, akordeon, footer bileşenleri
- `app.js`         — dil değiştirici (4 dil + RTL), FAQ akordeon, dil tablosu
                     filtresi, triage chip'leri, URL param ön doldurma
- `index.html`     — ana sayfa: hero, istatistikler (113 dil / 28 uzmanlık /
                     7/24), canlı durum kartı, nasıl çalışır, neden NaviarCare,
                     dil örnekleri marquee, acil güvenlik uyarısı
- `triage.html`    — 4 adımlı semptom denetleyici: şikayet chip'leri + serbest
                     metin, güvenlik kapısı (3 soru; "Evet" → acil uyarı),
                     süre/şiddet/yaş, yönlendirme sonucu + randevu butonu
- `booking.html`   — filtreli doktor listesi: uzmanlık/dil/uygunluk, 6 örnek
                     kart (avatar, dil etiketleri, durum göstergesi, ücret)
- `languages.html` — 113 dil tablosu: yerel yazı, İngilizce ad, "Doktor
                     konuşur" / "Tercüman katılır" etiketi, bölge filtresi
- `join.html`      — klinisyen başvuru formu: kişisel bilgi, lisans, iki
                     referans, uzmanlık/şikayet chip'leri, dil çoklu seçim,
                     uygunluk/ücret, beyanlar; kenar çubuğu: sonraki adımlar,
                     pratisyen hakları, Türkiye sağlık tesisi notu
- `about.html`     — misyon, değerler (uzaklık/dil/aciliyet/yük), konsültasyon
                     akışı (5 adım), güvenlik ve gizlilik, FAQ akordeon (8 soru),
                     iletişim formu; çapalar: #how #safety #faq #contact
- `legal.html`     — kapsam, tıbbi lisans doğrulaması + nerede uygulayabilir +
                     sağlık tesisi gereklilikleri, acil feragati, veri/saklama,
                     sorumluluk, demo uyarısı; tam TOC ile
- `feedback.html`  — ne kullandı (radio), 1–5 sayısal derecelendirme,
                     açık metin (deneyim + iyileştirme), isteğe bağlı e-posta

Tasarım kararları: Inter (300–800), mavi #0051c3 + teal #00897b, sıfır
bağımlılık, noindex/nofollow tüm sayfalarda, her sayfada acil feragatnamesi,
demo banner (gerçek rezervasyon/ödeme yok), Arapça için RTL desteği.

"Tüm projeleri buraya taşı" durumu:
- ✓ NAVIAR CARE pilot dokümantasyonu — naviar/care-pilot/ (önceki oturum)
- ✓ HXI Music sitesi — hxi/ (önceki oturum)
- ✓ NaviarCare telemedicine sitesi — naviar/care/ (bu oturum)
- ⏳ NAVIAR Consult placeholder — bekliyor
- ⏳ beta-art TypeScript uygulaması — beta-art/ zaten main'de mevcut

## 02.09.2026 — run-naviar-care becerisi genişletildi, iki kör hata bulundu

`/run-skill-generator` ile `naviar/care/.claude/skills/run-naviar-care`
yeniden sürüldü: smoke 9 → 27 kontrol (NCB onayı → favori → profil,
admin kurulum/giriş/çıkış, view-profile, join sihirbazı); `shot` moduna
`--login`, `--tab=`, `--consent` bayrakları eklendi.

Sürüş iki gerçek hatayı ortaya çıkardı (ikisi de bir önceki oturumun ürünü):
- `admin.html`: `#doctor-modal{display:flex}` ve `#auth-screen{display:flex}`
  tarayıcının `[hidden]` kuralını eziyordu — modal hep açık, sayfa tıklanamaz.
  `#x[hidden]{display:none}` ile düzeltildi.
- `doctors.js`: üst düzey `const NC_DOCTORS` `window`'a yazılmadığı için
  admin tablosu ve profil favorileri boş kalıyordu. Dosya sonuna
  `window.NC_DOCTORS = NC_DOCTORS` eklendi; admin dışa aktarması da yazıyor.

Driver dersleri SKILL.md'ye işlendi: `pkill -f` kendi kabuğunu vurur,
detached spawn `unref()` ister, her Playwright context ayrı localStorage.

## 02.09.2026 — run-hxi becerisi: HXI sitesi için Playwright sürücüsü

`hxi/.claude/skills/run-hxi/` oluşturuldu (driver.mjs + SKILL.md). Smoke
19 kontrol, ~8 sn: index (CSS kök-mutlak yoldan, nav, iş kartları, JSON-LD),
music (tıklamayla Spotify iframe'i), 9 sayfa noindex + iç bağlantı 200,
mobil hamburger menü (aria, kaydırma kilidi). `shot --mobile --menu` ile
mobil menü görüntüsü. Port 8003.

Ortam dersi: dış kaynaklar Chromium'a ulaşmıyor — Google Fonts `curl` ile
200 ama Chromium'da 13 sn sonra `ERR_CONNECTION_RESET`, logo CDN'i ve
Spotify askıda. Driver localhost dışı her isteği kesiyor; tipografi bu
ortamda doğrulanamıyor, görüntülerde yedek font var.

## 02.09.2026 — small-business eklentisi QBLOGG'a uyarlandı

Kullanıcı isteği: "small-business" eklentisini şirkete göre özelleştir.
Eklenti pazaryerinde var (31 beceri) ama kurulu değil; kaynak
anthropics/knowledge-work-plugins'ten okundu. İki katman yazıldı:
- `CLAUDE.md → ## Business context` — eklentinin `smb-onboard`/`smb-router`
  becerilerinin başlık adıyla okuduğu profil bloğu (tam alan adlarıyla).
- `.claude/skills/qblogg-kucuk-isletme/` — bağlayıcı eşlemesi (QuickBooks/
  HubSpot/PayPal yok → Stripe salt-okunur + CSV, Gmail, Takvim, Notion/Linear),
  15 komutun QBLOGG karşılığı (Norveç MVA, bordro yok, işe alım kapısı,
  içerik üretimi depo becerileriyle), `esikler.md` NOK ölçeğinde eşikler ve
  Action Pages 30 gün sayacı.
Eklenti kurulmasa da aynı iş akışları bu eşlemeyle yürür. Kurulum kullanıcıda.

## 02.09.2026 (gece) — NaviarCare ilk kez canlıda: naviarcare.vercel.app

Bu depodaki `naviar/care/` hiç yayına alınmamıştı; Vercel'deki `naviar-care`
(React, naviar-care-1 deposu) ve `naviar-care-live` (Norveççe care-pilot)
başka kod tabanları. Yeni proje **`naviarcare`** (takım BET - ART,
`prj_bnAWxkOQaAmm1UwiCpqK9tfJkgyX`) `naviar/vercel-care.json` tarifiyle
üretime alındı. Tarif düzeltmeleri: `cp -r` (fonts/ alt klasörü
kopyalanmıyordu), depo adresi `BETA-ART-PRIVAT` (taşındı; herkese açık),
`.claude` dağıtımdan çıkarıldı. Doğrulandı: index 200, admin.html 200,
fonts/inter-latin.woff2 200, doctors.js `window.NC_DOCTORS` satırıyla,
`.claude/...` 404.

naviarcare.com bu projeye bağlı değil; DNS GoDaddy yönlendirme adreslerini
gösteriyor (15.197.148.33 / 3.33.130.190). Alan adı bağlama kullanıcı
adımı (Vercel panel + GoDaddy DNS). Bu ortam naviarcare.com'u açamıyor
(proxy engeli), bugünkü içeriği görülmedi.

Kalıcı kural CLAUDE.md'ye işlendi: naviar/care'de her iş bitince push →
deploy → canlı doğrulama → görüntü.

## 05.09.2026 — NaviarCare logosu: kullanıcının v0.2 QA panosu siteye girdi

Kullanıcı chatgpt.site'de hazırlanmış iki logo QA panosu paylaştı ve "bu
logoları kullan" dedi. Kaynak vektör alınamadı (adres vekil engelli), geometri
panodan ölçülerek `brand/naviar/build-care.py` ile yeniden kuruldu
(`brand/naviar/care/`, 8 SVG; ölçüm tablosu ve sapmalar `brand/naviar/README.md`).
Siteye: 11 sayfada `naviar-care-logo.svg` yeni lockup, koyu temada beyaz
kopya, ilk kez favicon. Eski altın-aksanlı master sistem silinmedi; ana marka
kararı kullanıcıda. Panonun kendi durumu korunur: teknik PASS, hukuki
tarama HOLD — tescil örneği değildir.

Aynı gün kullanıcı CARE 2 demo sitesinin (naviar-care-2.andersen-betul.chatgpt.site,
Norveççe/İngilizce/Türkçe, test rezervasyonu + ödeme simülasyonu, Stripe
bağlı değil, e-posta gönderilmiyor) metinlerini yapıştırdı. O site bu depoda
değil; buradaki `naviar/care` ayrı bir kod tabanı (İngilizce, 11 doktor,
mailto formu). İki kopyadan hangisinin üretim sayılacağı arşiv onay
listesinde bekliyor.

## 05.09.2026 (gece) — NAVIAR CARE 2 sitesi kuruldu ve canlıya alındı

Kullanıcı chatgpt.site'deki CARE 2 demo sitesinin metinlerini (Norveççe) ve
ana konsept belgesini (`docs/naviar/NAVIAR-MASTER-2026-001_DOC-KONSEPT-WEB-01_v1.0.html`,
kullanıcı yüklemesi) paylaşıp "bu bilgileri kullanarak web sayfasını
yapacaksın" dedi. Yeni site `naviar/care2/`: 8 sayfa (index, journey,
clinicians, languages, about, professionals, booking, privacy), üç dil
(NO/EN/TR, `i18n.js` 270 anahtar × 3), 11 örnek profil (`doctors.js`), 113
dillik katalog (`langs.js`, eski `care/languages.html`'den çıkarıldı), test
rezervasyonu (Oslo saatiyle 20 dk'lık örnek saatler — sabit tarih yok, her gün
yeniden üretilir; kaydet/taşı/iptal/e-posta taslağı/ödeme simülasyonu, hepsi
localStorage), ölçüm onayı (yalnız tercih saklanır, ölçüm bağlı değil),
acil 113 / 116 117 şeridi ve kutusu her sayfada. Tasarım konsept belgesi
§04'e göre: koyu yeşil tonlar, serif başlık, sade gövde; logo kullanıcının
v0.2 panosundan. Sunucu, hesap, e-posta, Stripe yok — hepsi sitede açıkça
"demo" olarak yazılı.

Doğrulama: `naviar/care2/.claude/skills/run-naviar-care2/` (smoke 39/39,
görüntüler NO/EN/TR, koyu tema, mobil menü). `naviar/vercel-care.json`
artık `care2/` kopyalıyor → naviarcare projesi CARE 2'yi yayınlıyor. Eski
`naviar/care` (İngilizce, "dakikalar içinde doktor" vaatli) depoda duruyor,
silinmedi; geri almak için tarifteki `care2` → `care`.

Vercel notu: proje bu gece duraklatılmış bulundu (canlı 503
`DEPLOYMENT_PAUSED`, yeni dağıtım `BLOCKED`); `unpause_project` ile açıldı,
dağıtım READY. Duraklatma nedeni (harcama sınırı mı, elle mi) bilinmiyor.

CARE 2'nin kendi kod tabanı (Cloudflare Worker + D1, 42 profil, 27 sayfa,
sunucu taraflı rezervasyon) bu depoda değil; buradaki site o konseptin
sunucusuz, statik yeniden kurulumudur. Konsept belgesindeki "giriş
gereksinimi", sunucu tarafı çakışma kontrolü ve gerçek adaptörler burada yok.

## 05.09.2026 (gece, devam) — CARE 2 kaynak teslimi arşivlendi ve site kaynaktan yeniden kuruldu

Kullanıcı 40'a yakın dosya yükledi (v6 konsept/teslim belgeleri, üç dilli site
metinleri, `build_content.py`/`build_operations.py` üreticileri, `catalog.json` 42
profil + 113 dil, şema, testler, tasarım notları, SRC-03 dokümantasyonu) ve "bütün
belgeleri arşivle, numara ver, sonra bu kaynakları kullanarak siteyi yeniden yap" dedi.

- Arşiv: `docs/naviar/care2-teslim/` — 21 kayıt, `NC2-ARS-001…021`, SHA-256'lı dizin
  (`00_ARSIV-DIZINI.md`, `00_ARSIV-ENVANTERI.json`). Kullanıcının kendi `SHA256SUMS.txt`
  ile 15/16 eşleşti; `Tasarim-v4.jpg` yüklenmedi.
- Kaynak kod: `naviar/care2-src/` (orijinaller değişmeden). Teslimde olmayan
  `styles.css`, `model.js`, `site.js`, `operations.js`, logo ve hero görseli
  `public/` altında yeniden yazıldı (`BETA-ART-NOTLAR.md`). `checks/catalog-model.cjs`
  geçiyor; `checks/static.py` yalnız studio-demo iddiasında duruyor.
- Site: `python3 build_static.py` → 27 yerel sayfa (NO/EN/TR) + uyumluluk sayfaları.
  Rezervasyon sunucusuz (localStorage). Beceri `run-care2-src`, smoke 40/40.
- Dağıtım tarifi `naviar/vercel-care.json` artık `care2-src`'yi Vercel'de derliyor
  (python3). Bu geceki `naviar/care2` (kendi yazdığım sürüm) depoda kaldı, canlıdan indi.
- Eksik ve kullanıcıdan istenen: `assets/conversation.webp` (hero fotoğrafı), özgün
  `assets/logo.svg`, `styles.css`/`site.js`/`model.js`/`operations.js` orijinalleri,
  `server/operations.mjs`. Gelirse `public/` altındakiler yerini bırakır.

## 05.09.2026 (gece, son) — CARE 2 statik sürüm tamamlandı: özgün varlıklar, studio-demo, v7 belgeleri

Kullanıcı "bu kaynakları baz alarak siteyi ve konsepti yap, bitir; eksiksiz teslim et" dedi.
- Arşivdeki `NAVIAR-CARE-002_Studio-Demo_v1.0.html` tek dosya çıktı: içinde özgün logo
  (hibrit işaret v0.3) ve 1000×1250 KI görseli base64 gömülüymüş. İkisi çıkarılıp siteye
  kondu; yer tutucu çizim ve v0.2 pano logosu siteden kalktı (marka dosyaları duruyor).
- Aynı dosyadan `/studio-demo/` geri kazanıldı; sabit 7–9 Eylül tarihleri `sample-calendar.js`
  ile Oslo takvimine bağlandı (v6 DEC-014). `checks/static.py` artık 27 + 9 sayfa PASS,
  `sample-calendar.test.mjs` PASS, katalog PASS; smoke 54/54.
- İşletim sayfası yerel test özeti gösteriyor; rezervasyona ICS takvim dosyası eklendi.
- Konsept: `design/CONCEPT-v7-tr.md` (v6 + statik sürüm farkları, DEC-018…022, §20),
  `design/RELEASE-v7.md`; kullanıcının kendi `export-handoff` aracıyla üretilen v7 teslim
  HTML/MD ve üç dilli site metinleri `docs/naviar/care2-teslim/` (NC2-ARS-024…026).
- ZIP ile gelen `Tasarim-v4.jpg` arşive girdi; SHA256SUMS 17/17.
- Canlı: naviarcare.vercel.app (Vercel `naviarcare`, `python3 build_static.py`).
Açık kalan: naviarcare.com DNS (kullanıcı), marka hukuki taraması, CONCEPT §16 klinik açılış işleri.

## 05.09.2026 (gece, beceri) — teslim-arsivle: dış teslimleri arşivleme becerisi

- `.claude/skills/teslim-arsivle/`: SKILL.md + `scripts/arsivle.py`. CARE 2 teslimini elle
  arşivlerken üç kez tekrarlanan işi (önek temizleme, kopya ayıklama, ad düzeltme, SHA-256'lı
  numaralı dizin, SHA256SUMS doğrulama, gömülü görsel çıkarma, `.env`/anahtar dışlama) tek
  komuta indirir; hedefte önceki envanter varsa numara ve türü oradan sürdürür.
- Değerlendirme: 3 senaryo (yükleme arşivi, ZIP ile genişletme, gömülü varlık), beceri ile /
  becerisiz, iki tur. Nicel ölçütler her iki yapılandırmada da geçti; fark biçimde: becerisiz
  koşular her seferinde farklı yapı üretti ve dosya adlarına numara yazıp kullanıcının kendi
  dizin bağlantılarını kırdı. 1. turda betikte bulunan kusur (ZIP'le gelen dosyanın türü
  önceki envanterden alınmıyordu) düzeltildi; 2. turda beceri ile 29/29, süre 93 sn (becerisiz 127).
- Örnek veri ve ölçütler `evals/` altında; çalışma alanı (`*-workspace/`) depoya girmez.
