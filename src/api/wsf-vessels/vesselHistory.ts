import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import {
  zNullableString,
  zWsdotNullableDate,
} from "@/shared/fetching/validation/schemas";
import { createUseQueryWsf, tanstackQueryOptions } from "@/shared/tanstack";

import { getCacheFlushDateVessels } from "../wsf/cacheFlushDate";

// ============================================================================
// INLINE TEMPLATE FUNCTIONS
//
// These functions were previously in shared templates but are now inlined
// here since they are only used in this module.
// ============================================================================

/**
 * Date range parameter schemas for vessel history
 */
const dateRangeParams = {
  dateStart: z.date(),
  dateEnd: z.date(),
};

/**
 * Date range validation refinement for vessel history
 */
const dateRangeRefinement = {
  refine: (data: { dateStart: Date; dateEnd: Date }) => {
    return data.dateStart <= data.dateEnd;
  },
  errorConfig: {
    message: "dateStart must be before or equal to dateEnd",
    path: ["dateEnd"],
  },
};

/**
 * Vessel name parameter with validation for vessel history
 */
const vesselNameParam = z.string().min(1, "Vessel name cannot be empty");

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
    vesselName: vesselNameParam,
    ...dateRangeParams,
  })
  .refine(dateRangeRefinement.refine, dateRangeRefinement.errorConfig);

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

export const useVesselHistory = createUseQueryWsf({
  queryFn: getVesselHistory,
  queryKeyPrefix: ["wsf", "vessels", "history", "getVesselHistory"],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
  getCacheFlushDate: getCacheFlushDateVessels,
});

export const useVesselHistoryByVesselAndDateRange = createUseQueryWsf({
  queryFn: getVesselHistoryByVesselAndDateRange,
  queryKeyPrefix: [
    "wsf",
    "vessels",
    "history",
    "getVesselHistoryByVesselAndDateRange",
  ],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
  getCacheFlushDate: getCacheFlushDateVessels,
});
