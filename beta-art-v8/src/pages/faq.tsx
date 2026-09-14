import { Helmet } from '@dr.pogodin/react-helmet';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { faq } from 'virtual:content';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Design tokens ────────────────────────────────────────────────────────────
const SERIF = "'Fraunces', Georgia, serif";
const MONO  = "'JetBrains Mono', 'Space Mono', monospace";
const BONE  = '#FBFAF7';
const INK   = '#0F0F0F';
const SEAL  = '#8B1A1A';
const GREY1 = '#6B6560';
const GREY2 = '#C8C3BB';
const RULE  = '#E2DDD6';

// ─── Motion ──────────────────────────────────────────────────────────────────
const rise = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as [number,number,number,number] } },
};
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── Rule label ───────────────────────────────────────────────────────────────
function RuleLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '12px',
      fontFamily: MONO, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase',
      color: GREY1,
    }}>
      <span style={{ width: '36px', height: '1px', backgroundColor: INK, flexShrink: 0 }} />
      {children}
    </span>
  );
}

// ─── FAQ Page ─────────────────────────────────────────────────────────────────
export default function FaqPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState<string>('all');

  const site = 'https://betaart.no';
  const url  = `${site}/faq`;
  const title = 'Frequently Asked Questions — BETA ART';
  const description =
    'Answers about Human Verified photography, licenses, ordering, delivery, and payment. BETA ART — real photographs, clear terms.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#webpage`,
    name: title,
    url,
    isPartOf: { '@id': `${site}/#website` },
    about: { '@id': `${site}/#organization` },
    mainEntity: faq.groups.flatMap((g) =>
      g.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      }))
    ),
  };

  // CSS-visibility filter — keeps all groups in the DOM for inline editability

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main>
        {/* ── Page header ─────────────────────────────────────────────────── */}
        <section
          style={{
            backgroundColor: BONE,
            borderBottom: `1px solid ${RULE}`,
            padding: '80px 0 56px',
          }}
        >
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-2xl"
            >
              <motion.div variants={rise} style={{ marginBottom: '20px' }}>
                <RuleLabel>Reference document</RuleLabel>
              </motion.div>

              <motion.h1
                variants={rise}
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 400,
                  color: INK,
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  marginBottom: '24px',
                }}
              >
                {faq.title}
              </motion.h1>

              <motion.p
                variants={rise}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px',
                  color: GREY1,
                  lineHeight: 1.7,
                  maxWidth: '480px',
                }}
              >
                Can't find your answer?{' '}
                <a
                  href="mailto:hello@betaart.no"
                  style={{ color: INK, textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  hello@betaart.no
                </a>
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── Category filter tabs ─────────────────────────────────────────── */}
        <section
          style={{
            backgroundColor: BONE,
            borderBottom: `1px solid ${RULE}`,
            padding: '0',
            position: 'sticky',
            top: '64px',
            zIndex: 10,
          }}
        >
          <div className="container mx-auto px-6 lg:px-12">
            <div
              role="group"
              aria-label="Filter by category"
              style={{
                display: 'flex',
                gap: '0',
                overflowX: 'auto',
              }}
            >
              {/* All */}
              <button
                onClick={() => setActiveGroup('all')}
                style={{
                  fontFamily: MONO,
                  fontSize: '10px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  padding: '16px 20px',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeGroup === 'all' ? `2px solid ${INK}` : '2px solid transparent',
                  color: activeGroup === 'all' ? INK : GREY2,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
              >
                All
              </button>

              {faq.groups.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setActiveGroup(g.id)}
                  style={{
                    fontFamily: MONO,
                    fontSize: '10px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    padding: '16px 20px',
                    background: 'none',
                    border: 'none',
                    borderBottom: activeGroup === g.id ? `2px solid ${INK}` : '2px solid transparent',
                    color: activeGroup === g.id ? INK : GREY2,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ accordion ───────────────────────────────────────────────── */}
        <section style={{ backgroundColor: BONE, padding: '64px 0 96px' }}>
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeGroup}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  {faq.groups.map((group) => (
                    <div
                      key={group.id}
                      style={{
                        marginBottom: '48px',
                        display: activeGroup === 'all' || activeGroup === group.id ? 'block' : 'none',
                      }}
                    >
                      {/* Group label */}
                      <p
                        style={{
                          fontFamily: MONO,
                          fontSize: '9px',
                          color: GREY2,
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          marginBottom: '12px',
                        }}
                      >
                        {group.label}
                      </p>

                      {/* Items */}
                      <div style={{ borderTop: `1px solid ${RULE}` }}>
                        {group.items.map((item) => {
                          const isOpen = openId === item.id;
                          return (
                            <div
                              key={item.id}
                              style={{ borderBottom: `1px solid ${RULE}` }}
                            >
                              <button
                                onClick={() => setOpenId(isOpen ? null : item.id)}
                                className="w-full flex items-center justify-between py-5 text-left"
                                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                aria-expanded={isOpen}
                                aria-controls={`answer-${item.id}`}
                              >
                                <span
                                  style={{
                                    fontFamily: SERIF,
                                    fontSize: '1rem',
                                    color: INK,
                                    fontWeight: 400,
                                    lineHeight: 1.4,
                                    paddingRight: '24px',
                                  }}
                                >
                                  {item.question}
                                </span>
                                <ChevronDown
                                  size={14}
                                  color={GREY1}
                                  style={{
                                    flexShrink: 0,
                                    transition: 'transform 0.3s',
                                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                  }}
                                />
                              </button>

                              <AnimatePresence initial={false}>
                                {isOpen && (
                                  <motion.div
                                    id={`answer-${item.id}`}
                                    key="answer"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                                    style={{ overflow: 'hidden' }}
                                  >
                                    <p
                                      style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: '14px',
                                        color: GREY1,
                                        lineHeight: 1.85,
                                        paddingBottom: '20px',
                                      }}
                                    >
                                      {item.answer}
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* ── Footer CTA ──────────────────────────────────────────────── */}
              <div
                style={{
                  marginTop: '64px',
                  paddingTop: '40px',
                  borderTop: `1px solid ${RULE}`,
                }}
              >
                <p
                  style={{
                    fontFamily: MONO,
                    fontSize: '10px',
                    color: GREY2,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}
                >
                  Still have questions?
                </p>
                <p
                  style={{
                    fontFamily: SERIF,
                    fontSize: '1.25rem',
                    color: INK,
                    fontWeight: 400,
                    marginBottom: '24px',
                    lineHeight: 1.3,
                  }}
                >
                  I'm happy to help before you buy.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a
                    href="mailto:hello@betaart.no"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      color: BONE,
                      background: INK,
                      padding: '10px 20px',
                      textDecoration: 'none',
                      letterSpacing: '0.02em',
                      display: 'inline-block',
                    }}
                  >
                    hello@betaart.no
                  </a>
                  <Link
                    to="/lisensbetingelser"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      color: INK,
                      border: `1px solid ${RULE}`,
                      padding: '10px 20px',
                      textDecoration: 'none',
                      letterSpacing: '0.02em',
                      display: 'inline-block',
                    }}
                  >
                    License terms
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Accession strip ─────────────────────────────────────────────── */}
        <section
          style={{
            backgroundColor: INK,
            padding: '20px 0',
            borderTop: `1px solid #1A1A1A`,
          }}
        >
          <div className="container mx-auto px-6 lg:px-12">
            <p
              style={{
                fontFamily: MONO,
                fontSize: '9px',
                color: '#3A3A3A',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ color: SEAL }}>■</span>
              {' '}BETA ART · REFERENCE DOCUMENT · FAQ · {faq.groups.reduce((acc, g) => acc + g.items.length, 0)} ENTRIES · HUMAN AUTHORED
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
