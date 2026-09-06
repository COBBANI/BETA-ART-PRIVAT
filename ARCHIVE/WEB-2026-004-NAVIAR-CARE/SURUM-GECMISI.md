# WEB-2026-004 — SÜRÜM GEÇMİŞİ

Promptun madde 9 + 10.

## Sürüm belirleme (kanıta dayalı)

| Kanıt | Değer |
|---|---|
| Git commit tarihi | Kod bu oturumdan görülemedi |
| Git tag | Doğrulanamadı |
| Aktif branch | Doğrulanamadı |
| Deployment | Production: `naviar-care-1-psi.vercel.app` (eski "update site title"). Preview: `dpl_E4Q3o3WXeyaCEva7reSLgtGRwt7z` ("NAVIAR CARE") — promote edilmemiş |
| Build durumu | Doğrulanamadı |
| README | `naviar/README.md` (taşıma kılavuzu) |

**Sonuç sınıfı (madde 10):** **Sürümü belirlenemedi.** Kod erişilemediği için
kesin son kararlı sürüm doğrulanamıyor. **Bilinen:** production'da eski sürüm
canlı, yeni sürüm preview'da bekliyor — yani "en son dosya" (preview) ile
"canlı sürüm" (production) **birbirinden farklı**; promptun tam ayırt etmek
istediği durum.

## Dağıtım (naviar/README'den)

- Vercel projesi `naviar-care-1` (BET-ART / bet-art takımı).
- Promote yolu: Vercel Dashboard → naviar-care-1 → Deployments → ilgili
  preview → Promote to Production.

## Taşıma planı (naviar/README — henüz yapılmadı)

1. `betulandersen-droid/naviar-care-1` → `andersenbetul-alt/BETA-ART` erişim.
2. Kaynak kodu `naviar/app/` altına kopyala.
3. Vercel'de projeyi bu repoya bağla.
4. `vercel.json` monorepo yapısıyla güncelle.

## Bilinen sürüm riski

Kod ve gerçek sürüm geçmişi harici hesapta. Transfer/erişim olmadan bu proje
için "doğrulanmış son kararlı sürüm" tespit edilemez. Kullanıcı erişim
verdiğinde bu belge güncellenir.

## Geri yükleme

Harici Vercel projesinde önceki dağıtımlar duruyor (production hâlâ eski
sürüm). Bu depodan geri yüklenecek kod yok.
