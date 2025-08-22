import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

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

export const scheduleTerminalComboSchema = z
  .object({
    DepartingTerminalID: z
      .number()
      .describe(
        "Unique identifier for the departing terminal. Links to the terminal where the journey begins and passengers board the ferry."
      ),
    DepartingDescription: z
      .string()
      .describe(
        "Description of the departing terminal. Provides context about the departure location and helps passengers identify where to board."
      ),
    ArrivingTerminalID: z
      .number()
      .describe(
        "Unique identifier for the arriving terminal. Links to the terminal where the journey ends and passengers disembark."
      ),
    ArrivingDescription: z
      .string()
      .describe(
        "Description of the arriving terminal. Provides context about the destination location and helps passengers identify where they will arrive."
      ),
  })
  .describe(
    "Terminal combination information representing a journey from one terminal to another. This schema defines the origin and destination for ferry routes and helps passengers understand their travel path."
  );

export const scheduleTerminalCombosArraySchema = z.array(
  scheduleTerminalComboSchema
);

export type ScheduleTerminalCombo = z.infer<typeof scheduleTerminalComboSchema>;

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
