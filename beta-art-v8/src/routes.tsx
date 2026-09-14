import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import HomePage from './pages/index';
import PhotoPage from './pages/photo';
import PrivacyPage from './pages/privacy';
import LicenseTermsPage from './pages/license-terms';
import QrPage from './pages/qr';
import FaqPage from './pages/faq';
import KontaktPage from './pages/kontakt';
import ProdNotFoundPage from './pages/_404';

const NotFoundPage = ProdNotFoundPage;

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/photo/:id',
    element: <PhotoPage />,
  },
  {
    path: '/personvern',
    element: <PrivacyPage />,
  },
  {
    path: '/lisensbetingelser',
    element: <LicenseTermsPage />,
  },
  {
    path: '/qr',
    element: <QrPage />,
  },
  {
    path: '/faq',
    element: <FaqPage />,
  },
  {
    path: '/kontakt',
    element: <KontaktPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export type Path = '/' | '/photo/:id' | '/personvern' | '/lisensbetingelser' | '/qr' | '/faq' | '/kontakt';
export type Params = Record<string, string | undefined>;
