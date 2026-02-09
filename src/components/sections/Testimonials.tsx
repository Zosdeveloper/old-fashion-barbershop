"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Section } from "@/components/ui";
import { TESTIMONIALS } from "@/lib/constants";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1.5 justify-center mb-8">
      {Array.from({ length: rating }).map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5 text-primary-gold"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    filter: "blur(4px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 60 : -60,
    opacity: 0,
    filter: "blur(4px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Testimonials() {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = useCallback(
    (newDirection: number) => {
      setCurrent(([prev]) => {
        const next =
          (prev + newDirection + TESTIMONIALS.length) % TESTIMONIALS.length;
        return [next, newDirection];
      });
    },
    []
  );

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => paginate(1), 7000);
    return () => clearInterval(timer);
  }, [isPaused, paginate]);

  const testimonial = TESTIMONIALS[current];

  return (
    <Section className="relative overflow-hidden !py-0">
      <div className="relative min-h-[600px] md:min-h-[700px] flex items-center">
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

        <Container className="relative z-10 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Section label */}
            <div className="text-center mb-4">
              <span className="inline-block text-primary-gold font-body text-sm uppercase tracking-[0.4em]">
                344 Five-Star Reviews
              </span>
            </div>

            {/* Carousel */}
            <div
              className="relative max-w-4xl mx-auto"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="relative min-h-[320px] md:min-h-[280px] flex items-center">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full px-4 md:px-20"
                  >
                    <div className="text-center">
                      <StarRating rating={testimonial.rating} />
                      <blockquote>
                        <p className="text-white font-heading text-2xl md:text-3xl lg:text-4xl leading-snug md:leading-snug font-medium mb-10">
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>
                      </blockquote>
                      <div className="flex items-center justify-center gap-3">
                        <span className="block w-8 h-px bg-primary-gold/40" />
                        <p className="text-primary-gold font-body text-base uppercase tracking-[0.2em]">
                          {testimonial.name}
                        </p>
                        <span className="block w-8 h-px bg-primary-gold/40" />
                      </div>
                      <p className="text-primary-black-500 font-body text-sm mt-2">
                        {testimonial.title}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation arrows */}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
                <button
                  onClick={() => paginate(-1)}
                  className="pointer-events-auto p-3 text-primary-black-600 hover:text-primary-gold transition-colors duration-300 -ml-2 md:-ml-8"
                  aria-label="Previous testimonial"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={() => paginate(1)}
                  className="pointer-events-auto p-3 text-primary-black-600 hover:text-primary-gold transition-colors duration-300 -mr-2 md:-mr-8"
                  aria-label="Next testimonial"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>

              {/* Progress dots */}
              <div className="flex justify-center gap-3 mt-10">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setCurrent([i, i > current ? 1 : -1])
                    }
                    className="relative h-[2px] overflow-hidden rounded-full transition-all duration-500"
                    style={{ width: i === current ? "2.5rem" : "0.75rem" }}
                    aria-label={`Go to testimonial ${i + 1}`}
                  >
                    <div
                      className={`absolute inset-0 transition-colors duration-500 ${
                        i === current ? "bg-primary-gold" : "bg-primary-black-700"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </Container>
      </div>
    </Section>
  );
}
