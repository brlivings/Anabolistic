import { createClient } from "@supabase/supabase-js";

export type Purchase = {
  id?: string;
  email: string;
  stripe_customer_id: string | null;
  stripe_session_id: string;
  paid_at: string;
};

export type Settings = {
  discord_invite_url: string | null;
};

function supabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

// Ephemeral fallback store (works for local dev; not persistent on serverless).
const mem = {
  purchases: new Map<string, Purchase>(), // key: session_id
  settings: { discord_invite_url: null as string | null }
};

export async function upsertPurchase(p: Purchase) {
  const sb = supabaseAdmin();
  if (sb) {
    const { error } = await sb.from("purchases").upsert(
      {
        email: p.email,
        stripe_customer_id: p.stripe_customer_id,
        stripe_session_id: p.stripe_session_id,
        paid_at: p.paid_at
      },
      { onConflict: "stripe_session_id" }
    );
    if (error) throw error;
    return;
  }
  mem.purchases.set(p.stripe_session_id, p);
}

export async function findPurchaseByEmail(email: string): Promise<Purchase | null> {
  const sb = supabaseAdmin();
  if (sb) {
    const { data, error } = await sb
      .from("purchases")
      .select("*")
      .eq("email", email)
      .order("paid_at", { ascending: false })
      .limit(1);
    if (error) throw error;
    return data?.[0] ?? null;
  }
  for (const p of mem.purchases.values()) {
    if (p.email.toLowerCase() === email.toLowerCase()) return p;
  }
  return null;
}

export async function getDiscordInviteUrl(): Promise<string | null> {
  const sb = supabaseAdmin();
  if (sb) {
    const { data, error } = await sb.from("settings").select("*").eq("key", "discord_invite_url").limit(1);
    if (error) throw error;
    const v = (data?.[0] as any)?.value ?? null;
    return typeof v === "string" ? v : null;
  }
  return mem.settings.discord_invite_url;
}

export async function setDiscordInviteUrl(url: string) {
  const sb = supabaseAdmin();
  if (sb) {
    const { error } = await sb.from("settings").upsert(
      { key: "discord_invite_url", value: url },
      { onConflict: "key" }
    );
    if (error) throw error;
    return;
  }
  mem.settings.discord_invite_url = url;
}
