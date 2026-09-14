# Skill Observation Log

Observations captured during task-oriented work. Each entry identifies a
potential skill improvement or new skill opportunity.

**Status key:** OPEN = not yet actioned | ACTIONED = skill updated/created |
DECLINED = user decided not to pursue

---

## 2026-08-25/26 — Q vizyon fırtınası + run-qblogg/tasarım sistemi doğrulaması

### Observation 9: main'e doğrudan push, izin sınıflandırıcısı tarafından engellendi

**Status:** OPEN
**Date:** 2026-08-26
**Session context:** Action Pages demosunu yayına almak için `git push origin
HEAD:main` denendi
**Skill:** qblogg-operasyon (dağıtım bölümü) / deploy-to-vercel kullanım pratiği
**Type:** internal
**Phase/Area:** Dağıtım öncesi kontrol

**Issue:** Önceki oturumda main zaten güncel bulunmuştu (başka bir yetkili
oturum/kullanıcı push'lamış), bu yüzden "main'e push serbest" varsayılmıştı.
Bu oturumda ajan kendisi `git push origin <dal>:main` çalıştırınca Claude
Code'un otomatik izin sınıflandırıcısı "Blocked by classifier" diyerek
reddetti. Kullanıcıya üç seçenek sunulup karar bekletildi.

**Suggested improvement:** qblogg-operasyon'un dağıtım bölümüne şu not
eklenmeli: "main'e push serbest" diye varsayma — her oturum kendi push
denemesini yapmalı ve reddedilirse kullanıcıya (a) kendisi push etsin,
(b) Bash izni versin, (c) PR açsın seçeneklerini sunmalı. Bir önceki
oturumda main'in güncel olması, bu oturumda push izni olduğu anlamına
gelmez.

**Principle:** Bir önceki oturumun başarılı bir eylemi, bu oturumun aynı
eylem için izinli olduğunun kanıtı değildir — izin oturum bazlı test edilir,
geçmiş durumdan çıkarsanmaz.

### Observation 10: Tekrarlanan düz-metin sorular cevapsız kalınca AskUserQuestion'a geçmek işe yaradı

**Status:** OPEN
**Date:** 2026-08-26
**Session context:** Kullanıcı, aynı işlem sorusuna (hangi sayfa/hangi yön)
üç kez üst üste düz metinle yanıt vermek yerine yeni içerik yapıştırdı
**Skill:** Genel çalışma pratiği — muhtemelen kesişen ilke adayı
**Type:** internal (ama genellenebilir — kesişen ilke adayı, kullanıcıya sorulmalı)
**Phase/Area:** Karar tıkanıklığını çözme

**Issue:** Bir işlem kararı (hangi HTML sayfası kullanılacak) düz metinle üç
kez soruldu, üçünde de kullanıcı soruyu yanıtlamak yerine yeni bir AI
çıktısı yapıştırdı. Yapılandırılmış `AskUserQuestion` çağrısına geçilince
(net başlıklı 3 seçenek) ilk denemede gerçek bir karar alındı. Bu desen
oturumda üç ayrı yerde tekrarlandı, üçünde de aynı sonucu verdi.

**Suggested improvement:** "Aynı operasyonel soru düz metinle 2+ kez
cevapsız kalırsa, üçüncü denemeyi düz metinle tekrar sormak yerine
AskUserQuestion'a yükselt" kuralı bir genel çalışma prensibi olarak
yazılmalı — yalnızca bu projeye özgü değil.

**Principle:** Serbest metin soruları, üretken/kaçamaklı bir yanıt akışının
içinde kaybolabilir; yapılandırılmış, tek tıkla cevaplanabilen bir soru
aynı tıkanıklığı çoğu zaman kırar. Bu bir kullanıcı huysuzluğu değil, arayüz
sürtünmesi meselesi.

### Observation 11: Başka bir AI aracının "sandbox:" dosya bağlantıları bu ortamdan erişilemez

**Status:** OPEN
**Date:** 2026-08-26
**Session context:** Kullanıcı `sandbox:/mnt/data/...` biçiminde dosya/zip
bağlantıları paylaştı (başka bir AI sohbet arayüzünün kendi dosya alanı)
**Skill:** Genel çalışma pratiği
**Type:** internal (genellenebilir)
**Phase/Area:** Dış içerik sınırları

**Issue:** Bu bağlantılar bu oturuma hiç ulaşmıyor — farklı bir AI aracının
kendi sohbet-içi dosya sistemi. İlk tepki bunu denemek olabilirdi; bunun
yerine hemen "erişimim yok" denip yalnızca yapıştırılan metin içeriğiyle
devam edildi.

**Suggested improvement:** "sandbox:", "attachment:" gibi bariz şekilde
başka bir araca ait dosya şeması görülürse, denemeden önce kullanıcıya
erişilemediği söylensin ve yalnızca konuşmada gerçekten yapıştırılmış
metin/kod içerik olarak işlensin.

**Principle:** Bir bağlantının biçimi (URI şeması), hangi ortama ait
olduğunu genelde bağlamdan daha güvenilir söyler — denemeden önce şemaya
bakmak zaman kazandırır.

### Observation 12: Doğrulama çabası iddianın türüne göre farklılaştırılmalı — isimli gerçek olaylar vs. kendi iş hipotezleri

**Status:** OPEN
**Date:** 2026-08-26
**Session context:** Kullanıcının aktardığı AI çıktılarında hem gerçek
şirket olayları (Meta'nın Manus'u satın alması, Q2 2026 geliri) hem de
kurgusal işin kendi rakamları (maaş, fiyat, kullanıcı hedefi) karışık
geliyordu
**Skill:** Genel çalışma pratiği
**Type:** internal (genellenebilir)
**Phase/Area:** Dış içerik doğrulama

**Issue:** Tüm rakamları tek bir "doğrulanmamış" etiketiyle geçmek yerine,
isimli/gerçek/kontrol edilebilir dış olaylar (bir şirketin satın alması,
çeyrek geliri) WebSearch ile gerçekten doğrulandı — biri (Manus satın
alması) doğru ama güncelliğini yitirmiş çıktı (anlaşma sonradan bozulmuş).
Kurgusal iç iş hipotezleri (henüz var olmayan bir ürünün maaş/fiyat
tahminleri) için dış arama yapılmadı, yalnızca "hipotez, taahhüt değil"
diye işaretlendi — çünkü doğrulanacak bir dış kaynak zaten yok.

**Suggested improvement:** Bir iddia doğrulanabilir dış gerçek mi
(isimli şirket/kişi, tarih, olay) yoksa iç varsayım mı (biz şunu
yapsak ne olur) ayrımı yapılmalı; birincisi için gerçek arama, ikincisi
için yalnızca "hipotez" etiketi yeterli — ikisine aynı düzeyde efor
harcamak ya eforu israf eder ya da gerçek hataları (Manus vakası gibi)
kaçırır.

**Principle:** Doğrulama efor bütçesi, iddianın kontrol edilebilirliğine
ve yanlış çıkması hâlindeki sonucuna göre ayarlanır — her cümleye eşit
şüphecilik uygulamak, en pahalı yanlışı bulmaya yetecek kadar dikkat
bırakmaz.

### Observation 13: "Şu tarih itibarıyla ölçüldü" diyen belgeler, yeniden ölçülmeden güncel kabul edilmemeli

**Status:** OPEN
**Date:** 2026-08-26
**Session context:** `/mcp__Figma__create_design_system_rules` komutu
`docs/tasarim-sistemi.md`'yi buldu; belge "22.08.2026 itibarıyla" ölçülmüş
rakamlar taşıyordu
**Skill:** run-skill-generator kullanım pratiği / genel belge bakımı
**Type:** internal (genellenebilir)
**Phase/Area:** Mevcut belge/beceri doğrulama

**Issue:** Belge dört gün önce doğru ölçülmüştü ama site o dört günde
gelişmeye devam etmiş (main.css'e 6 commit girmiş): satır sayısı 553→629,
sınıf sayısı 95→119, i18n anahtar sayısı 209→233 (bu sonuncusu zaten
oturum başlangıcındaki sağlık kontrolüyle çelişiyordu). "Zaten var, doğru"
diye kabul edip geçmek yerine üç rakam yeniden ölçüldü ve düzeltildi.

**Suggested improvement:** run-skill-generator/benzeri "bul, yeniden yazma,
doğrula" akışlarında, belgenin kendi tarihli "ölçüldü" iddiası bir
doğrulama adımını atlama gerekçesi sayılmamalı — tam tersine, tarih neyin
yeniden ölçülmesi gerektiğini işaret eder.

**Principle:** Bir belgenin "şu tarihte doğrulandı" notu, o tarihten sonra
geçen sürenin uzunluğuyla ters orantılı güven taşır — yakın tarihli bir
not bile, kaynak o zamandan beri değiştiyse yeniden ölçülmeli.

## 2026-08-26 — run-qblogg doğrulama + Beta Art konsept oturumu

**Not (01.09.2026, birleştirme):** Bu bölüm, paralel bir dalda bağımsız
yazıldığı için yukarıdaki Observation 9-13 ile aynı numaraları taşıyordu
(çakışan iki farklı "Observation 9/10"); birleştirme sırasında 14/15 olarak
yeniden numaralandırıldı, içerik değişmedi.

### Observation 14: run-qblogg becerisinin sorun giderme tavsiyesi, aracın kendisini çökertiyordu

**Status:** ACTIONED — run-qblogg SKILL.md'ye işlendi (bu oturum, commit `803ae6c`)
**Date:** 2026-08-26
**Session context:** `/run-skill-generator` ile mevcut run-qblogg becerisinin doğrulanması (yeniden yazmak yerine gerçekten çalıştırıp doğrulama)
**Skill:** run-qblogg
**Type:** internal
**Phase/Area:** Sorun giderme / ortam sınırlamaları

**Issue:** Beceriyi doğrularken sunucuyu durdurmak için `pkill -f "http.server 8000"` denendi — bu, komutta başka hiçbir şey olmasa bile o Bash araç çağrısının **tamamını** çıkış kodu 144 ve sıfır çıktıyla öldürdü (6 denemenin 4'ünde tekrarlandı, tek başına `pkill -f "..."; echo done` bile "done"u hiç yazdırmadı). Daha kötüsü: becerinin **kendi Sorun giderme tablosu tam olarak bu tehlikeli komutu öneriyordu** ("port tutulduysa `pkill -f http.server`"). `kill <pid>` ve `fuser -k 8000/tcp` ikisi de sorunsuz doğrulandı.

**Suggested improvement:** SKILL.md'nin Gotchas ve Sorun giderme bölümlerine
eklendi: sunucuyu asla `pkill -f` ile durdurma; `fuser -k <port>/tcp` veya
`kill <pid>` kullan. driver.mjs zaten kendi başlattığı sunucuyu Node içinden
kapatıyor, manuel müdahaleye gerek yok.

**Principle:** Bu sandbox'ta, arka planda başlatılmış bir süreci desen
eşleşmeli (`pkill -f`) öldürmek, o süreci başlatan/izleyen Bash araç
çağrısının tamamını (ilgisiz komutlar dahil) öldürebiliyor — ama tam pid
hedefli `kill` veya `fuser -k` güvenli. Bu, yalnız run-qblogg'a özgü değil:
bu ortamda arka plan sunucusu yöneten HERHANGİ bir beceri/betik aynı tuzağa
düşer. Genel kural: geliştirme sunucusu durdurmak gerektiğinde önce pid'i
öğren (`fuser <port>/tcp` salt-okunur sorgu, sonra `-k` ekle, veya `kill
<pid>`), asla `pkill -f <desen>` yazma.

### Observation 15 (kesişen ilke adayı): Kaynağından doğru yazılmış bir referans belgesi bile zamanla kayar

**Status:** OPEN — kesişen ilke olarak eklenmesi kullanıcı onayına sunuluyor
**Date:** 2026-08-26
**Session context:** `/mcp__Figma__create_design_system_rules` için `docs/tasarim-sistemi.md` ve `docs/figma-tasarim-kurallari.md` yeniden ölçüldü
**Skill:** All skills (kesişen ilke 1'in bir uzantısı, yeni bir örneği değil)
**Type:** internal
**Phase/Area:** Referans belge bakımı

**Issue:** İki belge de 22.08.2026'da depodan doğru ölçülerek yazılmıştı
(kesişen ilke 1'e tam uyum) — ama yalnızca 3-4 gün sonra beş rakım kaymıştı:
i18n anahtar sayısı (209→233), ikon kaydı (11→15, paylaşım glifleri
eklenmiş), tekrar eden sayfa iskeleti sayısı (6→8, `kalite.html` ve
`ornek.html` sonradan eklenmiş ama belgeye işlenmemiş), main.css satır
sayısı (553→629), medya sorgusu sayısı (5→6). Kesişen ilke 1 "yazarken
doğrula" diyor ama bu belgeler yazıldığı anda doğruydu; sorun **yazma
sonrası aşınma** — kodda yapılan sıradan değişiklikler, o değişikliği yapan
kişi/ajan farkında olmadan bir referans belgeyi bayatlatıyor.

**Suggested improvement:** Kesişen ilke 1'e şu ek cümle önerilir: "Depodan
tam sayı/liste ölçüsü içeren referans belgeleri (tasarım sistemi, mimari
envanteri vb.) her kullanıldıklarında yeniden ölçülür — belgenin kendi
yazıldığı tarih, güncelliğinin kanıtı değildir." Pratikte: böyle bir belge
Figma/tasarım/mimari sorusu için okunduğunda, alıntılanacak sayılar
kullanılmadan önce tek komutla (`wc -l`, `grep -c`, küçük bir node betiği)
yeniden ölçülür; sapma varsa hem cevap güncel sayıyı kullanır hem belge
küçük bir düzeltmeyle tazelenir.

**Principle:** Kaynak doğrulaması tek seferlik bir yazma-anı disiplini
değil, her okuma-ve-alıntılama anında tekrarlanan bir kontroldür — özellikle
canlı geliştirilen bir depoda referans belgelerinin "son ölçüm tarihi"
etiketi taşıdığı durumlarda.

