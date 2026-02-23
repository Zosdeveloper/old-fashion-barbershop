"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container, Section } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-header > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: { trigger: ".about-header", start: "top 95%" },
        }
      );

      gsap.fromTo(
        ".about-col-left",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: ".about-col-left", start: "top 95%" },
        }
      );

      gsap.fromTo(
        ".about-col-right",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.25,
          ease: "power2.out",
          scrollTrigger: { trigger: ".about-col-right", start: "top 95%" },
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
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: ".about-cocktail-text", start: "top 95%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Slow the video to 0.6x for a cinematic feel */
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
    }
  }, []);

  return (
    <div ref={sectionRef} className="relative overflow-hidden">
      {/* ── Cinematic Video Background (spans both sections) ── */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <source src="/videos/cocktail-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay — keeps text legible, adds moody warmth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(180deg, rgba(18,18,18,0.88) 0%, rgba(28,22,16,0.82) 40%, rgba(28,22,16,0.82) 60%, rgba(18,18,18,0.88) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle warm vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          boxShadow: "inset 0 0 200px 60px rgba(0,0,0,0.5)",
        }}
        aria-hidden="true"
      />

      {/* ── Craftsmanship Meets Tradition ── */}
      <section id="about" className="relative py-section lg:py-section-lg" style={{ zIndex: 5 }}>
        <Container className="max-w-6xl relative">
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

      {/* ── Hand-Crafted Old Fashioned ── */}
      <section className="about-cocktail relative py-section lg:py-section-lg" style={{ zIndex: 5 }}>
        <Container className="max-w-6xl relative">
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
