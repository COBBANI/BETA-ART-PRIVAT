# QBLOGG Vercel updates

The application at this repository's root is QBLOGG. A Vercel project serving
this application must use repository `andersenbetul-alt/BETA-ART-PRIVAT`, root
directory `.`, build command `bash scripts/vercel-build.sh`, and output `dist`.
The build uses only the supplied checkout; it never fetches a different branch
or repository during a deployment.

Connect the intended Vercel project to this repository through Vercel's native
Git integration. Set the production branch to `main`. Once that connection is
verified, pushes to the production branch trigger production builds, while
feature branches create previews under the project's deployment protection.
The `.github/workflows/vercel-source-checks.yml` workflow validates source on
pushes and pull requests. It does not establish the Vercel connection, upload a
deployment, or configure required checks on Vercel.

The `panel` and `uye` directories are separate application roots. Their
JavaScript is loaded from local `app.js` files so the existing
`script-src 'self'` policy can remain in place. The root QBLOGG build does not
include these applications. The membership application still needs valid
Supabase configuration through `UYE_SUPABASE_URL` and
`UYE_SUPABASE_PUBLISHABLE_KEY` (or `UYE_SUPABASE_ANON_KEY`). It now builds with
`node build.mjs` and publishes `dist`; missing or privileged keys stop the build.
See [membership setup](uye-sistemi.md). The content panel still needs its intended access
protection and an authorized GitHub account.

Before accepting a migration, verify the Vercel team, project, root directory,
access protection and deployed commit; then inspect the deployment result and
test the intended routes. Historical GitHub deployment statuses do not prove
that the current project settings or account access are correct.

Validation commands:

```bash
node scripts/check.mjs
node --test scripts/deployment.test.mjs
bash scripts/vercel-build.sh
node --check panel/app.js
node --check uye/app.js
```

Platform behavior: https://vercel.com/docs/git

## Review follow-up — 7 September 2026

The requested dashboard scope is `https://vercel.com/beta-art-master`; its team
ID and existing project links are not verified. `master/projects.json` records
the requested target separately from the connected, empty `bet-art` scope.
Do not reuse the connected scope ID as the target ID. The source dashboard
uses Root Directory `master`; the QBLOGG, panel, membership, and eve apps keep
their own roots.

The workflow has separate source, authentication, and browser jobs. The
authentication job installs the embedded app's frozen lockfile with pnpm
10.12.4 and runs unit tests, real-Redis integration tests, typecheck, and build.
The browser job runs Chromium against local copies served with the repository's
headers; GitHub and Supabase calls are mocked. It does not prove live provider
configuration, magic-link delivery, redirect allowlists, or RLS permissions.

Additional local checks:

```bash
node scripts/browser-smoke.mjs
cd agents/eve-chat-template
npm test
REDIS_TEST_URL=redis://127.0.0.1:6379 npm run test:redis
npm run typecheck
npm run build
```

Use an isolated local Redis instance for integration tests. Never point these
tests at a deployed operator's store. Configure Redis and Supabase in the
verified existing Vercel projects before a production rollout.
