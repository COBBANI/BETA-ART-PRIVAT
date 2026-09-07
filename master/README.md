# BETA ART Master · MASTER-001

Central inventory for `WEB-2026-000`. Existing archive IDs are preserved. The current
inventory is incomplete: historical project names are not verified Vercel mappings.
This static dashboard shows recorded evidence; it does not connect to the Vercel
API or transfer a project when opened.

## Archive names and numbers

The original `archiveId` remains the stable Master record code. `archiveReference`
connects that record to the private archive directory. `projectNumber` records a
confirmed relationship to a canonical project family; it does not identify a
Vercel application. Names and earlier labels remain searchable and appear in exports.

| Master code | Canonical project | Family |
| --- | --- | --- |
| `WEB-001` | `P-013` | QBLOGG |
| `NAV-001` | `P-011` | NAVIAR Care |
| `NAV-002` | `P-010` | NAVIAR Consult |

Other mappings remain null until their source identities are verified. In
particular, the BETA ART group and HXI Music record must not be assigned to a
particular BETA ART or HXI application based on similar names. The complete private
directory is maintained separately; this public JSON contains only the existing
eight Master records and no private source inventory.

## Local checks

Requires Node.js 24; no package install or API credentials are needed.

```sh
node --test master/tests/dashboard.test.mjs
node master/build.mjs
python3 -m http.server 8080 --directory master/dist
```

Search and both filters apply to JSON and CSV downloads. Project text is rendered
as text, and CSV export neutralizes formula prefixes. A successful build validates
the inventory and copies only the six named public files into `master/dist`.
Source files, tests and unrelated repository products are excluded.

## Vercel target

| Setting               | Intended value                      |
| --------------------- | ----------------------------------- |
| Requested scope       | `beta-art-master` (access unresolved) |
| Currently visible team | VERSEL TEAM / `bet-art`             |
| Visible team ID        | `team_xNtowH7U0jXQrI53DFJFzH2o`     |
| Proposed project name | `beta-art-master`                   |
| Git repository        | `andersenbetul-alt/BETA-ART-PRIVAT` |
| Root Directory        | `master`                            |
| Production branch     | `main`                              |
| Framework             | Other                               |
| Build Command         | `node build.mjs`                    |
| Output Directory      | `dist`                              |
| Install Command       | Empty override; no dependencies     |

The latest requested dashboard URL is `https://vercel.com/beta-art-master`.
Project access in that scope returns 403, while the proposed project name returns
404 in the visible `bet-art` team. The CLI is logged out. These are separate
observations; the visible team is not assumed to own the requested scope.

The project name is proposed, not a confirmed Vercel project ID. Root Directory is
a Vercel project setting, not a `vercel.json` property. Do not use the repository
root for this dashboard: it is a separate QBLOGG application.

Complete source collection and preserve the existing access policy before linking
or publishing the dashboard. Configure Deployment Protection in Vercel to match
that policy; `robots.txt`, CSP and `noindex` are not authentication. Keep secrets,
private service configuration and private source inventories out of this public
repository and the dashboard JSON.

After source collection and project mapping are complete, connect the verified
target to this Git repository with Root Directory `master`. Vercel's native Git
integration then deploys production-branch updates and creates branch previews.
The `Master dashboard checks` workflow validates changes; it neither creates the
Vercel project nor configures a deployment gate. Verify a preview and a subsequent
source update before recording automatic publishing as complete.

Only add `verification.state = "verified"` after recording the actual destination
team ID, `prj_` project ID, HTTPS deployment URL and check date. Also record source
commit and end-to-end verification of the source update flow. Do not convert a
successful GitHub deployment status or a historical domain into that evidence.

Official references: [Git deployments](https://vercel.com/docs/git),
[project transfers](https://vercel.com/docs/projects/transferring-projects).
