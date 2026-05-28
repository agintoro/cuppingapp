import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DRIVN — Driva Coffee Processing",
  description:
    "A buyer-facing catalogue for Driva lots, process systems, tasting notes, availability, and technical sheets. West Java specialty coffee microlots from Indragiri and Palawija.",
  openGraph: {
    title: "DRIVN — Driva Coffee Processing",
    description: "Traceable West Java specialty microlots. Process systems, tasting notes, and buyer inquiry.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#030303] text-white overflow-x-hidden">
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
