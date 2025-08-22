import { z } from "zod";
import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import { type TerminalLocation, terminalLocationSchema } from "./getTerminalLocations";

// ============================================================================
// FETCH FUNCTION
// ============================================================================

const ENDPOINT = "/ferries/api/terminals/rest/terminallocations/{terminalId}";

/**
 * API function for fetching terminal location for a specific terminal from WSF Terminals API
 *
 * Retrieves location information for a specific terminal identified by terminal ID,
 * including coordinates, address, and geographic data. This endpoint filters the
 * resultset to a single terminal, providing the physical location details for
 * that specific terminal.
 *
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @returns Promise resolving to a TerminalLocation object containing location information for the specified terminal
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const location = await getTerminalLocationsByTerminalId({ terminalId: 7 });
 * console.log(location.TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalLocationsByTerminalId = async (
  params: GetTerminalLocationsByTerminalIdParams
): Promise<TerminalLocation> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalLocationsByTerminalIdParamsSchema,
      output: terminalLocationSchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTerminalLocationsByTerminalIdParamsSchema = z
  .object({
    terminalId: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the terminal. This ID is used to identify specific terminals across the WSF system."
      ),
  })
  .describe(
    "Parameters for retrieving location information for a specific terminal by ID."
  );

export type GetTerminalLocationsByTerminalIdParams = z.infer<
  typeof getTerminalLocationsByTerminalIdParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

// Schemas are imported from the base file to avoid duplication

// ============================================================================
// REACT QUERY HOOK
// ============================================================================

/**
 * React Query hook for fetching terminal location for a specific terminal by terminal ID
 *
 * Retrieves location information for a specific terminal identified by terminal ID,
 * including coordinates, address, and geographic data. This endpoint filters the
 * resultset to a single terminal, providing the physical location details for
 * that specific terminal.
 *
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @param options - Optional React Query options
 * @returns Query result containing TerminalLocation object for the specified terminal
 *
 * @example
 * ```typescript
 * const { data: location } = useTerminalLocationsByTerminalId({ terminalId: 7 });
 * console.log(location?.TerminalName); // "Anacortes"
 * ```
 */
export const useTerminalLocationsByTerminalId = (
  params: { terminalId: number },
  options?: TanStackOptions<TerminalLocation>
): UseQueryResult<TerminalLocation, Error> => {
  return useQuery({
    queryKey: ["wsf", "terminals", "locations", "byTerminalId", params],
    queryFn: () => getTerminalLocationsByTerminalId(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
