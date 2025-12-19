import Link from "next/link";
import { Container, Card, Button } from "../../components/ui";

export default function CancelPage() {
  return (
    <Container className="py-20">
      <Card className="max-w-xl">
        <h1 className="text-2xl font-bold">Payment canceled</h1>
        <p className="mt-2 text-white/70">
          No worries — you can try again anytime.
        </p>
        <div className="mt-6 flex gap-3">
          <Button href="/">Back home</Button>
          <Button href="/#pricing" variant="secondary">See pricing</Button>
        </div>
      </Card>
    </Container>
  );
}
