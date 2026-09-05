# Gizlilik, güvenlik ve veri sorumlulukları

NAVIAR-CARE-001-WEB-01 · DOC-012/13 · Belge v1.0 · 2026-09-05

Mevcut uygulama sınırlı test görüşmesi ve mesaj kaydı tutar. Gündelik destek bağlamı hassas bilgi yazılmasına yol açabileceği için formlar sağlık bilgisi, kimlik numarası, BankID ve başkalarının bilgilerini istemez. Serbest metin alanı bunları teknik olarak tamamen engellemez; işletim süreci de gereklidir.

| Veri grubu | Amaç | Erişim / mevcut kontrol |
| --- | --- | --- |
| Ad, e-posta, hizmet ve görüşme saati | Ön görüşme kaydı ve takip | Kendi hesabı ve izinli yönetici |
| Başvuru metni ve durum | Sorunun ele alınması | Sahiplik sorgusu ve yönetici yetkisi |
| Teklif tutarı/sürümü ve sağlayıcı oturumu | Ödeme durumunun tutarlı tutulması | Sunucu denetimi; kart ayrıntıları uygulamada toplanmaz |
| Analiz olayları | İçerik kullanımı sayımları | İzin, sınırlı alanlar, toplu yönetim görünümü |
| İşlem izi ve sayaçlar | Yönetim izi ve istek sınırı | Sunucu/veritabanı |

Mevcut naviar_csrf çerezi Secure, HttpOnly, SameSite=Lax ve 7200 saniye sürelidir. Analiz tercihi çerezi naviar_analytics, 180 gün süreyle saklanır; kullanıcının tarayıcıda tercih değiştirmesi mümkündür. Platform oturum çerezleri bu uygulamanın yerel kodu dışında yönetilir.

**Kodda bulunan kontroller:** Parametreli SQL; HTML metin kaçışlama; same-origin/CSRF eşleşmesi; kullanıcıya ait kayıt sorguları; yönetici izin listesi; veri ve eylem doğrulaması; istek sayacı; CSP, nosniff, no-referrer ve kamera/mikrofon/konum kısıtları. Bunlar bağımsız sızma testi veya tam güvenlik onayı değildir. Worker’ın güvendiği kimlik başlıkları başka ortamda korunmadan kullanılamaz.

**Saklama:** Yönetici bakım eylemi 90 günden eski analiz olaylarını ve süresi geçmiş sayaçları siler. Bu işlem kendiliğinden zamanlanmış değildir. Görüşme, mesaj, audit ve ödeme kayıtları için otomatik saklama/silme takvimi uygulanmamıştır. Demo verisinin açılıştan önce temizlenmesi ayrıca planlanmalıdır.

Veri minimizasyonu, belirli amaç ve gerektiğinden uzun saklamama ilkeleri uygulama kapsamının ve saklama kararlarının değerlendirilmesinde temel alınmalıdır. Sorumlu işletme bu kararları gerçek hizmete göre belgelemelidir. [Datatilsynet: Personvernprinsippene](https://www.datatilsynet.no/rettigheter-og-plikter/personvernprinsippene/).

**Tamamlanacak işletme kayıtları:** Veri sorumlusu ve iletişim noktası; işleme amaçları ve dayanakları; işlemci anlaşmaları; erişim rolleri; saklama tablosu; hak başvurusu ve olay yönetimi; veri aktarımı değerlendirmesi; yedekleme ve geri yükleme; gerekli risk değerlendirmeleri. Bunların hukuki sonucu bu yazılım teslimiyle verilmez.

**Yakınlarla paylaşım:** Hizmet alıcısının kararı, hangi bilginin hangi kişiyle ve ne amaçla paylaşılacağını belirlemelidir. Koddaki relationship alanı bu izin kaydının yerine geçmez. Belgelerin ve referans iletişim bilgilerinin gizli kabul süreci ayrı tasarlanmalıdır; mevcut form dosya yüklemez.

**Anahtar yönetimi:** Gerçek anahtarlar yalnızca yetkili barındırma/sağlayıcı ayarlarında tutulur. .env.example boş şablondur. Kaynak ZIP’i gerçek sırları, veritabanı dökümünü veya kullanıcı oturumunu içermez.
