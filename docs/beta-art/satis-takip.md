# Beta Art — satış takip sistemi (yönetici) ve iki-sistem ayrımı

Oluşturma: 02.09.2026 (kullanıcı talebi: "satış takip sistemi kur — web
sayfasını yöneten kişi için" + "web sayfasını düzenleyen kişi ve kullanıcılar
için ayrı sistem kuruyoruz").

## İki ayrı sistem (kullanıcı kararı)

Site iki farklı kişiye iki farklı sistem sunar; ikisi kod ve veri olarak
tamamen ayrık:

| | **Kullanıcı (ziyaretçi)** | **Yönetici (siteyi yöneten)** |
|---|---|---|
| Sistem | Davranış/öneri katmanı — "Picked for you" | Satış takip defteri |
| Amaç | Bir sonraki sefer ne görmek/almak isteyeceği | Satışları, komisyonu, ödemeleri izlemek |
| Nerede | Her ziyaretçinin kendi tarayıcısı | Yalnızca yöneticinin tarayıcısı |
| Erişim | Herkese açık sayfalarda görünür | Gizli `/#admin`, nav/footer'da yok |
| Depolama | `localStorage → ba_davranis_v1` | `localStorage → ba_satis_v1` |
| Belge | `davranis-sistemi.md` | bu belge |

İki depolama anahtarı ayrı; yönetici verisi ile ziyaretçi verisi hiçbir
noktada karışmaz (Playwright ile doğrulandı). Yöneticinin `#admin`
ziyaretleri davranış profilini de kirletmez (admin sayfası `record()`
çağırmaz).

## Yönetici satış takip sistemi — ne yapar

Gizli `/#admin` adresinde bir satış defteri:

- **Satış ekle:** tarih, plaka, lisans katmanı, brüt (kr), kesinti (kr —
  otomatik tahmin, düzenlenebilir), fotoğrafçı, alıcı e-postası, kaynak
  (Stripe / lisans-talebi e-postası), not.
- **Otomatik hesap** (`komisyon-ve-mva.md` tek kaynağından):
  - Stripe kesintisi tahmini: yurt içi kart %1,5 + 1,80 kr (yurt dışı/döviz
    için kesinti alanı elle düzenlenir).
  - Net = brüt − kesinti. Bölüşüm: **%30 Beta Art / %70 fotoğrafçı**,
    kesinti tepeden düşülür.
  - Beta Art'ın kendi plakaları (fotoğrafçı = "Beta Art") → komisyon yok,
    net tamamen işletmede kalır.
  - **MVA yok** (işletme kayıtlı değil) — hiçbir yerde KDV satırı yazmaz.
- **Özetler:** satış sayısı, brüt, kesinti, net, Beta Art payı (%30),
  ödenecek toplam; ayrıca fotoğrafçı başına ödenecek tutar listesi.
- **CSV dışa aktarım** (muhasebeci/kayıt için) ve satır silme.

Örnek doğrulama (Playwright): kr 190 Personal, kesinti 4,65 →
net 185,35; kendi plakası → Beta Art payı 185,35, ödeme yok; dış fotoğrafçı
→ ödeme kr 129,7x, Beta Art kr 55,6x. Rakamlar `komisyon-ve-mva.md`
örneğiyle tutuyor.

## Neden "dürüst v1" (uydurma yasağı)

Statik sitede sunucu ve canlı ödeme yakalama yok. Bu yüzden satışlar
OTOMATİK kaydedilemez — yönetici her satışı gerçek kaynaktan (Stripe paneli
canlı olduğunda + lisans-talebi/Sell e-postaları) elle işler. Sistem, bu
elle girişi düzgün bir deftere ve doğru para bölüşümüne çevirir. "Stripe'a
bağlı, otomatik" gibi bir iddia YOK, çünkü henüz doğru değil.

### Güvenlik notu (yöneticiye açıkça)

`/#admin` yalnızca bağlantısızdır, **parola korumalı DEĞİLDİR** (statik
sitede sunucu kimlik doğrulaması yok). Veri yalnızca yöneticinin o an
kullandığı tarayıcıda durur — o cihaza özel, hiçbir yere gönderilmez. Başka
bir cihazda/temiz tarayıcıda defter boş görünür. Bu yüzden buraya düz bir
satış kaydından fazlası (kart numarası vb.) girilmez.

## Yöneticiye kullanım

1. Tarayıcıda siteyi aç, adres çubuğuna `/#admin` ekle (ör.
   `https://beta-art-privat-phi.vercel.app/#admin`) — sayfayı yer imine ekle.
2. Her satış geldiğinde (Stripe bildirimi veya lisans e-postası) formu
   doldur, "Add sale". Kesinti otomatik gelir; yurt dışı/döviz ise elle
   düzelt.
3. Ay sonunda "Export CSV" ile dökümü indir; fotoğrafçı ödemelerini
   "Payouts owed by photographer" listesinden yap.

## Bilinçli KAPSAM DIŞI / sonraki adımlar (backend gelince)

- Stripe webhook ile **otomatik satış kaydı** (elle giriş yerine).
- Çok cihazlı, **parola korumalı** yönetici paneli (sunucu + kimlik).
- Fatura/ödeme durumu takibi (ödendi/bekliyor), fotoğrafçıya otomatik
  ödeme (Stripe Connect).
- MVA kaydı gelirse (`komisyon-ve-mva.md` eşiği) hesaba KDV satırı.

Bu adımların hiçbiri sunucu ve gerçek ödeme verisi olmadan siteye yazılmaz.
