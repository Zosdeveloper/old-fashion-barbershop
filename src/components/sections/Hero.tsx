"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui";
import Button from "@/components/ui/Button";
import { SITE_CONFIG, BOOKSY_URL } from "@/lib/constants";
import GoldParticles from "@/components/effects/GoldParticles";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: image moves slower than scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  // Content fades and lifts as you scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-10%"]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Ken Burns */}
      <motion.div
        className="absolute inset-0 scale-110"
        style={{ y: imageY }}
      >
        <div className="absolute inset-0 animate-ken-burns">
          <Image
            src="/images/hero/hero-barbershop.jpg"
            alt=""
            fill
            sizes="100vw"
            priority
            quality={85}
            className="object-cover object-center"
          />
        </div>
      </motion.div>

      {/* Cinematic Vignette */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      {/* Gradient Overlay — darker, more dramatic */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/40 to-black/80" />

      {/* Gold warm light bleed from top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[40%] z-[1] opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at top center, rgba(212,175,55,0.3) 0%, transparent 70%)",
        }}
      />

      {/* Gold Particles */}
      <GoldParticles count={35} />

      {/* Content with parallax */}
      <motion.div
        className="relative z-10 w-full"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <Container className="text-center">
          {/* Decorative line */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="block w-12 h-px bg-primary-gold/50" />
            <p className="text-primary-gold font-body text-sm uppercase tracking-[0.4em]">
              Naples, Florida
            </p>
            <span className="block w-12 h-px bg-primary-gold/50" />
          </motion.div>

          <motion.h1
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-display-md md:text-display-lg lg:text-[5.5rem] lg:leading-[1.05] font-heading font-bold text-white mb-6 tracking-tight"
          >
            {SITE_CONFIG.name}
          </motion.h1>

          <motion.p
            custom={0.4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-primary-black-200 font-body text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {SITE_CONFIG.tagline}
          </motion.p>

          <motion.div
            custom={0.6}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button href={BOOKSY_URL} variant="primary" size="lg">
              Book Appointment
            </Button>
            <Button href="/about" variant="outline" size="lg">
              Our Story
            </Button>
          </motion.div>
        </Container>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a
          href="#services"
          className="flex flex-col items-center gap-2 text-white/40 hover:text-primary-gold/80 transition-colors duration-500"
          aria-label="Scroll to services section"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-body">
            Discover
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 14l-7 7m0 0l-7-7"
              />
            </svg>
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
