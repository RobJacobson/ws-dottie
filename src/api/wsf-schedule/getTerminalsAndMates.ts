import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import type { ScheduleTerminalCombo } from "./getScheduleTerminalComboById";
import { scheduleTerminalComboSchema } from "./getScheduleTerminalComboById";

// ============================================================================
// API FUNCTION
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/terminalsandmates/{tripDate}";

/**
 * API function for fetching terminals and mates from WSF Schedule API
 *
 * Retrieves all valid departing and arriving terminal combinations for a given trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @returns Promise resolving to an array of ScheduleTerminalCombo objects containing terminal combinations
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const combos = await getTerminalsAndMates({ tripDate: new Date('2024-01-15') });
 * console.log(combos[0].DepartingDescription); // "Seattle"
 * ```
 */
export const getTerminalsAndMates = async (
  params: GetTerminalsAndMatesParams
): Promise<ScheduleTerminalCombo[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalsAndMatesParamsSchema,
      output: scheduleTerminalCombosArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTerminalsAndMatesParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe(
        "The trip date for which to retrieve schedule information. This date determines which schedule data is returned."
      ),
  })
  .describe(
    "Parameters for retrieving all valid departing and arriving terminal combinations for a given trip date."
  );

export type GetTerminalsAndMatesParams = z.infer<
  typeof getTerminalsAndMatesParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const scheduleTerminalCombosArraySchema = z.array(
  scheduleTerminalComboSchema
);

// ============================================================================
// QUERY HOOK
// ============================================================================

/**
 * React Query hook for fetching terminals and mates from WSF Schedule API
 *
 * Retrieves all valid departing and arriving terminal combinations for a given trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @param options - Optional React Query options
 * @returns React Query result object containing terminal combinations
 *
 * @example
 * ```typescript
 * const { data: combos } = useTerminalsAndMates({ tripDate: new Date('2024-01-15') });
 * console.log(combos?.[0]?.DepartingDescription); // "Seattle"
 * ```
 */
export const useTerminalsAndMates = (
  params: GetTerminalsAndMatesParams,
  options?: TanStackOptions<ScheduleTerminalCombo[]>
) =>
  useQuery({
    queryKey: ["wsf", "schedule", "terminalsAndMates", params.tripDate],
    queryFn: () => getTerminalsAndMates(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
