---
name: small-business
description: BETA ART'ın kendi küçük işletme işleri — nakit takibi, Norveç şahıs şirketi (enkeltpersonforetak) için MVA ve forskuddsskatt, üç mülkün (BAP-01 Privat / BAG-03 Galleri / BAB-02 Business) satış ve müşteri kaydı. Kullanıcı "MVA", "forskuddsskatt", "muhasebe", "banka ekstresi", "fatura", "nakit durumu", "BAP/BAG/BAB" ya da BETA ART'ın parasal/müşteri işleriyle ilgili bir şey sorduğunda MUTLAKA bu beceriyi kullan. Para veya müşteriye giden HER adım kullanıcı onayı gerektirir — bu beceri hiçbir ödeme, fatura veya mesajı kullanıcı onayı olmadan göndermez.
owner: BETA ART
---

# small-business — BETA ART nakit, MVA ve müşteri kaydı

**Zorunlu kural, istisnasız:** Para veya bir müşteriye ulaşan **her adım** kullanıcı
onayı ister — fatura göndermek, ödeme talep etmek, MVA beyanı hazırlamak,
bir müşteriye e-posta taslağı dışında bir şey yollamak. Bu beceri hiçbir
zaman kendi başına harekete geçmez; taslak hazırlar, onay bekler.

---

## 1. Üç mülk — doğrulanmış kodlar

Kaynak: `beta-art/docs/BETA-ART-PROJECT-CODES.md`

| Kod | Mülk | Ne satar | Dil | Fiyat bandı |
|---|---|---|---|---|
| **BAP-01** | Privat | Doğrulanmış fotoğraf, edisyon, doğrudan lisanslama | İngilizce | kr 190 / 890 / 2 900 |
| **BAG-03** | Galleri og Utstilling | Sergi, etkinlik, sanatçı/eser programı | İngilizce | *(henüz fiyatlanmadı)* |
| **BAB-02** | Business | İnşaat sektörüne proje arşivi ve dokümantasyon | Norveççe öncelikli | kr 490 – 39 000 |

**BAC çözümü:** Önceki bir oturumda geçen "BAC subscription clients" kodu hiçbir
resmi BETA ART belgesinde yer almıyor. Üçüncü mülk BAG-03'tür (Galleri).
BAC kodu ortaya çıkarsa kullanıcı hangi mülke ait olduğunu söylemeli.

---

## 2. Ödeme altyapısı

Kaynak: `beta-art/docs/05paymentarchitecture.md` (karar: 2026-08-20)

- **Stripe — tek hesap, tüm mülkler, live modda aktif** (doğrulandı: 2026-09-02)
- Lemon Squeezy, Paddle veya bölünmüş hesap yok
- **Tek seferlik ödemeler:** Vipps — Stripe private preview, önce erişim gelmeli
- **Abonelik/retainer:** Kart zorunlu (Stripe üzerinden Vipps aboneliği desteklenmiyor)
- **Sunucu:** Ödeme servisi → Render Frankfurt; siteler → Vercel
- Erişim her zaman webhook onayıyla verilir, yönlendirmeyle değil

---

## 3. MVA (Merverdiavgift) — doğrulanmış

| Alan | Değer | Kaynak |
|---|---|---|
| Norveç MVA eşiği | kr 50 000 kümülatif ciro (rolling) | docs/05paymentarchitecture.md |
| Beyan dönemi | **Çift aylık (termin)** — yılda 6 beyan | Kullanıcı onayı: 2026-09-02 |
| AB dijital tüketici satışı | Eşiksiz non-Union OSS | docs/05paymentarchitecture.md |
| ENK kaydı / Org.nr | **Henüz başvurulmadı** | Kullanıcı onayı: 2026-09-02 |

### MVA termin takvimi (Altinn — çift aylık)

Termin sınırları ve Altinn son tarihleri (referans; muhasebeci teyidi gerekli):

| Termin | Dönem | Altinn son tarihi |
|---|---|---|
| 1. termin | Ocak – Şubat | 10 Nisan |
| 2. termin | Mart – Nisan | 10 Haziran |
| 3. termin | Mayıs – Haziran | 31 Ağustos |
| 4. termin | Temmuz – Ağustos | 10 Ekim |
| 5. termin | Eylül – Ekim | 10 Aralık |
| 6. termin | Kasım – Aralık | 10 Şubat (ertesi yıl) |

**Önemli:** kr 50.000 eşiğine ulaşılmadan MVA kaydı açılmaz ve beyan verilmez.
Eşik yaklaştığında bu beceri uyarı verir; kayıt açma adımı kullanıcıya aittir.

### Forskuddsskatt

ENK'ta skatt ödeme takvimi (referans — Skatteetaten teyidi gerekli):

| Taksit | Son tarih |
|---|---|
| 1. taksit | 15 Mart |
| 2. taksit | 15 Mai |
| 3. taksit | 15 September |
| 4. taksit | 15 November |

Org.nr olmadan vergi hesabı resmîleşemez; taslaklar ⚠️ işaretli çıkar.

---

## 4. Fiyat referansı

Kaynak: `beta-art/docs/18ismodeli.md`

### BAP-01 Privat — arşiv lisansı

| Tier | Fiyat |
|---|---|
| Kişisel | kr 190 |
| Ticari | kr 890 |
| Genişletilmiş | kr 2 900 |

### BAB-02 Business — proje hizmetleri

| | Fiyat bandı |
|---|---|
| Proje bazlı | kr 490 – 39 000 |
| Medyan tek seferlik iş | ~kr 9 500 |
| Retainer / aylık | (ayrıca fiyatlandırılacak) |

BAG-03 için henüz onaylı fiyat yok — gelir kaydında kod olarak tutulur, tutar
üzerinde konuşulana kadar tahmin edilmez.

**Mülkler arası fiyat/lisans geçişi yasak** (`BETA-ART-ROUTE-MAP.md`).

---

## 5. Dil kuralı

| Mülk / bağlam | Dil |
|---|---|
| BAB-02 Business — müşteri | Norveççe öncelikli |
| BAP-01 Privat — müşteri | İngilizce |
| BAG-03 Galleri — müşteri | İngilizce |
| Kullanıcıyla iç yazışma | Türkçe |

---

## 6. Pipeline — Notion

**Doğrulandı: müşteri takibi Notion'da** (2026-09-02).

Standart kayıt alanları (Notion veritabanı önerileri):

### BAB-02 Business pipeline

| Alan | Değer |
|---|---|
| Şirket | |
| Temas kişisi | |
| Proje tipi | İnşaat / yenileme / altyapı / diğer |
| Durum | `İlk görüşme` / `Teklif gönderildi` / `Pilot aktif` / `Tamamlandı` / `Pasif` |
| İlk temas tarihi | |
| Son görüşme tarihi | |
| Tahmini değer (kr) | |
| Notlar | |

### BAP-01 Privat pipeline

| Alan | Değer |
|---|---|
| Müşteri | |
| Lisans tier | Kişisel / Ticari / Genişletilmiş |
| Mülk/görsel | |
| Durum | `Talep alındı` / `Teklif gönderildi` / `Lisanslı` / `İptal` |
| Tarih | |
| Tutar (kr) | |

### BAG-03 Galleri pipeline

| Alan | Değer |
|---|---|
| Sanatçı / kurum | |
| Sergi/etkinlik adı | |
| Tür | Sergi / Açılış / Etkinlik |
| Durum | `Değerlendirme` / `Planlandı` / `Gerçekleşti` / `İptal` |
| Tarih | |

Kullanıcı "pipeline ekle" dediğinde bu şemayı Markdown tablo olarak üretir,
onay alır, ardından Notion sayfasına işlenmesi için sunar.

---

## 7. Banka bilgisi — doğrulandı

| Alan | Değer | Kaynak |
|---|---|---|
| Banka | **DNB** | Kullanıcı onayı: 2026-09-02 |
| Ekstresi formatı | **XLSX** | Kullanıcı onayı: 2026-09-02 |

Nakit özeti için beklenen format: DNB XLSX ekstresi. Kullanıcı dosyayı paylaştığında
satırları BAP / BAG / BAB'a göre ayır (açıklama veya tutar eşleşmesiyle).

**Tüm operasyonel veriler artık dolu — boşluk kalmadı.**

---

## 8. Bu becerinin yaptıkları

### 8a. Nakit durumu özeti

Kullanıcı banka/muhasebe export'unu paylaştığında:
1. Satırları üç mülke ayır (BAP / BAG / BAB) — gelir ve gider
2. Dönem toplamlarını çıkar
3. MVA eşiğine kalan mesafeyi hesapla (kr 50.000 - dönem kümülatif)
4. Aktif termin'i ve Altinn son tarihini göster
5. Özet tabloyu göster → kullanıcı onayı

### 8b. Fatura taslağı

Bir Stripe satışı veya elle girilen işlem geldiğinde:
1. Mülkü (BAP/BAG/BAB) ve fiyat seviyesini tespit et
2. Fatura taslağını hazırla

```
FATURA / FAKTURA
Satıcı: BETA ART
Org.nr: ⚠️ BAŞVURU YAPILMADI — fatura resmi değil
Tarih: YYYY-MM-DD
Fatura no: [BAP/BAB/BAG]-YYYY-NNN

Alıcı: [isim, adres, org.nr]

Hizmet: [açıklama]
Tutar (eks. MVA): kr ___
MVA %25: kr ___  ← yalnızca kr 50.000 eşiği aşıldıktan sonra
Toplam: kr ___

Ödeme: Stripe / [banka IBAN]
Vade: [tarih — standart 14 gün]
```

3. Onay iste → göndermez

### 8c. MVA termin taslağı

"MVA hazırla" veya termin sonu geldiğinde:
1. Aktif termin dönemini belirle (takvimden)
2. Dönem gelirlerini mülke göre listele (BAP/BAG/BAB ayrı)
3. MVA hesapla (eğer eşik aşıldıysa)
4. AB satışları ayrı işaretle (non-Union OSS)
5. Taslak beyan tablosunu göster
6. **Altinn'e göndermez** — kullanıcı veya muhasebeci gönderir

### 8d. Pipeline kaydı (Notion)

"Müşteri ekle" / "teklif gönderildi" / "pilot başladı" dediğinde:
1. Mülkü tespit et (BAB/BAP/BAG)
2. Şemaya göre kayıt taslağı oluştur
3. Onay iste → Notion'a işlenmesi için sunar

---

## 9. Sınırlar

- **Canlı Stripe, Altinn, Render, Notion işlemi yapmaz.** Taslak hazırlar, göndermez.
- **Vergi/hukuk tavsiyesi vermez.** MVA tarihleri ve forskuddsskatt taksitleri
  referanstır; muhasebeci/regnskapsfører teyidi gerekir.
- **Org.nr'siz resmi fatura üretmez** — taslağa ⚠️ koyar, ENK kaydı açılana kadar.
- **Bir mülkün şartını diğerine uygulamaz** (`BETA-ART-ROUTE-MAP.md`).
- **Banka formatı bilinmeden nakit özeti üretmez** — önce sorar.
