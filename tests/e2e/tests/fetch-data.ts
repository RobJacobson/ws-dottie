/**
 * @fileoverview Fetch Data Test
 *
 * This test validates that fetch-dottie can successfully fetch and return data
 * using default parameters. It runs before other tests to ensure basic
 * functionality is working.
 * Can run independently with parallel execution across all endpoints.
 */

import type { Endpoint } from "@/shared/types";
import { testLogger } from "../testLogger";
import { createTestSuite } from "../testSetup";
import { executeCliTest } from "../testUtils";

/**
 * Runs data fetching test for a single endpoint
 */
async function runFetchDataTest(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  const result = await executeCliTest(endpoint, " --no-validation", {
    timeout: 60000, // 60 second timeout
  });

  return {
    success: result.success,
    message: result.message,
  };
}

// Run the test suite using the centralized setup
createTestSuite({
  description: "data fetching",
  testFunction: runFetchDataTest,
});
