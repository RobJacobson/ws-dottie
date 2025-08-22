import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

// Import schemas from the single-item endpoint
import {
  type TerminalLocation,
  terminalLocationSchema,
} from "./getTerminalLocationsByTerminalId";

// ============================================================================
// FETCH FUNCTION
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
      output: terminalLocationArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTerminalLocationsParamsSchema = z
  .object({})
  .describe("No parameters required for getting all terminal locations.");

export type GetTerminalLocationsParams = z.infer<
  typeof getTerminalLocationsParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

// Create array schema from the imported single-item schema
export const terminalLocationArraySchema = z.array(terminalLocationSchema);

// ============================================================================
// REACT QUERY HOOK
// ============================================================================

/**
 * React Query hook for fetching all terminal locations
 *
 * Retrieves detailed location information for all terminals including
 * addresses, coordinates, and geographic data.
 *
 * @param options - Optional React Query options
 * @returns Query result containing array of TerminalLocation objects
 */
export const useTerminalLocations = (
  options?: TanStackOptions<TerminalLocation[]>
): UseQueryResult<TerminalLocation[], Error> => {
  return useQuery({
    queryKey: ["wsf", "terminals", "locations"],
    queryFn: () => getTerminalLocations(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
