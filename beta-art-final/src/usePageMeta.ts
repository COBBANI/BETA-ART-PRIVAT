import { useEffect } from 'react';

const siteUrl = String(import.meta.env.VITE_SITE_URL || 'https://beta-art.com').replace(/\/$/, '');
const defaultImage = `${siteUrl}/og-beta-art.png`;

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

export function usePageMeta({ title, description, path = '/', image = defaultImage, schema }: {
  title: string; description: string; path?: string; image?: string; schema?: Record<string, unknown> | null;
}) {
  useEffect(() => {
    const canonical = `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
    setMeta('meta[property="og:image"]', 'property', 'og:image', image);
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image);
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = canonical;
    const previous = document.head.querySelector<HTMLScriptElement>('script[data-beta-art-schema]');
    previous?.remove();
    if (schema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.betaArtSchema = 'true';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [description, image, path, schema, title]);
}
