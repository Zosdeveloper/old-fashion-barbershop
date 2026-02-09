import type { Metadata } from "next";
import { About, Team } from "@/components/sections";
import SectionDivider from "@/components/ui/SectionDivider";

export const metadata: Metadata = {
  title: "About Us & Our Team",
  description:
    "Meet the master barbers behind Old Fashion Barbershop in Naples, FL. Learn our story, our craft, and the team dedicated to premium grooming.",
  openGraph: {
    title: "About Us & Our Team | Old Fashion Barbershop",
    description:
      "Meet the master barbers behind Old Fashion Barbershop in Naples, FL. Learn our story and the team dedicated to premium grooming.",
    images: ["/images/team/barber-01.jpg"],
  },
};

export default function AboutPage() {
  return (
    <>
      <div className="pt-24" />
      <About />
      <SectionDivider variant="gold-line" />
      <Team />
    </>
  );
}
