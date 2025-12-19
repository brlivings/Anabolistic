import Image from "next/image";
import { Container, Button, Card, Divider } from "../components/ui";
import { protocols, faqs, site } from "../content";
import { ProtocolRow } from "../components/ProtocolRow";

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-hero-radial" />

        <Container className="relative py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left: Copy */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-black/40 px-4 py-2 text-xs text-white/70">
                <span className="h-2 w-2 rounded-full bg-gold-500" />
                Monthly membership • Private Discord • Cancel anytime
              </div>

              <h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">
                {site.hero.headline}
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
                {site.hero.subtext}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <form action="/api/checkout" method="POST">
                  <Button type="submit" className="w-full sm:w-auto">
                    START {site.priceText.toUpperCase()}
                  </Button>
                </form>
                <Button href="#vault" variant="secondary" className="w-full sm:w-auto">
                  EXPLORE THE VAULT
                </Button>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-white/60 sm:max-w-md">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="text-lg font-extrabold text-white">24/7</div>
                  Discord access
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="text-lg font-extrabold text-white">New</div>
                  Updates monthly
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="text-lg font-extrabold text-white">Instant</div>
                  Access after pay
                </div>
              </div>
            </div>

            {/* Right: Image stack */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl border border-gold-500/25 bg-black/60 p-4 shadow-glow">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
                    <Image src="/photos/physique.jpg" alt="Physique" fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  </div>
                  <div className="grid gap-4">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
                      <Image src="/photos/hypertrophy.jpg" alt="Back pose" fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
                      <Image src="/photos/secondary.jpg" alt="Side pose" fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/40 p-4 text-sm">
                  <div className="text-white/70">
                    <span className="font-semibold text-white">Included:</span> protocols • nutrition frameworks • community
                  </div>
                  <div className="rounded-full border border-gold-500/25 bg-gold-500/10 px-3 py-1 text-xs text-gold-200">
                    Secure Stripe checkout
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <Divider />

        {/* VAULT / MODULES */}
        <section id="vault" className="py-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                WHAT'S INSIDE
              </h2>
              <p className="mt-3 text-white/70">
                Not “tips.” Structured modules you can run. Built for progress you can measure.
              </p>

              <Card className="mt-6 p-6">
                <div className="text-sm text-white/65">Membership</div>
                <div className="mt-2 text-4xl font-black">{site.priceText}</div>
                <div className="mt-2 text-xs text-white/55">Billed monthly. Cancel anytime.</div>
                <form className="mt-6" action="/api/checkout" method="POST">
                  <Button type="submit" className="w-full">
                    SUBSCRIBE & UNLOCK
                  </Button>
                </form>
              </Card>
            </div>

            <div className="lg:col-span-8 space-y-10">
              {protocols.map((p, i) => (
                <ProtocolRow key={p.title} p={p} flip={i % 2 === 0} />
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* PRICING / ACCESS */}
        <section id="access" className="py-8">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">HOW ACCESS WORKS</h2>
              <p className="mt-3 text-white/70">
                After checkout, you'll get an access link on the success screen. Use it anytime to reopen the invite page.
              </p>
              <p className="mt-3 text-white/70">
                If you cancel, access should be removed (you’ll set this using Stripe → Discord role gating).
              </p>
            </div>

            <Card className="p-8">
              <p className="text-sm text-white/70">You get</p>
              <ul className="mt-4 space-y-3 text-white/80">
                <li>• Private Discord invite (members-only)</li>
                <li>• Protocol vault + updates</li>
                <li>• Support via {site.supportEmail}</li>
              </ul>
              <form className="mt-8" action="/api/checkout" method="POST">
                <Button type="submit" className="w-full">
                  START MEMBERSHIP
                </Button>
              </form>
              <p className="mt-3 text-xs text-white/50">
                Payments handled by Stripe. Subscriptions renew monthly until canceled.
              </p>
            </Card>
          </div>
        </section>

        <Divider />

        {/* FAQ */}
        <section id="faq" className="py-8 pb-20">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">FAQ</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {faqs.map((f) => (
              <Card key={f.q}>
                <h3 className="text-lg font-bold">{f.q}</h3>
                <p className="mt-2 text-white/70">{f.a}</p>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-sm text-white/60">
            Need help? Email{" "}
            <a className="underline" href={`mailto:${site.supportEmail}`}>
              {site.supportEmail}
            </a>
          </div>
        </section>
      </Container>
    </main>
  );
}
