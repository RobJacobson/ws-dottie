/**
 * @fileoverview API Types
 *
 * This module contains type definitions for API endpoint structures.
 * These types define the structure that endpoint files use to describe
 * their API endpoints and configurations.
 */

import type { z } from "zod";

// ============================================================================
// CACHE STRATEGY TYPES
// ============================================================================

/**
 * Cache strategies for different data update frequencies
 *
 * These strategies define how frequently data should be refreshed based on
 * nature of transportation data. Each strategy includes appropriate
 * stale time, garbage collection time, and refetch intervals.
 */
export type CacheStrategy =
  | "REALTIME" // Real-time data (5-second updates) - traffic conditions, alerts
  | "FREQUENT" // Frequently updated data (5-minute updates) - schedules, delays
  | "MODERATE" // Moderately updated data (hourly updates) - weather, conditions
  | "STATIC"; // Static data (daily updates) - terminals, vessels, routes

// ============================================================================
// ENDPOINT TYPES
// ============================================================================

/**
 * Type representing endpoint input parameters
 *
 * All endpoint inputs are plain objects with string keys, typically
 * containing query parameters, path parameters, or request body data.
 * This type provides semantic meaning over the generic Record<string, unknown>.
 */
export type EndpointParams = Record<string, unknown>;

/**
 * Type representing endpoint response data
 *
 * Endpoint responses are JSON-serializable values that can be objects,
 * arrays, primitives, or null. Using `unknown` ensures type safety by
 * requiring explicit type narrowing when accessing response data.
 */
export type EndpointResponse = unknown;

/**
 * Minimal endpoint interface for fetching operations
 *
 * Contains only the fields necessary for making API requests,
 * excluding housekeeping metadata used elsewhere in the system.
 */
export interface FetchEndpoint<I, O> {
  /** Complete URL template with domain for building requests */
  urlTemplate: string;
  /** Endpoint path for logging and error messages */
  endpoint: string;
  /** Zod schema for input validation (optional - excluded in lite builds) */
  inputSchema?: z.ZodSchema<I>;
  /** Zod schema for output validation (optional - excluded in lite builds) */
  outputSchema?: z.ZodType<O, z.ZodTypeDef, any>;
}

/**
 * Runtime endpoint interface with computed properties
 *
 * This interface defines the structure for runtime endpoint objects that are
 * created from endpoint configurations. It includes all necessary information
 * for validation, caching, and URL generation.
 *
 * Extends FetchEndpoint with additional housekeeping metadata used by hooks,
 * documentation, and other system components.
 */
export interface Endpoint<I, O> extends FetchEndpoint<I, O> {
  /** API configuration */
  api: ApiMeta;
  /** Endpoint group metadata */
  group: EndpointGroupMeta;
  /** Optional sample parameters for testing */
  sampleParams?: Partial<I> | (() => Promise<Partial<I>>);
  /** Cache strategy */
  cacheStrategy: CacheStrategy;
  /** Function name */
  functionName: string;
  /** Computed unique identifier in format "api:function" for backward compatibility */
  id: string;
  /** One-sentence description of what this specific endpoint does */
  endpointDescription: string;
}

/**
 * API definition structure for endpoint files
 *
 * This interface defines the structure that endpoint files return as POJOs,
 * containing API metadata and array of endpoint group definitions with
 * truncated URLs that can be combined with the base URL.
 */
export interface ApiDefinition {
  /** The API metadata containing name and baseUrl */
  api: ApiMeta;
  /** Array of endpoint group definitions */
  endpointGroups: EndpointGroupMeta[];
}

/**
 * API metadata containing name and base URL
 *
 * This type is used to pass API information to endpoint definitions
 * without creating circular dependencies.
 */
export interface ApiMeta {
  /** The internal API name (e.g., "wsf-vessels") */
  name: string;
  /** The base URL for API (e.g., "https://www.wsdot.wa.gov/ferries/api/vessels/rest") */
  baseUrl: string;
}

/**
 * Endpoint group definition structure for resource-based architecture
 *
 * This interface defines the structure for endpoint group files in the new
 * resource-based architecture, organizing endpoints by business data domains.
 */
export interface EndpointGroupMeta {
  /** The endpoint group name (e.g., "vessel-basics") */
  name: string;
  /** Documentation for the resource */
  documentation: ResourceDocumentation;
  /** Cache strategy for the entire endpoint group */
  cacheStrategy: CacheStrategy;
  /** Array of endpoint metadata for this group */
  endpoints: EndpointMeta<EndpointParams, EndpointResponse>[];
}

/**
 * Endpoint metadata structure for individual endpoints
 *
 * This type defines the structure for endpoint-specific metadata used in the
 * resource-based architecture. Each endpoint file exports a metadata object
 * that satisfies this type, which is then used by factory functions to
 * create fetch functions and React hooks.
 *
 * @template I - Input type for the endpoint parameters
 * @template O - Output type for the endpoint response
 */
export type EndpointMeta<I, O> = {
  /** The function name for the fetch function (e.g., "fetchVesselBasics") */
  functionName: string;
  /** HTTP endpoint URL template (truncated, e.g., "/vesselBasics/{VesselID}") */
  endpoint: string;
  /** Zod schema for input validation */
  inputSchema: z.ZodSchema<I>;
  /** Zod schema for output validation */
  outputSchema: z.ZodType<O, z.ZodTypeDef, any>;
  /** Optional sample parameters for testing - can be static or async function */
  sampleParams: Partial<I> | (() => Promise<Partial<I>>);
  /** One-sentence description of what this specific endpoint does */
  endpointDescription: string;
};

/**
 * Documentation structure for API resources
 *
 * This interface defines the documentation fields for API resources.
 * It supports both the new Proposal B shape (summary, description, etc.)
 * and legacy fields for backward compatibility during migration.
 */
export interface ResourceDocumentation {
  /**
   * Short, high-signal summary of this endpoint group.
   *
   * Prefer this over legacy resourceDescription when adding new docs.
   */
  summary?: string;
  /**
   * Optional longer description adding nuance or caveats.
   */
  description?: string;
  /**
   * Recommended use cases for this group, kept as short phrases.
   */
  useCases?: string[];
  /**
   * Approximate update frequency identifier (for example "5s", "5m").
   */
  updateFrequency?: string;

  /**
   * Deprecated: legacy description of the resource being returned.
   *
   * Existing groups may still populate this; new code should prefer summary.
   */
  resourceDescription?: string;
  /**
   * Deprecated: legacy business context for the resource.
   *
   * Existing groups may still populate this; new code should prefer
   * description and useCases.
   */
  businessContext?: string;
}
