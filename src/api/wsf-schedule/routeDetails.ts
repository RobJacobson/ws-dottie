import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateSchedule } from "../wsf/cacheFlushDate";

// ============================================================================
// API Functions
//
// getRouteDetailsByTerminals (route details for terminal pair)
// getRouteDetailsByRoute (route details for specific route)
// ============================================================================

const ENDPOINT_BY_TERMINALS =
  "/ferries/api/schedule/rest/routedetailsbyterminals/{tripDate}/{departingTerminalId}/{arrivingTerminalId}";
const ENDPOINT_BY_ROUTE =
  "/ferries/api/schedule/rest/routedetails/{tripDate}/{routeId}";
const ENDPOINT_STANDALONE =
  "/ferries/api/schedule/rest/routedetails/{tripDate}";

export const getRouteDetailsByTerminals = async (
  params: GetRouteDetailsByTerminalsParams
): Promise<RouteDetails[]> => {
  return zodFetch(
    ENDPOINT_BY_TERMINALS,
    {
      input: getRouteDetailsByTerminalsParamsSchema,
      output: routeDetailsArraySchema,
    },
    params
  );
};

export const getRouteDetailsByRoute = async (
  params: GetRouteDetailsByRouteParams
): Promise<RouteDetailsByRouteResponse> => {
  return zodFetch(
    ENDPOINT_BY_ROUTE,
    {
      input: getRouteDetailsByRouteParamsSchema,
      output: routeDetailsByRouteResponseSchema,
    },
    params
  );
};

export const getRouteDetails = async (
  params: GetRouteDetailsParams
): Promise<RouteDetails[]> => {
  return zodFetch(
    ENDPOINT_STANDALONE,
    {
      input: getRouteDetailsParamsSchema,
      output: routeDetailsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getRouteDetailsByTerminalsParamsSchema
// GetRouteDetailsByTerminalsParams
// getRouteDetailsByRouteParamsSchema
// GetRouteDetailsByRouteParams
// ============================================================================

export const getRouteDetailsByTerminalsParamsSchema = z.object({
  tripDate: z.date(),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
});

export type GetRouteDetailsByTerminalsParams = z.infer<
  typeof getRouteDetailsByTerminalsParamsSchema
>;

export const getRouteDetailsByRouteParamsSchema = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

export type GetRouteDetailsByRouteParams = z.infer<
  typeof getRouteDetailsByRouteParamsSchema
>;

export const getRouteDetailsParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetRouteDetailsParams = z.infer<typeof getRouteDetailsParamsSchema>;

// ============================================================================
// Output Schemas & Types
//
// serviceDisruptionSchema
// annotationSchema
// routeDetailsSchema
// routeDetailsArraySchema
// RouteDetails
// routeDetailsByRouteServiceDisruptionSchema
// routeDetailsByRouteResponseSchema
// RouteDetailsByRouteResponse
// ============================================================================

export const serviceDisruptionSchema = z.object({
  BulletinID: z.number(),
  BulletinFlag: z.boolean(),
  CommunicationFlag: z.boolean(),
  PublishDate: zWsdotDate(),
  AlertDescription: z.string(),
  DisruptionDescription: z.string().nullable(),
  AlertFullTitle: z.string(),
  AlertFullText: z.string(),
  IVRText: z.string().nullable(),
});

export const annotationSchema = z.object({
  AnnotationID: z.number(),
  AnnotationText: z.string(),
  AnnotationType: z.string(),
});

export const routeDetailsSchema = z.object({
  RouteID: z.number(),
  RouteAbbrev: z.string(),
  Description: z.string(),
  RegionID: z.number(),
  VesselWatchID: z.number(),
  ReservationFlag: z.boolean(),
  InternationalFlag: z.boolean(),
  PassengerOnlyFlag: z.boolean(),
  CrossingTime: z.number().nullable(),
  AdaNotes: z.string().nullable(),
  GeneralRouteNotes: z.string(),
  SeasonalRouteNotes: z.string(),
  ServiceDisruptions: z.array(serviceDisruptionSchema),
});

export const routeDetailsArraySchema = z.array(routeDetailsSchema);

export type RouteDetails = z.infer<typeof routeDetailsSchema>;

export const routeDetailsByRouteServiceDisruptionSchema = z.object({
  BulletinID: z.number(),
  BulletinFlag: z.boolean(),
  CommunicationFlag: z.boolean(),
  PublishDate: zWsdotDate(),
  AlertDescription: z.string(),
  DisruptionDescription: z.string().nullable(),
  AlertFullTitle: z.string(),
  AlertFullText: z.string(),
  IVRText: z.string().nullable(),
});

export const routeDetailsByRouteResponseSchema = z.object({
  RouteID: z.number(),
  RouteAbbrev: z.string(),
  Description: z.string(),
  RegionID: z.number(),
  VesselWatchID: z.number(),
  ReservationFlag: z.boolean(),
  InternationalFlag: z.boolean(),
  PassengerOnlyFlag: z.boolean(),
  CrossingTime: z.number().nullable(),
  AdaNotes: z.string().nullable(),
  GeneralRouteNotes: z.string(),
  SeasonalRouteNotes: z.string(),
  ServiceDisruptions: z.array(routeDetailsByRouteServiceDisruptionSchema),
});

export type RouteDetailsByRouteResponse = z.infer<
  typeof routeDetailsByRouteResponseSchema
>;

// ============================================================================
// TanStack Query Hooks
//
// useRouteDetailsByTerminals
// useRouteDetailsByRoute
// ============================================================================

export const useRouteDetailsByTerminals = (
  params: GetRouteDetailsByTerminalsParams,
  options?: TanStackOptions<RouteDetails[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: [
      "wsf",
      "schedule",
      "routeDetailsByTerminals",
      JSON.stringify(params),
    ],
    queryFn: () => getRouteDetailsByTerminals(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });

export const useRouteDetailsByRoute = (
  params: GetRouteDetailsByRouteParams,
  options?: TanStackOptions<RouteDetailsByRouteResponse>
) =>
  useQueryWithAutoUpdate({
    queryKey: [
      "wsf",
      "schedule",
      "routeDetailsByRoute",
      JSON.stringify(params),
    ],
    queryFn: () => getRouteDetailsByRoute(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });

export const useRouteDetails = (
  params: GetRouteDetailsParams,
  options?: TanStackOptions<RouteDetails[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "routeDetails", JSON.stringify(params)],
    queryFn: () => getRouteDetails(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });
