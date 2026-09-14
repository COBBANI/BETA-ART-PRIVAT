# Intake — 30.08.2026 (ek) — beta-art.com canlı ana sayfa

## Gelen dosya

- `beta-art-com-live-homepage.md` — kullanıcının https://beta-art.com/cart
  adresinden yapıştırdığı sayfa içeriği (görünüşe göre ana sayfa; /cart
  URL'i ile içerik uyuşmuyor, kullanıcıya sorulmalı — yönlendirme mi,
  yanlış kopyalama mı belirsiz).

## Tespit: bu, `beta-art/src` değil — "Airo BASE EXPERIENCE"

`beta-art/BETA_ART_MASTER.md`'de "GoDaddy Airo — BASE EXPERIENCE" olarak
anılan, henüz koda reconcile edilmemiş canlı kaynak muhtemelen budur.
Aynı temel veri setinden geliyorlar (plaka adları, `kr 190` — `beta-art/
src/data/collection.ts` ile örtüşüyor, doğrulandı: `grep -rl "First
Light" beta-art/src` → `collection.ts` + `routes/index.tsx`), ama iki
farklı yüzey:

| | `beta-art/src` (git'te, bu depoda) | Canlı `beta-art.com` |
|---|---|---|
| Başlık | "Photography **with Proof**" | "**Verified Human** Photography" |
| Nav | Collection, Verification, Photographer, FAQ, Contact | + **Categories, Industries**, ayrı **Cart** sayfası |
| FAQ | `collection.ts`'deki `faqs` (az sayıda, farklı sorular) | 17 soru — Norveç hukuku detaylı (14 gün cayma hakkı, KDV/org no faturası, lisans devri yasağı) |
| **Exhibitions & Events** | **Yok** | 3 etkinlik: Oslo sonbahar 2026 açılış, kış 2026 grup sergisi, bahar 2027 davetli önizleme |
| Rotalar | `contact`, `license-terms`, `privacy`, `refunds`, `plates.$slug` | + `/categories`, `/industries`, `/request-a-shoot`, `/cookie-settings`, `/cart`, `/kontakt` |
| İletişim | (kod içinde ayrı kontrol edilmedi) | `hallo@beta-art.com` |
| Fotoğrafçı sesi | "A human archive starts with an accountable human" (placeholder, kimlik onaylanmamış) | "I photograph what actually exists... 84,000 frames since 2012" (birinci şahıs, iddialı rakam — **doğrulanmadı**) |

## Karar — henüz verilmedi, kullanıcıya soruldu

Bu, `BETA_ART_MASTER.md` §10 Gate #1'in ("Obtain/review the current Airo
project export... reconcile the Airo homepage with the unified section
architecture") tam olarak beklediği malzeme. Ama koda geçirmek (FAQ'yu
değiştirmek, Exhibitions bölümü eklemek, Categories/Industries/cart
sayfaları açmak) başlı başına bir mühendislik işi ve şu an **çözülmemiş
üç-proje yapısı sorusuyla iç içe**: "Exhibitions & Events" canlı sitede
Privat sayfasının bir bölümü, ama 30.08 `PROJECT-MANIFEST.md`'deki yeni
model bunu ayrı bir proje (`BAG-03` Galeri) yapmak istiyor. Yani bu canlı
sayfa, muhtemelen ayrıştırma kararından ÖNCEKİ birleşik hâl — üç-proje
modelinin neden gerekli görüldüğünün kanıtı olabilir.

**Kod değişikliği yapılmadı** — yalnızca arşivlendi, karşılaştırma
çıkarıldı. §M'deki (bkz. `docs/beta-ai-konsept.md` değil, bu klasördeki
açık sorular) yapısal karar netleşmeden React koduna dokunulmayacak.

## Açık kalanlar

1. `/cart` URL'i ile ana sayfa içeriği neden aynı — yönlendirme mi?
2. "84,000 frames since 2012" ve fotoğrafçının birinci şahıs sesi —
   gerçek mi, yer tutucu mu? (`beta-art/src`'de "biyografi uydurulmaz"
   notu var, bu rakam onunla gerilim yaratıyor.)
3. FAQ ve Exhibitions içeriği koda mı taşınsın, yoksa üç-proje modeli
   netleşene kadar beklesin mi?
4. `hallo@beta-art.com` gerçek/aktif iletişim adresi mi?
