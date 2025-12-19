import "./globals.css";
import type { Metadata } from "next";
import { site } from "../content";

export const metadata: Metadata = {
  title: site.name,
  description: "Paid access community"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
