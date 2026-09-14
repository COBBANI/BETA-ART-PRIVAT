import { LicenseRequestForm } from '../components/LicenseRequestForm';
import { usePageMeta } from '../hooks/usePageMeta';

export function ContactPage() {
  usePageMeta({ title: 'Licensing & Contact | Beta Art', description: 'Request a licence for a verified Beta Art plate or contact the archive about provenance and availability.', path: '/contact' });
  return <main className="page-shell"><p className="eyebrow">Contact</p><h1>Licensing and archive enquiries.</h1><p className="page-lead">For a licence, include the catalogue number, territory, duration and intended use. No rights are granted until final terms are confirmed in writing.</p><LicenseRequestForm /></main>;
}
