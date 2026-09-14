# Açılış eksikleri, karar kaydı ve devir

NAVIAR-CARE-001-WEB-01 · DOC-012/19 · Belge v1.0 · 2026-09-05

Yazılımın mevcut özel demo kapsamı belgelenmiştir. Gerçek ev ziyareti, gönderici teslimi ve tahsilat için aşağıdaki bağımlılıklar kapatılmadan “hizmet açıldı” ifadesi kullanılamaz.

| Öncelik | Açık iş | Sorumlu rol | Kabul kanıtı |
| --- | --- | --- | --- |
| P0 | Resmî işletme, bölge, iletişim, fiyat ve koşullar | İşletme sahibi | Onaylı, yayımlanabilir kayıt |
| P0 | Yardımcı kabulü, eğitim, koordinatör ve yedek planı | Hizmet sorumlusu | Denenmiş operasyon ve rol ataması |
| P0 | Gerçek müşteri oturumu ve bildirim erişimi | Teknik sorumlu | Yetki ve dış Stripe bildirim testleri |
| P0 | Ödeme/gönderici hesapları ve ayrı sağlayıcı test ortamı | Hesap/teknik sorumlusu | Temsilî uçtan uca sonuç; sırlar ayrı |
| P0 | Gizlilik, saklama, paylaşım, sözleşme ve olay süreçleri | İşletme/veri sorumlusu | Gerçek kapsamla tamamlanmış belgeler |
| P0 | D1 migration, yedek ve geri yükleme | Teknik sorumlu | Geri yükleme prova kaydı |
| P1 | Mobil, klavye, ekran okuyucu ve ana dil kontrolü | QA/içerik sorumlusu | Görev bazlı test raporu ve düzeltmeler |
| P1 | Alan adı, SEO/index ayarları ve doğru işletme bilgileri | Teknik/içerik sorumlusu | Açılış alan adında kontrol |
| P1 | Kuyruk, saklama ve kapasite bakım rutini | Koordinatör/teknik sorumlu | Takvim ve sorumlu; uygulama kaydı |
| P2 | Tek dil sözlüğü, modüler Worker, HTTP yöntem kontrolü | Geliştirici | İlgili testlerle davranışın korunması |
| P2 | Büyük listeler için sayfalama, çoklu yardımcı kapasitesi | Ürün/geliştirme | İhtiyaç doğrulaması ve yeni veri modeli |

**Karar ve değişim izi**

| Aşama | Karar | Gerekçe / sonucu |
| --- | --- | --- |
| Discover / Define | Gündelik ve sosyal desteğe odak | Hizmeti anlaşılır ve sınırları açık tutmak |
| Design | Üç hizmet, üç dil, sakin tasarım ve v0.3 logo | Kullanıcı seçimi ve okunabilirlik |
| Build | Mevcut Worker + D1 altyapısını geliştirme | Kalıcı kayıt ve yönetimi koruma |
| Validate | Çakışma, tekrar, iptal ve ödeme korumaları | Yanlış/çift işlem olasılığını azaltma |
| Launch | Özel demo durumunu koruma | İşletme ve sağlayıcı bağımlılıkları açık |
| Document | DOC-012 ile kanıt ve kullanım kitabı oluşturma | Kod, eski rapor ve açık işi izlenebilir kılma |

**Ertelenen işler:** Otomatik yardımcı atama; sağlık triyajı; kişisel tahmin; abonelik; otomatik iade; klinik hizmet; görünmez takip. Bunlar mevcut projenin tamamlanmış özellikleri değildir. Gelecekte değerlendirilirse ayrı kapsam, veri ve kabul kararı gerekir.

**Devir kontrolü:** Proje kodu ve kaynak sürümü alıcı tarafından tanındı mı? ZIP açılıp envanter doğrulandı mı? Kurulum ve test komutları çalıştı mı? Admin/anahtar sahipliği işletmede mi? Kaynak ile üretim verisi farkı anlaşıldı mı? Açık işlere gerçek sorumlular atandı mı? Sonuçları yeni tarihli devir kaydına yazın.

Bu belgeleme çalışması proje kapsamını veya canlı siteyi değiştirmez. Ürün geliştirme sürümü ile ticari hizmetin açılışı ayrı kabul aşamaları olarak kalır. Önceki açılış hatırlatıcısı bu turda çoğaltılmamıştır.
