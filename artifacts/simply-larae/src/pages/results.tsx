import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { useGetSubmission, useGetRecommendations, useAddToCart } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Sparkles, CheckCircle2, ShoppingBag } from "lucide-react";
import { getSessionId } from "@/lib/session";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function Results() {
  const [, params] = useRoute("/results/:id");
  const submissionId = parseInt(params?.id || "0", 10);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: submission, isLoading: subLoading } = useGetSubmission(submissionId);
  const { data: recommendations, isLoading: recLoading } = useGetRecommendations(submissionId);
  const addToCart = useAddToCart();

  const isLoading = subLoading || recLoading;

  const handleAddToCart = (productId: number) => {
    addToCart.mutate({
      data: {
        sessionId: getSessionId(),
        productId,
        quantity: 1
      }
    }, {
      onSuccess: () => {
        toast({ title: "Added to Cart", description: "Item added to your beauty routine." });
        queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-background px-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-8" strokeWidth={1} />
        <h2 className="text-2xl font-light tracking-[0.2em] uppercase text-foreground mb-4">Analyzing Profile</h2>
        <p className="text-muted-foreground font-light text-center max-w-md">
          Our concierges are reviewing your facial structure and skin data to formulate your bespoke routine.
        </p>
      </div>
    );
  }

  if (!submission || (recommendations && recommendations.length === 0)) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-background px-4">
        <Sparkles className="w-16 h-16 text-primary mb-8" strokeWidth={1} />
        <h2 className="text-3xl font-light tracking-[0.1em] uppercase text-foreground mb-4 text-center">Profile Received</h2>
        <p className="text-muted-foreground font-light text-center max-w-lg leading-relaxed mb-8">
          Thank you, {submission?.intakeData.fullName || "gorgeous"}. Your profile is currently under review by our experts. You will receive an email once your personalized blueprint is ready.
        </p>
      </div>
    );
  }

  const sortedRecs = [...(recommendations || [])].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="w-full bg-background pb-32">
      {/* Header */}
      <section className="pt-24 pb-16 px-4 bg-white border-b border-border/50 text-center">
        <h1 className="text-4xl md:text-5xl font-thin tracking-[0.15em] uppercase mb-6 text-foreground">
          Your Beauty Blueprint
        </h1>
        <p className="text-lg text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
          Curated specifically for your {submission.intakeData.skinTone} skin tone and {submission.intakeData.undertone} undertones.
        </p>
      </section>

      {/* Recommendations */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="space-y-12">
          {sortedRecs.map((rec, i) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <Card className="overflow-hidden rounded-3xl border border-border/50 shadow-sm hover:shadow-xl transition-all duration-500 bg-white">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3 bg-background flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-border/50">
                    <span className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-4">{rec.category}</span>
                    <div className="w-48 h-48 rounded-2xl bg-white shadow-sm border border-border flex items-center justify-center overflow-hidden mb-6">
                      {rec.product.imageUrl ? (
                        <img src={rec.product.imageUrl} alt={rec.product.name} className="w-full h-full object-cover" />
                      ) : (
                        <Sparkles className="w-12 h-12 text-border" strokeWidth={1} />
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold tracking-widest uppercase text-foreground mb-1">{rec.product.brand}</p>
                      <p className="text-lg font-light text-foreground">${rec.product.price}</p>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-2xl font-light tracking-wide mb-4 text-foreground">{rec.product.name}</h3>
                    
                    <div className="space-y-6 mb-8 flex-1">
                      <div>
                        <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2 flex items-center">
                          <CheckCircle2 className="w-3 h-3 mr-2 text-primary" /> Why it works for you
                        </h4>
                        <p className="text-foreground/80 font-light leading-relaxed text-sm">
                          {rec.reason}
                        </p>
                      </div>
                      
                      {rec.applicationTip && (
                        <div>
                          <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2 flex items-center">
                            <Sparkles className="w-3 h-3 mr-2 text-primary" /> Concierge Tip
                          </h4>
                          <p className="text-foreground/80 font-light leading-relaxed text-sm italic">
                            "{rec.applicationTip}"
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border/50">
                      <Button 
                        onClick={() => handleAddToCart(rec.product.id)}
                        disabled={addToCart.isPending}
                        className="flex-1 rounded-full uppercase tracking-widest text-xs h-12 bg-primary hover:bg-primary/90 text-white shadow-lg"
                      >
                        {addToCart.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ShoppingBag className="w-4 h-4 mr-2" /> Add to Routine</>}
                      </Button>
                      {rec.product.purchaseUrl && (
                        <Button variant="outline" asChild className="flex-1 rounded-full uppercase tracking-widest text-xs h-12 border-border text-foreground hover:bg-background">
                          <a href={rec.product.purchaseUrl} target="_blank" rel="noreferrer">Shop Retailer</a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
