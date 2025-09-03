import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import {
  zNullableString,
  zWsdotNullableDate,
} from "@/shared/fetching/validation/schemas";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_DAY,
  TWO_DAYS,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

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

export type VesselHistories = z.infer<typeof vesselHistoryArraySchema>;

// ============================================================================
// TanStack Query Options
// ============================================================================

export const vesselHistoryOptions = () =>
  queryOptions({
    queryKey: ["wsf", "vessels", "history", "getVesselHistory"],
    queryFn: () => getVesselHistory({}),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

export const vesselHistoryByVesselAndDateRangeOptions = (
  params: GetVesselHistoryByVesselAndDateRangeParams
) =>
  queryOptions({
    queryKey: [
      "wsf",
      "vessels",
      "history",
      "getVesselHistoryByVesselAndDateRange",
      {
        ...params,
        dateStart:
          params.dateStart instanceof Date
            ? params.dateStart.toISOString()
            : params.dateStart,
        dateEnd:
          params.dateEnd instanceof Date
            ? params.dateEnd.toISOString()
            : params.dateEnd,
      },
    ],
    queryFn: () => getVesselHistoryByVesselAndDateRange(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
