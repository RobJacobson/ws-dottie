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
// getVesselHistoryParamsSchema
// getVesselHistoryByVesselAndDateRangeParamsSchema
// getAllVesselHistoriesParamsSchema
// GetVesselHistoryParams
// GetVesselHistoryByVesselAndDateRangeParams
// GetAllVesselHistoriesParams
// ============================================================================

export const getVesselHistoryParamsSchema = z.object({}).describe("");

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
  )
  .describe("");

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

export type VesselHistory = z.infer<typeof vesselHistorySchema>;

export const vesselHistoryArraySchema = z
  .array(vesselHistorySchema)
  .describe("");

// ============================================================================
// TanStack Query Hooks
//
// useVesselHistoryByVesselAndDateRange (singular item)
// useAllVesselHistories (array)
// ============================================================================

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
