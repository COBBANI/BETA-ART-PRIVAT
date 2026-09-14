# NAVIAR CARE / SRC-03 — Belgeler ve arşiv

**Arşiv kodu:** NAVIAR-CARE-SRC03-ARSIV-20260905  
**Tarih:** 5 Eylül 2026  
**Arşiv sürümü:** 1.0

10 ana dosya ve 3 yeni kayıt açıklamalarıyla listelendi. Kullanım rehberi, HTML/Markdown liste, CSV envanter ve SHA-256 kontrol dosyası ayrıca pakete eklendi. Uygulama kodu sürümlü Git kaydında korunur; bu belge paketinde kodun sürüm kaydı ve 131 dosyalık envanteri vardır.

Konsept: Evinde yaşamayı sürdüren yaşlılara tıbbi olmayan günlük destek. Yardım alan kişi ziyaretin kapsamına ve bilgi paylaşımına karar verir; yakını organizasyona yardımcı olabilir.

**Mevcut durum:** Özel inceleme sürümü. Gerçek hizmet, ticari ödeme ve e-posta gönderimi önceki teslimde etkin değil. Bu işlem belgeleme ve arşivlemedir; yeni yayın veya hizmet açılışı yapılmadı.

[Türkçe web sitesi](https://naviar-care-src03.andersen-betul.chatgpt.site/tr) · [Norveççe](https://naviar-care-src03.andersen-betul.chatgpt.site/nb) · [English](https://naviar-care-src03.andersen-betul.chatgpt.site/en)

## Okuma sırası

1. Ana proje belgesi: geliştirme süreci, konsept, web yapısı ve devir için DOC-01.
2. Tam konsept: hizmet modeli ve kullanıcı yolculukları için DOC-03.
3. Web tasarımı: tarayıcıda önizleme için DOC-08; 301 üç dilli metin için DOC-09.
4. Güncel özellikler ve açık işler için DOC-05; kod sürümü ve geri erişim için REC-11.

ZIP'i bir klasöre çıkarıp bu HTML listeyi açın. Aşağıdaki dosya bağlantıları çıkarılmış klasör içinde çalışır; tek başına indirilen listede yan dosyalar bulunmalıdır.

## Açıklamalı dosya listesi

| No | Dosya | İçerik | Okuma notu |
|---|---|---|---|
| DOC-01 | [NAVIAR-CARE_SRC03_Proje-Dokumantasyonu_v1.0.docx](01_PROJE_BELGELERI/NAVIAR-CARE_SRC03_Proje-Dokumantasyonu_v1.0.docx) | 29 sayfalık, 23 bölümlük düzenlenebilir belge: geliştirme süreci, konsept, web sayfaları, teknik yapı, test kayıtları ve devir adımları. | Önce bu belgeyi okuyun. |
| DOC-02 | [NAVIAR-CARE_SRC03_Proje-Dokumantasyonu_v1.0.md](01_PROJE_BELGELERI/NAVIAR-CARE_SRC03_Proje-Dokumantasyonu_v1.0.md) | Proje dokümantasyonunun düzenlenebilir Markdown kaynağı. | Word belgesiyle aynı dokümantasyon seti. |
| DOC-03 | [NAVIAR-CARE_SRC03_Tam-Konsept.html](01_PROJE_BELGELERI/NAVIAR-CARE_SRC03_Tam-Konsept.html) | Hizmet modeli, kullanıcı yolculukları, iş modeli, operasyon, tasarım ve açılış planı; tarayıcıda okunabilir. | 23 bölüm; hizmet tasarımı önerilerini de içerir. |
| DOC-04 | [NAVIAR-CARE_SRC03_Tam-Konsept.md](01_PROJE_BELGELERI/NAVIAR-CARE_SRC03_Tam-Konsept.md) | Tam konseptin düzenlenebilir Markdown kaynağı. | HTML konsept dosyasının kaynak metni. |
| DOC-05 | [NAVIAR-CARE_Profesyonel-Surum_Teslim.md](01_PROJE_BELGELERI/NAVIAR-CARE_Profesyonel-Surum_Teslim.md) | Sürüm 5 teslim durumu, özellikler, test kanıtları ve daha eski sürüm 2 kaydı. | Eski ve yeni test sayıları kendi sürümlerine göre okunmalı. |
| DOC-06 | [NAVIAR-CARE_Kurulum-ve-Kabul.md](01_PROJE_BELGELERI/NAVIAR-CARE_Kurulum-ve-Kabul.md) | Test talebi, sorun bildirimi, e-posta/ödeme bağlantıları ve açılıştan önce tamamlanacak işler. | Tarihsel rehber; son durum için ana proje belgesi esas alınır. |
| DOC-07 | [NAVIAR-CARE_Web-Design-Platform-Studio_2026-09-05.md](01_PROJE_BELGELERI/NAVIAR-CARE_Web-Design-Platform-Studio_2026-09-05.md) | Platform değerlendirmesi, hizmet yolculuğu, tasarım kararları ve sürüm 3/4 teslim kayıtları. | Geliştirme geçmişi; sürüm 5 için güncel teslim belgesine bakın. |
| DOC-08 | [NAVIAR-CARE_SRC03_Web-Tasarim.html](02_WEB_VE_ICERIK/NAVIAR-CARE_SRC03_Web-Tasarim.html) | Norveççe, İngilizce ve Türkçe; tarayıcıda doğrudan açılabilen bağımsız tasarım önizlemesi. | Gerçek rezervasyon, ödeme veya e-posta oluşturmaz. |
| DOC-09 | [NAVIAR-CARE_Icerik_NB-EN-TR.csv](02_WEB_VE_ICERIK/NAVIAR-CARE_Icerik_NB-EN-TR.csv) | 301 benzersiz içerik kaydı; key, nb, en, tr sütunları. | 301 kayıt bu turda sayıldı; tüm dil alanları dolu. |
| DOC-10 | [NAVIAR-CARE_PROJE-DUZENI.md](03_KAYITLAR/NAVIAR-CARE_PROJE-DUZENI.md) | NAVIAR CARE ailesinin klasör standardı ve SRC-03 geliştirme kayıtları. | Ortak geçmiş kaydıdır; diğer CARE projelerine ait bölümler de vardır. |
| REC-11 | [WEB-VE-KOD-KAYDI.md](03_KAYITLAR/WEB-VE-KOD-KAYDI.md) | Güncel web adresleri, kayıtlı 5 sürüm, kaynak revizyonları ve kodun geri erişim açıklaması. | Bu arşivleme turunda oluşturuldu. |
| REC-12 | [KOD-DOSYA-LISTESI.csv](03_KAYITLAR/KOD-DOSYA-LISTESI.csv) | Önceden teslim edilmiş kod ZIP’indeki 131 dosyanın yolu, boyutu ve SHA-256 değeri; kodun kendisi değildir. | Bu arşivleme turunda oluşturuldu. |
| REC-13 | [DOGRULAMA-RAPORU.md](03_KAYITLAR/DOGRULAMA-RAPORU.md) | Bu turda yapılan kontroller, önceki testlerin kapsamı ve arşivin sınırları. | Bu arşivleme turunda oluşturuldu. |

## Düzen ve bütünlük

01_PROJE_BELGELERI: 7 dosya. 02_WEB_VE_ICERIK: 2 dosya. 03_KAYITLAR: 4 dosya. Kök klasörde 5 yardımcı dosya; toplam 18 paket üyesi. SHA256SUMS.txt kendisi dışındaki 17 dosyayı kapsar. ZIP dosyasının özeti dış arşiv kaydında bulunur.
