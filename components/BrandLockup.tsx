type BrandLockupProps = {
  className?: string;
  compact?: boolean;
};

// TODO: Replace this text-only lockup only after the approved final FolioFrame production logo master is provided.
export function BrandLockup({ className = "", compact = false }: BrandLockupProps) {
  return (
    <div className={className} aria-label="FolioFrame">
      <div className="text-lg font-semibold text-deep-navy">FolioFrame</div>
      {!compact ? (
        <div className="mt-1 text-sm font-medium text-slate-blue-grey">
          Checkout-to-customer delivery
        </div>
      ) : null}
    </div>
  );
}
