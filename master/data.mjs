const statuses = {
  "historical-record-needs-scope-transfer-verification":
    "Hesap ve aktarım doğrulaması bekliyor",
  "separate-product-keep-isolated": "Ayrı ürün · hedef doğrulaması bekliyor",
  "historical-record-external-github-scope": "Kaynak deposuna erişim bekliyor",
  "historical-record-needs-relink": "Kaynak bağlantısı doğrulanmalı",
  "historical-vercel-record-current-github-repo-visible":
    "Depo kayıtlı · Vercel doğrulanmadı",
  "historical-record-only": "Tarihsel kayıt · doğrulama bekliyor",
  "source-created-ready-to-link": "Panel kaynağı hazır · yayın doğrulanmadı",
};
export function validateInventory(data) {
  if (
    !data ||
    !Array.isArray(data.projects) ||
    !data.canonicalWorkspace?.teamId ||
    !data.canonicalWorkspace?.name ||
    !data.canonicalWorkspace?.slug
  )
    throw new Error("Invalid inventory or missing target workspace");
  const ids = new Set(), references = new Set();
  for (const project of data.projects) {
    if (
      !project ||
      typeof project.archiveId !== "string" ||
      !project.archiveId.trim() ||
      typeof project.name !== "string" ||
      !project.name.trim() ||
      typeof project.status !== "string" ||
      !project.status.trim()
    )
      throw new Error("Every project needs an archive ID, name and status");
    if (ids.has(project.archiveId))
      throw new Error(`Duplicate archive ID: ${project.archiveId}`);
    ids.add(project.archiveId);
    for (const key of [
      "repository",
      "vercelProject",
      "domain",
      "notes",
      "rootDirectory",
      "projectNumber",
      "archiveName",
      "archiveReference",
      "previousName",
    ])
      if (project[key] != null && typeof project[key] !== "string")
        throw new Error(`Invalid ${key}`);
    if (project.projectNumber != null && !/^P-\d{3}$/.test(project.projectNumber))
      throw new Error("Invalid canonical project number");
    if (project.archiveReference != null) {
      if (!project.archiveReference.trim() || references.has(project.archiveReference))
        throw new Error("Missing or duplicate archive reference");
      references.add(project.archiveReference);
    }
  }
  return data;
}
// Historical names and successful Git statuses do not verify project mappings.
export function isVerified(project, workspace) {
  const e = project.verification;
  if (
    e?.state !== "verified" ||
    e.teamId !== workspace.teamId ||
    !/^prj_[A-Za-z0-9]+$/.test(e.projectId ?? "") ||
    !Number.isFinite(Date.parse(e.checkedAt ?? ""))
  )
    return false;
  try {
    const url = new URL(e.deploymentUrl);
    return url.protocol === "https:" && !url.username && !url.password;
  } catch {
    return false;
  }
}
export function recordKind(project, workspace) {
  if (project.archiveId === "MASTER-001") return "management";
  return isVerified(project, workspace) ? "verified" : "historical";
}
export function statusLabel(project, workspace) {
  return isVerified(project, workspace)
    ? "Vercel yayını doğrulandı"
    : (statuses[project.status] ?? "Doğrulama bekliyor");
}
const normalize = (value) =>
  String(value ?? "")
    .toLocaleLowerCase("tr-TR")
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/ı/g, "i");
export function filterProjects(
  data,
  { query = "", kind = "all", status = "all" } = {},
) {
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  return data.projects.filter(
    (p) =>
      terms.every((t) =>
        normalize(
          [p.archiveId, p.projectNumber, p.archiveReference, p.archiveName,
            p.name, p.previousName, p.repository, p.domain, p.vercelProject].join(" "),
        ).includes(t),
      ) &&
      (kind === "all" || recordKind(p, data.canonicalWorkspace) === kind) &&
      (status === "all" || p.status === status),
  );
}
export function repositoryUrl(repository) {
  return /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository ?? "")
    ? `https://github.com/${repository}`
    : null;
}
function csvCell(value) {
  let text = String(value ?? "");
  if (/^\s*[=+@-]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}
export function exportCsv(projects, workspace) {
  const fields = [
    "archiveReference",
    "projectNumber",
    "archiveId",
    "archiveName",
    "name",
    "previousName",
    "vercelProject",
    "repository",
    "rootDirectory",
    "domain",
  ];
  const rows = [
    [
      "Arşiv referansı",
      "Ana proje numarası",
      "Master kayıt kodu",
      "Güncel arşiv adı",
      "Proje",
      "Önceki ad",
      "Vercel adı (kayıt)",
      "Kaynak deposu",
      "Kök dizin (kayıt)",
      "Alan adı (kayıt)",
      "Doğrulama durumu",
    ],
  ];
  for (const p of projects)
    rows.push([...fields.map((k) => p[k]), statusLabel(p, workspace)]);
  return (
    "\uFEFF" +
    rows.map((row) => row.map(csvCell).join(",")).join("\r\n") +
    "\r\n"
  );
}
