import { useState } from 'react';
import { z } from 'zod';
import { supabase } from '../lib/supabase';
import type { LicenseType } from '../types';

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(320),
  company: z.string().trim().max(160).optional(),
  catalogue: z.string().trim().min(3).max(32),
  licenseType: z.enum(['personal', 'commercial', 'extended', 'custom']),
  territory: z.string().trim().min(2).max(160),
  duration: z.string().trim().min(2).max(120),
  media: z.string().trim().min(2).max(240),
  campaignType: z.string().trim().max(160).optional(),
  estimatedReach: z.string().trim().max(120).optional(),
  exclusivityRequested: z.boolean(),
  intendedUse: z.string().trim().min(10).max(2500),
  website: z.string().max(0).optional(),
});

export function LicenseRequestForm({ defaultCatalogue = '', defaultLicenseType = 'commercial' }: { defaultCatalogue?: string; defaultLicenseType?: LicenseType }) {
  const [status, setStatus] = useState<{ kind: 'idle' | 'sending' | 'success' | 'error'; message?: string }>({ kind: 'idle' });

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const parsed = schema.safeParse({
      name: data.get('name'), email: data.get('email'), company: data.get('company') || undefined,
      catalogue: data.get('catalogue'), licenseType: data.get('licenseType'), territory: data.get('territory'),
      duration: data.get('duration'), media: data.get('media'), campaignType: data.get('campaignType') || undefined,
      estimatedReach: data.get('estimatedReach') || undefined, exclusivityRequested: data.get('exclusivityRequested') === 'on',
      intendedUse: data.get('intendedUse'), website: data.get('website') || undefined,
    });
    if (!parsed.success) {
      setStatus({ kind: 'error', message: parsed.error.issues[0]?.message ?? 'Check the form.' });
      return;
    }
    if (!supabase) {
      setStatus({ kind: 'error', message: 'The licence service is not configured yet.' });
      return;
    }
    setStatus({ kind: 'sending' });
    const v = parsed.data;
    const { data: response, error } = await supabase.functions.invoke('submit-license-request', { body: {
      name: v.name, email: v.email, company: v.company || null, catalogue: v.catalogue,
      licenseType: v.licenseType, territory: v.territory, duration: v.duration, media: v.media,
      campaignType: v.campaignType || null, estimatedReach: v.estimatedReach || null,
      exclusivityRequested: v.exclusivityRequested, intendedUse: v.intendedUse, website: v.website || '',
    }});
    if (error || response?.error) {
      const message = response?.error === 'rate_limited' ? 'Too many requests were sent from this network. Please try again later.' : 'The request could not be sent. Please try again.';
      setStatus({ kind: 'error', message });
      return;
    }
    form.reset();
    setStatus({ kind: 'success', message: 'Request received. Scope, availability and price will be confirmed before any licence becomes effective.' });
  }

  return (
    <form className="request-form" onSubmit={submit} noValidate>
      <div className="form-intro"><p className="eyebrow">Licence request</p><h3>Describe the intended use.</h3><p>No licence is created by submitting this form. Final scope and price must be confirmed in writing.</p></div>
      <div className="field-grid">
        <label>Name<input name="name" autoComplete="name" required /></label>
        <label>Email<input name="email" type="email" autoComplete="email" required /></label>
        <label>Company<input name="company" autoComplete="organization" /></label>
        <label>Catalogue number<input name="catalogue" defaultValue={defaultCatalogue} placeholder="BA-001" required /></label>
        <label>Licence path<select name="licenseType" defaultValue={defaultLicenseType}><option value="personal">Personal</option><option value="commercial">Commercial</option><option value="extended">Extended</option><option value="custom">Custom / Exclusive</option></select></label>
        <label>Territory<input name="territory" placeholder="Norway / worldwide / named markets" required /></label>
        <label>Duration<input name="duration" placeholder="3 months / 1 year / perpetual request" required /></label>
        <label>Media / channels<input name="media" placeholder="Web, print, OOH, social, packaging…" required /></label>
        <label>Campaign / project type<input name="campaignType" placeholder="Editorial, brand campaign, report…" /></label>
        <label>Estimated reach<input name="estimatedReach" placeholder="Optional circulation / impressions" /></label>
      </div>
      <label className="check-field"><input name="exclusivityRequested" type="checkbox" /> Request exclusivity</label>
      <label>Intended use<textarea name="intendedUse" rows={6} minLength={10} maxLength={2500} required placeholder="Describe placement, audience, edits/crops, campaign context and anything unusual." /></label>
      <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <button className="button button-dark" disabled={status.kind === 'sending'}>{status.kind === 'sending' ? 'Sending…' : 'Send licence request'}</button>
      {status.kind !== 'idle' && status.kind !== 'sending' && <p className={`form-status ${status.kind}`}>{status.message}</p>}
    </form>
  );
}
