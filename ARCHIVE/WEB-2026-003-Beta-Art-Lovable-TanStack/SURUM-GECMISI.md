# WEB-2026-003 — SÜRÜM GEÇMİŞİ

Promptun madde 9 + 10.

## Sürüm belirleme (kanıta dayalı)

| Kanıt | Değer |
|---|---|
| Git commit tarihi (bu ağaç) | `8bf738a`, 2026-08-30 15:09 UTC (tek commit) |
| Git tag | YOK |
| Aktif branch | — (monorepo'ya katıldı) |
| Deployment | Bu depodan doğrulanamadı |
| Build durumu | Bu oturumda çalıştırılmadı (kanonik değil) |
| Lovable projesi | `9b7b3abe-43fc-4867-9f79-b1d22fb1a80c` |

**Sonuç sınıfı (madde 10):** **Eski sürüm / ayrı kod tabanı.** WEB-2026-002
kanonik olduğu için bu kopya "son kararlı sürüm" adayı değil.

## ESKI-SURUMLER sınıflaması (madde 14)

- **Öğe:** `beta-art/` (bu depodaki tüm dizin)
- **Kaynak konum:** `beta-art/` (yerinde duruyor — taşınmadı)
- **Arşivleme tarihi:** 2026-09-03 (yalnız **işaretleme**; fiziksel taşıma yok)
- **Neden:** WEB-2026-002 kanonik seçildi (DEC-2026-09-03-001); iki kopya karışıklığını önlemek.
- **Silme durumu:** **Silinmedi.** Kod git'te ve diskte olduğu gibi.
- **Geri yükleme:** Zaten yerinde; hiçbir işlem gerekmez. Fiziksel olarak
  `beta-art/`'ı ayrı bir arşiv dizinine taşıma **yalnız kullanıcı onayıyla**
  yapılır (git mv), çünkü Vercel/GitHub bağlantılarını etkileyebilir.

## Bilinen sürüm riski

- Bu kod tabanının kendi SemVer'i / dağıtım kaydı bu oturumdan görülemiyor.
- beta-art.com'un asıl canlı kaynağının bu kopya mı yoksa harici `project-hxi`
  projelerinden biri mi olduğu **doğrulanamadı** (`docs/proje-arsivi.md` madde
  14: kök alan adı içeriği kullanıcı tarafından yapıştırıldı, kaynak repo hâlâ
  bilinmiyor).

## Öneri

Kullanıcı "Arşivlendi" durumuna almayı onaylarsa: (1) MASTER-REGISTRY'de durumu
`Arşivlendi` yap, (2) istenirse `git mv beta-art/ archive/beta-art-lovable/`
(ayrı onay), (3) 002'ye taşınacak değerli desen varsa (ör. Supabase örneği)
SHARED-WEB-LIBRARY adayı olarak not et.
