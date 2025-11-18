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
}

export type EndpointMeta<I, O> = {
  functionName: string;
  endpoint: string;
  inputSchema: z.ZodSchema<I>;
  outputSchema: z.ZodSchema<O>;
  sampleParams: Partial<I> | (() => Promise<Partial<I>>);
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

/**
 * Endpoint definition structure for individual endpoints
 *
 * This interface defines the structure for individual endpoints in both
 * API definition and resource definition formats.
 */
export interface EndpointDefinition<I, O> {
  /** HTTP endpoint URL template (truncated, e.g., "/vesselBasics/{VesselID}") */
  endpoint: string;
  /** Zod schema for input validation (optional - excluded in lite builds) */
  inputSchema?: z.ZodSchema<I>;
  /** Zod schema for output validation (optional - excluded in lite builds) */
  outputSchema?: z.ZodSchema<O>;
  /** Optional sample parameters for testing - must match the input schema exactly */
  sampleParams?: I | (() => Promise<I>);
  /** Cache strategy (only present in legacy API definition format) */
  cacheStrategy?: CacheStrategy;
  /** Description for MCP tool discovery (legacy API definition format) */
  description?: string;
  /** One-sentence description of what this specific endpoint does (resource format) */
  endpointDescription?: string;
}

// ============================================================================
// RE-EXPORTS FOR CONVENIENCE
// ============================================================================

/**
 * Re-export commonly used factory types for convenience.
 *
 * This allows endpoint files to import all types from one central location
 * (@/apis/types) instead of importing from multiple modules.
 */
export type {
  FetchFunctionParams,
  QueryHookOptions,
} from "@/shared/factories/types";
