import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";

import { isClerkConfigured } from "@/lib/auth/config";

const protectInternalAppRoutes = isClerkConfigured()
  ? clerkMiddleware(async (auth) => {
      await auth.protect();
    })
  : null;

export default function middleware(request: NextRequest, event: NextFetchEvent) {
  if (request.nextUrl.pathname.startsWith("/app/workspace-setup")) {
    return NextResponse.next();
  }

  if (!protectInternalAppRoutes) {
    return NextResponse.next();
  }

  return protectInternalAppRoutes(request, event);
}

export const config = {
  matcher: ["/app/:path*"],
};
