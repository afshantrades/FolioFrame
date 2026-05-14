export type DatabaseVerificationSummary = {
  databaseConfigured: boolean;
  canConnect: boolean;
  migrationLikelyApplied: boolean;
  seededWorkspaceFound: boolean;
  workspaceCount: number;
  productCount: number;
  productTierCount: number;
  auditLogCount: number;
  warnings: string[];
};

export function createDatabaseVerificationSummaryFallback(
  warnings: string[] = ["DATABASE_URL is not configured; local database verification skipped."],
): DatabaseVerificationSummary {
  return {
    databaseConfigured: false,
    canConnect: false,
    migrationLikelyApplied: false,
    seededWorkspaceFound: false,
    workspaceCount: 0,
    productCount: 0,
    productTierCount: 0,
    auditLogCount: 0,
    warnings,
  };
}
