import { Helmet } from '@dr.pogodin/react-helmet';
import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { home } from 'virtual:content';
import { faq } from 'virtual:content';
import { formatNOK } from '@/lib/cart';
import DetailPanel, { type PlateData } from '@/components/DetailPanel';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence } from 'motion/react';

// ─── Design tokens ────────────────────────────────────────────────────────────
const SERIF = "'Fraunces', Georgia, serif";
const MONO = "'JetBrains Mono', 'Space Mono', monospace";
const BONE = '#FBFAF7';
const PAPER2 = '#F3F0E9';
const INK = '#0F0F0F';
const INK2 = '#1F1D1B';
const SEAL = '#8B1A1A';
const GREY1 = '#6B6560';
const GREY2 = '#C8C3BB';
const RULE = '#E2DDD6';

// ─── Motion ──────────────────────────────────────────────────────────────────
const rise = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.7, 0.2, 1] as [number, number, number, number] } }
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

// ─── Rule label ───────────────────────────────────────────────────────────────
function RuleLabel({ children, light = false }: {children: React.ReactNode;light?: boolean;}) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '12px',
      fontFamily: MONO, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase',
      color: light ? 'rgba(180,176,167,1)' : GREY1
    }}>
      <span style={{ width: '36px', height: '1px', backgroundColor: light ? BONE : INK, flexShrink: 0 }} />
      {children}
    </span>);

}

// ─── FAQ Section ──────────────────────────────────────────────────────────────
function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <section style={{ backgroundColor: BONE, padding: '96px 0', borderTop: `1px solid ${RULE}` }}>
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="max-w-2xl">
          <motion.div variants={rise} style={{ marginBottom: '16px' }}>
            <RuleLabel>Reference</RuleLabel>
          </motion.div>
          <motion.h2 variants={rise} style={{ fontFamily: SERIF, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 400, color: INK, marginBottom: '56px', lineHeight: 1.1, letterSpacing: '-0.01em' }}>
            {faq.title}
          </motion.h2>
          <motion.div variants={rise}>
            {faq.groups.map((group) =>
            <div key={group.id} className="mb-10">
                <p style={{ fontFamily: MONO, fontSize: '8px', color: GREY2, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '12px' }}>
                  {group.label}
                </p>
                <div style={{ borderTop: `1px solid ${RULE}` }}>
                  {group.items.map((item) => {
                  const isOpen = openId === item.id;
                  return (
                    <div key={item.id} style={{ borderBottom: `1px solid ${RULE}` }}>
                        <button
                        onClick={() => setOpenId(isOpen ? null : item.id)}
                        className="w-full flex items-center justify-between py-4 text-left"
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                        aria-expanded={isOpen}>
                        
                          <span style={{ fontFamily: SERIF, fontSize: '1rem', color: INK, fontWeight: 400, lineHeight: 1.4, paddingRight: '16px' }}>
                            {item.question}
                          </span>
                          <ChevronDown size={14} color={GREY1} style={{ flexShrink: 0, transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen &&
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden' }}>
                          
                              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: GREY1, lineHeight: 1.8, paddingBottom: '18px' }}>
                                {item.answer}
                              </p>
                            </motion.div>
                        }
                        </AnimatePresence>
                      </div>);

                })}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>);

}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [activeCat, setActiveCat] = useState('all');
  const [openPlate, setOpenPlate] = useState<PlateData | null>(null);

  const handleOpenPlate = useCallback((plate: PlateData) => {
    setOpenPlate(plate);
    history.replaceState(null, '', `#plate/${plate.n}`);
    document.title = `${plate.title} · Plate 2026.${plate.n} — Beta Art`;
  }, []);

  const handleClosePlate = useCallback(() => {
    setOpenPlate(null);
    history.replaceState(null, '', location.pathname + location.search);
    document.title = 'BETA ART — The Verified Human Photography Archive';
  }, []);

  const filteredPlates = home.collection.plates.filter(
    (p) => activeCat === 'all' || p.cat === activeCat
  );

  const site = 'https://betaart.no';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Beta Art',
    description: 'An archive of verified human photography, licensed directly from the photographer.',
    url: site,
    priceRange: 'kr 190 – kr 2 900',
    areaServed: 'Worldwide',
    currenciesAccepted: 'NOK',
    address: { '@type': 'PostalAddress', addressCountry: 'NO' }
  };

  // Product schema for each plate — enables rich results in Google Images & Search
  const plateListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Beta Art — Verified Human Photography Archive',
    description: 'Twelve original photographs, each catalogued, sealed and licensed directly from the photographer.',
    url: site,
    numberOfItems: home.collection.plates.length,
    itemListElement: home.collection.plates.map((plate, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        '@id': `${site}/photo/${plate.id}`,
        name: `${plate.title} — Plate ${plate.n}`,
        description: `${plate.note} Photographed in ${plate.loc}, ${plate.date}. Camera: ${plate.camera}, ${plate.lens}, ${plate.exp}.`,
        url: `${site}/photo/${plate.id}`,
        image: `${site}/airo-assets/images/${plate.slot}`,
        brand: {
          '@type': 'Brand',
          name: 'Beta Art'
        },
        category: 'Photography License',
        offers: [
        {
          '@type': 'Offer',
          name: 'Personal License',
          price: '190',
          priceCurrency: 'NOK',
          availability: 'https://schema.org/InStock',
          url: `${site}/photo/${plate.id}`,
          seller: { '@type': 'Organization', name: 'Beta Art' }
        },
        {
          '@type': 'Offer',
          name: 'Commercial License',
          price: '890',
          priceCurrency: 'NOK',
          availability: 'https://schema.org/InStock',
          url: `${site}/photo/${plate.id}`,
          seller: { '@type': 'Organization', name: 'Beta Art' }
        },
        {
          '@type': 'Offer',
          name: 'Extended License',
          price: '2900',
          priceCurrency: 'NOK',
          availability: 'https://schema.org/InStock',
          url: `${site}/photo/${plate.id}`,
          seller: { '@type': 'Organization', name: 'Beta Art' }
        }]

      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>BETA ART — The Verified Human Photography Archive</title>
        <meta name="description" content="An archive of photographs made by a human, verified at the source. Each work is catalogued, sealed and licensed directly from the photographer." />
        <link rel="canonical" href={site} />
        <meta property="og:title" content="BETA ART — Verified Human Photography" />
        <meta property="og:description" content="An archive of photographs made by a human. Each work catalogued, sealed and licensed directly from the photographer." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={site} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(plateListJsonLd)}</script>
      </Helmet>

      <main style={{ backgroundColor: BONE, color: INK }}>

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <header id="top" style={{ paddingTop: '80px' }}>
          <div className="container mx-auto px-6 lg:px-12">
            <div
              className="grid items-end"
              style={{ gridTemplateColumns: '1fr 380px', gap: '60px', minHeight: 'calc(100vh - 80px)', paddingBottom: '60px' }}>
              
              {/* Image */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={rise}
                className="relative">
                
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/5', width: '100%' }}>
                  <img
                    src="/airo-assets/images/pages/home/hero"
                    alt="First light on the fjords, Lofoten, Norway"
                    className="w-full h-full object-cover"
                    style={{ backgroundColor: PAPER2 }}
                    loading="eager"
                    fetchPriority="high"
                    width={1200}
                    height={1500} />
                  
                  {/* Watermark */}
                  <div
                    className="absolute inset-0 pointer-events-none select-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='340' height='240'%3E%3Ctext x='16' y='130' font-family='monospace' font-size='14' letter-spacing='4' fill='rgba(251,250,247,0.22)' transform='rotate(-14 170 120)'%3EBETA ART %C2%B7 SPECIMEN%3C/text%3E%3C/svg%3E")`,
                      mixBlendMode: 'overlay'
                    }} />
                  
                </div>
                {/* Caption */}
                <div
                  className="flex justify-between items-baseline mt-3 pt-3"
                  style={{ borderTop: `1px solid ${INK}`, fontFamily: MONO, fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: GREY1 }}>
                  
                  <span>
                    <strong style={{ color: INK, fontWeight: 500 }}>{home.hero.plate.label.split(' · ')[0]}</strong>
                    {' · '}
                    {home.hero.plate.label.split(' · ').slice(1).join(' · ')}
                  </span>
                  <span>{home.hero.plate.location}</span>
                </div>
              </motion.div>

              {/* Text */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="flex flex-col gap-8 pb-16">
                
                <motion.div variants={rise}>
                  <RuleLabel>{home.hero.label}</RuleLabel>
                </motion.div>

                <motion.h1
                  variants={rise}
                  style={{
                    fontFamily: SERIF,
                    fontSize: 'clamp(44px, 5.4vw, 86px)',
                    fontWeight: 400,
                    lineHeight: 0.98,
                    letterSpacing: '-0.02em',
                    color: INK
                  }}>
                  
                  {home.hero.headline}{' '}
                  <em style={{ fontStyle: 'italic', fontWeight: 300 }}>
                    {home.hero.headlineEm}
                  </em>
                </motion.h1>

                <motion.p
                  variants={rise}
                  style={{ fontFamily: SERIF, fontSize: '19px', lineHeight: 1.45, color: GREY1, maxWidth: '32ch' }}>
                  
                  {home.hero.sub}
                </motion.p>

                <motion.div variants={rise} className="flex flex-col gap-4 items-start">
                  <a
                    href="#collection"
                    className="inline-flex items-center gap-3 transition-colors duration-200"
                    style={{
                      padding: '16px 22px',
                      backgroundColor: INK,
                      color: BONE,
                      fontFamily: MONO,
                      fontSize: '11px',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.backgroundColor = SEAL}
                    onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.backgroundColor = INK}>
                    
                    {home.hero.cta}
                    <span style={{ letterSpacing: 0, fontFamily: 'var(--font-sans)', fontSize: '14px' }}>→</span>
                  </a>

                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: MONO, fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: GREY1 }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: SEAL, flexShrink: 0 }} />
                    {home.hero.delivery}
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </header>

        {/* ── MANIFESTO ────────────────────────────────────────────────── */}
        <section style={{ padding: '160px 0 112px' }}>
          <div className="container mx-auto px-6 lg:px-12" style={{ maxWidth: '1000px' }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}>
              
              <motion.div variants={rise} style={{ marginBottom: '0' }}>
                <RuleLabel>{home.manifesto.label}</RuleLabel>
              </motion.div>

              <motion.p
                variants={rise}
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(28px, 3.4vw, 44px)',
                  lineHeight: 1.24,
                  letterSpacing: '-0.01em',
                  color: INK,
                  fontWeight: 400,
                  marginTop: '32px'
                }}>
                
                {home.manifesto.body.split('provenance is the product').map((part, i) =>
                i === 0 ?
                <span key={i}>{part}<span style={{ color: SEAL }}>provenance is the product</span></span> :
                <em key={i} style={{ fontStyle: 'italic', color: GREY1, fontWeight: 300 }}>{part}</em>
                )}
              </motion.p>

              <motion.div
                variants={rise}
                className="flex justify-between items-baseline mt-14 pt-5"
                style={{ borderTop: `1px solid ${RULE}`, fontFamily: MONO, fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: GREY1 }}>
                
                <span>{home.manifesto.sig}</span>
                <span>{home.manifesto.year}</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── VERIFICATION ─────────────────────────────────────────────── */}
        <section id="verify" style={{ backgroundColor: PAPER2, padding: '112px 0' }}>
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}>
              
              <motion.div
                variants={rise}
                className="grid items-baseline gap-16 mb-20"
                style={{ gridTemplateColumns: '1fr 1.4fr' }}>
                
                <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(34px, 4vw, 54px)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.015em', color: INK }}>
                  {home.verification.title}
                </h2>
                <p style={{ fontFamily: SERIF, fontSize: '19px', lineHeight: 1.5, color: GREY1, maxWidth: '44ch' }}>
                  {home.verification.intro}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
                {home.verification.items.map((item) =>
                <motion.div key={item.id} variants={rise}>
                    <p style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.24em', color: SEAL, marginBottom: '24px', textTransform: 'uppercase' }}>
                      {item.number}
                    </p>
                    <h3 style={{ fontFamily: SERIF, fontSize: '26px', fontWeight: 400, lineHeight: 1.15, marginBottom: '14px', letterSpacing: '-0.005em', color: INK }}>
                      {item.headline}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', lineHeight: 1.6, color: INK2 }}>
                      {item.description}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── COLLECTION ───────────────────────────────────────────────── */}
        <section id="collection" style={{ padding: '128px 0' }}>
          <div className="container mx-auto px-6 lg:px-12">
            {/* Head */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="flex items-end justify-between gap-10 mb-16 flex-wrap">
              
              <motion.div variants={rise}>
                <div style={{ marginBottom: '20px' }}>
                  <RuleLabel>{home.collection.label}</RuleLabel>
                </div>
                <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(40px, 5vw, 68px)', fontWeight: 400, lineHeight: 1, letterSpacing: '-0.02em', color: INK }}>
                  {home.collection.title}{' '}
                  <em style={{ fontStyle: 'italic', fontWeight: 300, color: GREY1 }}>{home.collection.titleEm}</em>
                </h2>
              </motion.div>

              {/* Filters */}
              <motion.div
                variants={rise}
                className="flex gap-1 flex-wrap p-1.5"
                style={{ border: `1px solid ${RULE}` }}>
                
                {home.collection.categories.map((cat) =>
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  style={{
                    fontFamily: MONO,
                    fontSize: '11px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: activeCat === cat.id ? BONE : GREY1,
                    backgroundColor: activeCat === cat.id ? INK : 'transparent',
                    padding: '8px 14px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s, background-color 0.2s'
                  }}>
                  
                    {cat.label}
                  </button>
                )}
              </motion.div>
            </motion.div>

            {/* Gallery grid — 12-column editorial */}
            <motion.div
              key={activeCat}
              initial="hidden"
              animate="visible"
              variants={stagger}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: '60px 40px'
              }}>
              
              {filteredPlates.map((plate, i) => {
                const isWide = plate.size === 'wide';
                const isTall = plate.size === 'tall';
                return (
                  <motion.article
                    key={plate.id}
                    variants={rise}
                    style={{
                      gridColumn: isWide ? 'span 8' : 'span 4',
                      gridRow: isTall ? 'span 2' : 'auto',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleOpenPlate(plate as PlateData)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View plate 2026.${plate.n}: ${plate.title}`}
                    onKeyDown={(e) => {if (e.key === 'Enter' || e.key === ' ') {e.preventDefault();handleOpenPlate(plate as PlateData);}}}>
                    
                    <div className="relative overflow-hidden" style={{ aspectRatio: isWide ? '3/2' : isTall ? '3/4' : '4/5', backgroundColor: PAPER2 }}>
                      







                      
                      {/* Watermark */}
                      <div
                        className="absolute inset-0 pointer-events-none select-none"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='340' height='240'%3E%3Ctext x='16' y='130' font-family='monospace' font-size='14' letter-spacing='4' fill='rgba(251,250,247,0.22)' transform='rotate(-14 170 120)'%3EBETA ART %C2%B7 SPECIMEN%3C/text%3E%3C/svg%3E")`,
                          mixBlendMode: 'overlay'
                        }} />
                      
                    </div>

                    {/* Caption */}
                    <div
                      className="grid items-baseline gap-4 mt-3 pt-3"
                      style={{ gridTemplateColumns: '1fr auto', borderTop: `1px solid ${INK}` }}>
                      
                      <div>
                        <p style={{ fontFamily: SERIF, fontSize: '22px', fontWeight: 400, lineHeight: 1.2, letterSpacing: '-0.005em', color: INK }}>
                          {plate.title}
                        </p>
                        <p style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: GREY1, marginTop: '4px' }}>
                          {plate.loc} · {plate.date}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.14em', color: INK }}>
                          2026.{plate.n}
                        </p>
                        <p style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '0.08em', color: GREY1, marginTop: '4px', textTransform: 'uppercase' }}>
                          from {formatNOK(190)}
                        </p>
                      </div>
                    </div>
                  </motion.article>);

              })}
            </motion.div>
          </div>
        </section>

        {/* ── ABOUT ────────────────────────────────────────────────────── */}
        <section id="about" style={{ backgroundColor: INK, color: BONE, padding: '144px 0' }}>
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="grid items-center gap-20"
              style={{ gridTemplateColumns: '1fr 1.1fr' }}>
              
              {/* Portrait */}
              <motion.div variants={rise}>
                <img
                  src="/airo-assets/images/pages/about/photographer-portrait"
                  alt="The photographer"
                  className="w-full object-cover"
                  style={{ aspectRatio: '4/5', backgroundColor: '#2A2520' }}
                  loading="lazy"
                  width={600}
                  height={750} />
                
                <div
                  className="flex justify-between mt-3 pt-3"
                  style={{ borderTop: '1px solid rgba(251,250,247,0.2)', fontFamily: MONO, fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(180,176,167,1)' }}>
                  
                  <span><strong style={{ color: BONE, fontWeight: 500 }}>{home.about.cap1}</strong></span>
                  <span>{home.about.cap2}</span>
                </div>
              </motion.div>

              {/* Text */}
              <motion.div variants={rise} className="flex flex-col gap-8">
                <RuleLabel light>{home.about.label}</RuleLabel>

                <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 4.4vw, 64px)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.02em', color: BONE }}>
                  {home.about.headline}{' '}
                  <em style={{ fontStyle: 'italic', color: 'rgba(180,176,167,1)', fontWeight: 300 }}>
                    {home.about.headlineEm}
                  </em>
                </h2>

                <div className="space-y-4">
                  {home.about.paragraphs.map((para, i) =>
                  <p key={i} style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', lineHeight: 1.65, color: 'rgba(180,176,167,1)', maxWidth: '52ch' }}>
                      {i === 0 ?
                    <><strong style={{ color: BONE, fontWeight: 500 }}>{para.split('.')[0]}.</strong>{para.slice(para.indexOf('.') + 1)}</> :
                    para
                    }
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <FaqSection />

      </main>

      {/* Detail panel */}
      <DetailPanel
        plate={openPlate}
        plateIndex={openPlate ? home.collection.plates.findIndex((p) => p.n === openPlate.n) + 1 : 0}
        totalPlates={home.collection.plates.length}
        onClose={handleClosePlate} />
      
    </>);

}