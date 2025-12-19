import Stripe from "stripe";

export const runtime = "nodejs";

function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as { email?: string };
    const cleanEmail = (email || "").trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes("@")) {
      return Response.json({ ok: false, message: "Enter a valid email." }, { status: 400 });
    }

    const stripeSecret = requiredEnv("STRIPE_SECRET_KEY");
    const priceId = requiredEnv("STRIPE_PRICE_ID");
    const discordInviteUrl = requiredEnv("DISCORD_INVITE_URL");

    const stripe = new Stripe(stripeSecret, {
      apiVersion: "2024-06-20",
    });

    // Find customer by email (Stripe Checkout usually creates a customer).
    const customers = await stripe.customers.list({ email: cleanEmail, limit: 1 });
    const customer = customers.data[0];
    if (!customer) {
      return Response.json(
        { ok: false, message: "No Stripe customer found for that email. Make sure you used the same email at checkout." },
        { status: 404 }
      );
    }

    const subs = await stripe.subscriptions.list({
      customer: customer.id,
      status: "all",
      limit: 25,
      expand: ["data.items.data.price"],
    });

    const hasActive = subs.data.some((s) => {
      const active = s.status === "active" || s.status === "trialing";
      if (!active) return false;
      return s.items.data.some((it) => it.price?.id === priceId);
    });

    if (!hasActive) {
      return Response.json(
        {
          ok: false,
          message:
            "No active subscription found for that email. If you just paid, wait 30–60 seconds then try again, or double‑check you bought the $25/month plan.",
        },
        { status: 403 }
      );
    }

    return Response.json({ ok: true, discordUrl: discordInviteUrl });
  } catch (err: any) {
    // Avoid leaking sensitive info to the browser.
    return Response.json(
      { ok: false, message: "Server error. Check your environment variables and try again." },
      { status: 500 }
    );
  }
}
