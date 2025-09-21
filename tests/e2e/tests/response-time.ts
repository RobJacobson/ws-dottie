/**
 * @fileoverview Response Time Concern (module)
 */

import { fetchZod } from "@/shared/fetching";
import type { Endpoint } from "@/shared/endpoints";

export async function runResponseTime(
  endpoint: Endpoint<unknown, unknown>,
  maxMs: number = 10000
): Promise<{ success: boolean; message: string; duration: number }> {
  const params = endpoint.sampleParams || {};
  const start = Date.now();
  try {
    await fetchZod(endpoint, params, "none");
    const duration = Date.now() - start;
    const ok = duration <= maxMs;
    return {
      success: ok,
      message: `Response time: ${duration}ms (limit ${maxMs}ms)`,
      duration,
    };
  } catch (error) {
    const duration = Date.now() - start;
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
      duration,
    };
  }
}
