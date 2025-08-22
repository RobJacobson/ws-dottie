import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import { zWsdotDate } from "@/shared/validation";

// ============================================================================
// FETCH FUNCTION
// ============================================================================

const ENDPOINT = "/ferries/api/terminals/rest/cacheflushdate";

/**
 * API function for fetching cache flush date from WSF Terminals API
 *
 * Retrieves the cache flush date for the terminals API. This endpoint provides
 * information about when the terminal data was last updated, which can be used
 * to coordinate caching strategies and ensure data freshness.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise resolving to a Date object representing the cache flush date
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const cacheFlushDate = await getCacheFlushDateTerminals({});
 * console.log(cacheFlushDate); // Date object
 * ```
 */
export const getCacheFlushDateTerminals = async (
  params: GetCacheFlushDateTerminalsParams = {}
): Promise<Date | null> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getCacheFlushDateTerminalsParamsSchema,
      output: terminalCacheFlushDateSchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getCacheFlushDateTerminalsParamsSchema = z
  .object({})
  .describe("No parameters required for getting cache flush date.");

export type GetCacheFlushDateTerminalsParams = z.infer<
  typeof getCacheFlushDateTerminalsParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const terminalCacheFlushDateSchema = zWsdotDate()
  .nullable()
  .describe(
    "Cache flush date for terminals data. Indicates when the terminals data was last updated and can be used to coordinate caching strategies."
  );

// ============================================================================
// REACT QUERY HOOK
// ============================================================================

/**
 * React Query hook for fetching terminal cache flush date
 *
 * Retrieves the cache flush date for terminals data to coordinate caching strategies.
 *
 * @param options - Optional React Query options
 * @returns Query result containing the cache flush date
 */
export const useCacheFlushDateTerminals = (
  options?: TanStackOptions<Date | null>
): UseQueryResult<Date | null, Error> => {
  return useQuery({
    queryKey: ["wsf", "terminals", "cacheFlushDate"],
    queryFn: () => getCacheFlushDateTerminals(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
