"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui";
import { TESTIMONIALS } from "@/lib/constants";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: rating }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-primary-gold"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: (typeof TESTIMONIALS)[number] }) {
  return (
    <div className="flex-shrink-0 w-[380px] md:w-[440px] bg-primary-black-900/60 border border-primary-black-800 rounded-sm p-8 mx-3">
      <StarRating rating={testimonial.rating} />
      <blockquote>
        <p className="text-white font-heading text-lg md:text-xl leading-snug font-medium mb-6">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </blockquote>
      <div className="flex items-center gap-3">
        <span className="block w-6 h-px bg-primary-gold/40" />
        <div>
          <p className="text-primary-gold font-body text-sm uppercase tracking-[0.15em]">
            {testimonial.name}
          </p>
          <p className="text-primary-black-500 font-body text-xs mt-0.5">
            {testimonial.title}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  // Double the items for seamless loop
  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <Section className="relative overflow-hidden !py-0">
      <div className="relative min-h-[500px] md:min-h-[550px] flex items-center">
        {/* Background image with heavy overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/gallery/interior-01.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-primary-black-950/85" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 20%, rgba(13,13,13,0.6) 100%)",
            }}
          />
        </div>

        {/* Decorative gold lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-gold/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-gold/30 to-transparent" />

        {/* Side gold accents */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-1/3 bg-gradient-to-b from-transparent via-primary-gold/20 to-transparent hidden lg:block" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-1/3 bg-gradient-to-b from-transparent via-primary-gold/20 to-transparent hidden lg:block" />

        <div className="relative z-10 w-full py-16 md:py-20">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10"
          >
            <span className="inline-block text-primary-gold font-body text-sm uppercase tracking-[0.4em]">
              483 Five-Star Reviews
            </span>
          </motion.div>

          {/* Infinite scroll marquee */}
          <div className="relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(13,13,13,0.95) 0%, transparent 100%)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, rgba(13,13,13,0.95) 0%, transparent 100%)" }} />

            <div className="overflow-hidden">
              <div className="testimonial-marquee flex">
                {items.map((t, i) => (
                  <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
