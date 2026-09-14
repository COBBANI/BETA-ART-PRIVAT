export type VerificationStatus = 'pending' | 'verified' | 'rejected';
export type UserRole = 'admin' | 'photographer' | 'viewer';
export type LicenseRequestStatus = 'new' | 'reviewing' | 'quoted' | 'terms_sent' | 'approved' | 'signed' | 'paid' | 'delivered' | 'licensed' | 'declined' | 'spam';
export type LicenseType = 'personal' | 'commercial' | 'extended' | 'custom';

export type Plate = {
  id: string;
  slug: string;
  catalogue: string;
  title: string;
  description: string | null;
  location: string | null;
  captureDate: string | null;
  camera: string | null;
  lens: string | null;
  exposure: string | null;
  priceNok: number;
  image: string;
  imageStoragePath: string | null;
  rawStoragePath: string | null;
  alt: string;
  published: boolean;
  publishedAt: string | null;
  verificationStatus: VerificationStatus;
  verifiedAt: string | null;
  rawVerified: boolean;
  captureRecordVerified: boolean;
  photographerVerified: boolean;
  rawChecksum: string | null;
  imageChecksum: string | null;
  provenanceHash: string | null;
  exif: Record<string, unknown> | null;
  photographerId: string | null;
  photographerName: string | null;
  photographerIdentityVerifiedAt: string | null;
};

export type PhotographerProfile = {
  id: string;
  displayName: string | null;
  role: UserRole;
  identityVerifiedAt: string | null;
};

export type ProvenanceEvent = {
  id: string;
  eventType: string;
  rawChecksum: string | null;
  imageChecksum: string | null;
  recordHash: string | null;
  createdAt: string;
  notes: string | null;
};

export type LicenseTier = {
  id: LicenseType;
  name: string;
  price: string;
  summary: string;
  permitted: string[];
  notPermitted: string[];
};

export type LicenseRequest = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  catalogue: string;
  licenseType: LicenseType;
  territory: string;
  duration: string;
  media: string;
  campaignType: string | null;
  estimatedReach: string | null;
  exclusivityRequested: boolean;
  intendedUse: string;
  status: LicenseRequestStatus;
  quoteAmountNok: number | null;
  adminNotes: string | null;
  termsSummary: string | null;
  quotedAt: string | null;
  approvedAt: string | null;
  signedAt: string | null;
  paidAt: string | null;
  deliveredAt: string | null;
  licensedAt: string | null;
  createdAt: string;
};
