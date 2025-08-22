import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import { type TerminalBasics, terminalBasicsSchema } from "./getTerminalBasics";

// ============================================================================
// FETCH FUNCTION
// ============================================================================

const ENDPOINT = "/ferries/api/terminals/rest/terminalbasics/{terminalId}";

/**
 * API function for fetching specific terminal basics from WSF Terminals API
 *
 * Retrieves the most basic/brief information for a specific terminal identified by terminal ID.
 * This includes location, contact details, and basic status information for the specified terminal.
 * Please consider using /cacheflushdate to coordinate the caching of this data.
 *
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @returns Promise resolving to a TerminalBasics object containing basic information for the specified terminal
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const terminal = await getTerminalBasicsByTerminalId({ terminalId: 7 });
 * console.log(terminal.TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalBasicsByTerminalId = async (
  params: GetTerminalBasicsByTerminalIdParams
): Promise<TerminalBasics> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalBasicsByTerminalIdParamsSchema,
      output: terminalBasicsSchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTerminalBasicsByTerminalIdParamsSchema = z
  .object({
    terminalId: z
      .number()
      .int()
      .describe(
        "Unique identifier for the terminal. This ID is used to identify specific terminals across the WSF system."
      ),
  })
  .describe(
    "Parameters for retrieving basic information for a specific terminal by ID."
  );

export type GetTerminalBasicsByTerminalIdParams = z.infer<
  typeof getTerminalBasicsByTerminalIdParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

// Schemas are imported from the base file to avoid duplication

// ============================================================================
// REACT QUERY HOOK
// ============================================================================

/**
 * React Query hook for fetching specific terminal basics by terminal ID
 *
 * Retrieves the most basic/brief information for a specific terminal identified by terminal ID.
 * This includes location, contact details, and basic status information for the specified terminal.
 * Please consider using /cacheflushdate to coordinate the caching of this data.
 *
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @param options - Optional React Query options
 * @returns Query result containing TerminalBasics object for the specified terminal
 *
 * @example
 * ```typescript
 * const { data: terminal } = useTerminalBasicsByTerminalId({ terminalId: 7 });
 * console.log(terminal?.TerminalName); // "Anacortes"
 * ```
 */
export const useTerminalBasicsByTerminalId = (
  params: { terminalId: number },
  options?: TanStackOptions<TerminalBasics>
): UseQueryResult<TerminalBasics, Error> => {
  return useQuery({
    queryKey: ["wsf", "terminals", "basics", "byTerminalId", params],
    queryFn: () => getTerminalBasicsByTerminalId(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
