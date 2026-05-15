export type AuthMode = "disabled-dev" | "clerk";

export type AuthStatusSummary = {
  configured: boolean;
  clerkConfigured: boolean;
  mode: AuthMode;
  reason: string;
  publicMessage: string;
  publishableKeyPresent: boolean;
  secretKeyPresent: boolean;
};

type AuthEnv = {
  [key: string]: string | undefined;
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?: string;
  CLERK_SECRET_KEY?: string;
};

const authPlaceholderMarkers = ["placeholder", "your_", "example"];

function hasUsableAuthValue(value: string | undefined) {
  if (!value) {
    return false;
  }

  const normalized = value.toLowerCase();

  return !authPlaceholderMarkers.some((marker) => normalized.includes(marker));
}

export function isClerkConfigured(env: AuthEnv = process.env) {
  return (
    hasUsableAuthValue(env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) &&
    hasUsableAuthValue(env.CLERK_SECRET_KEY)
  );
}

export function getAuthMode(env: AuthEnv = process.env): AuthStatusSummary {
  const publishableKeyPresent = Boolean(env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  const secretKeyPresent = Boolean(env.CLERK_SECRET_KEY);
  const clerkConfigured = isClerkConfigured(env);

  if (clerkConfigured) {
    return {
      configured: true,
      clerkConfigured: true,
      mode: "clerk",
      reason: "Clerk publishable and secret keys are present and not placeholders.",
      publicMessage:
        "Clerk auth mode is active. Internal routes are prepared for signed-in workspace access.",
      publishableKeyPresent,
      secretKeyPresent,
    };
  }

  return {
    configured: false,
    clerkConfigured: false,
    mode: "disabled-dev",
    reason:
      "Clerk keys are missing or still use placeholder values in this environment.",
    publicMessage:
      "Auth is not configured in this local environment, so the portal remains available as a static/demo preview.",
    publishableKeyPresent,
    secretKeyPresent,
  };
}

export function getAuthStatusSummary(env: AuthEnv = process.env) {
  return getAuthMode(env);
}
