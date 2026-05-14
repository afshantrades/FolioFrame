const authPlaceholderMarkers = ["placeholder", "your_", "example"];

function hasUsableAuthValue(value: string | undefined) {
  if (!value) {
    return false;
  }

  const normalized = value.toLowerCase();
  return !authPlaceholderMarkers.some((marker) => normalized.includes(marker));
}

export function isAuthConfigured() {
  return (
    hasUsableAuthValue(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) &&
    hasUsableAuthValue(process.env.CLERK_SECRET_KEY)
  );
}

export function getAuthConfigurationStatus() {
  return {
    authConfigured: isAuthConfigured(),
    publishableKeyPresent: Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY),
    secretKeyPresent: Boolean(process.env.CLERK_SECRET_KEY),
  };
}
