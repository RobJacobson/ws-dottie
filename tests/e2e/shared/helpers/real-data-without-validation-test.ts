import { expect, it } from "vitest";
import { fetchDottie } from "../../../../src/shared/fetching";
import type { Endpoint } from "../../../../src/shared/types";

/**
 * Creates a test that fetches real data without validation from an endpoint
 */
export function createRealDataWithoutValidationTest(
  endpoint: Endpoint<unknown, unknown>
) {
  it(`It should fetch real data without validation from ${endpoint.api}.${endpoint.functionName}`, async () => {
    const result = await fetchDottie({
      endpoint,
      params: endpoint.sampleParams || {},
      fetchMode: "native",
      logMode: "none",
      validate: false,
    });

    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    // Validate that we returned real JSON data
    expect(typeof result).toBe("object");
  });
}
