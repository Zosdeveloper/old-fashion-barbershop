import { Hero, WhyUs, Services, Testimonials, FAQ, Contact } from "@/components/sections";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <h1 className="sr-only">
        Old Fashion Barbershop — Premium Barbershop in Naples, FL
      </h1>
      <Hero />
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
