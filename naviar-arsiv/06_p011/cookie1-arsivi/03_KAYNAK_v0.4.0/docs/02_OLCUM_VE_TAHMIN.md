# Ölçüm sözleşmesi ve talep tahmini

P-011 · DRAFT-NC-COOKIE1 · 5 Eylül 2026

Amaç: hangi açıklamaların daha fazla kullanıldığını, nerede talep oluştuğunu ve toplam haftalık talebe göre insan kapasitesinin nasıl planlanacağını görmek. Gerçek ziyaretçi verisi henüz yoktur. Örnek testler gerçek talep olarak sunulmaz.

## Üç temel ölçü

| Ölçü | Tam tanım | Karar | Sınır / sorumlu |
|---|---|---|---|
| Haftalık talep sayısı | Yeni ve tekil idempotency kaydıyla oluşturulmuş talepler; Europe/Oslo Pazartesi–Pazar; iptal sonradan sayıyı düşürmez | Sonraki hafta görüşme kapasitesi | Sahte/test/spam kayıtları canlı veri hattından ayrılmalı. Operasyon sorumlusu |
| İçerik etkileşim olayı | İzin veren açık sayfada bölümün en az %50 görünür olduğu, aralıksız 15 saniyeyi geçen olay; bölüm başına sayfa yüklemesinde en fazla bir | Açıklaması güç veya ilgi çeken içeriği inceleme | Okuma, anlama, tekil kişi veya tüm ziyaretçi oranı değildir. İçerik sorumlusu |
| Bekleyen talep adedi | `pending_review` durumundaki kayıt sayısı | İnsan incelemesi kuyruğunu planlama | Süre hedefi henüz onaylı değildir. Operasyon sorumlusu |

Payda olmadığı için “okunma yüzdesi”, “dönüşüm oranı” veya “terk oranı” üretilmedi. Onaysız ziyaretçiler görünmez; izinli örneklem seçilim yanlılığı içerir. Yeni sayfa yüklemesi yeni olay olabilir. `booking_started` ilk form odağı, `booking_error` başarısız API gönderim girişimidir; yerel tarayıcı doğrulama hatalarının tamamını içermez.

İzin varsayılan olarak kapalıdır. Kabul ve ret aynı ağırlıkta düğmelerdir. Seçim tarayıcıda 180 gün hatırlanır; kullanıcı alttaki gizlilik tercihlerinden değiştirebilir. Geri alma yeni olayları durdurur. Toplu eski sayımlar kişiye bağlanamadığından bireysel olarak çıkarılmaz. Sunucu olay gövdesini izin verilen dört alanla sınırlar; isim, e-posta, URL, referrer, sağlık verisi veya kullanıcı kimliği kabul edilmez. Güvenlik amaçlı IP özeti yalnızca geçici oran sınırlama belleğinde tutulur; analize eklenmez. Gerçek barındırıcı erişim logları ayrıca yapılandırılmalıdır.

Tercih/izleme tasarımında kontrol edilecek güncel kaynaklar: [Datatilsynet](https://www.datatilsynet.no/personvern-pa-ulike-omrader/internett-og-apper/bruk-av-informasjonskapsler-og-andre-sporingsteknologier/) ve [Nkom](https://nkom.no/internett/informasjonskapsler-cookies). Bu uygulama tek başına hukuki uygunluk sonucu vermez.

## Tahmin kuralı

`demand` tablosu kişisel alan olmadan haftalık oluşturulmuş talep sayısını tutar. İlk izleme haftası kısmi kabul edilip dışarıda bırakılır. İçinde bulunulan hafta da alınmaz. Operatör tamamlanmış haftanın veri toplamasını, test/spam ayrımını kontrol edip yönetim panelinde kalite onayı verir. Yalnızca son tamamlanan haftaya kadar kesintisiz onaylı haftalar kullanılır. Onaysız hafta veri serisini keser; veri yokluğu sıfır talep sayılmaz. Onaylı haftada kayıt yoksa sıfır eklenir. Kişisel test kaydının temizlenmesi toplu tarihçeyi silmez.

12 tam haftadan az veri varsa sonuç `insufficient_data` olur. 12 haftalık sınır bu pilotun başlangıç kuralıdır; evrensel istatistik kuralı değildir. En az 12 haftada son dört hafta zamana göre ayrılır. Her kontrol haftasında yalnızca o haftadan önceki veriler kullanılır. Son haftanın değerini tekrarlama ile son dört haftanın ortalaması MAE (ortalama mutlak hata) üzerinden karşılaştırılır. Hatası daha düşük yöntem seçilir; eşitlikte basit son hafta yöntemi kalır.

Sonuç bir sonraki toplam haftalık talep için basit bir başlangıç tahminidir. `tahmin ± 2 × MAE` aralığı, sıfırın altına düşmeyen bir planlama aralığıdır; kalibre edilmiş güven aralığı değildir. Model seçimi ve hata değerlendirmesi aynı kontrol aralığında yapılır; bağımsız ileri dönem doğrulaması gerekir. Tatiller, yeni kampanyalar, hizmet alanı değişiklikleri ve kapasite sınırları insan tarafından incelenmelidir. Otomatik işe alım veya müşteri kabul kararı verilmez.

Kullanıcıya gösterilen “sonraki adım” yalnızca kişinin seçtiği hizmete dayanan açık kuraldır. Davranıştan hastalık, yalnızlık, finansal durum veya gelecekteki bireysel bakım ihtiyacı çıkarılmaz.

## Geliştirme sırası

1. Önce 5–8 hedef kullanıcıyla “uygun desteği bul, ücret durumunu anla, ilk talebi bırak” görevlerini gözlemle. Bu sayı araştırma planıdır; tamamlanmış test değildir.
2. Form hatalarını ve talep kuyruğunu haftalık incele. İçerik sayaçlarını aynı tarih/dil/bölüm tanımıyla karşılaştır.
3. Yeterli veri olduğunda toplam talep tahminini gerçek sonraki haftalarda değerlendir. Veri azsa insan kapasite planı sürsün.
4. Sonraki sürümde gönüllü “Bu bilgi yardımcı oldu mu?” geri bildirimi ekle. İzleme seçimini bu geri bildirimle karıştırma.
