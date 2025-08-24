import type { UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/utils";
import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import { getCacheFlushDateTerminals } from "./getCacheFlushDateTerminals";
// Import schemas from the single-item endpoint
import {
  type TerminalTransport,
  terminalTransportSchema,
} from "./getTerminalTransportsByTerminalId";

// ============================================================================
// API Function
//
// getTerminalTransports
// ============================================================================

const ENDPOINT = "/ferries/api/terminals/rest/terminaltransports";

/**
 * API function for fetching all terminal transports from WSF Terminals API
 *
 * Retrieves transportation information for all terminals including parking,
 * shuttle services, and transit connections. This endpoint provides
 * comprehensive information about how to access all WSF terminals.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise resolving to an array of TerminalTransport objects containing transportation information for all terminals
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const transports = await getTerminalTransports({});
 * console.log(transports[0].TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalTransports = async (
  params: GetTerminalTransportsParams = {}
): Promise<TerminalTransport[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalTransportsParamsSchema,
      output: terminalTransportsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTerminalTransportsParamsSchema
// GetTerminalTransportsParams
// ============================================================================

export const getTerminalTransportsParamsSchema = z
  .object({})
  .describe("No parameters required for getting all terminal transports.");

export type GetTerminalTransportsParams = z.infer<
  typeof getTerminalTransportsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// terminalTransportArraySchema
// ============================================================================

// Create array schema from the imported single-item schema
export const terminalTransportsArraySchema = z.array(terminalTransportSchema);

// ============================================================================
// TanStack Query Hook
//
// useTerminalTransports
// ============================================================================

/**
 * React Query hook for fetching all terminal transports
 *
 * Retrieves all terminal transports from the WSF Terminals API.
 * Please consider using /cacheflushdate to coordinate the caching of this data.
 *
 * @param options - Optional React Query options
 * @returns Query result containing array of TerminalTransports objects
 */
export const useTerminalTransports = (
  options?: TanStackOptions<TerminalTransport[]>
): UseQueryResult<TerminalTransport[], Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "transports"],
    queryFn: getTerminalTransports,
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
