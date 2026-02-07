---
wave: 3
depends_on:
  - 01-01_project-setup-dependencies
  - 01-02_design-system-typography
files_modified:
  - src/providers/LenisProvider.tsx
  - src/app/template.tsx
  - src/app/layout.tsx
  - src/app/page.tsx
  - src/app/gallery/page.tsx
  - src/types/lenis.d.ts
autonomous: true
---

# Plan 01-04: Smooth Scroll & Page Template

## Objective
Wire up Lenis smooth scrolling via a client provider, create a page transition template, integrate the Navbar into the root layout, and build a placeholder home page with all section anchors so that navigation links have real targets. Also create a minimal /gallery route to validate the Gallery nav link.

## must_haves
- Lenis smooth scrolling active on all pages (mouse wheel, trackpad, touch — but NOT touch on mobile for performance)
- Page transitions via template.tsx using Framer Motion fade
- Navbar is rendered in the root layout (visible on all pages)
- Home page has placeholder sections with correct IDs: hero, about, services, team, faq, contact
- Each section has enough height (~100vh or large padding) to be scrollable for testing
- /gallery route exists and renders a placeholder page
- Lenis scroll resets to top on route changes

## Tasks

<task id="1">
Create `C:\Users\Administrator\old-fashion-barbershop\src\providers\LenisProvider.tsx`:

```tsx
"use client";

import { ReactLenis } from "lenis/react";

interface LenisProviderProps {
  children?: React.ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        smoothTouch: false,
        touchMultiplier: 2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
```
</task>

<task id="2">
Create `C:\Users\Administrator\old-fashion-barbershop\src\app\template.tsx` with a Framer Motion page transition wrapper:

```tsx
"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```
</task>

<task id="3">
Overwrite `C:\Users\Administrator\old-fashion-barbershop\src\app\layout.tsx` with the final root layout that includes LenisProvider and Navbar:

```tsx
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { SITE_CONFIG } from "@/lib/constants";
import LenisProvider from "@/providers/LenisProvider";
import { Navbar } from "@/components/navigation";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "barbershop",
    "haircut",
    "shave",
    "grooming",
    "men's haircut",
    "hot towel shave",
    "traditional barbershop",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <LenisProvider>
          <Navbar />
          <main>{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}
```
</task>

<task id="4">
Overwrite `C:\Users\Administrator\old-fashion-barbershop\src\app\page.tsx` with a full placeholder home page containing all section anchors. Each section should have distinct content and enough height to test scrolling:

```tsx
import { Container, Section } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/constants";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex items-center justify-center min-h-screen bg-dark-gradient"
      >
        <Container className="text-center">
          <p className="text-primary-gold font-body text-sm uppercase tracking-[0.3em] mb-4">
            Est. 2024
          </p>
          <h1 className="text-display-md md:text-display-lg font-heading font-bold text-white mb-6">
            {SITE_CONFIG.name}
          </h1>
          <p className="text-primary-black-300 font-body text-lg md:text-xl max-w-2xl mx-auto mb-8">
            {SITE_CONFIG.tagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={process.env.NEXT_PUBLIC_BOOKSY_URL || "#"}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-gold text-primary-black-900 font-semibold uppercase tracking-wide rounded-sm hover:bg-primary-gold-400 transition-colors duration-300"
            >
              Book Appointment
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-gold text-primary-gold font-semibold uppercase tracking-wide rounded-sm hover:bg-primary-gold hover:text-primary-black-900 transition-colors duration-300"
            >
              Our Services
            </a>
          </div>
        </Container>
      </section>

      {/* About Section */}
      <Section id="about" className="bg-primary-black-950">
        <Container>
          <p className="text-primary-gold font-body text-sm uppercase tracking-[0.3em] mb-2">
            Our Story
          </p>
          <h2 className="text-display-sm md:text-display-md font-heading font-bold text-white mb-6">
            About Us
          </h2>
          <p className="text-primary-black-300 font-body text-lg max-w-3xl leading-relaxed">
            A traditional barbershop experience rooted in craftsmanship and community.
            This section will be fully built out in a later phase with imagery,
            history, and the shop story.
          </p>
          <div className="h-64" aria-hidden="true" />
        </Container>
      </Section>

      {/* Services Section */}
      <Section id="services">
        <Container>
          <p className="text-primary-gold font-body text-sm uppercase tracking-[0.3em] mb-2">
            What We Offer
          </p>
          <h2 className="text-display-sm md:text-display-md font-heading font-bold text-white mb-6">
            Our Services
          </h2>
          <p className="text-primary-black-300 font-body text-lg max-w-3xl leading-relaxed">
            From classic cuts to hot towel shaves, every service is performed with
            precision and care. Full service cards will be added in a later phase.
          </p>
          <div className="h-64" aria-hidden="true" />
        </Container>
      </Section>

      {/* Team Section */}
      <Section id="team" className="bg-primary-black-950">
        <Container>
          <p className="text-primary-gold font-body text-sm uppercase tracking-[0.3em] mb-2">
            Meet the Barbers
          </p>
          <h2 className="text-display-sm md:text-display-md font-heading font-bold text-white mb-6">
            Our Team
          </h2>
          <p className="text-primary-black-300 font-body text-lg max-w-3xl leading-relaxed">
            Skilled barbers who bring decades of combined experience. Team member
            profiles will be added in a later phase.
          </p>
          <div className="h-64" aria-hidden="true" />
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section id="faq">
        <Container>
          <p className="text-primary-gold font-body text-sm uppercase tracking-[0.3em] mb-2">
            Common Questions
          </p>
          <h2 className="text-display-sm md:text-display-md font-heading font-bold text-white mb-6">
            FAQ
          </h2>
          <p className="text-primary-black-300 font-body text-lg max-w-3xl leading-relaxed">
            Frequently asked questions about appointments, pricing, and policies.
            Accordion FAQ component will be added in a later phase.
          </p>
          <div className="h-64" aria-hidden="true" />
        </Container>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="bg-primary-black-950">
        <Container>
          <p className="text-primary-gold font-body text-sm uppercase tracking-[0.3em] mb-2">
            Get In Touch
          </p>
          <h2 className="text-display-sm md:text-display-md font-heading font-bold text-white mb-6">
            Contact Us
          </h2>
          <p className="text-primary-black-300 font-body text-lg max-w-3xl leading-relaxed">
            Visit us, call us, or send a message. Contact form and embedded map will
            be added in a later phase.
          </p>
          <div className="h-64" aria-hidden="true" />
        </Container>
      </Section>
    </>
  );
}
```
</task>

<task id="5">
Create `C:\Users\Administrator\old-fashion-barbershop\src\app\gallery\page.tsx` as a minimal placeholder gallery route:

```tsx
import type { Metadata } from "next";
import { Container, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse our latest cuts, styles, and shop photos.",
};

export default function GalleryPage() {
  return (
    <Section className="min-h-screen pt-32">
      <Container>
        <p className="text-primary-gold font-body text-sm uppercase tracking-[0.3em] mb-2">
          Our Work
        </p>
        <h1 className="text-display-sm md:text-display-md font-heading font-bold text-white mb-6">
          Gallery
        </h1>
        <p className="text-primary-black-300 font-body text-lg max-w-3xl leading-relaxed">
          Photo gallery coming soon. This page will showcase our best work with a
          masonry grid layout in a later phase.
        </p>
      </Container>
    </Section>
  );
}
```
</task>

<task id="6">
Create a Lenis type declaration file at `C:\Users\Administrator\old-fashion-barbershop\src\types\lenis.d.ts` to prevent potential build failures from missing type definitions. Always create this file — it is harmless if not needed and prevents type resolution errors:

```ts
declare module "lenis/react" {
  import { ReactNode, ComponentProps } from "react";

  interface ReactLenisProps {
    root?: boolean;
    options?: {
      lerp?: number;
      duration?: number;
      smoothWheel?: boolean;
      smoothTouch?: boolean;
      touchMultiplier?: number;
      infinite?: boolean;
      orientation?: "vertical" | "horizontal";
      gestureOrientation?: "vertical" | "horizontal" | "both";
    };
    children?: ReactNode;
  }

  export function ReactLenis(props: ReactLenisProps): JSX.Element;
  export function useLenis(callback?: (lenis: any) => void): any;
}
```
</task>

<task id="7">
Run a final build verification:

```bash
cd "C:/Users/Administrator/old-fashion-barbershop" && npx next build
```

The build must complete with zero errors.
</task>

<task id="8">
Verify the dev server starts cleanly. Run:

```bash
cd "C:/Users/Administrator/old-fashion-barbershop" && timeout 15 npm run dev 2>&1 | findstr /C:"Ready in" /C:"ready" /C:"started server"
```

The dev server should output a "ready" message within 15 seconds, confirming it boots without runtime errors. (The `timeout` command ensures the process exits automatically since `next dev` runs indefinitely.)
</task>

## Verification
- [ ] `LenisProvider.tsx` wraps children in `<ReactLenis root>` with `smoothWheel: true` and `smoothTouch: false`
- [ ] `template.tsx` is a "use client" component that wraps children in a `motion.div` with fade+slide-up entrance animation
- [ ] `layout.tsx` imports and renders `<LenisProvider>`, `<Navbar />`, and wraps `{children}` in `<main>`
- [ ] `page.tsx` has sections with IDs: `hero`, `about`, `services`, `team`, `faq`, `contact`
- [ ] Each section has a visible heading and enough content/height to allow scroll testing
- [ ] Hero section has a "Book Appointment" button linking to `NEXT_PUBLIC_BOOKSY_URL`
- [ ] `/gallery` route exists and renders a Gallery heading
- [ ] Gallery nav link in the Navbar navigates to `/gallery` (not an anchor scroll)
- [ ] Smooth scrolling works when clicking nav links that target #anchors
- [ ] `next build` passes with zero errors
- [ ] Dev server (`npm run dev`) boots and renders the home page with navbar visible
