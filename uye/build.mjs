// Generate only the public membership client. No dependencies or remote fetches.
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('./', import.meta.url);
const out = new URL('dist/', root);
const supabaseUrl = process.env.UYE_SUPABASE_URL?.trim() || '';
const supabaseAnonKey = process.env.UYE_SUPABASE_PUBLISHABLE_KEY?.trim()
  || process.env.UYE_SUPABASE_ANON_KEY?.trim() || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Set UYE_SUPABASE_URL and UYE_SUPABASE_PUBLISHABLE_KEY (or UYE_SUPABASE_ANON_KEY) in the Vercel project environment.');
}

const url = new URL(supabaseUrl);
if (url.protocol !== 'https:' || !/^[a-z0-9-]+\.supabase\.co$/.test(url.hostname)
    || url.port || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
  throw new Error('UYE_SUPABASE_URL must be an HTTPS Supabase project origin allowed by the membership CSP.');
}

let publicKey = /^sb_publishable_[a-zA-Z0-9_-]+$/.test(supabaseAnonKey);
if (!publicKey && /^[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$/.test(supabaseAnonKey)) {
  try {
    // Classify legacy keys; Supabase verifies their signature on each request.
    const claims = JSON.parse(Buffer.from(supabaseAnonKey.split('.')[1], 'base64url').toString('utf8'));
    publicKey = claims.role === 'anon'
      && (!claims.ref || claims.ref === url.hostname.split('.')[0]);
  } catch { /* Invalid keys are rejected below without printing their value. */ }
}
if (!publicKey) {
  throw new Error('Only a publishable key or legacy anon key may be shipped to the browser. Never use a secret or service_role key.');
}

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const path of ['index.html', 'app.js', 'lib']) {
  await cp(new URL(path, root), new URL(path, out), { recursive: true });
}
await writeFile(new URL('config.js', out),
  '// Public client configuration generated at build time.\nwindow.UYE_CONFIG = '
  + JSON.stringify({ supabaseUrl: url.origin, supabaseAnonKey }, null, 2) + ';\n');
console.log(`Membership client built: ${fileURLToPath(out)}`);
