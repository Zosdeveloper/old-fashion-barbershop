# Phase 3: Services Section - Research

**Researched:** 2026-02-08
**Domain:** Framer Motion advanced scroll animations, 3D card interactions, cinematic section design, Next.js Image optimization
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **Service descriptions & tone:** Luxury & atmospheric tone -- evocative language that sells the experience, not the task (e.g., "Precision blade work with hot lather finish"). Each service card has its own gold "Book Now" CTA button linking to Booksy. Description length at Claude's discretion.
- **Visual design & layout:** Full creative freedom on card layout, image treatment, and overall section composition. Push for bold, cinematic, and creative visual design -- not safe/standard card grids. Explore unconventional layouts: 3D elements, motion mockups, dramatic compositions. The goal is to make people stop scrolling -- premium and unforgettable.
- **Motion & animation:** Bold & cinematic level -- dramatic scroll reveals, 3D card interactions, morphing transitions. Not subtle -- this section should be a visual event. Framer Motion is available in the stack for animation.
- **Section transition:** Claude's discretion on whether the section creates a distinct visual break (background shift, divider animation) or flows seamlessly from About.

### Claude's Discretion
- Card layout structure (top-image, overlay, split, or something unconventional)
- Image aspect ratio and treatment (overlays, gradients, crops)
- Whether Hot Towel Shave gets a "signature" badge or special visual treatment
- Description length per service
- Section entry transition style
- Placeholder image selection during build (client will provide real photos later)
- Any 3D or particle effects that enhance without overwhelming

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

---

## Summary

This phase builds a cinematic, scroll-driven services section showcasing 5 barbershop services with bold visual design and dramatic animations. The user explicitly requested maximum creativity -- "be as creative as possible" and "surprise me" -- with no safe/standard card grids. The section must feel like a visual event that makes people stop scrolling.

Research confirms that Framer Motion v12.33.0 (already installed) provides all the tools needed for dramatic scroll-linked animations through `whileInView`, `useScroll`, `useTransform`, and stagger variants. The 3D card interaction pattern using mouse-tracking `rotateX`/`rotateY` with `useMotionValue` and `useTransform` is well-documented and performant. No additional libraries are required.

The recommended approach is an asymmetric, staggered layout (not a uniform grid) where each service card has its own visual weight and reveal animation. The Hot Towel Shave should receive signature treatment as the most distinctive service. All images should use Next.js Image with `fill` prop in containers designed for easy placeholder-to-real-photo swapping.

**Primary recommendation:** Build a cinematic asymmetric layout with scroll-triggered stagger reveals, 3D hover interactions on cards (mouse-tracking perspective rotation), and a dramatic section entry with background transition. Use `whileInView` for viewport-triggered animations and `useScroll` + `useTransform` for parallax depth effects. Keep all 5 services in a single `Services.tsx` component with a services data array in constants.

---

## Standard Stack

### Core (Already Installed -- No New Dependencies)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| framer-motion | ^12.33.0 (installed: 12.33.0) | Scroll animations, 3D transforms, stagger reveals, whileInView | Full API for scroll-linked and viewport-triggered animations, 3D perspective transforms |
| next (Image) | ^14.2.0 | Responsive image optimization with fill, sizes, lazy loading | Built-in optimization, WebP/AVIF generation, lazy loading by default |
| tailwindcss | ^3.4.0 | Responsive layouts, spacing, typography, gradients | Design tokens already configured with project palette |
| clsx | ^2.1.0 | Conditional class composition | Already used in project's cn() utility |

### Supporting (No New Dependencies Needed)

All requirements are met with the existing Phase 1 stack. The Framer Motion version installed (12.33.0) includes all needed hooks: `useScroll`, `useTransform`, `useMotionValue`, `useMotionTemplate`, `useInView`, `whileInView`, `animate`, and stagger/variant orchestration.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Framer Motion 3D cards | CSS transform-style: preserve-3d | FM provides smoother interpolation, spring physics, and motion value composition |
| Framer Motion scroll triggers | GSAP ScrollTrigger | GSAP is more powerful for complex timelines but adds ~50KB bundle, not worth adding for this use case |
| Local placeholder images | Unsplash via next/image remotePatterns | Local placeholders avoid remote config complexity and work offline; swap to real photos later |

**Installation:**
```bash
# No new dependencies required for Phase 3
# All tools available from Phase 1 stack
```

---

## Architecture Patterns

### Recommended Project Structure

```
src/
  components/
    sections/
      Services.tsx        # NEW: Main services section component ("use client")
      index.ts            # UPDATE: Add Services export
  lib/
    constants.ts          # UPDATE: Add SERVICES array with service data
  public/
    images/
      services/
        classic-haircut.jpg       # Placeholder image
        fade-skin-fade.jpg        # Placeholder image
        line-work-details.jpg     # Placeholder image
        beard-trim-shaping.jpg    # Placeholder image
        hot-towel-shave.jpg       # Placeholder image
  app/
    page.tsx              # UPDATE: Replace stub with Services component
```

### Pattern 1: Services Data Array in Constants

**What:** Define all 5 services as a typed array in `constants.ts` for separation of content from presentation.
**When to use:** Always -- keeps service data maintainable, allows easy addition/reordering of services.

```typescript
// In src/lib/constants.ts
export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  isSignature?: boolean;
}

export const SERVICES: Service[] = [
  {
    id: "classic-haircut",
    title: "Classic Haircut",
    description: "Timeless precision meets modern mastery...",
    image: "/images/services/classic-haircut.jpg",
    imageAlt: "Classic gentleman's haircut with precision scissors",
  },
  {
    id: "fade-skin-fade",
    title: "Fade & Skin Fade",
    description: "Seamless gradient artistry...",
    image: "/images/services/fade-skin-fade.jpg",
    imageAlt: "Expert skin fade with seamless gradient transition",
  },
  {
    id: "line-work-details",
    title: "Line Work & Details",
    description: "Surgical precision on the edges...",
    image: "/images/services/line-work-details.jpg",
    imageAlt: "Detailed line work and edge precision",
  },
  {
    id: "beard-trim-shaping",
    title: "Beard Trim & Shaping",
    description: "Sculpted definition for the modern gentleman...",
    image: "/images/services/beard-trim-shaping.jpg",
    imageAlt: "Professional beard trim and shaping",
  },
  {
    id: "hot-towel-shave",
    title: "Hot Towel Shave",
    description: "Precision blade work with hot lather finish...",
    image: "/images/services/hot-towel-shave.jpg",
    imageAlt: "Traditional hot towel straight razor shave",
    isSignature: true,
  },
];
```

### Pattern 2: Asymmetric Staggered Layout (NOT Uniform Grid)

**What:** Instead of a standard equal-column grid, use an asymmetric layout where cards have varying sizes, offsets, and visual weight. Some cards span wider, some are taller, creating visual rhythm.
**When to use:** When the goal is cinematic, premium, and unconventional -- exactly what the user requested.

```
Layout concept (desktop):
+------------------+      +----------+
|                  |      |          |
|   Classic Cut    |      |  Fade    |
|   (large, left)  |      |  (med)   |
|                  |      +----------+
+------------------+
      +----------+   +------------------+
      |          |   |                  |
      | Line Work|   |  Beard Trim      |
      |  (med)   |   |  (large, right)  |
      +----------+   |                  |
                      +------------------+
         +------------------------+
         |                        |
         | Hot Towel Shave        |
         | (SIGNATURE - full width|
         |  dramatic layout)      |
         +------------------------+
```

**Implementation approach:** Use CSS Grid with explicit grid-row/grid-column spans, combined with Framer Motion stagger for sequential reveal.

### Pattern 3: Scroll-Triggered Stagger Reveal

**What:** Parent container uses `whileInView` with `staggerChildren` to animate cards sequentially as the section enters viewport.
**When to use:** For dramatic section entry animations.

```typescript
// Stagger container variant
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Individual card variant - dramatic entrance
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
    rotateX: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // Custom ease (same as About section)
    },
  },
};

// Usage
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-80px" }}
  variants={containerVariants}
>
  {services.map((service) => (
    <motion.div key={service.id} variants={cardVariants}>
      <ServiceCard service={service} />
    </motion.div>
  ))}
</motion.div>
```

### Pattern 4: 3D Mouse-Tracking Card Hover

**What:** Cards respond to mouse position with subtle 3D rotation (perspective tilt), creating a tactile, premium feel on hover.
**When to use:** For interactive card elements where the user wants "3D card interactions."

```typescript
"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

function ServiceCard({ service }: { service: Service }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const dampen = 20; // Lower = more rotation

  const rotateX = useTransform(mouseY, (val) => {
    if (!cardRef.current) return 0;
    const rect = cardRef.current.getBoundingClientRect();
    return -(val - rect.top - rect.height / 2) / dampen;
  });

  const rotateY = useTransform(mouseX, (val) => {
    if (!cardRef.current) return 0;
    const rect = cardRef.current.getBoundingClientRect();
    return (val - rect.left - rect.width / 2) / dampen;
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    animate(mouseX, e.clientX);
    animate(mouseY, e.clientY);
  };

  const handleMouseLeave = () => {
    animate(mouseX, 0);
    animate(mouseY, 0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
        transformStyle: "preserve-3d",
      }}
      className="relative overflow-hidden group cursor-pointer"
    >
      {/* Card content */}
    </motion.div>
  );
}
```

**Source:** Verified from [dev.to 3D card tutorial](https://dev.to/arielbk/how-to-make-a-3d-shiny-card-animation-react-ts-and-framer-motion-ijf) - adapted to project's TypeScript + Tailwind patterns.

### Pattern 5: Image Container for Easy Swapping

**What:** Wrap Next.js Image in a positioned container with fixed aspect ratio, so swapping placeholder images for real client photos requires only changing the `src` prop.
**When to use:** Always for this project -- client will provide real photos later.

```typescript
<div className="relative aspect-[3/4] overflow-hidden">
  <Image
    src={service.image}
    alt={service.imageAlt}
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    className="object-cover transition-transform duration-700 group-hover:scale-105"
    quality={80}
  />
  {/* Optional gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
</div>
```

### Anti-Patterns to Avoid

- **Uniform card grid:** User explicitly rejected "safe/standard card grids." Do NOT use `grid-cols-3` with equal cards.
- **Subtle/minimal animations:** User wants "bold & cinematic," not "subtle fade-ins." The About section already uses subtle -- Services must escalate.
- **Pricing information:** Explicitly excluded. No price, no "starting from," nothing monetary.
- **External image hosting for placeholders:** Use local `/public/images/services/` for reliability. No Unsplash API calls at build time.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Custom image resizing/WebP conversion | Next.js `Image` with `fill` + `sizes` | Automatic format selection, responsive srcset, lazy loading |
| Scroll detection | Manual IntersectionObserver | Framer Motion `whileInView` | Cleaner API, integrates with animation system, handles cleanup |
| Scroll-linked values | Manual scroll event listeners + requestAnimationFrame | `useScroll` + `useTransform` | Motion values update outside React render cycle (performant) |
| 3D card rotation | CSS-only transform with JS mouseMove | Framer Motion `useMotionValue` + `useTransform` | Spring interpolation, smooth animation on mouse leave, composable |
| Stagger animation | Manual setTimeout/delays per card | `staggerChildren` in variants | Declarative, handles timing orchestration, works with whileInView |
| Conditional classes | String concatenation | `cn()` utility (already in project) | Clean, type-safe, handles falsy values |

**Key insight:** Framer Motion's motion values (`useMotionValue`, `useTransform`) update outside of React's render cycle, which means smooth 60fps animations without triggering re-renders. This is critical for mouse-tracking 3D effects and scroll-linked animations.

---

## Common Pitfalls

### Pitfall 1: "use client" Directive Missing
**What goes wrong:** Framer Motion hooks (`useScroll`, `useMotionValue`, etc.) only work in client components. Build fails with cryptic errors if "use client" is missing.
**Why it happens:** Next.js App Router defaults to server components.
**How to avoid:** Add `"use client"` as the first line of `Services.tsx`. This matches the pattern already established in `Hero.tsx` and `About.tsx`.
**Warning signs:** Build error mentioning hooks in server components.

### Pitfall 2: Mouse-Leave 3D Reset Jank
**What goes wrong:** When mouse leaves the 3D card, the rotation snaps back to 0 instantly instead of smoothly animating.
**Why it happens:** Setting motion values directly to 0 skips the animation interpolation.
**How to avoid:** Use `animate(mouseX, 0)` instead of `mouseX.set(0)` -- the `animate` function from framer-motion provides smooth spring interpolation back to rest state. Also consider resetting to the card's center coordinates rather than 0.
**Warning signs:** Jarring snap when cursor exits card area.

### Pitfall 3: Image Layout Shift (CLS)
**What goes wrong:** Images pop in and push content around as they load.
**Why it happens:** No explicit dimensions or aspect ratio set on the image container.
**How to avoid:** Always use a container with fixed `aspect-ratio` (e.g., `aspect-[3/4]`) and `position: relative` with `Image fill`. This reserves space before the image loads.
**Warning signs:** Page content jumping during load.

### Pitfall 4: Scroll Animation Firing Multiple Times
**What goes wrong:** Entrance animations replay every time the section scrolls in and out of view.
**Why it happens:** `whileInView` without `viewport={{ once: true }}` triggers on every intersection.
**How to avoid:** Always set `viewport={{ once: true }}` for one-shot reveal animations. This matches the pattern used in `About.tsx` (`useInView(ref, { once: true })`).
**Warning signs:** Animations replaying when scrolling back up.

### Pitfall 5: staggerChildren Timing Too Fast or Too Slow
**What goes wrong:** Cards appear all at once (too fast) or the last card takes forever to appear (too slow with 5 items).
**Why it happens:** `staggerChildren` value not calibrated for the number of items.
**How to avoid:** With 5 services, use `staggerChildren: 0.12-0.18` (total stagger of 0.6-0.9s). Test that the last card appears within ~1s of the first.
**Warning signs:** User sees cards appearing simultaneously, or waits too long for final card.

### Pitfall 6: 3D Transform Performance on Mobile
**What goes wrong:** Mouse-tracking 3D rotation has no effect on mobile (no mouse) and can cause unnecessary computation.
**Why it happens:** Touch devices don't fire mousemove events the same way.
**How to avoid:** Disable 3D mouse-tracking on mobile. Either conditionally render based on pointer type (`@media (hover: hover)`) or use touch-specific interactions. The scroll-triggered reveal animations work great on mobile without the 3D hover.
**Warning signs:** Cards look static/broken on mobile testing.

### Pitfall 7: Placeholder Image Dimensions
**What goes wrong:** Placeholder images are too large, slowing initial load, or too small, looking blurry.
**Why it happens:** Using unoptimized stock photos directly from Unsplash without resizing.
**How to avoid:** Download placeholder images and resize to reasonable dimensions (800-1200px on the longest side). Next.js Image will handle responsive sizes from there. Save as JPEG at quality 80.
**Warning signs:** Slow page load, large image transfer sizes in network tab.

---

## Code Examples

### Complete Service Card with 3D Hover and Image Overlay

```typescript
// Source: Verified pattern combining Framer Motion 3D transforms + Next.js Image
"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Button } from "@/components/ui";
import { BOOKSY_URL } from "@/lib/constants";
import type { Service } from "@/lib/constants";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const dampen = 25;

  const rotateX = useTransform(mouseY, (val) => {
    if (!cardRef.current) return 0;
    const rect = cardRef.current.getBoundingClientRect();
    return -(val - rect.top - rect.height / 2) / dampen;
  });

  const rotateY = useTransform(mouseX, (val) => {
    if (!cardRef.current) return 0;
    const rect = cardRef.current.getBoundingClientRect();
    return (val - rect.left - rect.width / 2) / dampen;
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    animate(mouseX, e.clientX);
    animate(mouseY, e.clientY);
  };

  const handleMouseLeave = () => {
    animate(mouseX, 0, { duration: 0.5 });
    animate(mouseY, 0, { duration: 0.5 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      className="relative overflow-hidden rounded-sm group"
    >
      {/* Image with aspect ratio container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          quality={80}
        />
        {/* Gradient overlay - intensifies on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        {service.isSignature && (
          <span className="inline-block px-3 py-1 mb-3 text-xs uppercase tracking-[0.2em] border border-primary-gold/60 text-primary-gold font-body">
            Signature Service
          </span>
        )}
        <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
          {service.title}
        </h3>
        <p className="text-primary-black-200 font-body leading-relaxed mb-4">
          {service.description}
        </p>
        <Button href={BOOKSY_URL} variant="primary" size="sm">
          Book Now
        </Button>
      </div>
    </motion.div>
  );
}
```

### Section Entry with Background Transition

```typescript
// Source: Framer Motion whileInView + Tailwind background utilities
// The About section uses bg-primary-black-950; Services can shift back to bg-primary-black-900
// or introduce a dramatic visual break

<Section id="services" className="relative bg-primary-black-900 overflow-hidden">
  {/* Optional: Decorative gold line or gradient divider at top */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-primary-gold to-transparent" />

  <Container className="max-w-7xl">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.15 } },
      }}
    >
      {/* Section header */}
      <motion.div variants={fadeIn} className="text-center mb-16 md:mb-20">
        <p className="text-primary-gold font-body text-sm uppercase tracking-[0.3em] mb-3">
          What We Offer
        </p>
        <h2 className="text-display-sm md:text-display-md font-heading font-bold text-white mb-6">
          Our Services
        </h2>
      </motion.div>

      {/* Asymmetric service grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        {/* Card placements with varying spans */}
      </div>
    </motion.div>
  </Container>
</Section>
```

### Responsive Asymmetric Grid via Tailwind

```typescript
// Desktop: Asymmetric layout with varying card sizes
// Tablet: 2-column
// Mobile: Single column stack

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
  {/* Classic Haircut - large left */}
  <motion.div variants={cardVariants} className="lg:col-span-7">
    <ServiceCard service={services[0]} />
  </motion.div>

  {/* Fade - medium right */}
  <motion.div variants={cardVariants} className="lg:col-span-5">
    <ServiceCard service={services[1]} />
  </motion.div>

  {/* Line Work - medium left */}
  <motion.div variants={cardVariants} className="lg:col-span-5">
    <ServiceCard service={services[2]} />
  </motion.div>

  {/* Beard Trim - large right */}
  <motion.div variants={cardVariants} className="lg:col-span-7">
    <ServiceCard service={services[3]} />
  </motion.div>

  {/* Hot Towel Shave - SIGNATURE full width */}
  <motion.div variants={cardVariants} className="lg:col-span-12">
    <ServiceCard service={services[4]} />
  </motion.div>
</div>
```

---

## Placeholder Image Strategy

Since client will provide real photos later, use local placeholder images. Two approaches:

### Option A: Download from Unsplash (Recommended)
Download 5 high-quality barbershop photos from Unsplash (free, no attribution needed). Resize to 1200x1600 for portrait cards (3:4 ratio). Save as JPEG at quality 80 in `/public/images/services/`.

**Unsplash search terms per service:**
- Classic Haircut: "barber scissors haircut" or "gentleman haircut"
- Fade/Skin Fade: "fade haircut" or "barber clipper"
- Line Work: "barber detail work" or "hair edge up"
- Beard Trim: "beard trim barber" or "beard shaping"
- Hot Towel Shave: "hot towel shave" or "straight razor shave"

### Option B: Solid Color Placeholders
If download is blocked, create solid gradient placeholders using CSS (no image file needed):
```typescript
// Fallback: CSS gradient placeholder
<div className="relative aspect-[3/4] bg-gradient-to-br from-primary-black-800 to-primary-black-950 flex items-center justify-center">
  <span className="text-primary-gold/30 font-heading text-6xl">
    {service.title[0]}
  </span>
</div>
```

**Recommendation:** Use Option A. Download real barbershop photos during implementation. The image containers use `fill` + `object-cover`, so any aspect ratio photo will work and can be swapped to client photos later by just changing the file.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| CSS scroll-snap + JS IntersectionObserver | Framer Motion `whileInView` + `useScroll` | Framer Motion v7+ (2022) | Declarative, composable, handles cleanup |
| CSS 3D transforms with JS events | FM `useMotionValue` + `useTransform` + `animate` | Framer Motion v6+ (2021) | Motion values bypass React render cycle, 60fps |
| `priority` prop on Next.js Image | `preload` prop (Next.js 16) | Next.js 16 | Note: Project is on Next.js 14, still uses `priority` which works fine |
| GSAP for all scroll effects | Framer Motion for component-level, GSAP for page-level | 2023+ | FM handles 95% of scroll animation needs without extra bundle |

**Deprecated/outdated:**
- `framer-motion` package name: The library rebranded to "Motion" but `framer-motion` npm package still works and is what's installed in this project. No migration needed.
- `AnimatePresence` for page transitions in App Router: Known to be problematic in Next.js 14 App Router. Not needed for this phase (section-level animations only).

---

## Open Questions

1. **Placeholder image quality vs download time**
   - What we know: Unsplash provides high-quality free images. Local storage avoids remote config.
   - What's unclear: Whether to spend time finding perfect placeholders or use generic ones since they'll be replaced.
   - Recommendation: Spend 5 minutes finding decent placeholders. They help validate the layout. Use Unsplash downloads saved to `/public/images/services/`.

2. **Hot Towel Shave "Signature" treatment scope**
   - What we know: User left this at Claude's discretion. The `isSignature` flag in the data model supports it.
   - What's unclear: How dramatic the signature treatment should be -- subtle badge vs. completely different layout.
   - Recommendation: Give it a full-width layout (spanning all 12 columns on desktop) with a landscape image and a "Signature Service" badge. Make it the visual culmination of the section.

3. **Mobile 3D hover behavior**
   - What we know: Mouse-tracking doesn't apply to touch devices. The scroll reveal animations still work.
   - What's unclear: Whether to add touch-specific interactions (tap to reveal description, swipe, etc.).
   - Recommendation: On mobile, rely on the scroll-triggered reveal animations (which are dramatic enough) and skip the 3D hover. Use `@media (hover: hover)` or a `useMediaQuery` check to conditionally enable.

---

## Sources

### Primary (HIGH confidence)
- Next.js Image component docs: https://nextjs.org/docs/app/api-reference/components/image -- `fill`, `sizes`, `placeholder`, `quality` props verified
- Framer Motion 3D card pattern: https://dev.to/arielbk/how-to-make-a-3d-shiny-card-animation-react-ts-and-framer-motion-ijf -- mouse-tracking rotation with `useMotionValue` + `useTransform`
- Framer Motion scroll animations: https://motion.dev/docs/react-scroll-animations -- `whileInView`, `useScroll`, `useTransform` API
- Project codebase inspection: `About.tsx`, `Hero.tsx`, `Button.tsx`, `constants.ts`, `page.tsx` -- established patterns and design tokens

### Secondary (MEDIUM confidence)
- LogRocket scroll animations guide: https://blog.logrocket.com/react-scroll-animations-framer-motion/ -- `whileInView` + stagger pattern verified with official docs
- Framer Motion stagger examples: https://framermotionexamples.com/example/variants-staggered-animation -- `staggerChildren` syntax confirmed
- Next.js + Framer Motion compatibility: https://medium.com/@dolce-emmy/resolving-framer-motion-compatibility-in-next-js-14-the-use-client-workaround -- "use client" requirement confirmed

### Tertiary (LOW confidence)
- Barbershop design trends: https://colorlib.com/wp/barbershop-websites/ -- general design inspiration, not technical reference
- Unsplash barbershop images: https://unsplash.com/s/photos/barbershop -- placeholder image source availability confirmed

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- All libraries already installed and verified in `package.json` and `node_modules`
- Architecture: HIGH -- Patterns verified against official Framer Motion docs and confirmed working in project's existing sections (Hero, About)
- Animation patterns: HIGH -- 3D card pattern verified from detailed tutorial with complete code, scroll patterns from official docs
- Pitfalls: HIGH -- Based on official docs (whileInView once option), real project code inspection (established patterns), and verified community patterns
- Placeholder strategy: MEDIUM -- Unsplash availability confirmed but specific image selection is implementation-time decision

**Research date:** 2026-02-08
**Valid until:** 2026-03-10 (30 days -- stable stack, no fast-moving dependencies)
