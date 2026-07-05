# FolioFrame Closing Package Manifest

## Package Summary

- Package: FolioFrame Closing Package v1
- Generated date: 2026-07-05
- Source branch: `folioframe/deploy-production-static-demo`
- Source baseline commit: `8e6f830 Add FolioFrame production static demo deployment checklist`
- Package manager: `npm@11.12.1`
- Build verification date: `2026-07-04`
- Build verification result: `npm run prisma:generate`, `npm run lint`, `npm run typecheck` and `npm run build` passed
- Static build reference: `63/63` pages generated in the latest verified build

## Included Source Documents

- `docs/closing-package/FOLIOFRAME_CLOSING_PACKAGE_SOURCE.md`
- `docs/closing-package/FOLIOFRAME_TRANSACTION_SUMMARY.md`
- `docs/closing-package/FOLIOFRAME_ASSET_TRANSFER_SCHEDULE.md`
- `docs/closing-package/FOLIOFRAME_IP_LICENSE_TRANSFER_CHECKLIST.md`
- `docs/closing-package/FOLIOFRAME_TECHNICAL_HANDOVER.md`
- `docs/closing-package/FOLIOFRAME_COMMERCIAL_MATERIALS_INDEX.md`
- `docs/closing-package/FOLIOFRAME_DEPLOYMENT_TRANSITION_PLAN.md`
- `docs/closing-package/FOLIOFRAME_RED_FLAG_DISCLOSURE.md`
- `docs/closing-package/FOLIOFRAME_CLOSING_CHECKLIST.md`
- `docs/closing-package/FOLIOFRAME_CLOSING_SIGN_OFF.md`
- `docs/closing-package/FOLIOFRAME_CLOSING_PACKAGE_MANIFEST.md`
- `docs/closing-package/render_closing_package_pdf.py`

## Exported Files

- `docs/closing-package/FolioFrame_Closing_Package_v1.pdf`
- `FolioFrame_Closing_Package_Source_Controlled_v1.zip`

PDF render status:

- PDF page count: `28`
- PDF render date: `2026-07-05`
- PDF source: Markdown files plus `docs/closing-package/render_closing_package_pdf.py`

## Approved Asset References

The PDF renderer uses:

- `public/assets/logos/APPROVED_primary_logo_transparent.png`
- `public/assets/visuals_01_to_10/visual_10_Sale_Room_Cover.png`

The source documents reference approved visual and screenshot evidence paths.

## Excluded Items

The package excludes:

- `.env`
- `.env.local`
- Production credentials
- Local database volumes
- `.next/`
- `node_modules/`
- `.git/`
- Rejected generated assets
- Generated closing-package page images

## QA Summary

- Approved logo asset use: required and verified by renderer source.
- Generated logo or generated page image use: forbidden.
- Rejected asset filename references: must be zero.
- Image paths: must exist.
- Static/demo boundary language: required in source and PDF.
- PDF render: required.
- ZIP integrity: required.

## Final Recommendation

This package is suitable for closing review as a deterministic source-rendered document set.

It should not be used to imply FolioFrame is a live SaaS, live billing product, production auth system, customer database, live monitoring system or automated fulfilment platform.
