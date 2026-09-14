import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection } from "@/components/LegalPage";
import { siteConfig } from "@/config/site";

const TITLE = "Privacy Policy — Beta Art";
const DESCRIPTION =
  "Draft privacy information for Beta Art, including licence requests, technical delivery and future service integrations.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${siteConfig.url}privacy` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `${siteConfig.url}privacy` }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="Draft privacy information for the current Beta Art development build. It must be completed with the registered business identity, processors and retention periods before commercial launch."
    >
      <LegalSection heading="Who is responsible">
        <p>
          Data controller: {siteConfig.legalEntity}. Registration number: {siteConfig.orgNumber}.
          Address: {siteConfig.postalAddress}. Contact: {siteConfig.contactEmail}.
        </p>
      </LegalSection>

      <LegalSection heading="Licence and contact requests">
        <p>
          A licence or contact request can include the selected catalogue record, requested licence,
          name, email address, company, intended use, territory, duration and any message supplied
          by the requester. These details should only be processed for responding to the enquiry,
          preparing a licence or contract, administering an order and meeting legal/accounting
          duties where applicable.
        </p>
        <p>
          The current development form must not be described as storing or transmitting data until a
          submission backend is actually connected. Once a backend, CRM, email service or payment
          provider is added, this policy must name the relevant processing and retention practices.
        </p>
      </LegalSection>

      <LegalSection heading="Technical connection data">
        <p>
          Hosting and security infrastructure can process ordinary connection data such as IP
          address, request time, requested path, browser/user-agent information and security logs as
          part of delivering and protecting the website. The production hosting provider and
          applicable retention period must be listed here once the final deployment is connected.
        </p>
      </LegalSection>

      <LegalSection heading="Fonts and third-party resources">
        <p>
          The development build currently loads web-font styles from Google Fonts. This can cause
          the visitor's browser to connect to a third-party service. Before production launch, Beta
          Art should either document this processing accurately or self-host the required web fonts
          to minimise external requests.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies and analytics">
        <p>
          No non-essential analytics service should be enabled merely by publishing this draft. If
          analytics, advertising, embedded social media or other tracking technology is introduced,
          Beta Art must update this policy and implement the consent/information mechanism required
          by the applicable Norwegian and EEA rules before that tracking begins.
        </p>
        <p>
          One such mechanism exists in this development build: viewing a catalogue plate stores a
          random identifier in <code>sessionStorage</code> (cleared when the browser tab closes, not
          linked to any account, IP address or device) and records which plate was viewed against
          that identifier. This is used only to compute aggregate, anonymous "viewed together with"
          counts — shown to visitors as "you might also like" and to administrators as a summary
          table — and is never linked back to an individual. No advertising, profiling or
          third-party sharing is involved. This is a lower-risk mechanism than persistent tracking,
          but it has
          <strong> not</strong> been reviewed against Norwegian/EEA ePrivacy consent requirements —
          that review, and either a consent banner or a documented "strictly necessary"
          justification, must happen before commercial launch.
        </p>
      </LegalSection>

      <LegalSection heading="Legal basis and retention">
        <p>
          [To be completed before launch: identify the legal basis for each real processing
          activity, define retention periods, and distinguish enquiries, contracts, accounting
          records and any optional marketing subscription.]
        </p>
      </LegalSection>

      <LegalSection heading="Recipients and international transfers">
        <p>
          [To be completed before launch with the actual production providers for hosting, email,
          payments, analytics, file delivery and other processors, including transfer safeguards
          where relevant.]
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          The final policy must explain applicable rights of access, rectification, erasure,
          restriction, portability and objection, how to exercise them, and the right to complain to
          the competent supervisory authority.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
