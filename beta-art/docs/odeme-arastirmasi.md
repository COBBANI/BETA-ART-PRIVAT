# Ödeme sistemi araştırması: DNB ve Klarna (Beta Art)

**02.09.2026, kullanıcı isteğiyle hazırlandı** ("VIBBES DNB ODEME SISTEMI
KLARNA" — netleştirme turunda kapsam "Beta Art için DNB ve Klarna'yı
araştır ve karşılaştır" olarak kesinleşti; "VIBBES" ayrı, çözülmemiş bir
kelime, bu araştırmaya konu değil).

**Kanıt işaretleme:** `[V]` doğrulanmış, `[H]` hipotez/çıkarım, `[D]`
doğrulanmamış dış iddia (bu depronun `CLAUDE.md` kuralı).

## 0. Ortam sınırı — bu araştırmanın neyi kapsamadığı

Bu oturumun egress proxy'si `dnb.no`, `vippsmobilepay.com` ve
`klarna.com`'a **doğrudan erişimi engelliyor** (`WebFetch` üçünde de
`EGRESS_BLOCKED` döndü — bu, `qblogg-operasyon` becerisinde daha önce
belgelenen genel bir ortam sınırı, yeni bir bulgu değil). Aşağıdaki
rakamların tamamı **WebSearch sonuç özetlerinden** geliyor — çoğu
sağlayıcıların kendi resmi fiyat sayfaları değil, üçüncü taraf
karşılaştırma siteleri (nettsmed.no, smartbyra.no gibi). **Hiçbiri bu
oturumda birincil kaynaktan doğrulanmadı** — hepsi `[D]`. Gerçek bir
sözleşme imzalamadan önce ilgili sağlayıcının resmi fiyat sayfasını
kendiniz açıp teyit edin.

## 1. Beta Art'ın şu anki durumu — bu bir "değiştir" değil, "sıfırdan kur" kararı

`src/components/LicenseRequestForm.tsx`'in kendi başındaki not: **"this
form is FRONT-END ONLY. Nothing is sent anywhere."** [V] — plaka lisans
talebi formu şu an yalnızca bir taslak isteği hazırlıyor, gerçek bir
ödeme akışı (Stripe dahil) hiç bağlanmamış. Yani DNB/Klarna karşılaştırması
**mevcut bir Stripe entegrasyonunu değiştirmek değil**, ilk defa
kurulacak ödeme altyapısı için sağlayıcı seçimi.

Bilinen tek referans nokta: bu depoda zaten kayıtlı, [V] olarak
doğrulanmış Stripe Norveç kart ücreti — **yurt içi kart %1,5 + 1,80 kr,
yurt dışı +%3,25, döviz dönüşümü +%2** (`CLAUDE.md`, "Bilinen sınırlar").
Fiyat aralığı: `src/data/collection.ts`'teki plakalar **190 NOK**'tan
başlıyor, `CURRENCY = "NOK"`.

## 2. DNB

**Ana bulgu, en önemlisi: DNB'nin kendi başına ayrı bir "DNB ödeme
sistemi" markası yok gibi görünüyor — DNB, Vipps MobilePay'in en büyük
hissedarı.** [D] Bir WebSearch sonucu DNB'nin Vipps'teki payını **%52**
olarak veriyor (SpareBank 1-alliansen %25, bağımsız tasarruf bankaları
%12, Eika Alliansen %10, Sparebanken Møre %1). Vipps 2017'de DNB
konsorsiyumundan ayrı bir şirkete dönüştü, 2022'de Danimarka'nın
MobilePay'iyle birleşip "Vipps MobilePay" oldu.

**Pratik sonuç:** "DNB ile online ödeme al" muhtemelen iki şeyden birine
çıkıyor — (a) DNB'nin kendi kurumsal bankacılık panelinden bir kart
ödeme/Nets tabanlı çözüm (DNB'nin "Payments price list" sayfası bunu
işaret ediyor ama bu oturumdan açılamadı, rakamları göremedim), ya da
(b) fiilen **Vipps**'i kullanmak — DNB müşterisi olmak bunu
kolaylaştırabilir ama Vipps MobilePay ayrı bir şirket, ayrı bir fiyat
listesi.

**DNB'nin kendi kart/e-ticaret ücretleri bu oturumda doğrulanamadı** —
`dnb.no/en/business/daily-banking/payments/payments-price-list` engelli.
**Bu, DNB banka müşterisi olarak sizin kendi bankacılık panelinizden
tek satırla görebileceğiniz bir bilgi** — bu araştırmanın gerçek
boşluğu burası.

## 3. Vipps (Checkout / eCommerce)

Beta Art'ın Norveç'e yönelik yerel bir alıcı kitlesi olduğu düşünülürse
(bkz. `small-business` becerisinin dil kararı: BAP dahi uluslararası
ama BAB/BAG Norveççe) Vipps, Norveçli alıcılar için muhtemelen en
tanıdık/en yüksek dönüşümlü seçenek — bu bir gözlem `[H]`, rakamla
doğrulanmadı.

Bulunan (çelişkili, ikisi de `[D]`) rakamlar:
- Bir kaynak: **%1,25–1,75 işlem başına**, **~5.000 kr kurulum ücreti**
  (Vipps Checkout, nettbutikk'e özel).
- Başka bir kaynak: **%1,5–2,5 işlem başına**, aylık **~299 kr/ay**
  temel paket.

**Bu iki rakam birbiriyle tam örtüşmüyor** — muhtemelen farklı
paketler/entegratör ortakları (Vipps'in kendisi mi, yoksa Quickpay,
Checkout.com gibi bir aracı mı) karıştırılıyor. Bir WebSearch sonucu da
"Vipps üzerinden Quickpay ile 1,30 NOK/işlem" diyor — bu üçüncü bir
sayı, muhtemelen sabit ücretli farklı bir plan. **Net sonuç:** Vipps'in
gerçek nettbutikk fiyatı yalnızca doğrudan başvuruyla netleşiyor;
"~%1,5-2 + değişken sabit ücret" aralığı kaba bir tahmin olarak alınmalı,
kesin rakam değil.

## 4. Klarna

**En önemli uyarı:** ilk aramada bulunan "%5,99 + $0,30" rakamı
**ABD'ye özel** — Norveç için geçerli değil, karıştırılmamalı. Norveç
için ayrı bir arama bunu doğrulamadı; bulunan tek somut Norveç rakamı
(Adyen üzerinden Klarna Pay Later): **€0,11 + %2,79 + 5,90 NOK** — ama
bu Adyen'in aracı fiyatı, doğrudan Klarna sözleşmesi değil, ve "Pay
Later" (sonra öde) ürününe özel, tek seferlik kart tahsilatına değil.

Genel (Klarna'ya özel olmayan, Norveç ödeme sağlayıcıları için kural-
mantığı) bir kaynak şunu söylüyor: işlem ücretleri tipik olarak
**%1,5–3**, aylık **0–300 kr**, kurulum **0 – birkaç bin kr** arasında
değişiyor — ama bu Klarna'nın kendi rakamı değil, genel bir referans
aralığı.

**Ürün-uyum sorusu (bu, rakamdan daha önemli):** Klarna'nın temel değer
önerisi **sonra öde / taksitli ödeme** — bu, kredi riski taşıdığı için
diğer yöntemlerden **daha yüksek** işlem ücretine yol açıyor (kaynaklar
bunu açıkça söylüyor: "Klarna işlem ücretini daha yüksek alıyor çünkü
sonradan ödeme riskini üstleniyor"). Beta Art'ın satış kalemi **tek bir
dijital fotoğraf lisansı, 190 NOK'tan başlıyor** — bu fiyat/hacim
profili, alıcının taksit/erteleme ihtiyacı duyacağı bir sepet değil.
**`[H]`: Klarna, Beta Art'ın bu aşamadaki ürünü için muhtemelen yanlış
araç** — daha yüksek ücret öder, ama asıl sunduğu özelliği (taksit)
kimse kullanmaz. BAB-02 (inşaat proje dokümantasyonu, muhtemelen daha
yüksek fiyatlı paketler) ileride Klarna'nın gerçekten anlam kazanacağı
bir hat olabilir — ama bu da bir varsayım, doğrulanmadı.

## 5. Özet tablo (hepsi `[D]`, doğrudan sağlayıcıdan teyit edilmeli)

| Sağlayıcı | İşlem ücreti (yaklaşık) | Sabit/aylık | Beta Art'ın şu anki ürünü için uyum |
|---|---|---|---|
| **Stripe** (zaten belgede [V]) | %1,5 yurt içi / %3,25 yurt dışı + %2 döviz | 1,80 kr/işlem, aylık yok | Uluslararası kart kabul ediyor — BAP-01'in İngilizce/uluslararası alıcı kitlesine uygun |
| **Vipps (Checkout)** | ~%1,25–2,5 (kaynaklar çelişkili) | ~299 kr/ay veya ~5.000 kr kurulum (kaynağa göre değişiyor) | Norveçli alıcı için muhtemelen en tanıdık — BAB/BAG'ın yerel kitlesine uygun `[H]` |
| **DNB (kendi markası)** | Doğrulanamadı — panel/resmi sayfa erişilemedi | Doğrulanamadı | Muhtemelen fiilen Vipps'e veya Nets tabanlı bir çözüme çıkıyor — ayrı bir ürün olmayabilir |
| **Klarna** | Norveç'e özel rakam bulunamadı; genel aralık %1,5–3 (Klarna'ya özel değil) | Değişken, sağlayıcıya sorulmalı | Muhtemelen yanlış uyum — taksit özelliği bu fiyat/ürün profilinde gereksiz `[H]` |

## 6. Önerilen sonraki adım (araştırma, karar değil)

Bu belge bir **karar değil, karşılaştırma girdisi**. Kullanıcı karar
vermeden önce önerilen üç somut, ücretsiz doğrulama adımı:

1. **DNB Nettbank Bedrift** panelinden "Payments"/kart ödeme fiyat
   listesine bakın (bu oturumdan görülemedi, sizin bankacılık
   erişiminizden bir dakikalık iş).
2. **vippsmobilepay.com/no-NO/pricing** (veya "Vipps for bedrift"
   sayfası) — Checkout paketinin güncel, kesin fiyatını görün.
3. Klarna'yı yalnızca **BAB-02 gibi daha yüksek fiyatlı bir hat**
   büyüdüğünde yeniden değerlendirin — şu anki 190 NOK'luk tek plaka
   satışı için muhtemelen gereksiz maliyet.

Bu araştırma sırasında kod tabanında hiçbir değişiklik yapılmadı — ödeme
akışı zaten kurulmamış durumda (`LicenseRequestForm.tsx`), o yüzden
"hangi sağlayıcıyı entegre edelim" kararı henüz geri dönüşü olmayan bir
adım değil.
