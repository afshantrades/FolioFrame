import assert from "node:assert/strict";
import test from "node:test";

import { isAuthConfigured } from "../lib/auth/isAuthConfigured.ts";
import { isDatabaseConfigured } from "../lib/live/isDatabaseConfigured.ts";
import { getPortalWorkspaceSnapshot } from "../lib/live/portalDataAdapter.ts";

function withEnv(values, callback) {
  const originals = new Map();

  function restore() {
    for (const [key, value] of originals.entries()) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }

  for (const key of Object.keys(values)) {
    originals.set(key, process.env[key]);

    if (values[key] === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = values[key];
    }
  }

  try {
    const result = callback();

    if (result && typeof result.then === "function") {
      return result.finally(restore);
    }

    restore();
    return result;
  } catch (error) {
    restore();
    throw error;
  }
}

test("isDatabaseConfigured rejects missing and placeholder values", () => {
  withEnv({ DATABASE_URL: undefined }, () => {
    assert.equal(isDatabaseConfigured(), false);
  });

  withEnv(
    { DATABASE_URL: "postgresql://user:password@localhost:5432/folioframe_dev" },
    () => {
      assert.equal(isDatabaseConfigured(), false);
    },
  );
});

test("isDatabaseConfigured accepts plausible Postgres URLs", () => {
  withEnv(
    { DATABASE_URL: "postgresql://folioframe:local-secret@localhost:5432/folioframe_dev" },
    () => {
      assert.equal(isDatabaseConfigured(), true);
    },
  );
});

test("isAuthConfigured rejects missing and placeholder Clerk keys", () => {
  withEnv(
    {
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: undefined,
      CLERK_SECRET_KEY: undefined,
    },
    () => {
      assert.equal(isAuthConfigured(), false);
    },
  );

  withEnv(
    {
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test_placeholder",
      CLERK_SECRET_KEY: "sk_test_placeholder",
    },
    () => {
      assert.equal(isAuthConfigured(), false);
    },
  );
});

test("isAuthConfigured accepts plausible Clerk development keys", () => {
  withEnv(
    {
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test_localDevelopmentKey",
      CLERK_SECRET_KEY: "sk_test_localDevelopmentKey",
    },
    () => {
      assert.equal(isAuthConfigured(), true);
    },
  );
});

test("portal data adapter returns static fallback without auth/database config", async () => {
  await withEnv(
    {
      DATABASE_URL: undefined,
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: undefined,
      CLERK_SECRET_KEY: undefined,
    },
    async () => {
      const snapshot = await getPortalWorkspaceSnapshot();

      assert.equal(snapshot.source, "static-demo");
      assert.equal(snapshot.isLiveReady, false);
      assert.ok(snapshot.products.length > 0);
      assert.ok(snapshot.productTiers.length > 0);
      assert.ok(snapshot.dashboardMetrics.length > 0);
      assert.ok(snapshot.warnings.some((warning) => warning.includes("fallback")));
    },
  );
});
