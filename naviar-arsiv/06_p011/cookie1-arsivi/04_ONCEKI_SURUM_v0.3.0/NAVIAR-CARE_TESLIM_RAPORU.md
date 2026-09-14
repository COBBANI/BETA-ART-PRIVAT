# NAVIAR CARE — geliştirme teslimi

**5 Eylül 2026 · P-011 · DRAFT-NC-COOKIE1 · v0.3.0**

Üç dilli geliştirme sürümü ve test edilebilir kaynak paketi hazırlandı. **Mevcut https://beta-art-cookie1.vercel.app/ adresi güncellenmedi; gerçek müşteri rezervasyonu, e-posta gönderimi ve ödeme açılmadı.**

## Hazırlananlar

- Norveççe Bokmål, İngilizce ve Türkçe; ortak anlam, açık eylem düğmeleri ve kullanıcıya göre düzenlenmiş metinler.
- Mevcut NAVIAR CARE marka adayına dayanan lacivert, yeşil ve açık zeminli tasarım; hizmet seçimi, üç adımlı süreç, yakınlar için ayrı açıklama, kapsam sınırları ve SSS.
- Yerel test başvurusu: tarih kontrolü, yinelenen gönderimin tek kayıt olması, talep sahibine özel durum/iptal erişimi.
- Sınırlı yönetim: erişim anahtarıyla oturum, insan incelemesi, test teklif tutarı ve aynı kaynak için randevu çakışması kontrolü.
- Stripe test Checkout adaptörü; sunucu tutarı, imza doğrulama, olay tekrar kontrolü. Resend test alıcısı, üç dilde bildirim ve gönderim kuyruğu.
- Reddedilebilir analiz izni, toplu içerik olayları ve veri kalitesi kontrolünden geçen tam haftalarla basit toplam talep tahmini.
- Hizmet operasyonu, kaynak kimliği, ölçü tanımları, karar günlüğü, test kanıtları ve canlıya geçiş listesi.

Metinlerde [Språkrådet’in klart språk rehberi](https://sprakradet.no/klarsprak/om-skriving/generelle-skriverad-bokmal/) esas alındı. Kısa cümleler, tanımlı görevler, görünür sonraki adım ve bilinmeyen fiyat/uygunluk durumunun açık belirtilmesi uygulandı. Resmî dil veya erişilebilirlik sertifikası iddiası yoktur.

## Dosyaları kullanma

**NAVIAR-CARE_P-011_COOKIE1_ONIZLEME.html:** Tek dosyalık görsel inceleme. NO / EN / TR bağlantılarıyla dili değiştirin; destek alanlarını, açıklamaları ve SSS'yi inceleyin. Bağımsız önizleme başvuru göndermez ve analiz olayı iletmez.

**NAVIAR-CARE_P-011_COOKIE1_KAYNAK_v0.3.0.zip:** Çalışan yerel uygulama, statik çıktılar, testler ve bütün belgeler. Çıkardıktan sonra Node.js 24+ ile `npm test`, ardından `npm start` çalıştırın. Ayrıntılar README dosyasındadır. Harici npm bağımlılığı gerekmez. Veritabanı ve sırlar arşive dahil edilmedi.

## Kanıt ve sınırlar

**10 sistem testi geçti; statik derleme başarılı.** Dil tamlığı, HTTP erişim sınırları, tekrarlanan başvuru, randevu çakışması, ödeme imzası/tutarı, test e-postası ve tahmin veri kuralları sınandı. Gerçek Stripe/Resend hesabıyla uçtan uca işlem yapılmadı.

Tarayıcı geliştirme sunucusuna bağlanamadı; yerel önizleme adresi güvenlik politikası tarafından engellendi. Bu nedenle masaüstü/mobil görünüm, klavye görevleri ve ekran okuyucu deneyimi doğrulanmış değildir. Dört temel renk çiftinde kontrast 5,95:1 ile 11,89:1 arasında hesaplandı; bu, tam [WCAG 2.2](https://www.w3.org/TR/WCAG22/) uygunluk denetimi değildir.

Tahminin çalışması için en az 12 tam ve operatörce veri kalitesi onaylanmış hafta gerekir. Bugün gerçek veri bulunmadığından panel veri yetersizliği gösterir. İçerik etkileşimi, bir metnin okunduğunu veya anlaşıldığını kanıtlamaz.

## Canlıya geçişi engelleyen somut noktalar

1. Cookie1 hedef projesinin kaynağına erişim doğrulanamadı. Önceki Vercel workspace sorgusu 403 verdi; bağlı BET - ART workspace farklı ve proje listesi boş. Doğru proje veya GitHub deposu bağlantısı gerekiyor.
2. Lovable'da ayrı geliştirme projesi oluşturma girişimi kredi yetersizliği nedeniyle tamamlanmadı. Mevcut farklı projeler değiştirilmedi.
3. Kalıcı üretim veritabanı, gerçek personel takvimi, müşteri teklif kabulü ve kişisel yönetim hesapları tamamlanmalı. Vercel statik önizlemesindeki API bilerek 503 döner; yerel SQLite serverless üretime taşınamaz.
4. İşletme kimliği, hizmet bölgesi/saatleri, fiyat/vergi ve iptal/iade koşulları belirlenmeli. Gönderici alan adı ve satıcı hesabı güvenli hesap ayarlarından bağlanmalı; sohbet içine parola veya API anahtarı yazılmamalı.

Önce doğru cookie1 projesi/deposu bağlantısı, ardından gerçek hesaplarla kontrollü entegrasyon ve tarayıcı doğrulaması gerekir. Ayrıntılı görev ve sahiplik tablosu kaynak paketindeki `docs/03_DOGRULAMA_VE_CANLIYA_GECIS.md` dosyasındadır.
