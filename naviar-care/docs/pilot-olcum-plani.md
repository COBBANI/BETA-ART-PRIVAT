# Faz 4 (Validate) — pilot ölçüm planı

Proje planındaki ölçüm listesinin çalışır hali. Pilot manuel yürüyeceği
için araç da manuel: **tek bir elektronik tablo** (sekmeler: Talepler,
Hizmetler, Yardımcılar, Geri bildirim). Hedef değerler ÖRNEKTİR —
pilotun işi gerçek eşikleri bulmaktır.

## Metrikler

| # | Metrik | Tanım | Örnek hedef | Nasıl toplanır |
|---|---|---|---|---|
| 1 | Eşleşme süresi | Talep kaydı → kullanıcı onaylı eşleşme (saat) | < 24 s | Talepler sekmesi: iki zaman damgası farkı |
| 2 | Kullanıcı memnuniyeti | Hizmet sonrası 1-5 puan | ort. ≥ 4,2 | Hizmet sonrası kısa mesaj/arama, Geri bildirim sekmesi |
| 3 | Yardımcı devamlılığı | 30 gün sonunda hâlâ aktif yardımcı oranı | ≥ %70 | Yardımcılar sekmesi: son hizmet tarihi |
| 4 | Zamanında tamamlama | Planlanan saatte başlayan hizmet oranı | ≥ %90 | Hizmetler sekmesi: plan vs gerçekleşen |
| 5 | Tekrar talep oranı | İlk hizmetten sonra 30 gün içinde ikinci talep açan kullanıcı | ≥ %50 | Talepler sekmesi, kullanıcı bazında sayım |
| 6 | Komisyon sonrası kârlılık | (komisyon geliri − değişken maliyet) / hizmet | > 0 | Hizmetler sekmesi: ücret, komisyon, maliyet kolonları |
| 7 | İptal oranı | Onaylandıktan sonra iptal edilen hizmet oranı | < %10 | Hizmetler sekmesi: durum kolonu |
| 8 | Olay/şikâyet | Güvenlik veya kalite kaydı sayısı | 0 hedef; her kayıt incelenir | Ayrı olay defteri; uyum-ilkeleri madde 3 işlem kaydına girer |

## Finans metrikleri (breakdown §11, 02.09.2026 — hepsi örnek hedefli)

| # | Metrik | Tanım | Nasıl toplanır |
|---|---|---|---|
| F1 | Ortalama hizmet tutarı | Tamamlanan hizmet başına toplam ücret (yardımcı + komisyon) | Konsol Måling / Hizmetler sekmesi |
| F2 | Komisyon geliri | Tamamlanan saat × örnek oran (metrik 6'nın pay tarafı) | Konsol Måling |
| F3 | Tekrar sipariş geliri | Birden fazla hizmet alan kullanıcılardan gelen gelir | Konsol Måling, kullanıcı bazında |
| F4 | Kullanıcı edinme maliyeti | Pazarlama gideri / yeni kullanıcı | Regneark, elle — konsoldan hesaplanamaz |
| F5 | Hizmet başına operasyon maliyeti | Koordinatör süresi + araçlar / hizmet | Regneark, elle |
| F6 | Brüt katkı payı | (F2 − F5) / F2 | Regneark; metrik 6 ile birlikte okunur |

## Kayıt kuralları

- Her talep bir satırdır; kimlik yerine takma ad/kod kullanılır
  (veri minimizasyonu — tabloda sağlık bilgisi ve tam kimlik tutulmaz).
- Zaman damgaları ISO biçiminde elle girilir (talep, eşleşme önerisi,
  kullanıcı onayı, hizmet başlangıç/bitiş, ödeme).
- Her eşleşme önerisinin yanına **kim onayladı** yazılır
  (uyum-ilkeleri madde 2-3: insan onayı + işlem kaydı).
- Haftalık 30 dakikalık gözden geçirme: 8 metrik tek sayfada, kırmızı
  olan varsa nedeni satır satır.

## Pilot çıkış kriterleri (örnek)

Devam kararı için: metrik 1, 2, 5 hedefte + metrik 8'de incelenmemiş
kayıt yok. İkisi hedefin altındaysa model düzeltilir ve pilot 4 hafta
uzatılır; güvenlik kaydı çözümsüzse pilot durdurulur.
