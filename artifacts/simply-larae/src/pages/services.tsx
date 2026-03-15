import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Star } from "lucide-react";
import { useListServices } from "@workspace/api-client-react";
import { SEO } from "@/components/seo/SEO";

export default function Services() {
  const { data: services, isLoading } = useListServices();
  const sortedServices = services ? [...services].sort((a, b) => a.sortOrder - b.sortOrder) : [];

  return (
    <div className="w-full bg-background min-h-screen pb-24">
      <SEO
        title="Beauty Concierge Services & Pricing"
        description="Choose your Simply LaRae service tier — from the $39 Beauty Blueprint to the $299 VIP Beauty Concierge. Every tier includes personalized shade matching and product recommendations tailored to your facial analysis."
        keywords="beauty blueprint, personalized makeup consultation, beauty concierge pricing, shade matching service, custom beauty plan cost, VIP beauty advisor, facial analysis makeup service"
        canonical="/services"
      />
      {/* Header */}
      <section className="pt-24 pb-16 px-4 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-thin tracking-[0.15em] uppercase mb-6 text-foreground">
            Curated Services
          </h1>
          <p className="text-lg text-muted-foreground font-light tracking-wide">
            Select the level of concierge guidance that aligns with your beauty goals.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-[600px] rounded-3xl bg-white/50 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sortedServices.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <Card className={`relative h-full flex flex-col overflow-hidden rounded-3xl border-2 ${service.isPopular ? 'border-primary shadow-2xl scale-105 z-10' : 'border-white shadow-lg'} transition-all hover:border-primary/50 bg-white`}>
                  {service.isPopular && (
                    <div className="absolute top-0 left-0 right-0 bg-primary text-white text-xs uppercase tracking-widest font-semibold text-center py-2 flex items-center justify-center gap-2">
                      <Star className="w-3 h-3 fill-current" /> Client Favorite <Star className="w-3 h-3 fill-current" />
                    </div>
                  )}
                  <CardContent className={`p-8 flex-1 flex flex-col ${service.isPopular ? 'pt-12' : ''}`}>
                    <h3 className="text-2xl uppercase tracking-widest font-light mb-3 text-foreground">{service.name}</h3>
                    <p className="text-sm text-muted-foreground font-light mb-6 h-10">{service.tagline}</p>
                    
                    <div className="mb-8 flex items-baseline border-b border-border pb-8">
                      <span className="text-4xl text-foreground font-medium">{service.priceDisplay}</span>
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-sm text-foreground/90 font-light mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      <ul className="space-y-4 mb-8">
                        {service.features.map((feature, j) => (
                          <li key={j} className="flex items-start text-sm text-foreground/80 font-light">
                            <CheckCircle2 className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                            <span className="leading-snug">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button asChild className={`w-full rounded-full tracking-widest uppercase py-6 ${service.isPopular ? 'bg-primary hover:bg-primary/90 text-white' : 'bg-background hover:bg-primary text-foreground hover:text-white border border-border'}`}>
                      <Link href={`/intake?serviceId=${service.id}`}>Begin Profile</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </section>
      
      {/* Guarantees */}
      <section className="mt-16 sm:mt-28 max-w-4xl mx-auto px-4 text-center">
         <h3 className="text-xs uppercase tracking-[0.2em] text-primary mb-8 font-semibold">The Simply LaRae Promise</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-muted-foreground font-light">
            <div>
              <p className="text-foreground uppercase tracking-wider mb-2">Unbiased Curation</p>
              <p>We are not sponsored by brands. Our recommendations are 100% based on what works for your face.</p>
            </div>
            <div>
              <p className="text-foreground uppercase tracking-wider mb-2">Data Privacy</p>
              <p>Your selfies and skin data are securely encrypted and only used for your personal analysis.</p>
            </div>
            <div>
              <p className="text-foreground uppercase tracking-wider mb-2">Ongoing Support</p>
              <p>Depending on your tier, our concierge team is here to refine your routine as your skin changes.</p>
            </div>
         </div>
      </section>
    </div>
  );
}
