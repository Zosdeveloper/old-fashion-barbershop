import { Hero, WhyUs, Services, Testimonials, FAQ, Contact } from "@/components/sections";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
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
