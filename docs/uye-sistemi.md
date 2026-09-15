# QBLOGG üye sistemi (Q Brief Pro) — kurulum ve mimari

Tarih: 24.08.2026 · Durum: v1 CANLI (yapılandırmasız iskelet) — https://qblogg-uye.vercel.app ;
Supabase projesi kullanıcı adımı bekliyor
Karar kaydı: kullanıcı onayı ile — ayrı üye uygulaması · kapsam Q Brief Pro ·
giriş yöntemi magic link (şifresiz). İş modelindeki karşılığı: B1→B2 basamağı
(`docs/is-modeli.md`).

## Mimari

```
qblogg.com (mevcut site)          DEĞİŞMEDİ — sıfır bağımlılık, statik
        │  (yalnız bağlantı)
        ▼
uye.qblogg.com (yeni, ayrı Vercel projesi)
  uye/index.html   istemci iskeleti
  uye/app.js       magic link girişi + brief arşivi (CSP uyumlu modül)
  uye/build.mjs    Vercel ortamından dist/config.js üretir
  uye/config.js    yalnız doğrudan yerel önizleme için boş yapılandırma
  uye/vercel.json  bu uygulamaya özel başlıklar/CSP
        │
        ▼
Supabase (auth.users + Postgres)
  uye/schema.sql   profiles + briefs + RLS politikaları
```

- Ana sitenin dağıtımı `uye/` klasörünü hiç kopyalamaz; iki uygulama ayrı
  Vercel projeleridir. Sitenin "çerez yok, üçüncü taraf yok" vaadi bozulmaz —
  o vaat qblogg.com içindir, üye uygulamasının kendi gizlilik notu olacaktır.
- Üye uygulaması bağımlılık kurmayan `node build.mjs` ile paketlenir; çıktı `dist`.
  Supabase istemcisi depoda tutulur (uye/lib/, sürüm+lisans+sha256 kaydı
  lib/KAYNAK.md içinde). CDN yok; CSP yalnız *.supabase.co bağlantılarına izin verir.
- Gövde metinleri `textContent` ile basılır (markdown şimdilik düz metin
  gösterilir) — HTML enjeksiyon yüzeyi yoktur.

## Veri modeli ve engine ile ilişki

v1 iki tablodur: `profiles` (auth.users'a bağlı; `plan_status`:
free/active/lapsed) ve `briefs` (arşiv; `is_sample=true` olanlar girişsiz
tanıtım içeriğidir). Erişim RLS ile: aktif olmayan üye yalnız örnekleri görür.

`engine/schema-billing.sql`'in dört tasarım kararı bilinçli olarak v2'ye
devredildi ve UNUTULMAMALI:
1. Para tam sayı (øre) saklanır.
2. Bakiye sütunu değil append-only kredi defteri.
3. **Hak (entitlement) ödemeden ayrıdır** — v1'deki `plan_status` alanı bu
   ilkenin kısayoludur; Stripe webhook bağlanınca (v2, Supabase edge function)
   entitlement tablosuna geçilir.
4. Webhook tekilliği (aynı olay iki kez işlenmez).

v1'de ödeme durumu elle güncellenir: Supabase panel → Table editor →
profiles → ilgili satırda `plan_status` = `active` (ödeme onayı sizden geçer).

## Kurulum — sizin adımlarınız (adım adım)

1. **Supabase projesi açın:** supabase.com → Sign in → **New project**.
   Organization: kendi hesabınız; Name: `qblogg-uye`; Database password:
   güçlü bir şifre (not alın, bana GÖNDERMEYİN); Region: **eu-north-1
   (Stockholm)** ya da en yakın AB bölgesi → **Create new project**.
   1-2 dakika kurulum sürer.
2. **Şemayı çalıştırın:** sol menü **SQL Editor** → New query →
   depodaki `uye/schema.sql` içeriğini yapıştırın → **Run**.
   "Success. No rows returned" görmelisiniz. Hata görürseniz mesajı bana
   aynen yapıştırın.
3. **Auth ayarı:** sol menü **Authentication → URL Configuration** →
   *Site URL* alanına üye uygulamasının adresini yazın (ilk aşamada
   `https://qblogg-uye.vercel.app`, alan adı bağlanınca
   `https://uye.qblogg.com`) → Save. (Magic link e-postaları varsayılan
   Supabase göndericisiyle çalışır; özel gönderici v2 konusu.)
4. **Genel istemci ayarlarını alın:** Supabase projesinin **Connect** veya
   **Settings → API Keys** ekranından Project URL ve `sb_publishable_...`
   anahtarını alın. Eski `anon` anahtarı da desteklenir. `service_role` veya
   `sb_secret_...` değerini tarayıcı uygulamasında kullanmayın.
5. **Mevcut üyelik projesini ayarlayın:** Vercel → ilgili proje → **Settings →
   Build and Deployment**: Root Directory `uye`, Build Command `node build.mjs`,
   Output Directory `dist`, Install Command boş. Ardından **Settings →
   Environment Variables** altında `UYE_SUPABASE_URL` ve
   `UYE_SUPABASE_PUBLISHABLE_KEY` ekleyin. Eski anon anahtarı kullanılacaksa
   ikinci ad `UYE_SUPABASE_ANON_KEY` olabilir. Preview ve Production ortamlarını
   doğru Supabase projeleriyle ayrı ayrı eşleştirin; değerleri sohbete göndermeyin.
6. **Yeniden dağıtın:** **Deployments → Redeploy**. Eksik ayarda derleme hangi
   değişkenin gerektiğini söyler; gizli/yanlış türde anahtarı ve CSP dışı adresi
   reddeder. Başarılı pakette yalnız istemci dosyaları bulunur; SQL ve kaynak
   betikleri `dist/` içine alınmaz. Genel anahtar tarayıcıdan okunabilir; veri
   güvenliği `schema.sql` içindeki RLS ve Supabase Auth üzerinden sağlanır.
7. **Girişi doğrulayın:** önizleme URL'sini Supabase'in izinli Redirect URLs
   listesine tam adresiyle ekleyin. Magic link ile giriş, çıkış, örnek brief ve
   aktif olmayan kullanıcının ücretli brief erişimini sınayın.

Yerel paketleme: Node.js 24+ ile proje kökünden
`node --env-file=uye/.env.local uye/build.mjs`; `.env.local` içine yalnız yukarıdaki
iki genel istemci ayarını yazın ve bu dosyayı Git'e eklemeyin. Doğrudan statik
önizlemede kaynak `config.js` boş kaldığında kurulum ekranı gösterilir.

Bu değişiklik Supabase projesi veya kullanıcı oluşturmaz; gerçek proje URL'si,
anahtarı, Auth izinleri ve RLS kurulumu ayrıca doğrulanmalıdır.
Kaynak: [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys).

## v1 sınırları (bilinçli)

- Ödeme entegrasyonu yok (elle aktivasyon) — Stripe Payment Link +
  webhook v2.
- Tek dil (TR) — talep olursa i18n.
- Brief içerikleri düz metin — zengin biçim v2.
- Ana siteye "Üye girişi" bağlantısı, uygulama canlıya çıkınca eklenecek
  (iskelet kuralı gereği 8 sayfada birden).
