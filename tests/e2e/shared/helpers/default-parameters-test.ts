import { expect, it } from "vitest";
import { fetchDottie } from "../../../../src/shared/fetching";
import type { Endpoint } from "../../../../src/shared/types";

/**
 * Creates a test that fetches with default parameters from an endpoint
 */
export function createDefaultParametersTest(
  endpoint: Endpoint<unknown, unknown>
) {
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
}
