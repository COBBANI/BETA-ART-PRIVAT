# SRC-03 kaynak arşivi — bu klasör nedir?

Kullanıcının 05.09.2026 akşamı bu oturuma yüklediği SRC-03 (ChatGPT
platformu CARE uygulaması) kaynak dosyalarının olduğu gibi arşividir.
Kaynak temel: **özel inceleme sürümü 5, commit
`255ee9b2f98e5cfab344ede26f876908d0ab6877`** (bkz. DOGRULAMA.md).

**Bu kod bu depoda ÇALIŞTIRILMAZ ve kanonik landing'in parçası
değildir.** ChatGPT Sites ortamına bağlıdır (Worker + D1 + Sites
kimlik akışı); KODU-CALISTIRMA.md'nin kendisi de standart Next.js/
Vercel'e taşımanın otomatik olmadığını söyler. Amaç: chatgpt.site bu
ortamdan erişilemediği için kaynağın kaybolmaması ve karşılaştırma/
taşıma kararlarına dayanak olması (bkz.
`../docs/src03-karsilastirma.md`).

## Teknik yapı (özet)

- React 19 + TypeScript, Vinext/Vite App Router; Cloudflare Worker
  üzerinde çalışır (`worker/index.ts`), varlıklar ASSETS binding'i.
- Veri: Cloudflare D1 (SQLite) + Drizzle (`db/schema.ts`;
  `db/legacy-schema.ts` eski tabloları korur, veri silmeyen migration
  ilkesi). Tablolar: care_requests, care_reservations,
  care_applications, care_cases, care_outbox, care_payment_events,
  care_analytics, care_feedback, care_audit.
- Kimlik: ChatGPT Sites oturumu, `oai-authenticated-user-*`
  başlıklarından (`lib/chatgpt-auth.ts`); kayıt sahibi sunucuda
  belirlenir.
- İçerik: 3 dil (nb/en/tr) tek katalogda `lib/content.ts`
  (~287 anahtar); tasarım belirteçleri `app/globals.css`
  (#0B5152 ana eylem, #10384A metin, #A96A00 odak).
- Ödeme/e-posta: Stripe test + Resend bağdaştırıcısı
  (`lib/care-integrations.ts`); .env.example'da gerçek sır yok,
  INTAKE/ödeme kapalı duruş.
- Bağımsız tasarım önizlemesi: `design-preview/` +
  `scripts/export-design-preview.mjs` → tek dosyalık
  `teslim/NAVIAR-CARE_SRC03_Web-Tasarim.html` (CSP ile ağ istekleri
  kapalı, kişisel verisiz deneme formu).
- Tam konsept belgesi (23 bölüm, TR):
  `teslim/NAVIAR-CARE_SRC03_Tam-Konsept.html`.

## v2.4 son teslim kaydı (05.09.2026 gece)

ChatGPT hattı inceleme sürümünü **NAVIAR-CARE-001-WEB-01 v2.4.0** olarak
kapattı; teslim kaydı `teslim/NAVIAR-CARE-001-WEB-01_DOC-010_FINAL-
TESLIM_v2.4.html` (yükleme kopyasıyla bayt bayt aynı). Özü: 36 otomatik
test geçti (30 sunucu/SQLite + 6 sentetik DOM akışı); tarayıcı/telefon
kontrolleri ortam hatasıyla TAMAMLANAMADI; SERVICE_OPEN /
PAYMENTS_ENABLED / LAUNCH_REVIEW_COMPLETE false — gerçek hizmet, ödeme
ve e-posta kapalı. Açılış girdileri (işletme kimliği, bölge, e-posta,
alan adı, sağlayıcı hesapları) işletme sahibinden bekleniyor.
(Güncelleme, aynı gece: `KAYNAK-KOD_v2.4.0.zip` sonradan geldi —
aşağıdaki "v2.4.0 tam kaynak paketi" bölümüne bakın; kök ağaç sürüm 5
temeli olarak korunur.)

## Platform-studio çalışma kaydı (05.09.2026 gece)

`teslim/NAVIAR-CARE_Web-Design-Platform-Studio_2026-09-05.md`: SRC-03
hattının platform karşılaştırması (Figma/Wix/Webflow/Framer ↔ mevcut
özel uygulama; özel uygulama seçildi, taşıma yok) + sürüm 3 ve 4 kayıt
tabloları. Sürüm 4 yayın kanıtı: succeeded 15:35 UTC, kaynak revizyonu
`e5a5708994119b8c40d557132598b8c09e97bbe7`, site sürümü 4 — yani
buradaki kod arşivi (inceleme sürümü 5 tabanı, 255ee9b2) ile sitenin
sürüm numaraları AYRI sayaçlardır; belge kendi içinde açıklıyor.
DOC-010 v2.4 ile birlikte okunmalı.

## v2.4.0 tam kaynak paketi (05.09.2026 gece — kaynak-v2.4.0/)

`KAYNAK-KOD_v2.4.0.zip` teslim edildi ve `kaynak-v2.4.0/` altına
açıldı: uygulama 2.4.0, kaynak sürümü
`2d1ea68e47568086462c3ed304f1479010bb0222`, 62 takipli dosya +
OKU-BENI + KAYNAK-ENVANTERI.csv + KOD-OKUYUCU.html. **Açılan her dosya
zip'in kendi SHA-256 envanteriyle doğrulandı: 62/62 doğru.** Paketin
notu: testler 37/37; gerçek sağlayıcı/cihaz/erişilebilirlik kabulü ayrı.

Dikkat: v2.4.0 ağacı, buradaki eski inceleme-sürümü-5 tabanından FARKLI
bir mimaridir (React/Vinext değil; `src/*.js` + worker + Vite). İki
ağaç bilerek yan yana korunur, birleştirilmez.

İçindeki iki varlık:
- `naviar-care/assets/naviar-care-v03.svg` — **kucaklaşma-kalp hibrit
  logo** ("embrace-heart around an N bridge"). Bu, beklenen çentikli-N
  master v0.3 DEĞİLDİR (o hâlâ FILE-016'da, gelmedi); eski site
  logosunun kaynak dosyasıdır.
- `naviar-care/assets/hverdag.png` — sitedeki kadın fotoğrafı
  (1536×1024 PNG). Köken netleşti: DOC-012/04 kaydına göre **yapay
  zekâ üretimi illüstratif görsel**; sayfada YZ üretimi olduğu
  belirtilir, gerçek müşteri/ekip fotoğrafı olarak kullanılmaz.
  Kanonik sitede kullanılırsa aynı etiket şartıyla.

`teslim/`e eklenenler: `DOC-012_TUM-BELGELER_v1.0.html` (20 yeni belge
+ 10 tarihsel kaydın tek dosyalık paketi) ve `BELGE-LISTESI_v1.0.csv`.
Paketin tekil `01_BELGELER/*.md` dosyaları ayrıca yüklenmedi; içerik
birleşik HTML'de korunuyor.

## Belge paketi (05.09.2026 gece — belge-paketi-20260905/)

`NAVIAR-CARE_SRC03_Arsiv_20260905.zip` (arşiv kodu
NAVIAR-CARE-SRC03-ARSIV-20260905 v1.0) olduğu gibi açıldı; **17/17
dosya paketin kendi SHA256SUMS.txt'siyle doğrulandı.** İçerik: 29
sayfalık ana proje dokümantasyonu (docx+md), Tam-Konsept (html+md),
CHAT-004 üçlüsü (FILE-020/021/022: Profesyonel-Surum_Teslim.md,
Icerik_NB-EN-TR.csv — 301 kayıt ×3 dil, Kurulum-ve-Kabul.md),
platform-studio kaydı, PROJE-DUZENI, WEB-VE-KOD-KAYDI (5 sürüm +
revizyonlar), KOD-DOSYA-LISTESI.csv (131 dosyalık SHA-256 listesi),
DOGRULAMA-RAPORU, envanter + sağlama dosyaları. Ayrı gönderilen docx
ve Belge-Listesi HTML kopyaları paket üyeleriyle bayt bayt aynı çıktı;
tek nüsha paket içinde durur.

## DOC-012 belge paketi (05.09.2026 gece — doc-012-paketi/)

DOC-012 setinin tekil dosyaları parça parça geldi; her dosya paketin
kendi `SHA256SUMS.txt`'siyle (45 kayıt) doğrulanarak eklendi. Durum:
**35/45 doğrulandı** — 20 bölümün TAMAMI (01_BELGELER), 10 doğrulama
dosyasının tamamı (02_DOGRULAMA), OKU-BENI, BELGE-LISTESI (md+csv),
TUM-BELGELER html (üstteki teslim kopyasından sağlama eşleşerek
tamamlandı). Eksik 10: TUM-BELGELER md kaynağı + 03_ONCEKI_BELGELER'in
9 tarihsel dosyası (DOC-001/005/007/009×2/010-TESLIM/011 docx+md/
REV-20260904; FINAL-TESLIM v2.4 tamam).
OKU-BENI'nin ek kontrolleri: 30 rota HTTP 200, 333 anahtar ×3 dil,
8 tablonun veri sözlüğü, 37 test, kaynak zip 62 dosya SHA-256 eşleşti.
Birleşik hali zaten `teslim/DOC-012_TUM-BELGELER_v1.0.html`'de.

## Adlandırma notları

- Dosyalar yükleme adlarındaki hash önekleri atılarak KODU-CALISTIRMA
  tablosundaki özgün yollara yerleştirildi; `app/[lang]/` köşeli
  ayraçları `app/lang/` olarak düzleştirildi (git/derleme karışıklığını
  önlemek için — orijinal yol Next.js dinamik segmentidir).
- `_gitignore` ve `_npmrc`: nokta-dosyalar bilerek etkisiz adla
  saklandı (arşiv alt ağacında ignore kuralı çalıştırmasınlar diye).
- `sablon-notlar/`: platform başlangıç şablonundan kalan "notes" demo
  şeması ve API rotası — CARE ürününün parçası değil.
- `vendor/`: shadcn/tailwind derlenmiş CSS + lisansı (yüklemede
  geldiği için saklandı).
