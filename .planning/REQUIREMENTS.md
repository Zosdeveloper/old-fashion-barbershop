# Requirements: Old Fashion Barbershop

**Defined:** 2026-02-07
**Core Value:** Every visitor feels they've found the right barbershop within 3 seconds and can book in one click.

## v1 Requirements

### Foundation

- [ ] **FOUN-01**: Next.js 14 project with App Router, TypeScript, Tailwind CSS, Framer Motion
- [ ] **FOUN-02**: Design system — black (#1a1a1a) + gold (#d4af37) palette, Playfair Display headlines, Inter body text
- [ ] **FOUN-03**: Mobile-first responsive layout with hamburger navigation
- [ ] **FOUN-04**: Smooth scrolling experience (Lenis or similar)
- [ ] **FOUN-05**: Premium micro-interactions — button hover effects (gold glow, scale), section entrance animations on scroll

### Hero

- [ ] **HERO-01**: Full-width hero with bold photography (barbershop ambiance or barber in action)
- [ ] **HERO-02**: Premium headline and subheading with clear value proposition
- [ ] **HERO-03**: Prominent gold "Book Now" CTA button linking to Booksy (opens new tab)

### About

- [ ] **ABOU-01**: Shop philosophy section (2-3 paragraphs on craftsmanship, experience, local roots)
- [ ] **ABOU-02**: Signature Old Fashioned cocktail detail presented as exclusive luxury touchpoint

### Services

- [ ] **SERV-01**: Service cards for Classic Haircut, Fade/Skin Fade, Line Work & Details, Beard Trim & Shaping, Hot Towel Shave
- [ ] **SERV-02**: Each service has a brief compelling description (2-3 sentences), no pricing
- [ ] **SERV-03**: Premium photography per service (placeholder images during build)

### Gallery

- [ ] **GALL-01**: Dedicated /gallery route with full photo grid
- [ ] **GALL-02**: Category filters (Cuts, Interior, Team, Cocktails)
- [ ] **GALL-03**: Lightbox/modal for full-screen photo viewing on click
- [ ] **GALL-04**: Masonry or premium grid layout

### Team

- [ ] **TEAM-01**: 4 barber cards with professional headshot, name, brief bio
- [ ] **TEAM-02**: Card hover effects (subtle gold underline or background shift)

### FAQ

- [ ] **FAQQ-01**: 5-8 common questions in accordion format (parking, walk-ins, what to expect, etc.)
- [ ] **FAQQ-02**: Structured for AEO — clear direct answers that AI engines can cite

### Contact & Conversion

- [ ] **CONT-01**: Hours display (Mon-Fri 9AM-2PM & 4PM-7:30PM, Sat 12PM-6PM, Sun Closed)
- [ ] **CONT-02**: Clickable phone number (239) 285-8347 on mobile
- [ ] **CONT-03**: Address with embedded Google Map
- [ ] **CONT-04**: Final CTA section — "Ready to Experience Premium Grooming?" with large Book Now button
- [ ] **CONT-05**: Footer with contact info, Instagram link, copyright

### SEO / AEO

- [ ] **SEOA-01**: JSON-LD schema — LocalBusiness, BarbershopService, OpeningHoursSpecification, FAQPage
- [ ] **SEOA-02**: Meta titles and descriptions optimized for local intent per page
- [ ] **SEOA-03**: Open Graph tags for social sharing
- [ ] **SEOA-04**: XML sitemap and robots.txt
- [ ] **SEOA-05**: Next/Image optimization — lazy loading, responsive sizes, WebP format
- [ ] **SEOA-06**: Zero CLS, fast Core Web Vitals

### Booking Integration

- [ ] **BOOK-01**: "Book Now" buttons in hero, CTA section, footer, and navigation — all link to single Booksy URL
- [ ] **BOOK-02**: Placeholder Booksy URL configurable via environment variable

## v2 Requirements

### Enhancements

- **ENH-01**: Live Instagram feed embed widget
- **ENH-02**: Before/after photo slider component
- **ENH-03**: Blog/content section for SEO content marketing
- **ENH-04**: Headless CMS integration for client content updates
- **ENH-05**: Individual barber booking links (per-barber Booksy URLs)
- **ENH-06**: Client testimonials/reviews section with Google Reviews integration

## Out of Scope

| Feature | Reason |
|---------|--------|
| Online payments / e-commerce | Booking-only site, no transactions |
| Multi-language support | English-only for Naples market |
| Admin panel / CMS | Static content for v1, client updates via code |
| Individual barber specialties | All barbers handle all services per client |
| Pricing display | Client preference — drives booking inquiry |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUN-01 | 1 | Complete |
| FOUN-02 | 1 | Complete |
| FOUN-03 | 1 | Complete |
| FOUN-04 | 1 | Complete |
| FOUN-05 | 7 | Pending |
| HERO-01 | 2 | Complete |
| HERO-02 | 2 | Complete |
| HERO-03 | 2 | Complete |
| ABOU-01 | 2 | Complete |
| ABOU-02 | 2 | Complete |
| SERV-01 | 3 | Pending |
| SERV-02 | 3 | Pending |
| SERV-03 | 3 | Pending |
| GALL-01 | 4 | Pending |
| GALL-02 | 4 | Pending |
| GALL-03 | 4 | Pending |
| GALL-04 | 4 | Pending |
| TEAM-01 | 5 | Pending |
| TEAM-02 | 5 | Pending |
| FAQQ-01 | 5 | Pending |
| FAQQ-02 | 5 | Pending |
| CONT-01 | 5 | Pending |
| CONT-02 | 5 | Pending |
| CONT-03 | 5 | Pending |
| CONT-04 | 5 | Pending |
| CONT-05 | 5 | Pending |
| SEOA-01 | 6 | Pending |
| SEOA-02 | 6 | Pending |
| SEOA-03 | 6 | Pending |
| SEOA-04 | 6 | Pending |
| SEOA-05 | 6 | Pending |
| SEOA-06 | 6 | Pending |
| BOOK-01 | 2 | Complete |
| BOOK-02 | 1 | Complete |

**Coverage:**
- v1 requirements: 34 total
- Mapped to phases: 34
- Unmapped: 0

---
*Requirements defined: 2026-02-07*
*Last updated: 2026-02-07 after initial definition*
