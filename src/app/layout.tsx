import type { Metadata } from "next";
import { DM_Mono, Fraunces, Geist } from "next/font/google";
import { MusicController } from "@/components/music-controller";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const dmMono = DM_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Adobo Guild | Where Winds Meet", template: "%s | Adobo Guild" },
  description: "A Filipino guild in Where Winds Meet for Wanderers who choose the journey, the laughter, and the people along the way.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${fraunces.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}<MusicController /></body>
      <Analytics />
      <SpeedInsights />
    </html>
  );
}
