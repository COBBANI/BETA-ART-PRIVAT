import { cp, lstat, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const output = new URL('dist/', root);
const publicPaths = [
  'index.html', 'work.html', 'blog.html', 'post.html', 'gizlilik.html',
  'kosullar.html', 'kalite.html', 'ornek.html', '404.html',
  'sitemap.xml', 'robots.txt', 'feed.xml', '.well-known/security.txt',
  'demo/cv-action-page.html', 'demo/cv-action-page.js',
  'demo/q-work-audit.html', 'demo/q-work-audit.js', 'assets',
];

// Check required sources before touching the previous build. No network fallback.
for (const path of publicPaths) await lstat(new URL(path, root));
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const path of publicPaths) {
  const target = new URL(path, output);
  await mkdir(new URL('./', target), { recursive: true });
  await cp(new URL(path, root), target, { recursive: true });
}
console.log(`QBLOGG: public files built in ${fileURLToPath(output)}`);
