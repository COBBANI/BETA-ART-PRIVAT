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

## 01.09.2026 — Beta Art Privat: tam çeviri (2 faz, 8 dil)

Kullanıcı talebi "/TRANSLATE bütün tekstler tam olarak bütün dillere".
Faz 1: Home'daki sabit İngilizce hero + fotoğrafçı biyosu + Life Flower
manifestosu i18n sözlüğüne taşındı (10 anahtar × 8 dil); pt sözlüğünde
yanlışlıkla İspanyolca kalmış feedback anahtarları düzeltildi. Faz 2:
data.ts'teki 217 içerik metni (3 doğrulama yöntemi, 3 sergi, 4 lisans
katmanı, 16 SSS, 35 kategori, 12 plaka detayı) `Record<Lang,string>`
tipine çevrildi — çeviriler 7 paralel alt-ajanla üretildi, sayısal
değerlerin korunduğu betikle doğrulandı; kalan sabit UI kırıntıları
(provenance zaman çizelgesi, sepet sayacı, yer tutucular) sözlüğe alındı
(8 dil × 195 anahtar). Eser adları, teknik terimler ve yer adları bilinçli
çevrilmedi. tasarim-sistemi.md'deki iki katmanlı model bölümü tam çeviri
modeliyle değiştirildi. Testler: 34/35 (tek fail scratchpad paketindeki
Google Fonts'un sandbox ağ engeli — ortam artefaktı), dil bazlı içerik
spot kontrolleri ve i18n anahtar eşitliği yeşil. Commit'ler: d0a6e9d,
1f252b0 (+ dokümantasyon commit'i); artifact aynı adreste güncellendi.

## 01.09.2026 (öğle) — Beta Art Privat Vercel'de yayında

`create_git_project` üçüncü denemede de `repo_no_access` verdi (kullanıcı
daveti kabul ettiğini bildirdi ama işbirlikçi listesi hâlâ yalnızca
`andersenbetul-alt`; kabul GitHub API'ye yansımadı — muhtemelen yanlış
hesapla yapıldı). Depo bu arada public olduğu için QBLOGG'un kanıtlanmış
tarifine geçildi: yalnızca `vercel.json` gönderilir, `buildCommand`
önce `rm -rf kaynak` yapar (derleme önbelleği klon klasörünü geri
getiriyor; ikinci dağıtım bu yüzden git exit 128 verdi, düzeltildi),
sonra public depoyu `claude/beta-art-privat-g7k5vk` dalından `--depth 1`
klonlar, `apps/beta-art-archive` içinde `npm ci && npm run build`
çalıştırır, `dist/`i çıktıya taşır. Sonuç: proje `beta-art-privat`
(`prj_C9ByJukTJ8xulLpXCDQnunRCIBlh`, BET - ART takımı), derleme 14 sn,
üretim adresi **https://beta-art-privat.vercel.app** (alias otomatik
geldi). SSO Deployment Protection proje oluşturulduğunda kapalı geldi
(01.09 öğleden sonra `get_project_deployment_protection` ile doğrulandı;
önceki "kapatıldı" ifadesi yanlıştı — kapatma işlemi yapılmadı, gerek de
yoktu), adres herkese açık — 200 ve doğru HTML doğrulandı. **Siteyi
güncellemek = dala push + aynı vercel.json ile dağıtımı yeniden
tetiklemek** (git bağlantısı yok; davet sorunu çözülürse git-link'e
yükseltilebilir). Önceki başarısız denemeden kalan boş `beta-art`
projesi (prj_QLewfMpfzgVSOO2FsZoZpmeszbNG) hâlâ silinmeyi bekliyor —
panelden kullanıcı silecek.

## 02.09.2026 (sabah) — Kanıt denetimi bulguları düzeltildi

"Trust the evidence behind every image" denetim workflow'u (126 ajan; iki
oturum-limiti kesintisinden sonra devam ettirildi) 40 bulgu inceledi, 10'u
3 hakemli çürütme turundan ayakta çıktı. Hepsi uygulandı:

- **Satış kapısı (F1):** İndir/sepet düğmeleri artık `verified &&
  plate.image` şartına bağlı — dosyası depoda olmayan bir plaka satışa
  sunulmuyor. "Available" durumu beta-art.com'dan geldiği için elle
  düşürülmedi; yalnızca satış girişleri kapatıldı. Şu an hiçbir plaka
  satılabilir durumda değil: Portrait in Amber ile The Maker'ın
  orijinalleri yüklendiğinde düğme kendiliğinden geri gelir.
- **Provenance dürüstlüğü (F2, F6):** Sergi düğümü artık "tamamlandı"
  değil — serginin kendi verisi "Upcoming / Autumn 2026" diyor; yer de
  sabit ", Oslo." yerine `where` alanından geliyor. Çekim bağlamı düğümü,
  metni "Capture details to be supplied" olan plakada boş nokta gösteriyor.
- **Kimlik rozetleri (F8):** "Identity verified" rozeti Home ve Artists'ten
  kaldırıldı; artistsIntro "kimliği doğrulanmış" iddiasından arındırıldı
  (8 dil). Doğrulama prosedürü kurulunca geri gelir.
- **RAW mutlak iddiası (F3, F5, F9):** Tek gerçek orijinal (Golden Hour)
  iPhone HEIC olduğu için "her plaka RAW ile başlar" evrensel iddiası
  yanlıştı. Yöntem I + iki SSS + vsStock kutusu + fotoğrafçı metni 8 dilde
  "orijinal dosya — kamera üretiyorsa RAW" biçimine yumuşatıldı.
- **Var olmayan otomasyon (F4, F7, F10):** Hero'daki kaynaksız "March 2026"
  tarihi kaldırıldı; teslimat SSS'indeki 72 saatlik link + PDF sertifika
  vaadi gerçek akışla (e-postayla, normalde 24 saat içinde) değiştirildi;
  fatura SSS'indeki "organizasyon numarası + MVA" satırı düz makbuz vaadine
  çevrildi (MVA kaydı yok — komisyon-ve-mva.md'deki bayat "sitede MVA
  ifadesi yok" cümlesi de düzeltildi); cayma hakkı SSS'indeki uydurma
  "checkout'ta kutu işaretleme" adımı e-posta onayına çevrildi.

data.ts başlığına sapma kaydı düşüldü: birebir katmandan her sapmanın
gerekçesi tek tek yazılı (uydurma yasağı > birebir sadakat). Doğrulama:
`tsc -b` + Vite build temiz, Playwright duman testi 7/7 (tarih yok, rozet
yok, görselsiz "available" plakada satış düğmesi yok, sergi düğümü
"Upcoming, Oslo, Norway"). Günlük araştır-geliştir turunun bu günkü
iyileştirmesi bu düzeltme setidir; araştırma notu: dünkü derin araştırma
(doğrulanmamış, kaynaklı) Norveç'te sipariş çekim pilot bandını
kr 7.000–14.000 gösteriyor (NTB üye ~6.900 / liste ~13.800; arşiv tek
kullanım 3.770+MVA) — fiyat sayfası kurulurken elle teyit edilecek.

## 02.09.2026 (öğleden sonra) — Sosyal medya kanalları geliştirildi

Kullanıcı talebi "sosyal medya kanalları geliştir". Üç parça:
(1) `docs/beta-art/sosyal-medya.md` — kanal planı tek kaynağı: IG + LinkedIn
öncelikli (Pinterest 2. ay, TikTok/X bilinçli kapalı), yapıştırmaya hazır
biyografiler (EN+NO), 5 içerik sütunu, 4 haftalık 12 gönderilik takvim.
Dürüstlük çerçevesi başa yazıldı: tek gerçek fotoğraf (Golden Hour) var,
görsel gerektiren diğer gönderiler marka kartı; kullanıcı adı müsaitliği bu
ortamdan doğrulanamadığı için adaylar "doğrulanmadı" işaretli; sayı/istatistik
uydurulmaz. (2) `config.ts → SOCIAL_LINKS` (boş) + Footer'da yalnızca URL
doldurulunca görünen "Follow" bloğu (footerFollow ×8 dil) — ölü bağlantı
yayınlanmaz. (3) `index.html`e paylaşım meta'ları: og:site_name/url/image +
twitter kartı, görsel Golden Hour web kopyası (-phi adresi; alan adı
bağlanınca güncellenecek, sosyal-medya.md açık işlerde). Doğrulama: build
temiz, Playwright: Follow bloğu boş linklerle gizli, footer sağlam.
Hesap açılışı adım adım kullanıcıya yazıldı; URL gelince config doldurulup
dağıtım yenilenecek.

## 02.09.2026 (akşam) — Müşteri davranış sistemi kuruldu

Kullanıcı talebi (NO): "bir müşteri davranış sistemi kur — müşterinin bir
sonraki sefer ne görmek/satın almak istediğini bulalım, tüm sayfalarda".
Statik sitede dürüst v1: TAMAMEN cihaz-içi. `src/lib/behavior.ts`
localStorage'a görüntü/filtre/sepet olaylarını (ağırlık 1/2/4) yazar,
kategori yakınlığına göre katalogdan öneri üretir; hiçbir ağ isteği, çerez,
analitik, parmak izi yok. `src/components/ForYou.tsx` "Picked for you"
şeridi ana sayfa (koleksiyon altı) + plaka + sepette; soğuk başlangıçta hiç
görünmez (dolgu yok), temel satırı "nothing is sent anywhere" ve "Forget my
activity" düğmesi (kaydı siler) şeffaflık/kontrol için. record() bir pencere
olayı yayar, şerit dinler → o anki plaka görüntüsü aynı ziyarette öneriyi
canlı günceller. İzleme: router (gezinme), PlateDetail (görüntü+sepet),
Home Collection (filtre). Metinler 8 dilde (recoTitle/recoBasis/recoReset).
Çapraz-ziyaretçi analitiği, hesap profili, satın alma tahmini bilinçle
kapsam dışı (backend + rıza ister — uydurma yasağı); davranis-sistemi.md'de
sonraki adım olarak yazılı. Doğrulama: build temiz, Playwright 7/7.

## 02.09.2026 (gece) — Yönetici satış takip sistemi + iki-sistem ayrımı

Kullanıcı talebi: "satış takip sistemi kur — web sayfasını yöneten kişi
için", ardından "web sayfasını düzenleyen kişi ve kullanıcılar için ayrı
sistem kuruyoruz". Böylece iki ayrık sistem netleşti: ziyaretçi →
davranış/öneri (ba_davranis_v1), yönetici → satış defteri (ba_satis_v1);
kod ve depolama tamamen ayrı, admin sayfası davranış profili kaydetmiyor.
Yönetici sistemi: gizli /#admin (nav/footer'da yok, hashchange ile
bookmark'tan da açılır), cihaz-yerel satış defteri. `src/lib/sales.ts` para
modelini (komisyon-ve-mva.md) uygular: net = brüt−kesinti, %30/%70, kendi
plakasında komisyon yok, MVA yok; Stripe kesinti tahmini %1,5+1,80.
`src/pages/Admin.tsx`: satış ekleme formu (kesinti otomatik), özet kartları
(brüt/kesinti/net/BA payı/ödemeler), fotoğrafçı başına ödeme listesi, CSV
dışa aktarım, satır silme. Admin iç araç olduğu için etiketler i18n dışı düz
EN/NO (belgede gerekçeli). Güvenlik notu açıkça yazıldı: /#admin parola
korumalı değil, veri yalnızca yöneticinin tarayıcısında. Otomatik Stripe
kaydı, parolalı çok-cihaz panel, ödeme durumu takibi bilinçle kapsam dışı
(backend ister) — satis-takip.md'de sonraki adım. Doğrulama: build temiz,
Playwright 8/8 (kullanıcıya görünmez, panel açılıyor, kendi plakası net
185,35, dış fotoğrafçı payout 129,7x, ayrı depolama anahtarı, reload kalıcı).

## 02.09.2026 (gece, ek) — Satışlar grafikte gösteriliyor

Kullanıcı talebi "satışları grafikte göster". Yönetici panelinde (/#admin)
aylık brüt gelir çubuk grafiği. Form: büyüklük/zaman → çubuk; tek seri
(brüt) → tek renk (tema accent tokenı, açık/koyu temada zaten doğrulanmış),
efsane gerekmez. `sales.ts → monthlyTotals()` satışları takvim ayına göre
gruplar (net/BA payı/adet dahil). `Admin.tsx → RevenueChart`: satır içi SVG,
yuvarlak-tepeli çubuklar, taban çizgisi resesif, her çubukta doğrudan kr
etiketi, ay etiketi, çubuk başına hover (adet + net). Tablo görünümü zaten
satış listesi. Doğrulama: build temiz, Playwright 6/6 (aylık gruplama,
toplam etiketleri, hover ayrıntısı) + ekran görüntüsüyle görsel kontrol.

## 02.09.2026 (gece, ek) — small-business eklentisi Beta Art'a göre özelleştirildi

Kullanıcı talebi: "small-business eklentisini şirketime göre özelleştir" →
Beta Art seçildi, "kur + şirket profili yaz" yaklaşımı. Eklenti
(knowledge-work-plugins marketplace, ~31 iş akışı becerisi + QuickBooks/
HubSpot/Stripe/Square/PayPal/Docusign/Gsuite/Canva araçları) kurulu değildi;
kurulum kartı gösterildi (kullanıcı etkinleştirecek). Uzak marketplace
eklentisinin kaynağı yerel düzenlenemediği için özelleştirme vektörü:
`docs/beta-art/sirket-profili.md` — iş akışlarının okuyacağı tek şirket
bağlamı. Gerçek/doğrulanmış verilerden derlendi (komisyon-ve-mva.md,
config.ts, CLAUDE.md); bilinmeyen alanlar [DOLDURULACAK] işaretli (uydurma
yasağı). Kritik ezmeler: MVA kaydı yok (fatura/tax akışları MVA
hesaplamamalı, ciro 50.000 kr eşiğini izle-uyar), enkeltpersonforetak →
bordro yok/forskuddsskatt, gerçek araç yığını (Stripe henüz canlı değil,
QuickBooks/HubSpot yok — varsayma, sor), satış defteri cihaz-yerel /#admin.
Her iş akışının Beta Art'a göre yorumu özetlendi.

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

## 03.09.2026 (06:17 cron) — Günlük araştır-geliştir turu

**Sağlık:** Canlı site (beta-art-privat-phi.vercel.app) bu cron turunda
WebFetch ile doğrulanamadı — egress proxy vercel.app'i bu tetiklenmiş
ortamda engelliyor (bilinen sınır, sitenin kendisi değil). Site ana
oturumda 03.09 00:14'te Vercel API + ekran görüntüleriyle READY
doğrulanmıştı; ayrı bir arıza belirtisi yok.

**Araştırma — C2PA / Content Credentials benimsenmesi 2026 (kaynaklı,
doğrulanmamış üçüncü-taraf iddiaları):** Donanım tarafında C2PA gerçek ama
"benimsenme döngüsü" hâlâ çözülmüş değil: Leica M11-P (Ekim 2023) ilk
tüketici gövdesiydi; 2026'da Nikon Z9/Z8, Sony Alpha akışları, Canon'un
11.05.2026'da duyurduğu Authenticity Imaging System (haber odaları için
yakalamadan yayına C2PA), telefon tarafında Samsung Galaxy S25 ve Google
Pixel 10 imzalıyor. Ama Pixel/Leica dışındaki tüketici telefonları hâlâ
natif imzalamıyor, yani kullanıcı üretimi içeriğin çoğu imzasız kalıyor
(kaynaklar: softwareseni.com, c2paviewer.com, attesttrail.com,
lumethic.com). **Beta Art için çıkarım:** sitenin C2PA dilini "kameranın
desteklediği yerde" diye sınırlı tutması doğru kalıyor — çoğu gövde hâlâ
imzalamadığı için C2PA'yı evrensel vaat gibi sunmak yanlış olurdu; mevcut
kapsamlı ifade korunuyor. İleride Leica/Nikon gövdesi kullanılırsa
C2PA'yı o plaka için somut kanıt olarak öne çıkarmak gerçek bir
farklılaştırma olur (uydurma değil, donanım imzasına dayalı).

**Geliştirme (küçük, güvenli — a11y):** `src/lib/langContext.tsx` —
`<html lang>` yalnızca kullanıcı dili değiştirince güncelleniyordu; ilk
yüklemede localStorage'dan gelen dil (ör. Norveççe) için `index.html`'in
sabit `lang="en"`'i kalıyordu. Bir mount effect'i eklendi; artık `lang`
her değişimde (ilk yükleme dahil) `document.documentElement.lang`'a
yansıyor. Ekran okuyucular doğru dili duyurur, çok dilli SEO doğru dil
sinyali alır. `setLang` içindeki artık gereksiz satır temizlendi.
Doğrulama: apps/beta-art-archive `npm run build` temiz. Canlıya alma bir
sonraki ana oturum turunda yapılacak (bu cron turunda Vercel MCP yok).

**Kullanıcı adımları (açık, üsteleme yok):** 4 yasal metin, Stripe ödeme
yöntemi (Vipps/Klarna/DNB kararı komisyon-ve-mva.md'de), beta-art.com
alan adı, 3 orijinal foto, IG/LinkedIn hesapları — hepsi hâlâ kullanıcıda.

## 03.09.2026 (akşam turu) — Sağlık + C2PA sertifika-yönetişimi araştırması

**Sağlık:** `https://beta-art-privat-phi.vercel.app` bu cron turundan
doğrulanamadı — ortamın egress proxy'si adresi engelledi (`EGRESS_BLOCKED`,
beta-art.com'la aynı sınır). Bu bir **doğrulama sınırı**, "site çöktü"
kanıtı değil; canlı durum ancak Vercel MCP'li ana oturum turunda teyit
edilir. Kullanıcıya yanlış "site kapalı" uyarısı verilmedi.

**Araştırma (yeni açı — bugünkü ilk turdaki C2PA kaydını tekrar etmez):**
2026'da C2PA sertifika **yönetişimi** öne çıktı. Canon'un 11.05.2026
Authenticity Imaging System'i sertifikaları **üretici tarafından merkezî**
verip yönetiyor ve güvenilir zaman damgası ekliyor — yani provenance zinciri
giderek donanım üreticisinin işlettiği bir hizmete bağlanıyor. Aynı yıl
Nikon Z6 III'ün imzalama açığı yüzünden **tüm C2PA sertifikaları iptal
edildi** ve hizmet erken 2026 itibarıyla geri gelmedi. OpenAI+Google ise
C2PA'yı SynthID ile "çift katman" olarak birleştiriyor (kaynaklar:
[c2paviewer.com — Canon AIS](https://c2paviewer.com/articles/canon-authenticity-imaging-system),
[eyesift.com — C2PA 2026](https://www.eyesift.com/faq/c2pa-content-credentials-2026-cryptographic-provenance-adoption/),
[c2paviewer.com — OpenAI/Google](https://c2paviewer.com/articles/openai-google-c2pa-synthid-2026)).
**Beta Art için çıkarım:** Z6 III'ün toptan sertifika iptali, tek bir
imzalama zincirine bel bağlamanın kırılganlığını kanıtlıyor. Beta Art'ın
**üç yöntemli** doğrulaması (RAW arşivi → yakalama kaydı+C2PA → fotoğrafçı
imzalı lisans) bu yüzden doğru kalıyor: C2PA katmanı iptal edilse bile RAW
arşivi ve imzalı lisans bağımsız kanıt olarak durur. Bu, siteye yeni bir
iddia eklemeyi gerektirmiyor — mevcut "redundant doğrulama" konumunu
donanım dünyasındaki gerçek bir olayla destekliyor.

**Geliştirme (bu tur):** Kod değişikliği yapılmadı. Küçük a11y adayı
denetlendi — üç `<img>` (Home/PlateDetail/ForYou) zaten `alt={plate.title}`
taşıyor; grep'in yakaladığı "alt'sız img" çok-satırlı etiket kaynaklı bir
false positive'di. langContext `<html lang>` a11y düzeltmesi bu sabahki
turda zaten yapılmıştı. Çalışan kodu/verbatim beta-art.com metnini gereksiz
ellememek için zorlama değişiklik yapılmadı (cerrahi değişiklik ilkesi).

**Kullanıcı adımları (açık, üsteleme yok):** 4 yasal metin, Stripe ödeme
yöntemi, beta-art.com alan adı, 3 orijinal foto, IG/LinkedIn — hepsi hâlâ
kullanıcıda. Ayrıca: v1.0.0 tag'i (ortam etiket push'ını engelledi, elle
basılacak) ve `beta-art/` (WEB-2026-003) fiziksel taşıma onayı bekliyor.

## 04.09.2026 (sabah turu) — Sağlık + rakip analizi (Stocksy / AI-free pazar yeri)

**Sağlık:** Canlı site (`beta-art-privat-phi.vercel.app`) bu cron turundan yine
`EGRESS_BLOCKED` — bu oturumda tekrar tekrar doğrulanan ortam sınırı, outage
değil. Canlı teyit Vercel MCP'li ana turda yapılır; kullanıcıya yanlış "kapalı"
uyarısı verilmedi.

**Araştırma (yeni açı — rakip/pazar; önceki iki tur C2PA'ydı):** Beta Art'ın
en yakın konum akranı **Stocksy United** incelendi. Stocksy AI üretimi içeriği
**kabul etmiyor** (yalnız insan yapımı), el ile seçilmiş küresel sanatçı
topluluğuyla çalışan bir **platform kooperatifi** (sanatçı-sahipli, Victoria/BC)
ve sektör ortalamasının üstünde telif payı veriyor; lisanslama standart +
genişletilmiş (kaynaklar:
[Stocksy AI SSS](https://support.stocksy.com/hc/en-us/articles/8631710866708-Can-I-upload-AI-generated-content-to-Stocksy),
[Stocksy United — Wikipedia](https://en.wikipedia.org/wiki/Stocksy_United)).
**Beta Art için çıkarım:** "AI-free + insan sanatçı + adil pay" ekseninde
Stocksy zaten güçlü; Beta Art'ın burada tek başına "AI yok" demesi
farklılaştırma değil — pazar bunu Stocksy'de zaten buluyor. Beta Art'ın gerçek
ayrımı **plaka-başı köken doğrulaması** (RAW arşivi + capture kaydı/C2PA +
fotoğrafçı imzalı lisans): Stocksy içeriği küratörlüyor ama her görsel için
bağımsız doğrulanabilir bir köken sertifikası **yayınlamıyor**. Yani mevcut
komisyon belgesindeki Stocksy kıyası (%50/%75 vs Beta Art %70) doğru kalıyor,
ama pazarlama mesajının merkezi "AI yok" değil "**kanıtlanabilir köken**"
olmalı — bu, sitedeki mevcut 3-yöntem doğrulama vurgusuyla zaten örtüşüyor,
yeni iddia gerektirmiyor. `komisyon-ve-mva.md`'deki Stocksy kıyası kaynağıyla
teyit edildi; değişiklik gerekmiyor.

**Geliştirme (bu tur):** Kod değişikliği yapılmadı — dünkü turda a11y/img
denetimi temizdi, zorlama değişiklik cerrahi-değişiklik ilkesine aykırı olur.
Bu tur belge (araştırma günlüğü) teslimi.

**Kullanıcı adımları (açık, üsteleme yok):** 4 yasal metin, Stripe ödeme
yöntemi, beta-art.com alan adı, 3 orijinal foto, IG/LinkedIn; ayrıca v1.0.0
tag (ortam etiket push'ını engelledi, elle basılacak) ve `beta-art/`
(WEB-2026-003) fiziksel taşıma onayı — hepsi hâlâ kullanıcıda.

## 05.09.2026 (sabah turu) — Sağlık + düzenleyici rüzgâr (EU AI Act md. 50)

**Sağlık:** Canlı site (`beta-art-privat-phi.vercel.app`) bu cron turundan yine
`EGRESS_BLOCKED` — bu oturumda tekrar tekrar doğrulanan konteyner egress sınırı,
outage değil. Canlı teyit Vercel MCP'li ana turda yapılır; kullanıcıya yanlış
"kapalı" uyarısı verilmedi.

**Araştırma (yeni açı — düzenleyici; önceki turlar C2PA + Stocksy'ydi):**
AB Yapay Zekâ Yasası'nın (EU AI Act) **50. madde şeffaflık yükümlülükleri
2 Ağustos 2026'da yürürlüğe girdi** (doğrulandı — birden çok bağımsız hukuk
kaynağı ve AB Komisyonu tutarlı). Sentetik ses/görsel/video/metin üreten yapay
zekâ sistemleri çıktıyı hem **makine-okunur biçimde işaretlemek** hem de
**yapay zekâ üretimi olarak saptanabilir kılmak** zorunda; ihlalde ceza
15 milyon € veya dünya cirosunun %3'üne kadar. Piyasada 2 Ağustos 2026 öncesi
bulunan sistemlere makine-okunur işaretleme için 2 Aralık 2026'ya kadar süre
tanındı (AI Omnibus, Mayıs 2026); 2 Ağustos öncesi üretilmiş içerik geriye
dönük etiketlenmiyor. Kaynaklar:
[Sidley — 2 Ağustos 2026 uyum](https://datamatters.sidley.com/2026/06/24/eu-ai-act-transparency-obligations-preparing-for-compliance-by-2-august-2026/),
[Article 50 metni](https://artificialintelligenceact.eu/article/50/),
[AB Komisyonu — şeffaflık kılavuzu](https://digital-strategy.ec.europa.eu/en/policies/guidelines-ai-transparency-obligations).
**Beta Art için çıkarım:** Bu düzenleme, AI üretimi içeriği *zorunlu olarak
etiketli/saptanabilir* hâle getirerek "doğrulanmış insan fotoğrafçılığı"
konumlanmasının pazar değerini artıran bir arka plan. 04.09 turunun çıkarımıyla
birleşince yön netleşiyor: Beta Art'ın mesajı "AI yok" (Stocksy bunu zaten
karşılıyor) değil, **kanıtlanabilir köken** olmalı — ve C2PA'nın makine-okunur
işaretlemesi md. 50(2) ile teknik olarak örtüşüyor, yani Beta Art'ın 3-yöntem
doğrulama vurgusu düzenleyici çerçeveyle aynı dili konuşuyor. **Bu bir pazar/
bağlam bulgusudur; Beta Art'ın kendi md. 50 uyumu hakkında bir iddia DEĞİLDİR**
(site AI içerik üretmiyor, arşivliyor — yükümlülük üreticiye ait). Site
metnine bu turda hiçbir doğrulanmamış "uyumlu/sertifikalı" ibaresi eklenmedi.

**Geliştirme (bu tur):** Kod değişikliği yapılmadı. Güvenli küçük adaylar
(JSON-LD, temel SEO meta, footer yasal-bağlantı düzeltmesi) kullanıcının açık
onayına sunulmuş durumda — onaysız başlamak "cerrahi değişiklik/önce sadelik"
ilkesine ve bekleyen karara aykırı olur. Bu tur belge (araştırma günlüğü)
teslimi; siteyi etkilemiyor, dağıtım gereksiz.

**Kullanıcı adımları (açık, üsteleme yok):** 4 yasal metin, Stripe ödeme
yöntemi, beta-art.com alan adı, 3 orijinal foto, IG/LinkedIn; ayrıca v1.0.0
tag (ortam etiket push'ını engelledi, elle basılacak) ve `beta-art/`
(WEB-2026-003) fiziksel taşıma onayı — hepsi hâlâ kullanıcıda.

## 06.09.2026 (sabah turu) — Sağlık + rakip politikası (Getty vs Adobe Stock / C2PA denetim altyapısı)

**Sağlık:** Canlı site (`beta-art-privat-phi.vercel.app`) bu cron turundan yine
`EGRESS_BLOCKED` — konteyner egress sınırı, outage değil (bu oturumda tekrar
tekrar doğrulandı). Canlı teyit Vercel bağlayıcılı ana turda; kullanıcıya
yanlış "kapalı" uyarısı verilmedi.

**Araştırma (yeni açı — iki büyük stok evinin ayrışan AI politikası):**
2026 itibarıyla **Getty Images / iStock birincil olarak AI ile üretilmiş
içeriği kabul etmiyor** (yalnız geleneksel çekimde AI-destekli teknik
iyileştirmeye — gürültü azaltma, çözünürlük artırma, rötuş — izin var); buna
karşın **Adobe Stock gen-AI içeriği kabul ediyor ama zorunlu ifşa istiyor** ve
gönderileri **C2PA imzaları, Content Credentials, IPTC ve XMP meta verisi için
tarıyor** — ifşasız AI içerik hesap askısına yol açabiliyor. Kaynaklar:
[Getty — Generative AI SSS](https://www.gettyimages.com/ai/generation/faqs),
[Adobe Stock — gen-AI içerik yönergeleri](https://helpx.adobe.com/stock/contributor/submit-your-content/submit-generative-ai-content/generative-ai-content-guidelines.html),
[Getty — ticari-güvenli gen-AI duyurusu](https://newsroom.gettyimages.com/en/getty-images/getty-images-launches-commercially-safe-generative-ai-offering).
**Beta Art için çıkarım:** Pazar ayrışıyor — Getty/iStock (Stocksy gibi) AI'yı
reddediyor, Adobe Stock kabul edip **C2PA/meta veriyi denetim altyapısı** olarak
kullanıyor. Yani iki uçta da köken/provenans meta verisi ortak doğrulama
zeminine dönüşüyor; C2PA "isteğe bağlı iyi fikir" değil, sektörün fiili denetim
katmanı. Beta Art'ın plaka-başı köken doğrulaması bu zeminin bir adım
yukarısında: Getty bir *politika* beyan ediyor ("AI kabul etmiyoruz"), Beta Art
her görsel için *bağımsız doğrulanabilir* köken sertifikası yayınlıyor. 04.09
(Stocksy) ve 05.09 (EU AI Act md.50) çıkarımlarıyla üçlü tablo netleşiyor:
mesajın merkezi "AI yok" değil **kanıtlanabilir köken**, ve C2PA'yı vurgulamak
sektörün gittiği yönle örtüşüyor. **Bu bir pazar/bağlam bulgusudur; Beta Art'ın
Getty/Adobe ile ortaklığı veya bu platformlarda listelendiği iddiası DEĞİLDİR.**
Siteye doğrulanmamış hiçbir "X platformunda" ibaresi eklenmedi.

**Geliştirme (bu tur):** Kod değişikliği yapılmadı. Güvenli küçük adaylar
(JSON-LD, temel SEO meta, footer yasal-bağlantı düzeltmesi) hâlâ kullanıcının
açık onayında — onaysız başlamak "cerrahi değişiklik/önce sadelik" ilkesine ve
bekleyen karara aykırı olur. Bu tur belge (araştırma günlüğü) teslimi; siteyi
etkilemiyor, dağıtım gereksiz.

**Kullanıcı adımları (açık, üsteleme yok):** 4 yasal metin, Stripe ödeme
yöntemi, beta-art.com alan adı, 3 orijinal foto, IG/LinkedIn; ayrıca v1.0.0
tag (ortam etiket push'ını engelledi, elle basılacak) ve `beta-art/`
(WEB-2026-003) fiziksel taşıma onayı — hepsi hâlâ kullanıcıda.
