# WEB-2026-006 – Eve Slack Agent

> **Değiştirilmemiş Vercel "eve" Slack-agent şablonu.** Bu depoda özel iş
> mantığı YOK (stok: `agent/agent.ts`, örnek araç `get_weather.ts`). WEB
> numarası, dağıtılabilir bir web/servis iskeleti olduğu için verildi; ama
> bir web *sitesi* değil, Slack botu.

- **Proje numarası:** WEB-2026-006
- **Resmî proje adı:** Eve Slack Agent (`eve-slack-agent-template`)
- **Önceki isimleri:** —
- **Kısa açıklama:** Vercel "eve" framework'ü için Slack botu şablonu — webhook yönetimi, Vercel Connect, başlangıç ajanı, örnek araç.
- **Temel amaç:** Slack üzerinden çalışan bir "eve" ajanı iskeleti.
- **Çözdüğü problem:** (Şablon — Betul'e özgü iş henüz bağlanmamış. MONOREPO'ya göre `naviar-consult` ve `hxi-music` Vercel projeleri bu koda bağlı.)
- **Hedef kullanıcılar:** (Şablon.)
- **Proje sahibi:** Betul (`andersenbetul-alt`) — şablon Vercel kaynaklı; Vercel deploy'ları `betulandersen-droid` hesabına bağlı görünüyor.
- **Başlangıç tarihi:** Bu ağaçta 2026-08-30 (monorepo `8db81ea`). Upstream: `vercel/eve-examples`.
- **Son güncelleme:** 2026-08-30; o günden beri değişmedi.
- **Güncel durum:** Beklemede (değiştirilmemiş şablon).
- **Güncel sürüm:** `package.json` `0.0.0`; git tag yok.
- **Son kararlı sürüm:** **Değiştirilmemiş şablon.**
- **Canlı adres:** Bu depoda dağıtılmıyor. Bağlı Vercel projeleri: `naviar-consult`, `hxi-music` (MONOREPO — GitHub kaynağı `betulandersen-droid/eve-slack-agent`).
- **Test adresi:** yerel `pnpm install && pnpm dev` (`vercel link` + `vercel env pull` gerektirir).
- **Kod deposu:** aynı depo, `agents/eve-slack-agent/`. Upstream `vercel/eve-examples/tree/main/eve-slack-agent-template`.
- **Aktif Git dalı:** — (monorepo'ya katıldı)
- **Kullanılan teknolojiler:** TypeScript + pnpm + "eve" framework (Claude Sonnet — MONOREPO notu). Slack konektörü (`agent/channels/slack.ts`), araçlar (`agent/tools/`).
- **Veri hassasiyet seviyesi:** Şablon varsayılanı. Slack konektörü + Vercel env değişkenleri (`SLACK_CONNECTOR`). `.env`/anahtar içeriği bu belgeye kopyalanmadı; yalnız değişken adı not edildi.
- **İlgili projeler:** WEB-2026-005 (aynı "eve" ailesi), WEB-2026-004 (naviar-consult bu koda bağlı).
- **Güncel öncelikler:** Yok. Karar: kullanılacak mı, arşivlenecek mi?
- **Bilinen sorunlar:** Özelleştirilmemiş; içinde Betul'e özgü iş yok; ama `naviar-consult`/`hxi-music` deploy'ları buna bağlı görünüyor (kalıntı mı, aktif mi belirsiz — MONOREPO).
- **Sonraki adım:** Kullanıcı kararı; `naviar-consult`/`hxi-music` bağının gerçek mi kalıntı mı olduğunu doğrulama.
- **Son doğrulama tarihi:** 2026-09-03.

---

## Nasıl düşünüldü (madde 4)

- **İlk fikir:** İleride Slack entegrasyonu için referans (docs/proje-envanteri.md).
- **Neden burada?** MONOREPO taşıması.
- **Değiştirilen/eklenen:** Hiçbir şey — stok (örnek `get_weather.ts` aracı, `plan_a_trip.md` becerisi Vercel'in kendi örnekleri).
- **Şu an neredeyiz?** Atıl referans; ama iki Vercel projesi (naviar-consult, hxi-music) bu repoya bağlı görünüyor.
- **Bilgi bulunamadı – kullanıcı doğrulaması gerekli:** naviar-consult/hxi-music'in bu stok şablonla gerçekten mi çalıştığı, yoksa bağın kalıntı mı olduğu.
