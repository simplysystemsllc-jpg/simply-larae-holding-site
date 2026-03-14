import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useGetCart } from "@workspace/api-client-react";
import { getSessionId } from "@/lib/session";
import { Button } from "@/components/ui/button";
import { isComingSoon } from "@/lib/siteMode";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: cart } = useGetCart({ sessionId: getSessionId() });

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/faq" },
  ];

  // ── COMING SOON MODE: Minimal wordmark-only header ──
  if (isComingSoon) {
    return (
      <header className="fixed top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-center items-center h-20">
            <Link href="/" className="text-xl tracking-[0.25em] font-light text-foreground/80 hover:text-foreground transition-colors">
              Simply LaRae
            </Link>
          </div>
        </div>
      </header>
    );
  }

  // ── FULL MODE: Complete navigation ──
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl tracking-[0.2em] font-light text-foreground">
              Simply LaRae
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm tracking-wider uppercase font-medium transition-colors hover:text-primary ${
                  location === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex items-center space-x-4 pl-4 border-l border-border">
              <Link href="/cart" className="relative p-2 text-foreground hover:text-primary transition-colors">
                <ShoppingBag className="w-5 h-5" />
                {cart && cart.totalItems > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-primary rounded-full">
                    {cart.totalItems}
                  </span>
                )}
              </Link>
              <Button asChild className="rounded-full px-6 bg-primary hover:bg-primary/90 text-primary-foreground tracking-wider uppercase text-xs">
                <Link href="/services">Get Started</Link>
              </Button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <Link href="/cart" className="relative p-2 text-foreground">
              <ShoppingBag className="w-5 h-5" />
              {cart && cart.totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-primary rounded-full">
                  {cart.totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-border absolute w-full left-0 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-4 text-sm tracking-wider uppercase font-medium border-b border-border/50 ${
                  location === link.href ? "text-primary" : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-6 px-3">
              <Button asChild className="w-full rounded-full bg-primary text-white tracking-wider uppercase">
                <Link href="/services" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
