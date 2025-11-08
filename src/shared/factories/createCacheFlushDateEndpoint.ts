/**
 * @fileoverview Factory function for creating cache flush date endpoint groups
 *
 * This module provides a factory function to generate cache flush date endpoint
 * groups for WSF APIs, reducing code duplication across wsf-fares, wsf-schedule,
 * wsf-terminals, and wsf-vessels.
 */

import {
  type CacheFlushDateInput,
  type CacheFlushDateOutput,
  cacheFlushDateInputSchema,
  cacheFlushDateOutputSchema,
} from "@/apis/shared/cacheFlushDate";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";

// Re-export types for convenience
export type { CacheFlushDateInput, CacheFlushDateOutput };

/**
 * Creates a cache flush date endpoint group for a WSF API
 *
 * This factory function generates a fully configured EndpointGroup for cache
 * flush date endpoints, with API-specific documentation and naming.
 *
 * @param apiName - The API name (e.g., "wsf-fares", "wsf-schedule")
 * @param resourceName - The resource name for documentation (e.g., "fares", "schedule")
 * @param functionName - The function name prefix (e.g., "Fares", "Schedule")
 * @returns A fully configured EndpointGroup for cache flush date
 *
 * @example
 * ```typescript
 * const cacheFlushDateFaresGroup = createCacheFlushDateEndpointGroup(
 *   "wsf-fares",
 *   "fares",
 *   "Fares"
 * );
 * ```
 */
export const createCacheFlushDateEndpointGroup = (
  apiName: string,
  resourceName: string,
  functionName: string
): EndpointGroup => ({
  name: `cache-flush-date-${resourceName}`,
  documentation: {
    resourceDescription: `Represents the timestamp of when any static endpoint data for the ${apiName} API was last updated. This information helps applications determine when to refresh cached ${resourceName} information through cache invalidation.`,
    businessContext: `Many ${apiName} endpoints return data that changes infrequently. As a result, you may wish to cache it in your application. Poll this endpoint periodically to detect when static ${apiName} data has changed. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service. Polled automatically by the ws-dottie useQuery hooks to invalidate cache.`,
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    [`fetchCacheFlushDate${functionName}`]: {
      endpoint: "/cacheflushdate",
      inputSchema: cacheFlushDateInputSchema,
      outputSchema: cacheFlushDateOutputSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns the timestamp of when any static endpoint data for the ${apiName} API was last updated.`,
    } satisfies EndpointDefinition<CacheFlushDateInput, CacheFlushDateOutput>,
  },
});
