# SHARED-WEB-LIBRARY — REGISTRY

Yeniden kullanılabilir öğe adayları. Kaynağı doğrulanmış; hiçbiri bugün
fiziksel olarak paylaşılmıyor (hepsi kaynak projesinde duruyor). Son
doğrulama: 2026-09-03.

---

## 1. shadcn/ui + Radix + Tailwind arayüz katmanı

- **Bileşen kimliği:** UI-SHADCN-01
- **Bileşen adı:** shadcn/ui primitifleri (button, input, label, textarea …)
- **Açıklama:** Radix tabanlı, Tailwind ile biçimlenmiş temel arayüz bileşenleri.
- **Kaynak proje / dosya:** WEB-2026-002 `apps/beta-art-archive/src/components/ui/` (4 bileşen: button, input, label, textarea). Ayrıca WEB-2026-003 `beta-art/src/components/ui/` (46 bileşen — çok daha geniş Radix seti).
- **Kullanıldığı projeler:** 002, 003. (005 de shadcn/ui kullanır — ayrı "eve" ailesi.)
- **Teknoloji/framework:** React 19 + Radix + Tailwind. **002 Vite, 003 TanStack** — build/config farkı var.
- **Gerekli bağımlılıklar:** `@radix-ui/*`, `tailwindcss`, `lucide-react`, `class-variance-authority`/`clsx` (proje bazında değişir).
- **Sınıf:** **İnceleme gerekli.** İki proje aynı ailedendir ama sürüm ve build zinciri farklı (002 minimal, 003 tam set + Lovable config). Ortaklaştırma, önce hangi projenin kanonik olduğuna (002) ve 003'ün geleceğine bağlı.
- **Güvenlik notu:** primitifler nötr; marka/iş kuralı içermez.
- **Lisans:** shadcn/ui MIT (kaynak dosyalarda). 003'ün Lovable üretimi.
- **Not:** 003 arşive alındığında bu satır 002'nin katmanına indirgenir.

## 2. Cihaz-yerel davranış motoru

- **Bileşen kimliği:** LIB-BEHAVIOR-01
- **Bileşen adı:** `behavior.ts` (record / recommend / hasBehavior / clearBehavior)
- **Açıklama:** Ağsız, çerezsiz, localStorage tabanlı ziyaretçi davranış + öneri katmanı ("dürüst v1").
- **Kaynak proje / dosya:** WEB-2026-002 `apps/beta-art-archive/src/lib/behavior.ts` (anahtar `ba_davranis_v1`, olay `ba-behavior`).
- **Kullanıldığı projeler:** yalnız 002.
- **Teknoloji:** saf TS + localStorage; çerçeve bağımsız.
- **Sınıf:** **Küçük düzenleme ile kullanılabilir.** Öneri fonksiyonu `Plate` tipine bağlı (projeye özel veri modeli) — genelleştirmek için jenerik bir "item" tipiyle parametreleştirilmeli. Anahtar adı (`ba_*`) da projeye özel → parametre yapılmalı.
- **Güvenlik notu:** kişisel veri toplamaz, cihazdan çıkmaz. Ortak katmana taşınırken bu garanti korunmalı.
- **Not:** Başka bir statik site "ne göreceğini bul" isterse en güçlü aday budur.

## 3. Cihaz-yerel satış defteri + para bölüşümü

- **Bileşen kimliği:** LIB-SALES-01
- **Bileşen adı:** `sales.ts` (readSales/addSale/splitOf/totalsOf/monthlyTotals/salesToCsv)
- **Açıklama:** Yönetici satış defteri; komisyon bölüşümü, Stripe ücret tahmini, aylık toplam, CSV.
- **Kaynak proje / dosya:** WEB-2026-002 `apps/beta-art-archive/src/lib/sales.ts` (anahtar `ba_satis_v1`).
- **Kullanıldığı projeler:** yalnız 002.
- **Sınıf:** **Projeye özel.** İçinde **iş kuralı sabitleri** var (`OWNER_COMMISSION = 0.3`, `OWN_BRAND = "Beta Art"`, Stripe ücret formülü). Madde 11 kuralı gereği bu sabitler ortak bileşene TAŞINMAZ. Genel bir "defter" iskeleti çıkarılabilir ama oran/marka parametre olmalı.
- **Güvenlik notu:** cihaz-yerel; para verisi cihazdan çıkmaz.

## 4. Aylık gelir çubuk grafiği (inline SVG)

- **Bileşen kimliği:** UI-CHART-01
- **Bileşen adı:** `RevenueChart` (Admin içi inline SVG)
- **Açıklama:** Tek-seri, tek-renk, ince yuvarlak-uçlu çubuklar; dataviz kuralına uygun.
- **Kaynak proje / dosya:** WEB-2026-002 `apps/beta-art-archive/src/pages/Admin.tsx`.
- **Kullanıldığı projeler:** yalnız 002.
- **Sınıf:** **Küçük düzenleme ile kullanılabilir.** Veri girişi (`monthlyTotals`) genel; tema token'ına bağlı renk taşınabilir. Bağımsız bir `<BarChart>` bileşenine çıkarılabilir.
- **Güvenlik notu:** yok.

## 5. i18n sözlük deseni (Record<Lang,string>)

- **Bileşen kimliği:** LIB-I18N-01
- **Açıklama:** Basit, çerçevesiz çok dilli sözlük + `translate()` + eksik-anahtar İngilizceye düşme.
- **Kaynak dosyalar:** WEB-2026-002 `src/lib/i18n.ts` (8 dil); WEB-2026-001 `assets/js/i18n.js` (10 dil, farklı uygulama).
- **Kullanıldığı projeler:** 001 (kendi), 002 (kendi) — **iki ayrı uygulama, ortak kod değil.**
- **Sınıf:** **İnceleme gerekli.** İki proje aynı fikri farklı dille (001 saf JS, 002 TS) uyguluyor; ortaklaştırma değerli ama build farkı engel.

---

## Özet

Bugün hiçbir öğe fiziksel paylaşımda değil. En güçlü ortaklaştırma adayları:
**LIB-BEHAVIOR-01** (küçük düzenlemeyle) ve **UI-CHART-01**. **LIB-SALES-01**
iş kuralı taşıdığı için ortaklaştırılmadan önce parametrelenmeli. shadcn
katmanı (UI-SHADCN-01) 002/003 kararı netleşmeden ortaklaştırılmamalı.

Fiili ortak paket (npm workspace) kurmak ayrı bir karardır; bu kayıt onu
hazır tutar.
