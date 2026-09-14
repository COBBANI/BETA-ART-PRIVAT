import { Helmet } from '@dr.pogodin/react-helmet';
import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { kontakt } from 'virtual:content';

// ─── Design tokens (presentational only) ─────────────────────────────────────
const SERIF = "'Fraunces', Georgia, serif";
const MONO  = "'JetBrains Mono', 'Space Mono', monospace";
const SANS  = "'Inter', sans-serif";
const BONE  = '#FBFAF7';
const INK   = '#0F0F0F';
const SEAL  = '#8B1A1A';
const GREY1 = '#6B6560';
const GREY2 = '#C8C3BB';
const RULE  = '#E2DDD6';
const INK2  = '#1F1D1B';

// ─── Motion ──────────────────────────────────────────────────────────────────
const rise = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] as [number,number,number,number] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function KontaktPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus('sending');
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/contact/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    data.get('name'),
          email:   data.get('email'),
          subject: data.get('subject'),
          message: data.get('message'),
        }),
      });
      if (!res.ok) throw new Error('Server error');
      setFormStatus('sent');
      formRef.current?.reset();
    } catch {
      setFormStatus('error');
    }
  }

  const site  = 'https://betaart.no';
  const url   = `${site}/kontakt`;
  const title = 'Kontakt — BETA ART';
  const desc  = 'Kontakt BETA ART for lisensforespørsler, tilpassede oppdrag eller generelle spørsmål. Impressum og selskapsinformasjon.';
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'ContactPage',
    '@id': `${url}#webpage`, name: title, url,
    isPartOf: { '@id': `${site}/#website` },
    about: { '@id': `${site}/#organization` },
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main>
        {/* ── Page header ─────────────────────────────────────────────────── */}
        <section style={{ backgroundColor: BONE, borderBottom: `1px solid ${RULE}`, padding: '80px 0 56px' }}>
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
              <motion.div variants={rise} style={{ marginBottom: '20px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontFamily: MONO, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: GREY1 }}>
                  <span style={{ width: '36px', height: '1px', backgroundColor: INK, flexShrink: 0 }} />
                  {kontakt.eyebrow}
                </span>
              </motion.div>
              <motion.h1 variants={rise} style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: INK, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '20px' }}>
                {kontakt.headline}
              </motion.h1>
              <motion.p variants={rise} style={{ fontFamily: SANS, fontSize: '15px', color: GREY1, lineHeight: 1.7, maxWidth: '480px' }}>
                {kontakt.intro}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── Two-column body ──────────────────────────────────────────────── */}
        <section style={{ backgroundColor: BONE, padding: '72px 0 96px' }}>
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid gap-16" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>

              {/* ── Left: contact form ──────────────────────────────────── */}
              <div>
                <p style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: GREY2, marginBottom: '28px' }}>
                  {kontakt.formLabel}
                </p>

                {formStatus === 'sent' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px', padding: '32px', border: `1px solid ${RULE}` }}>
                    <CheckCircle size={20} color={GREY1} />
                    <p style={{ fontFamily: SERIF, fontSize: '1.1rem', color: INK, fontWeight: 400 }}>
                      {kontakt.statusSent}
                    </p>
                    <p style={{ fontFamily: SANS, fontSize: '14px', color: GREY1, lineHeight: 1.7 }}>
                      {kontakt.statusSentSub}
                    </p>
                    <button onClick={() => setFormStatus('idle')} style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: GREY2, background: 'none', border: 'none', cursor: 'pointer', marginTop: '8px' }}>
                      {kontakt.statusSentReset}
                    </button>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label htmlFor="name" style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: GREY1 }}>
                          {kontakt.fieldName}<span style={{ color: SEAL, marginLeft: '4px' }}>*</span>
                        </label>
                        <input id="name" name="name" type="text" required autoComplete="name"
                          style={{ fontFamily: SANS, fontSize: '14px', color: INK, background: BONE, border: `1px solid ${RULE}`, padding: '12px 14px', outline: 'none', width: '100%', transition: 'border-color 0.2s' }}
                          onFocus={e => { e.currentTarget.style.borderColor = INK; }}
                          onBlur={e => { e.currentTarget.style.borderColor = RULE; }}
                        />
                      </div>
                      {/* Email */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label htmlFor="email" style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: GREY1 }}>
                          {kontakt.fieldEmail}<span style={{ color: SEAL, marginLeft: '4px' }}>*</span>
                        </label>
                        <input id="email" name="email" type="email" required autoComplete="email"
                          style={{ fontFamily: SANS, fontSize: '14px', color: INK, background: BONE, border: `1px solid ${RULE}`, padding: '12px 14px', outline: 'none', width: '100%', transition: 'border-color 0.2s' }}
                          onFocus={e => { e.currentTarget.style.borderColor = INK; }}
                          onBlur={e => { e.currentTarget.style.borderColor = RULE; }}
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label htmlFor="subject" style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: GREY1 }}>
                        {kontakt.fieldSubject}
                      </label>
                      <input id="subject" name="subject" type="text"
                        placeholder={kontakt.fieldSubjectPlaceholder}
                        style={{ fontFamily: SANS, fontSize: '14px', color: INK, background: BONE, border: `1px solid ${RULE}`, padding: '12px 14px', outline: 'none', width: '100%', transition: 'border-color 0.2s' }}
                        onFocus={e => { e.currentTarget.style.borderColor = INK; }}
                        onBlur={e => { e.currentTarget.style.borderColor = RULE; }}
                      />
                    </div>

                    {/* Message */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label htmlFor="message" style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: GREY1 }}>
                        {kontakt.fieldMessage}<span style={{ color: SEAL, marginLeft: '4px' }}>*</span>
                      </label>
                      <textarea id="message" name="message" required rows={6}
                        style={{ fontFamily: SANS, fontSize: '14px', color: INK, background: BONE, border: `1px solid ${RULE}`, padding: '12px 14px', outline: 'none', width: '100%', transition: 'border-color 0.2s', resize: 'vertical', minHeight: '140px' }}
                        onFocus={e => { e.currentTarget.style.borderColor = INK; }}
                        onBlur={e => { e.currentTarget.style.borderColor = RULE; }}
                      />
                    </div>

                    {formStatus === 'error' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertCircle size={14} color={SEAL} />
                        <p style={{ fontFamily: SANS, fontSize: '13px', color: SEAL }}>
                          {kontakt.statusError}
                        </p>
                      </div>
                    )}

                    <button type="submit" disabled={formStatus === 'sending'}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: SANS, fontSize: '13px', letterSpacing: '0.02em', color: BONE, background: formStatus === 'sending' ? GREY1 : INK, border: 'none', padding: '12px 24px', cursor: formStatus === 'sending' ? 'not-allowed' : 'pointer', alignSelf: 'flex-start', transition: 'background 0.2s' }}
                    >
                      <Send size={13} />
                      {formStatus === 'sending' ? kontakt.submittingLabel : kontakt.submitLabel}
                    </button>
                  </form>
                )}

                <p style={{ fontFamily: MONO, fontSize: '10px', color: GREY2, letterSpacing: '0.1em', marginTop: '20px' }}>
                  <span>{kontakt.directEmail}</span>
                  {' '}
                  <a href={`mailto:${kontakt.email}`} style={{ color: GREY1, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                    {kontakt.email}
                  </a>
                </p>
              </div>

              {/* ── Right: impressum + angrerett + legal links ──────────── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>

                {/* Impressum table */}
                <div>
                  <p style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: GREY2, marginBottom: '4px' }}>
                    {kontakt.impressumLabel}
                  </p>
                  <div style={{ borderTop: `1px solid ${RULE}` }}>
                    {kontakt.impressumRows.map((row) => (
                      <div key={row.id} style={{ display: 'flex', gap: '24px', padding: '14px 0', borderBottom: `1px solid ${RULE}` }}>
                        <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: GREY2, minWidth: '140px', paddingTop: '2px', flexShrink: 0 }}>
                          {row.label}
                        </span>
                        <span style={{ fontFamily: SANS, fontSize: '14px', color: INK2, lineHeight: 1.6 }}>
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Angrerett notice */}
                <div style={{ padding: '20px 24px', border: `1px solid ${RULE}`, backgroundColor: '#F5F3EE' }}>
                  <p style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: SEAL, marginBottom: '10px' }}>
                    {kontakt.angrerettLabel}
                  </p>
                  <p style={{ fontFamily: SANS, fontSize: '13px', color: GREY1, lineHeight: 1.75 }}>
                    {kontakt.angrerettBody}
                  </p>
                  <p style={{ fontFamily: SANS, fontSize: '13px', color: GREY1, lineHeight: 1.75, marginTop: '10px' }}>
                    {kontakt.angrerettBody2}
                  </p>
                </div>

                {/* Legal links — hardcoded routes, labels from content */}
                <div>
                  <p style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: GREY2, marginBottom: '16px' }}>
                    {kontakt.legalLinksLabel}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Link to="/lisensbetingelser"
                      style={{ fontFamily: SANS, fontSize: '14px', color: INK2, textDecoration: 'none', padding: '12px 0', borderBottom: `1px solid ${RULE}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'color 0.2s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = SEAL; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = INK2; }}
                    >
                      <span>{kontakt.legalLinks[0].label}</span>
                      <span style={{ fontFamily: MONO, fontSize: '10px', color: GREY2 }}>→</span>
                    </Link>
                    <Link to="/personvern"
                      style={{ fontFamily: SANS, fontSize: '14px', color: INK2, textDecoration: 'none', padding: '12px 0', borderBottom: `1px solid ${RULE}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'color 0.2s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = SEAL; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = INK2; }}
                    >
                      <span>{kontakt.legalLinks[1].label}</span>
                      <span style={{ fontFamily: MONO, fontSize: '10px', color: GREY2 }}>→</span>
                    </Link>
                    <Link to="/faq"
                      style={{ fontFamily: SANS, fontSize: '14px', color: INK2, textDecoration: 'none', padding: '12px 0', borderBottom: `1px solid ${RULE}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'color 0.2s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = SEAL; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = INK2; }}
                    >
                      <span>{kontakt.legalLinks[2].label}</span>
                      <span style={{ fontFamily: MONO, fontSize: '10px', color: GREY2 }}>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Accession strip ─────────────────────────────────────────────── */}
        <section style={{ backgroundColor: INK, padding: '20px 0', borderTop: '1px solid #1A1A1A' }}>
          <div className="container mx-auto px-6 lg:px-12">
            <p style={{ fontFamily: MONO, fontSize: '9px', color: '#3A3A3A', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              <span style={{ color: SEAL }}>■</span>
              {' '}{kontakt.accessionStrip}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
