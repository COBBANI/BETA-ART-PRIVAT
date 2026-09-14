# HXI WEBSITE — DEPLOYMENT & LAUNCH GUIDE

## PHASE 1: PRE-DEPLOYMENT (Setup)

### 1.1 Environment Configuration

```bash
# Create .env.local
NEXT_PUBLIC_SITE_URL=https://hxi.music
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
SPOTIFY_CLIENT_ID=your_spotify_id
SPOTIFY_CLIENT_SECRET=your_spotify_secret
SANITY_PROJECT_ID=your_sanity_id
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
```

### 1.2 Domain Setup

- **Primary Domain**: hxi.music
- **Alt Domains**: www.hxi.music, hximusic.com
- **DNS Provider**: Vercel (automatic)
- **SSL**: Automatic via Let's Encrypt

### 1.3 Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel deploy --prod

# Configure environment variables in Vercel Dashboard
```

**Vercel Settings:**
- Framework: Next.js 14
- Build Command: `next build`
- Start Command: `next start`
- Node.js Version: 18.x LTS
- Regions: US (Primary), EU (Secondary)

---

## PHASE 2: INTEGRATIONS

### 2.1 Spotify Integration

```javascript
// lib/spotify.js
const spotifyAPI = {
  baseUrl: 'https://api.spotify.com/v1',
  
  async getArtistProfile() {
    const response = await fetch(`${this.baseUrl}/artists/ARTIST_ID`, {
      headers: {
        'Authorization': `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`
      }
    });
    return response.json();
  },
  
  async getTopTracks(limit = 10) {
    const response = await fetch(
      `${this.baseUrl}/artists/ARTIST_ID/top-tracks?country=US&limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`
        }
      }
    );
    return response.json();
  }
};
```

### 2.2 Apple Music Integration

- Embed player via Apple Music Web API
- Configure MusicKit credentials
- Setup geo-targeting for different regions

### 2.3 Sanity CMS Setup

```bash
npm install @sanity/client @sanity/image-url

# Initialize Sanity project
sanity init

# Deploy schema
sanity deploy
```

**Sanity Schemas:**
- Releases (Album/EP/Single)
- Tracks (Individual songs)
- Press Kit (Articles, interviews)
- Merchandise
- Team members/Collaborators

### 2.4 Stripe (E-commerce)

```javascript
// lib/stripe.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createCheckoutSession(items) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items,
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/store`,
  });
  return session;
}
```

### 2.5 Email Service (Sendgrid/Resend)

```bash
npm install resend
```

```javascript
// lib/email.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email) {
  await resend.emails.send({
    from: 'noreply@hxi.music',
    to: email,
    subject: 'Welcome to HXI',
    html: '<h1>Welcome</h1><p>Pure sound. No compromise.</p>',
  });
}
```

### 2.6 Analytics (Google Analytics 4 + Clarity)

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>

<!-- Microsoft Clarity -->
<script>
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "CLARITY_ID");
</script>
```

---

## PHASE 3: SEO OPTIMIZATION

### 3.1 Technical SEO

```javascript
// pages/sitemap.xml.js
export async function getServerSideProps({ res }) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://hxi.music</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://hxi.music/music</loc>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
      </url>
      <url>
        <loc>https://hxi.music/about</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
    </urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
  return { props: {} };
}
```

### 3.2 Open Graph & Social Meta Tags

```javascript
// lib/seo.js
export const SEO = {
  title: 'HXI — Nordic Phonk Producer',
  description: 'Pure sound. No compromise. 850K+ monthly listeners. Global reach.',
  url: 'https://hxi.music',
  image: 'https://hxi.music/og-image.jpg',
  twitterHandle: '@hximusic',
  
  tags: {
    'og:title': 'HXI — Nordic Phonk Producer',
    'og:description': 'Pure sound. No compromise. 850K+ monthly listeners.',
    'og:image': 'https://hxi.music/og-image.jpg',
    'og:url': 'https://hxi.music',
    'og:type': 'website',
    'twitter:card': 'summary_large_image',
    'twitter:creator': '@hximusic',
  }
};
```

### 3.3 Schema.org Structured Data

```javascript
// components/StructuredData.js
export function MusicianSchema() {
  return (
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MusicGroup",
        "name": "HXI",
        "url": "https://hxi.music",
        "description": "Nordic phonk producer. 850K+ monthly listeners.",
        "image": "https://hxi.music/og-image.jpg",
        "sameAs": [
          "https://www.spotify.com/artist/HXI",
          "https://www.instagram.com/hximusic",
          "https://www.tiktok.com/@hximusic"
        ],
        "potentialAction": {
          "@type": "ListenAction",
          "target": "https://open.spotify.com/artist/HXI"
        }
      })}
    </script>
  );
}
```

---

## PHASE 4: PERFORMANCE OPTIMIZATION

### 4.1 Core Web Vitals

```javascript
// pages/_app.js
import { useReportWebVitals } from 'next/web-vitals';

export default function App({ Component, pageProps }) {
  useReportWebVitals((metric) => {
    console.log(metric);
    // Send to analytics
  });

  return <Component {...pageProps} />;
}
```

**Targets:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### 4.2 Image Optimization

```javascript
// components/OptimizedImage.js
import Image from 'next/image';

export default function OptimizedImage({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={800}
      quality={80}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
      loading="lazy"
    />
  );
}
```

### 4.3 Bundle Analysis

```bash
npm run analyze
```

---

## PHASE 5: SECURITY

### 5.1 Content Security Policy (CSP)

```javascript
// next.config.js
headers: async () => [
  {
    source: '/:path*',
    headers: [
      {
        key: 'Content-Security-Policy',
        value: "default-src 'self'; script-src 'self' 'unsafe-inline' *.google-analytics.com; style-src 'self' 'unsafe-inline';"
      }
    ]
  }
]
```

### 5.2 GDPR Compliance

- Cookie consent banner
- Privacy policy
- Data processing agreement
- User data export/deletion

### 5.3 DMCA & Copyright Protection

- DMCA agent registration (register@copyright.gov)
- Content ID setup (YouTube, Spotify)
- Digital rights management

---

## PHASE 6: LAUNCH CHECKLIST

### Pre-Launch (1 Week Before)

- [ ] All content finalized and proofread
- [ ] All images optimized (WebP, AVIF formats)
- [ ] All external links tested
- [ ] Forms tested (email capture, contact)
- [ ] Mobile responsiveness verified on 10+ devices
- [ ] Lighthouse audit: 90+ score
- [ ] PageSpeed Insights: 90+ score
- [ ] SEO audit completed
- [ ] Accessibility (WCAG 2.2 AA) verified
- [ ] Security headers verified
- [ ] Database backups configured
- [ ] CDN configured (Vercel Edge)
- [ ] Analytics configured and tested
- [ ] Email service tested
- [ ] Stripe/Checkout tested (test mode)
- [ ] Domain DNS propagated
- [ ] SSL certificate active
- [ ] Monitoring & error tracking enabled (Sentry)

### Launch Day

- [ ] Final full-page screenshots
- [ ] Announce on all social channels
- [ ] Press release sent to media
- [ ] Email announcement sent to list
- [ ] Monitor error logs for 24 hours
- [ ] Track real-time analytics
- [ ] Respond to initial feedback

### Post-Launch (First Week)

- [ ] Monitor performance metrics daily
- [ ] Check search console for indexation
- [ ] Fix any reported bugs
- [ ] Optimize based on user feedback
- [ ] Plan next release/updates

---

## PHASE 7: ONGOING MAINTENANCE

### Weekly
- Monitor uptime (99.99% SLA)
- Check error logs
- Review analytics

### Monthly
- Update security patches
- Review and optimize images
- Backup content/database
- Update dependencies

### Quarterly
- Performance audit
- Security audit
- Accessibility audit
- User feedback review

---

## MONITORING & ALERTS

### Critical Metrics
```javascript
// Uptime monitoring
- Page load time < 3s
- 404 errors
- 5xx server errors
- SSL certificate expiry
- Stripe payment failures
```

### Tools
- Vercel Analytics
- Google Analytics 4
- Sentry (error tracking)
- Uptime Robot
- StatusPage

---

## ROLLBACK PROCEDURE

If critical issues occur:

```bash
# Revert to last stable deployment
vercel rollback

# Or manually deploy previous version
git checkout <previous-commit-hash>
vercel deploy --prod
```

---

## CONTACTS & SUPPORT

- **Hosting Support**: Vercel Support (vercel.com/support)
- **Domain**: Vercel DNS
- **Email**: support@hxi.music
- **Analytics**: Google Analytics support
- **Music API**: Spotify/Apple Music support teams

---

## ADDITIONAL RESOURCES

- Next.js Docs: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs
- Tailwind CSS: https://tailwindcss.com
- Sanity CMS: https://sanity.io
- Web Vitals: https://web.dev/vitals
