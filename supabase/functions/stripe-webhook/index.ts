// Supabase Edge Function: stripe-webhook
//
// Deploy with:
//   supabase functions deploy stripe-webhook --no-verify-jwt
//   supabase secrets set STRIPE_SECRET_KEY=sk_live_or_test_... STRIPE_WEBHOOK_SECRET=whsec_...
//
// Register the resulting URL as an endpoint in the Stripe Dashboard
// (Developers -> Webhooks) listening to:
//   checkout.session.completed
//   customer.subscription.updated
//   customer.subscription.deleted
//
// This function updates public.profiles (and mirrors into
// auth.users.raw_user_meta_data) using the Supabase service role key so the
// dashboard can read subscription_status / trial_ends_at without another
// round trip to Stripe.

import Stripe from 'npm:stripe@17'
import { createClient } from 'npm:@supabase/supabase-js@2'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-06-20',
})
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

function mapStripeStatus(status: Stripe.Subscription.Status): string {
  switch (status) {
    case 'trialing':
      return 'trialing'
    case 'active':
      return 'active'
    case 'past_due':
      return 'past_due'
    case 'canceled':
    case 'unpaid':
      return 'canceled'
    default:
      return 'expired'
  }
}

async function upsertProfileFromSubscription(
  userId: string,
  subscription: Stripe.Subscription,
) {
  const status = mapStripeStatus(subscription.status)
  const trialEndsAt = subscription.trial_end
    ? new Date(subscription.trial_end * 1000).toISOString()
    : null
  const currentPeriodEnd = new Date(subscription.current_period_end * 1000).toISOString()

  await supabaseAdmin
    .from('profiles')
    .update({
      stripe_customer_id: subscription.customer as string,
      stripe_subscription_id: subscription.id,
      subscription_status: status,
      trial_ends_at: trialEndsAt,
      current_period_end: currentPeriodEnd,
    })
    .eq('id', userId)

  await supabaseAdmin.auth.admin.updateUserById(userId, {
    user_metadata: {
      stripe_customer_id: subscription.customer as string,
      subscription_status: status,
      trial_ends_at: trialEndsAt,
    },
  })
}

Deno.serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  const body = await req.text()

  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature!, webhookSecret)
  } catch (err) {
    return new Response(`Webhook signature verification failed: ${(err as Error).message}`, {
      status: 400,
    })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.client_reference_id
        if (userId && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string,
          )
          await upsertProfileFromSubscription(userId, subscription)
        }
        break
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const { data } = await supabaseAdmin
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', subscription.customer as string)
          .maybeSingle()
        if (data?.id) {
          await upsertProfileFromSubscription(data.id, subscription)
        }
        break
      }
      default:
        break
    }
  } catch (err) {
    console.error('Error handling Stripe webhook event', err)
    return new Response('Webhook handler error', { status: 500 })
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
