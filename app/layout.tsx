import type { Metadata } from "next";
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
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
