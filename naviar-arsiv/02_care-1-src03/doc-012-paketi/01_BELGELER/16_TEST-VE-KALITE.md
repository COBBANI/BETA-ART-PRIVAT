# Test, kalite kanıtı ve kabul planı

NAVIAR-CARE-001-WEB-01 · DOC-012/16 · Belge v1.0 · 2026-09-05

Bu belgeleme turunda son kayıtlı 2.4.0 kaynak sürümü yeniden derlendi ve mevcut testler çalıştırıldı: **37 test geçti; 0 başarısız, 0 atlanan**. Node sürümü 24.19.0’dır. Tam çıktı 02_DOGRULAMA/TEST-SONUCLARI.txt içinde yer alır. Sonucun dayandığı tam kaynak kimliği teslim envanterindedir.

| Grup | Test edilenler | Kanıtın sınırı |
| --- | --- | --- |
| Worker ve SQLite: 30 test | Üç dil, sahiplik, CSRF, müsaitlik, tekrar koruması, iptal, başvurular, yönetici değişiklikleri | Yerel SQLite/D1 benzeri adaptör; gerçek D1 dağıtımı değil |
| Ödeme/e-posta alt senaryoları | İmzalı olay, tutar/sürüm uyuşmazlığı, tekrar, eski girişim, demo engelleri, e-posta kuyruğu | Sahte sağlayıcı yanıtları; gerçek tahsilat veya teslim yok |
| Analiz ve tahmin alt senaryoları | İzin, demo/yönetici dışlama, toplu göstergeler, veri eşiği ve ayrı değerlendirme | Gerçek trafik veya tahmin başarısı ölçümü değil |
| DOM: 7 test | Enter akışı, saat seçimi, çift tıklama, kayıp yanıt, eski liste, dil bağlantısı, yenileme ve UUID geri dönüşü | Sentetik DOM; gerçek cihaz/ekran okuyucu değil |

Eski belgelerdeki 21, 27 ve 36 sayıları önceki çalışma noktalarını gösterir. Bu teslimdeki 37 sayısı yeniden çalıştırılmıştır. Kaynak değiştirilmeden ilave belge/rota/anahtar kontrolleri ek bir raporda yürütülür; 37 uygulama testinin sayısına karıştırılmaz.

**Manuel kabul senaryoları — tamamlanacak:**

1. NB/EN/TR ana sayfada hizmet ve demo açıklamasını bulma; rehbere ve fiyat alanına gitme.
2. Yalnızca klavye ile menü, dil, SSS, rehber, form ve analiz tercihlerini kullanma; odak kaybı ve kapanmayan katman olmaması.
3. 320 px genişlik, metin büyütme, 200%/400% yakınlaştırma, uzun Türkçe ve İngilizce metinlerle taşma kontrolü.
4. En az bir ekran okuyucuyla başlık sırası, alan etiketi, zorunlu alan, hata ve onay duyurularını deneme.
5. Uygun saat yok, saat başka kullanıcı tarafından alınmış, ağ kopmuş ve tekrar gönderim senaryolarında anlaşılır kurtarma.
6. Kullanıcı A’nın kaydına kullanıcı B’nin erişememesi; yönetici dışı hesabın yönetim yazma çağrılarının reddi.
7. Ayrı sağlayıcı test ortamında ödeme bildirimi erişimi, imza, tutar ve tekrar; e-posta gönderici/teslim kontrolü.
8. Gerçek D1 migration, yedek ve geri yükleme provası; ticari modda test saatlerinin sunulmaması.

WCAG kontrol planı teknik standarttan yararlanır; tek başına yerel testlerin geçmesi AA uygunluğunu göstermez. [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

Bu turda manuel tarayıcı, telefon, ekran okuyucu, bağımsız güvenlik ve canlı sağlayıcı testleri yapılmamıştır. Önceki sınırlı tarayıcı çalışması tarihsel rapor olarak korunur; yeni kapsamın yerine geçmez.
