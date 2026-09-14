# NAVIAR CARE — Tam kaynak kodu

Proje kodu: NAVIAR-CARE-001-WEB-01
Uygulama: 2.4.0
Kaynak sürümü: 2d1ea68e47568086462c3ed304f1479010bb0222

Bu ZIP naviar-care/ altında 62 takipli dosyanın tam kopyasını içerir. KOD-OKUYUCU.html, kaynak kodunu tarayıcıda okunur gösterir; uygulamayı çalıştırmaz.

## Çalıştırma

Node 24 ile naviar-care klasöründe sırasıyla npm ci, npm run build, npm test komutlarını çalıştırın. Yerel demo için README ve vite.config.mjs içindeki köken açıklamasını okuyun.

Gerçek anahtarlar, node_modules, kullanıcı verisi ve üretim veritabanı dahil değildir. .env.example güvenli boş örnektir. dist derlenmiş çıktı; düzenlenecek ana yer src/ klasörüdür. Mevcut üretim platformu Sites/Cloudflare Worker + D1’dir; Vercel statik export değildir.

KAYNAK-ENVANTERI.csv, naviar-care altındaki her kaynak dosyasının SHA-256 değerini verir. Testler bu sürümde 37/37 geçmiştir; gerçek sağlayıcı, cihaz ve erişilebilirlik kabulü ayrı iştir.
