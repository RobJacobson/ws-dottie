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
 * containing the API name, base URL, and array of endpoint group definitions with
 * truncated URLs that can be combined with the base URL.
 */
export interface ApiDefinition {
  /** The internal API name (e.g., "wsf-schedule") */
  name: string;
  /** The base URL for the API (e.g., "http://www.wsdot.wa.gov/ferries/api/schedule/rest") */
  baseUrl: string;
  /** Array of endpoint group definitions */
  endpointGroups: EndpointGroup[];
}

/**
 * Endpoint group definition structure for resource-based architecture
 *
 * This interface defines the structure for endpoint group files in the new
 * resource-based architecture, organizing endpoints by business data domains.
 */
export interface EndpointGroup {
  /** The endpoint group name (e.g., "vessel-basics") */
  name: string;
  /** Documentation for the resource */
  documentation: ResourceDocumentation;
  /** Cache strategy for the entire endpoint group */
  cacheStrategy: CacheStrategy;
  /** Record of endpoint definitions keyed by function name */
  endpoints: Record<string, EndpointDefinition<unknown, unknown>>;
}

/**
 * Documentation structure for API resources
 *
 * This interface defines the documentation fields for API resources,
 * providing comprehensive information about the resource and its usage.
 */
export interface ResourceDocumentation {
  /** Description of the resource being returned */
  resourceDescription: string;
  /** Business context for the resource */
  businessContext: string;
  /** Update frequency for the resource */
  updateFrequency: string;
  /** Related endpoints for the resource */
  relatedEndpoints: string[];
  /** Usage examples for the resource */
  usageExamples: string[];
}

/**
 * Endpoint definition structure for individual endpoints
 *
 * This interface defines the structure for individual endpoints in both
 * API definition and resource definition formats.
 */
export interface EndpointDefinition<I, O> {
  /** Function name (e.g., "getVesselBasics") */
  function: string;
  /** HTTP endpoint URL template (truncated, e.g., "/vesselBasics/{VesselID}") */
  endpoint: string;
  /** Zod schema for input validation */
  inputSchema: z.ZodSchema<I>;
  /** Zod schema for output validation */
  outputSchema: z.ZodSchema<O>;
  /** Optional sample parameters for testing - must match the input schema exactly */
  sampleParams?: I | (() => Promise<I>);
  /** Cache strategy (only present in legacy API definition format) */
  cacheStrategy?: CacheStrategy;
  /** Description for MCP tool discovery (legacy API definition format) */
  description?: string;
  /** One-sentence description of what this specific endpoint does (resource format) */
  endpointDescription?: string;
}
