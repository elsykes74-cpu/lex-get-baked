import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { amount, customerName, customerEmail } = await req.json();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      receipt_email: customerEmail || undefined,
      description: `Lex Get Baked order for ${customerName || 'customer'}`,
    });
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Payment setup failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
