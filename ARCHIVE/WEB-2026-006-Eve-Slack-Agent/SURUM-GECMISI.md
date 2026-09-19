# WEB-2026-006 — SÜRÜM GEÇMİŞİ

Promptun madde 9 + 10.

## Sürüm belirleme (kanıta dayalı)

| Kanıt | Değer |
|---|---|
| Git commit tarihi | `8db81ea`, 2026-08-30 (monorepo katılımı) |
| Git tag | YOK |
| `package.json` version | `0.0.0` |
| Deployment | Bu depoda dağıtılmıyor; bağlı Vercel projeleri `naviar-consult`, `hxi-music` (kaynak `betulandersen-droid/eve-slack-agent`) |
| Değişiklik | Yok (stok şablon) |

**Sonuç sınıfı (madde 10):** **Değiştirilmemiş şablon.** Ancak bağlı iki
Vercel projesinin canlı olup olmadığı **doğrulanamadı** — eğer canlıysa "en
son dosya" (bu stok şablon) ile "canlı sürüm" (naviar-consult/hxi-music
deploy'ları) arasında ayrım gerekebilir.

## Eski / atıl sürümler

Yok (stok şablon).

## Geri yükleme

Upstream `vercel/eve-examples`'tan yeniden alınabilir.

## Bilinen sürüm riski

`naviar-consult` ve `hxi-music` deploy'larının bu stok şablonla mı yoksa
özelleştirilmiş bir sürümle mi çalıştığı belirsiz. Kullanıcı Vercel'de bu iki
projenin bağlı commit'ini paylaşırsa, gerçek çalışan sürüm doğrulanıp buraya
işlenir.
