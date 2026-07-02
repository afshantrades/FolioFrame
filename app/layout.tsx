import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/auth/config";
import "./globals.css";

const siteUrl = new URL(
  process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
);

const siteDescription =
  "FolioFrame builds, tests and documents checkout-to-customer delivery systems for digital product sellers.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "FolioFrame | Buyer-access reliability for digital product sellers",
    template: "%s | FolioFrame",
  },
  description: siteDescription,
  applicationName: "FolioFrame",
  authors: [{ name: "FolioFrame" }],
  creator: "FolioFrame",
  publisher: "FolioFrame",
  keywords: [
    "FolioFrame",
    "digital product delivery",
    "buyer access reliability",
    "checkout-to-customer",
    "DeliveryProof",
    "EntitlementFrame",
    "AccessHub",
  ],
  icons: {
    icon: "/assets/logos/APPROVED_standalone_emblem_transparent.png",
    apple: "/assets/logos/APPROVED_standalone_emblem_transparent.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "FolioFrame",
    title: "FolioFrame | Buyer-access reliability for digital product sellers",
    description: siteDescription,
    images: [
      {
        url: "/assets/visuals_01_to_10/visual_09_Strategic_Buyer_Summary.png",
        alt: "FolioFrame strategic buyer summary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FolioFrame | Buyer-access reliability for digital product sellers",
    description: siteDescription,
    images: ["/assets/visuals_01_to_10/visual_09_Strategic_Buyer_Summary.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const layout = (
    <html lang="en">
      <body>{children}</body>
    </html>
  );

  if (!isClerkConfigured()) {
    return layout;
  }

  return <ClerkProvider>{layout}</ClerkProvider>;
}
