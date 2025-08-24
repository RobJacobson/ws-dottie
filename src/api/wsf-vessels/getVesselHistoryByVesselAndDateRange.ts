import type { UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/caching";
import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import { zNullableString, zWsdotNullableDate } from "@/shared/validation";
import {
  createDateRangeParams,
  createDateRangeRefinement,
  createVesselNameParam,
} from "@/shared/validation/templates";

import { getCacheFlushDateVessels } from "./getCacheFlushDateVessels";

// ============================================================================
// API Function
//
// getVesselHistoryByVesselAndDateRange
// ============================================================================

const ENDPOINT =
  "/ferries/api/vessels/rest/vesselhistory/{vesselName}/{dateStart}/{dateEnd}";

/**
 * API function for fetching vessel history data for a specific vessel and date range from WSF Vessels API
 *
 * Retrieves historical vessel data for a specific vessel within a specified date range,
 * including past routes, schedules, and operational history for that vessel.
 *
 * @param params - Object containing vesselName, dateStart, dateEnd
 * @param params.vesselName - The name of the vessel (e.g., "Cathlamet")
 * @param params.dateStart - The start date for the history range
 * @param params.dateEnd - The end date for the history range
 * @returns Promise resolving to an array of VesselHistory objects containing historical data for the specified vessel and date range
 *
 * @example
 * ```typescript
 * const history = await getVesselHistoryByVesselAndDateRange({
 *   vesselName: "Cathlamet",
 *   dateStart: new Date("2024-01-01"),
 *   dateEnd: new Date("2024-01-02")
 * });
 * console.log(history[0].Vessel); // "Cathlamet"
 * ```
 */
export const getVesselHistoryByVesselAndDateRange = async (
  params: GetVesselHistoryByVesselAndDateRangeParams
): Promise<VesselHistory[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getVesselHistoryByVesselAndDateRangeParamsSchema,
      output: vesselHistoryArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getVesselHistoryByVesselAndDateRangeParamsSchema
// GetVesselHistoryByVesselAndDateRangeParams
// ============================================================================

export const getVesselHistoryByVesselAndDateRangeParamsSchema = z
  .object({
    vesselName: createVesselNameParam("for historical data retrieval"),
    ...createDateRangeParams("the historical data range"),
  })
  .refine(
    createDateRangeRefinement().refine,
    createDateRangeRefinement().errorConfig
  )
  .describe(
    "Parameters for fetching historical operational data for a specific vessel within a date range. Useful for analyzing vessel routes, schedules, and operational patterns over time."
  );

export type GetVesselHistoryByVesselAndDateRangeParams = z.infer<
  typeof getVesselHistoryByVesselAndDateRangeParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// vesselHistorySchema
// VesselHistory
// ============================================================================

export const vesselHistorySchema = z
  .object({
    VesselId: z.number().describe("Unique vessel identifier in the WSF system"),
    Vessel: z.string().describe("Vessel name as returned by the API"),
    Departing: zNullableString().describe(
      "Name of departing terminal, if available"
    ),
    Arriving: zNullableString().describe(
      "Name of arriving terminal, if available"
    ),
    ScheduledDepart: zWsdotNullableDate().describe(
      "Scheduled departure time, if available"
    ),
    ActualDepart: zWsdotNullableDate().describe(
      "Actual departure time, if available"
    ),
    EstArrival: zWsdotNullableDate().describe(
      "Estimated arrival time, if available"
    ),
    Date: zWsdotNullableDate().describe(
      "Date of the historical record, if available"
    ),
  })
  .catchall(z.unknown())
  .describe(
    "Historical operational record for a vessel including departure/arrival information and timing data."
  );

export const vesselHistoryArraySchema = z
  .array(vesselHistorySchema)
  .describe("Array of historical operational records for vessels");

export type VesselHistory = z.infer<typeof vesselHistorySchema>;

// ============================================================================
// TanStack Query Hook
//
// useVesselHistoryByVesselAndDateRange
// ============================================================================

/**
 * Hook for fetching vessel history by vessel and date range from WSF Vessels API
 *
 * Retrieves historical information for a specific vessel within a specified date range,
 * including construction details, service history, and notable events.

 *
 * @param params - Object containing vesselName, dateStart, and dateEnd
 * @param params.vesselName - The name of the vessel to fetch history for (e.g., "Spokane")
 * @param params.dateStart - The start date for the history range
 * @param params.dateEnd - The end date for the history range
 * @param options - Optional React Query options
 * @returns React Query result containing an array of VesselHistory objects with historical information
 *
 * @example
 * ```typescript
 * const { data: history } = useVesselHistoryByVesselAndDateRange({
 *   vesselName: "Spokane",
 *   dateStart: new Date('2024-01-01'),
 *   dateEnd: new Date('2024-01-31')
 * });
 * console.log(history?.[0]?.VesselName); // "Spokane"
 * ```
 */
export const useVesselHistoryByVesselAndDateRange = (
  params: GetVesselHistoryByVesselAndDateRangeParams,
  options?: TanStackOptions<VesselHistory[]>
): UseQueryResult<VesselHistory[], Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "history", JSON.stringify(params)],
    queryFn: () => getVesselHistoryByVesselAndDateRange(params),
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
    params,
  });
};
