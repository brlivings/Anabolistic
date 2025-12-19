"use client";

import { useState } from "react";

export default function AccessPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [discord, setDiscord] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    setDiscord(null);

    const res = await fetch("/api/access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok || !data.ok) {
      setMsg(data.message || "Access denied.");
    } else {
      setDiscord(data.discord);
    }

    setLoading(false);
  }

  return (
    <main style={{ padding: 32 }}>
      <h1>Member Access</h1>

      <form onSubmit={onSubmit} style={{ marginTop: 16 }}>
        <input
          type="email"
          placeholder="Email used at checkout"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading} style={{ marginLeft: 8 }}>
          {loading ? "Checking..." : "Unlock"}
        </button>
      </form>

      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}

      {discord && (
        <p style={{ marginTop: 12 }}>
          ✅ Access granted:{" "}
          <a href={discord} target="_blank" rel="noreferrer">
            Join Discord
          </a>
        </p>
      )}
    </main>
  );
}
