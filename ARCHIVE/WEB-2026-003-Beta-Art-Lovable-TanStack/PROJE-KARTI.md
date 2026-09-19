# WEB-2026-003 – Beta Art (Lovable/TanStack kopyası)

> **Bu, WEB-2026-002 ile AYNI markanın ayrı/atıl bir kod tabanıdır.**
> Kanonik Beta Art kodu WEB-2026-002'dir (DEC-2026-09-03-001). Bu kopya
> **eski sürüm** olarak işaretlendi; **silinmedi**, referans/arşiv için duruyor.

- **Proje numarası:** WEB-2026-003
- **Resmî proje adı:** Beta Art (Lovable/TanStack kopyası)
- **Önceki isimleri:** README başlığı "Beta Art Archive"; `package.json` adı `tanstack_start_ts`.
- **Kısa açıklama:** beta-art.com konseptinin Lovable ile üretilmiş TanStack Start sürümü; Supabase entegrasyonlu, kimlik doğrulamalı.
- **Temel amaç:** WEB-2026-002 ile aynı: doğrulanmış insan fotoğrafçılığı arşivi + lisanslama. Farklı teknik uygulama.
- **Çözdüğü problem:** (002 ile aynı marka amacı.)
- **Hedef kullanıcılar:** (002 ile aynı.)
- **Proje sahibi:** Betul (`andersenbetul-alt`).
- **Başlangıç tarihi:** Bu ağaçta 2026-08-30 (monorepo merge `8bf738a`). Lovable üst geçmişi bu depoda değil (proje id `9b7b3abe-43fc-4867-9f79-b1d22fb1a80c`).
- **Son güncelleme:** 2026-08-30 (`8bf738a`) — o günden beri commit almadı (atıl).
- **Güncel durum:** Beklemede (atıl kopya).
- **Güncel sürüm:** git tag yok; sürüm **doğrulanamadı**.
- **Son kararlı sürüm:** Bu depoda bağımsız dağıtım kaydı yok → **Eski sürüm / ayrı kod tabanı** (madde 10 sınıfı).
- **Canlı adres:** Bu depodan doğrulanamadı. (beta-art.com'un asıl canlı kaynağı harici `project-hxi` hesabı; `docs/proje-arsivi.md`.)
- **Test adresi:** yerel `bun install && bun dev` (README/MONOREPO).
- **Kod deposu:** aynı depo, `beta-art/` dizini. Lovable editörü: lovable.dev/projects/9b7b3abe-43fc-4867-9f79-b1d22fb1a80c
- **Aktif Git dalı:** — (bu ağaçta ayrı dal yok; monorepo'ya katıldı)
- **Kullanılan teknolojiler:** React 19 + TypeScript + Vite 8 + **TanStack Start/Router/Query** + tam Radix seti + Tailwind v4 + **Supabase entegrasyonu** (`src/integrations/supabase/`) + Bun. Lovable kökenli.
- **Veri hassasiyet seviyesi:** Orta — Supabase entegrasyonu + auth rotaları var (`_authenticated/`, `auth.tsx`). Ortam değişkenleri Supabase'e bağlı olabilir; **`.env` içeriği bu belgeye kopyalanmadı**, yalnız varlığı not edildi.
- **İlgili projeler:** WEB-2026-002 (kanonik Beta Art), harici Beta Art ailesi.
- **Güncel öncelikler:** Yok (atıl). Karar: resmen "arşiv" durumuna alınsın mı?
- **Bilinen sorunlar:** WEB-2026-002 ile aynı ağaçta bulunması karışıklık riski (Kritik). Rotalarda örnek/şablon kalıntısı (`chuck-norris.tsx`).
- **Sonraki adım:** Kullanıcı kararı — "Arşivlendi" durumuna al ve dokunma, ya da ileride 002'ye taşınacak parçaları belirle.
- **Son doğrulama tarihi:** 2026-09-03.

---

## Nasıl düşünüldü (madde 4)

- **İlk fikir:** README'deki Lovable brief'i (müze/arşiv estetiği, "Verified Human Photography" tek H1, 12 plaka, 3 doğrulama yöntemi, Personal/Commercial/Extended/Custom lisans) — WEB-2026-002 ile birebir aynı marka brief'i.
- **Neden ayrı kopya var?** Bilgi bulunamadı – kullanıcı doğrulaması gerekli. Muhtemel: Lovable ile üretilen erken/paralel sürüm; sonra minimal Vite sürümü (002) aktif geliştirmeye alındı.
- **Alternatif/soy ağacı:** `docs/proje-arsivi.md` madde 4/5/13 birden çok Beta Art kod tabanı sayıyor (statik prototip, Final Work v2/Supabase, GoDaddy Airo AAB). Bu kopya "Supabase'li" koldur.
- **Şu an neredeyiz?** Atıl; 002 kanonik.
- **Bundan sonra ne?** Kullanıcı kararı (arşiv).
- **Teknik sınırlama:** Supabase/auth → 002'nin backend'siz felsefesinden farklı; birebir birleştirme kolay değil.
