// Cloudflare Function for Stripe Checkout
export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    // Check if Stripe payments are enabled
    if (!env.ENABLE_STRIPE_PAYMENTS || env.ENABLE_STRIPE_PAYMENTS !== 'true') {
      return new Response(
        JSON.stringify({ error: 'Stripe payments are not enabled' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    if (!env.STRIPE_PRICE_ID) {
      return new Response(
        JSON.stringify({ error: 'Stripe price ID not configured' }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Create Stripe checkout session
    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'mode': 'payment',
        'line_items[0][price]': env.STRIPE_PRICE_ID,
        'line_items[0][quantity]': '1',
        'success_url': `${new URL(request.url).origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        'cancel_url': `${new URL(request.url).origin}/pricing?canceled=true`,
        'metadata[product]': 'large_file_pass',
      }),
    });

    if (!stripeResponse.ok) {
      const errorText = await stripeResponse.text();
      console.error('Stripe API error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to create checkout session' }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const session = await stripeResponse.json();
    
    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create checkout session' }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}