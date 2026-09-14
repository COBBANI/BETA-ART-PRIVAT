# BETA ART BET — "Turn a memory into art." — konsept değerlendirmesi

**Durum: TASLAK, en erken aşama.** Girdi tek bir isim + slogandı; bu belge
onu bir ürün fikri olarak açar, varsayımları açıkça işaretler, karar
kullanıcıya bırakılır. İşaretler: [V] doğrulanmış (depoda/sitede kanıtı
var) · [H] hipotez · [D] dış iddia (kaynağı belgede).

Tarih: 26.08.2026.

## 0. Elimdeki tek girdi ve ondan çıkardığım varsayım

Görev metni yalnızca şuydu: *"BETA ART BET — Turn a memory into art."*
Kapsam, hedef kitle, teknik tercih, QBLOGG ile ilişki — hiçbiri
belirtilmedi. Aşağıdaki okuma **varsayımdır**, tek okuma değildir:

- **"BETA ART"** halihazırda gerçek: Stripe hesabının adı [V] ve Vercel
  takım adı "BET - ART" [V] — ikisi de `docs/odeme-sistemi.md` ve
  `CLAUDE.md`'de kayıtlı. Yani BETA ART, QBLOGG'un **üstündeki şirket/stüdyo
  kimliği**; QBLOGG onun tek ürünü.
- **"BET"** muhtemelen kullanıcının adının kısaltması (Betül) [H] — ikinci
  bir marka değil, aynı BETA ART adının tekrarı/vurgusu olabilir.
- **"Turn a memory into art"** QBLOGG'un teklifiyle (B2B içerik hattı)
  örtüşmüyor. Bu yüzden en olası okuma: **BETA ART şemsiyesi altında,
  QBLOGG'dan ayrı, tüketiciye dönük yeni bir ürün fikri** — kişisel bir
  anıyı (fotoğraf, hikâye, ses) görsel bir sanat eserine dönüştüren bir
  hizmet. Alternatif okuma: bu yalnızca bir marka sloganı arayışı, ürün
  değil — o zaman bu belgenin çoğu erken gelmiş demektir.

Bu belge birinci okumayı (yeni ürün) izliyor çünkü aksiyona dönüştürülebilir
tek yorum bu; ama karar kullanıcıda (bkz. §6).

## 1. Fikir (varsayılan okumayla)

Kullanıcı bir anıyı yükler — fotoğraf, kısa bir hikâye metni, belki bir ses
notu. Hizmet bunu bir sanat eserine dönüştürür: dijital illüstrasyon,
"yağlı boya" / "suluboya" gibi bir stilde portre, ya da basılabilir bir
poster. Çıktı hediye edilebilir, çerçeveletilebilir veya dijital olarak
paylaşılabilir.

Bu, QBLOGG'un iş modelinden (B2B, tekrarlayan abonelik, içerik hattı)
temelden farklı: **B2C, tek seferlik veya hediye amaçlı satın alma,
duygusal/kişisel konumlanma.**

## 2. Dürüst değerlendirme

**Güçlü yanlar [H]:**

- Kanıtlanmış bir pazar kategorisi: "fotoğraftan portre/tablo" hizmeti
  (Etsy'de binlerce satıcı, "custom pet portrait", "line art from photo"
  gibi alt kategoriler) zaten var ve talep görüyor — ama bu iddia bu
  ortamda doğrulanamadı [D, kaynak adresi yok, kullanıcı tarafından teyit
  edilmeli].
- BETA ART çatısı altında ikinci bir ürün, tek ürüne bağımlılığı azaltır.
- Teknik yüzey küçük tutulabilir: görsel üretim/düzenleme için bu ortamda
  zaten bağlı bir araç seti var (Adobe for Creativity MCP: arka plan
  kaldırma, stil/vektörleştirme, üretici dolgu) — sıfırdan bir görsel
  üretim motoru kurmak gerekmeyebilir.
- Ödeme ve üyelik altyapısının bir kısmı zaten kurulu: Stripe hesabı [V]
  ve `uye/` Supabase sistemi [V] QBLOGG için var; ikinci bir ürüne
  genellenebilir (ayrı fiyat/ürün kaydı ile).

**Riskli yanlar (açıkça):**

- **Bu, üçüncü/dördüncü stratejik yön oluyor.** `ROADMAP.md` ve
  `docs/is-modeli.md` zaten Studio → Intelligence → Yazar Platformu
  sıralamasını tartışıyor; hiçbiri kanıt eşiğine ulaşmadan dördüncü bir
  yön eklemek dikkati daha da dağıtır. Bu risk `docs/yazar-platformu.md`
  §2'de aynı dille zaten kayıtlı — aynı uyarı burada da geçerli.
- **Telif ve kişisel veri yükü farklı bir sınıf.** Kullanıcı fotoğrafı
  yüklüyor demek; bu KVKK/GDPR açısından QBLOGG'un bugünkü veri işleme
  yüzünden (isim + e-posta) daha ağır bir kategori (görsel, olası üçüncü
  kişi görüntüsü). `gizlilik.html` bu senaryoyu kapsamıyor — yeni bir
  hizmet aynı gizlilik metnine sığmaz, ayrı ek gerekir.
- **Üretici görsel modelin telif durumu belirsiz.** Hangi model/API
  kullanılırsa kullanılsın, çıktının ticari kullanım hakkı ve eğitim
  verisi kaynağı sözleşme düzeyinde doğrulanmalı — "muhtemelen sorun
  olmaz" burada yeterli değil, bu iş bir kez yanlış çıkarsa itibar
  maliyeti yüksek.
- **Marka karışıklığı.** QBLOGG ziyaretçisi "içerik hattı satın alan
  şirket"; BETA ART BET ziyaretçisi "hediye arayan birey". Aynı alan
  adında/menüde birleştirmek ikisini de sulandırır — ayrı site/alan adı
  gerekebilir.
- **Fiyatlandırma ve maliyet zinciri henüz kurulmadı.** Görsel üretim
  API maliyeti, işlem başına kaç dakika insan denetimi gerektiği,
  basılı ürün varsa kargo/üretim ortağı — hiçbiri bu belgede yok çünkü
  hiçbiri girdi olarak verilmedi.

## 3. QBLOGG ile ilişki — üç seçenek

| Seçenek | Ne demek | Artı | Eksi |
|---|---|---|---|
| **A. Tamamen ayrı ürün** (öneri, belirsizlik yüksekken) | Ayrı alan adı, ayrı marka sayfası; yalnızca şirket kimliği (BETA ART) ve ödeme/üyelik altyapısı ortak | Marka karışıklığı yok; QBLOGG'un kalite iddiası korunur | Sıfırdan tanıtım sayfası, sıfırdan pazar doğrulaması |
| B. QBLOGG içinde yeni bir bölüm | `index.html`'e üçüncü bir hizmet kartı | En hızlı görünürlük | B2B ↔ B2C karışımı; mevcut ziyaretçi kitlesi yanlış kitle |
| C. Yalnızca marka/slogan güncellemesi | Ürün değil, BETA ART'ın genel tanıtım cümlesi | En düşük risk | Aksiyon gerektirmez, bu yüzden en olası yanlış yorum |

## 4. Teknik yapı — eğer A ile ilerlenirse (taslak)

QBLOGG'un "sıfır bağımlılık, derleme adımı yok" ilkesi (`CLAUDE.md` §Teknik
yapı) burada da makul bir başlangıç noktası, çünkü kullanıcı yükleme +
görsel üretim + ödeme akışı üçü de sunucu tarafı gerektirir — yani QBLOGG'un
statik-site modelinden zaten ayrışır. Somut olası bileşenler:

1. **Yükleme + form**: statik bir sayfa, dosya yükleme `uye/`deki gibi bir
   Supabase Storage'a gidebilir.
2. **Üretim adımı**: bu oturumda bağlı Adobe for Creativity araçları
   (arka plan kaldırma, stil dönüştürme, vektörleştirme, üretici dolgu)
   bir prototip için yeterli olabilir; ölçekte hangi modelin kullanılacağı
   ayrı bir karar (maliyet + telif + kalite üçgeni).
3. **Ödeme**: Stripe hesabı zaten var [V]; yeni ürün için ayrı
   Product/Payment Link kaydı yeterli, yeni entegrasyon gerekmez.
4. **Teslimat**: dijital indirme mi, basılı gönderim mi — bu tek başına
   iş modelini değiştirir (basılıysa üretim/kargo ortağı gerekir).

Bunların hepsi **prototip düzeyinde konuşma**; hiçbiri kurulmadı.

## 5. Açık sorular (karar kullanıcıda)

1. Bu gerçekten yeni bir ürün mü, yoksa yalnızca BETA ART için bir
   slogan/konumlandırma arayışı mı?
2. Ürünse: girdi ne (fotoğraf mı, metin/hikâye mi, ikisi mi)? Çıktı ne
   (dijital dosya mı, basılı ürün mü)?
3. Hedef kitle: hediye alan bireysel tüketici mi, yoksa kurumsal bir
   kullanım (örn. şirket etkinlik hatırası) mı?
4. QBLOGG ile aynı sitede mi, ayrı alan adında mı?
5. Fiyatlandırma modeli: tek seferlik mi, paket mi?

## 6. Sonraki adım

Bu belge bir taahhüt değil, bir çerçeve. Yukarıdaki sorulara yanıt
geldiğinde bu dosya güncellenir ve (A seçilirse) bir sonraki adım QBLOGG'un
`docs/yazar-platformu.md` ile aynı formatta bir "v1 mimarisi" bölümü
olur. Kapanan bir aşama değil, bu yüzden `docs/proje-gunlugu.md`'ye yalnızca
kısa bir not düşülüyor (bkz. o dosyadaki 26.08.2026 kaydı) — asıl karar
kaydı bu dosyadır.
