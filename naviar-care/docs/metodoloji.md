# NAVIAR CARE — metodoloji

Kaynak: proje liderinin yöntem incelemesi (02.09.2026). Bakım, BPA,
fritidskontakt ve dagsenter rollerindeki ortak ihtiyaç: güvenli günlük
yaşam, sosyal katılım, ulaşım, aktivite, pratik destek, süreklilik ve
aile koordinasyonu.

## Benimsenen yöntemler

| Yöntem | Projede uygulanması | Durum |
|---|---|---|
| Need-to-Match | İhtiyacı doğru destek/kişi/aktiviteyle eşleştirme | Kullanıcı metodu (aşağıda) |
| Double Diamond | Discover→Define→Design→Validate süreci | proje-plani.md fazları |
| Person-centered design | Plan kişinin alışkanlık/hedef/tercihlerine kurulur | Kartlegg + Planlegg adımları |
| Jobs-to-be-Done | Tanı değil, kişinin yapmak istediği iş | Forstå adımı |
| Service Blueprint | Kullanıcı/aile/yardımcı/belediye/partner görev ayrımı | prototype.html + Design fazı |
| Co-design | Yaşlı, yakın, yardımcı, sağlayıcıyla birlikte geliştirme | Faz 1 görüşme kılavuzu |
| Lean / Concierge MVP | İlk pilot manuel ve düşük maliyetli | admin.html konsolu, manuel eşleştirme |
| RACI | Sorumlu/yetkili/bilgilendirilecek netliği | Konsol "kim onayladı" kaydı; sözleşme fazında genişler |
| Risk-based triage | Aktivite desteği ↔ sağlık/bakım görevleri ayrımı | Kapsam kuralı (forretningsmodell.md) |
| Kanban + aktivitetsplan | Görev/vardiya/aktivite/takip durumları | Konsol kuyruk hattı |
| KPI + geri bildirim döngüsü | Etki ölçümü, sürekli geliştirme | pilot-olcum-plani.md |
| Business Model Canvas | Gelir modelini müşteri bazında test | forretningsmodell.md |

**Şimdilik bilinçli ERTELENENLER:** tam otomatik YZ eşleştirmesi, geniş
sağlık kayıt sistemi, büyük pazaryeri, karmaşık belediye entegrasyonları,
çok hizmeti aynı anda başlatmak, NAVIAR'ı sağlık kurumu gibi
konumlandırmak.

## Ana kullanıcı metodu: Kartlegg → Forstå → Planlegg → Match → Følg opp

1. **Kartlegg** — günlük yaşamdaki en büyük zorluk; istenen aktiviteler;
   destek saatleri; ulaşım/alışveriş/ev işi/sosyal katılım; yakının yükü.
2. **Forstå** — söylenen ihtiyacın arkasındaki amaç. Örnek: "Boccia
   antrenmanına götürecek biri lazım" → asıl iş: "aktif kalmak, sosyal
   çevremi korumak, bağımsız yaşamak" (JTBD).
3. **Planlegg** — kişiye özel: haftalık aktivite planı, destek saatleri,
   ulaşım planı, alışveriş/pratik görevler, tedavi/antrenman ulaşımı,
   aile iletişim planı, takip tarihi.
4. **Match** — kriter öncelik sırası (yalnızca "en yakın" DEĞİL):
   1) görevi güvenli yapabilme, 2) deneyim/uygunluk, 3) kişilik ve
   iletişim uyumu, 4) müsaitlik, 5) konum/ulaşım, 6) hızlı başlama,
   7) fiyat ve süre. Dil, yaş/yaşam deneyimi, ehliyet+araç eşleştirme
   girdileridir. Her match insan onaylıdır.
5. **Følg opp** — aktivite gerçekleşti mi; kişi güvende hissetti mi;
   uyum sağlandı mı; plan değişmeli mi; aile/partner desteği gerekli mi.
6. **Lær** — her takipten: eşleşme kalitesi, erişim süresi, aktivite
   devamlılığı, memnuniyet, yakın yükündeki değişim, aksayan noktalar
   (→ konsol metrikleri).

## Dört sistem

| Sistem | Akış | Yüzey |
|---|---|---|
| Kullanıcı | Kartlegg → Forstå → Planlegg → Match → Følg opp | Landing "fem steg" + prototip |
| Hizmet tasarımı | Discover → Define → Design → Validate | proje-plani.md |
| Operasyon | Talep → Değerlendirme → Eşleştirme → Plan → Uygulama → Takip | admin.html konsolu |
| İş geliştirme | İhtiyaç → Değer önerisi → Ödeyen müşteri → Pilot → Ölçüm → Sözleşme → Ölçek | forretningsmodell.md |

## İlk pilot hizmeti: "NAVIAR CARE Aktivitet & Hverdagsplan"

İçerik: haftalık aktivite planı, fritidskontakt eşleştirmesi, yürüyüş/
egzersiz desteği, alışveriş ve pratik işler, randevu/antrenman ulaşımı,
sosyal buluşmalara katılım, aile+sağlayıcı koordinasyonu, 14 günlük
takip. **MVP üç alanla sınırlı:** (1) sosyal ve aktivite desteği,
(2) pratik günlük yardım, (3) ulaşım ve refakat.

**Kritik ayrım:** kişisel bakım, ilaç yönetimi ve forflytning yalnızca
uygun yetkiye sahip işveren/partner üzerinden planlanır — NAVIAR'ın
kendi yardımcı ağı bu işleri ALMAZ (kapsam kuralı).

## Katmanlama kararı

İlk sürüm: **saatlik düşük riskli günlük yaşam desteği pazaryeri +
koordinasyon hizmeti.** Pårørende koordinasyonu ana hizmeti güçlendiren
**ikinci katmandır** — iki konsept bağlantılıdır ama aynı hizmet gibi
anlatılmaz. (Landing bugün bu sırayla kurulu: Tjenester birincil,
koordinasyon çatı anlatı.)
