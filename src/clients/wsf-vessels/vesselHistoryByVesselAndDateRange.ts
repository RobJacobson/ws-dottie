import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  vesselHistoryArraySchema,
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
// getVesselHistoryByVesselAndDateRangeParamsSchema
// GetVesselHistoryByVesselAndDateRangeParams
// ============================================================================

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
// vesselHistoryArraySchema (imported from vesselHistory.zod)
// VesselHistoryArray (imported from vesselHistory.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getVesselHistoryByVesselAndDateRange (specific vessel with date range)
// ============================================================================

const ENDPOINT_SPECIFIC =
  "/ferries/api/vessels/rest/vesselhistory/{vesselName}/{dateStart}/{dateEnd}";

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
