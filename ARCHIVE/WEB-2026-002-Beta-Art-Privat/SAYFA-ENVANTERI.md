# WEB-2026-002 — SAYFA ENVANTERİ

Promptun madde 5'i, **hafif** biçimde: 12 rota tek belgede, her biri için
doğrulanabilir alanlar. Kaynak: `apps/beta-art-archive/src/pages/*` +
`src/lib/router.tsx` (2026-09-03 taraması). Uygulama **durum-tabanlı router**
kullanır (URL router yok) — "URL" sütunu mantıksal rotayı gösterir; gerçek
gezinme `usePage().go(page)` iledir. Gizli yönetici sayfası `#admin` hash'iyle.

Ortak çerçeve her sayfada: `Masthead` (üst) + `Footer` (alt) + tema/dil
context'leri. Tüm görünen metin `i18n.ts` sözlüğünden (8 dil); HTML'de sabit
metin yok.

| PAGE | Sayfa | Rota (page) | Amaç | Bölüm/CTA (doğrulanan) | Kaynak dosya | Satır |
|---|---|---|---|---|---|---|
| PAGE-001 | Ana sayfa | `home` | Arşivi tanıt, koleksiyona ve lisanslamaya yönlendir | 9 `<section>`, 1 H1, 7 H2; istatistik kutuları (frames/since), davranış kaydı + `ForYou` | `Home.tsx` | 482 |
| PAGE-002 | Plaka detayı | `plate` (`goToPlate`) | Tek plakanın kökeni + lisans + indir/sepet | 2 section; İndir/Sepet düğmesi **yalnız `purchasable` ise**; `record({t:"view"/"cart"})` + `ForYou` | `PlateDetail.tsx` | 182 |
| PAGE-003 | Kategoriler | `categories` | Kategori dizini + "aradığını bulamadın" yönlendirmesi | 1 section, H1+H2; `record({t:"filter"})` | `Categories.tsx` | 60 |
| PAGE-004 | SSS | `faq` | Sık sorular; "bulamadın" iletişim yönü | 1 section; SSS listesi | `Faq.tsx` | 72 |
| PAGE-005 | Çekim talebi | `request-a-shoot` | Özel çekim brief formu | 1 section; **`previewNotice`** (canlı değil uyarısı); form | `RequestShoot.tsx` | 67 |
| PAGE-006 | Sepet | `cart` | Seçilen plakalar + Stripe'a hazırlık checkout | 2 section, 2 düğme; boş-durum; `cartContext` | `Cart.tsx` | 107 |
| PAGE-007 | Sat (fotoğrafçı başvuru) | `sell` | Fotoğrafçının arşive başvurusu | 1 section; ad/eposta/portfolyo form alanları | `Sell.tsx` | 130 |
| PAGE-008 | Fiyatlar | `prices` | Lisans katmanları + fiyat rehberi | 1 section, H1+H2 | `Prices.tsx` | 59 |
| PAGE-009 | Giriş/Kayıt | `auth` | Hesap giriş/kayıt arayüzü | 1 section, düğme; log in / register sekmeleri | `Auth.tsx` | 82 |
| PAGE-010 | Geri bildirim | `feedback` | Ziyaretçi geri bildirim formu | 1 section; `previewNotice`; form | `Feedback.tsx` | 87 |
| PAGE-011 | Fotoğrafçılar | `artists` | Arşivdeki fotoğrafçılar + plakaları | 1 section, H1+H2 | `Artists.tsx` | 73 |
| PAGE-012 | Yönetici (gizli) | `admin` (`#admin`) | Satış defteri + gelir grafiği + CSV | 1 form, 2 düğme; **ziyaretçiye görünmez**; `sales.ts` | `Admin.tsx` | 302 |

## Sayfa-bazı notlar (madde 5 seçili alanlar)

- **Veri kaynağı:** tüm içerik cihaz-içi/statik. Plakalar `src/lib/data.ts`
  (12 plaka: First Light … Low Tide; yalnız 2'si "Available"). Davranış
  `ba_davranis_v1`, satış `ba_satis_v1` (localStorage). **Backend/API yok.**
- **API bağlantıları:** yok (ödeme henüz Stripe Payment Link'e "hazırlık"
  aşamasında; canlı uç yok).
- **Formlar (RequestShoot, Sell, Feedback):** hepsi `previewNotice` taşıyor —
  "bu bir prototip, canlı gönderim yok" (uydurma yasağı: sahte işlem akışı yok).
- **Erişilebilirlik:** `<html lang>` dil ile senkron (CHG-2026-09-03-001);
  tema token'ları; tek H1 kuralı sayfaların çoğunda korunuyor (Home 1×H1).
- **SEO/meta:** `index.html`'de site geneli og/twitter kartları
  (DEGISIKLIK-GUNLUGU CHG-2026-09-02-000). Sayfa-başı meta yok (SPA — tek
  HTML). **Bilinen sınır:** durum-tabanlı SPA olduğu için arama motoru tek
  URL görür; sayfa-başı SEO için ön-render gerekir.
- **Mobil/performans:** Vite build, self-hosted font (CHG df62a9a), tek
  görsel varlık (`public/plates/golden-hour.jpg` + `favicon.svg`).
- **Bilinen hatalar:** yok (build yeşil). Açık iş: ödeme canlı değil;
  SPA SEO sınırı.
- **Son değişiklik / sürüm:** hepsi HEAD `62a0743` (v1.0.0 adayı); ekran
  görüntüsü arşivi henüz oluşturulmadı (madde 12 — istenirse `run-beta-art-archive`
  becerisiyle alınır).

## Yeniden kullanılabilecek kodlar (bu sayfalardan)

- `ForYou` (PAGE-001/002) → SHARED-WEB-LIBRARY LIB-BEHAVIOR-01.
- `RevenueChart` (PAGE-012) → UI-CHART-01.
- Form desenleri (PAGE-005/007/010) → ui/ primitifleri (UI-SHADCN-01).

## Sonraki geliştirme önerisi (sayfa düzeyi)

- Ödeme canlıya alınınca PAGE-006 (Cart) ve PAGE-002 (Download) gerçek Stripe
  akışına bağlanır.
- SPA SEO sınırı için ön-render adımı (tüm proje kapsamı).
- Ekran görüntüsü arşivi (madde 12) — masaüstü/mobil, sürüm etiketli.
