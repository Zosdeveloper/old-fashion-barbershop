"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container, Section } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-header > *",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-header", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".about-col-left",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-col-left", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".about-col-right",
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-col-right", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".about-cocktail-image",
        { y: 40, scale: 1.05 },
        {
          y: -40,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-cocktail",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        ".about-cocktail-text > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-cocktail-text", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      {/* ── Craftsmanship Meets Tradition — Cinematic Light Leak ── */}
      <section id="about" className="light-leak bg-charcoal py-section lg:py-section-lg">
        <Container className="max-w-6xl relative z-10">
          <div className="about-header text-center mb-16">
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
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="about-col-left space-y-6 text-primary-black-300 font-body leading-relaxed">
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

            <div className="about-col-right space-y-6 text-primary-black-300 font-body leading-relaxed">
              <p>
                Our commitment extends beyond technique. Each visit includes
                complimentary consultations, premium grooming products, and hot
                towel treatments that elevate the entire experience. We take the
                time to understand your style, lifestyle, and preferences —
                because the details matter.
              </p>
              <p className="text-white font-semibold text-lg">
                This isn&apos;t just a haircut. This is where men refine their
                presence.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Hand-Crafted Old Fashioned — Amber Grain Wash ── */}
      <section className="about-cocktail amber-wash py-section lg:py-section-lg">
        <Container className="max-w-6xl relative z-10">
          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
            <div className="md:col-span-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                <Image
                  src="/images/hero/hero-cocktail.jpg"
                  alt="Hand-crafted Old Fashioned cocktail at Old Fashion Barbershop"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="about-cocktail-image object-cover"
                />
              </div>
            </div>

            <div className="about-cocktail-text md:col-span-3">
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
        </Container>
      </section>
    </div>
  );
}
