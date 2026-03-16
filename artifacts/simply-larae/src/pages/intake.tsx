import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { saveIntakeData, saveServiceId, getIntakeData } from "@/lib/session";
import { ArrowLeft, ArrowRight } from "lucide-react";

const intakeSchema = z.object({
  // Step 1 – Basic Info
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  ageRange: z.string().min(1, "Required"),

  // Step 2 – Skin Profile
  skinType: z.string().min(1, "Required"),
  skinTone: z.string().min(1, "Required"),
  undertone: z.string().min(1, "Required"),
  sensitivities: z.string().optional(),

  // Step 3 – Personal Features
  hairColor: z.string().optional(),
  eyeColor: z.string().optional(),
  hasFreckles: z.string().optional(),

  // Step 4 – Habits & Preferences
  makeupExperience: z.string().min(1, "Required"),
  preferredBrands: z.string().optional(),
  dislikedBrands: z.string().optional(),
  budgetPreference: z.string().min(1, "Required"),
  makeupStyle: z.string().min(1, "Required"),
  desiredCoverage: z.string().optional(),
  preferredFinish: z.string().optional(),

  // Step 5 – Product Preferences
  primerType: z.string().optional(),
  foundationPreference: z.string().optional(),
  concealerNeeded: z.string().optional(),
  blushPreference: z.string().optional(),
  bronzerPreference: z.string().optional(),
  highlighterInterest: z.string().optional(),
  eyeProductPreferences: z.string().optional(),
  lipProductPreferences: z.string().optional(),
  settingPowderNeeded: z.string().optional(),
  settingSprayNeeded: z.string().optional(),
  applicationMethodPreference: z.string().optional(),
  routinePreference: z.string().optional(),

  // Step 6 – Goals & Use Case
  everydayGoals: z.string().optional(),
  eventNeeds: z.string().optional(),
  biggestFrustration: z.string().optional(),
  drugstoreOrHighEnd: z.string().optional(),
});

type IntakeFormValues = z.infer<typeof intakeSchema>;

const RGroup = ({ values, field }: { values: string[]; field: any }) => (
  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-2">
    {values.map((val) => (
      <FormItem key={val} className="flex items-center space-x-3 space-y-0 bg-background/60 p-3.5 rounded-xl border border-transparent hover:border-primary/20 transition-colors">
        <FormControl><RadioGroupItem value={val} /></FormControl>
        <FormLabel className="font-light cursor-pointer text-sm">{val}</FormLabel>
      </FormItem>
    ))}
  </RadioGroup>
);

const RGroupGrid = ({ values, field, cols = "grid-cols-1 md:grid-cols-2" }: { values: string[]; field: any; cols?: string }) => (
  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className={`grid ${cols} gap-3`}>
    {values.map((val) => (
      <FormItem key={val} className="flex items-center space-x-3 space-y-0 bg-background/60 p-3.5 rounded-xl border border-transparent hover:border-primary/20 transition-colors">
        <FormControl><RadioGroupItem value={val} /></FormControl>
        <FormLabel className="font-light cursor-pointer text-sm">{val}</FormLabel>
      </FormItem>
    ))}
  </RadioGroup>
);

export default function Intake() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceId = params.get("serviceId");
    if (serviceId) {
      saveServiceId(parseInt(serviceId, 10));
    } else {
      setLocation("/services");
    }
  }, [setLocation]);

  const form = useForm<IntakeFormValues>({
    resolver: zodResolver(intakeSchema),
    defaultValues: getIntakeData() || {
      fullName: "", email: "", ageRange: "", skinType: "", skinTone: "", undertone: "",
      makeupExperience: "", budgetPreference: "", makeupStyle: "",
    },
    mode: "onTouched",
  });

  const nextStep = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    let fieldsToValidate: string[] = [];
    if (step === 1) fieldsToValidate = ["fullName", "email", "ageRange"];
    if (step === 2) fieldsToValidate = ["skinType", "skinTone", "undertone"];
    if (step === 4) fieldsToValidate = ["makeupExperience", "budgetPreference", "makeupStyle"];

    const isValid = fieldsToValidate.length > 0
      ? await form.trigger(fieldsToValidate as any)
      : true;

    if (isValid) {
      saveIntakeData(form.getValues());
      setStep((s) => Math.min(s + 1, totalSteps));
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo(0, 0);
  };

  const onSubmit = (data: IntakeFormValues) => {
    saveIntakeData(data);
    setLocation("/upload");
  };

  const stepLabels = ["Basic Info", "Skin Profile", "Features", "Preferences", "Products", "Goals"];

  const StepIndicator = () => (
    <div className="flex justify-center mb-10">
      <div className="flex items-center">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold transition-all duration-300 ${
                i + 1 === step ? "bg-primary text-white shadow-md shadow-primary/30" : 
                i + 1 < step ? "bg-primary/30 text-primary" : "bg-border/60 text-muted-foreground"
              }`}>{i + 1}</div>
              <span className={`text-[9px] uppercase tracking-wider hidden md:block whitespace-nowrap transition-colors ${
                i + 1 === step ? "text-primary font-semibold" : "text-muted-foreground"
              }`}>{stepLabels[i]}</span>
            </div>
            {i < totalSteps - 1 && (
              <div className={`w-8 md:w-12 h-px mx-2 mb-4 transition-colors ${i + 1 < step ? "bg-primary/40" : "bg-border/40"}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-[90vh] bg-background py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-2">Simply LaRae</p>
          <h1 className="text-3xl font-thin tracking-[0.15em] uppercase text-foreground mb-1">Beauty Profile</h1>
          <p className="text-sm text-muted-foreground font-light">Step {step} of {totalSteps} — {stepLabels[step - 1]}</p>
        </div>

        <StepIndicator />

        <div className="bg-white rounded-3xl shadow-xl shadow-primary/5 p-8 md:p-12 border border-border/50">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >

                  {/* STEP 1 – Basic Information */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-lg uppercase tracking-widest font-light border-b border-border pb-4 mb-6">Basic Information</h2>
                      <FormField control={form.control} name="fullName" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Full Name *</FormLabel>
                          <FormControl><Input placeholder="Jane Doe" className="bg-background/50 h-12 rounded-xl" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Email Address *</FormLabel>
                          <FormControl><Input placeholder="jane@example.com" type="email" className="bg-background/50 h-12 rounded-xl" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="ageRange" render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Age Range *</FormLabel>
                          <FormControl>
                            <RGroupGrid values={["18–24", "25–34", "35–44", "45+"]} field={field} cols="grid-cols-2 md:grid-cols-4" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  )}

                  {/* STEP 2 – Skin Profile */}
                  {step === 2 && (
                    <div className="space-y-8">
                      <h2 className="text-lg uppercase tracking-widest font-light border-b border-border pb-4 mb-6">Your Skin Canvas</h2>
                      <FormField control={form.control} name="skinType" render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Skin Type *</FormLabel>
                          <FormControl>
                            <RGroupGrid values={["Dry", "Oily", "Combination", "Normal", "Sensitive"]} field={field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField control={form.control} name="skinTone" render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Skin Tone *</FormLabel>
                            <FormControl><RGroup values={["Fair", "Light", "Light Medium", "Medium", "Tan", "Deep", "Rich"]} field={field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="undertone" render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Undertone *</FormLabel>
                            <FormControl><RGroup values={["Cool (Pink/Blue)", "Warm (Yellow/Gold)", "Neutral", "Olive", "Not Sure"]} field={field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      <FormField control={form.control} name="sensitivities" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Known Allergies / Sensitivities</FormLabel>
                          <FormControl><Textarea placeholder="e.g. Fragrance, Niacinamide, Parabens..." className="bg-background/50 rounded-xl resize-none" {...field} /></FormControl>
                        </FormItem>
                      )} />
                    </div>
                  )}

                  {/* STEP 3 – Personal Features */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-lg uppercase tracking-widest font-light border-b border-border pb-4 mb-6">Personal Features</h2>
                      <p className="text-xs text-muted-foreground font-light -mt-4">These details help us select colors and undertones that complement your natural features.</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="hairColor" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Natural Hair Color</FormLabel>
                            <FormControl><Input placeholder="e.g. Dark brown, auburn..." className="bg-background/50 h-12 rounded-xl" {...field} /></FormControl>
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="eyeColor" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Eye Color</FormLabel>
                            <FormControl><Input placeholder="e.g. Brown, hazel, green..." className="bg-background/50 h-12 rounded-xl" {...field} /></FormControl>
                          </FormItem>
                        )} />
                      </div>
                      <FormField control={form.control} name="hasFreckles" render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Do You Have Freckles?</FormLabel>
                          <FormControl>
                            <RGroupGrid values={["Yes — I love them and want to show them", "Yes — I'd prefer to minimize them", "No / Not really"]} field={field} />
                          </FormControl>
                        </FormItem>
                      )} />
                    </div>
                  )}

                  {/* STEP 4 – Makeup Habits & Budget */}
                  {step === 4 && (
                    <div className="space-y-8">
                      <h2 className="text-lg uppercase tracking-widest font-light border-b border-border pb-4 mb-6">Habits & Preferences</h2>
                      <FormField control={form.control} name="makeupExperience" render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Makeup Experience *</FormLabel>
                          <FormControl>
                            <RGroupGrid values={["Beginner — I'm just starting", "Intermediate — I know the basics", "Advanced — Makeup is my thing"]} field={field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="budgetPreference" render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Budget Preference *</FormLabel>
                          <FormControl>
                            <RGroupGrid values={["Drugstore ($)", "Mid-range ($$)", "High-end ($$$)", "Mix of all ranges"]} field={field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="makeupStyle" render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Desired Everyday Look *</FormLabel>
                          <FormControl>
                            <RGroupGrid values={["No-Makeup Makeup", "Soft Glam", "Full Glam", "Just the essentials (concealer + mascara)"]} field={field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="desiredCoverage" render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Desired Coverage</FormLabel>
                            <FormControl><RGroup values={["Light / Skin Tint", "Medium", "Full", "Buildable"]} field={field} /></FormControl>
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="preferredFinish" render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Preferred Finish</FormLabel>
                            <FormControl><RGroup values={["Matte", "Natural / Skin-like", "Dewy / Luminous", "Satin", "Flexible"]} field={field} /></FormControl>
                          </FormItem>
                        )} />
                      </div>
                      <FormField control={form.control} name="preferredBrands" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Preferred Brands (if any)</FormLabel>
                          <FormControl><Input placeholder="e.g. Armani, Rare Beauty, NYX..." className="bg-background/50 h-12 rounded-xl" {...field} /></FormControl>
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="dislikedBrands" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Brands You Avoid</FormLabel>
                          <FormControl><Input placeholder="Any brands that haven't worked for you..." className="bg-background/50 h-12 rounded-xl" {...field} /></FormControl>
                        </FormItem>
                      )} />
                    </div>
                  )}

                  {/* STEP 5 – Product Preferences */}
                  {step === 5 && (
                    <div className="space-y-8">
                      <h2 className="text-lg uppercase tracking-widest font-light border-b border-border pb-4 mb-2">Product Preferences</h2>
                      <p className="text-xs text-muted-foreground font-light -mt-4">Tell us what you want included in your routine. Select the products that apply to you.</p>

                      <FormField control={form.control} name="primerType" render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Primer Preference</FormLabel>
                          <FormControl>
                            <RGroupGrid values={[
                              "Water-based (for oily/combo skin or dewy finish)",
                              "Silicone-based (for smooth, pore-minimizing coverage)",
                              "Hydrating primer (for dry skin)",
                              "Color-correcting primer",
                              "No primer — I skip this step",
                              "Not sure — recommend one for me"
                            ]} field={field} />
                          </FormControl>
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="foundationPreference" render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Foundation / Base Product</FormLabel>
                          <FormControl>
                            <RGroupGrid values={[
                              "Full-coverage foundation",
                              "Medium-coverage foundation",
                              "Skin tint or BB cream",
                              "Tinted moisturizer",
                              "Powder foundation",
                              "I layer multiple base products"
                            ]} field={field} />
                          </FormControl>
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="concealerNeeded" render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Concealer</FormLabel>
                          <FormControl>
                            <RGroupGrid values={[
                              "Yes — I need under-eye coverage",
                              "Yes — For spot concealing",
                              "Both under-eye and spot concealing",
                              "Not really — I skip concealer"
                            ]} field={field} />
                          </FormControl>
                        </FormItem>
                      )} />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="blushPreference" render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Blush Type</FormLabel>
                            <FormControl><RGroup values={["Powder blush", "Cream blush", "Liquid blush", "No blush — I skip it"]} field={field} /></FormControl>
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="bronzerPreference" render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Bronzer / Contour</FormLabel>
                            <FormControl><RGroup values={["Yes — I use bronzer", "Yes — I contour", "Both bronzer and contour", "No — I skip this step"]} field={field} /></FormControl>
                          </FormItem>
                        )} />
                      </div>

                      <FormField control={form.control} name="highlighterInterest" render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Highlighter</FormLabel>
                          <FormControl>
                            <RGroupGrid values={["Yes — I love a glow", "Subtle highlight only", "No — I prefer matte finish"]} field={field} />
                          </FormControl>
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="eyeProductPreferences" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Eye Products I Use (or want)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="e.g. Mascara always, eyeliner sometimes, no eyeshadow..."
                              className="bg-background/50 rounded-xl resize-none min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="lipProductPreferences" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Lip Products I Prefer</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="e.g. Tinted lip balm daily, lipstick for events, glossy finish..."
                              className="bg-background/50 rounded-xl resize-none min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )} />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="settingPowderNeeded" render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Setting Powder</FormLabel>
                            <FormControl><RGroup values={["Yes — translucent", "Yes — tinted", "No — I skip powder", "Not sure"]} field={field} /></FormControl>
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="settingSprayNeeded" render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Setting / Finishing Spray</FormLabel>
                            <FormControl><RGroup values={["Yes — matte finish", "Yes — dewy / hydrating", "Yes — strong hold", "No — I skip this"]} field={field} /></FormControl>
                          </FormItem>
                        )} />
                      </div>

                      <FormField control={form.control} name="applicationMethodPreference" render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Preferred Application Method</FormLabel>
                          <FormControl>
                            <RGroupGrid values={[
                              "Sponge / Beautyblender",
                              "Foundation brush",
                              "Fingers",
                              "I mix methods",
                              "I want guidance on which to use"
                            ]} field={field} />
                          </FormControl>
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="routinePreference" render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Routine Preference</FormLabel>
                          <FormControl>
                            <RGroupGrid values={[
                              "Quick — under 5 minutes daily",
                              "Moderate — 10–15 minutes",
                              "Full routine — I enjoy the process",
                              "Depends on the day — give me both"
                            ]} field={field} />
                          </FormControl>
                        </FormItem>
                      )} />
                    </div>
                  )}

                  {/* STEP 6 – Goals & Use Case */}
                  {step === 6 && (
                    <div className="space-y-6">
                      <h2 className="text-lg uppercase tracking-widest font-light border-b border-border pb-4 mb-6">Your Goals</h2>
                      <FormField control={form.control} name="everydayGoals" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Primary Everyday Makeup Goal</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="e.g. Even out my skin tone, cover dark circles, find a quick routine under 5 minutes..."
                              className="bg-background/50 rounded-xl min-h-[100px] resize-none"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="eventNeeds" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Any Special Event Needs?</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="e.g. Wedding in June, business headshots, date nights..."
                              className="bg-background/50 rounded-xl min-h-[80px] resize-none"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="biggestFrustration" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Biggest Beauty Shopping Frustration</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="e.g. Foundation always looks cakey, mascara smudges, can't find my shade..."
                              className="bg-background/50 rounded-xl min-h-[80px] resize-none"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="drugstoreOrHighEnd" render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Drugstore or High-End?</FormLabel>
                          <FormControl>
                            <RGroupGrid values={[
                              "Drugstore only — I prioritize value",
                              "High-end only — I invest in quality",
                              "Mix it up — best value at each price point",
                              "Open to whatever works best for me"
                            ]} field={field} />
                          </FormControl>
                        </FormItem>
                      )} />
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between pt-8 border-t border-border/50">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={step === 1}
                  className="rounded-full uppercase tracking-widest text-xs px-6 border-border"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>

                {step < totalSteps ? (
                  <Button
                    type="button"
                    onClick={(e) => nextStep(e)}
                    className="rounded-full uppercase tracking-widest text-xs px-8 bg-primary hover:bg-primary/90 text-white"
                  >
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="rounded-full uppercase tracking-widest text-xs px-8 bg-foreground hover:bg-foreground/90 text-white"
                  >
                    Continue to Upload <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
