# NAVIAR CARE Pårørendepilot — operasyonel breakdown

Kaynak: proje liderinin ayrıntılı breakdown talimatı (02.09.2026, akşam).
Bu belge **hizmet teslimatının operasyonel tek kaynağıdır**; ticari model
forretningsmodell.md'de, yöntem seti metodoloji.md'de, metrik tanımları
pilot-olcum-plani.md'dedir. Çelişki hâlinde kapsam kuralı
(forretningsmodell.md) kazanır. **Tüm fiyatlar örnektir.**

## Öz

> Kullanıcı ihtiyacı → Doğru görev → Doğrulanmış yardımcı →
> Saatlik hizmet → Komisyon

Kullanıcı çoğu zaman hizmet adını söyleyemez ("Babam yalnız kalıyor",
"Onu aktiviteye götürecek biri lazım"). NAVIAR CARE bu belirsiz ihtiyacı
açık bir hizmet talebine çevirir — Kartlegg→Forstå adımlarının işi
(metodoloji.md).

## Hizmetin altı parçası (A–F)

| Parça | İçerik | Yüzey |
|---|---|---|
| **A. İhtiyaç alma** | Ne tür yardım, ne zaman, nerede, kaç saat, tek seferlik/düzenli, ilgi alanları, ulaşım gereksinimi, aile katılımı | prototype.html steg 2 + 5 |
| **B. Görev tanımlama** | Serbest metin → yapılandırılmış görev (kategori, refakat/ulaşım, tekrar, süre, ehliyet/araç gereksinimi) | Koordinatör; konsol kayıt alanları |
| **C. Yardımcı bulma** | Kriterler: görev deneyimi, güvenilirlik, zaman, mesafe, dil, ilgi, kişilik uyumu, ehliyet+araç, referans, belge/kontroller — öncelik sırası metodoloji.md'de | Konsol manuel eşleştirme |
| **D. Planlama** | Tarih, saat aralığı, buluşma noktası, aktivite, ulaşım, görev açıklaması, ücret, iptal koşulları, takip zamanı | prototype.html steg 5–6 |
| **E. Gerçekleştirme** | Kabul → **check-in** → görev → **check-out** → kısa hizmet notu | Konsol `Pågår` aşaması + hendelsesnotat; prototip steg 7 |
| **F. Ödeme + komisyon** | Kullanıcı öder (rezervasyon) → hizmet tamamlanır → kullanıcı onaylar → yardımcıya aktarım → komisyon alıkonur | prototip steg 6 ("reserveres … trekkes ved fullført"); konsol oppgjør satırı |

## Tarafların sorumluluğu

| Taraf | Sorumluluk |
|---|---|
| Kullanıcı | Doğru bilgi vermek, görevi onaylamak, ödeme yapmak |
| Pårørende | Gerekli bilgiyi paylaşmak, iletişime destek olmak |
| Yardımcı | Onaylanan görevi zamanında ve profesyonelce yapmak |
| NAVIAR CARE | Analiz, eşleştirme, planlama, takip |
| Partner | Eğitim, işverenlik, sigorta, profesyonel destek |

## Pilot sınırı — açık liste

**Yapılır:** sosyal refakat, yürüyüş, aktivite/spor, alışveriş, basit ev
işleri, ulaşım ve randevu eşliği, kültürel/sosyal etkinlik, haftalık
aktivite planı. (+ liste dışı her düşük riskli görev "Annet" yoluyla —
kapsam kuralı.)

**Yapılmaz (pilot):** ilaç yönetimi, tıbbi karar, **teşhis**, **klinik
takip**, ileri kişisel bakım, **profesyonel rehabilitasyon**, yüksek
riskli forflytning. Bunlar ileride yalnızca yetkili partner modeliyle
eklenebilir (metodoloji.md "kritik ayrım").

## Üç taraflı teknik sistem (hedef mimari)

| Taraf | Gereksinim | Bugünkü durum |
|---|---|---|
| Kullanıcı | kayıt, talep, hizmet seçimi, takvim, yardımcı profili, fiyat onayı, ödeme, geri bildirim | prototype.html (8 adım, mock) |
| Yardımcı | profil, beceriler, uygunluk takvimi, görev listesi, kabul, check-in/out, gelir takibi, değerlendirme | Konsolda koordinatör vekâletiyle; öz-servis yüzey AÇIK İŞ |
| Yönetici | talepler, risk değerlendirmesi, aday doğrulama, manuel eşleştirme, ödeme kontrolü, şikâyet yönetimi, KPI | admin.html (Kø/Hjelpere/Måling/Data + Klage) |

## 12 adımlı pilot workflow'u

1. Talep → 2. İhtiyaç görüşmesi → 3. Kategori → 4. Risk seviyesi →
5. Adaylar → 6. Seçim → 7. **Kullanıcı eşleşmeyi onaylar** → 8. Saat +
ücret kesinleşir → 9. Hizmet (check-in/out) → 10. Ödeme + komisyon →
11. Geri bildirim → 12. Sonraki hizmet planlanır.

Konsol karşılığı: Ny → Vurdert (2–4) → Matchet (5–6) → Bekreftet (7–8)
→ Pågår (9, check-in) → Fullført (9–11, check-out + not + tilfredshet).

## Başarı ölçümü

Kullanıcı ve operasyon metrikleri pilot-olcum-plani.md'de tanımlı.
Breakdown'ın eklediği **finans metrikleri** (hepsi örnek hedefli):
ortalama hizmet tutarı, komisyon geliri, tekrar sipariş geliri —
konsol Måling sekmesi köyden hesaplar. Kullanıcı edinme maliyeti,
hizmet başına operasyon maliyeti ve brüt katkı payı konsol verisinden
hesaplanamaz; pilot regnearket'te elle tutulur (açık iş).

## En küçük çalışan versiyon (§12) — durum

basit web sitesi ✓ (landing) · talep formu ✓ (prototip) · yardımcı
kaydı ✓ (konsol; öz-servis form açık iş) · manuel doğrulama ✓ · manuel
eşleştirme ✓ · ortak takvim — AÇIK İŞ · ödeme bağlantısı — hukuk
kapısı §1-2 yanıtlanmadan gerçek ödeme YOK (hukuk-kontrol-listesi.md)
· hizmet sonrası geri bildirim ✓.

## Kesin karar (proje lideri)

İlk ürün: **Pårørendepilot destekli, güvenilir yardımcı eşleştirme ve
saatlik günlük yaşam desteği platformu.** İlk hedef büyük sistem değil:
gerçek kullanıcı, gerçek yardımcı, gerçek hizmet ve gerçek ödeme ile
çalışan küçük ama güvenilir bir pilot. Mobil uygulama, YZ ve tam
otomatik pazaryeri sonraki aşamalara ertelendi (metodoloji.md
ertelenenler listesi).
