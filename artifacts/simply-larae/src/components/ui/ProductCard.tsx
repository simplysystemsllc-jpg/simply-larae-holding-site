import { ExternalLink, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { brandVoice } from "@/lib/brand";

export interface ProductCardProps {
  brand: string;
  name: string;
  category?: string;
  recommendedShade?: string;
  price?: number | string;
  priceDisplay?: string;
  imageUrl?: string;
  retailerName?: string;
  purchaseUrl?: string;
  reason?: string;
  applicationTip?: string;
  onAddToCart?: () => void;
  isAddingToCart?: boolean;
  compact?: boolean;
}

export function ProductCard({
  brand,
  name,
  category,
  recommendedShade,
  price,
  priceDisplay,
  imageUrl,
  retailerName,
  purchaseUrl,
  reason,
  applicationTip,
  onAddToCart,
  isAddingToCart,
  compact = false,
}: ProductCardProps) {
  const displayPrice = priceDisplay ?? (price ? `$${typeof price === "number" ? price.toFixed(2) : price}` : null);

  if (compact) {
    return (
      <Card className="border-border/40 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 bg-white h-full flex flex-col">
        <div className="aspect-square bg-background flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <Sparkles className="w-10 h-10 text-border" strokeWidth={1} />
          )}
        </div>
        <CardContent className="p-4 flex flex-col flex-1">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-primary mb-1">{brand}</p>
          <h4 className="text-sm font-medium text-foreground mb-1 leading-snug">{name}</h4>
          {recommendedShade && (
            <p className="text-xs text-muted-foreground mb-2">Shade: {recommendedShade}</p>
          )}
          <div className="mt-auto pt-3">
            {displayPrice && (
              <p className="text-sm font-light text-foreground mb-2">{displayPrice}</p>
            )}
            <div className="flex gap-2">
              {onAddToCart && (
                <Button
                  size="sm"
                  onClick={onAddToCart}
                  disabled={isAddingToCart}
                  className="flex-1 rounded-full text-[10px] uppercase tracking-wider bg-primary hover:bg-primary/90 text-white py-4"
                >
                  <ShoppingBag className="w-3 h-3 mr-1" />
                  Cart
                </Button>
              )}
              {purchaseUrl && (
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="flex-1 rounded-full text-[10px] uppercase tracking-wider border-border"
                >
                  <a href={purchaseUrl} target="_blank" rel="noreferrer noopener">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Shop
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/40 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 bg-white">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-72 bg-background flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-border/40 flex-shrink-0">
          {category && (
            <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-semibold mb-4">{category}</span>
          )}
          <div className="w-44 h-44 rounded-2xl bg-white shadow-sm border border-border/40 flex items-center justify-center overflow-hidden mb-5">
            {imageUrl ? (
              <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
              <Sparkles className="w-10 h-10 text-border" strokeWidth={1} />
            )}
          </div>
          <p className="text-xs uppercase tracking-widest font-semibold text-foreground mb-1 text-center">{brand}</p>
          {displayPrice && (
            <p className="text-lg font-light text-foreground">{displayPrice}</p>
          )}
          {retailerName && (
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{retailerName}</p>
          )}
        </div>

        <CardContent className="p-8 md:p-10 flex flex-col justify-center flex-1">
          <h3 className="text-xl font-light tracking-wide mb-2 text-foreground">{name}</h3>
          {recommendedShade && (
            <p className="text-sm text-primary font-medium mb-4 tracking-wider uppercase">Recommended Shade: {recommendedShade}</p>
          )}

          <div className="space-y-5 mb-6 flex-1">
            {reason && (
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                  Why it works for you
                </h4>
                <p className="text-sm text-foreground/80 font-light leading-relaxed">{reason}</p>
              </div>
            )}
            {applicationTip && (
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                  Concierge Tip
                </h4>
                <p className="text-sm text-foreground/80 font-light leading-relaxed italic">"{applicationTip}"</p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-border/40">
            {onAddToCart && (
              <Button
                onClick={onAddToCart}
                disabled={isAddingToCart}
                className="flex-1 rounded-full uppercase tracking-widest text-xs h-11 bg-primary hover:bg-primary/90 text-white shadow-md"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                {brandVoice.cta.cart}
              </Button>
            )}
            {purchaseUrl && (
              <Button
                variant="outline"
                asChild
                className="flex-1 rounded-full uppercase tracking-widest text-xs h-11 border-border text-foreground hover:bg-background"
              >
                <a href={purchaseUrl} target="_blank" rel="noreferrer noopener">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {brandVoice.cta.shop}
                </a>
              </Button>
            )}
          </div>

          <p className="text-[10px] text-muted-foreground mt-4 font-light leading-relaxed">
            {brandVoice.disclaimer.pricing}
          </p>
        </CardContent>
      </div>
    </Card>
  );
}
