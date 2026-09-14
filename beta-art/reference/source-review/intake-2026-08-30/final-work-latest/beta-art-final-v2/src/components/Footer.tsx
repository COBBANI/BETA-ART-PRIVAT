import { Link } from 'react-router-dom';
import { useI18n } from '../lib/i18n';

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer">
      <div>
        <strong>Beta Art</strong>
        <p>Verified human photography, documented provenance and direct licensing.</p>
      </div>
      <div className="footer-links">
        <a href="/#collection">{t('collection')}</a>
        <a href="/#verification">{t('verification')}</a>
        <a href="/#licensing">{t('licensing')}</a>
        <Link to="/privacy">Privacy</Link>
        <Link to="/license-terms">Licence terms</Link>
      </div>
      <p className="footer-note">© {new Date().getFullYear()} Beta Art. Rights remain with the photographer unless explicitly transferred in writing.</p>
    </footer>
  );
}
