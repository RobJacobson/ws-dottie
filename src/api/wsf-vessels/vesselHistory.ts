/**
 * Vessel History API
 *
 * Provides historical vessel operational data from the Washington State Ferries system including
 * departure and arrival information, scheduled vs actual departure times, and estimated arrival times.
 * This API returns historical sailing data for specific vessels within specified date ranges,
 * useful for analyzing vessel performance, tracking delays, and understanding operational patterns.
 *
 * API Functions:
 * - getVesselHistoryByVesselAndDateRange: Returns VesselHistory[] for a specific vessel and date range
 * - getAllVesselHistories: Returns VesselHistory[] for all vessels in the WSF fleet within a date range
 *
 * Input/Output Overview:
 * - getVesselHistoryByVesselAndDateRange: Input: { vesselName: string, dateStart: Date, dateEnd: Date }, Output: VesselHistory[]
 * - getAllVesselHistories: Input: { dateStart: Date, dateEnd: Date, batchSize?: number }, Output: VesselHistory[]
 *
 * Base Type: VesselHistory
 *
 * interface VesselHistory {
 *   VesselId: number;
 *   Vessel: string;
 *   Departing: string | null;
 *   Arriving: string | null;
 *   ScheduledDepart: Date | null;
 *   ActualDepart: Date | null;
 *   EstArrival: Date | null;
 *   Date: Date | null;
 * }
 *
 * Note: Only includes fields that are officially documented in the WSF Vessels API specification.
 *
 * Example Usage:
 *
 * curl -s "https://www.wsdot.wa.gov/ferries/api/vessels/rest/vesselhistory?apiaccesscode=$WSDOT_ACCESS_TOKEN&vesselname=Cathlamet&datestart=01/01/2024&dateend=01/31/2024"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * [
 *   {
 *     "VesselId": 32,
 *     "Vessel": "Cathlamet",
 *     "Departing": null,
 *     "Arriving": null,
 *     "ScheduledDepart": null,
 *     "ActualDepart": null,
 *     "EstArrival": null,
 *     "Date": null
 *   }
 * ]
 * ```
 *
 * Note: Historical data availability may vary by date range and vessel. Some endpoints may return
 * null values when historical data is not available for the specified parameters.
 */

import type { UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import {
  zNullableString,
  zWsdotNullableDate,
} from "@/shared/fetching/validation/schemas";
import {
  createBatchSizeParam,
  createDateRangeParams,
  createDateRangeRefinement,
  createVesselNameParam,
} from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateVessels } from "../wsf/cacheFlushDate";

// ============================================================================
// API Functions
//
// getVesselHistoryByVesselAndDateRange (singular item)
// getAllVesselHistories (array)
// ============================================================================

const ENDPOINT =
  "/ferries/api/vessels/rest/vesselhistory/{vesselName}/{dateStart}/{dateEnd}";

/**
 * Retrieves historical operational data for a specific vessel within a specified date range.
 *
 * @param params - Parameters object for vessel history query
 * @param params.vesselName - Name of the vessel (e.g., "Cathlamet", "Spokane")
 * @param params.dateStart - Start date for the historical data range
 * @param params.dateEnd - End date for the historical data range
 * @returns Promise<VesselHistory[]> - Array of historical vessel operational data
 *
 * @example
 * const vesselHistory = await getVesselHistoryByVesselAndDateRange({
 *   vesselName: "Cathlamet",
 *   dateStart: new Date("2024-01-01"),
 *   dateEnd: new Date("2024-01-31")
 * });
 * console.log(vesselHistory.length);  // 1
 *
 * @throws {Error} When vessel name is invalid, dates are invalid, or API is unavailable
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

/**
 * Retrieves historical operational data for all vessels in the WSF fleet within a specified date range.
 *
 * @param params - Parameters object for all vessel histories query
 * @param params.dateStart - Start date for the historical data range
 * @param params.dateEnd - End date for the historical data range
 * @param params.batchSize - Optional batch size for parallel requests (default: 6, max: 10)
 * @returns Promise<VesselHistory[]> - Array of historical vessel operational data for all vessels
 *
 * @example
 * const allHistories = await getAllVesselHistories({
 *   dateStart: new Date("2024-01-01"),
 *   dateEnd: new Date("2024-01-31"),
 *   batchSize: 8
 * });
 * console.log(allHistories.length);  // 21
 *
 * @throws {Error} When dates are invalid or API is unavailable
 */
export const getAllVesselHistories = async (
  params: GetAllVesselHistoriesParams
): Promise<VesselHistory[]> => {
  // All vessels in the WSF fleet (as of 2024)
  const allVesselNames = [
    "Cathlamet",
    "Chelan",
    "Chetzemoka",
    "Chimacum",
    "Issaquah",
    "Kaleetan",
    "Kennewick",
    "Kitsap",
    "Kittitas",
    "Puyallup",
    "Salish",
    "Samish",
    "Sealth",
    "Spokane",
    "Tacoma",
    "Tillikum",
    "Tokitae",
    "Walla Walla",
    "Wenatchee",
    "Yakima",
    "Zumwalt",
  ];

  // Fetch history for all vessels in parallel
  const historyPromises = allVesselNames.map((vesselName) =>
    getVesselHistoryByVesselAndDateRange({
      vesselName,
      dateStart: params.dateStart,
      dateEnd: params.dateEnd,
    })
  );

  // Wait for all requests to complete and flatten the results
  const allHistories = await Promise.all(historyPromises);
  return allHistories.flat();
};

// ============================================================================
// Input Schema & Types
//
// getVesselHistoryByVesselAndDateRangeParamsSchema
// getAllVesselHistoriesParamsSchema
// GetVesselHistoryByVesselAndDateRangeParams
// GetAllVesselHistoriesParams
// ============================================================================

/**
 * Parameters for retrieving historical operational data for a specific vessel within a date range
 */
export const getVesselHistoryByVesselAndDateRangeParamsSchema = z
  .object({
    vesselName: createVesselNameParam("for historical data retrieval"),
    ...createDateRangeParams("the historical data range"),
  })
  .refine(
    createDateRangeRefinement().refine,
    createDateRangeRefinement().errorConfig
  )
  .describe("");

/**
 * Parameters for retrieving historical operational data for all vessels within a date range
 */
export const getAllVesselHistoriesParamsSchema = z
  .object({
    ...createDateRangeParams(
      "the historical data range for all vessels in the WSF fleet"
    ),
    batchSize: createBatchSizeParam("all vessel histories", 6, 10),
  })
  .refine(
    createDateRangeRefinement().refine,
    createDateRangeRefinement().errorConfig
  )
  .describe("");

export type GetVesselHistoryByVesselAndDateRangeParams = z.infer<
  typeof getVesselHistoryByVesselAndDateRangeParamsSchema
>;
export type GetAllVesselHistoriesParams = z.infer<
  typeof getAllVesselHistoriesParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// vesselHistorySchema
// vesselHistoryArraySchema
// VesselHistory
// ============================================================================

/**
 * Vessel historical operational data schema - includes departure/arrival information and timing data
 */
export const vesselHistorySchema = z
  .object({
    VesselId: z.number().describe(""),
    Vessel: z.string().describe(""),
    Departing: zNullableString().describe(""),
    Arriving: zNullableString().describe(""),
    ScheduledDepart: zWsdotNullableDate().describe(""),
    ActualDepart: zWsdotNullableDate().describe(""),
    EstArrival: zWsdotNullableDate().describe(""),
    Date: zWsdotNullableDate().describe(""),
  })
  
  .describe("");

/**
 * VesselHistory type - represents historical vessel operational data
 */
export type VesselHistory = z.infer<typeof vesselHistorySchema>;

/**
 * Array of vessel history objects - wrapper around vesselHistorySchema
 */
export const vesselHistoryArraySchema = z
  .array(vesselHistorySchema)
  .describe("");

// ============================================================================
// TanStack Query Hooks
//
// useVesselHistoryByVesselAndDateRange (singular item)
// useAllVesselHistories (array)
// ============================================================================

/**
 * TanStack Query hook for vessel history data with automatic updates (single vessel).
 *
 * @param params - Parameters object for vessel history query
 * @param params.vesselName - Name of the vessel (e.g., "Cathlamet", "Spokane")
 * @param params.dateStart - Start date for the historical data range
 * @param params.dateEnd - End date for the historical data range
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<VesselHistory[], Error> - Query result with vessel history data
 *
 * @example
 * const { data: vesselHistory, isLoading } = useVesselHistoryByVesselAndDateRange({
 *   vesselName: "Cathlamet",
 *   dateStart: new Date("2024-01-01"),
 *   dateEnd: new Date("2024-01-31")
 * });
 * if (vesselHistory) {
 *   console.log(vesselHistory.length);  // 1
 * }
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

/**
 * TanStack Query hook for all vessel histories with automatic updates (all vessels).
 *
 * @param params - Parameters object for all vessel histories query
 * @param params.dateStart - Start date for the historical data range
 * @param params.dateEnd - End date for the historical data range
 * @param params.batchSize - Optional batch size for parallel requests (default: 6, max: 10)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<VesselHistory[], Error> - Query result with all vessel history data
 *
 * @example
 * const { data: allHistories, isLoading } = useAllVesselHistories({
 *   dateStart: new Date("2024-01-01"),
 *   dateEnd: new Date("2024-01-31"),
 *   batchSize: 8
 * });
 * if (allHistories) {
 *   console.log(allHistories.length);  // 21
 * }
 */
export const useAllVesselHistories = (
  options?: TanStackOptions<VesselHistory[]>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "history"],
    queryFn: (params: { dateStart: Date; dateEnd: Date; batchSize?: number }) =>
      getAllVesselHistories({
        dateStart: params.dateStart,
        dateEnd: params.dateEnd,
        batchSize: params.batchSize ?? 6,
      }),
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
