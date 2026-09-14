# NAVIAR CARE — proje lideri yol haritası

Kaynak: proje liderinin talimatı (02.09.2026). Bu belge projenin ana
planıdır; hizmet tanımı ve fazlar buradan okunur. Temel öncelik:
**önce güvenli ve manuel çalışan bir pilot, sonra kanıtlanan hizmetleri
teknolojiyle ölçekleme.**

## Ana hizmet tanımı

Kullanıcının **düşük riskli günlük destek ihtiyacını**, doğrulanmış ve
uygun bir yardımcıyla **hızlı şekilde eşleştiren saatlik hizmet
platformu**.

Hizmet kategorileri:
1. Sosyal refakat
2. Yürüyüş ve aktivite
3. Alışveriş ve ærend
4. Basit ev işleri
5. Ulaşım ve randevu desteği
6. Aktivite ve antrenman eşliği
7. Pårørende koordinasyonu

## Sekiz faz

### 1. Discover — ihtiyacı keşfet
Yaşlılar, yakınlar ve yardımcıların ihtiyaç araştırması; talep edilen
görevler; iş arayanların beceri/uygunluk incelemesi; belediye ve bakım
sağlayıcı görüşmeleri; kullanıcı yolculuğu.
**Çıktı:** ihtiyaç haritası + hedef kullanıcı profilleri.

### 2. Define — hizmeti tanımla
Yukarıdaki ana hizmet tanımı ve 7 kategori.
**Çıktı:** hizmet kapsamı, görev kategorileri, risk sınırları.

### 3. Design — hizmeti tasarla
Temel akış: Talep oluştur → İhtiyacı değerlendir → Güvenlik kontrolü →
Yardımcı eşleştir → Saat planla → Hizmeti tamamla → Ödeme al → Geri
bildirim ver.
Ekranlar: kayıt, hizmet talep formu, aktivite/saat planı, yardımcı
profili, eşleştirme, onay+ödeme, hizmet sonrası değerlendirme, yönetici
paneli.
**Çıktı:** Service Blueprint, kullanıcı akışları, prototip.

### 4. Validate — pilotla test et
5–10 kullanıcı · 10–20 doğrulanmış yardımcı · tek bölge · düşük riskli
hizmetler · **manuel eşleştirme** · saatlik ödeme · hizmet başına
komisyon.
Ölçülecekler: eşleşme süresi, kullanıcı memnuniyeti, yardımcı
devamlılığı, zamanında tamamlama, tekrar talep oranı, komisyon sonrası
kârlılık.
**Çıktı:** pilot raporu + düzeltilmiş hizmet modeli.

### 5. Build — minimum sistemi kur
Yeterli olanlar: kullanıcı+yardımcı profili, konum/mesafe, uygunluk
takvimi, görev kategorileri, manuel/yarı otomatik eşleştirme, saat
takibi, ödeme+komisyon, değerlendirme, yönetici onay paneli.
**İlk aşamada karmaşık yapay zekâ eşleştirmesi yok** — hangi kriterlerin
önemli olduğu önce gerçek kullanıcı verisiyle öğrenilir.
(Not: uyum-ilkeleri.md madde 2 ile tutarlı — otomasyon öneri üretir,
karar insanda kalır.)

### 6. Launch — pazara açıl
Başlangıç pazarı: bir belediye bölgesi; yaşlılar ve yakınları; iş
arayan / ek gelir isteyenler; BPA sağlayıcıları; aktivite ve bakım
kuruluşları.
**Gelir modeli:** kullanıcı saatlik ücret öder; NAVIAR CARE işlem veya
saat başına komisyon alır. Örnek (örnek rakam, vaat değil): yardımcı
ücreti 250 NOK/saat, komisyon %15–25, kullanıcı toplamı = hizmet ücreti
+ platform komisyonu. **Komisyon ödeme öncesinde açıkça gösterilir.**

### 7. Measure — ölç ve geliştir
KPI'lar: ortalama eşleşme süresi, başarılı hizmet oranı, tekrar
kullanan oranı, ortalama sipariş değeri, komisyon geliri, yardımcı
aktiflik oranı, iptal oranı, şikâyet/olay oranı, kullanıcı güven puanı.

### 8. Scale — ölçekle
Pilot başarılıysa sırayla: yeni kategoriler → yeni bölgeler → belediye
ve BPA sözleşmeleri → eşleştirme otomasyonu → kurumsal abonelik →
NAVIAR CARE yardımcı eğitim programı.

## Güvenlik ve iş modeli kontrol noktası

- Yardımcılar yalnızca "iş arıyor" oldukları için değil; **uygunluk,
  güvenilirlik, görev becerisi ve zaman müsaitliği** ile değerlendirilir.
- **Çalışan mı, oppdragstaker mı, bağımsız hizmet sağlayıcı mı?**
  Norveç mevzuatına göre ayrıca belirlenmeli. Vergi ve çalışma statüsü
  yanlış kurulursa şirkete sorumluluk doğar — **ödeme modelinden önce
  hukuki inceleme şart.** Kaynak (proje lideri iletimi, bu ortamdan
  doğrulanmadı; lansman öncesi teyit edilmeli):
  skatteetaten.no → "Frilanser, oppdragstaker og personer som mottar
  honorarer" (A-meldingen kılavuzu).

## Günlük operasyon akışı

```
Kullanıcı talebi
      ↓
İhtiyaç ve görev analizi
      ↓
Risk ve uygunluk kontrolü
      ↓
En uygun yardımcıların bulunması
      ↓
Kullanıcı onayı
      ↓
Saat ve aktivite planı
      ↓
Hizmetin gerçekleştirilmesi
      ↓
Ödeme ve NAVIAR CARE komisyonu
      ↓
Geri bildirim ve kalite kontrolü
```

## Mevcut varlıkların fazlara eşlenmesi (02.09.2026)

| Varlık | Faz | Durum |
|---|---|---|
| Landing sayfası (naviar-care/index.html, canlı: naviar-care-live-bet-art.vercel.app) | Design/Validate girişi | Yayında; talep formu mailto-pilot modunda |
| Fritidskontakt hattı + Drammen analizi (docs/fritidskontakt-modeli.md) | Define/Discover | Kategoriler 1-2-6'yı karşılıyor |
| NærHjelp konsepti (diğer oturum, artifact) | Define | Kategoriler 3-4-5'i karşılıyor; iç değerlendirme fazında |
| Uzman danışma hattı (8 fagområde) | Define dışı ek hat | Ana hizmet tanımına girmiyor — konumu netleştirilecek |
| Uyum ilkeleri (docs/uyum-ilkeleri.md) | Tüm fazlar | Bağlayıcı; madde 2 = Build fazındaki "önce manuel" kararıyla uyumlu |
| Pilot ölçüm altyapısı | Validate | Yok — pilot öncesi kurulacak |
| Ödeme/komisyon sistemi | Build | Yok; öncesinde hukuki statü incelemesi bekleniyor |

**Açık strateji notu:** Ana hizmet tanımı saatlik yardımcı platformunu
merkeze koyuyor; landing sayfası bugün uzman danışma + koordinasyon
öncelikli anlatıyor. İki anlatı Validate öncesinde tek hikâyede
birleştirilmeli (öneri: "koordinasyon" çatı kalır, saatlik yardımcı
hizmeti birincil ürün olur, uzman hattı destek katmanına iner).
