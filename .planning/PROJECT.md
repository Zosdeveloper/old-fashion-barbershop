# Old Fashion Barbershop

## What This Is

A premium luxury barbershop website for Old Fashion Barbershop in Naples, FL. The site targets successful men (early 30s to mid-40s) — both local professionals and seasonal tourists — and drives them to book appointments via Booksy. Built with Next.js for SEO/AEO performance, featuring a black and gold aesthetic that communicates quality craftsmanship without pretension.

## Core Value

Every visitor feels they've found the right barbershop within 3 seconds of landing — and can book an appointment in one click.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Premium hero section with bold photography and clear "Book Now" CTA
- [ ] About section with shop philosophy and signature Old Fashioned cocktail detail
- [ ] Services section (no pricing) with compelling descriptions
- [ ] Dedicated gallery page with filterable photo categories (cuts, interior, team, cocktails)
- [ ] Team section featuring 4 barbers with photos and bios
- [ ] Hours & Contact section with Google Map embed, clickable phone, address
- [ ] FAQ section (5-8 questions) optimized for SEO/AEO
- [ ] Final CTA section for conversion push
- [ ] Footer with contact info, Instagram link, copyright
- [ ] Booksy booking integration (Book Now buttons throughout)
- [ ] JSON-LD schema markup (LocalBusiness, BarbershopService, OpeningHoursSpecification, FAQPage)
- [ ] Meta tags, OG tags, and structured data for local SEO
- [ ] Mobile-first responsive design with premium animations
- [ ] Core Web Vitals optimized (image optimization, lazy loading, zero CLS)
- [ ] XML sitemap and robots.txt

### Out of Scope

- Online payments / e-commerce — booking only, no transactions on-site
- Blog / content section — not needed for v1, possible future addition
- Multi-language support — English only for Naples market
- CMS / admin panel — static content, client updates via code
- Live Instagram feed embed — just link to profile (complexity vs value)
- Individual barber booking — single Booksy calendar for all

## Context

- **Business:** Old Fashion Barbershop, 852 1st Ave South, Naples, FL 34102
- **Phone:** (239) 285-8347
- **Hours:** Mon-Fri 9AM-2PM & 4PM-7:30PM, Sat 12PM-6PM, Sun Closed
- **Service Area:** Naples, Bonita Springs, Fort Myers, Marco Island, Cape Coral
- **Team:** 4 barbers (seasonal variation), all handle all services
- **Signature Detail:** Owner crafts hand-made Old Fashioned cocktails for special guests
- **Booking:** Booksy calendar (single URL, placeholder until client provides)
- **Photos:** Client providing real photos (haircuts, interior, team, cocktails)
- **Competition:** Naples luxury market — site must stand out among local barbers

## Constraints

- **Tech Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion — chosen for SEO/SSR performance and premium animations
- **Hosting:** Vercel deployment (free tier compatible)
- **Design:** Black (#1a1a1a) + Gold (#d4af37) palette, serif headlines (Playfair Display), sans-serif body (Inter)
- **Structure:** Hybrid — single-page main site + separate /gallery route
- **Performance:** Must pass Core Web Vitals, server-side rendered for crawlability
- **Imagery:** Real client photos (placeholders from Unsplash during build)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js 14 over static HTML | SSR for SEO, image optimization, app router for gallery page | — Pending |
| Hybrid single-page + /gallery | Main conversion flow stays single-page; gallery gets dedicated space for large photo collection | — Pending |
| No pricing on services | Client preference — drives booking inquiry instead of price comparison | — Pending |
| Single Booksy calendar | All barbers share one booking link, simplifies UX | — Pending |
| Playfair Display + Inter fonts | Luxury serif headlines + clean readable body text | — Pending |

---
*Last updated: 2026-02-07 after initialization*
