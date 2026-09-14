import { usePageMeta } from '../hooks/usePageMeta';

export function PrivacyPage() {
  usePageMeta({ title: 'Privacy | Beta Art', description: 'Beta Art privacy information.', path: '/privacy' });
  return <main className="page-shell legal"><p className="eyebrow">Legal</p><h1>Privacy</h1><p className="legal-warning"><strong>Launch requirement:</strong> replace this development notice with a lawyer-reviewed privacy policy for the jurisdictions in which Beta Art operates.</p><p>The product architecture is designed to collect only information necessary to operate the archive and respond to licensing enquiries. Production policy should identify the controller, purposes, lawful bases, retention periods, processors, international transfers, security measures, user rights and contact details.</p></main>;
}

export function LicenseTermsPage() {
  usePageMeta({ title: 'Licence Terms | Beta Art', description: 'General information about Beta Art photography licensing. Final rights are granted only by signed terms.', path: '/license-terms' });
  return <main className="page-shell legal"><p className="eyebrow">Legal</p><h1>Licence terms</h1><p className="legal-warning"><strong>Launch requirement:</strong> have final licence terms reviewed by qualified counsel before accepting paid orders.</p><p>Licence scope is not created by viewing a preview, submitting a form or receiving a quote. Rights are granted only through final written terms identifying the plate, permitted use, media, territory, duration, fee and any exclusivity. Copyright remains with the photographer unless explicitly transferred in writing.</p></main>;
}
