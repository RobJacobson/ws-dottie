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

import type { z } from "zod";
import { configManager } from "../utils/configManager";

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

export interface EndpointMeta<I, O> {
  /** Unique identifier in format "api/function" (e.g., "wsdot-highway-cameras/getHighwayCameras") */
  id: string;

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
 * Complete endpoint configuration object containing all metadata needed for API requests
 *
 * This interface represents a fully configured API endpoint with all necessary metadata
 * for making requests, including URL templates, validation schemas, and caching strategies.
 * It serves as a pure configuration object without any behavior attached.
 *
 * @template I - The input parameters type for this endpoint
 * @template O - The output response type for this endpoint
 */
export interface Endpoint<I, O> extends EndpointMeta<I, O> {
  /**
   * Module group identifier extracted from the endpoint ID
   *
   * Auto-computed from the first part of the ID field (format: "api/function").
   * Represents the API group or module this endpoint belongs to.
   *
   * @example "wsdot-highway-cameras"
   * @example "wsf-fares"
   * @example "wsdot-traffic-flow"
   */
  api: string;

  /**
   * Function name extracted from the endpoint ID
   *
   * Auto-computed from the second part of the ID field (format: "api/function").
   * Represents the specific function or operation this endpoint provides.
   *
   * @example "getHighwayCameras"
   * @example "getFareLineItems"
   * @example "getTrafficFlowData"
   */
  functionName: string;

  /**
   * Complete URL template with domain and path included
   *
   * Pre-generated URL template that includes the base domain and full API path
   * with parameter placeholders. Generated once during endpoint creation for efficiency.
   * Parameters are interpolated at request time using the buildApiUrl utility.
   *
   * @example "https://www.wsdot.wa.gov/Ferries/API/Fares/rest/farelineitems/{TRIPDATE}/{DEPARTINGTERMINALID}"
   * @example "https://www.wsdot.wa.gov/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCamerasAsJson"
   */
  urlTemplate: string;
}

/**
 * Creates a complete endpoint configuration object from metadata
 *
 * This factory function takes endpoint metadata and generates a complete endpoint
 * configuration object with computed fields like API group, function name, and
 * pre-built URL template. The resulting object serves as a pure configuration
 * that can be used with independent handler functions.
 *
 * @template I - The input parameters type for this endpoint
 * @template O - The output response type for this endpoint
 * @param meta - The endpoint metadata containing ID, schemas, and configuration
 * @returns Complete endpoint configuration object ready for use with handlers
 *
 * @example
 * ```typescript
 * const endpoint = defineEndpoint({
 *   id: "wsf-fares/getFareLineItems",
 *   endpoint: "/Ferries/API/Fares/rest/farelineitems/{TRIPDATE}/{DEPARTINGTERMINALID}",
 *   inputSchema: fareParamsSchema,
 *   outputSchema: fareResponseSchema,
 *   cacheStrategy: "HOURLY_UPDATES"
 * });
 *
 * // Result:
 * // {
 * //   id: "wsf-fares/getFareLineItems",
 * //   api: "wsf-fares",
 * //   functionName: "getFareLineItems",
 * //   urlTemplate: "https://www.wsdot.wa.gov/Ferries/API/Fares/rest/farelineitems/{TRIPDATE}/{DEPARTINGTERMINALID}",
 * //   // ... other metadata
 * // }
 * ```
 */
export function defineEndpoint<I, O>(meta: EndpointMeta<I, O>): Endpoint<I, O> {
  // Extract API and function from id field
  const [api, functionName] = meta.id.split("/");

  // Generate complete URL template once in constructor
  const urlTemplate = `${configManager.getDomain()}${meta.endpoint}`;

  return {
    // Spread the existing metadata
    ...meta,
    // Set the computed api and functionName from the id field
    api,
    functionName,
    // Set the pre-generated URL template
    urlTemplate,
  } as const;
}
