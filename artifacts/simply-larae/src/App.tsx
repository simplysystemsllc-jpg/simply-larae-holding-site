import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { isComingSoon } from "@/lib/siteMode";

import Home from "@/pages/home";
import Services from "@/pages/services";
import HowItWorks from "@/pages/how-it-works";
import Intake from "@/pages/intake";
import Upload from "@/pages/upload";
import Results from "@/pages/results";
import Blueprint from "@/pages/blueprint";
import Cart from "@/pages/cart";
import About from "@/pages/about";
import FAQ from "@/pages/faq";
import Contact from "@/pages/contact";
import Legal from "@/pages/legal";
import Disclaimer from "@/pages/disclaimer";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

const wrap = (Component: React.ComponentType) => () => (
  <>
    <ScrollToTop />
    <Component />
  </>
);

// Stable wrapped components — defined once at module level so React never
// sees a new component type at the same route position (which would cause
// full unmount/remount on every re-render of Router).
const WrappedHome       = wrap(Home);
const WrappedServices   = wrap(Services);
const WrappedHowItWorks = wrap(HowItWorks);
const WrappedIntake     = wrap(Intake);
const WrappedUpload     = wrap(Upload);
const WrappedResults    = wrap(Results);
const WrappedBlueprint  = wrap(Blueprint);
const WrappedCart       = wrap(Cart);
const WrappedAbout      = wrap(About);
const WrappedFAQ        = wrap(FAQ);
const WrappedContact    = wrap(Contact);
const WrappedLegal      = wrap(Legal);
const WrappedDisclaimer = wrap(Disclaimer);
const WrappedAdmin      = wrap(Admin);

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-grow${isComingSoon ? " pt-0" : ""}`}>
        <Switch>
          <Route path="/"            component={WrappedHome} />
          <Route path="/services"    component={WrappedServices} />
          <Route path="/how-it-works" component={WrappedHowItWorks} />
          <Route path="/intake"      component={WrappedIntake} />
          <Route path="/upload"      component={WrappedUpload} />
          <Route path="/results/:id" component={WrappedResults} />
          <Route path="/blueprint/:id" component={WrappedBlueprint} />
          <Route path="/cart"        component={WrappedCart} />
          <Route path="/about"       component={WrappedAbout} />
          <Route path="/faq"         component={WrappedFAQ} />
          <Route path="/contact"     component={WrappedContact} />
          <Route path="/privacy"     component={WrappedLegal} />
          <Route path="/terms"       component={WrappedLegal} />
          <Route path="/disclaimer"  component={WrappedDisclaimer} />
          <Route path="/admin"       component={WrappedAdmin} />
          <Route component={NotFound} />
        </Switch>
      </main>
      {!isComingSoon && <Footer />}
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
