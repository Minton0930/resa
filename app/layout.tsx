import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reseplaneraren — Flyg, hotell & all inclusive i ett paket",
  description:
    "Planera din resa: välj land, hotell, antal resenärer, avreseort och boende — all inclusive-paket med flyg och hotell samlat på ett ställe.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
