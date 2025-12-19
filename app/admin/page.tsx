import { redirect } from "next/navigation";
import { Container, Card, Button } from "../../components/ui";
import { getDiscordInviteUrl, setDiscordInviteUrl } from "../../lib/store";

async function login(formData: FormData) {
  "use server";
  const pass = String(formData.get("password") ?? "");
  if (!process.env.ADMIN_PASSWORD) return { ok: false as const, message: "ADMIN_PASSWORD not set." };
  if (pass !== process.env.ADMIN_PASSWORD) return { ok: false as const, message: "Wrong password." };
  return { ok: true as const };
}

async function updateInvite(formData: FormData) {
  "use server";
  const pass = String(formData.get("password") ?? "");
  const url = String(formData.get("discord") ?? "").trim();

  if (!process.env.ADMIN_PASSWORD || pass !== process.env.ADMIN_PASSWORD) {
    return { ok: false as const, message: "Not authorized." };
  }
  if (!url.startsWith("https://")) {
    return { ok: false as const, message: "Invite URL must start with https:// (full invite link)." };
  }
  await setDiscordInviteUrl(url);
  return { ok: true as const };
}

export default async function AdminPage() {
  const current = (await getDiscordInviteUrl()) || process.env.DISCORD_INVITE_URL || "";

  return (
    <Container className="py-20">
      <Card className="max-w-2xl space-y-6">
        <h1 className="text-3xl font-black tracking-tight">Admin</h1>
        <p className="text-white/70">
          Update the Discord invite URL (rotate if leaked). For production persistence, configure Supabase env vars.
        </p>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs text-white/60">Current invite</div>
          <div className="mt-1 break-all font-mono text-sm">{current || "(not set)"}</div>
        </div>

        <form action={updateInvite} className="space-y-3">
          <input
            name="password"
            type="password"
            required
            placeholder="Admin password"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
          />
          <input
            name="discord"
            type="url"
            required
            defaultValue={current}
            placeholder="https://discord.gg/..."
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
          />
          <Button type="submit">UPDATE INVITE</Button>
        </form>

        <p className="text-xs text-white/50">
          Note: This admin gate is intentionally simple. If you want a real login system, we can add it.
        </p>
      </Card>
    </Container>
  );
}
