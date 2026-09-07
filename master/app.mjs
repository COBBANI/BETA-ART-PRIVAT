import {
  validateInventory,
  isVerified,
  recordKind,
  statusLabel,
  filterProjects,
  repositoryUrl,
  exportCsv,
} from "./data.mjs";
const byId = (id) => document.getElementById(id);
const controls = ["search", "kind", "status", "export-json", "export-csv"];
let inventory;
function node(tag, value, className) {
  const el = document.createElement(tag);
  if (value != null) el.textContent = value;
  if (className) el.className = className;
  return el;
}
function filters() {
  return {
    query: byId("search").value,
    kind: byId("kind").value,
    status: byId("status").value,
  };
}
function dateLabel(date) {
  return Number.isFinite(Date.parse(date ?? ""))
    ? new Intl.DateTimeFormat("tr-TR", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(date))
    : "Kayıt yok";
}
function detailRow(label, value) {
  const dd = node("dd");
  if (value instanceof Node) dd.append(value);
  else dd.textContent = value ?? "Henüz doğrulanmadı";
  byId("detail-fields").append(node("dt", label), dd);
}
function showDetails(p) {
  byId("detail-id").textContent = p.archiveId;
  byId("detail-title").textContent = p.name;
  byId("detail-fields").replaceChildren();
  detailRow("Durum", statusLabel(p, inventory.canonicalWorkspace));
  detailRow(
    "Hedef takım",
    `${inventory.canonicalWorkspace.name} / ${inventory.canonicalWorkspace.slug}`,
  );
  detailRow("Vercel adı (kayıt)", p.vercelProject);
  detailRow("Vercel kimliği", p.verification?.projectId);
  const href = repositoryUrl(p.repository);
  if (href) {
    const link = node("a", p.repository);
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    detailRow("Kaynak deposu", link);
  } else
    detailRow(
      "Kaynak deposu",
      p.repository === "unverified" ? null : p.repository,
    );
  detailRow("Kök dizin (kayıt)", p.rootDirectory);
  detailRow("Alan adı (kayıt)", p.domain);
  detailRow("Kaynak sürümü", p.sourceCommit);
  detailRow("Yayın doğrulaması", dateLabel(p.verification?.checkedAt));
  detailRow(
    "Otomatik yayın",
    p.verification?.automaticUpdatesVerified === true &&
      isVerified(p, inventory.canonicalWorkspace)
      ? "Bir güncellemeyle doğrulandı"
      : "Henüz doğrulanmadı",
  );
  if (isVerified(p, inventory.canonicalWorkspace)) {
    const link = node("a", "Doğrulanmış yayını aç");
    link.href = p.verification.deploymentUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    detailRow("Yayın adresi", link);
  }
  byId("detail-notes").textContent =
    p.notes || "Bu proje için ek not kaydedilmedi.";
  byId("details").showModal();
}
function render() {
  if (!inventory) return;
  const projects = filterProjects(inventory, filters()),
    root = byId("projects");
  root.replaceChildren();
  for (const p of projects) {
    const card = node("article", null, "card"),
      title = node("h2", p.name);
    title.id = `title-${p.archiveId}`;
    card.setAttribute("aria-labelledby", title.id);
    const meta = node("div", null, "meta");
    meta.append(
      node("p", `Vercel kaydı: ${p.vercelProject || "Doğrulanmadı"}`),
      node(
        "p",
        `Depo: ${p.repository === "unverified" ? "Doğrulanmadı" : p.repository || "Kayıt yok"}`,
      ),
    );
    const button = node("button", "Ayrıntıları aç");
    button.type = "button";
    button.setAttribute("aria-label", `${p.name} ayrıntılarını aç`);
    button.addEventListener("click", () => showDetails(p));
    card.append(
      node("span", p.archiveId, "id"),
      title,
      meta,
      node("span", statusLabel(p, inventory.canonicalWorkspace), "badge"),
      button,
    );
    root.append(card);
  }
  if (!projects.length)
    root.append(node("p", "Bu filtrelere uygun kayıt bulunamadı.", "empty"));
  byId("result-count").textContent =
    `${inventory.projects.length} kayıttan ${projects.length} tanesi gösteriliyor.`;
  for (const id of ["export-json", "export-csv"])
    byId(id).disabled = projects.length === 0;
}
function download(format) {
  if (!inventory) return;
  const projects = filterProjects(inventory, filters());
  if (!projects.length) return;
  const content =
    format === "csv"
      ? exportCsv(projects, inventory.canonicalWorkspace)
      : JSON.stringify(
          {
            ...inventory,
            projects,
            export: {
              exportedAt: new Date().toISOString(),
              filters: filters(),
              count: projects.length,
            },
          },
          null,
          2,
        );
  const url = URL.createObjectURL(
    new Blob([content], {
      type:
        format === "csv"
          ? "text/csv;charset=utf-8"
          : "application/json;charset=utf-8",
    }),
  );
  const link = node("a");
  link.href = url;
  link.download = `WEB-2026-000-projeler-${new Date().toISOString().slice(0, 10)}.${format}`;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
async function load() {
  inventory = undefined;
  controls.forEach((id) => {
    byId(id).disabled = true;
  });
  byId("retry").disabled = true;
  byId("error").hidden = true;
  byId("projects").setAttribute("aria-busy", "true");
  byId("projects").replaceChildren();
  byId("summary").replaceChildren();
  byId("result-count").textContent = "Kayıtlar yükleniyor…";
  try {
    const response = await fetch("./projects.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Inventory unavailable");
    inventory = validateInventory(await response.json());
    const workspace = inventory.canonicalWorkspace;
    byId("workspace").textContent =
      `Hedef: ${workspace.name} / ${workspace.slug} · Üretim dalı: ${inventory.policy?.productionBranch || "Doğrulanmadı"}`;
    byId("inventory-state").textContent =
      inventory.sourceCollectionComplete === true
        ? "Kaynak toplama kaydı tamamlandı."
        : "Kaynak toplama ve aktarım devam ediyor.";
    byId("inventory-note").textContent =
      `Hedef takımda son kontrolde görülen proje: ${workspace.currentlyVisibleProjectCount ?? "Bilinmiyor"}. Tarihsel adlar ve kaynak kayıtları, doğrulanmış Vercel yayınlarından ayrı tutulur.`;
    const stats = [
      [inventory.projects.length, "Envanter kaydı"],
      [
        inventory.projects.filter((p) => isVerified(p, workspace)).length,
        "Doğrulanmış Vercel yayını",
      ],
      [
        inventory.projects.filter(
          (p) => recordKind(p, workspace) === "historical",
        ).length,
        "Doğrulama bekleyen proje",
      ],
    ];
    byId("summary").replaceChildren(
      ...stats.map(([count, label]) => {
        const el = node("div", null, "stat");
        el.append(node("strong", count), node("span", label));
        return el;
      }),
    );
    byId("checked-at").textContent =
      `Son hesap kontrolü: ${dateLabel(workspace.checkedAt)}. Bu panel kayıtlı envanteri gösterir; canlı Vercel bağlantısı değildir.`;
    const old = byId("status").value,
      all = node("option", "Tüm durumlar");
    all.value = "all";
    const options = [...new Set(inventory.projects.map((p) => p.status))].map(
      (status) => {
        const option = node(
          "option",
          statusLabel(
            inventory.projects.find((p) => p.status === status),
            workspace,
          ),
        );
        option.value = status;
        return option;
      },
    );
    byId("status").replaceChildren(all, ...options);
    byId("status").value = options.some((o) => o.value === old) ? old : "all";
    controls.forEach((id) => {
      byId(id).disabled = false;
    });
    render();
  } catch {
    byId("error").hidden = false;
    byId("result-count").textContent = "Kayıtlar yüklenemedi.";
  } finally {
    byId("retry").disabled = false;
    byId("projects").setAttribute("aria-busy", "false");
  }
}
byId("search").addEventListener("input", render);
byId("kind").addEventListener("change", render);
byId("status").addEventListener("change", render);
byId("export-json").addEventListener("click", () => download("json"));
byId("export-csv").addEventListener("click", () => download("csv"));
byId("retry").addEventListener("click", load);
load();
