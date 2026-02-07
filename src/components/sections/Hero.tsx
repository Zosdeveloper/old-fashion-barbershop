"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui";
import Button from "@/components/ui/Button";
import { SITE_CONFIG, BOOKSY_URL } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src="/images/hero/hero-barbershop.jpg"
        alt=""
        fill
        sizes="100vw"
        priority
        quality={85}
        className="object-cover object-center"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Content */}
      <Container className="relative z-10 text-center">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-primary-gold font-body text-sm uppercase tracking-[0.3em] mb-4"
        >
          Naples, Florida
        </motion.p>

        <motion.h1
          custom={0.15}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-display-md md:text-display-lg font-heading font-bold text-white mb-6"
        >
          {SITE_CONFIG.name}
        </motion.h1>

        <motion.p
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-primary-black-200 font-body text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          {SITE_CONFIG.tagline}
        </motion.p>

        <motion.div
          custom={0.45}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button href={BOOKSY_URL} variant="primary" size="lg">
            Book Appointment
          </Button>
          <Button href="#about" variant="outline" size="lg">
            Our Story
          </Button>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors"
          aria-label="Scroll to about section"
        >
          <span className="text-xs uppercase tracking-widest font-body">
            Scroll
          </span>
          <svg
            className="w-5 h-5 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
