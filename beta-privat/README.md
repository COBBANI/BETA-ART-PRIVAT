# Beta Art Privat — kapsam belgesi

**Durum: iskelet.** Bu klasör 30.08.2026'da açıldı; içinde şu an yalnızca
`package.json` (kullanıcının verdiği özgün tanım) ve bu belge var. Aşağıdaki
her "bilinmiyor" işaretli madde, çalışan bir şey kurulmadan önce kullanıcıdan
gelmesi gereken gerçek girdidir — tahmin edilip doldurulmadı.

## Ne olduğu (verilenden — `package.json`'daki `description` birebir)

> Beta Art's own small-business workflows — cash, MVA and forskuddsskatt for
> a Norwegian enkeltpersonforetak, BAB pilot sales and contracts, BAC
> subscription clients, and BAP editions. Runs off accounting and bank
> exports, Stripe, and a pipeline file; drafts in Norwegian, Turkish or
> English by venture. You approve every step that touches money or a
> customer.

QBLOGG'un aksine bu bir **web sitesi değil** — Beta Art'ın kendi iç iş
işletim katmanı: nakit takibi, MVA (Norveç KDV'si) ve forskuddsskatt (peşin
vergi) beyanı, üç ayrı girişimin (BAB, BAC, BAP) satış/sözleşme/abonelik
işleri. QBLOGG bu üç girişimden biri değil; muhtemelen Beta Art'ın diğer
gelir kalemlerini (QBLOGG dahil, BAB/BAC/BAP ayrıca) tek bir muhasebe/vergi
görünümünde toplayan üst katman.

## Bilinmiyor / kullanıcıdan gelmesi gereken

Bunlar `package.json`'da adı geçip içeriği geçmeyen, bu yüzden **uydurulmadı**:

- **BAB / BAC / BAP açılımları** — "pilot satış ve sözleşmeler", "abonelik
  müşterileri", "editions" ötesinde ne oldukları, QBLOGG ve Naviar'la
  ilişkileri (ayrı girişimler mi, aynı işin farklı ürün hatları mı).
- **"Pipeline file"** — biçimi, konumu, kim/ne yazıyor.
- **Muhasebe/banka dışa aktarımı** — hangi banka/muhasebe yazılımı, hangi
  format (CSV/OFX/PDF), örnek dosya.
- **Stripe** — bu depoda henüz bağlı değil; MCP sunucusu (`Stripe`) bu
  oturumda **yetkilendirilmemiş** durumda. Bağlanınca hangi hesap/ürünler.
- **enkeltpersonforetak kimlik bilgileri** — org.nr., MVA kayıt durumu,
  vergi dönemi takvimi (bunlar depoya asla ham olarak yazılmaz — bkz. aşağı).

## Neden şimdi otomasyon kurulmadı

Bu, gerçek para ve gerçek vergi beyanına dokunan bir sistem. `package.json`
açıklaması zaten bunu söylüyor: **"You approve every step that touches money
or a customer."** Tek bir cümlelik tanımdan nakit/MVA/Stripe iş akışı inşa
etmek bu onay ilkesinin kendisini ihlal eder — kurulacak her adımın gerçek
girdilerle, kullanıcı onayıyla kurulması gerekiyor. Bu yüzden bu ilk commit
yalnızca **iskelet + kapsam belgesi**dir, çalışan bir betik değil.

## Sıradaki adım

Yukarıdaki "bilinmiyor" listesinden en az bir madde (özellikle: BAB/BAC/BAP
açılımları + banka/muhasebe dışa aktarım örneği) netleşince, ilk somut iş
parçası (ör. tek bir MVA dönem özeti ya da tek bir nakit akışı raporu)
tanımlanır ve *ondan sonra* kod yazılır — QBLOGG'un kendi ilkesiyle aynı:
"önce işi sabitle, sonra üret."

## Güvenlik notu

Bu klasöre hiçbir zaman ham banka/muhasebe verisi, API anahtarı veya vergi
kimlik numarası commit edilmez. Gerçek veriler `.gitignore`'a eklenecek yerel
dosyalarda veya bağlı servislerde (Stripe, muhasebe yazılımı) kalır; buradaki
kod yalnızca bunları *işleyen* mantığı taşır.
