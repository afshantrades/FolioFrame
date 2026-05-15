import "server-only";

import type { User } from "@prisma/client";
import { auth, currentUser as getClerkCurrentUser } from "@clerk/nextjs/server";

import { prisma } from "@/lib/db";
import { isDatabaseConfigured } from "@/lib/live/isDatabaseConfigured";
import { getAuthMode } from "./authMode.ts";

export type CurrentClerkIdentity =
  | {
      status: "disabled-dev";
      clerkConfigured: false;
      clerkUserId: null;
      email: null;
      name: null;
      reason: string;
      publicMessage: string;
    }
  | {
      status: "unauthenticated";
      clerkConfigured: true;
      clerkUserId: null;
      email: null;
      name: null;
      reason: string;
      publicMessage: string;
    }
  | {
      status: "authenticated";
      clerkConfigured: true;
      clerkUserId: string;
      email: string | null;
      name: string | null;
      reason: string;
      publicMessage: string;
    };

export type CurrentUserRecordResult =
  | {
      status: "auth-disabled" | "unauthenticated" | "database-unavailable" | "missing-email";
      user: null;
      identity: CurrentClerkIdentity;
      reason: string;
      publicMessage: string;
    }
  | {
      status: "ready";
      user: User;
      identity: Extract<CurrentClerkIdentity, { status: "authenticated" }>;
      reason: string;
      publicMessage: string;
    };

function formatClerkName(user: Awaited<ReturnType<typeof getClerkCurrentUser>>) {
  if (!user) {
    return null;
  }

  const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();

  return name || user.fullName || null;
}

export async function getCurrentClerkIdentity(): Promise<CurrentClerkIdentity> {
  const authMode = getAuthMode();

  if (!authMode.configured) {
    return {
      status: "disabled-dev",
      clerkConfigured: false,
      clerkUserId: null,
      email: null,
      name: null,
      reason: authMode.reason,
      publicMessage: authMode.publicMessage,
    };
  }

  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        status: "unauthenticated",
        clerkConfigured: true,
        clerkUserId: null,
        email: null,
        name: null,
        reason: "Clerk is configured but no signed-in user session was found.",
        publicMessage: "Sign in with Clerk to open a FolioFrame workspace.",
      };
    }

    const clerkUser = await getClerkCurrentUser();
    const primaryEmail =
      clerkUser?.primaryEmailAddress?.emailAddress ??
      clerkUser?.emailAddresses.at(0)?.emailAddress ??
      null;

    return {
      status: "authenticated",
      clerkConfigured: true,
      clerkUserId: userId,
      email: primaryEmail,
      name: formatClerkName(clerkUser),
      reason: "Signed-in Clerk identity is available.",
      publicMessage: "Signed-in Clerk identity is available for workspace lookup.",
    };
  } catch {
    return {
      status: "unauthenticated",
      clerkConfigured: true,
      clerkUserId: null,
      email: null,
      name: null,
      reason:
        "Clerk is configured, but the current request did not provide a readable Clerk session.",
      publicMessage: "Sign in with Clerk to open a FolioFrame workspace.",
    };
  }
}

export async function getOrCreateCurrentUserRecord(): Promise<CurrentUserRecordResult> {
  const identity = await getCurrentClerkIdentity();

  if (identity.status === "disabled-dev") {
    return {
      status: "auth-disabled",
      user: null,
      identity,
      reason: identity.reason,
      publicMessage: identity.publicMessage,
    };
  }

  if (identity.status === "unauthenticated") {
    return {
      status: "unauthenticated",
      user: null,
      identity,
      reason: identity.reason,
      publicMessage: identity.publicMessage,
    };
  }

  if (!isDatabaseConfigured()) {
    return {
      status: "database-unavailable",
      user: null,
      identity,
      reason: "DATABASE_URL is not configured, so the FolioFrame user record cannot be loaded.",
      publicMessage:
        "Configure the local database before mapping Clerk users to FolioFrame users.",
    };
  }

  if (!identity.email) {
    return {
      status: "missing-email",
      user: null,
      identity,
      reason: "The Clerk user does not expose an email address for FolioFrame user mapping.",
      publicMessage:
        "Add a primary email address to the Clerk user before assigning workspace access.",
    };
  }

  const existingByClerkId = await prisma.user.findUnique({
    where: {
      clerkUserId: identity.clerkUserId,
    },
  });

  if (existingByClerkId) {
    const user = await prisma.user.update({
      where: {
        id: existingByClerkId.id,
      },
      data: {
        email: identity.email,
        name: identity.name,
        status: "ACTIVE",
      },
    });

    return {
      status: "ready",
      user,
      identity,
      reason: "Existing FolioFrame user matched by Clerk user id.",
      publicMessage: "FolioFrame user record is ready.",
    };
  }

  const existingByEmail = await prisma.user.findUnique({
    where: {
      email: identity.email,
    },
  });

  if (existingByEmail) {
    const user = await prisma.user.update({
      where: {
        id: existingByEmail.id,
      },
      data: {
        clerkUserId: identity.clerkUserId,
        name: identity.name,
        status: "ACTIVE",
      },
    });

    return {
      status: "ready",
      user,
      identity,
      reason: "Existing FolioFrame user matched by email and linked to Clerk.",
      publicMessage: "FolioFrame user record is ready.",
    };
  }

  const user = await prisma.user.create({
    data: {
      clerkUserId: identity.clerkUserId,
      email: identity.email,
      name: identity.name,
      status: "ACTIVE",
    },
  });

  return {
    status: "ready",
    user,
    identity,
    reason: "Created a FolioFrame user record for the signed-in Clerk identity.",
    publicMessage: "FolioFrame user record is ready.",
  };
}

export async function getCurrentUserRecord() {
  const result = await getOrCreateCurrentUserRecord();

  return result.status === "ready" ? result.user : null;
}

export async function requireCurrentUser() {
  const result = await getOrCreateCurrentUserRecord();

  if (result.status !== "ready") {
    throw new Error(result.publicMessage);
  }

  return result.user;
}
