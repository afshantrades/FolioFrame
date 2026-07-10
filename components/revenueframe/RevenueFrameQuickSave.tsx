"use client";
import { useState } from "react";

export function RevenueFrameQuickSave() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("5000");
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setResult(null);
    try {
      const res = await fetch("/api/revenue_frames", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          offer_price: parseInt(price || "0", 10) * 100, // store pence
          currency: "GBP",
          funnel_stage: "pro",
          positioning: "FolioFrame SaaS Live – pilot",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setResult(`Saved ✓ – ${data.product?.name} – ${data.product?.id.slice(0,8)}…`);
      setName("");
    } catch (err: any) {
      setResult("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save} className="rounded-lg border border-mist-blue bg-soft-white p-4 shadow-soft space-y-3 max-w-xl">
      <h3 className="text-lg font-semibold text-ink-navy">Quick RevenueFrame – SaaS Live</h3>
      <p className="text-sm text-slate-blue-grey">Pilot – saves directly to Prisma Product table. Used for £135k valuation MRR proof.</p>
      <div>
        <label className="text-xs font-semibold text-deep-navy">Offer name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Signature Launch – Agency OS"
          required
          className="mt-1 w-full rounded-md border border-champagne-line px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-deep-navy">Offer price (£)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1 w-full rounded-md border border-champagne-line px-3 py-2 text-sm"
          min={0}
        />
      </div>
      <button
        disabled={saving || !name}
        className="w-full rounded-md bg-ink-navy px-4 py-2 text-sm font-semibold text-soft-white hover:bg-ink-navy/90 disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save RevenueFrame → Prisma"}
      </button>
      {result && <p className="text-xs text-graphite">{result}</p>}
      <p className="text-[11px] text-slate-500">Writes to: Product.name, Product.slug, ProductTier.accessRule • July 2026 SaaS Live</p>
    </form>
  );
}
