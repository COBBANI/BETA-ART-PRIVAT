# WEB-2026-002 – Beta Art Privat

- **Proje numarası:** WEB-2026-002
- **Resmî proje adı:** Beta Art Privat (kod/başlık: "Beta Art"; index title "Beta Art Privat")
- **Önceki isimleri:** "Beta Art Archive" (README başlığı), `docs/proje-arsivi.md`'de "BETA ART Privat" (madde 4) / "Private" varyantı (madde 13). Yazım tutarsızlığı kaynak sistemde vardı; kanonik ad **Beta Art Privat**.
- **Kısa açıklama:** İnsanların gerçek kameralarla çektiği özgün fotoğrafların doğrulanmış arşivi; köken kaydı + doğrudan lisanslama, AI yok.
- **Temel amaç:** "Verified human photography" — çekimin özgünlüğünü kanıtla, doğrudan lisansla; ikincil olarak diğer fotoğrafçıların doğrulanmış işlerini satabildiği pazar yeri (v1 e-posta/başvuru).
- **Çözdüğü problem:** AI görselleri çağında "bu gerçekten bir insanın çektiği özgün kare mi?" sorusuna kanıt temelli cevap; stok fotoğrafın köken/hak belirsizliğine alternatif.
- **Hedef kullanıcılar:** Lisans alanlar (B2B: ajans/yayıncı/marka; B2C: Personal); ikincil: arşive katılmak isteyen fotoğrafçılar.
- **Proje sahibi:** Betul (`andersenbetul-alt`).
- **Başlangıç tarihi:** 2026-08-31 (bu ağaçtaki ilk commit `182d959`; kavramsal kökeni daha eski — bkz. KARAR-GUNLUGU / `docs/proje-arsivi.md`).
- **Son güncelleme:** 2026-09-03 (HEAD `62a0743`).
- **Güncel durum:** Yayında.
- **Güncel sürüm:** git tag yok → HEAD `62a0743`. Önerilen ilk kararlı etiket: `v1.0.0` (bkz. SURUM-GECMISI).
- **Son kararlı sürüm:** HEAD `62a0743` — Vercel'de READY dağıtım (`dpl_CqznkNZBNCseTnN1djWkjBscJcA9`). Sınıf: **Doğrulanmış son kararlı sürüm**.
- **Canlı adres:** https://beta-art-privat-phi.vercel.app
- **Test adresi:** Vercel preview dağıtımları (PR başına); yerel `npm run dev` / `npm run preview`.
- **Kod deposu:** github.com/andersenbetul-alt/BETA-ART-PRIVAT (private; origin hâlâ `BETA-ART` etiketli, 301 yönlendiriyor) — dizin `apps/beta-art-archive/`.
- **Aktif Git dalı:** `claude/beta-art-privat-g7k5vk` (PR #7 → `main`).
- **Kullanılan teknolojiler:** React 19 + TypeScript + Vite 8 + Tailwind + shadcn/ui (Radix: label, slot) + lucide-react. Durum-tabanlı router (URL router yok). i18n 8 dil (en, no, tr, it, fr, es, pt, de). Backend YOK — statik SPA.
- **Veri hassasiyet seviyesi:** Düşük. Ağ/çerez/analitik/fingerprint yok; davranış + satış defteri **cihaz-yerel** (localStorage: `ba_davranis_v1`, `ba_satis_v1`). Ödeme henüz canlı değil (Stripe planlı). Kişisel veri toplanmıyor.
- **İlgili projeler:** WEB-2026-003 (`beta-art/`, aynı marka, atıl kopya); WEB-2026-001 (aynı depo, ayrı ürün). Harici Beta Art ailesi: `docs/proje-arsivi.md`.
- **Güncel öncelikler:** PR #7'yi merge'e taşımak; Stripe ödeme yöntemlerini bağlamak (kullanıcı tarafında); beta-art.com alan adını bağlamak.
- **Bilinen sorunlar:** (1) `beta-art/` ile iki kopya çakışması — Kritik; (2) CI'da 6 başıboş kişisel-hesap Vercel projesi kırmızı (bu projeyi etkilemiyor, kullanıcı tarafında); (3) git tag yok.
- **Sonraki adım:** SURUM-GECMISI'ndeki `v1.0.0` tag önerisini onayla; PR #7 merge.
- **Son doğrulama tarihi:** 2026-09-03.

---

## Nasıl düşünüldü (promptun madde 4'ü — doğrulanmış kadarıyla)

Aşağıdakiler `apps/beta-art-archive/README.md`, `src/` yorumları,
`docs/proje-arsivi.md` ve `docs/beta-art/*` belgelerinden derlendi. Kaynağı
olmayan alan açıkça işaretlidir.

- **İlk fikir nasıl ortaya çıktı?** beta-art.com kök sayfasının React+Vite ile
  yeniden inşası (README) + kullanıcı yönüyle "pazar yeri" pivotu (30–31.08.2026
  oturumları): Artists/Sell/Prices/Auth/Cart/Feedback sayfaları eklendi.
- **Hangi problem?** AI çağında doğrulanmış insan fotoğrafçılığına güven +
  doğrudan lisanslama.
- **Başlangıç varsayımları:** Statik site, backend yok → tüm "sistemler"
  (davranış, satış) cihaz-yerel "dürüst v1" olmalı. Money model tek kaynak:
  `docs/beta-art/komisyon-ve-mva.md`.
- **Belirlenen kullanıcı ihtiyaçları:** köken kanıtı (3 doğrulama yöntemi),
  net lisans katmanları, "ne satın alacağım/ne göreceğim" önerisi.
- **Alternatif çözümler:** harici Beta Art kod tabanları (Supabase'li Final
  Work v2, GoDaddy Airo AAB, statik prototip — `docs/proje-arsivi.md` madde
  4/5/13). Bu depodaki sürüm minimal Vite'ı seçti.
- **Neden mevcut çözüm?** "Az bağımlılık, doğrulanabilir, backend'siz
  dağıtılabilir" — depo felsefesiyle uyumlu; canlıya en hızlı giden yol.
- **Tasarım kararları gerekçesi:** tema token'ları (ham hex yok), tek-seri tek
  renk grafik (dataviz), erişilebilirlik (`<html lang>` senkronu).
- **Değişen fikirler:** Kanıt denetiminin 10 bulgusu — doğrulanamayan iddialar
  (tarih, "identity verified" rozeti, RAW garantisi, MVA'lı fatura dili)
  yumuşatıldı/kaldırıldı (bkz. KARAR-GUNLUGU DEC-2026-09-02-001).
- **Reddedilen fikirler:** Sahte/simüle ödeme akışı; MVA kayıtlı değilken
  fatura MVA dili; ham GPS/EXIF yayını — hepsi "uydurma/haksız iddia" yasağıyla
  reddedildi.
- **Kullanıcı geri bildirimi etkisi:** "davranış sistemi", "satış takip", "grafik",
  "Vipps/DNB/Klarna" istekleri doğrudan özelliğe dönüştü.
- **Teknik sınırlamalar:** backend yok → ödeme/kimlik/gerçek analitik dış
  servise (Stripe) bağlı; bu oturumdan stripe.com/kurum siteleri engelli.
- **Zaman içinde gelişimi:** Bkz. DEGISIKLIK-GUNLUGU (git commit zinciri).
- **Şu an neredeyiz?** Yayında, PR #7 açık, ödeme kullanıcı tarafında bekliyor.
- **Bundan sonra ne?** Ödeme bağlama, alan adı, orijinal foto yükleme,
  WEB-2026-003 çakışmasını resmen kapatma.
- **Bilgi bulunamadı – kullanıcı doğrulaması gerekli:** projenin kavramsal ilk
  tarihi (ağaç öncesi), harici prototiplerle tam soy ağacı.
