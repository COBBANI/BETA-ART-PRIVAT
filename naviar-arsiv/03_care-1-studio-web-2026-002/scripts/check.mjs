import { readFile } from "node:fs/promises";
import { access } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const requiredFiles = [
  "index.html",
  "personvern.html",
  "styles.css",
  "app.js",
  "content/site-content.json",
  "brand/NAVIAR-CARE-001_master_candidate_v0.2.svg",
  "docs/CONCEPT.md",
  "docs/PLATFORM-DECISION.md",
  "docs/PROJECT-CARD.md",
  "docs/DECISION-LOG.md",
  "docs/CONTENT-GUIDE.md",
  "docs/SERVICE-BLUEPRINT.md",
  "docs/CMS-CONTENT-MODEL.md",
  "docs/ROADMAP.md",
  "docs/QA-REPORT.md",
  "vercel.json",
  "robots.txt"
];

const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

for (const file of requiredFiles) {
  try {
    await access(join(root, file));
  } catch {
    failures.push(`Missing file: ${file}`);
  }
}

const index = await readFile(join(root, "index.html"), "utf8");
const privacy = await readFile(join(root, "personvern.html"), "utf8");
const app = await readFile(join(root, "app.js"), "utf8");
const css = await readFile(join(root, "styles.css"), "utf8");
const content = JSON.parse(await readFile(join(root, "content/site-content.json"), "utf8"));

for (const [name, html] of [["index.html", index], ["personvern.html", privacy]]) {
  check(/<!doctype html>/i.test(html), `${name}: doctype missing`);
  check((html.match(/<h1\b/gi) || []).length === 1, `${name}: expected exactly one H1`);
  check(/<title>[^<]+<\/title>/i.test(html), `${name}: title missing`);
  check(/<meta name="viewport"/i.test(html), `${name}: viewport missing`);
  check(/<html[^>]+lang="[a-z-]+"/i.test(html), `${name}: html language missing`);
  check(!/<img(?![^>]+\balt=)[^>]*>/i.test(html), `${name}: image without alt text`);
  check(!/href="javascript:/i.test(html), `${name}: javascript href found`);
}

const i18nKeys = new Set([
  ...[...index.matchAll(/data-i18n="([^"]+)"/g)].map((match) => match[1]),
  ...[...index.matchAll(/data-i18n-placeholder="([^"]+)"/g)].map((match) => match[1]),
  ...[...index.matchAll(/data-i18n-aria-label="([^"]+)"/g)].map((match) => match[1]),
  ...[...privacy.matchAll(/data-i18n="([^"]+)"/g)].map((match) => match[1]),
  ...[...privacy.matchAll(/data-i18n-aria-label="([^"]+)"/g)].map((match) => match[1])
]);

for (const key of i18nKeys) {
  const keyCount = (app.match(new RegExp(`\\b${key}:`, "g")) || []).length;
  check(keyCount >= 3, `Translation key missing or incomplete: ${key}`);
}

check(/data-lang="nb"/.test(index) && /data-lang="en"/.test(index) && /data-lang="tr"/.test(index), "Language switcher is incomplete");
check(content.project.archiveId === "WEB-2026-002", "Content archive ID mismatch");
check(JSON.stringify(content.project.languages) === JSON.stringify(["nb", "en", "tr"]), "Content language order mismatch");
check(content.services.length === 4, "Expected four pilot services");
check(content.outOfScope.length >= 4, "Out-of-scope controls are incomplete");
check(/localStorage/.test(app), "Language preference behavior missing");
check(/preventDefault\(\)/.test(app), "Demo form must prevent external submission");
check(!/\b(fetch|XMLHttpRequest|sendBeacon)\b/.test(app), "Unexpected external data transport found");
check(/prefers-reduced-motion/.test(css), "Reduced motion rule missing");
check(/@media \(max-width: 780px\)/.test(css), "Mobile breakpoint missing");
check(/@media \(max-width: 420px\)/.test(css), "Small-screen breakpoint missing");

if (failures.length) {
  console.error(`FAIL — ${failures.length} check(s)`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`PASS — ${requiredFiles.length} required files, ${i18nKeys.size} translation keys, structural and safety checks complete.`);
