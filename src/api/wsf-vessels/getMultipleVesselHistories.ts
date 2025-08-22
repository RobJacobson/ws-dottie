import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import type { TanStackOptions } from "@/shared/types";
import {
  createBatchSizeParam,
  createDateRangeParams,
  createDateRangeRefinement,
  createVesselNamesParam,
} from "@/shared/validation/templates";

import type { VesselHistory } from "./getVesselHistoryByVesselAndDateRange";
// Import the individual vessel history function
import { getVesselHistoryByVesselAndDateRange } from "./getVesselHistoryByVesselAndDateRange";

// ============================================================================
// FETCH FUNCTION
// ============================================================================

/**
 * Helper function for fetching vessel history data for multiple vessels and date range
 *
 * This function fetches historical data for multiple vessels by making parallel API calls
 * to the vessel history endpoint for each vessel. This is useful when you need historical
 * data for multiple vessels over the same time period.
 *
 * @param params - Object containing vesselNames, dateStart, dateEnd, and optional batchSize
 * @param params.vesselNames - Array of vessel names to fetch history for (e.g., ["Spokane", "Walla Walla"])
 * @param params.dateStart - The start date for the history range
 * @param params.dateEnd - The end date for the history range
 * @param params.batchSize - Optional batch size for processing requests (default: 6)
 * @returns Promise resolving to an array of VesselHistory objects containing historical data for all specified vessels
 *
 * @example
 * ```typescript
 * const history = await getMultipleVesselHistories({
 *   vesselNames: ["Spokane", "Walla Walla"],
 *   dateStart: new Date("2024-01-01"),
 *   dateEnd: new Date("2024-01-02")
 * });
 * console.log(history.length); // Total number of history records for all vessels
 * ```
 */
export const getMultipleVesselHistories = async (
  params: GetMultipleVesselHistoriesParams
): Promise<VesselHistory[]> => {
  const { vesselNames, dateStart, dateEnd, batchSize = 6 } = params;
  const results: VesselHistory[] = [];

  // Process in batches to avoid overwhelming the server and browser connection limits
  for (let i = 0; i < vesselNames.length; i += batchSize) {
    const batch = vesselNames.slice(i, i + batchSize);
    const batchPromises = batch.map((vesselName) =>
      getVesselHistoryByVesselAndDateRange({
        vesselName,
        dateStart,
        dateEnd,
      })
    );

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults.flat());
  }

  return results;
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getMultipleVesselHistoriesParamsSchema = z
  .object({
    vesselNames: createVesselNamesParam("for historical data retrieval"),
    ...createDateRangeParams(
      "the historical data range for all specified vessels"
    ),
    batchSize: createBatchSizeParam("multiple vessel history", 6, 20),
  })
  .refine(
    createDateRangeRefinement().refine,
    createDateRangeRefinement().errorConfig
  )
  .describe(
    "Parameters for fetching historical operational data for multiple vessels within the same date range. Efficiently retrieves historical data for several vessels with automatic batching to respect server limits."
  );

export type GetMultipleVesselHistoriesParams = z.infer<
  typeof getMultipleVesselHistoriesParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

// ============================================================================
// QUERY HOOK
// ============================================================================

/**
 * Hook for fetching vessel history data for multiple vessels and date range from WSF Vessels API
 *
 * Retrieves historical vessel data for multiple vessels within a specified date range,
 * including past routes, schedules, and operational history for those vessels.
 *
 * @param params - Object containing vesselNames, dateStart, dateEnd, and optional batchSize
 * @param params.vesselNames - Array of vessel names to fetch history for (e.g., ["Spokane", "Walla Walla"])
 * @param params.dateStart - The start date for the history range
 * @param params.dateEnd - The end date for the history range
 * @param params.batchSize - Optional batch size for processing requests (default: 6)
 * @param options - Optional React Query options
 * @returns React Query result containing an array of VesselHistory objects with historical data for all specified vessels
 */
export const useMultipleVesselHistories = (
  params: {
    vesselNames: string[];
    dateStart: Date;
    dateEnd: Date;
    batchSize?: number;
  },
  options?: TanStackOptions<VesselHistory[]>
): UseQueryResult<VesselHistory[], Error> => {
  return useQuery({
    queryKey: [
      "wsf",
      "vessels",
      "history",
      "multiple",
      params.vesselNames.sort(),
      params.dateStart.toISOString(),
      params.dateEnd.toISOString(),
      params.batchSize,
    ],
    queryFn: () =>
      getMultipleVesselHistories({
        vesselNames: params.vesselNames,
        dateStart: params.dateStart,
        dateEnd: params.dateEnd,
        batchSize: params.batchSize ?? 6,
      }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
