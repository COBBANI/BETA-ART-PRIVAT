---
name: beta-photo-deploy
description: >
  Deploy the BETA PHOTO site to Vercel. Use whenever the user says "deploy",
  "yayınla", "canlıya al", "Vercel'e gönder", "push to production", or asks
  to publish changes to the live BETA PHOTO site.
---

# beta-photo-deploy

BETA PHOTO is a static site deployed to Vercel from the `beta-photo/` subdirectory
of the `andersenbetul-alt/BETA-ART` repository.

## Deploy flow

Changes flow through git → Vercel. The steps are:

### 1. Commit and push to the feature branch

```bash
cd /home/user/BETA-ART
git add beta-photo/
git commit -m "feat(beta-photo): <describe change>"
git push -u origin claude/beta-art-dosyalari-sa1f9e
```

If the branch's PR is already merged, start from the default branch:
```bash
git fetch origin main
git checkout -B claude/beta-art-dosyalari-sa1f9e origin/main
# make changes, then:
git add beta-photo/ && git commit -m "..." && git push -u origin claude/beta-art-dosyalari-sa1f9e
```

### 2. Merge to main via PR

Create a PR from `claude/beta-art-dosyalari-sa1f9e` → `main` using the
GitHub MCP tools (`mcp__github__create_pull_request`). After review/merge,
Vercel picks up `main` automatically **only if** the GitHub integration is
connected.

### 3. Trigger Vercel deploy

**Option A — GitHub integration (automatic):**  
If Vercel is linked to the GitHub repo, every push to `main` auto-deploys.
Check connection status in Vercel dashboard → project settings.

**Option B — Vercel MCP (manual trigger):**  
Use `mcp__Vercel__deploy_to_vercel` or `mcp__Vercel__list_deployments` to
check current deployment status and trigger a new one.

**Option C — Vercel CLI (if available):**  
```bash
cd /home/user/BETA-ART/beta-photo
vercel --prod
```

## What gets deployed

`beta-photo/vercel.json` configures:
- `cleanUrls: true` — `/index` serves `index.html` without extension
- `trailingSlash: false` — canonical URLs without trailing slash
- Security headers on all routes (X-Content-Type-Options, X-Frame-Options, Referrer-Policy)

The entire `beta-photo/` directory is the deployment root. Files at deploy time:
- `index.html`, `sell.html`, `admin.html`
- `styles.css`, `app.js`
- `vercel.json`

## Pre-deploy checklist

```bash
cd /home/user/BETA-ART

# 1. Run QBLOGG check (also validates beta-photo links if they're referenced)
npm run check

# 2. Start beta-photo server and smoke-test
python3 -m http.server 8001 --directory beta-photo &
SRV=$!
sleep 1
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8001/
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8001/sell.html
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8001/admin.html
kill $SRV

# 3. Quick visual check (see /run-beta-photo for full driver)
node -e "
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox','--disable-dev-shm-usage'] });
  const p = await b.newPage();
  await p.setViewportSize({width:1280,height:900});
  await p.goto('http://localhost:8001/', {waitUntil:'networkidle'});
  await p.screenshot({path:'/tmp/bp-predeploy.png'});
  console.log('screenshot: /tmp/bp-predeploy.png');
  await b.close();
})().catch(e => { console.error(e.message); process.exit(1); });
" 2>/dev/null || echo 'start server first'
```

## Gotchas

- **Admin page is noindex.** `admin.html` has `<meta name="robots" content="noindex,nofollow">`.
  Do NOT add it to any sitemap or link to it from nav.
- **No build step.** Files are served as-is. No bundling, no minification.
  What you see in `beta-photo/` is exactly what Vercel serves.
- **CSP / connect-src.** If adding a new external API call (analytics, payment,
  newsletter), add the domain to `vercel.json` → `headers` → `Content-Security-Policy`'s
  `connect-src` — otherwise the request is silently blocked.
- **Vercel GitHub auth.** As of 2026-09, Vercel's GitHub integration is connected
  to `betulandersen-droid`, not `andersenbetul-alt`. Pushes to `andersenbetul-alt/BETA-ART`
  may not auto-trigger deploys. Verify in Vercel dashboard.
