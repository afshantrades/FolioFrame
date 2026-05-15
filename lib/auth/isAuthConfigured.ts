import { getAuthMode, isClerkConfigured } from "./authMode.ts";

export function isAuthConfigured() {
  return isClerkConfigured();
}

export function getAuthConfigurationStatus() {
  const authMode = getAuthMode();

  return {
    authConfigured: authMode.configured,
    publishableKeyPresent: authMode.publishableKeyPresent,
    secretKeyPresent: authMode.secretKeyPresent,
    mode: authMode.mode,
    reason: authMode.reason,
    publicMessage: authMode.publicMessage,
  };
}
