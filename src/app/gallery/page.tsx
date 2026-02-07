import type { Metadata } from "next";
import { Container, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse our latest cuts, styles, and shop photos at Old Fashion Barbershop in Naples, FL.",
};

export default function GalleryPage() {
  return (
    <Section className="min-h-screen pt-32">
      <Container>
        <p className="text-primary-gold font-body text-sm uppercase tracking-[0.3em] mb-2">
          Our Work
        </p>
        <h1 className="text-display-sm md:text-display-md font-heading font-bold text-white mb-6">
          Gallery
        </h1>
        <p className="text-primary-black-300 font-body text-lg max-w-3xl leading-relaxed">
          Photo gallery coming soon. This page will showcase our best work with a
          masonry grid layout, category filters, and a lightbox viewer.
        </p>
      </Container>
    </Section>
  );
}
