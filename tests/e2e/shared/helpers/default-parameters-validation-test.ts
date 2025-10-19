import { expect, it } from "vitest";
import type { z } from "zod";
import type { Endpoint } from "../../../../src/shared/types";

/**
 * Creates a test that validates default parameters meet the Zod input schema
 */
export const createDefaultParametersValidationTest = (
  endpoint: Endpoint<unknown, unknown>
) => {
  it(`It should validate that default parameters meet the Zod input schema for ${endpoint.api}.${endpoint.functionName}`, () => {
    if (!endpoint.sampleParams) {
      // If there are no sample parameters, the test passes by default
      return;
    }

    try {
      // Validate the sample parameters against the input schema
      endpoint.inputSchema.parse(endpoint.sampleParams);
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "name" in error &&
        error.name === "ZodError"
      ) {
        const zodError = error as z.ZodError;
        const prettyError = zodError.format();
        throw new Error(
          `Default parameters do not meet Zod input schema for ${endpoint.api}.${endpoint.functionName}:\n${JSON.stringify(prettyError, null, 2)}`
        );
      } else {
        throw error;
      }
    }
  });
};
