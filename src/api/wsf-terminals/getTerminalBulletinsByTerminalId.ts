import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import {
  type TerminalBulletin,
  terminalBulletinSchema,
} from "./getTerminalBulletins";

// ============================================================================
// FETCH FUNCTION
// ============================================================================

const ENDPOINT = "/ferries/api/terminals/rest/terminalbulletins/{terminalId}";

/**
 * API function for fetching terminal bulletins for a specific terminal from WSF Terminals API
 *
 * Retrieves bulletin and announcement information for a specific terminal identified by terminal ID.
 * This includes important notices, alerts, and information for passengers at the specified terminal.
 *
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @returns Promise resolving to a TerminalBulletin object containing bulletin information for the specified terminal
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const bulletins = await getTerminalBulletinsByTerminalId({ terminalId: 7 });
 * console.log(bulletins.TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalBulletinsByTerminalId = async (
  params: GetTerminalBulletinsByTerminalIdParams
): Promise<TerminalBulletin> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalBulletinsByTerminalIdParamsSchema,
      output: terminalBulletinSchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTerminalBulletinsByTerminalIdParamsSchema = z
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
    "Parameters for retrieving bulletin information for a specific terminal by ID."
  );

export type GetTerminalBulletinsByTerminalIdParams = z.infer<
  typeof getTerminalBulletinsByTerminalIdParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

// Schemas are imported from the base file to avoid duplication

// ============================================================================
// REACT QUERY HOOK
// ============================================================================

/**
 * React Query hook for fetching specific terminal bulletins by terminal ID
 *
 * Retrieves bulletin information for a specific terminal identified by terminal ID.
 * This includes important announcements, alerts, and notices for passengers.
 *
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal
 * @param options - Optional React Query options
 * @returns Query result containing TerminalBulletin object for the specified terminal
 */
export const useTerminalBulletinsByTerminalId = (
  params: { terminalId: number },
  options?: TanStackOptions<TerminalBulletin>
): UseQueryResult<TerminalBulletin, Error> => {
  return useQuery({
    queryKey: ["wsf", "terminals", "bulletins", "byTerminalId", params],
    queryFn: () => getTerminalBulletinsByTerminalId(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
