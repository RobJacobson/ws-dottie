/**
 * @fileoverview Schema Validation Concern (module)
 *
 * Validates that API responses match expected Zod schemas.
 * Meant to be orchestrated by main.test.ts. Contains no test registration.
 */

import type { Endpoint } from "@/shared/endpoints";
import { fetchDottie } from "@/shared/fetching";

export async function runSchemaValidation(
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

    if (result === undefined || result === null) {
      return { success: false, message: "Result is undefined or null" };
    }

    return { success: true, message: "Schema validation passed" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
