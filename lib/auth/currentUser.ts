import "server-only";

import { auth } from "@clerk/nextjs/server";

import { prisma } from "@/lib/db";
import { isClerkConfigured } from "./config";

export async function getCurrentUserRecord() {
  if (!isClerkConfigured()) {
    return null;
  }

  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  return prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
}

export async function requireCurrentUser() {
  const user = await getCurrentUserRecord();

  if (!user) {
    throw new Error("A signed-in FolioFrame user record is required.");
  }

  return user;
}
