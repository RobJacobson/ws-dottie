import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import type { TanStackOptions } from "@/shared/types";
import {
  createBatchSizeParam,
  createDateRangeParams,
  createDateRangeRefinement,
} from "@/shared/validation/templates";

// Import the multiple vessel histories function
import { getMultipleVesselHistories } from "./getMultipleVesselHistories";
import type { VesselHistory } from "./getVesselHistoryByVesselAndDateRange";

// ============================================================================
// FETCH FUNCTION
// ============================================================================

/**
 * Helper function for fetching vessel history data for all vessels in the WSF fleet
 *
 * This function fetches historical data for all 21 vessels in the Washington State Ferries fleet
 * by making batched API calls to the vessel history endpoint. This provides comprehensive
 * historical data for the entire fleet over a specified time period.
 *
 * @param params - Object containing dateStart, dateEnd, and optional batchSize
 * @param params.dateStart - The start date for the history range
 * @param params.dateEnd - The end date for the history range
 * @param params.batchSize - Optional batch size for processing requests (default: 6)
 * @returns Promise resolving to an array of VesselHistory objects containing historical data for all vessels
 *
 * @example
 * ```typescript
 * const allHistory = await getAllVesselHistories({
 *   dateStart: new Date("2024-01-01"),
 *   dateEnd: new Date("2024-01-02")
 * });
 * console.log(allHistory.length); // Total number of history records for all 21 vessels
 * ```
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

  return getMultipleVesselHistories({
    vesselNames: allVesselNames,
    dateStart: params.dateStart,
    dateEnd: params.dateEnd,
    batchSize: params.batchSize,
  });
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

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
  .describe(
    "Parameters for fetching historical operational data for all vessels in the Washington State Ferries fleet within a date range. This is a comprehensive query that retrieves data for all 21 active vessels, so use with caution for large date ranges."
  );

export type GetAllVesselHistoriesParams = z.infer<
  typeof getAllVesselHistoriesParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

// ============================================================================
// QUERY HOOK
// ============================================================================

/**
 * Hook for fetching vessel history data for all vessels in the WSF fleet from WSF Vessels API
 *
 * Retrieves historical vessel data for all vessels in the Washington State Ferries fleet
 * within a specified date range, including past routes, schedules, and operational history.
 *
 * @param params - Object containing dateStart, dateEnd, and optional batchSize
 * @param params.dateStart - The start date for the history range
 * @param params.dateEnd - The end date for the history range
 * @param params.batchSize - Optional batch size for processing requests (default: 6)
 * @param options - Optional React Query options
 * @returns React Query result containing an array of VesselHistory objects with historical data for all vessels
 */
export const useAllVesselHistories = (
  params: { dateStart: Date; dateEnd: Date; batchSize?: number },
  options?: TanStackOptions<VesselHistory[]>
): UseQueryResult<VesselHistory[], Error> => {
  return useQuery({
    queryKey: [
      "wsf",
      "vessels",
      "history",
      "all",
      params.dateStart.toISOString(),
      params.dateEnd.toISOString(),
      params.batchSize,
    ],
    queryFn: () =>
      getAllVesselHistories({
        dateStart: params.dateStart,
        dateEnd: params.dateEnd,
        batchSize: params.batchSize ?? 6,
      }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
