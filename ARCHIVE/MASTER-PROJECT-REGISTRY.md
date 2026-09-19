# MASTER-PROJECT-REGISTRY — Ana Proje Kataloğu

Son doğrulama: 2026-09-03. Kaynak: bu deponun git geçmişi + dosya sistemi +
`docs/proje-arsivi.md` / `docs/proje-envanteri.md` / `MONOREPO.md`. Uydurma yok;
görülemeyen alan "erişilemedi" / "doğrulanamadı" yazar.

Proje sahibi (hepsi): **Betul** (GitHub `andersenbetul-alt`).

## Ana tablo

| Proje No | Proje Adı | Amaç | Durum | Güncel Sürüm | Son Güncelleme | Canlı Adres | Kod Deposu | Öncelik | Sonraki Adım |
|---|---|---|---|---|---|---|---|---|---|
| WEB-2026-001 | QBLOGG | İçerik stüdyosu tanıtım + çok dilli blog; brief formu doldurtmak | Yayında | etiket yok (HEAD `62a0743`) | 2026-09-03 | qblogg-smoky.vercel.app | `andersenbetul-alt/BETA-ART-PRIVAT` (kök) | Orta | Kart + git tag (v-öneri) |
| WEB-2026-002 | Beta Art Privat | Doğrulanmış insan fotoğrafçılığı arşivi + doğrudan lisanslama | Yayında | etiket yok (HEAD `62a0743`) | 2026-09-03 | beta-art-privat-phi.vercel.app | aynı depo, `apps/beta-art-archive/` | **Yüksek** | PR #7 → merge; v1.0.0 tag öner |
| WEB-2026-003 | Beta Art (Lovable/TanStack) | 002 ile aynı marka, ayrı/atıl kod tabanı | Arşivlendi (belge düzeyi) | doğrulanamadı | 2026-08-30 | — | aynı depo, `beta-art/` | Düşük | Fiziksel `git mv` kullanıcı açık onayında (Vercel rootDirectory bağı) |
| WEB-2026-004 | NAVIAR CARE | Norveç yaşlı bakım / pårørende koordinasyon platformu | Geliştirme | doğrulanamadı | 2026-08-30 | naviar-care-1-psi.vercel.app | `betulandersen-droid/naviar-care-1` (harici, erişilemedi) | Orta | Repo erişimi + transfer |
| WEB-2026-005 | Eve Chat Template | Sohbet arayüzü şablonu (Vercel "eve") | Beklemede | değiştirilmemiş şablon | 2026-08-30 | — | aynı depo, `agents/eve-chat-template/` | Düşük | Kullanılacak mı? karar |
| WEB-2026-006 | Eve Slack Agent | Slack botu (naviar-consult, hxi-music deploy) | Beklemede | değiştirilmemiş şablon | 2026-08-30 | — | aynı depo, `agents/eve-slack-agent/` | Düşük | Kullanılacak mı? karar |

## Web sitesi OLMAYAN kayıtlar (WEB numarası verilmez — bilgi için)

| Ne | Konum | Tür | Durum |
|---|---|---|---|
| Curiosity Engine | `engine/` | İçerik üretim hattı (Node+SQLite) | Yerel çalışır |
| Beta Art Privat (iç katman) | `beta-privat/` | Nakit/MVA/forskuddsskatt iş akışı | İskelet |
| Naviar / HXI / Cobban marka | `brand/naviar`, `brand/hxi`, `brand/cobban` | Logo/kimlik tasarımı | Referans |
| QBLOGG alt yüzeyleri | `panel/`, `uye/`, `demo/` | 001'in parçaları (editör paneli, üyelik, demolar) | 001 kapsamında |

## Harici / erişilemeyen Beta Art projeleri (referans, kod burada yok)

`docs/proje-arsivi.md` madde 5–15 ve yayınlanmış "Project Catalogue" artifact'i,
bu oturumun erişemediği `project-hxi` Vercel hesabında en az 8 ayrı Beta Art
projesi kataloglar: Business, Field Notes (Journal, `betaart.no`), Norway
Archive, Industry Archive, Beta Photo, QR (v3), Archive Platform (dahili),
Platform (iş ortağı). Hepsi 403/erişilemez; WEB numarası verilmedi. Kullanıcı
panelde bağlı GitHub deposunu paylaşırsa `add_repo` ile doğrulanabilir.

## Listeler

**Aktif projeler (üzerinde çalışılan):** WEB-2026-001, WEB-2026-002.

**Yayındaki projeler:** WEB-2026-001 (qblogg-smoky.vercel.app),
WEB-2026-002 (beta-art-privat-phi.vercel.app). WEB-2026-004 production'da
eski sürüm, yeni sürüm preview'da bekliyor (naviar/README).

**Bekleyen projeler:** WEB-2026-003, WEB-2026-005, WEB-2026-006.

**Arşivlenen projeler:** WEB-2026-003 (belge düzeyinde "Arşivlendi";
fiziksel `git mv beta-art/ archive/…` kullanıcı açık onayı bekliyor —
başıboş Vercel projesi `beta-art` bu klasörü rootDirectory olarak okuduğu için).

**Eksik dokümantasyonu olan projeler:** WEB-2026-003/004/005/006 (ARCHIVE
kartları henüz oluşturulmadı); WEB-2026-004 kaynak kodu bu oturumdan görülemiyor.

**Teknik risk taşıyan projeler:**
- WEB-2026-002 ↔ WEB-2026-003: iki Beta Art React kod tabanı aynı ağaçta
  (yanlış olanı dağıtma riski — **Kritik**).
- WEB-2026-001: Vercel build depoyu kimliksiz klonluyor; depo private
  olduğu için sonraki redeploy döngüsü kırılabilir (**Yüksek**, bilinen açık iş).
- Hiçbir projede git tag yok → "son kararlı sürüm" kanıtı zayıf (**Orta**).

**Birbiriyle bağlantılı projeler:** WEB-2026-002 ve WEB-2026-003 (aynı marka);
WEB-2026-004 ve WEB-2026-006 (Naviar ailesi — naviar-consult Eve botuna bağlı);
WEB-2026-001 alt yüzeyleri (panel/uye/demo).

**Ortak kod kullanan projeler:** şu an resmî `SHARED-WEB-LIBRARY` yok.
WEB-2026-002 ve -003 shadcn/ui + Radix + Tailwind paylaşıyor (aday ortak
katman); WEB-2026-005/006 "eve" şablon ailesi. Ortak kütüphane, ikinci proje
belgelendiğinde kurulacak (bugün kapsam dışı).

**Acil işlem gereken projeler:** WEB-2026-002 — PR #7'yi merge'e taşımak ve
iki-kopya çakışmasını (003) resmen kapatmak.

## Kullanıcı tarafında bekleyen kararlar (özet)

1. WEB-2026-003 (`beta-art/`) "eski kopya" olarak işaretlensin mi (silinmez,
   yalnız SURUM-GECMISI'nde ESKI-SURUMLER'e taşınır)?
2. Kritik sürümler için git tag (`v1.0.0`) oluşturulsun mu?
3. WEB-2026-004 NAVIAR CARE repo erişimi/transferi.
4. WEB-2026-005/006 şablonları tutulacak mı, arşivlenecek mi?
