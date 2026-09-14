import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useCart, licenseById, formatNOK } from '@/lib/cart';
import { home } from 'virtual:content';

const MONO  = "'JetBrains Mono', 'Space Mono', monospace";
const SERIF = "'Fraunces', Georgia, serif";
const BONE  = '#FBFAF7';
const INK   = '#0F0F0F';
const SEAL  = '#8B1A1A';
const GREY1 = '#6B6560';
const GREY2 = '#C8C3BB';
const RULE  = '#E2DDD6';
const PAPER2 = '#F3F0E9';

const CONTACT_EMAIL = 'hello@betaart.no';

export default function OrderDrawer() {
  const { items, removeItem, total, drawerOpen, closeDrawer } = useCart();
  const [consent, setConsent] = useState(false);

  // Reset consent when drawer closes
  useEffect(() => {
    if (!drawerOpen) setConsent(false);
  }, [drawerOpen]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  function plateByN(n: string) {
    return home.collection.plates.find(p => p.n === n);
  }

  function handleCheckout() {
    if (!items.length || !consent) return;
    const lines = items.map(c => {
      const p = plateByN(c.plateN);
      const l = licenseById(c.licenseId);
      return `• "${p?.title}" (2026.${c.plateN}, ${p?.loc}) — ${l.name} — ${formatNOK(l.price)}`;
    }).join('\n');

    const body = `Hello,

I would like to license the following plate(s):

${lines}

Total: ${formatNOK(total)} (excl. MVA)

Intended use:
Company / name:
Invoicing details (org.nr, address):

I confirm I have read the License Terms and consent to immediate digital
delivery, waiving the 14-day right of withdrawal (angrerett) upon delivery.

Thank you.`;

    window.location.href =
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Order — Beta Art Archive')}&body=${encodeURIComponent(body)}`;
  }

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90]"
            style={{ backgroundColor: 'rgba(15,15,15,0.55)' }}
            onClick={closeDrawer}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[91] flex flex-col"
            style={{ width: 'min(460px, 100%)', backgroundColor: BONE }}
            aria-label="Your order"
          >
            {/* Head */}
            <div
              className="flex items-center justify-between px-8 py-6"
              style={{ borderBottom: `1px solid ${RULE}` }}
            >
              <h3 style={{ fontFamily: SERIF, fontSize: '28px', fontWeight: 400, color: INK }}>
                Your order
              </h3>
              <button
                onClick={closeDrawer}
                className="flex items-center justify-center transition-colors duration-200"
                style={{ width: '36px', height: '36px', border: `1px solid ${RULE}`, backgroundColor: 'transparent', cursor: 'pointer' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = INK; (e.currentTarget as HTMLButtonElement).style.color = BONE; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = INK; }}
                aria-label="Close order"
              >
                <X size={12} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-8 py-4">
              {!items.length ? (
                <p style={{ fontFamily: SERIF, fontSize: '18px', fontStyle: 'italic', color: GREY1, padding: '40px 0', textAlign: 'center' }}>
                  — empty —
                </p>
              ) : (
                <div>
                  {items.map((item, i) => {
                    const p = plateByN(item.plateN);
                    const l = licenseById(item.licenseId);
                    if (!p) return null;
                    return (
                      <div
                        key={i}
                        className="grid gap-5 py-5"
                        style={{ gridTemplateColumns: '80px 1fr', borderBottom: `1px solid ${RULE}` }}
                      >
                        <img
                          src={`/airo-assets/images/${p.slot}`}
                          alt={p.title}
                          style={{ width: '80px', height: '100px', objectFit: 'cover', backgroundColor: PAPER2 }}
                        />
                        <div>
                          <p style={{ fontFamily: SERIF, fontSize: '19px', fontWeight: 400, color: INK, lineHeight: 1.2 }}>
                            {p.title}
                          </p>
                          <p style={{ fontFamily: MONO, fontSize: '10px', color: GREY2, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '4px' }}>
                            Accession 2026.{p.n}
                          </p>
                          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: GREY1, marginTop: '10px' }}>
                            {l.name}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <span style={{ fontFamily: MONO, fontSize: '12px', color: INK }}>
                              {formatNOK(l.price)}
                            </span>
                            <button
                              onClick={() => removeItem(i)}
                              style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: GREY2, textDecoration: 'underline', textUnderlineOffset: '3px', background: 'none', border: 'none', cursor: 'pointer' }}
                              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = SEAL)}
                              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = GREY2)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-8 py-6" style={{ borderTop: `1px solid ${RULE}` }}>
              {/* Total */}
              <div
                className="flex items-baseline justify-between pb-4 mb-5"
                style={{ borderBottom: `1px solid ${RULE}` }}
              >
                <span style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: GREY1 }}>
                  Total (excl. MVA)
                </span>
                <span style={{ fontFamily: SERIF, fontSize: '26px', fontWeight: 400, color: INK }}>
                  {formatNOK(total)}
                </span>
              </div>

              {/* Angrerett consent */}
              <div
                className="grid gap-3 py-4 mb-2 cursor-pointer"
                style={{ gridTemplateColumns: 'auto 1fr' }}
                onClick={() => setConsent(!consent)}
                role="checkbox"
                aria-checked={consent}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setConsent(!consent); } }}
              >
                <div
                  className="flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    width: '16px',
                    height: '16px',
                    border: `1px solid ${consent ? INK : RULE}`,
                    backgroundColor: consent ? INK : 'transparent',
                    transition: 'border-color 0.2s, background-color 0.2s',
                  }}
                >
                  {consent && (
                    <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                      <path d="M1 2.5L3 4.5L7 0.5" stroke={BONE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', lineHeight: 1.5, color: GREY1 }}>
                  I understand the file is delivered digitally and I waive my 14-day right of withdrawal (
                  <a href="/lisensbetingelser" style={{ textDecoration: 'underline', textUnderlineOffset: '2px', color: INK }} onClick={(e) => e.stopPropagation()}>
                    angrerett
                  </a>
                  ) upon delivery.
                </p>
              </div>

              {/* Checkout button */}
              <button
                onClick={handleCheckout}
                disabled={!items.length || !consent}
                className="w-full flex items-center justify-between transition-colors duration-200"
                style={{
                  padding: '20px 24px',
                  backgroundColor: (!items.length || !consent) ? RULE : INK,
                  color: (!items.length || !consent) ? GREY2 : BONE,
                  fontFamily: MONO,
                  fontSize: '12px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: (!items.length || !consent) ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={(e) => { if (items.length && consent) (e.currentTarget as HTMLButtonElement).style.backgroundColor = SEAL; }}
                onMouseLeave={(e) => { if (items.length && consent) (e.currentTarget as HTMLButtonElement).style.backgroundColor = INK; }}
              >
                Send order request
                <span style={{ letterSpacing: 0, fontFamily: 'var(--font-sans)', fontSize: '16px' }}>→</span>
              </button>

              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: GREY1, lineHeight: 1.55, marginTop: '14px' }}>
                Your email application will open with the order details pre-filled. A written license, invoice and secure download link arrive within 24 hours.
              </p>

              {/* Payment logos */}
              <div
                className="flex items-center gap-3 flex-wrap mt-4 pt-3"
                style={{ borderTop: `1px solid ${RULE}` }}
              >
                <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: GREY2 }}>
                  Payment
                </span>
                {/* Vipps */}
                <svg width="42" height="16" viewBox="0 0 60 24" fill="none" aria-label="Vipps">
                  <rect width="60" height="24" rx="4" fill="#FF5B24"/>
                  <text x="30" y="17" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#fff">Vipps</text>
                </svg>
                {/* Visa */}
                <svg width="36" height="16" viewBox="0 0 60 24" fill="none" aria-label="Visa">
                  <rect width="60" height="24" rx="4" fill="#1A1F71"/>
                  <text x="30" y="17" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="800" fontStyle="italic" fill="#F7B600">VISA</text>
                </svg>
                {/* Mastercard */}
                <svg width="30" height="18" viewBox="0 0 40 24" fill="none" aria-label="Mastercard">
                  <circle cx="15" cy="12" r="8" fill="#EB001B"/>
                  <circle cx="25" cy="12" r="8" fill="#F79E1B"/>
                  <path d="M20 6a8 8 0 0 1 0 12 8 8 0 0 1 0-12z" fill="#FF5F00"/>
                </svg>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
