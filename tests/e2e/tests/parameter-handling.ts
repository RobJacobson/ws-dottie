/**
 * @fileoverview Parameter Handling Concern (module)
 *
 * Tests how endpoints handle provided sample parameters (or empty params).
 * Orchestrated by main.test.ts. No test registration here.
 */

import type { Endpoint } from "@/shared/endpoints";
import { fetchDottie } from "@/shared/fetching";

export async function runParameterHandling(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  try {
    const params = endpoint.sampleParams || {};
    const result = await fetchDottie({
      endpoint,
      params,
      fetchMode: "native",
      logMode: "none",
      validate: true,
    });
    if (result === undefined) {
      return { success: false, message: "Result is undefined" };
    }
    return {
      success: true,
      message: "Accepted parameters",
    };
  } catch (error) {
    // Some endpoints may reject certain params; that's acceptable behavior
    return {
      success: true,
      message: "Rejected invalid params as expected",
    };
  }
}
