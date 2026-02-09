import { Hero, Services, Testimonials, FAQ, Contact } from "@/components/sections";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionDivider variant="fade" />
      <Services />
      <SectionDivider variant="gold-line" />
      <Testimonials />
      <SectionDivider variant="fade" flip />
      <FAQ />
      <SectionDivider variant="gold-line" />
      <Contact />
    </>
  );
}
