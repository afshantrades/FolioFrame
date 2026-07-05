# FolioFrame Closing Checklist

## Repository

- [ ] Confirm current branch is `folioframe/deploy-production-static-demo`.
- [ ] Confirm source baseline commit is `8e6f830`.
- [ ] Confirm worktree is clean at handover.
- [ ] Confirm buyer has repository access.
- [ ] Confirm buyer has ZIP or archive access if needed.

## Build

- [ ] Run `npm ci`.
- [ ] Run `npm run prisma:generate`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run build`.
- [ ] Confirm `63/63` static pages generated.

## Assets

- [ ] Confirm approved logo files exist.
- [ ] Confirm approved visual files 01-10 exist.
- [ ] Confirm curated motif folders exist.
- [ ] Confirm no rejected generated asset filenames appear.
- [ ] Confirm no generated closing-package page image is used as final material.

## Documentation

- [ ] Review sale-room pack.
- [ ] Review closing package.
- [ ] Review deployment checklist.
- [ ] Review static/demo disclosure.
- [ ] Review implementation docs and SOPs.
- [ ] Review live-product roadmap and security boundaries.

## Deployment

- [ ] Set `NEXT_PUBLIC_APP_URL`.
- [ ] Do not set forbidden live secrets for static demo deployment.
- [ ] Deploy static service website.
- [ ] Verify priority routes.
- [ ] Capture post-deploy screenshots.

## Legal And IP

- [ ] Confirm FolioFrame name diligence.
- [ ] Confirm domain transfer.
- [ ] Confirm approved asset transfer rights.
- [ ] Confirm third-party dependency license review.
- [ ] Complete legal/privacy review before public commercial operation.

## Final Boundary

- [ ] Confirm buyer understands this is a static service website and static portal/demo.
- [ ] Confirm buyer does not market it as live SaaS until production systems are complete.
