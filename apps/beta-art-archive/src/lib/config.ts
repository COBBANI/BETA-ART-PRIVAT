// Publication settings — the one file to touch when going live, mirroring
// the QBLOGG convention (assets/js/config.js there).
//
// STRIPE_PAYMENT_LINK: URL of the live Stripe Payment Link for the
// Personal tier (kr 190, quantity-adjustable, plate list collected as a
// required custom field). Empty string = Stripe not connected yet; the
// cart's checkout button then falls back to the licence request form, the
// site's original behaviour. Never point this at a test-mode link on the
// public site.
export const STRIPE_PAYMENT_LINK = "";

// SOCIAL_LINKS: the brand's social channel URLs (user request 02.09.2026,
// "sosyal medya kanalları geliştir"). Empty string = account not created
// yet; the footer renders a channel only when its URL is filled in, so no
// dead or invented links ever ship. Fill each value with the REAL profile
// URL after creating the account — the channel plan, paste-ready bios and
// content calendar live in docs/beta-art/sosyal-medya.md.
export const SOCIAL_LINKS: { name: string; url: string }[] = [
  { name: "Instagram", url: "" },
  { name: "LinkedIn", url: "" },
  { name: "Pinterest", url: "" },
];
