import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { SITE_CONFIG } from "@/lib/constants";
import LenisProvider from "@/providers/LenisProvider";
import { Navbar } from "@/components/navigation";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "barbershop",
    "barber Naples FL",
    "men's haircut Naples",
    "premium barbershop Southwest Florida",
    "hot towel shave",
    "beard trim Naples",
    "fade haircut Naples",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <LenisProvider>
          <Navbar />
          <main>{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}
