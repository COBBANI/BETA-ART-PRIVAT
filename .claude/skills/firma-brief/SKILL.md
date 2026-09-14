---
name: firma-brief
description: >
  BET-ART haftalık iş brief'i (small-business eklentisinin monday-brief/
  friday-brief akışının şirkete özel hali). Kullanıcı "brief", "haftalık
  özet", "pazartesi brief", "cuma brief", "iş durumu", "business pulse"
  dediğinde MUTLAKA bu beceriyi kullan. Kaynaklar Gmail + Google
  Calendar + Vercel + depo; muhasebe/CRM bağlı DEĞİL, gelir iddiası
  üretme.
---

# firma-brief — BET-ART haftalık iş brief'i

Şirket bağlamı: `docs/firma-profili.md` (tek kaynak — önce oku).
İki iş kolu: QBLOGG (yayında, hedef = brief formu doldurtmak) ve
NAVIAR CARE (lansman öncesi pilot; gerçek ödeme hukuk kapısına bağlı).

## Veri toplama (yalnızca bağlı kaynaklar)

1. **Gmail** (`mcp__Gmail__search_threads`): son 7 gün.
   Aranan: QBLOGG brief-formu/mailto başvuruları, NAVIAR henvendelser,
   yazar başvuruları, Vercel/GitHub servis uyarıları. Kişisel postayı
   brief'e TAŞIMA — yalnız iş kalemleri.
2. **Google Calendar** (`list_events`): önümüzdeki 7 gün.
3. **Vercel** (`mcp__Vercel__list_deployments`, proje `qblogg` +
   naviar-care-live): son dağıtım durumu. Bilinen arıza: kişisel
   hesaptaki ~6 eski proje günlük 100 limiti dolduruyor — bunu her
   brief'te yeniden keşfetme, tek satırda "bilinen engel" olarak geç.
4. **Depo**: açık işler `ROADMAP.md` + naviar-care/docs (hukuk kapısı,
   Faz 1 görüşmeleri, görsel yükleme). PR #11 durumu.

Stripe'ta henüz işlem yok; boş nakit raporu ÜRETME — "ödeme altyapısı
bağlı, işlem yok" de ve geç.

## Çıktı biçimi (değişmez)

```
# BET-ART Haftalık Brief — <tarih>
## Bu hafta olan          (3-6 madde, kaynağıyla)
## Para                   (gerçek veri yoksa tek satır: pre-revenue)
## Gelen talepler         (lead sayısı + en acili; yoksa "yok")
## Önümüzdeki 7 gün       (takvim + planlı işler)
## Tek karar              (sahibinin bu hafta vermesi gereken EN önemli karar)
```

## Kurallar

- Gelir/ciro iddiası yok — şirket pre-revenue; rakam varsa kaynağı yazılır.
- Örnek fiyatlar (250 kr/t, %15-25, paket fiyatları) gerçek fiyat gibi
  anılmaz; "eksempel" işareti korunur.
- Sağlık verisi ve tam kimlik brief'e girmez (NAVIAR uyum ilkeleri).
- Paraya/müşteriye dokunan öneri = öneri olarak yazılır, uygulanmaz;
  sahibi onaylar.
- Brief'i Türkçe yaz; Norveççe terimleri (henvendelse, oppfølging)
  çevirmeye zorlama.

## Bilinen engel (02.09.2026'da yaşandı)

Gmail/Google Calendar bağlayıcı token'ı süresi dolmuş olabilir
("requires re-authorization"). Uzak oturumda OAuth yenilenemez —
brief'i eldeki kaynaklarla üret, eksik kaynağı "yetki yenilenmeli
(claude.ai → Settings → Connectors)" satırıyla işaretle, uydurma.
