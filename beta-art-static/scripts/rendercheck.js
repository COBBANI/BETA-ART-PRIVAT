/* Beta Art — runtime quality control.
 *
 * audit.py reads the HTML and qc.py reads everything around it. Neither of
 * them opens a browser, so neither can see what the page actually does: text
 * that overflows on a phone, contrast that fails once the real colours are
 * resolved, a script that throws, a language switcher that changes nothing.
 *
 * This opens every page in Chromium at three widths and reports what it sees.
 *
 *     node tools/render-check.js
 *
 * Exits non-zero if anything is found.
 */
"use strict";

const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const WIDTHS = [
  { name: "phone", width: 360, height: 780 },
  { name: "tablet", width: 768, height: 1024 },
  // 1024 is not decoration. The business header collapsed to a burger below
  // 980 and the desktop nav needed about 1100 to fit, so every page on that
  // property scrolled sideways in between — invisible to 360, 768 and 1280.
  { name: "laptop", width: 1024, height: 800 },
  { name: "desktop", width: 1280, height: 900 },
];
const AA_BODY = 4.5;
const AA_LARGE = 3.0;

const findings = [];
function note(section, msg) { findings.push({ section, msg }); }

function pages() {
  const out = [];
  for (const dir of ["", "beta-art", "beta-art-business", "beta-art-blog"]) {
    const base = path.join(ROOT, dir);
    for (const f of fs.readdirSync(base).sort()) {
      if (f.endsWith(".html")) out.push(path.join(base, f));
    }
    // The per-language URLs live one level down and were never opened here.
    // They share a stylesheet with the pages above them, so the header fault
    // this gate had missed for months was on all 26 of them too — and the gate
    // would have reported it clean.
    const lang = path.join(base, "no");
    if (fs.existsSync(lang)) {
      for (const f of fs.readdirSync(lang).sort()) {
        if (f.endsWith(".html")) out.push(path.join(lang, f));
      }
    }
  }
  return out;
}

/* --- what runs in the page --------------------------------------------- */
const PROBE = `(() => {
  const out = { overflow: [], contrast: [], targets: [], focus: 0, i18n: null };

  const doc = document.documentElement;
  if (doc.scrollWidth > doc.clientWidth + 1) {
    // find what is actually sticking out
    const w = doc.clientWidth;
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0) continue;
      if (r.right > w + 1 || r.left < -1) {
        const style = getComputedStyle(el);
        if (style.position === "fixed") continue;
        // A skip link parked off the left edge cannot scroll anything.
        if (r.right <= 0) continue;
        // Nor can a marquee whose parent clips it. Report the culprit, not
        // every child of it — an ancestor that scrolls or hides its overflow
        // absorbs the width before it reaches the document.
        let clipped = false;
        for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
          const o = getComputedStyle(a).overflowX;
          if (o === "hidden" || o === "clip" || o === "auto" || o === "scroll") { clipped = true; break; }
        }
        if (clipped) continue;
        out.overflow.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className && el.className.toString().slice(0, 40)) || "",
          right: Math.round(r.right), viewport: w,
        });
        if (out.overflow.length > 4) break;
      }
    }
    if (!out.overflow.length) {
      out.overflow.push({ tag: "(document)", cls: "", right: doc.scrollWidth, viewport: w });
    }
  }

  /* --- contrast, on resolved colours ---------------------------------- */
  const toRGB = (s) => {
    const m = /rgba?\\(([^)]+)\\)/.exec(s);
    if (!m) return null;
    const p = m[1].split(",").map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const lum = (c) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };
  const ratio = (a, b) => {
    const l1 = lum(a), l2 = lum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };
  const backdrop = (el) => {
    let n = el;
    while (n && n !== document.documentElement) {
      const bg = toRGB(getComputedStyle(n).backgroundColor);
      if (bg && bg.a > 0.85) return bg;
      n = n.parentElement;
    }
    const body = toRGB(getComputedStyle(document.body).backgroundColor);
    return body && body.a > 0.85 ? body : { r: 255, g: 255, b: 255, a: 1 };
  };

  const seen = new Set();
  for (const el of document.querySelectorAll("p,li,a,span,h1,h2,h3,h4,button,label,td,th,strong,em,small,figcaption")) {
    if (!el.textContent.trim()) continue;
    if (el.offsetParent === null && getComputedStyle(el).position !== "fixed") continue;
    if (el.querySelector("p,li,h1,h2,h3,h4")) continue;
    const cs = getComputedStyle(cs_el(el));
    function cs_el(e) { return e; }
    const fg = toRGB(cs.color);
    if (!fg || fg.a < 0.1) continue;
    const bg = backdrop(el);
    const size = parseFloat(cs.fontSize);
    const bold = parseInt(cs.fontWeight, 10) >= 700;
    const large = size >= 24 || (size >= 18.66 && bold);
    const need = large ? ${AA_LARGE} : ${AA_BODY};
    const got = ratio(fg, bg);
    if (got < need) {
      const key = cs.color + "|" + bg.r + "," + bg.g + "," + bg.b + "|" + Math.round(size);
      if (seen.has(key)) continue;
      seen.add(key);
      out.contrast.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className && el.className.toString().slice(0, 40)) || "",
        text: el.textContent.trim().slice(0, 40),
        fg: cs.color, bg: "rgb(" + bg.r + "," + bg.g + "," + bg.b + ")",
        size: Math.round(size), got: Math.round(got * 100) / 100, need,
      });
    }
  }

  const cs2 = (el) => getComputedStyle(el);

  /* --- tap targets: 24x24 is the WCAG 2.2 AA floor -------------------- */
  for (const el of document.querySelectorAll("a,button,input,select,summary,[role=button]")) {
    if (el.offsetParent === null) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    // WCAG 2.5.8 exempts a target "in a sentence or block of text". Two earlier
    // attempts at this got it wrong in opposite directions: a fixed list of
    // parent tags excused a heading that contained nothing but a link, and a
    // character-count threshold condemned "the RSS feed" inside a short
    // sentence. What the exemption actually describes is an inline target
    // sitting in running text — so test exactly that: the link flows inline,
    // and the block around it says something besides the link.
    if (el.tagName === "A" && cs2(el).display === "inline") {
      const block = el.parentElement && el.parentElement.closest(
        "p,li,dd,dt,td,label,h1,h2,h3,h4,h5,blockquote,figcaption,summary,figure,div");
      if (block && block.textContent.trim().length > el.textContent.trim().length) continue;
    }
    if (r.width < 24 || r.height < 24) {
      out.targets.push({
        tag: el.tagName.toLowerCase(),
        text: (el.textContent || el.value || "").trim().slice(0, 30),
        w: Math.round(r.width), h: Math.round(r.height),
      });
      if (out.targets.length > 4) break;
    }
  }

  /* --- does the language switcher do anything? ------------------------ */
  const sw = document.querySelector("[data-lang], .lang-select, select#lang, #lang-select, .lang-switch select, .lang-switch");
  const translatable = document.querySelectorAll("[data-i18n], [data-i18n-attr]").length;
  if (sw) out.i18n = { hasSwitcher: true, translatable };

  return out;
})()`;

/* --- focus visibility is checked from the driver, not the page --------- */
async function checkFocus(page, rel) {
  const handles = await page.$$("a[href], button:not([disabled])");
  const sample = handles.slice(0, 6);
  for (const h of sample) {
    try {
      if (!(await h.isVisible())) continue;
      const before = await h.evaluate((el) => {
        const c = getComputedStyle(el);
        return c.outlineWidth + "|" + c.boxShadow + "|" + c.backgroundColor + "|" + c.color + "|" + c.borderColor;
      });
      await h.focus();
      const after = await h.evaluate((el) => {
        const c = getComputedStyle(el);
        return c.outlineWidth + "|" + c.boxShadow + "|" + c.backgroundColor + "|" + c.color + "|" + c.borderColor;
      });
      if (before === after) {
        const label = (await h.evaluate((el) => (el.textContent || "").trim().slice(0, 30))) || "(no text)";
        note("focus", `${rel}: "${label}" looks identical when focused — a keyboard user cannot see where they are`);
        return;
      }
    } catch (_) { /* element went away; not a finding */ }
  }
}

async function run() {
  const browser = await chromium.launch();
  const list = pages();
  let checked = 0;

  // one context and one page per viewport, reused across every URL —
  // building 130 contexts costs more than the checks themselves
  for (const vp of WIDTHS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();

    // Every page links Google Fonts. Chromium's CONNECT to fonts.googleapis.com
    // is refused by the egress gateway, and Chromium spends thirteen seconds
    // discovering that before it will fire domcontentloaded — four hundred
    // times a run, and occasionally long enough to trip the timeout and report
    // a page as failing to load when nothing is wrong with it.
    //
    // Refusing the request outright removes the wait and makes the run
    // deterministic. It does not restore the typefaces: they were never
    // arriving. See the caveat printed with the results.
    await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());

    let errors = [];
    page.on("pageerror", (e) => errors.push(String(e.message).slice(0, 120)));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push("console: " + m.text().slice(0, 120));
    });

    for (const file of list) {
      const rel = path.relative(ROOT, file);
      const url = "file://" + file;
      errors = [];

      try {
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
        await page.waitForTimeout(120);
        const r = await page.evaluate(PROBE);

        for (const e of errors) {
          // a font that cannot load over file:// is the harness, not the site
          if (/fonts\.googleapis|fonts\.gstatic|ERR_|net::/i.test(e)) continue;
          note("script", `${rel} [${vp.name}] threw: ${e}`);
        }
        for (const o of r.overflow) {
          note("overflow", `${rel} [${vp.name}]: <${o.tag} class="${o.cls}"> runs to ${o.right}px in a ${o.viewport}px viewport — the page scrolls sideways`);
        }
        if (vp.name === "desktop") {
          for (const c of r.contrast) {
            note("contrast", `${rel}: ${c.tag}.${c.cls || "-"} "${c.text}" is ${c.got}:1 on ${c.bg} at ${c.size}px — AA needs ${c.need}:1`);
          }
          for (const t of r.targets) {
            note("targets", `${rel}: <${t.tag}> "${t.text}" is ${t.w}×${t.h}px — WCAG 2.2 AA wants 24×24`);
          }
          if (r.i18n && r.i18n.hasSwitcher && r.i18n.translatable === 0) {
            note("i18n", `${rel}: the language switcher is on the page but nothing carries data-i18n — picking a language changes nothing`);
          }
        }
        if (vp.name === "desktop") await checkFocus(page, rel);
      } catch (err) {
        note("load", `${rel} [${vp.name}] failed to load: ${String(err.message).slice(0, 100)}`);
      }
      checked++;
    }
    await ctx.close();
    process.stdout.write(`  ${vp.name} done (${checked}/${list.length * WIDTHS.length})\n`);
  }

  await browser.close();

  const bySection = new Map();
  for (const f of findings) {
    if (!bySection.has(f.section)) bySection.set(f.section, []);
    bySection.get(f.section).push(f.msg);
  }
  console.log(`\n${list.length} pages rendered at ${WIDTHS.length} widths`);
  console.log("Web fonts are blocked to this session, so text was measured in the\nfallback stacks. Sizes and overflow are indicative where a webfont differs\nin metrics; contrast and structure are unaffected.\n");
  for (const [section, msgs] of [...bySection].sort()) {
    console.log(`${section} — ${msgs.length}`);
    const unique = [...new Set(msgs)];
    for (const m of unique.slice(0, 25)) console.log("   · " + m);
    if (unique.length > 25) console.log(`   · … and ${unique.length - 25} more`);
    console.log();
  }
  console.log("total findings: " + findings.length);
  process.exit(findings.length ? 1 : 0);
}

run().catch((e) => { console.error(e); process.exit(2); });
