import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  CheckCircle2,
  Shield,
  ScanFace,
  HeartHandshake,
  ShoppingBag,
  MapPin,
} from "lucide-react";

const PARTNERSHIP_MAILTO =
  "mailto:simplylarae.dba@gmail.com?subject=Simply%20LaRae%20Brand%20Partnership%20Inquiry&body=Hello%20Simply%20LaRae,%0A%0AOur%20brand%20is%20interested%20in%20exploring%20a%20partnership.";

const WAITLIST_MAILTO =
  "mailto:simplylarae.dba@gmail.com?subject=Simply%20LaRae%20Early%20Access%20Request&body=Hi%20Simply%20LaRae%20team,%0A%0AI%27d%20love%20to%20be%20added%20to%20the%20waitlist%20for%20early%20access.";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: "easeOut" },
};

const fadeUpDelay = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: "easeOut", delay },
});

export default function ComingSoonPage() {
  return (
    <div className="w-full min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
        {/* Soft ambient background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#EED4CF]/30 via-background to-background/80" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-[#EED4CF]/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#D9A9A3]/15 blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <p className="text-[10px] tracking-[0.45em] uppercase text-primary font-medium mb-10">
              Simply Integrated, LLC
            </p>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-thin tracking-[0.08em] text-foreground leading-none mb-6">
              Simply LaRae
            </h1>

            <p className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-foreground/50 font-light mb-10">
              Personalized Beauty Powered by Facial Analysis
            </p>

            <p className="text-base md:text-lg text-foreground/65 font-light leading-relaxed max-w-2xl mx-auto mb-6">
              Simply LaRae is a luxury beauty advisory platform designed to help women discover the right products, shades, and routines with confidence.
            </p>
            <p className="text-base md:text-lg text-foreground/65 font-light leading-relaxed max-w-2xl mx-auto mb-16">
              Our concierge-driven beauty experience combines personalized beauty guidance, future-facing facial analysis, and curated product recommendations tailored to each individual.
            </p>
          </motion.div>

          <motion.div {...fadeUpDelay(0.2)}>
            {/* Divider */}
            <div className="flex items-center justify-center gap-4 mb-10">
              <span className="h-px w-12 bg-primary/30" />
              <Sparkles className="w-4 h-4 text-primary" strokeWidth={1.5} />
              <span className="h-px w-12 bg-primary/30" />
            </div>

            <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-3">
              Launching Soon
            </p>
            <p className="text-sm text-muted-foreground font-light mb-10">
              For early access or brand partnership inquiries, contact our team.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-full px-10 py-7 text-sm tracking-widest uppercase bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all hover:-translate-y-0.5"
              >
                <a href={WAITLIST_MAILTO}>Join the Waitlist</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-10 py-7 text-sm tracking-widest uppercase border-foreground/20 text-foreground hover:bg-foreground/5 transition-all hover:-translate-y-0.5"
              >
                <a href={PARTNERSHIP_MAILTO}>Brand Partnerships</a>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.7 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="flex flex-col items-center gap-1 text-foreground/30">
            <span className="text-[9px] tracking-[0.25em] uppercase">Learn More</span>
            <div className="w-px h-8 bg-gradient-to-b from-foreground/20 to-transparent mt-1" />
          </div>
        </motion.div>
      </section>

      {/* ── PLATFORM OVERVIEW ── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-[10px] tracking-[0.35em] uppercase text-primary font-medium mb-4">
              The Platform
            </p>
            <h2 className="text-3xl md:text-4xl font-thin tracking-[0.08em] uppercase mb-6 text-foreground">
              Beauty Engineered for Every Face
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed text-sm">
              Three pillars differentiate Simply LaRae from every generic quiz or chatbot recommendation you've encountered before.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: ScanFace,
                title: "Facial Analysis",
                desc: "AI analyzes your facial structure, undertones, and features to build a data-backed beauty profile unique to you.",
                num: "01",
              },
              {
                icon: Sparkles,
                title: "Personalized Blueprint",
                desc: "Receive curated product recommendations and routines tailored to your specific features — from primer to setting spray.",
                num: "02",
              },
              {
                icon: HeartHandshake,
                title: "Concierge Guidance",
                desc: "Expert concierge review ensures every recommendation truly fits — the right shades, the right formulas, the right routine.",
                num: "03",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <div className="bg-background rounded-3xl p-8 border border-border/40 hover:border-primary/20 hover:shadow-lg transition-all duration-400 h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-border/40 flex items-center justify-center shadow-sm">
                      <feature.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <span className="text-4xl font-thin text-foreground/8 tracking-tight select-none">
                      {feature.num}
                    </span>
                  </div>
                  <h3 className="text-xs uppercase tracking-widest font-medium mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR BEAUTY BRANDS ── */}
      <section className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <div className="border border-border/50 rounded-3xl overflow-hidden bg-white shadow-sm">
              {/* Top stripe */}
              <div className="h-1 bg-gradient-to-r from-[#EED4CF] via-[#D9A9A3] to-[#8E6E67]" />

              <div className="p-10 md:p-14">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <p className="text-[10px] tracking-[0.35em] uppercase text-primary font-medium mb-4">
                      For Beauty Brands
                    </p>
                    <h2 className="text-3xl md:text-4xl font-thin tracking-[0.06em] uppercase mb-6 text-foreground leading-tight">
                      Partner With
                      <br />
                      Simply LaRae
                    </h2>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed mb-5">
                      Simply LaRae is building a personalized beauty recommendation platform designed to connect customers with products that fit their unique beauty profile, preferences, and routine goals.
                    </p>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8">
                      We are currently exploring early conversations with select beauty brands interested in thoughtful partnership opportunities, product consideration, and future recommendation visibility.
                    </p>

                    <div className="space-y-3 mb-10">
                      {[
                        "Personalized beauty recommendations",
                        "Customer-fit product matching",
                        "Premium beauty guidance experience",
                        "Future partnership opportunities",
                      ].map((point, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={1.5} />
                          <p className="text-sm text-foreground/80 font-light">{point}</p>
                        </div>
                      ))}
                    </div>

                    <Button
                      asChild
                      className="rounded-full px-8 py-6 tracking-widest uppercase text-sm bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/15 transition-all hover:-translate-y-0.5"
                    >
                      <a href={PARTNERSHIP_MAILTO}>Partnership Inquiry</a>
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {/* Credibility stats */}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { value: "4", label: "Service Tiers", sub: "From Blueprint to VIP" },
                        { value: "100%", label: "Independent", sub: "No pay-to-play, ever" },
                        { value: "24–48h", label: "Turnaround", sub: "Blueprint delivery" },
                        { value: "Fit-First", label: "Rec Logic", sub: "Face-data drives results" },
                      ].map((stat, i) => (
                        <div
                          key={i}
                          className="bg-background rounded-2xl p-5 border border-border/40 text-center"
                        >
                          <p className="text-2xl md:text-3xl font-thin text-foreground mb-1">{stat.value}</p>
                          <p className="text-[9px] uppercase tracking-[0.2em] font-semibold text-foreground mb-0.5">{stat.label}</p>
                          <p className="text-[10px] text-muted-foreground font-light">{stat.sub}</p>
                        </div>
                      ))}
                    </div>

                    {/* Independence assurance */}
                    <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
                      <div className="flex items-start gap-3">
                        <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                        <div>
                          <p className="text-[10px] uppercase tracking-widest font-semibold text-foreground mb-1">
                            Our Independence Commitment
                          </p>
                          <p className="text-xs text-muted-foreground font-light leading-relaxed">
                            Simply LaRae is an independent advisory platform. We do not accept sponsored placements or pay-to-play recommendations. Any partnership is disclosed transparently to our clients.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 bg-white border-t border-border/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center gap-8">
            <div>
              <p className="text-2xl font-thin tracking-[0.2em] text-foreground mb-2">Simply LaRae</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-medium">Simply Integrated, LLC</p>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
              <p className="text-xs font-light tracking-wide">Texas, United States of America</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                href={WAITLIST_MAILTO}
                className="text-[11px] uppercase tracking-widest font-medium text-primary hover:text-foreground transition-colors"
              >
                Join Waitlist
              </a>
              <span className="text-border/60 text-xs">·</span>
              <a
                href={PARTNERSHIP_MAILTO}
                className="text-[11px] uppercase tracking-widest font-medium text-primary hover:text-foreground transition-colors"
              >
                Brand Partnerships
              </a>
              <span className="text-border/60 text-xs">·</span>
              <a
                href="/privacy"
                className="text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors font-light"
              >
                Privacy Policy
              </a>
              <span className="text-border/60 text-xs">·</span>
              <a
                href="/terms"
                className="text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors font-light"
              >
                Terms
              </a>
              <span className="text-border/60 text-xs">·</span>
              <a
                href="/disclaimer"
                className="text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors font-light"
              >
                Disclaimer
              </a>
            </div>

            <div className="max-w-xl">
              <p className="text-[11px] text-muted-foreground/60 font-light leading-relaxed text-center">
                Simply LaRae is an independent beauty advisory platform and is not affiliated with, endorsed by, or partnered with any retailer or brand unless explicitly stated.
              </p>
              <p className="text-[10px] text-muted-foreground/40 font-light mt-3">
                © {new Date().getFullYear()} Simply Integrated, LLC · All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
