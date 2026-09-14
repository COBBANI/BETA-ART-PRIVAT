# BETA ART — Doğrulama Metodolojisi

**Durum:** Taslak v0.1 — pilot ortaklarla paylaşılmadan önce Hukuk & Uyum Agent'ı ve Ürün & Mühendislik Agent'ı tarafından teknik/hukuki olarak gözden geçirilmelidir.

## Amaç

Bu doküman, "Verified by BETA ART" rozetinin ne anlama geldiğini — ve daha da önemlisi, ne anlama **gelmediğini** — açık, denetlenebilir ve dışarıdan sorgulanabilir şekilde tanımlar. Bu doküman olmadan rozet bir pazarlama etiketinden ibaret kalır; amacı onu bir güven standardına dönüştürmektir.

---

## 1. Doğrulama Kapsamı — Rozet Ne Zaman Verilir

Bir görsel, aşağıdaki beş kontrolün **tamamını** geçtiğinde "Verified by BETA ART" rozeti alır:

| Kontrol | Ne Doğrulanıyor | Nasıl |
|---|---|---|
| **Authentic Photograph** | Görsel gerçek bir kamera sensöründen geldi, sentetik/AI üretimi değil | Meta veri analizi + görsel adli analiz (forensic analysis) |
| **Human Created** | Görseli çeken kişi, platformda kimliği doğrulanmış bir fotoğrafçı | Fotoğrafçı başvuru/kimlik doğrulama süreci (bkz. Bölüm 2) |
| **Metadata Verified** | EXIF/IPTC meta verisi tutarlı, çelişkili veya silinmiş değil | Otomatik meta veri bütünlük kontrolü |
| **Provenance Recorded** | Görselin yükleme anından itibaren değişmemiş bir köken kaydı var | Kriptografik hash + zaman damgası, ilk yükleme anında oluşturulur |
| **License Confirmed** | Görselin lisans/kullanım hakları net ve fotoğrafçı tarafından onaylanmış | Platform içi lisans sözleşmesi kaydı |

**Kritik kural:** Beş kontrolden biri bile geçilemezse rozet verilmez — kısmi doğrulama diye bir şey yoktur. Rozet ya tamdır ya da yoktur.

## 2. Fotoğrafçı Kimlik Doğrulama Süreci

- Başvuru bazlı, küratörlü kabul (herkese açık kayıt değil)
- Kimlik belgesi doğrulaması
- Referans portföy incelemesi
- İlk 3 yüklemenin manuel/insan gözden geçirmesi (sonrasında otomatik sisteme geçilir)

## 3. Rozetin Garanti Ettikleri

"Verified by BETA ART" rozeti şunu **garanti eder:**

- Görsel, Bölüm 1'deki beş kontrolün tamamını, rozetin verildiği tarihte geçmiştir
- Görselin köken kaydı, yükleme anından itibaren değiştirilmemiştir
- Fotoğrafçının kimliği, platform tarafından doğrulanmıştır

## 4. Rozetin Garanti ETMEDİKLERİ

Yanlış anlaşılmayı önlemek için, rozet **şunları garanti etmez:**

- Görselin sanatsal veya teknik kalitesi hakkında hiçbir iddia içermez
- Görselin içeriğinin (fotoğraftaki olay, kişi, mekân) doğruluğu hakkında iddia içermez — yalnızca *görselin kendisinin* özgünlüğünü doğrular, görselin *anlattığı hikâyeyi* doğrulamaz
- Fotoğrafçının gelecekteki davranışlarını garanti etmez — doğrulama, o görsel ve o an için geçerlidir
- Hukuki bir "delil" statüsü vermez; mahkeme/sigorta gibi süreçlerde nihai kararı ilgili kurum verir, BETA ART yalnızca destekleyici köken verisi sağlar

## 5. Denetim ve Güncelleme Süreci

- Doğrulama kriterleri (Bölüm 1) her 6 ayda bir gözden geçirilir
- Yeni AI-üretim tespit teknikleri ortaya çıktıkça meta veri/adli analiz yöntemleri güncellenir
- Güncellemeler, geriye dönük olarak zaten verilmiş rozetleri geçersiz kılmaz — yalnızca yeni doğrulamalara uygulanır (şeffaflık için, hangi metodoloji sürümüyle doğrulandığı rozette görünür kalır: `ID · 0X7F3A—2026`)

## 6. İtiraz ve Anlaşmazlık Süreci

1. Bir rozetin hatalı verildiği iddia edilirse, itiraz platform üzerinden yazılı olarak yapılır
2. Güven & Metodoloji ekibi, ilgili görselin doğrulama kaydını (hash, zaman damgası, meta veri) yeniden inceler
3. İnceleme sonucunda hata tespit edilirse rozet geri çekilir ve kayıt kamuya açık şekilde işaretlenir (sessizce silinmez — şeffaflık ilkesi gereği)
4. İtiraz sahibine ve etkilenen taraflara (fotoğrafçı, alıcı, varsa entegre olan üçüncü taraf platform) sonuç bildirilir
5. Tekrarlayan ihlallerde fotoğrafçının platform üyeliği askıya alınabilir

## 7. Üçüncü Taraf Entegrasyonlarında Sorumluluk Sınırı

Verify™ API'sini kendi platformuna entegre eden bir kurum (haber sitesi, sigorta şirketi vb.), rozeti kendi kullanıcılarına gösterirken Bölüm 3 ve 4'teki kapsamı da netçe belirtmekle yükümlüdür. BETA ART, entegrasyon ortağının rozeti yanlış/yanıltıcı şekilde sunmasından doğacak sonuçlardan sorumlu tutulamaz — bu, entegrasyon sözleşmesinde açıkça yer almalıdır (Hukuk & Uyum Agent'ının hazırlayacağı şablonda).

---

## Sonraki Adım

Bu taslak, Faz 0'ın çıkış koşuludur — Norveç'teki ilk pilotlar (belediye, haber kuruluşu, sigorta şirketi) başlamadan önce bu dokümanın:
1. Hukuki olarak gözden geçirilmesi
2. Teknik ekip tarafından Bölüm 1'deki kontrollerin gerçekten uygulanabilir olduğunun teyit edilmesi
gerekiyor.
