# Simply LaRae

**Personalized Beauty Powered by Facial Analysis**

A luxury beauty-tech concierge platform by Simply Integrated, LLC.

---

## SIMPLY LARAE SITE MODE SYSTEM

The full Simply LaRae website build is preserved behind a configurable launch mode.

Two modes exist:

**`VITE_SITE_MODE=coming_soon`**
Displays the temporary launch page while the business prepares for public launch and explores early brand partnership opportunities.

**`VITE_SITE_MODE=full`**
Restores the full website experience.

This system exists to allow the business to pursue sponsorships, partnerships, and pre-launch positioning without losing the existing build.

**To switch modes:** Edit `artifacts/simply-larae/.env` and change `VITE_SITE_MODE` to `full`, then restart the web workflow.

> **IMPORTANT:** Do not remove the `FullHomepage` component (`src/components/marketing/FullHomepage.tsx`). It contains the preserved original full site build.

---

## Stack

- **Frontend:** React + Vite (`artifacts/simply-larae`)
- **Backend:** Express 5 API (`artifacts/api-server`)
- **Database:** PostgreSQL + Drizzle ORM
- **Monorepo:** pnpm workspaces

## Commands

```bash
# Seed database
pnpm --filter @workspace/scripts run seed

# Push DB schema changes
pnpm --filter @workspace/db run push
```

## Site Architecture

```
src/
  lib/
    siteMode.ts                    ← SITE_MODE config (reads VITE_SITE_MODE)
  components/
    marketing/
      FullHomepage.tsx             ← Full site preserved here — DO NOT DELETE
      ComingSoonPage.tsx           ← Coming soon / brand partnership page
    layout/
      Navbar.tsx                   ← Minimal in coming_soon mode, full in full mode
  pages/
    home.tsx                       ← Thin mode-switching wrapper
```

## Independence Policy

Simply LaRae is an independent beauty advisory platform. Sponsored placements are disabled by default. All recommendations are fit-first and customer-first.
