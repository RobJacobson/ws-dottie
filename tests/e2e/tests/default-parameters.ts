/**
 * @fileoverview Default Parameters Test
 *
 * Tests CLI functionality with default parameters to ensure:
 * - CLI commands execute properly with default parameters
 * - Default parameter handling works as expected
 * - Integration between CLI and fetch-dottie functions
 */

import type { Endpoint } from "@/shared/types";
import { createHierarchicalTestSuiteWrapper } from "../shared/hierarchicalSetup";
import { testLogger } from "../shared/logger";
import { executeCliTest } from "../shared/utils";

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

// Run the test suite using the hierarchical setup
createHierarchicalTestSuiteWrapper({
  description: "default parameters",
  testFunction: runDefaultParametersTest,
});
