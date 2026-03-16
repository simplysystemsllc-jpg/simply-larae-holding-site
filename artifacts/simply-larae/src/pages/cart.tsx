import { Link } from "wouter";
import { motion } from "framer-motion";
import { useGetCart, useRemoveFromCart } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import { getSessionId } from "@/lib/session";
import { useQueryClient } from "@tanstack/react-query";

export default function Cart() {
  const queryClient = useQueryClient();
  const { data: cart, isLoading } = useGetCart({ sessionId: getSessionId() });
  const remove = useRemoveFromCart();

  const handleRemove = (id: number) => {
    remove.mutate({ id }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const isEmpty = !cart || cart.items.length === 0;

  return (
    <div className="w-full min-h-screen bg-background pb-32">
      <section className="pt-24 pb-12 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-thin tracking-[0.15em] uppercase mb-4 text-foreground">
          Your Routine
        </h1>
        {!isEmpty && (
          <p className="text-muted-foreground font-light tracking-wide">
            {cart.totalItems} items carefully selected for your canvas.
          </p>
        )}
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {isEmpty ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-border shadow-sm">
            <ShoppingBag className="w-16 h-16 text-border mx-auto mb-6" strokeWidth={1} />
            <h2 className="text-2xl font-light tracking-wide uppercase mb-4 text-foreground">Your cart is empty</h2>
            <p className="text-muted-foreground font-light mb-8">Ready to discover your personalized blueprint?</p>
            <Button asChild className="rounded-full px-8 py-6 text-xs uppercase tracking-widest bg-primary hover:bg-primary/90 text-white">
              <Link href="/services">Start Questionnaire</Link>
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-border shadow-sm">
            <div className="space-y-6">
              {cart.items.map((item, i) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between py-6 border-b border-border/50 last:border-0"
                >
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-background rounded-xl flex items-center justify-center border border-border flex-shrink-0">
                      {item.product.imageUrl ? (
                        <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover rounded-xl" />
                      ) : (
                        <SparklesIcon className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-primary mb-1">{item.product.brand}</p>
                      <h3 className="text-base font-medium text-foreground mb-1">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground font-light">${item.product.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 pl-4">
                    <button 
                      onClick={() => handleRemove(item.id)}
                      disabled={remove.isPending}
                      className="text-muted-foreground hover:text-destructive transition-colors p-2"
                    >
                      <Trash2 className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 bg-background rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center border border-border">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">Estimated Total</p>
                <p className="text-3xl font-light text-foreground">${cart.estimatedTotal.toFixed(2)}</p>
              </div>
              <Button className="w-full md:w-auto rounded-full px-10 py-7 text-xs uppercase tracking-widest bg-foreground hover:bg-foreground/90 text-white shadow-xl shadow-foreground/10">
                Checkout <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

// Inline SparklesIcon to avoid extra import complexity if lucide fails
function SparklesIcon(props: any) {
  return <ShoppingBag {...props} />;
}
