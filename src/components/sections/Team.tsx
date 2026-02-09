"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container, Section } from "@/components/ui";
import { TEAM_MEMBERS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(
        ".team-header > *",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".team-header", start: "top 85%" },
        }
      );

      // Team cards stagger with scale
      gsap.fromTo(
        ".team-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".team-grid", start: "top 80%" },
        }
      );

      // Parallax on team images
      const images = sectionRef.current?.querySelectorAll(".team-card-image");
      images?.forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".team-card"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="team" className="bg-primary-black-950" ref={sectionRef}>
      <Container>
        <div className="team-header text-center mb-16">
          <p className="text-primary-gold font-body text-sm uppercase tracking-[0.3em] mb-2">
            Meet the Barbers
          </p>
          <h2 className="text-display-sm md:text-display-md font-heading font-bold text-white">
            Our Team
          </h2>
        </div>

        <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.id} className="team-card group relative">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-5">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="team-card-image object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <div className="relative">
                <div className="absolute -top-[2px] left-0 w-0 h-[2px] bg-primary-gold transition-all duration-500 group-hover:w-full" />
                <h3 className="text-white font-heading text-xl font-semibold mt-1">
                  {member.name}
                </h3>
                <p className="text-primary-gold text-sm font-body uppercase tracking-wider mb-2">
                  {member.role}
                </p>
                <p className="text-primary-black-300 font-body text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
