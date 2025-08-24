import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/caching";
import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import { getCacheFlushDateSchedule } from "./getCacheFlushDateSchedule";

// ============================================================================
// API Function
//
// getTerminalMates
// ============================================================================

const ENDPOINT =
  "/ferries/api/schedule/rest/terminalmates/{tripDate}/{terminalId}";

/**
 * API function for fetching terminal mates from WSF Schedule API
 *
 * Retrieves valid arriving terminals (mates) for a given departing terminal and trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate and terminalId
 * @param params.tripDate - The trip date as a Date object
 * @param params.terminalId - The unique identifier for the departing terminal
 * @returns Promise resolving to an array of ScheduleTerminal objects containing terminal mates information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const terminalMates = await getTerminalMates({
 *   tripDate: new Date('2024-01-15'),
 *   terminalId: 1
 * });
 * console.log(terminalMates[0].Description); // "Friday Harbor"
 * ```
 */
export const getTerminalMates = async (
  params: GetTerminalMatesParams
): Promise<ScheduleTerminal[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalMatesParamsSchema,
      output: scheduleTerminalsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTerminalMatesParamsSchema
// GetTerminalMatesParams
// ============================================================================

export const getTerminalMatesParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe("The trip date for which to retrieve terminal mates."),
    terminalId: z
      .number()
      .int()
      .positive()
      .describe("The unique identifier for the departing terminal."),
  })
  .describe(
    "Parameters for retrieving terminal mates (arriving terminals) for a specific departing terminal and trip date."
  );

export type GetTerminalMatesParams = z.infer<
  typeof getTerminalMatesParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// scheduleTerminalSchema
// scheduleTerminalsArraySchema
// ScheduleTerminal
// ============================================================================

export const scheduleTerminalSchema = z
  .object({
    TerminalID: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the terminal"),
    Description: z.string().describe("Human-readable name for the terminal"),
  })
  .describe("Schedule terminal information including ID and description");

export const scheduleTerminalsArraySchema = z.array(scheduleTerminalSchema);

export type ScheduleTerminal = z.infer<typeof scheduleTerminalSchema>;

// ============================================================================
// TanStack Query Hook
//
// useTerminalMates
// ============================================================================

/**
 * React Query hook for fetching terminal mates from WSF Schedule API
 *
 * Retrieves valid arriving terminals (mates) for a given departing terminal and trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate and terminalId
 * @param params.tripDate - The trip date as a Date object
 * @param params.terminalId - The unique identifier for the departing terminal
 * @param options - Optional React Query options
 * @returns React Query result object containing terminal mates information
 *
 * @example
 * ```typescript
 * const { data: terminalMates } = useTerminalMates({
 *   tripDate: new Date('2024-01-15'),
 *   terminalId: 1
 * });
 * console.log(terminalMates?.[0]?.Description); // "Friday Harbor"
 * ```
 */
export const useTerminalMates = (
  params: { tripDate: Date; terminalId: number },
  options?: TanStackOptions<ScheduleTerminal[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "terminalMates", JSON.stringify(params)],
    queryFn: () => getTerminalMates(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });
