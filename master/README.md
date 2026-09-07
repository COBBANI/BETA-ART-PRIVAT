# BETA ART Master · MASTER-001

Central inventory for `WEB-2026-000`. Existing archive IDs are preserved. The current
inventory is incomplete: historical project names are not verified Vercel mappings.
This static dashboard shows recorded evidence; it does not connect to the Vercel
API or transfer a project when opened.

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
| Team                  | VERSEL TEAM / `bet-art`             |
| Team ID               | `team_xNtowH7U0jXQrI53DFJFzH2o`     |
| Proposed project name | `beta-art-master`                   |
| Git repository        | `andersenbetul-alt/BETA-ART-PRIVAT` |
| Root Directory        | `master`                            |
| Production branch     | `main`                              |
| Framework             | Other                               |
| Build Command         | `node build.mjs`                    |
| Output Directory      | `dist`                              |
| Install Command       | Empty override; no dependencies     |

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
