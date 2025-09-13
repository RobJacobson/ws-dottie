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
import { zodFetch } from "./fetching";
import { createQueryOptions } from "./tanstack/factory";

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
 * - CLI execution (endpoint, inputSchema, function)
 * - Testing (sampleParams for validator and e2e tests)
 * - TanStack Query integration (cacheStrategy, queryKey generation)
 * - Runtime type safety (inputSchema, outputSchema)
 *
 * @template I - The input parameters type
 * @template O - The output response type
 */
export interface Endpoint<I, O> {
  /** Module group identifier (e.g., "wsdot-highway-cameras") - auto-computed from folder structure */
  api?: string;

  /** Function name (e.g., "getHighwayCameras") - auto-computed from filename */
  function?: string;

  /** HTTP endpoint URL template */
  endpoint: string;

  /** Zod schema for input parameter validation */
  inputSchema: z.ZodSchema<I>;

  /** Zod schema for output response validation */
  outputSchema: z.ZodSchema<O>;

  /** Optional sample parameters for testing and validation */
  sampleParams?: Partial<I> | (() => Promise<Partial<I>>);

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
 * source of truth for all API endpoints. It automatically computes missing
 * api and function fields from the calling context and generates:
 * - A handler function using zodFetch with the provided schemas
 * - TanStack Query options with appropriate caching strategy
 * - Stable query keys based on api and function
 *
 * The generated query key follows the pattern [api, function] which
 * provides stable, unique identifiers for TanStack Query caching.
 *
 * @template I - The input parameters type
 * @template O - The output response type
 * @param meta - Endpoint metadata (api and function are auto-computed if not provided)
 * @returns Endpoint definition with handler and options
 *
 * @example
 * ```typescript
 * // Auto-computes api: "wsdot-highway-cameras" and function: "getHighwayCameras"
 * export const getHighwayCamerasDef = defineEndpoint({
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
  // Auto-compute missing fields from calling context
  const computedApi = meta.api ?? inferApiFromCaller();
  const computedFunction = meta.function ?? inferFunctionFromCaller();

  // Create complete metadata with computed values
  const completeMeta = {
    ...meta,
    api: computedApi,
    function: computedFunction,
  } as Required<Endpoint<I, O>>;

  // Generate handler using zodFetch with provided metadata
  const handleFetch = (params: I): Promise<O> =>
    zodFetch({
      endpoint: completeMeta.endpoint,
      inputSchema: completeMeta.inputSchema,
      outputSchema: completeMeta.outputSchema,
      params,
    });

  // Generate stable query key from metadata
  const queryKey = [completeMeta.api, completeMeta.function];

  // Generate TanStack Query options with appropriate caching strategy
  const queryOptions = createQueryOptions({
    apiFunction: handleFetch,
    queryKey,
    cacheStrategy: completeMeta.cacheStrategy as any, // Type assertion needed for compatibility
  });

  return {
    meta: completeMeta,
    handleFetch,
    queryOptions,
  } as const;
}

/**
 * Infers API name from the calling file's folder structure
 *
 * Extracts the API name from the file path where defineEndpoint is called.
 * Supports both "wsdot-{api}" and "wsf-{api}" patterns.
 *
 * @returns API name (e.g., "wsdot-highway-cameras", "wsf-vessels")
 */
function inferApiFromCaller(): string {
  try {
    const stack = new Error().stack;
    if (stack) {
      const lines = stack.split("\n");
      // Look for the calling file (skip this function and defineEndpoint)
      for (let i = 2; i < lines.length; i++) {
        const line = lines[i];
        const match = line.match(/\((.*?):\d+:\d+\)/);
        if (match) {
          const fullPath = match[1];
          // Convert absolute path to relative path from src/clients
          const relativePath = fullPath.replace(/.*\/src\/clients\//, "");
          const apiFolder = relativePath.split("/")[0];

          if (
            apiFolder &&
            (apiFolder.startsWith("wsdot-") || apiFolder.startsWith("wsf-"))
          ) {
            return apiFolder;
          }
        }
      }
    }
  } catch (error) {
    // Fallback if detection fails
    console.warn("Failed to auto-detect API name from caller, using fallback");
  }

  // Fallback value
  return "unknown-api";
}

/**
 * Infers function name from the calling file's filename
 *
 * Extracts the function name from the filename where defineEndpoint is called.
 * Converts filename to PascalCase and adds "get" prefix.
 *
 * @returns Function name (e.g., "getVesselHistories", "getHighwayCameras")
 */
function inferFunctionFromCaller(): string {
  try {
    const stack = new Error().stack;
    if (stack) {
      const lines = stack.split("\n");
      // Look for the calling file (skip this function and defineEndpoint)
      for (let i = 2; i < lines.length; i++) {
        const line = lines[i];
        const match = line.match(/\((.*?):\d+:\d+\)/);
        if (match) {
          const fullPath = match[1];
          // Convert absolute path to relative path from src/clients
          const relativePath = fullPath.replace(/.*\/src\/clients\//, "");
          const filename = relativePath.split("/").pop();

          if (filename) {
            // Remove .ts extension and convert to PascalCase
            const baseName = filename.replace(/\.ts$/, "");
            const pascalCase =
              baseName.charAt(0).toUpperCase() + baseName.slice(1);
            return `get${pascalCase}`;
          }
        }
      }
    }
  } catch (error) {
    // Fallback if detection fails
    console.warn(
      "Failed to auto-detect function name from caller, using fallback"
    );
  }

  // Fallback value
  return "getUnknown";
}
