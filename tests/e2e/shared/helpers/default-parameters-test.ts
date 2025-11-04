import { expect, it } from "vitest";
import { fetchDottie } from "@/shared/fetching";
import type { Endpoint } from "@/shared/types";

/**
 * Creates a test that fetches with default parameters from an endpoint
 */
export const createDefaultParametersTest = (
  endpoint: Endpoint<unknown, unknown>
) => {
  it(`It should fetch with default parameters from ${endpoint.api}.${endpoint.functionName}`, async () => {
    const result = await fetchDottie({
      endpoint,
      params: endpoint.sampleParams || {},
      fetchMode: "native",
      logMode: "none",
      validate: true,
    });

    expect(result).toBeDefined();
  });
};
