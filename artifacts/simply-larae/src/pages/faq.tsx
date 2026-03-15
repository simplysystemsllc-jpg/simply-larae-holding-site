import { useListFaqs } from "@workspace/api-client-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader2 } from "lucide-react";
import { SEO } from "@/components/seo/SEO";

export default function FAQ() {
  const { data: faqs, isLoading } = useListFaqs();

  // Group FAQs by category
  const groupedFaqs = faqs?.reduce((acc, faq) => {
    acc[faq.category] = acc[faq.category] || [];
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, typeof faqs>) || {};

  return (
    <div className="w-full bg-background min-h-screen pb-32">
      <SEO
        title="FAQ — Beauty Blueprint, Shade Matching & Concierge Questions"
        description="Answers to the most common questions about Simply LaRae's beauty concierge services — how facial analysis works, what's included in a Beauty Blueprint, turnaround times, privacy, and pricing."
        keywords="beauty blueprint FAQ, facial analysis questions, shade matching how it works, beauty concierge FAQ, personalized beauty questions, simply larae help, makeup recommendation FAQ"
        canonical="/faq"
      />
      <section className="pt-24 pb-16 px-4 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-thin tracking-[0.15em] uppercase mb-6 text-foreground">
          Inquiries
        </h1>
        <p className="text-lg text-muted-foreground font-light tracking-wide">
          Everything you need to know about our concierge service.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-4">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : Object.keys(groupedFaqs).length > 0 ? (
          Object.entries(groupedFaqs).map(([category, items]) => (
            <div key={category} className="mb-12">
              <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-primary mb-6">{category}</h2>
              <Accordion type="single" collapsible className="w-full bg-white rounded-2xl border border-border/50 overflow-hidden shadow-sm">
                {[...items].sort((a,b) => a.sortOrder - b.sortOrder).map((faq) => (
                  <AccordionItem key={faq.id} value={`item-${faq.id}`} className="border-border px-6">
                    <AccordionTrigger className="text-left font-medium tracking-wide text-foreground hover:text-primary py-6 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground font-light leading-relaxed pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            No FAQs available at the moment.
          </div>
        )}
      </section>
    </div>
  );
}
