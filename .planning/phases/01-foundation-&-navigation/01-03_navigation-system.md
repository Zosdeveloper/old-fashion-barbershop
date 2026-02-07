---
wave: 3
depends_on:
  - 01-01_project-setup-dependencies
  - 01-02_design-system-typography
files_modified:
  - src/hooks/useScrollLock.ts
  - src/components/navigation/NavLink.tsx
  - src/components/navigation/HamburgerButton.tsx
  - src/components/navigation/MobileMenu.tsx
  - src/components/navigation/Navbar.tsx
  - src/components/navigation/index.ts
autonomous: true
---

# Plan 01-03: Navigation System

## Objective
Build the complete navigation system: a sticky desktop horizontal navbar that gains a backdrop blur on scroll, a hamburger button that morphs to an X, and a full-screen mobile overlay menu with staggered entrance animations. Navigation links scroll to section anchors on the home page and route to /gallery.

## must_haves
- Desktop: horizontal nav bar with logo left, links center, "Book Now" button right
- Mobile (<768px): hamburger icon replaces links, opens full-screen overlay
- Navbar becomes translucent with backdrop blur after scrolling past 50px
- Mobile menu animates in with backdrop blur, links stagger in with spring physics
- Scroll is locked when mobile menu is open (body overflow hidden, scrollbar width compensated)
- "Book Now" button links to BOOKSY_URL from constants
- Gallery link navigates to /gallery route, all other links scroll to #anchors
- Hamburger button has animated line-to-X morphing transition
- All interactive elements have proper focus-visible outlines and aria attributes

## Tasks

<task id="1">
Create `C:\Users\Administrator\old-fashion-barbershop\src\hooks\useScrollLock.ts`:

```ts
"use client";

import { useEffect } from "react";

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [locked]);
}
```
</task>

<task id="2">
Create `C:\Users\Administrator\old-fashion-barbershop\src\components\navigation\NavLink.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
  variant?: "desktop" | "mobile";
}

export default function NavLink({
  href,
  label,
  className,
  onClick,
  variant = "desktop",
}: NavLinkProps) {
  const isAnchor = href.startsWith("#");
  const isExternal = href.startsWith("http");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isAnchor) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
    onClick?.();
  };

  if (variant === "mobile") {
    return (
      <motion.a
        href={href}
        onClick={handleClick}
        className={cn(
          "block text-3xl font-heading font-semibold text-white hover:text-primary-gold transition-colors duration-300",
          className
        )}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {label}
      </motion.a>
    );
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        "gold-underline text-sm font-body font-medium uppercase tracking-widest text-primary-black-200 hover:text-primary-gold transition-colors duration-300 py-1",
        className
      )}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {label}
    </a>
  );
}
```
</task>

<task id="3">
Create `C:\Users\Administrator\old-fashion-barbershop\src\components\navigation\HamburgerButton.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HamburgerButtonProps {
  isOpen: boolean;
  toggle: () => void;
  className?: string;
}

const lineVariants = {
  closed: { rotate: 0, y: 0 },
  open: (custom: number) => {
    switch (custom) {
      case 0:
        return { rotate: 45, y: 8 };
      case 1:
        return { opacity: 0, x: -20 };
      case 2:
        return { rotate: -45, y: -8 };
      default:
        return {};
    }
  },
};

export default function HamburgerButton({
  isOpen,
  toggle,
  className,
}: HamburgerButtonProps) {
  return (
    <button
      onClick={toggle}
      className={cn(
        "relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden",
        className
      )}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          custom={i}
          variants={lineVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="block h-[2px] w-6 bg-white origin-center"
        />
      ))}
    </button>
  );
}
```
</task>

<task id="4">
Create `C:\Users\Administrator\old-fashion-barbershop\src\components\navigation\MobileMenu.tsx`:

```tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useScrollLock } from "@/hooks/useScrollLock";
import { NAV_ITEMS, BOOKSY_URL } from "@/lib/constants";
import NavLink from "./NavLink";
import Button from "@/components/ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants = {
  closed: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  open: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const menuVariants = {
  closed: {
    x: "100%",
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  open: {
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const itemVariants = {
  closed: { opacity: 0, x: 50 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1 + i * 0.07,
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  }),
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useScrollLock(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          />

          {/* Menu Panel */}
          <motion.nav
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-y-0 right-0 z-40 w-full max-w-sm bg-primary-black-950/95 backdrop-blur-md flex flex-col justify-center px-10 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col gap-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.label}
                  custom={i}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <NavLink
                    href={item.href}
                    label={item.label}
                    variant="mobile"
                    onClick={onClose}
                  />
                </motion.li>
              ))}
              <motion.li
                custom={NAV_ITEMS.length}
                variants={itemVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="mt-4"
              >
                <Button href={BOOKSY_URL} variant="primary" size="lg" className="w-full">
                  Book Now
                </Button>
              </motion.li>
            </ul>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
```
</task>

<task id="5">
Create `C:\Users\Administrator\old-fashion-barbershop\src\components\navigation\Navbar.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { NAV_ITEMS, SITE_CONFIG, BOOKSY_URL } from "@/lib/constants";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import NavLink from "./NavLink";
import HamburgerButton from "./HamburgerButton";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled
            ? "bg-primary-black-950/90 backdrop-blur-md border-b border-primary-gold/10"
            : "bg-transparent"
        }`}
      >
        <Container>
          <nav className="flex items-center justify-between h-18">
            {/* Logo */}
            <a
              href="#hero"
              className="relative z-50 font-heading text-xl font-bold text-white hover:text-primary-gold transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {SITE_CONFIG.name}
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                />
              ))}
            </div>

            {/* Desktop Book Now */}
            <div className="hidden md:block">
              <Button href={BOOKSY_URL} variant="primary" size="sm">
                Book Now
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <HamburgerButton
              isOpen={isMenuOpen}
              toggle={() => setIsMenuOpen((prev) => !prev)}
            />
          </nav>
        </Container>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}
```
</task>

<task id="6">
Create `C:\Users\Administrator\old-fashion-barbershop\src\components\navigation\index.ts`:

```ts
export { default as Navbar } from "./Navbar";
export { default as MobileMenu } from "./MobileMenu";
export { default as HamburgerButton } from "./HamburgerButton";
export { default as NavLink } from "./NavLink";
```
</task>

## Verification
- [ ] `useScrollLock.ts` exports a hook that sets `overflow: hidden` on body and compensates for scrollbar width
- [ ] `NavLink.tsx` handles anchor scrolling (href="#section") by calling `scrollIntoView`, and passes through route links (/gallery) and external links normally
- [ ] `HamburgerButton.tsx` renders 3 lines that animate to an X when `isOpen` is true, with `aria-label` and `aria-expanded`
- [ ] `MobileMenu.tsx` renders an AnimatePresence-wrapped overlay + slide-in panel, items stagger with spring physics, scroll is locked when open
- [ ] `Navbar.tsx` displays logo left / links center / Book Now right on desktop (md+), hamburger on mobile
- [ ] Navbar gains `backdrop-blur-md` and semi-transparent background after scrolling 50px
- [ ] "Book Now" button in both desktop and mobile menu links to BOOKSY_URL from constants
- [ ] Mobile menu closes on Escape key press and on window resize to md+
- [ ] All navigation components are barrel-exported from `components/navigation/index.ts`
- [ ] `next build` passes without errors
