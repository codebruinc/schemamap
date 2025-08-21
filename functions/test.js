export async function onRequestGet(context) {
  return new Response(
    JSON.stringify({ 
      message: 'Cloudflare Function is working!',
      timestamp: new Date().toISOString(),
      env_check: {
        hasStripeSecret: !!context.env.STRIPE_SECRET_KEY,
        hasStripePrice: !!context.env.STRIPE_PRICE_ID,
        hasPaymentsEnabled: !!context.env.ENABLE_STRIPE_PAYMENTS
      }
    }),
    { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' }
    }
  );
}