// The Beta Art primary mark — ring + 6-blade aperture/compass spokes +
// centre dot. Reverted 2026-08-30: the "Beta Art Brand" artifact's 4-chord
// mark was tried first (self-described as canonical), but the user then
// showed real generated OG/social images for Business, Field Notes and
// Three Properties — all three already use THIS 6-blade mark in
// production. Real rendered usage outranks one exploration artifact's own
// "canonical" label, so this is the one to keep. Geometry matches the
// mark used in this session's own beta-art-privat.html / beta-art-hub.html
// prototypes exactly (same path data). Stroke follows currentColor so it
// adapts to theme; the centre dot stays the fixed brand crimson.
export function SealMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="4">
        <circle cx="50" cy="50" r="46" />
        <path d="M50 30 75.81 11.92M67.32 40 84.99 47.86M67.32 60 76.66 84.02M50 70 24.19 88.08M32.68 60 15.01 52.14M32.68 40 23.34 15.98" />
      </g>
      <circle cx="50" cy="50" r="7" fill="#8B1A1A" />
    </svg>
  );
}
