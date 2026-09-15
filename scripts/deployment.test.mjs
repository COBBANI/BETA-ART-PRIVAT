import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';
import test from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (path) => readFileSync(join(root, path), 'utf8');
const run = (command, args, cwd, env = process.env) => spawnSync(command, args, { cwd, env, encoding: 'utf8' });

test('CLI upload keeps the root build script and excludes development scripts', () => {
  const result = spawnSync('git', ['-c', `core.excludesFile=${join(root, '.vercelignore')}`,
    'check-ignore', '--no-index', '--stdin'], {
    cwd: root, encoding: 'utf8', input: 'scripts/vercel-build.sh\nscripts/check.mjs\n',
  });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout.trim(), 'scripts/check.mjs');
});

test('root build produces clean static output on consecutive builds', (t) => {
  const dir = mkdtempSync(join(tmpdir(), 'qblogg-build-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  for (const path of ['index.html', 'work.html', 'blog.html', 'post.html', 'gizlilik.html',
    'kosullar.html', 'kalite.html', 'ornek.html', '404.html', 'sitemap.xml', 'robots.txt',
    'feed.xml', '.well-known', 'demo', 'assets', 'scripts/vercel-build.sh']) {
    cpSync(join(root, path), join(dir, path), { recursive: true });
  }
  const build = () => run('bash', [join(dir, 'scripts/vercel-build.sh')], tmpdir());
  const first = build();
  assert.equal(first.status, 0, first.stderr);
  writeFileSync(join(dir, 'dist/assets/removed.js'), 'stale');
  const second = build();
  assert.equal(second.status, 0, second.stderr);
  assert.equal(existsSync(join(dir, 'dist/assets/removed.js')), false);
  assert.equal(existsSync(join(dir, 'dist/assets/assets')), false);
  assert.equal(existsSync(join(dir, 'dist/scripts')), false);
  assert.equal(readFileSync(join(dir, 'dist/index.html'), 'utf8'), read('index.html'));
  rmSync(join(dir, 'index.html'));
  const missing = build();
  assert.notEqual(missing.status, 0);
  assert.match(missing.stderr, /source is missing/);
});

for (const app of ['panel', 'uye']) {
  test(`${app} executable scripts satisfy the configured same-origin CSP`, () => {
    const html = read(`${app}/index.html`);
    const config = JSON.parse(read(`${app}/vercel.json`));
    const csp = config.headers.flatMap((entry) => entry.headers)
      .find((header) => header.key === 'Content-Security-Policy').value;
    assert.match(csp, /script-src 'self';/);
    for (const [, attrs, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (/type="application\/ld\+json"/.test(attrs)) continue;
      assert.equal(body.trim(), '', 'executable inline script would be blocked');
      const src = attrs.match(/\bsrc="([^"]+)"/)?.[1];
      assert.ok(src && !src.includes(':') && !src.startsWith('//'));
      assert.ok(existsSync(join(root, app, src)), `Missing script: ${src}`);
    }
    assert.doesNotMatch(html, /\son[a-z]+\s*=/i);
    assert.match(html, app === 'uye' ? /<script type="module" src="app.js"><\/script>/
      : /<script src="app.js"><\/script>/);
  });
}

test('membership build validates public configuration and publishes only client files', (t) => {
  const dir = mkdtempSync(join(tmpdir(), 'qblogg-members-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  cpSync(join(root, 'uye'), dir, { recursive: true });
  const env = { ...process.env, UYE_SUPABASE_URL: '', UYE_SUPABASE_PUBLISHABLE_KEY: '', UYE_SUPABASE_ANON_KEY: '' };
  const build = (values = {}) => run(process.execPath, ['build.mjs'], dir, { ...env, ...values });
  assert.notEqual(build().status, 0);
  const valid = { UYE_SUPABASE_URL: 'https://test-project.supabase.co', UYE_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_testfixture' };
  assert.notEqual(build({ UYE_SUPABASE_URL: valid.UYE_SUPABASE_URL }).status, 0);
  for (const url of ['http://test-project.supabase.co', 'https://evil.example', 'https://test-project.supabase.co.evil.example']) {
    assert.notEqual(build({ ...valid, UYE_SUPABASE_URL: url }).status, 0);
  }
  const jwt = (role) => ['eyJhbGciOiJIUzI1NiJ9', Buffer.from(JSON.stringify({ role, ref: 'test-project' })).toString('base64url'), 'testsignature'].join('.');
  for (const key of ['sb_secret_testfixture', jwt('service_role'), 'invalid-key']) {
    const result = build({ ...valid, UYE_SUPABASE_PUBLISHABLE_KEY: key });
    assert.notEqual(result.status, 0);
    assert.ok(!result.stderr.includes(key), 'key must not appear in errors');
  }
  for (const values of [valid, { UYE_SUPABASE_URL: valid.UYE_SUPABASE_URL, UYE_SUPABASE_ANON_KEY: jwt('anon') }]) {
    const result = build(values);
    assert.equal(result.status, 0, result.stderr);
    const context = { window: {} };
    runInNewContext(readFileSync(join(dir, 'dist/config.js'), 'utf8'), context);
    assert.equal(context.window.UYE_CONFIG.supabaseUrl, valid.UYE_SUPABASE_URL);
    assert.equal(context.window.UYE_CONFIG.supabaseAnonKey, values.UYE_SUPABASE_PUBLISHABLE_KEY || values.UYE_SUPABASE_ANON_KEY);
    for (const file of ['index.html', 'app.js', 'lib/supabase.js']) assert.ok(existsSync(join(dir, 'dist', file)));
    for (const file of ['build.mjs', 'schema.sql', 'schema-platform.sql', '.env.local']) assert.equal(existsSync(join(dir, 'dist', file)), false);
  }
});
