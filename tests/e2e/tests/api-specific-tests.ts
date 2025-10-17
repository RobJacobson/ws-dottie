/**
 * @fileoverview API-Specific Test Runner
 *
 * This file demonstrates how to run tests for individual APIs as separate test cases,
 * providing individual feedback for each API instead of a single monolithic test.
 *
 * Usage:
 * - Run all APIs: npx vitest --config config/vitest.config.ts --run tests/e2e/tests/api-specific-tests.ts
 * - Run specific API: npx vitest --config config/vitest.config.ts --run tests/e2e/tests/api-specific-tests.ts -- --api wsdot-highway-alerts
 */

import { fetchDottie } from "@/shared/fetching";
import type { Endpoint } from "@/shared/types";
import { getTargetModule } from "../testConfig";
import { testLogger } from "../testLogger";
import { runParallelTest } from "../testRunner";

/**
 * Test result for API-specific validation
 */
export interface ApiTestResult {
  success: boolean;
  message: string;
  apiName: string;
  endpointCount: number;
  duration: number;
}

/**
 * Tests an endpoint with comprehensive validation and detailed error reporting
 */
async function testEndpoint(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  const startTime = Date.now();
  try {
    const params = endpoint.sampleParams || {};

    const result = await fetchDottie({
      endpoint,
      params,
      fetchMode: "native",
      logMode: "none",
      validate: true,
    });

    if (result === undefined) {
      return {
        success: false,
        message:
          "Endpoint returned undefined result - check if endpoint should return data",
      };
    }

    return {
      success: true,
      message: `Endpoint ${endpoint.functionName} completed successfully`,
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorMessage = extractDetailedErrorMessage(error, endpoint);

    return {
      success: false,
      message: `Endpoint ${endpoint.functionName} failed: ${errorMessage}`,
    };
  }
}

/**
 * Extracts detailed error messages from various error types
 */
function extractDetailedErrorMessage(
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

/**
 * Master test function that runs comprehensive endpoint validation for each API
 */
async function runApiSpecificTests(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  return await testEndpoint(endpoint);
}

// Configuration for this specific test
const config = {
  apiName: getTargetModule() || undefined,
};

// Run the API-specific test suite
runParallelTest(
  runApiSpecificTests,
  "API-specific endpoint validation",
  config
);

// Export individual test functions for potential use in other contexts
export { runApiSpecificTests, testEndpoint };
