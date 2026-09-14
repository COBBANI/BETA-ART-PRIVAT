# İş modeli

*Bu belge parayı tarif eder: nereden gelir, hangi mekanizmayla gelir, ne kadar
gelmesi gerekir ve bunun için neyin doğru olması gerekir.*

`docs/14-business-review.md` bu modelin **eleştirisidir** ve onunla çelişmez —
buradaki her yapısal bulgu oradan gelir. Bu belge modeli kurar, o belge modeli
sorgular. İkisi birlikte okunmalıdır.

Bütün fiyatlar `tools/generators/data.py`, `beta-art/index.html` ve
`docs/05-payment-architecture.md`'ten okundu. Hiçbiri tahmin değil; hiçbiri de
henüz bir müşteriye sorulmadı.

---

## 1. Tek cümlede

> Beta Art, **doğrulanmış insan emeğini** satar. Arşiv bunu kanıtlar, stüdyo
> bunu paraya çevirir, dergi bunu duyurur.

Üç mülk, tek iddia. Ama üç ayrı ekonomi.

---

## 2. Üç motor, üç farklı iş

| | Ne satar | Fiyat bandı | Model | Rolü |
|---|---|---|---|---|
| **Beta Art** — arşiv | Görsel lisansı | kr 190 · 890 · 2 900 | İşlemsel | **Kanıt** |
| **Beta Art Business** — stüdyo | 25 hizmet | kr 490 – 39 000 | Proje + retainer | **Gelir** |
| **Field Notes** — dergi | Hiçbir şey | — | — | **Güven** |

Bu tablodaki en önemli satır ortadaki. `docs/14`'ün merkezî bulgusu:

> **Arşiv marka, stüdyo iştir.**

Aritmetiği acımasız. Arşivin en iyimser ortalaması kr 890. Mütevazı bir hedef,
yılda kr 500 000:

```
500 000 ÷ 890 = 562 lisans / yıl = her gün 1,5 lisans, yılın her günü
```

Henüz fotoğrafı çekilmemiş on iki plakalık bir katalogdan, görsel fiyatının on
yıldır düştüğü bir pazarda. Daha iyi tasarım bu sayıyı kurtarmaz.

Stüdyo ise çalışır: medyan tek seferlik iş kr 9 500, tavan kr 39 000, altı ürün
aylık faturalanıyor. Norveç'te **yılda 25–30 proje** bir maaşı ve genel gideri
karşılar. Tek kişi ve bir tavsiye ağı için sıradan bir sayı.

---

## 3. Değer önerisi — ve kimin için gerçekten çalıştığı

Söz şu: *bir insan yaptı; hiçbir şey üretilmedi; teslimatınızın hangi kısmının
makine destekli olduğunu yazılı söyleriz; materyaliniz hiçbir modeli eğitmez;
hiçbir şey bir insan onaylamadan çıkmaz.*

**Stok fotoğraf satışı olarak bu zayıf.** kr 890'lık bir görsel alan pazarlama
koordinatörü provenance denetlemez; bütçe ve teslim tarihi denetler. Garanti
gerçek, ama o fiyat noktasında görünmez.

**Hizmet satın alımı olarak bu güçlü ve güncel.** 2026'da tasarım, içerik veya
otomasyon satın alan bir Norveç şirketinin — hele bir kommune'nin — çoğu zaman
cevaplayamadığı bir iç sorusu var:

> *Bu teslimatın nesi makine yapımı, ve bizim materyalimiz birinin modelini
> eğitti mi?*

Beta Art Business bunu **yazılı** cevaplayabilir. Rakiplerinin çok azı
cevaplayabilir. Farklılaştırıcı buraya nişanlanmalı.

---

## 4. Müşteri segmentleri

Pazar haritalandı: satın alma **sıklığına** göre sıralanmış 30 sektör — bütçeye
göre değil. Sebebi doğrudan: aylık görsel gereken bir alıcı eninde sonunda
sizinkine de ihtiyaç duyar; on yılda iki kez alan büyük bütçeli bir alıcı
duymaz.

| Kademe | Sıklık | Sektörler | Yorum |
|---|---|---|---|
| **1** | Her hafta | Reklam ajansları, e-ticaret, medya, pazarlama departmanları, PR (5) | Stok kütüphanelerinin en sert rekabet ettiği yer. Burada **güzellik değil, provenance** satılır |
| **2** | Her çeyrek | Emlak, sağlık, eğitim, turizm, restoran, finans, teknoloji, **kamu** (8) | En hafife alınan kademe, ve Norveçli bir arşiv için muhtemelen **en iyi başlangıç** |
| **3** | Proje bazlı | Petrol/offshore, denizcilik, spor, turizm kurulları, STK, yayıncı, mimarlık, moda (8+) | Seyrek ama büyük ve çoğu zaman münhasır. Erişim engeli sizin avantajınız |

**Kamu sektörü kendi notunu hak ediyor.** İhale yavaş, evrak gerçek — ama bir
kommune ile çerçeve sözleşme, bu meslekte **tekrarlayan gelire en yakın şey.**
Ve bu tarafa satan herkes zaten yapılandırılmış fatura kesiyor.

Stüdyonun ikinci segmenti — Privat, 9 hizmet — farklı bir iş: bireyler, iş
arayanlar, serbest çalışanlar. `docs/14` bunun bir konumlandırma çatışması
olduğunu söylüyor ve haklı: aynı sitede kr 490'lık fotoğraf düzenleme ile
kr 39 000'lık e-ticaret var. Tavsiye edilen çözüm — **Business'ı öne çıkar,
Privat'ı reklamsız tavsiye hizmeti olarak tut** — geliri korur, konumlandırmayı
kurtarır.

---

## 5. Gelir akışları — tam liste

### 5.1 Bugün satılabilir olanlar

**Stüdyo — tek seferlik projeler (19 ürün)**

| Bant | Ürünler | Fiyat |
|---|---|---|
| Küçük | Fotoğraf düzenleme, CV, LinkedIn, kariyer | kr 490 – 2 400 |
| Orta | Kişisel site, portfolyo, AI asistan, landing, SEO, raporlama | kr 4 500 – 9 900 |
| Büyük | Logo, CRM, chatbot, AI otomasyon, site | kr 12 000 – 24 000 |
| Ağır | Marka kimliği, süreç otomasyonu, e-ticaret | kr 28 000 – 39 000 |

**Stüdyo — tekrarlayan (6 ürün) — modelin en değerli parçası**

| Ürün | Kurulum | Aylık |
|---|---|---|
| Sosyal içerik (privat) | — | kr 3 900 |
| Blog & içerik | — | kr 5 900 |
| Sosyal medya | — | kr 7 900 |
| **AI resepsiyonist** | kr 14 000 | kr 2 900 |
| **AI ofis asistanı** | kr 16 000 | kr 3 400 |
| **AI satış asistanı** | kr 19 000 | kr 3 900 |

**Paketler — dört boy, tek fiyat listesi**

| Paket | Fiyat | Kapsam |
|---|---|---|
| Starter | kr 9 900 | Tek net teslimat, 2 revizyon, 5–10 iş günü |
| **Professional** | kr 34 000 | Tam site/marka, içerik dahil, dönem içi sınırsız revizyon, 30 gün destek |
| Premium | kr 79 000 | + otomasyon, CRM, raporlama; haftalık kontrol, yıllık çeyrek gözden geçirme |
| Custom | talep üzerine | Retainer, çok marka, çerçeve sözleşme, kamu ihalesi |

**Arşiv — lisanslar**

| Kademe | Fiyat |
|---|---|
| Personal | kr 190'dan |
| Commercial | kr 890 |
| Extended | kr 2 900 |
| Custom & Exclusive | talep üzerine |

Ortak madde, her lisansta: **makine öğrenimi eğitim verisi olarak kullanım
hariçtir.** Bu bir pazarlama cümlesi değil, satılan şeyin tanımı.

### 5.2 Hipotez olanlar — henüz operasyon planı değil

`docs/05` bir merdiven tarif ediyor. `docs/14` bunun **dördüncü bir şirket**
olduğunu söylüyor ve haklı:

| Seviye | Fiyat | Aslında ne |
|---|---|---|
| Pro yazılar | kr 99–199 / ay | Medya aboneliği |
| Raporlar | kr 299–999 | Bilgi ürünü |
| Kurslar | kr 999–4 999 | Eğitim |
| Curiosity Engine | kr 499–14 999 / ay | SaaS |

**Dikkat** — bunlar aynı belgede, aynı tablo biçiminde, aynı güvenle, satışa
hazır hizmet fiyatlarının yanında duruyor. Değiller. Engine'in Agency kademesi
tek müşteri yokken kr 14 999/ay olarak fiyatlanmış. Modellemek yanlış değil;
operasyon planına karıştırmak yanlış.

**Bu bölüm tarihli bir hipotez olarak işaretlenmelidir.**

---

## 6. Birim ekonomisi — asıl matematik

### İma edilen saatlik ücret

Site kendi ücretini ele veriyor: kariyer desteği = 2 saat, kr 2 400.

```
İma edilen ücret ≈ kr 1 200 / saat
```

Bu sayıyı bütün ürünlere uygulamak modelin sağlamasıdır.

### AI resepsiyonist — portföydeki en güçlü teklif, ve tek büyük riski

**Neden en güçlü:**

- **Tekrarlar.** Ortalama kr 3 400'dan üç müşteri = yılda kr 122 400
  öngörülebilir gelir. Yılda otuz proje öngörülebilir değildir; üç retainer'dır.
- **Gösterilebilir.** Site zaten Beta Art'ın bu üçünü kendisi için çalıştırdığını
  söylüyor. Mevcut en ucuz ve en ikna edici satış varlığı.
- **Alıcıya oturuyor.** Çağrılarının üçte birini kaybeden bir Norveç küçük
  işletmesi — spesifik, pahalı ve itiraf edilmiş bir problem.

**Risk kurulum ücretinde:**

```
kr 14 000 ÷ kr 1 200/saat = 11,7 saat ≈ bir buçuk gün
```

Bu bir buçuk günün içine sığması gerekenler: keşif, telefon ve takvim
entegrasyonu, ses tonu, eskalasyon kuralları, GDPR dayanağı, gerçek çağrılarla
test, iki hafta gözetim.

**İlk gerçek kurulum dört gün sürerse ürün her satışta para kaybeder — ve bunu
görünmez şekilde kaybeder, çünkü aylık ücret hesabı sağlıklı gösterir.**

> **Kural: bir kez teslim etmediğiniz kurulum fiyatını yayımlamayın.** Gerçek
> bir işletme için birini kurun, saati ölçün, fiyatı sonra koyun. Mevcut en
> yüksek değerli deney budur.

### Bir maaşa giden üç yol

Norveç'te tek kişilik bir stüdyo için kabaca kr 900 000 ciro hedefiyle:

| Yol | Aritmetik | Değerlendirme |
|---|---|---|
| **A — hepsi proje** | 900 000 ÷ 12 500 medyan = **72 proje/yıl** = haftada 1,4 | Tek kişinin teslim kapasitesinin üstünde |
| **B — paket ağırlıklı** | 900 000 ÷ 34 000 = **26,5 Professional** = iki haftada bir | `docs/14`'ün "25–30 proje" bulgusuyla örtüşüyor. **Gerçekçi olan bu** |
| **C — karma, retainer omurgalı** | kr 37 500 MRR (≈ 11 AI-personel retainer'ı) + 36 proje | En sağlam, ama 11 retainer satmak zaman alır |

**Model B ile başlar, C'ye doğru gider.** Retainer sayısı arttıkça proje
baskısı düşer. Bu geçiş modelin bütün amacıdır.

---

## 7. Ödeme mimarisi — para nasıl akar

Karar alınmış (`docs/05`, 2026-08-20): **Beta Art her üründe kayıtlı satıcıdır
(merchant of record), tek işlemci Stripe.** Lemon Squeezy yok, Paddle yok,
arşiv ile stüdyo arasında bölünme yok.

Tek işlemci, tek sözleşme, tek defter, bir ödeme sorgulandığında bakılacak tek
yer.

**Bunun getirdiği, devredilemez yükümlülükler:**

- **KDV sorumluluğu, her yerde.** Stripe Tax hesaplar ve raporlar; satıcı
  değildir. Kayıt, beyan ve ödeme şirkette kalır — kr 50 000 dönen ciro üzerinde
  Norveç MVA'sı, AB'deki tüketicilere dijital satışta ise **non-Union OSS** (AB
  dışında yerleşik satıcı için küçük satıcı eşiği yoktur).
- **Chargeback ve itirazlar**, Beta Art adına.
- **Müşteri sözleşmeleri.** Alıcının muhatabı Beta Art'tır — lisans şartlarının
  zaten söylediği şey.

Bu karar **tek bir tetikleyicide** yeniden açılmaya değer: Curiosity Engine'in
AEA dışında birçok ülkede tüketiciye satması. O noktada ücret değil, **beyan
yükü** merchant of record'u ucuzlatır.

**Ödeme yöntemleri, gerçeğe göre:**

| | Yöntem |
|---|---|
| Tek seferlik (NO) | Vipps (Stripe önizlemesi), kart, cüzdan |
| **Abonelikler** | **Yalnızca kart** — Stripe'ın Vipps desteği tekrarlayan ödemeyi taşımıyor |
| B2B | Fatura, net 14, **EHF 3.0** (1 Ocak 2027 zorunluluğundan önce) |

Ve mimarinin var oluş sebebi olan tek kural:

> **Erişim bir webhook ile verilir, asla bir yönlendirme ile değil.**

**İade:** Norveç/AEA tüketicileri için 14 günlük cayma hakkı (Angrerettloven,
2011/83/EU). Üç istisna, her biri sözleşmeden önce açıkça belirtiliyor.

---

## 8. Maliyet yapısı

| Kalem | Nitelik |
|---|---|
| **Emek** | Tek kişi. Modelin hem en büyük maliyeti hem de tek darboğazı |
| Barındırma | Vercel — ticari kullanım Pro gerektirir ($20/kullanıcı/ay) |
| Ödeme servisi | Render, Frankfurt (AB bölgesi) |
| İşlem ücreti | Stripe Norveç kartı: %2,4 + kr 2 |
| Alan adı | `beta-art.com` (alınmış) + alt alanlar |
| Muhasebe | Muhasebeci + MVA beyanı |
| Yazılım | Sıfır bağımlılık — statik site, derleme adımı yok, framework yok |

Yapının kendisi bir maliyet kararı: **derleme yok, framework yok, npm install
yok.** Tek dış bağımlılık Google Fonts. Bu, siteyi kendi araçlarından uzun
ömürlü kılar ve bakım maliyetini sıfıra yakın tutar.

---

## 9. Kanallar

| Kanal | Durum | Not |
|---|---|---|
| Field Notes → bülten | Kurulu, backend yok | Ayda iki mektup, sponsorlu yazı yok |
| SEO | 102 sayfa, yapılandırılmış veri, iki besleme | 7 bilgi bankası makalesi + 9 deneme |
| Norveççe URL'ler | 27 indekslenebilir sayfa | Norveç pazarı için en büyük tek kanal kazancı |
| Tavsiye | Ölçülmedi | Tek kişilik bir stüdyo için gerçekte en büyük kanal |
| Kamu ihalesi | Açılmadı | Çerçeve sözleşme = tekrarlayan gelire en yakın şey |
| Sosyal | Instagram + LinkedIn linkleri var | İçerik yok |

**Ölçülmeyen şey: müşteri edinme maliyeti.** Hiç müşteri edinilmediği için
hiçbir CAC rakamı yok, ve uydurmak modeli bozar.

---

## 10. Bugün geliri yapısal olarak engelleyen beş şey

Görüş değil, mevcut yapı hakkında olgular:

1. **Hiçbir şey para alamıyor.** Checkout yok, backend yok, yedi form hiçbir şey
   kaydetmiyor. Trafik ne olursa olsun **dönüşüm yapısal olarak sıfır.**
2. **"48 saat içinde" sözü 31 sayfada** ve arkasında bir gelen kutusu yok.
   Cevaplanmayan ilk talep, sayfanın kazandırdığından fazlasına mal olur.
3. **Organizasyon numarası yok.** Stripe hesabını ve ilk yasal faturayı
   engelliyor. Repodaki hiçbir şey bunu üretemez.
4. **Hiçbir müşteriyle konuşulmadı.** Yukarıdaki her fiyat dikkatle yazılmış bir
   hipotez. Dikkatli, test edilmiş demek değildir.
5. **Tek arıza noktası.** Her şeyi tek kişi teslim ediyor. Hastalık = sıfır
   gelir. Retainer'lar ve ürünleştirilmiş teklifler kısmî cevap.

---

## 11. Doksan gün — sıra önemli, paralel değil

| # | Eylem | Neden ilk |
|---|---|---|
| 1 | **Şirketi kur.** Org. numarası, adres, banka, muhasebeci | Stripe'ı, faturayı ve hukuki bildirimdeki her iddiayı engelliyor |
| 2 | **On gerçek Norveçli alıcıyla konuş** — bir ajans, bir kommune, bir dükkân, bir klinik | Kalan seksen dokuz günü geçersiz kılabilecek tek şey |
| 3 | **Tek bir ürün için uçtan uca backend** — talebi saklar, ödemeyi alır, webhook ile erişim verir | Merdiven değil. **Bir** ürün |
| 4 | **Gerçek bir işletme için bir AI resepsiyonist teslim et**, saati ölçülmüş | Kurulum fiyatı ancak ondan sonra kanıtla konur |
| 5 | **On iki gerçek fotoğraf** — ya da kataloğu olmadan yayımla | Yer tutucu katalog, katalogsuzluktan kötüdür |
| 6 | **Norveççe ve Türkçe dil incelemesi** | Türkçe 893 kelime ve gözden geçiren sahibin kendisi |

Geri kalan her şey — Klarna, Engine, kurslar, Pro kademesi, diğer dokuz dil —
bekler. **Hiçbiri geç kalırsa başarısız olmaz. Hepsi erken gelirse başarısız
olur.**

---

## 12. Modelin tek cümlelik özeti

> Arşivin disiplini stüdyonun kanıtı olur, stüdyonun hizmetleri gelir olur,
> dergi zaten iyi yaptığı tek işi yapmaya devam eder.

Buradaki zanaat olağandışı derecede iyi; ticari sıralama olağandışı derecede
ters. Titizliğin neredeyse tamamı **ekonomisi en zayıf** mülke gitti, ödeme
yapabilecek mülkün teslimat makinesi ise hiç kurulmadı.

Bu düzeltilebilir bir problem ve hiçbir şey atılmadan düzeltilebilir.

Yatırımcı olsam beni endişelendirecek şey plan değil. **Hiçbirinin henüz bir
müşteriyle karşılaşmamış olması.**
