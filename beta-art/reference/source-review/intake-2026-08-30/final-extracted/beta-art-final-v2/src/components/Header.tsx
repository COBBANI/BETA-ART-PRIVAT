import { Link } from 'react-router-dom';
import { useI18n } from '../lib/i18n';
import { supabase } from '../lib/supabase';

export function Header() {
  const { locale, setLocale, locales, t } = useI18n();
  const showDevNotice = import.meta.env.DEV || import.meta.env.VITE_SHOW_DEV_NOTICE === 'true';
  return (
    <>
      {showDevNotice && <div className="dev-notice">Development preview — placeholder imagery must never be published as verified work.</div>}
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Beta Art home">
          <span>Beta Art</span>
          <small>Archive of human photography</small>
        </Link>
        <nav aria-label="Primary navigation">
          <a href="/#collection">{t('collection')}</a>
          <a href="/#verification">{t('verification')}</a>
          <a href="/#standard">{t('standard')}</a>
          <a href="/#licensing">{t('licensing')}</a>
          <Link to="/contact">{t('contact')}</Link>
          {supabase && <Link to="/admin">Admin</Link>}
        </nav>
        <label className="language-picker">
          <span className="sr-only">Language</span>
          <select value={locale} onChange={(e) => setLocale(e.target.value as typeof locale)}>
            {locales.map((item) => <option key={item} value={item}>{item.toUpperCase()}</option>)}
          </select>
        </label>
      </header>
    </>
  );
}
