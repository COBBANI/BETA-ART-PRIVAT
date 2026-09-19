# Beta Art — müşteri davranış sistemi

Oluşturma: 02.09.2026 (kullanıcı talebi: "bir müşteri davranış sistemi kur —
müşterinin bir sonraki sefer ne görmek veya satın almak istediğini bulalım").

## Ne yapar

Ziyaretçinin sitede ne yaptığını (hangi plakaya baktı, hangi kategoriyi
seçti, neyi sepete ekledi) izler ve buna dayanarak **"Picked for you /
Utvalgt for deg"** şeridinde bir sonraki sefer/sonraki adımda ilgisini
çekmesi muhtemel plakaları önerir. Şerit ana sayfada (koleksiyonun altında),
plaka sayfasında ve sepette görünür.

## Değişmez kural: yalnızca cihazda, hiçbir yere gönderilmez

Bu statik bir site ve markanın vaadi kanıt + dürüstlük. Dolayısıyla dürüst v1
**tamamen tarayıcı-içi**:

- Veri yalnızca ziyaretçinin kendi `localStorage`'ında tutulur
  (`ba_davranis_v1` anahtarı, en fazla 200 olay).
- Hiçbir çerez, üçüncü-taraf analitik, parmak izi (fingerprint) YOK. Hiçbir
  ağ isteği atılmaz.
- Öneriler istemci tarafında gerçek katalogdan hesaplanır.
- Görünür bir **"Forget my activity / Glem aktiviteten min"** düğmesi kaydı
  tamamen siler.
- Gizli sekmede / depolama engelliyse sistem sessizce kapanır, site aynı
  çalışır (try/catch ile korunur).
- Soğuk başlangıçta (etkinlik yoksa) şerit HİÇ görünmez — dolgu/yanıltıcı
  öneri yok, bu da sitenin kanıt standardıyla tutarlı.

## Nasıl çalışır (teknik)

- `src/lib/behavior.ts` — kayıt ve öneri motoru.
  - Olay tipleri ve ağırlıkları: `view` (1), `filter` (2), `cart` (4) —
    sepete ekleme en güçlü "bunu istiyorum" sinyali.
  - `recommend(n, exclude)`: katalog, cihazın kategori yakınlığına göre
    puanlanır; henüz görülmemiş plakalar öne alınır; eşitlikte katalog sırası
    belirleyici (deterministik ve açıklanabilir). Ekranda açık olan plaka
    hariç tutulur.
  - `record()` bir `ba-behavior` penceresi olayı yayar; şerit bunu dinler,
    böylece o anki plakanın görüntüsü aynı ziyarette öneriyi canlı günceller.
- `src/components/ForYou.tsx` — görünür şerit. `hasBehavior()` yanlışsa
  `null` döner (soğuk başlangıç). Temel satırı ("nothing is sent anywhere")
  ve unut düğmesi burada — şeffaflık ve kontrol özelliğin parçası.
- İzleme kancaları: `router.tsx` (sayfa gezinmesi), `PlateDetail.tsx`
  (görüntü + sepet), `Home.tsx Collection` (kategori filtresi).
- Metinler 8 dilde: `recoTitle`, `recoBasis`, `recoReset`.

Doğrulama (Playwright 7/7): ilk ziyarette öneri yok → plakaya bakınca aynı
sayfada canlı beliriyor → dönüşte ana sayfada duruyor → temel açıklaması
görünüyor → "unut" ile şerit ve localStorage temizleniyor.

## Bilinçli KAPSAM DIŞI (uydurma yasağı)

Şu an yapılmayan, çünkü backend + onay akışı gerektiren ve simüle edilmesi
dürüst olmayan şeyler:

- **Çapraz-ziyaretçi analitiği** ("X'e bakan müşteriler Y aldı"): birden çok
  kullanıcının verisini birleştirmek sunucu ister. Bu olmadan böyle bir
  iddia uydurma olur.
- **Kimlik/hesap bazlı profil**: cihazlar arası hafıza için giriş + sunucu
  gerekir (Auth sayfası şu an iskelet).
- **Satın alma tahmini modeli**: gerçek satış verisi biriktiğinde anlamlı
  olur; şimdi tek gerçek fiyatlı plaka bile yok.
- **A/B testi / öneri isabet ölçümü**: metrik toplayacak yer yok.

## Sonraki adımlar (backend geldiğinde)

1. Onaya dayalı (opt-in) sunucu tarafı olay toplama — GDPR uyumlu, açık rıza.
2. Çapraz-ziyaretçi "birlikte görülenler" önerisi, gerçek veriyle.
3. Hesap bağlanınca cihazlar arası profil taşıma.
4. Öneri isabet oranı ölçümü (tıklama → sepet → satış hunisi).

Bu adımların hiçbiri satış verisi ve rıza altyapısı olmadan siteye yazılmaz.
