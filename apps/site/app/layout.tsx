import type { Metadata } from "next";
import "@backdoor_est/etkan-ui-tokens";
import "./globals.css";
import { Providers } from "./providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: {
    default: "ETKAN UI — اتقان · Bilingual React Design System",
    template: "%s · ETKAN UI",
  },
  description:
    "A bilingual (Arabic RTL / English LTR), light & dark React design system built for Saudi products. One build serves both directions, powered by pure-CSS design tokens.",
  keywords: [
    "ETKAN UI",
    "design system",
    "react components",
    "RTL",
    "Arabic UI",
    "Saudi",
    "bilingual",
    "dark mode",
  ],
  openGraph: {
    title: "ETKAN UI — اتقان",
    description: "Bilingual (AR/EN), light & dark React design system for Saudi products.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" data-theme="light" suppressHydrationWarning>
      <body>
        <Providers>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
