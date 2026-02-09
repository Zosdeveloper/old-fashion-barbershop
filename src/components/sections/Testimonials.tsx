"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Section } from "@/components/ui";
import { TESTIMONIALS } from "@/lib/constants";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
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

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: 0.4,
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

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [isPaused, paginate]);

  const testimonial = TESTIMONIALS[current];

  return (
    <Section className="relative overflow-hidden bg-primary-black-950">
      {/* Decorative gold accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-gold/20 to-transparent" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-primary-gold font-body text-sm uppercase tracking-[0.3em] mb-3">
              What Clients Say
            </p>
            <h2 className="text-display-sm md:text-display-md font-heading font-bold text-white">
              Testimonials
            </h2>
          </div>

          {/* Testimonial Carousel */}
          <div
            className="relative max-w-4xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Large decorative quote mark */}
            <div className="absolute -top-2 left-0 md:left-8 text-primary-gold/10 text-[8rem] md:text-[12rem] font-heading leading-none select-none pointer-events-none">
              &ldquo;
            </div>

            <div className="relative min-h-[280px] md:min-h-[220px] flex items-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full px-4 md:px-16"
                >
                  <div className="text-center">
                    <StarRating rating={testimonial.rating} />
                    <blockquote className="mt-6 mb-8">
                      <p className="text-primary-black-200 font-body text-lg md:text-xl leading-relaxed italic">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </blockquote>
                    <div>
                      <p className="text-white font-heading text-lg font-semibold">
                        {testimonial.name}
                      </p>
                      <p className="text-primary-gold/70 font-body text-sm uppercase tracking-wider mt-1">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-8 mt-10">
              {/* Prev */}
              <button
                onClick={() => paginate(-1)}
                className="p-2 text-primary-black-500 hover:text-primary-gold transition-colors duration-300"
                aria-label="Previous testimonial"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setCurrent([i, i > current ? 1 : -1])
                    }
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === current
                        ? "w-8 bg-primary-gold"
                        : "w-1.5 bg-primary-black-700 hover:bg-primary-black-500"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              {/* Next */}
              <button
                onClick={() => paginate(1)}
                className="p-2 text-primary-black-500 hover:text-primary-gold transition-colors duration-300"
                aria-label="Next testimonial"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
