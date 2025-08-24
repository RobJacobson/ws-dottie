import type { UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/caching";
import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import { getCacheFlushDateTerminals } from "./getCacheFlushDateTerminals";
// Import schemas from the single-item endpoint
import {
  type TerminalWaitTimes,
  terminalWaitTimesSchema,
} from "./getTerminalWaitTimesByTerminalId";

// ============================================================================
// API Function
//
// getTerminalWaitTimes
// ============================================================================

const ENDPOINT = "/ferries/api/terminals/rest/terminalwaittimes";

/**
 * API function for fetching all terminal wait times from WSF Terminals API
 *
 * Retrieves wait time information for all terminals including current
 * wait times for all routes at each terminal. This endpoint provides
 * real-time information about queue lengths and wait times.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise resolving to an array of TerminalWaitTimes objects containing wait time information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const waitTimes = await getTerminalWaitTimes({});
 * console.log(waitTimes[0].TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalWaitTimes = async (
  params: GetTerminalWaitTimesParams = {}
): Promise<TerminalWaitTimes[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalWaitTimesParamsSchema,
      output: terminalWaitTimesArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTerminalWaitTimesParamsSchema
// GetTerminalWaitTimesParams
// ============================================================================

export const getTerminalWaitTimesParamsSchema = z
  .object({})
  .describe("No parameters required for getting all terminal wait times.");

export type GetTerminalWaitTimesParams = z.infer<
  typeof getTerminalWaitTimesParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// terminalWaitTimesArraySchema
// ============================================================================

// Create array schema from the imported single-item schema
export const terminalWaitTimesArraySchema = z.array(terminalWaitTimesSchema);

// ============================================================================
// TanStack Query Hook
//
// useTerminalWaitTimes
// ============================================================================

/**
 * React Query hook for fetching all terminal wait times
 *
 * Retrieves all terminal wait times from the WSF Terminals API.
 * Please consider using /cacheflushdate to coordinate the caching of this data.
 *
 * @param options - Optional React Query options
 * @returns Query result containing array of TerminalWaitTimes objects
 */
export const useTerminalWaitTimes = (
  options?: TanStackOptions<TerminalWaitTimes[]>
): UseQueryResult<TerminalWaitTimes[], Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "waitTimes"],
    queryFn: getTerminalWaitTimes,
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
