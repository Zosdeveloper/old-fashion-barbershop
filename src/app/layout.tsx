import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { SITE_CONFIG } from "@/lib/constants";
import LenisProvider from "@/providers/LenisProvider";
import { Navbar } from "@/components/navigation";
import { Footer } from "@/components/sections";
import JsonLd from "@/components/seo/JsonLd";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | Premium Barbershop in Naples, FL`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "barbershop",
    "barber Naples FL",
    "men's haircut Naples",
    "premium barbershop Southwest Florida",
    "hot towel shave Naples",
    "beard trim Naples",
    "fade haircut Naples",
    "best barber Naples Florida",
    "Old Fashion Barbershop",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | Premium Barbershop in Naples, FL`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: "/images/hero/hero-barbershop.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} — Premium Barbershop in Naples, FL`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | Premium Barbershop in Naples, FL`,
    description: SITE_CONFIG.description,
    images: ["/images/hero/hero-barbershop.jpg"],
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable}`}>
      <body>
        <JsonLd />
        <div className="grain-overlay" aria-hidden="true" />
        <LenisProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
