# Roadmap: Old Fashion Barbershop

**Created:** 2026-02-07
**Depth:** standard
**Milestone:** v1.0

## Milestone 1: v1.0 — Launch-Ready Website

### Phase 1: Foundation & Navigation

**Goal:** Establish Next.js project structure, design system, responsive layout, and navigation.

**Requirements:**
- FOUN-01: Next.js 14 project with App Router, TypeScript, Tailwind CSS, Framer Motion
- FOUN-02: Design system — black (#1a1a1a) + gold (#d4af37) palette, Playfair Display headlines, Inter body text
- FOUN-03: Mobile-first responsive layout with hamburger navigation
- FOUN-04: Smooth scrolling experience (Lenis or similar)
- BOOK-02: Placeholder Booksy URL configurable via environment variable

**Success Criteria:**
1. Next.js dev server runs without errors, all dependencies installed
2. Design tokens defined in Tailwind config (colors, fonts, spacing)
3. Navigation works on mobile (hamburger) and desktop (horizontal), links scroll to sections
4. Smooth scroll behavior active across all browsers

---

### Phase 2: Hero & About Sections

**Goal:** Build the first impression — premium hero with CTA and compelling shop story.

**Requirements:**
- HERO-01: Full-width hero with bold photography (barbershop ambiance or barber in action)
- HERO-02: Premium headline and subheading with clear value proposition
- HERO-03: Prominent gold "Book Now" CTA button linking to Booksy (opens new tab)
- ABOU-01: Shop philosophy section (2-3 paragraphs on craftsmanship, experience, local roots)
- ABOU-02: Signature Old Fashioned cocktail detail presented as exclusive luxury touchpoint
- BOOK-01: "Book Now" buttons in hero, CTA section, footer, and navigation — all link to single Booksy URL

**Success Criteria:**
1. Hero section renders full-width with placeholder image, headline, and functional Book Now button
2. About section displays shop philosophy and cocktail detail with premium typography
3. All Book Now buttons link to environment variable Booksy URL and open in new tab
4. Hero passes visual QA on mobile and desktop (no layout shift, readable text)

---

### Phase 3: Services Section

**Goal:** Present barbershop services with compelling descriptions and premium imagery.

**Plans:** 1 plan

Plans:
- [ ] 03-01-PLAN.md — Services data, placeholder images, cinematic asymmetric grid with 3D hover and scroll animations

**Requirements:**
- SERV-01: Service cards for Classic Haircut, Fade/Skin Fade, Line Work & Details, Beard Trim & Shaping, Hot Towel Shave
- SERV-02: Each service has a brief compelling description (2-3 sentences), no pricing
- SERV-03: Premium photography per service (placeholder images during build)

**Success Criteria:**
1. All 5 service cards render with image, title, and description
2. No pricing information displayed anywhere in services section
3. Card layout responsive — stacks on mobile, grid on tablet/desktop
4. Placeholder images optimized via Next/Image with lazy loading

---

### Phase 4: Gallery Page

**Goal:** Create dedicated gallery route with filterable photos and lightbox viewing.

**Requirements:**
- GALL-01: Dedicated /gallery route with full photo grid
- GALL-02: Category filters (Cuts, Interior, Team, Cocktails)
- GALL-03: Lightbox/modal for full-screen photo viewing on click
- GALL-04: Masonry or premium grid layout

**Success Criteria:**
1. /gallery route accessible from navigation, displays grid of placeholder photos
2. Filter buttons work — clicking "Cuts" shows only cut photos, "All" shows everything
3. Clicking any photo opens full-screen lightbox with prev/next navigation
4. Gallery layout adapts responsively (1 column mobile, 2-3 desktop)
5. Gallery route has distinct meta tags and page title

---

### Phase 5: Team, FAQ, Contact & Footer

**Goal:** Complete remaining content sections and conversion touchpoints.

**Requirements:**
- TEAM-01: 4 barber cards with professional headshot, name, brief bio
- TEAM-02: Card hover effects (subtle gold underline or background shift)
- FAQQ-01: 5-8 common questions in accordion format (parking, walk-ins, what to expect, etc.)
- FAQQ-02: Structured for AEO — clear direct answers that AI engines can cite
- CONT-01: Hours display (Mon-Fri 9AM-2PM & 4PM-7:30PM, Sat 12PM-6PM, Sun Closed)
- CONT-02: Clickable phone number (239) 285-8347 on mobile
- CONT-03: Address with embedded Google Map
- CONT-04: Final CTA section — "Ready to Experience Premium Grooming?" with large Book Now button
- CONT-05: Footer with contact info, Instagram link, copyright

**Success Criteria:**
1. Team section displays 4 barber cards with placeholder photos, names, and bios
2. Barber card hover effects trigger on desktop (gold accent appears)
3. FAQ accordion opens/closes on click, default state all closed
4. Contact section shows hours, clickable phone (tel: link), and embedded Google Map
5. Final CTA section with Book Now button renders above footer
6. Footer displays contact info, Instagram link (opens new tab), and current year copyright

---

### Phase 6: SEO, AEO & Performance Optimization

**Goal:** Implement schema markup, meta tags, and performance optimizations for search visibility.

**Requirements:**
- SEOA-01: JSON-LD schema — LocalBusiness, BarbershopService, OpeningHoursSpecification, FAQPage
- SEOA-02: Meta titles and descriptions optimized for local intent per page
- SEOA-03: Open Graph tags for social sharing
- SEOA-04: XML sitemap and robots.txt
- SEOA-05: Next/Image optimization — lazy loading, responsive sizes, WebP format
- SEOA-06: Zero CLS, fast Core Web Vitals

**Success Criteria:**
1. JSON-LD schema validates in Google Rich Results Test (LocalBusiness, FAQPage)
2. Both home and /gallery pages have unique meta titles and descriptions
3. OG tags present — sharing site on Facebook/LinkedIn shows correct preview
4. /sitemap.xml accessible, lists home and gallery routes
5. All images use Next/Image with lazy loading, WebP format where supported
6. Lighthouse score: Performance 90+, SEO 100, Accessibility 90+, zero CLS

---

### Phase 7: Animations, Polish & Final Integration

**Goal:** Add premium micro-interactions, entrance animations, and final quality assurance.

**Requirements:**
- FOUN-05: Premium micro-interactions — button hover effects (gold glow, scale), section entrance animations on scroll

**Success Criteria:**
1. All buttons have gold glow and scale effect on hover
2. Section entrance animations trigger on scroll (fade-in, slide-up) using Framer Motion
3. Animations respect prefers-reduced-motion setting
4. Cross-browser testing complete (Chrome, Safari, Firefox) — no visual regressions
5. Mobile UX tested on real devices — all interactions feel smooth and intentional

---

## Requirement Coverage

| Requirement | Phase |
|-------------|-------|
| FOUN-01 | 1 |
| FOUN-02 | 1 |
| FOUN-03 | 1 |
| FOUN-04 | 1 |
| FOUN-05 | 7 |
| HERO-01 | 2 |
| HERO-02 | 2 |
| HERO-03 | 2 |
| ABOU-01 | 2 |
| ABOU-02 | 2 |
| SERV-01 | 3 |
| SERV-02 | 3 |
| SERV-03 | 3 |
| GALL-01 | 4 |
| GALL-02 | 4 |
| GALL-03 | 4 |
| GALL-04 | 4 |
| TEAM-01 | 5 |
| TEAM-02 | 5 |
| FAQQ-01 | 5 |
| FAQQ-02 | 5 |
| CONT-01 | 5 |
| CONT-02 | 5 |
| CONT-03 | 5 |
| CONT-04 | 5 |
| CONT-05 | 5 |
| SEOA-01 | 6 |
| SEOA-02 | 6 |
| SEOA-03 | 6 |
| SEOA-04 | 6 |
| SEOA-05 | 6 |
| SEOA-06 | 6 |
| BOOK-01 | 2 |
| BOOK-02 | 1 |

**Coverage: 34/34 (100%)**
