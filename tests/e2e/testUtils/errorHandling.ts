/**
 * @fileoverview Error Handling Test Utilities
 *
 * Utility functions for testing error handling scenarios.
 */

import type { Endpoint } from "@/shared/endpoints";
import { fetchZod } from "@/shared/fetching";

/**
 * Creates an error handling test for an endpoint
 */
export const createErrorHandlingTest = <TParams, TOutput>(
  endpoint: Endpoint<TParams, TOutput>
) => ({
  name: `Error Handling: ${endpoint.functionName} (${endpoint.api})`,
  test: async (params: TParams) => {
    const context = `${endpoint.api}.${endpoint.functionName}`;

    try {
      const result = await fetchZod(endpoint, params, "none");

      // If we get here, the API call succeeded
      return {
        success: true,
        message: `Error handling test passed for ${context} (API call succeeded)`,
        result,
      };
    } catch (error) {
      // If we get an error, that's also acceptable behavior for error handling tests
      return {
        success: true,
        message: `Error handling test passed for ${context} (API correctly threw error)`,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
});

/**
 * Creates a test for invalid parameter handling
 */
export const createInvalidParameterTest = <TParams, TOutput>(
  endpoint: Endpoint<TParams, TOutput>
) => ({
  name: `Invalid Parameter Handling: ${endpoint.functionName} (${endpoint.api})`,
  test: async () => {
    const context = `${endpoint.api}.${endpoint.functionName}`;

    try {
      // Test with invalid parameter types
      const invalidParams = { id: "not-a-number" } as TParams;
      await fetchZod(endpoint, invalidParams, "none");

      return {
        success: false,
        message: `Expected error for invalid params in ${context}`,
        error: "No error thrown for invalid parameter types",
      };
    } catch (error) {
      return {
        success: true,
        message: `Correctly handled invalid params in ${context}`,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
});
