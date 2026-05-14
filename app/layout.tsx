import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/auth/config";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "FolioFrame",
    template: "%s | FolioFrame",
  },
  description:
    "FolioFrame builds, tests and documents checkout-to-customer systems for digital product sellers.",
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
