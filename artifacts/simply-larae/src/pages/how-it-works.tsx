import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Upload, Sparkles, ShoppingBag, Heart } from "lucide-react";
import { SEO } from "@/components/seo/SEO";

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Tell Us About You",
      desc: "Complete our detailed questionnaire about your skin type, routine preferences, and budget, then upload a makeup-free selfie in natural light."
    },
    {
      icon: Sparkles,
      title: "Expert Analysis",
      desc: "Our beauty concierges analyze your facial structure, undertones, and skin concerns to curate the perfect product selection."
    },
    {
      icon: Heart,
      title: "Your Blueprint",
      desc: "Receive a beautifully formatted digital blueprint featuring exact product recommendations, shade matches, and application techniques."
    },
    {
      icon: ShoppingBag,
      title: "Shop Your Look",
      desc: "Add your recommended products directly to your cart or purchase them at your preferred retailer with complete confidence."
    }
  ];

  return (
    <div className="w-full bg-white pb-32">
      <SEO
        title="How It Works — AI Facial Analysis to Personalized Beauty Blueprint"
        description="Four steps from selfie to personalized beauty routine. Simply LaRae analyzes your facial structure, undertones, and features to deliver exact shade matches and curated product picks — no guesswork."
        keywords="how facial analysis works, beauty blueprint process, AI makeup recommendations explained, personalized beauty steps, shade matching process, beauty concierge how to, makeup routine customization process"
        canonical="/how-it-works"
      />
      <section className="pt-24 pb-16 px-4 text-center bg-background border-b border-border/50">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-thin tracking-[0.15em] uppercase mb-6 text-foreground">
            The Process
          </h1>
          <p className="text-lg text-muted-foreground font-light tracking-wide">
            Four simple steps to your personalized beauty routine.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="relative">
          {/* Vertical line connecting steps */}
          <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-px bg-border/60 md:-translate-x-1/2" />

          <div className="space-y-24 relative">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col md:flex-row items-start ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Number indicator */}
                <div className="absolute left-0 md:left-1/2 w-20 h-20 bg-white border border-border rounded-full flex items-center justify-center md:-translate-x-1/2 shadow-lg z-10">
                  <step.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className={`w-full md:w-1/2 pl-28 md:pl-0 ${i % 2 !== 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                  <div className="pt-4">
                    <h3 className="text-xs text-primary font-bold tracking-[0.2em] uppercase mb-2">Step {i + 1}</h3>
                    <h2 className="text-2xl md:text-3xl font-light tracking-widest uppercase mb-4 text-foreground">{step.title}</h2>
                    <p className="text-muted-foreground font-light leading-relaxed text-lg">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 sm:mt-24 text-center">
          <Button asChild size="lg" className="rounded-full px-12 py-8 text-sm tracking-widest uppercase bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all hover:-translate-y-1">
            <Link href="/services">Start Your Journey</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
