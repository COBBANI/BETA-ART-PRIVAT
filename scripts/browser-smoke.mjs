import assert from 'node:assert/strict';
import { readFile, mkdtemp, rm, cp } from 'node:fs/promises';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { join, extname, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { chromium } from 'playwright';

// Local browser checks with mocked providers. No emails, GitHub writes, or
// live Supabase requests are sent; deployed redirects and RLS need live tests.
const root = fileURLToPath(new URL('../', import.meta.url));
const fixture = await mkdtemp(join(tmpdir(), 'membership-browser-'));
let browser;
let server;
try {
  await cp(join(root, 'uye'), fixture, { recursive: true });
  const build = spawnSync(process.execPath, ['build.mjs'], {
    cwd: fixture, encoding: 'utf8', env: { ...process.env,
      UYE_SUPABASE_URL: 'https://browser-test.supabase.co',
      UYE_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_browserfixture' },
  });
  assert.equal(build.status, 0, build.stderr);
  server = createServer(async (req, res) => {
    try {
      const path = new URL(req.url, 'http://localhost').pathname;
      const [, app, ...parts] = path.split('/');
      if (!['panel', 'uye', 'master'].includes(app)) { res.writeHead(404); res.end(); return; }
      const appRoot = app === 'uye' ? join(fixture, 'dist') : join(root, app);
      const file = resolve(appRoot, parts.join('/') || 'index.html');
      if (!file.startsWith(appRoot + '/')) { res.writeHead(403); res.end(); return; }
      const config = JSON.parse(await readFile(join(root, app, 'vercel.json'), 'utf8'));
      for (const entry of config.headers) for (const header of entry.headers) res.setHeader(header.key, header.value);
      res.setHeader('content-type', ({ '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json' })[extname(file)] || 'text/plain');
      res.end(await readFile(file));
    } catch { res.writeHead(404); res.end(); }
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const origin = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({ headless: true });

  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (/Content Security Policy|Refused to/.test(message.text())) errors.push(message.text()); });
  await page.route('https://api.github.com/**', async (route) => {
    if (route.request().method() === 'OPTIONS') {
      await route.fulfill({ status: 204, headers: {
        'access-control-allow-origin': origin,
        'access-control-allow-methods': 'GET',
        'access-control-allow-headers': 'authorization, accept',
      } });
      return;
    }
    assert.equal(route.request().method(), 'GET', 'browser check must never write to GitHub');
    const result = route.request().url().endsWith('/user')
      ? { login: 'browser-fixture' }
      : { sha: 'fixture', content: Buffer.from(await readFile(join(root, 'assets/js/config.js'), 'utf8')).toString('base64') };
    await route.fulfill({ json: result, headers: { 'access-control-allow-origin': origin } });
  });
  await page.goto(`${origin}/panel/`);
  await page.locator('#pat').fill('browser-fixture-token');
  await page.locator('#girisBtn').click();
  await page.locator('#ayarlarForm').waitFor({ state: 'visible' });
  await page.locator('#tabYazi').click();
  assert.equal(await page.locator('#yaziForm').isVisible(), true);
  await page.locator('#cikis').click();
  await page.locator('#girisForm').waitFor({ state: 'visible' });
  assert.equal(await page.evaluate(() => sessionStorage.getItem('panel_pat')), null);

  await page.route('**/uye/lib/supabase.js', (route) => route.fulfill({
    contentType: 'text/javascript', body: `window.supabase = { createClient() { return {
      auth: {
        async getSession() { return { data: { session: null } }; },
        onAuthStateChange() {},
        async signInWithOtp(input) { window.lastOtpRequest = input; return { error: null }; }
      }
    }; } };`,
  }));
  await page.goto(`${origin}/uye/`);
  await page.locator('#girisForm').waitFor({ state: 'visible' });
  await page.locator('#eposta').fill('reader@example.com');
  await page.locator('#gonder').click();
  await page.waitForFunction(() => document.getElementById('girisMsg').textContent.includes('Bağlantı gönderildi'));
  const otp = await page.evaluate(() => window.lastOtpRequest);
  assert.equal(otp.email, 'reader@example.com');
  assert.equal(otp.options.emailRedirectTo, `${origin}/uye/`);
  assert.equal(await page.locator('#gonder').isDisabled(), false);

  await page.goto(`${origin}/master/`);
  await page.locator('.card').first().waitFor();
  const inventory = JSON.parse(await readFile(join(root, 'master/projects.json'), 'utf8'));
  assert.equal(await page.locator('.card').count(), inventory.projects.length);
  assert.match(await page.locator('#sync-status').textContent(), /erişim doğrulanamadı/);
  assert.deepEqual(errors, []);
  console.log('PASS: panel login/tabs/logout, built membership form, and master inventory run in Chromium under configured CSP; providers mocked.');
} finally {
  await browser?.close();
  if (server) { server.closeAllConnections(); await new Promise((done) => server.close(done)); }
  await rm(fixture, { recursive: true, force: true });
}
