"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const imgReveal = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Each image on a different parallax rate
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const y4 = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-primary-black-950 overflow-hidden pt-24 pb-12 md:pb-0"
    >
      {/* Subtle radial glow behind the composition */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "80%",
          height: "60%",
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.03) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ═══ DESKTOP LAYOUT (md+) ═══ */}
      <div className="hidden md:block relative mx-auto max-w-7xl px-6 lg:px-8"
        style={{ minHeight: "85vh" }}
      >
        {/* ── TOP ROW: Large image left + Medium image right ── */}
        <div className="relative grid grid-cols-12 gap-6 items-start">
          {/* Large anchor — interior shot, diagonal clip on bottom-right */}
          <motion.div
            className="col-span-7 relative overflow-hidden"
            style={{
              y: y1,
              height: "420px",
              clipPath: "polygon(0 0, 100% 0, 96% 100%, 0 100%)",
            }}
            custom={0.1}
            variants={imgReveal}
            initial="hidden"
            animate="visible"
          >
            <Image
              src="/images/gallery/interior-04.jpg"
              alt="Old Fashion Barbershop interior — leather chairs and brick walls"
              fill
              sizes="(max-width: 1280px) 58vw, 700px"
              className="object-cover"
              priority
            />
            {/* Warm overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(13,13,13,0.15) 0%, rgba(13,13,13,0.4) 100%)",
              }}
            />
          </motion.div>

          {/* Medium — beard trim action, offset down, asymmetric radius */}
          <motion.div
            className="col-span-4 col-start-9 relative overflow-hidden"
            style={{
              y: y2,
              height: "340px",
              marginTop: "60px",
              borderRadius: "0 0 0 32px",
            }}
            custom={0.3}
            variants={imgReveal}
            initial="hidden"
            animate="visible"
          >
            <Image
              src="/images/hero/hero-beard-trim.jpg"
              alt="Master barber trimming a client's beard"
              fill
              sizes="(max-width: 1280px) 33vw, 400px"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(13,13,13,0.1) 0%, rgba(13,13,13,0.35) 100%)",
              }}
            />
          </motion.div>
        </div>

        {/* ── HEADLINE ZONE — overlaps the images above ── */}
        <div className="relative -mt-16 z-10 text-center py-12">
          {/* Gold ornamental line */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-5"
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <span className="block w-16 h-px bg-primary-gold/30" />
            <span
              className="font-body text-primary-gold text-xs uppercase"
              style={{ letterSpacing: "0.35em" }}
            >
              Our Story
            </span>
            <span className="block w-16 h-px bg-primary-gold/30" />
          </motion.div>

          <motion.h1
            className="font-heading font-bold text-white leading-none mb-5"
            style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)", letterSpacing: "-0.02em" }}
            custom={0.35}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Craftsmanship
            <br />
            <span className="text-gold-gradient">Meets Tradition</span>
          </motion.h1>

          <motion.p
            className="font-body text-primary-black-300 text-lg md:text-xl max-w-xl mx-auto leading-relaxed"
            custom={0.5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Where precision grooming and old-world hospitality create an
            experience beyond the chair.
          </motion.p>
        </div>

        {/* ── BOTTOM ROW: Small rotated left + Wide image right ── */}
        <div className="relative grid grid-cols-12 gap-6 items-end -mt-4 pb-16">
          {/* Small — cocktail, rotated, sits offset */}
          <motion.div
            className="col-span-3 col-start-2 relative overflow-hidden"
            style={{
              y: y3,
              height: "280px",
              transform: "rotate(-2deg)",
              borderRadius: "0 24px 0 0",
            }}
            custom={0.5}
            variants={imgReveal}
            initial="hidden"
            animate="visible"
          >
            <Image
              src="/images/about/cocktail-handoff.jpg"
              alt="Signature Old Fashioned cocktail being crafted"
              fill
              sizes="(max-width: 1280px) 25vw, 300px"
              className="object-cover"
              style={{ transform: "rotate(2deg) scale(1.1)" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(13,13,13,0.05) 0%, rgba(13,13,13,0.3) 100%)",
              }}
            />
          </motion.div>

          {/* Gold diamond accent between images */}
          <div className="col-span-1 flex items-center justify-center" aria-hidden="true">
            <div
              className="w-2 h-2 rotate-45 border border-primary-gold/30"
            />
          </div>

          {/* Wide — scissors detail, diagonal clip on top-left */}
          <motion.div
            className="col-span-6 col-start-7 relative overflow-hidden"
            style={{
              y: y4,
              height: "300px",
              clipPath: "polygon(4% 0, 100% 0, 100% 100%, 0 100%)",
            }}
            custom={0.6}
            variants={imgReveal}
            initial="hidden"
            animate="visible"
          >
            <Image
              src="/images/hero/hero-scissors-cut.jpg"
              alt="Precision scissor cut in progress"
              fill
              sizes="(max-width: 1280px) 50vw, 600px"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(13,13,13,0.1) 0%, rgba(13,13,13,0.35) 100%)",
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* ═══ MOBILE LAYOUT (< md) ═══ */}
      <div className="md:hidden px-4">
        {/* Large image with diagonal clip */}
        <motion.div
          className="relative w-full overflow-hidden mb-8"
          style={{
            height: "300px",
            clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
          }}
          custom={0.1}
          variants={imgReveal}
          initial="hidden"
          animate="visible"
        >
          <Image
            src="/images/gallery/interior-04.jpg"
            alt="Old Fashion Barbershop interior"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(13,13,13,0.1) 0%, rgba(13,13,13,0.5) 100%)",
            }}
          />
        </motion.div>

        {/* Headline */}
        <div className="text-center mb-8">
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <span className="block w-10 h-px bg-primary-gold/30" />
            <span
              className="font-body text-primary-gold text-xs uppercase"
              style={{ letterSpacing: "0.3em" }}
            >
              Our Story
            </span>
            <span className="block w-10 h-px bg-primary-gold/30" />
          </motion.div>

          <motion.h1
            className="font-heading font-bold text-white text-5xl leading-none mb-4"
            style={{ letterSpacing: "-0.02em" }}
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Craftsmanship
            <br />
            <span className="text-gold-gradient">Meets Tradition</span>
          </motion.h1>

          <motion.p
            className="font-body text-primary-black-300 text-lg leading-relaxed max-w-sm mx-auto"
            custom={0.4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Where precision grooming and old-world hospitality create an
            experience beyond the chair.
          </motion.p>
        </div>

        {/* Two images side by side — offset vertically */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <motion.div
            className="relative overflow-hidden"
            style={{
              height: "200px",
              marginTop: "20px",
              borderRadius: "0 0 0 20px",
            }}
            custom={0.5}
            variants={imgReveal}
            initial="hidden"
            animate="visible"
          >
            <Image
              src="/images/hero/hero-beard-trim.jpg"
              alt="Barber trimming a beard"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            className="relative overflow-hidden"
            style={{
              height: "200px",
              clipPath: "polygon(6% 0, 100% 0, 100% 100%, 0 100%)",
            }}
            custom={0.6}
            variants={imgReveal}
            initial="hidden"
            animate="visible"
          >
            <Image
              src="/images/about/cocktail-handoff.jpg"
              alt="Signature Old Fashioned cocktail"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
