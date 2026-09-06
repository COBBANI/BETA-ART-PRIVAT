# BETA ART Privat — içerik analizi (30.08.2026, 30.08.2026 akşamı güncellendi)

`docs/proje-arsivi.md` hangi dosyanın nerede olduğunu kataloglar. Bu belge
bir adım ileri gidip **içeriği** karşılaştırır: beş ayrı kaynakta (madde
4/5/12/13/14, bkz. proje-arsivi.md) aynı şeyler mi yazıyor? Kaynak, depoya
girmiş her dosyadan birebir alıntı veya doğrudan grep sonucu — hiçbir
rakam hafızadan yazılmadı.

**30.08.2026 akşamı güncelleme:** kullanıcı `https://beta-art.com/`
kök sayfasının, `/categories`, FAQ referans belgesinin, `/request-a-shoot`
ve sepet sayfasının **birebir metnini** yapıştırdı (bkz. proje-arsivi.md
madde 14). Bu, ilk kez gerçek canlı kök alan adının kendi içeriği —
önceki "canlı site" satırları `beta-art-archive-five.vercel.app` gibi
önizleme adreslerindendi. Aşağıdaki tablolar bu yeni kaynakla güncellendi.

## 1. Fiyatlandırma — üçüncü bir varyant, ve bu kez kök alan adından

| Kaynak | Personal | Commercial | Extended | Custom |
|---|---|---|---|---|
| **`beta-art.com` kök sayfası (madde 14, birebir yapıştırıldı, 30.08 akşamı)** | kr 190'dan | **"Price on request"** | **"Price on request"** | **"Price on request"** |
| Önizleme (`beta-art-archive-five.vercel.app`, kullanıcı paylaştı) | kr 190'dan | kr 1.200'den | kr 4.500'den | talebe göre |
| Statik "Privat" prototip (`0be5318f-index.html`, `.tier-price`) | kr 190'dan | kr 890 (sabit) | kr 2.900 (sabit) | talebe göre |
| "BETA ART Private" (madde 13, `assets/app.js`) | rakam yok — "final pricing... subject to launch review" | rakam yok | rakam yok | rakam yok |
| Final Work v2 (Supabase) | rakam yok — üretim veritabanından geleceği varsayılıyor | rakam yok | rakam yok | rakam yok |

**Personal fiyatı dört kaynakta da aynı (kr 190'dan)** — tutarlı, kesinleşmiş
sayılabilir. **Commercial/Extended/Custom için artık üç farklı yaklaşım
var**: iki önizleme kaynağı sabit sayı verirken (890/2.900'den 1.200/4.500'e
yükselmiş), **gerçek kök alan adı hiçbir sayı göstermiyor, "Price on
request" yazıyor**. En yeni ve en yetkili kaynak (kök alan adının kendisi)
sayı vermiyor — bu artık çelişkiden çok, **kasıtlı bir tasarım kararı**
gibi okunuyor: canlı sitede Commercial ve üstü katmanlar hep talebe göre.
Personal dışındaki üç katman için birleştirmede **sabit sayı yazılmamalı**,
"Price on request" esas alınmalı.

## 2. Seri/plaka yapısı — sayı tutarlı, şema tutarlı değil

| Kaynak | Toplam plaka | Organizasyon şeması |
|---|---|---|
| `CONTENTMAP.md` / canlı site "Editorial framework" | **14 planlı** (12 mevcut prototip) | **7 seri**: Work, Craft, Land and Light, The Table, Rooms, The Unseen, Weather |
| Field Notes "launch shot list" (madde 12) | **14** | **5 katman (Tier A–E)**: A=Norveç'te çalışan insanlar·4, B=Zanaat/süreç·3, C=İmza mekanlar·3, D=Nordik mimari·2, E=Yemek/kültür·2 |
| Statik "Privat" prototip (madde 4) | **12** katalog kaydı | Seri yok — düz kategori filtresi: landscape/city/portrait |
| **`beta-art.com` kök sayfası (madde 14), "Volume I"** | **12** plaka (12'de yalnızca 2'si "Available", 10'u "Awaiting verified original") | Seri/katman adı yok — **statik prototiple aynı** düz filtre: All plates / Landscape / City / Portrait |
| "BETA ART Private" (madde 13) | **3 demo** (Series I·Work, Land and light, Rooms) | Seri adları kullanıyor, 7'li şemayla **uyumlu** (üçü de gerçek seri adı) |

Toplam sayı (14 planlı) iki bağımsız kaynakta eşleşiyor — bu güven verici.
Ama **organizasyon şeması farklı**: CONTENTMAP.md'nin 7 serisi ile Field
Notes'un 5 katmanı aynı 14 plakayı iki farklı şemayla anlatıyor gibi
görünüyor; hangisinin kanonik olduğu hiçbir yerde açıkça yazmıyor. **Gerçek
kök alan adı üçüncü, en basit bir yaklaşım kullanıyor**: "Volume I" başlığı
altında 12 plaka, hiç seri/katman adı yok, yalnızca üç düz kategori
(Landscape/City/Portrait) — statik prototiple (madde 4) birebir örtüşüyor.
Madde 13'ün üç demo plakası en azından 7-seri adlandırmasıyla uyumlu, ama
kök alan adının kendisi 7-seri şemasını hiç kullanmıyor.

## 3. Doğrulama zinciri — dört farklı adım sayısı, ama kök alan adı 3'ü doğruladı

| Kaynak | Adım sayısı | Liste |
|---|---|---|
| **`beta-art.com` kök sayfası (madde 14), `#verification`** | **3** ("Method I/II/III") | I: RAW orijinal arşivlenir → II: capture kaydı (kamera/lens/pozlama/yer/tarih, destekleyen ekipmanda C2PA) görüntüye eşlik eder → III: lisans fotoğrafçı tarafından doğrudan imzalanır |
| Statik "Privat" prototip (madde 4), `#verification` bölümü | **3** ("Method I/II/III") | RAW arşivlenir → köken kaydı eşlik eder → lisans fotoğrafçı tarafından imzalanır |
| Önizleme "Beta proof chain" (`beta-art-archive-five.vercel.app`) | **6** | Human → Camera → RAW → Edit → Rights → Licence |
| `ASSETSTATUS.md` | **5** ("all five verification checks") — liste **hâlâ paylaşılmadı** | bilinmiyor |
| "BETA ART Private" (madde 13) doğrulama kapısı | **8** | Original, Identity, Capture, Rights, AI disclosure, Conflict gate, Provenance, C2PA |

**Gerçek kök alan adı (`beta-art.com`) statik "Privat" prototipiyle (madde 4)
birebir örtüşüyor: ikisi de 3 yöntem, aynı sıra, neredeyse aynı ifadeler.**
Bu, madde 4'ün statik prototipinin canlı sitenin en yakın kaynağı olduğunu
gösteriyor — 6 adımlı "Beta proof chain" ve 8 adımlı "Private" kapısı ise
farklı taslak aşamalarına veya ayrı denemelere ait görünüyor. Birleştirmede
**3 yöntemlik model esas alınmalı**; 5/6/8 adımlı listeler referans olarak
kalabilir ama kök alan adını yansıtmıyor.

## 4. Tutarlı kalan şeyler (iyi haber)

- **Fotoğrafçı kimliği**: Betül Öner, tüm kaynaklarda aynı.
- **"AI-free" iddiası ve gerekçesi**: hiçbir kaynak "kesin/mutlak kanıt" iddiasında bulunmuyor, hepsi "kanıt gösterilen, iddia edilmeyen" dilini koruyor — CLAUDE.md'nin "uydurma yasağı" ilkesiyle aynı disiplin, dört kod tabanında da bozulmamış.
- **Lisans katmanı adları** (Personal / Commercial / Extended / Custom & Exclusive): dört kaynakta da aynı dört isim.
- **Personal fiyatı**: kr 190'dan, iki rakamlı kaynakta da eşleşiyor.
- **Norveç odaklı, KDV %25**: statik prototipin teklif/fatura aracı (`tools.js`) `VAT 25%` sabit oranını kullanıyor, canlı sitedeki Norveç vurgusuyla tutarlı.

## 5. Kök alan adından yeni doğrulanan gerçekler (30.08 akşamı)

Aşağıdakiler önceden hiçbir belgede yoktu, yalnızca `beta-art.com`'un
birebir yapıştırılan metninden geliyor — hiçbiri tahmin değil:

- **12 plakanın gerçek adları**: First Light (2026.0142), Into the Pines
  (2026.0143), Sea of Fog (2026.0144), Still Water (2026.0145), PALM
  (2026.0146), Blue Hour Grid (2026.0147), Night Crossing (2026.0148),
  Golden Hour (2026.0149), Portrait in Amber (2026.0150, "Available"),
  The Maker (2026.0151, "Available"), Slow Morning (2026.0152), Low Tide
  (2026.0153). Onikisinden yalnızca ikisi ("Portrait in Amber", "The
  Maker") "Available" durumda, kalanı "Awaiting verified original".
- **Fotoğrafçı biyografisi**: "84,000+ frames captured since 2012",
  teslimat "within twenty-four hours", RAW dosya talep üzerine gösterilir.
- **"Exhibitions & Events" ayrı bir mülk değil, kök sayfada bir bölüm**:
  Volume I — Opening Exhibition (Sonbahar 2026, Oslo), Print & Provenance
  (Kış 2026, yer TBA), Private Viewing — Volume II Preview (İlkbahar
  2027, davetiye). Bu, madde 7/8/9'un "Galeri ayrı bir mülk/alt alan adı"
  varsayımıyla **çelişiyor** — kök sayfa etkinlikleri kendi içine almış.
- **Yeni rotalar doğrulandı**: `/categories` (35 kategori, 5 bölüm: Global,
  Norveç-özel, Norveç sektörleri, Editoryal, Özel/Yeni), `/industries`,
  `/request-a-shoot` (özel çekim brief formu), `/cookie-settings`,
  `/license-terms` (İngilizce) ve `/lisensbetingelser` (Norveççe — **iki
  farklı URL aynı sayfaya işaret ediyor gibi görünüyor**, doğrulanmadı),
  `/privacy`, `/kontakt` (footer'da "Angrerett og refusjon" bağlantısı
  buraya gidiyor — isim ile hedef URL uyuşmuyor, not edildi).
- **SSS artık 16 soru** (referans belge "16 ENTRIES · HUMAN AUTHORED" diyor,
  5 kategoride: About the photographs, Licenses and use, Ordering and
  delivery, Payment and refunds — dördüncüsü sayılmazsa 4 kategori).
  Önceki analiz "15" tahmin ediyordu, bu düzeltildi.
- **Sepet sayfası Norveççe**: "Handlekurv", "Fortsett å handle", boş sepet
  metni "Handlekurven er tom".
- **Footer'da "Business" veya "Galeri" bağlantısı yok** — yalnızca Archive
  (Collection/Verification/Photographer/Categories/Industries) ve
  Licensing bölümleri var. Bu, üç-mülk hub modelinin (proje-arsivi.md
  madde 9) **kök alan adında karşılığı olmadığını** gösteriyor.

## Sonuç

"BETA ART Privat" kavramı **fikir düzeyinde tutarlı** kalmaya devam ediyor
(aynı fotoğrafçı, aynı disiplin, aynı dört lisans katmanı, aynı toplam
plaka hedefi). 30.08 akşamı gelen kök alan adı metniyle **iki çelişki artık
çözüldü**: doğrulama adım sayısı (3, statik prototiple birebir eşleşiyor)
ve fiyatlandırma yaklaşımı (Personal sabit kr190, üstü "Price on request" —
sabit sayı değil). **Seri organizasyon şeması hâlâ çözülmedi**: kök sayfa
plakaları düz "All plates / Landscape / City / Portrait" filtresiyle
listeliyor, 7-seri veya 5-katman şemasından hiçbirini kullanmıyor — üçüncü,
en basit bir yaklaşım. Birleştirme kararında **kök alan adı "son söz"
sayılmalı**: en yeni, en yetkili ve tek gerçek üretim kaynağı bu.
