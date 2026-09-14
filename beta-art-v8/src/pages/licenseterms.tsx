import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { license_terms } from 'virtual:content';
import { Check, X } from 'lucide-react';

/* ─── Design tokens ─────────────────────────────────────────────────── */

/* ─── Design tokens ─────────────────────────────────────────────────── */
const SERIF  = "'Fraunces', 'Georgia', serif";
const MONO   = "'JetBrains Mono', 'Space Mono', 'Courier New', monospace";
const BONE   = '#FBFAF7';
const CARD   = '#F3F0E9';
const INK    = '#0F0F0F';
const SEAL   = '#8B1A1A';
const GREY1  = '#85817A';
const GREY2  = '#C8C3BB';
const RULE   = '#E4E0D8';

const site = 'https://betaart.no';

/* ─── Helpers ────────────────────────────────────────────────────────── */
type Lang = 'en' | 'no';

function SectionNum({ num }: { num: string }) {
  return (
    <span style={{
      fontFamily: MONO,
      fontSize: '9px',
      color: GREY2,
      letterSpacing: '0.18em',
      textTransform: 'uppercase' as const,
      display: 'block',
      marginBottom: '10px',
    }}>
      {num}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: SERIF,
      fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
      fontWeight: 400,
      color: INK,
      marginBottom: '20px',
      lineHeight: 1.25,
    }}>
      {children}
    </h2>
  );
}

function BodyText({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p style={{
      fontFamily: 'var(--font-sans, Inter, sans-serif)',
      fontSize: '14px',
      color: GREY1,
      lineHeight: 1.85,
      ...style,
    }}>
      {children}
    </p>
  );
}

function SubLabel({ children, color = GREY2 }: { children: React.ReactNode; color?: string }) {
  return (
    <p style={{
      fontFamily: MONO,
      fontSize: '8px',
      color,
      letterSpacing: '0.16em',
      textTransform: 'uppercase' as const,
      marginBottom: '10px',
    }}>
      {children}
    </p>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '8px' }}>
          <Check size={10} color={INK} style={{ flexShrink: 0, marginTop: '4px' }} />
          <span style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)', fontSize: '13px', color: GREY1, lineHeight: 1.65 }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function CrossList({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '8px' }}>
          <X size={10} color={SEAL} style={{ flexShrink: 0, marginTop: '4px' }} />
          <span style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)', fontSize: '13px', color: GREY1, lineHeight: 1.65 }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '8px' }}>
          <span style={{ fontFamily: MONO, fontSize: '8px', color: GREY2, flexShrink: 0, marginTop: '5px' }}>—</span>
          <span style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)', fontSize: '13px', color: GREY1, lineHeight: 1.65 }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ─── Section renderer ───────────────────────────────────────────────── */
type Section = typeof license_terms.en.sections[number] & {
  intro?: string;
  deliveryHead?: string;
  deliveryList?: string[];
  guaranteeHead?: string;
  guaranteeList?: string[];
  aiLabel?: string;
  aiBody?: string;
  prohibitedList?: string[];
  warrantiesList?: string[];
  indemnity?: string;
  disclaim?: string;
  rights?: string;
  enforcementList?: string[];
  forensic?: string;
  outro?: string;
};

function SectionBlock({ section }: { section: Section }) {
  return (
    <div style={{ borderTop: `1px solid ${RULE}`, paddingTop: '32px', marginBottom: '40px' }}>
      <SectionNum num={section.num} />
      <SectionHeading>{section.heading}</SectionHeading>

      {/* intro paragraph */}
      {section.intro && <BodyText style={{ marginBottom: '20px' }}>{section.intro}</BodyText>}

      {/* body paragraphs array */}
      {section.paragraphs && section.paragraphs.map((p: string, i: number) => (
        <BodyText key={i} style={{ marginBottom: i < (section.paragraphs?.length ?? 0) - 1 ? '16px' : '0' }}>{p}</BodyText>
      ))}

      {/* delivery list */}
      {section.deliveryHead && (
        <div style={{ marginTop: '20px', marginBottom: '16px' }}>
          <SubLabel>{section.deliveryHead}</SubLabel>
          <BulletList items={section.deliveryList ?? []} />
        </div>
      )}

      {/* guarantee list */}
      {section.guaranteeHead && (
        <div style={{ marginTop: '20px' }}>
          <SubLabel>{section.guaranteeHead}</SubLabel>
          <CheckList items={section.guaranteeList ?? []} />
        </div>
      )}

      {/* AI callout (§ 04) */}
      {section.aiLabel && (
        <div style={{
          border: `1px solid ${SEAL}`,
          padding: '20px 24px',
          marginTop: '24px',
          marginBottom: '24px',
          backgroundColor: `${SEAL}08`,
        }}>
          <p style={{ fontFamily: MONO, fontSize: '8px', color: SEAL, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '10px' }}>
            {section.aiLabel}
          </p>
          <BodyText style={{ color: INK, fontSize: '13px' }}>{section.aiBody}</BodyText>
        </div>
      )}

      {/* prohibited list */}
      {section.prohibitedList && (
        <div style={{ marginTop: section.aiLabel ? '0' : '16px' }}>
          <CrossList items={section.prohibitedList} />
        </div>
      )}

      {/* warranties list */}
      {section.warrantiesList && (
        <div style={{ marginBottom: '20px' }}>
          <CheckList items={section.warrantiesList} />
        </div>
      )}

      {/* indemnity */}
      {section.indemnity && <BodyText style={{ marginTop: '16px', marginBottom: '12px' }}>{section.indemnity}</BodyText>}
      {section.disclaim && <BodyText style={{ color: GREY2, fontSize: '13px' }}>{section.disclaim}</BodyText>}

      {/* enforcement */}
      {section.rights && <BodyText style={{ marginBottom: '12px' }}>{section.rights}</BodyText>}
      {section.enforcementList && <BulletList items={section.enforcementList} />}
      {section.forensic && <BodyText style={{ marginTop: '16px', color: GREY2, fontSize: '13px' }}>{section.forensic}</BodyText>}

      {/* delivery outro */}
      {section.outro && <BodyText style={{ marginTop: '16px', color: GREY2, fontSize: '13px' }}>{section.outro}</BodyText>}
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────────────────── */
export default function LicenseTermsPage() {
  const [lang, setLang] = useState<Lang>('en');
  const t = lang === 'en' ? license_terms.en : license_terms.no;

  return (
    <>
      <Helmet>
        <title>License Terms · BETA ART</title>
        <meta name="description" content="Full license terms for Personal, Commercial, and Extended photograph licenses from BETA ART. Norwegian law, human-made guarantee, explicit withdrawal rights." />
        <link rel="canonical" href={`${site}/license-terms`} />
        <meta property="og:title" content="License Terms · BETA ART" />
        <meta property="og:description" content="Full license terms for Personal, Commercial, and Extended photograph licenses from BETA ART." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/license-terms`} />
        <meta name="twitter:card" content="summary" />
        <meta name="robots" content="noindex" />
      </Helmet>

      <main style={{ backgroundColor: BONE, color: INK, paddingTop: '80px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 24px 120px' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >

            {/* ── Header ── */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <p style={{ fontFamily: MONO, fontSize: '9px', color: GREY2, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '14px' }}>
                  {t.eyebrow}
                </p>
                <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 300, color: INK, lineHeight: 1.1, marginBottom: '0' }}>
                  {t.title}
                </h1>
              </div>

              {/* Language toggle */}
              <div style={{ display: 'flex', gap: '0', border: `1px solid ${RULE}`, flexShrink: 0, alignSelf: 'flex-start', marginTop: '4px' }}>
                {(['en', 'no'] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    style={{
                      fontFamily: MONO,
                      fontSize: '9px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      padding: '7px 14px',
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: lang === l ? INK : 'transparent',
                      color: lang === l ? BONE : GREY1,
                      transition: 'background 0.15s, color 0.15s',
                    }}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Meta strip ── */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0',
              border: `1px solid ${RULE}`,
              marginBottom: '48px',
            }}>
              {[
                { label: t.metaEffective, value: t.effectiveDate },
                { label: t.metaApplies,   value: t.appliesTo },
                { label: t.metaVersion,   value: t.version },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: '16px 20px',
                    borderRight: i < 2 ? `1px solid ${RULE}` : 'none',
                  }}
                >
                  <p style={{ fontFamily: MONO, fontSize: '8px', color: GREY2, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '6px' }}>
                    {item.label}
                  </p>
                  <p style={{ fontFamily: MONO, fontSize: '11px', color: INK, letterSpacing: '0.04em' }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* ── Intro ── */}
            <BodyText style={{ marginBottom: '64px', fontSize: '15px', lineHeight: 1.8 }}>
              {t.intro}
            </BodyText>

            {/* ── Tier cards ── */}
            <div style={{ marginBottom: '64px' }}>
              <p style={{ fontFamily: MONO, fontSize: '9px', color: GREY2, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '24px' }}>
                {lang === 'en' ? 'License tiers' : 'Lisensnivåer'}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0', border: `1px solid ${RULE}` }}>
                {t.tiers.map((tier: typeof t.tiers[number], i: number) => (
                  <div
                    key={tier.id}
                    style={{
                      padding: '28px 24px',
                      borderRight: i < t.tiers.length - 1 ? `1px solid ${RULE}` : 'none',
                      backgroundColor: CARD,
                    }}
                  >
                    {/* Tier label */}
                    <p style={{ fontFamily: MONO, fontSize: '8px', color: GREY2, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '10px' }}>
                      {tier.label}
                    </p>

                    {/* Tier name + price */}
                    <p style={{ fontFamily: SERIF, fontSize: '1.05rem', fontWeight: 400, color: INK, marginBottom: '4px', lineHeight: 1.2 }}>
                      {tier.name}
                    </p>
                    <p style={{ fontFamily: MONO, fontSize: '13px', color: INK, letterSpacing: '0.04em', marginBottom: '16px' }}>
                      {tier.price}
                    </p>

                    {/* Grant */}
                    <p style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)', fontSize: '12px', color: GREY1, lineHeight: 1.6, marginBottom: '20px', borderBottom: `1px solid ${RULE}`, paddingBottom: '16px' }}>
                      {tier.grant}
                    </p>

                    {/* Permitted */}
                    <SubLabel>{lang === 'en' ? 'Permitted' : 'Tillatt'}</SubLabel>
                    <div style={{ marginBottom: '16px' }}>
                      <CheckList items={tier.permitted} />
                    </div>

                    {/* Not permitted */}
                    <SubLabel color={SEAL}>{lang === 'en' ? 'Not permitted' : 'Ikke tillatt'}</SubLabel>
                    <CrossList items={tier.notPermitted} />
                  </div>
                ))}
              </div>

              {/* Custom note */}
              <div style={{ border: `1px solid ${RULE}`, borderTop: 'none', padding: '18px 24px', backgroundColor: BONE }}>
                <p style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)', fontSize: '13px', color: GREY1, lineHeight: 1.7 }}>
                  {t.tiersCustom}
                </p>
              </div>
            </div>

            {/* ── Sections ── */}
            <div>
              {t.sections.map((section: typeof t.sections[number]) => (
                <SectionBlock key={section.id} section={section} />
              ))}
            </div>

            {/* ── Governing language note ── */}
            <div style={{ borderTop: `1px solid ${RULE}`, paddingTop: '28px', marginTop: '16px', marginBottom: '48px' }}>
              <p style={{ fontFamily: MONO, fontSize: '9px', color: GREY2, letterSpacing: '0.06em', lineHeight: 1.7 }}>
                {t.governing}
              </p>
            </div>

            {/* ── Footer contact ── */}
            <p style={{ fontFamily: MONO, fontSize: '9px', color: GREY2, letterSpacing: '0.06em' }}>
              {lang === 'en' ? 'Questions?' : 'Spørsmål?'}{' '}
              <a
                href={`mailto:${t.contact}`}
                style={{ color: INK, textDecoration: 'underline', textUnderlineOffset: '3px' }}
              >
                {t.contact}
              </a>
            </p>

          </motion.div>
        </div>
      </main>
    </>
  );
}
