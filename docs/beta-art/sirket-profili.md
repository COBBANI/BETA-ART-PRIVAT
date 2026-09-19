# Beta Art — şirket profili (small-business eklentisi bağlamı)

Oluşturma: 02.09.2026 (kullanıcı talebi: "small-business eklentisini şirketime
göre özelleştir" → Beta Art). Bu belge, `small-business` eklentisinin iş
akışlarının (friday-brief, plan-payroll, close-month, invoice-chase,
cash-flow-snapshot, tax-prep, run-campaign…) her çağrıda sıfırdan sormak
yerine okuyacağı tek şirket bağlamıdır. Eklenti kurulup `smb-onboard`
çalıştığında bu profil ona verilir.

**Uydurma yasağı geçerli.** Aşağıda yalnızca doğrulanmış bilgiler yazılı;
bilinmeyen alanlar `[DOLDURULACAK]` ile işaretli — eklenti bunları uydurulmuş
değer yerine boş/soru olarak ele almalı. Para/vergi/müşteriye dokunan her
adımda insan onayı zorunlu (eklentinin kendi kuralı da bu).

## Kimlik ve hukuki yapı

- **Ticari ad:** Beta Art
- **İş kolu:** kanıt temelli insan fotoğrafçılığı arşivi + lisanslama; ayrıca
  diğer fotoğrafçıların doğrulanmış işlerini satabildiği bir pazar yeri (v1
  e-posta ile başvuru).
- **Hukuki biçim:** Norveç **enkeltpersonforetak** (şahıs işletmesi).
- **Organisasjonsnummer:** `[DOLDURULACAK]` (depoda kayıtlı değil; fatura/
  belge üretmeden önce girilmeli).
- **Ülke / dil / para birimi:** Norveç · nb-NO + en (site 8 dilli) · **NOK (kr)**.
- **İletişim:** hallo@beta-art.com · site: https://beta-art.com
  (canlı üretim şu an https://beta-art-privat-phi.vercel.app).

## Vergi (KRİTİK — eklenti varsayımlarını ezer)

- **MVA (KDV) kaydı YOK.** İşletme Merverdiavgiftsregisteret'e kayıtlı değil.
  Bu yüzden: faturada MVA satırı **gösterilmez**, fiyata MVA **eklenmez**,
  `kr 190` nihai fiyattır. `tax-prep` / `close-month` / fatura akışları MVA
  hesaplamamalı.
- **Eşik takibi:** 12 aylık ciro **50.000 kr**'ı aşınca MVA kaydı zorunlu
  olur; o gün fiyat gösterimi ve bu profil birlikte güncellenir. Eklentinin
  ciroyu izleyip bu eşiğe yaklaşınca **uyarması** beklenir.
- **Gelir vergisi:** enkeltpersonforetak'ta sahip maaş almaz; kâr üzerinden
  **forskuddsskatt** (ön vergi) ödenir. Yani `plan-payroll` klasik bordro
  değildir — Beta Art için "bordro yok; forskuddsskatt taksit planı"
  olarak yorumlanmalı. Çalışan: `[DOLDURULACAK — muhtemelen yok]`.
- **Muhasebeci:** `[DOLDURULACAK]`. Açık soru: sanatçının kendi eseri satışında
  MVA istisnası ("egne kunstverk") fotoğrafik sanata uygulanır mı — muhasebeciye
  sorulacak, burada hüküm verilmiyor.

## Fiyatlandırma ve komisyon (tek kaynak: komisyon-ve-mva.md)

- **Personal lisans:** kr 190 (sabit, nihai). Commercial / Extended / Custom &
  Exclusive: **"Price on request"** — sabit sayı yok, teklif üretilir.
- **Komisyon:** dışarıdan bir fotoğrafçının işi satılırsa **%30 Beta Art /
  %70 fotoğrafçı**; kesinti tepeden düşülür. **Beta Art'ın kendi plakalarında
  komisyon yok** — net tamamen işletmede kalır.
- **Ödeme kesintisi (Stripe, Norveç):** yurt içi kart %1,5 + 1,80 kr (yurt dışı
  +%3,25, döviz +%2). Karar öncesi güncel tarifeden teyit edilmeli.
- Örnek (kr 190 yurt içi): kesinti ~4,65 → net 185,35 → kendi plakası: BA
  185,35; dış fotoğrafçı: fotoğrafçı 129,75 / BA 55,60.

## Bağlı araçlar — GERÇEK durum (eklenti varsayımlarını ezer)

Eklenti QuickBooks/HubSpot/PayPal/Square varsayar; Beta Art'ın gerçek yığını
farklı. Bir aracı "bağlı" varsaymadan önce bu listeye bak:

| Araç | Durum |
|---|---|
| **Stripe** | Planlı, **henüz canlı değil** — kullanıcı ödeme yöntemini etkinleştirince Payment Link (kr 190 NOK, invoice_creation açık) kurulacak. Şu an checkout lisans-talep formuna düşüyor. |
| **Gmail / Gsuite** | hallo@beta-art.com kullanımda (form `mailto` taslağı üretir). |
| **Faktura** | Stripe `invoice_creation` ile ödeme sonrası e-posta faturası planlı; canlı değil. |
| QuickBooks / HubSpot / PayPal / Square / Docusign / Canva | `[DOLDURULACAK]` — kullanıcı bağladığını belirtmedi; varsayma, önce sor. |
| **Satış defteri** | Sitenin kendi cihaz-yerel yönetici paneli (`/#admin`, `ba_satis_v1`) — satışlar elle girilir; grafik + CSV dışa aktarım var. Otomatik değil. |

## Müşteri / satış bağlamı

- **Alıcı tipi:** lisans alan (B2B: ajans/yayıncı/marka; B2C: Personal).
- **Satış kanalı bugün:** lisans-talep formu + hallo@beta-art.com; Stripe canlı
  olunca doğrudan ödeme.
- **CRM:** `[DOLDURULACAK]` — HubSpot bağlı değil; `crm-cleanup`/`lead-triage`
  şimdilik e-posta kutusu üzerinden yorumlanmalı ya da atlanmalı.
- **Marka sesi:** kanıt/dürüstlük; "No AI. Real people · Real places · Real
  moments." `run-campaign`/`content-strategy` bu tonu korumalı, abartılı iddia
  ve uydurma sayı kullanmamalı (sitenin uydurma yasağı burada da geçerli).

## Eklenti iş akışlarının Beta Art'a göre yorumu (özet)

- `plan-payroll` → bordro yok; forskuddsskatt taksit hatırlatması.
- `close-month` / `tax-prep` → **MVA yok**; ciro 50.000 kr eşiğini izle ve uyar.
- `invoice-chase` / `cash-flow-snapshot` → veri kaynağı Stripe (canlı olunca) +
  `/#admin` satış defteri; QuickBooks yok.
- `run-campaign` / `content-strategy` → marka sesi + uydurma yasağı; sosyal
  kanal planı `docs/beta-art/sosyal-medya.md`.
- `friday-brief` / `business-pulse` → gelir NOK, MVA'sız net; kaynak yukarıdaki.

## Güncelleme kuralı

Bir gerçek değişirse (org number girildi, Stripe canlıya alındı, MVA kaydı
geldi, yeni araç bağlandı) önce bu profil güncellenir, sonra eklentiye yeniden
verilir. `[DOLDURULACAK]` alanlar birer açık iştir.
