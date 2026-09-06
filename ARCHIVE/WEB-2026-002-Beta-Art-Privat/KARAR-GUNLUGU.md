# WEB-2026-002 — KARAR GÜNLÜĞÜ

Promptun madde 7 formatı. Aşama sınıfı: Discover → Define → Design → Validate
→ Build → Launch → Measure → Scale. Yalnızca kaynağı doğrulanmış kararlar
kayıtlı; uydurma yok.

---

## DEC-2026-09-03-001 – İki Beta Art kopyasından `apps/beta-art-archive` kanonik

- **Tarih:** 2026-09-03
- **Proje:** WEB-2026-002 (ve WEB-2026-003)
- **Proje aşaması:** Launch
- **Kararı alan:** Betul
- **Konu:** Aynı ağaçta iki Beta Art React kod tabanı var.
- **Mevcut problem:** `beta-art/` (TanStack Start, `tanstack_start_ts`, tam Radix, Lovable kökenli) ile `apps/beta-art-archive/` (minimal Vite, `beta-art-privat`) — hangisi kalıcı?
- **Değerlendirilen seçenekler:** (a) apps/beta-art-archive kanonik; (b) beta-art/ kanonik; (c) ikisi de kalsın, sonra karar.
- **Seçilen çözüm:** (a) `apps/beta-art-archive/` kanonik.
- **Seçilme nedeni:** Bugünkü commit + canlı READY dağıtım (beta-art-privat-phi.vercel.app) + PR #7'nin konusu + minimal bağımlılık. `beta-art/` 2026-08-30'dan beri atıl.
- **Reddedilen seçenekler:** (b) beta-art/ kanonik → aktif geliştirmeyi taşımak büyük iş; (c) belirsizlik riski sürer.
- **Beklenen sonuç:** Tek kanonik Beta Art kodu; `beta-art/` "eski kopya" işaretlenir (silinmez).
- **Etkilenen sayfalar:** —
- **Etkilenen kod dosyaları:** hiçbiri (yalnız arşiv sınıflaması; `beta-art/`'a dokunulmadı).
- **Riskler:** `beta-art/`'ın hâlâ ağaçta durması ileride karışıklık yaratabilir → SURUM-GECMISI'nde açıkça işaretlendi.
- **Geri alma yöntemi:** Bu karar belge düzeyinde; git'te hiçbir kod taşınmadı, geri almak yalnızca kaydı güncellemek.
- **Kararın durumu:** Onaylandı.
- **Yeniden değerlendirme tarihi:** WEB-2026-003 kartı oluşturulurken.

---

## DEC-2026-09-03-002 – Arşiv kapsamı: hafif + tek şema

- **Tarih:** 2026-09-03
- **Proje:** Tüm ARCHIVE (WEB-2026-002 pilot)
- **Proje aşaması:** Define
- **Kararı alan:** Betul
- **Konu:** Promptun 11-klasörlük yapısı mı, hafif mi?
- **Mevcut problem:** Tam yapı × 6 proje ≈ 200+ dosya; mevcut `docs/` ile çakışma riski; depo "az dosya" felsefesinde.
- **Değerlendirilen seçenekler:** (a) hafif + tek şema (4 kayıt + MASTER-REGISTRY); (b) tam 11-klasör; (c) yalnız MASTER-REGISTRY.
- **Seçilen çözüm:** (a).
- **Seçilme nedeni:** İzlenebilirliği verir, mevcut docs'u ezmez, depo felsefesiyle uyumlu.
- **Reddedilen seçenekler:** (b) aşırı ağır; (c) proje derinliği eksik.
- **Beklenen sonuç:** `ARCHIVE/` altında tek şema + proje başına 4 zorunlu kayıt.
- **Etkilenen kod dosyaları:** yalnız yeni `ARCHIVE/*` belgeleri.
- **Riskler:** İki numaralandırma şemasının eşlemesi güncel tutulmalı (README'de tablo var).
- **Geri alma yöntemi:** `ARCHIVE/` dizinini kaldırmak (yalnız yeni dosyalar; mevcut hiçbir şey değişmedi).
- **Kararın durumu:** Onaylandı.
- **Yeniden değerlendirme tarihi:** Tüm projeler kartlandığında.

---

## DEC-2026-09-02-001 – Kanıt denetiminin 10 bulgusunu düzelt (haksız iddia yasağı)

- **Tarih:** 2026-09-02
- **Proje:** WEB-2026-002
- **Proje aşaması:** Validate
- **Kararı alan:** Betul (talep) + uygulama bu oturumda
- **Konu:** Site, kanıtlayamadığı şeyleri iddia ediyordu.
- **Mevcut problem:** Sabit tarih ("March 2026"), "Identity verified" rozeti, RAW garantisi dili, "VAT (where applicable)" faturası — hiçbiri doğrulanamıyor.
- **Değerlendirilen seçenekler:** (a) iddiaları kaldır/yumuşat; (b) olduğu gibi bırak.
- **Seçilen çözüm:** (a) — 10 bulgunun tamamı düzeltildi (commit `f96c096`).
- **Seçilme nedeni:** "No unsupported claim becomes a fact" — sitenin kendi ilkesi ve deponun uydurma yasağı.
- **Etkilenen sayfalar:** Home, PlateDetail, Artists.
- **Etkilenen kod dosyaları:** `src/pages/Home.tsx`, `PlateDetail.tsx`, `Artists.tsx`, `src/lib/i18n.ts`, `src/lib/data.ts`.
- **Riskler:** Yok (iddia azaltmak dürüstlüğü artırır).
- **Geri alma yöntemi:** commit revert `f96c096`.
- **Kararın durumu:** Uygulandı.
- **Yeniden değerlendirme tarihi:** Orijinal foto/sertifika yüklendiğinde (o zaman bazı iddialar geri açılabilir).

---

## DEC-2026-09-02-002 – "Sistemler" cihaz-yerel dürüst v1 olmalı

- **Tarih:** 2026-09-02
- **Proje:** WEB-2026-002
- **Proje aşaması:** Build
- **Kararı alan:** Betul (talep) + tasarım bu oturumda
- **Konu:** Müşteri davranış sistemi + yönetici satış takip sistemi istendi; site statik, backend yok.
- **Mevcut problem:** Sunucu olmadan davranış/satış "sistemi" nasıl kurulur, veri hassasiyeti nasıl korunur?
- **Değerlendirilen seçenekler:** (a) cihaz-yerel localStorage (ağsız, çerezsiz); (b) dış analitik/DB servisi.
- **Seçilen çözüm:** (a) — `src/lib/behavior.ts` (`ba_davranis_v1`) + `src/lib/sales.ts` (`ba_satis_v1`), ziyaretçi/yönetici ayrı.
- **Seçilme nedeni:** Backend yok; kişisel veri toplamadan, çerezsiz, cihazdan çıkmayan; "dürüst v1" — soğuk başlangıçta hiçbir şey göstermez, görünür sıfırlama var.
- **Reddedilen seçenekler:** (b) — GDPR yükü + backend gerektirir + veri hassasiyetini artırır.
- **Etkilenen sayfalar:** Home, PlateDetail (davranış kancaları + ForYou); gizli `/#admin` (satış).
- **Etkilenen kod dosyaları:** `behavior.ts`, `sales.ts`, `components/ForYou.tsx`, `pages/Admin.tsx`, `lib/router.tsx`. Commit'ler `8efd142`, `945b5e3`, `c0a0287`.
- **Riskler:** localStorage temizlenirse veri gider (kabul edilen sınır; dürüst v1).
- **Geri alma yöntemi:** İlgili commit'leri revert.
- **Kararın durumu:** Uygulandı.
- **Yeniden değerlendirme tarihi:** Stripe/gerçek backend canlıya alındığında.

---

## DEC-2026-09-02-003 – Ödeme yöntemi: tek Stripe hosted checkout (Vipps + Klarna, DNB payout)

- **Tarih:** 2026-09-02
- **Proje:** WEB-2026-002
- **Proje aşaması:** Define
- **Kararı alan:** Betul (yön) + öneri bu oturumda
- **Konu:** Vipps / DNB / Klarna istendi.
- **Mevcut problem:** Üçü aynı tür değil; statik sitede ayrı üç entegrasyon backend ister.
- **Değerlendirilen seçenekler:** (a) tek Stripe hosted checkout içinde Vipps MobilePay + Klarna, para DNB'ye; (b) native Vipps ePayment + Klarna Payments (ayrı merchant + backend).
- **Seçilen çözüm:** (a) — en az iş, statik siteye uygun; kr 190 Payment Link'e oturur.
- **Seçilme nedeni:** Ek backend gerektirmez.
- **Reddedilen seçenekler:** (b) — ayrı proje, bugün kapsam dışı.
- **Etkilenen kod dosyaları:** henüz yok (kullanıcı Stripe'ta yöntemleri açıp "hazır" deyince `STRIPE_PAYMENT_LINK` bağlanacak). Tek kaynak: `docs/beta-art/komisyon-ve-mva.md`.
- **Riskler:** Vipps/Klarna Stripe ücretleri `[DOLDURULACAK]` — panelden teyit gerek (uydurma yasağı).
- **Kararın durumu:** Karar verildi, uygulama kullanıcı tarafında bekliyor.
- **Yeniden değerlendirme tarihi:** Kullanıcı "hazır" dediğinde.

---

## DEC-2026-09-01-001 – Komisyon %30/%70 ve MVA gösterilmez

- **Tarih:** 2026-09-01
- **Proje:** WEB-2026-002
- **Proje aşaması:** Define
- **Kararı alan:** Betul (birlikte)
- **Konu:** Para akışı ve vergi durumu.
- **Seçilen çözüm:** Dış fotoğrafçı satışında %30 Beta Art / %70 fotoğrafçı (kesinti tepeden). Kendi plakalarında komisyon yok. İşletme MVA kayıtlı DEĞİL → faturada MVA yok, kr 190 nihai.
- **Seçilme nedeni:** Fotoğrafçıdan yana konum (Stocksy %50 kıyası); kayıtlı olmayan MVA tahsil edemez.
- **Etkilenen kod dosyaları:** `src/lib/sales.ts` (OWNER_COMMISSION=0.3), fatura SSS dili.
- **Riskler:** 12 aylık ciro 50.000 kr eşiği → aşılırsa MVA kaydı zorunlu (izlenecek).
- **Kararın durumu:** Uygulandı. Tek kaynak: `docs/beta-art/komisyon-ve-mva.md`.
- **Yeniden değerlendirme tarihi:** 50.000 kr eşiğine yaklaşınca.
