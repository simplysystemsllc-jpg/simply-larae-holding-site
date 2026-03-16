import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useGetSubmission, useGetRecommendations } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductCard } from "@/components/ui/ProductCard";
import {
  Loader2,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ShoppingBag,
  BookOpen,
  Calendar,
  Star,
  Brush,
  Zap,
  Heart,
} from "lucide-react";
import { brandVoice } from "@/lib/brand";

const SectionTitle = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div className="mb-8">
    <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-semibold mb-2">{eyebrow}</p>
    <h2 className="text-2xl md:text-3xl font-light tracking-wide uppercase text-foreground">{title}</h2>
    <div className="mt-4 w-16 h-px bg-primary/40" />
  </div>
);

const ProfilePill = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-background rounded-xl p-4 border border-border/40">
    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">{label}</p>
    <p className="text-sm font-medium text-foreground">{value}</p>
  </div>
);

const RoutineStep = ({ step, label, desc }: { step: string; label: string; desc: string }) => (
  <div className="flex gap-4 items-start">
    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
      <span className="text-[10px] text-primary font-bold">{step}</span>
    </div>
    <div>
      <p className="text-xs uppercase tracking-widest font-semibold text-foreground mb-1">{label}</p>
      <p className="text-sm text-muted-foreground font-light">{desc}</p>
    </div>
  </div>
);

export default function Blueprint() {
  const [, params] = useRoute("/blueprint/:id");
  const submissionId = parseInt(params?.id || "0", 10);

  const { data: submission, isLoading: subLoading } = useGetSubmission(submissionId);
  const { data: recommendations, isLoading: recLoading } = useGetRecommendations(submissionId);

  const isLoading = subLoading || recLoading;

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-background px-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-8" strokeWidth={1} />
        <h2 className="text-2xl font-light tracking-[0.15em] uppercase text-foreground mb-4">
          Preparing Your Blueprint
        </h2>
        <p className="text-muted-foreground font-light text-center max-w-md">
          We're assembling your personalized beauty dossier. This won't take long.
        </p>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-background px-4">
        <BookOpen className="w-16 h-16 text-primary mb-8" strokeWidth={1} />
        <h2 className="text-3xl font-light tracking-[0.1em] uppercase text-foreground mb-4 text-center">
          Blueprint Not Found
        </h2>
        <p className="text-muted-foreground font-light text-center max-w-md mb-8">
          We couldn't locate this beauty blueprint. Please check your link or start a new profile.
        </p>
        <Button asChild className="rounded-full px-8 py-6 text-xs uppercase tracking-widest bg-primary hover:bg-primary/90 text-white">
          <Link href="/services">Start New Profile</Link>
        </Button>
      </div>
    );
  }

  const intake = submission.intakeData as any;
  const name = intake?.fullName?.split(" ")[0] || "Guest";
  const skinTone = intake?.skinTone || "your skin tone";
  const undertone = intake?.undertone || "your undertones";
  const skinType = intake?.skinType || "your skin type";
  const experience = intake?.makeupExperience || "Intermediate";
  const budget = intake?.budgetPreference || "Mid-range";
  const style = intake?.makeupStyle || "No-Makeup Makeup";
  const sortedRecs = [...(recommendations || [])].sort((a, b) => a.sortOrder - b.sortOrder);

  const byCategory = sortedRecs.reduce((acc, rec) => {
    const cat = rec.category || "General";
    acc[cat] = acc[cat] || [];
    acc[cat].push(rec);
    return acc;
  }, {} as Record<string, typeof sortedRecs>);

  const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <div className="w-full bg-background pb-24">
      {/* COVER */}
      <section className="relative bg-white border-b border-border/40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/20 pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/8 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-28 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs tracking-[0.35em] uppercase text-primary font-medium mb-6">
              Simply LaRae · Simply Integrated, LLC
            </p>
            <h1 className="text-4xl md:text-6xl font-thin tracking-[0.08em] uppercase text-foreground mb-6 leading-tight">
              Your Personalized<br />Beauty Blueprint
            </h1>
            <p className="text-lg text-muted-foreground font-light mb-4">
              Tailored for <span className="text-foreground font-medium">{intake?.fullName || "You"}</span>
            </p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-light mb-12">
              Generated {today}
            </p>
            <p className="text-sm text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed italic">
              "Tailored recommendations based on your beauty profile, preferences, and analysis"
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* WELCOME NOTE */}
        <section className="py-16 border-b border-border/40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle eyebrow="Welcome" title="A Note from Your Concierge" />
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-border/40 shadow-sm">
              <p className="text-base text-foreground/80 font-light leading-relaxed mb-4">
                Dear {name},
              </p>
              <p className="text-sm text-foreground/70 font-light leading-relaxed mb-4">
                Your personalized Beauty Blueprint has been curated with care, based on the information you shared
                with us during your profile session. Our goal is simple: to cut through the overwhelm of the beauty
                aisle and give you clarity — exact products, shades, and routines that were selected specifically for your features, your skin, and your lifestyle.
              </p>
              <p className="text-sm text-foreground/70 font-light leading-relaxed mb-4">
                Every recommendation in this blueprint was chosen to complement your <strong className="font-medium text-foreground">{skinTone} skin tone</strong> with <strong className="font-medium text-foreground">{undertone}</strong> undertones, keeping your goals, budget, and preferences at the center.
              </p>
              <p className="text-sm text-foreground/70 font-light leading-relaxed">
                We hope this blueprint becomes your beauty confidence — a reference you return to, season after season.
              </p>
              <div className="mt-8 pt-6 border-t border-border/40">
                <p className="text-xs uppercase tracking-widest font-medium text-foreground">
                  Simply LaRae Concierge Team
                </p>
                <p className="text-xs text-muted-foreground font-light mt-1">Simply Integrated, LLC</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* BEAUTY PROFILE SUMMARY */}
        <section className="py-16 border-b border-border/40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle eyebrow="Profile" title="Your Beauty Profile" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <ProfilePill label="Skin Tone" value={skinTone} />
              <ProfilePill label="Undertone" value={undertone} />
              <ProfilePill label="Skin Type" value={skinType} />
              <ProfilePill label="Experience Level" value={experience} />
              <ProfilePill label="Budget" value={budget} />
              <ProfilePill label="Preferred Look" value={style} />
              {intake?.hairColor && <ProfilePill label="Hair Color" value={intake.hairColor} />}
              {intake?.eyeColor && <ProfilePill label="Eye Color" value={intake.eyeColor} />}
              {intake?.budgetPreference && <ProfilePill label="Drugstore or High-End" value={intake.budgetPreference} />}
            </div>
            {intake?.biggestFrustration && (
              <div className="mt-6 bg-white rounded-2xl p-6 border border-border/40">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">Primary Concern</p>
                <p className="text-sm text-foreground/80 font-light leading-relaxed">{intake.biggestFrustration}</p>
              </div>
            )}
            {intake?.everydayGoals && (
              <div className="mt-4 bg-white rounded-2xl p-6 border border-border/40">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">Your Goals</p>
                <p className="text-sm text-foreground/80 font-light leading-relaxed">{intake.everydayGoals}</p>
              </div>
            )}
          </motion.div>
        </section>

        {/* MAKEUP DIRECTION */}
        <section className="py-16 border-b border-border/40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle eyebrow="Direction" title="Your Makeup Direction" />
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-border/40 shadow-sm space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-widest font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" strokeWidth={1.5} /> What Works For Your Skin
                </h3>
                <p className="text-sm text-foreground/75 font-light leading-relaxed">
                  With your {skinTone} skin and {undertone} undertones, you'll look most luminous in products formulated for balance and harmony. Your undertone influences everything — from foundation to blush to lip — and we've taken that as our guiding principle throughout this blueprint.
                </p>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Brush className="w-4 h-4 text-primary" strokeWidth={1.5} /> Recommended Finish & Coverage
                </h3>
                <p className="text-sm text-foreground/75 font-light leading-relaxed">
                  Based on your preferences and skin type, your ideal foundation should offer a finish that enhances your natural texture without feeling heavy. We've selected products that balance the needs of {skinType} skin with your desired coverage and aesthetic.
                </p>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" strokeWidth={1.5} /> Routine Complexity
                </h3>
                <p className="text-sm text-foreground/75 font-light leading-relaxed">
                  For your comfort level ({experience}), we've included both a streamlined everyday routine and a more polished option for when the occasion calls for it. You'll find both options at the end of this blueprint.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* PRODUCT RECOMMENDATIONS BY CATEGORY */}
        {sortedRecs.length > 0 && (
          <section className="py-16 border-b border-border/40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle eyebrow="Recommendations" title="Your Curated Products" />
              <div className="space-y-8">
                {Object.entries(byCategory).map(([category, recs]) => (
                  <div key={category}>
                    <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-primary mb-4 flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" /> {category}
                    </h3>
                    <div className="space-y-5">
                      {recs.map((rec) => (
                        <ProductCard
                          key={rec.id}
                          brand={rec.product.brand}
                          name={rec.product.name}
                          category={category}
                          price={rec.product.price}
                          imageUrl={rec.product.imageUrl ?? undefined}
                          purchaseUrl={rec.product.purchaseUrl ?? undefined}
                          reason={rec.reason}
                          applicationTip={rec.applicationTip ?? undefined}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* APPLICATION GUIDE */}
        <section className="py-16 border-b border-border/40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle eyebrow="Technique" title="Application Guide" />
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-border/40 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: "🫧",
                    method: "Sponge / Beautyblender",
                    desc: "Best for buildable, skin-like coverage. Dampen your sponge, pat — never rub — foundation into skin for a seamless, airbrushed finish. Ideal for medium coverage goals.",
                    best: "Natural, dewy, skin-like finish"
                  },
                  {
                    icon: "🖌️",
                    method: "Foundation Brush",
                    desc: "Buffing brushes allow precise, full-coverage application. Use circular buffing motions for even distribution. Best for those who want more control and a polished result.",
                    best: "Full coverage, polished look"
                  },
                  {
                    icon: "🤲",
                    method: "Fingers",
                    desc: "The warmth of your fingertips melts product into skin for the most natural, blurred effect. Great for skin tints, BB creams, or when you need a quick application.",
                    best: "Skin tints, quick routine"
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-background rounded-2xl p-6 border border-border/40">
                    <div className="text-2xl mb-4">{item.icon}</div>
                    <h4 className="text-xs uppercase tracking-widest font-semibold text-foreground mb-3">{item.method}</h4>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed mb-3">{item.desc}</p>
                    <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">Best for: {item.best}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* QUICK vs FULL ROUTINE */}
        <section className="py-16 border-b border-border/40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle eyebrow="Routine" title="Your Makeup Routines" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="rounded-3xl border border-border/40 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-sm uppercase tracking-widest font-medium text-foreground">Quick Routine</h3>
                    <p className="text-xs text-muted-foreground font-light">5–10 minutes</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <RoutineStep step="1" label="Moisturize + Primer" desc="Apply a lightweight moisturizer and let it absorb. Follow with a primer suited to your skin type." />
                  <RoutineStep step="2" label="Concealer / Skin Tint" desc="Spot-conceal where needed, or apply a light skin tint for a quick even-out." />
                  <RoutineStep step="3" label="Blush" desc="Cream blush swept onto the apples of your cheeks gives instant life to your complexion." />
                  <RoutineStep step="4" label="Mascara" desc="One to two coats to brighten and open your eyes." />
                  <RoutineStep step="5" label="Lip Balm or Tinted Lip" desc="A hydrating tinted lip completes the look effortlessly." />
                </div>
              </Card>

              <Card className="rounded-3xl border border-primary/20 bg-white p-8 shadow-md">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-sm uppercase tracking-widest font-medium text-foreground">Full Routine</h3>
                    <p className="text-xs text-muted-foreground font-light">20–35 minutes</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <RoutineStep step="1" label="Primer" desc="Apply a primer matched to your skin type (water-based for oily/combination, silicone-based for dry/normal)." />
                  <RoutineStep step="2" label="Foundation" desc="Apply your recommended foundation using your preferred method — sponge, brush, or fingers." />
                  <RoutineStep step="3" label="Concealer" desc="Conceal under-eyes and any spots. Blend gently into your foundation base." />
                  <RoutineStep step="4" label="Setting Powder" desc="Set the under-eye and T-zone with a translucent or tinted setting powder." />
                  <RoutineStep step="5" label="Contour & Blush" desc="Sculpt with bronzer or contour. Add blush to the cheekbones for dimension." />
                  <RoutineStep step="6" label="Highlight" desc="Apply a subtle highlight to the tops of cheekbones, brow bone, and cupid's bow." />
                  <RoutineStep step="7" label="Eyes" desc="Apply eyeshadow, liner, and mascara to complete the look." />
                  <RoutineStep step="8" label="Lip" desc="Apply your recommended lip product — liner, lipstick, or gloss." />
                  <RoutineStep step="9" label="Setting Spray" desc="Lock everything in with a setting spray matched to your desired finish." />
                </div>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* SHOPPING LIST */}
        {sortedRecs.length > 0 && (
          <section className="py-16 border-b border-border/40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle eyebrow="Shopping List" title="Your Beauty Cart Summary" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sortedRecs.map((rec) => (
                  <ProductCard
                    key={rec.id}
                    brand={rec.product.brand}
                    name={rec.product.name}
                    price={rec.product.price}
                    imageUrl={rec.product.imageUrl ?? undefined}
                    purchaseUrl={rec.product.purchaseUrl ?? undefined}
                    compact
                  />
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* EXPERT NOTES */}
        <section className="py-16 border-b border-border/40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle eyebrow="Concierge Tips" title="Expert Notes for You" />
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-border/40 shadow-sm space-y-5">
              {intake?.sensitivities && (
                <div className="flex gap-4 items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs uppercase tracking-widest font-semibold text-foreground mb-1">Sensitivity Note</p>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      Based on your noted sensitivities ({intake.sensitivities}), we've selected products that are generally considered safer for reactive skin. Always perform a patch test before full application.
                    </p>
                  </div>
                </div>
              )}
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-widest font-semibold text-foreground mb-1">Primer Compatibility</p>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    {skinType === "Oily" || skinType === "Combination"
                      ? "For oily/combination skin, opt for a water-based or mattifying primer under water-based foundations to extend wear and reduce shine."
                      : "For your skin type, a silicone-based or hydrating primer works well to create a smooth canvas and add longevity to your routine."}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-widest font-semibold text-foreground mb-1">Shade Matching Tips</p>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    When testing foundation shades in-store, apply to your jawline (not your hand) in natural light. The right shade disappears into skin. Your {undertone} undertone means you'll look best in shades with matching warm/cool/neutral base tones.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Heart className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-widest font-semibold text-foreground mb-1">Final Reminder</p>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    Beauty is personal. These recommendations are your starting point. Trust your instincts, and don't be afraid to experiment within the palette of what suits you. We're here whenever you need a seasonal refresh or additional guidance.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* DISCLAIMER */}
        <section className="py-12 border-b border-border/40">
          <div className="bg-background rounded-2xl p-6 border border-border/40">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-3">
              Disclaimer & Important Notes
            </p>
            <div className="space-y-2">
              {[
                brandVoice.disclaimer.blueprintNote,
                brandVoice.disclaimer.recommendations,
                brandVoice.disclaimer.independence,
                brandVoice.disclaimer.pricing,
                brandVoice.disclaimer.results,
              ].map((note, i) => (
                <p key={i} className="text-xs text-muted-foreground font-light leading-relaxed">{note}</p>
              ))}
            </div>
          </div>
        </section>

        {/* NEXT STEPS CTA */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-10 md:p-14 border border-border/40 shadow-sm text-center"
          >
            <SectionTitle eyebrow="What's Next" title="Continue Your Journey" />
            <p className="text-sm text-muted-foreground font-light mb-10 max-w-lg mx-auto leading-relaxed">
              Your blueprint is just the beginning. Deepen your results with a personal consultation, seasonal refresh, or full VIP concierge service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="rounded-full px-8 py-6 text-xs uppercase tracking-widest bg-primary hover:bg-primary/90 text-white shadow-lg">
                <Link href="/contact">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book a Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-8 py-6 text-xs uppercase tracking-widest border-border text-foreground hover:bg-background">
                <Link href="/services">
                  <Star className="w-4 h-4 mr-2" />
                  Upgrade to VIP
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-8 py-6 text-xs uppercase tracking-widest border-border text-foreground hover:bg-background">
                <Link href="/cart">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  View Beauty Cart
                </Link>
              </Button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
