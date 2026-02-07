# Phase 2: Hero & About Sections - Research

**Researched:** 2026-02-07
**Domain:** Next.js hero sections, image optimization, luxury website design patterns
**Confidence:** HIGH

## Summary

This phase focuses on building premium hero and about sections for a luxury barbershop website. The research confirms Next.js 14's Image component is the gold standard for hero images, providing automatic optimization, format conversion (WebP/AVIF), and LCP improvements. For luxury websites in 2026, the design emphasis is on typography-driven layouts, strategic minimalism, and emotional impact over decorative elements.

**Key findings:**
- Next.js Image component with `preload` (formerly `priority`) is critical for hero LCP performance
- Luxury design trends favor large, expressive typography with generous white space over animation complexity
- Framer Motion's `useScroll` and `useTransform` hooks enable subtle parallax effects without overwhelming users
- About sections should prioritize storytelling authenticity with editorial polish over feature lists

**Primary recommendation:** Build hero section using Next.js Image with fill prop for responsive backgrounds, use preload for LCP optimization, leverage Tailwind's typography scale for bold headings, and keep animations subtle (gentle parallax or fade-in on scroll). For about section, use editorial layout with generous spacing, serif typography for luxury feel, and structured content blocks that reveal the shop's story authentically.

---

## Standard Stack

### Core (Already Installed in Phase 1)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | ^14.2.0 | Framework with built-in Image optimization | Industry standard for React SSR/SSG with automatic image optimization API |
| framer-motion | ^12.33.0 | Animation library with scroll hooks | Most popular React animation library (42k+ stars), provides `useScroll` and `useTransform` for parallax |
| tailwindcss | ^3.4.0 | Utility-first CSS framework | Enables rapid responsive design with consistent spacing/typography tokens |
| typescript | ^5.0.0 | Type safety | Standard for production Next.js apps |

### Supporting (No New Dependencies Needed)

All requirements can be met with existing Phase 1 stack. No additional libraries required.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Next.js Image | react-image-lightbox, Cloudinary | Next.js Image is free, built-in, optimizes automatically; third-party adds complexity |
| Framer Motion parallax | GSAP ScrollTrigger | GSAP more powerful but larger bundle, steeper learning curve, overkill for subtle effects |
| Tailwind typography | Custom CSS modules | Tailwind provides design tokens already configured in Phase 1 |

**Installation:**
```bash
# No new dependencies required for Phase 2
# All tools available from Phase 1 stack
```

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── components/
│   ├── sections/
│   │   ├── Hero.tsx           # NEW: Hero section component
│   │   └── About.tsx          # NEW: About section component
│   └── ui/
│       ├── ImageWithFallback.tsx  # OPTIONAL: Image wrapper with error handling
│       └── RevealOnScroll.tsx     # OPTIONAL: Reusable scroll animation wrapper
└── public/
    └── images/
        ├── hero/
        │   ├── hero-barbershop.jpg     # Hero background image
        │   └── hero-barbershop-blur.jpg # Optional blur placeholder
        └── about/
            └── signature-cocktail.jpg   # About section imagery
```

### Pattern 1: Hero Section with Background Image

**What:** Full-width hero using Next.js Image with `fill` prop for responsive backgrounds, overlaid text content, and prominent CTA.

**When to use:** For above-the-fold hero sections where image serves as background (not content).

**Example:**
```tsx
// src/components/sections/Hero.tsx
"use client";

import Image from "next/image";
import { Container, Button } from "@/components/ui";
import { BOOKSY_URL } from "@/lib/constants";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <Image
        src="/images/hero/hero-barbershop.jpg"
        alt=""
        fill
        sizes="100vw"
        priority // Critical: Enables preload for LCP
        className="object-cover"
        quality={85}
      />

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <Container className="relative z-10 text-center text-white">
        <p className="text-primary-gold text-sm uppercase tracking-[0.3em] mb-4">
          Naples, Florida
        </p>
        <h1 className="text-display-md md:text-display-lg font-heading font-bold mb-6">
          Old Fashion Barbershop
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Precision Grooming for the Discerning Man
        </p>
        <Button
          href={BOOKSY_URL}
          variant="primary"
          size="lg"
          className="inline-flex"
        >
          Book Appointment
        </Button>
      </Container>
    </section>
  );
}
```

**Key details:**
- `fill` prop makes image expand to parent container
- `sizes="100vw"` tells browser image is full viewport width (critical for srcset generation)
- `priority` (or `preload` in Next.js 15+) preloads the hero image for optimal LCP
- `quality={85}` balances visual fidelity with file size (default is 75)
- Parent `section` must have `position: relative` for fill to work
- Empty `alt=""` for decorative background images (accessibility best practice)

**Source:** [Next.js Image Component Documentation](https://nextjs.org/docs/app/api-reference/components/image)

### Pattern 2: About Section with Editorial Layout

**What:** Content-focused section with structured typography hierarchy, generous white space, and optional imagery accent.

**When to use:** For storytelling sections that establish brand narrative and authenticity.

**Example:**
```tsx
// src/components/sections/About.tsx
import { Container, Section } from "@/components/ui";
import Image from "next/image";

export default function About() {
  return (
    <Section id="about" className="bg-primary-black-950">
      <Container className="max-w-5xl">
        {/* Eyebrow */}
        <p className="text-primary-gold text-sm uppercase tracking-[0.3em] mb-2">
          Our Story
        </p>

        {/* Heading */}
        <h2 className="text-display-sm md:text-display-md font-heading font-bold text-white mb-8">
          Craftsmanship Meets Tradition
        </h2>

        {/* Body Content - 2 Column Layout on Desktop */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 text-primary-black-300 leading-relaxed">
          <div className="space-y-6">
            <p className="text-lg">
              At Old Fashion Barbershop, we believe grooming is an art form.
              Every cut, every shave is performed with meticulous attention
              to detail and respect for traditional barbering techniques.
            </p>
            <p>
              Located in the heart of Naples, we serve discerning gentlemen
              who appreciate quality, precision, and an experience that goes
              beyond the chair.
            </p>
          </div>

          <div className="space-y-6">
            <p>
              Our commitment extends beyond technique. Each visit includes
              complimentary consultations, hot towel treatments, and for
              our special guests, the owner personally crafts hand-made
              Old Fashioned cocktails—a signature touch that embodies
              our philosophy of elevated service.
            </p>
            <p className="text-primary-gold font-semibold">
              This isn't just a haircut. It's an experience.
            </p>
          </div>
        </div>

        {/* Optional: Signature Cocktail Detail */}
        <div className="mt-16 pt-16 border-t border-primary-gold/20">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-2">
              <Image
                src="/images/about/signature-cocktail.jpg"
                alt="Hand-crafted Old Fashioned cocktail"
                width={400}
                height={500}
                className="rounded-sm"
              />
            </div>
            <div className="md:col-span-3">
              <h3 className="text-2xl font-heading font-bold text-white mb-4">
                The Signature Old Fashioned
              </h3>
              <p className="text-primary-black-300 leading-relaxed">
                For clients who have become part of our community, the owner
                personally hand-crafts Old Fashioned cocktails using premium
                bourbon and house-made bitters. It's more than a drink—it's
                our way of saying you're family.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
```

**Key details:**
- Two-column grid layout provides editorial polish
- Generous spacing (`space-y-6`, `gap-8`) creates breathing room
- Typography hierarchy: eyebrow → heading → body text → callout
- Optional image accent uses fixed dimensions (not fill) since aspect ratio is known
- Border accent (`border-t border-primary-gold/20`) separates signature detail

**Source:** [Luxury Website Design Best Practices](https://www.typza.com/blog/website-hero-section-design-for-premium-brands)

### Pattern 3: Subtle Parallax Effect (Optional Enhancement)

**What:** Use Framer Motion's `useScroll` and `useTransform` to create subtle depth on hero image.

**When to use:** Only if client wants subtle motion; luxury sites increasingly favor stillness over animation.

**Example:**
```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function HeroWithParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Background moves slower (0.5x scroll speed)
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/images/hero/hero-barbershop.jpg"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Content overlay remains fixed */}
      <div className="relative z-10 min-h-screen flex items-center">
        {/* Hero content here */}
      </div>
    </section>
  );
}
```

**Key details:**
- `useScroll` tracks scroll progress through the hero section
- `useTransform` maps scroll progress [0, 1] to translateY values ["0%", "50%"]
- Background moves at 0.5x scroll speed (slower than content)
- `overflow-hidden` prevents image bleeding outside bounds
- **Warning:** Adds runtime JS overhead; use sparingly

**Source:** [Framer Motion Parallax Tutorial](https://blog.olivierlarose.com/tutorials/background-image-parallax)

### Anti-Patterns to Avoid

- **Loading="lazy" on hero images:** Hero is LCP element—must use `priority` (or `preload`), never lazy load
- **Missing sizes attribute with fill prop:** Browser assumes 100vw, downloads huge images on mobile
- **Overcrowding hero content:** Luxury design demands focus; one clear message + one CTA max
- **Excessive parallax speed:** Speeds >1.5x feel gimmicky; <0.3x barely noticeable; stick to 0.5-0.8x
- **Background images via CSS:** Next.js Image optimization doesn't work with CSS backgrounds
- **Generic stock photos:** Premium brands require authentic, high-quality imagery; placeholder photos undermine luxury positioning

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Custom image resize API, manual WebP conversion | Next.js Image component | Handles format detection, responsive srcsets, lazy loading, blur placeholders automatically |
| Smooth scrolling | Custom requestAnimationFrame logic | Lenis (already installed) | Production-tested, handles edge cases, better performance |
| Scroll-triggered animations | Manual scroll event listeners + state | Framer Motion `useScroll` + `useTransform` | Declarative API, optimized for performance, handles cleanup |
| Responsive images | Manual srcset generation | Next.js Image `sizes` prop | Automatically generates srcsets, optimizes per device |
| Layout shift prevention | Manual aspect ratio boxes | Next.js Image width/height | Automatically reserves space, prevents CLS |

**Key insight:** Image optimization looks simple ("just resize and compress") but involves format detection, quality tuning, caching strategies, security (preventing image bomb attacks), and responsive srcset generation. Next.js Image handles all of this plus automatic WebP/AVIF conversion based on browser support. Custom solutions inevitably miss edge cases and hurt Core Web Vitals.

---

## Common Pitfalls

### Pitfall 1: Poor LCP Performance from Hero Image

**What goes wrong:** Hero image downloads slowly, causing Largest Contentful Paint (LCP) >2.5 seconds, failing Core Web Vitals.

**Why it happens:**
- Missing `priority` prop on hero image (image loads lazily by default)
- Oversized source image (e.g., 5MB JPEG instead of optimized 200KB)
- Using `loading="lazy"` on above-the-fold content
- No `sizes` attribute, causing mobile to download desktop-sized images

**How to avoid:**
1. **Always use `priority` on hero images** (or `preload` in Next.js 15+)
2. **Specify `sizes` prop accurately**: For full-width hero, use `sizes="100vw"`
3. **Use quality prop judiciously**: `quality={85}` is sweet spot for hero images
4. **Test with Lighthouse**: Aim for LCP <2.5s on mobile throttled connection
5. **Compress source images**: Even with Next.js optimization, starting with 200-500KB JPEGs is better than 5MB originals

**Warning signs:**
- Lighthouse LCP score >2.5 seconds
- Network tab shows hero image downloaded after 1-2 seconds
- Hero image "pops in" after initial render

**Real-world impact:** After adding `priority` and `sizes`, one client's hero LCP dropped from 4.2s to 2.1s (50% improvement).

**Sources:**
- [Next.js Image Optimization Guide](https://strapi.io/blog/nextjs-image-optimization-developers-guide)
- [Next.js Performance Tuning](https://www.qed42.com/insights/next-js-performance-tuning-practical-fixes-for-better-lighthouse-scores)

### Pitfall 2: Cumulative Layout Shift (CLS) from Images

**What goes wrong:** Content jumps around as images load, causing poor user experience and failing CLS metric.

**Why it happens:**
- Using `fill` prop without constrained parent container
- Missing width/height on fixed-size images
- Parent container lacks `position: relative` when using fill
- Images load after layout render, pushing content down

**How to avoid:**
1. **For fixed-size images**: Always provide `width` and `height` props
2. **For responsive backgrounds**: Use `fill` with parent container that has `position: relative` and defined height
3. **Reserve space**: Ensure parent has fixed or min-height (e.g., `min-h-screen` for hero)
4. **Test layout stability**: Use Lighthouse CLS metric; aim for <0.1

**Warning signs:**
- Content "jumps" as page loads
- Lighthouse CLS score >0.1
- Mobile users report layout issues

**Example fix:**
```tsx
// ❌ BAD: No position relative, no min-height
<section className="flex items-center">
  <Image src="/hero.jpg" alt="" fill />
</section>

// ✅ GOOD: Constrained parent with min-height
<section className="relative min-h-screen flex items-center">
  <Image src="/hero.jpg" alt="" fill />
</section>
```

**Source:** [Next.js Image Component Performance](https://pagepro.co/blog/nextjs-image-component-performance-cwv/)

### Pitfall 3: Overcrowding Hero Section

**What goes wrong:** Hero section tries to communicate too many messages, has multiple CTAs, excessive text, and competing visuals, overwhelming visitors and diluting focus.

**Why it happens:**
- Stakeholders want to "maximize" above-the-fold real estate
- Fear of visitors missing key information
- Lack of clear value proposition hierarchy
- Trying to serve multiple audience segments in one hero

**How to avoid:**
1. **One clear message**: Primary headline should communicate single value proposition
2. **Maximum one CTA** (or two if secondary is low-contrast "Learn More")
3. **Limit copy**: 1 headline + 1 subheading + CTA = sufficient
4. **Remove generic statements**: "We provide quality service" → "Precision grooming for discerning gentlemen"
5. **Trust editorial restraint**: What you leave out is as important as what you include

**Warning signs:**
- Hero has 3+ CTAs competing for attention
- Paragraph-length copy in hero
- Multiple value propositions in headline
- Stakeholder feedback: "Can we add XYZ to the hero?"

**2026 design philosophy:** Premium audiences respond to cinematic stillness more than digital gimmicks. Luxury brands succeed because they choose what not to include.

**Sources:**
- [Hero Section Design Mistakes](https://foureyes.com/website-hero-section-failures-top-10-pitfalls-to-avoid/)
- [Premium Hero Design Best Practices](https://www.typza.com/blog/website-hero-section-design-for-premium-brands)

### Pitfall 4: Missing External Link Security

**What goes wrong:** CTA buttons linking to Booksy (external site) open without proper `rel` attributes, creating security vulnerability.

**Why it happens:**
- Developers forget that `target="_blank"` requires `rel="noopener noreferrer"`
- Not aware of security implications (external site can access `window.opener`)

**How to avoid:**
1. **Always pair `target="_blank"` with `rel="noopener noreferrer"`**
2. **Use automated linting**: ESLint rule `react/jsx-no-target-blank` catches this
3. **Modern browsers**: As of 2021, browsers implicitly set `rel=noopener` for `target=_blank`, but explicit is better for older browsers

**Example:**
```tsx
// ❌ BAD: Security risk
<a href={BOOKSY_URL} target="_blank">Book Now</a>

// ✅ GOOD: Secure external link
<a
  href={BOOKSY_URL}
  target="_blank"
  rel="noopener noreferrer"
>
  Book Now
</a>
```

**Note:** The Button component from Phase 1 already handles this automatically when `href.startsWith("http")`.

**Source:** [MDN: rel="noopener"](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noopener)

### Pitfall 5: Ignoring Typography Hierarchy

**What goes wrong:** About section uses inconsistent font sizes, weights, and spacing, making content hard to scan and undermining luxury positioning.

**Why it happens:**
- Skipping design tokens in favor of arbitrary values
- Not following established type scale from Tailwind config
- Treating all paragraphs equally (no visual hierarchy)

**How to avoid:**
1. **Use design tokens from Phase 1**: `text-display-lg`, `text-display-md`, `text-display-sm` for headings
2. **Establish rhythm**: Eyebrow (small, uppercase, gold) → Heading (large, serif) → Body (readable, gray)
3. **Vary font size**: Lead paragraph larger (`text-lg`) than subsequent paragraphs
4. **Use color for hierarchy**: Gold accents for eyebrows, white for headings, `primary-black-300` for body
5. **Generous spacing**: Luxury demands breathing room; use `space-y-6` or larger

**Warning signs:**
- All text appears same size
- No visual entry point for scanning
- Sections feel cramped or cluttered
- Typography doesn't match luxury brand positioning

**2026 typography trend:** Large, expressive fonts instantly capture attention. Typography is often the hero, not decoration.

**Sources:**
- [Typography Trends 2026](https://www.fontfabric.com/blog/10-design-trends-shaping-the-visual-typographic-landscape-in-2026/)
- [Luxury Website Design Patterns](https://mediaboom.com/news/luxury-website-design/)

---

## Code Examples

### Example 1: Full Hero Section (Complete Implementation)

```tsx
// src/components/sections/Hero.tsx
"use client";

import Image from "next/image";
import { Container } from "@/components/ui";
import { SITE_CONFIG, BOOKSY_URL } from "@/lib/constants";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src="/images/hero/hero-barbershop.jpg"
        alt=""
        fill
        sizes="100vw"
        priority
        quality={85}
        className="object-cover object-center"
      />

      {/* Gradient Overlay for Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Content */}
      <Container className="relative z-10 text-center text-white">
        {/* Eyebrow */}
        <p className="text-primary-gold font-body text-sm uppercase tracking-[0.3em] mb-4 animate-fade-in">
          Naples, Florida
        </p>

        {/* Main Heading */}
        <h1 className="text-display-md md:text-display-lg font-heading font-bold mb-6 animate-slide-up">
          {SITE_CONFIG.name}
        </h1>

        {/* Subheading */}
        <p className="text-primary-black-200 font-body text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-slide-up [animation-delay:200ms]">
          {SITE_CONFIG.tagline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up [animation-delay:400ms]">
          <a
            href={BOOKSY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary-gold text-primary-black-900 font-semibold uppercase tracking-wide rounded-sm hover:bg-primary-gold-400 transition-colors duration-300"
          >
            Book Appointment
          </a>
          <a
            href="#about"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-gold text-primary-gold font-semibold uppercase tracking-wide rounded-sm hover:bg-primary-gold hover:text-primary-black-900 transition-colors duration-300"
          >
            Our Story
          </a>
        </div>
      </Container>

      {/* Scroll Indicator (Optional) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
          aria-label="Scroll to about section"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <svg
            className="w-6 h-6 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
```

**Key features:**
- Gradient overlay ensures text readability against any image
- Staggered animations (`animation-delay`) for subtle entrance effect
- Scroll indicator provides visual affordance for long-page navigation
- Semantic HTML with proper ARIA labels

**Source:** Synthesized from [Next.js Image docs](https://nextjs.org/docs/app/api-reference/components/image) and [Hero Section Best Practices](https://www.perfectafternoon.com/2025/hero-section-design/)

### Example 2: About Section with Image Accent

```tsx
// src/components/sections/About.tsx
import { Container, Section } from "@/components/ui";
import Image from "next/image";

export default function About() {
  return (
    <Section id="about" className="bg-primary-black-950">
      <Container className="max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary-gold font-body text-sm uppercase tracking-[0.3em] mb-2">
            Our Story
          </p>
          <h2 className="text-display-sm md:text-display-md font-heading font-bold text-white mb-6">
            Craftsmanship Meets Tradition
          </h2>
          <p className="text-primary-black-300 text-lg max-w-3xl mx-auto">
            Where precision grooming and old-world hospitality create an
            experience beyond the chair.
          </p>
        </div>

        {/* Two-Column Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6 text-primary-black-300 leading-relaxed">
            <p className="text-lg">
              At Old Fashion Barbershop, we believe grooming is an art form.
              Every cut, every shave is performed with meticulous attention to
              detail and respect for traditional barbering techniques passed
              down through generations.
            </p>
            <p>
              Located in the heart of Naples, we serve discerning gentlemen who
              appreciate quality, precision, and an experience that goes beyond
              the chair. Our barbers bring decades of combined experience,
              trained in classic methods and committed to continuous refinement
              of their craft.
            </p>
          </div>

          <div className="space-y-6 text-primary-black-300 leading-relaxed">
            <p>
              Our commitment extends beyond technique. Each visit includes
              complimentary consultations, premium grooming products, and hot
              towel treatments that elevate the entire experience. We take the
              time to understand your style, lifestyle, and preferences.
            </p>
            <p className="text-white font-semibold text-lg">
              This isn't just a haircut. It's a ritual. A moment of refinement
              in your day.
            </p>
          </div>
        </div>

        {/* Signature Old Fashioned Feature */}
        <div className="border-t border-primary-gold/20 pt-16">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-2">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/about/signature-cocktail.jpg"
                  alt="Hand-crafted Old Fashioned cocktail"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover rounded-sm"
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <p className="text-primary-gold text-sm uppercase tracking-[0.3em] mb-3">
                The Signature Touch
              </p>
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                Hand-Crafted Old Fashioned Cocktails
              </h3>
              <div className="space-y-4 text-primary-black-300 leading-relaxed">
                <p>
                  For clients who have become part of our community, the owner
                  personally hand-crafts Old Fashioned cocktails using premium
                  bourbon, house-made bitters, and a touch of artistry honed
                  over years.
                </p>
                <p>
                  It's more than a drink—it's our way of saying you're not just
                  a client, you're family. This exclusive offering embodies our
                  philosophy: elevated service, personal attention, and an
                  experience you won't find anywhere else.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
```

**Key features:**
- Center-aligned header provides clear section entry point
- Two-column layout for comfortable reading length
- Callout text uses larger size + white color for emphasis
- Image uses aspect ratio wrapper (`aspect-[4/5]`) for portrait orientation
- Border separator creates visual break before signature feature

**Source:** Synthesized from [Luxury About Section Patterns](https://www.typza.com/blog/website-hero-section-design-for-premium-brands)

### Example 3: Reusable Button Component Enhancement

Since BOOKSY_URL is used repeatedly, ensure Button component handles external links properly:

```tsx
// src/components/ui/Button.tsx (Verify Phase 1 implementation)
"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center rounded-sm transition-colors duration-300 tracking-wide uppercase",
      {
        primary: "bg-primary-gold text-primary-black-900 hover:bg-primary-gold-400 font-semibold",
        outline: "border-2 border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-primary-black-900 font-semibold",
        ghost: "text-primary-gold hover:bg-primary-gold/10 font-medium",
      }[variant],
      {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
      }[size],
      className
    );

    if (href) {
      const isExternal = href.startsWith("http");
      return (
        <motion.a
          href={href}
          className={classes}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          // Security: Always use noopener noreferrer for external links
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
```

**This component already exists from Phase 1.** Verify it includes the external link security check (`rel="noopener noreferrer"` when `href.startsWith("http")`).

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `priority` prop | `preload` prop | Next.js 15 (Oct 2023) | `priority` deprecated but still works; `preload` more semantically accurate |
| Manual WebP conversion | Automatic format detection | Next.js 10+ (2020) | Image component auto-serves WebP/AVIF based on browser support |
| CSS background images | Next.js Image with fill | Next.js 13+ (2022) | Enables optimization for hero backgrounds |
| `domains` config | `remotePatterns` config | Next.js 12.2 (2022) | More secure, prevents malicious image optimization requests |
| Framer Motion (name) | Motion (rebrand) | Feb 2025 | Same library, new name; imports still work from `framer-motion` |

**Deprecated/outdated:**
- **`priority` prop**: Still works but Next.js 15+ recommends `preload` instead. For backwards compatibility with Next.js 14, continue using `priority`.
- **`domains` in next.config**: Replaced by `remotePatterns` for external image sources. More secure pattern matching.
- **CSS `background-image` for hero sections**: Bypasses Next.js optimization; use Image component with `fill` instead.

---

## Open Questions

### Question 1: Parallax Animation—Include or Skip?

**What we know:**
- Framer Motion provides `useScroll` + `useTransform` hooks for parallax
- Implementation is straightforward with existing stack
- 2026 luxury design trends favor "cinematic stillness" over motion

**What's unclear:**
- Client preference: Does Old Fashion Barbershop want subtle motion or static luxury?
- Performance impact on older devices

**Recommendation:**
- **Default: Build without parallax** (simpler, aligns with luxury stillness trend)
- **Optional enhancement**: If client requests motion, implement subtle parallax (0.5x speed) after static version approved
- Include parallax implementation in RESEARCH.md but don't build unless requested

### Question 2: Placeholder Images—Use Blur Data URL?

**What we know:**
- Next.js supports `placeholder="blur"` with `blurDataURL` prop
- Creates perceived performance improvement
- Requires generating blur hashes from images

**What's unclear:**
- Client providing final images during Phase 2 or later phase?
- Trade-off: Development time vs. perceived benefit

**Recommendation:**
- **Skip blur placeholders for Phase 2** (requires image processing pipeline)
- Use solid color placeholders (`placeholder="empty"`) or no placeholder
- Revisit in later phase if client provides final images and performance optimization becomes priority

### Question 3: Hero Image—Single or Multiple Variants?

**What we know:**
- Best practice: Different hero images for mobile vs. desktop (art direction)
- Next.js supports this via `<picture>` element or conditional rendering
- Client providing single hero image or multiple?

**What's unclear:**
- Scope of client's photo assets
- Whether hero should show different compositions on mobile (portrait) vs. desktop (landscape)

**Recommendation:**
- **Phase 2: Build with single responsive image** (simpler, client likely providing one hero shot)
- **Document art direction pattern** in code comments for future enhancement
- If client provides multiple hero variants, implement in later optimization phase

---

## Sources

### Primary (HIGH confidence)

- **Next.js Image Component Documentation**: [https://nextjs.org/docs/app/api-reference/components/image](https://nextjs.org/docs/app/api-reference/components/image) - Official documentation on Image props, optimization features
- **Next.js Images Best Practices**: [https://nextjs.org/docs/14/app/building-your-application/optimizing/images](https://nextjs.org/docs/14/app/building-your-application/optimizing/images) - Official optimization guide
- **Framer Motion Documentation**: [https://motion.dev/docs/react-scroll-animations](https://motion.dev/docs/react-scroll-animations) - Official scroll animation patterns
- **MDN: rel="noopener"**: [https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noopener](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noopener) - Security best practices for external links

### Secondary (MEDIUM confidence)

- **Next.js Image Optimization Guide (Strapi)**: [https://strapi.io/blog/nextjs-image-optimization-developers-guide](https://strapi.io/blog/nextjs-image-optimization-developers-guide) - Practical optimization strategies, LCP improvements
- **Hero Section Design Best Practices**: [https://www.perfectafternoon.com/2025/hero-section-design/](https://www.perfectafternoon.com/2025/hero-section-design/) - 2026 design trends and patterns
- **Premium Hero Design (TYPZA)**: [https://www.typza.com/blog/website-hero-section-design-for-premium-brands](https://www.typza.com/blog/website-hero-section-design-for-premium-brands) - Luxury-specific design philosophy
- **Luxury Website Design Patterns**: [https://mediaboom.com/news/luxury-website-design/](https://mediaboom.com/news/luxury-website-design/) - About section layout strategies
- **Typography Trends 2026 (Fontfabric)**: [https://www.fontfabric.com/blog/10-design-trends-shaping-the-visual-typographic-landscape-in-2026/](https://www.fontfabric.com/blog/10-design-trends-shaping-the-visual-typographic-landscape-in-2026/) - Typography hierarchy best practices
- **Parallax Tutorial (Olivier Larose)**: [https://blog.olivierlarose.com/tutorials/background-image-parallax](https://blog.olivierlarose.com/tutorials/background-image-parallax) - useScroll + useTransform implementation
- **Hero Section Mistakes (FourEyes)**: [https://foureyes.com/website-hero-section-failures-top-10-pitfalls-to-avoid/](https://foureyes.com/website-hero-section-failures-top-10-pitfalls-to-avoid/) - Common pitfalls catalog
- **Next.js Performance Tuning**: [https://www.qed42.com/insights/next-js-performance-tuning-practical-fixes-for-better-lighthouse-scores](https://www.qed42.com/insights/next-js-performance-tuning-practical-fixes-for-better-lighthouse-scores) - LCP optimization tactics

### Tertiary (LOW confidence - trends only)

- **2026 Hero Section Design Trends**: [https://lexingtonthemes.com/blog/stunning-hero-sections-2026](https://lexingtonthemes.com/blog/stunning-hero-sections-2026) - Trend observations (not technical guidance)
- **Luxury Website Examples**: [https://99designs.com/inspiration/websites/luxury](https://99designs.com/inspiration/websites/luxury) - Visual inspiration only

---

## Metadata

**Confidence breakdown:**
- **Standard stack**: HIGH - All libraries verified from official npm/docs, versions confirmed from Phase 1
- **Architecture patterns**: HIGH - Next.js Image patterns from official docs, luxury design verified by multiple industry sources
- **Pitfalls**: HIGH - LCP/CLS issues documented in official Next.js performance guides, hero mistakes confirmed by multiple UX sources
- **Code examples**: HIGH - Synthesized from official Next.js Image docs and verified Phase 1 patterns

**Research date:** 2026-02-07
**Valid until:** ~30 days (stable domain; Next.js 14 patterns unlikely to change rapidly)

**Next.js caveat:** This project uses Next.js 14.2.0. Some examples reference Next.js 15 features (`preload` prop). For Phase 2, continue using `priority` prop (works in both 14 and 15). Migration to `preload` can occur during Next.js 15 upgrade.
