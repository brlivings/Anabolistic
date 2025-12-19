export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Elite Physique Vault",
  priceText: process.env.NEXT_PUBLIC_PRICE_TEXT ?? "$25/month",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support@example.com",
  hero: {
    headline: "ENTER THE VAULT",
    subtext: "Monthly membership for serious training, nutrition systems, and a private Discord community. Cancel anytime."
  }
};

export type Protocol = {
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  image: string;
};

export const protocols: Protocol[] = [
  {
    tag: "BRAIN",
    title: "Neurochemical Mastery Protocol",
    description: "Upgrade learning capacity, emotional control, and cognitive sharpness through focused habits and strategy.",
    bullets: [
      "Focus & attention systems you can actually run daily",
      "Anxiety-to-action routines for confident presence",
      "Consistency framework without burnout"
    ],
    image: "/photos/brain.jpg"
  },
  {
    tag: "MUSCLE & SIZE",
    title: "Hypertrophy Optimization Protocol",
    description: "A practical split, volume guidance, and progression rules to maximize muscle while staying athletic.",
    bullets: [
      "Programming templates for any schedule",
      "Exercise selection for aesthetics + performance",
      "Intensity & fatigue management rules"
    ],
    image: "/photos/hypertrophy.jpg"
  },
  {
    tag: "PHYSIQUE",
    title: "Aesthetics & Composition Protocol",
    description: "Dial in leanness, fullness, and consistency with simple, repeatable systems that scale.",
    bullets: [
      "Body comp targets + weekly adjustment rules",
      "Food structure that fits real life",
      "Recovery-first approach for sustainability"
    ],
    image: "/photos/physique.jpg"
  }
];

export const faqs = [
  {
    q: "How do I access the Discord after purchase?",
    a: "After payment, you'll see a private Discord invite on the Success page. You can also use the Access page to retrieve it later."
  },
  {
    q: "Can I lose access?",
    a: "If the invite is rotated for security, your Access page will always show the current link after verification."
  },
  {
    q: "What if I used the wrong email at checkout?",
    a: "Contact support and include your Stripe receipt email so we can help you get in."
  }
];
