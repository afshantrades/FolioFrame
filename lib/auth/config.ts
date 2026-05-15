import { getAuthMode, getAuthStatusSummary, isClerkConfigured } from "./authMode.ts";
import { getAuthConfigurationStatus } from "./isAuthConfigured.ts";

export { getAuthMode, getAuthStatusSummary, isClerkConfigured };

export function getAuthFoundationStatus() {
  const status = getAuthConfigurationStatus();

  return {
    clerkConfigured: status.authConfigured,
    publishableKeyPresent: status.publishableKeyPresent,
    secretKeyPresent: status.secretKeyPresent,
  };
}
