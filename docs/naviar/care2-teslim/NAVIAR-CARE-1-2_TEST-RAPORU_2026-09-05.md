# NAVIAR CARE 1 ve 2 — Test raporu

Tarih: 5 Eylül 2026. Kapsam: mevcut iki projenin derlemesi, tüm mevcut otomatik test paketleri ve aşağıda belirtilen tarayıcı kontrolleri. Sonsuz olası senaryoların veya tüm cihazların test edildiği iddia edilmez.

| Kontrol | CARE 1 | CARE 2 |
|---|---|---|
| Üretim derlemesi | Başarılı | Başarılı |
| Otomatik işlem/istemci testleri | 37/37 geçti | 11/11 geçti |
| Üç dilde sayfa içerikleri | Otomatik test geçti | 27 yerelleştirilmiş sayfa + 9 uyumluluk/hata sayfası geçti |
| Kimlik, sahiplik ve CSRF sınırları | Yerel test geçti | Yerel test geçti |
| Rezervasyon, çakışma ve tekrar gönderim | Yerel test geçti | Yerel test geçti |
| İptal / kayıt sahipliği | Yerel test geçti | Yerel test geçti |
| Ödeme adaptörü ve imzalı webhook | Sentetik / sahte sağlayıcı testleri geçti | Sentetik / sahte sağlayıcı testleri geçti |
| E-posta taslakları / gönderim korumaları | Yerel test geçti | Yerel test geçti |
| Analiz izni ve yetersiz veride tahmin engeli | Yerel test geçti | Yerel test geçti |
| Oslo yaz/kış saati | Geçti | Geçti |
| Katalog / diller | Uygulanmaz | 42 örnek profil, 113 ilişki, 12 bilinen fark kontrolü geçti |
| Kaynak değişiklik biçimi | git diff --check geçti | git diff --check geçti |

## Tarayıcı bulguları

CARE 1: Norveççe ana sayfa ve rezervasyon sayfası açıldı. HTTP test ortamında crypto.randomUUID bulunmadığı için istemci başlangıcı duruyordu. Güvenli crypto.getRandomValues ile UUID v4 alternatifi eklendi; rastgelelik için Math.random kullanılmadı. İstemci dosyasına sürüm parametresi eklenerek eski önbelleğin düzeltmeyi gizlemesi önlendi. Yeni regresyon testi, randomUUID olmayan ortamda başlangıcı, kimlik biçimini ve adım geçişini doğruladı.

Düzeltmeden sonra hizmet seçimi, saat adımı, saat seçmeden devam etme hatası ve son onay kontrol edildi. Yalnızca izole bellekteki test veritabanında Demo Test / demo@example.test ile rezervasyon kaydedildi. Başarı mesajı ve Mine samtaler sayfasındaki kayıt doğrulandı. Hiçbir gerçek görüşme, ödeme veya e-posta oluşturulmadı. Tarayıcıda iptal kontrolü sekmenin kaybolması nedeniyle tamamlanamadı; otomatik iptal testi geçti.

CARE 2: Norveççe ana sayfa ve test rezervasyonu sayfası açıldı; oturum gereksinimi gösterildi. Gerçek kimlikle giriş yapılmadı. Türkçe ana sayfa 320 ve 390 piksel iframe genişliklerinde kontrol edildi. Kaydırma çubuğu çıkarıldıktan sonra kullanılabilir alanlar sırasıyla 305 ve 375 piksel; belge genişlikleri de aynı, yatay taşma yok. 320 pikselde mobil menü açıldı ve Türkçe bağlantılar göründü. 390 pikselde ana görsel yüklendi ve alternatif metni mevcuttu. İlk ölçüm, ortak yerel test adresinden kalan CARE 1 stil önbelleğiyle kirlenmişti; yalnızca geliştirme ortamında ayrı CSS sorgusu kullanılarak yeniden ölçüldü. Geçici test değişiklikleri kaldırıldı.

## Tamamlanmamış doğrulamalar

- CARE 1 mobil iframe kontrolü bağlantı engeli nedeniyle tamamlanamadı.
- Tüm sayfaların tüm ekran boyutları, gerçek iOS/Android, Safari/Firefox, ekran okuyucu ve tam klavye denetimi yapılmadı. WCAG uygunluk sertifikası değildir.
- Gerçek Stripe sandbox hesabı, canlı ödeme, Resend teslimi ve dış webhook erişimi test edilmedi; yerel testler sağlayıcıları taklit eder.
- Üretim D1 veritabanında yazma/geri yükleme, yük-stres, bağımsız penetrasyon testi ve bağımlılık güvenlik veritabanı taraması yapılmadı.
- Klinik yeterlik, hekim lisansı, gerçek dil yeterliği veya hizmet işletmeye hazır olma durumu bu teknik testlerle doğrulanmaz.

Sonuç: Otomatik testler geçti; tarayıcıda bulunan CARE 1 başlangıç hatası düzeltildi. İki proje demo olarak değerlendirilir. Eksik harici entegrasyon ve cihaz testleri başarılı sayılmadı.
