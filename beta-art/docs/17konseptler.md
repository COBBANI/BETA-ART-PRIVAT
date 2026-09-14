# Dört konsept, ayrı ayrı

Bir çatı, üç mülk. Her biri kendi tasarım dilini, kendi okuyucusunu ve kendi
işini taşır. Buradaki her sayı repodan ölçüldü, hatırlanmadı.

Ortak olan üç şey var ve yalnızca üç şey: mühür kırmızısı `#8B1A1A`, üç yazı
karakteri (Fraunces / Inter / JetBrains Mono), ve şu cümle — *bir insan yaptı,
kaynağında doğrulandı.* Geri kalan her şey mülke özeldir, kasten.

---

## 0. Hub — ön kapı

**Adres:** `start.beta-art.com` · **4 sayfa** + Norveççe ana sayfa
**Zemin:** kâğıt `#FBFAF7` · **Rol:** ayırt etmek, sonra çekilmek

Hub bir tanıtım sayfası değil, bir **kavşak**. İşi tek: gelen kişiyi üç
mülkten doğru olanına dört saniyede göndermek, ve giderken bütün projenin
üzerinde durduğu tek iddiayı yazılı hâle getirmek.

### Ne var

| Bölüm | İçerik |
|---|---|
| Başlık | *Made by a human. Verified at the source.* |
| Üç kart | Beta Art · Beta Art Business · Field Notes — her biri bir cümlelik tarif ve tek bir çıkış linki |
| Garanti bölümü | «Kaynağında doğrulandı» ne demek — üç kayıt, ve arkasındaki yaptırım |
| Dil seçici | 12 dil (İngilizce kaynak, 11'i makine çevirisi) |
| `legal.html` | Bütün mülklerin hukuki bildirimi tek adreste |
| `report.html` | İçerik şikâyeti formu |

### Kavramsal çekirdek

Üç kayıt, hepsi kimse istemeden önce yapılır:

1. **Orijinal dosya saklanır.** Her plaka gerçek bir kameradan çıkan RAW
   dosyasıyla başlar; bir gün içinde sağlama toplamıyla arşivlenir, talep
   üzerine incelenebilir.
2. **Çekim kaydı görüntüyle birlikte gezer.** Kamera, lens, poz, yer, saat —
   çekimde yazılır. Ekipman destekliyorsa content credentials kamerada
   imzalanır.
3. **Lisansı yapan kişi imzalar.** Aracı yok. Yazılı lisans, düzgün fatura,
   numaralı sertifika.

Ve arkasındaki yaptırım — sitedeki en önemli cümle:

> Doğrulanmış diye satılan bir plakanın makine tarafından üretildiği
> gösterilirse, lisans ücreti tamamen iade edilir. **Sonucu olmayan bir
> garanti, slogandır.**

`tools/claims.py` kapısı tam da bunun için var: bir sayfadaki söz, hukuki
bildirimde bir taahhüt olmak zorunda. Tarif edilmiş olması yetmez.

---

## 1. Beta Art — arşiv

**Adres:** `beta-art.com` · **15 sayfa**
**Zemin:** kâğıt `#FBFAF7` · **Rol:** doğrulanmış insan fotoğrafını lisanslamak

Bu bir portföy değil, bir **katalog**. Fark şu: portföy beğeni ister, katalog
kayıt tutar. Her plakanın kalıcı bir kabul numarası, kalıcı bir adresi ve bir
çekim kaydı vardır.

### Koleksiyon — Cilt I, on iki plaka

| Numara | Başlık | Kategori | Durum |
|---|---|---|---|
| 2026.0142 | First Light | landscape | orijinal bekleniyor |
| 2026.0143 | Into the Pines | landscape | orijinal bekleniyor |
| 2026.0144 | Sea of Fog | landscape | orijinal bekleniyor |
| 2026.0145 | Still Water | landscape | orijinal bekleniyor |
| 2026.0146 | PALM | city | orijinal bekleniyor |
| 2026.0147 | Blue Hour Grid | city | orijinal bekleniyor |
| 2026.0148 | Night Crossing | city | orijinal bekleniyor |
| 2026.0149 | Golden Hour | landscape | orijinal bekleniyor |
| 2026.0150 | Portrait in Amber | portrait | orijinal bekleniyor |
| 2026.0151 | The Maker | portrait | orijinal bekleniyor |
| 2026.0152 | Slow Morning | landscape | orijinal bekleniyor |
| 2026.0153 | Low Tide | landscape | orijinal bekleniyor |

**On ikisi de «orijinal bekleniyor».** Sayfa bunu saklamıyor, yazıyor — üstte
bir geliştirme bandı var: *görseller yer tutucudur, katalog kayıtları
doğrulanmamıştır.* Bu bir eksiklik değil, konseptin kendisi: doğrulanmamış bir
plaka doğrulanmış gibi gösterilemez.

### Üç yöntem

- **Yöntem I** — RAW orijinal arşivlenir, çevrimdışı, talep üzerine incelenir.
- **Yöntem II** — Çekim kaydı görüntüyle gezer; C2PA content credentials
  kamerada gömülür.
- **Yöntem III** — Lisansı fotoğrafçı imzalar; aracı yok.

### Lisans kademeleri

| Kademe | Fiyat | Kapsam |
|---|---|---|
| Personal | kr 190'dan | Özel, ticari olmayan kullanım |
| **Commercial** | kr 890 | Web, sosyal, reklam, 5.000 kopyaya kadar baskı — *en çok istenen* |
| Extended | kr 2 900 | Büyük kampanya, ambalaj, sınırsız baskı, ajanslara bir alt lisans |
| Custom & Exclusive | talep üzerine | Münhasırlık, özel anlaşma, sipariş çekim |

Her lisansta ortak olan tek madde: **hiçbir lisans, makine öğrenimi eğitim
verisi olarak kullanımı kapsamaz.**

### 35 kategori, beş bölüm

Uluslararası bir görsel bankasının kopyalayamayacağı şey burada:

- **Global — 16 kategori:** People, Business, Nature, Lifestyle, Food & Drink,
  Travel, Health & Wellness, Family, Sustainability, Architecture,
  Fashion & Style, Education & Children, Sports & Activity, Art & Culture,
  Technology & AI, Real Estate & Interiors
- **Norveç'e özel — 5:** Norwegian Nature, Norwegian Cities, Local Business,
  Norwegian Work Life, Seasons & Holidays
- **Norveç sektörleri — 5:** Maritime & Fisheries, Oil & Offshore Energy,
  Technology & Startups, Tourism & Hospitality, Retail & E-commerce
- **Norveç sporları — 4:** Winter Sports, Outdoor & Friluftsliv,
  Football & Team Sports, Sailing & Water Sports
- **Geleneksel yemek — 5:** Seafood & Fish, Baked Goods & Bread, Meat & Game,
  Dairy & Cheese, Holiday & Festive Food

17 Mayıs, İskandinav yazı, çalışan bir limanın üzerindeki kuzey ışığı — hiçbir
uluslararası kütüphanenin üretemeyeceği görseller. Konumlandırmanın tamamı bu
on dokuz kategoride.

---

## 2. Beta Art Business — stüdyo

**Adres:** `business.beta-art.com` · **43 İngilizce + 26 Norveççe sayfa**
**Zemin:** mürekkep `#0F0F0F` (tek koyu mülk) · **Rol:** çalışan dijital iş satmak

Tek koyu mülk, ve bu bilinçli: arşiv ve dergi kâğıt üzerinde okunur, masa
üzerinde çalışılır. Ayrıca satış tarafının arşivin sessizliğini bozmaması için.

### İki iz, 25 hizmet

**Privat — 9 hizmet** (bireyler):

| Hizmet | Fiyat |
|---|---|
| CV & iş başvuruları | kr 1 200'den |
| LinkedIn optimizasyonu | kr 1 500'den |
| Kişisel web sitesi | kr 6 900'dan |
| Portfolyo | kr 8 500'den |
| Sosyal içerik | kr 3 900 / ay |
| Fotoğraf düzenleme | kr 490'dan |
| Kişisel AI asistanı | kr 4 500'den |
| Blog & kişisel içerik | kr 2 900 / parça |
| Kariyer & eğitim desteği | kr 2 400'den |

**Bedrift — 16 hizmet** (şirketler):

| Hizmet | Fiyat |
|---|---|
| Web sitesi | kr 24 000'den |
| Landing page | kr 9 900'dan |
| E-ticaret | kr 39 000'den |
| Marka kimliği | kr 28 000'den |
| Logo & grafik tasarım | kr 12 000'den |
| Sosyal medya | kr 7 900 / ay |
| SEO | kr 8 900'dan |
| Blog & içerik | kr 5 900 / ay |
| AI otomasyonu | kr 14 000'den |
| Chatbot | kr 16 000'den |
| CRM & müşteri akışları | kr 12 500'den |
| İş süreci otomasyonu | kr 34 000'den |
| Raporlama & veri analizi | kr 9 500'dan |
| AI resepsiyonist | kr 14 000 kurulum + kr 2 900 / ay |
| AI satış asistanı | kr 19 000 kurulum + kr 3 900 / ay |
| AI ofis asistanı | kr 16 000 kurulum + kr 3 400 / ay |

### Dört paket

| Paket | Fiyat | Ne |
|---|---|---|
| Starter | kr 9 900 | Tek net teslimat — bir landing page, bir logo, bir SEO planı |
| **Professional** | kr 34 000 | Tam site veya marka sistemi, içerik dahil — *en çok seçilen* |
| Premium | kr 79 000 | Site + otomasyon + CRM + raporlama, tek program olarak |
| Custom | talep üzerine | Retainer, çok markalı iş, çerçeve sözleşme, kamu ihalesi |

Bütün fiyatlar NOK, KDV hariç (Norveç'te %25 eklenir). Ödeme: kart, Vipps veya
fatura, 14 gün vadeli. kr 20 000 üzeri projelerde onayda %50.

### Konsepti ayıran dört şey

**1. «Ürünü değil, sorunu söyleyin.»** Sitede bir hizmet listesi var ama giriş
noktası o değil. Bir servis bulucu var: sorunu tarif ediyorsunuz, doğru
hizmete yönlendiriliyor, fiyatlandırılıyor.

**2. Eve gitmeyen üç rol.** AI resepsiyonist, AI satış asistanı, AI ofis
asistanı — bir vardiyadan ucuz, yılın her saati çalışıyor, **ve ürettiği
hiçbir şey bir insan onaylamadan müşteriye ulaşmıyor.**

**3. Referans yok, ve nedeni yazıyor.** Bu sitedeki en cesur bölüm:

> Kendi referanslarımızı yazmayacağız. İsimsiz bir alıntı dekorasyondur ve
> siz yeterince okudunuz.

Üç kural: her alıntıda tam ad, şirket ve ay; her seferinde yazılı izin, sonradan
gerekçesiz geri çekilebilir; sayılar kaynağıyla gelir.

**4. Ne garanti edildiği yazılı.** Yazılı kapsam ve sabit fiyat, saatlik
sürpriz yok. Her pakette revizyon dahil. **Sonuç sizindir** — kaynak dosyalar,
hesaplar, dokümantasyon devredilir, hiçbir şey rehin tutulmaz. Verileriniz
sizde kalır.

Ayrıca: **satın alma hacmine göre sıralanmış 30 sektör** haritası, yedi adımlık
teslimat süreci, ve tarayıcıda hesapsız çalışan küçük AI araçları.

---

## 3. Field Notes — dergi

**Adres:** `notater.beta-art.com` · **12 sayfa**
**Zemin:** gazete kâğıdı `#FBFAF7`, **karanlık mod var** (`#14130F`)
**Rol:** doğrulanmış bir arşivin nasıl kurulduğunu göstermek

Ne blog ne haber bülteni. Bir **gazete**: künye satırı, sayı numarası, tarih
çizgisi. Diğer üç mülkün aksine mührü yok — çünkü mastheadi bir logo değil, bir
gazete başlığı. (Ana ekran ikonu yine de Beta Art mührünü taşıyor; dört mülkün
telefonda birbirinden ayrılmaması gerekiyordu.)

### Dokuz yazı, beş konu

| Yazı | Konu | Süre | Tarih |
|---|---|---|---|
| The three tests every frame has to pass | method | 6 dk | 2026-07-14 |
| What actually goes on an accession label | provenance | 7 dk | 2026-06-30 |
| Two days aboard before the first frame | method | 5 dk | 2026-06-12 |
| Pricing a licence when the buyer says "just for social" | trade | 8 dk | 2026-05-28 |
| Who actually buys photography in Norway | market | 11 dk | 2026-05-19 |
| How long blue hour actually lasts at 59° north | light | 5 dk | 2026-05-09 |
| Seven pictures worth avoiding at launch | trade | 6 dk | 2026-04-21 |
| Content credentials, switched on from the first frame | provenance | 5 dk | 2026-04-02 |
| The filing habit that makes an archive findable in nine years | method | 7 dk | 2026-03-15 |

Konular: **provenance · method · light · trade · market.** Hiçbiri
«ilham verici fotoğrafçılık» değil. Hepsi ya kanıt, ya yöntem, ya para.

### Konsepti ayıran şey

**Çekim listesi yayımlanmış.** Beş kademede on dört plaka — A: Norveç iş
hayatında insanlar (4), B: zanaat ve süreç (3), C: imza mekânlar, alışılmadık
saatler (3), D: İskandinav mimarisi ve iç mekân (2), E: geri kalan. Yayımlanma
sebebi doğrudan yazıyor:

> Okuyucular çalışan bir listenin neye benzediğini görsün — ve bizi buna
> bağlasınlar diye.

Bir yayın planını herkese açık ilan etmek, kendine karşı bir taahhüt yaratmak
demek. Arşivin bütün mantığı bu.

**Ayın plakası:** BA-C1-008 · Preikestolen, Şubat, 06:47 · hava kaydı ekli.
Saat ve hava kaydı tesadüf değil — «kaynağında doğrulandı» iddiasının küçük
ölçekli kanıtı.

**Ayda iki mektup.** Sponsorlu yazı yok, hiçbir zaman. Tek tıkla abonelik
iptali, liste asla devredilmiyor. RSS besleme de var.

---

## Diller

12 dil, tek kaynak: **İngilizce.** Norveççe *çeviri değil, yazılmış* —
`data_no.py` kendi kopyasını tutar ve `klarsprak.py` onu Språkrådet'in
klarspråk kurallarına karşı denetler.

| Dil | Durum |
|---|---|
| English | kaynak |
| Norwegian, Turkish, Spanish, French, German, Portuguese, Russian, Arabic, Chinese, Japanese, Hindi | **makine** — henüz insan incelemesi yok |

`languages.json` adı ve tarihi olmayan bir «reviewed» kaydını kabul etmiyor.
Her sayfadaki insan onay mührü, neyi kapsadığını **ve neyi kapsamadığını**
söyler — bu dosyadan üretilerek.

**Makine yazımı bir uyarı değil, henüz-yapılmamış.** Sitede hiçbir yerde
tehlike rozeti olarak değil, kalan ilerleme olarak yazar.

---

## Kararlar, tek satırda

- **Boş kalanlar boş kalır.** Organizasyon numarası, kayıtlı adres, arşivin
  gerçek boyutu, fotoğrafçının şehri. Hiçbiri uydurulmaz.
- **Bir sayfadaki söz, hukuki bildirimde bir taahhüttür.** Tarif edilmiş
  olması yetmez — `claims.py` bunu her derlemede denetler.
- **Kimsenin imzalamadığı inceleme, inceleme değildir.**
- **Ne bizden ne ziyaretçiden hukuka aykırı hiçbir şey yayımlanmaz.** Model
  izinleri, asla görünmemesi gerekenler için dünya çapında politika, ve rızayı
  toplayan formlar.
