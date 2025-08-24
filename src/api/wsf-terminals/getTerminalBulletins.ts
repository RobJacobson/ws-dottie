import type { UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/utils";
import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import { getCacheFlushDateTerminals } from "./getCacheFlushDateTerminals";
// Import schemas from the single-item endpoint
import {
  type TerminalBulletin,
  terminalBulletinSchema,
} from "./getTerminalBulletinsByTerminalId";

// ============================================================================
// API Function
//
// getTerminalBulletins
// ============================================================================

const ENDPOINT = "/ferries/api/terminals/rest/terminalbulletins";

/**
 * API function for fetching all terminal bulletins from WSF Terminals API
 *
 * Retrieves bulletin and announcement information for all terminals.
 * This includes important notices, alerts, and information for passengers
 * at each terminal.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise resolving to an array of TerminalBulletin objects containing bulletin information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const bulletins = await getTerminalBulletins({});
 * console.log(bulletins[0].TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalBulletins = async (
  params: GetTerminalBulletinsParams = {}
): Promise<TerminalBulletin[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalBulletinsParamsSchema,
      output: terminalBulletinsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTerminalBulletinsParamsSchema
// GetTerminalBulletinsParams
// ============================================================================

export const getTerminalBulletinsParamsSchema = z
  .object({})
  .describe("No parameters required for getting all terminal bulletins.");

export type GetTerminalBulletinsParams = z.infer<
  typeof getTerminalBulletinsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// terminalBulletinArraySchema
// ============================================================================

// Create array schema from the imported single-item schema
export const terminalBulletinsArraySchema = z.array(terminalBulletinSchema);

// ============================================================================
// TanStack Query Hook
//
// useTerminalBulletins
// ============================================================================

/**
 * React Query hook for fetching all terminal bulletins
 *
 * Retrieves all terminal bulletins from the WSF Terminals API.
 * Please consider using /cacheflushdate to coordinate the caching of this data.
 *
 * @param options - Optional React Query options
 * @returns Query result containing array of TerminalBulletin objects
 */
export const useTerminalBulletins = (
  options?: TanStackOptions<TerminalBulletin[]>
): UseQueryResult<TerminalBulletin[], Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "bulletins"],
    queryFn: getTerminalBulletins,
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
