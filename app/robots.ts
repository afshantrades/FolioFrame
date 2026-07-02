import type { MetadataRoute } from "next";

function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  );
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
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
        ],
        disallow: ["/app", "/sign-in", "/sign-up"],
      },
    ],
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
