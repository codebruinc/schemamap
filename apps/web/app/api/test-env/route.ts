import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    stripe_enabled: process.env.ENABLE_STRIPE_PAYMENTS === 'true',
    has_publishable_key: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    has_secret_key: !!process.env.STRIPE_SECRET_KEY,
    has_price_id: !!process.env.STRIPE_PRICE_ID,
    has_webhook_secret: !!process.env.STRIPE_WEBHOOK_SECRET,
    price_id_preview: process.env.STRIPE_PRICE_ID?.substring(0, 10) + '...'
  });
}