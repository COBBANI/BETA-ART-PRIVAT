# NAVIAR CONSULT — Kapanış ve teslim kaydı

**Proje:** P-010 / NVC-001  
**Tarih:** 5 Eylül 2026  
**Sonuç:** Mevcut özel inceleme sürümü teslim edilebilir. Ticari hizmet açılışı tamamlanmış değildir.

## Teslim edilen proje

Ana site: https://naviar-consult.andersen-betul.chatgpt.site

NAVIAR Consult; işveren, yönetici ve çalışanların işte kalma, işyerinde uyarlama ve işe dönüş konularında daha açık bir diyalog ve uygulanabilir sonraki adımlar oluşturmasına yardımcı olacak danışmanlık konseptidir. Arbeidsnærvær OS, danışmanlık yöntemini destekleyen ikinci katmandır; ana değer uzman hizmetidir.

İlk sınırlandırılmış teklif **NAVIAR Start**: bir kurumun veya bölümün takip rutinlerinin incelenmesi. Mevcut konseptte 2 × 45 dakika yönetici görüşmesi, en fazla 2 × 30 dakika gönüllü çalışan/temsilci görüşmesi, üç rutin veya şablonun incelenmesi ve 60 dakikalık atölye bulunur. Teslimatlar süreç haritası, kaynağı ve belirsizliği belirtilen beş bulgu, üç öncelikli eylem, yönetici görüşme rehberi ve 30 günlük plandır. Ana teslim hedefi 10 iş günü, takip 30 takvim günüdür. Toplam 12 saat ve 19.900 NOK + uygulanabilir MVA, mevcut taslağın test varsayımlarıdır; bu belge bunları kesin ticari teklif olarak onaylamaz.

PREVENT, FOLLOW, RESOLVE ve RETURN/MOBILITY, geliştirme alanları olarak korunur. Bireysel vaka yönetimi, tıbbi değerlendirme, tedavi, hukuki temsil ve soruşturma Start kapsamına dahil değildir. Somut hizmet etkisi ve müşterinin ödeme isteği henüz doğrulanmış sayılmaz.

## Web tesliminin kapsamı

| Varlık | Rolü | Kontrol edilen durum |
|---|---|---|
| Ana NAVIAR Consult sitesi | Hizmet, yöntem, çalışan bilgisi, örnek çıktı, başvuru ve işletim altyapısı | Mevcut özel erişimli site aktif; kayıtlı sürüm 6 |
| Arbeidsnærvær sitesi | İşveren/çalışan hizmet keşfi ve yerel görüşme hazırlığı | Özel erişimli site aktif; kayıtlı sürüm 3 |
| Arbeid i praksis sitesi | İhtiyaca göre yerel hazırlık ve indirilebilir özet | Özel erişimli site aktif; kayıtlı sürüm 3 |

İlgili iki deneyim:

- https://naviar-consult-p001.andersen-betul.chatgpt.site
- https://naviar-consult-arbeid-i-praksis.andersen-betul.chatgpt.site

Norveççe, İngilizce ve Türkçe içerik mevcut. İki hazırlık sitesi başvuru göndermez veya randevu oluşturmaz. Ana site için e-posta ve Stripe ödeme işlemlerinin kaynak kodu vardır; bu, sağlayıcı bağlantısının çalıştığı anlamına gelmez.

## Bu kapanışta doğrudan kontrol edilenler

- Ana site ile iki hazırlık sitesinin kimliği, erişimi ve aktif durumları kontrol edildi.
- Ana sitenin kayıtlı son kaynak sürümü ile alınan kaynak deposu aynı: `587b3acded7a14776826133eb61a0898cc6e6f67`.
- Ana sitenin müşteri kabulü ve ödeme etkinleştirme ayarları kapalıdır.
- Görünen ortam ayarlarında şirket, Resend ve Stripe yapılandırma anahtarları bulunmamaktadır. Yönetici e-posta anahtarı listeleniyor; gizli değeri doğrulanmadı.
- Kaynak kodda işletme kimliği ve sağlayıcı hazırlığı kontrol edilmeden müşteri kabulünü açmayan kontroller incelendi.
- Konsept, önceki teslim ve entegrasyon belgeleri okundu.
- Aynı çalışma alanındaki başka, kaydedilmemiş düzenlemelere dokunulmadı. Bu kayıt, son kayıtlı kaynak sürümünü esas alır.

Önceki GOV-08 teslim belgesi üretim derlemesi, TypeScript ve 80 otomatik kontrolün geçtiğini bildiriyor. **Bu tur bu testler yeniden çalıştırılmadı.** Yeni tarayıcı, ekran okuyucu veya gerçek sağlayıcı uçtan uca testi yapılmadı. Bu tur site kodu değiştirilmedi ve yeni yayın yapılmadı.

## Ticari açılışı engelleyen gerçek bağımlılıklar

| Gerekli bilgi/işlem | Tamamlanma kanıtı |
|---|---|
| Gerçek şirket unvanı, organizasyon numarası, iş e-postası ve hizmet sorumlusu | İşletmenin doğruladığı bilgiler sitede ve sözleşmede tutarlı |
| Gerçek danışman kapasitesi ve randevu sorumluluğu | Kabul, değişiklik ve iptal akışında sorumlu kişi ve kullanılabilir takvim |
| Resend hesabı ve doğrulanmış gönderen alan adı | Test iletisi ulaşır; teslim/başarısızlık olayları işletim ekranına yansır |
| Stripe hesabı ve kesin fiyat/vergi/iade koşulları | Test ödeme ve iade doğrulanır; yinelenen olaylar mükerrer işlem üretmez |
| Gizlilik ve hizmet koşulları, hassas bilgiler için uygun kanal | İşletme tarafından onaylanan gerçek veri akışı ve erişim modeli |
| Sağlayıcı olaylarının erişimi ve hata takibi | Özel erişimle çatışmayan webhook çözümü ve atanmış takip sorumlusu |

Bu bilgiler kullanıcıya ait işletme ve hesap verileridir; tahmin edilerek tamamlanamaz. Hesap sırları sohbet metninde istenmemelidir. Mevcut çalışma, bu bağımlılıklar çözülmeden gerçek müşteri kabulü veya tahsilat olarak sunulmamalıdır.

## Konsept ve içerik koruması

Mevcut özel site erişimi ve kaynak sürüm geçmişi korunmuştur. Özel yöntem ve müşteri belgeleri halka açık web içeriğine dahil edilmemelidir. Metin seçimini veya klavyeyi engellemek uygulanmış bir koruma yöntemi değildir. Kullanım bildirimi ve sürüm geçmişi, marka tescili veya kopyalamanın mutlak engeli olarak sunulmaz.

## Fazlara göre kapanış kararı

| Faz | Kapanış kararı |
|---|---|
| Discover | Mevcut üç Consult varlığı esas alındı; Care projeleri bu kayda dahil değil. |
| Define | Ana kimlik P-010 / NVC-001; Start ilk sınırlandırılmış hizmet taslağı. |
| Design | Üç dil ve işveren/çalışan yolları mevcut teslimin parçası. |
| Validate | Önceki test kanıtı ile bu tur yapılan durum kontrolü ayrı belirtildi. |
| Build | Mevcut kayıtlı kaynak teslim referansı olarak sabitlendi; paralel düzenlemeler korunuyor. |
| Launch | Özel inceleme teslimi mevcut; ticari açılış açık bağımlılıklarla bekliyor. |
| Measure | Hazırlık sitelerine izleme eklenmedi; doğrulanmış tahmin modeli iddiası yok. |
| Scale | Hizmet talebi ve operasyon gerçek pilotla doğrulanmadan ölçeklenmiş hizmet ilan edilmeyecek. |

**Kapanış sınırı:** Konsept ve özel inceleme sürümünün teslim kaydı tamamlandı. Canlı randevu, e-posta ve ödeme açılışı tamamlanmadı. Bu belge önceki tarihli genel “tamamlandı” ifadelerini bu sınırla açıklığa kavuşturur.
