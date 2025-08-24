import type { UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/utils";
import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import { getCacheFlushDateTerminals } from "./getCacheFlushDateTerminals";
// Import schemas from the single-item endpoint
import {
  type TerminalLocation,
  terminalLocationSchema,
} from "./getTerminalLocationsByTerminalId";

// ============================================================================
// API Function
//
// getTerminalLocations
// ============================================================================

const ENDPOINT = "/ferries/api/terminals/rest/terminallocations";

/**
 * API function for fetching all terminal locations from WSF Terminals API
 *
 * Retrieves location information for all terminals including coordinates,
 * addresses, and geographic data. This endpoint provides the physical
 * location details for all WSF terminals.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise resolving to an array of TerminalLocation objects containing terminal location information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const locations = await getTerminalLocations({});
 * console.log(locations[0].TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalLocations = async (
  params: GetTerminalLocationsParams = {}
): Promise<TerminalLocation[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalLocationsParamsSchema,
      output: terminalLocationsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTerminalLocationsParamsSchema
// GetTerminalLocationsParams
// ============================================================================

export const getTerminalLocationsParamsSchema = z
  .object({})
  .describe("No parameters required for getting all terminal locations.");

export type GetTerminalLocationsParams = z.infer<
  typeof getTerminalLocationsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// terminalLocationArraySchema
// ============================================================================

// Create array schema from the imported single-item schema
export const terminalLocationsArraySchema = z.array(terminalLocationSchema);

// ============================================================================
// TanStack Query Hook
//
// useTerminalLocations
// ============================================================================

/**
 * React Query hook for fetching all terminal locations
 *
 * Retrieves all terminal locations from the WSF Terminals API.
 * Please consider using /cacheflushdate to coordinate the caching of this data.
 *
 * @param options - Optional React Query options
 * @returns Query result containing array of TerminalLocations objects
 */
export const useTerminalLocations = (
  options?: TanStackOptions<TerminalLocation[]>
): UseQueryResult<TerminalLocation[], Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "locations"],
    queryFn: getTerminalLocations,
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
