import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="py-10 border-b border-border/40 last:border-0">
    <h2 className="text-lg font-medium tracking-wide text-foreground mb-4">{title}</h2>
    <div className="space-y-3">{children}</div>
  </div>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-foreground/70 font-light leading-relaxed">{children}</p>
);

const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-2 pl-4">
    {items.map((item, i) => (
      <li key={i} className="text-sm text-foreground/70 font-light leading-relaxed list-disc list-inside">{item}</li>
    ))}
  </ul>
);

const LAST_UPDATED = "March 2026";
const COMPANY = "Simply Integrated, LLC";
const BRAND = "Simply LaRae";
const DOMAIN = "simplylarea.com";
const EMAIL = "hello@simplylarea.com";

export default function Legal() {
  const [location] = useLocation();
  const isPrivacy = location === "/privacy";
  const isTerms = location === "/terms";

  return (
    <div className="w-full bg-white min-h-screen pb-32">
      <section className="pt-24 pb-16 px-4 bg-background border-b border-border/50 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-4">Legal</p>
          <h1 className="text-4xl md:text-5xl font-thin tracking-[0.1em] uppercase mb-4 text-foreground">
            {isPrivacy ? "Privacy Policy" : "Terms of Service"}
          </h1>
          <p className="text-muted-foreground font-light">{COMPANY} · {BRAND}</p>
          <p className="text-xs text-muted-foreground mt-2 font-light">Last Updated: {LAST_UPDATED}</p>
          <p className="text-xs text-amber-600 mt-3 font-light max-w-xl mx-auto">
            Template notice: This page contains template legal language. Please have it reviewed by qualified legal counsel before commercial launch.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isPrivacy && (
            <>
              <Section title="1. Introduction">
                <P>
                  Welcome to {BRAND}, a beauty advisory platform operated by {COMPANY} ("{COMPANY}", "we", "us", or "our"). This Privacy Policy describes how we collect, use, disclose, and protect your personal information when you access or use our website at {DOMAIN} and related services (collectively, the "Platform").
                </P>
                <P>
                  By accessing or using the Platform, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree, please do not use the Platform.
                </P>
              </Section>

              <Section title="2. Information We Collect">
                <P>We may collect the following categories of personal information:</P>
                <List items={[
                  "Identity Information: Full name, age range, email address",
                  "Beauty Profile Data: Skin type, skin tone, undertone, hair color, eye color, freckles, sensitivities, makeup preferences, and goals",
                  "Visual Data: Selfie images voluntarily submitted for facial analysis",
                  "Usage Data: IP address, browser type, pages visited, session identifiers, and interaction data",
                  "Communications: Messages submitted through our contact form",
                  "Payment Information: Processed securely through third-party payment processors (we do not store full payment details)",
                ]} />
              </Section>

              <Section title="3. How We Use Your Information">
                <P>We use the information we collect to:</P>
                <List items={[
                  "Provide personalized beauty recommendations and Beauty Blueprint reports",
                  "Process service orders and track submission status",
                  "Communicate with you regarding your submission, status, and support requests",
                  "Improve our recommendation logic and service quality",
                  "Maintain session continuity and your beauty cart",
                  "Comply with applicable legal obligations",
                  "Protect the security and integrity of our Platform",
                ]} />
              </Section>

              <Section title="4. Facial Image Data">
                <P>
                  Selfie images submitted through the Platform are used solely for the purpose of generating your personalized beauty blueprint. We treat facial images with a high standard of care:
                </P>
                <List items={[
                  "Images are stored securely and accessible only to authorized Simply LaRae concierge team members",
                  "Images are not sold, licensed, or shared with third parties for any purpose",
                  "Images are deleted upon request or after service completion",
                  "We do not use facial images for biometric identification, tracking, or surveillance",
                ]} />
              </Section>

              <Section title="5. Information Sharing">
                <P>
                  We do not sell your personal information. We may share information only in the following limited circumstances:
                </P>
                <List items={[
                  "Service Providers: With trusted third-party vendors who help us operate the Platform (e.g., hosting, payment processing, email delivery), subject to confidentiality obligations",
                  "Legal Requirements: When required by applicable law, legal process, or government authority",
                  "Business Transfers: In connection with a merger, acquisition, or sale of all or substantially all of our assets",
                  "With Your Consent: In any other circumstance where you have provided explicit consent",
                ]} />
              </Section>

              <Section title="6. Third-Party Links and Retailers">
                <P>
                  The Platform may contain links to third-party retailer websites for product purchases. These third-party sites have their own privacy policies. {COMPANY} is not responsible for the privacy practices of any third-party website, and we encourage you to review the privacy policy of any site you visit.
                </P>
                <P>
                  {BRAND} is an independent beauty advisory platform and is not affiliated with, endorsed by, or partnered with any retailer or brand unless explicitly stated.
                </P>
              </Section>

              <Section title="7. Data Retention">
                <P>
                  We retain personal information for as long as necessary to provide the Platform and fulfill the purposes outlined in this policy, or as required by applicable law. You may request deletion of your personal data by contacting us at {EMAIL}.
                </P>
              </Section>

              <Section title="8. Your Rights">
                <P>Depending on your jurisdiction, you may have the right to:</P>
                <List items={[
                  "Access the personal information we hold about you",
                  "Request correction of inaccurate information",
                  "Request deletion of your personal data",
                  "Opt out of marketing communications",
                  "Lodge a complaint with a supervisory data protection authority",
                ]} />
                <P>To exercise these rights, contact us at {EMAIL}.</P>
              </Section>

              <Section title="9. Data Security">
                <P>
                  We implement industry-standard security measures to protect your personal information against unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </P>
              </Section>

              <Section title="10. Children's Privacy">
                <P>
                  The Platform is not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe we have inadvertently collected data from a minor, please contact us immediately.
                </P>
              </Section>

              <Section title="11. Changes to This Policy">
                <P>
                  We may update this Privacy Policy from time to time. We will notify you of material changes by updating the "Last Updated" date at the top of this page. Continued use of the Platform following any changes constitutes your acceptance of the updated policy.
                </P>
              </Section>

              <Section title="12. Contact Us">
                <P>For questions about this Privacy Policy, please contact:</P>
                <P>{COMPANY} · {BRAND} · Email: {EMAIL} · {DOMAIN}</P>
              </Section>
            </>
          )}

          {isTerms && (
            <>
              <Section title="1. Agreement to Terms">
                <P>
                  These Terms of Service ("Terms") constitute a legally binding agreement between you and {COMPANY} ("Company", "we", "us", or "our") governing your access to and use of the {BRAND} platform at {DOMAIN} and related services (collectively, the "Platform").
                </P>
                <P>
                  By accessing or using the Platform, you affirm that you are at least 18 years of age and agree to be bound by these Terms. If you do not agree to these Terms, you may not use the Platform.
                </P>
              </Section>

              <Section title="2. Description of Services">
                <P>
                  {BRAND} is an independent personalized beauty advisory and concierge platform. We provide:
                </P>
                <List items={[
                  "Multi-step beauty intake questionnaires",
                  "Personalized beauty profile analysis",
                  "Curated product recommendations and shade matching",
                  "Beauty Blueprint reports tailored to individual customer profiles",
                  "Optional live beauty consultations (where available)",
                  "Beauty cart and curated product reference lists",
                ]} />
                <P>
                  {BRAND} provides recommendations for informational and beauty guidance purposes only. We are an independent advisory platform and are not affiliated with, endorsed by, or partnered with any brand or retailer unless explicitly stated.
                </P>
              </Section>

              <Section title="3. Service Tiers and Payment">
                <P>
                  Access to certain services requires purchase of a service tier. By purchasing a service, you agree to pay all applicable fees at the time of purchase. All fees are displayed in USD unless otherwise stated.
                </P>
                <P>
                  Payment processing is handled by secure third-party payment processors. We do not store your full payment card details.
                </P>
                <P>
                  Service fees are non-refundable once your personalized Beauty Blueprint has been delivered, due to the custom and time-intensive nature of the analysis and curation process. If you are dissatisfied with your recommendations, please contact us within 7 days of delivery for a complimentary revision review.
                </P>
              </Section>

              <Section title="4. Independent Advisory Positioning">
                <P>
                  {BRAND} provides recommendations based on your intake data, preferences, and analysis results. Recommendations are intended to serve your beauty needs, not to benefit any particular brand or retailer.
                </P>
                <P>
                  Product links on the Platform direct you to independent third-party retailer or brand websites. Purchases made through those links are transactions between you and the retailer. {COMPANY} is not a party to those transactions and bears no responsibility for pricing, availability, shipping, returns, or customer service handled by third-party retailers.
                </P>
                <P>
                  Mention of any brand, product, or retailer does not constitute endorsement, partnership, or affiliation unless explicitly disclosed.
                </P>
              </Section>

              <Section title="5. Intellectual Property">
                <P>
                  All content on the Platform — including but not limited to text, design, graphics, logos, brand elements, Beauty Blueprint report formats, recommendation frameworks, and product curation methodology — is owned by or licensed to {COMPANY} and is protected by applicable intellectual property laws.
                </P>
                <P>
                  Your Beauty Blueprint is generated for your personal use only and may not be redistributed, resold, or used commercially without written consent from {COMPANY}.
                </P>
              </Section>

              <Section title="6. User Responsibilities">
                <P>You agree to:</P>
                <List items={[
                  "Provide accurate information during the intake process",
                  "Use the Platform only for lawful personal beauty advisory purposes",
                  "Not attempt to reverse-engineer, copy, or resell any portion of the Platform",
                  "Not submit false, misleading, or fraudulent information",
                  "Review product ingredients before use, particularly if you have known sensitivities",
                ]} />
              </Section>

              <Section title="7. Limitation of Liability">
                <P>
                  To the maximum extent permitted by applicable law, {COMPANY} shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Platform, including but not limited to skin reactions, product dissatisfaction, third-party retailer issues, or reliance on recommendation content.
                </P>
                <P>
                  Our total liability for any claim arising under these Terms shall not exceed the amount you paid for the specific service giving rise to the claim.
                </P>
              </Section>

              <Section title="8. Disclaimer of Warranties">
                <P>
                  The Platform is provided "as is" and "as available" without warranties of any kind, express or implied. We do not warrant that the Platform will be error-free, uninterrupted, or that recommendations will produce specific results. Cosmetic experiences vary by individual.
                </P>
              </Section>

              <Section title="9. Concierge Purchase Service">
                <P>
                  Where a premium concierge purchase service is offered, it is subject to separate terms disclosed at the time of that service. In concierge mode, {COMPANY} acts as a purchasing facilitator on the customer's behalf and charges a disclosed service fee. This service is opt-in and available only where explicitly offered.
                </P>
              </Section>

              <Section title="10. Governing Law">
                <P>
                  These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to conflict of law principles. Any disputes shall be resolved in the courts located in Los Angeles County, California.
                </P>
              </Section>

              <Section title="11. Changes to Terms">
                <P>
                  We reserve the right to update these Terms at any time. Material changes will be communicated via the Platform or email. Continued use of the Platform after changes take effect constitutes acceptance of the revised Terms.
                </P>
              </Section>

              <Section title="12. Contact">
                <P>
                  For questions about these Terms, contact: {COMPANY} · {EMAIL} · {DOMAIN}
                </P>
              </Section>
            </>
          )}

          <div className="pt-10 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="rounded-full px-6 py-5 text-xs uppercase tracking-widest border-border">
                <Link href={isPrivacy ? "/terms" : "/privacy"}>
                  {isPrivacy ? "View Terms of Service" : "View Privacy Policy"}
                </Link>
              </Button>
              <Button asChild className="rounded-full px-6 py-5 text-xs uppercase tracking-widest bg-primary hover:bg-primary/90 text-white">
                <Link href="/disclaimer">View Disclaimer</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
