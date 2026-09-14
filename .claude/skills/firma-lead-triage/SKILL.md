---
name: firma-lead-triage
description: >
  Gelen talepleri (lead) Gmail'den ayıklayıp önceliklendirir ve yanıt
  taslağı hazırlar — small-business eklentisinin lead-triage/call-list
  akışının BET-ART'a özel hali. Kullanıcı "lead", "gelen talepler",
  "başvuruları tara", "kim yazmış", "yanıt taslağı" dediğinde ya da
  QBLOGG brief formu / NAVIAR henvendelse takibi istendiğinde MUTLAKA
  bu beceriyi kullan. CRM bağlı değil — kaynak Gmail'dir.
---

# firma-lead-triage — gelen talep ayıklama

Şirket bağlamı: `docs/firma-profili.md`. CRM yok; HubSpot bağlı değil.
Lead'lerin tek kaynağı Gmail. Uydurma lead üretme: bulunan neyse o.

## Akış

1. `mcp__Gmail__search_threads` ile son 14 günü tara. Üç sınıf:
   - **QBLOGG müşteri**: brief formu / içerik hattı talebi
   - **QBLOGG yazar**: stüdyoya katılım başvurusu
   - **NAVIAR**: henvendelse / pilot ilgisi / kurum (kommune, BPA)
2. Her lead için: kim, ne istiyor (tek cümle), yaş (gün), sınıf,
   önerilen öncelik. NAVIAR tarafında sağlık ayrıntısı gelmiş olsa bile
   çıktıya TAŞIMA — "sağlık ayrıntısı içeriyor, özetlenmedi" yaz.
3. En öncelikli 1-3 lead için **yanıt taslağı** hazırla
   (`mcp__Gmail__create_draft` — asla doğrudan gönderme; sahibi
   gönderir). Taslak dili: gelen mesajın dili. NAVIAR taslağında
   ücret anılacaksa "eksempel" işareti korunur ve kesin vaat verilmez.
4. Özet tablo: sınıf başına sayı + yanıtsız en eski lead.

## Kurallar

- E-posta gönderimi, silme, etiketleme YOK — yalnız arama + taslak.
- Kişisel/ilgisiz postalar listeye girmez.
- Kurum lead'i (kommune/BPA) her zaman en üst öncelik — pilot hedefi
  Partner görüşmesidir (forretningsmodell.md).
