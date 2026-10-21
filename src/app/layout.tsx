import type { Metadata, Viewport } from "next";
import { DM_Mono, Fraunces, Geist } from "next/font/google";
import localFont from "next/font/local";
import { MusicController } from "@/components/music-controller";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://adobowwm.vercel.app";

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

const frauncesExt = localFont({
  src: "./fonts/fraunces-latin-ext.woff2",
  variable: "--font-display-ext",
  weight: "100 900",
  style: "normal",
  display: "swap",
  adjustFontFallback: false,
});

const dmMono = DM_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Adobo Guild | Where Winds Meet", template: "%s | Adobo Guild" },
  description: "A Filipino guild in Where Winds Meet for Wanderers who choose the journey, the laughter, and the people along the way.",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Adobo Guild",
    title: "Adobo Guild | Where Winds Meet",
    description: "A Filipino guild in Where Winds Meet for Wanderers who choose the journey, the laughter, and the people along the way.",
    images: [{ url: "/images/branding/og-cover.jpg", width: 1200, height: 630, alt: "Adobo Wanderers gathered in Where Winds Meet" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adobo Guild | Where Winds Meet",
    description: "A Filipino guild in Where Winds Meet for Wanderers who choose the journey, the laughter, and the people along the way.",
    images: ["/images/branding/og-cover.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1d18",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${fraunces.variable} ${frauncesExt.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}<MusicController /></body>
      <Analytics />
      <SpeedInsights />
    </html>
  );
}
