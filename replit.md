# Simply LaRae — Beauty Platform

## Overview

A premium personalized beauty-tech concierge platform powered by facial analysis. Built for **Simply Integrated, LLC** — parent company of Simply LaRae (simplylarea.com).

## Brand

- **Brand name**: Simply LaRae (always exactly this capitalization — LaRae)
- **Tagline**: PERSONALIZED BEAUTY POWERED BY FACIAL ANALYSIS
- **Primary palette**: Blush `#EED4CF`, Soft Rose `#D9A9A3`, Taupe Accent `#8E6E67`, Warm Cocoa `#6E544E`, Pearl Background `#F5E7E3`
- **Typography**: Inter (300/400/500 weights), generous letter spacing, editorial feel
- **Independence**: Retailer-agnostic, fit-first, sponsored placements disabled by default

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js**: 24
- **Frontend**: React + Vite (artifacts/simply-larae)
- **Backend**: Express 5 (artifacts/api-server)
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod v4, drizzle-zod
- **API codegen**: Orval (from OpenAPI spec)
- **Forms**: react-hook-form + zod
- **Routing**: wouter
- **Animation**: framer-motion
- **Uploads**: react-dropzone
- **UI**: shadcn/ui + Tailwind CSS

## Structure

```text
artifacts/
  api-server/           # Express 5 API (port 8080, proxied at /api)
    src/routes/         # health, services, submissions, products, recommendations,
                        # cart, contact, faqs, retailers, brands, checkout
    src/services/       # email.ts (transactional email scaffold), stripe.ts (checkout scaffold)
  simply-larae/         # React + Vite frontend (port 26035, proxied at /)
    src/lib/brand/      # colors.ts, typography.ts, motion.ts, spacing.ts, voice.ts, index.ts
    src/components/ui/  # ProductCard.tsx, DisclosureBadge.tsx (+ shadcn primitives)
lib/
  api-spec/             # OpenAPI spec + Orval codegen config
  api-client-react/     # Generated React Query hooks
  api-zod/              # Generated Zod schemas
  db/                   # Drizzle ORM schema + DB connection
scripts/
  src/seed.ts           # Database seed script
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, trust strip, features, how-it-works, service preview, why different, product examples (Sec 7), personalized support, brand partnership (Sec 9), FAQ, final CTA |
| `/services` | Full service tier comparison (4 tiers) |
| `/how-it-works` | Visual 4-step process |
| `/intake?serviceId=N` | 6-step beauty intake questionnaire (requires serviceId; redirects without it) |
| `/upload` | Selfie upload with drag-and-drop |
| `/results/:id` | Personalized recommendation results |
| `/blueprint/:id` | Premium 15-section Beauty Blueprint report |
| `/cart` | Beauty cart with products |
| `/about` | Brand story and philosophy |
| `/faq` | Full FAQ accordion (live from DB) |
| `/contact` | Contact form (saves to DB) |
| `/privacy` | Full Privacy Policy (12 sections) |
| `/terms` | Full Terms of Service (12 sections) |
| `/disclaimer` | Standalone Disclaimer page |
| `/admin` | Internal admin dashboard (6 tabs) |
| `/not-found` | 404 fallback |

## Intake Form — 6 Steps

1. **Basic Info** — Full name, email, age range
2. **Skin Canvas** — Skin type, tone, undertone, sensitivity
3. **Personal Features** — Facial features (optional)
4. **Habits & Preferences** — Experience, budget, style
5. **Product Preferences** — Primer, foundation, concealer, blush, bronzer, highlighter, eye, lip, setting powder, spray, application method, routine preference (all optional)
6. **Goals** — Everyday goal, event needs, frustrations, drugstore vs high-end

## Service Tiers

1. **Beauty Blueprint** — $39 (entry)
2. **Concierge Beauty Plan** — $89 (popular)
3. **Concierge Beauty Consultation** — $149 (plan + consult)
4. **VIP Beauty Concierge** — $299 (full premium)

## Database Schema

| Table | Description |
|-------|-------------|
| `services` | Service tiers (seeded) |
| `submissions` | Beauty assessment submissions |
| `products` | Beauty product library (seeded, 17 curated products) |
| `recommendations` | Personalized recommendations per submission |
| `cart_items` | Shopping cart items (session-based) |
| `contact_messages` | Contact form submissions |
| `faqs` | FAQ entries (seeded, 10 questions) |
| `approved_retailers` | Approved retailers for recommendation linking (seeded, 10 retailers) |
| `product_offers` | Retailer-specific product links, pricing, affiliate/sponsored flags |
| `customer_profiles` | Extended client profiles beyond submissions |
| `workflow_status` | Submission pipeline tracking with status history |
| `concierge_requests` | Concierge purchase service scaffolding |
| `brands` | Brand CRM with partnership status |
| `brand_partnerships` | Partnership type, affiliate/sponsored toggles, disclosure text |
| `sponsored_placements` | Sponsored content layer (disabled by default) |
| `partnership_contact_log` | Outreach tracking for brand development |

## Commands

```bash
# Database
pnpm --filter @workspace/db run push          # Apply schema
pnpm --filter @workspace/scripts run seed     # Seed all data (services, products, FAQs, retailers)

# Codegen (after OpenAPI spec changes)
pnpm --filter @workspace/api-spec run codegen
```

## API Endpoints

- `GET /api/services` — List all service tiers
- `POST /api/submissions` — Create beauty assessment
- `GET /api/submissions/:id` — Get submission
- `GET /api/recommendations/:submissionId` — Get recommendations
- `GET /api/products` — List products (filter by category/priceRange)
- `GET /api/cart?sessionId=` — Get cart
- `POST /api/cart` — Add to cart
- `DELETE /api/cart/:id` — Remove from cart
- `POST /api/contact` — Submit contact form
- `GET /api/faqs` — List FAQs
- `GET /api/retailers` — List active approved retailers
- `GET /api/retailers/all` — List all retailers (admin)
- `POST /api/retailers` — Create retailer
- `PATCH /api/retailers/:id` — Update retailer
- `GET /api/brands` — List brands
- `POST /api/brands` — Create brand
- `GET /api/brands/:id/partnerships` — Brand partnerships
- `GET /api/brands/:id/contact-log` — Partnership contact log
- `POST /api/checkout/create-session` — Create Stripe checkout session (requires STRIPE_SECRET_KEY)
- `POST /api/checkout/webhook` — Stripe webhook handler (requires STRIPE_WEBHOOK_SECRET)

## Form Submission Architecture (Vercel Production)

Forms use a dual-path submission strategy for maximum reliability:

1. **Primary**: Frontend POSTs directly to Supabase REST API (`/rest/v1/contact_messages`) using publishable key — instant, no serverless function needed
2. **Secondary**: Fire-and-forget POST to `/api/contact` Vercel serverless function (email only via Resend)
3. **Fallback**: If Supabase is unreachable, awaits `/api/contact` response instead

**Env vars (Vercel dashboard):**
- `VITE_SUPABASE_URL` — Supabase project URL (build-time, baked into frontend JS)
- `VITE_SUPABASE_KEY` — Supabase publishable key (safe to expose)
- `RESEND_API_KEY` — Resend email API key (runtime, serverless only)
- `SUPABASE_URL` / `SUPABASE_KEY` — NOT needed (frontend handles DB directly)

**Supabase table required:**
```sql
create table contact_messages (
  id bigint generated by default as identity primary key,
  name text not null, email text not null, subject text not null,
  message text not null, created_at timestamptz default now() not null
);
alter table contact_messages enable row level security;
create policy "allow_insert" on contact_messages for insert with check (true);
```

**Files:**
- `api/contact.js` — Vercel serverless function (email only, CommonJS, Node 18+)
- `vercel.json` — Routes, functions runtime, env vars for build
- `artifacts/simply-larae/src/components/marketing/ComingSoonPage.tsx` — `submitToContact()` with dual-path logic

## Email Architecture (artifacts/api-server/src/services/email.ts)

Live via Resend (RESEND_API_KEY required). Auto-detects Resend when API key is set, falls back to console logging otherwise. Verified sender domain: `simplyintegratedco.com`. Default FROM: `Simply LaRae <hello@simplyintegratedco.com>`.

Admin notifications go to `simplylarae.dba@gmail.com` (CC: `simplysystemsllc@gmail.com`).

- `sendPurchaseConfirmation` — Order confirmed
- `sendIntakeReceived` — Profile submitted
- `sendSelfieReceived` — Photo received, analysis started
- `sendAdminNewSubmission` — Admin alert on new submission
- `sendBlueprintDelivered` — Blueprint ready with link
- `sendConciergeRequestConfirmation` — Concierge purchase
- `sendBrandInquiryNotification` — Brand partnership inquiry (admin)
- `sendBrandInquiryConfirmation` — Brand inquiry confirmation (submitter)
- `sendContactNotification` — Contact form admin notification
- `sendContactConfirmation` — Contact form confirmation (submitter)

## Stripe Scaffolding (artifacts/api-server/src/services/stripe.ts)

Service-purchase focused (not retail). Returns 503 with contact info if STRIPE_SECRET_KEY not configured. Webhook-ready for `checkout.session.completed`.

## SEO Architecture

- `index.html` — Comprehensive primary meta, OG, Twitter Card, JSON-LD `@graph` (WebSite, Organization, ProfessionalService with offer catalog, WebPage, FAQPage), canonical, PWA meta, geo tags, Google Fonts preload
- `public/robots.txt` — Disallows /admin, /api, /intake, /results/, /blueprint/, /cart; explicit AI crawler policies (GPTBot, Claude, Perplexity, etc.)
- `public/sitemap.xml` — 9 URLs with lastmod dates, changefreq and priority
- `public/site.webmanifest` — PWA manifest with brand colors
- `src/components/seo/SEO.tsx` — Reusable per-page `<SEO>` component using react-helmet-async; accepts title, description, keywords, canonical, ogImage, noIndex
- Per-page SEO on: ComingSoonPage, Services, HowItWorks, About, FAQ, Contact pages
- `HelmetProvider` wraps the entire app in App.tsx

## Independence Policy (Hardcoded)

- Sponsored placements: architecture exists, `isActive: false` by default, never shown without DisclosureBadge
- Affiliate links: disabled by default
- Recommendation logic: fit-first, customer-first, never pay-to-play
- `DisclosureBadge` component labels any sponsored/affiliate/featured content if ever enabled

## Site Mode System

Controls whether the public homepage shows the coming soon page or the full site.

**Configuration:** `artifacts/simply-larae/.env` → `VITE_SITE_MODE`

| Value | Effect |
|-------|--------|
| `coming_soon` | Shows `ComingSoonPage` — luxury pre-launch page with Join Waitlist + Brand Partnerships CTAs (current default) |
| `full` | Shows `FullHomepage` — complete 10-section website |

**Key files:**
- `src/lib/siteMode.ts` — reads `VITE_SITE_MODE`, exports `SITE_MODE`, `isComingSoon`, `isFull`
- `src/components/marketing/FullHomepage.tsx` — **preserved full site build — do not delete**
- `src/components/marketing/ComingSoonPage.tsx` — pre-launch page (hero + platform overview + For Beauty Brands section + footer)
- `src/pages/home.tsx` — thin wrapper: renders `FullHomepage` or `ComingSoonPage` based on `SITE_MODE`
- `src/components/layout/Navbar.tsx` — wordmark-only in `coming_soon`; full nav in `full`
- `src/App.tsx` — suppresses `<Footer />` in `coming_soon` (ComingSoonPage has its own footer)

**To restore full site:** Change `VITE_SITE_MODE=full` in `.env`, restart web workflow.

## Code Quality & Performance

**Completed optimizations (March 2025):**
- Route component wrappers (`wrap()`) hoisted to module scope — prevents React remounting pages on every Router re-render
- Branded 404 page using brand palette + "Return Home" button (replaces old gray card)
- Array sort mutation fixed in services.tsx and faq.tsx — now uses spread copy before sorting
- Contact form `scroll-mt` corrected to `scroll-mt-28` to clear 80px sticky navbar
- Navbar: added `aria-label`, `aria-expanded`, `aria-controls` to hamburger; `aria-current="page"` on active nav links; Escape-key close; body scroll lock when open; auto-close on route change; `role="banner"` on header
- Modal close buttons: proper `aria-label` on Waitlist and Partnership modals
- `overflow-x: hidden` on html + body prevents animation-caused horizontal scroll
- `scroll-behavior: smooth` on html element
- `-webkit-tap-highlight-color: transparent` for cleaner mobile tap feedback
- `:focus-visible` ring using brand primary color
- `img, video { max-width: 100% }` prevents media overflow
- About page image: `loading="lazy"`, `decoding="async"`, gradient fallback on 404
- Google Fonts removed from CSS `@import` (was duplicating the `<link>` in index.html)
- Footer disclaimer `text-right` scoped to `md:text-right` only — left-aligned on mobile

## Roadmap

- Stripe activation (add STRIPE_SECRET_KEY)
- ~~Custom Resend domain~~ — verified `simplyintegratedco.com` (active)
- Real AI facial analysis via computer vision API
- Admin selfie viewer + blueprint editor
- Submission workflow status updates via admin
- Concierge purchase flow end-to-end
- Seasonal refresh and event-specific add-ons
