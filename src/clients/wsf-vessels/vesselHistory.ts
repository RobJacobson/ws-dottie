import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  vesselHistorySchema,
  vesselHistoryArraySchema,
  type VesselHistory as VesselHistoryType,
  type VesselHistoryArray as VesselHistoryArrayType,
} from "@/schemas/wsf-vessels";

// ============================================================================
// INLINE TEMPLATE FUNCTIONS
//
// These functions were previously in shared templates but are now inlined
// here since they are only used in this module.
// ============================================================================

const dateRangeParams = {
  dateStart: z.date(),
  dateEnd: z.date(),
};

const dateRangeRefinement = {
  refine: (data: { dateStart: Date; dateEnd: Date }) => {
    return data.dateStart <= data.dateEnd;
  },
  errorConfig: {
    message: "dateStart must be before or equal to dateEnd",
    path: ["dateEnd"],
  },
};

const vesselNameParam = z.string().min(1, "Vessel name cannot be empty");

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
// vesselHistorySchema (imported from vesselHistory.zod)
// vesselHistoryArraySchema (imported from vesselHistory.zod)
// VesselHistory (imported from vesselHistory.zod)
// VesselHistoryArray (imported from vesselHistory.zod)
// ============================================================================

// VesselHistory and VesselHistoryArray types are exported from centralized schemas

// ============================================================================
// API Functions
//
// getVesselHistory (all vessels)
// getVesselHistoryByVesselAndDateRange (specific vessel with date range)
// ============================================================================

const ENDPOINT_ALL = "/ferries/api/vessels/rest/vesselhistory";
const ENDPOINT_SPECIFIC =
  "/ferries/api/vessels/rest/vesselhistory/{vesselName}/{dateStart}/{dateEnd}";

export const getVesselHistory = zodFetch<
  GetVesselHistoryParams,
  VesselHistoryArrayType
>(ENDPOINT_ALL, getVesselHistoryParamsSchema, vesselHistoryArraySchema);

export const getVesselHistoryByVesselAndDateRange = zodFetch<
  GetVesselHistoryByVesselAndDateRangeParams,
  VesselHistoryArrayType
>(
  ENDPOINT_SPECIFIC,
  getVesselHistoryByVesselAndDateRangeParamsSchema,
  vesselHistoryArraySchema
);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const vesselHistoryOptions = createQueryOptions({
  apiFunction: getVesselHistory,
  queryKey: ["wsf", "vessels", "history", "getVesselHistory"],
  cacheStrategy: "DAILY_STATIC",
});

export const vesselHistoryByVesselAndDateRangeOptions = createQueryOptions({
  apiFunction: getVesselHistoryByVesselAndDateRange,
  queryKey: [
    "wsf",
    "vessels",
    "history",
    "getVesselHistoryByVesselAndDateRange",
  ],
  cacheStrategy: "DAILY_STATIC",
});
