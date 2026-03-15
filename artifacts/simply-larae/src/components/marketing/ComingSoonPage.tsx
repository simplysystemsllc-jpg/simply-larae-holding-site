import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SEO } from "@/components/seo/SEO";
import {
  Sparkles,
  CheckCircle2,
  Shield,
  ScanFace,
  HeartHandshake,
  MapPin,
  Instagram,
  Facebook,
  X,
  CheckCircle,
  Loader2,
} from "lucide-react";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.85a8.17 8.17 0 0 0 4.78 1.52V6.9a4.85 4.85 0 0 1-1.01-.21z" />
    </svg>
  );
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

// ── Shared submit helper ─────────────────────────────────────────────────────

async function submitToContact(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const res = await fetch(`${BASE}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Request failed");
}

// ── Waitlist Modal ───────────────────────────────────────────────────────────

interface WaitlistModalProps {
  open: boolean;
  onClose: () => void;
}

function WaitlistModal({ open, onClose }: WaitlistModalProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setStatus("submitting");
    setErrorMsg("");
    try {
      await submitToContact({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: "Waitlist Request — Simply LaRae",
        message: [
          form.phone ? `Phone: ${form.phone.trim()}` : null,
          form.message.trim() || "No additional message provided.",
        ].filter(Boolean).join("\n"),
      });
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    if (status === "submitting") return;
    onClose();
    setTimeout(() => { setStatus("idle"); setForm({ name: "", email: "", phone: "", message: "" }); setErrorMsg(""); }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="sm:max-w-md rounded-3xl border border-border/50 bg-white p-0 overflow-hidden gap-0">
        <div className="h-1 bg-gradient-to-r from-[#EED4CF] via-[#D9A9A3] to-[#8E6E67]" />
        <div className="p-8">
          <DialogHeader className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] tracking-[0.35em] uppercase text-primary font-medium mb-2">Simply LaRae</p>
                <DialogTitle className="text-xl font-thin tracking-[0.06em] uppercase text-foreground">Join the Waitlist</DialogTitle>
              </div>
              <button onClick={handleClose} aria-label="Close waitlist dialog" className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <DialogDescription className="text-sm text-muted-foreground font-light leading-relaxed mt-2">
              Be among the first to access Simply LaRae when we launch. Leave your details and we'll reach out directly.
            </DialogDescription>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-8 gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-base font-light tracking-wide text-foreground mb-2">You're on the list!</p>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">Thank you for your interest in Simply LaRae. We'll be in touch as we approach our launch date.</p>
                </div>
                <Button onClick={handleClose} className="mt-2 rounded-full px-8 py-5 tracking-widest uppercase text-xs bg-primary hover:bg-primary/90 text-white">Done</Button>
              </motion.div>
            ) : (
              <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground">Full Name <span className="text-primary">*</span></label>
                    <Input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required disabled={status === "submitting"} className="rounded-xl border-border/60 text-sm font-light" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground">Email Address <span className="text-primary">*</span></label>
                    <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required disabled={status === "submitting"} className="rounded-xl border-border/60 text-sm font-light" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground">Phone Number <span className="text-muted-foreground font-light normal-case tracking-normal">(optional)</span></label>
                  <Input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" disabled={status === "submitting"} className="rounded-xl border-border/60 text-sm font-light" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground">Quick Note <span className="text-muted-foreground font-light normal-case tracking-normal">(optional)</span></label>
                  <Textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us what you're most excited about, or how you heard about Simply LaRae..." rows={3} disabled={status === "submitting"} className="rounded-xl border-border/60 text-sm font-light resize-none" />
                </div>
                {status === "error" && <p className="text-xs text-red-500 font-light">{errorMsg}</p>}
                <Button type="submit" disabled={status === "submitting" || !form.name.trim() || !form.email.trim()} className="w-full rounded-full py-5 tracking-widest uppercase text-xs bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/15 disabled:opacity-60">
                  {status === "submitting" ? <span className="flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 animate-spin" />Submitting...</span> : "Join the Waitlist"}
                </Button>
                <p className="text-[10px] text-muted-foreground/60 font-light text-center">Your information is kept private and never shared with third parties.</p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Partnership Modal ────────────────────────────────────────────────────────

interface PartnershipModalProps {
  open: boolean;
  onClose: () => void;
}

function PartnershipModal({ open, onClose }: PartnershipModalProps) {
  const [form, setForm] = useState({ contactName: "", companyName: "", email: "", website: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isValid = form.contactName.trim() && form.companyName.trim() && form.email.trim() && form.message.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setStatus("submitting");
    setErrorMsg("");
    try {
      await submitToContact({
        name: `${form.contactName.trim()} — ${form.companyName.trim()}`,
        email: form.email.trim(),
        subject: "Brand Partnership Inquiry — Simply LaRae",
        message: [
          `Company / Brand: ${form.companyName.trim()}`,
          form.website ? `Website: ${form.website.trim()}` : null,
          `\nPartnership Interest:\n${form.message.trim()}`,
        ].filter(Boolean).join("\n"),
      });
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    if (status === "submitting") return;
    onClose();
    setTimeout(() => { setStatus("idle"); setForm({ contactName: "", companyName: "", email: "", website: "", message: "" }); setErrorMsg(""); }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="sm:max-w-lg rounded-3xl border border-border/50 bg-white p-0 overflow-hidden gap-0">
        <div className="h-1 bg-gradient-to-r from-[#EED4CF] via-[#D9A9A3] to-[#8E6E67]" />
        <div className="p-8">
          <DialogHeader className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] tracking-[0.35em] uppercase text-primary font-medium mb-2">Simply LaRae</p>
                <DialogTitle className="text-xl font-thin tracking-[0.06em] uppercase text-foreground">Brand Partnership Inquiry</DialogTitle>
              </div>
              <button onClick={handleClose} aria-label="Close partnership inquiry dialog" className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <DialogDescription className="text-sm text-muted-foreground font-light leading-relaxed mt-2">
              We're building thoughtful partnerships with select beauty brands. Tell us about your brand and what collaboration looks like for you.
            </DialogDescription>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-8 gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-base font-light tracking-wide text-foreground mb-2">Inquiry Received</p>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">Thank you for reaching out. Our team will review your inquiry and follow up within 2–3 business days.</p>
                </div>
                <Button onClick={handleClose} className="mt-2 rounded-full px-8 py-5 tracking-widest uppercase text-xs bg-primary hover:bg-primary/90 text-white">Done</Button>
              </motion.div>
            ) : (
              <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground">Your Name <span className="text-primary">*</span></label>
                    <Input name="contactName" value={form.contactName} onChange={handleChange} placeholder="Contact name" required disabled={status === "submitting"} className="rounded-xl border-border/60 text-sm font-light" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground">Company / Brand <span className="text-primary">*</span></label>
                    <Input name="companyName" value={form.companyName} onChange={handleChange} placeholder="Brand name" required disabled={status === "submitting"} className="rounded-xl border-border/60 text-sm font-light" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground">Email Address <span className="text-primary">*</span></label>
                    <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@brand.com" required disabled={status === "submitting"} className="rounded-xl border-border/60 text-sm font-light" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground">Brand Website <span className="text-muted-foreground font-light normal-case tracking-normal">(optional)</span></label>
                    <Input name="website" value={form.website} onChange={handleChange} placeholder="yourbrand.com" disabled={status === "submitting"} className="rounded-xl border-border/60 text-sm font-light" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground">Partnership Interest <span className="text-primary">*</span></label>
                  <Textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your brand, the products you'd like considered, and what partnership looks like for you..." rows={4} required disabled={status === "submitting"} className="rounded-xl border-border/60 text-sm font-light resize-none" />
                </div>
                {status === "error" && <p className="text-xs text-red-500 font-light">{errorMsg}</p>}
                <Button type="submit" disabled={status === "submitting" || !isValid} className="w-full rounded-full py-5 tracking-widest uppercase text-xs bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/15 disabled:opacity-60">
                  {status === "submitting" ? <span className="flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 animate-spin" />Submitting...</span> : "Submit Inquiry"}
                </Button>
                <p className="text-[10px] text-muted-foreground/60 font-light text-center leading-relaxed">
                  Simply LaRae is an independent advisory platform. We do not accept pay-to-play placements. All partnerships are disclosed transparently.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Animation helpers ────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: "easeOut" },
};

const fadeUpDelay = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: "easeOut", delay },
});

// ── Main Page ────────────────────────────────────────────────────────────────

export default function ComingSoonPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [partnershipOpen, setPartnershipOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-background">
      <SEO
        title="Simply LaRae — Personalized Beauty Concierge | Launching Soon"
        description="Simply LaRae is a luxury beauty advisory platform by Simply Integrated, LLC. AI-powered facial analysis + expert concierge = personalized makeup recommendations, exact shade matches, and curated routines built for your face. Join the waitlist."
        keywords="simply larae, personalized beauty, beauty concierge, facial analysis makeup, shade matching, beauty blueprint, custom makeup routine, personalized beauty recommendations, beauty advisory platform, launching soon, beauty tech, simply integrated"
        canonical="/"
      />
      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
      <PartnershipModal open={partnershipOpen} onClose={() => setPartnershipOpen(false)} />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#EED4CF]/30 via-background to-background/80" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-[#EED4CF]/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#D9A9A3]/15 blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <p className="text-[10px] tracking-[0.45em] uppercase text-primary font-medium mb-10">
              Simply Integrated, LLC
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-thin tracking-[0.08em] text-foreground leading-none mb-6">
              Simply LaRae
            </h1>
            <p className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-foreground/50 font-light mb-10">
              Personalized Beauty Powered by Facial Analysis
            </p>
            <p className="text-base md:text-lg text-foreground/65 font-light leading-relaxed max-w-2xl mx-auto mb-6">
              Simply LaRae is a luxury beauty advisory platform designed to help women discover the right products, shades, and routines with confidence.
            </p>
            <p className="text-base md:text-lg text-foreground/65 font-light leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-16">
              Our concierge-driven beauty experience combines personalized beauty guidance, future-facing facial analysis, and curated product recommendations tailored to each individual.
            </p>
          </motion.div>

          <motion.div {...fadeUpDelay(0.2)}>
            <div className="flex items-center justify-center gap-4 mb-10">
              <span className="h-px w-12 bg-primary/30" />
              <Sparkles className="w-4 h-4 text-primary" strokeWidth={1.5} />
              <span className="h-px w-12 bg-primary/30" />
            </div>
            <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-3">Launching Soon</p>
            <p className="text-sm text-muted-foreground font-light mb-10">
              For early access or brand partnership inquiries, contact our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setWaitlistOpen(true)}
                size="lg"
                className="rounded-full px-10 py-7 text-sm tracking-widest uppercase bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all hover:-translate-y-0.5"
              >
                Join the Waitlist
              </Button>
              <Button
                onClick={() => setPartnershipOpen(true)}
                variant="outline"
                size="lg"
                className="rounded-full px-10 py-7 text-sm tracking-widest uppercase border-foreground/20 text-foreground hover:bg-foreground/5 transition-all hover:-translate-y-0.5"
              >
                Brand Partnerships
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.7 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="flex flex-col items-center gap-1 text-foreground/30">
            <span className="text-[9px] tracking-[0.25em] uppercase">Learn More</span>
            <div className="w-px h-8 bg-gradient-to-b from-foreground/20 to-transparent mt-1" />
          </div>
        </motion.div>
      </section>

      {/* ── PLATFORM OVERVIEW ── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-[10px] tracking-[0.35em] uppercase text-primary font-medium mb-4">The Platform</p>
            <h2 className="text-3xl md:text-4xl font-thin tracking-[0.08em] uppercase mb-6 text-foreground">
              Beauty Engineered for Every Face
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed text-sm">
              Three pillars differentiate Simply LaRae from every generic quiz or chatbot recommendation you've encountered before.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: ScanFace, title: "Facial Analysis", desc: "AI analyzes your facial structure, undertones, and features to build a data-backed beauty profile unique to you.", num: "01" },
              { icon: Sparkles, title: "Personalized Blueprint", desc: "Receive curated product recommendations and routines tailored to your specific features — from primer to setting spray.", num: "02" },
              { icon: HeartHandshake, title: "Concierge Guidance", desc: "Expert concierge review ensures every recommendation truly fits — the right shades, the right formulas, the right routine.", num: "03" },
            ].map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}>
                <div className="bg-background rounded-3xl p-8 border border-border/40 hover:border-primary/20 hover:shadow-lg transition-all duration-400 h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-border/40 flex items-center justify-center shadow-sm">
                      <feature.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <span className="text-4xl font-thin text-foreground/10 tracking-tight select-none">{feature.num}</span>
                  </div>
                  <h3 className="text-xs uppercase tracking-widest font-medium mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR BEAUTY BRANDS ── */}
      <section className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <div className="border border-border/50 rounded-3xl overflow-hidden bg-white shadow-sm">
              <div className="h-1 bg-gradient-to-r from-[#EED4CF] via-[#D9A9A3] to-[#8E6E67]" />
              <div className="p-6 sm:p-10 md:p-14">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <p className="text-[10px] tracking-[0.35em] uppercase text-primary font-medium mb-4">For Beauty Brands</p>
                    <h2 className="text-3xl md:text-4xl font-thin tracking-[0.06em] uppercase mb-6 text-foreground leading-tight">
                      Partner With<br />Simply LaRae
                    </h2>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed mb-5">
                      Simply LaRae is building a personalized beauty recommendation platform designed to connect customers with products that fit their unique beauty profile, preferences, and routine goals.
                    </p>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8">
                      We are currently exploring early conversations with select beauty brands interested in thoughtful partnership opportunities, product consideration, and future recommendation visibility.
                    </p>
                    <div className="space-y-3 mb-10">
                      {[
                        "Personalized beauty recommendations",
                        "Customer-fit product matching",
                        "Premium beauty guidance experience",
                        "Future partnership opportunities",
                      ].map((point, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={1.5} />
                          <p className="text-sm text-foreground/80 font-light">{point}</p>
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={() => setPartnershipOpen(true)}
                      className="rounded-full px-8 py-6 tracking-widest uppercase text-sm bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/15 transition-all hover:-translate-y-0.5"
                    >
                      Partnership Inquiry
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { value: "4", label: "Service Tiers", sub: "From Blueprint to VIP" },
                        { value: "100%", label: "Independent", sub: "No pay-to-play, ever" },
                        { value: "24–48h", label: "Turnaround", sub: "Blueprint delivery" },
                        { value: "Fit-First", label: "Rec Logic", sub: "Face-data drives results" },
                      ].map((stat, i) => (
                        <div key={i} className="bg-background rounded-2xl p-5 border border-border/40 text-center">
                          <p className="text-2xl md:text-3xl font-thin text-foreground mb-1">{stat.value}</p>
                          <p className="text-[9px] uppercase tracking-[0.2em] font-semibold text-foreground mb-0.5">{stat.label}</p>
                          <p className="text-[10px] text-muted-foreground font-light">{stat.sub}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
                      <div className="flex items-start gap-3">
                        <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                        <div>
                          <p className="text-[10px] uppercase tracking-widest font-semibold text-foreground mb-1">Our Independence Commitment</p>
                          <p className="text-xs text-muted-foreground font-light leading-relaxed">
                            Simply LaRae is an independent advisory platform. We do not accept sponsored placements or pay-to-play recommendations. Any partnership is disclosed transparently to our clients.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 bg-white border-t border-border/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center gap-8">
            <div>
              <p className="text-2xl font-thin tracking-[0.2em] text-foreground mb-2">Simply LaRae</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-medium">Simply Integrated, LLC</p>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
              <p className="text-xs font-light tracking-wide">Texas, United States of America</p>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/simply_larae_beauty?igsh=eHVoY2FoN3U4eTB2" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground/70 hover:bg-primary hover:text-white transition-all border border-border/40">
                <Instagram className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a href="https://www.facebook.com/share/1aaqPJsQUb/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground/70 hover:bg-primary hover:text-white transition-all border border-border/40">
                <Facebook className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a href="https://www.tiktok.com/@simplylarae?_r=1&_t=ZP-94inDKme8vm" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground/70 hover:bg-primary hover:text-white transition-all border border-border/40">
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <button onClick={() => setWaitlistOpen(true)} className="min-h-[44px] px-3 py-2 text-[11px] uppercase tracking-widest font-medium text-primary hover:text-foreground transition-colors">
                Join Waitlist
              </button>
              <span className="text-border/60 text-xs" aria-hidden="true">·</span>
              <button onClick={() => setPartnershipOpen(true)} className="min-h-[44px] px-3 py-2 text-[11px] uppercase tracking-widest font-medium text-primary hover:text-foreground transition-colors">
                Brand Partnerships
              </button>
              <span className="text-border/60 text-xs" aria-hidden="true">·</span>
              <a href="/privacy" className="min-h-[44px] inline-flex items-center px-3 py-2 text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors font-light">Privacy Policy</a>
              <span className="text-border/60 text-xs" aria-hidden="true">·</span>
              <a href="/terms" className="min-h-[44px] inline-flex items-center px-3 py-2 text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors font-light">Terms</a>
              <span className="text-border/60 text-xs" aria-hidden="true">·</span>
              <a href="/disclaimer" className="min-h-[44px] inline-flex items-center px-3 py-2 text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors font-light">Disclaimer</a>
            </div>
            <div className="max-w-xl">
              <p className="text-[11px] text-muted-foreground/60 font-light leading-relaxed text-center">
                Simply LaRae is an independent beauty advisory platform and is not affiliated with, endorsed by, or partnered with any retailer or brand unless explicitly stated.
              </p>
              <p className="text-[10px] text-muted-foreground/40 font-light mt-3">
                © {new Date().getFullYear()} Simply Integrated, LLC · All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
