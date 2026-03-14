import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubmitContact } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, MapPin, Handshake, Clock } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const GENERAL_MAILTO =
  "mailto:simplylarae.dba@gmail.com?subject=Simply%20LaRae%20Inquiry&body=Hi%20Simply%20LaRae%20team,%0A%0AI%20have%20a%20question%20about:";

const PARTNERSHIP_MAILTO =
  "mailto:simplylarae.dba@gmail.com?subject=Simply%20LaRae%20Brand%20Partnership%20Inquiry&body=Hello%20Simply%20LaRae,%0A%0AOur%20brand%20is%20interested%20in%20exploring%20a%20partnership.";

export default function Contact() {
  const { toast } = useToast();
  const submitContact = useSubmitContact();

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    submitContact.mutate({ data }, {
      onSuccess: () => {
        toast({ title: "Inquiry Sent", description: "Our concierge team will reply within 24 hours." });
        form.reset();
      },
      onError: () => {
        toast({ title: "Error", description: "Failed to send inquiry. Please try again.", variant: "destructive" });
      },
    });
  };

  return (
    <div className="w-full bg-white pb-32">
      {/* Page header */}
      <section className="pt-24 pb-16 px-4 bg-background border-b border-border/50 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-4">
          Simply LaRae
        </p>
        <h1 className="text-4xl md:text-5xl font-thin tracking-[0.15em] uppercase mb-6 text-foreground">
          Contact Us
        </h1>
        <p className="text-lg text-muted-foreground font-light tracking-wide max-w-xl mx-auto leading-relaxed">
          We're here to guide your beauty journey. Reach out with questions, inquiries, or partnership interest.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Left column — contact info */}
          <div>
            <h2 className="text-2xl font-light tracking-widest uppercase mb-10 text-foreground">
              Get in Touch
            </h2>

            <div className="space-y-8 mb-10">

              {/* Email */}
              <div className="flex items-start">
                <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center mr-4 flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground mb-1.5">
                    Email
                  </h3>
                  <a
                    href={GENERAL_MAILTO}
                    className="text-[#6E544E] font-medium text-sm no-underline border-b border-[#D9A9A3] pb-0.5 transition-all duration-200 hover:text-[#8E6E67] hover:border-[#8E6E67]"
                  >
                    Contact our team
                  </a>
                </div>
              </div>

              {/* Brand Partnerships */}
              <div className="flex items-start">
                <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center mr-4 flex-shrink-0 mt-0.5">
                  <Handshake className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground mb-1.5">
                    Brand Partnerships
                  </h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed mb-2">
                    Beauty brands interested in collaboration opportunities can reach us directly.
                  </p>
                  <a
                    href={PARTNERSHIP_MAILTO}
                    className="text-[#6E544E] font-medium text-sm no-underline border-b border-[#D9A9A3] pb-0.5 transition-all duration-200 hover:text-[#8E6E67] hover:border-[#8E6E67]"
                  >
                    Partnership Inquiry
                  </a>
                </div>
              </div>

              {/* Headquarters */}
              <div className="flex items-start">
                <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center mr-4 flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground mb-1.5">
                    Headquarters
                  </h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    Simply Integrated, LLC<br />
                    Texas, United States of America
                  </p>
                </div>
              </div>

            </div>

            {/* Concierge Hours */}
            <div className="p-8 bg-background rounded-3xl border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-4 h-4 text-primary" strokeWidth={1.5} />
                <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">
                  Concierge Hours
                </h3>
              </div>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Monday – Friday: 9am – 6pm CST<br />
                Saturday: 10am – 2pm CST<br />
                Closed Sundays
              </p>
            </div>

            {/* Independence note */}
            <p className="text-[11px] text-muted-foreground/60 font-light leading-relaxed mt-6">
              Simply LaRae is an independent beauty advisory platform and is not affiliated with, endorsed by, or partnered with any retailer or brand unless explicitly stated.
            </p>
          </div>

          {/* Right column — contact form */}
          <div className="bg-background/50 p-8 rounded-3xl border border-border">
            <h2 className="text-2xl font-light tracking-widest uppercase mb-8 text-foreground">
              Send an Inquiry
            </h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Name</FormLabel>
                    <FormControl>
                      <Input className="bg-white h-12 rounded-xl border-border/50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Email</FormLabel>
                    <FormControl>
                      <Input type="email" className="bg-white h-12 rounded-xl border-border/50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="subject" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Subject</FormLabel>
                    <FormControl>
                      <Input className="bg-white h-12 rounded-xl border-border/50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Message</FormLabel>
                    <FormControl>
                      <Textarea className="bg-white min-h-[150px] rounded-xl border-border/50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button
                  type="submit"
                  disabled={submitContact.isPending}
                  className="w-full rounded-full uppercase tracking-widest text-xs h-12 bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20"
                >
                  {submitContact.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Send Inquiry"
                  )}
                </Button>
              </form>
            </Form>
          </div>

        </div>
      </section>
    </div>
  );
}
