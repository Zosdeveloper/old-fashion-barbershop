"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GALLERY_ITEMS, GALLERY_CATEGORIES, type GalleryCategory } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

type GalleryItem = (typeof GALLERY_ITEMS)[number];

/* ------------------------------------------------------------------ */
/*  Lightbox                                                           */
/* ------------------------------------------------------------------ */

function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 text-white/70 hover:text-primary-gold transition-colors"
        aria-label="Close lightbox"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 z-10 p-2 text-white/70 hover:text-primary-gold transition-colors"
        aria-label="Previous photo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 z-10 p-2 text-white/70 hover:text-primary-gold transition-colors"
        aria-label="Next photo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <motion.div
        key={item.id}
        className="relative w-[90vw] h-[80vh] max-w-5xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className="object-contain"
          sizes="90vw"
          priority
        />
        <p className="absolute bottom-0 left-0 right-0 text-center text-white/60 text-sm py-3 bg-gradient-to-t from-black/60 to-transparent">
          {item.alt}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Gallery Client                                                     */
/* ------------------------------------------------------------------ */

const BLUR_PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQABNjN9GQAAAABJRU5ErkJggg==";

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filtered.length : null));
  }, [filtered.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filtered.length) % filtered.length : null));
  }, [filtered.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  // GSAP stagger reveal when category changes
  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll(".gallery-item");
    gsap.fromTo(
      items,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
      }
    );
  }, [activeCategory]);

  return (
    <>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-12 justify-center">
        {GALLERY_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`relative px-5 py-2 rounded-sm text-sm font-body uppercase tracking-widest transition-all duration-300 border overflow-hidden ${
              activeCategory === cat
                ? "bg-primary-gold text-primary-black-900 border-primary-gold font-semibold"
                : "border-primary-black-600 text-primary-black-300 hover:border-primary-gold hover:text-primary-gold"
            }`}
          >
            {cat}
            {activeCategory === cat && (
              <motion.div
                layoutId="gallery-filter-active"
                className="absolute inset-0 bg-primary-gold -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div
        ref={gridRef}
        className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
      >
        {filtered.map((item, index) => (
          <div
            key={item.id}
            className="gallery-item break-inside-avoid group cursor-pointer relative overflow-hidden rounded-sm transition-all duration-500 hover:shadow-[0_8px_30px_rgba(212,175,55,0.12)] hover:-translate-y-1"
            onClick={() => openLightbox(index)}
          >
            <div className="relative aspect-[4/5] sm:aspect-auto overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                width={800}
                height={item.category === "Interior" ? 530 : item.category === "Cocktails" ? 800 : 600}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
              />
            </div>

            {/* Hover overlay with depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5">
              <div>
                <p className="text-white text-sm font-body font-medium">{item.alt}</p>
                <p className="text-primary-gold text-xs font-body uppercase tracking-wider mt-1">{item.category}</p>
              </div>
            </div>

            {/* Gold border accent on hover */}
            <div className="absolute inset-0 rounded-sm border border-transparent group-hover:border-primary-gold/20 transition-colors duration-500 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <Lightbox
            item={filtered[lightboxIndex]}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </>
  );
}
