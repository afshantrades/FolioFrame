/* eslint-disable @next/next/no-img-element -- Approved brand assets render directly from source-locked public files. */
import type { BrandImageAsset } from "@/content/folioframeBrandAssets";

type BrandAssetImageProps = {
  asset: BrandImageAsset;
  className?: string;
  imageClassName?: string;
  decorative?: boolean;
  loading?: "eager" | "lazy";
};

export function BrandAssetImage({
  asset,
  className = "",
  imageClassName = "",
  decorative = false,
  loading = "lazy",
}: BrandAssetImageProps) {
  return (
    <div className={className}>
      <img
        src={asset.src}
        alt={decorative ? "" : asset.alt}
        loading={loading}
        className={`h-auto max-w-full ${imageClassName}`}
      />
    </div>
  );
}
