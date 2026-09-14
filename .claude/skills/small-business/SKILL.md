---
name: small-business
description: Beta Art'ın küçük işletme operasyonu — nakit durumu, Norveç MVA (KDV) ve forskuddsskatt (peşin gelir vergisi) takibi, BAP/BAG/BAB hatlarına göre satış hattı ve sözleşme taslakları, Stripe'tan gelen ödeme/abonelik verisinin özeti. Şu isteklerde MUTLAKA bu beceriyi kullan: "kasada ne kadar var", "MVA ne zaman ödenecek", "forskuddsskatt hesapla", "Stripe'tan bu ayki geliri çek", "şu müşteriye sözleşme/teklif taslağı hazırla", "BAP/BAG/BAB durumu ne", "muhasebe dışa aktarımını işle", "faturayı taslakla" — hatta kullanıcı "muhasebe", "vergi", "nakit akışı" ya da bir ventür adını (BAP/BAG/BAB) geçirip QBLOGG kod tabanıyla ilgisiz bir şey sorduğunda da. Bu bir TASLAK ve HAZIRLIK aracıdır — parayı veya bir müşteriyi etkileyen hiçbir adımı (fatura gönderme, ödeme talebi, müşteriye mesaj) kullanıcı onayı olmadan göndermez/uygulamaz.
owner: Beta Art
version: 0.2.0
---

# Beta Art — küçük işletme operasyonu

Bu beceri, Beta Art'ın (bu deponun sahibi olan şirketin) günlük işletme
işlerini hazırlar: nakit durumu özeti, Norveç vergi takvimi (MVA,
forskuddsskatt), ventür bazlı satış hattı ve sözleşme taslakları. QBLOGG'un
kod/dağıtım operasyonundan (`qblogg-operasyon` becerisi) tamamen ayrı bir
alan — biri şirketin ürününü, biri şirketin kendi finans/satış işini
yönetir. İkisi aynı depoda yaşar ama karışmaz.

**Bu belge 25-26.08.2026 tarihli bir kullanıcı sohbetinden, dış bir
tanımdan (bkz. §7) türetilmiştir.** 02.09.2026'da iki geçiş oldu: (1) 3
eval üzerinden gerçek Stripe/banka-arama davranışıyla test edildi (bkz.
`small-business-workspace/iteration-1/benchmark.md` — 24/24 assertion
geçti, hem skill'li hem skill'siz koşumda; skill'in katkısı özellikle
ventür-kodu/dil doğruluğunda, temel "uydurma yok" davranışı Sonnet 5'in
zaten güçlü bir tabanı); (2) kullanıcıyla doğrudan netleştirme turu
yapıldı ve aşağıdaki maddeler **kesinleşti** — eskiden **TEYİT GEREKİYOR**
işaretli olan §2 (ventür yapısı, BAC kodu), §3c (pipeline dosyası) ve §4
(diller) artık kesin. Yalnız §1'deki forskuddsskatt taksit takvimi hâlâ
açık (kullanıcının kendi Altinn hesabından alınması gerekiyor, bu ortamdan
doğrulanamaz).

## 0. Tek ve değişmez kural: onay olmadan gönderim yok

Bu beceri **taslak üretir, işlem yapmaz.** Aşağıdakilerin hiçbiri
kullanıcının açık "gönder" / "onaylıyorum" onayı olmadan gerçekleşmez:

- Bir faturanın veya ödeme talebinin gönderilmesi
- Bir müşteriye e-posta/mesaj gönderilmesi
- Bir sözleşmenin imzaya/onaya çıkarılması
- Stripe'ta bir ürün, fiyat veya ödeme bağlantısı oluşturulması
- Vergi dairesine (Skatteetaten/Altinn) herhangi bir beyan gönderilmesi

Neden bu kadar katı: burada gerçek para, gerçek vergi yükümlülüğü ve
gerçek müşteri ilişkileri var. Yanlış giden bir taslak düzeltilebilir;
yanlış gönderilen bir fatura veya yanlış giden bir vergi beyanı
düzeltilmesi zor/maliyetli bir hataya dönüşür. Bu yüzden akış her zaman
**topla → taslakla → kullanıcıya göster → onay bekle → (onaylanırsa)
kullanıcı kendisi gönderir veya açıkça "gönder" der** şeklindedir.
`docs/odeme-sistemi.md`'de zaten aynı ihtiyat var: bu oturumdaki Stripe
erişimi salt-okunur, ürün/fiyat/Payment Link oluşturma kullanıcıda kalıyor.

## 1. Şirket yapısı ve vergi takvimi (Norveç)

Beta Art bir **enkeltpersonforetak** (şahıs işletmesi) olarak işletiliyor.
İki tekrarlayan yükümlülük:

| Yükümlülük | Eşik/kural | Kaynak |
|---|---|---|
| **MVA (KDV) kaydı** | 12 aylık herhangi bir dönemde net satış 50.000 NOK'u geçince Merverdiavgiftsregisteret'e kayıt zorunlu; eşik aşılır aşılmaz KDV'li fatura kesme yükümlülüğü başlar | Skatteetaten/Altinn — bu oturumda WebSearch ile doğrulandı (26.08.2026), ayrıca `docs/beta-art-konsept.md`'de kayıtlı |
| **Forskuddsskatt** | Şahıs işletmesi sahibi, yıl içindeki tahmini kazanca göre peşin gelir vergisi taksitleri öder (genelde çeyreklik) | **TEYİT GEREKİYOR** — kesin taksit tarihleri ve oranı Skatteetaten hesabından (Altinn) alınmalı, bu beceri tahmin üretmez |

Bu beceri **vergi danışmanlığı yapmaz** — rakamları toplar, taslak
hazırlar, ama "ne kadar vergi öde" kararını kullanıcı (gerekirse
muhasebeci ile) verir. Herhangi bir vergi rakamı sunulurken "örnek/tahmin"
olduğu açıkça yazılır (bkz. proje CLAUDE.md kural 8 — rakamlar örnek
olarak işaretlenir).

## 2. Ventürler: BAP-01, BAG-03, BAB-02

**Kesinleşti (02.09.2026, kullanıcı onayı):** üç proje, üç kod — "BAC"
diye ayrı bir hat yok, **BAG-03'ün yanlış yazımıydı**. Bu belgede ve
her taslakta yalnız BAP/BAG/BAB kullanılır; "BAC" görürsen (eski bir
notta, dışa aktarımda vb.) BAG-03 ile aynı şey say.

| Kod | Proje | Hedef klasör | Dayanak |
|---|---|---|---|
| **BAP-01** | Beta Art **Privat** — doğrulanmış insan fotoğrafı, edisyon, doğrudan lisans | `beta-art-privat/` | `BETA-ART-PROJECT-CODES.md` — [V] |
| **BAG-03** | Beta Art **Galeri**/Utstilling Event — sanatçı, eser, sergi, açılış, kültürel etkinlik | `beta-art-gallery-event/` | Aynı belge — [V] |
| **BAB-02** | Beta Art **Business** — inşaat sektörü proje-kapanışı dokümantasyonu (Completed Project Rescue) | `beta-art-business/` | Aynı belge; `BETA_ART_MASTER.md`'deki BAB tanımıyla tutarlı — [V] |

**Yapısal karar kesinleşti (02.09.2026, kullanıcı onayı): hedef yapı
üç ayrı proje klasörüdür** (`beta-art-privat/`, `beta-art-gallery-event/`,
`beta-art-business/`) — 26.08'de tek uygulama olarak göçürülen mevcut
`beta-art/` (React/Vite/Supabase) kodu **üretim kodu değil**, yalnızca
`beta-art-privat/app-reference/` altında bir referans olarak kalacak.

**Bu, henüz yapılmamış ayrı ve büyük bir iş olduğunu unutma:** bu karar
şimdilik yalnızca bu beceriyi ve onun varsaydığı hedef yapıyı günceller —
gerçek klasör taşıma/yeniden yapılandırma (repo kökünde `beta-art-privat/`,
`beta-art-gallery-event/`, `beta-art-business/` oluşturmak, `beta-art/`
kodunu `app-reference/` altına taşımak, `CLAUDE.md`'nin "Bu iki yapı henüz
uzlaştırılmadı" notunu güncellemek) **henüz uygulanmadı**. Bu beceri o
taşımayı kendiliğinden yapmaz — kullanıcı ayrıca isterse ayrı bir görev
olarak ele alınmalı; burada yalnızca hangi yapının **doğru** olduğu
kayıtlıdır.

**Not:** `docs/beta-art-konsept.md`'deki "AI destekli görsel tasarım
stüdyosu" yönü hâlâ reddedilmiş durumda — bu değişmedi.

## 3. Veri kaynakları

Üç kaynak var, üçü de **isteğe bağlı** — hangisi mevcutsa onunla çalış,
eksik olanı "bu veri yok, şunu istersen sağla" diye açıkça söyle, sessizce
atlamayın:

### 3a. Muhasebe / banka dışa aktarımı

**Kesinleşti (02.09.2026, kullanıcı onayı): kasıtlı olarak sabit bir
dosya yolu YOK.** Banka/muhasebe yazılımı değişebildiği için her
kullanımda kullanıcıya dışa aktarım dosyasını (CSV/Excel) nereye
koyduğunu sor — bu bir eksiklik değil, tercih edilen davranış. Bulunca
formatını (tarih, açıklama, tutar, para birimi sütunları) tek satırla
doğrula, sonra işle. Sabit bir yol varsayıp "bulunamadı" hatası vermek
yerine her seferinde sor veya `Glob` ile ara.

### 3b. Stripe

Stripe MCP araçları bu depoda mevcut ama **yetkilendirme gerektirebilir**
(bu belge yazılırken tam da bu durumdaydı — oturum başında "Stripe
yetkilendirme bekliyor" uyarısı geldi ve o oturumda hiç Stripe aracı
yüklenemedi). Her kullanımda:

1. `ToolSearch` ile `stripe` araması yap.
2. Gerçek bir Stripe aracı (örn. ödeme/abonelik listeleme) dönerse kullan.
3. Dönmezse veya çağrı yetki hatası verirse: kullanıcıya söyle —
   "Stripe MCP'si yetkilendirilmemiş; claude.ai bağlayıcı ayarlarından
   veya `/mcp` ile bağlaman gerekiyor" — ve o veri olmadan devam edip
   edemeyeceğini sor (örn. banka dışa aktarımıyla kısmen tamamlanabilir mi).
4. **Asla** "Stripe'tan X NOK geldi" gibi bir rakamı Stripe çağrısı
   gerçekten başarılı olmadan yazma — yetkisiz bir çağrının hata mesajını
   veri sanıp uydurmak, bu becerinin var olma amacına doğrudan aykırıdır.

### 3c. Satış hattı (pipeline) dosyası

**Kesinleşti (02.09.2026, kullanıcı onayı): oluşturuldu —
`isletme/pipeline.md`** (depo kökünde, QBLOGG'un kendi dosyalarıyla
karışmasın diye ayrı klasör). Üç ventür başlığı BAP-01/BAG-03/BAB-02
olarak kurulu, aşama sütunu `İlk temas → Teklif gönderildi → Görüşme →
Kazanıldı/Kaybedildi`. Yeni bir satış/teklif kaydı işlendiğinde bu
dosyayı güncelle; kullanıcı farklı bir aşama seti isterse onu kullan.

## 4. Diller

**Kesinleşti (02.09.2026, kullanıcı onayı):**

| Ventür | Varsayılan dil | Not |
|---|---|---|
| **BAB-02** | Norveççe | Yerel Norveç KOBİ'lerine satılıyor (inşaat/proje-kapanış dokümantasyonu) |
| **BAG-03** | Norveççe | Yerel galeri/sergi/etkinlik — ziyaretçi ve sanatçı çoğunlukla Norveç'te |
| **BAP-01** | İngilizce | Uluslararası koleksiyoncu/alıcıya satılabilir bir fotoğraf/edisyon hattı |

Bunlar **varsayılan**, kesin kural değil — belirli bir müşteri/alıcı
gerçekte farklı bir dil konuşuyorsa (ör. BAB müşterisi uluslararası bir
zincirse) taslaktan önce doğrula, varsayılanı körü körüne uygulama.
Türkçe yalnızca iç (Beta Art sahibiyle) yazışmada kullanılır, müşteriye
giden hiçbir taslakta değil (bkz. eval-1 sonuçları,
`small-business-workspace/iteration-1/`).

## 5. Tipik akış

1. Kullanıcı bir istek getirir ("bu ayki nakit durumu ne", "şu müşteriye
   BAB için teklif taslağı yaz", "MVA eşiğine ne kadar kaldı").
2. Hangi veri kaynağı/kaynakları gerekiyor, belirle (§3). Eksik olanı sor,
   sessizce atlama.
3. Rakamları/olguları topla, **hiçbirini uydurmadan**. Bir sayı
   doğrulanamıyorsa "doğrulanamadı" yaz, tahmin etme.
4. Taslağı hazırla (fatura taslağı, e-posta taslağı, sözleşme taslağı,
   nakit özeti — istenen ne ise).
5. Taslağı kullanıcıya göster, **§0'daki onay kapısını** hatırlat: "Bunu
   gönderirsem/uygularsam diye onay istiyorum, yoksa burada taslak olarak
   kalır."
6. Onay gelirse ve gönderim gerçekten bir araçla yapılabiliyorsa
   (ör. Stripe'ta bir işlem, e-posta gönderimi), kullanıcı açıkça "gönder"
   demeden çağırma.

## 6. `qblogg-operasyon` ile ilişki

`qblogg-operasyon` bu depodaki **kod ve dağıtım** işlerinin kurallarıdır
(kaynak doğrulama, commit sahipliği, dağıtım kontrol listesi). Bu beceri
onun yerine geçmez — ikisi birlikte, farklı katmanlarda çalışır: biri
"siteyi doğru şekilde nasıl değiştiririm", diğeri "şirketin parasını ve
satışını nasıl takip ederim." Bir görev ikisini de gerektiriyorsa (ör.
"QBLOGG'un Stripe geliri ne kadar, site fiyatlarını buna göre güncelle")
ikisini birden uygula.

## 7. Kaynak ve durum notu

Bu beceri, kullanıcının ilettiği şu dış tanımdan türetildi (v0.4.0 olarak
anılıyordu ama bu depoda daha önce hiç yoktu — bu, o tanımın SIFIRDAN
yazılmış ilk uygulamasıdır, önceki bir sürümün kopyası değil):

> "Beta Art's own small-business workflows — cash, MVA and forskuddsskatt
> for a Norwegian enkeltpersonforetak, BAB pilot sales and contracts, BAC
> subscription clients, and BAP editions. Runs off accounting and bank
> exports, Stripe, and a pipeline file; drafts in Norwegian, Turkish or
> English by venture. You approve every step that touches money or a
> customer."

**02.09.2026 güncellemesi:** yukarıdaki açık noktaların çoğu kullanıcıyla
doğrudan netleştirme turunda kesinleşti — BAP/BAG/BAB'ın tam anlamı ve
"BAC"in BAG-03 yazım hatası olduğu (§2), hedef klasör yapısının üç ayrı
proje olduğu (§2, ama fiziksel taşıma henüz yapılmadı — ayrı bir iş),
pipeline dosyasının konumu ve biçimi (§3c, oluşturuldu), dışa aktarım
dosyasının **kasıtlı olarak** sabit bir yolu olmadığı (§3a), ventür başına
varsayılan dil (§4).

**Tek kalan açık nokta:** forskuddsskatt'ın kesin taksit takvimi (§1) —
bu, kullanıcının kendi Altinn/Skatteetaten hesabından gelen kişisel bir
veri; bu ortamdan doğrulanamaz ve tahmin edilmemeli. Kullanıcı isterse
kendi hesabından bakıp buraya ekleyebilir, yoksa bu beceri her seferinde
"TEYİT GEREKİYOR, Altinn'den kontrol et" demeye devam edecek — bu, kalıcı
bir eksiklik değil, bilinçli bir sınır.
