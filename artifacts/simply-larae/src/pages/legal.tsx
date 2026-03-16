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
const EMAIL = "simplylarae.dba@gmail.com";

export default function Legal() {
  const [location] = useLocation();
  const isPrivacy = location === "/privacy";

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
                  Welcome to {BRAND}, a personalized beauty advisory platform operated by {COMPANY} ("{COMPANY}", "we", "us", or "our"), a limited liability company organized and operating under the laws of the State of Texas. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website at {DOMAIN} or use our services (collectively, the "Platform").
                </P>
                <P>
                  By accessing or using the Platform, you acknowledge that you have read and understood this Privacy Policy and consent to the data practices described herein. If you do not agree, please discontinue use of the Platform immediately.
                </P>
                <P>
                  This Privacy Policy is incorporated into and subject to our Terms of Service. Defined terms used but not defined here have the meanings given in our Terms of Service.
                </P>
              </Section>

              <Section title="2. Information We Collect">
                <P>We collect information you provide directly to us and information generated through your use of the Platform. Categories include:</P>
                <List items={[
                  "Identity & Contact Information: Full name, email address, and age range provided during registration or intake",
                  "Beauty Profile Data: Skin type, skin tone, undertone, hair color, eye color, presence of freckles, known sensitivities or allergies, makeup preferences, budget range, and beauty goals",
                  "Visual Data: Selfie images voluntarily submitted for facial structure and undertone analysis",
                  "Transactional Data: Service tier purchased, order history, and payment metadata (we do not store full card numbers)",
                  "Usage & Technical Data: IP address, browser type and version, device identifiers, operating system, referring URLs, pages viewed, and session duration",
                  "Communications: Content of messages submitted through our contact form or customer support channels",
                  "Cookies and Tracking Technologies: Session identifiers and preference cookies as described in Section 5 below",
                ]} />
                <P>
                  We do not intentionally collect sensitive personal information beyond beauty profile data and visual data described above. We collect only what is reasonably necessary to deliver our services.
                </P>
              </Section>

              <Section title="3. How We Use Your Information">
                <P>We use the information we collect for the following purposes:</P>
                <List items={[
                  "To provide, personalize, and improve our beauty advisory services and Beauty Blueprint reports",
                  "To process and fulfill service orders and track submission status",
                  "To communicate with you about your account, submissions, support requests, and service updates",
                  "To conduct facial analysis and generate curated product and shade recommendations",
                  "To maintain your beauty cart and recommendation history during your session",
                  "To detect, investigate, and prevent fraudulent transactions and abuse of the Platform",
                  "To analyze usage trends and improve Platform functionality and user experience",
                  "To comply with legal obligations under applicable federal and state law",
                  "To send marketing communications, where you have opted in to receive them",
                ]} />
              </Section>

              <Section title="4. Facial Image Data and Biometric Considerations">
                <P>
                  Selfie images submitted through our Platform are used exclusively to generate your personalized beauty blueprint. We treat facial image data with the highest degree of care and apply the following standards:
                </P>
                <List items={[
                  "Images are stored using encrypted, access-controlled storage and are accessible only to authorized Simply LaRae concierge team members on a need-to-know basis",
                  "Images are never sold, licensed, rented, or shared with third parties for any commercial or non-commercial purpose",
                  "Images are deleted from our active systems upon your written request or within 90 days following service completion, whichever occurs first",
                  "We do not use facial images for biometric identification, facial recognition, surveillance, advertising profiling, or any purpose beyond personalized beauty analysis",
                  "We do not share images with AI training datasets, model vendors, or marketing partners",
                ]} />
                <P>
                  Residents of Illinois, Texas, Washington, and other states with biometric privacy statutes should be aware that your submission of a selfie constitutes consent to the collection and limited use of visual data as described in this policy. You may withdraw this consent at any time by contacting us, which will require deletion of your image and may limit service delivery.
                </P>
              </Section>

              <Section title="5. Cookies and Tracking Technologies">
                <P>
                  We use session cookies and similar technologies to maintain your session state, remember your service progress, and improve Platform functionality. We do not use third-party behavioral advertising cookies. Specifically:
                </P>
                <List items={[
                  "Session Cookies: Used to maintain your login state and beauty cart across pages during a session",
                  "Preference Cookies: Used to remember your display preferences",
                  "Analytics Cookies: We may use privacy-respecting analytics tools to understand aggregate usage patterns; we do not use Google Analytics Advertising Features",
                ]} />
                <P>
                  You may disable cookies through your browser settings. Disabling session cookies may impair the functionality of the Platform.
                </P>
              </Section>

              <Section title="6. Information Sharing and Disclosure">
                <P>
                  We do not sell, rent, or trade your personal information. We may share your information only in the following limited circumstances:
                </P>
                <List items={[
                  "Service Providers: With vetted third-party vendors who perform functions on our behalf, such as cloud hosting, payment processing, and email delivery services, each bound by confidentiality obligations and permitted to use your data only as directed by us",
                  "Legal Process: When required by applicable law, court order, subpoena, or other governmental authority, or when we believe in good faith that disclosure is necessary to protect our rights, your safety, or the safety of others",
                  "Business Transfers: In the event of a merger, acquisition, reorganization, or sale of substantially all assets of {COMPANY}, your information may be transferred as part of that transaction, subject to the acquirer honoring this Privacy Policy",
                  "Consent: With your express written consent for any other purpose not listed herein",
                ]} />
                <P>
                  {BRAND} is an independent advisory platform. We do not share personal information with beauty brands or retailers for marketing, targeting, or co-marketing purposes.
                </P>
              </Section>

              <Section title="7. Third-Party Retailer Links">
                <P>
                  Our Beauty Blueprint reports may include links to third-party retailer websites for product purchase convenience. These third-party sites operate under their own privacy policies, which we encourage you to review before making a purchase. {COMPANY} is not responsible for the data practices of any third-party website.
                </P>
                <P>
                  Any purchase you make through a third-party link is a transaction solely between you and that retailer. We do not receive personal or payment information from those transactions.
                </P>
              </Section>

              <Section title="8. Data Retention">
                <P>
                  We retain personal information for as long as necessary to fulfill the purposes for which it was collected, provide ongoing services to you, resolve disputes, enforce our agreements, and comply with applicable legal obligations. In general:
                </P>
                <List items={[
                  "Active account and profile data: Retained for the duration of your customer relationship plus 3 years",
                  "Facial image data: Retained until service completion or deletion request, with a maximum retention of 90 days post-delivery",
                  "Transaction records: Retained for 7 years to satisfy tax and accounting obligations under Texas and federal law",
                  "Support communications: Retained for 2 years",
                ]} />
                <P>You may request deletion of your personal data at any time by contacting us at {EMAIL}.</P>
              </Section>

              <Section title="9. Your Privacy Rights">
                <P>Depending on your state of residence, you may have the following rights with respect to your personal information:</P>
                <List items={[
                  "Right to Know: The right to request disclosure of the categories and specific pieces of personal information we have collected about you",
                  "Right to Access: The right to obtain a copy of the personal information we hold about you",
                  "Right to Correction: The right to request correction of inaccurate or incomplete personal information",
                  "Right to Deletion: The right to request deletion of your personal information, subject to certain legal exceptions",
                  "Right to Opt Out: The right to opt out of marketing communications at any time by using the unsubscribe link in any email or contacting us directly",
                  "Right to Non-Discrimination: The right not to receive discriminatory treatment for exercising your privacy rights",
                  "California Residents (CCPA/CPRA): California residents have additional rights under the California Consumer Privacy Act, including the right to opt out of the sale of personal information (we do not sell personal information) and the right to limit use of sensitive personal information",
                ]} />
                <P>To exercise any of these rights, please contact us at {EMAIL}. We will respond to verifiable requests within 45 days, with one permitted extension of an additional 45 days where reasonably necessary.</P>
              </Section>

              <Section title="10. Data Security">
                <P>
                  We implement commercially reasonable administrative, technical, and physical security measures designed to protect your personal information against unauthorized access, disclosure, alteration, loss, and destruction. Security measures include encrypted data storage, access controls, and secure transmission protocols (TLS/HTTPS).
                </P>
                <P>
                  No method of electronic transmission or storage is completely secure. We cannot guarantee absolute security of your information. In the event of a data breach that is likely to result in risk to your rights and freedoms, we will notify affected users in accordance with applicable law.
                </P>
              </Section>

              <Section title="11. Children's Privacy">
                <P>
                  The Platform is intended solely for individuals who are 18 years of age or older. We do not knowingly collect, solicit, or process personal information from individuals under the age of 18. If we learn that we have inadvertently collected personal information from a minor, we will promptly delete such information. If you have reason to believe we may have collected information from a minor, please contact us immediately at {EMAIL}.
                </P>
              </Section>

              <Section title="12. Changes to This Privacy Policy">
                <P>
                  We reserve the right to modify this Privacy Policy at any time. We will indicate changes by updating the "Last Updated" date at the top of this page. For material changes, we will provide notice through the Platform or by email to registered users at least 30 days before the change takes effect, where feasible. Your continued use of the Platform after the effective date of any change constitutes your acceptance of the revised Privacy Policy.
                </P>
              </Section>

              <Section title="13. Contact Us">
                <P>If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact:</P>
                <P><strong className="font-medium text-foreground">{COMPANY} d/b/a {BRAND}</strong></P>
                <P>Texas, United States of America</P>
                <P>Email: {EMAIL}</P>
                <P>Website: {DOMAIN}</P>
              </Section>
            </>
          )}

          {!isPrivacy && (
            <>
              <Section title="1. Agreement to Terms">
                <P>
                  These Terms of Service ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and {COMPANY} ("Company," "we," "us," or "our"), a limited liability company organized under the laws of the State of Texas, operating the {BRAND} platform accessible at {DOMAIN} and related services (collectively, the "Platform").
                </P>
                <P>
                  BY ACCESSING OR USING THE PLATFORM, YOU AFFIRM THAT YOU ARE AT LEAST 18 YEARS OF AGE, HAVE READ AND UNDERSTOOD THESE TERMS, AND AGREE TO BE BOUND BY THEM. IF YOU DO NOT AGREE, YOU MAY NOT ACCESS OR USE THE PLATFORM.
                </P>
                <P>
                  We reserve the right to update these Terms at any time. Continued use of the Platform following any modification constitutes acceptance of the revised Terms. It is your responsibility to review these Terms periodically.
                </P>
              </Section>

              <Section title="2. Description of Services">
                <P>
                  {BRAND} is an independent, retailer-agnostic personalized beauty advisory and concierge platform. Our services include:
                </P>
                <List items={[
                  "Multi-step beauty intake questionnaires capturing skin type, tone, preferences, sensitivities, and goals",
                  "AI-assisted and expert-reviewed facial analysis for product and shade matching",
                  "Personalized Beauty Blueprint reports featuring curated product recommendations, shade matches, application techniques, and routine guidance",
                  "Optional live beauty consultation sessions with our concierge team",
                  "Beauty cart functionality to aggregate and reference recommended products",
                  "Brand partnership and inquiry services for qualified beauty industry partners",
                ]} />
                <P>
                  All recommendations provided through the Platform are for informational and beauty guidance purposes only. {BRAND} is an independent advisory platform. Our recommendations are not influenced by paid placements, brand sponsorships, or retailer affiliations unless explicitly disclosed.
                </P>
              </Section>

              <Section title="3. Eligibility and Account Responsibilities">
                <P>
                  To use the Platform, you must be at least 18 years of age and have the legal capacity to enter into a binding contract under applicable law. By using the Platform, you represent and warrant that you meet these requirements.
                </P>
                <P>
                  You are responsible for maintaining the confidentiality of any account credentials and for all activities that occur under your account. You agree to notify us immediately at {EMAIL} of any unauthorized use of your account or any other security breach.
                </P>
              </Section>

              <Section title="4. Service Tiers and Pricing">
                <P>
                  Access to certain Platform features requires purchase of a service tier. Our current service offerings and applicable fees are displayed on the Services page of the Platform. All prices are stated in United States Dollars (USD) and are subject to change with reasonable notice.
                </P>
                <List items={[
                  "Beauty Blueprint — $39: Personalized product and shade recommendations delivered within 48 hours",
                  "Concierge Beauty Plan — $89: Full makeup routine with curated shopping list and product comparisons",
                  "Concierge Beauty Consultation — $149: Complete plan plus a 30-minute live consultation session",
                  "VIP Beauty Concierge — $299: All-inclusive experience with priority service, extended consultation, and full follow-up support",
                ]} />
                <P>
                  Service fees are published at the time of purchase. {COMPANY} reserves the right to modify pricing with advance notice. Purchases made prior to a price change will be honored at the price displayed at the time of purchase.
                </P>
              </Section>

              <Section title="5. Payment Terms">
                <P>
                  Payment is due in full at the time of service selection. We accept major credit cards and other payment methods made available through our secure third-party payment processors. By providing payment information, you authorize us to charge the applicable fees to your payment method.
                </P>
                <P>
                  We use PCI-DSS-compliant third-party payment processors. We do not store your full payment card number, CVV, or other sensitive payment credentials on our servers.
                </P>
                <P>
                  All transactions are conducted in USD. You are responsible for any currency conversion fees or charges imposed by your financial institution.
                </P>
              </Section>

              <Section title="6. Refund and Revision Policy">
                <P>
                  Due to the custom, time-intensive, and personalized nature of our Beauty Blueprint and consultation services, all fees are non-refundable once your personalized report or consultation has been delivered.
                </P>
                <P>
                  If you are dissatisfied with your Beauty Blueprint, you may request a complimentary revision within seventy-two (72) hours of delivery by contacting us at {EMAIL} and providing specific feedback about your concerns. We will make reasonable efforts to address the issue within 5 business days.
                </P>
                <P>
                  In cases where a service cannot be delivered due to circumstances within our control, we will issue a full refund to your original payment method within 10 business days.
                </P>
              </Section>

              <Section title="7. Independent Advisory Positioning">
                <P>
                  {BRAND} recommends products and services based solely on the information provided by you during the intake process, the results of available analysis data, and the professional judgment of our beauty concierge team. No recommendation is influenced by any commercial relationship, paid placement, or financial incentive from any brand or retailer.
                </P>
                <P>
                  Mention of any brand name, product, retailer, or third party on the Platform does not constitute an endorsement, partnership, sponsorship, or commercial affiliation unless explicitly disclosed in writing by {COMPANY}.
                </P>
                <P>
                  Product links included in your Beauty Blueprint direct you to independent third-party retailer or brand websites. Purchases made through those links are transactions solely between you and the retailer. {COMPANY} is not a party to those transactions and assumes no responsibility for product availability, pricing accuracy, shipping, returns, or customer service provided by third-party retailers.
                </P>
              </Section>

              <Section title="8. Intellectual Property">
                <P>
                  All content on the Platform — including but not limited to text, graphics, logos, design elements, the {BRAND} name and brand identity, Beauty Blueprint report formats, recommendation frameworks, photography, and product curation methodology — is owned by or licensed to {COMPANY} and protected under applicable United States copyright, trademark, and other intellectual property laws.
                </P>
                <P>
                  Your personalized Beauty Blueprint report is generated for your individual, non-commercial personal use only. You may not reproduce, redistribute, sell, sublicense, or publicly display any portion of your Beauty Blueprint or any other Platform content without prior written authorization from {COMPANY}.
                </P>
                <P>
                  "Simply LaRae" and related marks are trademarks of {COMPANY}. Unauthorized use of our trademarks is prohibited and may constitute infringement under applicable law.
                </P>
              </Section>

              <Section title="9. User Conduct and Responsibilities">
                <P>By using the Platform, you agree to:</P>
                <List items={[
                  "Provide accurate, truthful, and complete information during the intake questionnaire and any consultation",
                  "Use the Platform solely for lawful personal beauty advisory purposes",
                  "Not attempt to reverse-engineer, copy, scrape, or resell any portion of the Platform or its underlying technology",
                  "Not submit false, misleading, defamatory, or fraudulent information or misrepresent your identity",
                  "Review all product ingredient lists and perform appropriate patch testing before use, particularly if you have disclosed skin sensitivities or conditions",
                  "Not upload any image that depicts a person other than yourself, or any image depicting a minor",
                  "Not use the Platform in any manner that violates applicable federal, Texas state, or local law",
                ]} />
              </Section>

              <Section title="10. Medical and Dermatological Disclaimer">
                <P>
                  Nothing on the Platform constitutes professional medical, dermatological, pharmacological, or healthcare advice. Our beauty recommendations are provided solely for general informational and beauty guidance purposes. You should consult a licensed dermatologist, physician, or healthcare provider before using any new cosmetic product, particularly if you have known skin conditions, sensitivities, allergies, or are under medical treatment.
                </P>
                <P>
                  {COMPANY} is not liable for any adverse skin reactions, allergic responses, or other health outcomes arising from the use of products recommended through the Platform.
                </P>
              </Section>

              <Section title="11. Disclaimer of Warranties">
                <P>
                  THE PLATFORM IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, {COMPANY.toUpperCase()} EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING WITHOUT LIMITATION IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ANY WARRANTIES ARISING FROM COURSE OF DEALING OR USAGE OF TRADE.
                </P>
                <P>
                  We do not warrant that: (a) the Platform will operate uninterrupted or error-free; (b) any recommendations will produce specific beauty outcomes; (c) any third-party products recommended will be available, accurately priced, or suitable for your individual needs; or (d) defects in the Platform will be corrected.
                </P>
                <P>
                  Cosmetic experiences vary significantly by individual. Individual results depend on numerous factors outside our control, including skin chemistry, application technique, product manufacturing variations, and environmental conditions.
                </P>
              </Section>

              <Section title="12. Limitation of Liability">
                <P>
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL {COMPANY.toUpperCase()}, ITS MEMBERS, MANAGERS, EMPLOYEES, CONTRACTORS, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, LOSS OF DATA, BUSINESS INTERRUPTION, PERSONAL INJURY, PROPERTY DAMAGE, OR LOSS OF GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE PLATFORM, EVEN IF {COMPANY.toUpperCase()} HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                </P>
                <P>
                  {COMPANY}'s total cumulative liability to you for any claim arising under or related to these Terms or your use of the Platform shall not exceed the total amount paid by you to {COMPANY} for the specific service giving rise to the claim during the twelve (12) months preceding the claim.
                </P>
                <P>
                  Some jurisdictions do not allow the exclusion or limitation of certain damages, so some or all of the above limitations may not apply to you. In such jurisdictions, {COMPANY}'s liability is limited to the fullest extent permitted by applicable law.
                </P>
                <P>
                  Notwithstanding any other provision of these Terms, {COMPANY} expressly disclaims all liability for claims arising from or related to: (a) inaccurate, incomplete, or intentionally false information submitted by the User during the intake process or any consultation; (b) the User's failure to disclose known skin conditions, allergies, or sensitivities prior to service; (c) the User's failure to review product ingredient lists or perform recommended patch testing before use; (d) misuse, abuse, or manipulation of the revision request or refund process, including submission of bad-faith or pretextual revision requests after the revision window has expired; (e) chargebacks, payment disputes, or claims filed with financial institutions in bad faith after service delivery; or (f) any harm arising from the User's choice to disregard safety guidance or professional advice provided through the Platform. These exclusions apply regardless of the theory of liability asserted and to the fullest extent permitted by applicable law.
                </P>
                <P>
                  If {COMPANY} is required to defend against any claim, demand, or legal proceeding brought by a User that a court of competent jurisdiction determines to be frivolous, brought in bad faith, or without reasonable factual or legal basis, the User agrees to reimburse {COMPANY} for all reasonable attorneys' fees, court costs, and expenses incurred in defending such claim. This provision is intended to deter abuse of dispute resolution and legal processes and is enforceable under Texas Civil Practice and Remedies Code Chapter 10.
                </P>
              </Section>

              <Section title="13. Indemnification">
                <P>
                  You agree to defend, indemnify, and hold harmless {COMPANY} and its members, managers, employees, contractors, and agents from and against any claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or related to: (a) your use of the Platform in violation of these Terms; (b) your violation of any applicable law or regulation; (c) any information you submit to the Platform that is false, inaccurate, or misleading; or (d) your infringement of any third-party rights.
                </P>
              </Section>

              <Section title="14. Concierge Purchase Service">
                <P>
                  Where {BRAND} offers an optional premium concierge purchase service, such service is made available under separate terms disclosed at the point of engagement. In concierge purchasing mode, {COMPANY} acts as a purchasing facilitator on the customer's behalf, sources products at market price from approved third-party retailers, and charges a disclosed service fee. This service is strictly opt-in and available only where explicitly offered and confirmed in writing.
                </P>
              </Section>

              <Section title="15. Governing Law and Dispute Resolution">
                <P>
                  These Terms shall be governed by, construed, and enforced in accordance with the laws of the State of Texas, without regard to its conflict of law provisions. The United Nations Convention on Contracts for the International Sale of Goods does not apply to these Terms.
                </P>
                <P>
                  Any dispute, controversy, or claim arising out of or relating to these Terms or the Platform shall first be attempted to be resolved through good-faith negotiation between the parties. If informal resolution is unsuccessful within thirty (30) days, the parties agree that exclusive jurisdiction and venue for any legal proceedings shall lie in the state or federal courts located in Texas, and each party irrevocably submits to the personal jurisdiction of those courts.
                </P>
                <P>
                  Nothing in this section shall limit {COMPANY}'s right to seek injunctive or other equitable relief in any court of competent jurisdiction to prevent irreparable harm.
                </P>
              </Section>

              <Section title="16. Severability and Entire Agreement">
                <P>
                  If any provision of these Terms is held invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it enforceable while preserving the intent of the original provision.
                </P>
                <P>
                  These Terms, together with our Privacy Policy and Disclaimer, constitute the entire agreement between you and {COMPANY} with respect to the Platform and supersede all prior or contemporaneous representations, understandings, and agreements.
                </P>
              </Section>

              <Section title="17. Contact Information">
                <P>For questions about these Terms of Service, please contact:</P>
                <P><strong className="font-medium text-foreground">{COMPANY} d/b/a {BRAND}</strong></P>
                <P>Texas, United States of America</P>
                <P>Email: {EMAIL}</P>
                <P>Website: {DOMAIN}</P>
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
