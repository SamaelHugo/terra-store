# TERRA — Premium Supplements Store

## Project
Fullstack e-commerce store for premium supplements brand. Next.js frontend + Strapi CMS backend.
Demo project for web developer portfolio. Must look like a real premium wellness brand.

## Technical Stack
- Frontend: Next.js 15 (App Router) + TypeScript + Tailwind CSS + Framer Motion
- Backend/CMS: Strapi 5 (already running at localhost:1337)
- Database: PostgreSQL (Supabase)
- API: Strapi REST API → Next.js fetches data

## Technical Rules
- Frontend in E:\terra-store\frontend
- Backend in E:\terra-store\backend (Strapi, already configured)
- App Router (src/app/) — file-based routing
- All components in src/components/
- Fetch product data from Strapi API (http://localhost:1337/api/)
- Do NOT change CSS variables or fonts after Prompt 0
- Russian language for all UI text
- Responsive: mobile-first (375px), tablet (768px), desktop (1024px+)
- Images from Pexels for demo (supplements, nature, wellness)

## Design Direction
- DARK PREMIUM theme — deep black/charcoal base, NOT pure black
- Think Moon Juice, Ritual, Aesop dark mode
- Primary bg: #0A0A0A, card bg: #141414, elevated: #1C1C1C
- ONE organic accent: deep sage/forest green (#4A7C59, #5B8A6A range)
- Secondary accent: warm gold (#C5A55A) for prices, CTAs, highlights
- Text: warm white (#F5F0EB) for headings, (#A8A29E) for muted
- Video hero background (like ÉKOS)
- Large product photography on neutral/dark backgrounds
- Lots of whitespace even in dark theme — breathing room is luxury
- NOT techy, NOT corporate — organic, natural, premium

## Fonts
- Headings: Fraunces (Google Fonts) — organic variable serif
- Body: Plus Jakarta Sans (Google Fonts) — clean geometric sans
- Prices/numbers: JetBrains Mono or Plus Jakarta Sans tabular

## Pages
- / — Home (video hero, featured products, brand story, CTA)
- /catalog — Full product catalog with filters
- /catalog/[slug] — Product detail page
- /about — Brand story
- /contact — Contact form

## Strapi Content Types (already created)
- Product: name, slug, description, price, oldPrice, images, inStock, featured, volume, category (relation)
- Category: name, slug, products (relation)

## Progress
- [x] Prompt 0: Design system + Layout (nav + footer)
- [x] Prompt 1: Home page (video hero + featured + brand story)
- [x] Prompt 2: Catalog page (filters + grid + search)
- [x] Prompt 3: Product detail page
- [x] Prompt 4: About + Contact pages
- [ ] Prompt 5: Strapi API integration (replace mock data)
- [ ] Prompt 6: Animations + Polish + Deploy