import { useEffect, useMemo, useState } from 'react';
import { licenses } from '../data/plates';
import { useI18n } from '../lib/i18n';
import { PlateCard } from '../components/PlateCard';
import { LicenseRequestForm } from '../components/LicenseRequestForm';
import { fetchPublishedPlates } from '../services/archive';
import type { Plate } from '../types';
import { supabase } from '../lib/supabase';
import { usePageMeta } from '../hooks/usePageMeta';

export function HomePage() {
  const { t } = useI18n();
  const [view, setView] = useState<'grid' | 'index'>('grid');
  const [plates, setPlates] = useState<Plate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const developmentMode = !supabase && (import.meta.env.DEV || import.meta.env.VITE_ALLOW_PLACEHOLDERS === 'true');

  useEffect(() => {
    let active = true;
    fetchPublishedPlates().then((rows) => {
      if (active) setPlates(rows);
    }).catch(() => {
      if (active) setError('The archive could not be loaded.');
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, []);

  const schema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': 'https://beta-art.com/#organization', name: 'Beta Art', url: 'https://beta-art.com/', description: 'Verified human photography archive and direct licensing.' },
      { '@type': 'WebSite', '@id': 'https://beta-art.com/#website', url: 'https://beta-art.com/', name: 'Beta Art', publisher: { '@id': 'https://beta-art.com/#organization' }, inLanguage: 'en' },
    ],
  }), []);
  usePageMeta({ title: 'Beta Art — Verified Human Photography & Licensing', description: 'Original human-made photography with archived RAW files, documented provenance, cryptographic checksums and direct licensing from the photographer.', schema });

  const verification = [
    ['01', t('rawArchived'), t('rawArchivedBody')],
    ['02', t('recordTravels'), t('recordTravelsBody')],
    ['03', t('signedByMaker'), t('signedByMakerBody')],
  ];
  const ordering = [
    ['01', t('choosePlate'), t('choosePlateBody')],
    ['02', t('describeUse'), t('describeUseBody')],
    ['03', t('receiveTerms'), t('receiveTermsBody')],
  ];

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Photography licensing / provenance archive</p>
          <h1>{t('humanPhotography')}</h1>
          <p className="hero-lead">{t('heroLead')}</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#collection">{t('viewCollection')}</a>
            <a className="button button-light" href="#standard">{t('readStandard')}</a>
          </div>
          <dl className="hero-facts">
            <div><dt>{t('origin')}</dt><dd>{t('humanCaptured')}</dd></div>
            <div><dt>{t('evidence')}</dt><dd>{t('rawRecord')}</dd></div>
            <div><dt>{t('licence')}</dt><dd>{t('directMaker')}</dd></div>
          </dl>
        </div>
        <figure className="hero-visual">
          <img src="/placeholders/hero.svg" alt="Development placeholder for the future verified Beta Art hero photograph" />
          <figcaption>Development placeholder — never presented as a verified archive plate</figcaption>
        </figure>
      </section>

      <section className="section verification" id="verification">
        <div className="section-heading narrow-heading">
          <p className="eyebrow">{t('verification')}</p>
          <h2>{t('evidenceBeforeClaims')}</h2>
          <p>{t('verificationIntro')}</p>
        </div>
        <div className="three-column">
          {verification.map(([n, title, body]) => <article className="record-card" key={n}><span>{n}</span><h3>{title}</h3><p>{body}</p></article>)}
        </div>
      </section>

      <section className="section standard" id="standard">
        <div className="standard-number">BA / STANDARD 02</div>
        <div className="standard-copy">
          <p className="eyebrow">{t('standard')}</p>
          <h2>{t('standardTitle')}</h2>
          <p>{t('standardBody')}</p>
          <div className="standard-rule"><strong>{t('standardRule')}</strong><span>{t('standardRuleBody')}</span></div>
          <div className="verification-chain" aria-label="Verification chain">
            <span>RAW SHA-256</span><b>→</b><span>Capture record</span><b>→</b><span>Verified maker</span><b>→</b><span>Image SHA-256</span><b>→</b><span>Provenance hash</span><b>→</b><span>Publish</span>
          </div>
        </div>
      </section>

      <section className="section" id="collection">
        <div className="collection-head">
          <div className="section-heading"><p className="eyebrow">{t('collection')}</p><h2>{t('archive')}</h2><p>{developmentMode ? t('archiveDev') : t('archiveLive')}</p></div>
          <div className="view-switch" role="group" aria-label="Collection view"><button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}>{t('grid')}</button><button className={view === 'index' ? 'active' : ''} onClick={() => setView('index')}>{t('index')}</button></div>
        </div>
        {loading ? <div className="empty-state"><p>Loading archive…</p></div> : error ? <div className="empty-state"><h3>Archive unavailable</h3><p>{error}</p></div> : plates.length === 0 ? <div className="empty-state"><h3>{t('noPublic')}</h3><p>{t('noPublicBody')}</p></div> : view === 'grid' ? <div className="plate-grid">{plates.map((plate) => <PlateCard plate={plate} key={plate.id} />)}</div> : <div className="plate-index">{plates.map((plate) => <a href={`/plates/${plate.slug}`} key={plate.id}><span>{plate.catalogue}</span><strong>{plate.title}</strong><span>{plate.verificationStatus}</span><span>from kr {plate.priceNok.toLocaleString('no-NO')}</span></a>)}</div>}
      </section>

      <section className="section ordering">
        <div className="section-heading narrow-heading"><p className="eyebrow">{t('ordering')}</p><h2>{t('orderingTitle')}</h2></div>
        <div className="three-column">{ordering.map(([n, title, body]) => <article className="record-card" key={n}><span>{n}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>

      <section className="section photographer" id="photographer">
        <figure className="photographer-visual"><img src="/placeholders/maker.svg" alt="Development placeholder for the verified Beta Art photographer portrait" /><figcaption>Photographer portrait placeholder — replace after identity verification</figcaption></figure>
        <div className="photographer-copy"><p className="eyebrow">{t('photographer')}</p><h2>{t('photographerTitle')}</h2><p>{t('photographerBody')}</p><dl className="photographer-facts"><div><dt>Identity</dt><dd>Verified in production workflow</dd></div><div><dt>Original</dt><dd>Private RAW archive</dd></div><div><dt>Audit</dt><dd>Immutable verification events</dd></div></dl></div>
      </section>

      <section className="section" id="licensing">
        <div className="section-heading narrow-heading"><p className="eyebrow">{t('licensing')}</p><h2>{t('licensingTitle')}</h2><p>{t('licensingBody')}</p></div>
        <div className="license-grid">{licenses.map((license) => <article className="license-card" key={license.id}><h3>{license.name}</h3><strong>{license.price}</strong><p>{license.summary}</p><h4>Permitted</h4><ul>{license.permitted.map((item) => <li key={item}>+ {item}</li>)}</ul><h4>Not permitted</h4><ul>{license.notPermitted.map((item) => <li key={item}>— {item}</li>)}</ul><a href="#request">Request {license.name.toLowerCase()} terms</a></article>)}</div>
        <div id="request"><LicenseRequestForm /></div>
      </section>

      <section className="section faq" id="faq">
        <div className="section-heading narrow-heading"><p className="eyebrow">FAQ</p><h2>{t('questions')}</h2></div>
        <div className="faq-list">
          <details><summary>What does “verified human photography” mean?</summary><p>A plate can be published only after the RAW source is hashed, the capture record is confirmed, the photographer identity is verified, the delivered image is hashed and the resulting provenance record is stored.</p></details>
          <details><summary>Can missing metadata be inferred?</summary><p>No. Unknown fields remain unknown. Beta Art records evidence; it does not manufacture provenance.</p></details>
          <details><summary>Are RAW files public?</summary><p>No. RAW originals are stored in a private bucket and are available only to authorized archive roles. Public records expose cryptographic evidence, not the original file.</p></details>
          <details><summary>Can a photographer self-verify?</summary><p>No. Database privileges prevent ordinary photographer accounts from setting verification or publication fields. Sensitive verification actions are performed by an admin-only server function.</p></details>
        </div>
      </section>

      <section className="section final-cta"><p className="eyebrow">Beta Art</p><h2>{t('finalCta')}</h2><a className="button button-dark" href="#collection">{t('viewCollection')}</a></section>
    </main>
  );
}
