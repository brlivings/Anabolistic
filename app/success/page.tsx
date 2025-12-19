import { redirect } from "next/navigation";
import { Container, Card, Button } from "../../components/ui";
import { getStripe } from "../../lib/stripe";

function safeEmailFromSession(session: any): string {
  return (
    session.customer_details?.email ||
    session.customer_email ||
    ""
  );
}

export default async function SuccessPage({
  searchParams
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;
  if (!sessionId) redirect("/");

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") redirect("/");

  // We don't store purchases in a database. Access is verified live via Stripe on /access.
  // We still surface the Discord invite here for convenience.
  const _email = safeEmailFromSession(session);
  const discord = process.env.DISCORD_INVITE_URL || null;

  return (
    <Container className="py-20">
      <Card className="max-w-2xl">
        <h1 className="text-3xl font-black tracking-tight">You’re unlocked.</h1>
        <p className="mt-3 text-white/70">Payment verified. Next step: open Discord or bookmark the Access page.</p>

        {!discord ? (
          <div className="mt-6 rounded-xl border border-gold-500/25 bg-gold-500/10 p-4 text-sm text-white/80">
            Discord invite is not configured yet. Set <code className="font-mono">DISCORD_INVITE_URL</code> in your environment
            or update it in <code className="font-mono">/admin</code>.
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            <div className="rounded-xl border border-gold-500/20 bg-white/5 p-4">
              <div className="text-xs text-white/60">Your invite</div>
              <div className="mt-1 break-all font-mono text-sm">{discord}</div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={discord} className="w-full sm:w-auto">OPEN DISCORD</Button>
              <Button variant="secondary" className="w-full sm:w-auto" href={`/copy?text=${encodeURIComponent(discord)}`}>
                COPY LINK
              </Button>
              <Button href="/access" variant="secondary" className="w-full sm:w-auto">
                ACCESS LATER
              </Button>
            </div>

            <p className="text-xs text-white/50">
              Tip: bookmark the <a className="underline" href="/access">Access</a> page in case you close this tab.
            </p>
          </div>
        )}
      </Card>
    </Container>
  );
}
