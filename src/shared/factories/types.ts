/**
 * @fileoverview Consolidated Factory Types
 *
 * This module contains all type definitions for factory functions used in
 * endpoint creation. Types are consolidated here to simplify imports and
 * maintain consistency across the factory system.
 */

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { z } from "zod";
import type { ApiMetadata, EndpointGroup } from "@/apis/types";
import type { CacheStrategy, Endpoint } from "@/shared/types";

// Re-export ApiMetadata for convenience
export { ApiMetadata } from "@/apis/types";

// ============================================================================
// CONFIGURATION TYPES
// ============================================================================

/**
 * Configuration for defining an endpoint
 */
export type DefineEndpointConfig<I, O> = {
  /** The API definition */
  api: ApiMetadata;
  /** The endpoint group this endpoint belongs to */
  group: EndpointGroup;
  /** The function name for this endpoint */
  functionName: string;
  /** The endpoint path (truncated, e.g., "/vesselLocations") */
  endpoint: string;
  /** Zod schema for input validation (optional) */
  inputSchema?: z.ZodSchema<I>;
  /** Zod schema for output validation (optional) */
  outputSchema?: z.ZodSchema<O>;
  /** Optional sample parameters for testing */
  sampleParams?: I | (() => Promise<I>);
  /** One-sentence description of what this specific endpoint does */
  endpointDescription?: string;
};

/**
 * Complete endpoint configuration with computed properties
 */
export type EndpointConfig<I, O> = DefineEndpointConfig<I, O> & {
  /** Complete URL template with domain */
  urlTemplate: string;
  /** Computed unique identifier in format "api:function" */
  id: string;
  /** Cache strategy for the endpoint */
  cacheStrategy: CacheStrategy;
  /** One-sentence description of what this specific endpoint does */
  endpointDescription?: string;
};

// ============================================================================
// PARAMETER TYPES
// ============================================================================

/**
 * Parameters for fetch functions created by factory.
 */
export type FetchFunctionParams<TInput> = {
  /** Input parameters for endpoint */
  params?: TInput;
  /** Fetch strategy - how to fetch data (default: "native") */
  fetchMode?: "native" | "jsonp";
  /** Whether to validate input/output with Zod schemas (default: false) */
  validate?: boolean;
  /** Logging verbosity level (default: "none") */
  logMode?: "none" | "info" | "debug";
};

/**
 * Helper type to simplify query hook options.
 */
export type QueryHookOptions<TData> = Omit<
  UseQueryOptions<TData>,
  "queryKey" | "queryFn"
>;

// ============================================================================
// RESULT TYPES
// ============================================================================

/**
 * Result of defining an endpoint
 */
export type EndpointResult<I, O> = {
  /** The endpoint descriptor for documentation */
  descriptor: Endpoint<I, O>;
  /** Fetch function for this endpoint */
  fetch: (params?: FetchFunctionParams<I>) => Promise<O>;
  /** React Query hook for this endpoint */
  useQuery: (
    params?: FetchFunctionParams<I>,
    options?: QueryHookOptions<O>
  ) => UseQueryResult<O, Error>;
};

// ============================================================================
// CACHE STRATEGY CONFIGURATIONS
// ============================================================================

/**
 * Cache strategy configurations for different data update frequencies
 */
export const cacheStrategies = {
  REALTIME: {
    staleTime: 5 * 1000, // 5 seconds
    gcTime: 60 * 60 * 1000, // 1 hour
    refetchInterval: 5 * 1000, // 5 seconds
    retry: 2,
    retryDelay: 5 * 1000, // 5 seconds
  },
  FREQUENT: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: 5 * 1000, // 5 seconds
  },
  MODERATE: {
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 24 * 60 * 60 * 1000, // 2 days
    refetchInterval: 60 * 60 * 1000, // 1 hour
    retry: 3,
    retryDelay: 60 * 1000, // 1 minute
  },
  STATIC: {
    staleTime: 24 * 60 * 60 * 1000, // 1 day
    gcTime: 2 * 24 * 60 * 60 * 1000, // 2 days
    refetchInterval: 24 * 60 * 60 * 1000, // 1 day
    retry: 2,
    retryDelay: 5 * 1000, // 5 seconds
  },
} as const;
