import { Link } from 'react-router-dom';
import type { Plate } from '../types';
import { canPublishPlate } from '../lib/publish';

export function PlateCard({ plate }: { plate: Plate }) {
  const devRecord = !plate.published || !canPublishPlate(plate);
  return (
    <article className="plate-card">
      <Link to={`/plates/${plate.slug}`}>
        <div className="plate-image-wrap">
          {plate.image ? <img src={plate.image} alt={plate.alt} loading="lazy" decoding="async" /> : <div className="image-unavailable" role="img" aria-label={plate.alt}>Image temporarily unavailable</div>}
          {devRecord && <span className="pending-badge">Development / pending</span>}
        </div>
        <div className="plate-meta">
          <div>
            <h3>{plate.title}</h3>
            <p>{plate.location ?? 'Location not supplied'}</p>
          </div>
          <div className="plate-meta-right">
            <span>{plate.catalogue}</span>
            <strong>from kr {plate.priceNok.toLocaleString('no-NO')}</strong>
          </div>
        </div>
      </Link>
    </article>
  );
}
