/**
 * @fileoverview Performance Test Utilities
 *
 * Utility functions for testing performance characteristics.
 */

import type { Endpoint } from "@/shared/endpoints";
import { fetchZod } from "@/shared/fetching";

/**
 * Creates a performance test for an endpoint
 */
export const createPerformanceTest = <TParams, TOutput>(
  endpoint: Endpoint<TParams, TOutput>,
  maxResponseTime: number = 10000
) => ({
  name: `Performance: ${endpoint.functionName} (${endpoint.api})`,
  test: async (params: TParams) => {
    const context = `${endpoint.api}.${endpoint.functionName}`;

    try {
      const startTime = Date.now();
      await fetchZod(endpoint, params, "none");
      const duration = Date.now() - startTime;

      const withinLimit = duration <= maxResponseTime;

      return {
        success: withinLimit,
        message: `Performance test ${withinLimit ? "passed" : "failed"} for ${context}: ${duration}ms (limit: ${maxResponseTime}ms)`,
        responseTime: duration,
        withinLimit,
      };
    } catch (error) {
      return {
        success: false,
        message: `Performance test failed for ${context}: ${error instanceof Error ? error.message : "Unknown error"}`,
        responseTime: 0,
        withinLimit: false,
      };
    }
  },
});

/**
 * Creates a consistency test for an endpoint
 */
export const createConsistencyTest = <TParams, TOutput>(
  endpoint: Endpoint<TParams, TOutput>,
  samples: number = 3,
  maxVariance: number = 5000
) => ({
  name: `Consistency: ${endpoint.functionName} (${endpoint.api})`,
  test: async (params: TParams) => {
    const context = `${endpoint.api}.${endpoint.functionName}`;

    try {
      const responseTimes: number[] = [];

      // Make multiple calls to test consistency
      for (let i = 0; i < samples; i++) {
        const startTime = Date.now();
        await fetchZod(endpoint, params, "none");
        const duration = Date.now() - startTime;
        responseTimes.push(duration);
      }

      const average =
        responseTimes.reduce((sum, time) => sum + time, 0) /
        responseTimes.length;
      const min = Math.min(...responseTimes);
      const max = Math.max(...responseTimes);
      const variance = max - min;
      const isConsistent = variance <= maxVariance;

      return {
        success: isConsistent,
        message: `Consistency test ${isConsistent ? "passed" : "failed"} for ${context}: avg=${average.toFixed(0)}ms, min=${min}ms, max=${max}ms, variance=${variance}ms`,
        average,
        min,
        max,
        variance,
        isConsistent,
      };
    } catch (error) {
      return {
        success: false,
        message: `Consistency test failed for ${context}: ${error instanceof Error ? error.message : "Unknown error"}`,
        average: 0,
        min: 0,
        max: 0,
        variance: 0,
        isConsistent: false,
      };
    }
  },
});

