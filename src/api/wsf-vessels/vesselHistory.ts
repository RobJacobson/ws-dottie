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

export const getVesselHistory = async (): Promise<VesselHistory[]> => {
  // Get history for a default vessel (e.g., the first vessel) with a recent date range
  // This is a simplified implementation - in practice you might want to aggregate multiple vessels
  return getVesselHistoryByVesselAndDateRange({
    vesselName: "Cathlamet", // Default vessel
    dateStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    dateEnd: new Date(), // Today
  });
};


// ============================================================================
// Input Schema & Types
//
// getVesselHistoryParamsSchema
// getVesselHistoryByVesselAndDateRangeParamsSchema
// getAllVesselHistoriesParamsSchema
// GetVesselHistoryParams
// GetVesselHistoryByVesselAndDateRangeParams
// ============================================================================

export const getVesselHistoryParamsSchema = z.object({});

export type GetVesselHistoryParams = z.infer<
  typeof getVesselHistoryParamsSchema
>;

export const getVesselHistoryByVesselAndDateRangeParamsSchema = z
  .object({
    vesselName: createVesselNameParam("for historical data retrieval"),
    ...createDateRangeParams("the historical data range"),
  })
  .refine(
    createDateRangeRefinement().refine,
    createDateRangeRefinement().errorConfig
  );

export type GetVesselHistoryByVesselAndDateRangeParams = z.infer<
  typeof getVesselHistoryByVesselAndDateRangeParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// vesselHistorySchema
// vesselHistoryArraySchema
// VesselHistory
// ============================================================================

export const vesselHistorySchema = z.object({
  VesselId: z.number(),
  Vessel: z.string(),
  Departing: zNullableString(),
  Arriving: zNullableString(),
  ScheduledDepart: zWsdotNullableDate(),
  ActualDepart: zWsdotNullableDate(),
  EstArrival: zWsdotNullableDate(),
  Date: zWsdotNullableDate(),
});

export type VesselHistory = z.infer<typeof vesselHistorySchema>;

export const vesselHistoryArraySchema = z.array(vesselHistorySchema);

// ============================================================================
// TanStack Query Hooks
//
// useVesselHistory (all vessel history)
// useVesselHistoryByVesselAndDateRange (filtered by vessel and date range)
// ============================================================================

export const useVesselHistory = (
  options?: TanStackOptions<VesselHistory[]>
): UseQueryResult<VesselHistory[], Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "history"],
    queryFn: () => getVesselHistory(),
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};

export const useVesselHistoryByVesselAndDateRange = (
  params: GetVesselHistoryByVesselAndDateRangeParams,
  options?: TanStackOptions<VesselHistory[]>
): UseQueryResult<VesselHistory[], Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "history", "filtered", JSON.stringify(params)],
    queryFn: () => getVesselHistoryByVesselAndDateRange(params),
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
    params,
  });
};
