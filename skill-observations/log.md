# Skill Observation Log

Observations captured during task-oriented work. Each entry identifies a
potential skill improvement or new skill opportunity.

**Status key:** OPEN = not yet actioned | ACTIONED = skill updated/created |
DECLINED = user decided not to pursue

---

## 2026-08-23 — Site profesyonelleştirme SDD oturumu

### Observation 1: Plan spec'leri kaynak doğrulaması olmadan değer anıyor

**Status:** ACTIONED — qblogg-operasyon becerisine işlendi (inceleme 24.08.2026)
**Date:** 2026-08-23
**Session context:** SDD planı yazımı (site profesyonelleştirme, 8 görev)
**Skill:** subagent-driven-development (kullanım pratiği) / internal
**Type:** internal
**Phase/Area:** Plan yazımı

**Issue:** Plana hafızadan iki yanlış değer yazıldı: CSS belirteci olarak
`var(--line)` (gerçeği `--border`) ve print gizleme seçicisi `#themeToggle`
(gerçeği `#themeBtn`). Biri inceleme bulgusu oldu, diğerini uygulayıcı
kendisi düzeltti.

**Suggested improvement:** Plan yazarken başka dosyadan anılan her ad
(değişken, id, sınıf, yol) tek grep'le doğrulanmalı; plan şablonuna
"kaynak-doğrulanmış değerler" ön-kontrol maddesi eklenmeli.

**Principle:** Spec'te geçen her tanımlayıcı, yazıldığı anda kaynağından
doğrulanır — inceleme aşamasına bırakılmaz. (Cross-cutting principles #1)

### Observation 2: SDD task-brief betiği başlık biçimine duyarlı

**Status:** ACTIONED — qblogg-operasyon becerisine işlendi (inceleme 24.08.2026)
**Date:** 2026-08-23
**Session context:** `scripts/task-brief PLAN 1` çağrısı "task 1 not found" verdi
**Skill:** subagent-driven-development
**Type:** internal
**Phase/Area:** Setup / plan biçimi

**Issue:** Plan başlıkları Türkçe "## Görev N —" yazılmıştı; betik yalnız
"Task N" desenini tanıyor. Başlıklar "## Task N —" yapılarak çözüldü.

**Suggested improvement:** Türkçe projede de SDD planlarının görev
başlıkları "Task N" ile açılmalı (gövde Türkçe kalabilir); bu kural proje
CLAUDE.md'sine değil, plan yazım alışkanlığına not edildi.

**Principle:** Araç zincirine giren belgelerde, aracın ayrıştırdığı
işaretler araç sözleşmesine göre yazılır; insan dili gövdede serbesttir.

### Observation 3: Bu ortamda belge render zinciri kırık, doğrulama alternatifi gerekti

**Status:** ACTIONED — qblogg-operasyon becerisine işlendi (inceleme 24.08.2026)
**Date:** 2026-08-23
**Session context:** Konsept belgesinin Word çıktısının görsel doğrulaması
**Skill:** docx (sistem becerisi — gerekirse docx-extras'a)
**Type:** internal
**Phase/Area:** Verify the output

**Issue:** `pandoc` ve `pdftoppm` yok; `soffice` her dosyada (düz metin
dahil) "source file could not be loaded" veriyor — LibreOffice bu konteynerde
çalışmıyor. Skill'in önerdiği doğrulama yolu (docx→pdf→jpeg→bak) kapalı.

**Suggested improvement:** Bu ortam için doğrulama alternatifi: zipfile +
ElementTree ile document.xml geçerliliği ve anahtar metin varlığı kontrolü;
görsel doğrulama gerekiyorsa HTML/SVG üzerinden Playwright ekran görüntüsü.

**Principle:** Bir skill'in doğrulama adımı ortamda çalışmıyorsa doğrulama
atlanmaz; aynı garantiyi veren en yakın alternatif kurulur ve raporda
"neyin doğrulanamadığı" açıkça söylenir.

### Observation 4: Scratchpad'e stdlib adıyla dosya bırakmak sonraki işleri kırdı

**Status:** ACTIONED — qblogg-operasyon becerisine işlendi (inceleme 24.08.2026)
**Date:** 2026-08-23
**Session context:** `python3 -c "import xml.etree..."` çağrısı patladı
**Skill:** Genel çalışma pratiği
**Type:** internal
**Phase/Area:** Scratchpad hijyeni

**Issue:** Önceki oturumdan kalan `scratchpad/copy.py`, Python stdlib
`copy` modülünü gölgeleyip `xml.etree.ElementTree` importunu bile kırdı.
Hata mesajı kökten alakasız görünüyordu; teşhis zaman aldı.

**Suggested improvement:** Scratch betiklerine stdlib modül adı verilmez
(copy, json, types...); cwd=scratchpad ile python çalıştırırken bu risk
hatırlanmalı.

**Principle:** Çalışma dizinindeki dosya adları import uzayının parçasıdır;
geçici dosya bile ad uzayına saygılı seçilir.

### Observation 5: Stop-hook, alt-ajanın bitmemiş işini commit'lemeye zorluyor

**Status:** ACTIONED — qblogg-operasyon becerisine işlendi (inceleme 24.08.2026)
**Date:** 2026-08-23
**Session context:** SDD sırasında stop-hook "uncommitted changes" uyarıları
**Skill:** subagent-driven-development
**Type:** internal
**Phase/Area:** Koordinatör-uygulayıcı eşzamanlılığı

**Issue:** Uygulayıcı alt-ajan dosyaları düzenlerken oturumun stop-hook'u
"commit ve push yap" diye bastırdı. Yarıda commit, ajanın işini bölerdi.
Çözüm: `git status` ile fark sahipliği ayrıştırıldı; yalnız koordinatörün
kendi dosyaları açıkça `git add <dosya>` ile commit'lendi, ajan farkına
dokunulmadı.

**Suggested improvement:** SDD çalışırken stop-hook uyarısına verilecek
standart yanıt: sahiplik kontrolü → kendi dosyalarını isimle commit'le →
ajan farkını bekle. `git add -A` bu kipte yasak.

**Principle:** Paylaşılan çalışma ağacında commit, dosya sahipliği
doğrulanmadan atılmaz; otomasyon baskısı bunu değiştirmez.

## 2026-08-24 — Üye sistemi + Vercel olayı oturumu

### Observation 6: Küçük/büyük harf duyarlı grep, "dosya boş" yanılgısı üretti

**Status:** ACTIONED — qblogg-operasyon becerisine işlendi (inceleme 24.08.2026)
**Date:** 2026-08-24
**Session context:** engine/schema-billing.sql'i doğrulama sırasında
**Skill:** Genel çalışma pratiği (kesişen ilke 1'in yeni örneği)
**Type:** internal
**Phase/Area:** Kaynak doğrulama

**Issue:** `grep "create table"` sıfır sonuç verdi; dosya `CREATE TABLE`
(büyük harf) kullanıyordu. Bir an "şema yok" sonucuna gidilebilirdi;
ls + head ile ikinci bakış gerçeği gösterdi.

**Suggested improvement:** SQL/yapılandırma dosyalarında grep her zaman
`-i` ile yapılmalı; "hiç sonuç yok" bulgusu tek başına kanıt sayılmadan
önce dosyanın varlığı/başı ikinci bir yöntemle doğrulanmalı.

**Principle:** Sıfır sonuçlu arama, iddianın yokluğunun kanıtı değildir —
önce arama aracının kendisi doğrulanır.

### Observation 7: Tek dosyalık dağıtım deseni, silinen projeyi dakikalar içinde geri getirdi

**Status:** ACTIONED — qblogg-operasyon becerisine işlendi (inceleme 24.08.2026)
**Date:** 2026-08-24
**Session context:** qblogg Vercel projesi panelde yanlışlıkla silinmiş bulundu
**Skill:** deploy-to-vercel kullanım pratiği / proje CLAUDE.md
**Type:** internal
**Phase/Area:** Dağıtım dayanıklılığı

**Issue:** Üretim projesi silinince site yayından düştü; dağıtımın tek
girdisi vercel.json olduğu ve içerik public git'ten klonlandığı için aynı
adla yeniden dağıtım ~4 saniyede siteyi geri getirdi. Tek kayıp: eski
*.vercel.app takma adları (dış bağlantılar öldü) ve yeniden açılan
Deployment Protection'ın tekrar kapatılması gerekti.

**Suggested improvement:** Kurtarma sonrası kontrol listesi kalıcılaştı:
(1) yeniden dağıt, (2) protection'ı kapat, (3) canlı içerik doğrula,
(4) CLAUDE.md/günlükteki adresleri güncelle. Bu dizi CLAUDE.md dağıtım
notunda artık kayıtlı.

**Principle:** Dağıtım durumu (state) değil tarif (recipe) olarak
saklanırsa, altyapı kaybı felaket değil yeniden çalıştırma olur.

### Observation 8: Klon-tabanlı dağıtım, push edilmemiş dosyayı göremez

**Status:** ACTIONED — qblogg-operasyon becerisine işlendi (inceleme 24.08.2026)
**Date:** 2026-08-24
**Session context:** qblogg-uye ilk dağıtımı ENOENT ile düştü
**Skill:** deploy-to-vercel kullanım pratiği
**Type:** internal
**Phase/Area:** Dağıtım öncesi kontrol

**Issue:** buildCommand depodan klonlar; vendor'lanan lib çalışma ağacında
duruyordu ama push edilmemişti. Dağıtım "cp: cannot stat" ile düştü.

**Suggested improvement:** Tarif-tabanlı (klonlayan) her dağıtımdan önce
zorunlu kontrol: `git status --short` boş VE dal push'lu. Bu iki komut
dağıtım komutunun önüne alışkanlık olarak eklenmeli.

**Principle:** Dağıtım tarifi depoyu okuyorsa, "bende çalışıyor"un birimi
çalışma ağacı değil push edilmiş commit'tir.

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



### Observation 14: Bileşik komutta pkill zinciri öldürüyor (exit 144), sonraki adımlar sessizce yapılmıyor

**Status:** OPEN
**Date:** 2026-09-02
**Session context:** Sosyal medya işi — günlük + commit + push tek bileşik komutta, başında `pkill -f "vite preview"` vardı
**Skill:** Genel çalışma pratiği (qblogg-operasyon adayı)
**Type:** internal
**Phase/Area:** Bash bileşik komutlar / süreç temizliği

**Issue:** `pkill -f "vite preview"; cat >> günlük && git commit && git push` bileşiği exit 144 ile kesildi; pkill kendi eşleşme aralığında komutun kendisini/оturumu vurdu ve SONRAKİ HİÇBİR ADIM çalışmadı. Günlük eklenmedi, commit atılmadı — fark edilmese "iş yapıldı" sanılacaktı. Aynı oturumda daha önce `pkill` tek başına da exit 144 vermişti.

**Suggested improvement:** qblogg-operasyon'a kural: süreç öldürme (`pkill`/`kill`) hiçbir zaman commit/push/dosya yazma ile aynı bileşik komuta konmaz; ayrı Bash çağrısında çalıştırılır ve sonucu önemsizse `|| true` eklenir. Kesilen bileşikten sonra `git status`/`git log -1` ile ne kadarının gerçekleştiği doğrulanır.

**Principle:** Yan etkili temizlik komutları (özellikle desenle süreç öldürenler) belirsiz çıkış davranışı taşır; kalıcı iş üreten adımlarla aynı zincire bağlanırsa sessiz iş kaybı üretir. Zincir kesildiğinde ilk refleks "ne kadarı gerçekleşti"yi doğrulamaktır, komutu aynen tekrarlamak değil.
