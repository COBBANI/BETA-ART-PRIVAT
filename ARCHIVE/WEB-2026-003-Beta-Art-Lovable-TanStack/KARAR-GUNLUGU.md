# WEB-2026-003 — KARAR GÜNLÜĞÜ

Promptun madde 7 formatı.

---

## DEC-2026-09-03-001 – Bu kopya kanonik DEĞİL; "eski sürüm" işaretlendi

- **Tarih:** 2026-09-03
- **Proje:** WEB-2026-003 (ve WEB-2026-002)
- **Proje aşaması:** Define
- **Kararı alan:** Betul
- **Konu:** Aynı ağaçta iki Beta Art kod tabanı.
- **Mevcut problem:** `beta-art/` (bu, TanStack+Supabase, Lovable) ile `apps/beta-art-archive/` (minimal Vite) çakışıyor.
- **Değerlendirilen seçenekler:** (a) bu kanonik; (b) 002 kanonik; (c) ikisi de kalsın.
- **Seçilen çözüm:** (b) 002 kanonik → **bu kopya eski/atıl.**
- **Seçilme nedeni:** 002 bugün aktif + canlı READY + PR #7. Bu kopya 2026-08-30'dan beri commit almadı.
- **Beklenen sonuç:** Bu kopya SURUM-GECMISI'nde ESKI-SURUMLER'e sınıflanır; **silinmez, taşınmaz** (kullanıcı ayrıca onaylamadıkça).
- **Etkilenen kod dosyaları:** hiçbiri (yalnız arşiv sınıflaması).
- **Riskler:** Ağaçta durması ileride karışıklık — bu belgeyle açıkça işaretlendi.
- **Geri alma yöntemi:** Belge düzeyinde; kod dokunulmadı.
- **Kararın durumu:** Onaylandı.
- **Yeniden değerlendirme:** Kullanıcı "Arşivlendi" durumuna almak isterse.

---

## Açık karar (kullanıcı onayı bekliyor)

- **DEC-BEKLIYOR:** Bu kopya resmen "Arşivlendi" durumuna alınsın mı, yoksa
  ileride 002'ye taşınacak parçalar (örn. Supabase entegrasyon deseni) için
  "referans" mı tutulsun? Karar verilene kadar durum **Beklemede**.

**Not:** Bu kod tabanının Lovable'daki üretim/tasarım karar geçmişi bu depoda
değil (Lovable editöründe). Buraya kopyalanmadı — **Bilgi bulunamadı,
Lovable projesi (`9b7b3abe`) dışında görülemedi.**
