import { Info } from "lucide-react";

interface DisclosureBadgeProps {
  label?: string;
  type?: "sponsored" | "affiliate" | "featured" | "partnership";
  size?: "sm" | "md";
}

const BADGE_STYLES = {
  sponsored: "bg-amber-50 text-amber-700 border-amber-200",
  affiliate: "bg-blue-50 text-blue-700 border-blue-200",
  featured: "bg-primary/10 text-primary border-primary/20",
  partnership: "bg-purple-50 text-purple-700 border-purple-200",
};

const DEFAULT_LABELS = {
  sponsored: "Sponsored",
  affiliate: "Affiliate Link",
  featured: "Featured",
  partnership: "Brand Partnership",
};

export function DisclosureBadge({
  label,
  type = "sponsored",
  size = "sm",
}: DisclosureBadgeProps) {
  const displayLabel = label ?? DEFAULT_LABELS[type];
  const styles = BADGE_STYLES[type];
  const textSize = size === "sm" ? "text-[9px]" : "text-[10px]";

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border font-semibold uppercase tracking-widest ${textSize} ${styles}`}
      title="This content has a commercial relationship. See our disclaimer for details."
    >
      <Info className={size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3"} />
      {displayLabel}
    </span>
  );
}

export function AffiliateDisclosureNote() {
  return (
    <p className="text-[10px] text-muted-foreground font-light leading-relaxed">
      Some links may be affiliate links. Simply LaRae may earn a commission at no additional cost to you.
      All recommendations remain independent and customer-fit-first.{" "}
      <a href="/disclaimer" className="underline hover:text-foreground transition-colors">
        Learn more
      </a>
    </p>
  );
}

export function SponsorshipNote({ brandName }: { brandName?: string }) {
  return (
    <p className="text-[10px] text-muted-foreground font-light leading-relaxed">
      {brandName ? `${brandName} has a brand relationship with Simply LaRae.` : "This placement involves a brand relationship."}{" "}
      Sponsored products must still meet our suitability standards.{" "}
      <a href="/disclaimer" className="underline hover:text-foreground transition-colors">
        Disclosure
      </a>
    </p>
  );
}
