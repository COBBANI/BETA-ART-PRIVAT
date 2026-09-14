# WEB-2026-002 — NAVIAR CARE Hverdagsstøttepilot

Bu paket, `web-design-platform-studio` skill’inin uçtan uca örnek uygulamasıdır.

## Kullanılan örnek kullanıcı istemi

> NAVIAR CARE için Oslo/Viken pilotuna yönelik; yaşlıları, yakınlarını ve gelecekteki yardımcıları buluşturan; Norveççe, İngilizce ve Türkçe çalışan; hizmet kapsamını, fiyat durumunu, talep/rezervasyon akışını ve gizlilik sınırlarını açıkça anlatan profesyonel bir web sitesi oluştur. Uygun web platformunu seç, responsive prototipi kur, temel ilgi formunu ekle ve canlı entegrasyonlarla demo durumunu birbirinden ayır.

## Sonuç

- Arşiv numarası: `WEB-2026-002`
- Proje adı: `NAVIAR CARE – Hverdagsstøttepilot`
- Varsayılan dil: Bokmål (`nb`)
- Dil seçenekleri: Bokmål, English, Türkçe
- Durum: tasarım ve içerik prototipi
- Rezervasyon, e-posta, ödeme, CRM ve analiz: bağlı değil
- Kapsam: düşük riskli günlük yaşam desteği

## Dosyalar

- `index.html` — ana sayfa ve temel kullanıcı yolculuğu
- `personvern.html` — prototip veri durumu ve lansman öncesi gereklilikler
- `styles.css` — responsive görsel sistem
- `app.js` — dil değişimi, mobil menü ve yerel demo formu
- `content/site-content.json` — CMS’e taşınmaya hazır içerik modeli
- `brand/` — arşivden geri alınan NAVIAR CARE logo adayı
- `docs/` — platform kararı, konsept, karar günlüğü ve QA raporu
- `scripts/check.mjs` — bağımlılıksız yapısal kalite kontrolü

## Yerel önizleme

Basit bir statik sunucu ile proje klasöründe çalıştırılabilir:

```bash
python3 -m http.server 4173
```

Sonra `http://127.0.0.1:4173` adresini açın. Dil testi için `?lang=en` veya `?lang=tr` kullanılabilir.

## Kontrol

```bash
node scripts/check.mjs
```

Bu paket canlı hizmet olarak sunulmaz. Gerçek kullanıcı verisi, sağlık bilgisi, kimlik numarası veya ödeme bilgisi girmek için kullanılmamalıdır.
