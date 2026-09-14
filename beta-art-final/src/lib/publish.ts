import type { Plate } from '../types';

export function canPublishPlate(plate: Plate): boolean {
  return (
    plate.verificationStatus === 'verified' &&
    plate.rawVerified === true &&
    plate.captureRecordVerified === true &&
    plate.photographerVerified === true &&
    Boolean(plate.rawChecksum) &&
    Boolean(plate.imageChecksum) &&
    Boolean(plate.provenanceHash)
  );
}

export function publicPlateFilter(plate: Plate): boolean {
  return plate.published === true && canPublishPlate(plate);
}
