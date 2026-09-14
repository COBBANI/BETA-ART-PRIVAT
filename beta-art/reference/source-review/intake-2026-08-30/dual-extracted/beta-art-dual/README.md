# BETA ART Dual

A dependency-free prototype that separates the brand into two customer experiences while keeping one trust model.

## Routes

- `/` — brand gateway
- `/business/` — construction-first B2B archive product
- `/business/archive-demo/` — retrievability demo with clearly marked sample data
- `/private/` — verified human photography / direct licensing / future editions
- `/private/verify/` — BETA-ID public verification prototype

## Strategy

### Business
Business is the Phase-1 construction product. It does not expose the broader image marketplace, art sales, generic stock categories, API or international expansion. Its main CTA is a 20-minute conversation. Pilot prices are shown as hypotheses rather than guaranteed commercial terms.

### Private
Private preserves the museum/editorial BETA ART language for verified human photography, direct licensing and future signed/numbered editions. Placeholder visuals and demo BETA-IDs are explicitly labelled and cannot receive production Verified status.

## Shared verification gate

A production image may display `Verified Human Photograph` only after original-file, identity, capture/context, rights/release, AI disclosure and unresolved-conflict checks pass. C2PA is supplementary when available.

## Run

Serve this folder with any static server, for example:

```bash
python -m http.server 8080 -d beta-art-dual
```

Then open `http://localhost:8080`.

## Lovable integration

This package is intentionally dependency-free so the routes and copy can be ported into the existing TanStack/Lovable project. The current Lovable workspace could not be edited because the workspace had no remaining credits at the time this package was generated.
