import { useCallback, useEffect, useMemo, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { canPublishPlate } from '../lib/publish';
import {
  createPlate,
  fetchAdminPlates,
  fetchLicenseRequests,
  fetchPhotographers,
  invokeVerificationAction,
  updateLicenseRequest,
  updatePlateMetadata,
  uploadPlateAsset,
} from '../services/archive';
import type { LicenseRequest, LicenseRequestStatus, PhotographerProfile, Plate } from '../types';
import { usePageMeta } from '../hooks/usePageMeta';

const requestStatuses: LicenseRequestStatus[] = ['new', 'reviewing', 'quoted', 'terms_sent', 'approved', 'signed', 'paid', 'delivered', 'licensed', 'declined', 'spam'];

function slugify(value: string) {
  return value.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function AdminPage() {
  usePageMeta({ title: 'Admin | Beta Art', description: 'Protected Beta Art archive administration.', path: '/admin' });
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [plates, setPlates] = useState<Plate[]>([]);
  const [requests, setRequests] = useState<LicenseRequest[]>([]);
  const [photographers, setPhotographers] = useState<PhotographerProfile[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const selected = useMemo(() => plates.find((p) => p.id === selectedId) ?? null, [plates, selectedId]);

  const loadData = useCallback(async () => {
    const [p, r, ph] = await Promise.all([fetchAdminPlates(), fetchLicenseRequests(), fetchPhotographers()]);
    setPlates(p); setRequests(r); setPhotographers(ph);
    setSelectedId((current) => current && p.some((item) => item.id === current) ? current : p[0]?.id ?? null);
  }, []);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    let active = true;
    supabase.auth.getUser().then(async ({ data }) => {
      if (!active) return;
      setUser(data.user ?? null);
      if (data.user) {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).maybeSingle();
        if (!active) return;
        const resolvedRole = profile?.role ?? null;
        setRole(resolvedRole);
        if (resolvedRole === 'admin') await loadData();
      }
      if (active) setLoading(false);
    });
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => { active = false; subscription.subscription.unsubscribe(); };
  }, [loadData]);

  async function run(task: () => Promise<unknown>, success: string) {
    setError(null); setNotice(null);
    try { await task(); setNotice(success); await loadData(); }
    catch (e) { setError(e instanceof Error ? e.message : 'Operation failed.'); }
  }

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setError(null);
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') ?? '');
    const password = String(form.get('password') ?? '');
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) { setError(authError.message); return; }
    window.location.reload();
  }

  async function create(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const title = String(form.get('title') ?? '').trim();
    const catalogue = String(form.get('catalogue') ?? '').trim().toUpperCase();
    const slug = String(form.get('slug') ?? '').trim() || slugify(title);
    const priceNok = Number(form.get('priceNok') ?? 190);
    const photographerId = String(form.get('photographerId') ?? '') || null;
    await run(async () => { const id = await createPlate({ title, catalogue, slug, priceNok, photographerId }); setSelectedId(id); formElement.reset(); }, 'Plate created as pending and unpublished.');
  }

  async function saveMetadata(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!selected) return;
    const form = new FormData(event.currentTarget);
    await run(() => updatePlateMetadata(selected.id, {
      title: String(form.get('title') ?? ''), slug: String(form.get('slug') ?? ''), catalogue: String(form.get('catalogue') ?? ''),
      description: String(form.get('description') ?? '') || null, location: String(form.get('location') ?? '') || null,
      captureDate: String(form.get('captureDate') ?? '') || null, camera: String(form.get('camera') ?? '') || null,
      lens: String(form.get('lens') ?? '') || null, exposure: String(form.get('exposure') ?? '') || null,
      alt: String(form.get('alt') ?? '') || null, priceNok: Number(form.get('priceNok') ?? 190),
      photographerId: String(form.get('photographerId') ?? '') || null,
    }), 'Metadata saved. Verification status is not changed by metadata edits.');
  }

  async function upload(kind: 'image' | 'raw', file: File | null) {
    if (!selected || !file) return;
    await run(() => uploadPlateAsset(selected, kind, file), `${kind === 'raw' ? 'RAW original' : 'Delivered image'} uploaded. Re-verification is required.`);
  }

  if (loading) return <main className="page-shell"><p>Checking access…</p></main>;
  if (!supabase) return <main className="page-shell"><p className="eyebrow">Admin</p><h1>Supabase not configured.</h1><p>Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, apply the migrations and deploy the verify-plate Edge Function.</p></main>;
  if (!user) return <main className="page-shell"><p className="eyebrow">Admin</p><h1>Sign in</h1>{error && <p className="form-status error">{error}</p>}<form className="admin-login" onSubmit={signIn}><label>Email<input name="email" type="email" required /></label><label>Password<input name="password" type="password" required /></label><button className="button button-dark">Sign in</button></form></main>;
  if (role !== 'admin') return <main className="page-shell"><h1>Access denied</h1><p>This account is authenticated but does not have the admin role.</p><button className="button button-light" onClick={() => supabase.auth.signOut().then(() => window.location.reload())}>Sign out</button></main>;

  return (
    <main className="admin-shell">
      <div className="admin-title-row"><div><p className="eyebrow">Protected admin</p><h1>Archive verification</h1></div><button className="button button-light" onClick={() => supabase.auth.signOut().then(() => window.location.reload())}>Sign out</button></div>
      <div className="admin-security-note"><strong>Trust boundary:</strong> this UI cannot directly set verified or published fields. Sensitive actions call the admin-only Edge Function, and database constraints independently enforce the publication gate.</div>
      {notice && <p className="form-status success">{notice}</p>}{error && <p className="form-status error">{error}</p>}

      <section className="admin-create"><p className="eyebrow">New record</p><form className="admin-create-form" onSubmit={create}><label>Catalogue<input name="catalogue" placeholder="BA-013" required /></label><label>Title<input name="title" required /></label><label>Slug<input name="slug" placeholder="auto from title" /></label><label>Base price NOK<input name="priceNok" type="number" min="0" defaultValue="190" required /></label><label>Photographer<select name="photographerId" defaultValue={user.id}>{photographers.map((p) => <option key={p.id} value={p.id}>{p.displayName || p.id}{p.identityVerifiedAt ? ' ✓' : ''}</option>)}</select></label><button className="button button-dark">Create pending plate</button></form></section>

      <div className="admin-workspace">
        <aside className="admin-queue"><p className="eyebrow">Verification queue</p>{plates.map((plate) => <button key={plate.id} className={selectedId === plate.id ? 'admin-plate active' : 'admin-plate'} onClick={() => setSelectedId(plate.id)}><span>{plate.catalogue}</span><strong>{plate.title}</strong><em>{plate.published ? 'Published' : plate.verificationStatus}</em></button>)}</aside>
        <section className="admin-editor">
          {!selected ? <p>No plate selected.</p> : <>
            <div className="admin-editor-head"><div><p className="eyebrow">{selected.catalogue}</p><h2>{selected.title}</h2></div><span className={canPublishPlate(selected) ? 'gate good' : 'gate blocked'}>{canPublishPlate(selected) ? 'Publishable' : 'Blocked'}</span></div>

            <div className="gate-grid">
              <div><span>RAW</span><strong>{selected.rawVerified ? 'Verified' : 'Pending'}</strong><small>{selected.rawChecksum ? `${selected.rawChecksum.slice(0, 16)}…` : 'No server checksum'}</small></div>
              <div><span>Capture record</span><strong>{selected.captureRecordVerified ? 'Verified' : 'Pending'}</strong><small>{selected.captureDate || selected.camera || selected.lens ? 'Metadata present' : 'No capture metadata'}</small></div>
              <div><span>Maker identity</span><strong>{selected.photographerVerified ? 'Verified' : 'Pending'}</strong><small>{selected.photographerName || selected.photographerId || 'No photographer'}</small></div>
              <div><span>Delivered image</span><strong>{selected.imageChecksum ? 'Hashed' : 'Pending'}</strong><small>{selected.imageChecksum ? `${selected.imageChecksum.slice(0, 16)}…` : 'No server checksum'}</small></div>
              <div><span>Provenance record</span><strong>{selected.provenanceHash ? 'Sealed' : 'Pending'}</strong><small>{selected.provenanceHash ? `${selected.provenanceHash.slice(0, 16)}…` : 'No record hash'}</small></div>
              <div><span>Publication</span><strong>{selected.published ? 'Public' : 'Private'}</strong><small>{selected.publishedAt ? new Date(selected.publishedAt).toLocaleString() : 'Not published'}</small></div>
            </div>

            <div className="asset-grid">
              <label>Delivered image<input type="file" accept="image/jpeg,image/png,image/webp,image/tiff" onChange={(e) => void upload('image', e.target.files?.[0] ?? null)} /><small>{selected.imageStoragePath || 'No file uploaded'}</small></label>
              <label>RAW original<input type="file" accept=".dng,.nef,.cr2,.cr3,.arw,.raf,.orf,.rw2,image/x-adobe-dng" onChange={(e) => void upload('raw', e.target.files?.[0] ?? null)} /><small>{selected.rawStoragePath || 'No file uploaded'}</small></label>
            </div>

            <form className="metadata-form" onSubmit={saveMetadata} key={`${selected.id}-${selected.imageStoragePath}-${selected.rawStoragePath}`}>
              <div className="field-grid"><label>Catalogue<input name="catalogue" defaultValue={selected.catalogue} required /></label><label>Title<input name="title" defaultValue={selected.title} required /></label><label>Slug<input name="slug" defaultValue={selected.slug} required /></label><label>Base price NOK<input name="priceNok" type="number" min="0" defaultValue={selected.priceNok} required /></label><label>Photographer<select name="photographerId" defaultValue={selected.photographerId || ''}><option value="">Unassigned</option>{photographers.map((p) => <option key={p.id} value={p.id}>{p.displayName || p.id}{p.identityVerifiedAt ? ' ✓' : ''}</option>)}</select></label><label>Capture date<input name="captureDate" type="date" defaultValue={selected.captureDate || ''} /></label><label>Location<input name="location" defaultValue={selected.location || ''} /></label><label>Camera<input name="camera" defaultValue={selected.camera || ''} /></label><label>Lens<input name="lens" defaultValue={selected.lens || ''} /></label><label>Exposure<input name="exposure" defaultValue={selected.exposure || ''} /></label><label>Alt text<input name="alt" defaultValue={selected.alt || ''} /></label></div>
              <label>Description<textarea name="description" rows={4} defaultValue={selected.description || ''} /></label><button className="button button-light">Save metadata</button>
            </form>

            <div className="verification-actions">
              <div><p className="eyebrow">Identity</p><button className="button button-light" disabled={!selected.photographerId || Boolean(selected.photographerIdentityVerifiedAt)} onClick={() => void run(() => invokeVerificationAction({ action: 'verify-photographer', photographerId: selected.photographerId, notes: 'Identity verified by archive admin.' }), 'Photographer identity verified.')}>{selected.photographerIdentityVerifiedAt ? 'Photographer verified' : 'Verify photographer identity'}</button></div>
              <form onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const captureConfirmed = data.get('captureConfirmed') === 'on'; void run(() => invokeVerificationAction({ action: 'verify', plateId: selected.id, captureRecordConfirmed: captureConfirmed, notes: String(data.get('notes') || '') }), 'Plate verification completed and provenance record sealed.'); }}>
                <p className="eyebrow">Plate verification</p><label className="check-field"><input name="captureConfirmed" type="checkbox" required /> I reviewed the capture record against the supplied evidence.</label><label>Verification notes<textarea name="notes" rows={3} placeholder="Internal verification notes" /></label><button className="button button-dark" disabled={!selected.rawStoragePath || !selected.imageStoragePath}>Compute hashes & verify</button>
              </form>
              <div className="admin-action-row"><button className="button button-light danger" onClick={() => void run(() => invokeVerificationAction({ action: 'reject', plateId: selected.id, notes: 'Rejected by archive admin.' }), 'Plate rejected and unpublished.')}>Reject</button>{selected.published ? <button className="button button-light" onClick={() => void run(() => invokeVerificationAction({ action: 'unpublish', plateId: selected.id }), 'Plate unpublished.')}>Unpublish</button> : <button className="button button-dark" disabled={!canPublishPlate(selected)} onClick={() => void run(() => invokeVerificationAction({ action: 'publish', plateId: selected.id }), 'Plate published.')}>Publish</button>}</div>
            </div>
          </>}
        </section>
      </div>

      <section className="admin-requests"><p className="eyebrow">Licence workflow</p><h2>Requests & quotes</h2>{requests.length === 0 ? <p>No licence requests yet.</p> : <div className="request-list">{requests.map((request) => <article key={request.id} className="request-admin-card"><div><span>{request.catalogue}</span><strong>{request.name}</strong><a href={`mailto:${request.email}`}>{request.email}</a></div><p><b>{request.licenseType}</b> · {request.territory} · {request.duration} · {request.media}{request.exclusivityRequested ? ' · exclusivity requested' : ''}</p><blockquote>{request.intendedUse}</blockquote><form onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); void run(() => updateLicenseRequest(request.id, { status: String(data.get('status')) as LicenseRequestStatus, quoteAmountNok: data.get('quoteAmountNok') ? Number(data.get('quoteAmountNok')) : null, adminNotes: String(data.get('adminNotes') || '') || null, termsSummary: String(data.get('termsSummary') || '') || null }), 'Licence request updated.'); }}><label>Status<select name="status" defaultValue={request.status}>{requestStatuses.map((s) => <option key={s} value={s}>{s}</option>)}</select></label><label>Quote NOK<input name="quoteAmountNok" type="number" min="0" defaultValue={request.quoteAmountNok ?? ''} /></label><label>Terms summary<input name="termsSummary" defaultValue={request.termsSummary ?? ''} placeholder="Scope / territory / duration / restrictions" /></label><label>Admin notes<input name="adminNotes" defaultValue={request.adminNotes ?? ''} /></label><button className="button button-light">Save</button></form></article>)}</div>}</section>
    </main>
  );
}
