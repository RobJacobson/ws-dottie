import { expect, it } from "vitest";
import { fetchDottie } from "../../../../src/shared/fetching";
import type { Endpoint } from "../../../../src/shared/types";

/**
 * Creates a test that validates behavior when required URL parameters are missing
 */
export const createMissingParametersTest = (
  endpoint: Endpoint<unknown, unknown>
) => {
  it(`It should throw an error when required URL parameters are missing for ${endpoint.api}.${endpoint.functionName}`, async () => {
    // Test with empty parameters if the endpoint has template parameters
    const hasTemplateParams = endpoint.urlTemplate.includes("{");

    if (hasTemplateParams) {
      // Expect an error to be thrown when parameters are missing
      await expect(
        fetchDottie({
          endpoint,
          params: {}, // Empty params to trigger missing parameter error
          fetchMode: "native",
          logMode: "none",
          validate: false,
        })
      ).rejects.toThrow(/Missing required URL parameters:/);
    } else {
      // If there are no template parameters, calling with empty params should either:
      // 1. Succeed (if the API doesn't require any parameters)
      // 2. Fail with an API-specific error (which is expected behavior)
      try {
        const result = await fetchDottie({
          endpoint,
          params: {},
          fetchMode: "native",
          logMode: "none",
          validate: false,
        });
        // If it succeeds, that's fine
        expect(result).toBeDefined();
      } catch (error) {
        // If it fails with an API error (not our parameter validation error), that's also fine
        // This could happen if the API requires query parameters that aren't in the URL template
        if (
          error &&
          typeof error === "object" &&
          "name" in error &&
          error.name === "ApiError"
        ) {
          // This is expected - API rejected the call for its own reasons
          return;
        } else {
          // Re-throw if it's not an ApiError (unexpected error type)
          throw error;
        }
      }
    }
  });
};
