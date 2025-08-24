import type { UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/utils";
import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import { getCacheFlushDateTerminals } from "./getCacheFlushDateTerminals";
import {
  type TerminalSailingSpace,
  terminalSailingSpaceSchema,
} from "./getTerminalSailingSpace";

// ============================================================================
// API Function
//
// getTerminalSailingSpaceByTerminalId
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
// Input Schema & Types
//
// getTerminalSailingSpaceByTerminalIdParamsSchema
// GetTerminalSailingSpaceByTerminalIdParams
// ============================================================================

export const getTerminalSailingSpaceByTerminalIdParamsSchema = z
  .object({
    terminalId: z
      .number()
      .int()
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
// Output Schema & Types
//
// Schemas are imported from the base file to avoid duplication
// ============================================================================

// ============================================================================
// TanStack Query Hook
//
// useTerminalSailingSpaceByTerminalId
// ============================================================================

/**
 * React Query hook for fetching terminal sailing space by terminal ID
 *
 * Retrieves terminal sailing space for a specific terminal from the WSF Terminals API.
 * Please consider using /cacheflushdate to coordinate the caching of this data.
 *
 * @param params - Object containing terminalId
 * @param options - Optional React Query options
 * @returns Query result containing TerminalSailingSpace object
 */
export const useTerminalSailingSpaceByTerminalId = (
  params: GetTerminalSailingSpaceByTerminalIdParams,
  options?: TanStackOptions<TerminalSailingSpace>
): UseQueryResult<TerminalSailingSpace, Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "sailingSpace", params.terminalId],
    queryFn: () => getTerminalSailingSpaceByTerminalId(params),
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
