import { NextResponse } from "next/server";
import { getStripe, requireEnv } from "../../../lib/stripe";

export async function POST() {
  const stripe = getStripe();

  const priceId = requireEnv("STRIPE_PRICE_ID");
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true,
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cancel`,
    // Collect email so we can gate /access by email.
  });

  return NextResponse.redirect(session.url!, { status: 303 });
}
