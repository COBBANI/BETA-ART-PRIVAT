# QBLOGG — yol haritası

Proje durumu tek yerde. Bir iş bittiğinde satırı **Bitti**'ye çekin ve tarih düşün;
yeni iş çıktığında uygun aşamaya ekleyin. Öncelik sırası: gelire yakınlık → hıza etkisi →
maliyet.

## İş modeli

| | |
|---|---|
| **Hedef** | Yazılı içerikten hem proje bazlı hem tekrarlayan gelir üretmek |
| **Müşteri** | İçerik ekibi olmayan KOBİ ve SaaS şirketleri; ikincil: stüdyoya katılacak yazarlar |
| **Teklif** | Tek araştırmadan yedi çıktı: blog + LinkedIn + sosyal + newsletter + SEO makalesi + kısa video senaryosu + YouTube taslağı |
| **Gelir** | Tek makale (€150) · Büyüme (€900/ay) · Stüdyo (€2.500/ay) — hepsi örnek başlangıç fiyatı |
| **Kanallar** | Kendi sitesi · Upwork/nDash/ProBlogger · Medium · Substack |
| **Sahip olunan varlık** | Site + e-posta listesi. Platformlar dağıtım kanalıdır, iş değil. |

## Aşamalar

### 1. Yayına alma — **YAYINDA** (22.08.2026 akşamı; süreç: `docs/proje-gunlugu.md`)

> Erteleme kararı aynı gün kalktı: logo bitti, kullanıcı "yayına al" dedi.
> Site qblogg-bet-art.vercel.app adresinde üretimde; güncelleme yolu =
> main'e push + Vercel dağıtımını yeniden tetikleme (CLAUDE.md'de kayıtlı).

| # | İş | Durum | Not |
|---|---|---|---|
| 1 | Depoya yazma izni ver, dalı push et | **Bitti** 22.08 | Kullanıcı GitHub App'i kurdu; dal + main push edildi |
| 2 | Alan adı bağla ve yayına al | **Yarım** 22.08 | Site Vercel'de yayında (MCP üzerinden; sandbox ağı hâlâ `*.vercel.com`'u kapatıyor ama MCP kanalı çalışıyor). qblogg.com DNS'i doğru; alan adı ikinci Vercel hesabından taşınmak için TXT sahiplik doğrulaması bekliyor (`_vercel` kaydı + Verify & Claim) |
| 3 | Gerçek e-posta, alan adı ve fiyatlar | **Hazır — senden veri bekliyor** | Hepsi tek dosyada: `assets/js/config.js` |
| 4 | ~~Paket fiyatlarını güncelle~~ | Birleşti → #3 | Fiyat da config.js'ten geliyor (NOK yazılabilir) |
| 5 | Formu Formspree/Netlify Forms'a bağla | Bekliyor | `composeMail` içindeki `mailto` bloğu |
| 6 | ~~Bülten kaydını e-posta servisine bağla~~ | **Bitti** 21.08 | Buttondown — bkz. #54 |

### 2. Güvenilirlik (öncelik: yüksek — teklif almanın önündeki engel)

| # | İş | Durum | Not |
|---|---|---|---|
| 7 | 2–3 gerçek örnek iş / vaka çalışması ekle | Bekliyor | Yoksa kendi blog yazılarımız portföy olarak kullanılır |
| 8 | Hakkımızda bölümü (kim yazıyor, hangi deneyim) | Bekliyor | Anonim stüdyo dönüşümü düşürür |
| 9 | Gizlilik ve koşullar sayfaları | **Bitti** 21.08 | `gizlilik.html` + `kosullar.html` (TR+EN). Altbilgi bağlantıları altı sayfada canlı. Koşullar: kapsam, fiyat/ödeme, iptal, revizyon, fikri mülkiyet, AI Act 50(4) editoryal sorumluluk, sorumluluk sınırı, Norveç hukuku. **10 `[DOLDURULACAK]` alanı var — yasal kimlik, MVA, ödeme vadesi, editoryal sorumlu adı, yetkili mahkeme** |
| 10 | Örnek teslimat (bir makale + türetilmiş 5 içerik) PDF'i | Bekliyor | Brief formunda "örnek gör" olarak kullanılabilir |
| 41 | **Lead magnet: Otomasyon Keşif Kontrol Listesi** | **Bitti** 18.08 | Bülten kaydı karşılığı indirilir; PDF'e yazdırılabilir |
| 42 | Kendimizi ilk vaka çalışması yapmak | **Bitti** 18.08 | `ai-icerik-studyosu` yazısı: kendi hattımızın ölçülmüş rakamları, TR 1.045 / EN 1.358 |
| 20 | **Blog yazılarını gerçek uzunluğa çıkar** | **Bitti** 20.08 | **10/10 yazı görünürlük kapısından geçiyor** (TR ve EN). Kalan: sekiz dilin kısa sürümleri — bilinçli, `npm run gorunurluk` |
| 51 | P19 AI Receptionist pillar sayfası | **Bitti** 18.08 | İlk dalganın 1 numarası. TR 1.160 / EN 1.533 kelime, 5 kaynak, görünürlük denetimi geçti |
| 52 | Gelir sistemi haritası + huni matematiği | **Bitti** 18.08 | `docs/gelir-sistemi.md`; beş katman, gerçekçi oranlar, kurulum sırası |
| 53 | Ortaklık altyapısı | **Bitti** 18.08 | `{aff:}` bloğu, otomatik bildirim (10 dil), `rel="sponsored"`, gerekçe zorunluluğu |
| 54 | **E-posta servisini bağla** | **Bitti** 21.08 | Buttondown bağlandı. CSP `connect-src`'ye `https://buttondown.com` eklendi — bu olmadan istek sessizce engelleniyordu. Prod CSP başlığı taklit edilerek tarayıcıda doğrulandı: POST gidiyor, `email=` alanı doğru, ihlal yok. **Açık: Buttondown kullanıcı adı `tatil` — halka açık adres `buttondown.com/tatil`, `qblogg` olmalı** |
| 55 | Güvenlik ve veri koruma denetimi | **Bitti** 18.08 | `npm run guvenlik`; 13 kontrol. XSS, JSON-LD kaçışı, tabnabbing, canonical–hreflang, mailto, başlıklar |
| 56 | Gizlilik metni | **Bitti** 18.08 | `gizlilik.html` (TR+EN). Yasal kimlik ve e-posta servisi alanları `[DOLDURULACAK]` işaretli |
| 57 | canonical–hreflang tutarlılığı | **Bitti** 18.08 | `syncCanonical`; kalıcı çözüm ön-render (madde 58) |
| 58 | Ön-render: her dil ayrı adreste | Bekliyor | Çok dilli SEO'dan tam verim için tek gerçek çözüm |
| 59 | P18 KOBİ'de AI'a nereden başlanır | **Bitti** 19.08 | İlk dalganın 3 numarası, Business sütununun kapısı. TR 1.056 / EN 1.351, Anthropic Economic Index verisiyle |
| 60 | P01 AI ile para kazanma yolları | **Bitti** 19.08 | İlk dalganın 4 numarası, huninin en geniş girişi. Yollar kanıt kalitesine göre üçe ayrıldı; "25 yol" hedefi kaynaklanamadığı için kapsam daraltıldı (karar `docs/icerik-mimarisi.md`'de) |
| 61 | Gövde metninde **vurgu** desteği | **Bitti** 19.08 | Üç yazıda düz yıldız basılıyordu. `rich()`: önce kaçır, sonra çevir; check.mjs eşleşmeyen yıldızı yakalıyor |
| 62 | Dönüşüm metni geçişi (conversion copy) | **Bitti** 19.08 | 5 kusur düzeltildi, 2 taahhüt sınırlandı, hero'ya kanıt bağlantısı eklendi. 110 dize, 10 dil |
| 63 | Hero başlığı "beş" → "yedi" | **Bitti** 19.08 | Slogan, akış şeması (5→7 satır), istatistik ve hero.sub aynı sayıya çekildi. LinkedIn postu sayısı olan 5'e dokunulmadı |
| 64 | Paket özelliklerine video/YouTube eklendi | **Bitti** 19.08 | Yalnızca Stüdyo (€2.500) paketine: `p3.f4`. Orta paketin teslim yükü artmadı. `flow.note` yetenek–kapsam farkını söylüyor |
| 65 | P29 AI Safety sütununun kapı sayfası | **Bitti** 20.08 | Üç kova: bugün olan / olması muhtemel / spekülasyon. Sistem kendi doğrulanamayan yanlarını da yazdı. TR 1.005 / EN 1.326, 5 kaynak (hepsi adresli) |
| 66 | Beş eski yazıyı kapıdan geçir | **Bitti** 20.08 | Hepsine kaynak, özgün katkı ve Norveç piyasa karşılaştırması. 10/10 geçiyor |
| 67 | Fiyatları Norveç piyasasına göre düzelt | **Karar bekliyor** | İş geliştirme incelemesi: Tek Makale 2–5 kat düşük, Büyüme negatif marjda. `config.js → prices` |
| 68 | Denetim raporunu kama ürüne çevir | **Karar bekliyor** | Etkin saat ücreti 1.500–2.250 kr; retainer'ın 3–4 katı |
| 21 | NOK fiyat gösterimi ve pazar konumu | Bekliyor | Norveç'te ajanslar 10–40 bin kr/ay, sabit abonelik 3–6 bin kr/ay; €900 ≈ 10.400 kr |

### 3. Trafik (öncelik: orta — gelir 1. ve 2. aşamadan sonra hızlanır)

| # | İş | Durum | Not |
|---|---|---|---|
| 11 | Her dili ayrı URL'de üreten ön-render adımı | Bekliyor | Çok dilli SEO'nun asıl kilidi |
| 12 | Blog yazılarına yapılandırılmış veri (Article/FAQ şeması) | **Bitti** 18.08 | BlogPosting + FAQPage + Organization/WebSite/Service; dil değişince şema da güncelleniyor |
| 13 | Ayda 2 yeni yazı (10 dilde) | Sürekli | Konu havuzu aşağıda |
| 14 | Her yazının sonuna ilgili pakete bağlantı | **Bitti** 18.08 | Yazı sonunda brief + paket köprüsü, 10 dilde |
| 15 | Analitik (gizlilik dostu) ve dönüşüm ölçümü | Bekliyor | Hangi yazı brief getiriyor? |
| 22 | Sayfa ağırlığını böl | Bekliyor | 26.08.2026 yeniden ölçüldü: ilk yük artık ~526 KB ham / ~194 KB gzip, bunun 439 KB'ı (i18n 142 KB + posts 297 KB) — 10 yazı 10 dile çıktıkça büyüdü, eski "236 KB" rakamı bayatlamıştı. Ziyaretçi hâlâ on dilin tamamını indiriyor |
| 23 | ~~Sosyal paylaşım görseli (og:image) ve 404 sayfası~~ | **Bitti** 22.08 | → satır 86–87 |

### 3.5. AI Workforce (yeni ürün hattı — bkz. `docs/ai-workforce/`)

| # | İş | Durum | Not |
|---|---|---|---|
| 24 | Ürün tanımı, rol kataloğu, fiyat merdiveni | **Bitti** 18.08 | Üç satılabilir rol: AI Receptionist, Sales Assistant, Office Assistant |
| 25 | İçerik türetme hattı (`scripts/repurpose.mjs`) | **Bitti** 18.08 | Opus 5 + yapılandırılmış çıktı; API anahtarı ile çalışır |
| 26 | Yazı sayfasında paylaşım satırı + sosyal yapılandırma | **Bitti** 18.08 | 5 kanal, dile duyarlı; ölü bağlantı kalmadı |
| 27 | Keşif formu ve ROI hesabı | **Bitti** 18.08 | Hem satışın ilk adımı hem sitenin lead magnet'i |
| 28 | Teknik mimari dokümanı (model, entegrasyon, güvenlik, maliyet) | Bekliyor | `docs/ai-workforce/teknik-mimari.md` |
| 29 | AI Workforce için site sayfası (10 dilde) | Bekliyor | Konumlandırma kararından sonra |
| 30 | İlk pilot: Research veya Meeting Agent referansı | Bekliyor | En düşük riskli giriş |

### 3.6. Curiosity Engine (içerik motoru — bkz. `engine/README.md`)

| # | İş | Durum | Not |
|---|---|---|---|
| 31 | Veri şeması + SQLite katmanı | **Bitti** 18.08 | 8 tablo, bağımlılıksız (node:sqlite) |
| 32 | Anahtarsız kaynaklar (News, Trends RSS, HN, Reddit) + GSC CSV | **Bitti** 18.08 | Her kaynak ayrı hata verir, hattı durdurmaz |
| 33 | Kümeleme + sütun sınıflandırma | **Bitti** 18.08 | AI'sız çalışır; eş anlamlılarda sınırlı |
| 34 | Puanlama motoru (trend/fırsat/para) + testler | **Bitti** 18.08 | Ağırlıklar ve eşikler belgeli |
| 35 | Live Curiosity paneli | **Bitti** 18.08 | Trending Now + üretim hattı sütunları |
| 36 | Altı Claude ajanı (soru, araştırma, yazar, SEO, para, kalite) | **Bitti** 18.08 | Web arama aracıyla kaynaklı araştırma |
| 37 | Canlı veriyle ilk gerçek çalıştırma | **Engelli** | Bu ortamda ağ kapalı; senin makinende çalışır |
| 38 | Google Trends API (alpha) erişimi | Bekliyor | Erişim gelince yeni kaynak dosyası |
| 39 | SERP verisi ile gerçek rekabet skoru | Bekliyor | Şu an vekil tahmin |
| 40 | V2: CMS'e yayın + SEO otomasyonu | Bekliyor | |
| 43 | Ödeme altyapısı: şema + kredi defteri + yetki | **Bitti** 18.08 | `engine/schema-billing.sql`, `billing.mjs`; sağlayıcıdan bağımsız |
| 44 | 16 maddelik görünürlük kuralı → çalışan denetim | **Bitti** 18.08 | `engine/visibility.mjs`, `write.mjs` kapısına bağlı |
| 45 | İçerik mimarisi: 30 temel sayfa + 300 destek | **Bitti** 18.08 | `docs/icerik-mimarisi.md`; ilk dalga 10 pillar + 40 destek |
| 46 | Vipps/Stripe canlı entegrasyonu (webhook uçları) | Bekliyor | Şema hazır; anahtar ve alan adı gerekiyor |
| 47 | SEO + AI görünürlük izleme işi | **Bitti** 18.08 | Haftalık, pazartesi 07:00 (Norveç saati). Her hafta `check` + `gorunurluk` çalıştırıp politika değişimi tarar; kural değiştiyse `visibility.mjs`'i günceller |
| 48 | Görünürlük denetimini siteye uygula | **Bitti** 18.08 | `npm run gorunurluk`; yazı modeline `src` ve `orig` eklendi |
| 49 | Kaynak adreslerini doldur | Bekliyor | `check.mjs` adresi eksik kaynakları listeliyor; ortamda dış erişim kapalı |
| 50 | Depoya ilk push | **Engelli** | Depo boş (hiç commit yok) + GitHub App'in yazma izni yok: "Resource not accessible by integration" |

### 3.7. Beta AI (yeni, ayrı ürün fikri — bkz. `docs/beta-ai-konsept.md`)

QBLOGG'un ve Beta Art'ın yanına eklenen üçüncü/dördüncü paralel ürün
fikri (bkz. AI Workforce ve `docs/yazar-platformu.md`). **30.08.2026'da
"Beta Art"tan ayrıştırılıp "Beta AI" adıyla yeniden kuruldu** — aynı iş
modeli, farklı ve bağımsız marka (gerekçe: `beta-art/BETA_ART_MASTER.md`
bu yönü "Beta Art" adı altında açıkça reddediyordu). Henüz kod yok; şu an
yalnız 90 günlük konsept belgesi var, kullanıcıda 7 açık karar bekliyor
(niş, alan adı/görsel kimlik, teknik yığın, ödeme sağlayıcı, AI görsel
sağlayıcısı, NOK fiyat doğrulaması, erişilebilirlik hedefi — belgenin §M'i).

| # | İş | Durum | Not |
|---|---|---|---|
| 91 | 90 günlük konsept + kanıt sınıflandırması | **Bitti** 25.08 | `docs/beta-ai-konsept.md` (eski adı `beta-art-konsept.md`); 3 dış iddia doğrulandı (KDV eşiği, AI Act 50. madde, SSB Q2 2026) |
| 94 | "Beta Art" adından ayrıştırma | **Bitti** 30.08 | İsim çakışması ve marka reddi bulununca yapıldı; `docs/beta-art-konsept.md` AŞILDI olarak işaretlendi |
| 92 | Açık kararları kapat (§M) | Bekliyor | Karar kullanıcıda; kapanmadan kod/tasarım başlamaz |
| 93 | Landing page + brief formu | Bekliyor | §M karar #3 (teknik yığın) sonrası |

### 3.8. Beta Art — yapısal netleştirme (bkz. `CLAUDE.md` monorepo bölümü)

`beta-art/` klasöründeki React/Vite/Supabase kod tabanı (26.08 göçü) ile
30.08'de gelen üç-proje modeli (`BAP-01`/`BAG-03`/`BAB-02`, bkz.
`beta-art/source-review/intake-2026-08-30/`) henüz uzlaştırılmadı.

| # | İş | Durum | Not |
|---|---|---|---|
| 95 | Yapı çelişkisini çöz | **Karar bekliyor** | Kullanıcıya 3 soru soruldu: gerçek üç-klasör içeriği nerede, 26.08 göçü nasıl yeniden düzenlensin, alt-alan adı mı yol tabanlı mount mu |

### 4. Ölçekleme (öncelik: düşük — talep oluştuktan sonra)

| # | İş | Durum | Not |
|---|---|---|---|
| 16 | Yazar ağı: başvuruları değerlendirme akışı | Bekliyor | `work.html` başvuruları geliyor |
| 17 | Fiyatlandırma sayfasında paket karşılaştırma tablosu | Bekliyor | |
| 18 | Müşteri paneli / teslim takibi | Fikir | Erken; önce 3 düzenli müşteri |
| 19 | Ücretli bülten katmanı (Substack) | Fikir | Kitle oluşmadan açılmaz |

### 3. Marka tescili (öncelik: yüksek — ticari kullanım öncesi)

| # | İş | Durum | Not |
|---|---|---|---|
| 70 | Dış denetim yanıtı | **Bitti** 22.08 | `docs/denetim/YANIT.md` — 6 madde kapandı, 3 açık |
| 71 | R01 PNG/app ikonu geometri uyuşmazlığı | **Bitti** 22.08 | `_ikon_uret` yanlış köprüyü kullanıyordu; aqua alan farkı artık 0/2 piksel |
| 72 | R04 birebir yeniden üretim + sürüm sabitleme | **Bitti** 22.08 | `scripts/requirements.txt`; paket boşaltılıp sınandı, 13/13 bayt bayt aynı |
| 73 | R03 paket yolları | **Bitti** 22.08 | `npm run marka-paket` belgeyi paket düzenine çeviriyor, elle kopyalama yok |
| 74 | EUIPO biçim üreticisi | **Bitti** 22.08 | `npm run tescil` — zarf denetimli JPEG + 250×250 sicil önizlemesi |
| 75 | **Font lisans metni (R05)** | **Kapandı** | `assets/fonts/OFL.txt` eklendi, OFL-1.1 bölüm bölüm doğrulandı; wordmark ana hatları resmi `InterVariable.ttf` ile `wght=700`'de birebir eşleşti; `marka-dogrula` özetleri denetliyor |
| 76 | **Tanınırlık testi (R07)** | **Açık** | Protokol yazılı, katılımcı yok. Uydurulmayacak. Küçük boy varyantı 22.08'de ölçülüp yeniden tasarlandı (sayaç ×1,16, köprü 160u) — ama makine ölçümü insan tanınırlığının yerine geçmez |
| 77 | **Marka araştırması (R08)** | **Kısmen** | Açık web, alan adı ekseni, ABD sicil aynaları ve Norveç ajans alanı tarandı (22.08) — QBLOGG için sıfır; QBLOG kalabalık. **AB + Norveç sicilleri hâlâ yapılmadı**; TMview/EUIPO/Patentstyret/Brønnøysund bu ortamda engelli |
| 78 | Nice sınıfı ve mal/hizmet listesi | **Karar bekliyor** | Hukukçu işi |
| 80 | EUIPO inceleme simülasyonu | **Bitti** 22.08 | Şeklî 4/4 geçti (ilk koşumda 0/4 — DPI beyan edilmiyordu). Şekil unsuru düşük risk, **kelime unsuru yüksek risk** |
| 81 | Üretim testleri — teknik yarısı | **Bitti** 22.08 | Faks/tek renk, siluet, ters, gri, 16/24/32 px ölçüldü. Nakış, gravür, büyük format yapılmadı |
| 83 | **Q kuyruğu: ters sarım + kör uç** | **Bitti** 22.08 | Kuyruk halkayı DELİYORDU (ters sarım, nonzero kuralında siler). Ayrıca iç ucu sayacın ortasında asılıydı. İkisi de düzeltildi, dış uzatma 55 birim ölçümle seçildi. **Kusur tüm yayınlanmış kilit dosyalarında vardı** |
| 84 | **Kilit optik açıklığı** | **Bitti** 22.08 | Satır taramasıyla ölçüldü: optik açıklık 288,1u, sınır kutusu 288,0u, kuyruğun daralttığı 0,0u. Düzeltme gerekmedi. İlk yapılan tarayıcı render ölçümü (292,0u) yanlıştı — piksel kuantalaması ±3,4u; geometrik tarama denetleyiciye girdi |
| 85 | **Nakış/ters kullanım: serbest uç** | **Bitti** 22.08 | Boyun 100,0u (kuyruk kalınlığının tamamı, daralma yok), serbest uç eksene tam dik (0,00°). İkisi de kurgunun sonucuydu; geometri değişmedi, koşul ölçülüp `marka-dogrula` içinde sabitlendi. Asgari üretim boyu kuralı yazıldı: 12 mm altında saten yok — **bu bizim tedbirimiz, sektör şartı değil** |
| 86 | **og:image + twitter card** | **Bitti** 22.08 | `og-image.png` (1200×630, 19,7 KB) `marka-uret.py`'ye 14. varlık olarak eklendi — metin yok, on dilde aynı görsel. Altı sayfaya og:image/og:title/og:description + `twitter:card` girdi. Rasterleştiriciye H/V komut desteği eklendi; mevcut PNG'ler bayt bayt aynı kaldı |
| 87 | **404 sayfası** | **Bitti** 22.08 | `404.html`: menüsüz hafif iskelet (logo + mesaj + ana sayfa düğmesi), `noindex`, 10 dilde `err.*` anahtarları. `posts.js` bilerek yüklenmiyor (300 KB tasarruf); `check.mjs` istisnayı tanıyor, `marka-dogrula` sayfayı tek-logo beklentisiyle denetliyor. Vercel `buildCommand`'ına kopyalama eklendi |
| 82 | **Kelime markası kararı** | **Karar bekliyor** | "BLOGG" İsveççe/Norveççe "blog". Kelime markası için vekil görüşü alınmadan başvurulmamalı |
| 79 | Renkli mi siyah-beyaz mı başvuru | **Karar bekliyor** | İkisi de üretiliyor; koruma kapsamı tercihi |

## Konu havuzu (blog)

Yayınlanan 6 yazı: platform karşılaştırması, Upwork, nDash, Medium, Substack, AI içerik
stüdyosu. Sıradaki adaylar — hepsi ticari niyeti olan, aramada karşılığı olan konular:

- Şirketler içerik yazarına ne ödüyor: 2026 ücret aralıkları
- İçerik briefi nasıl yazılır (şablonla)
- AI ile yazılan içerik Google'da cezalandırılır mı?
- Bir blogun ilk 1.000 ziyaretçisi nereden gelir
- LinkedIn'de kurucu sesiyle yazmak
- KOBİ'ler için 90 günlük içerik takvimi
- Çok dilli içerikte hreflang hataları (mevcut SEO yazısının devamı)

## Başarı ölçütleri

| Ölçüt | Nasıl bakılır | Hedef |
|---|---|---|
| Brief formu gönderimi | Form/e-posta sayısı | Ayda 5 |
| Brief → teklif → müşteri | Elle takip | Ayda 1 yeni müşteri |
| Tekrarlayan gelir | Aylık paketler | 3 müşteri × €900 |
| Organik trafik | Analitik | 3 ayda 1.000 ziyaret/ay |
| Bülten listesi | Servis paneli | 3 ayda 200 abone |

## Karar günlüğü

- **Saf HTML/CSS/JS seçildi.** Site içerik ağırlıklı ve derleme adımı olmadan her yere
  yüklenebiliyor; çatı eklemenin maliyeti faydasından yüksek.
- **10 dil, istemci tarafında.** Hızlı kurulum için; SEO bedeli biliniyor (iş #11).
- **Formlar mailto ile.** Sunucusuz çalışsın diye; gerçek forma geçiş noktası hazır (iş #5).
- **AI kullanımı sayfada açıkça anlatılıyor.** Gizlemek yerine süreci göstermek
  (ilk taslak AI, doğrulama ve editörlük insan) güven kazandırıyor.
- **Yazı sayfasının hreflang'i JavaScript ile kuruluyor.** Slug'a bağlı olduğu için
  statik yazılamıyor; ön-render adımı (iş #11) gelince statiğe dönecek.
- **Drop-cap yalnızca Latin/Kiril yazılarda.** Arapça bitişik yazıldığı için ilk harfi
  büyütmek kelimeyi bozuyordu; Çince ve Devanagari'de de yanlış duruyor.
- **Yazı gövdeleri blok yapısında.** Düz metin dizisi yerine `{h:}`, `{ul:[]}`, `{note:}`
  blokları da kabul ediliyor; kısa sürümler bozulmadan uzun yazılar yazılabiliyor.
- **check.mjs 600 kelimenin altını uyarı olarak işaretliyor.** İçerik borcu görünür kalsın diye.
- **Yazı tipi kendi sunucumuzda.** Google Fonts CDN'i ziyaretçinin IP'sini Google'a
  gönderiyor; Münih Bölge Mahkemesi kararı (3 O 17493/20) sonrası AB'de riskli sayılıyor.
  Inter değişken sürümü yerelde (4 dosya, 188 KB); Arapça/Çince/Devanagari sistem
  yazı tiplerine düşüyor. Site artık hiçbir dış istek yapmıyor.
- **Koyu temada marka rengi üzerindeki metin koyu.** Beyaz metin 3.2:1 kontrastta
  kalıyordu (WCAG AA eşiği 4.5:1); `--on-brand` değişkeni eklendi.
- **Okuma süresi metinden hesaplanıyor.** Elle girilen değer yanlış kalıyordu
  (124 kelimelik yazı "8 dk okuma" diyordu).
- **Mobil menü eşiği 1180px.** Rusça ve Norveççe menü etiketleri uzun; daha düşük eşikte
  menü ya iki satıra kırılıyor ya da sayfayı yatay taşırıyordu.
