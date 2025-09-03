import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_DAY,
  TWO_DAYS,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

// ============================================================================
// API Functions
//
// getTimeAdjustments (all time adjustments)
// getTimeAdjustmentsByRoute (time adjustments for specific route)
// ============================================================================

const ENDPOINT_ALL = "/ferries/api/schedule/rest/timeadj";
const ENDPOINT_BY_ROUTE = "/ferries/api/schedule/rest/timeadjbyroute/{routeId}";

export const getTimeAdjustments = async (
  params: GetTimeAdjustmentsParams = {}
): Promise<TimeAdjustments> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      output: timeAdjustmentsArraySchema,
    },
    params
  );
};

export const getTimeAdjustmentsByRoute = async (
  params: GetTimeAdjustmentsByRouteParams
): Promise<TimeAdjustmentsByRoute> => {
  return zodFetch(
    ENDPOINT_BY_ROUTE,
    {
      input: getTimeAdjustmentsByRouteParamsSchema,
      output: timeAdjustmentsByRouteArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getTimeAdjustmentsParamsSchema
// GetTimeAdjustmentsParams
// getTimeAdjustmentsByRouteParamsSchema
// GetTimeAdjustmentsByRouteParams
// ============================================================================

export const getTimeAdjustmentsParamsSchema = z.object({});

export type GetTimeAdjustmentsParams = z.infer<
  typeof getTimeAdjustmentsParamsSchema
>;

export const getTimeAdjustmentsByRouteParamsSchema = z.object({
  routeId: z.number().int().positive(),
});

export type GetTimeAdjustmentsByRouteParams = z.infer<
  typeof getTimeAdjustmentsByRouteParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// timeAdjustmentResponseSchema
// timeAdjustmentsArraySchema
// TimeAdjustmentResponse
// timeAdjustmentSchema
// timeAdjustmentsByRouteArraySchema
// TimeAdjustment
// ============================================================================

export const timeAdjustmentResponseSchema = z.object({
  ScheduleID: z.number(),
  SchedRouteID: z.number(),
  RouteID: z.number(),
  RouteDescription: z.string(),
  RouteSortSeq: z.number(),
  SailingID: z.number(),
  SailingDescription: z.string(),
  ActiveSailingDateRange: z.object({
    DateFrom: zWsdotDate().nullable(),
    DateThru: zWsdotDate().nullable(),
    EventID: z.number().nullable(),
    EventDescription: z.string().nullable(),
  }),
  SailingDir: z.number(),
  JourneyID: z.number(),
  VesselID: z.number(),
  VesselName: z.string(),
  VesselHandicapAccessible: z.boolean(),
  VesselPositionNum: z.number(),
  TerminalID: z.number(),
  TerminalDescription: z.string(),
  TerminalBriefDescription: z.string(),
  JourneyTerminalID: z.number(),
  DepArrIndicator: z.number(),
  AdjDateFrom: zWsdotDate().nullable(),
  AdjDateThru: zWsdotDate().nullable(),
  AdjType: z.number(),
  TidalAdj: z.boolean().nullable(), // Changed from z.number().nullable() to z.boolean().nullable()
  TimeToAdj: z.string().nullable(), // Changed from z.number().nullable() to z.string().nullable() (WSDOT date format)
  Annotations: z.array(z.string()).nullable(),
  EventID: z.number().nullable(),
  EventDescription: z.string().nullable(),
});

export const timeAdjustmentsArraySchema = z.array(timeAdjustmentResponseSchema);

export type TimeAdjustmentResponse = z.infer<
  typeof timeAdjustmentResponseSchema
>;

export const timeAdjustmentSchema = z.object({
  AdjustmentID: z.number(),
  SchedRouteID: z.number(),
  AdjustmentMinutes: z.number(),
  StartDate: zWsdotDate(),
  EndDate: zWsdotDate(),
  Reason: z.string(),
});

export const timeAdjustmentsByRouteArraySchema = z.array(timeAdjustmentSchema);

export type TimeAdjustment = z.infer<typeof timeAdjustmentSchema>;

/**
 * TimeAdjustments type - represents an array of time adjustment response objects
 */
export type TimeAdjustments = z.infer<typeof timeAdjustmentsArraySchema>;

/**
 * TimeAdjustmentsByRoute type - represents an array of time adjustment objects
 */
export type TimeAdjustmentsByRoute = z.infer<
  typeof timeAdjustmentsByRouteArraySchema
>;

// ============================================================================
// TanStack Query Hooks
//
// useTimeAdjustments
// useTimeAdjustmentsByRoute
// ============================================================================

export const timeAdjustmentsOptions = (params: GetTimeAdjustmentsParams = {}) =>
  queryOptions({
    queryKey: ["wsf", "schedule", "timeAdjustments", "getTimeAdjustments"],
    queryFn: () => getTimeAdjustments(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

export const timeAdjustmentsByRouteOptions = (
  params: GetTimeAdjustmentsByRouteParams
) =>
  queryOptions({
    queryKey: [
      "wsf",
      "schedule",
      "timeAdjustments",
      "getTimeAdjustmentsByRoute",
      { ...params },
    ],
    queryFn: () => getTimeAdjustmentsByRoute(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
