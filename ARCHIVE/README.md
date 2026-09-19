# ARCHIVE — Web Projeleri Arşiv ve Dokümantasyon Sistemi

Bu dizin, `AUTOPROMPT – WEB PROJELERİ ARŞİVLEME` sistemine göre bu deponun
(ve bağlı harici projelerin) tek merkezli kaydıdır. Amaç: **"en son dosya"**
ile **"son doğrulanmış çalışan sürüm"**i ayırmak, her projenin kimliğini,
kararlarını, değişikliğini ve sürüm geçmişini izlenebilir tutmak.

**Kapsam kararı (Betul, 2026-09-03):** *hafif + tek şema.* Yani:
- Tek resmî numaralandırma: `WEB-YYYY-NNN`.
- Her proje için promptun **dört zorunlu kaydı**: `PROJE-KARTI.md`,
  `KARAR-GUNLUGU.md`, `DEGISIKLIK-GUNLUGU.md`, `SURUM-GECMISI.md`.
- Tek `MASTER-PROJECT-REGISTRY.md` ana katalog.
- Promptun tam 11-klasörlük ağacı **kurulmadı** (bilinçli): bu depo
  "az dosya, sıfır bağımlılık" felsefesinde; mevcut `docs/` zaten çoğu
  içeriği taşıyor. ARCHIVE onun üstüne kurar, yeniden yazmaz.
- **Kod kopyalanmaz.** Kaynak zaten git'te; her kart doğru depo + dala
  bağlantı verir (promptun kendi kuralı).

## Numaralandırma (tek resmî şema)

`WEB-YYYY-NNN` — YYYY oluşturulma yılı, NNN sıra. Bir kez atanan numara
değişmez. Yalnızca **web sitesi/uygulaması** olan işler numara alır;
üretim hattı (`engine/`), iç işletim katmanı (`beta-privat/`) ve saf
kimlik/marka çalışması (`brand/*`) web projesi sayılmaz, numara almaz.

| WEB No | Proje | Konum |
|---|---|---|
| WEB-2026-001 | QBLOGG | kök (`/`) |
| WEB-2026-002 | Beta Art Privat | `apps/beta-art-archive/` |
| WEB-2026-003 | Beta Art (Lovable/TanStack kopyası) | `beta-art/` |
| WEB-2026-004 | NAVIAR CARE | `naviar/` (kaynak harici hesapta) |
| WEB-2026-005 | Eve Chat Template | `agents/eve-chat-template/` |
| WEB-2026-006 | Eve Slack Agent | `agents/eve-slack-agent/` |

## Eski numaralandırma şemalarının eşlemesi

Bu depoda ARCHIVE öncesi **iki** ayrı numaralandırma dolaşıyordu; tek şemaya
geçerken kaybolmasınlar diye eşleme:

| Eski kod | Nerede | WEB-YYYY-NNN karşılığı |
|---|---|---|
| `QBLOGG-001` | `docs/denetim/*` denetim belgeleri | WEB-2026-001 |
| `docs/proje-arsivi.md` madde 1 | proje arşivi | WEB-2026-001 |
| `docs/proje-arsivi.md` madde 4/14 ("BETA ART Privat") | proje arşivi | WEB-2026-002 (canlı karşılığı) |
| `BA · 2026 · P·001` (yayınlanmış "Project Catalogue" artifact) | harici | WEB-2026-002 ailesi (birebir değil) |

**Not:** `docs/proje-arsivi.md`'deki madde 4–15, çoğu bu oturumun erişemediği
harici Beta Art projelerini (`project-hxi` hesabı: Business, Journal,
Norway/Industry Archive, QR…) kataloglar. Bunlar bu depoda **kod olarak yok**;
ARCHIVE onlara WEB numarası vermez, yalnızca MASTER-REGISTRY'nin "harici /
erişilemeyen" bölümünde referans tutar.

## Durum sözlüğü (promptun standardı)

Fikir · Araştırma · Planlama · Tasarım · Geliştirme · Test · Yayında ·
Bakımda · Beklemede · Arşivlendi · İptal edildi.

## Uydurma yasağı

Doğrulanmamış hiçbir alan gerçekmiş gibi yazılmaz. Bilinmeyen alan
`Bilgi bulunamadı – kullanıcı doğrulaması gerekli` yazar. Şifre / API anahtarı
/ kişisel veri bu dizine asla kopyalanmaz; yalnızca değişken adları kaydedilir.

## Son doğrulama

Bu iskelet ve WEB-2026-002 kayıtları 2026-09-03'te dosyadan ve git'ten
doğrulandı. Kalan projelerin (001, 003–006) kendi kartları MASTER-REGISTRY'de
sıradadır; henüz oluşturulmadı.
