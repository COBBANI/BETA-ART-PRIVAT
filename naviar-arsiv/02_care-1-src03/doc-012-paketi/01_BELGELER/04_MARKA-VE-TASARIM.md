# Marka, görsel tasarım ve erişilebilirlik

NAVIAR-CARE-001-WEB-01 · DOC-012/04 · Belge v1.0 · 2026-09-05

Tasarım, yaşlı kullanıcıların ve yakınlarının sakin biçimde okuyabildiği bir hizmet sayfası olarak hazırlanmıştır. İlk ekranda bir ana görev vardır: uygun desteği anlamak. Fotoğraf ve geniş boşluklar duygusal bağ kurarken hizmet örnekleri, fiyat açıklaması ve demo bildirimi beklentiyi somutlaştırır.

| Tasarım öğesi | Kaynaktaki değer | Kullanım amacı |
| --- | --- | --- |
| Ana metin | --ink: #143D32 | Kırık beyaz üzerinde koyu metin |
| İkincil metin | --muted: #4D625B | Yardımcı açıklamalar |
| Zemin | --paper: #FCFBF7 | Sakin okuma alanı |
| Ana düğme | --green: #173F34 | Birincil eylem |
| Hafif zemin / çizgi | #EDF0E6 / #D5DCD2 | Bölüm ayırma |
| Vurgu / hata | #E5EAB3 / #9B3122 | Sınırlı vurgu ve hata durumu |
| Gövde yazısı | Arial/Helvetica; temel 18 px; paragraf 1.65 | Sistem yazılarıyla okunabilirlik |
| Ana başlıklar | Georgia/Times New Roman; esnek boyut | Belirgin görsel hiyerarşi |
| İçerik genişliği | En fazla 1320 px | Geniş ekranda kontrollü yerleşim |
| Ana / küçük düğme | En az 52 / 46 px yükseklik | Kolay hedefleme |
| Odak | 3 px #967426; 5 px dış boşluk | Klavyeyle konumun görünmesi |

**Logo:** assets/naviar-care-v03.svg, önceki seçimde kullanılan insan/kalp ailesinin v0.3 adayıdır. Bu teslim logoyu değiştirmez ve marka tesciline uygunluk onayı vermez. Önceki alternatifler, bugün kullanılan logoyla aynı şey değildir.

**Fotoğraf:** assets/hverdag.png, yaşlı bir kadınla yardımcıyı mutfakta sohbet ederken gösteren illüstratif görseldir. Sayfada yapay zekâ üretimi olduğu belirtilir; gerçek müşteri veya ekip fotoğrafı olarak kullanılmaz.

**Bileşenler:** Üst demo şeridi; logo ve gezinme; dil menüsü; ana görsel alanı; üç hizmet kartı; details/summary açıklamaları; süreç listesi; aile ve güven alanları; fiyat kontrol listesi; SSS; görüşme formu; kayıt kartları; durum mesajları; analiz tercihleri. Birincil eylemler yeşil, ikincil eylemler çizgili veya metin bağlantısıdır. Hata ve başarı yalnızca renkle anlatılmamalıdır.

**Duyarlı düzen:** Kaynakta 1200, 950, 700 ve 520 px eşikleri ile 1600 px üzeri ek kurallar bulunur. Küçük ekranda çok sütunlu alanlar tek sütuna iner, gezinme menü düğmesiyle açılır. Son kurallar önceki kuralları geçersiz kılabildiği için CSS yalnızca ilk tanımı okunarak değiştirilmemelidir.

Kabul hedefi olarak WCAG 2.2 AA değerlendirmesi önerilir: klavye, odak, etiket, durum mesajı, kontrast, büyütme ve yeniden akış birlikte kontrol edilmelidir. Bu hedef mevcut uygunluk sertifikası değildir. Standart dayanağı: [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/).

Dayanak: src/styles.css, src/render.js; logo seçim raporu. Bu turda tarayıcıdan yeni ekran görüntüsü alınmamıştır.
