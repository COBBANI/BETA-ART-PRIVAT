# BETA ART — Birleştirme Raporu

**Tarih:** 16 Ağustos 2026 · **Kapsam:** 21 doküman + 13 HTML sürümü + 4 SEO parçası

Üç birleştirme de yapıldı. Aşağıda ne çıktı, ne değişti ve şimdi neyi silebileceğin var.

---

## 1 · Strateji dokümanları → `BETA-ART-Birlesik-Strateji.md`

21 doküman tek dosyada, altı bölüm halinde. Hiçbir metin özetlenmedi veya kısaltılmadı —
başlık seviyeleri hiyerarşiye oturması için indirildi, her bölüm kaynak dosya adını ve
dilini taşıyor.

| Bölüm | İçerik | Dosya sayısı |
|---|---|---|
| I | Strateji ve iş modeli (forretningsplan, büyüme planı, doğrulama katmanı, NORTH) | 5 |
| II | Ürün, mimari, build (master prompt, roller, SQL şema) | 3 |
| III | Doğrulama, haklar, hukuk | 2 |
| IV | İçerik, metin, marka (copy revised, final copy, denetim) | 4 |
| V | Durum ve yürütme (audit, scorekort, gjenstår, skuddliste, agent ekibi) | 5 |
| VI | Pazar ve müşteri listeleri | 2 |

**Diller karıştırılmadı.** Norveççe metinler (audit, rank, gjenstår, skuddliste,
forretningsplan) orijinal dilinde bırakıldı — bunlar ortak ve yatırımcı görüşmelerinde
doğrudan kullanılıyor, çeviri onları zayıflatırdı. Bölüm başlıkları ve gezinti Türkçe.

**Dikkat çeken çelişki:** `beta-art-rank.md` "ticari lansmana hazır değil, 5,4/10" diyor;
`BETA_ART_Forretningsplan.docx` ise yatırımcıya dönük güvenli bir dille yazılmış. İkisi de
aynı dosyada artık yan yana duruyor. Bu bir hata değil — biri iç değerlendirme, diğeri dış
sunum. Ama yatırımcıya bu dosyanın tamamını göndermek istemezsin. Bölüm V içerideki hali.

---

## 2 · HTML sürümleri → `beta-art-core-canonical.html`

Birleştirme yapmadan önce sürümleri element id'si bazında karşılaştırdım. Sonuç:

**`beta-art-master-complete.html` zaten hepsinin tam üst kümesiydi.** v6, v7, v8-legal,
v9-compliance ve v10-all-in-one içindeki hiçbir id eksik değil. Yani birleştirilecek bir
şey yoktu — yapılması gereken, hangisinin kanonik olduğunu ilan etmekti. Dosyayı bu kararı
ve kapsadığı 22 görünümü belgeleyen bir başlık bloğuyla kopyaladım.

**Ama v5 → v6 geçişinde üç özellik düşmüş** (kasıtlı mıydı bilmiyorum):

| Düşen | Neydi | v5'te nerede |
|---|---|---|
| `homeAvailable`, `homeVerified`, `homeAvgAuth` | Ana sayfa sayaçları — kaç görsel var, kaçı doğrulanmış, ortalama otantiklik | satır 480-481 |
| `allIndustryChips` | Sektör chip ızgarası, tıklayınca hızlı arama | satır 555 |
| `licenseCustomize` | Lisans özelleştirme `<details>` bloğu | satır 1219 |

Bunları geri koymadım çünkü kasıtlı sadeleştirme olabilir. Sayaçlar özellikle dikkat çekici:
"kaç doğrulanmış fotoğraf" sayısı, doğrulamayı çekirdek tez yapan bir üründe boşuna
harcanmış bir güven sinyali gibi duruyor. Geri istersen söyle.

---

## 3 · SEO parçaları → `seo.ts`

Dört parça (structured-data, seo-routes, entry.ts handler'ları, SEO-PATCHES notları) tek
modülde. Dört hata da düzeltildi:

- **`/kontakt` iki kez** kayıtlıydı → sitemap'te yinelenen `<loc>` üretiyordu, tekilleştirildi
- **12 plaka sayfası sitemap dışıydı** → dinamik rota filtresi `/photo/:id`'yi tasarım gereği
  atlıyordu; sitenin ticari olarak en önemli sayfaları hiç taranmıyordu. `registerPlates()`
  ile besleniyor, image sitemap girdisi de üretiliyor
- **Dangling `@id` referansları** → `faq.tsx` `#organization` ve `#website` node'larına
  işaret ediyordu ama hiçbir sayfa onları yayınlamıyordu. `graph()` artık her sayfada ikisini
  de basıyor
- **Plaka sayfalarında sıfır yapısal veri** → `photoPageGraph()` ImageObject + Product +
  BreadcrumbList üretiyor

**Bir bağlantı senden bekliyor:** `PLATES` dizisi boş. İçerik modülünden plaka kataloğunu
`registerPlates()`'e geçirmen gerek, yoksa sitemap yine sadece statik rotaları yayınlar.
Plaka slug'larını proje dosyalarından çıkaramadım — yüklenen kopyalarda dosya adları ile
içerikler eşleşmiyor (`routes.tsx` içinde `cn()` yardımcısı var, `home.json` bir React
bileşeni). Uydurma slug yazmaktansa bağlantı noktasını açık bıraktım.

**Hâlâ üç karar bekliyor** (dosya sonundaki NOTLAR bölümünde de duruyor):
`Organization.logo` URL'i · `hasMerchantReturnPolicy` — ki bu bir SEO değil hukuk sorusu
(dijital lisans teslimatında Norveç cayma hakkı nasıl işliyor?) · org.nr kaydı.

---

## 4 · Silinebilecek dosyalar

27 dosya **byte-byte aynı** kopya. İçerik kaybı olmadan silinebilir:

```
beta-art-museum_1..6.html          (6 kopya)
beta-art-core-v8-legal__1_,2_,3_   (3 kopya)
beta-art-qr_1,2,3.html             (3 kopya)
beta-art-contact_1,2,3.html        (3 kopya)
beta-art-intelligence-platform__1_,__2_  (2)
beta-art-cookie_1, beta-art-cookie___Kopi  (2)
beta-art-master-complete__1_.html
beta-art-core-v5__1_.html
beta-art-v3_1.html
beta-art-simplified-manifesto__1_.html
beta-art-platform__1_.html
beta-art-mark_1.html
beta-art-series_1.html
beta-art-faq_1.html
beta-art-privacy_1.html
beta-art-qr-plates_1.html
beta-art-skuddliste_1.md
```

Ayrıca `beta-art-core-v6/v7/v8-legal/v9-compliance/v10-all-in-one` artık kanonik dosyada
tamamen kapsanıyor — arşive taşınabilir. `v4` ve `v5`'i yukarıdaki üç düşen özellik
kararını verene kadar tut.

---

## Sırada ne var

Birleştirme bitti ama iki açık uç bıraktı — ikisi de senden bir cevap istiyor:

1. **Plaka kataloğunu `seo.ts`'e bağla.** Bu yapılmadan 12 ticari sayfa Google'da yok.
2. **Düşen üç özellik geri gelsin mi?** Özellikle doğrulama sayacı.
