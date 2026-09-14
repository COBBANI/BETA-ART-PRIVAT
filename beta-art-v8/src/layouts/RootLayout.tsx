import { Helmet } from '@dr.pogodin/react-helmet';
import { type ReactElement } from 'react';
import { ScrollRestoration } from 'react-router-dom';

import CookieBanner from '@/components/CookieBanner';
import CookieBannerErrorBoundary from '@/components/CookieBannerErrorBoundary';
import Footer from '@/layouts/parts/Footer';
import Header from '@/layouts/parts/Header';
import Website from '@/layouts/Website';

interface RootLayoutProps {
  children: ReactElement;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <Website>
      <Helmet>
        <title>BETA ART — Verified Human Photography for License</title>
        <meta
          name="description"
          content="Real, human-made photographs licensed directly from the photographer. Watermarked previews, clear licenses, full-resolution delivery."
        />
        {/* Space Mono for monospace technical labels */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <ScrollRestoration />
      <Header />
      {children}
      <Footer />
      <CookieBannerErrorBoundary>
        <CookieBanner />
      </CookieBannerErrorBoundary>
    </Website>
  );
}
