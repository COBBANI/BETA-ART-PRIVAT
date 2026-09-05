# Web sayfası baştan sona nasıl yapıldı?

NAVIAR-CARE-001-WEB-01 · DOC-012/05 · Belge v1.0 · 2026-09-05

**1. Fikir ve kapsam tanımlandı.** İlk Naviar referansı, evinde yaşayan yaşlılara yakın çevreden yardım fikrini taşıyordu. İlk belgeler statik tanıtım sayfasını anlattı. Sonraki çalışmalarda gündelik yardım, eşlik ve sosyal zaman üç ayrı hizmet olarak düzenlendi. Klinik işlerin kapsam dışında olması ve ev ziyaretinin ayrıca kararlaştırılması metne işlendi.

**2. Kullanıcının soruları sayfa sırasına dönüştürüldü.** “Bana uygun mu?”, “Neler yapılabilir?”, “Nasıl başlarım?”, “Yakınım nasıl katılır?”, “Ne kadar tutar?” soruları ana sayfanın bölüm sırasını belirledi. Sonuç src/render.js içindeki home şablonudur.

**3. Tasarım kuralları kodlandı.** src/styles.css renkleri, yazı ailelerini, boşlukları, kartları, düğmeleri, odak görünümünü ve ekran eşiklerini tanımlar. Aynı kurallar bütün dil ve sayfalarda kullanılır. Logo ve ana görsel assets/ klasöründen sunulur.

**4. Üç dil tek içerik modeliyle bağlandı.** src/locales.js ana sözlüğü tutar; experience.js, improvements.js ve studio.js ek metinleri birleştirir. URL’nin ilk parçası nb, en veya tr olur. render(lang, page, config, user) aynı sayfa yapısına ilgili sözlüğü yerleştirir.

**5. Sayfa sunucuda üretildi.** src/worker.js isteğin adresini okur; CSS, JavaScript ve görselleri verir; sayfalar için render fonksiyonunu çağırır. Kullanıcı girdileri HTML’ye konmadan kaçışlanır. Kişisel sayfalar ve API yanıtlarında no-store bulunur.

**6. Formlar etkileşimli hale getirildi.** src/client.txt, derlemeden sonra /app.js olarak sunulur. Hizmet rehberi, üç adımlı görüşme formu, geri/ileri geçişi, hata açıklamaları, dil değiştirme uyarısı ve kayıt yenileme burada çalışır. Bir hizmet kendiliğinden seçilmez; tek uygun saat olsa bile kullanıcı saati seçer.

**7. Kalıcı veri ve sunucu denetimi eklendi.** db/schema.ts veri modelini tanımlar. drizzle/ altındaki 0000–0006 değişiklikleri veritabanını kurar. Worker SQL sorgularıyla görüşme ve başvuruyu kaydeder; sahiplik, yönetici yetkisi, CSRF ve tekrar/çakışma kurallarını uygular.

**8. Entegrasyonlar korumalı biçimde hazırlandı.** E-posta outbox üzerinden Resend’e; ödeme sunucudaki teklif üzerinden Stripe’a bağlanacak şekilde kodlandı. Demo, gerçek e-posta ve tahsilatı engeller. Bir entegrasyonun kodda bulunması hesabın bağlandığı veya uçtan uca çalıştığı anlamına gelmez.

**9. Gözlem ve işletim ekranı eklendi.** Yönetici başvuruları, saatleri, teklifleri ve açılış eksiklerini görür. İzinli içerik sayımları ve sınırlı haftalık talep hesabı gerçek veriyi test kayıtlarından ayırır. Bu mekanizma sağlık triyajı veya kişisel ihtiyaç tahmini değildir.

**10. Derleme, test ve sürümlü teslim yapıldı.** scripts/build.mjs esbuild ile Worker’ı dist/server/index.js içine paketler ve D1 değişikliklerini kopyalar. Yerel SQLite ve DOM testleri 37 senaryoyu doğrular. Bugünkü belge, son kayıtlı kodu yeniden derleyip bu testleri çalıştırarak hazırlanmıştır.

**Geliştirirken neresi değiştirilir?** Başlık veya hizmet metni için dil dosyaları; bölüm sırası için render.js; görünüm için styles.css; tarayıcı davranışı için client.txt; iş kuralı için worker.js; veri alanı için schema.ts ve yeni migration. dist/ üretilmiş çıktıdır; ana çalışma alanı olarak elle düzenlenmemelidir.

Örnek değişiklik akışı: Üç dilde aynı içerik anahtarını güncelle; şablon alanının anlamını kontrol et; derle; ilgili testleri çalıştır; üç dilde görünümü kontrol et; değişikliği sürüm kaydına yaz. Hizmet/fiyat vaadi değişiyorsa işletme kararıyla eşleştir.
