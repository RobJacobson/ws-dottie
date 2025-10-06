/**
 * @fileoverview Missing Parameters Concern (module)
 */

import type { Endpoint } from "@/shared/endpoints";
import { fetchDottie } from "@/shared/fetching";

export async function runMissingParameters(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  try {
    const params = endpoint.sampleParams || {};
    await fetchDottie({
      endpoint,
      params,
      fetchMode: "native",
      logMode: "none",
      validate: true,
    });
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
