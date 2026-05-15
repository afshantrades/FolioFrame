# FolioFrame Workspace Membership Setup

Status: planning and local development guide only.

## Why Clerk User Identity Is Separate

Clerk proves who is signed in. FolioFrame decides what that signed-in person can access.

The live foundation separates:

- Clerk user identity: external auth provider id and email.
- FolioFrame `User`: internal user record.
- `WorkspaceMember`: the server-side access rule that links a user to a workspace.

This prevents a signed-in user from seeing workspace records unless FolioFrame has explicitly granted access.

## WorkspaceMember Access Control

`WorkspaceMember` controls:

- workspace id
- user id
- role
- member status
- join state

Only active members should be allowed to view workspace-backed portal data.

## Roles

| Role | Intended access |
| --- | --- |
| OWNER | Owns workspace setup, approvals and billing decisions when billing exists later. |
| ADMIN | Manages workspace configuration and owner-approved operations. |
| OPERATOR | Works inside implementation and support workflows. |
| VIEWER | Reads workspace records without changing implementation data. |

## Development Assignment Options

Use fictional/local data only.

Option 1: Prisma Studio

```bash
npm run db:studio
```

Find or create the FolioFrame `User` record mapped to the Clerk development user, then add an active `WorkspaceMember` row for the demo workspace.

Option 2: Seed update

Temporarily adjust the local seed data to match a known Clerk development email, run the seed again, and keep all values fictional/local.

Option 3: Later admin flow

Build an owner-only admin route in a future approved step. That route should require server-side role checks.

## Workspace Isolation Rule

Never trust a client-provided workspace id by itself.

Every workspace-backed read or write must check:

- current signed-in Clerk identity
- mapped FolioFrame `User`
- active `WorkspaceMember`
- allowed role for the action
- workspace id from the server-verified membership context

## Current Foundation Behavior

- If Clerk is not configured: portal source remains `static-demo`.
- If Clerk is configured but no user is signed in: portal source is `auth-required`.
- If Clerk is configured and signed in but no membership exists: portal source is `workspace-required`.
- If Clerk, database and membership are ready: portal source is `database`.

Stripe, Resend, webhooks and backend public form handling remain disconnected.
