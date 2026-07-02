# FolioFrame Applied Brand System v1 QA Report

Date: 2026-07-02

## Source Package

The approved asset bundle was provided as `/Users/Afshan/Downloads/FolioFrame.zip`.
The nested `FolioFrame_Applied_Brand_System_v1.zip` was extracted into a temporary import folder and assets were copied only from:

- `FolioFrame_Applied_Brand_System_v1/00_SHARED_ASSETS/logos/`
- `FolioFrame_Applied_Brand_System_v1/00_SHARED_ASSETS/visuals_01_to_10/`
- `FolioFrame_Applied_Brand_System_v1/00_SHARED_ASSETS/curated_motifs/`

The rejected package was not used for public assets and no files were copied from rejected asset paths.

## Public Asset Import

Imported into `public/assets/logos/`:

- `APPROVED_primary_logo_transparent.png`
- `APPROVED_primary_logo_mono_ivory.png`
- `APPROVED_standalone_emblem_transparent.png`

Imported into `public/assets/visuals_01_to_10/`:

- `visual_01_Source_Truth_System.png`
- `visual_02_Dashboard_Command_Centre.png`
- `visual_03_Checkout_to_Access_Flow.png`
- `visual_04_EntitlementFrame_Access_Control.png`
- `visual_05_DeliveryProof_Workspace.png`
- `visual_06_RevenueFrame_Recovery_Workspace.png`
- `visual_07_Workspace_Setup_Onboarding.png`
- `visual_08_Implementation_Handover_Room.png`
- `visual_09_Strategic_Buyer_Summary.png`
- `visual_10_Sale_Room_Cover.png`

Imported into `public/assets/curated_motifs/`:

- `archive_support_only_10/` with 10 files
- `investor_buyer_deck_top_10/` with 10 files
- `primary_master_top_10/` with 10 files
- `product_ui_support_top_10/` with 10 files
- `reports_proposals_top_10/` with 10 files
- `subtle_patterns_top_10/` with 10 files
- `website_backgrounds_top_10/` with 10 files

## Asset Counts

- Logos: 3 approved files
- Flagship visuals: 10 approved files
- Curated motifs: 70 approved files

## Routes Updated

- `/`
- `/signature-launch`
- `/signature-launch-system`
- `/pricing`
- `/app`

The clean buyer-facing `/signature-launch` route now renders the Signature Launch page while the existing `/signature-launch-system` route remains available.

## Shared Brand Wiring

- `BrandLockup` now renders the approved source-locked logo asset.
- `SiteHeader`, `SiteFooter` and `PortalShell` receive the approved logo through the shared `BrandLockup`.
- Route visuals and motifs are referenced through `content/folioframeBrandAssets.ts`.

## Locked Colour Tokens

Confirmed present in Tailwind/global CSS:

- Ink Navy: `#061B3D`
- Warm Ivory: `#F8F4EC`
- Folio Blue: `#8FB6F0`
- Graphite: `#273248`
- Mist: `#EAF1FB`

## Asset QA

- Required public asset folders exist.
- Required public asset folders contain real asset files, not only `.gitkeep`.
- Referenced asset paths in `content/folioframeBrandAssets.ts` exist under `public/`.
- No rejected generated-asset filenames were found in active app/component/content/public references.
- No old placeholder logo copy remains in active app/component/content references.

## Mobile Screenshot QA

Screenshots captured at 390px under:

- `docs/qa/screenshots/approved-assets-import/home-mobile-390.png`
- `docs/qa/screenshots/approved-assets-import/signature-launch-mobile-390.png`
- `docs/qa/screenshots/approved-assets-import/pricing-mobile-390.png`
- `docs/qa/screenshots/approved-assets-import/app-mobile-390.png`

| Route | Width | Horizontal overflow | Asset image status |
| --- | ---: | --- | --- |
| `/` | 390px | No | Loaded |
| `/signature-launch` | 390px | No | Loaded |
| `/pricing` | 390px | No | Loaded |
| `/app` | 390px | No | Loaded |

## Static/Product Boundary

No Stripe, Resend, webhook, billing, backend public form handling, real customer data, production credential or production integration changes were added in this asset import pass.
