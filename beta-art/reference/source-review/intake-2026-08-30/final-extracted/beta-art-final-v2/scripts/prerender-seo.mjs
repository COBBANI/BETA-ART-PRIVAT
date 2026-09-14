import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve('dist');
const indexPath = path.join(dist, 'index.html');
const siteUrl = (process.env.VITE_SITE_URL || 'https://beta-art.com').replace(/\/$/, '');
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY;

const html = await readFile(indexPath, 'utf8');

const esc = (value = '') => String(value).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);

function replaceMeta(source, { title, description, canonical, robots = 'index,follow', schema }) {
  let out = source
    .replace(/<title>[^<]*<\/title>/i, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/i, `<meta name="description" content="${esc(description)}" />`)
    .replace(/<meta name="robots" content="[^"]*"\s*\/>/i, `<meta name="robots" content="${esc(robots)}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/i, `<meta property="og:title" content="${esc(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/i, `<meta property="og:description" content="${esc(description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/i, `<meta property="og:url" content="${esc(canonical)}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/i, `<meta name="twitter:title" content="${esc(title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/i, `<meta name="twitter:description" content="${esc(description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${esc(canonical)}" />`);

  if (schema) {
    out = out.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, `<script type="application/ld+json">${JSON.stringify(schema)}</script>`);
  }
  return out;
}

async function writeRoute(route, pageHtml) {
  const target = path.join(dist, route.replace(/^\//, ''), 'index.html');
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, pageHtml);
}

const staticRoutes = [
  { route: '/contact', title: 'Licensing & Contact | Beta Art', description: 'Request a licence for a verified Beta Art plate or contact the archive about provenance and availability.' },
  { route: '/privacy', title: 'Privacy | Beta Art', description: 'Beta Art privacy information.' },
  { route: '/license-terms', title: 'Licence Terms | Beta Art', description: 'General information about Beta Art photography licensing. Final rights are granted only by signed terms.' },
  { route: '/admin', title: 'Admin | Beta Art', description: 'Protected Beta Art archive administration.', robots: 'noindex,nofollow' },
];

for (const item of staticRoutes) {
  await writeRoute(item.route, replaceMeta(html, {
    title: item.title,
    description: item.description,
    canonical: `${siteUrl}${item.route}`,
    robots: item.robots || 'index,follow',
  }));
}

let plates = [];
if (supabaseUrl && anonKey) {
  const endpoint = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/public_plate_records?select=slug,catalogue,title,description,capture_date,price_nok&order=catalogue.asc`;
  try {
    const response = await fetch(endpoint, { headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` } });
    if (response.ok) plates = await response.json();
    else console.warn(`SEO pre-render skipped Supabase plates: ${response.status} ${await response.text()}`);
  } catch (error) {
    console.warn('SEO pre-render could not reach Supabase:', error instanceof Error ? error.message : error);
  }
}

for (const plate of plates) {
  const route = `/plates/${plate.slug}`;
  const title = `${plate.title} — ${plate.catalogue} | Beta Art`;
  const description = plate.description || `Verified human-made photography, catalogue ${plate.catalogue}, with documented provenance and direct licensing.`;
  const schema = {
    '@context': 'https://schema.org', '@type': 'ImageObject', name: plate.title,
    description, identifier: plate.catalogue, dateCreated: plate.capture_date || undefined,
    offers: { '@type': 'Offer', priceCurrency: 'NOK', price: plate.price_nok, availability: 'https://schema.org/InStock' },
  };
  await writeRoute(route, replaceMeta(html, { title, description, canonical: `${siteUrl}${route}`, schema }));
}

const sitemapRoutes = ['/', '/contact', '/privacy', '/license-terms', ...plates.map((plate) => `/plates/${plate.slug}`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapRoutes.map((route) => `  <url><loc>${siteUrl}${route === '/' ? '/' : route}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
console.log(`SEO pre-render complete: ${plates.length} published plate page(s).`);
