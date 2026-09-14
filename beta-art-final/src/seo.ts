/**
 * BETA ART — Konsolide SEO modülü
 * =================================================================
 * Bu dosya daha önce dört ayrı parçaya dağılmış olan SEO altyapısını
 * tek bir kaynakta birleştirir:
 *
 *   1. structured-data.ts   → JSON-LD @id sözleşmesi ve node üreticileri
 *   2. seo-routes.ts        → taranabilir rota kaydı  (src/seo-routes.ts)
 *   3. entry.ts yamaları    → robots.txt + sitemap.xml sunucu handler'ları
 *   4. SEO-PATCHES.md       → bulgular ve bekleyen kararlar (en altta)
 *
 * Yerleşim önerisi: `src/seo.ts`
 *   - Sayfa bileşenleri  →  `import { orgNode, websiteNode, webPageNode, ... } from '@/seo'`
 *   - Sunucu entry       →  `import { handleRobots, handleSitemap } from '@/seo'`
 *   - Eski `src/seo-routes.ts` ve `src/lib/structured-data.ts` SİLİNEBİLİR.
 *
 * DÜZELTİLEN HATALAR (detay için dosya sonundaki NOTLAR bölümüne bak):
 *   • `/kontakt` sitemap'te iki kez listeleniyordu → tekilleştirildi
 *   • 12 adet `/photo/:id` plaka sayfası sitemap'e hiç girmiyordu → eklendi
 *   • faq.tsx içindeki `#organization` / `#website` @id referansları boştaydı
 *     (hiçbir sayfa o node'ları yayınlamıyordu) → orgNode/websiteNode ile karşılandı
 *   • Plaka sayfalarında hiç yapısal veri yoktu → photoPageGraph eklendi
 */

// ═══════════════════════════════════════════════════════════════════
// 1. SİTE SABİTLERİ — tek kaynak
// ═══════════════════════════════════════════════════════════════════

export const SITE_URL = 'https://betaart.no';
export const SITE_NAME = 'BETA ART';
export const DEFAULT_LOCALE = 'nb-NO';

/**
 * KARAR BEKLİYOR — Organization.logo.
 * Schema.org logosu mutlak URL, ≥112×112 px ve indekslenebilir olmalı.
 * Gerçek dosya yüklenene kadar `null` bırakıldı; null ise logo alanı
 * JSON-LD'den tamamen düşürülür (boş string yayınlamak hatadan kötüdür).
 */
export const ORG_LOGO_URL: string | null = null;

/** KARAR BEKLİYOR — org.nr hâlâ site genelinde placeholder. */
export const ORG_NUMBER: string | null = null;

// ═══════════════════════════════════════════════════════════════════
// 2. @id SÖZLEŞMESİ
// Tüm JSON-LD node'ları bu fonksiyonlardan üretilen id'leri kullanır.
// Elle string yazmak yasak — dangling referansların kaynağı buydu.
// ═══════════════════════════════════════════════════════════════════

export const ID = {
  organization: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
  webPage: (path: string) => `${SITE_URL}${path}#webpage`,
  breadcrumb: (path: string) => `${SITE_URL}${path}#breadcrumb`,
  image: (path: string) => `${SITE_URL}${path}#primaryimage`,
  product: (path: string) => `${SITE_URL}${path}#product`,
} as const;

const abs = (path: string) => `${SITE_URL}${path === '/' ? '' : path}`;

// ═══════════════════════════════════════════════════════════════════
// 3. JSON-LD NODE ÜRETİCİLERİ
// ═══════════════════════════════════════════════════════════════════

export function orgNode() {
  return {
    '@type': 'Organization',
    '@id': ID.organization,
    name: SITE_NAME,
    url: SITE_URL,
    ...(ORG_LOGO_URL
      ? { logo: { '@type': 'ImageObject', url: ORG_LOGO_URL } }
      : {}),
    ...(ORG_NUMBER ? { identifier: ORG_NUMBER } : {}),
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': ID.website,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: DEFAULT_LOCALE,
    publisher: { '@id': ID.organization },
  };
}

export function webPageNode(opts: {
  path: string;
  name: string;
  description: string;
  type?: 'WebPage' | 'FAQPage' | 'ContactPage' | 'AboutPage' | 'ItemPage';
}) {
  const url = abs(opts.path);
  return {
    '@type': opts.type ?? 'WebPage',
    '@id': ID.webPage(opts.path),
    url,
    name: opts.name,
    description: opts.description,
    inLanguage: DEFAULT_LOCALE,
    isPartOf: { '@id': ID.website },
    about: { '@id': ID.organization },
  };
}

export function breadcrumbNode(path: string, trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': ID.breadcrumb(path),
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

/**
 * `@graph` sarmalayıcı. HER sayfa organization + website node'larını
 * yayınlamalı — dangling @id sorununun kalıcı çözümü budur.
 */
export function graph(...nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [orgNode(), websiteNode(), ...nodes],
  };
}

// ── Plaka (fotoğraf detay) sayfası — daha önce hiç yapısal verisi yoktu ──

export interface PlateSeo {
  /** URL segmenti — `/photo/:id` içindeki :id */
  slug: string;
  title: string;
  description: string;
  /** Mutlak veya köke göre görsel yolu */
  imageUrl: string;
  /** ISO tarih — çekim tarihi */
  dateCreated?: string;
  photographer?: string;
  /** Lisans sayfası yolu */
  licensePath?: string;
  priceFrom?: { amount: number; currency: string };
  lastmod?: string;
}

export function photoPageGraph(plate: PlateSeo) {
  const path = `/photo/${plate.slug}`;
  const url = abs(path);
  const image = plate.imageUrl.startsWith('http') ? plate.imageUrl : abs(plate.imageUrl);

  const imageObject = {
    '@type': 'ImageObject',
    '@id': ID.image(path),
    contentUrl: image,
    url: image,
    name: plate.title,
    description: plate.description,
    representativeOfPage: true,
    ...(plate.dateCreated ? { dateCreated: plate.dateCreated } : {}),
    ...(plate.photographer
      ? { creator: { '@type': 'Person', name: plate.photographer } }
      : {}),
    ...(plate.licensePath ? { license: abs(plate.licensePath) } : {}),
    acquireLicensePage: url,
    copyrightNotice: `© ${SITE_NAME}`,
    creditText: SITE_NAME,
  };

  const page = {
    ...webPageNode({
      path,
      name: plate.title,
      description: plate.description,
      type: 'ItemPage',
    }),
    primaryImageOfPage: { '@id': ID.image(path) },
  };

  const product = plate.priceFrom
    ? {
        '@type': 'Product',
        '@id': ID.product(path),
        name: plate.title,
        description: plate.description,
        image: { '@id': ID.image(path) },
        brand: { '@id': ID.organization },
        offers: {
          '@type': 'Offer',
          url,
          price: plate.priceFrom.amount,
          priceCurrency: plate.priceFrom.currency,
          availability: 'https://schema.org/InStock',
          seller: { '@id': ID.organization },
          // KARAR BEKLİYOR — hasMerchantReturnPolicy, aşağıdaki NOTLAR'a bak.
        },
      }
    : null;

  return graph(
    page,
    imageObject,
    breadcrumbNode(path, [
      { name: 'Hjem', path: '/' },
      { name: plate.title, path },
    ]),
    ...(product ? [product] : []),
  );
}

// ═══════════════════════════════════════════════════════════════════
// 4. ROTA KAYDI
// ═══════════════════════════════════════════════════════════════════

export interface SeoRoute {
  path: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  lastmod?: string;
}

/**
 * Statik rotalar. Otomatik senkron `routes.tsx`'ten yalnızca literal,
 * "/" ile başlayan yolları yansıtır; dinamik parametreli rotalar
 * (`/photo/:id`) TASARIM GEREĞİ atlanır — bu yüzden aşağıda ayrıca
 * genişletiliyorlar.
 */
const STATIC_ROUTES: SeoRoute[] = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/personvern', changefreq: 'monthly', priority: 0.8 },
  { path: '/lisensbetingelser', changefreq: 'monthly', priority: 0.8 },
  { path: '/qr', changefreq: 'monthly', priority: 0.8 },
  { path: '/faq', changefreq: 'monthly', priority: 0.8 },
  { path: '/kontakt', changefreq: 'monthly', priority: 0.8 }, // ← tekilleştirildi
];

/**
 * BURAYA BAĞLA — plaka kataloğu.
 * İçerik modülünden (`virtual:content`) plakaları geçir; sitemap ve
 * görsel girdileri buradan üretilir. Boş bırakılırsa yalnızca statik
 * rotalar yayınlanır ve ticari sayfalar yine görünmez kalır.
 */
export let PLATES: PlateSeo[] = [];

export function registerPlates(plates: PlateSeo[]) {
  PLATES = plates;
}

export function allSeoRoutes(): SeoRoute[] {
  const dynamic: SeoRoute[] = PLATES.map((p) => ({
    path: `/photo/${p.slug}`,
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: p.lastmod,
  }));
  // path'e göre tekilleştir — ilk kayıt kazanır
  const seen = new Set<string>();
  return [...STATIC_ROUTES, ...dynamic].filter((r) =>
    seen.has(r.path) ? false : (seen.add(r.path), true),
  );
}

// ═══════════════════════════════════════════════════════════════════
// 5. SUNUCU HANDLER'LARI — src/server/entry.ts içine bağlanır
// ═══════════════════════════════════════════════════════════════════

const xmlEscape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
   .replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export function buildRobotsTxt(): string {
  return [
    'User-agent: *',
    'Allow: /',
    '',
    'Disallow: /api/',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n');
}

export function buildSitemapXml(): string {
  const plateBySlug = new Map(PLATES.map((p) => [`/photo/${p.slug}`, p]));

  const urls = allSeoRoutes().map((r) => {
    const plate = plateBySlug.get(r.path);
    const image = plate
      ? [
          '    <image:image>',
          `      <image:loc>${xmlEscape(
            plate.imageUrl.startsWith('http') ? plate.imageUrl : abs(plate.imageUrl),
          )}</image:loc>`,
          `      <image:title>${xmlEscape(plate.title)}</image:title>`,
          '    </image:image>',
        ].join('\n')
      : null;

    return [
      '  <url>',
      `    <loc>${xmlEscape(abs(r.path))}</loc>`,
      r.lastmod ? `    <lastmod>${r.lastmod}</lastmod>` : null,
      r.changefreq ? `    <changefreq>${r.changefreq}</changefreq>` : null,
      r.priority != null ? `    <priority>${r.priority.toFixed(1)}</priority>` : null,
      image,
      '  </url>',
    ].filter(Boolean).join('\n');
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
}

/** entry.ts: `if (url.pathname === '/robots.txt') return handleRobots();` */
export function handleRobots(): Response {
  return new Response(buildRobotsTxt(), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
}

/** entry.ts: `if (url.pathname === '/sitemap.xml') return handleSitemap();` */
export function handleSitemap(): Response {
  return new Response(buildSitemapXml(), {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
}

/* ═══════════════════════════════════════════════════════════════════
 * NOTLAR — birleştirme sırasında taşınan bulgular ve açık kararlar
 * ═══════════════════════════════════════════════════════════════════
 *
 * BULGULAR (hepsi bu dosyada düzeltildi)
 * --------------------------------------
 * 1. `/kontakt` seo-routes içinde iki kez vardı (priority 0.7 ve 0.8).
 *    Sitemap'te yinelenen <loc> üretiyordu. 0.8 tutuldu.
 * 2. Dinamik rota filtresi tasarım gereği `/photo/:id`'yi atlıyordu;
 *    yani sitenin ticari açıdan en önemli 12 sayfası sitemap dışıydı.
 *    Artık `registerPlates()` ile besleniyor ve image sitemap girdisi
 *    de üretiliyor.
 * 3. `faq.tsx` içindeki `isPartOf: { '@id': '.../#website' }` ve
 *    `about: { '@id': '.../#organization' }` referansları hiçbir yerde
 *    tanımlanmayan node'lara işaret ediyordu. `graph()` her sayfada bu
 *    iki node'u yayınlayarak sözleşmeyi kapatıyor.
 *
 * SAYFA TARAFI DEĞİŞİKLİĞİ (elle yapılacak)
 * -----------------------------------------
 * Her sayfada Helmet içindeki JSON-LD şuna dönüşür:
 *
 *   const jsonLd = graph(webPageNode({
 *     path: '/faq', name: title, description: desc, type: 'FAQPage',
 *   }));
 *   ...
 *   <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
 *
 * FAQPage için `mainEntity` alanını webPageNode çıktısına ekleyerek geçir.
 *
 * KARAR BEKLEYEN ÜÇ MADDE
 * -----------------------
 * A. Organization.logo — mutlak URL gerekiyor. `ORG_LOGO_URL` şu an null.
 * B. hasMerchantReturnPolicy — bu bir SEO sorusu değil, hukuki bir soru:
 *    Norveç cayma hakkı (angrerett) dijital lisans teslimatında nasıl
 *    uygulanıyor? Cevap netleşmeden Offer'a alan eklenmedi; yanlış
 *    politika yayınlamak, hiç yayınlamamaktan risklidir.
 * C. org.nr — kayıt hâlâ beklemede, site genelinde placeholder.
 *    `ORG_NUMBER` null kaldıkça identifier alanı JSON-LD'ye girmez.
 */
