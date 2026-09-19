import test from "node:test";
import assert from "node:assert/strict";
import { readFile, writeFile, readdir, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import {
  validateInventory,
  filterProjects,
  recordKind,
  isVerified,
  exportCsv,
  repositoryUrl,
} from "../data.mjs";

const root = new URL("../", import.meta.url);
const data = JSON.parse(await readFile(new URL("projects.json", root), "utf8"));

test("inventory retains unique archive IDs and rejects ambiguous records", () => {
  assert.equal(validateInventory(data), data);
  assert.throws(
    () =>
      validateInventory({
        ...data,
        projects: [...data.projects, data.projects[0]],
      }),
    /Duplicate archive ID/,
  );
  assert.throws(
    () =>
      validateInventory({
        ...data,
        projects: [{ archiveId: "NEW-001", name: "Example" }],
      }),
    /status/,
  );
});

test("historical names and unverified statuses cannot become verified deployments", () => {
  const project = { ...data.projects[0], status: "verified" };
  assert.equal(isVerified(project, data.canonicalWorkspace), false);
  assert.equal(recordKind(project, data.canonicalWorkspace), "historical");
  project.verification = {
    state: "verified",
    teamId: "wrong-team",
    projectId: "prj_example",
    checkedAt: "2026-09-07T14:00:00Z",
    deploymentUrl: "https://example.vercel.app",
  };
  assert.equal(isVerified(project, data.canonicalWorkspace), false);
  project.verification.teamId = data.canonicalWorkspace.teamId;
  assert.equal(isVerified(project, data.canonicalWorkspace), true);
  project.verification.deploymentUrl = "javascript:alert(1)";
  assert.equal(isVerified(project, data.canonicalWorkspace), false);
});

test("search combines terms and applies status and kind filters", () => {
  assert.deepEqual(
    filterProjects(data, { query: "NAV-002 CONSULT" }).map((p) => p.archiveId),
    ["NAV-002"],
  );
  assert.deepEqual(
    filterProjects(data, { kind: "management" }).map((p) => p.archiveId),
    ["MASTER-001"],
  );
  assert.equal(filterProjects(data, { query: "does-not-exist" }).length, 0);
  assert.equal(
    filterProjects(data, { query: "NAV-002", kind: "management" }).length,
    0,
  );
  assert.equal(
    filterProjects(data, { status: "historical-record-only" }).length,
    data.projects.filter((p) => p.status === "historical-record-only").length,
  );
  assert.equal(repositoryUrl("javascript:alert(1)"), null);
  assert.equal(
    repositoryUrl("andersenbetul-alt/BETA-ART-PRIVAT"),
    "https://github.com/andersenbetul-alt/BETA-ART-PRIVAT",
  );
});

test("CSV handles commas, quotes, newlines and spreadsheet formulas", () => {
  const csv = exportCsv(
    [
      {
        ...data.projects[0],
        name: "=1+1",
        domain: 'a,"b"\nc',
        repository: "\t@SUM(1)",
      },
    ],
    data.canonicalWorkspace,
  );
  assert.ok(csv.startsWith("\uFEFF"));
  assert.ok(csv.includes('"\'=1+1"'));
  assert.ok(csv.includes('"\'\t@SUM(1)"'));
  assert.ok(csv.includes('"a,""b""\nc"'));
});

test("canonical numbers and legacy names resolve to the same preserved records", () => {
  for (const [number, id] of [["P-013", "WEB-001"], ["P-011", "NAV-001"], ["P-010", "NAV-002"]]) {
    const match = filterProjects(data, { query: number });
    assert.deepEqual(match.map((p) => p.archiveId), [id]);
    assert.deepEqual(filterProjects(data, { query: id }), match);
    assert.deepEqual(filterProjects(data, { query: `MASTER-${id}` }), match);
    const csv = exportCsv(match, data.canonicalWorkspace);
    assert.ok(csv.includes(`"${number}"`));
    assert.ok(csv.includes(`"${id}"`));
  }
  assert.deepEqual(filterProjects(data, { query: "HXI Music" }).map((p) => p.archiveId), ["HXI-001"]);
  for (const id of ["BET-001", "HXI-001", "NHP-001", "NPP-001", "MASTER-001"])
    assert.equal(data.projects.find((p) => p.archiveId === id).projectNumber, null);
  assert.equal(data.projects.length, 8);
  assert.equal(data.deploymentVerificationComplete, false);
  assert.equal(data.requestedVercelScope.access, "forbidden");
});

test("build is independent of cwd, excludes private inputs and removes stale output", async () => {
  const probe = new URL("private-build-probe.txt", root);
  try {
    await writeFile(probe, "This must never be deployed.");
    const build = () =>
      execFileSync(
        process.execPath,
        [fileURLToPath(new URL("build.mjs", root))],
        { cwd: tmpdir(), stdio: "pipe" },
      );
    build();
    await writeFile(new URL("dist/stale.html", root), "Old generated page");
    build();
    assert.deepEqual((await readdir(new URL("dist/", root))).sort(), [
      "app.mjs",
      "data.mjs",
      "index.html",
      "projects.json",
      "robots.txt",
      "styles.css",
    ]);
    const html = await readFile(new URL("dist/index.html", root), "utf8");
    assert.match(html, /src="\.\/app\.mjs"/);
    assert.doesNotMatch(html, /<script(?![^>]*\bsrc=)[^>]*>\s*\S/);
    assert.deepEqual(
      JSON.parse(await readFile(new URL("dist/projects.json", root), "utf8")),
      data,
    );
  } finally {
    await rm(probe, { force: true });
  }
});
