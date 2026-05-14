# FolioFrame Auth Foundation

Status: foundation implemented, not production configured.

FolioFrame now has a Clerk-aware auth foundation for the future live service-led SaaS phase. The app still builds and runs without real Clerk credentials.

## What Was Added

- `@clerk/nextjs` package.
- Conditional `ClerkProvider` wiring in `app/layout.tsx`.
- `middleware.ts` prepared to protect `/app/:path*` routes when Clerk is configured.
- Auth configuration helper in `lib/auth/config.ts`.
- Current user helpers in `lib/auth/currentUser.ts`.
- Workspace membership helpers in `lib/auth/workspace.ts`.
- A visible internal portal development note when Clerk credentials are not configured.

## No-Credentials Fallback

If `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` are missing or placeholder values, FolioFrame treats Clerk as not configured.

In that state:

- Public routes remain public.
- Internal `/app` routes remain viewable for local development.
- The portal displays an auth foundation note.
- The build does not require production credentials.

## Protected Route Behavior

When Clerk variables are configured with usable values:

- `middleware.ts` applies Clerk middleware to `/app/:path*`.
- Signed-out users are routed through Clerk protection behavior.
- Future workspace pages should also check FolioFrame workspace membership server-side.

## Workspace Isolation Foundation

Helpers are prepared for future data isolation:

- `getCurrentUserRecord`
- `requireCurrentUser`
- `getWorkspaceMembership`
- `requireWorkspaceRole`

These helpers must be used before any live workspace data is trusted or rendered. Client-provided workspace IDs must always be checked against server-side membership.

## Still Not Implemented

- No live sign-in/sign-up page design.
- No production Clerk app configured.
- No Stripe.
- No Resend.
- No webhooks.
- No backend form handling.
- No production credentials.

