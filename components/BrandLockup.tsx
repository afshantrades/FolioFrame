/* eslint-disable @next/next/no-img-element -- Approved logo files render directly from source-locked public assets. */
import { brandLogoAssets } from "@/content/folioframeBrandAssets";

type BrandLockupProps = {
  className?: string;
  compact?: boolean;
  tone?: "default" | "reversed";
};

export function BrandLockup({
  className = "",
  compact = false,
  tone = "default",
}: BrandLockupProps) {
  const logo = tone === "reversed" ? brandLogoAssets.ivory : brandLogoAssets.primary;

  return (
    <div className={className} aria-label="FolioFrame">
      <img
        src={logo.src}
        alt={logo.alt}
        className="h-auto w-[180px] max-w-full sm:w-[210px]"
      />
      {!compact ? (
        <div
          className={`mt-2 text-sm font-medium ${
            tone === "reversed" ? "text-mist" : "text-graphite"
          }`}
        >
          Checkout-to-customer delivery
        </div>
      ) : null}
    </div>
  );
}
