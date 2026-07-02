import type { MetadataRoute } from "next";

const publicRoutes = [
  "/",
  "/signature-launch",
  "/pricing",
  "/modules",
  "/deliveryproof",
  "/accessguard",
  "/accessdesk",
  "/revenueframe",
  "/accesssafe",
  "/foliofix",
  "/entitlementframe",
  "/inboxguard",
  "/accesshub",
  "/launchroom",
  "/migrationframe",
  "/proofmetrics",
  "/agencyframe",
  "/verified-delivery-standard",
  "/apply",
  "/faq",
  "/privacy",
  "/terms",
  "/refund-policy",
  "/accessibility",
] as const;

function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route === "/" ? "" : route}`,
    lastModified: new Date("2026-07-02"),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/signature-launch" ? 0.9 : 0.7,
  }));
}
