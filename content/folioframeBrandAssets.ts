export type BrandImageAsset = {
  src: string;
  alt: string;
  sourcePackagePath: string;
};

export const brandLogoAssets = {
  primary: {
    src: "/assets/logos/APPROVED_primary_logo_transparent.png",
    alt: "FolioFrame",
    sourcePackagePath:
      "00_SHARED_ASSETS/logos/APPROVED_primary_logo_transparent.png",
  },
  ivory: {
    src: "/assets/logos/APPROVED_primary_logo_mono_ivory.png",
    alt: "FolioFrame",
    sourcePackagePath:
      "00_SHARED_ASSETS/logos/APPROVED_primary_logo_mono_ivory.png",
  },
  emblem: {
    src: "/assets/logos/APPROVED_standalone_emblem_transparent.png",
    alt: "FolioFrame approved standalone emblem",
    sourcePackagePath:
      "00_SHARED_ASSETS/logos/APPROVED_standalone_emblem_transparent.png",
  },
} satisfies Record<string, BrandImageAsset>;

export const brandVisualAssets = {
  sourceTruthSystem: {
    src: "/assets/visuals_01_to_10/visual_01_Source_Truth_System.png",
    alt: "FolioFrame source truth system visual",
    sourcePackagePath:
      "00_SHARED_ASSETS/visuals_01_to_10/visual_01_Source_Truth_System.png",
  },
  dashboardCommandCentre: {
    src: "/assets/visuals_01_to_10/visual_02_Dashboard_Command_Centre.png",
    alt: "FolioFrame dashboard command centre visual",
    sourcePackagePath:
      "00_SHARED_ASSETS/visuals_01_to_10/visual_02_Dashboard_Command_Centre.png",
  },
  checkoutToAccessFlow: {
    src: "/assets/visuals_01_to_10/visual_03_Checkout_to_Access_Flow.png",
    alt: "FolioFrame checkout-to-access flow visual",
    sourcePackagePath:
      "00_SHARED_ASSETS/visuals_01_to_10/visual_03_Checkout_to_Access_Flow.png",
  },
  strategicBuyerSummary: {
    src: "/assets/visuals_01_to_10/visual_09_Strategic_Buyer_Summary.png",
    alt: "FolioFrame strategic buyer summary visual",
    sourcePackagePath:
      "00_SHARED_ASSETS/visuals_01_to_10/visual_09_Strategic_Buyer_Summary.png",
  },
} satisfies Record<string, BrandImageAsset>;

export const brandMotifAssets = {
  checkoutPathway: {
    src: "/assets/curated_motifs/website_backgrounds_top_10/02_motif_02.png",
    alt: "FolioFrame checkout-to-access pathway motif",
    sourcePackagePath:
      "00_SHARED_ASSETS/curated_motifs/website_backgrounds_top_10/02_motif_02.png",
  },
  launchReadiness: {
    src: "/assets/curated_motifs/product_ui_support_top_10/08_motif_15.png",
    alt: "FolioFrame LaunchRoom readiness motif",
    sourcePackagePath:
      "00_SHARED_ASSETS/curated_motifs/product_ui_support_top_10/08_motif_15.png",
  },
  pricingEntitlement: {
    src: "/assets/curated_motifs/archive_support_only_10/06_motif_41.png",
    alt: "FolioFrame pricing and entitlement motif",
    sourcePackagePath:
      "00_SHARED_ASSETS/curated_motifs/archive_support_only_10/06_motif_41.png",
  },
  workspaceHealth: {
    src: "/assets/curated_motifs/website_backgrounds_top_10/10_motif_46.png",
    alt: "FolioFrame workspace health motif",
    sourcePackagePath:
      "00_SHARED_ASSETS/curated_motifs/website_backgrounds_top_10/10_motif_46.png",
  },
} satisfies Record<string, BrandImageAsset>;

export const routeBrandAssets = {
  home: {
    visual: brandVisualAssets.sourceTruthSystem,
    motif: brandMotifAssets.checkoutPathway,
  },
  signatureLaunch: {
    visual: brandVisualAssets.checkoutToAccessFlow,
    motif: brandMotifAssets.launchReadiness,
  },
  pricing: {
    visual: brandVisualAssets.strategicBuyerSummary,
    motif: brandMotifAssets.pricingEntitlement,
  },
  portal: {
    visual: brandVisualAssets.dashboardCommandCentre,
    motif: brandMotifAssets.workspaceHealth,
  },
};
