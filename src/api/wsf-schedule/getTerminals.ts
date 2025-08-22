import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

// ============================================================================
// API FUNCTION
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/terminals/{tripDate}";

/**
 * API function for fetching terminals from WSF Schedule API
 *
 * Retrieves valid departing terminals for a given trip date. A valid trip date
 * may be determined using validDateRange.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @returns Promise resolving to an array of ScheduleTerminal objects containing terminal information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const terminals = await getTerminals({ tripDate: new Date('2024-01-15') });
 * console.log(terminals[0].Description); // "Anacortes"
 * ```
 */
export const getTerminals = async (
  params: GetTerminalsParams
): Promise<ScheduleTerminal[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalsParamsSchema,
      output: scheduleTerminalsArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTerminalsParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe(
        "The trip date for which to retrieve schedule information. This date determines which schedule data is returned."
      ),
  })
  .describe(
    "Parameters for retrieving valid departing terminals for a given trip date."
  );

export type GetTerminalsParams = z.infer<typeof getTerminalsParamsSchema>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const scheduleTerminalSchema = z
  .object({
    TerminalID: z
      .number()
      .describe(
        "Unique identifier for the terminal. Primary key for terminal identification and used consistently across all WSF systems and APIs."
      ),
    Description: z
      .string()
      .describe(
        "Description of the terminal. Human-readable identifier for the terminal location (e.g., 'Seattle', 'Bainbridge Island', 'Anacortes')."
      ),
  })
  .describe(
    "Schedule terminal information including identification and description. This schema provides the fundamental terminal data used for schedule displays and passenger information."
  );

export const scheduleTerminalsArraySchema = z.array(scheduleTerminalSchema);

export type ScheduleTerminal = z.infer<typeof scheduleTerminalSchema>;

// ============================================================================
// QUERY HOOK
// ============================================================================

/**
 * React Query hook for fetching terminals from WSF Schedule API
 *
 * Retrieves valid departing terminals for a given trip date. A valid trip date
 * may be determined using validDateRange.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @param options - Optional React Query options
 * @returns React Query result object containing terminal information
 *
 * @example
 * ```typescript
 * const { data: terminals } = useTerminals({ tripDate: new Date('2024-01-15') });
 * console.log(terminals?.[0]?.Description); // "Anacortes"
 * ```
 */
export const useTerminals = (
  params: GetTerminalsParams,
  options?: TanStackOptions<ScheduleTerminal[]>
) =>
  useQuery({
    queryKey: ["wsf", "schedule", "terminals", params.tripDate],
    queryFn: () => getTerminals(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
