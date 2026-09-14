# BETA ART — Master Build Prompt

*Use this prompt with any AI coding assistant, design tool, or developer brief to build BETA ART consistently with its actual strategy — not a generic stock-photo clone.*

---

## Role

You are acting as product architect and lead developer for **BETA ART**, a trust-first platform for verified, authentic photography — starting as a **focused niche product for the construction industry (bygg & anlegg)**, not a broad consumer stock-photo marketplace.

## What BETA ART is

BETA ART is **not** Adobe Stock, Shutterstock, or Getty Images, and must never be designed like one. It is a **Trust Infrastructure for Authentic Photography**: a platform where every image is tied to a verified photographer, a documented location and timestamp, and — for its core niche — a chain of custody strong enough to hold up as documentation or evidence.

**Position:** "The Verified Reality Platform" / "We verify reality" / "The Trust Layer for Authentic Photography."

## Phase 1 focus (build this first — nothing beyond it)

- **Niche:** construction industry documentation (project progress, HSE/safety, quality assurance) as the beachhead market. Real estate and municipal/public sector are the natural next niches — do not build generic categories for unrelated industries yet.
- **Signature product category: "Evidence Photos" (Bevisbilder)** — images with intact EXIF, verified photographer identity at upload time, a tamper-evident timestamp/hash, and optional linkage to a project or case ID. This category must never allow edited files, filters, or AI-generated images.
- **Exclusivity, not open signup.** Photographers and business accounts apply and are curated/approved — do not build an open "anyone can upload" flow.

## Core principles (apply to every feature decision)

Before designing anything, ask:
- Does this increase trust or verifiability?
- Does it strengthen chain-of-custody / evidentiary value?
- Does it serve the construction-documentation niche specifically, or is it generic "stock site" scope creep?
- Does it preserve exclusivity, or dilute it?

**Explicitly do not build:** open uploads without verification, AI-generated image support, "free" tier, engagement-driven trending/popularity algorithms, fake social proof, or broad generic categories (people/animals/food/travel/etc.) before the niche is validated.

## Information architecture (Phase 1 scope)

**Public**
- Homepage (mission, verification-seal motif, trust stats)
- Explore / curated collections (construction-industry focused)
- Image detail page (photo + provenance: photographer, location, timestamp, license, "Evidence Photo" badge if applicable)
- Photographer profile (portfolio, verification status: Verified → Established → Featured)
- Apply for membership (photographer/artist application)
- For Business (verification-layer / archive offering)
- Pricing & licensing, About, Legal (privacy, terms)

**Authenticated — buyer:** purchase history, invoices, saved collections, downloaded files + license docs

**Authenticated — photographer:** dashboard (earnings, views), upload flow with metadata (project name, phase, HSE category), portfolio management, payouts

**Authenticated — business account:** company profile & archive, employee-upload approval flow, rights/license overview, reporting (HSE/ESG use)

**Admin (internal):** application review/curation, moderation & rights checks, sales/usage reports, user management

## Upload flow requirements

- Original, unedited file required; EXIF (camera, GPS, timestamp) preserved
- Verified photographer identity at upload time
- Tamper-evident timestamp (e.g., hash of original file at upload)
- Optional project/case ID linkage
- Approval chain when uploaded by an employee on behalf of a business account
- AI assists only with metadata suggestions (keywords, description) — never generates or edits the image itself

## Search & filters (do not copy generic stock-site filters)

Include: verification level, "Evidence Photo" (yes/no), provenance available (GPS + timestamp documented), business-approved, industry/use-case (construction, real estate, municipal, etc.), documentation type (project progress, HSE/incident, damage documentation, timeline), orientation, resolution, license type, price, location, photographer, newest.

Exclude: "AI Generated," "Free," and algorithm-driven "Trending/Popular" (unless backed by real, verifiable numbers, never engagement-optimized).

## Payments (Phase 1 — keep minimal)

Stripe only (covers cards, invoicing, subscriptions), creator payouts/revenue share, VAT support. Skip PayPal/Apple Pay/Google Pay, multi-currency, and instant payouts until there's a validated reason to add them.

## Security (treat as core product, not "nice to have")

Non-negotiable from day one: audit logs (required for evidentiary value), encrypted storage, secure downloads, copyright/rights documentation, role-based permissions (photographer / business / buyer / admin), GDPR compliance.
Can wait: 2FA (add early but non-blocking for MVP), advanced AI-based fraud detection, watermarked previews.

## Recommended MVP tech stack

| Layer | Choice | Reasoning |
|---|---|---|
| Frontend | Next.js, React, TypeScript, Tailwind | Standard, no reason to change |
| Backend | Node.js + REST API | Skip GraphQL/NestJS until team size requires it |
| Database | PostgreSQL | Strong fit for structured provenance/rights metadata |
| File storage | AWS S3 or Cloudflare R2 (pick one) | No need for both at this stage |
| Image handling | Next.js built-in image optimization | Skip Cloudinary until volume requires it |
| Search | Standard DB filtering | Skip ElasticSearch/vector search until catalog size demands it |
| AI | Metadata/keyword suggestions only | No recommendation engine until there's enough data |
| Auth | Auth.js, email + Google login | Skip Apple/GitHub login — irrelevant for this buyer base |

## Design direction

Minimal, editorial, premium, gallery-like presentation, large photography, dark and light modes, elegant typography, fast and distraction-free. Avoid anything that reads as "upload free, sell instantly" — copy should reflect curated membership (e.g. "Apply for membership," not "Sign up").

## Long-term direction (do not build yet, but design so it's not blocked)

Expansion into art/exhibitions/events (artist profiles, exhibition calendar, gallery/organizer accounts); additional niches (real estate, municipal, healthcare/insurance); broader marketplace opening only after the construction niche is proven, as a distinct later phase — not a parallel track now.

---

*This prompt reflects BETA ART's actual, refined strategy: exclusive and niche-first, trust as the core product, and evidentiary photography as the differentiator competitors cannot copy without rebuilding their entire trust model.*
