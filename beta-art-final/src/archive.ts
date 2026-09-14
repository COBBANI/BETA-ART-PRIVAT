import type { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { plates as developmentPlates } from '../data/plates';
import type { LicenseRequest, LicenseRequestStatus, PhotographerProfile, Plate, ProvenanceEvent } from '../types';

const IMAGE_BUCKET = 'plate-images';
const RAW_BUCKET = 'plate-raw';
const signedUrlTtlSeconds = 60 * 60;

function requireSupabase() {
  if (!supabase) throw new Error('Supabase is not configured.');
  return supabase;
}

function unwrap<T>(data: T | null, error: PostgrestError | null): T {
  if (error) throw error;
  if (data == null) throw new Error('Expected data but received none.');
  return data;
}

async function signedImageUrl(path: string | null): Promise<string> {
  if (!path || !supabase) return '';
  const { data, error } = await supabase.storage.from(IMAGE_BUCKET).createSignedUrl(path, signedUrlTtlSeconds);
  if (error) return '';
  return data.signedUrl;
}

type PlateRow = Record<string, unknown>;

async function mapPlate(row: PlateRow): Promise<Plate> {
  const imageStoragePath = (row.image_storage_path as string | null) ?? null;
  const image = imageStoragePath ? await signedImageUrl(imageStoragePath) : '';
  const photographer = (row.photographer as { display_name?: string | null; identity_verified_at?: string | null } | null) ?? null;
  return {
    id: String(row.id),
    slug: String(row.slug),
    catalogue: String(row.catalogue),
    title: String(row.title),
    description: (row.description as string | null) ?? null,
    location: (row.location as string | null) ?? null,
    captureDate: (row.capture_date as string | null) ?? null,
    camera: (row.camera as string | null) ?? null,
    lens: (row.lens as string | null) ?? null,
    exposure: (row.exposure as string | null) ?? null,
    priceNok: Number(row.price_nok ?? 190),
    image,
    imageStoragePath,
    rawStoragePath: (row.raw_storage_path as string | null) ?? null,
    alt: (row.alt_text as string | null) ?? `Beta Art plate ${String(row.catalogue)}`,
    published: Boolean(row.published),
    publishedAt: (row.published_at as string | null) ?? null,
    verificationStatus: (row.verification_status as Plate['verificationStatus']) ?? 'pending',
    verifiedAt: (row.verified_at as string | null) ?? null,
    rawVerified: Boolean(row.raw_verified),
    captureRecordVerified: Boolean(row.capture_record_verified),
    photographerVerified: Boolean(row.photographer_verified),
    rawChecksum: (row.raw_sha256 as string | null) ?? null,
    imageChecksum: (row.image_sha256 as string | null) ?? null,
    provenanceHash: (row.provenance_hash as string | null) ?? null,
    exif: (row.exif_snapshot as Record<string, unknown> | null) ?? null,
    photographerId: (row.photographer_id as string | null) ?? null,
    photographerName: (row.photographer_credit as string | null) ?? photographer?.display_name ?? null,
    photographerIdentityVerifiedAt: photographer?.identity_verified_at ?? null,
  };
}

const publicPlateSelect = `
  id, slug, catalogue, title, description, location, capture_date, camera, lens, exposure,
  price_nok, image_storage_path, alt_text, published, published_at,
  verification_status, verified_at, raw_verified, capture_record_verified, photographer_verified,
  raw_sha256, image_sha256, provenance_hash, photographer_credit
`;

const adminPlateSelect = `
  id, slug, catalogue, title, description, location, capture_date, camera, lens, exposure,
  price_nok, image_storage_path, raw_storage_path, alt_text, published, published_at,
  verification_status, verified_at, raw_verified, capture_record_verified, photographer_verified,
  raw_sha256, image_sha256, provenance_hash, exif_snapshot, photographer_id, photographer_credit,
  photographer:profiles!plates_photographer_id_fkey(display_name, identity_verified_at)
`;

export async function fetchPublishedPlates(): Promise<Plate[]> {
  if (!supabase) {
    return import.meta.env.DEV || import.meta.env.VITE_ALLOW_PLACEHOLDERS === 'true' ? developmentPlates : [];
  }
  const { data, error } = await supabase
    .from('public_plate_records')
    .select(publicPlateSelect)
    .order('catalogue', { ascending: true });
  const rows = unwrap(data as PlateRow[] | null, error);
  return Promise.all(rows.map(mapPlate));
}

export async function fetchPublishedPlateBySlug(slug: string): Promise<Plate | null> {
  if (!supabase) return (import.meta.env.DEV || import.meta.env.VITE_ALLOW_PLACEHOLDERS === 'true') ? developmentPlates.find((plate) => plate.slug === slug) ?? null : null;
  const { data, error } = await supabase
    .from('public_plate_records')
    .select(publicPlateSelect)
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data ? mapPlate(data as PlateRow) : null;
}

export async function fetchAdminPlates(): Promise<Plate[]> {
  const client = requireSupabase();
  const { data, error } = await client.from('plates').select(adminPlateSelect).order('created_at', { ascending: false });
  const rows = unwrap(data as PlateRow[] | null, error);
  return Promise.all(rows.map(mapPlate));
}

export async function createPlate(input: {
  title: string;
  slug: string;
  catalogue: string;
  priceNok: number;
  photographerId?: string | null;
}): Promise<string> {
  const client = requireSupabase();
  const { data: auth } = await client.auth.getUser();
  const photographerId = input.photographerId || auth.user?.id || null;
  const { data, error } = await client
    .from('plates')
    .insert({
      title: input.title,
      slug: input.slug,
      catalogue: input.catalogue,
      price_nok: input.priceNok,
      photographer_id: photographerId,
    })
    .select('id')
    .single();
  return String(unwrap(data, error).id);
}

export async function updatePlateMetadata(plateId: string, input: Partial<{
  title: string;
  slug: string;
  catalogue: string;
  description: string | null;
  location: string | null;
  captureDate: string | null;
  camera: string | null;
  lens: string | null;
  exposure: string | null;
  alt: string | null;
  priceNok: number;
  photographerId: string | null;
}>): Promise<void> {
  const client = requireSupabase();
  const patch = {
    ...(input.title !== undefined ? { title: input.title } : {}),
    ...(input.slug !== undefined ? { slug: input.slug } : {}),
    ...(input.catalogue !== undefined ? { catalogue: input.catalogue } : {}),
    ...(input.description !== undefined ? { description: input.description } : {}),
    ...(input.location !== undefined ? { location: input.location } : {}),
    ...(input.captureDate !== undefined ? { capture_date: input.captureDate } : {}),
    ...(input.camera !== undefined ? { camera: input.camera } : {}),
    ...(input.lens !== undefined ? { lens: input.lens } : {}),
    ...(input.exposure !== undefined ? { exposure: input.exposure } : {}),
    ...(input.alt !== undefined ? { alt_text: input.alt } : {}),
    ...(input.priceNok !== undefined ? { price_nok: input.priceNok } : {}),
    ...(input.photographerId !== undefined ? { photographer_id: input.photographerId } : {}),
  };
  const { error } = await client.from('plates').update(patch).eq('id', plateId);
  if (error) throw error;
}

function safeName(name: string) {
  return name.normalize('NFKD').replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/-+/g, '-').toLowerCase();
}

export async function uploadPlateAsset(plate: Plate, kind: 'image' | 'raw', file: File): Promise<string> {
  const client = requireSupabase();
  const { data: auth } = await client.auth.getUser();
  if (!auth.user) throw new Error('Sign in before uploading.');
  const bucket = kind === 'image' ? IMAGE_BUCKET : RAW_BUCKET;
  const owner = plate.photographerId || auth.user.id;
  const path = `${owner}/${plate.id}/${Date.now()}-${safeName(file.name)}`;
  const { error: uploadError } = await client.storage.from(bucket).upload(path, file, {
    cacheControl: kind === 'image' ? '3600' : '0',
    contentType: file.type || undefined,
    upsert: false,
  });
  if (uploadError) throw uploadError;
  const column = kind === 'image' ? 'image_storage_path' : 'raw_storage_path';
  const { error: updateError } = await client.from('plates').update({ [column]: path }).eq('id', plate.id);
  if (updateError) throw updateError;
  return path;
}

export async function invokeVerificationAction(payload: Record<string, unknown>) {
  const client = requireSupabase();
  const { data, error } = await client.functions.invoke('verify-plate', { body: payload });
  if (error) throw error;
  if (data?.error) throw new Error(String(data.error));
  return data;
}

export async function fetchPublicProvenance(slug: string): Promise<ProvenanceEvent[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.rpc('get_plate_provenance', { p_slug: slug });
  if (error) throw error;
  return ((data ?? []) as Record<string, unknown>[]).map((row) => ({
    id: String(row.id),
    eventType: String(row.event_type),
    rawChecksum: (row.raw_sha256 as string | null) ?? null,
    imageChecksum: (row.image_sha256 as string | null) ?? null,
    recordHash: (row.record_hash as string | null) ?? null,
    createdAt: String(row.created_at),
    notes: (row.notes as string | null) ?? null,
  }));
}


export async function fetchPhotographers(): Promise<PhotographerProfile[]> {
  const client = requireSupabase();
  const { data, error } = await client.from('profiles').select('id, display_name, role, identity_verified_at').in('role', ['photographer', 'admin']).order('display_name', { ascending: true });
  const rows = unwrap(data as Record<string, unknown>[] | null, error);
  return rows.map((row) => ({
    id: String(row.id),
    displayName: (row.display_name as string | null) ?? null,
    role: row.role as PhotographerProfile['role'],
    identityVerifiedAt: (row.identity_verified_at as string | null) ?? null,
  }));
}

export async function fetchLicenseRequests(): Promise<LicenseRequest[]> {
  const client = requireSupabase();
  const { data, error } = await client.from('license_requests').select('*').order('created_at', { ascending: false });
  const rows = unwrap(data as Record<string, unknown>[] | null, error);
  return rows.map((row) => ({
    id: String(row.id), name: String(row.name), email: String(row.email), company: (row.company as string | null) ?? null,
    catalogue: String(row.catalogue), licenseType: row.license_type as LicenseRequest['licenseType'], territory: String(row.territory),
    duration: String(row.duration), media: String(row.media), campaignType: (row.campaign_type as string | null) ?? null,
    estimatedReach: (row.estimated_reach as string | null) ?? null, exclusivityRequested: Boolean(row.exclusivity_requested),
    intendedUse: String(row.intended_use), status: row.status as LicenseRequest['status'],
    quoteAmountNok: row.quote_amount_nok == null ? null : Number(row.quote_amount_nok),
    adminNotes: (row.admin_notes as string | null) ?? null,
    termsSummary: (row.terms_summary as string | null) ?? null,
    quotedAt: (row.quoted_at as string | null) ?? null, approvedAt: (row.approved_at as string | null) ?? null,
    signedAt: (row.signed_at as string | null) ?? null, paidAt: (row.paid_at as string | null) ?? null,
    deliveredAt: (row.delivered_at as string | null) ?? null, licensedAt: (row.licensed_at as string | null) ?? null,
    createdAt: String(row.created_at),
  }));
}

export async function updateLicenseRequest(id: string, patch: { status?: LicenseRequestStatus; quoteAmountNok?: number | null; adminNotes?: string | null; termsSummary?: string | null }) {
  const client = requireSupabase();
  const { error } = await client.from('license_requests').update({
    ...(patch.status !== undefined ? { status: patch.status } : {}),
    ...(patch.quoteAmountNok !== undefined ? { quote_amount_nok: patch.quoteAmountNok } : {}),
    ...(patch.adminNotes !== undefined ? { admin_notes: patch.adminNotes } : {}),
    ...(patch.termsSummary !== undefined ? { terms_summary: patch.termsSummary } : {}),
  }).eq('id', id);
  if (error) throw error;
}
