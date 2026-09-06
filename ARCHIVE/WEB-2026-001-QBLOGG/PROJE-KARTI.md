# WEB-2026-001 – QBLOGG

- **Proje numarası:** WEB-2026-001
- **Resmî proje adı:** QBLOGG
- **Önceki isimleri:** Denetim belgelerinde `QBLOGG-001` kodu. Bu depo eskiden bir saat uygulaması geçmişi taşıyordu; `main` `-s ours --allow-unrelated-histories` merge'üyle QBLOGG'a çevrildi (CLAUDE.md).
- **Kısa açıklama:** On dilde yayın yapan içerik stüdyosunun tanıtım + blog sitesi. Statik, derleme adımı yok.
- **Temel amaç:** Trafik değil, **brief formunu doldurtmak** — içerik hattı (SEO blog, LinkedIn serisi, sosyal, newsletter, çok dilli) satan stüdyoya lead getirmek.
- **Çözdüğü problem:** Kendi içerik ekibi olmayan KOBİ/SaaS'ların düzenli, çok dilli yayın ihtiyacı.
- **Hedef kullanıcılar:** Birincil: içerik ekibi olmayan KOBİ ve SaaS. İkincil: stüdyoya katılmak isteyen yazarlar.
- **Proje sahibi:** Betul (`andersenbetul-alt`).
- **Başlangıç tarihi:** ~2026-08-20 (depo initial `fc6b3a9`); QBLOGG içeriği 2026-08-22'den itibaren (`1e2a46f` civarı).
- **Son güncelleme:** 2026-09-03 (kök HEAD `4e24127` — bu arşiv commit'i dahil).
- **Güncel durum:** Yayında.
- **Güncel sürüm:** git tag yok; `package.json` `0.1.0`. HEAD kök `4e24127`.
- **Son kararlı sürüm:** Vercel canlı (`qblogg-smoky.vercel.app`); sınıf **Doğrulanmış son kararlı sürüm** (canlı + `npm run check` yeşil).
- **Canlı adres:** https://qblogg-smoky.vercel.app (qblogg.com bağlanması kullanıcı tarafında)
- **Test adresi:** `npm run dev` → http://localhost:8000; `npm run onizleme` tek-dosya önizleme
- **Kod deposu:** github.com/andersenbetul-alt/BETA-ART-PRIVAT (kök dizin)
- **Aktif Git dalı:** `main` (canlı) + geliştirme `claude/qblogg-web-sayfasi-upcarm` (CLAUDE.md). Bu arşiv işi `claude/beta-art-privat-g7k5vk` dalında.
- **Kullanılan teknolojiler:** Saf HTML + CSS + JavaScript, **derleme/çatı/bağımlılık yok**. 10 dil (tr,en,zh,hi,es,ar,fr,pt,ru,no), Arapça RTL. Tek CSS (`assets/css/main.css`, `:root` token'ları). Node betikleri yalnız doğrulama/üretim (`scripts/`).
- **Veri hassasiyet seviyesi:** Düşük–orta. Formlar `mailto:` taslağı üretir (sunucu yok); bülten Buttondown'a POST; üye alanı (`uye/`) Supabase şeması. Güvenlik `npm run guvenlik` ile denetleniyor.
- **İlgili projeler:** Alt yüzeyler `panel/` (editör), `uye/` (üyelik), `demo/` (Action Pages). Üretim hattı `engine/` (site değil). Aynı depoda WEB-2026-002 (ayrı ürün).
- **Güncel öncelikler:** ROADMAP.md'ye bakınız. Bilinen açık: qblogg.com bağlama; depo private olduğu için Vercel build klonu riski.
- **Bilinen sorunlar:** Dil değişimi istemci-taraflı (çok dilli SEO için ön-render gerek); formlar sunucusuz; depo private → build klon riski (CLAUDE.md açık iş).
- **Sonraki adım:** `v-` git tag önerisi; ROADMAP önceliklerini işle.
- **Son doğrulama tarihi:** 2026-09-03.

---

## Nasıl düşünüldü (madde 4 — doğrulanmış kadarıyla)

Kaynak: `CLAUDE.md`, `README.md`, `ROADMAP.md`, `docs/*`. Kaynağı olmayan alan işaretli.

- **İlk fikir / problem:** İçerik stüdyosu için "işi trafik değil brief doldurtmak olan" bir tanıtım+blog sitesi.
- **Başlangıç varsayımları:** Site herhangi bir statik sunucuya olduğu gibi yüklenebilmeli → **sıfır bağımlılık, derleme yok** bilinçli tercih.
- **Kullanıcı ihtiyaçları:** Çok dilli erişim (10 dil), RTL, marka tutarlılığı (emoji yerine çizilen ikon, token renkler).
- **Alternatif çözümler:** Çatı tabanlı (Next.js vb.) yaklaşım reddedildi — sıfır bağımlılık ilkesiyle çelişiyor.
- **Tasarım kararları gerekçesi:** CLAUDE.md "Değişmez kurallar" (dil bütünlüğü, RTL, token renk/tipografi, çizilen ikon, sayfa iskeleti 8 dosyada senkron, tescil standardı, rakamlar örnek). Karpathy'den türetilmiş dört çalışma ilkesi.
- **Reddedilen fikirler:** Uydurma marka/istatistik/vaat; ham hex; aqua metin (kontrast 1,8:1); emoji.
- **Teknik sınırlamalar:** Sunucusuz → form `mailto:`, çok dilli SEO tam verim için ön-render gerekir (açık iş).
- **Zaman içinde gelişim:** Curiosity Engine (`engine/`) üretim hattı, üye alanı (`uye/`), editör paneli (`panel/`), marka tescil betikleri eklendi. Ayrıntı `docs/proje-gunlugu.md`.
- **Şu an neredeyiz?** Yayında, doğrulama katmanı yeşil (`check`/`guvenlik`/`gorunurluk`).
- **Bundan sonra ne?** ROADMAP.md.
- **Bilgi bulunamadı – kullanıcı doğrulaması gerekli:** qblogg.com'un asıl bağlı olduğu Vercel takımı (BET-ART vs beta-art-master ölçümleri zamanla değişti — CLAUDE.md'de kayıtlı).
