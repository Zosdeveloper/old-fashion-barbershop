"use client";

import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  type MotionStyle,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container, Section, Button } from "@/components/ui";
import AmbientGlow from "@/components/effects/AmbientGlow";
import { SERVICES, ADDON_SERVICES, BOOKSY_URL } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  3D Tilt Service Card                                               */
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

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), {
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
    : { rotateX, rotateY, transformPerspective: 1000 };

  return (
    <motion.div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-sm bg-primary-black-900 service-card ${className ?? ""}`}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
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
        <div className="absolute inset-0 bg-gradient-to-t from-primary-black-900 via-primary-black-900/40 to-transparent" />

        {/* Signature badge */}
        {isSignature && (
          <div className="absolute top-4 left-4 md:top-6 md:left-6">
            <span className="inline-block bg-primary-gold/90 text-primary-black-900 px-3 py-1 text-xs font-heading font-bold uppercase tracking-[0.2em] rounded-sm">
              Core Service
            </span>
          </div>
        )}

        {/* Duration badge */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6">
          <span className="inline-block bg-primary-black-950/80 backdrop-blur-sm text-primary-black-300 px-3 py-1.5 text-xs font-heading font-semibold rounded-sm border border-primary-black-700/50">
            {service.duration}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={`relative p-5 md:p-6 ${isSignature ? "md:p-8" : ""}`}>
        <div className="mb-2">
          <h3
            className={`font-heading font-bold text-white ${
              isSignature ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
            }`}
          >
            {service.title}
          </h3>
          {"subtitle" in service && service.subtitle && (
            <span className="text-primary-gold font-heading text-sm font-bold uppercase tracking-wider">
              {service.subtitle}
            </span>
          )}
        </div>
        <p
          className={`text-primary-black-300 font-body leading-relaxed mb-5 ${
            isSignature
              ? "text-lg md:text-xl max-w-3xl"
              : "text-base md:text-lg"
          }`}
        >
          {service.description}
        </p>
        <Button
          href={BOOKSY_URL}
          variant="primary"
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
/*  Services Section                                                   */
/* ------------------------------------------------------------------ */

export default function Services() {
  const standardServices = SERVICES.filter((s) => !s.signature);
  const signatureService = SERVICES.find((s) => s.signature);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);
  const addonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            },
          }
        );
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".service-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
            },
          }
        );
      }

      if (signatureRef.current) {
        gsap.fromTo(
          signatureRef.current,
          { opacity: 0, y: 60, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: signatureRef.current,
              start: "top 85%",
            },
          }
        );
      }

      if (addonsRef.current) {
        gsap.fromTo(
          addonsRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: addonsRef.current,
              start: "top 90%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="services" as="section" ref={sectionRef} className="relative overflow-hidden">
      <AmbientGlow position="top-right" color="gold" size={1.2} intensity={0.6} />
      <AmbientGlow position="bottom-left" color="warm" size={1} intensity={0.4} />
      <Container className="relative z-10 max-w-7xl">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <p className="text-primary-gold font-heading text-sm font-bold uppercase tracking-[0.3em] mb-3">
            Our Craft
          </p>
          <h2 className="text-display-sm md:text-display-md font-heading font-bold text-white mb-4">
            Services
          </h2>
          <p className="text-primary-black-300 font-body text-xl max-w-2xl mx-auto leading-relaxed">
            Premium grooming for men who value quality. No templates. No shortcuts.
          </p>
        </div>

        {/* Signature Service — Full Width */}
        {signatureService && (
          <div ref={signatureRef} className="mb-5">
            <ServiceCard
              service={signatureService}
              isSignature
              className="border border-primary-gold/20"
            />
          </div>
        )}

        {/* Standard Services Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
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

          {/* Row 3: centered */}
          {standardServices[4] && (
            <div className="md:col-span-6 md:col-start-4">
              <ServiceCard service={standardServices[4]} className="h-full" />
            </div>
          )}
        </div>

        {/* Add-on Services */}
        <div ref={addonsRef} className="mt-12 md:mt-16">
          <div className="text-center mb-8">
            <h3 className="text-primary-gold font-heading text-sm font-bold uppercase tracking-[0.3em]">
              Add-On Services
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {ADDON_SERVICES.map((addon) => (
              <a
                key={addon.id}
                href={BOOKSY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between px-6 py-4 bg-primary-black-900/50 border border-primary-black-800 rounded-sm hover:border-primary-gold/30 transition-colors duration-300"
              >
                <p className="text-white font-heading text-base font-bold group-hover:text-primary-gold transition-colors">
                  {addon.title}
                </p>
                <span className="text-primary-black-500 font-heading text-xs font-semibold">
                  {addon.duration}
                </span>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
