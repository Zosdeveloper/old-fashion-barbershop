---
wave: 2
depends_on:
  - 01-01_project-setup-dependencies
files_modified:
  - tailwind.config.ts
  - src/app/globals.css
  - src/app/layout.tsx
  - src/lib/constants.ts
  - src/components/ui/Button.tsx
  - src/components/ui/Container.tsx
  - src/components/ui/Section.tsx
autonomous: true
---

# Plan 01-02: Design System & Typography

## Objective
Define the complete design system — color tokens, typography (Playfair Display + Inter via next/font), spacing scale, and reusable UI primitives (Button, Container, Section). This plan produces the visual foundation that all subsequent components build upon.

**NOTE:** This plan overwrites several files that Plan 01-01 created in minimal form (tailwind.config.ts, globals.css, layout.tsx). Since Plan 01-01 runs first (Wave 1), these files already exist — this plan replaces them with the full design system versions.

## must_haves
- Tailwind config extends theme with semantic colors (primary-black, primary-gold, and shades), font families, and custom spacing
- Google Fonts (Playfair Display + Inter) load via next/font/google with CSS variable strategy
- globals.css has base layer styles (body background, text color, selection color, scrollbar styling)
- Button component supports variants (primary gold, outline, ghost) and sizes (sm, md, lg)
- Container component constrains content width with responsive padding
- Section component provides consistent vertical spacing with optional id for anchor links
- constants.ts defines all business data and nav items

## Tasks

<task id="1">
Create `C:\Users\Administrator\old-fashion-barbershop\src\lib\constants.ts` with all site constants:

```ts
export const SITE_CONFIG = {
  name: "Old Fashion Barbershop",
  tagline: "Where Tradition Meets Style",
  description:
    "Premium barbershop experience blending timeless tradition with modern style. Expert cuts, hot towel shaves, and a welcoming atmosphere.",
  url: "https://oldfashionbarbershop.com",
} as const;

export const BUSINESS_INFO = {
  phone: "(555) 123-4567",
  email: "info@oldfashionbarbershop.com",
  address: {
    street: "123 Main Street",
    city: "Anytown",
    state: "ST",
    zip: "12345",
    full: "123 Main Street, Anytown, ST 12345",
  },
  hours: [
    { day: "Monday", open: "9:00 AM", close: "7:00 PM" },
    { day: "Tuesday", open: "9:00 AM", close: "7:00 PM" },
    { day: "Wednesday", open: "9:00 AM", close: "7:00 PM" },
    { day: "Thursday", open: "9:00 AM", close: "8:00 PM" },
    { day: "Friday", open: "9:00 AM", close: "8:00 PM" },
    { day: "Saturday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Sunday", open: "Closed", close: "Closed" },
  ],
} as const;

export const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
  { label: "Gallery", href: "/gallery" },
] as const;

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/oldfashionbarbershop",
  facebook: "https://facebook.com/oldfashionbarbershop",
  tiktok: "https://tiktok.com/@oldfashionbarbershop",
} as const;

export const BOOKSY_URL =
  process.env.NEXT_PUBLIC_BOOKSY_URL ||
  "https://booksy.com/en-us/dl/placeholder";
```
</task>

<task id="2">
Overwrite `C:\Users\Administrator\old-fashion-barbershop\tailwind.config.ts` with the full design system config:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-black": {
          DEFAULT: "#1a1a1a",
          50: "#f5f5f5",
          100: "#e5e5e5",
          200: "#cccccc",
          300: "#b3b3b3",
          400: "#999999",
          500: "#808080",
          600: "#666666",
          700: "#4d4d4d",
          800: "#333333",
          900: "#1a1a1a",
          950: "#0d0d0d",
        },
        "primary-gold": {
          DEFAULT: "#d4af37",
          50: "#fdf9eb",
          100: "#f9f0cc",
          200: "#f3e199",
          300: "#edcf5e",
          400: "#e6c030",
          500: "#d4af37",
          600: "#b8922a",
          700: "#937024",
          800: "#7a5c24",
          900: "#684c24",
          950: "#3c2a11",
        },
        cream: "#f5f0e8",
        charcoal: "#2a2a2a",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        section: "6rem",
        "section-lg": "8rem",
      },
      fontSize: {
        "display-lg": [
          "4.5rem",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
        "display-md": [
          "3.5rem",
          { lineHeight: "1.15", letterSpacing: "-0.02em" },
        ],
        "display-sm": [
          "2.5rem",
          { lineHeight: "1.2", letterSpacing: "-0.01em" },
        ],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #d4af37 0%, #f5e6a3 50%, #d4af37 100%)",
        "dark-gradient":
          "linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "gold-shimmer": "goldShimmer 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        goldShimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```
</task>

<task id="3">
Overwrite `C:\Users\Administrator\old-fashion-barbershop\src\app\globals.css` with full base styles:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: auto; /* Lenis handles smooth scrolling */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    @apply bg-primary-black-900 text-primary-black-100 font-body;
    overflow-x: hidden;
  }

  ::selection {
    @apply bg-primary-gold/30 text-white;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    @apply bg-primary-black-950;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-primary-gold/40 rounded-full;
  }

  ::-webkit-scrollbar-thumb:hover {
    @apply bg-primary-gold/60;
  }

  /* Heading defaults */
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading text-white;
  }

  /* Focus styles */
  :focus-visible {
    @apply outline-2 outline-offset-2 outline-primary-gold;
  }

  /* Smooth image rendering */
  img {
    @apply max-w-full h-auto;
  }
}

@layer components {
  .text-gold-gradient {
    @apply bg-gold-gradient bg-clip-text text-transparent;
    background-size: 200% 200%;
  }

  .gold-underline {
    @apply relative;
  }

  .gold-underline::after {
    content: "";
    @apply absolute bottom-0 left-0 w-full h-[2px] bg-primary-gold origin-left scale-x-0 transition-transform duration-300;
  }

  .gold-underline:hover::after {
    @apply scale-x-100;
  }
}

@layer utilities {
  .section-padding {
    @apply py-section lg:py-section-lg;
  }
}
```
</task>

<task id="4">
Overwrite `C:\Users\Administrator\old-fashion-barbershop\src\app\layout.tsx` with the full root layout including font loading:

```tsx
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { SITE_CONFIG } from "@/lib/constants";
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
      <body>{children}</body>
    </html>
  );
}
```
</task>

<task id="5">
Create `C:\Users\Administrator\old-fashion-barbershop\src\components\ui\Button.tsx`:

```tsx
"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-gold text-primary-black-900 hover:bg-primary-gold-400 font-semibold",
  outline:
    "border-2 border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-primary-black-900 font-semibold",
  ghost:
    "text-primary-gold hover:bg-primary-gold/10 font-medium",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center rounded-sm transition-colors duration-300 tracking-wide uppercase",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      return (
        <motion.a
          href={href}
          className={classes}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
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
        whileTap={{ scale: 0.98 }}
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
</task>

<task id="6">
Create `C:\Users\Administrator\old-fashion-barbershop\src\components\ui\Container.tsx`:

```tsx
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export default function Container({
  children,
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </Component>
  );
}
```
</task>

<task id="7">
Create `C:\Users\Administrator\old-fashion-barbershop\src\components\ui\Section.tsx`:

```tsx
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: React.ElementType;
}

export default function Section({
  children,
  className,
  id,
  as: Component = "section",
}: SectionProps) {
  return (
    <Component
      id={id}
      className={cn("section-padding", className)}
    >
      {children}
    </Component>
  );
}
```
</task>

<task id="8">
Create an index barrel export at `C:\Users\Administrator\old-fashion-barbershop\src\components\ui\index.ts`:

```ts
export { default as Button } from "./Button";
export { default as Container } from "./Container";
export { default as Section } from "./Section";
```
</task>

## Verification
- [ ] `tailwind.config.ts` contains `primary-black`, `primary-gold`, `cream`, `charcoal` colors with full shade scales
- [ ] `tailwind.config.ts` has `fontFamily.heading` referencing `--font-playfair` and `fontFamily.body` referencing `--font-inter`
- [ ] `tailwind.config.ts` has custom `display-lg`, `display-md`, `display-sm` font sizes
- [ ] `globals.css` has base layer with body styling, selection color, scrollbar styles
- [ ] `globals.css` has `.text-gold-gradient` and `.gold-underline` component classes
- [ ] `layout.tsx` imports Playfair_Display and Inter from `next/font/google` and applies CSS variables to `<html>`
- [ ] `layout.tsx` has proper metadata with title template
- [ ] `constants.ts` exports SITE_CONFIG, BUSINESS_INFO, NAV_ITEMS, SOCIAL_LINKS, BOOKSY_URL
- [ ] `Button.tsx` is a "use client" component with primary/outline/ghost variants and sm/md/lg sizes
- [ ] `Container.tsx` constrains max-w-7xl with responsive horizontal padding
- [ ] `Section.tsx` applies section-padding utility and accepts an `id` prop
- [ ] All UI components are re-exported from `components/ui/index.ts`
- [ ] `next build` still passes after all changes
