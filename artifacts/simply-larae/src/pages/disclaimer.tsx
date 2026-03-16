import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShieldCheck, AlertCircle, Store, ExternalLink, Scale, FileText } from "lucide-react";

const sectionCls = "py-12 border-b border-border/40 last:border-0";
const eyebrow = "text-[10px] uppercase tracking-[0.25em] text-primary font-semibold mb-3 flex items-center gap-2";
const heading = "text-xl font-light tracking-wide text-foreground mb-4";
const body = "text-sm text-foreground/75 font-light leading-relaxed";

const COMPANY = "Simply Integrated, LLC";
const BRAND = "Simply LaRae";
const EMAIL = "simplylarae.dba@gmail.com";

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
            {COMPANY} · {BRAND}
          </p>
          <p className="text-xs text-muted-foreground mt-2 font-light">
            Last Updated: March 2026
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
          <div className={sectionCls}>
            <p className={eyebrow}><ShieldCheck className="w-4 h-4" /> Advisory Purpose Only</p>
            <h2 className={heading}>Recommendations Are Informational Only</h2>
            <p className={body}>
              {BRAND} is a personalized beauty advisory platform operated by {COMPANY}, a Texas limited liability company. All content, recommendations, shade suggestions, product pairings, routine guidance, application tips, and other information provided through this Platform — whether delivered in a Beauty Blueprint report, live consultation, written communication, or any other format — is intended solely for general informational and beauty guidance purposes.
            </p>
            <p className={`${body} mt-3`}>
              Nothing contained on this Platform or in any {BRAND} report, recommendation, or communication constitutes professional medical advice, dermatological advice, pharmacological guidance, healthcare advice, or treatment of any kind. The information provided does not create a physician-patient, dermatologist-patient, or any other licensed professional relationship between you and {COMPANY} or any of its representatives.
            </p>
            <p className={`${body} mt-3`}>
              Your Beauty Blueprint is generated based on the information you provide during the intake process, combined with available analysis inputs and the professional judgment of our beauty concierge team. It is a personalized beauty guidance document, not a medical prescription, clinical assessment, or substitute for professional healthcare. Recommendations are intended for informational and beauty guidance purposes only.
            </p>
            <p className={`${body} mt-3`}>
              Individual cosmetic results vary significantly based on skin chemistry, application technique, environmental conditions, product batch variations, and other factors beyond our control. {BRAND} makes no guarantee that any recommended product will produce a specific aesthetic outcome for any individual.
            </p>
          </div>

          <div className={sectionCls}>
            <p className={eyebrow}><Store className="w-4 h-4" /> Independent Advisory Platform</p>
            <h2 className={heading}>Not Affiliated With Any Retailer or Brand</h2>
            <p className={body}>
              {BRAND} is a fully independent beauty advisory platform. We are not affiliated with, owned by, endorsed by, sponsored by, or in any commercial partnership with any beauty brand, cosmetic manufacturer, or retail entity unless a specific partnership is explicitly disclosed in writing on this Platform.
            </p>
            <p className={`${body} mt-3`}>
              Mention of any brand, product name, retailer name, or third-party entity on this Platform does not constitute an endorsement, commercial sponsorship, paid placement, or affiliation of any kind. All brand and product names referenced on this Platform are the property of their respective owners and are referenced solely for descriptive and informational purposes.
            </p>
            <p className={`${body} mt-3`}>
              {BRAND} does not accept payment from brands or retailers in exchange for product recommendations, featured placement, or favorable treatment in our Beauty Blueprint reports. Our recommendations are driven solely by your personal beauty data, preferences, and goals. This independence commitment is foundational to the {BRAND} model and will always be disclosed when any commercial arrangement exists.
            </p>
            <p className={`${body} mt-3`}>
              Product recommendations are generated based on your intake questionnaire responses, visual data you voluntarily submit, and the professional analysis of our concierge team. No recommendation is influenced by any commercial consideration, brand relationship, or retailer affiliation.
            </p>
          </div>

          <div className={sectionCls}>
            <p className={eyebrow}><ExternalLink className="w-4 h-4" /> Third-Party Links and Retailers</p>
            <h2 className={heading}>Product Links and Retailer Responsibility</h2>
            <p className={body}>
              Beauty Blueprint reports and Platform content may include links to third-party retailer or brand websites where recommended products may be purchased. These links are provided as a convenience to you. {BRAND} does not endorse any specific retailer and recommends that you shop at the retailer of your choosing.
            </p>
            <p className={`${body} mt-3`}>
              {COMPANY} does not control and is not responsible for the content, privacy practices, availability, pricing, shipping policies, return policies, customer service, or any other aspect of any third-party retailer or brand website. Any purchase made through a third-party link is a transaction solely between you and that retailer.
            </p>
            <p className={`${body} mt-3`}>
              Product pricing, availability, shade names, formulation, and packaging are subject to change by the manufacturer or retailer at any time without notice to {BRAND}. We do not guarantee that any product recommended will be available for purchase, that the price shown will be current, or that the formulation referenced will match the product you receive.
            </p>
            <p className={`${body} mt-3`}>
              {BRAND} does not earn commission, referral fees, or any other financial benefit from third-party product purchases unless a specific affiliate or partnership arrangement is explicitly disclosed. Where such arrangements exist, they are disclosed clearly and do not influence the substance or priority of our recommendations.
            </p>
          </div>

          <div className={sectionCls}>
            <p className={eyebrow}><AlertCircle className="w-4 h-4" /> Allergies, Sensitivities, and Skin Reactions</p>
            <h2 className={heading}>No Guarantee Against Adverse Reactions</h2>
            <p className={body}>
              Cosmetic and personal care products carry inherent risks of skin sensitivity, allergic reaction, contact dermatitis, irritation, or other adverse responses depending on individual skin chemistry and physiology. While {BRAND} considers disclosed sensitivities, allergies, and skin conditions when generating your recommendations, we cannot and do not guarantee that any recommended product will be free from ingredients that may cause a reaction in your specific case.
            </p>
            <p className={`${body} mt-3`}>
              You are solely responsible for reviewing the complete ingredient list of any product before use. Ingredient lists are maintained by manufacturers and may change without notice. {BRAND} recommends that you verify current ingredient information directly with the product manufacturer or retailer prior to purchase.
            </p>
            <p className={`${body} mt-3`}>
              Before applying any new cosmetic product to your face, we strongly recommend performing a patch test on a small, inconspicuous area of skin and waiting at least 24–48 hours before full application. If you experience any adverse reaction, discontinue use immediately and consult a licensed healthcare provider or dermatologist.
            </p>
            <p className={`${body} mt-3`}>
              If you have a diagnosed skin condition (including eczema, psoriasis, rosacea, acne, or contact dermatitis), are under active dermatological or medical treatment, or are taking medications that may affect skin sensitivity, you should consult your licensed healthcare provider before using any product recommended through this Platform.
            </p>
            <p className={`${body} mt-3`}>
              {COMPANY} assumes no liability for any adverse reactions, skin conditions, injuries, or health outcomes arising from the use of products recommended through the {BRAND} Platform.
            </p>
          </div>

          <div className={sectionCls}>
            <p className={eyebrow}><Scale className="w-4 h-4" /> Limitation of Liability</p>
            <h2 className={heading}>Limits on Our Responsibility</h2>
            <p className={body}>
              To the fullest extent permitted by applicable law, {COMPANY}, its members, managers, employees, contractors, and agents shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or in any way connected with: (a) your use of or inability to use the Platform; (b) any product recommendation made through the Platform; (c) your reliance on any information provided through the Platform; (d) any transaction with a third-party retailer or brand; (e) any adverse skin reaction or other health outcome; or (f) any technical errors, service interruptions, or data loss.
            </p>
            <p className={`${body} mt-3`}>
              Our total liability to you for any claim shall not exceed the total amount paid by you to {COMPANY} for the specific service giving rise to the claim. Some jurisdictions do not permit the exclusion or limitation of certain damages; in those jurisdictions, our liability is limited to the maximum extent permitted by law.
            </p>
          </div>

          <div className={sectionCls}>
            <p className={eyebrow}><ShieldCheck className="w-4 h-4" /> Optional Concierge Purchase Service</p>
            <h2 className={heading}>Concierge Purchasing — Scope and Limitations</h2>
            <p className={body}>
              Where {BRAND} offers an optional premium concierge purchase service, this service is provided under separate written terms disclosed at the time of engagement. When acting in a concierge purchasing capacity, {COMPANY} sources products from approved third-party retailers at market price and charges a disclosed service fee for this facilitation. This service is strictly opt-in and is available only where explicitly offered and confirmed in writing.
            </p>
            <p className={`${body} mt-3`}>
              Even in concierge purchasing mode, {BRAND} does not guarantee product suitability, satisfaction, or freedom from adverse reactions. The limitations on liability and warranties described throughout these legal documents apply equally to concierge purchase services.
            </p>
          </div>

          <div className={sectionCls}>
            <p className={eyebrow}><FileText className="w-4 h-4" /> Governing Law</p>
            <h2 className={heading}>Applicable Law</h2>
            <p className={body}>
              This Disclaimer is governed by and construed in accordance with the laws of the State of Texas, United States of America, without regard to conflict of law principles. By accessing or using the {BRAND} Platform, you agree that any dispute arising from or related to this Disclaimer shall be subject to the exclusive jurisdiction of the state and federal courts located in Texas.
            </p>
            <p className={`${body} mt-3`}>
              This Disclaimer is part of, and should be read in conjunction with, our Privacy Policy and Terms of Service. In the event of any conflict between this Disclaimer and the Terms of Service, the Terms of Service shall govern.
            </p>
          </div>

          <div className="pt-12 text-center">
            <p className="text-sm text-muted-foreground font-light mb-8 max-w-xl mx-auto">
              If you have questions about this disclaimer, our advisory model, or our independence commitment, please contact our team directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="rounded-full px-8 py-6 text-xs uppercase tracking-widest border-border">
                <Link href="/privacy">Privacy Policy</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-8 py-6 text-xs uppercase tracking-widest border-border">
                <Link href="/terms">Terms of Service</Link>
              </Button>
              <Button asChild className="rounded-full px-8 py-6 text-xs uppercase tracking-widest bg-primary hover:bg-primary/90 text-white">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
