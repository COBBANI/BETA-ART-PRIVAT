# SHARED-WEB-LIBRARY — ortak, yeniden kullanılabilir bileşen kaydı

Promptun madde 11'i. Bu dizin, projeler arasında tekrar kullanılabilecek
kodun **sürümlenmiş, kaynağı belirtilmiş kaydıdır** — kodun kendisi kopyalanmaz;
her öğe kaynak projesine + dosyasına bağlanır (deponun "az dosya, kopyalama yok"
felsefesi + promptun "kodu gereksiz kopyalama" kuralı).

**Kapsam kararı (Betul, 2026-09-03):** hafif. Promptun 20 alt klasörlü ağacı
kurulmadı; onun yerine tek `REGISTRY.md` her adayı sınıflandırır. Bir öğe
gerçekten iki+ projede paylaşılır hale geldiğinde, o zaman fiziksel ortak
paket (npm workspace / git submodule) ayrı bir kararla kurulur.

## İlkeler (madde 11)

- **Projeye özel kod ortak bileşene taşınmaz:** marka metinleri, sabit URL'ler,
  erişim bilgileri, iş kuralları (ör. komisyon oranı, kr 190) ortak katmana
  girmez — bunlar proje parametresi olarak kalır.
- **Bağımlılık analizi önce:** bir öğeyi ortaklaştırmadan önce bağımlılıkları
  incelenir; taşınamayanlar "İnceleme gerekli" işaretlenir.
- **Sınıflar:** Olduğu gibi yeniden kullanılabilir · Küçük düzenleme ile
  kullanılabilir · Projeye özel · Kullanımdan kaldırılmalı · Güvenlik nedeniyle
  kullanılmamalı · İnceleme gerekli.

## Mevcut durum

Bugün **fiziksel olarak paylaşılan** kod YOK — her proje kendi kopyasını taşıyor.
`REGISTRY.md`, iki+ projede tekrar eden ve ortaklaştırılmaya **aday** desenleri
listeler. Fiili ortaklaştırma (paket kurma) ayrı bir karardır; bu kayıt onu
hazırlar, kendiliğinden yapmaz.

## Güncelleme kuralı

Yeni bir tekrar eden desen görüldüğünde `REGISTRY.md`'ye bir satır eklenir
(kaynak proje + dosya + sınıf). Bir desen gerçekten ortak pakete alınırsa,
satır "fiziksel konum" ile güncellenir.
