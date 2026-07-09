import type { Metadata } from "next";
import { CheckoutButton } from "@/components/billing/CheckoutButton";

export const metadata: Metadata = {
  title: "FolioFrame Live Pricing – SaaS",
  description: "FolioFix £29 • Pro Launch £99 • Signature Launch £249 – Stripe live – July 2026",
};

const plans = [
  {
    id: "foliofix" as const,
    name: "FolioFix",
    price: 29,
    blurb: "Service system starter",
    features: ["1 workspace", "RevenueFrame", "DeliveryProof basic", "Email support"],
  },
  {
    id: "pro" as const,
    name: "Pro Launch",
    price: 99,
    blurb: "Founder pilot – most popular",
    features: ["3 workspaces", "RevenueFrame + AccessGuard", "DeliveryProof + InboxGuard", "14-day trial", "Founder Slack"],
    highlight: true,
    pilot: true,
  },
  {
    id: "signature" as const,
    name: "Signature Launch",
    price: 249,
    blurb: "Full OS",
    features: ["Unlimited workspaces", "White-label portals", "Priority onboarding", "API access"],
  },
];

export default function LivePricingPage() {
  return (
    <main className="min-h-screen bg-[#0f1221] text-[#e8ecff]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-[#00dfb8]">FolioFrame • SaaS Live – July 2026</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">FolioFix → Signature Launch</h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-300">
            Agencies & consultants. Turn high-ticket delivery into a repeatable SaaS-grade system.
            Next.js / TypeScript / Supabase-ready / Stripe live.
          </p>
          <p className="mt-3 text-sm text-amber-300">Founder pilot: 3 seats • £99/mo locked 12 months • 14-day trial</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`rounded-2xl border p-6 backdrop-blur ${
                p.highlight
                  ? "border-[#00dfb8] bg-[#1a1f3a]"
                  : "border-[#2a315a] bg-[#171b2f]/90"
              }`}
            >
              {p.highlight ? (
                <div className="mb-3 inline-block rounded-full bg-[#00dfb8] px-3 py-1 text-xs font-bold text-[#062a24]">
                  FOUNDER PILOT
                </div>
              ) : null}
              <div className="text-sm text-slate-400">{p.blurb}</div>
              <div className="mt-2 text-3xl font-extrabold">
                £{p.price}
                <span className="text-base font-normal text-slate-400">/mo</span>
              </div>
              <ul className="my-5 min-h-[160px] space-y-2 text-sm text-slate-200">
                {p.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <CheckoutButton plan={p.id} pilot={!!p.pilot}>
                {p.id === "pro" ? "Start 14-day pilot" : `Choose ${p.name}`}
              </CheckoutButton>
              <p className="mt-3 text-center text-xs text-slate-400">
                {p.id === "pro" ? "No card trial – cancel anytime" : "Monthly – cancel anytime"}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-[#2a315a] bg-[#141933] p-6 text-center text-sm text-slate-300">
          <p>
            <strong className="text-[#e8ecff]">Valuation – July 2026:</strong> Ask £135,000 • BIN £75,000 • Reserve £38,000
            <br />
            100% IP • Solo founder • Next.js / TS / Tailwind • Supabase + Clerk + Stripe live
            <br />
            Repo: <span className="text-[#00dfb8]">github.com/afshantrades/FolioFrame</span> • Live: folioframe.vercel.app
          </p>
        </div>

        <div className="mt-8 text-center text-xs text-slate-500">
          Built July 2026 – SaaS Live upgrade – Stripe • Clerk • Prisma • Vercel
          <br />
          <a href="/pricing" className="underline hover:text-slate-300">View static service pricing →</a>
        </div>
      </div>
    </main>
  );
}
