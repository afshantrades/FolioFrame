const placeholderEmailMarkers = ["example.com", "placeholder", "your_", ".test"];

export function getDevOwnerEmail(
  env: {
    [key: string]: string | undefined;
    DEV_OWNER_EMAIL?: string;
    ADMIN_EMAIL?: string;
  } = process.env,
) {
  const email = env.DEV_OWNER_EMAIL || env.ADMIN_EMAIL;

  if (!email) {
    return null;
  }

  const normalized = email.trim().toLowerCase();

  if (!normalized || placeholderEmailMarkers.some((marker) => normalized.includes(marker))) {
    return null;
  }

  if (!normalized.includes("@")) {
    return null;
  }

  return normalized;
}
