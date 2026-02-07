# Phase 1 Research: Foundation & Navigation

## Stack & Versions

### Core Dependencies
```json
{
  "next": "^14.2.0",
  "react": "^18.3.0",
  "react-dom": "^18.3.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.4.0",
  "framer-motion": "^12.33.0",
  "lenis": "^1.1.0"
}
```

### Key Compatibility Notes
- **Framer Motion 12.33.0** (latest as of Feb 2026) is fully compatible with Next.js 14 App Router
- **Lenis** package has been renamed from `@studio-freight/lenis` to `lenis` (old packages deprecated)
- **React 19** compatibility: Latest Lenis version supports React 19, but project should use React 18.3 for stability
- All packages require "use client" directive when used in App Router components

**Sources:**
- [Framer Motion npm](https://www.npmjs.com/package/framer-motion)
- [Lenis GitHub README](https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md)
- [Framer Motion Next.js 15 Discussion](https://github.com/vercel/next.js/discussions/72228)

---

## Project Structure

### Recommended Folder Organization
```
old-fashion-barbershop/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with fonts + Lenis
│   │   ├── page.tsx                # Home page (single-page sections)
│   │   ├── gallery/
│   │   │   └── page.tsx            # Dedicated gallery route
│   │   └── globals.css             # Tailwind directives
│   ├── components/
│   │   ├── ui/                     # Reusable UI primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Container.tsx
│   │   │   └── Section.tsx
│   │   ├── navigation/             # Nav-specific components
│   │   │   ├── Navbar.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── NavLink.tsx
│   │   └── sections/               # Page sections (Hero, Services, etc.)
│   │       ├── Hero.tsx
│   │       ├── Services.tsx
│   │       └── Contact.tsx
│   ├── lib/
│   │   ├── utils.ts                # Utility functions (cn, etc.)
│   │   └── constants.ts            # Site constants
│   ├── hooks/
│   │   └── useScrollLock.ts        # Lock scroll when menu open
│   └── providers/
│       └── LenisProvider.tsx       # Smooth scroll provider
├── public/
│   ├── images/
│   └── fonts/ (if using local fonts)
├── .env.local
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

### Key Principles (2026 Best Practices)
- **Feature-based organization**: Group related components by feature/module
- **Flat structure**: Avoid deep nesting (max 3-4 levels)
- **Separate UI from sections**: `components/ui/` for reusable, `components/sections/` for page-specific
- **Never dump everything in `app/`**: Keep routing in `app/`, logic in `lib/`, components in `components/`

**Sources:**
- [Next.js 14 Project Structure Best Practices](https://nextjsstarter.com/blog/nextjs-14-project-structure-best-practices/)
- [Next.js Folder Structure Best Practices 2026](https://www.codebydeep.com/blog/next-js-folder-structure-best-practices-for-scalable-applications-2026-guide)
- [Best Practices for Organizing Next.js 15 2025](https://dev.to/bajrayejoon/best-practices-for-organizing-your-nextjs-15-2025-53ji)

---

## Font Loading

### Pattern: Multiple Google Fonts with next/font
```typescript
// src/app/layout.tsx
import { Playfair_Display, Inter } from 'next/font/google'

// Serif font for headlines
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
})

// Sans-serif font for body text
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

### Tailwind Configuration for Fonts
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
    },
  },
}
```

### Usage in Components
```tsx
// Headlines
<h1 className="font-serif text-5xl">Old Fashion Barbershop</h1>

// Body text (default)
<p className="font-sans text-base">Welcome to our luxury barbershop...</p>
```

### Key Notes
- **Multi-word font names**: Replace spaces with underscores (`Playfair_Display`)
- **CSS Variables approach**: Use `variable` option for maximum flexibility
- **Display strategy**: Use `display: 'swap'` to prevent invisible text during font load
- **Weight arrays**: Specify exact weights to minimize bundle size

**Sources:**
- [Multiple @next/font fonts Discussion](https://github.com/vercel/next.js/discussions/41872)
- [How to Add Custom Fonts in Next.js and Tailwind](https://cruip.com/how-to-add-custom-fonts-in-next-js-and-tailwind-css-templates/)

---

## Tailwind Configuration

### Design System Setup (tailwind.config.ts)
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette
        primary: {
          black: '#1a1a1a',
          gold: '#d4af37',
        },
        // Semantic colors
        background: '#1a1a1a',
        foreground: '#ffffff',
        muted: '#4a4a4a',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
      spacing: {
        // Custom spacing for luxury spacing
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      fontSize: {
        // Custom type scale
        'display-lg': ['5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-md': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading-xl': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
```

### Using Design Tokens
```tsx
// Component usage
<section className="bg-primary-black text-foreground">
  <h2 className="font-serif text-heading-xl text-primary-gold">
    Our Services
  </h2>
  <p className="font-sans text-muted">
    Premium grooming experiences
  </p>
</section>
```

### Best Practices
- **theme.extend over theme**: Never replace default Tailwind values, always extend
- **Semantic naming**: Use `primary-gold` instead of `yellow-500` for brand consistency
- **Typography tokens**: Define complete type scale with line-height and letter-spacing
- **CSS Variables support**: Tailwind v4 makes all design tokens available as CSS variables automatically

**Sources:**
- [Tailwind CSS Adding Custom Styles](https://tailwindcss.com/docs/adding-custom-styles)
- [Tailwind CSS Theme Variables](https://tailwindcss.com/docs/theme)
- [Modern Tailwind CSS and Next.js Setup](https://gregko.com/blog/modern-tailwindcss-nextjs)

---

## Smooth Scrolling (Lenis)

### Installation
```bash
npm install lenis
```

### Provider Pattern (App Router Compatible)
```typescript
// src/providers/LenisProvider.tsx
'use client'

import { ReactLenis } from 'lenis/react'
import { ReactNode } from 'react'

export function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,              // Smoothness (0-1, lower = smoother)
        duration: 1.2,          // Animation duration
        smoothWheel: true,      // Enable smooth scrolling
        smoothTouch: false,     // Disable on touch (better mobile perf)
        touchMultiplier: 2,     // Touch scroll sensitivity
        infinite: false,        // No infinite scroll
        autoRaf: true,          // Auto requestAnimationFrame
      }}
    >
      {children}
    </ReactLenis>
  )
}
```

### Root Layout Integration
```typescript
// src/app/layout.tsx
import { LenisProvider } from '@/providers/LenisProvider'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
```

### Using Lenis in Components
```typescript
'use client'

import { useLenis } from 'lenis/react'

export function ScrollToTopButton() {
  const lenis = useLenis()

  const handleClick = () => {
    lenis?.scrollTo(0, { duration: 1.5 })
  }

  return <button onClick={handleClick}>Back to Top</button>
}
```

### Critical Considerations
- **"use client" required**: Lenis relies on browser APIs, must be client component
- **Navigation scroll bug**: When clicking links while Lenis is scrolling, next page may render mid-scroll
  - **Solution**: Set `autoRaf: true` and consider resetting scroll on route change
- **Mobile performance**: Set `smoothTouch: false` to prevent janky mobile experience
- **Package migration**: Use `lenis` (not `@studio-freight/lenis` or `@studio-freight/react-lenis`)

**Sources:**
- [How to Implement Lenis in Next.js](https://bridger.to/lenis-nextjs)
- [Elegant Scrolling in Next.js](https://medium.com/@iamyuvraj456/elegant-scrolling-in-next-js-2d7f3fb4c8e1)
- [Lenis Navigation Issue](https://github.com/darkroomengineering/lenis/issues/319)

---

## Framer Motion Integration

### Installation
```bash
npm install framer-motion
```

### App Router Compatibility
**Critical**: Framer Motion relies on browser-specific APIs (window object), which are unavailable during server-side rendering. ALL Framer Motion components MUST use "use client" directive.

### Basic Animation Pattern
```typescript
'use client'

import { motion } from 'framer-motion'

export function AnimatedSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2>Animated Content</h2>
    </motion.section>
  )
}
```

### Stagger Children Pattern
```typescript
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function ServiceCards() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {services.map((service) => (
        <motion.div key={service.id} variants={item}>
          {service.name}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

### Page Transitions (App Router)
**WARNING**: AnimatePresence doesn't work reliably for page transitions in App Router due to rendering limitations.

**Current Best Practice**: Use `template.tsx` instead of AnimatePresence:

```typescript
// src/app/template.tsx
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}
```

### Key Gotchas
- **Always use "use client"** at the top of files importing Framer Motion
- **AnimatePresence limitation**: Fragile in App Router, relies on unexposed Next.js internals
- **template.tsx approach**: More reliable for page transitions than layout-based AnimatePresence
- **Performance**: Use `whileInView` with `viewport={{ once: true }}` to prevent re-animations

**Sources:**
- [Resolving Framer Motion Compatibility in Next.js 14](https://medium.com/@dolce-emmy/resolving-framer-motion-compatibility-in-next-js-14-the-use-client-workaround-1ec82e5a0c75)
- [Page Transition in Next.js 14 App Router](https://dev.to/abdur_rakibrony_97cea0e9/page-transition-in-nextjs-14-app-router-using-framer-motion-2he7)
- [Solving Framer Motion Page Transitions in App Router](https://www.imcorfitz.com/posts/adding-framer-motion-page-transitions-to-next-js-app-router)

---

## Navigation Pattern

### Mobile Hamburger Menu Architecture

#### Component Structure
```
components/navigation/
├── Navbar.tsx           # Main navigation wrapper
├── MobileMenu.tsx       # Overlay menu component
├── HamburgerButton.tsx  # Animated burger icon
└── NavLink.tsx          # Individual nav links
```

#### Premium Overlay Approach
```typescript
// src/components/navigation/MobileMenu.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useScrollLock } from '@/hooks/useScrollLock'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useScrollLock(isOpen)  // Lock body scroll when menu open

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary-black/90 backdrop-blur-sm z-40"
          />

          {/* Menu panel */}
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[80vw] max-w-sm bg-primary-black border-l border-primary-gold z-50"
          >
            <div className="flex flex-col h-full p-8">
              {/* Menu content */}
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-6 mt-20"
              >
                {navItems.map((item, i) => (
                  <motion.li key={item.href} variants={itemVariants}>
                    <NavLink href={item.href} onClick={onClose}>
                      {item.label}
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Book Now CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-auto"
              >
                <a
                  href={process.env.NEXT_PUBLIC_BOOKSY_URL}
                  className="block w-full bg-primary-gold text-primary-black"
                >
                  Book Now
                </a>
              </motion.div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0 },
}
```

#### Animated Hamburger Button
```typescript
// src/components/navigation/HamburgerButton.tsx
'use client'

import { motion } from 'framer-motion'

export function HamburgerButton({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative w-10 h-10 flex flex-col justify-center items-center"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      <motion.span
        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        className="w-6 h-0.5 bg-primary-gold block mb-1.5"
      />
      <motion.span
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        className="w-6 h-0.5 bg-primary-gold block mb-1.5"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        className="w-6 h-0.5 bg-primary-gold block"
      />
    </button>
  )
}
```

#### Scroll Lock Hook
```typescript
// src/hooks/useScrollLock.ts
import { useEffect } from 'react'

export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isLocked])
}
```

### Design Recommendations
- **Overlay vs Slide-in**: Overlay with backdrop blur for premium feel
- **Animation**: Spring physics (`type: 'spring'`) for natural motion
- **Staggered items**: Delay children for elegant reveal
- **Scroll lock**: Prevent background scroll, compensate for scrollbar width
- **Accessibility**: Include aria-labels, keyboard navigation, focus trapping

**Sources:**
- [Animate a Hamburger Menu with Framer Motion](https://dev.to/wiommi/animate-a-hamburger-menu-with-framer-motion-50ml)
- [Create Animated Hamburger Menu with React](https://medium.com/@georgestoilov/create-animated-hamburger-menu-with-react-and-framer-motion-e4ed2d36ed7c)
- [How to Create an Animated Hamburger Menu in React](https://www.freecodecamp.org/news/how-to-create-an-animated-hamburger-menu-in-react/)

---

## Environment Variables

### Setup Pattern for Public Variables
```bash
# .env.local
NEXT_PUBLIC_BOOKSY_URL=https://booksy.com/en-us/your-barbershop-id
```

### Next.js Public Variable Rules
1. **Prefix requirement**: MUST start with `NEXT_PUBLIC_` to be exposed to browser
2. **Build-time inlining**: Public env vars are embedded into JavaScript bundle during `next build`
3. **Cannot change without rebuild**: Once built, NEXT_PUBLIC variables are hardcoded
4. **Security**: Only expose values safe for client-side (no secrets, API keys, etc.)

### Usage in Components
```typescript
// Works in both Server and Client Components
export function BookButton() {
  return (
    <a href={process.env.NEXT_PUBLIC_BOOKSY_URL}>
      Book Appointment
    </a>
  )
}
```

### TypeScript Typing (Optional)
```typescript
// src/types/env.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BOOKSY_URL: string
    }
  }
}

export {}
```

### Environment File Priority
```
.env.local          # Highest priority (local overrides, gitignored)
.env.development    # Development mode only
.env.production     # Production mode only
.env                # Default fallback (committed to repo)
```

### Best Practices
- **Gitignore .env.local**: Never commit local env files
- **Provide .env.example**: Template for required variables
- **Validate on startup**: Check required env vars in root layout
- **Avoid overuse**: Each NEXT_PUBLIC_ var increases bundle size

**Sources:**
- [Next.js Environment Variables Guide](https://nextjs.org/docs/pages/guides/environment-variables)
- [How to Configure Next.js Environment Variables](https://blog.logrocket.com/configure-environment-variables-next-js/)
- [The Pitfalls of NEXT_PUBLIC Environment Variables](https://dev.to/koyablue/the-pitfalls-of-nextpublic-environment-variables-96c)

---

## Gotchas & Pitfalls

### 1. Framer Motion + App Router
**Problem**: Server-side rendering crashes when Framer Motion tries to access `window` object.

**Solution**: Always use `"use client"` directive at the top of any file importing Framer Motion.

**Anti-pattern**:
```typescript
// ❌ Will crash during SSR
import { motion } from 'framer-motion'

export function Hero() {
  return <motion.div>...</motion.div>
}
```

**Correct pattern**:
```typescript
// ✅ Works with App Router
'use client'

import { motion } from 'framer-motion'

export function Hero() {
  return <motion.div>...</motion.div>
}
```

---

### 2. Lenis Scroll Position on Navigation
**Problem**: Clicking navigation links while Lenis is smoothly scrolling causes next page to render mid-scroll (not at top).

**Solutions**:
```typescript
// Option 1: Reset scroll on route change
'use client'

import { usePathname } from 'next/navigation'
import { useLenis } from 'lenis/react'
import { useEffect } from 'react'

export function ScrollReset() {
  const pathname = usePathname()
  const lenis = useLenis()

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true })
  }, [pathname, lenis])

  return null
}

// Add to layout.tsx
```

---

### 3. AnimatePresence Page Transitions
**Problem**: AnimatePresence doesn't reliably work for page transitions in App Router.

**Solution**: Use `template.tsx` instead of layout-based AnimatePresence:
```typescript
// src/app/template.tsx (NOT layout.tsx)
'use client'

import { motion } from 'framer-motion'

export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

---

### 4. Font Loading Flash (FOUT/FOIT)
**Problem**: Unstyled text flash or invisible text while fonts load.

**Solution**: Use `display: 'swap'` in next/font config:
```typescript
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',  // ← Prevents invisible text
  variable: '--font-playfair',
})
```

---

### 5. Tailwind Content Paths
**Problem**: Tailwind doesn't detect classes in components, resulting in missing styles in production.

**Solution**: Ensure all component paths are in `content` array:
```typescript
// tailwind.config.ts
content: [
  './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  './src/sections/**/*.{js,ts,jsx,tsx,mdx}',  // ← Don't forget custom dirs
]
```

---

### 6. Mobile Menu Scroll Lock
**Problem**: Background content scrolls when mobile menu is open, causing layout shift.

**Solution**: Lock scroll AND compensate for scrollbar width:
```typescript
useEffect(() => {
  if (isOpen) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`  // ← Prevent shift
  } else {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  }
}, [isOpen])
```

---

### 7. Environment Variable Rebuild Requirement
**Problem**: Changing `NEXT_PUBLIC_*` variables requires full rebuild (not hot reload).

**Workaround**: For local development, restart dev server after env changes:
```bash
# After changing .env.local
npm run dev  # Restart server
```

**Note**: In production, ANY change to public env vars requires `next build` + redeploy.

---

### 8. Lenis + Framer Motion Scroll Conflicts
**Problem**: Using Framer Motion's `scroll` or `useScroll` with Lenis can cause jank.

**Solution**: Disable Framer Motion scroll animations or use Lenis's scroll values directly:
```typescript
import { useLenis } from 'lenis/react'

const lenis = useLenis((lenis) => {
  // Access scroll position via Lenis instead of Framer Motion
  console.log(lenis.scroll)
})
```

---

### 9. Next.js Image Optimization with Dark Theme
**Problem**: Images may have white backgrounds that clash with dark theme.

**Solution**: Use `<Image>` with `unoptimized` for PNGs with transparency, or optimize images manually:
```typescript
<Image
  src="/logo.png"
  alt="Logo"
  unoptimized  // ← If transparency issues
/>
```

---

### 10. TypeScript Errors with Framer Motion Variants
**Problem**: TypeScript complains about variant object types.

**Solution**: Use `Variants` type from Framer Motion:
```typescript
import { Variants } from 'framer-motion'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
}
```

---

## Implementation Checklist

- [ ] Initialize Next.js 14 project with TypeScript + Tailwind
- [ ] Install dependencies: `framer-motion@^12.33.0`, `lenis@^1.1.0`
- [ ] Set up Google Fonts (Playfair Display + Inter) in root layout
- [ ] Configure Tailwind with custom design tokens (black/gold palette)
- [ ] Create LenisProvider and wrap root layout
- [ ] Build folder structure (components/ui, components/navigation, lib, hooks, providers)
- [ ] Implement mobile hamburger menu with overlay animation
- [ ] Add scroll lock hook for mobile menu
- [ ] Set up environment variable for Booksy URL
- [ ] Create reusable UI components (Button, Container, Section)
- [ ] Test responsive layout on mobile/desktop
- [ ] Verify smooth scrolling on all pages
- [ ] Ensure all Framer Motion components have "use client"
- [ ] Add scroll reset on route change
- [ ] Configure .env.local with NEXT_PUBLIC_BOOKSY_URL

---

## Final Recommendations

1. **Start with manual project setup** (don't rely on create-next-app if it hangs on Windows)
2. **Use CSS Variables approach** for fonts to maximize flexibility
3. **Implement template.tsx** for page transitions (not AnimatePresence)
4. **Test mobile menu immediately** to catch scroll lock issues early
5. **Set up .env.example** with placeholder Booksy URL for team onboarding
6. **Use spring animations** (`type: 'spring'`) for premium feel
7. **Validate all "use client"** directives are in place before deploying
8. **Monitor bundle size** with each NEXT_PUBLIC variable added

This foundation will provide a solid, production-ready base for Phase 2 (Content & Sections).
