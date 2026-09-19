# WEB-2026-001 — DEĞİŞİKLİK GÜNLÜĞÜ

Promptun madde 8 formatı, ISO 8601. QBLOGG'un günlük değişiklik tarihçesi
**`docs/proje-gunlugu.md`**'de tutulur (kullanıcı talimatı, 22.08.2026);
bu dosya arşiv göstergesi + son değişikliklerin özetidir, o günlüğü
kopyalamaz.

Değişikliği yapan: bu oturum (Claude) + Betul (talep). Kanonik kanıt: kök
git geçmişi (`git log` kök dizin).

---

## CHG-2026-09-03-001 – ARCHIVE web projeleri arşiv sistemi eklendi

- **Tarih ve saat:** 2026-09-03 10:51 UTC
- **Sürüm:** (belge; site sürümü değişmedi)
- **Değişikliğin nedeni:** AUTOPROMPT arşivleme sistemi — tüm web projelerinin tek merkezli kaydı.
- **Yeni durum:** `ARCHIVE/` iskeleti + MASTER-REGISTRY + WEB-2026-002 kartı; sonra 001/003/004/005/006.
- **Değiştirilen dosyalar:** yalnız yeni `ARCHIVE/*`; mevcut hiçbir dosya değişmedi.
- **Etkilenen sayfalar:** yok (site kodu değişmedi).
- **Kullanıcıya etkisi:** yok (yalnız belge).
- **İlgili commit:** `4e24127` (ve sonrası)
- **Geri alma yöntemi:** `ARCHIVE/` dizinini kaldır.
- **Onay durumu:** Kullanıcı onaylı (bu iş).

---

## Tarihsel değişiklik kaydı

QBLOGG'un aşama-aşama değişiklik geçmişi **`docs/proje-gunlugu.md`**'de
tarihle işlenir. Bilinen büyük kilometre taşları (CLAUDE.md'den, kanıt orada):

| Tarih | Ne |
|---|---|
| 2026-08-20 | Depo initial (`fc6b3a9`) |
| ~2026-08-22 | QBLOGG içeriği; `main` `-s ours` merge ile QBLOGG'a çevrildi; Vercel'e alındı |
| 2026-08-22 | Push izni kuruldu (GitHub App); haftalık SEO/AI görünürlük izlemesi (Pzt 07:00 NO) |
| 2026-08-26 | Vercel konum bilgisi düzeltildi |
| 2026-08-30 | MONOREPO birleşmesi (beta-art, naviar, agents taşındı); depo `BETA-ART-PRIVAT`'a taşındı + private |
| 2026-09-01 | Üye alanı, panel, engine gelişmeleri (git geçmişine bakınız) |
| 2026-09-03 | ARCHIVE sistemi |

> Tam ve kanonik kayıt için: `docs/proje-gunlugu.md` + `git log` (kök).
> Bu tablo yalnız hızlı yönelim içindir; tarih çakışması olursa git kazanır.
