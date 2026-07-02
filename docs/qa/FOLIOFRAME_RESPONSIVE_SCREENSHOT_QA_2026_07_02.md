# FolioFrame Responsive Screenshot QA

Date: 2026-07-02

## Screenshot Set

Fresh screenshots were captured for:

- `/`
- `/signature-launch`
- `/pricing`
- `/app`

Each route was captured at:

- Desktop: 1440px CSS viewport, saved 1440px wide
- Tablet: 768px CSS viewport at 2x DPR, saved 1536px wide
- Mobile: 390px CSS viewport at 2x DPR, saved 780px wide

Output folder:

- `docs/qa/screenshots/responsive-brand-assets-2026-07-02/`

## Files

| Route | Desktop | Tablet | Mobile |
| --- | --- | --- | --- |
| `/` | `home-desktop-1440.png` | `home-tablet-768.png` | `home-mobile-390.png` |
| `/signature-launch` | `signature-launch-desktop-1440.png` | `signature-launch-tablet-768.png` | `signature-launch-mobile-390.png` |
| `/pricing` | `pricing-desktop-1440.png` | `pricing-tablet-768.png` | `pricing-mobile-390.png` |
| `/app` | `app-desktop-1440.png` | `app-tablet-768.png` | `app-mobile-390.png` |

## Image Dimensions

| File | Dimensions |
| --- | --- |
| `home-desktop-1440.png` | 1440 x 7504 |
| `home-tablet-768.png` | 1536 x 21542 |
| `home-mobile-390.png` | 780 x 30870 |
| `signature-launch-desktop-1440.png` | 1440 x 8002 |
| `signature-launch-tablet-768.png` | 1536 x 22970 |
| `signature-launch-mobile-390.png` | 780 x 33418 |
| `pricing-desktop-1440.png` | 1440 x 6500 |
| `pricing-tablet-768.png` | 1536 x 23200 |
| `pricing-mobile-390.png` | 780 x 27920 |
| `app-desktop-1440.png` | 1440 x 3524 |
| `app-tablet-768.png` | 1536 x 11088 |
| `app-mobile-390.png` | 780 x 15776 |

## QA Confirmations

- Screenshots are full-page PNG captures, not cropped viewport fragments.
- Mobile screenshots use a real 390px CSS viewport and save at 780px width for readability.
- Tablet screenshots use a real 768px CSS viewport and save at 1536px width for readability.
- Desktop screenshots save at 1440px width.
- No horizontal overflow was detected on any requested route at any requested viewport.
- Approved logo assets were present, loaded and horizontally visible on every route.
- Home and Signature Launch hero sections were visible in the initial viewport.
- Pricing page header area, approved visual assets and pricing offer cards were included in the full-page screenshots; pricing content text was present and readable in the captured page.
- `/app` screenshots include the dashboard content area, not only the sidebar.
- Approved visual assets loaded on each requested route.
- Approved motifs loaded on each requested route and are used as contained supporting visuals rather than cluttered/repeating backgrounds.

## Static Boundary

This screenshot QA did not add live integrations, credentials, backend form handling, Stripe, Resend or webhooks.
