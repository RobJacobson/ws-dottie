/**
 * @fileoverview Endpoint Definition Factory
 *
 * This module provides a factory function for creating standardized endpoint definitions
 * that serve as the single source of truth for all API endpoints. Each endpoint definition
 * contains all the metadata needed for CLI execution, testing, and TanStack Query integration.
 *
 * The factory eliminates duplication by centralizing endpoint metadata and providing
 * consistent patterns for handler creation, query options, and parameter validation.
 */

/** biome-ignore-all lint/suspicious/noExplicitAny: Need for typing */

import type { z } from "zod";
import { createQueryOptions } from "./tanstack/factory";
import { zodFetch } from "./fetching";

/**
 * Cache strategy configurations for different types of data
 *
 * These strategies align with the existing tanstackRefetchOptions and provide
 * appropriate caching behavior based on data update frequency.
 */
export type CacheStrategy =
  | "REALTIME_UPDATES" // Real-time data that updates frequently (5-second intervals)
  | "MINUTE_UPDATES" // Data that updates every minute (traffic, wait times)
  | "FIVE_MINUTE_UPDATES" // Data that updates every 5 minutes (frequent updates)
  | "HOURLY_UPDATES" // Data that updates hourly (moderate frequency)
  | "DAILY_UPDATES" // Data that updates daily (low frequency)
  | "DAILY_STATIC" // Static data that rarely changes (daily refresh)
  | "WEEKLY_STATIC" // Very static data that changes infrequently (weekly refresh)
  | "NONE"; // No caching strategy (for testing or special cases)

/**
 * Complete endpoint metadata interface
 *
 * This interface contains all the essential information needed for:
 * - CLI execution (endpoint, inputSchema, functionName)
 * - Testing (sampleParams for validator and e2e tests)
 * - TanStack Query integration (cacheStrategy, queryKey generation)
 * - Runtime type safety (inputSchema, outputSchema)
 *
 * @template I - The input parameters type
 * @template O - The output response type
 */
export interface Endpoint<I, O> {
  /** Module group identifier (e.g., "wsdot-highway-cameras") */
  moduleGroup: string;

  /** Function name (e.g., "getHighwayCameras") */
  functionName: string;

  /** HTTP endpoint URL template */
  endpoint: string;

  /** Zod schema for input parameter validation */
  inputSchema: z.ZodSchema<I>;

  /** Zod schema for output response validation */
  outputSchema: z.ZodSchema<O>;

  /** Optional sample parameters for testing and validation */
  sampleParams?: Partial<I>;

  /** Cache strategy for TanStack Query integration */
  cacheStrategy: CacheStrategy;
}

/**
 * Return type from defineEndpoint factory
 *
 * Provides the complete endpoint definition along with generated handler and options.
 * This allows for both the new metadata-driven approach and backward compatibility.
 *
 * @template I - The input parameters type
 * @template O - The output response type
 */
export interface EndpointDefinition<I, O> {
  /** Complete endpoint metadata */
  meta: Endpoint<I, O>;

  /** Generated handler function using zodFetch */
  handleFetch: (params: I) => Promise<O>;

  /** Generated TanStack Query options */
  queryOptions: (params: I) => any; // Simplified type to avoid complex TanStack Query type issues
}

/**
 * Factory function for creating standardized endpoint definitions
 *
 * This function creates a complete endpoint definition that serves as the single
 * source of truth for all API endpoints. It generates:
 * - A handler function using zodFetch with the provided schemas
 * - TanStack Query options with appropriate caching strategy
 * - Stable query keys based on moduleGroup and functionName
 *
 * The generated query key follows the pattern [moduleGroup, functionName] which
 * provides stable, unique identifiers for TanStack Query caching.
 *
 * @template I - The input parameters type
 * @template O - The output response type
 * @param meta - Complete endpoint metadata
 * @returns Endpoint definition with handler and options
 *
 * @example
 * ```typescript
 * export const getHighwayCamerasDef = defineEndpoint({
 *   moduleGroup: "wsdot-highway-cameras",
 *   functionName: "getHighwayCameras",
 *   endpoint: "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCamerasAsJson",
 *   inputSchema: getHighwayCamerasParamsSchema,
 *   outputSchema: camerasSchema,
 *   sampleParams: {},
 *   cacheStrategy: "DAILY_STATIC",
 * });
 * ```
 */
export function defineEndpoint<I, O>(
  meta: Endpoint<I, O>
): EndpointDefinition<I, O> {
  // Generate handler using zodFetch with provided metadata
  const handleFetch = (params: I): Promise<O> =>
    zodFetch({
      endpoint: meta.endpoint,
      inputSchema: meta.inputSchema,
      outputSchema: meta.outputSchema,
      params,
    });

  // Generate stable query key from metadata
  const queryKey = [meta.moduleGroup, meta.functionName];

  // Generate TanStack Query options with appropriate caching strategy
  const queryOptions = createQueryOptions({
    apiFunction: handleFetch,
    queryKey,
    cacheStrategy: meta.cacheStrategy as any, // Type assertion needed for compatibility
  });

  return {
    meta,
    handleFetch,
    queryOptions,
  } as const;
}
