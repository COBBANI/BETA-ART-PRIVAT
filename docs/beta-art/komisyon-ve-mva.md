# Beta Art — komisyon ve MVA hesabı

Karar tarihi: 01.09.2026 (kullanıcıyla birlikte). Bu belge para akışının tek
kaynağıdır; oran veya MVA durumu değişirse önce burası güncellenir.

## Kesinleşen kararlar

- **Komisyon: satış bedelinin %30'u Beta Art'a, %70'i fotoğrafçıya.**
  (Kıyas: Stocksy sanatçıya standart lisansta %50, genişletilmişte %75
  öder — Beta Art %70 ile fotoğrafçıdan yana konumunu sayıyla kanıtlar.)
  Beta Art'ın kendi plakalarında komisyon kavramı yok; bedelin tamamı işte kalır.
- **MVA: işletme Merverdiavgiftsregisteret'e kayıtlı DEĞİL** (kullanıcı beyanı,
  01.09.2026). Bu yüzden: faturada MVA satırı gösterilmez, fiyatlara MVA
  eklenmez; kr 190 nihai fiyattır. Kayıtlı olmayanın MVA tahsil etmesi yasaktır.
- **Eşik takibi:** 12 aylık ciro 50.000 kr'ı aştığında MVA kaydı zorunlu olur.
  O gün bu belge ve sitedeki fiyat gösterimi birlikte güncellenir.
  Not: sanatçının kendi sanat eseri satışında MVA istisnası olabilir
  ("egne kunstverk"); fotoğrafik sanatın bu kapsama girip girmediği
  **muhasebeciye sorulacak açık soru** — burada hüküm verilmiyor.

## Örnek hesap — kr 190 Personal satışı (bugünkü durum, MVA'sız)

Ödeme kesintisi Stripe'tan gelir. CLAUDE.md'deki not: Norveç yurt içi kart
%1,5 + 1,80 kr (yurt dışı +%3,25, döviz +%2) — **karar öncesi güncel
tarifeden teyit edilmeli**, stripe.com bu ortamda engelli. Yurt içi kart
örneğiyle:

| Kalem | Tutar |
|---|---|
| Satış bedeli | 190,00 kr |
| Stripe kesintisi (%1,5 + 1,80) | −4,65 kr |
| **Dağıtılacak net** | **185,35 kr** |
| Fotoğrafçı payı (%70) | 129,75 kr |
| Beta Art payı (%30) | 55,60 kr |

**Varsayılan sıra (öneri): ödeme kesintisi tepeden düşülür, bölüşüm nete
uygulanır** — iki taraf da işlem maliyetini oransal paylaşır; pazar yerlerinde
yaygın olan budur. Alternatif (kesinti tamamen Beta Art payından):
fotoğrafçı 133,00 kr, Beta Art 52,35 kr alırdı. Fotoğrafçı sözleşmesine
hangisi yazılacaksa ilk sözleşmeden önce kullanıcı onaylamalı; şimdilik
varsayılan, tepeden düşme.

## Faktura (kullanıcı kararı, 01.09.2026)

Satış gerçekleştiğinde alıcının e-posta adresine fatura gider ve faturada
alınan ürünün bilgileri yer alır. Uygulama: Stripe Payment Link
`invoice_creation` açık kurulacak — Stripe, ödeme sonrası faturayı (ürün
adı "Beta Art — Personal licence", açıklama, adet, tutar) alıcının
e-postasına kendisi gönderir; alıcının checkout'ta doldurduğu zorunlu
"plaka adları" alanı siparişle birlikte panelde durur. Plaka adlarının
fatura satırına ürün olarak yazılması istenirse sonraki adım: plaka başına
ayrı Stripe ürünü/fiyatı açmak. Bu bölüm, Stripe'ta ödeme yöntemi
etkinleştirilip bağlantı oluşturulduğunda devreye girer.

## Ödeme yöntemleri — Vipps / DNB / Klarna (kullanıcı yönü, 02.09.2026)

Kullanıcı Norveç ödeme yöntemlerini istedi: **Vipps (MobilePay), DNB, Klarna.**
Üçü aynı türden değil:

- **Vipps MobilePay** — Norveç'in ana mobil ödemesi; web'de Vipps Bedrift
  sözleşmesi + org number + banka hesabı ister.
- **Klarna** — sonra-öde/fatura; merchant sözleşmesiyle ya da bir PSP üzerinden.
- **DNB** — banka; gömülen bir checkout değil, paranın yattığı **settlement
  hesabı**. Stripe/Vipps'in ödeme çıkış hesabı olarak bağlanır.

**Karar yönü (öneri, en az iş — statik siteye uygun):** ayrı üç entegrasyon
yerine **tek Stripe hosted checkout**, içinde **Vipps MobilePay + Klarna**
ödeme yöntemi olarak açık, para **DNB hesabına** yatar. Siteye ek backend
gerekmez; planlanan kr 190 Payment Link'e oturur. Native yol (Stripe'sız
doğrudan Vipps ePayment + Klarna Payments) backend + ayrı merchant
sözleşmeleri ister — ayrı proje, bugün kapsam dışı.

**Teyit edilecek (uydurma yasağı — stripe.com bu ortamda engelli):**
- Stripe panelinde Payment methods altında Vipps MobilePay ve Klarna gerçekten
  açılabiliyor mu (Norveç hesabı için).
- Vipps ve Klarna işlem ücretleri `[DOLDURULACAK]` — kart ücretinden farklı;
  panelde görülüp buraya yazılacak. Örnek hesaplardaki net/bölüşüm bu ücretlere
  göre güncellenir.
- Org number (enkeltpersonforetak, Brønnøysund) ve DNB işletme hesabı
  `[DOLDURULACAK]` — merchant sözleşmeleri ve payout için gerekli.

Kullanıcı adımları (sırayla): (1) DNB'de işletme hesabı hazır olsun,
(2) Stripe hesabında Payment methods → Vipps MobilePay + Klarna'yı etkinleştir,
(3) payout hesabı olarak DNB'yi bağla, (4) bana "hazır" de → kr 190 Payment
Link'i bu yöntemlerle kurar, `STRIPE_PAYMENT_LINK`'i bağlarım.

## MVA kaydı geldiğinde ne değişir (şimdiden bilinen kadarıyla)

- Standart oran %25'tir (sanat istisnası sorusu saklı). "kr 190 MVA dahil mi
  kalır, hariç mi olur" ticari karardır: dahil kalırsa net gelir 152 kr'a
  düşer; hariç olursa alıcı 237,50 kr öder.
- Komisyon bölüşümü MVA'sız net üzerinden yapılır; MVA devlete aittir,
  bölüşülmez.
- Bu satırların hiçbiri bugün siteye yazılmaz — kayıt yokken MVA'dan hiç söz
  etmemek en temiz durumdur. Düzeltme (02.09.2026): bu belgenin "site
  metinlerinde MVA ifadesi yoktur" cümlesi yazıldığı gün yanlıştı — fatura
  SSS'i "VAT (where applicable)" diyordu. Kanıt denetimi bunu yakaladı;
  SSS artık MVA'dan hiç söz etmeyen düz bir makbuz vaadi taşıyor
  (organizasyon numarası da depoya kaydedilene kadar yazılmıyor).
