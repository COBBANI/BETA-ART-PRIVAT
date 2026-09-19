---
name: on-brand
description: QBLOGG marka kurallarını (renk belirteçleri, tipografi ölçeği, boşluk/radius, ikon çizimi, RTL) ve ses/içerik kurallarını (uydurma yasak, rakamlar örnek, kaynak zorunlu) her içerik veya arayüz üretiminde uygular. Bir istek marka dışı bir örüntü üretmeyi gerektiriyorsa (ham hex, aqua metin, emoji, ham rem, uydurulmuş istatistik/vaat) SESSİZCE UYMAZ — kısa gerekçeyle reddeder ve marka içi alternatifi sunar. Bu depoda (QBLOGG/BETA-ART) HTML/CSS üretilirken, blog yazısı/pazarlama metni yazılırken, yeni sayfa/bileşen eklenirken veya "marka kurallarına uygun mu" diye sorulduğunda MUTLAKA bu beceriyi kullan — kullanıcı "on-brand" demese bile.
owner: QBLOGG
---

# on-brand — QBLOGG marka denetçisi

Bu beceri bir üretim yöntemi değil, bir **kapı**dır: bu depoda üretilen her
görsel çıktı (HTML/CSS) ve her metin çıktısı (blog, pazarlama, arayüz metni)
buradan geçer. Kaynağı depodaki dört belge — `docs/tasarim-sistemi.md`,
`docs/figma-tasarim-kurallari.md`, `docs/konsept.md`,
`.claude/skills/qblogg-blog-yazisi/SKILL.md` — ve CLAUDE.md "Değişmez
kurallar" 4/5/7. Çelişkide CLAUDE.md kazanır.

## Neden bir kapı, bir kılavuz değil

Kural yazılı olması onun uygulanacağı anlamına gelmez. Bir bileşen isteği
geldiğinde model "biraz mavi" ya da "ince bir vurgu rengi" gibi doğal dilden
doğrudan hex üretme eğilimindedir — kural okunmuş olsa bile. Bu yüzden bu
beceri iki parçadan oluşur: aşağıdaki kurallar (ne aranacak) ve **Teslimden
önce** bölümündeki kontrol listesi (üretilen çıktının kendisine karşı
çalıştırılan bir denetim). Kural olmadan kontrol listesi kördür, kontrol
listesi olmadan kural unutulur.

## 1. Renk belirteçleri

Tek kaynak: `assets/css/main.css` → `:root` (açık) ve
`html[data-theme="dark"]` (koyu). Kaynak: `docs/tasarim-sistemi.md` §1.

```css
--bg / --bg-soft / --bg-card          /* zeminler */
--text / --text-muted / --border      /* metin ve çizgiler */
--brand: #082C54                      /* Midnight Navy — koyu temada #00D8C2'ye döner */
--brand-2: #00D8C2                    /* Electric Aqua — YALNIZCA vurgu/dekor, METİNDE ASLA */
--brand-2-ink: #0a7d72                /* aqua niyetli METİN rengi, beyazda 5,0:1 */
--on-brand / --logo-ink / --brand-soft / --danger
```

**Kural:** Ham hex/rgb yazılmaz — her zaman `var(--…)`. `--line` diye bir
belirteç yok, kenarlık her zaman `--border`.

**Aqua tuzağı (en sık ihlal):** `#00D8C2` beyaz zeminde 1,9:1 kontrast verir
— WCAG AA'nın (4,5:1) çok altında. Aqua'yı metin rengi, link rengi veya
ikon rengi olarak kullanan her istek reddedilir; `var(--brand-2-ink)`
önerilir. Koyu temada bu ayrım kalkar (`--brand-2-ink: var(--brand-2)`).

## 2. Tipografi

Sekiz basamak, kaynak: `docs/tasarim-sistemi.md` §1 / `figma-tasarim-kurallari.md` §1.

```
--fs-2xs .76rem  --fs-xs .8rem  --fs-sm .85rem  --fs-md .92rem
--fs-base .95rem --fs-lg 1rem   --fs-xl 1.12rem --fs-logo 1.16rem  (yalnız logo)
```

**Kural:** Ham `rem`/`px` font-size yazılmaz — en yakın basamağa yuvarlanır.
İstisna: başlıkların `clamp()` değerleri, `em` cinsinden göreli boyutlar
(ilk harf, `code`). Font ailesi her zaman `var(--font)` (Inter + sistem
yığını); Google Fonts veya başka bir CDN bağlantısı **asla** kabul edilmez
(GDPR gerekçesi `docs/tasarim-sistemi.md` §4'te kayıtlı).

## 3. Boşluk, radius, bileşen sınıfları

```
--radius: 16px   --radius-sm: 10px   --maxw: 1140px
```

Bileşen çatısı yok; tekrar eden sınıf adları kaynaktır
(`figma-tasarim-kurallari.md` §2): `.btn`/`.btn--primary`/`.btn--ghost`,
`.card`, `.plan`, `.section`/`.section--soft`, `.wrap`, `.tag`/`.chip`,
`.field`, `.article-body`. Yeni bir bileşen isteniyorsa önce bu listede
karşılığı olup olmadığına bakılır; yoksa yeni sınıf bu adlandırma
diliyle (kısa, anlamsal, Türkçe-İngilizce karışık) türetilir — utility-first
(Tailwind vb.) sınıf üretilmez, çatı/derleme adımı önerilmez.

Kesme noktaları sabit dörtlü: `1180px, 860px, 620px, 360px` (hepsi
`max-width`). Yeni bir kesme noktası önerilmeden önce bu dördüne oturmayı
dener.

## 4. İkon kuralı

CLAUDE.md kural 4, `docs/tasarim-sistemi.md` §5. **Emoji her zaman
reddedilir** — işletim sistemine göre üç farklı görünüm verir, marka görsel
kontrolünü kaybeder. İstisna: `→ ↑ ☾ ☀` gibi tek renkli, yazı tipiyle
çizilen ok/tema işaretleri (bunlar ikon değil, karakterdir).

Her ikon satır içi SVG:

```
24×24 ızgara · fill="none" · stroke="currentColor" · stroke-width="1.7" ·
stroke-linecap/linejoin="round"
```

Yazı ikonu isteniyorsa önce `assets/js/app.js → ICONS` kaydına bakılır
(mevcut adlar: question, coin, blocks, phone, banknote, compass, bulb,
chart, envelope, link, gear, linkedin, x, facebook, whatsapp); karşılığı
yoksa aynı çizim kuralına uyan yeni bir yol tanımlanır, sabit renk yazılmaz
(`currentColor` zorunlu — ikon tema değişince kendiliğinden döner).

## 5. RTL ve erişilebilirlik

Yön bağımlı CSS özelliği yazılmaz: `margin-left/right` yerine
`margin-inline-start/end`, `left/right` yerine `inset-inline-start/end`,
`text-align:left` yerine `text-align:start`. Yeni bir bölüm üretildiğinde
Arapça (`dir="rtl"`) gözden geçirilir. Dokunma hedefi ≥44px, gövde metni
kontrastı ≥4,5:1, `:focus-visible` halkası korunur.

## 6. Metin: sözlükten gelir, gömülmez

CLAUDE.md kural 3. Sitede görünen her metin `data-i18n` (veya
`data-i18n-attr/title/content`) ile `i18n.js` sözlüğünden gelir; HTML'e
tek dilde metin gömmek en sık yapılan hatadır. Bir sayfa/bileşen isteği
geldiğinde önce anahtar **on dile birden** açılır (tr, en, zh, hi, es, ar,
fr, pt, ru, no) — dokuz dili "sonra eklerim" diye ertelemek, bu beceri
kapsamında bir ihlaldir.

## 7. Ses ve içerik kuralları

Kaynak: `docs/konsept.md` ("uydurma yasağı"), `qblogg-blog-yazisi/SKILL.md`.
Bu kurallar HTML/CSS'e değil, **her metne** (blog, pazarlama kopyası,
brief e-postası, arayüz mikro-metni) uygulanır.

| Kural | Anlamı |
|---|---|
| **Uydurma yasak** | Doğrulanmamış istatistik, müşteri hikâyesi, kurum şartı yazılmaz. Kaynağı olmayan iddia = yazılmaz, atlanır. |
| **Rakamlar örnek işaretlenir** | Fiyat/ücret/oran gibi sayılar "örnek başlangıç fiyatıdır" gibi bir ibareyle bağlamlandırılır; kesin vaat gibi sunulmaz. |
| **Kaynak zorunluluğu** | Para/kariyer konularında en az üç kaynak. Adresi doğrulanmamış kaynak uydurma bağlantıyla değil, adıyla ve `nu` gerekçesiyle yazılır. |
| **Somut, genelin önüne geçer** | Bir gerçek örnek, beş sıfattan iyidir. Soyut övgü ("lider", "devrimci", "en iyi") yerine ölçülebilir/somut ifade. |
| **Abartı yok** | "Kesinlikle", "garantili", "anında" gibi kesin-vaat dili; pazarlama metninde bile kullanılmaz — bu işte en pahalı hata olarak kayıtlı (CLAUDE.md kural 8). |

## Reddetme protokolü

Bir istek yukarıdaki kurallardan birini ihlal eden bir çıktı üretmeyi
gerektiriyorsa (ör. "aqua renkte bir başlık yaz", "buraya bir emoji koy",
"bu istatistiği kaynaksız ekle", "%40 artış garantisi yazalım"):

1. **Sessizce uyma.** İstenen hâliyle üretme.
2. **Tek satır gerekçe ver** — hangi kural, neden. Uzun ders verme.
3. **Marka içi alternatifi hemen sun** — reddetmek tek başına yardımcı
   değildir, aynı niyeti karşılayan uygun karşılığı üretip devam et.

**Örnek:**

> İstek: "Fiyat kartının başlığını aqua (#00D8C2) yap."
> Yanıt: Reddediyorum — aqua beyaz zeminde 1,9:1 kontrast, metinde
> kullanılamaz (`tasarim-sistemi.md` §1). Bunun yerine `var(--brand-2-ink)`
> kullandım — aynı aile, 5,0:1 kontrast, aynı vurgu hissini veriyor.

> İstek: "Bu yazıya '%300 büyüme sağladık' cümlesini ekle."
> Yanıt: Reddediyorum — kaynaksız/uydurma istatistik (`konsept.md`,
> uydurma yasağı). Elimde bu iddiayı destekleyecek ölçülü bir veri yok;
> ya gerçek bir kaynak/rakam verin ya da cümleyi somut ama doğrulanabilir
> bir ifadeyle ("kendi yayın hattımızda X hafta içinde Y" gibi, gerçek
> Y verildiğinde) değiştireyim.

Kural gerçekten belirsizse (yeni bir renk/durum kombinasyonu, sınırdaki bir
kontrast) reddetmek yerine önce hesapla/ölç, sonra karar ver — tahmin
etmek de bir tür uydurmadır.

## Teslimden önce — kontrol listesi

Üretilen HTML/CSS veya metni teslim etmeden önce, gerçekten üretilen
çıktının kendisine karşı bu listeyi çalıştır (kafanda değil, çıktıyı
yeniden okuyarak):

- [ ] Her renk `var(--…)`'dan mı geliyor? Ham hex var mı?
- [ ] Aqua (`--brand-2` / `#00D8C2`) metin/link/ikon rengi olarak kullanıldı mı? (Kullanıldıysa `--brand-2-ink`'e çevir.)
- [ ] Her font-size sekiz basamaktan biri mi? Ham `rem`/`px` var mı?
- [ ] Emoji var mı? (Ok/tema işaretleri hariç.)
- [ ] Yeni bir ikon eklendiyse 24×24, `stroke-width 1.7`, `currentColor` mi?
- [ ] Yön bağımlı CSS (`left/right/margin-left` vb.) var mı?
- [ ] Görünen metin `data-i18n` ile mi geliyor, HTML'e gömülü mü? On dile açıldı mı?
- [ ] Metinde kaynaksız istatistik, müşteri hikâyesi veya kesin vaat var mı?
- [ ] Fiyat/rakam varsa "örnek" bağlamı taşıyor mu?
- [ ] Yeni bir dış servis/CDN/font bağlantısı önerildi mi? (Önerildiyse reddet — `docs/tasarim-sistemi.md` §4.)

Listedeki bir madde işaretlenemiyorsa (yani ihlal varsa) teslim etme —
reddetme protokolünü uygula ve düzelterek teslim et.

## Kapsam dışı

Bu beceri renk/tipografi/boşluk/ikon/ses kurallarını uygular. Marka
varlıklarının (logo, favicon) **üretimi** ayrı bir iştir — `scripts/marka-uret.py`
ve `docs/logo-sistemi.md` konusudur, elle SVG/PNG çizilmez; bu beceri
yalnızca üretilmiş varlıkların *kullanımını* (ör. `--logo-ink`) denetler.
Marka tescili/hukuki konular `docs/marka-tescili.md`'dedir, bu beceri
kapsamında değildir.
