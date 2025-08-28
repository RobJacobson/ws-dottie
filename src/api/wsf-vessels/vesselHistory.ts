import type { UseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import {
  createDateRangeParams,
  createDateRangeRefinement,
  createVesselNameParam,
  zNullableString,
  zWsdotNullableDate,
} from "@/shared/fetching/validation/schemas";
import {
  tanstackQueryOptions,
  useQueryWithAutoUpdate,
} from "@/shared/tanstack";

import { getCacheFlushDateVessels } from "../wsf/cacheFlushDate";

// ============================================================================
// API Functions
//
// getVesselHistory (all vessels)
// getVesselHistoryByVesselAndDateRange (specific vessel with date range)
// ============================================================================

const ENDPOINT_ALL = "/ferries/api/vessels/rest/vesselhistory";
const ENDPOINT_SPECIFIC =
  "/ferries/api/vessels/rest/vesselhistory/{vesselName}/{dateStart}/{dateEnd}";

export const getVesselHistory = async (
  params: GetVesselHistoryParams = {}
): Promise<VesselHistories> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      output: vesselHistoryArraySchema,
    },
    params
  );
};

export const getVesselHistoryByVesselAndDateRange = async (
  params: GetVesselHistoryByVesselAndDateRangeParams
): Promise<VesselHistories> => {
  return zodFetch(
    ENDPOINT_SPECIFIC,
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

/**
 * VesselHistories type - represents an array of vessel history objects
 */
export type VesselHistories = z.infer<typeof vesselHistoryArraySchema>;

// ============================================================================
// TanStack Query Hooks
//
// useVesselHistory (all vessel history)
// useVesselHistoryByVesselAndDateRange (filtered by vessel and date range)
// ============================================================================

export const useVesselHistory = (
  params: GetVesselHistoryParams = {},
  options?: UseQueryOptions<VesselHistories>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "history"],
    queryFn: () => getVesselHistory(params),
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};

export const useVesselHistoryByVesselAndDateRange = (
  params: GetVesselHistoryByVesselAndDateRangeParams,
  options?: UseQueryOptions<VesselHistories>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "history", "filtered", JSON.stringify(params)],
    queryFn: () => getVesselHistoryByVesselAndDateRange(params),
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
    params,
  });
};
