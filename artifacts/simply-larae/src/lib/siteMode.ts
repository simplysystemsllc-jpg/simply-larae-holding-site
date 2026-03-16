/**
 * Simply LaRae — Site Mode Configuration
 *
 * Controls whether the public homepage shows the Coming Soon page or the full site.
 *
 * To switch modes:
 *   Set VITE_SITE_MODE environment variable:
 *     VITE_SITE_MODE=coming_soon  → shows the launch/partnership page (default)
 *     VITE_SITE_MODE=full         → restores the full Simply LaRae website
 *
 * This is fully reversible. No code needs to change — only the environment variable.
 */

export type SiteMode = "coming_soon" | "full";

export const SITE_MODE: SiteMode =
  (import.meta.env.VITE_SITE_MODE as SiteMode) ?? "coming_soon";

export const isComingSoon = SITE_MODE === "coming_soon";
export const isFull = SITE_MODE === "full";
