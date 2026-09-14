# Arşiv sistemi — her proje klasörü için tek kural

Kullanıcı talimatı (30.08.2026): *"Sistematik olarak her web sayfası
projesi için arşiv sistemi kuruyoruz."* Bu belge o kuralı tek yerde
sabitler. Aynı desen bu depoda zaten iki kez, iki farklı adla vardı
(`skill-observations/archive/`, `beta-art/source-review/`) — buradan
sonra **tek ad ve tek kural** geçerli.

## Kural

Ham/işlenmemiş kaynak malzeme (yüklenen belge, HTML taslağı, zip, dış
plan, ekran görüntüsü, önceki bir oturumun ürettiği herhangi bir dosya)
alan **her proje klasörü**, kendi `source-review/` alt klasörünü tutar:

```
<proje-klasörü>/source-review/intake-YYYY-MM-DD/
  <orijinal dosyalar, değiştirilmeden>
  MANIFEST.md   (birden çok dosya aynı anda geldiyse)
```

- **Tarih = malzemenin depoya girdiği gün**, üretildiği gün değil.
- **Orijinal dosyalar hiç düzenlenmez.** Karar/yorum `MANIFEST.md`'ye
  yazılır, kaynağın kendisine değil.
- Aynı gün birden fazla yükleme gelirse aynı `intake-YYYY-MM-DD/` klasörü
  kullanılır, dosyalar eklenir; `MANIFEST.md` güncellenir.
- Tek dosya geldiyse `MANIFEST.md` şart değil — dosya adı kendini
  anlatıyorsa atlanabilir.

## `MANIFEST.md` biçimi

`beta-art/source-review/intake-2026-08-30/PROJECT-MANIFEST.md` zaten bu
biçimin ilk örneği (kullanıcı kendisi bu formatta üretmişti). Asgari:

```markdown
# Intake — YYYY-MM-DD

## Gelen dosyalar
- dosya-adı.ext — kısa açıklama, nereden geldiği

## Karar
- Bu malzeme neyi değiştirdi/doğruladı/reddetti
- Hangi üretim dosyası/belgesi buna göre güncellendi (varsa)

## Açık kalanlar
- Hâlâ teyit gerektiren noktalar
```

## Ne zaman "üretime" geçer

`source-review/` içindeki hiçbir şey üretim değildir. Bir fikir/belge
onaylanınca **kopyalanır** (taşınmaz) gerçek proje dosyasına; kaynak kopya
`source-review/`de tarihiyle kalır. Geçmiş silinmez — bu, projenin
"uydurma yasağı" ve "geçmiş kayıt korunur" ilkesinin doğal uzantısı
(`CLAUDE.md`, `docs/beta-art-konsept.md`'nin AŞILDI notu aynı ilkeyle
yazıldı).

## Bu depodaki proje klasörleri ve durumları (30.08.2026)

| Klasör | `source-review/` | Not |
|---|---|---|
| *(repo kökü — QBLOGG)* | **Yeni kuruldu** | Kök seviyede `source-review/` — QBLOGG'un kendi ham malzemesi için (şimdiye dek `docs/proje-gunlugu.md` bu işi anlatı biçiminde görüyordu; ikisi birlikte durur, biri ham dosya, biri hikâye) |
| `beta-art/` | Var (26-30.08 arası iki intake) | Kurucu örnek — bu kuralın kendisi buradan çıkarıldı |
| `eve-slack-agent/` | **Yeni kuruldu** | Şu an boş — şablon hiç özelleştirilmedi, arşivlenecek bir şey yok |
| `eve-chat-template/` | **Yeni kuruldu** | Aynı durum |
| `uye/` | **Yeni kuruldu** | Üye uygulaması; ileride şema/tasarım kararları geldiğinde kullanılacak |
| `brand/naviar/` | — | Sınıflandırılmadı: bu klasörün kökeni belirsiz, `naviar-care` (erişilemeyen bir Vercel/GitHub projesi) ile ilgili görünüyor ama bu depoya nasıl girdiği kayıtlı değil. Arşiv kuralı uygulanmadan önce kullanıcıya sorulmalı. |

`skill-observations/archive/` kendi başına kalır — o, ham kaynak
malzemesi değil, **çözümlenmiş gözlem kayıtları** arşivliyor
(`task-observer` becerisinin kendi kuralı, ayrı bir amaç). İkisini
karıştırmayın.

## Bir sonraki oturuma not

Yeni bir dosya/belge/görsel geldiğinde (yüklenen dosya, yapıştırılan
görsel, başka bir araçtan gelen çıktı) önce **hangi proje klasörüne ait
olduğu** belirlenir, sonra o klasörün `source-review/intake-<bugünün
tarihi>/` altına **olduğu gibi** kaydedilir — silinmez, düzenlenmez,
"daha sonra bakarım" diye atlanmaz.
