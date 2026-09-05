# NAVIAR Consult — Tasarım, Üç Dil ve Erişilebilirlik Rehberi

**P-010 / NVC-001 · WEB-11 · 5 Eylül 2026**

Bu rehber, NAVIAR Consult’un mevcut tasarım ve içerik kararlarını kaynak kodundan belgeler. Kod veya web metni değiştirilmemiştir. Kaynak commit’i `785123a41caa7bf2e1dd8767dcec5127d1e17b77`’dir. Aynı arşiv çalışmasındaki platform gözlemi ana siteyi `active`, erişimi `custom`, son platform sürümünü `8` olarak göstermiştir. Platformun sürüm sayacı ile belge/kod etiketi WEB-11 farklı kayıt sistemleridir; sayısal eşitlik beklenmez. NAVIAR Care ayrı projedir.

## Tasarımın hizmetle ilişkisi

Site yöneticiler, İK ve çalışanların danışmanlık kapsamını anlamasını hedefler. Ana yol; ihtiyacı seçme, NAVIAR Start kapsamını inceleme, yöntemi ve örnek çıktıyı görme, ardından görüşme sürecini anlama şeklindedir. Çalışanların ayrı bilgi yolu korunur. Hizmet rehberi dört açık seçim üzerinden ilgili içeriğe yönlendirir; eğitilmiş kişisel ihtiyaç tahmini değildir.

WEB-11 yöntem sayfası altı adımı numaralandırır: netleştirme, anlama, mevcut durumu inceleme, birlikte değerlendirme, uygulama ve öğrenme. Her adım somut çıktı gösterir. Yan kapsam panelinde 12 saat, 10 iş günü ve 30 günlük plan birlikte açıklanır. İşveren ve çalışanın rolleri ayrı kutulardadır. Son bölüm başvuru, ayrı randevu onayı ve yazılı anlaşma sırasını görünür kılar. Kaynak: `components/site/process-journey.tsx`, `components/site/services.tsx`, `components/site/service-guide.tsx`.

## Görsel sistem

`app/globals.css` içinde daha sonra tanımlanan NAVIAR değişkenleri başlangıç bileşen temasını geçersiz kılar. Aşağıdaki değerler gerçek kaynak karşılıklarıdır; ayrı bir marka tescili veya tasarım başarısı iddiası değildir.

| Kullanım | Değer |
|---|---|
| Kâğıt zemin | `#fbfaf7` |
| Ana yazı | `#142b36` |
| Lacivert yüzey/başlık | `#102b38` |
| Birincil düğme | `#112b37`, üzerinde beyaz |
| Yardımcı yazı | `#52636b` |
| Kenarlık | `#d7deda` |
| Altın vurgu | `#9a7842` |
| Görünür odak çizgisi | `#aa7e38`, 3 piksel; 5 piksel dış boşluk |

Gövde Arial/Helvetica/sans-serif, 16 piksel ve 1,7 satır yüksekliğidir. H1/H2 Georgia/Times New Roman/serif kullanır; genel H3 gövde ailesindeyken seçili kart/süreç başlıkları serif tanımlar. Yardımcı metin çoğunlukla 0,875 rem’dir. İçerik kabı en fazla 1240 piksel; uzun okuma alanı 820 pikseldir. Büyük ekran bölüm boşluğu 96 pikseldir. Ana düğmenin asgari yüksekliği 48 pikseldir. Fotoğraf, monogram, çizgiler ve geniş boşluklar hizmet metninin sırasını destekler.

## Duyarlı davranış

Kaynak eşikleri 1600, 1180, 1050, 850, 800, 600 ve 560 CSS piksel içerir. 1600 üzeri ana fotoğraf büyür. 1180 altında dış boşluklar daralır, üst çağrı düğmesi gizlenir. Daha sonra gelen 1050 kuralı masaüstü menüyü kapatıp mobil menüyü açar; yalnız önceki 850 kuralını okumak gerçek eşiği yanlış verir.

850 altında hizmet kartları ve süreç ana düzeni tek sütuna iner; sabit süreç özeti normal akışa döner. Yönetim başvuru kartı 800 altında tek sütundur. 600 altında ana görsel/metin, formlar, içerik kartları ve birçok bölüm tek sütun olur; kapsayıcı iki yanda 20 piksel bırakır. 560 altında süreç rol kutuları ve kapsam değerleri dikeyleşir. Yazdırma kuralları gezinmeyi, geri bildirimi ve düğmeleri gizler; süreç satırlarını mümkün olduğunca bölmeden tutar.

## Gerçek sayfa ve dil haritası

Ana adres `https://naviar-consult.andersen-betul.chatgpt.site`’dır. Tablodaki yollar bu adrese eklenir. 14 tür × 3 dil = 42 görünüm; yönetim dahil değildir. Yollar doğrudan `lib/content.ts` kaydından alınmıştır.

| Kimlik / sayfa | Norveççe Bokmål | İngilizce | Türkçe |
|---|---|---|---|
| `home` / Ana sayfa | `/nb` | `/en` | `/tr` |
| `services` / Hizmetler | `/nb/tjenester` | `/en/services` | `/tr/hizmetler` |
| `start` / NAVIAR Start | `/nb/naviar-start` | `/en/naviar-start` | `/tr/naviar-start` |
| `method` / Yöntem | `/nb/slik-jobber-vi` | `/en/our-approach` | `/tr/calisma-yontemimiz` |
| `employees` / Çalışanlar | `/nb/for-ansatte` | `/en/for-employees` | `/tr/calisanlar-icin` |
| `about` / Hakkında | `/nb/om-naviar` | `/en/about-naviar` | `/tr/naviar-hakkinda` |
| `insights` / Bilgi | `/nb/innsikt` | `/en/insights` | `/tr/bilgi` |
| `conversation` / İş görüşmesi rehberi | `/nb/innsikt/samtale-om-arbeid` | `/en/insights/workplace-conversation` | `/tr/bilgi/is-gorusmesine-hazirlik` |
| `expert` / NAV uzman desteği | `/nb/innsikt/nav-ekspertbistand` | `/en/insights/nav-expert-assistance` | `/tr/bilgi/nav-uzman-destegi` |
| `booking` / Görüşme talebi | `/nb/samtale` | `/en/conversation` | `/tr/gorusme` |
| `payment` / Ödeme | `/nb/betaling` | `/en/payment` | `/tr/odeme` |
| `privacy` / Gizlilik | `/nb/personvern` | `/en/privacy` | `/tr/gizlilik` |
| `terms` / Koşullar | `/nb/vilkar` | `/en/terms` | `/tr/kosullar` |
| `example` / Örnek çıktı | `/nb/eksempelleveranse` | `/en/sample-deliverable` | `/tr/ornek-rapor` |

## İçerik ve çeviri işletimi

`content/nb.json`, `en.json`, `tr.json` aynı kimlikleri kullanır. Dil seçimi ana sayfaya sıfırlamak yerine mevcut sayfanın karşılığına gider. HTML dil niteliği, başlık, açıklama, canonical ve dil alternatifleri sunucuda üretilir. Genel başlık şablonu `%s | NAVIAR`’dır. Ekli `page-register.csv`, kaynak metadata başlığını bu marka son eki olmadan saklar. Metadata bulunması indekslemeyi açmaz; mevcut sürüm `noindex` kullanır.

Yeni içerikte önce kapsam, sorumlu, çıktı ve sonraki adım yazılmalı; ardından aynı gerçekler üç dile aktarılmalıdır. Rakamlar, süreler ve durum etiketleri birlikte kontrol edilmelidir. 19.900 NOK, kaynakta önerilen deneme fiyatıdır; 12 saat ve 10 iş günüyle birlikte kesin ticari taahhüt olarak doğrulanmamıştır. Nihai fiyat, vergi, kapasite ve koşullar işletme tarafından kesinleştirilmelidir. Kurucu özgeçmişi ve resmî program anlatımları bu görevde yeniden dış doğrulamadan geçirilmemiştir. Ana dili konuşan editörün son kontrolü tamamlandı sayılmaz.

## Erişilebilirlik ve kanıt sınırı

Kaynakta içeriğe atlama bağlantısı, anlamlı gezinme etiketleri, `aria-current`, mobil menü durumu ve başlıklı diyalog bulunur. Form etiketleri alanlarla ilişkilidir; hata özeti `role=alert`, sonuç `role=status`, alanlar `aria-invalid` ve açıklama ilişkisi kullanır. Hata sonrasında odak ilk hatalı alana gider; onay kutusunun ayrı odak hedefi vardır. `prefers-reduced-motion` hareketi kapatır. Bununla birlikte mobil menü düğmesi kaynakta 36 × 36 piksel tanımlıdır; bütün hedeflerin 48 piksel olduğu söylenemez.

WEB-11 kayıtlı kanıtı 80 otomatik kontrolü ve 42 sunucu görünümünü kapsar; bu görev yeniden test çalıştırmamıştır. WEB-07’de 320/390/1280 CSS piksel çerçevelerde seçilmiş sayfalar, dil, menü ve form hataları incelenmiştir. Bu tarihsel gözlem WEB-11 yöntem düzeninin yeni mobil testi değildir. Tam ekran okuyucu, fiziksel telefon, bütün kontrast çiftleri ve tam WCAG uygunluğu doğrulanmış sayılmaz. Kaynaklar: `components/site/shell.tsx`, `transactions.tsx`, `app/layout.tsx`, `docs/NVC-001-GOV-07_Teslim_Kaydi.md`, `docs/NVC-001-WEB-11_Surec_ve_Dogrulama.md`.
