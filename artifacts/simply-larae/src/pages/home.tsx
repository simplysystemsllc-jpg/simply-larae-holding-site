/**
 * Simply LaRae — Homepage Route
 *
 * Conditionally renders based on SITE_MODE:
 *   "coming_soon" → ComingSoonPage (launch / brand-partnership page)
 *   "full"        → FullHomepage   (complete website experience)
 *
 * To switch modes, set VITE_SITE_MODE in environment variables:
 *   VITE_SITE_MODE=full          → restore full site
 *   VITE_SITE_MODE=coming_soon   → coming soon page (default)
 */

import { SITE_MODE } from "@/lib/siteMode";
import FullHomepage from "@/components/marketing/FullHomepage";
import ComingSoonPage from "@/components/marketing/ComingSoonPage";

export default function Home() {
  if (SITE_MODE === "full") {
    return <FullHomepage />;
  }
  return <ComingSoonPage />;
}
