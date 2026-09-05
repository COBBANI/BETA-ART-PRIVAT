# NAVIAR CARE — uyum ilkeleri (bağlayıcı tasarım gereksinimleri)

Kullanıcı talimatı, 01.09.2026. Bu beş ilke ürün kararlarında tercih değil,
kısıttır: bir özellik bu maddelerden biriyle çelişiyorsa özellik değişir,
ilke değişmez.

## 1. Veri minimizasyonu — sağlık bilgisi gereksiz yere toplanmaz

- Form ve akışlar **teşhis, ilaç listesi veya sağlık geçmişi istemez**.
  Alınan tek serbest metin "durum tarifi"dir ve arayüz açıkça yönlendirir:
  ihtiyacı yaz, hastalığı değil. (Uygulandı: kayıt formu placeholder +
  yardım metni, 01.09.2026.)
- Bir uzman göreve başladıktan sonra gerekli sağlık bilgisi **uzman ile
  kullanıcı arasındaki kanalda** kalır; platform veritabanına yapısal
  sağlık alanı eklenmez. Eklenmesi gerekirse önce bu belge güncellenir ve
  gerekçesi yazılır.
- Üçüncü kişiye (bakım alan yaşlıya) ait bilgi için açık dayanak şartı:
  toplanmadan önce hangi hukuki zemine dayandığı kaydedilir.

## 2. Yapay zekâ kişi hakkında otomatik karar vermez

- Eşleştirme, önceliklendirme veya değerlendirme yapan herhangi bir
  otomasyon **öneri üretir, karar vermez**. Uzman seçimi, işe kabul,
  görev dağıtımı ve performans sonuçları her zaman bir insanın onayından
  geçer (human-in-the-loop).
- Bu, platformdaki **fagpersoner (çalışan/yüklenici) için de** geçerlidir:
  başvuru reddi, hesap kapatma, honorar kesintisi gibi sonuçlar hiçbir
  zaman yalnızca otomatik bir puana bağlanamaz.
- AI Act terminolojisiyle: istihdam bağlamındaki kullanım yüksek riskli
  kategoriye girer; sistem şimdiden buna göre tasarlanır (madde 4).

## 3. Zorunlu mimari: insan kontrolü, RBAC, silme süresi, işlem kaydı

Backend hangi teknolojiyle yazılırsa yazılsın şu dört bileşen tasarımın
parçasıdır, sonradan eklenmez:

| Bileşen | Asgari gereksinim |
|---|---|
| İnsan kontrolü | Otomatik önerinin yanında "kim onayladı" alanı; onaysız sonuç doğurmaz |
| Rol bazlı erişim (RBAC) | Kullanıcı verisini yalnız görevle ilişkili rol görür; uzman yalnız kendi vakasını görür; yönetici erişimi gerekçe ister |
| Silme süresi | Her veri sınıfının yazılı saklama süresi vardır; süre dolunca otomatik silinir; kullanıcı talebiyle erken silme her zaman mümkündür |
| İşlem kaydı (audit log) | Kişisel veriye her erişim ve her otomatik öneri kime/ne zaman/hangi gerekçeyle bilgisiyle loglanır; log değiştirilemez |

## 4. Regülasyon hazırlığı: AI Act şimdiden, KI-lov beklenmeden

- Norveç KI-lov taslağı bu notun tarihinde hâlen **"under behandling"**
  görünüyor (kaynak: Regjeringen — kullanıcı bildirimi, 01.09.2026; bu
  ortamdan sayfa doğrudan teyit edilemedi, lansman öncesi elle
  doğrulanmalı).
- Beklemek strateji değildir: sistem **şimdiden AB AI Act'e uyumlu**
  tasarlanır — risk sınıflandırması yazılır, madde 2'deki insan gözetimi
  ve madde 3'teki kayıt mimarisi bunun ön koşuludur. KI-lov yürürlüğe
  girdiğinde fark analizi yapılır, bu belgeye tarihli ek düşülür.

## 5. Erişilebilirlik: Norveç kuralları + WCAG her sitede

- Norveç'te web sitelerinin evrensel tasarım yükümlülüğü **Uu-tilsynet**
  tarafından denetlenir; NAVIAR'a bağlı her site WCAG kontrolünden
  geçmeden yayınlanmaz. (Uygulanacak sürüm/kapsam lansman öncesi
  uutilsynet.no'dan teyit edilmeli — bu ortamdan doğrulanamadı.)
- Asgari pratik: her yayın öncesi **axe-core WCAG 2.1 AA taraması sıfır
  ihlalle** geçer; klavye erişimi, form etiketleri, kontrast, dialog
  semantiği ve `prefers-reduced-motion` elle gözden geçirilir.
- Durum: naviar-care landing sayfası 01.09.2026'da tarandı — 41 kontrast
  ihlali ve 1 etiketsiz form alanı düzeltildi, sonuç **0 ihlal** (sayfa +
  modal). Tarama betiği: oturum scratchpad `a11y-check.mjs` deseni
  (Playwright + axe-core, `runOnly: wcag2a/wcag2aa/wcag21aa`).

## Doğrulanmamışlar listesi

Uydurma yasak (bkz. CLAUDE.md madde 7): aşağıdakiler bu ortamdan teyit
edilemedi ve lansman öncesi elle doğrulanmalıdır:

- KI-lov taslağının güncel durumu ve zaman çizelgesi (regjeringen.no)
- Uu-tilsynet'in güncel WCAG sürüm/kapsam şartı (uutilsynet.no)
- AI Act'in istihdam hükümlerinin Norveç'te (EØS) yürürlük takvimi
