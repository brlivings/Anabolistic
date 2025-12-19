# Anabolism – Discord-gated Membership Site

A Next.js (App Router) site that:

- Sends users to **Stripe Checkout** to start a **$25/month subscription** (via your Stripe **Price ID**).
- Lets users enter their email on **/access**.
- Verifies they have an **active subscription** to that Price in Stripe.
- If active, reveals your **Discord invite link**.

No database required: access is verified live against Stripe.

## 1) Prerequisites

- Node.js 18+ (Node 20 is recommended)
- A Stripe account

## 2) Stripe setup

1. Create a **Product** in Stripe.
2. Create a **recurring Price**: **$25 / month**.
3. Copy the **Price ID** (looks like `price_...`).

## 3) Environment variables

Create a `.env.local` in the project root:

```bash
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PRICE_ID=price_...
DISCORD_INVITE_URL=https://discord.gg/yourInvite
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

On Vercel, set the same values in **Project → Settings → Environment Variables**.

## 4) Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## 5) Deploy to Vercel

1. Push this repo to GitHub.
2. Import into Vercel.
3. Set env vars.
4. Deploy.

Once deployed, your production URL will be something like `https://<project>.vercel.app`.

## 6) Customer flow

1. User clicks **Join for $25/mo** → Stripe Checkout.
2. After payment, they go to **/success**.
3. They go to **/access**, enter their email.
4. If their subscription is active, the Discord invite is shown.
