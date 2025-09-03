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
): Promise<RouteDetailsArray> => {
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
): Promise<RouteDetailsArray> => {
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

/**
 * RouteDetailsArray type - represents an array of route details objects
 */
export type RouteDetailsArray = z.infer<typeof routeDetailsArraySchema>;

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

export const routeDetailsByTerminalsOptions = (
  params: GetRouteDetailsByTerminalsParams
) =>
  queryOptions({
    queryKey: [
      "wsf",
      "schedule",
      "routeDetails",
      "getRouteDetailsByTerminals",
      {
        ...params,
        tripDate:
          params.tripDate instanceof Date
            ? params.tripDate.toISOString()
            : params.tripDate,
      },
    ],
    queryFn: () => getRouteDetailsByTerminals(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

export const routeDetailsByRouteOptions = (
  params: GetRouteDetailsByRouteParams
) =>
  queryOptions({
    queryKey: [
      "wsf",
      "schedule",
      "routeDetails",
      "getRouteDetailsByRoute",
      {
        ...params,
        tripDate:
          params.tripDate instanceof Date
            ? params.tripDate.toISOString()
            : params.tripDate,
      },
    ],
    queryFn: () => getRouteDetailsByRoute(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

export const routeDetailsOptions = (params: GetRouteDetailsParams) =>
  queryOptions({
    queryKey: [
      "wsf",
      "schedule",
      "routeDetails",
      "getRouteDetails",
      {
        ...params,
        tripDate:
          params.tripDate instanceof Date
            ? params.tripDate.toISOString()
            : params.tripDate,
      },
    ],
    queryFn: () => getRouteDetails(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
