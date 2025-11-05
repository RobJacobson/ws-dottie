/**
 * @fileoverview API Function Factory
 *
 * This module provides a factory function to create strongly-typed API functions
 * that accept a single params object with consistent options.
 */

import { endpoints } from "@/shared/endpoints";
import { fetchDottie } from "@/shared/fetching";
import type { Endpoint } from "@/shared/types";

/**
 * Creates a strongly-typed API function for a specific endpoint
 *
 * @template TInput - Input parameter type
 * @template TOutput - Output response type
 * @param endpointId - The endpoint ID in format "api-name:functionName"
 * @returns A function that accepts a single params object
 */
export function createApiFunction<TInput, TOutput>(endpointId: string) {
  // Find the endpoint by ID
  const endpoint = endpoints.find((e) => e.id === endpointId) as Endpoint<
    TInput,
    TOutput
  >;
  if (!endpoint) {
    throw new Error(`Endpoint not found: ${endpointId}`);
  }

  // Return a function that accepts a single params object
  return (
    options: {
      params?: TInput;
      fetchMode?: "native" | "jsonp";
      validate?: boolean;
    } = {}
  ): Promise<TOutput> => {
    const { params, fetchMode = "native", validate = false } = options;
    return fetchDottie({ endpoint, params, fetchMode, validate });
  };
}
