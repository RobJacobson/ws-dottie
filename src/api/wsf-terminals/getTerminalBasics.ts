import type { UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/caching";
import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import { getCacheFlushDateTerminals } from "./getCacheFlushDateTerminals";
// Import schemas from the single-item endpoint
import {
  type TerminalBasics,
  terminalBasicsSchema,
} from "./getTerminalBasicsByTerminalId";

// ============================================================================
// API Function
//
// getTerminalBasics
// ============================================================================

const ENDPOINT = "/ferries/api/terminals/rest/terminalbasics";

/**
 * API function for fetching all terminal basics from WSF Terminals API
 *
 * Retrieves the most basic/brief information for all terminals including
 * location, contact details, and basic status information. This endpoint
 * provides a comprehensive overview of all WSF terminals.
 * Please consider using /cacheflushdate to coordinate the caching of this data.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise resolving to an array of TerminalBasics objects containing basic information for all terminals
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const terminals = await getTerminalBasics({});
 * console.log(terminals[0].TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalBasics = async (
  params: GetTerminalBasicsParams = {}
): Promise<TerminalBasics[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalBasicsParamsSchema,
      output: terminalBasicsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTerminalBasicsParamsSchema
// GetTerminalBasicsParams
// ============================================================================

export const getTerminalBasicsParamsSchema = z
  .object({})
  .describe("No parameters required for getting all terminal basics.");

export type GetTerminalBasicsParams = z.infer<
  typeof getTerminalBasicsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// terminalBasicsArraySchema
// ============================================================================

// Create array schema from the imported single-item schema
export const terminalBasicsArraySchema = z.array(terminalBasicsSchema);

// ============================================================================
// TanStack Query Hook
//
// useTerminalBasics
// ============================================================================

/**
 * React Query hook for fetching all terminal basics
 *
 * Retrieves the most basic/brief information for all terminals including
 * location, contact details, and basic status information.
 * Please consider using /cacheflushdate to coordinate the caching of this data.
 *
 * @param options - Optional React Query options
 * @returns Query result containing array of TerminalBasics objects
 */
export const useTerminalBasics = (
  options?: TanStackOptions<TerminalBasics[]>
): UseQueryResult<TerminalBasics[], Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "basics"],
    queryFn: getTerminalBasics,
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
