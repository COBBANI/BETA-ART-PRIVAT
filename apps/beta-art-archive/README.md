# Beta Art Archive

React + Vite + Tailwind rebuild of the [beta-art.com](https://beta-art.com) root page, extended with a
marketplace pivot (Artists/Sell/Prices/Auth/Cart/Feedback) per user direction across the 30–31.08.2026
sessions. Full history and sourcing notes: `docs/proje-arsivi.md` (root of this repo) and inline code
comments throughout `src/`.

Verbatim beta-art.com content (hero copy, verification methods, licensing tiers, FAQ, categories) lives in
`src/lib/data.ts` and the `en`/`no` entries of `src/lib/i18n.ts` — never edit that copy without checking the
source note at the top of each file. Everything else (Artists, Prices, Sell, Auth, Cart, Feedback pages) is
new, clearly commented as such at each addition site.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # tsc -b && vite build, output in dist/
```

Deployed on Vercel (team `bet-art`, project `beta-art-archive`) from this directory as the project root.
