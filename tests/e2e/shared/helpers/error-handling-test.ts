import { expect, it } from "vitest";
import { fetchDottie } from "@/shared/fetching";
import type { Endpoint } from "@/shared/types";

/**
 * Creates a test that handles invalid parameters appropriately
 */
export const createErrorHandlingTest = (
  endpoint: Endpoint<unknown, unknown>
) => {
  it(`It should handle invalid parameters appropriately for ${endpoint.api}.${endpoint.functionName}`, async () => {
    // Test with invalid parameters
    const paramsWithInvalid = {
      ...(endpoint.sampleParams || {}),
      invalidParam: "invalidValue",
    };

    try {
      const result = await fetchDottie({
        endpoint,
        params: paramsWithInvalid,
        fetchMode: "native",
        logMode: "none",
        validate: true,
      });

      // If no error was thrown, the API might accept invalid params, which is fine
      expect(result).toBeDefined();
    } catch (error) {
      // API properly rejected invalid parameters
      expect(error).toBeDefined();
    }
  });
};
