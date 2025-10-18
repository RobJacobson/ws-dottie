/**
 * @fileoverview Default Parameters Test
 *
 * Tests CLI functionality with default parameters to ensure:
 * - CLI commands execute properly with default parameters
 * - Default parameter handling works as expected
 * - Integration between CLI and fetch-dottie functions
 */

import type { Endpoint } from "@/shared/types";
import { testLogger } from "../testLogger";
import { createTestSuite } from "../testSetup";
import { executeCliTest } from "../testUtils";

/**
 * Tests CLI functionality with default parameters
 */
export async function runDefaultParametersTest(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  const result = await executeCliTest(endpoint, "", {
    timeout: 60000, // 60 second timeout
  });
  return {
    success: result.success,
    message: result.message,
  };
}

// Run the test suite using the centralized setup
createTestSuite({
  description: "default parameters",
  testFunction: runDefaultParametersTest,
});
