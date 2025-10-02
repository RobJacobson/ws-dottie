/**
 * @fileoverview Data Structure Consistency Concern (module)
 *
 * Ensures repeated calls return consistent types and reasonable array sizes.
 */

import type { Endpoint } from "@/shared/endpoints";
import { fetchAndValidateNative } from "@/shared/fetching";

export async function runDataStructureConsistency(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  try {
    const params = endpoint.sampleParams || {};
    const r1 = await fetchAndValidateNative(endpoint, params, "none");
    const r2 = await fetchAndValidateNative(endpoint, params, "none");

    if (typeof r1 !== typeof r2) {
      return { success: false, message: "Type mismatch between calls" };
    }

    if (Array.isArray(r1) && Array.isArray(r2)) {
      const diff = Math.abs(r1.length - r2.length);
      if (diff > 10) {
        return {
          success: false,
          message: `Array length variance too high: ${diff}`,
        };
      }
    }

    return { success: true, message: "Data structure consistent" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
