import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShieldCheck, AlertCircle, Store, ExternalLink } from "lucide-react";
import { brandVoice } from "@/lib/brand";

const section = "py-12 border-b border-border/40 last:border-0";
const eyebrow = "text-[10px] uppercase tracking-[0.25em] text-primary font-semibold mb-3 flex items-center gap-2";
const heading = "text-xl font-light tracking-wide text-foreground mb-4";
const body = "text-sm text-foreground/75 font-light leading-relaxed";

export default function Disclaimer() {
  return (
    <div className="w-full bg-white min-h-screen pb-32">
      <section className="pt-24 pb-16 px-4 bg-background border-b border-border/50 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-4">Legal</p>
          <h1 className="text-4xl md:text-5xl font-thin tracking-[0.1em] uppercase mb-4 text-foreground">
            Disclaimer
          </h1>
          <p className="text-muted-foreground font-light tracking-wide">
            Simply Integrated, LLC · Simply LaRae
          </p>
          <p className="text-xs text-muted-foreground mt-2 font-light">
            Last updated: {new Date().getFullYear()}
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-0"
        >
          <div className={section}>
            <p className={eyebrow}><ShieldCheck className="w-4 h-4" /> Advisory Purpose Only</p>
            <h2 className={heading}>Recommendations Are Informational Only</h2>
            <p className={body}>
              {brandVoice.disclaimer.blueprintNote}
            </p>
            <p className={`${body} mt-3`}>
              The content provided on this website and through the Simply LaRae platform — including but not limited to beauty recommendations, shade suggestions, product pairings, routine guidance, and application tips — is intended solely for general informational and beauty guidance purposes. Nothing on this platform constitutes professional medical, dermatological, or cosmetic advice.
            </p>
            <p className={`${body} mt-3`}>
              {brandVoice.disclaimer.results}
            </p>
          </div>

          <div className={section}>
            <p className={eyebrow}><Store className="w-4 h-4" /> Independent Advisory Platform</p>
            <h2 className={heading}>Not Affiliated With Any Retailer or Brand</h2>
            <p className={body}>
              {brandVoice.disclaimer.independence}
            </p>
            <p className={`${body} mt-3`}>
              Mention of any brand, product, retailer, or third-party seller on this platform does not constitute an endorsement, partnership, sponsorship, or affiliation unless explicitly stated in writing by Simply Integrated, LLC.
            </p>
            <p className={`${body} mt-3`}>
              Product recommendations are based solely on the information provided by the user during the intake process and available analysis data, combined with the expertise of our beauty concierge team. Recommendations are made in the best interest of the customer, without preference for any particular retailer or commercial relationship.
            </p>
          </div>

          <div className={section}>
            <p className={eyebrow}><ExternalLink className="w-4 h-4" /> Third-Party Links and Retailers</p>
            <h2 className={heading}>Product Links and Retailer Responsibility</h2>
            <p className={body}>
              {brandVoice.disclaimer.recommendations}
            </p>
            <p className={`${body} mt-3`}>
              {brandVoice.disclaimer.pricing}
            </p>
            <p className={`${body} mt-3`}>
              Simply LaRae does not control the policies, availability, shipping, returns, customer service, or pricing of any third-party retailer or brand. Any purchase made through a third-party link is a transaction between the customer and that third-party, and Simply LaRae bears no responsibility for the outcome of such transactions.
            </p>
            <p className={`${body} mt-3`}>
              Simply LaRae does not guarantee the availability of any product, the accuracy of pricing displayed, or the suitability of any product for a specific individual. Product imagery shown is used for illustrative purposes and may be sourced from official brand media.
            </p>
          </div>

          <div className={section}>
            <p className={eyebrow}><AlertCircle className="w-4 h-4" /> Allergies and Sensitivities</p>
            <h2 className={heading}>No Guarantee Against Adverse Reactions</h2>
            <p className={body}>
              Cosmetic products carry inherent risks of skin sensitivity, allergic reaction, or irritation depending on individual skin chemistry. While Simply LaRae considers disclosed sensitivities and allergies during the recommendation process, we cannot guarantee that recommended products will be free from ingredients that may cause a reaction.
            </p>
            <p className={`${body} mt-3`}>
              Customers are responsible for reviewing product ingredient lists and performing appropriate patch testing before full use. Consult a licensed dermatologist or healthcare professional before using any new cosmetic product if you have known skin conditions or sensitivities.
            </p>
          </div>

          <div className={section}>
            <p className={eyebrow}><ShieldCheck className="w-4 h-4" /> Concierge Purchase Service</p>
            <h2 className={heading}>Optional Concierge Services</h2>
            <p className={body}>
              Where Simply LaRae offers a premium concierge purchase service, such service is subject to separate terms and conditions. Simply LaRae acting in a concierge purchasing capacity sources products at market price from approved third-party retailers and is compensated through a disclosed service fee. This service is available only where explicitly offered and agreed upon.
            </p>
          </div>

          <div className={section}>
            <p className={eyebrow}><AlertCircle className="w-4 h-4" /> Counsel Review Notice</p>
            <h2 className={heading}>Template Language Notice</h2>
            <p className={body}>
              The legal, disclaimer, privacy, and terms content presented on this website represents template language suitable for initial launch purposes. Simply Integrated, LLC recommends that all legal pages be reviewed by licensed legal counsel prior to or shortly after commercial launch, and that content be updated to reflect applicable jurisdictional law, business practices, and regulatory requirements.
            </p>
          </div>

          <div className="pt-12 text-center">
            <p className="text-sm text-muted-foreground font-light mb-8 max-w-xl mx-auto">
              If you have questions about this disclaimer or our advisory model, please contact us directly.
            </p>
            <Button asChild className="rounded-full px-8 py-6 text-xs uppercase tracking-widest bg-primary hover:bg-primary/90 text-white">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
