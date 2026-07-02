import type { User } from '@supabase/supabase-js'

/**
 * NexoSTEM checkout flow.
 *
 * This SPA has no custom backend, so instead of running a server to create
 * Stripe Checkout Sessions we use a Stripe Payment Link (the officially
 * recommended "simplest" approach for static/serverless apps). Create the
 * Payment Link once in the Stripe Dashboard with:
 *   - Recurring price: 7.99 EUR / month
 *   - Free trial: 7 days
 * then put its URL in VITE_STRIPE_PAYMENT_LINK.
 *
 * To automatically reconcile the subscription status after checkout you
 * still need a Stripe webhook -> Supabase Edge Function (see
 * supabase/functions/stripe-webhook) that writes stripe_customer_id /
 * subscription_status into the user's metadata. Until that is deployed we
 * optimistically mark the user as "trialing" client-side so the dashboard
 * reflects the trial immediately.
 */

export function getStripePaymentLink(): string | null {
  return import.meta.env.VITE_STRIPE_PAYMENT_LINK || null
}

export function buildCheckoutUrl(user: User): string | null {
  const base = getStripePaymentLink()
  if (!base) return null

  const url = new URL(base)
  if (user.email) url.searchParams.set('prefilled_email', user.email)
  url.searchParams.set('client_reference_id', user.id)
  return url.toString()
}
