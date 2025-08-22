import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

// ============================================================================
// API FUNCTION
// ============================================================================

const ENDPOINT =
  "/ferries/api/schedule/rest/scheduletoday/{departingTerminalId}/{arrivingTerminalId}/{onlyRemainingTimes}";

/**
 * API function for fetching today's schedule by terminals from WSF Schedule API
 *
 * Provides today's departure times for a terminal combination. Valid departing and
 * arriving terminals may be found using terminalsAndMates. For the onlyRemainingTimes
 * value, please indicate 'true' if departure times prior to now should not be included
 * in the resultset and 'false' if they should be included in the resultset.
 *
 * @param params - Object containing departingTerminalId and arrivingTerminalId
 * @param params.departingTerminalId - The unique identifier for the departing terminal
 * @param params.arrivingTerminalId - The unique identifier for the arriving terminal
 * @returns Promise resolving to a ScheduleResponse object containing today's schedule information, or null if no schedule found
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const schedule = await getScheduleTodayByTerminals({
 *   departingTerminalId: 1,
 *   arrivingTerminalId: 2
 * });
 * console.log(schedule.RouteAbbrev); // "SEA-BI"
 * ```
 */
export const getScheduleTodayByTerminals = async (
  params: GetScheduleTodayByTerminalsParams
): Promise<ScheduleResponse> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getScheduleTodayByTerminalsParamsSchema,
      output: scheduleResponseSchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getScheduleTodayByTerminalsParamsSchema = z
  .object({
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
    "Parameters for retrieving today's schedule information between specific terminal pairs."
  );

export type GetScheduleTodayByTerminalsParams = z.infer<
  typeof getScheduleTodayByTerminalsParamsSchema
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
 * React Query hook for fetching today's schedule by terminals from WSF Schedule API
 *
 * Provides today's departure times for a terminal combination. Valid departing and
 * arriving terminals may be found using terminalsAndMates.
 *
 * @param params - Object containing departingTerminalId and arrivingTerminalId
 * @param params.departingTerminalId - The unique identifier for the departing terminal
 * @param params.arrivingTerminalId - The unique identifier for the arriving terminal
 * @param options - Optional React Query options
 * @returns React Query result object containing today's schedule information
 *
 * @example
 * ```typescript
 * const { data: schedule } = useScheduleTodayByTerminals({
 *   departingTerminalId: 1,
 *   arrivingTerminalId: 2
 * });
 * console.log(schedule?.RouteAbbrev); // "SEA-BI"
 * ```
 */
export const useScheduleTodayByTerminals = (
  params: GetScheduleTodayByTerminalsParams,
  options?: TanStackOptions<ScheduleResponse>
) =>
  useQuery({
    queryKey: ["wsf", "schedule", "scheduleTodayByTerminals", params],
    queryFn: () => getScheduleTodayByTerminals(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
