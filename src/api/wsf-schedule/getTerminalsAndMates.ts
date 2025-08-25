import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

import { getCacheFlushDateSchedule } from "./getCacheFlushDateSchedule";

// ============================================================================
// API Function
//
// getTerminalsAndMates
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/terminalsandmates/{tripDate}";

/**
 * API function for fetching terminals and mates from WSF Schedule API
 *
 * Retrieves all valid terminal combinations (departing and arriving pairs) for a given trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @returns Promise resolving to an array of ScheduleTerminalCombo objects containing terminal combination information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const terminalCombos = await getTerminalsAndMates({ tripDate: new Date('2024-01-15') });
 * console.log(terminalCombos[0].DepartingDescription); // "Anacortes"
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
// Input Schema & Types
//
// getTerminalsAndMatesParamsSchema
// GetTerminalsAndMatesParams
// ============================================================================

export const getTerminalsAndMatesParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe("The trip date for which to retrieve terminal combinations."),
  })
  .describe(
    "Parameters for retrieving all valid terminal combinations for a given trip date."
  );

export type GetTerminalsAndMatesParams = z.infer<
  typeof getTerminalsAndMatesParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// scheduleTerminalComboSchema
// scheduleTerminalCombosArraySchema
// ScheduleTerminalCombo
// ============================================================================

export const scheduleTerminalComboSchema = z
  .object({
    DepartingTerminalID: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the departing terminal"),
    DepartingDescription: z
      .string()
      .describe("Human-readable name for the departing terminal"),
    ArrivingTerminalID: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the arriving terminal"),
    ArrivingDescription: z
      .string()
      .describe("Human-readable name for the arriving terminal"),
  })
  .describe(
    "Schedule terminal combination information including departing and arriving terminal details"
  );

export const scheduleTerminalCombosArraySchema = z.array(
  scheduleTerminalComboSchema
);

export type ScheduleTerminalCombo = z.infer<typeof scheduleTerminalComboSchema>;

// ============================================================================
// TanStack Query Hook
//
// useTerminalsAndMates
// ============================================================================

/**
 * React Query hook for fetching terminals and mates from WSF Schedule API
 *
 * Retrieves all valid terminal combinations (departing and arriving pairs) for a given trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @param options - Optional React Query options
 * @returns React Query result object containing terminal combination information
 *
 * @example
 * ```typescript
 * const { data: terminalCombos } = useTerminalsAndMates({ tripDate: new Date('2024-01-15') });
 * console.log(terminalCombos?.[0]?.DepartingDescription); // "Anacortes"
 * ```
 */
export const useTerminalsAndMates = (
  params: { tripDate: Date },
  options?: TanStackOptions<ScheduleTerminalCombo[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "terminalsAndMates", JSON.stringify(params)],
    queryFn: () => getTerminalsAndMates(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });
