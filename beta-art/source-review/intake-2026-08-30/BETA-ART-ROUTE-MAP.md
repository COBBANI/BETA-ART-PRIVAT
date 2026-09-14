# BETA ART — Same-Domain Route Map

## Public routes

| Project code | Project | Production path | Primary user action |
|---|---|---|---|
| BAP-01 | BETA ART Privat | /privat/ | Explore artwork, edition or licence request |
| BAG-03 | BETA ART Galleri | /events/ | View programme, exhibition and visit details |
| BAB-02 | BETA ART Business | /business/ | Book a 20-minute archive conversation |

## Cross-property rule

Every project presents the same compact BETA ART property navigation. The current project is visually marked, while the other two paths stay available as sibling destinations.

## Shared assets

Each project carries the BETA ART horizontal mark, reversed mark and aperture/seal variants. The logo does not imply that the projects share checkout, customer accounts, storage or legal workflows.

## Mount model

Deploy each project output to its own directory on the same host:

- domain root /privat/
- domain root /events/
- domain root /business/

The directory mount must preserve each project's relative assets and nested route links. Before release, use the final production domain in canonical, Open Graph and sitemap metadata.

## Do not do

- Do not place all three products inside one generic marketplace navigation.
- Do not route all forms to one generic inbox without project identification.
- Do not reuse Privat prices or licensing terms for Gallery/Event or Business.
- Do not show Gallery events or Business project records as Privat archive plates.
