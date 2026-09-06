# WEB-2026-002 — SÜRÜM GEÇMİŞİ

Promptun madde 9 + 10. **"En son dosya" ile "son doğrulanmış çalışan sürüm"ü
ayırmak** bu belgenin işidir.

## Sürüm belirleme (madde 10 — kanıta dayalı)

| Kanıt | Değer |
|---|---|
| Git commit tarihi | HEAD `62a0743`, 2026-09-03 06:19 UTC |
| Git tag | **YOK** (hiç etiket basılmamış) |
| Aktif branch | `claude/beta-art-privat-g7k5vk` (PR #7 → main) |
| Deployment kaydı | Vercel `dpl_CqznkNZBNCseTnN1djWkjBscJcA9` — READY |
| Build durumu | `tsc -b && vite build` yeşil |
| Dosya değişiklik tarihi | 2026-09-03 |
| Canlı içerik | beta-art-privat-phi.vercel.app — güncel |
| README | apps/beta-art-archive/README.md güncel |

**Sonuç sınıfı:** HEAD `62a0743` = **Doğrulanmış son kararlı sürüm**
(git commit + READY dağıtım birlikte doğruluyor).

> Uyarı: git tag olmadığı için "sürüm numarası" resmî değildir. Aşağıdaki
> SemVer önerisi henüz **basılmadı** — kullanıcı onayıyla `git tag v1.0.0`
> atılması önerilir (madde 14: kritik sürümler için tag + yedek).

## Önerilen SemVer haritası (geriye dönük, henüz etiketlenmedi)

| Sürüm (öneri) | Commit | Kilometre taşı |
|---|---|---|
| v0.1.0 | `182d959` | İlk React app iskeleti (2026-08-31) |
| v0.5.0 | `1f252b0` | Tüm içerik 8 dilde (2026-09-01) |
| v0.8.0 | `593f94c` | Fotoğrafçı başvuru + komisyon + faktura planı (2026-09-01) |
| v0.9.0 | `f96c096` | Kanıt denetimi 10 bulgu düzeltildi (2026-09-02) |
| v0.9.5 | `c0a0287` | Davranış + satış + grafik sistemleri (2026-09-02) |
| **v1.0.0 (öneri)** | **`62a0743`** | **Yayına hazır kararlı sürüm (2026-09-03)** |

Öneri gerekçesi: `62a0743` canlıda READY, tüm istenen sistemler (i18n, davranış,
satış, grafik, sosyal, kanıt-temizliği) yerinde ve doğrulama-yeşil. İlk kararlı
sürüm etiketi için doğal aday.

### v1.0.0 tag durumu (2026-09-03)

Tag **yerelde oluşturuldu** (`v1.0.0` → `62a0743`) ama **uzağa gönderilemedi**:
bu Claude Code oturumunun git proxy'si yalnız geliştirme dalına push izni
veriyor, etiket ref'lerini reddediyor (`403`). Yerel tag uçucu olduğu için
silindi. **Tag'in gerçekten basılması kullanıcı tarafında bir adım kaldı.**

Elle basma (PR #7 merge olduktan sonra, `main` üzerinde önerilir):
```bash
git fetch origin
git tag -a v1.0.0 62a0743 -m "Beta Art Privat v1.0.0 — ilk kararlı sürüm"
git push origin v1.0.0
```
veya GitHub arayüzünden: Releases → "Draft a new release" → Tag `v1.0.0`,
target commit `62a0743`. (Merge sonrası commit hâlâ geçmişte kalır, tag geçerli olur.)

## Dal standardı (madde 9 — bu proje için)

- `main` — canlı/kararlı hedef (PR #7'nin base'i).
- `claude/beta-art-privat-g7k5vk` — bu projenin aktif geliştirme dalı
  (proje talimatı gereği tüm iş bu dalda; başka dala push yok).

## Eski / atıl sürümler (silinmez — madde 14)

| Öğe | Konum | Sınıf | Not |
|---|---|---|---|
| Beta Art (Lovable/TanStack kopyası) | `beta-art/` | **Eski sürüm / ayrı kod tabanı** | WEB-2026-003. Son commit 2026-08-30. DEC-2026-09-03-001 ile "eski kopya" ilan edildi; **silinmedi**. Geri yükleme: zaten git'te duruyor, dokunulmadı. |
| Harici prototipler | `docs/proje-arsivi.md` madde 4/5/13 | Referans | Statik prototip, Final Work v2 (Supabase), GoDaddy Airo AAB — bu depoda kod yok, yalnız belge. |

## Geri yükleme (madde 14)

- Herhangi bir kararlı noktaya dönmek: `git checkout <commit>` (yukarıdaki
  harita) — kod hiç silinmedi, tüm geçmiş git'te.
- Kritik sürüm için önerilen: `git tag v1.0.0 62a0743 && git push origin v1.0.0`
  (kullanıcı onayı sonrası; bu oturum kendiliğinden tag basmadı).

## Bilinen sürüm riski

Git tag yokluğu "son kararlı sürüm"ü klasör/commit tarihine bağımlı bırakıyor.
Bu, promptun madde 10'da uyardığı tam durum — bu yüzden `v1.0.0` tag önerisi
açıkça kullanıcı onayına sunuldu.
