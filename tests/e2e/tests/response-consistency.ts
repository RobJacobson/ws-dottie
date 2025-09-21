/**
 * @fileoverview Response Consistency Concern (module)
 */

import { fetchZod } from "@/shared/fetching";
import type { Endpoint } from "@/shared/endpoints";

export async function runResponseConsistency(
  endpoint: Endpoint<unknown, unknown>,
  samples: number = 3,
  maxVarianceMs: number = 5000
): Promise<{
  success: boolean;
  message: string;
  average: number;
  min: number;
  max: number;
  variance: number;
}> {
  try {
    const params = endpoint.sampleParams || {};
    const times: number[] = [];
    for (let i = 0; i < samples; i++) {
      const start = Date.now();
      await fetchZod(endpoint, params, "none");
      times.push(Date.now() - start);
    }
    const min = Math.min(...times);
    const max = Math.max(...times);
    const variance = max - min;
    const average = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
    const ok = variance <= maxVarianceMs;
    return {
      success: ok,
      message: `avg=${average}ms, min=${min}ms, max=${max}ms, variance=${variance}ms`,
      average,
      min,
      max,
      variance,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
      average: 0,
      min: 0,
      max: 0,
      variance: 0,
    };
  }
}
