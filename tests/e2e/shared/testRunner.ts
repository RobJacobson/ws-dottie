/**
 * @fileoverview Test Execution Utilities
 *
 * Shared utilities for running tests across multiple endpoints with common
 * patterns for result processing and logging.
 */

import type { Endpoint, Endpoints } from "@/shared/endpoints";
import { testLogger } from "../testLogger";

/**
 * Generic test result structure
 */
export interface TestResult<T = unknown> {
  success: boolean;
  message: string;
  endpoint: string;
  duration?: number;
  error?: string;
  details?: T;
}

/**
 * Test execution configuration
 */
export interface TestExecutionConfig {
  maxEndpoints?: number;
  logIndividualResults?: boolean;
  logSummary?: boolean;
}

/**
 * Runs tests across multiple endpoints using the common Promise.all pattern
 */
export async function runEndpointTests<TResult>(
  endpoints: Endpoints,
  testFn: (endpoint: Endpoint<unknown, unknown>) => Promise<TResult>,
  config: TestExecutionConfig = {}
): Promise<TResult[]> {
  const {
    maxEndpoints,
    logIndividualResults = true,
    logSummary = true,
  } = config;

  // Use all endpoints by default; optionally limit if maxEndpoints is provided
  const testEndpoints =
    typeof maxEndpoints === "number" && maxEndpoints > 0
      ? endpoints.slice(0, maxEndpoints)
      : endpoints;

  if (testEndpoints.length === 0) {
    testLogger.warn("No endpoints available for testing");
    return [];
  }

  // Run tests in parallel
  const results = await Promise.all(
    testEndpoints.map(async (endpoint) => {
      try {
        const startTime = Date.now();
        const result = await testFn(endpoint);
        const duration = Date.now() - startTime;

        // Add timing information if result supports it
        if (result && typeof result === "object" && "duration" in result) {
          (result as Record<string, unknown>).duration = duration;
        }

        if (logIndividualResults) {
          const success =
            result && typeof result === "object" && "success" in result
              ? (result as Record<string, unknown>).success
              : true;
          const status = success ? "✅" : "❌";
          testLogger.info(
            `  ${status} ${endpoint.functionName} (${duration}ms)`
          );
        }

        return result;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";

        if (logIndividualResults) {
          testLogger.error(`  ❌ ${endpoint.functionName}: ${errorMessage}`);
        }

        // Return error result in expected format
        return {
          success: false,
          message: `Test failed for ${endpoint.functionName}`,
          endpoint: endpoint.functionName,
          error: errorMessage,
        } as TResult;
      }
    })
  );

  if (logSummary) {
    const successCount = results.filter((result) => {
      if (result && typeof result === "object" && "success" in result) {
        return (result as Record<string, unknown>).success;
      }
      return true; // Assume success if no success property
    }).length;

    testLogger.info(
      `Test execution completed: ${successCount}/${results.length} passed`
    );
  }

  return results;
}

/**
 * Processes test results and logs summary information
 */
export function processTestResults<TResult>(
  results: TResult[],
  testType: string
): { passed: number; total: number; success: boolean } {
  const passed = results.filter((result) => {
    if (result && typeof result === "object" && "success" in result) {
      return (result as Record<string, unknown>).success;
    }
    return true; // Assume success if no success property
  }).length;

  const total = results.length;
  const success = passed === total;

  testLogger.info(`${testType}: ${passed}/${total} passed`);

  return { passed, total, success };
}

/**
 * Validates that all tests passed and throws if not
 */
export function validateTestResults<TResult>(
  results: TResult[],
  testType: string
): void {
  const { passed, total, success } = processTestResults(results, testType);

  if (!success) {
    throw new Error(
      `${testType}: Expected all tests to pass, but ${total - passed} failed`
    );
  }
}

/**
 * Creates a test function that measures execution time
 */
export function withTiming<TParams, TResult>(
  testFn: (endpoint: Endpoint<TParams, unknown>) => Promise<TResult>
) {
  return async (
    endpoint: Endpoint<TParams, unknown>
  ): Promise<TResult & { duration: number }> => {
    const startTime = Date.now();
    const result = await testFn(endpoint);
    const duration = Date.now() - startTime;

    return {
      ...result,
      duration,
    } as TResult & { duration: number };
  };
}
