#!/usr/bin/env python3
"""naviar-arsivle doğrulama aracı (stdlib, bağımlılık yok).

Kullanım:
  python3 dogrula.py gelen <dosya-veya-klasör> [...]
      Gelen her dosyayı naviar-arsiv/ MD5 haritasıyla karşılaştırır:
        DUPE          — bayt bayt arşivde var (yolu yazar; atla, notunu düş)
        YENI          — arşivde yok (özgün paket yoluna yerleştir)
        AD-CAKISMASI  — aynı ad arşivde var ama içerik FARKLI
                        (birleştirme/üzerine yazma YASAK; _v2.0 gibi ekle
                         ve ANA-KAYIT'a ayrımı yaz)

  python3 dogrula.py paket <SHA256SUMS> [taban-klasör]
      Paketi KENDİ listesiyle sınar. Taban verilmezse listenin klasörü
      alınır; yarıdan çoğu EKSİK çıkarsa alt klasörleri taban olarak
      dener ve en iyisini raporlar (yol-tabanı tuzağına karşı).

Depo kökünden çalıştırın. Çıkış kodu: 0 temiz, 1 dikkat gerekiyor.
"""
import hashlib
import sys
from pathlib import Path

ARSIV = Path("naviar-arsiv")


def md5(p: Path) -> str:
    h = hashlib.md5()
    with open(p, "rb") as f:
        for blok in iter(lambda: f.read(1 << 20), b""):
            h.update(blok)
    return h.hexdigest()


def sha256(p: Path) -> str:
    h = hashlib.sha256()
    with open(p, "rb") as f:
        for blok in iter(lambda: f.read(1 << 20), b""):
            h.update(blok)
    return h.hexdigest()


def gelen(hedefler):
    if not ARSIV.is_dir():
        sys.exit("naviar-arsiv/ bulunamadı — depo kökünden çalıştırın.")
    hash_haritasi, ad_haritasi = {}, {}
    for p in ARSIV.rglob("*"):
        if p.is_file():
            hash_haritasi.setdefault(md5(p), p)
            ad_haritasi.setdefault(p.name, []).append(p)

    dosyalar = []
    for h in hedefler:
        h = Path(h)
        dosyalar += [p for p in h.rglob("*") if p.is_file()] if h.is_dir() else [h]

    dikkat = 0
    say = {"DUPE": 0, "YENI": 0, "AD-CAKISMASI": 0}
    for d in sorted(dosyalar):
        oz = md5(d)
        if oz in hash_haritasi:
            say["DUPE"] += 1
            print(f"DUPE          {d}  ==  {hash_haritasi[oz]}")
        elif d.name in ad_haritasi:
            say["AD-CAKISMASI"] += 1
            dikkat = 1
            adaylar = ", ".join(str(x) for x in ad_haritasi[d.name])
            print(f"AD-CAKISMASI  {d}  (aynı ad, farklı içerik: {adaylar})")
        else:
            say["YENI"] += 1
            print(f"YENI          {d}")
    print(f"\nÖzet: {say['YENI']} yeni, {say['DUPE']} kopya, "
          f"{say['AD-CAKISMASI']} ad çakışması ({len(dosyalar)} dosya).")
    if say["AD-CAKISMASI"]:
        print("Ad çakışmaları elle incelenmeli: içerik farklıysa ek adla "
              "(_v2.0 gibi) arşivle, ANA-KAYIT'a ayrımı yaz.")
    return dikkat


def paket_sina(liste: Path, taban: Path):
    ok = eksik = bozuk = 0
    satirlar = []
    for satir in liste.read_text().splitlines():
        satir = satir.strip()
        if not satir or satir.startswith("#"):
            continue
        parca = satir.split(maxsplit=1)
        if len(parca) != 2:
            continue
        beklenen, yol = parca[0].lower(), parca[1].lstrip("*").strip()
        p = taban / yol
        if not p.is_file():
            eksik += 1
            satirlar.append(f"EKSIK  {yol}")
        elif sha256(p) != beklenen:
            bozuk += 1
            satirlar.append(f"BOZUK  {yol}")
        else:
            ok += 1
    return ok, eksik, bozuk, satirlar


def paket(liste_yolu, taban_yolu=None):
    liste = Path(liste_yolu)
    taban = Path(taban_yolu) if taban_yolu else liste.parent
    ok, eksik, bozuk, satirlar = paket_sina(liste, taban)
    toplam = ok + eksik + bozuk
    # Yol-tabanı tuzağı: liste yolları bir alt klasöre göreli olabilir.
    if toplam and eksik > toplam / 2 and taban_yolu is None:
        for aday in sorted(p for p in taban.iterdir() if p.is_dir()):
            o2, e2, b2, s2 = paket_sina(liste, aday)
            if o2 > ok:
                print(f"(taban {aday} olarak düzeltildi — liste yolları "
                      f"ona göreli)")
                ok, eksik, bozuk, satirlar, taban = o2, e2, b2, s2, aday
                break
    for s in satirlar:
        print(s)
    print(f"\n{liste} → taban {taban}: {ok}/{toplam} doğru, "
          f"{eksik} eksik, {bozuk} bozuk.")
    if bozuk:
        print("BOZUK dosya var — yükleme kopyasını isteyin, arşive almayın.")
    return 1 if (eksik or bozuk) else 0


if __name__ == "__main__":
    if len(sys.argv) >= 3 and sys.argv[1] == "gelen":
        sys.exit(gelen(sys.argv[2:]))
    if len(sys.argv) >= 3 and sys.argv[1] == "paket":
        sys.exit(paket(sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else None))
    sys.exit(__doc__)
