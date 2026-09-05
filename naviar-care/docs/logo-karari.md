# NAVIAR logo kararı (05.09.2026, kullanıcı talimatı: "BU LOGOLARI KULLANIYORUZ")

Kullanıcı, ChatGPT tarafında üretilen yeni NAVIAR logo sistemini
KULLANIM kararı olarak bildirdi. Kaynak: sohbete gömülü üç pano
(6 konsept panosu; NAVIAR CARE Standard QA v0.2; NAVIAR-001 QA Board
v0.3 REVISE). Panolar dosya olarak henüz teslim edilmedi — aşağıdaki
tanım panolardan okunandır, üretim için kaynak dosyalar beklenir.

## Seçilen sistem (panolardan okunan)

- **Monogram:** köşeli, kalın **N**; sağ üst bacağında elmas (baklava)
  biçimli çentik. 32/24 px'te çalışır; 16 px için özel master gerekir
  (v0.3 notu) / QA v0.2 16 px'i PASS sayar — çelişki, kaynak dosyayla
  netleşecek.
- **Yazı markası:** geniş harf aralıklı, geometrik sans NAVIAR;
  CARE alt satırda, sağa hizalı, daha küçük. A'lar çubuksuz (çubuk
  ayrı kısa çizgi), R bacağı kesik.
- **Varyantlar (QA v0.2):** ana renk (koyu petrol-lacivert), mono
  siyah, ters beyaz, EUIPO 250×250, duyarlı semboller (32/24/16 px),
  düşük kalite 1-bit — hepsi PASS işaretli.
- **Kurallar (v0.3):** clear space x = 0.5 × büyük harf yüksekliği;
  yazı markası asgari 144 px (sıkışıkta 120 px); tüm yollar
  outline, gölge/degrade yok.

## Durum ve sınırlar (panoların KENDİ ifadeleri — uydurma değil)

- v0.3 panosu: **"Candidate artwork only — not a filing specimen and
  not legally cleared"**, **"FIGURATIVE SEARCH: PENDING"**, durum
  **REVISE**.
- QA v0.2 panosu: **"FILING STATUS: TECHNICAL REPRESENTATION PASS /
  LEGAL CLEARANCE HOLD"**.
- Yani: teknik temsil hazır; **hukuki takibat/tescil temizliği YOK**.
  CLAUDE.md madde 7 ("uydurma yasak") gereği bu logo sitede kullanım
  kararıdır, tescil edilebilirlik iddiası değildir. Tescil öncesi
  figüratif arama sonucu beklenmeli.

## Güncelleme (05.09.2026 gece): v0.2 kaynak SVG geldi

WEB-2026-002 stüdyo paketiyle logo adayının kaynak dosyası teslim
edildi: `naviar-arsiv/03_care-1-studio-web-2026-002/brand/NAVIAR-CARE-001_master_
candidate_v0.2.svg`. Ancak bu **v0.2**; master dosya kaydı
(`naviar-arsiv/01_master-dizin/02_FILE-REGISTER.md`, FILE-016) ChatGPT
arşivinde `NAVIAR-CARE-001_master_candidate_v0.3.svg` bulunduğunu
söylüyor ve QA panosu v0.3'ü REVISE işaretliyordu.

**Uygulama (aynı gece, kullanıcı talimatı "kaynak olarak bunları
kullanarak web sitesini yapacaksın"):** kanonik landing'deki logo
v0.2 kaynak SVG'nin geometrisiyle birebir değiştirildi (App.tsx →
NaviarMonogram + NaviarLogo; yollar kaynak dosyadan kopya, renkler
tema değişkeni). Elle yazılmış eski yaklaşık monogram kalktı. v0.3
master gelince yalnızca yol verileri güncellenecek.

## Yapılacaklar

1. **Kullanıcı:** monogram + yazı markası kaynak dosyalarını (SVG
   tercih; yoksa yüksek çözünürlük PNG) sohbete DOSYA olarak yükler.
2. Dosyalar gelince: kanonik landing'deki mevcut kucaklaşma-kalp
   hibrit logosu (SRC-03'ün "logo candidate v0.3" SVG'si) bu sistemle
   değiştirilir; favicon + üstbilgi + altbilgi üç dilde ship
   hattından geçirilir.
3. CLAUDE.md madde 7a (yeniden üretilebilirlik) için: artwork ChatGPT
   tarafında üretildiğinden bu depoda betikle yeniden üretim yerine
   **köken kaydı** tutulur (bu dosya + kaynak dosyaların özetleri
   eklenecek). QBLOGG'un marka-tescil zarf denetimi (marka-tescil.mjs)
   EUIPO dosyası hazırlanırsa bu varlıklara da uygulanabilir.
4. Eski logo arşivde kalır (naviar-arsiv/02_care-1-src03 içindeki gömülü SVG +
   assets/brand geçmişi); sessizce silinmez.

## Açık soru

6 konsept panosundaki 01–06 yazı markası varyantlarından hangisinin
nihai olduğu QA panolarındaki biçimden çıkarılıyor (çentikli-N'li
geometrik sans). Kaynak dosya teslimi bunu kesinleştirecek.
