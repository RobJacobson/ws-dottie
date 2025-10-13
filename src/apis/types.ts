/**
 * @fileoverview API Types
 *
 * This module contains type definitions for API endpoint structures.
 * These types define the structure that endpoint files use to describe
 * their API endpoints and configurations.
 */

import type { z } from "zod";
import type { CacheStrategy } from "@/shared/types";

/**
 * API definition structure for endpoint files
 *
 * This interface defines the structure that endpoint files return as POJOs,
 * containing the API name, base URL, and array of endpoint definitions with
 * truncated URLs that can be combined with the base URL.
 */
export interface ApiDefinition {
  /** The internal API name (e.g., "wsf-schedule") */
  name: string;
  /** The base URL for the API (e.g., "http://www.wsdot.wa.gov/ferries/api/schedule/rest") */
  baseUrl: string;
  /** Array of endpoint definitions with truncated URLs */
  endpoints: EndpointDefinition<unknown, unknown>[];
}

/**
 * Endpoint definition structure for individual endpoints
 *
 * This interface defines the structure for individual endpoints in the API
 * definition format, with truncated URLs that exclude the base URL portion.
 */
export interface EndpointDefinition<I, O> {
  /** Function name (e.g., "activeSeasons") */
  function: string;
  /** HTTP endpoint URL template (truncated, e.g., "/allsailings/{SchedRouteID}") */
  endpoint: string;
  /** Zod schema for input validation */
  inputSchema: z.ZodSchema<I>;
  /** Zod schema for output validation */
  outputSchema: z.ZodSchema<O>;
  /** Optional sample parameters for testing - must match the input schema exactly */
  sampleParams?: I | (() => Promise<I>);
  /** Cache strategy */
  cacheStrategy: CacheStrategy;
  /** Description for MCP tool discovery */
  description: string;
}
