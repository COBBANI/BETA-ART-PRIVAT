# Platform decision — WEB-2026-002

**Kontrol tarihi:** 5 Eylül 2026

## Karar

Bu örnek için seçilen yaklaşım: **özel web uygulaması için hazırlanan statik, entegrasyon-dostu prototip**.

Prototip şu anda yalnızca HTML, CSS ve JavaScript kullanır. Üretim aşamasında kullanıcı rolleri, güvenli kayıt, talep yönetimi, eşleştirme, takvim, ödeme ve operasyon paneli ayrı bir uygulama katmanına taşınacaktır.

Bu karar, belirli bir sağlayıcının bugün için en ucuz veya en güzel olmasına değil, NAVIAR CARE’in iki taraflı hizmet modeline ve gizlilik sınırlarına dayanır.

## Karşılaştırma

| Seçenek | Güçlü tarafı | Bu proje için sınır | Karar |
|---|---|---|---|
| **Figma Sites** | Responsive görsel site, breakpoint, CMS, code layer ve yayınlama akışı | Tasarım/prototip için güçlü; gerçek yardımcı eşleştirme, rol bazlı operasyon ve ödeme çekirdeği için ek sistem gerekir | Tasarım doğrulaması için uygun, ana operasyon platformu değil |
| **Wix Studio** | Bookings; personel, hizmet, ödeme ve çok dilli site bileşenleriyle hızlı pilot | Rezervasyon modelinin NAVIAR CARE sınırlarına uyması, dil/yerel saat ve veri akışının ayrıca doğrulanması gerekir; çok taraflı matching için özel geliştirme gerekebilir | Sadece basit booking pilotunda güçlü alternatif |
| **Webflow** | Güçlü görsel düzenleme, CMS ve localization seçenekleri | Localization ve CMS planlara bağlıdır; booking, helper matching ve ödeme için harici çözüm veya özel kod gerekir | İçerik ve marka sitesi için güçlü, operasyon çekirdeği için ikincil |
| **Framer** | Hızlı marka sitesi, CMS ve localization | Localization eklenti olarak fiyatlanır; çok taraflı operasyon ve booking için harici akış gerekir | Marka/landing prototipi için uygun |
| **Özel uygulama** | Matching, roller, erişim sınırları, dil, audit log ve entegrasyon sözleşmeleri üzerinde tam kontrol | Daha yüksek geliştirme, güvenlik, bakım ve hukuki sorumluluk | NAVIAR CARE’in uzun vadeli operasyon çekirdeği için seçildi |

## Kaynaklarla doğrulanan noktalar

- Figma’nın güncel fiyat ve özellik sayfası Figma Sites’i beta olarak; breakpoint, CMS, code layer ve özel alan adıyla yayınlama seçenekleriyle listeliyor. Figma’nın yardım sayfası da yayınlama ve site ayarlarının plan/organizasyon politikalarına bağlı olduğunu belirtiyor.
- Wix’in Bookings belgeleri hizmet, personel, ödeme ve rezervasyon politikalarının kurulabildiğini; Wix’in çok dilli içerik desteği ise hizmet ve fiyat seçeneklerinin çevrilebildiğini açıklıyor. Wix Bookings tek bir site saat dilimi ve site adresine bağlı bir zaman modeli kullanır.
- Webflow’un güncel fiyat sayfası Basic ve Premium site planlarını, CMS’i ve ayrı Localize katmanlarını listeliyor. Localize sayfası lokalize SEO, CMS ve statik sayfaların plan/özellik sınırları içinde yönetildiğini açıklıyor.
- Framer’ın güncel fiyat sayfası Basic planı, CMS koleksiyonlarını ve localization eklentisini ayrı kalemler olarak listeliyor.

## Uygulama sonucu

1. Bu sürümde **Figma Sites, Wix Studio, Webflow veya Framer hesabına yayın yapılmadı**.
2. Statik prototip, platformdan bağımsız bir içerik ve tasarım referansı olarak üretildi.
3. `content/site-content.json` gelecekte Wix CMS, Webflow CMS, Framer CMS veya özel API’ye taşınabilecek içerik alanlarını sabit anahtarlarla tanımlar.
4. Gerçek booking, ödeme, e-posta ve kullanıcı hesabı ancak sorumluluk, sigorta, yardımcı statüsü, GDPR/personvern ve veri mimarisi onaylandıktan sonra eklenmelidir.

## Ne zaman Wix Studio seçilir?

Amaç yalnızca tek taraflı bir hizmet takvimi, ödeme ve otomatik randevu ise Wix Studio daha hızlı bir pilot olabilir. NAVIAR CARE’in hedefi ise zamanla talep sahibi, yakın, yardımcı ve yönetici akışlarını aynı sistemde buluşturmaktır; bu nedenle bu örnekte özel uygulama yönü korunmuştur.

## Resmî kaynaklar

- [Figma pricing](https://www.figma.com/pricing/)
- [Figma Sites: publish your Figma site](https://help.figma.com/hc/en-us/articles/35895970131479-Figma-Sites-collection-Publish-your-Figma-site)
- [Wix Bookings: translate your site](https://support.wix.com/en/article/wix-bookings-translating-your-site)
- [Wix: set up a service](https://dev.wix.com/docs/api-reference/business-solutions/bookings/flow-set-up-a-service)
- [Wix Bookings: time zones](https://dev.wix.com/docs/api-reference/business-solutions/bookings/about-time-zones)
- [Webflow pricing](https://webflow.com/pricing)
- [Webflow Localize overview](https://help.webflow.com/hc/en-us/articles/33961240752147-Webflow-Localize-overview)
- [Framer pricing](https://www.framer.com/pricing)
- [Framer localization help](https://www.framer.com/help/localization/)
- [Vercel pricing](https://vercel.com/pricing)
