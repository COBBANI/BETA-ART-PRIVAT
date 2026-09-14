import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useCart, LICENSES, licenseById, formatNOK, type LicenseId } from '@/lib/cart';

const MONO   = "'JetBrains Mono', 'Space Mono', monospace";
const SERIF  = "'Fraunces', Georgia, serif";
const BONE   = '#FBFAF7';
const INK    = '#0F0F0F';
const SEAL   = '#8B1A1A';
const GREY1  = '#6B6560';
const GREY2  = '#C8C3BB';
const RULE   = '#E2DDD6';
const PAPER2 = '#F3F0E9';

export interface PlateData {
  id: string;
  n: string;
  size: string;
  title: string;
  cat: string;
  loc: string;
  date: string;
  camera: string;
  lens: string;
  exp: string;
  note: string;
  slot: string;
  release: boolean;
}

interface Props {
  plate: PlateData | null;
  plateIndex: number;
  totalPlates: number;
  onClose: () => void;
}

export default function DetailPanel({ plate, plateIndex, totalPlates, onClose }: Props) {
  const { addItem, openDrawer } = useCart();
  const [selectedLicense, setSelectedLicense] = useState<LicenseId>('commercial');

  // Reset license selection when plate changes
  useEffect(() => {
    setSelectedLicense('commercial');
  }, [plate?.n]);

  // Lock body scroll
  useEffect(() => {
    const isOpen = !!plate;
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [plate]);

  // Keyboard close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  function handleAdd() {
    if (!plate) return;
    addItem(plate.n, selectedLicense);
    onClose();
    openDrawer();
  }

  return (
    <AnimatePresence>
      {plate && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[80]"
            style={{ backgroundColor: 'rgba(15,15,15,0.6)' }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[81] overflow-y-auto"
            style={{ width: 'min(1100px, 100%)', backgroundColor: BONE }}
            aria-label={`Detail: ${plate.title}`}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="fixed top-6 right-6 z-[82] flex items-center justify-center transition-colors duration-200"
              style={{ width: '44px', height: '44px', backgroundColor: BONE, border: `1px solid ${INK}`, cursor: 'pointer' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = INK; (e.currentTarget as HTMLButtonElement).style.color = BONE; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = BONE; (e.currentTarget as HTMLButtonElement).style.color = INK; }}
              aria-label="Close"
            >
              <X size={14} />
            </button>

            <div className="grid" style={{ gridTemplateColumns: 'min(55%, 600px) 1fr', minHeight: '100%' }}>
              {/* Image side */}
              <div
                className="flex items-center justify-center p-10 md:p-16"
                style={{ backgroundColor: PAPER2 }}
              >
                <div className="relative w-full">
                  <img
                    src={`/airo-assets/images/${plate.slot}`}
                    alt={`${plate.title} — ${plate.loc}`}
                    className="w-full object-contain"
                    style={{ maxHeight: '80vh' }}
                  />
                  {/* Watermark */}
                  <div
                    className="absolute inset-0 pointer-events-none select-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='340' height='240'%3E%3Ctext x='16' y='130' font-family='monospace' font-size='14' letter-spacing='4' fill='rgba(15,15,15,0.1)' transform='rotate(-14 170 120)'%3EBETA ART %C2%B7 SPECIMEN%3C/text%3E%3C/svg%3E")`,
                      mixBlendMode: 'multiply',
                    }}
                  />
                </div>
              </div>

              {/* Detail side */}
              <div className="flex flex-col gap-8 p-12 md:p-16 overflow-y-auto">
                {/* Header row */}
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p style={{ fontFamily: MONO, fontSize: '10px', color: GREY2, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '14px' }}>
                      Plate {plateIndex} of {totalPlates}
                    </p>
                    <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 3.5vw, 44px)', fontWeight: 400, color: INK, lineHeight: 1.05, letterSpacing: '-0.015em' }}>
                      {plate.title}
                    </h2>
                    <p style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '0.14em', color: GREY1, textTransform: 'uppercase', marginTop: '8px' }}>
                      {plate.loc} · {plate.date}
                    </p>
                  </div>

                  {/* Seal */}
                  <div
                    className="flex-shrink-0 flex flex-col items-center justify-center"
                    style={{
                      width: '70px', height: '70px', borderRadius: '50%',
                      border: `1px solid ${SEAL}`, color: SEAL,
                      fontFamily: MONO, fontSize: '8px', letterSpacing: '0.24em',
                      textTransform: 'uppercase', lineHeight: 1.3, textAlign: 'center',
                      position: 'relative', backgroundColor: 'rgba(255,255,255,0.4)',
                    }}
                    title={`Human verified — Seal ${plate.n.slice(-2)}`}
                  >
                    <span style={{ fontFamily: SERIF, fontSize: '18px', fontWeight: 400, letterSpacing: 0, color: SEAL, fontStyle: 'italic', lineHeight: 1 }}>H</span>
                    <span style={{ fontSize: '7px' }}>Verified<br />Seal {plate.n.slice(-2)}</span>
                  </div>
                </div>

                {/* Accession table */}
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: 'auto 1fr',
                    gap: '0 20px',
                    fontFamily: MONO,
                    fontSize: '11px',
                    lineHeight: 1.85,
                    color: INK,
                    letterSpacing: '0.02em',
                    padding: '14px 0',
                    borderTop: `1px solid ${INK}`,
                    borderBottom: `1px solid ${RULE}`,
                    maxWidth: '360px',
                  }}
                >
                  {[
                    ['Accession', `2026.${plate.n}`, true],
                    ['Camera',    plate.camera,       false],
                    ['Lens',      plate.lens,         false],
                    ['Exposure',  plate.exp,          false],
                    ['RAW',       'Original on record', false],
                    ...(plate.release ? [['Release', 'Model release on file', false]] : []),
                  ].map(([k, v, strong]) => (
                    <>
                      <span key={`k-${k}`} style={{ color: GREY1, textTransform: 'uppercase', letterSpacing: '0.16em' }}>{k as string}</span>
                      <span key={`v-${k}`} style={{ color: INK, textAlign: 'right', fontWeight: strong ? 500 : 400 }}>{v as string}</span>
                    </>
                  ))}
                </div>

                {/* Note */}
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: GREY1, lineHeight: 1.65 }}>
                  {plate.note}
                </p>

                {/* License selector */}
                <div>
                  <p style={{ fontFamily: MONO, fontSize: '10px', color: GREY2, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '16px' }}>
                    Select a license
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {LICENSES.map((l) => {
                      const selected = l.id === selectedLicense;
                      return (
                        <div
                          key={l.id}
                          className="grid items-center gap-5 cursor-pointer transition-colors duration-200"
                          style={{
                            gridTemplateColumns: 'auto 1fr auto',
                            padding: '20px 22px',
                            border: `1px solid ${selected ? INK : RULE}`,
                            backgroundColor: selected ? PAPER2 : 'transparent',
                          }}
                          onClick={() => setSelectedLicense(l.id)}
                          role="radio"
                          aria-checked={selected}
                          tabIndex={0}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedLicense(l.id); } }}
                        >
                          {/* Radio dot */}
                          <div
                            style={{
                              width: '16px', height: '16px', borderRadius: '50%',
                              border: `1px solid ${selected ? INK : RULE}`,
                              position: 'relative',
                            }}
                          >
                            {selected && (
                              <div style={{ position: 'absolute', inset: '3px', borderRadius: '50%', backgroundColor: INK }} />
                            )}
                          </div>
                          <div>
                            <p style={{ fontFamily: SERIF, fontSize: '19px', fontWeight: 400, color: INK }}>
                              {l.name}
                            </p>
                            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: GREY1, marginTop: '4px', lineHeight: 1.4 }}>
                              {l.desc}
                            </p>
                          </div>
                          <p style={{ fontFamily: MONO, fontSize: '13px', letterSpacing: '0.06em', color: INK }}>
                            {formatNOK(l.price)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Add to order */}
                <button
                  onClick={handleAdd}
                  className="w-full flex items-center justify-between transition-colors duration-200"
                  style={{
                    padding: '20px 24px',
                    backgroundColor: INK,
                    color: BONE,
                    fontFamily: MONO,
                    fontSize: '12px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = SEAL; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = INK; }}
                >
                  Add to order · {formatNOK(licenseById(selectedLicense).price)}
                  <span style={{ letterSpacing: 0, fontFamily: 'var(--font-sans)', fontSize: '16px' }}>→</span>
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
