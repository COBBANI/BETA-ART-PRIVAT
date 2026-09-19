# WEB-2026-002 — DEĞİŞİKLİK GÜNLÜĞÜ

Promptun madde 8 formatı, ISO 8601. Kaynak: `apps/beta-art-archive/` git
geçmişi (dal `claude/beta-art-privat-g7k5vk`). Bu günlük **git zincirinin
insan-okur özeti**; birebir kanıt her zaman commit'in kendisidir. Değişikliği
yapan: bu oturum (Claude), talep sahibi Betul. Onay: PR #7'de.

Not: Bu depoda git tag yok; "Sürüm" sütunu, SURUM-GECMISI'nde önerilen SemVer
haritasına göre **geriye dönük** yazılmıştır (henüz etiket basılmadı).

---

## CHG-2026-09-03-001 – A11y: `<html lang>` ilk yüklemede senkron

- **Tarih ve saat:** 2026-09-03 06:19 UTC
- **Sürüm:** (öneri v1.0.0 sonrası patch)
- **Değişikliği yapan:** Claude / talep: günlük iyileştirme turu
- **Değişikliğin nedeni:** Dönen ziyaretçide `<html lang>` içerik diliyle uyuşmuyordu (index.html sabit `en`); ekran okuyucu yanlış dil anonsluyordu.
- **Önceki durum:** `lang` yalnız kullanıcı dil değiştirince güncelleniyordu.
- **Yeni durum:** `langContext.tsx` içinde `useEffect` ile ilk yüklemede de senkron.
- **Değiştirilen dosyalar:** `src/lib/langContext.tsx`
- **Etkilenen sayfalar:** tümü (kök `<html>`)
- **Kullanıcıya etkisi:** Ekran okuyucu doğru dili anonslar.
- **Teknik etkisi:** Yok (yalnız a11y).
- **Test sonucu:** build yeşil, deploy READY.
- **İlgili commit:** `62a0743`
- **Geri alma yöntemi:** revert `62a0743`
- **Onay durumu:** PR #7'de.

## CHG-2026-09-02-004 – run-beta-art-archive becerisi

- **Tarih ve saat:** 2026-09-02 17:54 UTC
- **Nedeni:** Uygulamayı kur/başlat/sür/screenshot için tekrar kullanılabilir sürücü.
- **Değiştirilen dosyalar:** `apps/beta-art-archive/.claude/skills/run-beta-art-archive/{SKILL.md,driver.mjs}`
- **Teknik etkisi:** Sadece geliştirici aracı; siteyi etkilemez.
- **İlgili commit:** `8702dc7`
- **Onay durumu:** PR #7'de.

## CHG-2026-09-02-003 – Satışları grafikte göster (aylık gelir çubuk grafiği)

- **Tarih ve saat:** 2026-09-02 14:02 UTC
- **Nedeni:** "SATISLARI GRAFIKTE GOSTER" (Betul).
- **Yeni durum:** `/#admin` panelinde inline SVG aylık brüt gelir çubukları (dataviz kuralı: tek seri tek renk).
- **Değiştirilen dosyalar:** `src/pages/Admin.tsx`, `src/lib/sales.ts` (monthlyTotals)
- **Etkilenen sayfalar:** gizli `/#admin`
- **İlgili commit:** `c0a0287`
- **Onay durumu:** PR #7'de.

## CHG-2026-09-02-002 – Yönetici satış takip sistemi (gizli /#admin)

- **Tarih ve saat:** 2026-09-02 13:56 UTC
- **Nedeni:** "SATIS TAKIP SISTEMI KUR" — ziyaretçi/yönetici ayrı sistem.
- **Yeni durum:** Cihaz-yerel satış defteri (`ba_satis_v1`): istatistik, satış ekleme, fotoğrafçı ödemeleri, tablo, CSV dışa aktarım.
- **Değiştirilen dosyalar:** `src/lib/sales.ts`, `src/pages/Admin.tsx`, `src/lib/router.tsx`
- **Kullanıcıya etkisi:** Yalnız yönetici (gizli hash rota); ziyaretçi görmez.
- **İlgili commit:** `945b5e3`
- **Onay durumu:** PR #7'de.

## CHG-2026-09-02-001 – Müşteri davranış sistemi (cihaz-içi öneri)

- **Tarih ve saat:** 2026-09-02 13:39 UTC
- **Nedeni:** "COSTEMER BEHAVIOR SISTEM" — ne göreceğini/alacağını bul.
- **Yeni durum:** `ba_davranis_v1` cihaz-yerel; `ForYou` şeridi; soğuk başlangıçta boş, "aktivitemi unut" sıfırlama.
- **Değiştirilen dosyalar:** `src/lib/behavior.ts`, `src/components/ForYou.tsx`, `Home.tsx`, `PlateDetail.tsx`, `router.tsx`
- **İlgili commit:** `8efd142`
- **Onay durumu:** PR #7'de.

## CHG-2026-09-02-000 – Sosyal medya kanalları

- **Tarih ve saat:** 2026-09-02 13:10 UTC
- **Nedeni:** "SOSIAL MEDIA KANALLARI GELISTIR".
- **Yeni durum:** Footer sosyal entegrasyonu + paylaşım meta'ları; plan `docs/beta-art/sosyal-medya.md`.
- **Değiştirilen dosyalar:** `src/components/Footer.tsx`, `index.html` (og/twitter), i18n footerFollow.
- **İlgili commit:** `76d1fc5`
- **Onay durumu:** PR #7'de.

## CHG-2026-09-02-EVID – Kanıt denetiminin 10 bulgusu düzeltildi

- **Tarih ve saat:** 2026-09-02 06:30 UTC
- **Nedeni:** Haksız/doğrulanamayan iddiaları kaldır (DEC-2026-09-02-001).
- **Önceki durum:** Sabit tarih, "Identity verified" rozeti, RAW garantisi, MVA'lı fatura dili.
- **Yeni durum:** İddialar yumuşatıldı/kaldırıldı; fatura SSS MVA'dan söz etmiyor.
- **Değiştirilen dosyalar:** `Home.tsx`, `PlateDetail.tsx`, `Artists.tsx`, `i18n.ts`, `data.ts`
- **İlgili commit:** `f96c096`
- **Onay durumu:** PR #7'de.

---

## Daha önceki inşa zinciri (2026-08-31 → 2026-09-01) — özet

Tam kimlik her commit'te. Kronoloji (hepsi dal `claude/beta-art-privat-g7k5vk`):

| Tarih (UTC) | Commit | Ne |
|---|---|---|
| 2026-09-01 21:00 | `fec9bf5` | Life Flower sırası people·places·moments (8 dil) |
| 2026-09-01 13:18 | `1ae20ea` | Kalite eşiği cümlesi 8/8 dil tam |
| 2026-09-01 13:17 | `593f94c` | Fotoğrafçı başvuru sistemi v1 + kalite kapısı + faktura planı |
| 2026-09-01 13:14 | `b943e59` | Görsel altı İndir düğmesi + otomatik ad kuralı |
| 2026-09-01 13:07 | `b209cc1` | Komisyon modeli %30/%70 (DEC-2026-09-01-001) |
| 2026-09-01 13:02 | `8f7ee72` | Çekim kaydı: EXIF'ten yer/tarih + katalog no |
| 2026-09-01 12:57 | `85527b5` | İlk gerçek fotoğraf — Golden Hour plakası |
| 2026-09-01 12:28 | `615660c` | Hero imza cümlesi |
| 2026-09-01 12:25 | `78c2ae8` | İki katmanlı nav, atlama bağlantısı, sicil düzeltmeleri |
| 2026-09-01 11:36 | `40a0038` | Industries site içine; footer lisans adları 8 dil |
| 2026-09-01 11:02 | `d925302` | Sepet Checkout → Stripe Payment Link'e hazırlık |
| 2026-09-01 09:58 | `a181c8a` | Tam çeviri modeli belgelendi |
| 2026-09-01 09:57 | `1f252b0` | Çeviri faz 2 — tüm içerik 8 dil |
| 2026-09-01 09:39 | `d0a6e9d` | Çeviri faz 1 — hero/biyo/Life Flower 8 dil |
| 2026-09-01 08:08 | `c009e77` | Life Flower manifesto bölümü |
| 2026-09-01 00:49 | `246e399` | SVG favicon (404 düzeltmesi) |
| 2026-09-01 00:18 | `df62a9a` | Fontlar self-hosted; ad `beta-art-privat` |
| 2026-08-31 22:00 | `182d959` | **İlk commit — Beta Art Archive React app** |
