import { describe, expect, it } from 'vitest';
import type { Plate } from '../types';
import { canPublishPlate, publicPlateFilter } from './publish';

const base: Plate = {
  id: '1', slug: 'test', catalogue: 'BA-001', title: 'Test', description: null,
  location: null, captureDate: null, camera: null, lens: null, exposure: null,
  priceNok: 190, image: '/placeholder.svg', imageStoragePath: 'x/image.jpg',
  rawStoragePath: 'x/raw.dng', alt: 'Test', published: false, publishedAt: null,
  verificationStatus: 'verified', verifiedAt: '2026-01-01T00:00:00Z', rawVerified: true,
  captureRecordVerified: true, photographerVerified: true,
  rawChecksum: 'rawhash', imageChecksum: 'imagehash', provenanceHash: 'recordhash', exif: {},
  photographerId: 'p1', photographerName: 'Photographer', photographerIdentityVerifiedAt: '2026-01-01T00:00:00Z',
};

describe('publication gate', () => {
  it('allows a complete verified record to become publishable', () => {
    expect(canPublishPlate(base)).toBe(true);
  });

  it.each([
    ['verification status', { verificationStatus: 'pending' as const }],
    ['RAW verification', { rawVerified: false }],
    ['capture record', { captureRecordVerified: false }],
    ['photographer verification', { photographerVerified: false }],
    ['RAW checksum', { rawChecksum: null }],
    ['image checksum', { imageChecksum: null }],
    ['provenance hash', { provenanceHash: null }],
  ])('blocks when %s is missing', (_name, patch) => {
    expect(canPublishPlate({ ...base, ...patch })).toBe(false);
  });

  it('requires published=true for public visibility', () => {
    expect(publicPlateFilter(base)).toBe(false);
    expect(publicPlateFilter({ ...base, published: true })).toBe(true);
  });
});
