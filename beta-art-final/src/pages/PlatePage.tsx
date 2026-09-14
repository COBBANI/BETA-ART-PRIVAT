import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { canPublishPlate } from '../lib/publish';
import { LicenseRequestForm } from '../components/LicenseRequestForm';
import { fetchPublicProvenance, fetchPublishedPlateBySlug } from '../services/archive';
import type { Plate, ProvenanceEvent } from '../types';
import { usePageMeta } from '../hooks/usePageMeta';

function shortHash(value: string | null) {
  if (!value) return 'Not available';
  return `${value.slice(0, 12)}…${value.slice(-12)}`;
}

export function PlatePage() {
  const { slug = '' } = useParams();
  const [plate, setPlate] = useState<Plate | null>(null);
  const [events, setEvents] = useState<ProvenanceEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([fetchPublishedPlateBySlug(slug), fetchPublicProvenance(slug)]).then(([p, e]) => {
      if (!active) return;
      setPlate(p); setEvents(e);
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [slug]);

  const schema = useMemo(() => plate ? ({
    '@context': 'https://schema.org', '@type': 'ImageObject', name: plate.title,
    description: plate.description || `Verified human-made photograph ${plate.catalogue} in the Beta Art archive.`,
    identifier: plate.catalogue, dateCreated: plate.captureDate || undefined,
    creator: plate.photographerName ? { '@type': 'Person', name: plate.photographerName } : undefined,
    offers: { '@type': 'Offer', priceCurrency: 'NOK', price: plate.priceNok, availability: 'https://schema.org/InStock' },
  }) : null, [plate]);
  usePageMeta({
    title: plate ? `${plate.title} — ${plate.catalogue} | Beta Art` : 'Plate | Beta Art',
    description: plate?.description || (plate ? `Verified human-made photography, catalogue ${plate.catalogue}, with documented provenance and direct licensing.` : 'Beta Art plate record.'),
    path: `/plates/${slug}`,
    schema,
  });

  if (loading) return <main className="page-shell"><p>Loading plate…</p></main>;
  if (!plate) return <main className="page-shell"><h1>Plate not found</h1><p>This plate is unavailable or has not passed publication verification.</p><Link to="/">Return to archive</Link></main>;
  const verified = canPublishPlate(plate);

  return (
    <main className="plate-page">
      <div className="plate-detail-image">{plate.image ? <img src={plate.image} alt={plate.alt} /> : <div className="image-unavailable detail" role="img" aria-label={plate.alt}>Image temporarily unavailable</div>}</div>
      <div className="plate-detail-copy">
        <p className="eyebrow">{plate.catalogue}</p>
        <h1>{plate.title}</h1>
        <p className="plate-status">{verified && plate.published ? 'Verified & published' : 'Not public'}</p>
        {plate.description && <p className="page-lead">{plate.description}</p>}
        <dl className="provenance-list">
          <div><dt>RAW original</dt><dd>{plate.rawVerified ? 'Verified' : 'Not verified'}</dd></div>
          <div><dt>Capture record</dt><dd>{plate.captureRecordVerified ? 'Verified' : 'Not verified'}</dd></div>
          <div><dt>Photographer</dt><dd>{plate.photographerVerified ? (plate.photographerName || 'Verified identity') : 'Not verified'}</dd></div>
          <div><dt>RAW SHA-256</dt><dd><code>{shortHash(plate.rawChecksum)}</code></dd></div>
          <div><dt>Image SHA-256</dt><dd><code>{shortHash(plate.imageChecksum)}</code></dd></div>
          <div><dt>Provenance hash</dt><dd><code>{shortHash(plate.provenanceHash)}</code></dd></div>
          <div><dt>Camera</dt><dd>{plate.camera ?? 'Not supplied'}</dd></div>
          <div><dt>Lens</dt><dd>{plate.lens ?? 'Not supplied'}</dd></div>
          <div><dt>Exposure</dt><dd>{plate.exposure ?? 'Not supplied'}</dd></div>
          <div><dt>Capture date</dt><dd>{plate.captureDate ?? 'Not supplied'}</dd></div>
          <div><dt>Location</dt><dd>{plate.location ?? 'Not supplied / withheld'}</dd></div>
          <div><dt>Verified at</dt><dd>{plate.verifiedAt ? new Date(plate.verifiedAt).toLocaleString() : 'Not supplied'}</dd></div>
        </dl>
        <p className="provenance-note">Unknown metadata remains unknown. Public provenance exposes hashes and verification events while the RAW original remains private.</p>

        {events.length > 0 && <section className="audit-public"><p className="eyebrow">Public provenance trail</p><ol>{events.map((event) => <li key={event.id}><div><strong>{event.eventType.replace(/_/g, ' ')}</strong><time>{new Date(event.createdAt).toLocaleString()}</time></div><code>{shortHash(event.recordHash)}</code></li>)}</ol></section>}
        <LicenseRequestForm defaultCatalogue={plate.catalogue} />
      </div>
    </main>
  );
}
