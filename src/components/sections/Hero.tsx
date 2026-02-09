"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Container } from "@/components/ui";
import Button from "@/components/ui/Button";
import { SITE_CONFIG, BOOKSY_URL, HERO_IMAGES } from "@/lib/constants";
import GoldParticles from "@/components/effects/GoldParticles";

/* ------------------------------------------------------------------ */
/*  Ken Burns directions — each slide gets its own movement            */
/* ------------------------------------------------------------------ */
const kenBurns = [
  { from: "scale(1) translate(0%, 0%)", to: "scale(1.15) translate(-2%, -1%)" },
  { from: "scale(1.1) translate(-1%, 0%)", to: "scale(1) translate(1%, 1%)" },
  { from: "scale(1) translate(1%, 1%)", to: "scale(1.12) translate(-1%, -2%)" },
  { from: "scale(1.12) translate(0%, -1%)", to: "scale(1) translate(0%, 1%)" },
  { from: "scale(1) translate(-1%, 0%)", to: "scale(1.15) translate(1%, -1%)" },
];

const SLIDE_DURATION = 6000; // ms per slide
const FADE_DURATION = 2; // seconds for crossfade

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
  const [currentSlide, setCurrentSlide] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-10%"]);

  // Auto-advance slideshow
  const advance = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [advance]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Multi-image slideshow with crossfade + Ken Burns */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: FADE_DURATION, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 hero-ken-burns"
              style={{
                ["--kb-from" as string]: kenBurns[currentSlide % kenBurns.length].from,
                ["--kb-to" as string]: kenBurns[currentSlide % kenBurns.length].to,
              }}
            >
              <Image
                src={HERO_IMAGES[currentSlide].src}
                alt=""
                fill
                sizes="100vw"
                priority={currentSlide === 0}
                quality={85}
                className="object-cover object-center"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Cinematic Vignette */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      {/* Gold warm light bleed */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[40%] z-[1] opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at top center, rgba(212,175,55,0.3) 0%, transparent 70%)",
        }}
      />

      {/* Gold Particles */}
      <GoldParticles count={35} />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <Container className="text-center">
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

      {/* Slide progress indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className="relative h-[2px] w-8 bg-white/20 overflow-hidden rounded-full"
            aria-label={`Go to slide ${i + 1}`}
          >
            {i === currentSlide && (
              <motion.div
                className="absolute inset-y-0 left-0 bg-primary-gold"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                key={`progress-${currentSlide}`}
              />
            )}
            {i < currentSlide && (
              <div className="absolute inset-0 bg-primary-gold/50" />
            )}
          </button>
        ))}
      </div>

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
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7" />
            </svg>
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
