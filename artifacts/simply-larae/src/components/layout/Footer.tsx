import { Link } from "wouter";
import { Instagram, Facebook, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl tracking-[0.2em] font-light text-foreground mb-4 block">
              Simply LaRae
            </Link>
            <p className="text-muted-foreground max-w-sm mb-4 font-light leading-relaxed text-sm">
              Personalized beauty powered by facial analysis. Your premium concierge for the perfect routine.
            </p>
            <p className="text-xs text-muted-foreground/70 font-light leading-relaxed max-w-sm mb-6">
              Simply LaRae is an independent beauty advisory platform and is not affiliated with, endorsed by, or partnered with any retailer or brand unless explicitly stated.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="mailto:hello@simplylarea.com" aria-label="Email" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-foreground mb-6">Explore</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors font-light">Services</Link></li>
              <li><Link href="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors font-light">How It Works</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors font-light">About Us</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors font-light">FAQ</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors font-light">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-foreground mb-6">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors font-light">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors font-light">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="text-muted-foreground hover:text-primary transition-colors font-light">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-xs text-muted-foreground tracking-wide">
              &copy; {new Date().getFullYear()} Simply Integrated, LLC. All rights reserved. · Simply LaRae
            </p>
            <p className="text-xs text-muted-foreground/60 font-light max-w-md text-right leading-relaxed">
              Simply LaRae provides beauty recommendations for informational and advisory purposes only.
              Product links direct to independent third-party retailers. Prices may vary.{" "}
              <Link href="/disclaimer" className="underline hover:text-muted-foreground transition-colors">Disclaimer</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
