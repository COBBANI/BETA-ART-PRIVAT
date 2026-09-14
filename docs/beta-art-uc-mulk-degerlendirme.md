# Beta Art — "Üç Mülk, Tek Arşiv" konsept değerlendirmesi (AUTOPROMPT)

**Tarih:** 01.09.2026 · **Değerlendirilen:** `beta-art/` içindeki üç-mülk modeli
(BAP-01 Privat, BAG-03 Galeri/Etkinlik, BAB-02 Business), tek `beta-art.com`
alan adı altında.

**Kaynak notu:** Bu belge, kullanıcının onayladığı çok-uzmanlı "Fikir ve
Konsept Değerlendirme Ekibi" çerçevesiyle (AUTOPROMPT) yazıldı. Kanıt
etiketleri bu depoda yerleşik kural: **[V]** bu oturumda depodan/canlı
kaynaktan doğrulandı, **[H]** muhakeme/hipotez, **[D]** dış iddia,
doğrulanmadı. Kural gereği hiçbir sayı veya iddia doğrulanmış gibi
sunulmaz; eksik olan açıkça "TEYİT GEREKİYOR" ile işaretlenir.

---

## 1. Yönetici özeti

Beta Art, tek bir yetkinlik iddiası üzerine kurulu (**"gerçek-dünya görsel
kayıtları; bağlam, köken, hak ve geri-bulunabilirlikle"** [V, `BETA_ART_MASTER.md`
§2]) ve bunu üç ayrı ticari yüzeyde ifade ediyor: sanat fotoğrafı satışı
(Privat), sergi/etkinlik programı (Galeri) ve inşaat sektörü proje-kapanışı
dokümantasyon arşivi (Business). Üçü de `beta-art.com` altında ayrı dizinler
olarak (`/privat/`, `/events/`, `/business/`) tek markanın altında duruyor
[V, `BETA-ART-ROUTE-MAP.md`] — bu, master planın "ayrı Beta Art siteleri
açma" yasağıyla uyumlu bir çözüm [V, `BETA_ART_MASTER.md` §1, §7].

**Sonuç, önden söylenirse:** konsept mimari olarak tutarlı ve tek bir güçlü
fikre (doğrulanabilir gerçek-dünya kaydı) dayanıyor — ama üç mülkün **aynı
anda** ticarileştirilmesi bugünkü kanıt durumuyla desteklenmiyor. Doğrulanmış
talep sıfır, yayınlanmış fiyat neredeyse yok, hukuki kapılar (GDPR/DPA/AB-AEA
depolama) resmi olarak hâlâ açık [V, `BETA_ART_MASTER.md` §10, madde 6].
Toplam puan **51/100** — "konsepti veya kapsamı önemli ölçüde değiştir"
bandında. Ama bu, fikri reddetmek değil: aynı belgenin kendi §3'ü zaten
"önce 3 ödeyen Business pilotu, sonra yazılım" diyor [V] — bu değerlendirme
o disiplini bağımsız bir puanlamayla doğruluyor ve neyin önce, neyin sonra
geleceğini netleştiriyor.

## 2. Fikir ve problem tanımı

Beta Art'ın iddiası: gerçek kamerayla çekilmiş, kökeni izlenebilir,
lisansı yazılı görsel kayıtların —ister sanat fotoğrafı ister bir inşaat
projesinin kapanış belgeleri olsun— **AI ile üretilmiş/kaynağı belirsiz
içerik selinde** ayrı bir güven katmanı oluşturduğu [V, README: "Do not
use AI-themed visuals"; canlı site FAQ: "No. Every photograph... Nothing
is generated"]. Business tarafında somut problem daha keskin: bir inşaat
projesi bittiğinde, ekip dağılınca ve erişim değişince doğru dokümana
geri dönmek zorlaşıyor — slogan: **"Dokumentasjon som overlever
prosjektet"** [V, `BETA_ART_MASTER.md` §3].

## 3. Hedef kullanıcılar

| Mülk | Birincil kullanıcı | Kanıt durumu |
|---|---|---|
| Privat | Doğrulanmış/sınırlı-edisyon fotoğraf satın alan bireysel/kurumsal alıcı | [H] — profil hiçbir belgede somutlaştırılmamış |
| Business | Norveç'te küçük/orta inşaat firması, proje kapandıktan sonra dokümana ihtiyaç duyan taraf | [V] konumlandırma var, [D] gerçek bir firma adıyla temas henüz yok |
| Galeri | Sergiye gidecek yerel sanat izleyicisi/koleksiyoncü | [H] — mekân/tarih "TBD"/"Planned" durumda [V, canlı site metni] |

## 4. Kullanıcı ihtiyaçları

- Business: "kapanan projenin belgesi nerede, kime ait, ne kadar süre
  saklanacak" sorularına net cevap — bu, master planın "Retrieval, not
  storage" ilkesiyle örtüşüyor [V].
- Privat: "bu görsel gerçekten insan eliyle mi çekildi" güvencesi — ama
  bu ihtiyacın satın alma kararını ne kadar yönlendirdiği **TEYİT
  GEREKİYOR**; aşağıdaki pazar araştırması bu güvencenin pazarda henüz
  standart bir beklenti olmadığını gösteriyor.
- Galeri: fiziksel/sosyal deneyim ihtiyacı — ticari değil, marka
  güveni inşa etme ihtiyacı [H].

## 5. Pazar ve rakip analizi

**Business / proje-kapanış dokümantasyonu.** Kurumsal pazarda Autodesk
Forma'nın Handover aracı, Bluebeam ve Kahua gibi platformlar var; bunlar
büyük yüklenicilerin **aktif teslim** sürecini (as-built çizim, O&M
kılavuzu, garanti, uygunluk sertifikaları) yönetiyor, genelde 8-12 hafta
önceden planlanan bir süreç olarak konumlanıyor [D, WebSearch: Autodesk
Forma/Bluebeam/Kahua/Pype Closeout ürün sayfaları, doğrulanmamış ikincil
kaynak]. Bunların hiçbiri **"proje zaten kapandı, belge kayboldu, şimdi
kurtarma lazım"** senaryosuna odaklanmıyor — Beta Art Business'ın
"Completed Project Rescue" konumlanması bu boşlukta [H, gerçek rakip
karşılaştırması yapılmadı, yalnızca ürün sayfası taraması].
Kaynaklar: [Autodesk Forma Closeout](https://construction.autodesk.com/tools/closeout/),
[Bluebeam Handover](https://www.bluebeam.com/workflows/project-handover/).

**Privat / doğrulanmış fotoğraf lisanslama.** Stocksy United, fotoğrafçıya
standart lisansta %50, genişletilmiş lisansta %75 telif ödüyor, abonelik
yok, üç çözünürlük kademesi var ($35/$85/$135) [D, WebSearch, Photutorial/
Wikipedia ikincil kaynak]. Getty ise %20-30 telif ödüyor ama artık
abonelik modeline geçti (Temmuz 2026) [D]. Beta Art'ın kr 190 (~18 USD)
başlangıç fiyatı bu ikisinin de altında — ama bu düşük fiyat "sınırlı
edisyon, doğrulanmış eser" konumlandırmasıyla çelişiyor: prim fiyatlı bir
konum iddia edip giriş fiyatını ucuz tutmak, markanın kendi iddiasını
zayıflatıyor [H].

**C2PA/köken doğrulama pazarı geneli.** 2026 itibarıyla C2PA hâlâ "kabul
döngüsünde", çevrimiçi yayınlanan fotoğrafların büyük çoğunluğu hâlâ
C2PA meta verisi taşımıyor [D, WebSearch, SoftwareSeni/C2PA Viewer ikincil
kaynak — birincil C2PA.org verisi bu oturumda doğrulanmadı]. Bu, Beta
Art'ın "verified human photography" farklılaşmasının **doğru yönde ama
erken** olduğu anlamına geliyor: alıcı kitlesi bu ayrımı henüz aramıyor
olabilir.
Kaynaklar: [Stocksy vs Getty karşılaştırması](https://photutorial.com/stocksy-review/),
[C2PA 2026 durumu](https://www.softwareseni.com/c2pa-adoption-in-2026-hardware-platforms-and-verification-reality/).

**Galeri/Etkinlik.** Doğrudan rakip analizi yapılmadı — bu mülk gelir
merkezi değil, marka/güven inşası aracı olarak konumlanmış [V, canlı site:
"an opportunity to experience the archive in print — and to meet the
photographer"].

## 6. Temel fırsatlar

1. **Business'ta gerçek ve az doldurulmuş bir niş:** "kapanmış proje
   kurtarma" hizmeti — büyük platformların hedeflemediği bir an [H].
2. **Tek marka, üç yüzey mimarisi zaten master planla uyumlu** — ayrı site
   açma riski yok, bu değerlendirmenin en sağlam bulgusu [V].
3. **Kod/tasarım varlığı zaten var:** React/Vite/Supabase Privat uygulaması,
   iki gerçek statik HTML sayfası (Business, Privat) arşivlendi — sıfırdan
   başlanmıyor [V, bu oturumun kendi arşivleme işi].
4. **Norveç KDV eşiği (50.000 NOK/12 ay) düşük** [V, önceki oturumda
   WebSearch ile doğrulandı, Skatteetaten/Altinn] — küçük ölçekte
   başlamanın bürokratik engeli düşük.

## 7. Eksikler ve kritik varsayımlar

- **Doğrulanmış talep sıfır.** Master planın kendi doğrulama kapısı ("3
  ödeyen Business pilotu") henüz karşılanmamış görünüyor [V, `BETA_ART_MASTER.md`
  §3 bunu açıkça "gate" olarak tanımlıyor, tamamlandığına dair kanıt yok].
- **Business fiyatı hiçbir yerde yok.** Yalnızca "proje fiyat mantığını gör,
  20 dakikalık görüşme talep et" var [V, canlı site + `BETA-ART-PROJECT-CODES.md`]
  — bu bilinçli bir strateji (kişiye özel teklif) ama net kılınmalı.
- **Fotoğrafçı kimliği doğrulanmamış.** "84,000 frames since 2012" iddiası
  ve birinci-şahıs ses, önceki oturumda "yer tutucu mu gerçek mi" olarak
  işaretlendi, hâlâ açık [V, bu oturumun kendi bulgusu, `MANIFEST-live-homepage.md`].
- **Hukuki kapılar resmen açık.** GDPR/veri sorumlusu-işleyici rolü ve
  AB/AEA depolama modeli Business dosya kabulünden ÖNCE netleşmeli diye
  master planın kendisi yazıyor [V, §10 madde 6] — bugün netleşmemiş.
- **"Field Notes" mülkünün statüsü belirsiz.** Sohbete yapıştırılan marka
  görsellerinde dördüncü bir kart olarak görünüyor ("BETA ART · FIELD
  NOTES") ama resmi üç-kod listesinde (BAP/BAG/BAB) yok [V, bu oturumun
  önceki bulgusu] — ayrı bir ticari mülk mü yoksa üçünü de besleyen bir
  içerik katmanı mı, netleşmedi.
- **Kurucu/ekip kapasitesi bilinmiyor.** Kaç kişi çalışıyor, günde kaç saat
  ayrılabiliyor — hiçbir belgede yok. Bu, operasyonel puanı doğrudan
  etkiliyor ve **TEYİT GEREKİYOR**.

## 8. Risk analizi

| Risk | Etki | Olasılık | Not |
|---|---|---|---|
| Üç mülke aynı anda dikkat dağıtma | Yüksek | Yüksek | Tek kişilik/küçük ekip [H] üç farklı satış hareketini (sanat, etkinlik, B2B danışmanlık-benzeri hizmet) aynı anda yürütmek zor |
| Business'ta müşteri dosyası hukuki kapı kapanmadan alınırsa | Yüksek | Orta | Master plan bunu zaten açık gate olarak işaretlemiş [V] |
| "Verified/doğrulanmış" iddiasının pazarda henüz karşılık bulmaması | Orta | Orta | C2PA benimsemesi hâlâ erken [D] |
| Fotoğrafçı biyografisindeki doğrulanmamış rakamın yayında kalması | Orta | Düşük-Orta | İtibar riski; "biyografi uydurulmaz" kuralı zaten var [V] ama rakam hâlâ canlı sitede |
| Dört çelişen klasör/dağıtım modelinin karar verilmeden koda geçmesi | Orta | Orta | Bu oturumda önceden tespit edildi, henüz çözülmedi [V] |

## 9. Üç konsept alternatifi

**A — Üç Mülk, Paralel Lansman (mevcut belgelenmiş plan).** Privat +
Galeri + Business aynı anda `beta-art.com` altında üç dizin olarak
yayında. Marka bütünlüğü güçlü, ama kanıt ve kapasite üçe bölünüyor.

**B — Önce Business, Tek Kapı (önerilen).** Privat ve Galeri kamuya açık
satıştan geçici olarak çekilir (kod/tasarım korunur, "hazırlanıyor" durumunda
kalır); tüm dikkat 3 ödeyen Business pilotuna gider. Site tek bölüm:
Business + minimal marka sayfası.

**C — Önce Privat, Sanat-Liderli Marka.** En çok inşa edilmiş yüzey
(React uygulaması, canlı site taslağı, katalog) öne çıkarılır; marka/basın/
SEO önce fotoğrafla kurulur, Business sonraya bırakılır. Riski: master
planın kendi Faz-1 ticari önceliğiyle (Business) çelişiyor [V] ve
"doğrulanmış fotoğraf" farklılaşması pazarda henüz erken [D].

## 10. Karşılaştırma tablosu

| Ölçüt | A: Paralel | B: Business Önce | C: Privat Önce |
|---|---|---|---|
| Problem-uyum | Orta | Yüksek | Düşük-Orta |
| Talep kanıtı hızı | Yavaş (bölünmüş) | Hızlı (odaklı) | Orta |
| Gelir hızı | Belirsiz | Orta (proje bazlı) | Yavaş (düşük fiyatlı ürün) |
| Kurucu yükü | Yüksek | Orta | Orta |
| Master plana uyum | Kısmi | Tam | Kısmi (çelişkili) |
| Hukuki risk | Yüksek (üçü birden) | Kontrollü (tek kapı) | Düşük (dosya alımı yok) |

## 11. Seçilen nihai konsept

**B — Önce Business, Tek Kapı.** Gerekçe: bu, uydurma bir öneri değil —
`BETA_ART_MASTER.md` §3'ün kendi "validation gate"iyle (3 ödeyen pilot,
yazılımdan önce hizmet) zaten aynı yönü işaret ediyor [V]. Bu değerlendirme
o kararı bağımsız puanlamayla teyit ediyor ve somutlaştırıyor: Privat ve
Galeri silinmiyor, yalnızca ticari olarak duraklatılıyor; kod ve tasarım
varlığı (React uygulaması, iki arşivlenmiş statik sayfa) korunur.

## 12. Değer önerisi ve farklılaşma

**Business için:** "Projeniz bitti, ekip dağıldı, belge hâlâ sizin —
biz onu bulunabilir tutuyoruz." Büyük platformlardan farkı: yazılım
satmıyor, önce hizmet satıyor; aktif teslim değil, **kapanmış** proje
kurtarma senaryosuna odaklanıyor [H, doğrudan rakip verisi yok].

**Privat/Galeri için (duraklatılmış durumda korunacak konumlandırma):**
"Sentetik değil, kaynağı belli, RAW'ı arşivde" — bu iddia güçlü ama
pazarın bunu henüz bir satın alma kriteri olarak görmediği unutulmamalı
[D].

## 13. İş ve gelir modeli

- **Business:** Proje bazlı, tek seferlik hizmet ücreti (abonelik değil)
  — master planın kendi tercihi [V, §3: "project-based pilot rather than
  subscription"]. Rakam **TEYİT GEREKİYOR** — hiçbir belgede yayınlanmış
  fiyat yok.
- **Privat:** kr 190'dan başlayan kişisel lisans + "price on request"
  ticari/genişletilmiş/özel lisans katmanları [V, canlı site].
- **Galeri:** Gelir modeli belgelerde yok — muhtemelen baskı satışı/bilet
  ama **TEYİT GEREKİYOR**.
- Norveç KDV eşiği 50.000 NOK/12 ay altında kayıt zorunlu değil [V,
  önceki oturumda doğrulandı] — erken aşamada bürokratik yük düşük.

## 14. MVP ve doğrulama planı

MVP zaten Business için doğru tanımlanmış: **3 ödeyen pilot müşteri,
büyük yazılım kurmadan** [V, §3]. Test edilecek varsayımlar:

1. Norveçli küçük inşaat firmaları, kapanmış proje belgesi kaybı için
   gerçekten ödeme yapar mı? (Bugüne dek kanıt yok.)
2. Manuel/insan-destekli bir "arşiv kurtarma" hizmeti, büyük platform
   kurmadan güven inşa edebilir mi?
3. Fiyat neresi? (Hiç test edilmemiş.)

Başarı kriteri: 60-90 gün içinde 3 imzalı, ödemesi yapılmış pilot.
Karşılanmazsa hedef kitle veya konumlandırma yeniden değerlendirilmeli.

## 15. Web sitesi ve hizmet mimarisi

Mevcut mimari (tek alan adı, üç dizin: `/privat/`, `/events/`,
`/business/`, ortak BETA ART navigasyonu ama paylaşılmayan ödeme/hesap/
hukuk akışları [V, `BETA-ART-ROUTE-MAP.md`]) **korunmalı** — yalnızca
lansman sırası değişiyor. Önerilen: `beta-art.com` şimdilik yalnızca
`/business/` bölümünü ve minimal bir marka/hakkında sayfasını canlıya
alır; `/privat/` ve `/events/` "yakında" durumunda, indexlenmeden kalır.

## 16. Aşamalı uygulama yol haritası

1. **0-2 hafta:** Business tek sayfa + rezervasyon CTA'sı yayına al;
   Privat/Galeri "yakında" durumuna al.
2. **0-4 hafta (paralel):** 10 gerçek görüşme hedefle, 3 imzalı pilot
   kapat; fiyat mantığını bu görüşmelerden netleştir.
3. **Görüşmelerden önce:** veri sorumlusu/işleyici rolü ve AB/AEA depolama
   modelini yazılı hale getir (dosya almadan önce zorunlu gate).
4. **60-90 gün checkpoint:** 3 pilot kapandıysa → Business'ı büyüt, sonra
   sırayla Privat/Galeri'yi aç. Kapanmadıysa → hedef kitle veya
   konumlandırmayı yeniden değerlendir.
5. **Business kanıtlandıktan sonra:** dört çelişen klasör/dağıtım
   modelinden birini seç (bu oturumda ayrı olarak takip ediliyor) ve
   Privat/Galeri'yi gerçek trafiğe aç.

## 17. 100 puanlık değerlendirme

| Ölçüt | Ağırlık | Puan | Not |
|---|---|---|---|
| Çözülen problemin önemi | 15 | 8 | Business'ta gerçek, Privat/Galeri'de zayıf/kanıtsız |
| Kullanıcı ihtiyacı ve talep | 15 | 5 | Doğrulanmış talep sıfır — master planın kendi gate'i henüz karşılanmamış |
| Ödeme isteği ve gelir potansiyeli | 15 | 5 | Business fiyatı hiçbir yerde yok; Privat fiyatı konumlandırmayla çelişiyor |
| Farklılaşma ve rekabet avantajı | 10 | 7 | "Kapanmış proje kurtarma" niş ve gerçek; C2PA farkı erken |
| Pazar ve büyüme potansiyeli | 10 | 5 | Dar, manuel, tek-kişi ölçeğinde başlıyor |
| Teknik uygulanabilirlik | 10 | 8 | Düşük risk — kod/tasarım zaten var, mimari basit |
| Operasyonel uygulanabilirlik | 10 | 4 | Üç farklı ticari hareketi aynı anda yürütmek yüksek yük [H] |
| Hukuk, güvenlik ve etik uygunluk | 5 | 3 | Gate'ler tanımlı ama henüz kapanmamış |
| Pazara giriş kolaylığı | 5 | 3 | Business'ta düşük (kişisel ağ), Privat'ta zor (soğuk pazar) |
| Kurucu ve ekip uyumu | 5 | 3 | Bilinmiyor — **TEYİT GEREKİYOR**, nötr puan verildi |
| **Toplam** | **100** | **51** | **50–64 bandı** |

## 18. Karar: Değiştir (kapsamı daralt)

**65-79 değil, 50-64 bandı** — "konsepti veya hedef kitleyi önemli ölçüde
değiştir." Ama bu fikri öldürmek değil: **konsept korunuyor, kapsam ve
sıra değişiyor.** Somut karar: **Business'a odaklan, Privat ve Galeri'yi
ticari olarak duraklat (kod/tasarım korunur), 60-90 gün içinde 3 ödeyen
pilot hedefle.** Bu koşullar karşılanırsa değerlendirme yeniden yapılıp
puan muhtemelen 65+ bandına çıkar; karşılanmazsa hedef kitle/konumlandırma
yeniden ele alınmalı.

## 19. İlk uygulanacak 10 somut görev

1. Norveç'te 3-5 gerçek küçük inşaat firmasını isim isim listele, bu hafta
   birebir görüşme talep et — site beklemeden.
2. Tek sayfalık, Norveççe "Project Closeout Archive" hizmet tarifi + somut
   fiyat mantığı taslağı yaz (bugün hiçbir belgede yok).
3. Veri sorumlusu/işleyici rolünü ve AB/AEA depolama modelini yazılı hale
   getir — herhangi bir müşteri dosyası almadan ÖNCE zorunlu.
4. `/business/` bölümünü tek başına yayına al; `/privat/` ve `/events/`'i
   "yakında" durumuna çek, indexlenmesin.
5. 10 görüşme tamamla; hedef 3 imzalı, ödemeli pilot.
6. Örnek (sahte/maskelenmiş) bir "kapanmış proje" teslimatı hazırla —
   master planın istediği "deliverables sample" [V, §10].
7. Fotoğrafçı kimliği ve "84,000 frames since 2012" iddiasını doğrula ya
   da siteden kaldır — biyografi uydurulmaz kuralı zaten var.
8. Dört çelişen klasör/dağıtım modelinden birine karar ver (ayrı konu,
   ama Business büyümeden önce çözülmeli).
9. 60-90 günlük go/no-go tarihini takvime koy, kriterleri yazılı yap.
10. Pilot sonuçlarına göre bu belgeyi güncelle ve Privat/Galeri'nin
    lansman tarihini yeniden puanla.

---

*Bu belge `docs/proje-gunlugu.md`'ye 01.09.2026 tarihli girişle
bağlanmıştır. Gelecekte yeni kanıt (pilot sonucu, fiyat, hukuki teyit)
geldiğinde bu belge güncellenir, silinmez.*
