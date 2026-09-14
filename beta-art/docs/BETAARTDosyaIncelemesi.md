# BETA ART — Bütün dosyaların incelemesi

16 Ağustos 2026 · 227 proje dosyası + yüklenenler

---

## Özet

Üç bulgu var. Birincisi ciddi ve acil, diğer ikisi bilinen sorunun ölçülmüş hali.

1. **Kod tabanı anlık görüntüsü bozuk.** Dosya adları içerikle uyuşmuyor. Bu
   snapshot üzerinden yapılan hiçbir kod çalışması güvenilir değil.
2. **68 HTML dosyasının 38'i benzersiz** — geri kalanı birebir kopya.
3. **Kod tabanı hâlâ eski modeli anlatıyor.** Yeni konumlandırma koda hiç girmemiş.

---

## 1 · Kod tabanı: isim/içerik uyuşmazlığı

Bu, incelemenin en önemli bulgusu.

| Dosya adı | Gerçek içeriği |
|---|---|
| `README.md` | Vitest test dosyası (`llms-txt` testleri) |
| `package.json` | Express sunucu kodu (TypeScript) |
| `tsconfig.json` | JSON değil |
| `routes.tsx` | `cn()` yardımcı fonksiyonu (yani `utils.ts`) |
| `Header.tsx` | 3 satırlık hata fırlatan stub |
| `photo.tsx` | Form yapılandırma JSON'u |
| `Dashboard.tsx` | Lisans şartları JSON'u (İngilizce, 4 lisans tipi) |
| `index.tsx` | Analytics onay kodu |
| `kontakt.tsx` | API istemcisi (10 satır) |
| `cart.tsx` | Website layout bileşeni |
| `vitest_config.ts` | CSS — Google Fonts import'u ile |
| `api-client.ts` | Markdown dokümantasyon |
| `index.ts` | `.gitignore` içeriği |
| `parse.ts` | `.npmrc` içeriği |
| `main.tsx` | Vite plugin testleri |

**12 JSON dosyasının 11'i geçerli JSON değil** — `package.json`, `tsconfig.json`,
`home.json`, `faq.json`, `kontakt.json`, `privacy.json`, `license_terms.json` dahil.

### Bunun anlamı

Klasör yapısı düzleştirilirken ad→içerik eşlemesi kaybolmuş. Sonuçları:

- Bu snapshot **derlenmez**. Kurtarma değil, yeniden dışa aktarma gerekir.
- Bu dosya adlarına dayanarak yapılan **her önceki teknik çalışma şüpheli**. Daha önce
  `seo-routes.ts`, `entry.ts` ve `structured-data.ts` üzerinde yapılmış SEO düzeltmeleri
  var; o adlar da bu snapshot'ta başka içerik taşıyor. Yamaların gerçek kod tabanına
  uyup uymadığı doğrulanmadan uygulanmamalı.
- Gerçek kod tabanı Lovable'da duruyor ve muhtemelen sağlam. Sorun burada, kopyada.

**Yapılacak:** Kod üzerinde çalışılacaksa Lovable'dan klasör yapısı korunarak yeniden
dışa aktarım al. Bu snapshot ile kod yazma.

---

## 2 · Kod tabanı hangi ürünü anlatıyor

Adlar bozuk olsa da içerik aranabilir. Sonuç net:

| Aranan | Bulunduğu dosya sayısı |
|---|---:|
| `Dokumentasjonen skal ikke` · `overlever prosjektet` · `prosjektarkiv` · `reklamasjon` | **0** |
| `plate` | 19 |
| `licence` / `license` | 15 |
| `Verified Human` | 5 |
| `Personal License` | 4 |
| `kunst` / `gallery` / `museum` | 4 |

Vedtak 3, 11, 12 ve 15 kod tabanına hiç ulaşmamış. Yayında olan şey — ne ise —
hâlâ lisans pazaryeri.

`Dashboard.tsx` içindeki lisans şartları JSON'u tam metin: dört kademe, `kr 190`
Personal License, `hello@betaart.no`, `[DATE]` yer tutucuları. Bu, terk edilmiş modelin
hukuki metni ve şu anda kodun içinde duruyor.

**Yapılacak:** Şu anda `betaart.no` adresinde ne yayında, kontrol et. Eğer bu kod
canlıysa, sitede eski konumlandırma ve doldurulmamış hukuki metin duruyor demektir.

---

## 3 · Kopya envanteri

**68 HTML → 38 benzersiz.** 30 dosya gereksiz.

| Dosya | Kopya |
|---|---:|
| `beta-art-museum` | 7 |
| `beta-art-qr` · `contact` · `core-v8-legal` | 4'er |
| `cookie` · `intelligence-platform` | 3'er |
| 11 farklı dosya | 2'şer |

Markdown tarafında `beta-art-skuddliste` iki kez (223 satır, aynı).
SQL tarafında şema v1 ve v2 ayrı dosyalar — v1 arşiv, v2 geçerli.

Yüklediklerin arasında da aynı desen: `benchmark-plan`ın üç kopyası vardı ve
**ikisi farklı içerikteydi** — yani orada sürüm kayması da var, sadece kopya değil.

**Yapılacak:** Kopyaları sil. Bu, geriye kalan materyali yaklaşık üçte bir küçültür ve
hangi dosyanın gerçek olduğu sorusunu ortadan kaldırır.

---

## 4 · Google Fonts — Sperreliste A4'ün gerçek kapsamı

Sperrelistede bunu tek dosya (`betaart-no.html`) için yazmıştım. Ölçüm:

**41 HTML dosyası** `fonts.googleapis.com` çağırıyor. Ayrıca `vitest_config.ts` adıyla
duran CSS dosyasında da aynı import var — yani kod tabanında da mevcut.

Yayına girecek dosya sayısı bir avuç olduğu için pratikte iş büyümüyor, ama düzeltme
"bir dosyada bir satır" değil: yayınlanacak her sayfada ve kod tabanındaki global
CSS'te yapılmalı.

---

## 5 · Doküman katmanı — kuşaklar

22 markdown dosyası, dört kuşak:

**Kuşak 1 — Sanat/lisans (Temmuz ve öncesi).** `beta-art-audit.md`,
`beta-art-gjenstar.md`, `beta-art-rank.md`, `beta-art-skuddliste.md`,
`claude_north-*`, `claude_beta-art-north-system.md`, `IDEAS10.md`.
Hepsi solo sanat fotoğrafçısı ürünü için. Arşiv.

**Kuşak 2 — Doğrulama altyapısı.** `beta-art-dogrulama-metodolojisi.md`,
`beta-art-verification-rights-framework.md`, `beta-art-fikir-notu-*`,
`beta-art-norvecten-baslayarak-buyume-plani.md`, `BETA_ART_Master_Prompt.md`.
Vedtak 3 tarafından geçersiz kılındı — ama metodoloji taslağı kurtarılabilir (§6).

**Kuşak 3 — İnşaat, doğrulama öncelikli.** `BETA_ART_MVP_Bygg_2026.html`,
`beta-art-core-v9-compliance.html`. Doğru sektör, yanlış başlık.

**Kuşak 4 — Geçerli.** `BETA-ART-Ekspertstyret.md` + `-mote-2.md`,
`BETA-ART-Oppstartspakke.md`, `betaart-no.html`, `beta-art-backend-schema-v2.sql`,
`BETA-ART-Lanseringssperre.md`.

`beta-art-gjenstar.md` özellikle dikkat gerektiriyor: "lansering-modenhet ≈ 35 %"
diyor ve blokkerende olarak gerçek fotoğrafları gösteriyor. Terk edilen ürünün
ilerlemesini ölçüyor. Onu takip edersen sonsuza kadar %35'te kalırsın.

---

## 6 · Metodoloji taslağı — durum

`beta-art-dogrulama-metodolojisi.md` mevcut ve beklediğimden iyi. Bölüm 4
("Rozetin garanti ETMEDİKLERİ") tam olarak L'nin sak 7'de övdüğü şey, ve
`v9`'un "Rights-aware, not rights-blind" diline denk düşüyor.

Revizyon için gereken üç değişiklik:

1. **Beşli kontrol → üçlü kapı.** Mevcut yapı beş kontrolü eşit sayıyor.
   `v9`'un yapısı daha doğru: *rozet için zorunlu* · *duruma göre incelenir* ·
   *yayını durdurur*. Şantiyede tanınabilir işçi ikinci kategoriye girer ve bu ayrım
   şu an metinde yok.
2. **Lisans dili çıkar.** "License Confirmed" kontrolü ve Bölüm 7'deki Verify™ API
   entegrasyon senaryosu artık geçerli değil.
3. **Rozet → rapor.** Yeni modelde ürün her görselin üstündeki bir rozet değil,
   her oppdrag için imzalı bir doğrulama raporu. Kapsam aynı, birim farklı.

Türkçe yazılmış; jurist için Norveççeye çevrilmesi gerekiyor.

---

## 7 · Ne yapılacak — sırayla

| # | İş | Kim | Süre |
|---|---|---|---|
| 1 | `betaart.no`'da şu an ne yayında, kontrol et | Sen | 5 dk |
| 2 | Jurist mektubunu gönder | Sen | 15 dk |
| 3 | Enkeltpersonforetak kaydı | Sen | 30 dk |
| 4 | Lovable'dan klasör yapılı yeniden dışa aktarım | Sen | 10 dk |
| 5 | 30 kopya dosyayı sil | Sen | 15 dk |
| 6 | Metodoloji revizyonu (Norveççe, üçlü kapı) | Ben | 1 oturum |
| 7 | Kontinuitet dokümanı | Ben | 1 oturum |
| 8 | Kontakt §03 bloğu, B2B'ye çevrilmiş | Ben | 30 dk |

1'den 5'e kadar olanlar bende yapılamaz. 6, 7 ve 8 tek kelimeyle başlar.

**Madde 1 en acili.** Eğer eski kod canlıysa, şu anda internette dört lisans kademesi
ve doldurulmamış `[DATE]` alanları olan bir sayfa duruyor olabilir.

---

*Bu bir dosya envanteri ve teknik incelemedir; hukuki, mali veya sigorta tavsiyesi
değildir.*
