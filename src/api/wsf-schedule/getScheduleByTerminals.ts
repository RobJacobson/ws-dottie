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

// Import the complete schema from getScheduleByRoute
import type {
  ScheduleResponse,
  scheduleResponseArraySchema,
} from "./getScheduleByRoute";

// Re-export the schema for consistency
export { scheduleResponseArraySchema };
export type { ScheduleResponse };

// Schema and types are now imported from getScheduleByRoute

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
