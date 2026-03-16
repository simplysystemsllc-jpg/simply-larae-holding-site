import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Camera,
  Sparkles,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Upload,
  ScanFace,
  Gift,
  ShoppingBag,
  Star,
  Shield,
  Zap,
  Users,
} from "lucide-react";
import { useListServices, useListFaqs } from "@workspace/api-client-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, ease: "easeOut" },
};

export default function FullHomepage() {
  const { data: services } = useListServices();
  const { data: faqs } = useListFaqs();
  // SEO handled by index.html structured data + per-page SEO component when needed
  const sortedServices = services?.sort((a, b) => a.sortOrder - b.sortOrder) ?? [];
  const previewFaqs = faqs?.slice(0, 5) ?? [];

  return (
    <div className="w-full">
      {/* ── HERO ── */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-abstract.png`}
            alt=""
            className="w-full h-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/90" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <p className="text-primary text-xs tracking-[0.35em] mb-8 font-medium">
              Simply Integrated, LLC
            </p>

            <h1
              className="text-6xl sm:text-7xl md:text-[8rem] tracking-[0.08em] font-thin text-foreground mb-6 leading-none"
              data-testid="text-hero-brand"
            >
              Simply LaRae
            </h1>

            <p className="text-xs sm:text-sm tracking-[0.28em] uppercase text-foreground/60 mb-6 font-light">
              Personalized Beauty Powered by Facial Analysis
            </p>

            <p className="text-base md:text-lg text-foreground/70 font-light mb-14 max-w-xl mx-auto leading-relaxed">
              Stop guessing. Get exactly the shades, products, and routines
              your face calls for — curated just for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-full px-10 py-7 text-sm tracking-widest uppercase bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/25 transition-all hover:-translate-y-0.5"
                data-testid="button-get-blueprint"
              >
                <Link href="/services">Get Your Beauty Blueprint</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-10 py-7 text-sm tracking-widest uppercase border-foreground/30 text-foreground hover:bg-foreground/5 transition-all"
                data-testid="button-how-it-works"
              >
                <Link href="/how-it-works">How It Works</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.7 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-foreground/40"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">Discover</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="bg-white border-y border-border/40 py-5 overflow-hidden">
        <div className="flex items-center justify-center gap-12 flex-wrap px-8 text-muted-foreground/70">
          {[
            "Facial Structure Analysis",
            "Curated Product Matching",
            "Undertone Identification",
            "Drugstore + High-End Options",
            "Expert Concierge Guidance",
          ].map((item, i) => (
            <span
              key={i}
              className="text-[11px] tracking-[0.2em] uppercase font-light flex items-center gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-primary inline-block" />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ── 3-COLUMN FEATURE SECTION ── */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-20">
            <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-4">
              The Platform
            </p>
            <h2 className="text-4xl md:text-5xl font-thin tracking-[0.06em] uppercase mb-6 text-foreground">
              Beauty, Engineered for You
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              Three pillars make Simply LaRae different from every beauty
              quiz or influencer recommendation you've tried before.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ScanFace,
                title: "Facial Analysis",
                desc: "Upload a selfie and our AI analyzes your facial structure, undertones, and features — creating a data-backed beauty profile unique to you.",
                num: "01",
              },
              {
                icon: Sparkles,
                title: "Personalized Beauty Blueprint",
                desc: "Receive curated product recommendations and routines tailored specifically to your features — from primer to setting spray.",
                num: "02",
              },
              {
                icon: HeartHandshake,
                title: "Concierge Beauty Guidance",
                desc: "AI analysis plus expert guidance helps you select the perfect shades, application methods, and products with total confidence.",
                num: "03",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.18, duration: 0.65, ease: "easeOut" }}
              >
                <Card className="border-border/40 bg-white rounded-3xl shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 h-full group">
                  <CardContent className="p-10 flex flex-col items-start">
                    <div className="flex items-center justify-between w-full mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-background flex items-center justify-center shadow-sm group-hover:bg-primary/5 transition-colors">
                        <feature.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                      </div>
                      <span className="text-4xl font-thin text-foreground/10 tracking-tight">
                        {feature.num}
                      </span>
                    </div>
                    <h3 className="text-base uppercase tracking-widest font-medium mb-4 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground font-light leading-relaxed text-sm">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-20">
            <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-4">
              The Process
            </p>
            <h2 className="text-4xl md:text-5xl font-thin tracking-[0.06em] uppercase mb-6 text-foreground">
              How It Works
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              From selfie to beauty routine in four seamless steps — no appointment needed.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Upload,
                step: "Step 1",
                title: "Upload Your Selfie",
                desc: "A clear, natural-light photo is all we need. No filters, no makeup — just you.",
              },
              {
                icon: ScanFace,
                step: "Step 2",
                title: "AI Facial Analysis",
                desc: "Our platform analyzes your skin tone, undertone, and facial structure in detail.",
              },
              {
                icon: Sparkles,
                step: "Step 3",
                title: "Receive Your Recommendations",
                desc: "Get a personalized beauty report with exact product picks and shade matches.",
              },
              {
                icon: ShoppingBag,
                step: "Step 4",
                title: "Build Your Routine",
                desc: "Add recommended products to your beauty cart and shop from curated links.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                className="relative"
              >
                {i < 3 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(100%-1rem)] w-8 text-border/60 z-10">
                    <ArrowRight className="w-5 h-5 text-primary/30" />
                  </div>
                )}
                <div className="bg-background rounded-3xl p-8 border border-border/40 hover:border-primary/20 hover:shadow-lg transition-all duration-400 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-border/40">
                      <item.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] tracking-[0.25em] uppercase text-primary font-medium">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-sm uppercase tracking-widest font-medium mb-3 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground font-light text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-14">
            <Button
              asChild
              className="rounded-full px-8 py-6 tracking-widest uppercase text-sm bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
              data-testid="button-start-now"
            >
              <Link href="/services">Start Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICE TIERS PREVIEW ── */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <motion.div {...fadeUp} className="max-w-2xl">
              <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-4">
                Service Tiers
              </p>
              <h2 className="text-4xl md:text-5xl font-thin tracking-[0.06em] uppercase mb-4 text-foreground">
                Choose Your Level
              </h2>
              <p className="text-muted-foreground font-light">
                From a quick beauty blueprint to full VIP concierge — every tier delivers real results.
              </p>
            </motion.div>
            <Link
              href="/services"
              className="hidden md:flex items-center text-sm uppercase tracking-widest font-medium text-primary hover:text-foreground transition-colors mt-4 md:mt-0"
            >
              Compare All Tiers <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedServices.slice(0, 4).map((service, i) => (
              <motion.div
                key={service.id}
                {...fadeUp}
                transition={{ delay: i * 0.1, duration: 0.55, ease: "easeOut" }}
              >
                <Card
                  className={`relative h-full flex flex-col overflow-hidden rounded-3xl border transition-all hover:shadow-xl ${
                    service.isPopular
                      ? "border-primary shadow-lg bg-white"
                      : "border-border/50 shadow-sm bg-white"
                  }`}
                >
                  {service.isPopular && (
                    <div className="bg-primary text-white text-[10px] uppercase tracking-widest font-bold text-center py-1.5 flex items-center justify-center gap-1.5">
                      <Star className="w-2.5 h-2.5 fill-current" /> Most Popular
                    </div>
                  )}
                  <CardContent className="p-8 flex-1 flex flex-col">
                    <h3 className="text-lg uppercase tracking-wider font-light mb-2 text-foreground">
                      {service.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-3xl text-foreground font-light">{service.priceDisplay}</span>
                    </div>
                    <p className="text-sm text-muted-foreground font-light mb-6 flex-1 leading-relaxed">
                      {service.tagline}
                    </p>
                    <ul className="space-y-2.5 mb-8">
                      {service.features.slice(0, 3).map((feature, j) => (
                        <li
                          key={j}
                          className="flex items-start text-xs text-foreground/75 font-light"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary mr-2.5 flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className={`w-full rounded-full tracking-widest uppercase text-xs py-5 transition-all ${
                        service.isPopular
                          ? "bg-primary hover:bg-primary/90 text-white"
                          : "bg-background hover:bg-primary text-foreground hover:text-white border border-border"
                      }`}
                      data-testid={`button-service-${service.id}`}
                    >
                      <Link href={`/intake?serviceId=${service.id}`}>
                        Begin Profile
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link
              href="/services"
              className="inline-flex items-center text-sm uppercase tracking-widest font-medium text-primary"
            >
              Compare All Tiers <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY SIMPLY LARAE IS DIFFERENT ── */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute -right-40 -top-40 w-[600px] h-[600px] rounded-full bg-primary/5 pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-[400px] h-[400px] rounded-full bg-secondary/20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeUp}>
              <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-4">
                Why We're Different
              </p>
              <h2 className="text-4xl md:text-5xl font-thin tracking-[0.06em] uppercase mb-8 text-foreground leading-tight">
                Not A Quiz.
                <br />
                Not A Chatbot.
                <br />
                A Concierge.
              </h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-10">
                Generic beauty quizzes ask five questions and give you the
                same "foundation recommendations" everyone else gets. Simply LaRae
                performs a real facial analysis of your unique structure,
                undertones, and features — then pairs that data with expert
                concierge review for recommendations that actually work.
              </p>
              <Button
                asChild
                className="rounded-full px-8 py-6 tracking-widest uppercase text-sm bg-primary hover:bg-primary/90 text-white"
                data-testid="button-see-how"
              >
                <Link href="/how-it-works">See How It Works</Link>
              </Button>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ delay: 0.2, duration: 0.65 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {[
                {
                  icon: ScanFace,
                  title: "Facial Analysis",
                  desc: "Real structural analysis — not a color-season category.",
                },
                {
                  icon: Users,
                  title: "Expert Review",
                  desc: "Every result is reviewed by a beauty expert before delivery.",
                },
                {
                  icon: Zap,
                  title: "Fast Results",
                  desc: "Most blueprints delivered within 24–48 hours.",
                },
                {
                  icon: Shield,
                  title: "Private & Secure",
                  desc: "Your selfie and data never shared with third parties.",
                },
                {
                  icon: ShoppingBag,
                  title: "Drugstore to High-End",
                  desc: "Every recommendation includes options for your budget.",
                },
                {
                  icon: Camera,
                  title: "Routine-Ready",
                  desc: "From primer to setting spray — a complete system.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-background rounded-2xl p-6 border border-border/40 hover:border-primary/20 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm border border-border/40">
                    <item.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-xs uppercase tracking-widest font-medium mb-1.5 text-foreground">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: PRODUCT RECOMMENDATION PREVIEW ── */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-4">
              Sample Blueprint Results
            </p>
            <h2 className="text-4xl md:text-5xl font-thin tracking-[0.06em] uppercase mb-6 text-foreground">
              This Is What You Receive
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              Every Beauty Blueprint includes curated picks across all categories — tailored to your skin tone, undertone, budget, and lifestyle.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                category: "Foundation",
                brand: "NARS",
                product: "Soft Matte Complete Foundation",
                priceRange: "High-End · $49",
                reason: "Matched to warm neutral undertones with full coverage that lasts. Matte formula ideal for combination skin.",
                tip: "Apply with a damp beauty sponge for a skin-like finish.",
                badge: "Shade-Matched",
              },
              {
                category: "Blush",
                brand: "Milani",
                product: "Baked Blush in Luminoso",
                priceRange: "Drugstore · $11.99",
                reason: "The peachy-golden tone complements warm olive and tan skin tones without reading orange.",
                tip: "Smile and sweep upward toward the temples for a natural flush.",
                badge: "Budget Pick",
              },
              {
                category: "Setting Powder",
                brand: "Laura Mercier",
                product: "Translucent Loose Setting Powder",
                priceRange: "High-End · $44",
                reason: "Weightless translucent formula that locks in foundation for 12+ hours. Works on all skin tones.",
                tip: "Use the baking technique under eyes to brighten and set concealer.",
                badge: "Expert Favorite",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
              >
                <Card className="rounded-3xl border border-border/50 bg-white shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden h-full flex flex-col">
                  <div className="bg-background px-8 pt-8 pb-6 flex flex-col items-start">
                    <div className="flex items-center justify-between w-full mb-4">
                      <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-primary">
                        {item.category}
                      </span>
                      <span className="text-[9px] bg-primary/10 text-primary rounded-full px-3 py-1 uppercase tracking-widest font-semibold">
                        {item.badge}
                      </span>
                    </div>
                    <div className="w-full h-32 rounded-2xl bg-white border border-border/40 flex items-center justify-center mb-4">
                      <Sparkles className="w-10 h-10 text-border/50" strokeWidth={1} />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground mb-1">
                      {item.brand}
                    </p>
                    <h3 className="text-sm font-light text-foreground leading-snug mb-1">
                      {item.product}
                    </h3>
                    <p className="text-xs text-primary font-medium tracking-wide">{item.priceRange}</p>
                  </div>
                  <CardContent className="px-8 pb-8 flex-1 flex flex-col justify-between">
                    <div className="space-y-4 mt-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold flex items-center gap-1 mb-1.5">
                          <CheckCircle2 className="w-3 h-3 text-primary" /> Why it works for you
                        </p>
                        <p className="text-xs text-foreground/75 font-light leading-relaxed">{item.reason}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold flex items-center gap-1 mb-1.5">
                          <Sparkles className="w-3 h-3 text-primary" /> Concierge Tip
                        </p>
                        <p className="text-xs text-foreground/75 font-light leading-relaxed italic">"{item.tip}"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-8 text-center">
            <p className="text-xs text-muted-foreground font-light mb-6">
              Products shown are examples only. Actual recommendations are tailored to your unique profile.
              Simply LaRae is independent and retailer-agnostic — recommendations are fit-first, not sponsored.
            </p>
            <Button
              asChild
              className="rounded-full px-8 py-6 tracking-widest uppercase text-sm bg-primary hover:bg-primary/90 text-white"
            >
              <Link href="/services">Get Your Blueprint</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── PERSONALIZED BEAUTY SUPPORT ── */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.15, duration: 0.65 }}
              className="order-2 lg:order-1"
            >
              <div className="relative rounded-3xl overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}images/about-editorial.png`}
                  alt="Personalized beauty"
                  className="w-full h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-6">
                  <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-1">
                    Client Result
                  </p>
                  <p className="text-sm text-foreground font-light leading-relaxed">
                    "I finally found the exact foundation shade that matches my
                    undertone. Simply LaRae changed how I shop for makeup."
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 font-light">
                    — Concierge Beauty Plan client
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="order-1 lg:order-2">
              <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-4">
                Personalized Support
              </p>
              <h2 className="text-4xl md:text-5xl font-thin tracking-[0.06em] uppercase mb-8 text-foreground leading-tight">
                Beauty Guidance
                <br />
                Built Around
                <br />
                Your Face
              </h2>
              <div className="space-y-6 mb-10">
                {[
                  {
                    title: "Less Overwhelm",
                    desc: "No more sifting through hundreds of products. Get exactly what works for your features.",
                  },
                  {
                    title: "More Confidence",
                    desc: "Walk into any beauty counter — or shop online — knowing exactly what to look for.",
                  },
                  {
                    title: "Real Savings",
                    desc: "Stop buying products that don't work. Invest in what's right for you from the start.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm uppercase tracking-wider font-medium mb-1 text-foreground">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                asChild
                className="rounded-full px-8 py-6 tracking-widest uppercase text-sm bg-primary hover:bg-primary/90 text-white"
                data-testid="button-get-started-support"
              >
                <Link href="/services">Get Your Blueprint</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: BRAND PARTNERSHIP CREDIBILITY ── */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-primary/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-4">
                For Brands & Partners
              </p>
              <h2 className="text-4xl md:text-5xl font-thin tracking-[0.06em] uppercase mb-8 text-foreground leading-tight">
                Work With
                <br />
                Simply LaRae
              </h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-6">
                Simply LaRae is an independent beauty advisory platform. We don't accept sponsored placements or pay-to-play recommendations — ever. Our clients trust us because we put their face first.
              </p>
              <p className="text-muted-foreground font-light leading-relaxed mb-10">
                That said, we're open to authentic co-creation with brands that align with our values: quality, inclusivity, and real results across all skin tones and budgets. If your brand is genuinely remarkable, we'd love to learn more.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  { label: "Educational partnerships", desc: "Co-create application guides and shade education content" },
                  { label: "Product sampling programs", desc: "Get products into the hands of clients perfectly matched for them" },
                  { label: "Advisory collaborations", desc: "Work with Simply LaRae experts on product development and shade expansion" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs uppercase tracking-widest font-medium text-foreground mb-0.5">{item.label}</p>
                      <p className="text-xs text-muted-foreground font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                asChild
                variant="outline"
                className="rounded-full px-8 py-6 tracking-widest uppercase text-sm border-foreground/30 text-foreground hover:bg-foreground/5 transition-all"
                data-testid="button-brand-inquiry"
              >
                <Link href="/contact">Inquire About Partnership</Link>
              </Button>
              <p className="text-xs text-muted-foreground mt-4 font-light">
                We review all partnership inquiries independently. Responses within 5–7 business days.
              </p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.2, duration: 0.65 }} className="grid grid-cols-2 gap-4">
              {[
                { num: "4", label: "Service Tiers", sub: "From Blueprint to VIP" },
                { num: "100%", label: "Independent", sub: "No pay-to-play ever" },
                { num: "24–48h", label: "Turnaround", sub: "Blueprint delivery time" },
                { num: "Fit-First", label: "Rec Logic", sub: "Face-data drives results" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-background rounded-3xl p-8 border border-border/40 hover:border-primary/20 hover:shadow-lg transition-all duration-400 text-center"
                >
                  <p className="text-3xl md:text-4xl font-thin text-foreground mb-2 tracking-tight">{stat.num}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-foreground mb-1">{stat.label}</p>
                  <p className="text-[10px] text-muted-foreground font-light">{stat.sub}</p>
                </div>
              ))}
              <div className="col-span-2 bg-primary/5 rounded-3xl p-6 border border-primary/10 text-center">
                <Shield className="w-6 h-6 text-primary mx-auto mb-3" strokeWidth={1.5} />
                <p className="text-xs font-medium text-foreground mb-1 tracking-wide">Our Independence Promise</p>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  Simply LaRae is not affiliated with, endorsed by, or partnered with any retailer or brand unless explicitly and transparently stated.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ PREVIEW ── */}
      {previewFaqs.length > 0 && (
        <section className="py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp} className="text-center mb-16">
              <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-4">
                Questions
              </p>
              <h2 className="text-4xl md:text-5xl font-thin tracking-[0.06em] uppercase text-foreground">
                Common Questions
              </h2>
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
              <Accordion type="single" collapsible className="space-y-3">
                {previewFaqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={`faq-${faq.id}`}
                    className="bg-background rounded-2xl border border-border/40 px-6 py-1 hover:border-primary/20 transition-colors data-[state=open]:border-primary/30"
                    data-testid={`faq-item-${faq.id}`}
                  >
                    <AccordionTrigger className="text-sm font-medium tracking-wide text-foreground hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground font-light leading-relaxed pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            <motion.div {...fadeUp} className="text-center mt-10">
              <Link
                href="/faq"
                className="inline-flex items-center text-sm uppercase tracking-widest font-medium text-primary hover:text-foreground transition-colors"
                data-testid="link-view-all-faqs"
              >
                View All Questions <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── FINAL CTA ── */}
      <section className="py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/30 pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-primary/8 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-secondary/30 pointer-events-none" />

        <motion.div
          {...fadeUp}
          className="max-w-3xl mx-auto px-4 relative z-10 text-center"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-6">
            Begin Your Journey
          </p>
          <h2 className="text-4xl md:text-6xl font-thin tracking-[0.06em] uppercase mb-8 text-foreground leading-tight">
            Your Signature
            <br />
            Beauty Awaits
          </h2>
          <p className="text-lg text-muted-foreground font-light mb-14 max-w-xl mx-auto leading-relaxed">
            Join the women who have simplified their mornings and elevated their
            natural beauty with Simply LaRae.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full px-12 py-8 text-sm tracking-widest uppercase bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/25 transition-all hover:-translate-y-1"
            data-testid="button-final-cta"
          >
            <Link href="/services">Get Your Beauty Blueprint</Link>
          </Button>
          <p className="text-xs text-muted-foreground mt-6 font-light tracking-wide">
            Results delivered in 24–48 hours · Secure & Private
          </p>
        </motion.div>
      </section>
    </div>
  );
}
