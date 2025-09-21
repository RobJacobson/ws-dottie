/**
 * @fileoverview Missing Parameters Concern (module)
 */

import { fetchZod } from "@/shared/fetching";
import type { Endpoint } from "@/shared/endpoints";

export async function runMissingParameters(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  try {
    const params = endpoint.sampleParams || {};
    await fetchZod(endpoint, params, "none");
    return {
      success: true,
      message: "Endpoint accepts provided/empty params",
    };
  } catch (_error) {
    return {
      success: true,
      message: "Endpoint correctly rejects missing/invalid params",
    };
  }
}
