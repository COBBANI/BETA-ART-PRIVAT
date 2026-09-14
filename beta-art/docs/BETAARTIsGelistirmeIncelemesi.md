# BETA ART — İş geliştirme incelemesi

Kilitlenmiş modelin (Vedtak 9–11) yapısal değerlendirmesi · 16 Ağustos 2026

Board kararlarını tartışmıyorum — konumlandırma doğru, fiyat mantığı doğru, sıralama
doğru. Bu doküman kararların *altındaki varsayımlara* bakıyor: hangileri test edilmiş,
hangileri test edilebilir, hangileri hiç konuşulmamış.

Beş bulgu var. İkisi modelde açık delik.

---

## 1 · Beş yıllık ön ödeme, finanse edilmemiş bir yükümlülük yaratıyor

Bu, board masasında hiç gündeme gelmemiş en önemli mesele.

15 000 kr, *beş yıllık saklama dahil* alınıyor. Yani paranın tamamı 1. yılda giriyor,
hizmetin dörtte üçü sonraki dört yılda veriliyor.

Kaba bir hacim varsayımıyla — 10 çekim günü, günde 400 kare, kare başına 30 MB RAW —
proje başına yaklaşık **117 GB**. AB bölgesinde nesne depolama GB başına aylık
€0,02–0,03 aralığında:

| | 5 yıllık depolama maliyeti | 15 000'in yüzdesi |
|---|---:|---:|
| €0,02/GB/ay | ~1 650 kr | %11 |
| €0,03/GB/ay | ~2 450 kr | %16 |

Rakam tek başına yıkıcı değil. Yıkıcı olan **birikimi**:

| | Canlı arşiv sayısı | Yıllık taşınan depolama gideri |
|---|---:|---:|
| Yıl 1 | 40 | ~13 000 kr |
| Yıl 3 | 120 | ~40 000 kr |
| Yıl 5 | 200 | ~66 000 kr |

Yıl 5'te, o yılın hiçbir gelirine katkısı olmayan 160 arşiv için ödeme yapıyorsun.
Parası 2026–2029'da alınmış ve harcanmış işler.

Buna ek olarak, harcanmayan ama gerçek olan bir kalem daha var: her canlı arşiv için
erişim, yedek, iade talebi ve sorumluluk devam ediyor. Depolama ucuz; **var olmaya
devam etme yükümlülüğü** ucuz değil.

**Ne yapılmalı:** 15 000'in bir kısmı muhasebeten önceden alınmış gelir olarak
ayrılmalı ve harcanmamalı. Oran regnskapsfører'in işi, ama sıfır olamaz.
Vedtak 6 görüşmesine üçüncü soru olarak bunu ekle — agent/mellommann sorusuyla aynı
seansta, ek maliyeti yok.

Alternatif ve daha temiz yapı: **etablering 10 000 + yıllık saklama 1 500**, ilk yıl
dahil. Aynı beş yıllık toplam, ama gelir hizmetle aynı hızda giriyor ve müşteri her
yıl bir fatura görüyor — ki bu, 6. yıl yenilemesinin sürpriz olmamasını da sağlıyor
(bkz. §3). Dezavantajı: Vedtak 9'un tüm mantığı "abonelik değil, proje kalemi"
üzerineydi ve yıllık kalem aboneliğe benziyor. Bu gerçek bir gerilim, ve prisstesten'de
dördüncü soru olarak sorulabilir.

---

## 2 · İki gelir kalemi paralel değil, biri diğerinin pazarlaması

Vedtak 9 üç kalem sayıyor ve eşit ağırlıkta sunuyor. Aritmetik eşit olmadıklarını
söylüyor:

- 600 000 kr **sadece arşivden**: yılda 40 proje
- 600 000 kr **sadece formidlingden**: yılda 240 oppdragsdag — yani her iş günü bir
  tam gün çekim organize etmek

İkincisi solo olarak mümkün değil. Formidling marjı (günde 2 500 kr) bir iş kolu değil;
**müşteri edinme kanalı ve alışkanlık yaratıcı.** Fotoğrafçıyı sahaya sokuyorsun,
dosyalar doğrudan arşive akıyor, müşteri sistemi kullanmaya başlıyor.

Bunun iki pratik sonucu var. Birincisi: formidlingi kârlılık için optimize etme,
arşiv satışını kolaylaştırdığı ölçüde optimize et. İkincisi: Vedtak 6'daki
agent/mellommann sorusunun cevabı kâr açısından değil, **kredi riski** açısından önemli.
2 500 kr kazanmak için 11 000 kr'yi 30 gün finanse ediyorsan, bu bir gelir kalemi değil,
bir borç verme işi.

---

## 3 · Değerin kanıtı yıllar sonra geliyor — ve bu tek başına en büyük risk

K'nın sak 10'daki cümlesi modelin özeti: *"İlk seferinde vaade göre alıyorum. İkinci
seferinde bir şey bulduğum için alıyorum."*

Doğru teşhis, ama ticari sonucu şu: **geri bildirim döngün üç yıl.** Ürünün gerçekten
işe yaradığını ne sen ne müşteri, ilk gerçek arama olayına kadar öğrenemiyor. O olay
da tanım gereği proje bittikten yıllar sonra.

Sermayesi olmayan tek kişilik bir operasyon için bu ölümcül bir yavaşlık. İlk üç
müşterinin sana ne öğreteceğini üç yıl bekleyemezsin.

**Ne yapılmalı — bu, bence modelde yapılacak en yüksek getirili tek değişiklik:**
teslimata, proje *sırasında* kullanılmak zorunda olunan bir şey koy.

Somut seçenekler, en ucuzdan:

- **Aylık arşiv özeti.** Her ay müşteriye o ayın çekimlerinin fase/sone dağılımını
  gösteren tek sayfa. Prosjektleder bunu KS toplantısına götürebiliyor. Maliyeti sıfıra
  yakın, seni her ay hatırlatıyor.
- **Talep üzerine arama, insan eliyle.** "Şu tarihte şu aksta ne çekildi?" sorusuna
  24 saatte cevap. Pilot fazında bunu elle yapıyorsun zaten. Ama sözleşmede *hizmet
  olarak* yazarsa, müşteri denemek için bahane arar — ve her deneme bir kanıt olayıdır.
- **Devir teslim paketi.** Proje bitiminde, garanti dönemine giren dokümantasyonun
  yapılandırılmış tek dosyası. Bu, ürünün vaadinin *ilk günden* somutlaştığı an.

Üçüncüsü ayrıca satış argümanı: "Dört yıl sonra işe yarayacak" yerine "Teslimde elinize
şu geçecek" diyebiliyorsun.

---

## 4 · Yıl 6–10 gelirini modelde sıfır say

2 500 kr/yıl uzatma, board'un "abonelik değil" kararının yeniden abonelik olarak geri
gelmiş hali — üstelik en zor koşullarda: satın alma kararını veren kişi büyük ihtimalle
şirkette değil, proje kapanmış, fatura tanımadığı bir kalem olarak masaya düşüyor.

Yenileme oranı bu modeldeki en kritik bilinmeyen ve **beş yıl boyunca test edilemez.**

İş geliştirme açısından kural nettir: test edilemeyen ve beş yıl sonra gelecek geliri
plana koyma. Gelirse yukarı yönlü sürpriz olsun. Bu, 600 000 hedefinin tamamının
etablering ve formidlingden gelmesi gerektiği anlamına geliyor — ki §2'ye göre pratikte
tamamı etableringden gelmeli, yani **yılda 40 proje.**

40 proje, 4–8 firmadan demek: her firma yılda 5–10 proje arşivliyor, ilk yıldan
itibaren, referans yokken, tek kişilik bir tedarikçiye. Bu bir hedef değil, iyimser bir
senaryo. İlk yıl için gerçekçi bant bence **3–8 proje.** Onu da 90 günde üç müşteri
hedefi zaten söylüyor — Vedtak 1 ile Vedtak 9'un rakamları birbiriyle konuşmuyor.

---

## 5 · Hendek yok, ve olmaması sorun değil — ama fiyatlama öyle varsaymamalı

Vedtak 11 hendeği üç kalemde tanımlıyor: yayımlanmış standart, müşterinin sendeki
geçmişi, zamanla artan geçiş maliyeti.

Dürüst okuma:

- **Yayımlanmış standart hendek değil.** Yayımlamanın amacı kopyalanabilir olması.
  Bu doğru bir strateji ama savunma değil, dağıtım.
- **Geçiş maliyeti gerçek ama yıllar alıyor.** Yıl 1'de sıfır.
- **Müşteri geçmişi gerçek** ve tek gerçek olan.

Yani 1–3. yıllarda hendek yok. Bu normal ve kabul edilebilir — ama iki sonucu var:
premium fiyatı savunmak zorlaşır, ve daha büyük biri aynı işi yapmaya kalkarsa
elinde tutunacak bir şey olmaz.

**Buradan çıkan asıl fırsat şu, ve materyalde hiç kullanılmamış:** hendek standardın
*kendisi* değil, standardın **müşterinin kendi iç düzenine yerleşmesi.**

Bir entreprenør senin fase listeni (GRUNN · RÅBYGG · TETT · INNV · FERDIG · AVVIK) ve
sone yapını kendi klasörlerinde kullanmaya başladığında, geçiş maliyeti dosya
taşımaktan ibaret olmaktan çıkıp *alışkanlık değiştirmek* olur. İşte hendek budur.

Sonuç: **metadatastandardı agresif biçimde ve bedavaya dağıt.** Müşteri olmayanlara da.
İndirilebilir tek A4 olarak siteye koy, prisstesten görüşmelerinde bırak, LinkedIn'de
paylaş. Bugün gelir getirmez; iki yıl sonra kimin arşivini kimin tuttuğunu belirler.

Bu, Vedtak 13'ün (åpenhet dokümanları) doğal uzantısı ve onunla aynı mantıkta — ama
board bunu güven aracı olarak konumlandırmıştı, dağıtım aracı olarak değil. İkisi de
doğru; ikincisi daha değerli.

---

## Bir de şirket mi iş mi sorusu

I koltuğu sak 8'de "ürün hevesli bir iş" dedi ve haklı. Yukarıdaki düzeltmelerden sonra
da öyle kalıyor: 600 000 kr, tek kişi, tek bölge.

Bunda kötü bir şey yok. Ama bir sonucu var ve tutarlılık gerektiriyor: **iş olduğunu
kabul edersen, şirket biçimli şeyleri optimize etmeyi bırakırsın.** Platform mimarisi,
çok dillilik, API, ölçeklenebilir doğrulama iş akışı — bunların hiçbiri 40 projelik bir
operasyonun ihtiyacı değil, ve son bir yılda üretilen materyalin çoğu tam da bunlar için.

Şirkete dönüşme yolu bir tane: standardın senden bağımsız olarak kullanılmaya
başlaması. O da §5'teki dağıtım kararına bağlı, kod yazmaya değil.

---

## Somut olarak ne değişsin

| # | Değişiklik | Nerede |
|---|---|---|
| 1 | Ön ödemeli saklamanın muhasebeleştirilmesi | Regnskapsfører görüşmesine 3. soru |
| 2 | Alternatif fiyat yapısı (10 000 + 1 500/yıl) test edilsin | Prisstesten'e 5. soru |
| 3 | Formidling kâr değil, edinme kanalı olarak planlansın | Model varsayımı |
| 4 | Teslimata proje *sırasında* kullanılan bir çıktı eklensin | Pilot tanımı |
| 5 | Yıl 6–10 geliri planda sıfır sayılsın | Model varsayımı |
| 6 | 40 proje/yıl hedefi ile 90 günde 3 müşteri hedefi uzlaştırılsın | Vedtak 1 ↔ 9 |
| 7 | Metadatastandardı herkese açık dağıtılsın | Vedtak 13 kapsamı genişlesin |

Bunlardan 1 ve 2 zaten planlanmış iki görüşmeye birer soru eklemekten ibaret. 3, 5 ve 6
sadece varsayım düzeltmesi, maliyeti yok. 4 pilot tanımını değiştiriyor — asıl iş orada.
7 bir karar, bir saatlik yazı işi.

---

## Değinmediğim şey

Rakamların hepsi varsayıma dayanıyor: depolama hacmi, GB fiyatı, çekim yoğunluğu.
İlk pilot bunları ölçecek ve muhtemelen bir kısmını yanlış çıkaracak. Amaç doğru rakamı
vermek değil, **hangi rakamın modeli kırdığını göstermek** — bu modelde o rakam,
proje başına GB ve yenileme oranı.

Muhasebe, vergi ve sigorta konuları bu dokümanın kapsamı dışında; §1'deki gelir
tanıma meselesi kesinlikle regnskapsfører'e sorulmalı.
