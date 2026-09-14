import { createClient } from 'npm:@supabase/supabase-js@2.45.4';
import { parse as parseExif } from 'npm:exifr@7.1.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}

async function sha256(input: ArrayBuffer | Uint8Array | string) {
  const bytes = typeof input === 'string' ? new TextEncoder().encode(input) : input instanceof Uint8Array ? input : new Uint8Array(input);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function stablePayload(value: Record<string, unknown>) {
  return JSON.stringify(Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b))));
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  const url = Deno.env.get('SUPABASE_URL');
  const serviceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !serviceRole) return json({ error: 'Server configuration missing' }, 500);

  const authorization = req.headers.get('Authorization') || '';
  const token = authorization.replace(/^Bearer\s+/i, '').trim();
  if (!token) return json({ error: 'Authentication required' }, 401);

  const admin = createClient(url, serviceRole, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: userData, error: userError } = await admin.auth.getUser(token);
  if (userError || !userData.user) return json({ error: 'Invalid session' }, 401);

  const { data: profile, error: profileError } = await admin.from('profiles').select('role').eq('id', userData.user.id).single();
  if (profileError || profile?.role !== 'admin') return json({ error: 'Admin role required' }, 403);

  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return json({ error: 'Invalid JSON' }, 400); }

  const action = String(body.action || '');
  const now = new Date().toISOString();

  if (action === 'verify-photographer') {
    const photographerId = String(body.photographerId || '');
    if (!photographerId) return json({ error: 'photographerId is required' }, 400);
    const { data: targetProfile, error: targetError } = await admin.from('profiles').select('id, role').eq('id', photographerId).maybeSingle();
    if (targetError || !targetProfile) return json({ error: 'Photographer profile not found' }, 404);
    if (!['photographer', 'admin'].includes(targetProfile.role)) return json({ error: 'Profile is not assigned a photographer role' }, 400);
    const method = 'manual_admin_review';
    const notes = String(body.notes || '') || null;
    const { error } = await admin.from('profiles').update({
      identity_verified_at: now,
      identity_verified_by: userData.user.id,
      identity_verification_method: method,
    }).eq('id', photographerId);
    if (error) return json({ error: error.message }, 400);
    const recordHash = await sha256(stablePayload({ action, photographerId, method, notes, verifiedAt: now, actorId: userData.user.id }));
    const { error: auditError } = await admin.from('identity_verification_events').insert({
      profile_id: photographerId, actor_id: userData.user.id, method, notes, record_hash: recordHash,
    });
    if (auditError) return json({ error: auditError.message }, 500);
    return json({ ok: true, action, photographerId, verifiedAt: now, recordHash });
  }

  const plateId = String(body.plateId || '');
  if (!plateId) return json({ error: 'plateId is required' }, 400);

  const { data: plate, error: plateError } = await admin.from('plates').select('*').eq('id', plateId).single();
  if (plateError || !plate) return json({ error: plateError?.message || 'Plate not found' }, 404);

  async function addEvent(eventType: string, recordHash: string, notes?: string | null, rawHash?: string | null, imageHash?: string | null, exif?: unknown) {
    const { error } = await admin.from('verification_events').insert({
      plate_id: plateId,
      event_type: eventType,
      actor_id: userData.user.id,
      raw_sha256: rawHash ?? plate.raw_sha256 ?? null,
      image_sha256: imageHash ?? plate.image_sha256 ?? null,
      exif_snapshot: exif ?? null,
      notes: notes || null,
      record_hash: recordHash,
    });
    if (error) throw error;
  }

  try {
    if (action === 'verify') {
      if (body.captureRecordConfirmed !== true) return json({ error: 'Capture record confirmation is required' }, 400);
      if (!plate.raw_storage_path || !plate.image_storage_path) return json({ error: 'RAW original and delivered image must be uploaded first' }, 400);
      if (!plate.photographer_id) return json({ error: 'Plate has no photographer identity' }, 400);

      const { data: photographer, error: photographerError } = await admin.from('profiles')
        .select('id, display_name, role, identity_verified_at')
        .eq('id', plate.photographer_id).single();
      if (photographerError || !photographer) return json({ error: 'Photographer profile not found' }, 400);
      if (photographer.role !== 'photographer' && photographer.role !== 'admin') return json({ error: 'Assigned profile is not a photographer' }, 400);
      if (!photographer.identity_verified_at) return json({ error: 'Photographer identity must be verified first' }, 400);

      const [{ data: rawBlob, error: rawError }, { data: imageBlob, error: imageError }] = await Promise.all([
        admin.storage.from('plate-raw').download(plate.raw_storage_path),
        admin.storage.from('plate-images').download(plate.image_storage_path),
      ]);
      if (rawError || !rawBlob) return json({ error: `RAW download failed: ${rawError?.message || 'unknown error'}` }, 400);
      if (imageError || !imageBlob) return json({ error: `Image download failed: ${imageError?.message || 'unknown error'}` }, 400);

      const [rawBuffer, imageBuffer] = await Promise.all([rawBlob.arrayBuffer(), imageBlob.arrayBuffer()]);
      const [rawHash, imageHash] = await Promise.all([sha256(rawBuffer), sha256(imageBuffer)]);

      let exifSnapshot: Record<string, unknown> | null = null;
      try {
        const exif = await parseExif(new Uint8Array(imageBuffer), {
          tiff: true, exif: true, gps: true, ifd0: true,
          pick: ['Make', 'Model', 'LensModel', 'DateTimeOriginal', 'ExposureTime', 'FNumber', 'ISO', 'FocalLength', 'latitude', 'longitude'],
        });
        if (exif && typeof exif === 'object') exifSnapshot = exif as Record<string, unknown>;
      } catch {
        // EXIF is supplemental evidence. Its absence never causes fabricated metadata.
      }

      const provenancePayload = {
        catalogue: plate.catalogue,
        title: plate.title,
        photographerId: plate.photographer_id,
        photographerIdentityVerifiedAt: photographer.identity_verified_at,
        rawStoragePath: plate.raw_storage_path,
        imageStoragePath: plate.image_storage_path,
        rawSha256: rawHash,
        imageSha256: imageHash,
        captureDate: plate.capture_date,
        location: plate.location,
        camera: plate.camera,
        lens: plate.lens,
        exposure: plate.exposure,
        exifSnapshot,
        verifiedAt: now,
      };
      const provenanceHash = await sha256(stablePayload(provenancePayload));

      const { error: updateError } = await admin.from('plates').update({
        verification_status: 'verified',
        raw_verified: true,
        capture_record_verified: true,
        photographer_verified: true,
        photographer_credit: photographer.display_name || null,
        raw_sha256: rawHash,
        image_sha256: imageHash,
        provenance_hash: provenanceHash,
        exif_snapshot: exifSnapshot,
        verified_at: now,
        verified_by: userData.user.id,
        published: false,
        published_at: null,
      }).eq('id', plateId);
      if (updateError) return json({ error: updateError.message }, 400);

      await addEvent('verified', provenanceHash, String(body.notes || '') || null, rawHash, imageHash, exifSnapshot);
      return json({ ok: true, action, rawSha256: rawHash, imageSha256: imageHash, provenanceHash, verifiedAt: now });
    }

    if (action === 'publish') {
      const complete = plate.verification_status === 'verified' && plate.raw_verified && plate.capture_record_verified &&
        plate.photographer_verified && plate.raw_storage_path && plate.image_storage_path && plate.raw_sha256 && plate.image_sha256 && plate.provenance_hash;
      if (!complete) return json({ error: 'Publication gate is incomplete' }, 400);
      const eventHash = await sha256(stablePayload({ action: 'publish', plateId, provenanceHash: plate.provenance_hash, at: now }));
      const { error } = await admin.from('plates').update({ published: true, published_at: now }).eq('id', plateId);
      if (error) return json({ error: error.message }, 400);
      await addEvent('published', eventHash, null);
      return json({ ok: true, action, publishedAt: now });
    }

    if (action === 'unpublish') {
      const eventHash = await sha256(stablePayload({ action: 'unpublish', plateId, at: now }));
      const { error } = await admin.from('plates').update({ published: false, published_at: null }).eq('id', plateId);
      if (error) return json({ error: error.message }, 400);
      await addEvent('unpublished', eventHash, null);
      return json({ ok: true, action });
    }

    if (action === 'reject') {
      const eventHash = await sha256(stablePayload({ action: 'reject', plateId, notes: String(body.notes || ''), at: now }));
      const { error } = await admin.from('plates').update({
        verification_status: 'rejected',
        raw_verified: false,
        capture_record_verified: false,
        photographer_verified: false,
        provenance_hash: null,
        verified_at: null,
        verified_by: null,
        published: false,
        published_at: null,
      }).eq('id', plateId);
      if (error) return json({ error: error.message }, 400);
      await addEvent('rejected', eventHash, String(body.notes || '') || null);
      return json({ ok: true, action });
    }

    return json({ error: 'Unknown action' }, 400);
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Verification service failed' }, 500);
  }
});
