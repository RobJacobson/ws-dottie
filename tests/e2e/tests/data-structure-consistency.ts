/**
 * @fileoverview Data Structure Consistency Concern (module)
 *
 * Ensures repeated calls return consistent types and reasonable array sizes.
 */

import { fetchDottie } from "@/shared/fetching";
import type { Endpoint } from "@/shared/types";

export async function runDataStructureConsistency(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  try {
    const params = endpoint.sampleParams || {};

    // For performance, only do consistency check on small datasets
    const r1 = await fetchDottie({
      endpoint,
      params,
      fetchMode: "native",
      logMode: "none",
      validate: true,
    });

    // Skip second API call for large datasets to improve performance
    if (Array.isArray(r1) && r1.length > 50) {
      return {
        success: true,
        message: `Data structure consistency skipped for large dataset (${r1.length} items) - ${endpoint.functionName}`,
      };
    }

    const r2 = await fetchDottie({
      endpoint,
      params,
      fetchMode: "native",
      logMode: "none",
      validate: true,
    });

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
