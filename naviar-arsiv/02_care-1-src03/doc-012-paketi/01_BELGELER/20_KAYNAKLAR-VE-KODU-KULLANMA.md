# Kaynaklar, kod paketini kullanma ve yeniden üretim

NAVIAR-CARE-001-WEB-01 · DOC-012/20 · Belge v1.0 · 2026-09-05

Bu setin ana kanıtı incelenen uygulama kodudur. Dış belgeler yalnızca ilgili teknik veya içerik ilkesini doğrulamak için kullanılmıştır; NAVIAR CARE’in işletme uygunluğunu veya gerçek entegrasyon sonucunu kanıtlamaz.

| Kaynak | Kullanıldığı yer |
| --- | --- |
| README.md, package.json, package-lock.json | Proje durumu, kurulum ve sürüm |
| src/worker.js, render.js, client.txt, styles.css | Gerçek davranış, arayüz ve tasarım |
| Dil dosyaları; db/schema.ts; drizzle/ | İçerik, veri ve değişiklikler |
| tests/ ve bu turdaki çıktı | 37 yerel kontrolün sonucu |
| Önceki DOC-001, DOC-005, DOC-009, DOC-010 ve DOC-011 | Konsept, logo, platform ve gelişim geçmişi |

Güncel kontrol tarihi: 5 Eylül 2026.

- [Språkrådet – Klarspråk](https://sprakradet.no/klarsprak/kunnskap-om-klarsprak/kort-om-klarsprak/): bulunabilir, anlaşılabilir, kullanılabilir içerik yaklaşımı.
- [W3C – WCAG 2.2](https://www.w3.org/TR/WCAG22/): erişilebilirlik değerlendirme çerçevesi.
- [Datatilsynet – Personvernprinsippene](https://www.datatilsynet.no/rettigheter-og-plikter/personvernprinsippene/): kişisel veri amaç/minimizasyon/saklama ilkeleri.
- [Stripe – Webhooks](https://docs.stripe.com/webhooks): ham gövde ve imza doğrulaması.
- [Stripe – Idempotent requests](https://docs.stripe.com/api/idempotent_requests): aynı işlemin tekrar ele alınması.
- [Resend – Idempotency keys](https://resend.com/docs/dashboard/emails/idempotency-keys): e-posta tekrar denemesinin zaman sınırı.
- [Cloudflare – D1 migrations](https://developers.cloudflare.com/d1/reference/migrations/): sıralı veritabanı değişiklikleri.

**Kaynak kod teslimi:** Ayrı KAYNAK-KOD_v2.4.0.zip dosyasını açın. naviar-care/ klasöründe çalıştırılabilir kaynak, kilit dosyası, testler, görseller, şema ve mevcut derlenmiş çıktı bulunur. KOD-OKUYUCU.html dosya adına göre tam okunabilir kaynakları gösterir. Bu okuyucu uygulama sunucusu değildir; kodu çalıştırmaz. Uygulamayı kurulum belgesindeki komutlarla çalıştırın.

KAYNAK-ENVANTERI.csv, takipli her dosyanın bayt sayısını ve SHA-256 değerini verir. Kaynak kodu, eklenen okuma araçlarından ayırmak için naviar-care/ altındaki dosyalar özgün adlarıyla korunmuştur. Üretim sırları, git erişim anahtarı, node_modules ve müşteri veritabanı bulunmaz.

**Belge arşivi:** Ayrı BELGELER_v1.0.zip; bu kitabı, 20 ayrı belgeyi, gerçek site metinlerinin üç dilli CSV dökümünü, veri sözlüğünü, rota haritasını, test çıktısını ve bütünlük kayıtlarını içerir. Kaynak deposunun tam kopyası bu belge ZIP’inde tekrar edilmez.

**Yeniden üretim:** Kaynak sürümünü aynı tut; paket kilidine göre bağımlılıkları kur; derle; test et. Yeni özellik veya metin değişirse yeni sürüm ve doğrulama kapsamı yaz. Değişiklik kaydı: tarih, gerekçe, etkilenen dosyalar, test sonucu, açık sınır ve sorumlu. Belge kimliği DOC-012 olarak sabit, belge sürümü artarak kullanılabilir.

**Tamlık sınırı:** Bu paketteki kod ana sitenin son kayıtlı sürümüdür. Erişilemeyen eski Vercel sunucusu, paylaşılmamış bilgisayar dosyaları, başka NAVIAR varyantları ve geçmişteki tüm sürümler bu kaynak paketinde bulunduğu iddia edilmez. Eski belge arşivi ayrıca korunmaktadır.
