import type { Metadata } from "next";
import { Container, Section } from "@/components/ui";
import GalleryClient from "@/components/gallery/GalleryClient";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse our latest cuts, fades, beard work, and shop photos at Old Fashion Barbershop in Naples, FL. See the craftsmanship before you book.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Gallery | Old Fashion Barbershop",
    description:
      "Browse our latest cuts, fades, beard work, and shop photos at Old Fashion Barbershop in Naples, FL.",
    images: [
      {
        url: "/images/hero/hero-barbershop.jpg",
        width: 1200,
        height: 630,
        alt: "Old Fashion Barbershop Gallery — Cuts, Fades & Craft",
      },
    ],
  },
};

export default function GalleryPage() {
  return (
    <Section className="min-h-screen pt-32 pb-20">
      <Container>
        <div className="text-center mb-12">
          <p className="text-primary-gold font-body text-sm uppercase tracking-[0.3em] mb-2">
            Our Work
          </p>
          <h1 className="text-display-sm md:text-display-md font-heading font-bold text-white mb-4">
            Gallery
          </h1>
          <p className="text-primary-black-300 font-body text-lg max-w-2xl mx-auto leading-relaxed">
            A look inside our craft, our space, and the experience that makes us different.
          </p>
        </div>

        <GalleryClient />
      </Container>
    </Section>
  );
}
