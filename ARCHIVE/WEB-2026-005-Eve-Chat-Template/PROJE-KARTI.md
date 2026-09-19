# WEB-2026-005 – Eve Chat Template

> **Değiştirilmemiş Vercel "eve" şablonu.** Bu depoda özel iş mantığı YOK;
> stok haliyle duruyor. WEB projesi olarak sayıldı çünkü çalıştırılabilir bir
> web uygulaması iskeletidir, ama içeriği Betul'e özgü değil.

- **Proje numarası:** WEB-2026-005
- **Resmî proje adı:** Eve Chat Template (`eve-chat-template`)
- **Önceki isimleri:** —
- **Kısa açıklama:** Next.js sohbet arayüzü şablonu (Vercel "eve" ailesi); parola erişimiyle başlar, üretimde Sign in with Vercel + Neon + Upstash'e yükselir.
- **Temel amaç:** Bir "eve" ajanı için hazır sohbet arayüzü iskeleti.
- **Çözdüğü problem:** (Şablon — Betul'e özgü bir problem henüz bağlanmamış.)
- **Hedef kullanıcılar:** (Şablon; belirlenmemiş.)
- **Proje sahibi:** Betul (`andersenbetul-alt`) — şablon Vercel kaynaklı.
- **Başlangıç tarihi:** Bu ağaçta 2026-08-30 (monorepo `8bf738a`). Upstream: `github.com/vercel/eve-examples`.
- **Son güncelleme:** 2026-08-30 (monorepo katılımı); o günden beri değişmedi.
- **Güncel durum:** Beklemede (değiştirilmemiş şablon).
- **Güncel sürüm:** `package.json` `0.0.0`; git tag yok.
- **Son kararlı sürüm:** **Değiştirilmemiş şablon** (madde 10 — özel dağıtım yok).
- **Canlı adres:** Bu depoda dağıtılmıyor. (Referans demo: chat.eve.dev — Vercel'in kendi demosu.)
- **Test adresi:** yerel `pnpm install && pnpm dev` (MONOREPO).
- **Kod deposu:** aynı depo, `agents/eve-chat-template/`. Upstream `vercel/eve-examples/tree/main/eve-chat-template`.
- **Aktif Git dalı:** — (monorepo'ya katıldı)
- **Kullanılan teknolojiler:** Next.js 16 + React 19 + shadcn/ui + Tailwind + Streamdown + Better Auth + Drizzle + Neon (üretim modunda). Starter modunda parola + localStorage.
- **Veri hassasiyet seviyesi:** Şablon varsayılanı. Starter modda sohbetler tarayıcı localStorage'ında; üretim modunda Neon. `.env` içeriği bu belgeye kopyalanmadı; değişken adları: `EVE_CHAT_PASSWORD`, Neon/Upstash/Sign in with Vercel değişkenleri (README).
- **İlgili projeler:** WEB-2026-006 (aynı "eve" ailesi).
- **Güncel öncelikler:** Yok. Karar: kullanılacak mı, arşivlenecek mi?
- **Bilinen sorunlar:** Özelleştirilmemiş; QBLOGG'un "çatı/derleme yok" felsefesiyle çelişir; içinde Betul'e özgü iş yok.
- **Sonraki adım:** Kullanıcı kararı (tut/kullan/arşivle).
- **Son doğrulama tarihi:** 2026-09-03.

---

## Nasıl düşünüldü (madde 4)

- **İlk fikir:** İleride bir Slack/chat entegrasyonu için referans olabilir
  (docs/proje-envanteri.md notu).
- **Neden burada?** "Butun projeleri buraya tasi" — MONOREPO ile stok şablon
  taşındı.
- **Değiştirilen/eklenen:** Hiçbir şey — stok.
- **Şu an neredeyiz?** Atıl referans.
- **Bilgi bulunamadı – kullanıcı doğrulaması gerekli:** Bu şablonun hangi
  girişime bağlanacağı (varsa).
