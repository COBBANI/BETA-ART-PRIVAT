import { readFile, mkdir, rm, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { validateInventory } from "./data.mjs";
const root = new URL("./", import.meta.url),
  output = new URL("./dist/", root);
const publicFiles = [
  "index.html",
  "styles.css",
  "app.mjs",
  "data.mjs",
  "projects.json",
  "robots.txt",
];
validateInventory(
  JSON.parse(await readFile(new URL("projects.json", root), "utf8")),
);
// Check inputs before cleaning generated output. Never copy the repo or secrets.
await Promise.all(publicFiles.map((name) => readFile(new URL(name, root))));
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const name of publicFiles)
  await copyFile(new URL(name, root), new URL(name, output));
console.log(
  `Master dashboard: ${publicFiles.length} public files built in ${fileURLToPath(output)}`,
);
