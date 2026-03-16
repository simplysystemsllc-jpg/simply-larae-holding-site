import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useListServices } from "@workspace/api-client-react";
import { useQuery } from "@tanstack/react-query";
import {
  Users,
  Package,
  ClipboardList,
  ShoppingBag,
  Store,
  Star,
  CheckCircle2,
  Clock,
  RefreshCw,
  ChevronRight,
  BarChart3,
  Settings,
  FileText,
  Zap,
  Building2,
  ExternalLink,
  Shield,
  Handshake,
} from "lucide-react";

type WorkflowStatus =
  | "new"
  | "intake submitted"
  | "selfie uploaded"
  | "paid"
  | "in review"
  | "recommendation drafted"
  | "expert reviewed"
  | "delivered"
  | "follow-up pending"
  | "closed";

const STATUS_COLORS: Record<WorkflowStatus, string> = {
  new: "bg-border text-muted-foreground",
  "intake submitted": "bg-blue-50 text-blue-600",
  "selfie uploaded": "bg-purple-50 text-purple-600",
  paid: "bg-green-50 text-green-600",
  "in review": "bg-yellow-50 text-yellow-700",
  "recommendation drafted": "bg-orange-50 text-orange-600",
  "expert reviewed": "bg-primary/10 text-primary",
  delivered: "bg-emerald-50 text-emerald-600",
  "follow-up pending": "bg-pink-50 text-pink-600",
  closed: "bg-gray-50 text-gray-400",
};

const mockSubmissions = [
  { id: 1, name: "Sarah Mitchell", email: "s.mitchell@email.com", service: "Concierge Beauty Plan", status: "in review" as WorkflowStatus, date: "Mar 14, 2026" },
  { id: 2, name: "Jade Thompson", email: "jade.t@email.com", service: "VIP Beauty Concierge", status: "paid" as WorkflowStatus, date: "Mar 13, 2026" },
  { id: 3, name: "Priya Patel", email: "priya@email.com", service: "Beauty Blueprint", status: "delivered" as WorkflowStatus, date: "Mar 12, 2026" },
  { id: 4, name: "Camille Dubois", email: "c.dubois@email.com", service: "Concierge Beauty Consultation", status: "expert reviewed" as WorkflowStatus, date: "Mar 11, 2026" },
  { id: 5, name: "Amara Johnson", email: "amara.j@email.com", service: "Beauty Blueprint", status: "new" as WorkflowStatus, date: "Mar 11, 2026" },
];

const mockBrands = [
  { id: 1, name: "NARS Cosmetics", status: "potential", contactEmail: "—", website: "narscosmetics.com", notes: "Strong shade range, inclusivity alignment. Priority outreach." },
  { id: 2, name: "e.l.f. Cosmetics", status: "potential", contactEmail: "—", website: "elfcosmetics.com", notes: "Best drugstore brand for budget-first clients. Excellent inclusivity." },
  { id: 3, name: "Rare Beauty", status: "potential", contactEmail: "—", website: "rarebeauty.com", notes: "Shade-inclusive, accessible positioning matches our values." },
  { id: 4, name: "Milani Cosmetics", status: "potential", contactEmail: "—", website: "milanicosmetics.com", notes: "Drugstore price point with excellent pigment quality." },
  { id: 5, name: "Laura Mercier", status: "potential", contactEmail: "—", website: "lauramercier.com", notes: "Setting powder is recommended frequently. Educational partnership opportunity." },
];

const PARTNERSHIP_STATUS_COLORS: Record<string, string> = {
  potential: "bg-blue-50 text-blue-600",
  outreach_sent: "bg-yellow-50 text-yellow-700",
  in_discussion: "bg-orange-50 text-orange-600",
  active: "bg-green-50 text-green-600",
  declined: "bg-gray-100 text-gray-400",
  paused: "bg-border text-muted-foreground",
};

const TABS = ["Overview", "Submissions", "Products", "Retailers", "Brands", "Services"] as const;
type Tab = typeof TABS[number];

const StatCard = ({ icon: Icon, label, value, sub }: any) => (
  <Card className="rounded-2xl border border-border/40 bg-white shadow-sm hover:shadow-md transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">{label}</p>
          <p className="text-3xl font-thin text-foreground">{value}</p>
          {sub && <p className="text-xs text-muted-foreground font-light mt-1">{sub}</p>}
        </div>
        <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function Admin() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const { data: services } = useListServices();
  const { data: retailers, isLoading: retailersLoading } = useQuery<any[]>({
    queryKey: ["/api/retailers/all"],
    queryFn: async () => {
      const res = await fetch("/api/retailers/all");
      if (!res.ok) throw new Error("Failed to fetch retailers");
      return res.json();
    },
  });

  return (
    <div className="w-full min-h-screen bg-background pb-24">
      {/* Header */}
      <section className="pt-20 pb-10 px-4 bg-white border-b border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-1">Simply LaRae</p>
              <h1 className="text-3xl font-thin tracking-[0.1em] uppercase text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground font-light mt-1">Simply Integrated, LLC · Internal Operations</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="rounded-full text-xs uppercase tracking-wider border-border gap-2">
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </Button>
              <Button size="sm" className="rounded-full text-xs uppercase tracking-wider bg-primary text-white gap-2">
                <Settings className="w-3.5 h-3.5" /> Settings
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-1 mb-8 bg-white rounded-2xl p-1.5 border border-border/40 shadow-sm w-fit">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-widest font-medium transition-all ${
                activeTab === tab
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "Overview" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard icon={Users} label="Total Clients" value="5" sub="Across all tiers" />
              <StatCard icon={ClipboardList} label="Active Submissions" value="3" sub="Awaiting review" />
              <StatCard icon={CheckCircle2} label="Delivered" value="1" sub="This week" />
              <StatCard icon={BarChart3} label="Revenue (Est.)" value="$506" sub="MTD placeholder" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <StatCard icon={Store} label="Approved Retailers" value={retailers?.length ?? "—"} sub="Active in recommendation pool" />
              <StatCard icon={Building2} label="Brand Pipeline" value={mockBrands.length} sub="Tracked for outreach" />
              <StatCard icon={Handshake} label="Active Partnerships" value="0" sub="None at launch — independence maintained" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="rounded-2xl border border-border/40 bg-white shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xs uppercase tracking-widest font-semibold text-foreground">Recent Submissions</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {mockSubmissions.slice(0, 4).map((sub) => (
                    <div key={sub.id} className="flex items-center justify-between px-6 py-4 border-b border-border/30 last:border-0 hover:bg-background/50 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-foreground">{sub.name}</p>
                        <p className="text-xs text-muted-foreground font-light">{sub.service} · {sub.date}</p>
                      </div>
                      <span className={`text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${STATUS_COLORS[sub.status]}`}>
                        {sub.status}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="rounded-2xl border border-border/40 bg-white shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xs uppercase tracking-widest font-semibold text-foreground">Workflow Pipeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-2">
                  {[
                    { status: "New", count: 1, icon: Zap },
                    { status: "In Review", count: 1, icon: Clock },
                    { status: "Expert Reviewed", count: 1, icon: Star },
                    { status: "Delivered", count: 1, icon: CheckCircle2 },
                  ].map((item) => (
                    <div key={item.status} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                      </div>
                      <p className="text-sm text-foreground font-light flex-1">{item.status}</p>
                      <span className="text-sm font-medium text-foreground">{item.count}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-xs uppercase tracking-widest font-semibold text-foreground mb-1">Independence Status: Active</p>
                  <p className="text-xs text-muted-foreground font-light">
                    Sponsored placements: <strong>Disabled</strong> · Affiliate links: <strong>Disabled</strong> · Pay-to-play: <strong>Never</strong> ·
                    All recommendations are fit-first and customer-first.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* SUBMISSIONS TAB */}
        {activeTab === "Submissions" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="rounded-2xl border border-border/40 bg-white shadow-sm overflow-hidden">
              <CardHeader className="border-b border-border/40">
                <CardTitle className="text-xs uppercase tracking-widest font-semibold text-foreground">All Submissions</CardTitle>
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/30 bg-background/50">
                      {["ID", "Client", "Email", "Service Tier", "Status", "Date", "Actions"].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-[9px] uppercase tracking-widest text-muted-foreground font-semibold whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mockSubmissions.map((sub) => (
                      <tr key={sub.id} className="border-b border-border/20 hover:bg-background/30 transition-colors">
                        <td className="px-5 py-4 text-xs text-muted-foreground font-mono">#{sub.id}</td>
                        <td className="px-5 py-4 text-sm font-medium text-foreground whitespace-nowrap">{sub.name}</td>
                        <td className="px-5 py-4 text-xs text-muted-foreground font-light">{sub.email}</td>
                        <td className="px-5 py-4 text-xs text-foreground font-light whitespace-nowrap">{sub.service}</td>
                        <td className="px-5 py-4">
                          <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[sub.status]}`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-xs text-muted-foreground font-light whitespace-nowrap">{sub.date}</td>
                        <td className="px-5 py-4">
                          <Button variant="ghost" size="sm" className="rounded-lg h-7 text-[10px] uppercase tracking-wider gap-1 text-primary hover:text-primary hover:bg-primary/5">
                            Review <ChevronRight className="w-3 h-3" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="mt-6 bg-primary/5 border border-primary/10 rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" strokeWidth={1.5} />
                <div>
                  <p className="text-xs uppercase tracking-widest font-semibold text-foreground mb-1">Admin Actions Available</p>
                  <p className="text-xs text-muted-foreground font-light">
                    View selfie uploads · Edit beauty blueprint content · Update workflow status · Mark report delivered · Add admin notes
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === "Products" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground font-light">Manage your curated product library</p>
              <Button className="rounded-full text-xs uppercase tracking-wider bg-primary text-white px-6">
                <Package className="w-4 h-4 mr-2" /> Add Product
              </Button>
            </div>
            <Card className="rounded-2xl border border-border/40 bg-white shadow-sm">
              <div className="p-8 text-center">
                <Package className="w-12 h-12 text-border mx-auto mb-4" strokeWidth={1} />
                <h3 className="text-lg font-light tracking-wide uppercase text-foreground mb-2">Product Library</h3>
                <p className="text-sm text-muted-foreground font-light max-w-md mx-auto mb-6">
                  Manage your curated product library, add retailer offers, update pricing, verify availability, and configure shade compatibility.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mt-8">
                  {[
                    { label: "Total Products", value: "17" },
                    { label: "Active Offers", value: "—" },
                    { label: "Retailer Links", value: "—" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-background rounded-xl p-4 border border-border/40">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">{stat.label}</p>
                      <p className="text-2xl font-thin text-foreground">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* RETAILERS TAB */}
        {activeTab === "Retailers" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm text-muted-foreground font-light">Approved retailers for product recommendations</p>
                <p className="text-xs text-muted-foreground/70 font-light mt-1">Simply LaRae is retailer-agnostic. All recommendations are made independently.</p>
              </div>
              <Button className="rounded-full text-xs uppercase tracking-wider bg-primary text-white px-6">
                <Store className="w-4 h-4 mr-2" /> Add Retailer
              </Button>
            </div>
            <Card className="rounded-2xl border border-border/40 bg-white shadow-sm overflow-hidden">
              {retailersLoading ? (
                <div className="p-12 text-center text-muted-foreground text-sm font-light">Loading retailers...</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/30 bg-background/50">
                        {["Priority", "Retailer", "Type", "Website", "Status", "Actions"].map((h) => (
                          <th key={h} className="text-left px-5 py-3 text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(retailers || []).map((r: any) => (
                        <tr key={r.id} className="border-b border-border/20 hover:bg-background/30 transition-colors">
                          <td className="px-5 py-4 text-xs font-mono text-muted-foreground">{r.priorityRank}</td>
                          <td className="px-5 py-4 text-sm font-medium text-foreground">{r.retailerName}</td>
                          <td className="px-5 py-4 text-xs text-muted-foreground font-light capitalize">{r.retailerType?.replace(/_/g, " ")}</td>
                          <td className="px-5 py-4">
                            <a
                              href={r.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary font-light flex items-center gap-1 hover:underline"
                            >
                              {r.website?.replace("https://www.", "").replace("https://", "")}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${r.isActive ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                              {r.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <Button variant="ghost" size="sm" className="rounded-lg h-7 text-[10px] uppercase tracking-wider text-primary hover:bg-primary/5">
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
            <div className="mt-4 text-xs text-muted-foreground font-light text-center">
              Simply LaRae is an independent advisory platform. Retailer listing does not imply affiliation, endorsement, or partnership.
            </div>
          </motion.div>
        )}

        {/* BRANDS TAB */}
        {activeTab === "Brands" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm text-muted-foreground font-light">Brand relationship tracking and partnership pipeline</p>
                <p className="text-xs text-muted-foreground/70 font-light mt-1">
                  Simply LaRae never accepts sponsored placements. Partnerships must be authentic, disclosed, and client-benefit-first.
                </p>
              </div>
              <Button className="rounded-full text-xs uppercase tracking-wider bg-primary text-white px-6">
                <Building2 className="w-4 h-4 mr-2" /> Add Brand
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Tracked Brands", value: mockBrands.length, sub: "In pipeline" },
                { label: "Active Partnerships", value: "0", sub: "None at launch" },
                { label: "Outreach Sent", value: "0", sub: "Pending start" },
                { label: "Sponsorships", value: "Disabled", sub: "Architecture-ready" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl p-5 border border-border/40 shadow-sm">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">{stat.label}</p>
                  <p className="text-2xl font-thin text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground font-light mt-1">{stat.sub}</p>
                </div>
              ))}
            </div>

            <Card className="rounded-2xl border border-border/40 bg-white shadow-sm overflow-hidden mb-6">
              <CardHeader className="border-b border-border/40">
                <CardTitle className="text-xs uppercase tracking-widest font-semibold text-foreground">Brand Pipeline</CardTitle>
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/30 bg-background/50">
                      {["Brand", "Website", "Status", "Notes", "Actions"].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mockBrands.map((brand) => (
                      <tr key={brand.id} className="border-b border-border/20 hover:bg-background/30 transition-colors">
                        <td className="px-5 py-4 text-sm font-medium text-foreground whitespace-nowrap">{brand.name}</td>
                        <td className="px-5 py-4">
                          <a
                            href={`https://www.${brand.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary font-light flex items-center gap-1 hover:underline"
                          >
                            {brand.website}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${PARTNERSHIP_STATUS_COLORS[brand.status] ?? "bg-border text-muted-foreground"}`}>
                            {brand.status.replace(/_/g, " ")}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-xs text-muted-foreground font-light max-w-xs">{brand.notes}</td>
                        <td className="px-5 py-4 flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="rounded-lg h-7 text-[10px] uppercase tracking-wider text-primary hover:bg-primary/5">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="rounded-lg h-7 text-[10px] uppercase tracking-wider text-muted-foreground hover:bg-background">
                            Log Contact
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-xs uppercase tracking-widest font-semibold text-foreground mb-1">Partnership Policy</p>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">
                    Simply LaRae will never accept compensation to recommend, prioritize, or feature any brand or product.
                    Any future partnership — educational, sampling, or advisory — must be transparently disclosed with a DisclosureBadge on all affected content.
                    Sponsored placements are disabled by default and may only be enabled with explicit client-facing disclosure.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* SERVICES TAB */}
        {activeTab === "Services" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {(services || []).sort((a, b) => a.sortOrder - b.sortOrder).map((svc) => (
                <Card key={svc.id} className="rounded-2xl border border-border/40 bg-white shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-sm uppercase tracking-widest font-medium text-foreground mb-1">{svc.name}</h3>
                        <p className="text-2xl font-thin text-foreground">{svc.priceDisplay}</p>
                      </div>
                      <div className="flex gap-2">
                        {svc.isPopular && (
                          <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            Popular
                          </span>
                        )}
                        <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-600">
                          Active
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground font-light mb-4">{svc.tagline}</p>
                    <Button variant="outline" size="sm" className="rounded-full text-[10px] uppercase tracking-wider border-border w-full">
                      Edit Service Tier
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
