"use client";

import { motion } from "framer-motion";
import { Container, Section, Button } from "@/components/ui";
import AmbientGlow from "@/components/effects/AmbientGlow";
import { BUSINESS_INFO, BOOKSY_URL } from "@/lib/constants";

export default function Contact() {
  return (
    <>
      {/* Contact Info Section */}
      <Section id="contact" className="bg-primary-black-950 relative overflow-hidden">
        <AmbientGlow position="top-right" color="gold" size={1} intensity={0.4} />
        <Container className="relative z-10">
          <div className="text-center mb-12">
            <p className="text-primary-gold font-heading text-sm font-bold uppercase tracking-[0.3em] mb-2">
              Get In Touch
            </p>
            <h2 className="text-display-sm md:text-display-md font-heading font-bold text-white">
              Visit Us
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Phone */}
              <div>
                <h3 className="text-primary-gold font-heading text-sm font-bold uppercase tracking-widest mb-2">
                  Phone
                </h3>
                <a
                  href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9+]/g, "")}`}
                  className="text-white font-heading text-2xl hover:text-primary-gold transition-colors duration-300"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-primary-gold font-heading text-sm font-bold uppercase tracking-widest mb-2">
                  Address
                </h3>
                <p className="text-primary-black-200 font-body text-lg leading-relaxed">
                  {BUSINESS_INFO.address.street}
                  <br />
                  {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state}{" "}
                  {BUSINESS_INFO.address.zip}
                </p>
              </div>

              {/* Hours */}
              <div>
                <h3 className="text-primary-gold font-body text-sm uppercase tracking-widest mb-3">
                  Hours
                </h3>
                <div className="space-y-1">
                  {BUSINESS_INFO.hours.map((h) => (
                    <div
                      key={h.day}
                      className="flex justify-between max-w-xs text-sm font-body"
                    >
                      <span className="text-primary-black-300">{h.day}</span>
                      <span className="text-white">
                        {h.open === "Closed"
                          ? "Closed"
                          : "reopen" in h
                          ? `${h.open}–${h.close} & ${h.reopen}–${h.reclose}`
                          : `${h.open}–${h.close}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Google Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-full aspect-[4/3] rounded-sm overflow-hidden border border-primary-black-800"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3585.8!2d-81.7948!3d26.1420!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s852+1st+Ave+S%2C+Naples%2C+FL+34102!5e0!3m2!1sen!2sus!4v1700000000000"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "grayscale(1) invert(0.92) contrast(0.85)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Old Fashion Barbershop location"
                className="w-full h-full"
              />
              {/* Gold corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-primary-gold/40 pointer-events-none" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-primary-gold/40 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-primary-gold/40 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-primary-gold/40 pointer-events-none" />
            </motion.div>
          </div>
        </Container>
      </Section>

    </>
  );
}
