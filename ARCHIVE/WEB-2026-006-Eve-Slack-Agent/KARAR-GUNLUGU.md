# WEB-2026-006 — KARAR GÜNLÜĞÜ

Promptun madde 7 formatı.

---

## DEC-2026-08-30-001 – Şablon monorepoya taşındı (özelleştirme yapılmadı)

- **Tarih:** 2026-08-30
- **Proje:** WEB-2026-006
- **Proje aşaması:** Discover
- **Kararı alan:** Betul ("Butun projeleri buraya tasi")
- **Konu:** Vercel "eve" Slack-agent şablonunu bu ağaçta tutmak.
- **Seçilen çözüm:** Stok haliyle `agents/eve-slack-agent/` altına taşındı.
- **Kararın durumu:** Uygulandı (taşındı, değiştirilmedi).

## DEC-BEKLIYOR-001 – naviar-consult / hxi-music bağı doğrulanmalı

- **Konu:** MONOREPO'ya göre iki Vercel projesi (`naviar-consult`, `hxi-music`) bu koda bağlı; gerçek mi kalıntı mı?
- **Neden önemli:** Eğer bu deploy'lar canlıysa, bu "stok şablon" aslında iki girişimi çalıştırıyor olabilir; o zaman durum "Beklemede" değil "Yayında" olmalı.
- **Kararın durumu:** Bekliyor — kullanıcı Vercel'de bu iki projenin durumunu/bağlı repo commit'ini doğrularsa kart güncellenir.

## DEC-BEKLIYOR-002 – Tutulacak mı, arşivlenecek mi?

- **Konu:** Değiştirilmemiş şablon; kullanılacak mı?
- **Kararın durumu:** Bekliyor (kullanıcı).

---

> **Bilgi bulunamadı – kullanıcı doğrulaması gerekli:** naviar-consult/hxi-music
> deploy'larının gerçek içeriği; bu şablonun hangi girişime hizmet ettiği.
