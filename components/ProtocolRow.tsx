import Image from "next/image";
import { Card, Pill } from "./ui";
import type { Protocol } from "../content";
import clsx from "clsx";

export function ProtocolRow({ p, flip }: { p: Protocol; flip?: boolean }) {
  return (
    <div className={clsx("grid items-center gap-8 md:grid-cols-2", flip && "md:[&>*:first-child]:order-2")}>
      <Card>
        <Pill>{p.tag}</Pill>
        <h3 className="mt-4 text-2xl font-bold tracking-tight text-white">{p.title}</h3>
        <p className="mt-2 text-white/70">{p.description}</p>
        <ul className="mt-5 space-y-3 text-white/80">
          {p.bullets.map((b) => (
            <li key={b} className="flex gap-3">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-gold-500/80 shadow-glow" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </Card>

      <div className="relative overflow-hidden rounded-2xl border border-gold-500/10 bg-white/5 shadow-glow">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-gold-500/10" />
        <Image
          src={p.image}
          alt={p.title}
          width={1200}
          height={1200}
          className="h-[420px] w-full object-cover md:h-[520px]"
          priority={false}
        />
      </div>
    </div>
  );
}
