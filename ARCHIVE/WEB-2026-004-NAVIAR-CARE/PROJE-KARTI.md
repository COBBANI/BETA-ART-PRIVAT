# WEB-2026-004 – NAVIAR CARE

> **Kaynak kodu bu depoda YOK.** `naviar/` yalnız taşıma kılavuzu + marka
> çalışması içerir. Gerçek kod harici hesapta (`betulandersen-droid/naviar-care-1`),
> bu oturumun GitHub yetkisi dışında — **doğrulanamadı**.

- **Proje numarası:** WEB-2026-004
- **Resmî proje adı:** NAVIAR CARE
- **Önceki isimleri:** "NAVIAR" (commit "rename NAVIAR to NAVIAR CARE" — naviar/README).
- **Kısa açıklama:** Norveçli yaşlı bireyler ve yakınları (pårørende) için dijital koordinasyon platformu. Slogan: "Trygg koordinering for eldre og pårørende."
- **Temel amaç:** Norveçli yaşlılar + pårørende için NAV/belediye sistemlerinde navigasyon.
- **Çözdüğü problem:** NAV başvuruları, kararlar, itirazlar; bakım ve belediye hizmetleri; dijital hizmetlerde güvenli yardım.
- **Hedef kullanıcılar:** Yaşlı bireyler ve yakınları (pårørende).
- **Proje sahibi:** Betul (marka bu depoda; kod harici hesap `betulandersen-droid`).
- **Başlangıç tarihi:** Bilgi bulunamadı – kullanıcı doğrulaması gerekli (v0.app ile üretildi).
- **Son güncelleme:** `naviar/` kılavuzu 2026-08-30 (`672c943`). Kodun kendi son güncellemesi doğrulanamadı.
- **Güncel durum:** Geliştirme (production'da eski sürüm, yeni sürüm preview'da bekliyor — naviar/README).
- **Güncel sürüm:** Doğrulanamadı (kod erişilemedi).
- **Son kararlı sürüm:** **Sürümü belirlenemedi** (madde 10). Production "update site title" eski sürümü; yeni "NAVIAR CARE" sürümü preview `dpl_E4Q3o3WXeyaCEva7reSLgtGRwt7z`, henüz promote edilmemiş.
- **Canlı adres:** naviar-care-1-psi.vercel.app (production — eski sürüm). Son preview: naviar-care-1-1503sfbgf-bet-art.vercel.app
- **Test adresi:** yukarıdaki preview.
- **Kod deposu:** `betulandersen-droid/naviar-care-1` (private; bu oturumdan erişilemiyor). Marka/kılavuz: bu depo `naviar/`, `brand/naviar/`, `docs/naviar/`.
- **Aktif Git dalı:** Doğrulanamadı.
- **Kullanılan teknolojiler:** Next.js (v0.app kökenli). Ayrıntı doğrulanamadı (kod erişilemedi).
- **Veri hassasiyet seviyesi:** Muhtemelen **Yüksek** (yaşlı bakımı + NAV/belediye = kişisel/sağlıkla ilişkili veri olabilir) — ama kod görülemediği için **doğrulanamadı**; ele alınırken en yüksek hassasiyet varsayılmalı.
- **İlgili projeler:** WEB-2026-006 (Eve Slack Agent → naviar-consult); `brand/naviar/` kimlik çalışması; `docs/naviar/` (logo kararı, izin/temizlik yığını).
- **Güncel öncelikler:** (1) Repo erişimi/transferi (`betulandersen-droid` → `andersenbetul-alt`); (2) preview'u production'a promote etme kararı.
- **Bilinen sorunlar:** Kod bu oturumdan görülemiyor → kalite/güvenlik denetimi yapılamaz. Production ile preview arasında sürüm farkı.
- **Sonraki adım:** Kullanıcı repoyu transfer eder/erişim verirse `add_repo` ile kod doğrulanır; sonra kartın teknik alanları doldurulur.
- **Son doğrulama tarihi:** 2026-09-03.

---

## Nasıl düşünüldü (madde 4)

Kaynak: `naviar/README.md`, `docs/naviar/*`. Kod görülemediği için sınırlı.

- **İlk fikir / problem:** Norveç'te yaşlılar ve yakınlarının NAV/belediye/dijital
  hizmetlerde yaşadığı karmaşayı azaltmak.
- **Pilot projeler:** (1) Pårørende i NAV-systemet — başvuru/karar/itiraz;
  (2) Pårørende og kommunen — bakım + belediye; (3) Digital hjelp sammen —
  dijital hizmetlerde güvenli yardım.
- **Neden mevcut çözüm:** v0.app + Next.js ile hızlı üretim (naviar/README).
- **Tasarım/marka:** `brand/naviar/` (build.py, master, studies, descriptors);
  logo kararı `docs/naviar/NAVIAR-LOGO-KARAR.md`; izin/temizlik
  `docs/naviar/LOGO-SKILLS-CLEARANCE-STACK-v1.0.md`.
- **Şu an neredeyiz?** Kod harici hesapta; bu depoda yalnız marka + taşıma planı.
- **Bundan sonra ne?** Repo transferi → `naviar/app/` altına kopyalama → Vercel
  bağlama → `vercel.json` monorepo güncellemesi (naviar/README planı).
- **Bilgi bulunamadı – kullanıcı doğrulaması gerekli:** başlangıç tarihi,
  tam teknik yığın, veritabanı, kimlik doğrulama, ortam değişkenleri.
