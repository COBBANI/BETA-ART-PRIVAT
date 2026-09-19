#!/usr/bin/env python3
"""foto-kayit — yeni fotoğrafın alım (ingestion) hattı.

Kullanıcı talebi (01.09.2026): siteye yüklenen her fotoğraf için
(1) çekim bilgileri (kamera, tarih, GPS'ten yer) otomatik çıkarılsın,
(2) sıradaki katalog numarası verilsin,
(3) en uygun ad otomatik seçilsin.

Ad kuralı: bu betik görüntünün içeriğini göremez; adı, oturumdaki asistan
fotoğrafa bakarak arşivin mevcut üslubunda önerir — 2-3 kelime, İngilizce,
"First Light" / "Low Tide" / "Golden Hour" ailesiyle tutarlı. Öneri
fotoğrafçının onayıyla kesinleşir; eser adları dillere çevrilmez.

Ne yapar:
  1. EXIF okur: kamera, çekim tarihi, GPS koordinatı + rakım.
  2. data.ts'teki en büyük accession'ı bulup SIRADAKİ numarayı önerir.
  3. Web kopyasını üretir: en uzun kenar 1600 px, JPEG kalite 82,
     EXIF/GPS TAMAMEN temizlenmiş (mahremiyet: ham koordinat yayına çıkmaz;
     sitede yalnız belediye düzeyinde yer adı gösterilir).
  4. data.ts'e yapıştırılacak kayıt taslağını basar. Yer adını koordinattan
     çevirme adımı çevrimdışı yapılamadığından koordinat basılır; yer adı
     elle (veya oturumdaki asistanla) doğrulanıp yazılır.

Kullanım:
  python3 scripts/foto-kayit.py <foto.heic|jpg> <plaka-id>
Bağımlılık: pip install pillow pillow-heif
"""
import re
import sys
from pathlib import Path

from PIL import Image, ImageOps
from PIL.ExifTags import TAGS

try:
    from pillow_heif import register_heif_opener
    register_heif_opener()
except ImportError:
    pass  # HEIC değilse gerekmiyor

KOK = Path(__file__).resolve().parent.parent
DATA = KOK / "src" / "lib" / "data.ts"
PLATES = KOK / "public" / "plates"


def dms(v, ref):
    d = float(v[0]) + float(v[1]) / 60 + float(v[2]) / 3600
    return -d if ref in ("S", "W") else d


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    kaynak, plaka_id = Path(sys.argv[1]), sys.argv[2]

    im = Image.open(kaynak)
    exif = im.getexif()
    bilgi = {TAGS.get(k, k): v for k, v in exif.items()}
    gps = exif.get_ifd(0x8825)

    # Kalite kapısı (kullanıcı kararı 01.09.2026): eşiği geçmeyen iş
    # listelenmez. Ölçülebilir kısım burada; küratör bakışı insanda kalır.
    # "En çok satılanın kalitesi" kıyası satış verisi biriktiğinde eklenecek.
    genis = max(im.size)
    if genis < 3000:
        print(f"KALİTE KAPISI: RET — uzun kenar {genis}px < 3000px eşiği.")
        print("Bu dosya listelenmez; fotoğrafçıdan tam çözünürlüklü orijinal istenir.")
        sys.exit(1)
    print(f"kalite      : uzun kenar {genis}px ≥ 3000px ✓ (netlik/küratör onayı elle)")

    # Sıradaki katalog numarası
    yillar = re.findall(r'accession: "(\d{4})\.(\d{4})"', DATA.read_text())
    yil, sira = max(yillar)
    sonraki = f"{yil}.{int(sira) + 1:04d}"

    # Web kopyası — EXIF'siz yeniden kodlama meta veriyi düşürür
    PLATES.mkdir(parents=True, exist_ok=True)
    hedef = PLATES / f"{plaka_id}.jpg"
    w = ImageOps.exif_transpose(im).convert("RGB")
    w.thumbnail((1600, 1600))
    w.save(hedef, "JPEG", quality=82, optimize=True, progressive=True)

    print(f"web kopyası : {hedef} ({hedef.stat().st_size // 1024} KB, EXIF temiz)")
    print(f"katalog no  : {sonraki}  (mevcut bir plakaya gidiyorsa numara değişmez)")
    print(f"kamera      : {bilgi.get('Make', '?')} {bilgi.get('Model', '?')}")
    print(f"tarih       : {bilgi.get('DateTime', bilgi.get('DateTimeOriginal', '?'))}")
    if gps and 2 in gps:
        lat, lon = dms(gps[2], gps[1]), dms(gps[4], gps[3])
        alt = f" · {float(gps[6]):.0f} m" if 6 in gps else ""
        print(f"GPS         : {lat:.5f}, {lon:.5f}{alt}  → yer adını doğrulayıp")
        print('              data.ts detail alanına "Yer, Ülke · Ay Yıl" yaz (8 dilde).')
        print("              HAM KOORDİNAT SİTEYE YAZILMAZ.")
    else:
        print("GPS         : yok — yer bilgisi fotoğrafçıdan alınır.")


if __name__ == "__main__":
    main()
