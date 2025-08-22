import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import type { ScheduleTerminal } from "./getScheduleTerminalById";
import { scheduleTerminalSchema } from "./getScheduleTerminalById";

// ============================================================================
// API FUNCTION
// ============================================================================

const ENDPOINT =
  "/ferries/api/schedule/rest/terminalmates/{tripDate}/{terminalId}";

/**
 * API function for fetching terminal mates from WSF Schedule API
 *
 * Retrieves terminal mates (arriving terminals) for a specific departing terminal and trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate and terminalId
 * @param params.tripDate - The trip date as a Date object
 * @param params.terminalId - The unique identifier for the departing terminal
 * @returns Promise resolving to an array of ScheduleTerminal objects containing terminal mates
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const mates = await getTerminalMates({
 *   tripDate: new Date('2024-01-15'),
 *   terminalId: 1
 * });
 * console.log(mates[0].Description); // "Bainbridge Island"
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
// INPUT SCHEMA & TYPES
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
      .describe("Unique identifier for the departing terminal."),
  })
  .describe(
    "Parameters for retrieving terminal mates (arriving terminals) for a specific departing terminal and trip date."
  );

export type GetTerminalMatesParams = z.infer<
  typeof getTerminalMatesParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const scheduleTerminalsArraySchema = z.array(scheduleTerminalSchema);

// ============================================================================
// QUERY HOOK
// ============================================================================

/**
 * React Query hook for fetching terminal mates from WSF Schedule API
 *
 * Retrieves terminal mates (arriving terminals) for a specific departing terminal and trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate and terminalId
 * @param params.tripDate - The trip date as a Date object
 * @param params.terminalId - The unique identifier for the departing terminal
 * @param options - Optional React Query options
 * @returns React Query result object containing terminal mates
 *
 * @example
 * ```typescript
 * const { data: mates } = useTerminalMates({
 *   tripDate: new Date('2024-01-15'),
 *   terminalId: 1
 * });
 * console.log(mates?.[0]?.Description); // "Bainbridge Island"
 * ```
 */
export const useTerminalMates = (
  params: GetTerminalMatesParams,
  options?: TanStackOptions<ScheduleTerminal[]>
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "terminalMates",
      params.tripDate,
      params.terminalId,
    ],
    queryFn: () => getTerminalMates(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
