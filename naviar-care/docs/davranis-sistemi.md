# Müşteri davranış sistemi — tasarım ve uyum haritası

## İki ayrı sistem (02.09.2026 talimatı)

| | Ziyaretçi sistemi | Düzenleyen (redaktör) sistemi |
|---|---|---|
| Sayfa | index.html (landing) | **admin.html** — landing'den link YOK |
| Amaç | Neste steg tahmini + kişiselleştirme | Pilot operasyonu: kuyruk, eşleştirme, ölçüm |
| Veri | Anonim tıklama olayları (rızayla) | Talep/yardımcı kayıtları (takma adla) |
| Depo | Ziyaretçinin tarayıcısı | Redaktörün tarayıcısı (`nc_admin_v1`) |
| Kural | Sağlık verisi hiç girmez | Alias zorunlu; attest tarihi tutulur, attest tutulmaz |

Konsol sekmeleri: **Kø** (Ny→Vurdert→Matchet→Bekreftet→Fullført hattı,
manuel yardımcı seçimi, iptal), **Hjelpere** (alias + kategori + vandel
tarihi + aktif/pasif), **Måling** (pilot-olcum-plani.md metrikleri
kuyruktan canlı hesaplanır: matchetid, tilfredshet, gjentakelse,
avbrudd, provisjon), **Data** (JSON indirme, CSV panoya, tümünü silme).
Her durum geçişi değiştirilemez hendelseslogg'a "kim yaptı" ile düşer.

Sınır dürüstlüğü: admin.html'de gerçek kimlik doğrulama YOKTUR —
istemci tarafı şifre güvenlik tiyatrosu olurdu. Sayfa "internt verktøy"
olarak işaretlidir, landing'den bağlantı verilmez ve gerçek erişim
kontrolü Build fazındaki backend'le gelir. O güne kadar konsol yalnızca
koordinatörün kendi makinesinde kullanılır (pilot zaten tek
koordinatörlü ve manuel).

Amaç (proje lideri talimatı, 02.09.2026): her web sayfasında müşterinin
**bir sonraki ziyarette ne görmek veya satın almak isteyeceğini** bulmak.

## Tasarım kararı: birinci taraf, rıza kapılı, yalnızca tarayıcıda

Klasik yol (üçüncü taraf analitik, sunucu tarafı profil) bu projenin
bağlayıcı ilkeleriyle (uyum-ilkeleri.md) ve "sıfır dış istek" mimarisiyle
çelişir. Kurulan sistem bunun yerine:

1. **Veri tarayıcıdan çıkmaz.** Olaylar `localStorage`'da tutulur
   (`nc_behavior`); hiçbir sunucuya, hiçbir üçüncü tarafa gönderilmez.
   CSP `connect-src 'self'` değişmedi — sızıntı teknik olarak da kapalı.
2. **Rıza gerçek bir seçimdir.** Cookie banner'daki iki buton artık
   farklı çalışır: "Godta alle" → kişiselleştirme açık; "Kun nødvendige"
   → hiçbir olay kaydedilmez (`track()` no-op). Eski `nc_cookie=1`
   kayıtları muhafazakâr yorumlanır (= yalnızca gerekli).
3. **Silme tek tık.** Footer'daki "Slett lagrede data" tüm davranış
   verisini VE rıza kaydını siler, sayfayı yeniler (banner yeniden çıkar).
4. **Kendiliğinden unutma.** Olaylar 90 günden eskiyse budanır; toplam
   en fazla 200 olay tutulur.

## Ne toplanır, ne toplanmaz

| Toplanır (rızayla) | Toplanmaz |
|---|---|
| Kategori tıklaması (`cat`: "Handling og ærend") | İsim, e-posta, telefon — form içerikleri asla |
| Uzman kartı tıklaması (`exp`) | Serbest metin (durum tarifi) |
| Fiyat planı tıklaması (`plan`) | IP, cihaz parmak izi |
| SSS açılışı (`faq`) | Sağlık verisi (zaten formda da istenmez) |
| CTA/modal açılışı (`cta`) | Sayfalar arası / siteler arası takip |

Olay biçimi: `{t: epoch_ms, e: tür, v: etiket}` — kişisel tanımlayıcı yok.

## "Bir dahaki sefere ne ister?" — tahmin modeli (v1)

Basit ve açıklanabilir: **sıklık × tazelik** puanı. Her kategori
tıklaması, yaşına göre azalan ağırlıkla (bugün = 1,0 → 90 gün = 0,2)
toplanır; en yüksek puanlı kategori "beklenen ilgi"dir.

Kişiselleştirme çıktıları (yalnızca rıza = alle):
- Hero'da "Velkommen tilbake — fortsette med …?" çipi (tek tıkla, konu
  önceden seçili formu açar)
- Tjenester ızgarasında ilgili kart başa alınır ve "SIST SETT" rozetini taşır
- Her kategori kartı formu **o konu önceden seçili** açar (rızadan
  bağımsız — bu takip değil, tıklanan bağlamın taşınmasıdır)

Bilinçli olarak YOK: otomatik karar yok (içerik sıralamak karar değildir;
uyum-ilkeleri madde 2 ihlal edilmez), makine öğrenmesi yok (proje planı
Build fazı: "önce manuel, gerçek veriyle öğren").

## Sayfalara dağılım

| Sayfa | Durum |
|---|---|
| naviar-care/index.html (landing) | ✅ Tam sistem (bu commit) |
| naviar-care/prototype.html | ✅ Hafif sürüm: son seçilen kategori hatırlanır, akış oradan başlar |
| QBLOGG sayfaları | ⏳ Ayrı iş: kendi `guvenlik.mjs` denetimi localStorage'daki kişisel veriyi tarar; modül taşınmadan önce o denetimle birlikte planlanmalı |

## "Neste steg" katmanı (v1.1 — 02.09.2026)

İlgi tahmininin üstüne, ziyaretçinin yolculuk aşamasını tespit edip
**tek bir doğru sonraki adımı** öneren kural katmanı eklendi
(`nextStep()`). Kurallar öncelik sırasıyla, tamamen açıklanabilir:

| Durum (olaylardan) | Önerilen neste steg |
|---|---|
| Form gönderilmiş, sonrasında yeni başlangıç yok | **Hiçbir şey** — dönüşmüş kullanıcı dürtülmez |
| Form açılmış ama gönderilmemiş | "Fullføre forespørselen om …?" — konu korunarak forma döner |
| Fiyat planına bakılmış | "Klar til å starte? Første time uten binding" |
| Kategori ilgisi var | "Fortsette med …?" |
| Yalnızca SSS okunmuş | "Se hvordan det fungerer" — güven kurmaya, forma değil |

Yeni sinyal: `submit` (form + venteliste gönderimi). Çip hero'da tek
yerde durur; birden fazla dürtme yoktur.

## v2 için notlar (pilot verisi geldikten sonra)

- Bölüm görünürlüğü sinyali (IntersectionObserver) — v1'de bilinçli
  atlandı (sadelik).
- Sunucu tarafı toplu analitik ancak: açık rıza metni + kendi uç
  noktamız + `connect-src` güncellemesi + DPIA sorusu
  (hukuk-kontrol-listesi.md §4) yanıtlandıktan sonra.
- Pilotta "tekrar talep oranı" zaten tabloda ölçülüyor
  (pilot-olcum-plani.md metrik 5) — davranış sistemi onun yerine geçmez,
  ziyaretçi deneyimini kişiselleştirir.
