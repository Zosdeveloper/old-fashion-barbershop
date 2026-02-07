import { Container, Section } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/constants";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex items-center justify-center min-h-screen bg-dark-gradient"
      >
        <Container className="text-center">
          <p className="text-primary-gold font-body text-sm uppercase tracking-[0.3em] mb-4">
            Naples, Florida
          </p>
          <h1 className="text-display-md md:text-display-lg font-heading font-bold text-white mb-6">
            {SITE_CONFIG.name}
          </h1>
          <p className="text-primary-black-300 font-body text-lg md:text-xl max-w-2xl mx-auto mb-8">
            {SITE_CONFIG.tagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={process.env.NEXT_PUBLIC_BOOKSY_URL || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-gold text-primary-black-900 font-semibold uppercase tracking-wide rounded-sm hover:bg-primary-gold-400 transition-colors duration-300"
            >
              Book Appointment
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-gold text-primary-gold font-semibold uppercase tracking-wide rounded-sm hover:bg-primary-gold hover:text-primary-black-900 transition-colors duration-300"
            >
              Our Services
            </a>
          </div>
        </Container>
      </section>

      {/* About Section */}
      <Section id="about" className="bg-primary-black-950">
        <Container>
          <p className="text-primary-gold font-body text-sm uppercase tracking-[0.3em] mb-2">
            Our Story
          </p>
          <h2 className="text-display-sm md:text-display-md font-heading font-bold text-white mb-6">
            About Us
          </h2>
          <p className="text-primary-black-300 font-body text-lg max-w-3xl leading-relaxed">
            A traditional barbershop experience rooted in craftsmanship and community.
            This section will be fully built out in a later phase with imagery,
            history, and the shop story.
          </p>
          <div className="h-64" aria-hidden="true" />
        </Container>
      </Section>

      {/* Services Section */}
      <Section id="services">
        <Container>
          <p className="text-primary-gold font-body text-sm uppercase tracking-[0.3em] mb-2">
            What We Offer
          </p>
          <h2 className="text-display-sm md:text-display-md font-heading font-bold text-white mb-6">
            Our Services
          </h2>
          <p className="text-primary-black-300 font-body text-lg max-w-3xl leading-relaxed">
            From classic cuts to hot towel shaves, every service is performed with
            precision and care. Full service cards will be added in a later phase.
          </p>
          <div className="h-64" aria-hidden="true" />
        </Container>
      </Section>

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
