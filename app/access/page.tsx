"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type AccessResult =
  | { ok: true; discordUrl: string }
  | { ok: false; message: string };

export default function AccessPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AccessResult | null>(null);

  const emailLooksValid = useMemo(() => {
    const v = email.trim();
    // simple sanity check (not perfect, just UX)
    return v.includes("@");
  }, [email]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as AccessResult;
      setResult(data);
    } catch {
      setResult({ ok: false, message: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <div className="mx-auto max-w-2xl px-6 py-14">
        <div className="mb-10 flex items-center justify-between gap-4">
          <Link href="/" className="text-sm text-zinc-300 hover:text-white">
            ← Back
          </Link>
          <span className="rounded-full border border-yellow-500/35 bg-yellow-500/10 px-3 py-1 text-xs text-yellow-300">
            Members
          </span>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight">Get your Discord access</h1>
        <p className="mt-3 text-zinc-300">
          Enter the email you used at checkout. If your <span className="text-yellow-300">$25/month</span> subscription is active,
          you’ll get the invite instantly.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
        >
          <label className="block text-sm font-medium text-zinc-200">Email</label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-zinc-100 outline-none ring-0 placeholder:text-zinc-600 focus:border-yellow-500/70"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
            <button
              type="submit"
              disabled={loading || !emailLooksValid}
              className="rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black shadow hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Checking…" : "Unlock"}
            </button>
          </div>

          {result && (
            <div className="mt-6 rounded-xl border border-zinc-800 bg-black/40 p-4">
              {result.ok ? (
                <div>
                  <p className="text-sm text-zinc-200">
                    ✅ Verified. Welcome in.
                  </p>
                  <a
                    className="mt-3 inline-flex items-center justify-center rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black hover:bg-yellow-400"
                    href={result.discordUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Join the Discord
                  </a>
                  <p className="mt-3 text-xs text-zinc-500">
                    If the invite expires, just come back and run this again.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-red-200">{result.message}</p>
                  <p className="mt-2 text-xs text-zinc-500">
                    Tip: use the exact email you paid with.
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 text-xs text-zinc-500">
            By continuing you agree this is for educational / community content only and not medical advice.
          </div>
        </form>
      </div>
    </main>
  );
}
