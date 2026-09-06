# WEB-2026-004 — KARAR GÜNLÜĞÜ

Promptun madde 7 formatı. Kod bu oturumdan görülemediği için karar geçmişi
sınırlı; yalnız `naviar/README.md` ve `docs/naviar/*`'dan doğrulanan.

---

## DEC-2026-08-30-001 – NAVIAR → NAVIAR CARE yeniden adlandırma

- **Tarih:** 2026-08-30 (naviar/README'de kayıtlı commit "rename NAVIAR to NAVIAR CARE and update tagline")
- **Proje:** WEB-2026-004
- **Proje aşaması:** Define
- **Kararı alan:** Betul
- **Konu:** Marka adı ve slogan.
- **Seçilen çözüm:** Ad "NAVIAR CARE", slogan "Trygg koordinering for eldre og pårørende."
- **Beklenen sonuç:** Bakım odağını isimde netleştirmek.
- **Kararın durumu:** Uygulandı ama **preview'da**; production'a promote edilmedi (naviar/README).
- **Geri alma yöntemi:** Vercel'de eski production dağıtımı zaten canlı.
- **Yeniden değerlendirme:** Promote kararı verildiğinde.

## DEC-BEKLIYOR-001 – Preview'u production'a promote

- **Proje aşaması:** Launch
- **Konu:** Yeni "NAVIAR CARE" sürümü canlıya alınsın mı?
- **Mevcut durum:** Production eski "update site title"; yeni sürüm preview `dpl_E4Q3o3WXeyaCEva7reSLgtGRwt7z`.
- **Karar:** Kullanıcıda (Vercel Dashboard → naviar-care-1 → Deployments → Promote to Production).
- **Kararın durumu:** Bekliyor.

## DEC-BEKLIYOR-002 – Repo transferi

- **Konu:** `betulandersen-droid/naviar-care-1` → `andersenbetul-alt` transferi.
- **Neden:** Bu oturumun GitHub yetkisi yalnız `andersenbetul-alt`; transfer olmadan kod görülemez/taşınamaz.
- **Yöntem (naviar/README):** GitHub → naviar-care-1 → Settings → Transfer ownership → `andersenbetul-alt`.
- **Kararın durumu:** Bekliyor.

---

> **Bilgi bulunamadı – kullanıcı doğrulaması gerekli:** v0.app ile üretim
> sırasındaki tasarım/mimari kararlar, pilot kapsam kararları, veri modeli
> seçimleri. Bunlar kod/geçmiş görülene kadar doldurulmaz.
