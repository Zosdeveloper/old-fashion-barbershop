"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container, Section } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

const VALUE_PROPS = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M24 44c-2-3-4-5.5-4-9a4 4 0 0 1 8 0c0 3.5-2 6-4 9Z" />
        <path d="M15 6h18v4a3 3 0 0 1-3 3h-2l1 8h2a3 3 0 0 1 3 3v2H14v-2a3 3 0 0 1 3-3h2l1-8h-2a3 3 0 0 1-3-3V6Z" />
        <circle cx="24" cy="35" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: "Signature Old Fashioned",
    description:
      "Every client is welcomed with a hand-crafted Old Fashioned cocktail — our signature touch that turns a haircut into an experience.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <rect x="8" y="8" width="32" height="32" rx="4" />
        <path d="M8 18h32" />
        <path d="M18 8v10" />
        <path d="M30 8v10" />
        <path d="M20 28l3 3 6-6" />
      </svg>
    ),
    title: "Walk-Ins Welcome",
    description:
      "No appointment? No problem. Walk in during business hours and we'll take care of you — or book ahead on Booksy to guarantee your spot.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M6 38 C6 38 10 18 24 18 C38 18 42 38 42 38" />
        <path d="M24 18V10" />
        <circle cx="24" cy="7" r="3" />
        <path d="M16 30c2-4 6-6 8-6s6 2 8 6" />
        <path d="M12 36c1-2 3-4 5-4" />
        <path d="M36 36c-1-2-3-4-5-4" />
      </svg>
    ),
    title: "Master-Level Barbers",
    description:
      "Our team brings 15+ years of combined experience. Every fade, shave, and lineup is executed with precision that only comes from thousands of cuts.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M24 4l5.5 11.2L42 17l-9 8.8L35 38 24 32.2 13 38l2-12.2-9-8.8 12.5-1.8Z" />
      </svg>
    ),
    title: "Premium Products Only",
    description:
      "We use only top-shelf grooming products. From pre-shave oils to finishing balms, every product is selected for performance — never filler.",
  },
] as const;

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".whyus-header > *",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".whyus-header", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".whyus-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".whyus-grid", start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="why-us" className="bg-primary-black-950 relative overflow-hidden" ref={sectionRef}>
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-gold/20 to-transparent" />

      <Container className="relative z-10 max-w-6xl">
        <div className="whyus-header text-center mb-14 md:mb-20">
          <p className="text-primary-gold font-heading text-sm font-bold uppercase tracking-[0.3em] mb-3">
            The Difference
          </p>
          <h2 className="text-display-sm md:text-display-md font-heading font-bold text-white mb-4">
            Why Old Fashion
          </h2>
          <p className="text-primary-black-300 font-body text-xl max-w-2xl mx-auto leading-relaxed">
            More than a barbershop — a destination built on craft, community, and attention to detail.
          </p>
        </div>

        <div className="whyus-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {VALUE_PROPS.map((prop, i) => (
            <div
              key={i}
              className="whyus-card group text-center px-4 py-8 md:py-10 rounded-sm border border-primary-black-800 bg-primary-black-900/40 transition-all duration-500 hover:border-primary-gold/30 hover:bg-primary-black-900/70"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-primary-gold/20 text-primary-gold mb-6 transition-all duration-500 group-hover:border-primary-gold/50 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                {prop.icon}
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-3">
                {prop.title}
              </h3>
              <p className="text-primary-black-400 font-body text-base leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
