"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui";
import { TESTIMONIALS, GOOGLE_REVIEWS_URL, BOOKSY_URL } from "@/lib/constants";

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

          {/* Review links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 border border-primary-black-700 rounded-sm text-primary-black-200 font-body text-sm uppercase tracking-[0.15em] hover:border-primary-gold/40 hover:text-primary-gold transition-all duration-300"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              See All Google Reviews
            </a>
            <a
              href={BOOKSY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 border border-primary-black-700 rounded-sm text-primary-black-200 font-body text-sm uppercase tracking-[0.15em] hover:border-primary-gold/40 hover:text-primary-gold transition-all duration-300"
            >
              See All Booksy Reviews
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
