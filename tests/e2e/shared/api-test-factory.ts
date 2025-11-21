/**
 * @fileoverview API Test Factory
 *
 * Provides a factory function to create API test suites with minimal code duplication.
 */

import { describe } from "vitest";
import { endpoints } from "@/apis";
import type { Endpoint } from "@/shared/types";
import { createStandardEndpointTests, SKIP_ALL_TESTS } from "./test-templates";

/**
 * Creates a complete test suite for a specific endpoint
 *
 * @param endpointId - The endpoint identifier in format "apiName.functionName" (e.g., "wsf-vessels.vesselBasics")
 */
export const createEndpointSuite = (endpointId: string) => {
  // Split endpointId into apiName and functionName
  const [apiName, functionName] = endpointId.split(".");
  if (!apiName || !functionName) {
    throw new Error(
      `Invalid endpointId format: "${endpointId}". Expected format: "apiName.functionName" (e.g., "wsf-vessels.vesselBasics")`
    );
  }

  // Find the specific endpoint
  const endpoint = endpoints.find(
    (ep: Endpoint<unknown, unknown>) =>
      ep.api.name === apiName && ep.functionName === functionName
  );

  if (!endpoint) {
    throw new Error(
      `Endpoint not found: "${endpointId}". Available endpoints: ${endpoints
        .map((ep) => `${ep.api.name}.${ep.functionName}`)
        .join(", ")}`
    );
  }

  const endpointIdentifier = `${endpoint.api.name}.${endpoint.functionName}`;

  // Skip creating describe block for endpoints that skip all tests
  if (SKIP_ALL_TESTS.has(endpointIdentifier)) {
    return;
  }

  const suiteName = `${endpoint.api.name} • ${endpoint.functionName}`;

  describe(suiteName, () => {
    // Apply all standard tests to this endpoint
    createStandardEndpointTests(endpoint);
  });
};
