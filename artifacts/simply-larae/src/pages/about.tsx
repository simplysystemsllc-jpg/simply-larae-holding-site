import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="w-full bg-white pb-32">
      <section className="pt-24 pb-16 px-4 bg-background border-b border-border/50 text-center">
        <h1 className="text-4xl md:text-6xl font-thin tracking-[0.15em] uppercase mb-6 text-foreground">
          Our Philosophy
        </h1>
        <p className="text-lg text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
          Beauty should never be one-size-fits-all.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-border">
              <img 
                src={`${import.meta.env.BASE_URL}images/about-editorial.png`} 
                alt="Editorial beauty" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2"
          >
            <h2 className="text-xs text-primary font-bold tracking-[0.2em] uppercase mb-4">The Vision</h2>
            <h3 className="text-3xl font-light tracking-wide leading-tight mb-8 text-foreground">
              Simply LaRae was born from the frustration of overflowing makeup bags and unfulfilled promises.
            </h3>
            
            <div className="space-y-6 text-muted-foreground font-light leading-relaxed">
              <p>
                Walking into a beauty retailer is overwhelming. Thousands of products, biased advice from commissioned sales reps, and lighting that lies to you.
              </p>
              <p>
                We believe that every woman deserves a concierge. Someone to analyze her unique facial canvas, understand her actual lifestyle, and curate a minimal, effective routine that highlights her natural elegance.
              </p>
              <p>
                We leverage facial analysis technology combined with expert makeup artist knowledge to deliver your bespoke Beauty Blueprint. No guesswork. No wasted money. Just beauty, simplified.
              </p>
            </div>
            
            <div className="mt-12 pt-8 border-t border-border">
              <p className="uppercase tracking-widest text-sm font-medium text-foreground">Simply Integrated, LLC</p>
              <p className="text-sm font-light text-muted-foreground mt-1">Parent Company</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
