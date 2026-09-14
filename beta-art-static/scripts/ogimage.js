/* Beta Art — render the share card for each property.
 *
 * A link with no og:image is posted as a bare grey rectangle. These are drawn
 * in the same type and the same palette as the sites themselves, then
 * screenshotted at the size the social platforms actually crop to (1200×630).
 *
 *     node tools/og-image.js
 */
"use strict";

const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

const CARDS = [
  {
    dir: "", file: "og.png",
    paper: "#FBFAF7", ink: "#0F0F0F", muted: "#67635B", seal: "#8B1A1A", rule: "#E4E0D8",
    kicker: "Three properties · one archive",
    title: "Made by a human.<br><em>Verified at the source.</em>",
    foot: "BETA ART",
  },
  {
    dir: "beta-art", file: "og.png",
    paper: "#FBFAF7", ink: "#0F0F0F", muted: "#67635B", seal: "#8B1A1A", rule: "#E4E0D8",
    kicker: "Photography archive · Direct licensing",
    title: "Verified Human<br><em>Photography.</em>",
    foot: "BETA ART · ARCHIVE",
  },
  {
    dir: "beta-art-business", file: "og.png",
    paper: "#0F0F0F", ink: "#F3F0E9", muted: "#8B857A", seal: "#E0655A", rule: "#302C27",
    kicker: "Digital studio · Private & Business",
    title: "Turn your idea into a<br><em>working</em> digital solution.",
    foot: "BETA ART · BUSINESS",
  },
  {
    dir: "beta-art-blog", file: "og.png",
    paper: "#FBFAF7", ink: "#0F0F0F", muted: "#67635B", seal: "#8B1A1A", rule: "#E4E0D8",
    kicker: "Field Notes · The journal",
    title: "What the work<br><em>actually looks like.</em>",
    foot: "BETA ART · FIELD NOTES",
  },
];

const SEAL = `<svg viewBox="0 0 100 100" width="64" height="64" aria-hidden="true">
  <g fill="none" stroke="currentColor" stroke-width="4">
    <circle cx="50" cy="50" r="46"/>
    <path d="M50 30 75.81 11.92M67.32 40 84.99 47.86M67.32 60 76.66 84.02M50 70 24.19 88.08M32.68 60 15.01 52.14M32.68 40 23.34 15.98"/>
  </g>
  <circle cx="50" cy="50" r="7" fill="SEALCOLOUR"/>
</svg>`;

function html(c) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; }
  body {
    width: 1200px; height: 630px; background: ${c.paper}; color: ${c.ink};
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 68px 76px; font-family: "Fraunces", Georgia, serif;
  }
  .top { display: flex; align-items: flex-start; justify-content: space-between; color: ${c.ink}; }
  .kicker {
    font-family: "JetBrains Mono", monospace; font-size: 19px; letter-spacing: .22em;
    text-transform: uppercase; color: ${c.seal}; text-align: right; max-width: 30ch; line-height: 1.7;
  }
  h1 {
    font-weight: 300; font-size: 82px; line-height: 1.06; letter-spacing: -.02em;
    max-width: 20ch;
  }
  h1 em { font-style: italic; color: ${c.seal}; }
  .foot {
    display: flex; align-items: center; justify-content: space-between;
    border-top: 1px solid ${c.rule}; padding-top: 26px;
    font-family: "JetBrains Mono", monospace; font-size: 18px; letter-spacing: .24em;
    text-transform: uppercase; color: ${c.muted};
  }
  .foot strong { color: ${c.ink}; font-weight: 500; }
</style></head><body>
  <div class="top">
    ${SEAL.replace("SEALCOLOUR", c.seal)}
    <p class="kicker">${c.kicker}</p>
  </div>
  <h1>${c.title}</h1>
  <div class="foot"><strong>${c.foot}</strong><span>beta-art.com</span></div>
</body></html>`;
}

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const c of CARDS) {
    await page.setContent(html(c), { waitUntil: "load" });
    // give the web fonts a moment; the card is unreadable in a fallback serif
    try { await page.evaluate(() => document.fonts.ready); } catch (_) {}
    await page.waitForTimeout(400);
    const out = path.join(ROOT, c.dir, c.file);
    await page.screenshot({ path: out, type: "png" });
    console.log("  wrote " + path.relative(ROOT, out));
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
