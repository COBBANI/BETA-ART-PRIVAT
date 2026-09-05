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

## 25.08.2026 (gece) — Beşinci yön teklifi değerlendirildi: B2C affiliate/karşılaştırma medyası

Kullanıcı dışarıdan gelen bir strateji belgesi paylaştı: QBLOGG'u Norveç
odaklı B2C affiliate/karşılaştırma medyasına (review, "best X", "X vs Y")
dönüştürme teklifi. Belgenin teknik durum tespiti yanlıştı ("repo'da yalnız
.github var, Lovable/Vercel kurulmamış") — gerçekte site tam işleyen ve
canlı. Ayrıca bu, bir haftada dördüncü yön teklifiydi (stüdyo → yazar
platformu → Action Pages → bu). Kullanıcıya iki karar soruldu: (1) belge
arşivlensin mi/pivot mı, (2) Action Pages pilotuyla ilişkisi. Kararlar:
ciddi pivot teklifi olarak ele al + ikisini paralel yürüt.

Action Pages doğrulaması: `qblogg` Vercel projesinin son production
dağıtımı (`dpl_2s49SpZK31WFJYTnFfJxat7cTQUw`) zaten 973e48e commit'inden
(demo dahil) yapılmış ve READY durumda — `web_fetch_vercel_url` ile
`qblogg.vercel.app/demo/cv-action-page.html` içeriği doğrulandı (200,
doğru CSP/noindex başlıkları). Ek push/redeploy gerekmedi; pilot fiilen
yayında.

Paralel iz: affiliate niş için "İçerik Fırsat Haritası" araştırması
başlatıldı (yalnız araştırma, kod yok) — sonucu ayrı günlük kaydına
işlenecek.

## 25.08.2026 (gece, devam) — İçerik Fırsat Haritası tamamlandı + "gerçek fayda" ilkesi

`docs/icerik-firsat-haritasi.md` teslim edildi: 92 aday konu, gerçek web
araştırmasıyla doğrulanmış affiliate verisi (her iddia kaynaklı veya
"doğrulanamadı" diye işaretli), ilk 20 gelir-odaklı küme. Kritik bulgu:
Norveç'e özel "AI araçları" nişi zaten dolu (nordicaitools.com dahil 6
rakip) — "boş alan" varsayımı çürüdü.

Kullanıcıyla tartışma sonucu bir karar ilkesi benimsendi: **qBLOGG'un gücü
"daha fazla içerik" değil, "insanların daha iyi karar vermesine ve
gelişmesine yardım eden içerik" üretmektir.** Haritanın kendi verisi bunu
destekliyor — "Yüksek fayda" işaretlenen beş kümenin (#11 AI Receptionist,
#13 Norveç muhasebe yazılımı, #14 iş arayanlar için AI araçları, #16 ucuz
AI yığını, #19 EU AI Act) dördünde affiliate geliri **yok**; komisyon veren
şirketler kalabalık/kolay-kararlı ürünler (VPN, hosting), komisyon
vermeyenler nişleşmiş/gerçekten kafası karışık okuyucunun olduğu alanlar.
Harita bu ilkeyle güncellendi (§4.1): öncelik sırası gelire göre değil önce
yüksek-fayda kümelerinden başlamalı, düşük-fayda/yüksek-rekabet kümeler
yalnızca kapasite kalırsa ikincil dolgu.

## 25.08.2026 (gece, kapanış) — Q vizyonu duraklatıldı, karar değişmedi

Q — Human Growth Network fikri dokuz turda (çoğu kullanıcının başka AI
araçlarından aldığı paralel çıktılar) gitgide büyüyerek geldi: vizyon →
yatırımcı çerçevesi → yatırım kapıları/faz çizelgesi → org tasarımı →
maaş/bütçe/finansman turları içeren "Q Master Plan v1.0". Her turun kendi
sonucu aynıydı: "önce kanıt, sonra inşa." Kullanıcı açıkça "önce ucuz
doğrulama" seçeneğini seçti (`docs/q-validate-materyalleri.md` teslim
edildi: landing page taslağı + 20 kullanıcı + 10 uzman görüşme sorusu).

Org şeması + maaş/bütçe tabloları içeren tur önce reddedildi — sıfır
kullanıcı/gelirli bir kurgusal şirket için somut NOK rakamları yazmak
`CLAUDE.md`'nin "uydurma yasak" ilkesini ihlal eder gerekçesiyle.

Ardından kullanıcı dokuzuncu turun (tüm rakamları "hipotez" diye
etiketleyen "Q Master Plan v1.0") **resmi referans belgesi** olmasını
istedi: bundan sonra Q'yla ilgili ürün/işe alım/finans kararları bu
belgedeki Gate 1-7 (Investment Gates) sırasına göre değerlendirilecek.
Bu, dokuz turun kendi vardığı disiplinle tutarlı olduğu için kabul edildi
ve `docs/q-master-plan.md`'ye yazıldı — iki şart korunarak: (1) her rakam
belgenin kendi ifadesiyle hipotez, taahhüt değil; (2) bu belge QBLOGG'un
şu anki canlı işini (B2B içerik-hattı stüdyosu) değiştirmiyor, yalnızca
Q'ya dair gelecek teklifler için süzgeç.

Dokuz tur boyunca hiçbir gerçek dünya eylemi (görüşme, landing page
yayını) teyit edilmedi — yani Gate 1 hâlâ açık değil. Karar: enerji
şimdilik zaten canlı olan iki deneye (Action Pages, `docs/icerik-firsat-
haritasi.md` affiliate içeriği) döndürülüyor. Q'ya sonraki dönüş şartı:
kullanıcı gerçek bir görüşme/landing page sonucu getirdiğinde.

## 25.08.2026 (gece, son) — Dört red-team turu tek çekirdek karara indi

v1.0'dan sonra üç tur daha geldi (hepsi daraltma yönünde, genişletme
değil — bu önceki dokuz turdan farklı bir örüntü): v1.1 rekabet
körlüğünü düzeltti (Growth Graph tek başına moat değil — LinkedIn/
Coursera/Degreed zaten o alanda, doğrulanmamış), v1.2 kategoriyi
"Applied Progress Platform"a daraltıp "Q Path"i "Q Sprint"e çevirdi
(Workera/BetterUp/CoachHub rekabeti gerekçesiyle, doğrulanmamış), v1.3
en atomik test edilebilir davranışı buldu ve karşılaştırma tablosuyla
gerekçelendirdi (McKinsey/Microsoft atıfları doğrulanmamış).

Kullanıcı son turu **çekirdek karar** olarak kilitledi:
**1 Task → 1 Improvement → 1 Proof**, döngü Choose → Improve → Prove →
Repeat, ilk MVP vaadi "Improve one real task at work." Bu,
`docs/q-master-plan.md`'nin en üstüne en yüksek öncelikli bölüm olarak
işlendi — belgenin geri kalanıyla çelişirse çekirdek kazanır.

Durum değişmedi: **Gate 1 hâlâ açık değil**, hiçbir görüşme/landing page
yayını teyit edilmedi. Ama artık test edilecek şey çok daha net —
`docs/q-validate-materyalleri.md`'deki 20 soru, bu yeni çekirdeğe göre
gözden geçirilmeyi hak ediyor (henüz yapılmadı, kullanıcıya soruldu).

## 25.08.2026 (gece, kapanış — TRUTHMODE) — Yaklaşık 20 tur sonunda tam yakınsama

Vizyon v1.0→v1.5'e ulaştı (bkz. `docs/q-master-plan.md`): killer behavior
kilitlendi (1 Task → 1 Improvement → 1 Proof), moat Outcome+Trust Graph'a
daraltıldı, B2C/B2B sırası çözüldü (outcome kanıtı B2C'den, ilk para
B2B'den), üç gerçek Meta M&A iddiası doğrulandı/düzeltildi (Manus
anlaşması 11.08.2026'da bozuldu, capex rakamı güncellendi). Paralel
olarak `demo/q-work-audit.html` yazıldı, Playwright ile doğrulandı,
depoya ve `vercel.json` dağıtım tarifine gömüldü — gerçek mailto CTA'sı
ile 20 görüşme adayı bulmaya hazır.

Kullanıcı son turda ("TRUTHMODE") dürüst bir öz-değerlendirme yaptı:
Q bugün "yatırım yapılabilir şirket değil, iyi formüle edilmiş bir tez."
Eksik liste: gerçek kullanıcı davranışı, retention verisi, ödeyen
müşteri, outcome verification, benzersiz veri, çalışan recommendation
engine, kanıtlanmış 10x üstünlük, network effect — hiçbiri yok. Q Talent,
Passport, Marketplace, Community, API, global expansion, Meta acquisition
konuları **donduruldu**. Tek kalan iş: 100 kullanıcı → 25-30 gerçek
iyileşme → tekrar kullanım → ödeme testi → recommendation gerçekten
iyileşiyor mu — bu sırayla, teoriyle değil.

**Bu, oturumun başından beri savunulan pozisyonla tam örtüşüyor.** Kayıt
altına alınacak yeni bir kavram yok; sıradaki tek ilerleme kaydı gerçek
insanlarla temas olacak. Q konusu bu haliyle beklemede — bir sonraki not
ancak gerçek bir görüşme/deneme sonucu geldiğinde düşülmeli.

Kullanıcı bu ilkeyi Meta'nın dikkat-ekonomisi modeliyle karşılaştırarak
netleştirdi: **"Sana ilgini çekecek şeyi bulayım" (Meta) değil, "Seni
geliştirecek şeyi bulayım" (QBLOGG)** — temel metrik Dikkat/Engagement değil
Gelişim/Outcome olmalı. Bu yeni bir karar değil, mevcut modelin adlandırılmış
hali: sitenin zaten kurucu ilkesi ("işi trafik toplamak değil, brief formunu
doldurtmaktır") bir outcome metriği; §4.1'deki gerçek fayda filtresi bunun
B2C affiliate tarafındaki karşılığı. Üçü aynı ilkenin farklı yüzleri. Ayrıca
tartışılan "insanları birbirine bağlayan platform" (Meta UGC/sosyal grafik
modeli) fikri bilinçli olarak uygulanmadı — QBLOGG'da hesap/UGC/moderasyon
altyapısı yok, bu ayrı ve çok daha büyük bir kapı; kullanıcının asıl vardığı
sonucun "gelişim/outcome metriği" olduğu değerlendirildi.

## 30.08.2026 — "BUTUN PROJELERI BURAYA TASI": envanter çıkarıldı, gerçek gerilim ortaya çıktı

Kullanıcı "her proje/dosya/tool burada birleşiyor" tespitini yaptı, ardından
açık talimat verdi: **"BUTUN PROJELERI BURAYA TASI."** AskUserQuestion ile
kapsam ("hangi repolar 'hepsi'?") ve yöntem ("taşımak teknik olarak ne
demek?") netleştirildi — kullanıcı ikisine de **"HEPSI"** yanıtını verdi.

Körlemesine bir kod/geçmiş birleştirmesi yapmak yerine (geri döndürülemez bir
işlem, uzlaştırma planı olmadan yapılmaz) önce gerçek envanter çıkarıldı:
beş repo (`beta-art-archive`, `QBLOGG`, `qb`, `eve-slack-agent`,
`eve-chat-template`) `andersenbetul-alt` hesabından klonlandı, `HEAD`
doğrulandı, içerikleri gerçekten okundu. Sonuç `docs/proje-envanteri.md`.

Bulgular: `QBLOGG` ve `qb` tamamen boş (taşınacak içerik yok);
`eve-slack-agent`/`eve-chat-template` Vercel'in stok "eve" şablonları,
hiç özelleştirilmemiş. Asıl bulgu `beta-art-archive`: bu **QBLOGG değil**,
tamamen ayrı bir marka ve iş (fotoğraf lisanslama + inşaat dokümantasyon
arşivi, Vite/React/Supabase/Lovable). Kendi yönetişim belgesi
(`BETA_ART_MASTER.md`, kullanıcının 25.08.2026'da onayladığı) açıkça
"ikinci bir Beta Art sitesi yaratma" diyor — yani "her şeyi buraya taşı"
talimatı, kullanıcının kendi onayladığı başka bir kararla doğrudan çarpışıyor.
Bu bir teknik engel değil, iki talimat arasındaki gerçek çelişki; körlemesine
biri diğerini ezmeden kullanıcıya üç somut karar soruldu (belge sonunda).

NAVIAR Care ve `betulandersen-droid` hesabı altındaki her şey hâlâ bu
oturumdan erişilemez durumda (farklı GitHub hesabı, bağlanmadı) — "HEPSI"
cevabı bunu kapsasa da teknik olarak henüz mümkün değil.

Gerçek dosya/geçmiş taşıma işlemi, yukarıdaki üç karar netleşmeden
başlatılmadı.

## 02.09.2026 — Sosyal medya kanalları: strateji + ilk gerçek içerik partisi

Kullanıcı "BETA ART SOSIAL MEDIA KANALLARI GELISTIR" dedi. AskUserQuestion'da
üç seçenek de (kanal stratejisi, gerçek içerik üretimi, sitedeki sosyal
bağlantı altyapısını tamamlama) seçildi.

- **Strateji + kurulum rehberi:** `docs/sosyal-medya-stratejisi.md`. Beş
  kanal (`config.js`'deki `social` alanlarıyla birebir: LinkedIn, X, YouTube,
  Substack — Medium yerine önerildi), öncelik sırası, adım adım hesap açma,
  `config.js`'e bağlama talimatı, yayın ritmi önerisi.
- **Gerçek içerik:** `qblogg-turev` becerisiyle en yeni yazıdan
  (`ai-arac-yigini-maliyeti`) yedi türev üretildi —
  `content/ai-arac-yigini-maliyeti/tr/`. Tüm rakamlar kaynak yazıdaki Zylo
  verisiyle birebir eşleşiyor (otomatik çapraz kontrol yapıldı), emoji
  taraması temiz.
- **Sosyal bağlantı altyapısı:** kod tarafı zaten hazırdı (`applySocial()`),
  yalnızca 02.09.2026'daki "profesyonellik" düzeltmesiyle boş başlık kusuru
  giderildi (aşağıya bakın). Gerçek hesap adresleri kullanıcıdan bekleniyor
  — doldurulmadan tamamlanamaz, bu rehberde adımlar var.

Aynı gün, önce "WEB SAYFASINI PROFESYONELLESTIR" talebiyle site görsel/kod
denetiminden geçirildi: (1) altbilgide hiç sosyal hesap yokken "Sosyal"
başlığının boş göründüğü bulundu ve düzeltildi (8 sayfa + `app.js`), (2)
öne çıkan blog kartının özet metninin bir CSS özgüllük çakışmasıyla ezildiği,
koyu temada 1,4:1 karşıtlığa (WCAG AA eşiği 4,5:1) düştüğü bulundu ve
düzeltildi (~6,7:1'e çıktı). PR #16'ya push edildi (`ad0ece0`).

Ayrıca PR #16'nın CI'ı ayrı bir gerçek hatayla kırılmıştı: `vercel.json`
`buildCommand`'ı 691 karaktere ulaşmış, Vercel'in 256 karakter şema
sınırını aşıyordu. Mantık `scripts/vercel-build.sh`'a taşındı, `buildCommand`
28 karaktere indi (`414bdf0`). Kalan CI kırmızısı kod hatası değil: altı
Vercel projesi (`andersenbetul-9635's projects` takımı) aynı repodan aynı
anda deploy tetikleyip günlük deploy limitine (`api-deployments-free-per-day`,
>100) takıldı — hangi Vercel projesinin kanonik olacağı kararı hâlâ bekliyor.

## 02.09.2026 — Davranış temelli içerik önerisi (yalnızca tarayıcıda)

Kullanıcı "her web sayfasında müşterinin bir sonraki adımda ne görmek/almak
isteyeceğini bulan bir sistem" istedi (Norveççe). Bu, sitenin "çatısız,
sunucusuz" temel kuralıyla doğrudan gerilim taşıyordu — AskUserQuestion ile
netleştirildi: **amaç** içerik önerisi (paket/CTA kişiselleştirme ve gerçek
çapraz-ziyaretçi analiz/tahmin motoru seçilmedi), **veri kapsamı** yalnızca
ziyaretçinin kendi tarayıcısı (sunucuya hiç gitmeyen, paylaşılmayan veri).

Uygulama: `qb_interest` adlı yeni bir localStorage anahtarı, hangi kategoriyi
kaç kez okuduğunu/seçtiğini sayıyor (`trackInterest`/`getInterest`,
`app.js`). İki yüzey:

- **post.html — "Benzer yazılar":** var olan kategori-eşleşmeli mantık,
  geçmiş yoksa birebir eski davranışı veren bir puanlama ile genelleştirildi
  (ilgi puanı × 10 + aynı kategori bonusu 5). Playwright ile doğrulandı:
  dört "business" yazısı okuyan bir ziyaretçi, başka bir kategoriden yazı
  okurken "Benzer yazılar"da Business yazıları görüyor.
- **blog.html — "Sizin için önerilen":** yeni bir şerit, yalnızca varsayılan
  görünümde (filtresiz/aramasız) ve yalnızca gerçek geçmiş varken görünüyor
  — ilk ziyarette hiç render edilmiyor, boş kutu kalmıyor.

`gizlilik.html` (TR+EN) yeni anahtarı üçüncü/dördüncü madde olarak açıkladı;
`npm run guvenlik` ve `npm run check` yeşil. `posts.recommended` anahtarı
10 dilin hepsine eklendi, Arapça RTL'de görsel olarak doğrulandı.

## 02.09.2026 — "Web sayfasını düzenleyen kişi ve kullanıcılar için ayrı
sistem": üç büyük karar netleşti, ilki (içerik paneli) kodlandı

Kullanıcı "web sayfasını düzenleyen kişi ve kullanıcılar için ayrı sistem
kuruyoruz" dedi. Bu, üç ayrı, kısmen zaten var olan büyük kararla
kesişiyordu — körlemesine kodlamak yerine AskUserQuestion ile netleştirildi:

1. **Üye sistemi (kullanıcılar):** mevcut planı (`docs/uye-sistemi.md`,
   24.08.2026'dan beri iskelet hâlinde, Supabase yapılandırılmamış)
   tamamlamaya karar verildi. Kurulum adımları kullanıcıya tekrar
   sunuldu — bu oturumdan yapılabilecek bir şey yok, Supabase hesabı
   kullanıcı adımı.
2. **Yazar platformu (docs/yazar-platformu.md):** Model A (davetli/
   küratörlü) onaylandı. Ama belgenin kendi §9'u (Action Pages önerisi)
   yazar platformunu Action Pages'in SONRASINA koyuyordu — bu gerilim
   çözülmeden inşaya başlanmadı, belgeye açıkça not düşüldü.
3. **QBLOGG'un kendi içerik yöneticisi (editör/CMS):** "GitHub'a yazan
   hafif panel" mimarisi onaylandı ve **kodlandı**: `panel/` — üçüncü
   ayrı Vercel uygulaması, `uye/` deseninin devamı ama bağımlılıksız
   (Supabase SDK bile yok, düz `fetch()` ile `api.github.com`). GitHub
   PAT ile giriş, iki işlev: (a) `config.js`'i satır-bazlı yamalayıp
   `main`'e karşı PR açan bir form, (b) yeni yazı fikrini GitHub Issue'ya
   çeviren bir form (yazının kendisini üretmiyor — bilinçli, 10 dilli/
   görünürlük-denetimli üretimin `qblogg-blog-yazisi` becerisine ait
   kalması için).

`patchConfig` mantığı Node'da gerçek `config.js`'e karşı doğrulandı
(hedef alanlar doğru değişti, geri kalanı bayt bayt korundu). Panel arayüzü
Playwright'ta hatasız render oluyor. **Doğrulanamayan tek şey:** panelin
gerçek GitHub API çağrılarının tarayıcı CORS ön-denetiminden geçip
geçmeyeceği — bu ortamın vekil sunucusu test için kullanılamadı (OPTIONS'a
405 dönüyor, ama bu vekile mi GitHub'a mı ait belirsiz). Detay ve ilk-giriş
doğrulama koşulu: `docs/icerik-paneli.md`.

## 02.09.2026 — Vipps/Klarna araştırması (DNB düzeltmesi)

Kullanıcı "Vipps, DNB, ödeme sistemi, Klarna" istedi. Araştırıldı
(dashboard.stripe.com bu ortamdan erişilemiyor, Stripe'ın kendi genel
belgelerinden alıntı): **Klarna** Stripe Payment Links'te ek kurulum
gerektirmeden hazır. **Vipps** destekleniyor ama "private preview"
aşamasında (erişim istenmeli) ve yalnızca NOK'ta çalışıyor — mevcut üç
paket EUR fiyatlı olduğu için Vipps için ayrı, NOK fiyatlı ürünler
gerekiyor. **"DNB" diye ayrı bir ödeme yöntemi yok** — DNB bir banka,
Vipps'in kökeni; muhtemelen Vipps'in kendisi kastedildi. Detay ve
kullanıcının atacağı adımlar: `docs/odeme-sistemi.md` §10.

## 05.09.2026 — NAVIAR: kaynak arşivi + site tamamlama + birleşik konsept

Kullanıcı ChatGPT tarafındaki tüm proje dosyalarını paylaştı (231 dosya);
hepsi bayt doğrulamasıyla `naviar-arsiv/` numaralı ağacına arşivlendi
(BA-001…042 sicili, paketler kendi SHA listeleriyle sınandı). Bu
kaynaklardan siteye taşınanlar: logo v0.2 master aday geometrisi bire
bir, YZ-etiketi korunmuş fotoğraf bandı (142 KB gömülü), yardımcı hattı
cümlesi, prototip veri-minimizasyon notu — ship kapısı 7/7, axe 0 ihlal,
dış istek sıfır. Ardından tüm kaynaklardan damıtılan 12 bölümlük
birleşik konsept yazıldı (`naviar-care/docs/naviar-care-konsept.md`,
her madde Mevcut/Öneri/Açık işaretli) ve artifact sayfası olarak
yayımlandı. Teslim kaydı: `naviar-care/docs/teslim-2026-09-05.md`.
Canlı dağıtım Vercel günlük kota engeline takılı — kod hazır, tek adım
kota açılınca dağıtımı tetiklemek.
