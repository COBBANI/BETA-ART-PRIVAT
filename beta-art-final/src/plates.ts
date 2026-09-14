import type { LicenseTier, Plate } from '../types';

const base: Omit<Plate, 'id' | 'slug' | 'catalogue' | 'title' | 'image' | 'alt'> = {
  description: null,
  location: null,
  captureDate: null,
  camera: null,
  lens: null,
  exposure: null,
  priceNok: 190,
  imageStoragePath: null,
  rawStoragePath: null,
  published: false,
  publishedAt: null,
  verificationStatus: 'pending',
  verifiedAt: null,
  rawVerified: false,
  captureRecordVerified: false,
  photographerVerified: false,
  rawChecksum: null,
  imageChecksum: null,
  provenanceHash: null,
  exif: null,
  photographerId: null,
  photographerName: null,
  photographerIdentityVerifiedAt: null,
};

const titles = [
  'First Light',
  'Into the Pines',
  'Sea of Fog',
  'Still Water',
  'PALM',
  'Blue Hour Grid',
  'Night Crossing',
  'Golden Hour',
  'Portrait in Amber',
  'The Maker',
  'Slow Morning',
  'Low Tide',
];

export const plates: Plate[] = titles.map((title, index) => {
  const number = String(index + 1).padStart(3, '0');
  return {
    ...base,
    id: `plate-${number}`,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    catalogue: `BA-${number}`,
    title,
    image: `/placeholders/plate-${number}.svg`,
    alt: `Development placeholder for ${title}; replace with verified original before publication`,
  };
});

export const licenses: LicenseTier[] = [
  {
    id: 'personal',
    name: 'Personal',
    price: 'from kr 190',
    summary: 'For private, non-commercial use by one licensee.',
    permitted: ['Personal website or profile', 'Private presentation', 'Personal print'],
    notPermitted: ['Paid advertising', 'Resale', 'Merchandise'],
  },
  {
    id: 'commercial',
    name: 'Commercial',
    price: 'from kr 790',
    summary: 'For business communication, editorial use and standard campaigns.',
    permitted: ['Company website', 'Editorial publication', 'Organic social media'],
    notPermitted: ['High-volume merchandise', 'Template resale', 'Exclusive use'],
  },
  {
    id: 'extended',
    name: 'Extended',
    price: 'from kr 2,900',
    summary: 'For broader campaigns, larger distribution and product applications.',
    permitted: ['Paid campaign use', 'Packaging', 'Large print runs'],
    notPermitted: ['Copyright transfer', 'Unmodified stock resale'],
  },
  {
    id: 'custom',
    name: 'Custom & Exclusive',
    price: 'quoted',
    summary: 'For exclusivity, unusual territories, long terms or custom commissions.',
    permitted: ['Negotiated exclusivity', 'Custom territory and term', 'Commissioned work'],
    notPermitted: ['Anything outside signed terms'],
  },
];
