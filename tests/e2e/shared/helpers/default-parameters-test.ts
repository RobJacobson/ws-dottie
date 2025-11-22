import { expect, it } from "vitest";
import type { Endpoint, EndpointParams, EndpointResponse } from "@/apis/types";
import { fetchDottie } from "@/shared/fetching";

/**
 * Creates a test that fetches with default parameters from an endpoint
 */
export const createDefaultParametersTest = (
  endpoint: Endpoint<EndpointParams, EndpointResponse>
) => {
  it(`It should fetch with default parameters from ${endpoint.api.name}.${endpoint.functionName}`, async () => {
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
