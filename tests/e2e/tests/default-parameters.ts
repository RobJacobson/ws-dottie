/**
 * @fileoverview Default Parameters Validation Test
 *
 * This test validates that all endpoints work with default parameters when called
 * via fetch-dottie with the --no-validation flag. It runs before other tests to
 * ensure basic functionality is working.
 * Can run independently with parallel execution across all endpoints.
 */

import { exec } from "node:child_process";
import { promisify } from "node:util";
import type { Endpoint } from "@/shared/types";
import { getTargetModule } from "../testConfig";
import { testLogger } from "../testLogger";
import { runParallelTest } from "../testRunner";

const execAsync = promisify(exec);

/**
 * Result of a default parameter test
 */
export interface DefaultParameterTestResult {
  success: boolean;
  message: string;
  data?: unknown;
  error?: string;
}

/**
 * Tests an endpoint with default parameters using fetch-dottie --no-validation
 */
async function testEndpointWithDefaultParams(
  endpoint: Endpoint<unknown, unknown>
): Promise<DefaultParameterTestResult> {
  const { api, functionName } = endpoint;

  try {
    const qualifiedFunctionName = `${api}:${functionName}`;
    testLogger.info(`Testing ${qualifiedFunctionName} with default parameters`);

    // Call fetch-dottie with --no-validation flag
    const command = `node dist/cli/fetch-dottie.mjs ${qualifiedFunctionName} --no-validation`;
    const { stdout, stderr } = await execAsync(command, {
      cwd: process.cwd(),
      timeout: 60000, // 60 second timeout
      maxBuffer: 1024 * 1024 * 10, // 10MB buffer to handle large API responses
      env: {
        ...process.env,
        WSDOT_ACCESS_TOKEN:
          process.env.WSDOT_ACCESS_TOKEN ||
          "9e61c697-3c2f-490e-af96-72d4e8ecbc7e",
      },
    });

    // Note: CLI stderr output is suppressed for cleaner test output
    // Original stderr was: ${stderr}

    // Parse the JSON output
    let data: unknown;
    try {
      data = JSON.parse(stdout);
    } catch (parseError) {
      return {
        success: false,
        message: `Failed to parse JSON output: ${parseError}`,
        error: stdout,
      };
    }

    // Check if data is useful (not null, not empty array if array)
    const isUsefulData = (
      value: unknown,
      qualifiedFunctionName: string
    ): boolean => {
      // Whitelist for endpoints that are expected to return empty data
      const emptyDataWhitelist = [
        "wsf-schedule:routesHavingServiceDisruptions",
        "wsf-schedule:timeAdjustmentsBySchedRoute",
      ];

      if (emptyDataWhitelist.includes(qualifiedFunctionName)) {
        // For whitelisted endpoints, return true even if data is empty
        return true;
      }

      if (value === null || value === undefined) {
        return false;
      }

      if (Array.isArray(value)) {
        return value.length > 0;
      }

      if (typeof value === "object") {
        return Object.keys(value).length > 0;
      }

      return true;
    };

    const hasUsefulData = isUsefulData(data, qualifiedFunctionName);
    if (!hasUsefulData) {
      return {
        success: false,
        message: `Returned data is not useful (null, undefined, or empty)`,
        data,
      };
    }

    return {
      success: true,
      message: `Default parameters work and return useful data`,
      data,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      message: `Command failed: ${errorMessage}`,
      error: errorMessage,
    };
  }
}

/**
 * Runs default parameter validation for a single endpoint
 */
export async function runDefaultParameters(
  endpoint: Endpoint<unknown, unknown>
): Promise<DefaultParameterTestResult> {
  return await testEndpointWithDefaultParams(endpoint);
}

// Configuration for this specific test
const config = {
  apiName: getTargetModule() || undefined,
};

// Run the test suite
runParallelTest(
  runDefaultParameters as (
    endpoint: Endpoint<unknown, unknown>
  ) => Promise<{ success: boolean; message: string }>,
  "default parameters",
  config
);
