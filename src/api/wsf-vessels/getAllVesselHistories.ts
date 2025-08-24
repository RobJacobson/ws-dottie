import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/utils";
import { tanstackQueryOptions } from "@/shared/config";
import type { TanStackOptions } from "@/shared/types";
import {
  createBatchSizeParam,
  createDateRangeParams,
  createDateRangeRefinement,
} from "@/shared/validation/templates";

import { getCacheFlushDateVessels } from "./getCacheFlushDateVessels";
import type { VesselHistory } from "./getVesselHistoryByVesselAndDateRange";
import { getVesselHistoryByVesselAndDateRange } from "./getVesselHistoryByVesselAndDateRange";

// ============================================================================
// API Function
//
// getAllVesselHistories
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
// getAllVesselHistoriesParamsSchema
// GetAllVesselHistoriesParams
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
// Output Schema & Types
//
// VesselHistory (imported from ./getVesselHistoryByVesselAndDateRange)
// ============================================================================

// Schema and type imported from getVesselHistoryByVesselAndDateRange.ts to avoid duplication

// ============================================================================
// TanStack Query Hook
//
// useAllVesselHistories
// ============================================================================

/**
 * Hook for fetching all vessel histories from WSF Vessels API
 *
 * Retrieves historical information for all vessels in the WSF fleet,
 * including construction details, service history, and notable events.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing an array of VesselHistory objects with historical information for all vessels
 *
 * @example
 * ```typescript
 * const { data: histories } = useAllVesselHistories();
 * console.log(histories?.[0]?.VesselName); // "Cathlamet"
 * ```
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
