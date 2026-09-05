#!/usr/bin/env node
/* Naviar Pårørendepilot sürücüsü
 *
 * Kullanım (depo kökünden):
 *   node .claude/skills/run-naviar-paaroerende-pilot/driver.mjs smoke [çıktı]
 *   node .claude/skills/run-naviar-paaroerende-pilot/driver.mjs shot <hero|pilot> [çıktı]
 */
import { createRequire } from 'node:module';
import { spawn }         from 'node:child_process';
import { mkdirSync }     from 'node:fs';
import { join }          from 'node:path';

const req = createRequire('/opt/node22/lib/node_modules/');
const { chromium } = req('playwright');

const ROOT = new URL('../../..', import.meta.url).pathname; // depo kökü
const SRC  = join(ROOT, 'naviar-paaroerende-pilot');
const PORT = 8001;
const CMD  = process.argv[2] || 'smoke';
const ARG2 = process.argv[3] || 'hero';
const OUT  = (CMD === 'shot' ? process.argv[4] : process.argv[3]) || '/tmp/naviar-ss';
mkdirSync(OUT, { recursive: true });

async function portAcik() {
  try { const r = await fetch(`http://localhost:${PORT}/index.html`); return r.ok; }
  catch { return false; }
}

async function sunucuBekle(srv) {
  for (let i = 0; i < 10; i++) {
    if (await portAcik()) return;
    await new Promise(r => setTimeout(r, 500));
  }
  throw new Error(`Sunucu ${PORT} portunda açılmadı`);
}

let srv;
async function baslat() {
  if (await portAcik()) return null;
  srv = spawn('python3', ['-m', 'http.server', String(PORT)], { cwd: SRC, stdio: 'ignore' });
  await sunucuBekle();
  return srv;
}

async function kapat(s) { if (s) s.kill(); }

async function ss(page, selector, filename) {
  if (selector) {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
  }
  const path = join(OUT, `${filename}.png`);
  await page.screenshot({ path, fullPage: false });
  console.log('görüntü:', path);
}

async function main() {
  const sunucu = await baslat();
  const br = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium',
    args: ['--no-sandbox', '--disable-gpu'],
  });
  try {
    const pg = await br.newPage();
    await pg.setViewportSize({ width: 1280, height: 900 });
    await pg.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'domcontentloaded' });
    await pg.waitForTimeout(600);

    if (CMD === 'smoke') {
      await ss(pg, null, 'hero');
      await ss(pg, '#how', 'how');
      // kart seçimi
      await pg.locator('.need-card').first().click();
      await pg.screenshot({ path: join(OUT, 'need-selected.png'), fullPage: false });
      console.log('görüntü:', join(OUT, 'need-selected.png'));
      await ss(pg, '#pilot', 'pilot-form');
      // form gönder
      await pg.fill('#name', 'Test Bruker');
      await pg.fill('#email', 'test@naviar.no');
      await pg.locator('#pilot-form button[type=submit]').click();
      const ok = await pg.locator('#form-success').isVisible();
      console.log('form-success görünür:', ok);
      await pg.screenshot({ path: join(OUT, 'form-sent.png'), fullPage: false });
      console.log('görüntü:', join(OUT, 'form-sent.png'));
    } else if (CMD === 'shot') {
      const hedefler = { hero: null, how: '#how', pilot: '#pilot' };
      const selector = hedefler[ARG2] ?? null;
      await ss(pg, selector, ARG2);
    }
  } finally {
    await br.close();
    await kapat(sunucu);
  }
}

main().catch(e => { console.error(e.message); process.exit(1); });
