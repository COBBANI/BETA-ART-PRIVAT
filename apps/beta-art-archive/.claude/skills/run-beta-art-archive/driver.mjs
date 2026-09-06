// run-beta-art-archive driver — launch Chromium (headless) against a
// running `vite preview` and screenshot / drive any route of the Beta Art
// Privat SPA. This is the same harness used to verify every feature built
// this session; it is the primary agent path for "run"/"screenshot".
//
// Global Playwright + a pre-installed Chromium live outside the project's
// node_modules, so this script is invoked with NODE_PATH pointing at the
// global modules and launches with an explicit executablePath — see
// SKILL.md for the exact command.
//
// Usage:
//   NODE_PATH=/opt/node22/lib/node_modules node driver.mjs <url> <out.png> [--admin] [--wait <ms>]
//     <url>       full URL to open, e.g. http://localhost:4173/ or .../#admin
//     <out.png>   screenshot path to write
//     --admin     seed two demo sales into localStorage before loading
//                 (so the /#admin dashboard + revenue chart have content)
//     --wait <ms> extra settle time after load (default 500)
//
// Exit code 0 on success (screenshot written), 1 on any failure.
//
// Playwright + Chromium are installed globally (outside this project's
// node_modules). ESM `import` ignores NODE_PATH, so load the global
// package via createRequire against an explicit path instead.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW_PLAYWRIGHT || "/opt/node22/lib/node_modules/playwright");

const args = process.argv.slice(2);
const url = args[0];
const out = args[1];
if (!url || !out) {
  console.error("usage: node driver.mjs <url> <out.png> [--admin] [--wait <ms>]");
  process.exit(1);
}
const admin = args.includes("--admin");
const waitIdx = args.indexOf("--wait");
const settle = waitIdx >= 0 ? Number(args[waitIdx + 1]) : 500;

const DEMO_SALES = [
  { id: "d1", date: "2026-07-14", plate: "Golden Hour", tier: "Personal", gross: 190, fee: 4.65, photographer: "Beta Art", buyer: "", source: "email", note: "" },
  { id: "d2", date: "2026-08-03", plate: "Still Water", tier: "Personal", gross: 190, fee: 4.65, photographer: "Kari Nordmann", buyer: "", source: "stripe", note: "" },
  { id: "d3", date: "2026-09-01", plate: "The Maker", tier: "Commercial", gross: 900, fee: 15.3, photographer: "Beta Art", buyer: "", source: "stripe", note: "" },
];

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
try {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));

  if (admin) {
    // Seed the owner's sales ledger, then load /#admin fresh.
    const origin = new URL(url).origin;
    await page.goto(origin + "/", { waitUntil: "networkidle" });
    await page.evaluate((sales) => localStorage.setItem("ba_satis_v1", JSON.stringify(sales)), DEMO_SALES);
  }

  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(settle);
  const title = await page.title();
  const h1 = (await page.locator("h1").first().textContent().catch(() => "")) || "";
  await page.screenshot({ path: out, fullPage: false });

  console.log(`ok: ${url}`);
  console.log(`title: ${title}`);
  console.log(`h1: ${h1.trim().slice(0, 60)}`);
  console.log(`screenshot: ${out}`);
  if (errors.length) console.log(`page errors: ${errors.length} — ${errors[0]}`);
  await browser.close();
  process.exit(errors.length ? 1 : 0);
} catch (e) {
  console.error("FAIL:", e.message);
  await browser.close();
  process.exit(1);
}
