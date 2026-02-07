"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container, Section } from "@/components/ui";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section id="about" className="bg-primary-black-950">
      <Container className="max-w-6xl">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {/* Section Header */}
          <motion.div variants={fadeIn} className="text-center mb-16">
            <p className="text-primary-gold font-body text-sm uppercase tracking-[0.3em] mb-3">
              Our Story
            </p>
            <h2 className="text-display-sm md:text-display-md font-heading font-bold text-white mb-6">
              Craftsmanship Meets Tradition
            </h2>
            <p className="text-primary-black-300 font-body text-lg max-w-3xl mx-auto leading-relaxed">
              Where precision grooming and old-world hospitality create an
              experience beyond the chair.
            </p>
          </motion.div>

          {/* Two-Column Content */}
          <motion.div
            variants={fadeIn}
            className="grid md:grid-cols-2 gap-8 md:gap-12 mb-20"
          >
            <div className="space-y-6 text-primary-black-300 font-body leading-relaxed">
              <p className="text-lg">
                At Old Fashion Barbershop, we believe grooming is an art form.
                Every cut, every shave is performed with meticulous attention to
                detail and respect for traditional barbering techniques passed
                down through generations.
              </p>
              <p>
                Located in the heart of Naples, we serve discerning gentlemen
                who appreciate quality, precision, and an experience that goes
                beyond the chair. Our barbers bring decades of combined
                experience, trained in classic methods and committed to
                continuous refinement of their craft.
              </p>
            </div>

            <div className="space-y-6 text-primary-black-300 font-body leading-relaxed">
              <p>
                Our commitment extends beyond technique. Each visit includes
                complimentary consultations, premium grooming products, and hot
                towel treatments that elevate the entire experience. We take the
                time to understand your style, lifestyle, and preferences —
                because the details matter.
              </p>
              <p className="text-white font-semibold text-lg">
                This isn&apos;t just a haircut. It&apos;s a ritual. A moment of
                refinement in your day.
              </p>
            </div>
          </motion.div>

          {/* Signature Old Fashioned Feature */}
          <motion.div
            variants={fadeIn}
            className="border-t border-primary-gold/20 pt-16"
          >
            <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
              <div className="md:col-span-2">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  <Image
                    src="/images/about/signature-cocktail.jpg"
                    alt="Hand-crafted Old Fashioned cocktail at Old Fashion Barbershop"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="md:col-span-3">
                <p className="text-primary-gold font-body text-sm uppercase tracking-[0.3em] mb-3">
                  The Signature Touch
                </p>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-6">
                  Hand-Crafted Old Fashioned Cocktails
                </h3>
                <div className="space-y-4 text-primary-black-300 font-body leading-relaxed">
                  <p>
                    For clients who have become part of our community, the owner
                    personally hand-crafts Old Fashioned cocktails using premium
                    bourbon, house-made bitters, and a touch of artistry honed
                    over years.
                  </p>
                  <p>
                    It&apos;s more than a drink — it&apos;s our way of saying
                    you&apos;re not just a client, you&apos;re family. This
                    exclusive offering embodies our philosophy: elevated service,
                    personal attention, and an experience you won&apos;t find
                    anywhere else in Naples.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
