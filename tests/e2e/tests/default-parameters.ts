/**
 * @fileoverview Default Parameters Test
 *
 * Tests CLI functionality with default parameters to ensure:
 * - CLI commands execute properly with default parameters
 * - Default parameter handling works as expected
 * - Integration between CLI and fetch-dottie functions
 */

import { exec } from "node:child_process";
import { promisify } from "node:util";
import JSON5 from "json5";
import type { Endpoint } from "@/shared/types";
import { getTargetModule } from "../testConfig";
import { ErrorCategory, ErrorSeverity, testLogger } from "../testLogger";
import { runParallelTest } from "../testRunner";

const execAsync = promisify(exec);

/**
 * Test result for default parameters validation
 */
export interface DefaultParametersResult {
  success: boolean;
  message: string;
  testType: "cli" | "default-params";
}

/**
 * Tests CLI functionality with default parameters
 */
async function testDefaultParameters(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  const { api, functionName } = endpoint;

  try {
    testLogger.testStep(
      `Testing default parameters for ${api}.${functionName}`
    );

    // Construct the CLI command using the endpoint's qualified name
    const qualifiedFunctionName = `${api}:${functionName}`;

    // Execute the fetch-dottie CLI command with default parameters
    const command = `node dist/cli/fetch-dottie.mjs ${qualifiedFunctionName}`;
    const { stdout, stderr } = await execAsync(command, {
      cwd: process.cwd(),
      timeout: 60000, // 60 second timeout
      maxBuffer: 1024 * 1024 * 10, // 10MB buffer to handle large API responses
      env: process.env,
    });

    // Check for stderr output which might indicate issues
    if (stderr && stderr.trim() !== "") {
      testLogger.warn(
        `Command ${qualifiedFunctionName} produced stderr: ${stderr}`
      );
    }

    // Try to parse the output to ensure it's valid JSON using JSON5 which is more tolerant of formatting issues
    let data: unknown;
    try {
      data = JSON5.parse(stdout);
    } catch (parseError) {
      return {
        success: false,
        message: `Failed to parse JSON output from CLI: ${parseError instanceof Error ? parseError.message : "Unknown error"}`,
      };
    }

    // Verify that we got meaningful data back
    if (data === null || data === undefined) {
      return {
        success: false,
        message: `CLI command returned null or undefined for ${qualifiedFunctionName}`,
      };
    }

    // For arrays, check if they have content (unless whitelisted)
    if (Array.isArray(data)) {
      const emptyDataWhitelist = [
        "wsf-schedule:routesHavingServiceDisruptions",
        "wsf-schedule:timeAdjustmentsBySchedRoute",
      ];

      if (
        !emptyDataWhitelist.includes(qualifiedFunctionName) &&
        data.length === 0
      ) {
        testLogger.warn(
          `CLI command returned empty array for ${qualifiedFunctionName} (not in whitelist)`
        );
      }
    }

    testLogger.testStep(
      `Default parameters test passed for ${qualifiedFunctionName}`,
      {
        resultType: typeof data,
        isArray: Array.isArray(data),
        hasData: Array.isArray(data) ? data.length > 0 : data !== null,
      }
    );

    return {
      success: true,
      message: `Default parameters test passed for ${qualifiedFunctionName}`,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    // Create detailed error context
    const errorContext = testLogger.createErrorContext(
      error instanceof Error ? error : new Error(errorMessage),
      ErrorCategory.NETWORK,
      ErrorSeverity.HIGH,
      {
        endpoint: endpoint.endpoint,
        apiName: endpoint.api,
        functionName: endpoint.functionName,
        testType: "default-parameters",
        requestDetails: {
          url: endpoint.urlTemplate,
        },
        suggestions: [
          "Check if the CLI command is properly formatted",
          "Verify that the WSDOT_ACCESS_TOKEN environment variable is set",
          "Ensure the dist/cli/fetch-dottie.mjs file exists and is executable",
          "Confirm that the endpoint is accessible and working",
        ],
      }
    );

    testLogger.structuredError(errorContext);

    const qualifiedFunctionName = `${endpoint.api}:${endpoint.functionName}`;
    return {
      success: false,
      message: `Default parameters test failed for ${qualifiedFunctionName}: ${errorMessage}`,
    };
  }
}

/**
 * Master test function that runs default parameters validation
 */
export async function runDefaultParametersTest(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  return await testDefaultParameters(endpoint);
}

// Configuration for this specific test
const config = {
  apiName: getTargetModule() || undefined,
};

// Run the test suite
runParallelTest(runDefaultParametersTest, "default parameters", config);
