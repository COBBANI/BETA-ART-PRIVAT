#!/usr/bin/env python3
"""Teslim arşivleyici — yüklenen dosyaları depoya alır, numaralar, SHA-256 ile kaydeder.

Kullanım:
  python3 .claude/skills/teslim-arsivle/scripts/arsivle.py KAYNAK [KAYNAK...] \
      --hedef docs/<proje>/<teslim> --kod NC2-ARS --proje NAVIAR-CARE-002 [--gomulu] [--kuru]

KAYNAK: dosya, klasör (ör. /root/.claude/uploads/<oturum>) ya da .zip. Hepsi birlikte tek
teslim sayılır. Ne yapar:
  1. Yükleme öneklerini atar (`ab12cd34-Ad.html` → `Ad.html`), kullanıcının kendi arşiv dizini
     (HTML'deki <a href="..."> listesi) ya da envanteri (JSON `files[].file_name`) varsa adları
     ona göre düzeltir (`PROJEX_Konsept_v6_3.html` → `PROJE-X_Konsept_v6.html`).
  2. İçeriği aynı olan dosyaları (SHA-256) tek kez alır; kopya sayısını raporlar.
  3. Gizli görünen dosyaları dışarıda bırakır (.env, *.pem, özel anahtar, sk_live_ …).
  4. Hedefte önceki envanter varsa numaralamaya kaldığı yerden devam eder; eskileri değiştirmez.
  5. SHA256SUMS.txt varsa listeyi arşive karşı doğrular (OK / EKSİK / UYUŞMAZ).
  6. --gomulu: HTML dosyalarındaki base64 gömülü görselleri `_gomulu/` altına çıkarır.
  7. `00_ARSIV-DIZINI.md` ve `00_ARSIV-ENVANTERI.json` yazar. --kuru yalnızca planı basar.

Orijinal dosyalara dokunmaz; hedefe kopyalar. Bayt bayt aynı içerik korunur.
"""
import argparse, base64, hashlib, json, re, shutil, sys, tempfile, zipfile
from datetime import date
from pathlib import Path

UPLOAD_PREFIX = re.compile(r'^[0-9a-f]{8}-')
SECRET_NAMES = re.compile(r'(^\.env|\.pem$|\.key$|id_rsa|credentials|secrets?\.json$)', re.I)
SECRET_BODY = re.compile(rb'(-----BEGIN [A-Z ]*PRIVATE KEY-----|sk_live_[0-9A-Za-z]{8,}|AKIA[0-9A-Z]{16}|ghp_[0-9A-Za-z]{30,})')

def sha(b): return hashlib.sha256(b).hexdigest()
def norm(name):
    """Karşılaştırma anahtarı: küçük harf, yalnız harf/rakam, sondaki _1/_2 kopya eki atılmış."""
    stem, dot, ext = name.rpartition('.')
    if not dot: stem, ext = name, ''
    stem = re.sub(r'[_ ]\(?\d{1,2}\)?$', '', stem)   # _1, _2, (3): tarayıcı kopya eki; _20260905 ad parçasıdır
    return re.sub(r'[^a-z0-9]', '', stem.lower()) + '.' + ext.lower()

def collect(sources, tmp):
    """Kaynaklardan (dosya/klasör/zip) (yükleme adı, bayt, köken) listesi."""
    out = []
    for s in sources:
        p = Path(s)
        if p.suffix.lower() == '.zip' and p.is_file():
            d = Path(tmp) / p.stem; d.mkdir(parents=True, exist_ok=True)
            with zipfile.ZipFile(p) as z: z.extractall(d)
            for f in sorted(d.rglob('*')):
                if f.is_file(): out.append((f.name, f.read_bytes(), f'{p.name}:{f.relative_to(d)}'))
        elif p.is_dir():
            for f in sorted(p.rglob('*')):
                if f.is_file() and f.name != '.DS_Store': out.append((f.name, f.read_bytes(), str(f)))
        elif p.is_file():
            out.append((p.name, p.read_bytes(), str(p)))
        else:
            print(f'UYARI: kaynak yok: {s}', file=sys.stderr)
    return out

def canonical_names(items):
    """Kullanıcının dizin HTML'i / envanter JSON'undan {normalize → (özgün ad, tür)}."""
    m = {}
    for name, b, _ in items:
        low = name.lower()
        if low.endswith('.html'):
            t = b.decode('utf-8', 'replace')
            for href, rest in re.findall(r'<a href="([^"/:#][^"]*)"[^>]*>[^<]*</a></td><td>([^<]*)</td>', t):
                m.setdefault(norm(href), (href, rest.strip()))
            for href in re.findall(r'<a href="([^"/:#][^"]*\.[a-z0-9]{2,5})"', t):
                m.setdefault(norm(href), (href, ''))
        elif low.endswith('.json'):
            try:
                j = json.loads(b.decode('utf-8'))
                for f in (j.get('files') or j.get('kayitlar') or []):
                    fn = f.get('file_name') or f.get('dosya')
                    if fn: m.setdefault(norm(fn), (fn, f.get('status') or f.get('tur') or ''))
            except Exception: pass
    return m

def embedded_assets(name, b, outdir, kuru):
    found = []
    if not name.lower().endswith(('.html', '.htm')): return found
    t = b.decode('utf-8', 'replace')
    for i, mt in enumerate(re.finditer(r'data:image/(svg\+xml|webp|png|jpeg|gif);base64,([A-Za-z0-9+/=]+)', t)):
        raw = base64.b64decode(mt.group(2)); ext = {'svg+xml': 'svg', 'jpeg': 'jpg'}.get(mt.group(1), mt.group(1))
        dims = ''
        try:
            if ext == 'webp' and raw[12:16] == b'VP8X': dims = f"{1+int.from_bytes(raw[24:27],'little')}x{1+int.from_bytes(raw[27:30],'little')}"
            elif ext == 'webp' and raw[12:16] == b'VP8 ': dims = f"{int.from_bytes(raw[26:28],'little')&0x3fff}x{int.from_bytes(raw[28:30],'little')&0x3fff}"
            elif ext == 'png': dims = f"{int.from_bytes(raw[16:20],'big')}x{int.from_bytes(raw[20:24],'big')}"
            elif ext == 'svg':
                vb = re.search(rb'viewBox="([^"]+)"', raw); dims = ('viewBox ' + vb.group(1).decode()) if vb else ''
        except Exception: pass
        title = re.search(r'<title[^>]*>([^<]{1,80})</title>', raw.decode('utf-8', 'replace')) if ext == 'svg' else None
        fn = f"{Path(name).stem}-{i+1:02d}.{ext}"
        if not kuru: (outdir / fn).write_bytes(raw)
        found.append({'dosya': f'_gomulu/{fn}', 'kaynak': name, 'bayt': len(raw), 'boyut': dims, 'baslik': title.group(1).strip() if title else '', 'sha256': sha(raw)})
    return found

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('kaynak', nargs='+'); ap.add_argument('--hedef', required=True); ap.add_argument('--kod', required=True, help='kayıt öneki, ör. NC2-ARS')
    ap.add_argument('--proje', default=''); ap.add_argument('--gomulu', action='store_true'); ap.add_argument('--kuru', action='store_true')
    a = ap.parse_args()
    hedef = Path(a.hedef); env_path = hedef / '00_ARSIV-ENVANTERI.json'
    env = json.loads(env_path.read_text(encoding='utf-8')) if env_path.exists() else {'proje': a.proje, 'kod': a.kod, 'kayitlar': [], 'kopyalar': [], 'disarida': []}
    known_sha = {r['sha256']: r for r in env['kayitlar']}
    with tempfile.TemporaryDirectory() as tmp:
        items = collect(a.kaynak, tmp)
    canon = canonical_names(items)
    # Hedefte önceki bir teslim varsa ad ve türleri oradan da öğren: kullanıcının daha önce arşivlenmiş
    # dizin HTML'i / envanter JSON'u ve eski kayıtların kendisi. Yoksa ZIP'le tek başına gelen dosya
    # 'İncelenecek' kalır ve ajan arşivi sıfırdan yeniden üretmek zorunda kalır (iteration-1, eval-2).
    if hedef.is_dir():
        prev = [(p.name, p.read_bytes(), str(p)) for p in sorted(hedef.iterdir())
                if p.is_file() and not p.name.startswith('00_') and p.suffix.lower() in ('.html', '.json')]
        for k, v in canonical_names(prev).items(): canon.setdefault(k, v)
        for r in env['kayitlar']: canon.setdefault(norm(r['dosya']), (r['dosya'], '' if r['tur'] == 'İncelenecek' else r['tur']))
    sums = {}
    for name, b, _ in items:
        if UPLOAD_PREFIX.sub('', name).upper() == 'SHA256SUMS.TXT':
            for line in b.decode('utf-8', 'replace').splitlines():
                mm = re.match(r'([0-9a-f]{64})\s+\*?(.+)$', line.strip())
                if mm: sums[mm.group(2).strip()] = mm.group(1)
    seen = {}; new = []; kopya = []; disarida = []
    for name, b, origin in items:
        base = UPLOAD_PREFIX.sub('', name)
        if SECRET_NAMES.search(base) or SECRET_BODY.search(b[:200000]):
            disarida.append({'dosya': base, 'neden': 'gizli bilgi görünümü (ad ya da içerik)', 'kaynak': origin}); continue
        h = sha(b)
        c = canon.get(norm(base)); ad = c[0] if c else re.sub(r'([_ ])\(?\d{1,2}\)?(\.[A-Za-z0-9]+)$', r'\2', base); tur = (c[1] if c else '') or 'İncelenecek'
        if h in known_sha: kopya.append({'dosya': base, 'ayni': known_sha[h]['dosya'], 'kaynak': origin}); continue
        if h in seen: kopya.append({'dosya': base, 'ayni': seen[h], 'kaynak': origin}); continue
        seen[h] = ad
        new.append({'no': '', 'dosya': ad, 'tur': tur, 'bayt': len(b), 'sha256': h, 'yukleme_adi': base, 'kaynak': origin, '_b': b})
    # ad çakışması (aynı ad, farklı içerik) → sürüm eki
    adlar = {r['dosya'] for r in env['kayitlar']}
    for r in new:
        base_ad = r['dosya']; k = 2
        while r['dosya'] in adlar:
            stem, dot, ext = base_ad.rpartition('.'); r['dosya'] = f'{stem}_surum{k}.{ext}' if dot else f'{base_ad}_surum{k}'; k += 1
        adlar.add(r['dosya'])
    n0 = len(env['kayitlar'])
    for i, r in enumerate(new, n0 + 1): r['no'] = f'{a.kod}-{i:03d}'
    # SHA256SUMS doğrulaması
    dogrulama = []
    all_recs = env['kayitlar'] + new
    by_name = {r['dosya']: r['sha256'] for r in all_recs}
    for fn, h in sums.items():
        got = by_name.get(fn)
        dogrulama.append({'dosya': fn, 'durum': 'OK' if got == h else ('EKSİK' if got is None else 'UYUŞMAZ')})
    gomulu = []
    if not a.kuru:
        hedef.mkdir(parents=True, exist_ok=True)
        for r in new: (hedef / r['dosya']).write_bytes(r['_b'])
    if a.gomulu:
        gd = hedef / '_gomulu'
        if not a.kuru: gd.mkdir(exist_ok=True)
        for r in new + [dict(x, _b=(hedef / x['dosya']).read_bytes()) for x in env['kayitlar'] if (hedef / x['dosya']).exists()]:
            gomulu += embedded_assets(r['dosya'], r['_b'], gd, a.kuru)
    for r in new: r.pop('_b', None)
    env['kayitlar'] += new; env['kopyalar'] = env.get('kopyalar', []) + kopya; env['disarida'] = env.get('disarida', []) + disarida
    env['dogrulama'] = dogrulama; env['tarih'] = date.today().isoformat(); env['proje'] = env.get('proje') or a.proje; env['kod'] = a.kod
    if gomulu: env['gomulu'] = gomulu
    md = [f"# {env['proje'] or a.kod} — teslim arşivi ({a.kod})", '',
          f"Arşiv tarihi: {env['tarih']}. Kayıt sayısı: {len(env['kayitlar'])}. Kaynak: kullanıcı yüklemesi; adlar kullanıcının kendi",
          "dizin/envanterine göre düzeltildi, içerikler bayt bayt korundu. Numaralar bu deponun sırasıdır; dosya",
          "adındaki proje kodları (DOS/REV/SRC…) değiştirilmez. `İncelenecek` = türü hiçbir dizinde geçmeyen dosya.", '',
          '| No | Dosya | Tür | Bayt | SHA-256 |', '|---|---|---|---|---|']
    md += [f"| {r['no']} | `{r['dosya']}` | {r['tur']} | {r['bayt']} | `{r['sha256'][:16]}…` |" for r in env['kayitlar']]
    if dogrulama:
        ok = sum(1 for d in dogrulama if d['durum'] == 'OK')
        md += ['', f"## SHA256SUMS doğrulaması: {ok}/{len(dogrulama)} OK", ''] + [f"- {d['durum']}: `{d['dosya']}`" for d in dogrulama if d['durum'] != 'OK']
    if env['kopyalar']:
        md += ['', f"## Ayıklanan kopyalar ({len(env['kopyalar'])})", ''] + [f"- `{k['dosya']}` → `{k['ayni']}` ile aynı içerik" for k in env['kopyalar']]
    if env['disarida']:
        md += ['', '## Dışarıda bırakılanlar', ''] + [f"- `{d['dosya']}`: {d['neden']}" for d in env['disarida']]
    if gomulu:
        md += ['', '## Gömülü varlıklar (`_gomulu/`, türetilmiş, numarasız)', '', '| Dosya | Kaynak | Bayt | Boyut | Başlık |', '|---|---|---|---|---|']
        md += [f"| `{g['dosya']}` | `{g['kaynak']}` | {g['bayt']} | {g['boyut']} | {g['baslik']} |" for g in gomulu]
    md += ['', 'Tam SHA-256 değerleri `00_ARSIV-ENVANTERI.json` içinde.']
    if a.kuru:
        print('\n'.join(md)); print(f"\n[KURU] {len(new)} yeni, {len(kopya)} kopya, {len(disarida)} dışarıda, {len(gomulu)} gömülü — hiçbir şey yazılmadı"); return
    (hedef / '00_ARSIV-DIZINI.md').write_text('\n'.join(md) + '\n', encoding='utf-8')
    env_path.write_text(json.dumps(env, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
    aralik = f" ({a.kod}-{n0+1:03d}…{a.kod}-{len(env['kayitlar']):03d})" if new else ' (arşiv değişmedi)'
    print(f"{hedef}: {len(new)} yeni kayıt{aralik}, {len(kopya)} kopya ayıklandı, "
          f"{len(disarida)} dışarıda, SHA256SUMS {sum(1 for d in dogrulama if d['durum']=='OK')}/{len(dogrulama)} OK, {len(gomulu)} gömülü varlık")
    for d in dogrulama:
        if d['durum'] != 'OK': print(f"  {d['durum']}: {d['dosya']}")

if __name__ == '__main__': main()
