import clsx from "clsx";
import type { ReactNode } from "react";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx("mx-auto w-full max-w-6xl px-6", className)}>{children}</div>;
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-gold-200">
      {children}
    </span>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx("rounded-2xl border border-gold-500/15 bg-white/5 p-6 shadow-glow backdrop-blur", className)}>
      {children}
    </div>
  );
}

export function Button({
  children,
  href,
  type = "button",
  onClick,
  variant = "primary",
  className
}: {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-gold-500/40";
  const styles =
    variant === "primary"
      ? "bg-gold-500 text-black hover:bg-gold-400 shadow-glowStrong"
      : "border border-gold-500/25 bg-white/5 text-white hover:bg-white/10";
  if (href) {
    return (
      <a className={clsx(base, styles, className)} href={href}>
        {children}
      </a>
    );
  }
  return (
    <button className={clsx(base, styles, className)} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export function Divider() {
  return <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
}
