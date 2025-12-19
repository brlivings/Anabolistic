"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container, Card, Button } from "../../components/ui";

export default function CopyPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const text = sp.get("text") ?? "";

  useEffect(() => {
    (async () => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {}
    })();
  }, [text]);

  return (
    <Container className="py-20">
      <Card className="max-w-xl">
        <h1 className="text-2xl font-bold">Copied</h1>
        <p className="mt-2 text-white/70">If your browser blocked clipboard access, you can manually copy below:</p>
        <div className="mt-4 rounded-xl border border-gold-500/20 bg-white/5 p-3 font-mono text-xs break-all">
          {text}
        </div>
        <div className="mt-6 flex gap-3">
          <Button onClick={() => router.back()}>Go back</Button>
          <Button href="/" variant="secondary">Home</Button>
        </div>
      </Card>
    </Container>
  );
}
