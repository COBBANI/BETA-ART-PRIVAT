# Üç dil, açık dil ve içerik yönetimi

NAVIAR-CARE-001-WEB-01 · DOC-012/14 · Belge v1.0 · 2026-09-05

Norveççe Bokmål (nb), İngilizce (en) ve Türkçe (tr) aynı hizmet yapısını anlatır. Sadece ana sayfa değil hata mesajları, form adımları, demo onayı, kapsam, ücret, başvuru durumu ve yönetim açıklamaları da eşdeğer anlamı taşımalıdır.

İçerik kaynakları: src/locales.js ana sözlük; experience.js rehber/operasyon; improvements.js ek işlev açıklamaları; studio.js hizmet ayrıntıları. client.txt içinde ayrıca üç dilde küçük bir extra sözlüğü bulunur. Paket içindeki CSV bu iki katmanı ayrı öneklerle dışa aktarır; anahtar eksikleri kontrol raporuna yazılır.

**Düzenleme kuralı:** Önce bir alanın anlamı kesinleştirilir, sonra aynı anahtar üç dilde güncellenir. Kullanıcıya görünen fiyat, bölge, sağlayıcı veya hak bilgisi değiştiğinde tüm ilgili sayfalar birlikte değerlendirilir. Kullanıcı metnine geliştirici hata kodu veya proje içi açıklama taşınmaz.

| İletişim amacı | Norveççe | İngilizce | Türkçe |
| --- | --- | --- | --- |
| Demo onayı | Bekreft testbestillingen | Confirm test booking | Test rezervasyonunu onayla |
| Görüşme akışına giriş | Prøv samtalebestilling | Try call booking | Görüşme rezervasyonunu dene |
| Fiyat/bölge bağlantısı | Pris og område | Price and location | Ücret ve bölge |

Klarspråk yaklaşımı yalnızca kısa cümle yazmak değildir: kullanıcı aradığı bilgiyi bulabilmeli, anlayabilmeli ve işini yapabilmelidir. Bu projede somut görev örnekleri, açıklayıcı düğmeler ve işlem öncesi kapsam bu amaçla kullanılmıştır. [Språkrådet: Kort om klarspråk](https://sprakradet.no/klarsprak/kunnskap-om-klarsprak/kort-om-klarsprak/).

**Yazım standardı:** Kişiye doğrudan ve saygılı hitap; her paragrafta tek ana fikir; “kaydedildi”, “sağlayıcı kabul etti” ve “ödendi” ifadelerini ayrı kullanma; sağlık veya kesin sonuç vaadinden kaçınma; bilinmeyen ücret/bölgeyi açık gösterme. İnsan/ana dil son okuması ve hedef kullanıcıyla görev testi açık iştir.

**SEO’nun mevcut durumu:** Sayfa başlıkları, dil tanımı, açıklama ve dil bağlantıları şablonda bulunur. robots.txt bütün taramayı engeller; sayfa meta robots noindex,nofollow içerir. Bunlar demo için bilinçli ayarlardır ve SERVICE_OPEN değişince kendiliğinden kalkmaz. Tarama engeli erişim güvenliği değildir.

**Ticari açılışta ayrı iş:** Doğru alan adı ve URL yönlendirmeleri; canonical ve dil alternatiflerinin kontrolü; sitemap; gerçek işletme verileriyle uygun yapılandırılmış veri; doğrulanmış hizmet bölgesi; gerçek içerikle meta açıklamaları. Mevcut kodda yapılmış gibi sunulmaz. Sahte müşteri yorumu, sahte çalışan veya kanıtsız başarı sayısı eklenmez.
