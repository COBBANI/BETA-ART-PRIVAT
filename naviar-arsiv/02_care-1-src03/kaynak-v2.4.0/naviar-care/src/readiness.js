// Presence and enablement only; never expose runtime values or call this verification.
export function readiness(env) {
  return {
    operator: !!env.OPERATOR_NAME, area: !!env.SERVICE_AREA, contact: !!env.CONTACT_EMAIL,
    review: env.LAUNCH_REVIEW_COMPLETE === 'true', service: env.SERVICE_OPEN === 'true',
    sender: !!env.RESEND_API_KEY && !!env.EMAIL_FROM,
    paymentKeys: String(env.STRIPE_SECRET_KEY || '').startsWith('sk_live_') && !!env.STRIPE_WEBHOOK_SECRET,
    paymentEnabled: env.PAYMENTS_ENABLED === 'true'
  };
}
