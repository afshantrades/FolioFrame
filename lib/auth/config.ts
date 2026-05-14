import { getAuthConfigurationStatus, isAuthConfigured } from "./isAuthConfigured";

export function isClerkConfigured() {
  return isAuthConfigured();
}

export function getAuthFoundationStatus() {
  const status = getAuthConfigurationStatus();

  return {
    clerkConfigured: status.authConfigured,
    publishableKeyPresent: status.publishableKeyPresent,
    secretKeyPresent: status.secretKeyPresent,
  };
}
