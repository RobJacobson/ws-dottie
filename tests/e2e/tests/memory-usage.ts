/**
 * @fileoverview Memory Usage Concern (module)
 */

import type { Endpoint } from "@/shared/endpoints";
import { fetchNativeZod } from "@/shared/fetching";

export async function runMemoryUsage(
  endpoint: Endpoint<unknown, unknown>,
  loops: number = 5,
  maxIncreaseBytes: number = 50 * 1024 * 1024
): Promise<{ success: boolean; message: string; increaseBytes: number }> {
  const params = endpoint.sampleParams || {};
  const before = process.memoryUsage().heapUsed;
  try {
    for (let i = 0; i < loops; i++) {
      await fetchNativeZod(endpoint, params, { logMode: "none" });
    }
    const after = process.memoryUsage().heapUsed;
    const inc = after - before;
    const ok = inc < maxIncreaseBytes;
    return {
      success: ok,
      message: `Memory increase ${(inc / 1024 / 1024).toFixed(2)}MB`,
      increaseBytes: inc,
    };
  } catch (error) {
    const after = process.memoryUsage().heapUsed;
    const inc = after - before;
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
      increaseBytes: inc,
    };
  }
}
