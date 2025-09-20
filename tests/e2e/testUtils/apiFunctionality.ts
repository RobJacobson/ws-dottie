/**
 * @fileoverview API Functionality Test Utilities
 *
 * Utility functions for testing API functionality and Zod schema validation.
 */

import type { Endpoint } from "@/shared/endpoints";
import { fetchZod } from "@/shared/fetching";

/**
 * Creates an API functionality test for an endpoint
 */
export const createApiFunctionalityTest = <TParams, TOutput>(
  endpoint: Endpoint<TParams, TOutput>
) => ({
  name: `API Functionality: ${endpoint.functionName} (${endpoint.api})`,
  test: async (params: TParams) => {
    const context = `${endpoint.api}.${endpoint.functionName}`;

    try {
      const result = await fetchZod(endpoint, params, "none");

      // Basic validation that we got data
      if (result === undefined || result === null) {
        throw new Error("API returned undefined or null result");
      }

      return {
        success: true,
        message: `API functionality test passed for ${context}`,
        result,
        dataType: Array.isArray(result) ? "array" : typeof result,
        dataSize: Array.isArray(result) ? result.length : 1,
      };
    } catch (error) {
      return {
        success: false,
        message: `API functionality test failed for ${context}: ${error instanceof Error ? error.message : "Unknown error"}`,
        dataType: "unknown",
        dataSize: 0,
      };
    }
  },
});

