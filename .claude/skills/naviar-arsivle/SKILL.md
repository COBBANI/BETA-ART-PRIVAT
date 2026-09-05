---
name: naviar-arsivle
description: >
  NAVIAR kaynak dosyalarını naviar-arsiv/ numaralı ağacına doğrulayarak
  arşivleme akışı. Kullanıcı ChatGPT tarafından belge, zip, kaynak kodu
  veya teslim paketi yüklediğinde; "arşivle", "organize et", "kaynakları
  paylaşıyorum" dediğinde; ya da naviar-arsiv/ veya 00_ANA-KAYIT.md'ye
  dokunan her işte bu beceriyi kullan — kullanıcı "arşiv" kelimesini
  kullanmasa bile, gelen her NAVIAR dosyası bu akıştan geçer.
---

# naviar-arsivle — gelen kaynağı doğrulayarak arşivle

Arşivin amacı kanıt zinciridir: her dosyanın nereden geldiği, bayt bayt
neye eşit olduğu ve nerede durduğu her an gösterilebilmeli. Bu yüzden
akıştaki her adım "önce doğrula, sonra yerleştir, sonra kaydet" sırasıyla
gider; sıra bozulursa sicil (00_ANA-KAYIT.md) gerçeği anlatmaz olur.

Yollar depo köküne göredir. Ana kayıt: `naviar-arsiv/00_ANA-KAYIT.md`
(klasör numaraları 00–06, BA-### belge sicili, zip kimlik tablosu,
eksik parçalar tablosu).

## Akış

```bash
# 1) Gelen dosyaları sınıflandır (DUPE / YENI / AD-CAKISMASI)
python3 .claude/skills/naviar-arsivle/scripts/dogrula.py gelen <gelen-klasör-veya-dosyalar>

# 2) Paket kendi doğrulama listesiyle geldiyse (SHA256SUMS vb.) sına
python3 .claude/skills/naviar-arsivle/scripts/dogrula.py paket <SHA256SUMS> [taban]
```

Sonra sınıfına göre işle:

- **DUPE** — arşive alma; yanıtında "zaten arşivde, şurada" diye not düş.
  Kopyayı yeniden yazmak sicili şişirir, bilgi katmaz.
- **YENI** — paketin **özgün yolunu koruyarak** ilgili numaralı klasöre
  koy (`02_care-1-src03/belge-paketi-20260905/...` gibi). Yerleşim
  belirsizse ANA-KAYIT'taki klasör tablosuna ve o klasörün
  `ARSIV-NOTU.md`'sine bak; hâlâ belirsizse kullanıcıya sor, tahmin etme.
- **AD-CAKISMASI** — asla üzerine yazma, asla birleştirme. İçeriği oku:
  gerçekten farklı bir sürümse ayırt edici ekle arşivle (ör. `_v2.0`)
  ve ANA-KAYIT'a hangi kopyanın ne olduğunu yaz. (Yaşandı:
  Profesyonel-Surum_Teslim.md iki farklı sürümdü — BA-039.)

Zip gelirse: **zip'i depoya koyma.** Önce zip'in kendi SHA-256'sını al,
aç, içeriği yukarıdaki akıştan geçir, zip kimliğini ANA-KAYIT'taki
"Açılan zip paketlerinin kimlikleri" tablosuna ekle.

## Her partiden sonra (üçü birden)

1. **ANA-KAYIT güncelle:** yeni belge → BA-### satırı (numara sırayla
   artar, geri kullanılmaz); paket doğrulama sonucu (ör. "35/45") ilgili
   satıra; beklenen ama gelmeyen dosyalar → eksik parçalar tablosuna.
   Bayat kalan satır varsa düzelt — yanlış sicil, sicil olmamasından
   kötüdür (yaşandı: "zip yüklenmedi" notu zip geldikten sonra kalmıştı).
2. **Commit + push:** yalnız dokunulan dosyalar (`git add` ile tek tek,
   asla `-A`); mesajda hangi paket, kaç dosya, doğrulama sonucu.
3. **Kullanıcıya kısa özet:** kaç yeni / kaç kopya / kaç eksik; eksikler
   ad ad — kullanıcı onları sonraki partide yüklüyor.

## Kırmızı çizgiler

- Hiçbir belge birleştirilmez, üzerine yazılmaz, "düzeltilmez" —
  arşiv kopyası özgün haliyle durur; yorum ANA-KAYIT'a yazılır.
- Arşivdeki hiçbir kod bu depoda çalıştırılmaz (ANA-KAYIT kuralı).
- Doğrulama sonucu uydurulmaz: sayı ancak betik çıktısından yazılır.
  BOZUK çıkan dosya arşive alınmaz — yükleme kopyası yeniden istenir.
- Kaynaktaki hukuki/durum ifadeleri kelimesi kelimesine korunur
  ("not legally cleared" gibi); yumuşatılmaz, güncellenmiş gibi yazılmaz.

## Gotchas (bu oturumda gerçekten yaşandı)

- **Envanter yolları alt klasöre göreli olabilir.** KAYNAK-ENVANTERI
  62 dosyayı "EKSİK" gösterdi; yollar zip kökünde değil `naviar-care/`
  alt klasörüne göreliydi. `dogrula.py paket` bunu kendisi dener ve
  "taban ... olarak düzeltildi" der; yine de yarıdan çoğu EKSİK çıkarsa
  önce tabanı sorgula, "paket eksik geldi" deme.
- **Beklenen dosya adı ≠ beklenen dosya.** `naviar-care-v03.svg` adlı
  dosya beklenen çentikli-N v0.3 master'ı değil, eski kucaklaşma-kalp
  logosuydu. Ad eşleşti diye eksik parçalar tablosundan düşme; içeriği
  aç, bak, sonra karar ver.
- **Eksikler bazen elimizdekilerden tamamlanır.** DOC-012'nin 3 "eksik"
  dosyası teslim klasöründeki kopyalarla aynıydı: beklenen SHA'yı
  eldeki dosyayla karşılaştır, eşitse paket yoluna kopyala ve sicile
  "şuradan tamamlandı" yaz — bu birleştirme değil, doğrulanmış taşımadır.
- **CSV envanterler SHA256SUMS biçiminde değildir.** Betik `hash yol`
  satırı bekler; CSV geldiyse önce o biçime çevir (ya da sütunları
  okuyup elle karşılaştır), betiğe olduğu gibi verme.
