import { createClient } from 'npm:@supabase/supabase-js@2.45.4';
import { z } from 'npm:zod@3.23.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}

const requestSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(320),
  company: z.string().trim().max(160).nullable().optional(),
  catalogue: z.string().trim().min(3).max(32),
  licenseType: z.enum(['personal', 'commercial', 'extended', 'custom']),
  territory: z.string().trim().min(2).max(160),
  duration: z.string().trim().min(2).max(120),
  media: z.string().trim().min(2).max(240),
  campaignType: z.string().trim().max(160).nullable().optional(),
  estimatedReach: z.string().trim().max(120).nullable().optional(),
  exclusivityRequested: z.boolean().default(false),
  intendedUse: z.string().trim().min(10).max(2500),
  website: z.string().max(0).optional(),
});

async function sha256(value: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function clientIp(req: Request) {
  const cf = req.headers.get('cf-connecting-ip');
  if (cf) return cf.trim();
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  return 'unknown';
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);

  const url = Deno.env.get('SUPABASE_URL');
  const serviceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const salt = Deno.env.get('LICENSE_RATE_LIMIT_SALT') || serviceRole?.slice(0, 32);
  if (!url || !serviceRole || !salt) return json({ error: 'server_configuration' }, 500);

  let body: unknown;
  try { body = await req.json(); }
  catch { return json({ error: 'invalid_json' }, 400); }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) return json({ error: 'invalid_request', issues: parsed.error.issues.map((i) => i.message) }, 400);
  if (parsed.data.website) return json({ ok: true }); // Honeypot: silently accept bot traffic.

  const admin = createClient(url, serviceRole, { auth: { persistSession: false, autoRefreshToken: false } });
  const fingerprint = await sha256(`${salt}|${clientIp(req)}`);
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count, error: countError } = await admin.from('license_requests')
    .select('id', { count: 'exact', head: true })
    .eq('request_fingerprint', fingerprint)
    .gte('created_at', oneHourAgo);
  if (countError) return json({ error: 'rate_limit_check_failed' }, 500);
  if ((count ?? 0) >= 5) return json({ error: 'rate_limited' }, 429);

  const v = parsed.data;
  const { error } = await admin.from('license_requests').insert({
    name: v.name,
    email: v.email.toLowerCase(),
    company: v.company || null,
    catalogue: v.catalogue.toUpperCase(),
    license_type: v.licenseType,
    territory: v.territory,
    duration: v.duration,
    media: v.media,
    campaign_type: v.campaignType || null,
    estimated_reach: v.estimatedReach || null,
    exclusivity_requested: v.exclusivityRequested,
    intended_use: v.intendedUse,
    request_fingerprint: fingerprint,
  });
  if (error) return json({ error: 'insert_failed' }, 500);

  return json({ ok: true });
});
