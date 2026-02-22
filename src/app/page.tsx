import { BUSINESS_INFO } from "@/lib/constants";
import { Hero, WhyUs, Services, Testimonials, FAQ, Contact } from "@/components/sections";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <h1 className="sr-only">
        Old Fashion Barbershop — Premium Barbershop in Naples, FL
      </h1>
      <Hero />

      {/* Server-rendered intro for SEO/AEO — key facts crawlers & AI can extract */}
      <section className="bg-primary-black-950 pt-12 pb-2">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <p className="text-primary-black-400 font-body text-base leading-relaxed">
            Old Fashion Barbershop is a premium men&apos;s barbershop located at{" "}
            {BUSINESS_INFO.address.full}, in the heart of downtown Naples.
            Specializing in precision haircuts, beard shaping, hot steam shaves,
            and signature grooming rituals — walk-ins are welcome, or book ahead
            on Booksy. Serving Naples, Bonita Springs, Fort Myers, Marco Island,
            and Cape Coral.
          </p>
        </div>
      </section>

      <WhyUs />
      <SectionDivider variant="gold-line" />
      <Services />
      <SectionDivider variant="gold-line" />
      <Testimonials />
      <SectionDivider variant="gold-line" />
      <Contact />
      <SectionDivider variant="fade" flip />
      <FAQ />
    </>
  );
}
