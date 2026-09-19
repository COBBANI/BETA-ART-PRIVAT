---
name: beta-art-ozellik
description: Beta Art Privat arşiv sitesine (apps/beta-art-archive) yeni bir özellik/sistem eklerken uygulanan kurulum disiplini — dürüst v1 (statik sitede backend yoksa cihaz-içi), uydurma yasağı, 8 dil, tema tokenları, komisyon-ve-mva.md para modeli, ziyaretçi/yönetici sistem ayrımı, Playwright doğrulama ve günlük+commit+deploy teslim zinciri. Kullanıcı bu depoda "sistem kur", "özellik ekle", satış/davranış/öneri/panel/grafik/ödeme/hesap gibi bir şey istediğinde MUTLAKA bu beceriyi yükle — kullanıcı beceriyi adıyla anmasa bile. QBLOGG değil, Beta Art (beta-art-archive) işidir.
owner: Beta Art
---

# Beta Art özellik kurma disiplini

Bu beceri, `apps/beta-art-archive` (React 18/19 + TS + Vite, Vercel'de canlı)
sitesine oturum boyunca eklenen sistemlerden (davranış/öneri katmanı, satış
takibi, gelir grafiği, sosyal medya entegrasyonu) damıtılmış tekrar eden
kalıptır. Amaç: her yeni özelliği aynı disiplinle, sitenin kendi kanıt/dürüstlük
markasını bozmadan kurmak.

CLAUDE.md "Değişmez kurallar" her zaman üstündür; burası Beta Art'a özgü işleyiş
katmanıdır. Bir çelişki olursa CLAUDE.md kazanır.

## Önce sınıflandır: ne tür bir özellik?

Özelliğin kime hizmet ettiğini ilk adımda belirle, çünkü kurallar ona göre değişir:

- **Ziyaretçi (public) özelliği** — herkese açık sayfalarda görünür; 8 dil kuralı,
  tema tokenları ve gizlilik zorunlu.
- **Yönetici (admin) özelliği** — siteyi yöneten kişi içindir; gizli `#admin`
  altında, etiketleri i18n dışı düz EN/NO olabilir (aşağıya bak).

İki sistem birbirinden ayrı tutulur: ayrı localStorage anahtarı, ayrı sayfa,
biri diğerinin verisini görmez/kirletmez. (Örn. ziyaretçi `ba_davranis_v1`,
yönetici `ba_satis_v1`; admin sayfası davranış kaydı tutmaz.)

## 1. Dürüst v1 — statik sitede backend yoksa cihaz-içi

Bu site statiktir (sunucu yok, formlar `mailto`, ödeme henüz canlı değil). Bir
özelliğin gerçek karşılığı sunucu istiyorsa, onu **simüle etme** — cihaz-içi
dürüst bir v1 kur ve gerisini açıkça sonraki adım olarak yaz:

- Durum tarayıcıda tutulur (`localStorage`), **hiçbir ağ isteği, çerez, üçüncü
  taraf analitik, parmak izi yok**. Site markası "kanıt + dürüstlük"; sessizce
  veri toplamak markayı çürütür.
- Her `localStorage` okuma/yazma `try/catch` içinde; gizli sekmede/engelliyse
  sistem **sessizce kapanır**, site aynı çalışır.
- **Soğuk başlangıçta hiçbir şey uydurma.** Etkinlik/veri yoksa bileşen `null`
  döner — dolgu (filler) veri, sahte öneri, sahte sayı yok.
- Kullanıcıya **görünür kontrol** ver: "Forget my activity", "clear", silme.
  Şeffaflık (verinin nerede durduğunu söyleyen bir satır) özelliğin parçasıdır.
- Sunucu isteyen kısımları (çapraz-ziyaretçi analitik, hesap profili, otomatik
  ödeme yakalama, parola korumalı panel) **bilinçle kapsam dışı** bırak ve
  ilgili belgede "sonraki adım" olarak yaz.

## 2. Uydurma yasağı (CLAUDE.md ile aynı)

- Doğrulanmamış hiçbir iddia yayınlanmaz: müsaitlik, istatistik, "Stripe'a bağlı
  otomatik", kullanıcı adı müsaitliği vb. Doğrulanamıyorsa "doğrulanmadı" diye
  işaretle.
- Sahte ödeme/otomasyon akışı kurulmaz. "Şu an elle, backend gelince otomatik"
  denir — yanlış olan değil, doğru olan yazılır.
- Birebir kaynak katmanına (beta-art.com'dan yapıştırılan İngilizce metin,
  `data.ts` başlığındaki not) dokunman gerekiyorsa, her sapmayı gerekçesiyle
  o dosyanın başına kaydet (uydurma yasağı > birebir sadakat).

## 3. Sekiz dil (ziyaretçi metinleri)

- Görünen her ziyaretçi metni `src/lib/i18n.ts`'te **sekiz dile birden** eklenir:
  en, no, tr, it, fr, es, pt, de. Sıra bu; anahtarı sekiz sözlüğe de ekle.
- Eklerken güvenli desen: bir çapa anahtarın (ör. `footerNoAi`/`footerFollow`)
  her dildeki satırının hemen ardına yeni anahtarı Python betiğiyle enjekte et,
  sonra `i == 8` doğrula (bu oturumda kullanılan yöntem).
- Eser adları, teknik terimler, yer adları, `kr 190`, e-posta **çevrilmez**.
- **İstisna — yönetici araçları:** `#admin` gibi iç araçların etiketleri i18n
  dışı düz EN/NO olabilir (owner-facing, public değil). Bu bilinçli bir istisna;
  ilgili belgede gerekçesini yaz.

## 4. Tema tokenları — ham hex yok

- Renk doğrudan hex yazılmaz. Mevcut tokenlar kullanılır: Tailwind sınıfları
  (`text-accent`, `bg-secondary`, `border-border`) ya da satır içi SVG'de
  `hsl(var(--accent))`, `hsl(var(--foreground))`, `hsl(var(--muted-foreground))`,
  `hsl(var(--border))`. Böylece açık/koyu tema kendiliğinden çalışır.
- Grafik/görsel iş için `dataviz` becerisini yükle; tek seri → tek renk (accent),
  efsane yok; çok seri → kategorik palet + validator.

## 5. Para modeli tek kaynağı

Para/komisyon/MVA'ya dokunan her özellik `docs/beta-art/komisyon-ve-mva.md`'yi
kaynak alır — sayıyı oraya bakmadan yazma:
- Komisyon **%30 Beta Art / %70 fotoğrafçı**; kesinti tepeden düşülür.
- Beta Art'ın kendi plakalarında komisyon yok (net tamamen işletmede).
- İşletme MVA kayıtlı **değil** → hiçbir yerde KDV satırı yok; `kr 190` nihai.
- Stripe kesinti tahmini: yurt içi kart %1,5 + 1,80 kr (yurt dışı/döviz ek).
Model değişirse önce o belge güncellenir, sonra kod.

## 6. Doğrulama (hedefe göre yürüt)

Commit'ten önce:
1. `cd apps/beta-art-archive && npm run build` — `tsc -b && vite build` temiz olmalı.
2. **Playwright duman testi** — davranışı uçtan uca doğrula. Bu ortamda:
   - `NODE_PATH=/opt/node22/lib/node_modules node - <<'EOF' ...` ile global
     playwright'i kullan; `chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })`.
   - `npx vite preview --port <boş port>` ile derlenmiş çıktıyı sür.
   - Kontrolleri bir dizi olarak topla, `PASS/FAIL` bas, hepsi geçmezse `exit 1`.
   - Hash-only gezinme (`#admin`) tam yeniden yükleme tetiklemez — testte taze
     `goto('.../#admin')` veya ayrı context kullan.
3. **Görsel iş** (grafik/tasarım) için ek adım: ekran görüntüsü al ve Read ile
   bak (dataviz 7. adım — "render edip bak").

## 7. Teslim zinciri

1. **Belge:** `docs/beta-art/<özellik>.md` — ne yapar, dürüstlük çerçevesi,
   teknik, doğrulama, bilinçli kapsam dışı + sonraki adımlar. Ayrıca
   `docs/proje-gunlugu.md`'ye tarihli kısa kayıt (kullanıcı talimatı).
2. **Commit + push:** git komutlarını **her zaman `/home/user/BETA-ART`
   kökünden, taze bir Bash çağrısında** çalıştır. `cd apps/beta-art-archive`
   yapan bir komuttan sonra `git add apps/beta-art-archive/...` yolu ikiye
   katlanıp patlar. `git push -u origin claude/beta-art-privat-g7k5vk`.
3. **Deploy:** tek dosyalık `vercel.json` ile `deploy_to_vercel` (team
   `team_xNtowH7U0jXQrI53DFJFzH2o`, proje `beta-art-privat`). `buildCommand`
   `rm -rf kaynak` ile başlar (derleme önbelleği klon klasörünü geri getirir),
   sonra dalı `--depth 1` klonlar. ~15 sn sonra `get_deployment` ile READY
   doğrula. Üretim: https://beta-art-privat-phi.vercel.app

## Ortam tuzakları (bu oturumda bedeli ödendi)

- **`pkill` asla commit/push/dosya-yazma ile aynı bileşik komutta olmaz** —
  belirsiz çıkışla (exit 144) zinciri keser, sonraki adımlar sessizce
  yapılmaz. Süreç öldürmeyi ayrı çağrıda çalıştır; kesilen zincirden sonra
  `git status` ile ne kadarının gerçekleştiğini doğrula.
- **git her zaman kökten** (yukarıda madde 7.2).
- Egress proxy: beta-art.com, adobe indirme uçları, google/nominatim engelli;
  Vercel URL'leri için `web_fetch_vercel_url`, araştırma için WebSearch/WebFetch.
- Yeni dış servis bağlanırsa CSP `connect-src` güncellenmeli (yoksa istek
  sessizce engellenir) — ama dürüst v1 zaten dışarı istek atmaz.

## Bu disipline uyan mevcut örnekler (kalıp için oku)

- `src/lib/behavior.ts` + `src/components/ForYou.tsx` — ziyaretçi öneri sistemi.
- `src/lib/sales.ts` + `src/pages/Admin.tsx` — yönetici satış takibi + gelir grafiği.
- `docs/beta-art/davranis-sistemi.md`, `satis-takip.md` — dürüstlük çerçevesi +
  kapsam-dışı yazımının modeli.
