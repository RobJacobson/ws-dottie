import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import {
  type TerminalSailingSpace,
  terminalSailingSpaceSchema,
} from "./getTerminalSailingSpace";

// ============================================================================
// FETCH FUNCTION
// ============================================================================

const ENDPOINT =
  "/ferries/api/terminals/rest/terminalsailingspace/{terminalId}";

/**
 * API function for fetching terminal sailing space for a specific terminal from WSF Terminals API
 *
 * Retrieves sailing space availability information for a specific terminal identified by terminal ID.
 * This includes scheduled departures and space availability details for the specified terminal.
 *
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @returns Promise resolving to a TerminalSailingSpace object containing sailing space information for the specified terminal
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const sailingSpace = await getTerminalSailingSpaceByTerminalId({ terminalId: 7 });
 * console.log(sailingSpace.TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalSailingSpaceByTerminalId = async (
  params: GetTerminalSailingSpaceByTerminalIdParams
): Promise<TerminalSailingSpace> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalSailingSpaceByTerminalIdParamsSchema,
      output: terminalSailingSpaceSchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTerminalSailingSpaceByTerminalIdParamsSchema = z
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
    "Parameters for retrieving sailing space information for a specific terminal by ID."
  );

export type GetTerminalSailingSpaceByTerminalIdParams = z.infer<
  typeof getTerminalSailingSpaceByTerminalIdParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

// Schemas are imported from the base file to avoid duplication

// ============================================================================
// REACT QUERY HOOK
// ============================================================================

/**
 * React Query hook for fetching specific terminal sailing space by terminal ID
 *
 * Retrieves sailing space availability information for a specific terminal identified by terminal ID.
 * This includes scheduled departures and space availability details for the specified terminal.
 *
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal
 * @param options - Optional React Query options
 * @returns Query result containing TerminalSailingSpace object for the specified terminal
 */
export const useTerminalSailingSpaceByTerminalId = (
  params: { terminalId: number },
  options?: TanStackOptions<TerminalSailingSpace>
): UseQueryResult<TerminalSailingSpace, Error> => {
  return useQuery({
    queryKey: ["wsf", "terminals", "sailingSpace", "byTerminalId", params],
    queryFn: () => getTerminalSailingSpaceByTerminalId(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
