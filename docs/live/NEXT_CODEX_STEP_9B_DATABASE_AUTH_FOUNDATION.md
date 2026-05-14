# Next Codex Prompt: Step 9B Database/Auth Foundation

Use this prompt only after Step 9A planning is approved.

```text
You are working on the existing FolioFrame project.

Current status:
The project is a completed static service website and static portal demo.
Step 9A created the live product architecture, data model, roadmap, environment and security planning docs.

Goal:
Implement the database/auth foundation for the live service-led SaaS phase.

Important:
Do not connect Stripe yet.
Do not connect Resend yet.
Do not create live webhooks yet.
Do not create real credentials.
Do not commit .env files.
Do not create backend form handling beyond auth/database foundation.
Do not create, modify, generate or replace logo files.
Do not create final brand visuals.
Keep the temporary text-only BrandLockup.
Final FolioFrame production logo remains pending.

Recommended stack:
- Next.js App Router
- TypeScript
- Prisma
- Postgres
- Clerk for auth

Tasks:

1. Install foundation packages
   - Prisma
   - Prisma client
   - Clerk Next.js package
   - Any small validation/helper package only if needed

2. Add Prisma foundation
   - Create prisma/schema.prisma
   - Add datasource for Postgres using DATABASE_URL
   - Add generator for Prisma Client
   - Create initial models:
     - User
     - Workspace
     - WorkspaceMember
     - Client
     - Product
     - ProductTier
     - AuditLog
   - Include timestamps, ids, workspace relationships and role fields.
   - Do not add Stripe, email or webhook models yet unless needed for clean relationships.

3. Add database helper
   - Create a server-only Prisma client helper.
   - Avoid importing Prisma into client components.

4. Add auth foundation
   - Add Clerk provider to the app layout.
   - Add middleware for protected internal /app routes.
   - Keep public marketing routes public.
   - Add server-side helper to get the current user and workspace membership.

5. Add environment documentation only
   - Create or update a committed example/template file if needed.
   - Use placeholder names only.
   - Do not create .env or real credentials.

6. Add live foundation docs
   - Document how to run Prisma generate/migrate locally.
   - Document required environment variables.
   - Document that Stripe, email and webhooks are still not connected.

7. Keep UI changes minimal
   - Only update /app static portal behavior if required to make protected routing clear.
   - Do not redesign public pages.
   - Do not add new product features.

8. Run:
   - npm run lint
   - npm run typecheck
   - npm run build
   - npm test if tests exist and pass without external services

9. Commit if checks pass:
   git add .
   git commit -m "Add FolioFrame database and auth foundation"

Required output format:

STEP 9B RESULT

1. Packages installed:
2. Prisma foundation:
3. Auth foundation:
4. Protected route behavior:
5. Environment handling:
6. Docs created/updated:
7. Commands run:
8. Command results:
9. Commit hash:
10. Remaining blockers:
11. Git status:
```

