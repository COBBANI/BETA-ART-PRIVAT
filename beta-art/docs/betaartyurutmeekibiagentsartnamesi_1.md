# BETA ART — Yürütme Ekibi (Agent Takımı) Şartnamesi

## Önemli Not — Neyi Kurduğumu Netleştirmek İçin

Bu doküman, gerçek dünyada belediyelerle görüşen, sözleşme imzalayan, kod yazan, otonom olarak çalışan bağımsız yapay zeka ajanları **kurmuyor** — böyle bir şeyi bu sohbet ortamından gerçekleştiremem. Bunun yerine, Norveç'ten başlayan büyüme planını yürütecek **net rollere, yetkilere ve karar mekanizmalarına sahip bir "sanal ekip" yapısı** tanımlıyorum. Bu yapıyı üç şekilde hayata geçirebilirsiniz:

1. Gerçek insanlara (kurucu ortaklar, ilk işe alımlar) bu rolleri dağıtarak
2. Her rol için ayrı bir Claude oturumu/projesi açıp o role özel talimat/bağlam vererek (her biri kendi rolüne odaklanan bir "agent" gibi çalışır)
3. Claude Code / otonom ajan araçlarıyla, aşağıdaki rolleri gerçek otomasyon görevlerine (araştırma, taslak hazırlama, izleme) bağlayarak

Aşağıdaki yapı, hangi yöntemi seçerseniz seçin aynı şekilde çalışır.

---

## Ekip Yapısı

```
                     ORKESTRASYON AGENT'I
                     (yol haritasını, önceliği,
                      ekipler arası bağımlılığı yönetir)
                              │
      ┌───────────────┬───────────────┬───────────────┬───────────────┐
      │               │               │               │               │
  PAZAR &         GÜVEN &         ÜRÜN &          MARKA &         HUKUK &
  ORTAKLIK        METODOLOJİ      MÜHENDİSLİK     İÇERİK          UYUM
  AGENT'I         AGENT'I         AGENT'I         AGENT'I         AGENT'I
```

---

## 1. Orkestrasyon Agent'ı (Lead)

**Görevi:** Norveç'ten başlayan yol haritasının hangi fazda olduğunu takip etmek, hangi agent'ın sırada olduğuna karar vermek, ekipler arası bağımlılıkları çözmek.

- **Girdi:** Diğer 5 agent'ın haftalık durum raporu
- **Çıktı:** Güncellenmiş öncelik listesi, "bu hafta kilit soru budur" özeti
- **Karar yetkisi:** Hangi fazın ne zaman başlayacağı, kaynak çakışmalarında öncelik
- **Nasıl karar verir:** Her hafta, Faz dokümanındaki "başarı kriteri" karşılanmış mı diye kontrol eder; karşılanmadıysa hangi agent'ın tıkandığını tespit edip oraya odaklanır

## 2. Pazar & Ortaklık Agent'ı

**Görevi:** Faz 1'deki üç pilot ortağı (belediye/kamu kurumu, haber kuruluşu, sigorta şirketi) araştırmak, ilk temas materyallerini hazırlamak, görüşme sürecini takip etmek.

- **Girdi:** Norveç pazarı hakkında güncel araştırma, hedef kurum listesi
- **Çıktı:** Ortak adayı listesi (önceliklendirilmiş), ilk temas e-postası/sunum taslağı, görüşme notları
- **Karar yetkisi:** Hangi kurumlarla önce iletişime geçileceği
- **Nasıl karar verir:** "En az rekabetçi, en hızlı evet alınabilecek, en görünür vaka çalışmasını üretecek" kurumu önceliklendirir — bu genelde bir kamu kurumu/belediye olur, çünkü ulusal arşiv vizyonuyla doğrudan örtüşür

## 3. Güven & Metodoloji Agent'ı

**Görevi:** "Doğrulama Metodolojisi" dokümanını yazmak ve güncel tutmak — hangi kontroller yapılıyor, rozet neyi garanti ediyor/etmiyor, itiraz süreci nasıl işliyor.

- **Girdi:** Ürün ekibinden teknik doğrulama süreci detayları, C2PA gibi endüstri standartları
- **Çıktı:** Yayınlanabilir Doğrulama Metodolojisi dokümanı, denetim/itiraz süreci akış şeması
- **Karar yetkisi:** Rozetin hangi koşullarda verileceği/geri alınacağı
- **Nasıl karar verir:** Bu, tüm markanın güvenilirliğinin dayandığı doküman olduğu için, hiçbir pilot başlamadan **önce** tamamlanmış olmalı — Orkestrasyon Agent'ı bunu Faz 0'ın çıkış koşulu olarak işaretler

## 4. Ürün & Mühendislik Agent'ı

**Görevi:** Yol haritasındaki her fazı somut ürün gereksinimlerine çevirmek (Marketplace özellikleri, Verify™ API uç noktaları, rozet entegrasyonu).

- **Girdi:** Pazar & Ortaklık Agent'ından pilot ortağın teknik ihtiyaçları
- **Çıktı:** Özellik/API spesifikasyonu, geliştirme önceliği
- **Karar yetkisi:** Teknik uygulanabilirlik ve sıralama
- **Nasıl karar verir:** Pilot ortağın "olmazsa olmaz" dediği özellikleri önce, "olsa iyi olur" dediklerini sonraya bırakır

## 5. Marka & İçerik Agent'ı

**Görevi:** Web sitesi, vaka çalışmaları, basın materyalleri ve marka tutarlılığını yönetmek.

- **Girdi:** Pazar & Ortaklık Agent'ından pilot sonuçları
- **Çıktı:** Vaka çalışması metinleri, basın bülteni taslakları, site güncellemeleri
- **Karar yetkisi:** Hangi hikayenin ne zaman, hangi kanalda anlatılacağı
- **Nasıl karar verir:** Somut, ölçülebilir bir pilot sonucu (ör. "X saat tasarruf", "Y sahtecilik vakası önlendi") elde eder etmez içerik üretimini tetikler — kanıtsız iddia yayınlamaz

## 6. Hukuk & Uyum Agent'ı

**Görevi:** Norveç ve AB veri koruma kuralları, lisans sözleşmeleri, C2PA uyumluluğu.

- **Girdi:** Ürün ve Metodoloji agent'larından süreç detayları
- **Çıktı:** Lisans/sözleşme şablonları, uyumluluk kontrol listesi
- **Karar yetkisi:** Hangi sözleşme maddelerinin zorunlu olduğu
- **Nasıl karar verir:** Faz 4'te (Avrupa genişlemesi) devreye tam güçle girer, ama Faz 0'dan itibaren temel sözleşme şablonlarını hazırlar

---

## Ekip Nasıl Çalışır (Haftalık Döngü)

1. Her agent, o hafta kendi alanında neyin ilerlediğini/tıkandığını raporlar
2. Orkestrasyon Agent'ı, Faz dokümanındaki başarı kriterlerine göre "bu hafta öncelik nedir" kararını verir
3. Tıkanma noktası varsa (ör. Metodoloji dokümanı bitmeden pilot başlatılamaz), Orkestrasyon Agent'ı tüm ekibi o noktaya yönlendirir
4. Bir faz tamamlandığında, sonraki fazın hangi agent'lar tarafından yürütüleceği önceden bellidir (yukarıdaki yapıya göre)

---

## Şimdi Ne Yapmalısınız

Bu yapıyı hayata geçirmek için önerilen ilk adım: **Güven & Metodoloji Agent'ının çıktısı olan Doğrulama Metodolojisi dokümanını** yazmaya başlamak — çünkü Orkestrasyon Agent'ı mantığına göre bu, Faz 0'ın çıkış koşulu ve hiçbir pilot bu olmadan güvenilir şekilde başlatılamaz. İsterseniz bu dokümanı şimdi birlikte hazırlayabiliriz.
