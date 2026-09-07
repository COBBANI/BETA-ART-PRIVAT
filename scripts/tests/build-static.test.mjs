import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdtemp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

test('static build uses its own sources, removes stale files and excludes private inputs', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'qblogg-build-'));
  try {
    for (const name of ['scripts', 'assets', 'demo', '.well-known', 'engine', 'dist'])
      await mkdir(join(dir, name));
    await cp(new URL('../build-static.mjs', import.meta.url), join(dir, 'scripts/build-static.mjs'));
    const files = ['index.html', 'work.html', 'blog.html', 'post.html', 'gizlilik.html',
      'kosullar.html', 'kalite.html', 'ornek.html', '404.html', 'sitemap.xml',
      'robots.txt', 'feed.xml', '.well-known/security.txt', 'demo/cv-action-page.html',
      'demo/cv-action-page.js', 'demo/q-work-audit.html', 'demo/q-work-audit.js', 'assets/example.css'];
    for (const name of [...files, '.env', 'engine/private.db', 'dist/stale.txt'])
      await writeFile(join(dir, name), name);
    const run = () => execFileSync(process.execPath, [join(dir, 'scripts/build-static.mjs')], { cwd: tmpdir(), stdio: "pipe" });
    run(); run();
    assert.equal(await readFile(join(dir, 'dist/index.html'), 'utf8'), 'index.html');
    const output = await readdir(join(dir, 'dist'), { recursive: true });
    for (const name of files) assert.ok(output.includes(name), name);
    for (const name of ['.env', 'engine', 'scripts', 'stale.txt', 'assets/assets'])
      assert.ok(!output.includes(name), name);
    await rm(join(dir, 'index.html'));
    assert.throws(run);
    assert.equal(await readFile(join(dir, 'dist/index.html'), 'utf8'), 'index.html');
  } finally { await rm(dir, { recursive: true, force: true }); }
});
