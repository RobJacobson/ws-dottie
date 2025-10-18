/**
 * @fileoverview Independent Test Runner for E2E Tests
 *
 * Allows each test file to run independently with parallel execution across endpoints.
 * Supports CLI specification of API and test cases.
 */

// Import expect from vitest for type compatibility
import { describe, it } from "vitest";
import type { Endpoint } from "@/shared/types";
import { setupTestEndpoints } from "./setupUtils";
import { PARALLEL_TEST_TIMEOUT } from "./testConfig";
import { testLogger } from "./testLogger";

/**
 * Configuration for running individual tests
 */
export interface TestConfig {
  apiName?: string | null;
  testName?: string;
}

/**
 * Creates a test suite that runs each API as a separate test case
 */
export function runParallelTest(
  testFn: (
    endpoint: Endpoint<unknown, unknown>
  ) => Promise<{ success: boolean; message: string }>,
  testDescription: string,
  config: TestConfig = {}
): void {
  // Get configuration for filtering
  const targetApi =
    config.apiName && config.apiName !== "all" ? config.apiName : null;

  // Create a top-level describe block for the test suite
  describe(`${testDescription} Tests`, () => {
    // Create individual tests for each API
    describe("API Tests", () => {
      // Generate tests at module load time for proper vitest discovery
      const setupResultPromise = setupTestEndpoints();

      // Create a test that will be discovered by vitest
      it(`should run ${testDescription} for all APIs`, async () => {
        const setupResult = await setupResultPromise;

        // Filter APIs based on configuration
        let apiNames: string[];
        if (targetApi) {
          apiNames = [targetApi];
        } else {
          apiNames = [...Object.keys(setupResult.discoveredEndpoints)].sort();
        }

        // Run tests for each API sequentially, but each API's endpoints in parallel
        for (const apiName of apiNames) {
          const endpoints = (setupResult.discoveredEndpoints[apiName] || [])
            .slice()
            .sort((a, b) => a.functionName.localeCompare(b.functionName));

          if (endpoints.length === 0) {
            testLogger.warn(`No endpoints available for ${apiName}`);
            continue;
          }

          // Run all endpoint tests in parallel for this API
          const startTime = Date.now();
          const endpointTests = endpoints.map(async (endpoint) => {
            try {
              const result = await testFn(endpoint);

              if (result.success) {
                testLogger.testResult(
                  `${apiName}.${endpoint.functionName}`,
                  true,
                  Date.now() - startTime
                );
              } else {
                testLogger.testResultWithError(
                  `${apiName}.${endpoint.functionName}`,
                  false,
                  result.message,
                  Date.now() - startTime
                );
              }

              return {
                endpoint: endpoint.functionName,
                success: result.success,
                message: result.message,
              };
            } catch (error) {
              const duration = Date.now() - startTime;
              const errorMessage = extractDetailedErrorMessage(error, endpoint);

              testLogger.testResultWithError(
                `${apiName}.${endpoint.functionName}`,
                false,
                errorMessage,
                duration
              );

              return {
                endpoint: endpoint.functionName,
                success: false,
                message: errorMessage,
              };
            }
          });

          // Wait for all endpoint tests to complete in parallel
          const results = await Promise.all(endpointTests);

          // Check results for this API
          const failedTests = results.filter((r) => !r.success);
          if (failedTests.length > 0) {
            const failureMessages = failedTests
              .map((f) => `❌ ${apiName}.${f.endpoint}: ${f.message}`)
              .join("\n");

            throw new Error(failureMessages);
          }
        }
      });
    });
  });
}

/**
 * Extracts detailed error messages from various error types
 */
export function extractDetailedErrorMessage(
  error: unknown,
  endpoint: Endpoint<unknown, unknown>
): string {
  // Handle null or undefined errors
  if (error === null || error === undefined) {
    return "Error is null or undefined - check endpoint implementation";
  }

  // Handle Zod validation errors with detailed field information
  if (error instanceof Error && "issues" in error) {
    const zodError = error as any;
    if (zodError.issues && Array.isArray(zodError.issues)) {
      const issues = zodError.issues
        .map((issue: any) => {
          const path =
            issue.path && issue.path.length > 0 ? issue.path.join(".") : "root";
          return `${path}: ${issue.message}`;
        })
        .join("; ");
      return `Zod validation failed - ${issues}`;
    }
  }

  // Handle errors with nested error properties
  if (
    error instanceof Error &&
    "error" in error &&
    (error as any).error instanceof Error
  ) {
    const nestedError = (error as any).error;
    return `Nested error: ${nestedError.message || "No message available"}`;
  }

  // Handle errors with cause property (Node.js 16+)
  if (error instanceof Error && "cause" in error) {
    const cause = (error as any).cause;
    if (cause instanceof Error) {
      return `Caused by: ${cause.message || "No message available"}`;
    }
    if (typeof cause === "string") {
      return `Caused by: ${cause}`;
    }
  }

  // Handle network and HTTP errors
  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    if (message.includes("econnrefused")) {
      return `Connection refused - API server may be down or endpoint URL is incorrect`;
    }
    if (message.includes("enotfound")) {
      return `DNS resolution failed - check endpoint URL: ${endpoint.urlTemplate}`;
    }
    if (message.includes("timeout") || message.includes("etimedout")) {
      return `Request timeout - API took too long to respond`;
    }
    if (message.includes("401") || message.includes("unauthorized")) {
      return `Authentication failed - check API credentials`;
    }
    if (message.includes("403") || message.includes("forbidden")) {
      return `Access forbidden - check API permissions`;
    }
    if (message.includes("404")) {
      return `Endpoint not found - verify endpoint URL: ${endpoint.endpoint}`;
    }
    if (message.includes("429")) {
      return `Rate limit exceeded - too many requests to API`;
    }
    if (
      message.includes("500") ||
      message.includes("502") ||
      message.includes("503")
    ) {
      return `Server error - API server is experiencing issues`;
    }
    if (message.includes("json")) {
      return `JSON parsing failed - API returned malformed response`;
    }
    if (message.includes("unexpected parameters")) {
      return `Parameter validation failed - unexpected parameters provided`;
    }
    if (message.includes("fetch")) {
      return `Network request failed - check connectivity and API availability`;
    }
    if (message.includes("network")) {
      return `Network error - check internet connection and API server status`;
    }
    if (message.includes("certificate") || message.includes("cert")) {
      return `SSL certificate error - check API certificate validity`;
    }
    if (message.includes("aborted")) {
      return `Request aborted - check if endpoint was cancelled`;
    }
  }

  // Handle string errors
  if (typeof error === "string") {
    return `String error: ${error}`;
  }

  // Handle objects with message property
  if (typeof error === "object" && error !== null && "message" in error) {
    const message = (error as any).message;
    if (typeof message === "string") {
      return `Object error: ${message}`;
    }
  }

  // Handle objects with status property (HTTP errors)
  if (typeof error === "object" && error !== null && "status" in error) {
    const status = (error as any).status;
    return `HTTP error with status: ${status}`;
  }

  // Handle objects with code property
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as any).code;
    return `Error code: ${code}`;
  }

  // Try to get any available information from the error object
  if (typeof error === "object" && error !== null) {
    const errorObj = error as any;
    const availableProps = Object.getOwnPropertyNames(errorObj).filter(
      (prop) =>
        prop !== "stack" &&
        prop !== "name" &&
        typeof errorObj[prop] === "string"
    );

    if (availableProps.length > 0) {
      const details = availableProps
        .map((prop) => `${prop}: ${errorObj[prop]}`)
        .join(", ");
      return `Error details - ${details}`;
    }
  }

  // Final fallback with more context
  if (error instanceof Error) {
    return `Error: ${error.name} - ${error.message}`;
  }

  return `Unknown error type: ${typeof error} - ${String(error)}`;
}
