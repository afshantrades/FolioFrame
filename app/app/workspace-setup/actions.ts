"use server";

import { redirect } from "next/navigation";

import { createDemoWorkspaceForCurrentUser } from "@/lib/services/workspaceBootstrapService";

export async function createDemoWorkspaceAction() {
  const result = await createDemoWorkspaceForCurrentUser();

  if (result.ok) {
    redirect("/app/premium-dashboard");
  }

  redirect("/app/workspace-setup");
}
