/**
 * @fileoverview API Test Factory
 *
 * Provides a factory function to create API test suites with minimal code duplication.
 */

import { describe } from "vitest";
import { endpointsFlat } from "@/apis";
import type { Endpoint, EndpointParams, EndpointResponse } from "@/apis/types";
import { createStandardEndpointTests, SKIP_ALL_TESTS } from "./test-templates";

/**
 * Converts kebab-case to camelCase
 *
 * This function handles the conversion from kebab-case (e.g., "fetch-travel-times")
 * to camelCase (e.g., "fetchTravelTimes") for matching function names.
 *
 * @param str - The kebab-case string to convert
 * @returns The camelCase string
 * @example
 * ```typescript
 * kebabToCamel("fetch-travel-times") // Returns "fetchTravelTimes"
 * kebabToCamel("fetch-vessel-basics") // Returns "fetchVesselBasics"
 * ```
 */
const kebabToCamel = (str: string): string => {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

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
  const endpoint = endpointsFlat.find(
    (ep: Endpoint<EndpointParams, EndpointResponse>) =>
      ep.api.name === apiName && ep.functionName === functionName
  );

  if (!endpoint) {
    throw new Error(
      `Endpoint not found: "${endpointId}". Available endpoints: ${endpointsFlat
        .map((ep) => `${ep.api.name}.${ep.functionName}`)
        .join(", ")}`
    );
  }

  const endpointIdentifier = `${endpoint.api.name}.${endpoint.functionName}`;

  // Add filtering based on environment variables
  const apiFilter = process.env.API_FILTER;
  const functionFilter = process.env.FUNCTION_FILTER;

  if (
    (apiFilter && endpoint.api.name !== apiFilter) ||
    (functionFilter &&
      endpoint.functionName !== functionFilter &&
      endpoint.functionName !== kebabToCamel(functionFilter))
  ) {
    return; // Skip this endpoint if it doesn't match the filter
  }

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
