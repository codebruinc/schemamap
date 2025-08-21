import Stripe from 'stripe';

export async function onRequestPost(context) {
  const { request, env } = context;
  
  console.log('Stripe checkout function called');
  console.log('Environment check:', {
    hasStripeSecret: !!env.STRIPE_SECRET_KEY,
    hasStripePrice: !!env.STRIPE_PRICE_ID,
    hasPaymentsEnabled: !!env.ENABLE_STRIPE_PAYMENTS,
    paymentsValue: env.ENABLE_STRIPE_PAYMENTS
  });
  
  try {
    // Check if Stripe payments are enabled
    if (!env.ENABLE_STRIPE_PAYMENTS || env.ENABLE_STRIPE_PAYMENTS !== 'true') {
      console.log('Stripe payments not enabled');
      return new Response(
        JSON.stringify({ error: 'Stripe payments are not enabled' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    if (!env.STRIPE_SECRET_KEY) {
      console.log('Stripe secret key missing');
      return new Response(
        JSON.stringify({ error: 'Stripe secret key not configured' }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    if (!env.STRIPE_PRICE_ID) {
      console.log('Stripe price ID missing');
      return new Response(
        JSON.stringify({ error: 'Stripe price ID not configured' }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Initializing Stripe client');
    // Initialize Stripe with proper configuration for Cloudflare
    const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      httpClient: Stripe.createFetchHttpClient(),
    });

    console.log('Creating checkout session');
    const origin = new URL(request.url).origin;
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?canceled=true`,
      metadata: {
        product: 'large_file_pass',
      },
    });

    console.log('Checkout session created successfully:', session.id);
    
    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Stripe checkout error:', error);
    console.error('Error details:', {
      message: error.message,
      type: error.type,
      code: error.code,
      statusCode: error.statusCode
    });
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to create checkout session',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}