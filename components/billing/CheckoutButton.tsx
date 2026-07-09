"use client";

import { useState } from "react";

type Plan = "foliofix" | "pro" | "signature";

export function CheckoutButton({
  plan = "pro",
  pilot = true,
  children,
  className,
}: {
  plan?: Plan;
  pilot?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function go() {
    setLoading(true);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, pilot }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      if (data.signInUrl || res.status === 401) {
        window.location.href = "/sign-in?redirect_url=/pricing/live";
        return;
      }
      alert(data.error || "Checkout unavailable – check Stripe keys");
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={go}
      disabled={loading}
      className={
        className ??
        "w-full rounded-md bg-ink-navy px-4 py-3 text-sm font-semibold text-soft-white hover:bg-ink-navy/90 disabled:opacity-60"
      }
    >
      {loading ? "…" : children}
    </button>
  );
}
