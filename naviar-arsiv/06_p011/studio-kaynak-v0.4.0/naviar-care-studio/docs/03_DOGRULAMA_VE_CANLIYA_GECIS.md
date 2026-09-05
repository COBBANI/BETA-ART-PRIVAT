# Doğrulama ve canlıya geçiş durumu

P-011 · DRAFT-NC-COOKIE1 · v0.3.0 · 5 Eylül 2026

## Gerçekleşen kontroller

10 Node.js sistem testi geçti. Testler bellekteki ayrı SQLite veritabanında ve yerel HTTP sunucusunda çalıştı. Stripe ve Resend ağ çağrıları test doubles ile değiştirildi; gerçek kart, gerçek gönderim veya satıcı hesabı kullanılmadı.

| Kontrol | Sonuç |
|---|---|
| Tarih, Oslo gün sınırı, açık onay, fazladan hassas alan reddi | Geçti |
| Tekrarlanan gönderim, farklı gövde çatışması, tek e-posta ve tek talep sayacı | Geçti |
| Aynı yardımcı zaman çakışması ve en az 15 dakika aralık | Geçti |
| Webhook imzası, değişmiş gövde, eski zaman damgası | Geçti |
| Ödeme tutarı/oturumu eşleştirme, yinelenen olay, canlı olay reddi, ödenmiş durumun korunması | Geçti |
| Sunucu tarafından belirlenen fiyat, test anahtarı, Stripe Checkout alan adı | Geçti |
| E-postanın yalnızca test alıcısına hazırlanması, sağlayıcı kabulü ile teslimin ayrılması | Geçti |
| İzinsiz/kimlik içeren analiz olayının reddi, tam haftalar ve tahmin karşılaştırması | Geçti |
| Üç dilde içerik anahtarlarının tamlığı ve sunucu tarafında sayfa üretimi | Geçti |
| HTTP origin kontrolü, talep sahibine özel erişim, yönetim oturumu ve inceleme kapısı | Geçti |

Seçilmiş düz renk çiftlerinin WCAG formülüyle hesaplanan kontrastı: ana yazı/açık zemin 11,89:1; ikincil yazı/açık zemin 5,95:1; beyaz/yeşil düğme 7,97:1; açık yazı/lacivert bölüm 9,32:1. Bu sayılar tüm durumların görsel erişilebilirlik denetimi değildir. Referans hedef [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

Tarayıcı `terminal.local` geliştirme sunucusuna bağlanamadı. Bağımsız HTML dosyasının açılması Cloud browser URL güvenlik politikası tarafından reddedildi; bu engeli aşmaya çalışılmadı. Dolayısıyla gerçek tarayıcıda masaüstü görüntü, mobil taşma, klavye odağı, ekran okuyucu, görsel yakınlaştırma ve uçtan uca form tıklama testi tamamlanmadı. Lighthouse veya Core Web Vitals sonucu uydurulmadı. HTML, CSS ve JavaScript kaynakları ile HTTP davranışı sınandı; görsel onay ayrıca gerekir.

## Kaynak ve hesap ayrımı

| Kaynak / araç | Doğrulanan durum | Bu çalışmadaki işlem |
|---|---|---|
| Hedef cookie1 Vercel URL | Doğrudan erişim doğrulanamadı; kaynak proje alınamadı | Hedef sitede değişiklik/deploy yapılmadı |
| Önceki Vercel team | Hedefe ilişkin sorgu 403 verdi | Yetki aşılmadı |
| Bağlı BET - ART Vercel team | Erişilebilir; proje listesi boş ve hedef workspace ile farklı | Yanlış projeye bağlanılmadı |
| Mevcut CARE1 Sites projesi | Ayrı proje/sürüm kimliği doğrulandı | Yalnızca kaynak bağlamı incelendi |
| Mevcut CARE2 | Ayrı tıbbi konsept | Bu günlük destek sürümüne karıştırılmadı |
| Lovable Hjemmehjelp Norge | Ayrı mevcut MVP bulundu | Değiştirilmedi |
| Lovable geliştirme projesi oluşturma | Kredi yetersizliği nedeniyle başarısız | Yeni Lovable projesi oluşmadı |
| Malwarebytes URL sorgusu | `unknown` | Güvenli site veya tam uygulama denetimi diye sunulmadı |
| Exa / web araştırması | Hizmet ve resmî kaynaklar incelendi | Kavram, dil ve entegrasyon kararlarında kullanıldı |
| Data Analytics | Ölçü tanımları ve değerlendirme yaklaşımı kullanıldı | Gerçek veri olmadan sahte grafik üretilmedi |
| Wix / WebsitePublisher | Kullanım belgeleri incelendi | Aynı sitenin yeni bir sağlayıcıda kopyası açılmadı |
| Adobe / Canva / Figma | Mevcut marka adayı yeterli kaynak sağladı | Yeni tasarım projesi veya lisanslı varlık satın alma işlemi yapılmadı |

Bütün isimleri kullanmak profesyonellik ölçüsü değildir. Bu teslimde tek kaynak paketi ve tek entegrasyon sözleşmesi korundu. Bir aracın listede bulunması, hesap bağlantısı veya canlı kurulum anlamına gelmez.

## Canlı açılış için somut kalan iş

Önce doğru Vercel projesi veya ona bağlı kaynak deposu erişimi gerekir. Kullanıcıdan sohbet içine şifre/API anahtarı yazması istenmez; bağlantılar ilgili hesapların güvenli yapılandırmasıyla yapılmalıdır.

Sonra kalıcı veritabanı ve üretim çalışma düzeni kurulmalıdır. Önerilen Vercel mimarisi: Node API + kalıcı PostgreSQL, veritabanı işlem kilidi/çakışma kuralı, sunucu tarafı oturum ve rol denetimi, kuyruk worker'ı, gözlemlenebilir hata kayıtları ve geri yüklenebilir yedek. Bu adaptörler mevcut pakette uygulanmış değildir. Yerel SQLite test uygulaması doğrudan serverless üretim uygulaması olarak dağıtılamaz.

| Gerekli bilgi/iş | Neyi açar | Durum |
|---|---|---|
| İşletmenin yasal adı, organizasyon numarası, gerçek iletişim kanalı | Doğru footer, gizlilik ve sözleşme tarafı | Bekliyor |
| Onaylı bölge, personel saatleri, izin/tatil, ziyaret süresi | Gerçek uygunluk ve takvim | Bekliyor |
| Fiyat, vergi durumu, iptal, no-show, şikâyet ve iade koşulları | Teklif kabulü ve gerçek ödeme | Bekliyor |
| Kullanıcının/temsilcinin doğrulanması, ayrı erişim izinleri | Yakınlarla doğru bilgi paylaşımı | Tasarlandı; üretim uygulaması bekliyor |
| Stripe satıcı hesabı ve ödeme yöntemi seçimi | Sağlayıcı testinden sonra gerçek tahsilat | Test adaptörü var; canlı anahtarlar kapalı |
| Gönderici alan adı ve Resend bağlantısı | E-posta gönderimi, bounce/delivery takibi | Test adaptörü var; gerçek bağlantı yok |
| Uptime, kuyruk, ödeme mutabakatı, incident sahibi, yedek/restore | Sürdürülebilir operasyon | Bekliyor |
| Hedef kullanıcı testi ve canlı tarayıcı doğrulaması | Yayın kalitesi | Henüz yapılmadı |

Ödeme uygulama dayanakları: [Stripe webhooks](https://docs.stripe.com/webhooks) ve [Checkout Session oluşturma](https://docs.stripe.com/api/checkout/sessions/create). E-posta sözleşmesi: [Resend Send Email](https://resend.com/docs/api-reference/emails/send-email). Sağlayıcıdan başarılı HTTP yanıtı alınması tek başına ödeme uzlaşımı veya posta teslimi sayılmaz.

## Sonraki ürün geliştirmeleri

İlk açılış için insan destekli başvuru, doğru fiyat ve güvenilir takip önceliklidir. Daha sonra erişilebilir takvim/telefon alternatifi, gerçek görevli profilleri, müşteri izinleriyle doğrulanmış deneyimler, ziyaret sonrası geri bildirim, bekleme listesi ve uygun süreklilik planı eklenebilir. Sağlık sohbet botu, hassas ihtiyaç profili çıkarma, gizli oturum kaydı veya veri olmadan kişiye özel talep tahmini bu konseptin parçası değildir.
