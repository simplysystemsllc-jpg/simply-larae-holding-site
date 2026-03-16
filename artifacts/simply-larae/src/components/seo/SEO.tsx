/**
 * Simply LaRae — SEO Component
 * Renders per-page <title>, <meta>, and <link> tags via react-helmet-async.
 * Wrap individual pages with <SEO ... /> to override the default index.html meta tags.
 */

import { Helmet } from "react-helmet-async";

const SITE_NAME = "Simply LaRae";
const BASE_URL = "https://simplylarea.com";
const DEFAULT_IMAGE = `${BASE_URL}/images/opengraph.jpg`;
const TWITTER_HANDLE = "@SimplyLaRae";
const DEFAULT_DESCRIPTION = "Simply LaRae is a luxury beauty advisory platform by Simply Integrated, LLC. AI-powered facial analysis and expert concierge guidance for personalized makeup recommendations, exact shade matches, and curated routines built for your face.";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
}

export function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage = DEFAULT_IMAGE,
  ogType = "website",
  noIndex = false,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Personalized Beauty Concierge | Facial Analysis & Shade Matching`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
  const desc = description || DEFAULT_DESCRIPTION;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1"} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
