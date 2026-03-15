import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md mx-auto">
        <p className="text-[10px] tracking-[0.35em] uppercase text-primary font-medium mb-6">
          Simply LaRae
        </p>
        <h1 className="text-7xl font-thin tracking-[0.1em] text-foreground mb-4">404</h1>
        <p className="text-xl font-light tracking-wide text-foreground mb-4">Page Not Found</p>
        <p className="text-sm text-muted-foreground font-light leading-relaxed mb-10">
          The page you're looking for doesn't exist or may have moved. Let us guide you back.
        </p>
        <Button asChild className="rounded-full px-10 py-6 tracking-widest uppercase text-xs bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/15">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
