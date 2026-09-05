---
name: teslim-arsivle
description: Dışarıdan gelen bir belge/kod teslimini (ChatGPT, Lovable, ajans ZIP'i, tek tek yüklenen dosyalar) depoya arşivle, numaralandır ve doğrula — kullanıcı "arşivle", "bu belgeleri kaydet", "numara ver", "envanter çıkar", "SHA/bütünlük kontrolü", "yüklediğim dosyaları depoya al", "teslim paketi", "ZIP'i aç ve sakla" dediğinde ya da bir oturumda aynı projeye ait çok sayıda dosya (özellikle `/root/.claude/uploads/...` altına düşen, `ab12cd34-` önekli, kopyaları olan dosyalar) yüklendiğinde MUTLAKA bu beceriyi kullan. Scripts/arsivle.py kopyaları ayıklar, adları kullanıcının kendi dizinine göre düzeltir, SHA-256'lı numaralı dizin yazar, SHA256SUMS'ı doğrular ve HTML içine gömülü logo/görselleri çıkarır.
---

# Teslim arşivleme

Bir teslim, kullanıcının başka bir yerde ürettirdiği belge ve kod yığınıdır: konsept
belgeleri, site metinleri, kaynak kod, testler, tasarım kayıtları, arşiv dizini,
`SHA256SUMS.txt`, bazen bir ZIP. Genelde parça parça, tekrar tekrar ve rastgele adlarla
gelir. Amaç: her dosya **bayt bayt** korunarak depoya girsin, bir numara ve SHA-256 alsın,
kopyalar ayıklansın, kullanıcının kendi listesiyle karşılaştırılıp eksikler adıyla
söylensin. Bunların hepsini elle yapmak üç kez tekrarlanan, hataya açık bir iştir;
`scripts/arsivle.py` bunu tek komutta yapar.

## Ne zaman, nereye

- Depo kuralı: teslimler `docs/<proje>/<teslim-adı>/` altına gider (ör.
  `docs/naviar/care2-teslim/`). Kaynak **kod** teslimi ayrı bir birim klasörüne
  (`naviar/care2-src/` gibi) bayt bayt konur ve arşiv dizininde tek satırla gösterilir.
- Kayıt kodu projeye göre kısa ve sabit: `NC2-ARS`, `QB-ARS`… Kullanıcının kendi belge
  kodları (DOS-001, REV-002, SRC-003) dosya adında kalır; yeniden numaralandırılmaz.
- Onay gerekmez: kopyalamak ve dizin yazmak geri alınabilir. **Silmek, taşımak, yeniden
  adlandırmak** ise gerekir; betik zaten orijinale dokunmaz.

## Adımlar

1. **Kaynakları topla.** Yüklemeler `/root/.claude/uploads/<oturum-id>/` altındadır;
   dosya adları `8 hex-` öneklidir ve aynı dosya birkaç kez gelmiş olabilir. ZIP geldiyse
   onu da kaynak olarak ver; betik açar.
2. **Önce kuru çalıştır**, planı oku:
   ```bash
   python3 .claude/skills/teslim-arsivle/scripts/arsivle.py /root/.claude/uploads/<oturum> \
     --hedef docs/<proje>/<teslim> --kod <KOD> --proje <PROJE-KODU> --gomulu --kuru
   ```
   Çıktıda üç şeye bak: `İncelenecek` yazan dosyalar (kullanıcının dizininde geçmiyor;
   adını ve türünü sen tahmin etme, "İncelenecek" kalsın), `Dışarıda bırakılanlar`
   (gizli bilgi görünümü: `.env`, anahtar, `sk_live_`; bunlar depoya girmez, kullanıcıya
   söylenir), `SHA256SUMS` satırında EKSİK/UYUŞMAZ olanlar.
3. **Gerçek çalıştır** (`--kuru` olmadan). Betik hedefe kopyalar, `00_ARSIV-DIZINI.md` ve
   `00_ARSIV-ENVANTERI.json` yazar; hedefte önceki envanter varsa numaralamaya devam eder
   ve eski kayıtları değiştirmez. Aynı içerik ikinci kez gelirse yeni numara almaz. Ad ve tür
   bilgisi yalnız bu koşunun kaynaklarından değil, hedefte önceden arşivlenmiş dizin HTML'i /
   envanter JSON'undan ve eski kayıtlardan da alınır; yani ZIP'le tek başına gelen dosya da
   kullanıcının listesindeki türü alır. Arşivi sıfırdan yeniden üretmeye gerek yoktur.
4. **Gömülü varlıklara bak.** `--gomulu` HTML'lerdeki base64 görselleri `_gomulu/` altına
   çıkarır ve boyutlarını yazar. Tek dosyalık demo/tasarım HTML'leri çoğu zaman özgün
   logoyu ve fotoğrafı burada taşır; kullanıcıdan "eksik" diye istemeden önce buraya bak.
5. **Kullanıcıya rapor ver:** kaç yeni kayıt, hangi numaralar, kaç kopya ayıklandı, SHA
   doğrulaması kaç/kaç, eksik dosyaların adı, dışarıda bırakılanlar. Aynı dosyayı yeniden
   yüklerse "arşivdekiyle aynı, değişiklik yok" de; yeniden kopyalama.
6. **Günlüğe işle** (`docs/proje-gunlugu.md`, tarihli kısa kayıt) ve commit et. Commit
   mesajında kayıt aralığını yaz (`NC2-ARS-001…022`).

## Kurallar (neden)

- **Orijinali değiştirme.** Arşiv kanıt niteliğindedir; SHA-256 eşleşmesi ancak bayt bayt
  kopyayla anlamlıdır. Ad düzeltmesi yalnız kopyanın adında olur.
- **Uydurma tür verme.** Kullanıcının dizininde olmayan dosyaya "Geçmiş kayıt" deme;
  `İncelenecek` yaz. Yanlış sınıflama, eksik sınıflamadan pahalıdır.
- **Gizli veri depoya girmez.** Betik adı ve içeriği tarar ama her şeyi yakalamaz; `.env`,
  API anahtarı, kişisel veri (kimlik, sağlık) görürsen dışarıda bırak ve kullanıcıya söyle.
- **Kopyalar bilgi taşır.** "Aynı dosya 4 kez geldi" kullanıcıya söylenmeli; sessizce
  ayıklama ama arşive de sokma.
- **Kaynak kod dosyalarını dizin HTML'i eşleştiremez** (dizin belge listesidir); onları
  README/package.json'daki yapıya göre birim klasörüne yerleştir, arşiv dizininde tek
  satır "kaynak kod, N dosya" yaz.

## Çıktı biçimi

`00_ARSIV-DIZINI.md`: başlık, açıklama paragrafı, `| No | Dosya | Tür | Bayt | SHA-256 |`
tablosu, ardından varsa "SHA256SUMS doğrulaması", "Ayıklanan kopyalar", "Dışarıda
bırakılanlar", "Gömülü varlıklar" bölümleri. JSON aynı bilgiyi tam özetlerle taşır;
betik bir sonraki koşuda ondan devam eder.

## Bilinen tuzaklar

- Kullanıcı dizin HTML'ini de defalarca yükler (`_v6_3.html`, `_v6_10.html`); bunlar
  özet olarak aynıdır, betik ayıklar. Ama dizinin **yeni revizyonu** (daha fazla dosya
  sayan) içerik olarak farklıdır ve arşivdeki eski dizini değiştirmez; eskisi kalır,
  yenisi `_surum2` ekiyle yeni numara alır (ek, arşivdeki kaçıncı farklı içerik olduğunu
  sayar; kullanıcının kendi revizyon numarası değildir). Kullanıcıya hangisinin güncel
  olduğunu ve karşılığını söyle ("surum2 = sizin revizyon 3").
- Ad sonundaki `_1`, `_2`, `(3)` tarayıcı kopya ekidir ve atılır; `_20260905` gibi uzun
  sayılar ad parçasıdır, dokunulmaz (test raporu bu yüzden bir kez yanlış adlanmıştı).
- `SHA256SUMS.txt` çoğu zaman dizin ve envanteri de listeler; onların özeti sonradan
  değişebilir (kullanıcı listeyi yeniden üretmiştir). UYUŞMAZ satırı gördüğünde önce
  bunu düşün.
- ZIP içindeki dosya adları öneksizdir ve doğrudur; ZIP varsa adları ondan al (betik
  aynı içerikte ilk gördüğünü tutar; ZIP'i kaynak listesinde **önce** ver).
- Yüklenen görsel (sohbete yapıştırılan ekran görüntüsü) diskte yoktur; yalnız dosya
  olarak yüklenenler arşivlenebilir.
