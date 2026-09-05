# NAVIAR CARE 2 — design revision 4

Project: NAVIAR-CARE-002. Date: 5 September 2026. Source continues the existing operations edition; this revision does not activate clinical care or payment collection.

## Applied changes

- Shared forest/cream visual system, responsive type, clearer action hierarchy, compact emergency route on all 27 localized pages.
- A three-part home summary separates website language, unconfirmed clinical pricing and non-emergency scope.
- Preserve the existing AI illustration and its label. No new claims of clinician availability, verified language capacity, clinical results or patient testimonials.
- Booking shows selected test time, time zone and an acknowledgement-dependent save explanation. The server remains authoritative for availability and collisions.
- Consent preference focus returns to its control after a choice. Unset consent prompts initially appear only on the three eligible generic content pages. The footer preference control remains available everywhere.
- Current-page semantics and absolute canonical/hreflang metadata; private demonstration remains noindex/nofollow with robots disallow.
- Development-only Vite preview serves generated output and the real API with empty provider/auth configuration. It rejects protected operations rather than fabricating user identities. The mobile iframe harness is confined to development middleware and absent from the production Worker.

## Evidence and fixes

- 11 existing Node server tests pass; Stripe and email provider calls are mocked.
- Existing catalog check passes: 42 sample profiles, 113 language joins, all 12 known differences reconciled.
- Static check passes: 27 localized pages and 8 compatibility/error pages, internal routes/assets/anchors, IDs, privacy and demo labels, script order.
- Browser: Turkish desktop home inspected; English and Norwegian home text checked; all three desktop homes had no horizontal overflow.
- Browser: Turkish mobile at 390 CSS px, menu opening and Escape closing, CTA navigation to booking. Home at 320 CSS px initially overflowed because inherited styling hid line breaks in a service heading; fixed and measured document scroll width 305 within a 320 px frame including scrollbar.
- Browser found crypto.randomUUID unavailable on the internal HTTP preview; changed the frontend to secure random bytes via crypto.getRandomValues (128 bits), accepted by existing server ID constraints. The reservation screen subsequently displayed its actual sign-in-required state instead of remaining at Loading.
- Keyboard: first Tab focus on Norwegian home reaches the skip link.
- Browser booking verification is limited to navigation, rendering, disabled save and sign-in-required state. No authenticated end-to-end booking, real email, Stripe checkout, screen-reader certification, physical device test, 200% text-enlargement test or full WCAG audit was performed.

## Decision log

| Phase | ID | Decision | Reason |
|---|---|---|---|
| Discover | D4-01 | Benchmark Kry, Dr.Dropin and NHS as first-party examples | Clear scope, fees and preparation; no claim of a global ranking |
| Define | D4-02 | Language understanding remains the central proposition | A website translation must not imply clinician availability |
| Design | D4-03 | Put status, emergency contact and test limits ahead of conversion | Reduce ambiguity around a non-operational healthcare concept |
| Design | D4-04 | Show a selected-time review before saving | Give the person a final check before a state-changing action |
| Validate | D4-05 | Fix narrow-screen line breaks and startup failure | Directly observed browser defects |
| Build | D4-06 | Retain server safeguards, catalog, data model and private audience | This is a design update, not a clinical launch |
| Build | D4-07 | Figma screen creation remains pending team choice | figma-create-new-file requires team selection when multiple plans exist; the optional choice returned no answer |
| Launch | D4-08 | Save a reviewable version without changing the live publication | The current request asks for editing; it does not explicitly request deployment |

## Figma handoff specification — not yet a Figma file

Suggested name: NAVIAR CARE 2 / NAVIAR-CARE-002 / Design v4.

Pages: 00 Foundations; 01 Desktop; 02 Mobile; 03 Booking states; 04 Service blueprint; 05 Review notes.

Foundations: forest #133F38; ink #173F39; muted #4B625B; canvas #FBFAF6; soft surface #EDF2EB; line #CCD8CF; focus #A65313. Georgia headings and Arial/Helvetica body preserve the product's system-font stack. Standard action height 52 px, small control target 44–48 px; these are product targets, not a claim that every WCAG requirement is met.

Reusable components: demo notice; header and language disclosure; emergency strip; action button states; three-part service summary; example profile; slot option; selection review; status/error message; email draft dialog; consent choice; FAQ disclosure; footer. Build with auto-layout and component instances in a selected Design file. No file key or Figma node IDs exist for this revision.

## Open requirements before a clinical launch

Qualified healthcare provider and clinical lead; HPR/registration and clinical-language checks; scope, age and country eligibility; agreed total fees and terms; interpreter scheduling; suitable secure identity, video and health record providers; legal bases and supplier agreements; DPIA screening and any required DPIA; retention scheduling and restore drills; accessibility and patient usability assessment; signed-off escalation process. These are launch requirements, not completed integrations.

## Primary sources checked on 5 September 2026

- Kry video service: https://www.kry.no/legetime-over-video/
- Dr.Dropin video service: https://www.drdropin.no/video
- NHS video preparation: https://www.nhs.uk/nhs-services/gps/video-consultations/
- Norwegian emergency contact: https://www.helsenorge.no/hjelpetilbud-i-kommunene/legevakt/
- Privacy by design and default: https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/innebygd-personvern-og-personvern-som-standard/
- Health-data processing basis: https://www.helsedirektoratet.no/normen/norm-for-informasjonssikkerhet-og-personvern-i-helse-og-omsorgssektoren/grunnleggende-om-behandling-av-helse-og-personopplysninger/behandlingsgrunnlag
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Minimum target size: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
