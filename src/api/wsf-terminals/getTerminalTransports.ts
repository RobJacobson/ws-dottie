import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

// Import schemas from the single-item endpoint
import {
  type TerminalTransitLink,
  type TerminalTransport,
  terminalTransportSchema,
} from "./getTerminalTransportsByTerminalId";

// ============================================================================
// FETCH FUNCTION
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
      output: terminalTransportArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTerminalTransportsParamsSchema = z
  .object({})
  .describe("No parameters required for getting all terminal transports.");

export type GetTerminalTransportsParams = z.infer<
  typeof getTerminalTransportsParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

// Create array schema from the imported single-item schema
export const terminalTransportArraySchema = z.array(terminalTransportSchema);

// Re-export types from the single-item endpoint for consistency
export type { TerminalTransport, TerminalTransitLink };

// ============================================================================
// REACT QUERY HOOK
// ============================================================================

/**
 * React Query hook for fetching all terminal transports
 *
 * Retrieves transportation information for all terminals including parking,
 * shuttle services, and transit connections.
 *
 * @param options - Optional React Query options
 * @returns Query result containing array of TerminalTransport objects
 */
export const useTerminalTransports = (
  options?: TanStackOptions<TerminalTransport[]>
): UseQueryResult<TerminalTransport[], Error> => {
  return useQuery({
    queryKey: ["wsf", "terminals", "transports"],
    queryFn: () => getTerminalTransports(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
