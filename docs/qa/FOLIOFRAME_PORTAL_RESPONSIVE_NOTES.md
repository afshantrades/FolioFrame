# FolioFrame Portal Responsive Notes

## 390px Checks

The following routes were checked with Chrome DevTools emulation at a 390px CSS viewport:

- `/app`
- `/app/premium-dashboard`
- `/app/entitlementframe`
- `/app/inboxguard`
- `/app/accesshub`
- `/app/launchroom`
- `/app/migrationframe`
- `/app/proofmetrics`
- `/app/agencyframe`
- `/app/verified-delivery`
- `/app/handover`

## Result

Chrome reported:

- `clientWidth: 390`
- `scrollWidth: 390`
- `bodyScrollWidth: 390`

for every route above.

## Fixes Applied

- Portal shell now uses `minmax(0, 1fr)` for the desktop content column.
- Main content has defensive `min-w-0` and overflow protection.
- Portal navigation labels wrap cleanly on narrow screens.
- Portal headings and body copy use mobile-safe sizing and wrapping.
- Tables sit inside horizontal scroll containers where table layout is appropriate.
- Product matrix also includes mobile card views.

## Remaining Responsive Notes

- Some pages are long by design because the static portal exposes full owner-review content.
- Static/demo notices remain visible near the top of every internal route without taking over the page.
