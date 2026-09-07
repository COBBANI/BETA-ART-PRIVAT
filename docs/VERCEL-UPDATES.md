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
