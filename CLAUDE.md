# QBLOGG — proje hafızası

Sürekli geliştirilen bir proje. Bu dosya, her yeni oturumun projeyi baştan çözmek
zorunda kalmaması içindir. Bir kural değişirse burayı da güncelleyin.

## Bu depo artık bir monorepo (26.08.2026, güncellendi 30.08.2026)

Kullanıcı kararıyla, dağınık duran ayrı depolar buraya göçürüldü — repo
kökü hâlâ **QBLOGG**'a ait (aşağıdaki her şey QBLOGG içindir), ama alt
klasörler **tamamen ayrı projeler**, kendi bağımlılıkları ve derleme
adımlarıyla:

| Klasör | Ne | Bağımlılık/derleme |
|---|---|---|
| `beta-art/` | **Beta Art** — asıl yön: "Verified Human Photography & Licensing" + inşaat sektörü proje-kapanışı dokümantasyon arşivi. **Yapısı henüz kesinleşmedi:** 26.08'de tek bir React/Vite/Supabase kod tabanı (eski `andersenbetul-alt/beta-art-archive`, 45 commit) buraya taşındı, ama 30.08'de gelen daha yeni belgeler (`beta-art/source-review/intake-2026-08-30/`) üç ayrı alt-proje öneriyor: **BAP-01 Privat** (fotoğraf/edisyon), **BAG-03 Galeri**/Utstilling Event (sanatçı/sergi), **BAB-02 Business** (inşaat dokümantasyonu) — ve React kodunun yalnızca `beta-art-privat/app-reference/` altında referans olması gerektiğini söylüyor. Bu iki yapı henüz uzlaştırılmadı, kullanıcıya soruldu. **QBLOGG'daki `docs/beta-art-konsept.md`'de yazılan "AI destekli görsel stüdyo" fikri Beta Art'tan REDDEDİLDİ** — o fikir yaşıyor ama artık bağımsız bir marka: bkz. `docs/beta-ai-konsept.md` ("Beta AI"). | React + Vite + TypeScript + Supabase (bun.lock). Kendi `npm i`/`bun install` gerekir — QBLOGG'un "sıfır bağımlılık" kuralı buraya uygulanmaz. |
| `eve-slack-agent/` | Vercel "eve" Slack ajanı şablonu — **değiştirilmemiş boilerplate**, henüz özel içerik yok | pnpm workspace |
| `eve-chat-template/` | Vercel "eve" sohbet şablonu (Next.js) — **değiştirilmemiş boilerplate** | Next.js, kendi paket yönetimi |

**"Beta AI" (30.08.2026, henüz kod yok):** `docs/beta-ai-konsept.md` —
Beta Art'tan (fotoğraf arşivi) ve QBLOGG'dan (içerik stüdyosu) tamamen
bağımsız, üçüncü bir marka/ürün fikri: küçük işletmelere insan seçkili
AI görsel/marka paketi satan bir stüdyo. Henüz yalnızca kavram belgesi;
kendi klasörü, kod tabanı veya alan adı yok (§M'de açık kararlar).

**Kural:** Bu alt klasörlerde çalışırken QBLOGG'un "Değişmez kurallar"ı
(aşağıda) uygulanmaz — onlar yalnız repo kökündeki QBLOGG dosyaları için
geçerli. `beta-art/` kendi CLAUDE.md'sini henüz yazmadı; oraya girildiğinde
önce `beta-art/BETA_ART_MASTER.md`, `beta-art/BETA_ART_SINGLE_SITE_ARCHITECTURE.md`
ve `beta-art/source-review/intake-2026-08-30/PROJECT-MANIFEST.md` okunmalı
(üçü şu an kısmen çelişiyor, yukarıya bakın). `npm run check`/`guvenlik`/
`gorunurluk` betikleri yalnız repo köküne (QBLOGG) bakar, `beta-art/`
içini denetlemez.

**Her proje klasörünün kendi `source-review/` ham kaynak arşivi var**
(`docs/arsiv-sistemi.md`) — yeni bir dosya/belge geldiğinde önce hangi
projeye ait olduğu belirlenir, sonra o klasörün `source-review/
intake-<tarih>/` altına olduğu gibi kaydedilir.

**Göçürülemeyenler (erişim sınırı):** Vercel takımındaki `naviar-care`,
`naviar-care-1`, `hximusic`, `naerhjelp-pilot`, `naerhjelp-pilot-v2`,
`cobban` ve Vercel'deki "beta-art" adlı proje — hepsi `betulandersen-droid`
adlı **farklı bir GitHub hesabına** bağlı; bu oturumun GitHub erişimi
tek hesapla sınırlı ("cross-tier adds are not supported"). Bunlar için
ayrı bir oturum, o hesabı kaynak alarak açılmalı. `andersenbetul-alt/qb`
ve `andersenbetul-alt/qblogg` depoları da kontrol edildi — ikisi de boş,
göçürülecek bir şey yok.

## Proje nedir

QBLOGG, şirketlere içerik hattı satan bir stüdyonun tanıtım + blog sitesidir:
SEO blog yazısı, LinkedIn serisi, sosyal içerik, newsletter ve çok dilli yayın.
Sitenin işi trafik toplamak değil, **brief formunu doldurtmaktır**.

Hedef kitle: kendi içerik ekibi olmayan, düzenli yayın yapmak isteyen KOBİ ve
SaaS şirketleri. İkincil kitle: stüdyoya katılmak isteyen yazarlar.

## Teknik yapı

Saf HTML + CSS + JavaScript. **Derleme adımı, çatı (framework) ve bağımlılık yok** —
bu bilinçli bir tercih: site herhangi bir statik sunucuya olduğu gibi yüklenir.
Yeni bağımlılık eklemeden önce bunun gerçekten gerekli olduğunu doğrulayın.

```
index.html          Tanıtım: hero, hizmetler, içerik akışı, paketler, son yazılar, bülten
work.html           Bizimle çalışın: marka briefi + yazar başvurusu, süreç, SSS
blog.html           Yazı listesi: arama + kategori filtresi
gizlilik.html       Gizlilik ve veri koruma metni (TR + EN)
kosullar.html       Kullanım ve hizmet koşulları (TR + EN)
post.html           Yazı detayı (?slug=... ile)
assets/js/config.js Yayın ayarları: e-posta, alan adı, sosyal hesaplar, fiyatlar, lead magnet
assets/css/main.css Tek stil dosyası; tüm renkler :root değişkenlerinden gelir
docs/tasarim-sistemi.md Belirteçler, ikon kuralı, RTL, dış tasarım çeviri listesi
assets/brand/       Kimlik: sembol, kilitler, ikonlar, favicon (scripts/marka-uret.py üretir)
assets/js/i18n.js   Dil listesi (QB_LANGS) + 10 dilde metinler (QB_I18N)
assets/js/posts.js  Blog içeriği (QB_POSTS): her yazı 10 dilde
assets/js/app.js    Dil, tema, liste/arama/filtre, yazı sayfası, sekmeler, formlar
scripts/check.mjs   Proje sağlık kontrolü
scripts/gorunurluk.mjs Yayınlanmış yazıları görünürlük kurallarına karşı denetler
scripts/guvenlik.mjs   Güvenlik ve veri koruma denetimi
scripts/onizleme.mjs   Tüm siteyi tek tıklanabilir HTML dosyasına gömer

engine/             Curiosity Engine (site değil, üretim hattı)
  schema.sql        Sinyal → konu → makale tabloları
  schema-billing.sql Ödeme: hesap, ürün, abonelik, kredi defteri, yetki, webhook
  billing.mjs       Kredi bakiyesi, yetki, webhook tekilliği, para biçimi
  visibility.mjs    16 maddelik görünürlük kuralının çalışan denetimi
  run.mjs           Topla → kümele → puanla → kuyruğa al
  write.mjs         Araştırma → makale → SEO → gelir → kalite + görünürlük kapısı
```

## Değişmez kurallar

1. **Dil bütünlüğü.** Diller: tr, en, zh, hi, es, ar, fr, pt, ru, no. Yeni bir metin
   anahtarı eklerken **on dile birden** eklenir. Eksik anahtar sessizce İngilizceye
   düşer; bu bir güvenlik ağıdır, çözüm değildir.
2. **Arapça RTL.** Yön bağımlı CSS yazmayın: `margin-left` yerine `margin-inline-start`,
   `left` yerine `inset-inline-start`. Yeni bir bölüm eklediğinizde Arapçaya geçip bakın.
3. **Metin HTML'de sabitlenmez.** Görünen her metin `data-i18n` (veya `data-i18n-attr`,
   `data-i18n-title`, `data-i18n-content`) ile sözlükten gelir. HTML'deki Türkçe metinler
   yalnızca JavaScript kapalıyken görünen yedeklerdir.
4. **Emoji kullanılmaz, ikon çizilir.** Görünen her ikon satır içi SVG'dir:
   24×24 ızgara, `fill="none"`, `stroke="currentColor"`, `stroke-width="1.7"`,
   yuvarlak uç ve birleşim. Emoji'yi işletim sistemi çizer — Windows, Android ve
   macOS üç farklı görünüm verir, marka kendi görselinin kontrolünü kaybeder.
   Yazı ikonları `app.js` içindeki `ICONS` kaydında adla durur (`icon: 'coin'`);
   sayfa ikonları doğrudan HTML'e gömülür. Ok ve tema düğmesindeki tek renkli
   metin işaretleri (`→ ↑ ☾ ☀`) bunun dışındadır; onlar yazı tipiyle çizilir.
5. **Renkler değişkenlerden gelir.** Doğrudan hex yazmayın; `var(--brand)`, `var(--text)`
   gibi değişkenleri kullanın ki koyu tema kendiliğinden çalışsın. Marka renkleri:
   Midnight Navy `#082C54` ve Electric Aqua `#00D8C2`. **Aqua beyaz üzerinde 1,8:1'dir
   ve metinde kullanılamaz**; açık zeminde metin için `var(--brand-2-ink)` (`#0a7d72`,
   5,0:1). Logo halkası `var(--logo-ink)` ile temaya göre döner, aqua köprü sabittir.
   Yazı boyutu da aynı kuraldadır: ham `rem` yazmayın, `--fs-2xs`…`--fs-xl`
   basamaklarını kullanın. Başlıkların `clamp()` değerleri ve `em` göreli boyutlar
   (ilk harf, `code`) ölçeğin dışındadır.
6. **Sayfa iskeleti sekiz dosyada tekrar eder** (`index`, `work`, `blog`, `post`,
   `gizlilik`, `kosullar`, `kalite`, `ornek` — `404` kasıtlı hariç, o kendi başına
   bir sayfa). Menü veya altbilgiyi değiştirirken sekizini birden güncelleyin.
   `check.mjs` çiftlenen id ve script'leri yakalar ama eksik menü bağlantısını
   yakalamaz — bunun için `.claude/skills/qblogg-sayfa-iskeleti/` becerisini kullanın,
   kendi doğrulama betiğini taşır.
7. **Kimlik işi tescil standardına göre yapılır.** Üretilen her logo, ikon ve
   marka varlığı şu üç kapıdan geçmek zorunda; "sonra bakarız" denmez:
   **(a) Yeniden üretilebilirlik.** Varlık bir betikten çıkar, elle çizilmez.
   Betik boş bir klasörde çalıştırılınca aynı dosyaları bayt bayt üretmeli.
   Bağımlılık sürümleri sabit (`scripts/requirements.txt`).
   **(b) Kaynak ve hak kaydı.** Kullanılan her yazı tipi ve dış varlık için
   sürüm, telif, kaynak adresi, lisans ve dosya özeti kayıtlı olmalı
   (`assets/fonts/KAYNAK.md`). Lisans metni ezberden yazılmaz, indirilir.
   **(c) Başvuru biçimi.** `node scripts/marka-tescil.mjs` şekil markası
   dosyalarını EUIPO zarfına göre üretir ve denetler: JPEG, en fazla
   2835×2010 px, 96–300 DPI, 2 MB altı, renk modu RGB/Gri/S-B/CMYK; sicilde
   250×250 görünür. Renk modu kuralı `RENK_MODLARI` dizisinde tek kaynakta
   durur ve `npm run tescil-testi` onu sınar. Zarf dışına çıkan dosya varsa çıkış kodu 1.
   Detay ve kapalı kalan hukuk maddeleri: `docs/marka-tescili.md`.
   **(d) Belge varlığı anlatır.** `npm run marka-dogrula` belgedeki her ölçüyü
   üretilen dosyalardan yeniden ölçüp karşılaştırır; uyuşmazlıkta çıkış kodu 1.
   Gerekçe: belgede iki yanlış ölçü bulundu, biri var olmayan bir işlemi
   anlatıyordu. Yapım kaydı yanlışsa tescil dosyası da yanlıştır.
   **Uydurma yasak.** Marka müsaitliği, tescil edilebilirlik ve kullanıcı testi
   sonucu hakkında doğrulanmamış hiçbir şey yazılmaz. Kurum siteleri bu ortamda
   engelli (`euipo.europa.eu`, `guidelines.euipo.europa.eu`, `eur-lex.europa.eu`,
   `wipo.int`, `tmdn.org`, `patentstyret.no`, `brreg.no` — 22.08.2026'da yeniden
   ölçüldü). **Ama alıntı yoluyla okunabiliyor:** Firecrawl aramasının sonuç
   açıklamaları EUIPO'nun kendi sayfalarının metnini taşıyor. Bu yolla elde
   edilen kriterler ve ücretler `docs/marka-tescili.md`'de kaynağıyla kayıtlı;
   hepsi "sayfa doğrudan açılamadı, başvuru öncesi elle teyit edilmeli" notuyla.
   **Kendi tedbirimizi kurum şartı gibi yazmak da uydurmadır** — progressive
   JPEG yasağı bu şekilde yanlış yazılmıştı, 22.08'de düzeltildi.
8. **Rakamlar örnek olarak işaretlenir.** Paket fiyatları ve blog yazılarındaki ücret
   bilgileri araştırma/örnek veridir. Kesin vaat gibi sunmayın; abartılı iddia bu işte
   en pahalı hatadır.

## Çalışma akışı

```bash
npm run dev      # http://localhost:8000
npm run check    # zorunlu: commit öncesi çalıştırın
```

`npm run gorunurluk` yayınlanmış yazıları `engine/visibility.mjs` kurallarına karşı
denetler (tek yazı: `node scripts/gorunurluk.mjs <slug>`). Motorun taslaklara uyguladığı
ölçütü sitenin kendi yazılarına da uygular — kendi kuralımıza uymayan bir hattı
kimseye satamayız.

`npm run onizleme` altı sayfayı, yazı tipleri dahil her şeyi tek dosyaya gömüp
`onizleme/qblogg.html` üretir: sunucu kurmadan, dışarıya hiç istek atmadan
tıklanabilir bir önizleme. Birine site göstermek gerektiğinde bunu kullanın.
Yönlendirme `?page=` ile; `slug` ve `lang` gerçek sorgu dizesinde kaldığı için
`app.js` değişmeden çalışır. Gövde değiştikten sonra `window.QB_BOOT()` çağrılır.

`python3 scripts/marka-uret.py` 14 kimlik varlığının hepsini yeniden üretir —
11 SVG + 3 PNG (favicon-32, apple-touch-icon, og-image). Rasterleştirici stdlib ile yazılı,
yeni bağımlılık yok. Betik hangi klasörden çağrılırsa çağrılsın çalışır (gereken:
`pip install fonttools brotli`). Wordmark ana hatları deponun kendi Inter değişken
fontundan `wght=700`'de örneklenir; dış servis gerekmez. Geometri, ölçümler ve
brief'ten sapma gerekçeleri `docs/logo-sistemi.md`; test protokolleri ve marka
araştırma sayfası `docs/marka-testleri.md`.

`npm run guvenlik` üçüncü bir soruyu sorar: site ziyaretçiye zarar verebilir mi,
topladığı veriyi hukuka uygun işliyor mu? XSS, JSON-LD kaçışı, tabnabbing,
localStorage'daki kişisel veri, gizlilik metni, canonical–hreflang tutarlılığı,
mailto enjeksiyonu, karışık içerik, `rel="sponsored"` ve güvenlik başlıkları.
Yüksek seviyeli bulgu varsa çıkış kodu 1.

`scripts/check.mjs` şunları doğrular: 10 dilde anahtar eşitliği ve boş değer olmaması,
her yazının her dilde başlık/özet/gövdesi, çiftlenen id ve script, HTML'de kullanılan
ama sözlükte olmayan anahtarlar, kırık yerel bağlantılar, sitemap ile gerçek sayfa/slug
uyumu. Kontrol kırmızıysa commit etmeyin.

Tarayıcı testi gerektiğinde Playwright, Chromium ile kullanılabilir
(`executablePath: '/opt/pw-browsers/chromium'`); ayrıca kurulum yapmayın.

## Sık yapılan işler

**Yeni blog yazısı:** `assets/js/posts.js` dizisine nesne ekleyin — `slug`, `category`
(sözlükte `cat.<ad>` olmalı), `date` (YYYY-AA-GG), `accent` (1–6: navy–teal kapak
rampası), `icon` (`app.js` → `ICONS` kaydındaki ad), sonra
`t` / `e` / `b` alanlarını on dilde doldurun. `sitemap.xml`'e de ekleyin.
Sonra `npm run rss` ile `feed.xml`'i yenileyin.

Gövde blokları: düz dize (paragraf), `{h:'…'}` (ara başlık), `{ul:[…]}` (liste),
`{note:'…'}` (uyarı kutusu), `{see:'slug'}` (metin içi yazı bağlantısı — küme
bağlantısı sayılır, `check.mjs` olmayan slug'ı yakalar), `{aff:{t,u,why}}`
(ortaklık bağlantısı).

Paragraf, liste ve not içinde `**vurgu**` yazılabilir. Ara başlıkta çevrilmez.
Kaçırma önce, çeviri sonra yapılır (`rich()`); sırayı bozmayın, yoksa vurgu
işareti HTML enjeksiyonuna kapı açar. `check.mjs` eşleşmeyen `**` yakalar.

**İki katmanlı içerik modeli.** `tr` ve `en` tam makaledir (30–55 blok, 1.200+
kelime; ölçütü `npm run gorunurluk`). Kalan sekiz dil **özet katmanıdır**: her
yazıda üç blok, 250–1.200 karakter. Bu bir eksik değil, tasarım — `check.mjs`
ikisini ayrı eşiklerle denetler. Özet katmanındaki eşik kalite hedefi değil,
boşalma korumasıdır; diller arasında yoğunluk çok farklı olduğu için tek bir
kelime sayısını kalite ölçütü saymak her seferinde en yoğun dili cezalandırır.
Kelime sayacı CJK duyarlıdır (Çince boşluk kullanmaz; naif `split(/\s+/)`
bir paragrafı tek kelime sayıyordu).

Ayrıca iki alan görünürlük kuralı gereği doldurulur:
- `orig` — bu sayfanın özgün katkısı tek cümleyle (kendi verisi, testi, tablosu).
  Yoksa `gorunurluk.mjs` yazıyı `yayinlanamaz` işaretler.
- `src` — kaynak listesi, `[{t:'başlık', u:'https://…'}]`. `u` isteğe bağlıdır:
  adresi doğrulanmamış bir kaynağı uydurma bağlantıyla yayınlamayın, adıyla yazın.
  **Adres yoksa `nu` ile gerekçesini yazın** (`{t:'…', nu:'adres doğrulanmadı; …'}`) —
  böylece kural gereği adressiz kaynakla unutulmuş adres birbirinden ayrılır.
  `nu` sayfada görünmez, yalnızca denetim içindir.
  En az üç kaynak; para/kariyer konularında bu bir kural, öneri değil.

**Yeni bölüm/sayfa:** metinleri önce `i18n.js`'e on dilde ekleyin, sonra HTML'i
`data-i18n` ile yazın. Dört sayfanın menüsünü ve altbilgisini güncelleyin.

**Yeni dil:** `QB_LANGS`'a `{ code, name, native, dir }` ekleyin, `QB_I18N.<kod>`
sözlüğünü İngilizcedeki tüm anahtarlarla doldurun, yazılara aynı kodu ekleyin,
`hreflang` etiketlerini ve `sitemap.xml`'i güncelleyin.

## Çalışma ilkeleri

Karpathy'nin LLM kodlama tuzakları üzerine gözlemlerinden türetilmiş dört ilke
(kaynak: github.com/forrestchang/andrej-karpathy-skills). Bunlar davranış
kuralıdır; yukarıdaki **Değişmez kurallar** projeye özgüdür ve çelişki hâlinde
onlar kazanır.

**Denge:** bu ilkeler hızdan çok temkini seçer. Önemsiz işlerde muhakeme kullanın.

**1. Kodlamadan önce düşün.** Varsayma, kafa karışıklığını gizleme, ödünleşimi
söyle. Uygulamadan önce varsayımlarını açıkça yaz; birden fazla okuma varsa
sessizce birini seçme, ikisini de sun. Daha basit bir yol varsa söyle; gerektiğinde
itiraz et. Bir şey belirsizse dur, neyin belirsiz olduğunu adlandır, sor.

**2. Önce sadelik.** Sorunu çözen en az kod, fazlası yok. İstenmeyen özellik yok.
Tek kullanımlık kod için soyutlama yok. İstenmemiş "esneklik" yok. İmkânsız
senaryolar için hata yakalama yok. 200 satır yazdıysan ve 50 yeterliyse, yeniden yaz.

**3. Cerrahi değişiklik.** Yalnızca dokunman gerekene dokun; yalnızca kendi
dağınıklığını topla. Komşu kodu, yorumu, biçimlendirmeyi "iyileştirme". Bozuk
olmayanı yeniden düzenleme. Kendi tarzın farklı olsa da mevcut tarza uy. İlgisiz
ölü kod görürsen **söyle, silme**. Kendi değişikliğinin yetim bıraktığı import ve
değişkenleri temizle; önceden var olan ölü kodu istenmedikçe kaldırma.
Ölçüt: değişen her satır doğrudan istenen işe kadar izlenebilmeli.

**4. Hedefe göre yürüt.** Başarı ölçütünü tanımla, doğrulanana kadar döngüde kal.
"Doğrulama ekle" → "geçersiz girdiler için test yaz, sonra geçir". "Hatayı düzelt"
→ "hatayı üreten test yaz, sonra geçir". Bu projede doğrulama katmanı hazır:
`npm run check`, `npm run guvenlik`, `npm run gorunurluk`. Çok adımlı işlerde
kısa bir plan yaz ve her adımın yanına doğrulamasını koy.

Bu ilkeler işe yarıyorsa: diff'lerde gereksiz değişiklik azalır, fazla
karmaşıklıktan doğan yeniden yazımlar azalır ve açıklayıcı sorular hatadan sonra
değil önce gelir.

## Kullanıcıya iş devrederken

Kullanıcının kendi yapması gereken bir adım varsa (izin verme, DNS, panel ayarı,
terminal komutu) **adım adım anlatın**: nereye tıklanacak, ne yazılacak, ne
görünmesi gerekir, hata gelirse ne yapılır. "Vercel'e deploy edin" yetmez;
komutun kendisi, beklenen çıktı ve olası hata mesajı yazılır. Bu kullanıcının
açık talebi.

## Bilinen sınırlar / açık işler

- Dil değişimi istemci tarafında; arama motoru tek HTML görür. Çok dilli SEO'dan tam
  verim için her dili ayrı URL'de üreten bir ön-render adımı gerekir.
- Formlar `mailto:` taslağı üretir (sunucu yok). Gerçek forma geçiş noktası: `app.js`
  içindeki `composeMail`. Alıcı adres, alan adı, fiyatlar ve sosyal hesaplar
  **`assets/js/config.js`** içinde — yayına almak için başka dosyaya dokunmak gerekmez.
- Bülten kaydı Buttondown'a POST ediliyor (`config.js → newsletterEndpoint`).
  **Yeni bir dış servis bağlarken `vercel.json` → CSP `connect-src`'ye de eklenmeli**,
  yoksa istek sessizce engellenir. `npm run guvenlik` bunu artık denetliyor.
- Ortaklık bağlantısı `{aff:{t,u,why}}` bloğuyla eklenir; bildirim kutusu,
  `rel="sponsored nofollow noopener"` ve gerekçe denetimi kendiliğinden çalışır.
  Gelir katmanlarının tamamı için `docs/gelir-sistemi.md`.
- Push artık çalışıyor (22.08.2026 akşamı: kullanıcı GitHub App'i kurdu; önceki
  "push izni yok / 69 commit yerelde" kaydı o günün öğleden önceki durumuydu).
  `main` kullanıcının açık izniyle QBLOGG sitesine çevrildi: `-s ours
  --allow-unrelated-histories` merge'ü ile eski saat uygulamasının geçmişi
  korunarak ağaç QBLOGG yapıldı. Geliştirme dalı `claude/qblogg-web-sayfasi-upcarm`.
- **Site Vercel'de yayında (22.08.2026).** Proje `qblogg`, takım "BET - ART"
  (`team_xNtowH7U0jXQrI53DFJFzH2o`), üretim adresi qblogg.vercel.app (23.08 gecesi proje panelde silinmişti; aynı adla yeniden kuruldu — proje id değişti, eski qblogg-flame/qblogg-bet-art adresleri geçersiz).
  Kurulum tek dosyalık: dağıtıma yalnızca `vercel.json` gönderilir (depodaki
  dosyanın kendisi — tek kaynak); `buildCommand` public depoyu (`main`)
  klonlayıp 6 sayfa + `404.html` + `sitemap.xml` + `robots.txt` + `assets/`i
  `dist/`e kopyalar. Yani **siteyi güncellemek =
  main'e push + aynı dağıtımı yeniden tetiklemek.** Vercel'in GitHub
  entegrasyonu `andersenbetul-alt` hesabına yetkili değil (`repo_no_access`,
  entegrasyon `betulandersen-droid`a bağlı); kullanıcı yetkiyi verirse
  `create_git_project` ile push başına otomatik dağıtıma geçilebilir.
  qblogg.com alan adının bağlanması kullanıcı tarafında (Vercel panel +
  GoDaddy DNS; ad sunucuları taşınmaz, e-posta MX kayıtları GoDaddy'de kalmalı).
- Haftalık SEO/AI görünürlük izlemesi kurulu: pazartesi 07:00 (Norveç saati).
- FAQPage şeması duruyor ama Google 7 Mayıs 2026'da FAQ zengin sonuçlarını kaldırdı.
  Yapay zekâ aramaları için tutuluyor; zengin sonuç beklemeyin.
- Stripe Norveç ücreti: yurt içi kart %1,5 + 1,80 kr (yurt dışı +%3,25, döviz +%2).
  Fiyatlandırma bu rakamla yapılmalı; stripe.com bu ortamda engelli, karar öncesi
  kaynağı kendiniz doğrulayın.

Öncelik sırası ve iş listesi için `ROADMAP.md`. **Projenin her aşaması ve
yapılanlar `docs/proje-gunlugu.md`'ye işlenir** (kullanıcı talimatı,
22.08.2026): yeni bir aşama kapandığında oraya tarihle kısa kayıt düşün.
