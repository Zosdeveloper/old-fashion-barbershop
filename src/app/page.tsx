import { Container, Section } from "@/components/ui";
import { Hero, About, Services } from "@/components/sections";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Services Section */}
      <Services />

      {/* Team Section */}
      <Section id="team" className="bg-primary-black-950">
        <Container>
          <p className="text-primary-gold font-body text-sm uppercase tracking-[0.3em] mb-2">
            Meet the Barbers
          </p>
          <h2 className="text-display-sm md:text-display-md font-heading font-bold text-white mb-6">
            Our Team
          </h2>
          <p className="text-primary-black-300 font-body text-lg max-w-3xl leading-relaxed">
            Skilled barbers who bring decades of combined experience. Team member
            profiles will be added in a later phase.
          </p>
          <div className="h-64" aria-hidden="true" />
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section id="faq">
        <Container>
          <p className="text-primary-gold font-body text-sm uppercase tracking-[0.3em] mb-2">
            Common Questions
          </p>
          <h2 className="text-display-sm md:text-display-md font-heading font-bold text-white mb-6">
            FAQ
          </h2>
          <p className="text-primary-black-300 font-body text-lg max-w-3xl leading-relaxed">
            Frequently asked questions about appointments, pricing, and policies.
            Accordion FAQ component will be added in a later phase.
          </p>
          <div className="h-64" aria-hidden="true" />
        </Container>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="bg-primary-black-950">
        <Container>
          <p className="text-primary-gold font-body text-sm uppercase tracking-[0.3em] mb-2">
            Get In Touch
          </p>
          <h2 className="text-display-sm md:text-display-md font-heading font-bold text-white mb-6">
            Contact Us
          </h2>
          <p className="text-primary-black-300 font-body text-lg max-w-3xl leading-relaxed">
            Visit us, call us, or send a message. Contact form and embedded map will
            be added in a later phase.
          </p>
          <div className="h-64" aria-hidden="true" />
        </Container>
      </Section>
    </>
  );
}
