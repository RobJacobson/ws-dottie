/**
 * @fileoverview API Test Factory
 *
 * Provides a factory function to create API test suites with minimal code duplication.
 */

import { describe } from "vitest";
import { endpoints } from "@/shared/endpoints";
import type { Endpoint } from "@/shared/types";
import { createStandardEndpointTests } from "./test-templates";

/**
 * Creates a complete test suite for a specific API
 *
 * @param apiName - The name of the API to test (e.g., "wsdot-toll-rates")
 * @param apiDescription - Human-readable description for the test suite
 */
export const createApiTestSuite = (apiName: string, apiDescription: string) => {
  // Get all endpoints for the specified API
  const apiEndpoints = endpoints.filter(
    (ep: Endpoint<unknown, unknown>) => ep.api === apiName
  );

  describe(apiDescription, () => {
    apiEndpoints.forEach((endpoint: Endpoint<unknown, unknown>) => {
      describe(`${endpoint.functionName}`, () => {
        // Apply all standard tests to this endpoint
        createStandardEndpointTests(endpoint);
      });
    });
  });
};
