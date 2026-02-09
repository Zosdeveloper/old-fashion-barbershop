"use client";

import Image from "next/image";
import { useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  type MotionStyle,
} from "framer-motion";
import { Container, Section, Button } from "@/components/ui";
import { SERVICES, BOOKSY_URL } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  3D Tilt Card                                                       */
/* ------------------------------------------------------------------ */

function ServiceCard({
  service,
  className,
  isSignature = false,
}: {
  service: (typeof SERVICES)[number];
  className?: string;
  isSignature?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  // Motion values for 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), {
    stiffness: 200,
    damping: 30,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch) return;
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [isTouch, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  const handleTouchStart = useCallback(() => {
    setIsTouch(true);
  }, []);

  const tiltStyle: MotionStyle = isTouch
    ? {}
    : {
        rotateX,
        rotateY,
        transformPerspective: 1000,
      };

  return (
    <motion.div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-sm bg-primary-black-900 ${className ?? ""}`}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      variants={cardVariants}
    >
      {/* Image */}
      <div
        className={`relative w-full overflow-hidden ${
          isSignature ? "aspect-[21/9] md:aspect-[21/9]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={service.image}
          alt={`${service.title} at Old Fashion Barbershop`}
          fill
          sizes={
            isSignature
              ? "(max-width: 768px) 100vw, 100vw"
              : "(max-width: 768px) 100vw, 50vw"
          }
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-black-900 via-primary-black-900/40 to-transparent" />

        {/* Signature badge */}
        {isSignature && (
          <div className="absolute top-4 left-4 md:top-6 md:left-6">
            <span className="inline-block bg-primary-gold/90 text-primary-black-900 px-3 py-1 text-xs font-body font-semibold uppercase tracking-[0.2em] rounded-sm">
              Signature
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className={`relative p-5 md:p-6 ${
          isSignature ? "md:p-8" : ""
        }`}
      >
        <h3
          className={`font-heading font-bold text-white mb-2 ${
            isSignature
              ? "text-2xl md:text-3xl"
              : "text-xl md:text-2xl"
          }`}
        >
          {service.title}
        </h3>
        <p
          className={`text-primary-black-300 font-body leading-relaxed mb-4 ${
            isSignature
              ? "text-base md:text-lg max-w-3xl"
              : "text-sm md:text-base"
          }`}
        >
          {service.description}
        </p>
        <Button
          href={BOOKSY_URL}
          variant={isSignature ? "primary" : "outline"}
          size="sm"
        >
          Book Now
        </Button>
      </div>

      {/* Gold accent border on hover */}
      <div className="absolute inset-0 rounded-sm border border-transparent transition-colors duration-500 group-hover:border-primary-gold/30 pointer-events-none" />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const signatureVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Services Section                                                   */
/* ------------------------------------------------------------------ */

export default function Services() {
  const standardServices = SERVICES.filter((s) => !s.signature);
  const signatureService = SERVICES.find((s) => s.signature);

  return (
    <Section id="services">
      <Container className="max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={headerVariants} className="text-center mb-12 md:mb-16">
            <p className="text-primary-gold font-body text-sm uppercase tracking-[0.3em] mb-3">
              Our Craft
            </p>
            <h2 className="text-display-sm md:text-display-md font-heading font-bold text-white mb-4">
              Services
            </h2>
            <p className="text-primary-black-300 font-body text-lg max-w-2xl mx-auto leading-relaxed">
              Every service is a ritual of precision, performed with intention
              and refined through years of mastery.
            </p>
          </motion.div>

          {/* Asymmetric Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
            {/* Row 1: 7/5 split */}
            {standardServices[0] && (
              <div className="md:col-span-7">
                <ServiceCard service={standardServices[0]} className="h-full" />
              </div>
            )}
            {standardServices[1] && (
              <div className="md:col-span-5">
                <ServiceCard service={standardServices[1]} className="h-full" />
              </div>
            )}

            {/* Row 2: 5/7 split */}
            {standardServices[2] && (
              <div className="md:col-span-5">
                <ServiceCard service={standardServices[2]} className="h-full" />
              </div>
            )}
            {standardServices[3] && (
              <div className="md:col-span-7">
                <ServiceCard service={standardServices[3]} className="h-full" />
              </div>
            )}

            {/* Row 3: Full-width signature */}
            {signatureService && (
              <motion.div
                className="md:col-span-12"
                variants={signatureVariants}
              >
                <ServiceCard
                  service={signatureService}
                  isSignature
                  className="border border-primary-gold/20"
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
