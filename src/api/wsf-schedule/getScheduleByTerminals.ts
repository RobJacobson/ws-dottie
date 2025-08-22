import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import { jsDateToYyyyMmDd } from "@/shared/fetching/parsing";
import type { TanStackOptions } from "@/shared/types";

// ============================================================================
// API FUNCTION
// ============================================================================

const ENDPOINT =
  "/ferries/api/schedule/rest/schedulebyterminals/{tripDate}/{departingTerminalId}/{arrivingTerminalId}";

/**
 * API function for fetching schedule by terminals from WSF Schedule API
 *
 * Retrieves schedule information between specific terminal pairs for a given trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate, departingTerminalId, and arrivingTerminalId
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalId - The unique identifier for the departing terminal
 * @param params.arrivingTerminalId - The unique identifier for the arriving terminal
 * @returns Promise resolving to an array of ScheduleResponse objects containing schedule information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const schedule = await getScheduleByTerminals({
 *   tripDate: new Date('2024-01-15'),
 *   departingTerminalId: 1,
 *   arrivingTerminalId: 2
 * });
 * console.log(schedule[0].RouteAbbrev); // "SEA-BI"
 * ```
 */
export const getScheduleByTerminals = async (
  params: GetScheduleByTerminalsParams
): Promise<ScheduleResponse[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getScheduleByTerminalsParamsSchema,
      output: scheduleResponseArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getScheduleByTerminalsParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe("The trip date for which to retrieve schedule information."),
    departingTerminalId: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the departing terminal."),
    arrivingTerminalId: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the arriving terminal."),
  })
  .describe(
    "Parameters for retrieving schedule information between specific terminal pairs on a given trip date."
  );

export type GetScheduleByTerminalsParams = z.infer<
  typeof getScheduleByTerminalsParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const scheduleResponseSchema = z
  .object({
    RouteID: z
      .number()
      .describe(
        "Unique identifier for the route. Links the schedule to a specific ferry route."
      ),
    RouteAbbrev: z
      .string()
      .describe(
        "Abbreviated name for the route. Short identifier used in displays and references."
      ),
    Description: z
      .string()
      .describe(
        "Full description of the route. Provides detailed information about the route's purpose and characteristics."
      ),
    Schedules: z
      .array(z.unknown())
      .describe(
        "Array of schedule information for this route. Contains detailed scheduling data."
      ),
  })
  .describe(
    "Schedule response information including route details and schedule data. This schema provides comprehensive schedule information for a specific route."
  );

export const scheduleResponseArraySchema = z.array(scheduleResponseSchema);

export type ScheduleResponse = z.infer<typeof scheduleResponseSchema>;

// ============================================================================
// QUERY HOOK
// ============================================================================

/**
 * React Query hook for fetching schedule by terminals from WSF Schedule API
 *
 * Retrieves schedule information between specific terminal pairs for a given trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate, departingTerminalId, and arrivingTerminalId
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalId - The unique identifier for the departing terminal
 * @param params.arrivingTerminalId - The unique identifier for the arriving terminal
 * @param options - Optional React Query options
 * @returns React Query result object containing schedule information
 *
 * @example
 * ```typescript
 * const { data: schedule } = useScheduleByTerminals({
 *   tripDate: new Date('2024-01-15'),
 *   departingTerminalId: 1,
 *   arrivingTerminalId: 2
 * });
 * console.log(schedule?.[0]?.RouteAbbrev); // "SEA-BI"
 * ```
 */
export const useScheduleByTerminals = (
  params: GetScheduleByTerminalsParams,
  options?: TanStackOptions<ScheduleResponse[]>
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "scheduleByTerminals",
      params.tripDate,
      params.departingTerminalId,
      params.arrivingTerminalId,
    ],
    queryFn: () => getScheduleByTerminals(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
