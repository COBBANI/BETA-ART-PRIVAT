# NAVIAR CARE hizmet ve tasarım kararı

P-011 · DRAFT-NC-COOKIE1 · 5 Eylül 2026

NAVIAR CARE, evde yaşamayı sürdüren yaşlılar için kapsamı önceden kararlaştırılmış günlük destek konseptidir. Ana kullanıcı yardım alacak kişidir. Yakını ayrı bir yol üzerinden katılabilir. Ana ilke: kişinin seçimlerini korumak, görevi açıkça sınırlamak ve sorumlu insanın değerlendirmesini görünür kılmak.

## İçerik ve görünüm

Bokmål varsayılandır. Kullanıcı önce desteği tanır, bir alan seçer, nasıl ilerleyeceğini görür, sınırları okur ve ilk iletişim için talep bırakır. İhtiyaç açıklaması sağlık verisi isteyen serbest metne dönüştürülmez. Gerçek hizmet bölgesi, süre, fiyat, ekip ve yanıt süresi bilinmediğinde sayfa bunu açıkça söyler.

Lacivert marka rengi, koyu yeşil eylemler, açık zemin, serif başlıklar ve sade arayüz yazısı kullanıldı. Mevcut v0.3 marka adayından alınan logo korundu. Yapay müşteri değerlendirmesi, ekip fotoğrafı, uzmanlık veya başarı oranı eklenmedi. Hareket azaltma tercihi, görünür odak, gerçek form etiketleri ve semantik SSS bileşenleri kodlandı.

## Karşılaştırma — dünya sıralaması değildir

5 Eylül 2026 tarihinde araştırılan üç ilgili hizmet yaklaşımı:

| Kaynak | Gözlenen yaklaşım | NAVIAR CARE kararı |
|---|---|---|
| [SeniorSupport](https://seniorsupport.no/tjenester/besoksvenn) | Somut günlük işler ve görüşme üzerinden başlama | Hizmeti sohbet, küçük işler ve dijital yardım olarak açıklamak; doğrulanmamış ücretsiz ziyaret vaadini taşımamak |
| [2Care pratik destek](https://www.2care.no/fritt-bruker-valg/praktisk-bistand) | Zaman ve görev planlaması, sorumlu temas kişileri | Aynı yardımcıyı bir süreklilik hedefi olarak ele almak; garantilememek |
| [Home Instead companionship](https://www.homeinstead.co.uk/care/domiciliary/companionship/) | Günlük hayattan anlaşılır örnekler, kişinin ilgi alanlarına uyum | Gerçek kişinin seçtiği destekten sonraki adımı önermek; başka sağlayıcının tıbbi hizmet kapsamını aktarmamak |

Metinler, [Språkrådet yazım rehberindeki](https://sprakradet.no/klarsprak/om-skriving/generelle-skriverad-bokmal/) kullanıcıya göre yazma, ana bilgiyi öne alma, kısa ve aktif cümleler kurma yaklaşımıyla hazırlandı. Resmî dil sertifikası iddiası yoktur. Üç dilde aynı hizmet, ücret belirsizliği ve izin anlamı korunur.

| Bokmål | English | Türkçe |
|---|---|---|
| Forespørsel | Request | Talep |
| Ønsket dato for første kontakt | Preferred first-contact date | İlk iletişim için tercih edilen tarih |
| Bekreftet avtale | Confirmed arrangement | Kesinleşmiş anlaşma/randevu |
| Pårørende | Relative | Yakın |
| Selskap og turfølge | Company and walks | Sohbet ve yürüyüş |
| Innsyn | Access to information | Bilgiye erişim |

## Hizmet akışı

| Aşama | Kullanıcıya görünen | İşletmenin yapacağı | Paketteki durum |
|---|---|---|---|
| Keşif | Üç destek alanı ve kapsam sınırı | İçerik sorumlusu metni günceller | Uygulandı |
| Talep | İletişim için tarih tercihi, kayıt sonucu | Aynı isteği tekrar kaydetmeden talebi alır | Yerel testte uygulandı |
| İnceleme | İnceleme bekliyor | Bölge, görev, ihtiyaç uyumu ve temsil yetkisini kontrol eder | Test onayı; gerçek inceleme görevi insanındır |
| Teklif | Ücret ve koşullar önce açıklanmalı | Yazılı kapsam, toplam tutar ve müşteri kabulünü kaydeder | Test tutarı var; gerçek teklif kabul akışı bekliyor |
| Planlama | Kesin tarih ayrıca onaylanır | Kaynak, takvim, izin ve en az 15 dakika aralık kontrolü | Yerel çakışma kontrolü var; takvim senkronizasyonu yok |
| Ödeme | Onaylı test teklifi varsa ödeme bağlantısı | İmzalı sağlayıcı olayını doğrular, tutarı eşleştirir | Test adaptörü ve webhook kontrolleri |
| Ziyaret | Önceden kararlaştırılmış görev | Giriş, görev sınırı, çıkış ve gerektiğinde istisna kaydı | Operasyon tasarımı; ziyaret modülü yok |
| Takip | Geri bildirim ve anlaşılır sonraki adım | Süreklilik, şikâyet ve düzeltme | Sonraki geliştirme |

Ödemeyi yapan, rezervasyonu yapan ve ziyaret bilgisini görebilen kişiler aynı olmak zorunda değildir. Gerçek hizmette bu üç yetki ayrı kaydedilmeli; yakına bilgi paylaşımı otomatik olmamalıdır.

## İstisna planı

| Durum | Sorumlu işlem | Kullanıcı iletişimi |
|---|---|---|
| Yardımcı gelemiyor | Operasyon sorumlusu kapasite ve izinleri kontrol edip alternatif sunar | Kesinleşmeden aynı yardımcı veya aynı saat sözü verilmez |
| Kapı açılmıyor | Onaylı erişim ve acil durum talimatını izler; zorla giriş yapılmaz | Önceden anlaşılmış iletişim kişisine, yetki sınırında bilgi |
| Yeni görev isteniyor | Görev kapsamı yeniden değerlendirilir | Yeni zaman ve bedel için yeniden anlaşma |
| Sağlık/acil durum | Tıbbi değerlendirme yapılmaz; uygun yardım kanalına yönlendirilir | Norveç için 113 / 116 117 bilgisi açık tutulur |
| Ödeme belirsizliği | Sağlayıcı kaydı ile sunucu kaydı karşılaştırılır | Tarayıcı dönüş sayfasından “ödendi” sonucu çıkarılmaz |
| İptal veya itiraz | Koşullara göre insan incelemesi, ödeme varsa iade değerlendirmesi | İade yapılmadıysa yapılmış gibi bildirilmez |

Acil yardım numaralarının kaynağı: [Helsenorge](https://www.helsenorge.no/en/help-services-in-the-municipalities/out-of-hours-medical-service/). Bu tablo tamamlanmış işletme prosedürü veya hukuk görüşü değildir; işletme sorumlusu gerçek hizmet düzenine göre sahiplenmelidir.
