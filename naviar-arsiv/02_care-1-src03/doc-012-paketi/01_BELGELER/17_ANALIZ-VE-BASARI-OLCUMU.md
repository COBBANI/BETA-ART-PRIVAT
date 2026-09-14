# İçerik analizi, talep tahmini ve başarı ölçümü

NAVIAR-CARE-001-WEB-01 · DOC-012/17 · Belge v1.0 · 2026-09-05

Uygulama bir kullanıcının gerçekten okuduğunu veya anladığını bilemez. İzinli gerçek trafikte bir bölümün görünmesini, ön planda görünür kaldığı zamanı ve işaretli alandan sonraki adıma tıklamayı sayar. Bu sayımlar sağlık profili, otomatik triyaj veya bireysel ihtiyaç tahmini değildir.

**Ölçüm kuralları:** Yalnızca açık ticari moddaki ana sayfa; yönetici hariç; naviar_analytics=yes ve açık istek izni. Bölümler services, process, family, trust, prices, faq ile sınırlıdır. Olaylar view, engaged, book_click, guide_click, contact_click ile sınırlıdır. İçerik alanı görünür ve sekme ön plandayken toplam 10 saniye engaged sayılır. Görünürlük eşiği 0.12’dir.

Ad, e-posta, form metni, hesap kimliği ve kişisel URL sorgusu analiz tablosuna yazılmaz. Bellekte oluşan oturum kimliğinin özeti saklanır. Aynı oturum/olay/bölüm/gün tekrarları elenir. Sekmeler arası kalıcı kullanıcı takibi veya kayıt tamamlamaya kadar kişisel dönüşüm hunisi kurulmaz.

| Gösterge | Tanım |
| --- | --- |
| Bölüm görüntüleme / ilgili görüntüleme | Son 30 gündeki gerçek, izinli olaylar |
| Sonraki adım tıklaması | İşaretli bölümden rehber/görüşme/iletişim bağlantısı |
| Gerçek görüşme sayısı | Son 30 günde oluşturulmuş demo olmayan kayıt |
| İptal oranı | Aynı kayıt grubundaki iptal / toplam; toplam yoksa bilinmiyor |
| Açık başvuru | Demo olmayan new ve in_progress mesajlar |
| Görüşme doluluğu | Önümüzdeki 14 günün aktif gerçek saatlerinde dolu/toplam; toplam yoksa bilinmiyor |

İçerik inceleme önerisi için en az 20 görünüm ve %30’dan düşük ilgili görünüm oranı kullanılır. Bunlar geçici ürün eşikleridir; düşük oran otomatik olarak kötü metin veya memnuniyetsizlik anlamına gelmez.

**Talep tahmini:** Son 10 tamamlanmış UTC haftasında en az 40 gerçek talep ve en az 8 aktif hafta gerekir. 5–8. haftalarda dört haftalık ortalama ve önceki hafta yöntemleri karşılaştırılır; seçilen yöntem 9–10. haftalarda ayrıca değerlendirilir. Tahmin içinde bulunulan tam UTC haftası içindir. Gösterilen tarihsel aralık kalibre edilmiş güven/tahmin aralığı değildir. İki değerlendirme haftası güvenilirliği kanıtlamaya yetmez.

**İşletme başarısı — öneri:** Talebe yanıt süresi, gerçekleşen ön görüşme, ayrı onaylanmış ziyaret, görev tamamlanması, gecikme, tekrarlanan şikâyet ve kişinin tercihleri üzerindeki kontrol duygusu izlenebilir. Bunlar mevcut yazılımda ölçülmüş başarı göstergeleri değildir; saha kayıtları ve gönüllü geri bildirim süreci kurulmalıdır.

Dayanak: src/client.txt, src/insights.js, src/worker.js demandForecast ve ilgili testler.
