import type { Metadata } from "next";
import { AboutHero, About, Team } from "@/components/sections";
import SectionDivider from "@/components/ui/SectionDivider";

export const metadata: Metadata = {
  title: "About Us & Our Team",
  description:
    "Meet the master barbers behind Old Fashion Barbershop in Naples, FL. Learn our story, our craft, and the team dedicated to premium grooming.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us & Our Team | Old Fashion Barbershop",
    description:
      "Meet the master barbers behind Old Fashion Barbershop in Naples, FL. Learn our story and the team dedicated to premium grooming.",
    images: [
      {
        url: "/images/hero/hero-barbershop.jpg",
        width: 1200,
        height: 630,
        alt: "Old Fashion Barbershop — Premium Barbershop in Naples, FL",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <SectionDivider variant="gold-line" />
      <About />
      <SectionDivider variant="gold-line" />
      <Team />
    </>
  );
}
