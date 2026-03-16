import { db } from "@workspace/db";
import {
  servicesTable,
  productsTable,
  faqsTable,
  approvedRetailersTable,
} from "@workspace/db/schema";

async function seed() {
  console.log("Seeding Simply LaRae database...");

  // Seed services
  await db.delete(servicesTable);
  await db.insert(servicesTable).values([
    {
      slug: "beauty-blueprint",
      name: "Beauty Blueprint",
      tagline: "Your personalized beauty starting point",
      description:
        "Complete the intake questionnaire and receive your personalized beauty recommendations — curated shades, products, and application tips tailored to your unique features.",
      price: "39.00",
      priceDisplay: "$39",
      features: [
        "Multi-step beauty intake questionnaire",
        "Selfie-based facial feature analysis",
        "Personalized product recommendations",
        "Shade matching for foundation & concealer",
        "Application method recommendations",
        "Digital beauty report delivered within 48 hours",
      ],
      isPopular: false,
      sortOrder: 1,
    },
    {
      slug: "concierge-beauty-plan",
      name: "Concierge Beauty Plan",
      tagline: "A fuller routine, curated just for you",
      description:
        "Everything in the Beauty Blueprint plus a complete head-to-toe beauty routine with a curated shopping list across drugstore and high-end options.",
      price: "89.00",
      priceDisplay: "$89",
      features: [
        "Everything in Beauty Blueprint",
        "Full makeup routine from prep to finish",
        "Curated shopping list (drugstore + high-end options)",
        "Primer & skin prep recommendations",
        "Eye, lip, and face product curation",
        "Setting spray & powder guidance",
        "Product comparisons with pros & cons",
      ],
      isPopular: true,
      sortOrder: 2,
    },
    {
      slug: "concierge-beauty-consultation",
      name: "Concierge Beauty Consultation",
      tagline: "Your plan plus a personal consultation",
      description:
        "The complete Concierge Beauty Plan paired with a 30-minute one-on-one consultation to walk through your results and answer any questions.",
      price: "149.00",
      priceDisplay: "$149",
      features: [
        "Everything in Concierge Beauty Plan",
        "30-minute live consultation session",
        "Walk-through of your beauty report",
        "Live Q&A with beauty expert",
        "Application technique guidance",
        "Follow-up email summary",
      ],
      isPopular: false,
      sortOrder: 3,
    },
    {
      slug: "vip-beauty-concierge",
      name: "VIP Beauty Concierge",
      tagline: "The ultimate personalized beauty experience",
      description:
        "Our most comprehensive offering — full consultation, extended support, event planning, and ongoing access to your beauty concierge for a premium high-touch experience.",
      price: "299.00",
      priceDisplay: "$299",
      features: [
        "Everything in Concierge Consultation",
        "60-minute VIP consultation session",
        "Event-specific beauty plan (wedding, photoshoot, etc.)",
        "Makeup bag audit & edit",
        "Seasonal refresh planning",
        "Priority response & ongoing support",
        "Exclusive product access & recommendations",
      ],
      isPopular: false,
      sortOrder: 4,
    },
  ]);
  console.log("✓ Services seeded");

  // Seed products
  await db.delete(productsTable);
  await db.insert(productsTable).values([
    // Primers
    {
      name: "Porefessional Face Primer",
      brand: "Benefit",
      category: "primer",
      description:
        "A silicone-based pore-minimizing primer that creates a smooth, blurred canvas for flawless makeup application.",
      price: "34.00",
      priceRange: "highend",
      imageUrl: null,
      purchaseUrl: "https://www.sephora.com",
      tags: ["silicone-based", "pore-minimizing", "smoothing", "high-end"],
    },
    {
      name: "Blur + Set Pressed Powder Primer",
      brand: "NYX Professional",
      category: "primer",
      description:
        "A lightweight powder primer that blurs imperfections and extends makeup wear without heaviness.",
      price: "12.00",
      priceRange: "drugstore",
      imageUrl: null,
      purchaseUrl: "https://www.ulta.com",
      tags: ["drugstore", "powder", "blurring", "lightweight"],
    },
    // Foundations
    {
      name: "Soft Matte Complete Foundation",
      brand: "NARS",
      category: "foundation",
      description:
        "A full-coverage matte foundation with a natural finish that controls shine and lasts all day.",
      price: "49.00",
      priceRange: "highend",
      imageUrl: null,
      purchaseUrl: "https://www.sephora.com",
      tags: ["matte", "full-coverage", "long-wearing", "high-end"],
    },
    {
      name: "True Match Super Blendable Foundation",
      brand: "L'Oréal Paris",
      category: "foundation",
      description:
        "A skin-true foundation that matches skin texture, tone and undertone for a natural, luminous look.",
      price: "12.99",
      priceRange: "drugstore",
      imageUrl: null,
      purchaseUrl: "https://www.target.com",
      tags: ["drugstore", "natural", "blendable", "undertone-matched"],
    },
    {
      name: "Skin Tint Foundation",
      brand: "ILIA",
      category: "foundation",
      description:
        "A sheer, buildable coverage skin tint with SPF 40 that enhances your natural complexion.",
      price: "48.00",
      priceRange: "highend",
      imageUrl: null,
      purchaseUrl: "https://www.sephora.com",
      tags: ["sheer", "skin-tint", "SPF", "buildable", "clean"],
    },
    // Concealers
    {
      name: "Radiant Creamy Concealer",
      brand: "NARS",
      category: "concealer",
      description:
        "A creamy, full-coverage concealer that brightens the under-eye area and conceals imperfections naturally.",
      price: "32.00",
      priceRange: "highend",
      imageUrl: null,
      purchaseUrl: "https://www.sephora.com",
      tags: ["creamy", "brightening", "under-eye", "high-end"],
    },
    {
      name: "Fit Me Concealer",
      brand: "Maybelline",
      category: "concealer",
      description:
        "A lightweight concealer that blends effortlessly to cover dark circles and imperfections.",
      price: "8.99",
      priceRange: "drugstore",
      imageUrl: null,
      purchaseUrl: "https://www.cvs.com",
      tags: ["drugstore", "lightweight", "blendable", "everyday"],
    },
    // Blush
    {
      name: "Orgasm Blush",
      brand: "NARS",
      category: "blush",
      description:
        "A universally flattering peachy-pink blush with golden shimmer that gives a natural flush.",
      price: "32.00",
      priceRange: "highend",
      imageUrl: null,
      purchaseUrl: "https://www.sephora.com",
      tags: ["peachy-pink", "shimmer", "universally-flattering", "high-end"],
    },
    {
      name: "Milani Baked Blush",
      brand: "Milani",
      category: "blush",
      description:
        "A baked powder blush with a natural, radiant finish at an accessible price point.",
      price: "11.99",
      priceRange: "drugstore",
      imageUrl: null,
      purchaseUrl: "https://www.ulta.com",
      tags: ["drugstore", "baked", "radiant", "affordable"],
    },
    // Bronzer
    {
      name: "Hoola Matte Bronzer",
      brand: "Benefit",
      category: "bronzer",
      description:
        "A matte bronzer that adds warmth and contour without shimmer, suitable for all skin tones.",
      price: "36.00",
      priceRange: "highend",
      imageUrl: null,
      purchaseUrl: "https://www.sephora.com",
      tags: ["matte", "contouring", "natural", "high-end"],
    },
    // Highlighter
    {
      name: "Champagne Pop Highlighter",
      brand: "Becca",
      category: "highlighter",
      description:
        "A cult-favorite champagne highlighter that gives an ethereal, lit-from-within glow.",
      price: "38.00",
      priceRange: "highend",
      imageUrl: null,
      purchaseUrl: "https://www.ulta.com",
      tags: ["champagne", "glow", "shimmer", "high-end"],
    },
    // Setting Powder
    {
      name: "Translucent Loose Setting Powder",
      brand: "Laura Mercier",
      category: "setting-powder",
      description:
        "The gold standard in setting powders — blurs imperfections and sets makeup for all-day wear.",
      price: "44.00",
      priceRange: "highend",
      imageUrl: null,
      purchaseUrl: "https://www.sephora.com",
      tags: ["translucent", "setting", "blurring", "long-wearing"],
    },
    {
      name: "Stay Matte But Not Flat Powder",
      brand: "Rimmel",
      category: "setting-powder",
      description:
        "A drugstore powder that controls shine and sets foundation without cakiness.",
      price: "6.99",
      priceRange: "drugstore",
      imageUrl: null,
      purchaseUrl: "https://www.walgreens.com",
      tags: ["drugstore", "matte", "shine-control", "affordable"],
    },
    // Setting Spray
    {
      name: "All Nighter Long Lasting Makeup Setting Spray",
      brand: "Urban Decay",
      category: "setting-spray",
      description:
        "The iconic setting spray that locks in makeup for up to 16 hours of wear.",
      price: "33.00",
      priceRange: "highend",
      imageUrl: null,
      purchaseUrl: "https://www.sephora.com",
      tags: ["long-wearing", "locking", "high-end", "iconic"],
    },
    {
      name: "Prep + Set + Go Refreshing Watermelon Setting Spray",
      brand: "e.l.f.",
      category: "setting-spray",
      description:
        "A refreshing, lightweight setting spray that primes, sets, and refreshes throughout the day.",
      price: "14.00",
      priceRange: "drugstore",
      imageUrl: null,
      purchaseUrl: "https://www.target.com",
      tags: ["drugstore", "refreshing", "lightweight", "multi-use"],
    },
    // Lip products
    {
      name: "Satin Lipstick",
      brand: "MAC",
      category: "lip",
      description:
        "A creamy, satin-finish lipstick with rich pigment and comfortable, all-day wear.",
      price: "22.00",
      priceRange: "midrange",
      imageUrl: null,
      purchaseUrl: "https://www.maccosmetics.com",
      tags: ["satin", "creamy", "pigmented", "comfortable"],
    },
    {
      name: "Soft Pinch Tinted Lip Oil",
      brand: "Rare Beauty",
      category: "lip",
      description:
        "A nourishing lip oil with a sheer tint that adds a glossy, natural-looking color.",
      price: "20.00",
      priceRange: "midrange",
      imageUrl: null,
      purchaseUrl: "https://www.sephora.com",
      tags: ["lip-oil", "glossy", "nourishing", "sheer-tint"],
    },
  ]);
  console.log("✓ Products seeded");

  // Seed FAQs
  await db.delete(faqsTable);
  await db.insert(faqsTable).values([
    {
      question: "What is Simply LaRae?",
      answer:
        "Simply LaRae is a personalized beauty concierge platform that uses AI-driven facial analysis and expert guidance to help you find the perfect makeup shades, products, and routines tailored specifically to you. No more guesswork — just confident, personalized beauty.",
      category: "general",
      sortOrder: 1,
    },
    {
      question: "How does the facial analysis work?",
      answer:
        "You upload a clear selfie, and our platform analyzes your facial features, undertones, skin tone, and other characteristics. Combined with your intake questionnaire responses, we generate a comprehensive beauty profile that powers your personalized recommendations.",
      category: "general",
      sortOrder: 2,
    },
    {
      question: "Is my selfie and personal data kept private?",
      answer:
        "Absolutely. Your privacy is our top priority. We use your selfie solely for beauty analysis purposes and never share your photos or personal information with third parties. All data is encrypted and securely stored. Please review our Privacy Policy for full details.",
      category: "privacy",
      sortOrder: 3,
    },
    {
      question: "How long does it take to receive my recommendations?",
      answer:
        "Most Beauty Blueprint orders are completed within 24–48 hours. Concierge and VIP tier orders may take slightly longer due to the depth of analysis and consultation scheduling. You'll receive an email notification when your results are ready.",
      category: "process",
      sortOrder: 4,
    },
    {
      question: "What if I'm not happy with my recommendations?",
      answer:
        "We stand behind the quality of our recommendations. If you feel your results don't reflect your needs, reach out to us within 7 days and we'll review your report and make adjustments. Your satisfaction is our commitment.",
      category: "general",
      sortOrder: 5,
    },
    {
      question: "Do I need to buy all the recommended products?",
      answer:
        "Not at all. Your beauty recommendations are a guide — you choose what works for your budget, lifestyle, and preferences. We offer both drugstore and high-end options across every category so you can shop at your comfort level.",
      category: "products",
      sortOrder: 6,
    },
    {
      question: "What is included in the Concierge consultation?",
      answer:
        "The Concierge Beauty Consultation includes everything in the Concierge Beauty Plan plus a 30-minute live video session with a beauty expert. We'll walk through your recommendations together, answer questions, and provide personalized application tips.",
      category: "services",
      sortOrder: 7,
    },
    {
      question: "Do you focus on skincare as well?",
      answer:
        "Our current focus is makeup — from primer and foundation to eye products, lips, setting powders, and sprays. We include makeup prep (skincare-adjacent steps that impact makeup application), but a dedicated skincare advisory is coming soon.",
      category: "products",
      sortOrder: 8,
    },
    {
      question: "Can I use Simply LaRae for a special event?",
      answer:
        "Yes! Our VIP Beauty Concierge tier includes an event-specific beauty plan perfect for weddings, photoshoots, galas, or any special occasion where you want to look your absolute best. Mention your event details in the questionnaire.",
      category: "services",
      sortOrder: 9,
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover) processed securely through Stripe. All transactions are encrypted and your payment information is never stored on our servers.",
      category: "payments",
      sortOrder: 10,
    },
  ]);
  console.log("✓ FAQs seeded");

  // Seed approved retailers
  await db.delete(approvedRetailersTable);
  await db.insert(approvedRetailersTable).values([
    {
      retailerName: "Sephora",
      website: "https://www.sephora.com",
      retailerType: "major_beauty_retailer",
      priorityRank: 1,
      isActive: true,
      notes: "Top-tier beauty destination with wide brand selection. No affiliate arrangement — purely fit-first linking.",
    },
    {
      retailerName: "Ulta Beauty",
      website: "https://www.ulta.com",
      retailerType: "major_beauty_retailer",
      priorityRank: 2,
      isActive: true,
      notes: "Strong mix of drugstore and prestige. Ulta Rewards program adds value for clients.",
    },
    {
      retailerName: "Target",
      website: "https://www.target.com",
      retailerType: "mass_market",
      priorityRank: 3,
      isActive: true,
      notes: "Best drugstore + mass-market option. Good pricing, accessible nationwide.",
    },
    {
      retailerName: "Amazon Beauty",
      website: "https://www.amazon.com/beauty",
      retailerType: "online_retailer",
      priorityRank: 4,
      isActive: true,
      notes: "Used for hard-to-find products and international brands. Always verify seller authenticity.",
    },
    {
      retailerName: "Walgreens Beauty",
      website: "https://www.walgreens.com/beauty",
      retailerType: "drugstore",
      priorityRank: 5,
      isActive: true,
      notes: "Drugstore fallback for accessibility. Good for clients with limited local options.",
    },
    {
      retailerName: "CVS Beauty",
      website: "https://www.cvs.com/shop/beauty",
      retailerType: "drugstore",
      priorityRank: 6,
      isActive: true,
      notes: "Drugstore option for accessibility. Carries many core drugstore brands.",
    },
    {
      retailerName: "Walmart Beauty",
      website: "https://www.walmart.com/cp/beauty/1085666",
      retailerType: "mass_market",
      priorityRank: 7,
      isActive: true,
      notes: "Budget-first option. Best for clients with $10 and under budget needs.",
    },
    {
      retailerName: "NARS Cosmetics",
      website: "https://www.narscosmetics.com",
      retailerType: "brand_direct",
      priorityRank: 8,
      isActive: true,
      notes: "Brand direct for NARS products. Sometimes has exclusive shades or bundles.",
    },
    {
      retailerName: "MAC Cosmetics",
      website: "https://www.maccosmetics.com",
      retailerType: "brand_direct",
      priorityRank: 9,
      isActive: true,
      notes: "Brand direct for MAC. Full shade range available, especially for pro products.",
    },
    {
      retailerName: "e.l.f. Cosmetics",
      website: "https://www.elfcosmetics.com",
      retailerType: "brand_direct",
      priorityRank: 10,
      isActive: true,
      notes: "Brand direct for e.l.f. Often has better pricing and bundles than third-party retailers.",
    },
  ]);
  console.log("✓ Approved retailers seeded");

  console.log("\n✅ Simply LaRae database seeded successfully!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
