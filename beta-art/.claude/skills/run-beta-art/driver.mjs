#!/usr/bin/env node
/* Beta Art sürücüsü — Vite dev sunucusunu başlatır, gerçek Chromium ile sürer,
 * ekran görüntüsü alır.
 *
 * Kullanım (beta-art/ dizininden):
 *   node .claude/skills/run-beta-art/driver.mjs smoke [çıktı-dizini]
 *   node .claude/skills/run-beta-art/driver.mjs shot <yol> [çıktı-dizini]
 *
 * smoke: sunucuyu kendisi açar (8080 boşsa), ana sayfa + bir plaka detay
 *        sayfasını sürer, ekran görüntüsü alır, kapatır.
 * shot : tek sayfanın tam ekran görüntüsü — önce sayfayı adım adım
 *        kaydırır ki `loading="lazy"` görseller ekran görüntüsünde boş
 *        kalmasın (bkz. SKILL.md Gotchas).
 *
 * Playwright bu konteynerde küresel kuruludur ama depo kökünden import
 * edilemez (ERR_MODULE_NOT_FOUND) — createRequire ile /opt'tan çözüyoruz
 * (run-qblogg/driver.mjs ile aynı desen).
 */
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const req = createRequire('/opt/node22/lib/node_modules/');
const { chromium } = req('playwright');

const KOK = new URL('../../..', import.meta.url).pathname; // beta-art/ (bu betiğin 3 üstü)
const HOST = '127.0.0.1';
const PORT = 8080;
const BASE = `http://${HOST}:${PORT}`;
const KIP = process.argv[2] || 'smoke';
const OUT = (KIP === 'shot' ? process.argv[4] : process.argv[3]) || '/tmp/beta-art-run';
mkdirSync(OUT, { recursive: true });

// Bu ortamda Supabase (*.supabase.co) ve Google Fonts (fonts.googleapis.com)
// egress proxy tarafından engelli — bu istekler HER ZAMAN başarısız olur,
// gerçek bir hata değildir (bkz. SKILL.md Gotchas). Smoke testte yok sayılır.
const BEKLENEN_EGRESS_HATASI = /supabase\.co|fonts\.googleapis\.com|fonts\.gstatic\.com/;

async function portAcik() {
  try { const r = await fetch(BASE + '/'); return r.ok; }
  catch { return false; }
}

async function sunucu() {
  if (await portAcik()) return null; // zaten çalışıyor, yeniden kullan
  // NOT: `npm run dev` (düz `vite dev`) bu konteynerde ÇÖKER —
  // varsayılan host `::` (IPv6 wildcard) dinlemeye çalışır ve
  // `EAFNOSUPPORT: address family not supported :::8080` ile ölür.
  // `--host 127.0.0.1` zorunlu.
  const p = spawn('npx', ['vite', 'dev', '--host', HOST, '--port', String(PORT)],
    { cwd: KOK, stdio: 'ignore', detached: true });
  for (let i = 0; i < 40; i++) { if (await portAcik()) return p; await new Promise(r => setTimeout(r, 250)); }
  throw new Error('sunucu 10 sn içinde açılmadı');
}

async function tarayici() {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 0.75 });
  return { b, ctx };
}

const git = (p, yol) => p.goto(BASE + yol, { waitUntil: 'networkidle', timeout: 20000 });

// `loading="lazy"` görseller (src/routes/index.tsx, plates.$slug.tsx) fullPage
// ekran görüntüsünde boş/bej kutu kalır — Chromium'un otomatik fullPage
// kaydırması bunları tetiklemiyor. Sayfayı elle 800px adımlarla kaydırıp
// başa dönmek gerekiyor.
async function kaydirYukle(p) {
  const h = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 800) {
    await p.evaluate((yy) => window.scrollTo(0, yy), y);
    await p.waitForTimeout(150);
  }
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(300);
}

if (KIP === 'shot') {
  const yol = process.argv[3] || '/';
  const srv = await sunucu();
  const { b, ctx } = await tarayici();
  const p = await ctx.newPage();
  await git(p, yol);
  await kaydirYukle(p);
  const ad = `${OUT}/${(yol.replace(/^\//, '') || 'index').replace(/[?&/=]/g, '_')}.png`;
  await p.screenshot({ path: ad, fullPage: true });
  console.log('görüntü:', ad);
  await b.close(); if (srv) process.kill(-srv.pid);
} else {
  // smoke: ana sayfa + plaka detay sayfası, gerçek bir uçtan uca akış
  const srv = await sunucu();
  const { b, ctx } = await tarayici();
  const p = await ctx.newPage();
  const hata = [];
  p.on('pageerror', e => hata.push('pageerror: ' + String(e)));
  p.on('console', m => {
    // "Failed to load resource: net::..." URL taşımıyor — asıl filtre aşağıdaki
    // requestfailed'da (URL'e göre) yapılıyor, burada tekrar sayılmasın.
    if (m.type() === 'error' && !/Failed to load resource: net::/.test(m.text())) {
      hata.push('console: ' + m.text());
    }
  });
  p.on('requestfailed', r => {
    if (!BEKLENEN_EGRESS_HATASI.test(r.url())) {
      hata.push(`requestfailed: ${r.url()} -> ${r.failure()?.errorText}`);
    }
  });

  let kalan = 0;
  const kontrol = (ad, k, ek = '') => { console.log((k ? '✅ ' : '❌ ') + ad + (ek ? ' → ' + ek : '')); if (!k) kalan++; };

  await git(p, '/');
  await kaydirYukle(p);
  kontrol('ana sayfa başlığı', (await p.title()).includes('Beta Art'));
  kontrol('katalog ızgarası doluyor (≥6 plaka kartı)', (await p.locator('a[href^="/plates/"]').count()) >= 6);
  await p.screenshot({ path: `${OUT}/smoke-anasayfa.png`, fullPage: true });

  await git(p, '/plates/first-light');
  await kaydirYukle(p);
  kontrol('plaka detay başlığı', (await p.title()).includes('First Light'));
  kontrol('provenance paneli render ediliyor', (await p.locator('text=Verification record').count()) >= 1);
  const digerPlakaSayisi = await p.locator('a[href^="/plates/"]').count();
  kontrol(
    '"You might also like" — Supabase engelliyken bile soğuk-başlangıç yedeği render ediyor',
    (await p.locator('text=You might also like').count()) >= 1 && digerPlakaSayisi >= 1
  );
  await p.screenshot({ path: `${OUT}/smoke-plaka-first-light.png`, fullPage: true });

  kontrol('beklenmeyen konsol/ağ hatası yok (Supabase/Google Fonts egress engeli hariç)', hata.length === 0, hata[0] || '');

  await b.close(); if (srv) process.kill(-srv.pid);
  console.log(kalan === 0 ? 'SMOKE: PASS' : `SMOKE: FAIL (${kalan})`);
  process.exit(kalan ? 1 : 0);
}
