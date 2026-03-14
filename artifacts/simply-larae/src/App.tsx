import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-grow${isComingSoon ? " pt-0" : ""}`}>
        <Switch>
          <Route path="/" component={wrap(Home)} />
          <Route path="/services" component={wrap(Services)} />
          <Route path="/how-it-works" component={wrap(HowItWorks)} />
          <Route path="/intake" component={wrap(Intake)} />
          <Route path="/upload" component={wrap(Upload)} />
          <Route path="/results/:id" component={wrap(Results)} />
          <Route path="/blueprint/:id" component={wrap(Blueprint)} />
          <Route path="/cart" component={wrap(Cart)} />
          <Route path="/about" component={wrap(About)} />
          <Route path="/faq" component={wrap(FAQ)} />
          <Route path="/contact" component={wrap(Contact)} />
          <Route path="/privacy" component={wrap(Legal)} />
          <Route path="/terms" component={wrap(Legal)} />
          <Route path="/disclaimer" component={wrap(Disclaimer)} />
          <Route path="/admin" component={wrap(Admin)} />
          <Route component={NotFound} />
        </Switch>
      </main>
      {!isComingSoon && <Footer />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
