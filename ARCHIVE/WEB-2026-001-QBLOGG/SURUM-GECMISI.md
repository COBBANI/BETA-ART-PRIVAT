# WEB-2026-001 — SÜRÜM GEÇMİŞİ

Promptun madde 9 + 10.

## Sürüm belirleme (kanıta dayalı)

| Kanıt | Değer |
|---|---|
| Git commit tarihi | kök HEAD `4e24127`, 2026-09-03 |
| Git tag | **YOK** |
| `package.json` version | `0.1.0` |
| Aktif branch | `main` (canlı); geliştirme `claude/qblogg-web-sayfasi-upcarm` |
| Deployment | Vercel proje `qblogg` (BET-ART takımı, ölçüm 30.08); build `bash scripts/vercel-build.sh` → `dist/` |
| Build durumu | `npm run check` yeşil (8/8) |
| Canlı içerik | qblogg-smoky.vercel.app güncel |

**Sonuç sınıfı:** Canlı sürüm = **Doğrulanmış son kararlı sürüm** (canlı +
doğrulama yeşil). Ancak git tag olmadığı için resmî sürüm numarası yok;
`package.json` `0.1.0` bir SemVer etiketi değil, paket alanı.

> Uyarı (madde 10): "son kararlı sürüm" klasör/commit'e bağlı; git tag
> önerilir. QBLOGG canlı ve olgun olduğu için `v1.0.0` tag'i **kullanıcı
> onayıyla** basılabilir.

## Dağıtım tarifi (tek dosyalık — CLAUDE.md)

QBLOGG'un dağıtımı: `main`'e push + aynı dağıtımı yeniden tetikle. Vercel
`buildCommand` public depoyu sığ klonlayıp 8 sayfa + `404.html` +
`sitemap.xml` + `robots.txt` + `assets/`'i `dist/`e kopyalar (npm install/çatı
yok, build ~2 sn). **Açık risk:** depo private olduğu için kimliksiz klon
sonraki redeploy'da kırılabilir (CLAUDE.md açık iş — deploy key/PAT ya da
depoyu public'e almak kullanıcı kararı).

## Dal standardı

- `main` — canlı/kararlı (dağıtım buradan).
- `claude/qblogg-web-sayfasi-upcarm` — QBLOGG geliştirme dalı.
- `claude/beta-art-privat-g7k5vk` — bu arşiv/Beta Art işinin dalı.

## Eski / atıl sürümler

- Depoda eski bir saat uygulaması geçmişi, `-s ours --allow-unrelated-histories`
  merge'üyle korunarak ağaç QBLOGG'a çevrildi (CLAUDE.md). Yani eski geçmiş
  git'te duruyor ama ağaç QBLOGG. Silinmedi.

## Geri yükleme

`git checkout <commit>` ile herhangi bir noktaya dönülür; tüm geçmiş git'te.
Kritik sürüm için önerilen: `git tag v1.0.0 <kararlı-commit>` (kullanıcı onayı
sonrası).

## Bilinen sürüm riski

Git tag yok + `package.json 0.1.0` yanıltıcı olabilir. Öneri: canlı kararlı
noktaya `v1.0.0` tag'i, sonra SemVer'e geçiş (feat→minor, fix→patch).
