/**
 * @fileoverview Default Parameters Validation Test
 *
 * This test validates that all endpoints work with default parameters when called
 * via fetch-dottie with the --no-validation flag. It runs before other tests to
 * ensure basic functionality is working.
 */

import { exec } from "node:child_process";
import { promisify } from "node:util";
import type { Endpoint } from "@/shared/endpoints";
import { testLogger } from "../testLogger";

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
    const command = `npx fetch-dottie ${qualifiedFunctionName} --no-validation`;
    const { stdout, stderr } = await execAsync(command, {
      cwd: process.cwd(),
      timeout: 30000, // 30 second timeout
      maxBuffer: 1024 * 1024 * 10, // 10MB buffer to handle large API responses
    });

    if (stderr?.trim()) {
      testLogger.warn(`Stderr for ${qualifiedFunctionName}: ${stderr}`);
    }

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
    const isUsefulData = (value: unknown): boolean => {
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

    if (!isUsefulData(data)) {
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
