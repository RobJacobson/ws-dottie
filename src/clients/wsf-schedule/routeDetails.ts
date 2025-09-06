import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  routeDetailsSchema,
  routeDetailsArraySchema,
  type RouteDetails,
  type RouteDetailsArray,
} from "@/schemas/wsf-schedule";
import {
  serviceDisruptionSchema,
  type ServiceDisruption,
} from "@/schemas/wsf-schedule";
import { annotationSchema, type Annotation } from "@/schemas/wsf-schedule";

// ============================================================================
// Input Schemas & Types
//
// getRouteDetailsByScheduleTerminalsParamsSchema
// GetRouteDetailsByScheduleTerminalsParams
// getRouteDetailsByRouteParamsSchema
// GetRouteDetailsByRouteParams
// ============================================================================

export const getRouteDetailsByScheduleTerminalsParamsSchema = z.object({
  tripDate: z.date(),
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

export type GetRouteDetailsByScheduleTerminalsParams = z.infer<
  typeof getRouteDetailsByScheduleTerminalsParamsSchema
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
// routeDetailsSchema (imported from routeDetails.zod)
// routeDetailsArraySchema (imported from routeDetails.zod)
// RouteDetails (imported from routeDetails.zod)
// RouteDetailsArray (imported from routeDetails.zod)
// ============================================================================

// Re-export schemas and types for convenience
export { routeDetailsSchema, routeDetailsArraySchema };
export type { RouteDetails, RouteDetailsArray };

// Re-export schemas and types for convenience
export { serviceDisruptionSchema, annotationSchema };
export type { ServiceDisruption, Annotation };

export const routeDetailsByRouteServiceDisruptionSchema = z.object({
  BulletinID: z.number(),
  BulletinFlag: z.boolean(),
  CommunicationFlag: z.boolean(),
  PublishDate: z.date(),
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
// API Functions
//
// getRouteDetailsByScheduleTerminals (route details for terminal pair)
// getRouteDetailsByRoute (route details for specific route)
// ============================================================================

const ENDPOINT_BY_TERMINALS =
  "/ferries/api/schedule/rest/routedetailsbyterminals/{tripDate}/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}";
const ENDPOINT_BY_ROUTE =
  "/ferries/api/schedule/rest/routedetails/{tripDate}/{routeId}";
const ENDPOINT_STANDALONE =
  "/ferries/api/schedule/rest/routedetails/{tripDate}";

export const getRouteDetailsByScheduleTerminals = zodFetch<
  GetRouteDetailsByScheduleTerminalsParams,
  RouteDetailsArray
>(
  ENDPOINT_BY_TERMINALS,
  getRouteDetailsByScheduleTerminalsParamsSchema,
  routeDetailsArraySchema
);

export const getRouteDetailsByRoute = zodFetch<
  GetRouteDetailsByRouteParams,
  RouteDetailsByRouteResponse
>(
  ENDPOINT_BY_ROUTE,
  getRouteDetailsByRouteParamsSchema,
  routeDetailsByRouteResponseSchema
);

export const getRouteDetails = zodFetch<
  GetRouteDetailsParams,
  RouteDetailsArray
>(ENDPOINT_STANDALONE, getRouteDetailsParamsSchema, routeDetailsArraySchema);

// ============================================================================
// TanStack Query Hooks
//
// useRouteDetailsByScheduleTerminals
// useRouteDetailsByRoute
// ============================================================================

export const routeDetailsByScheduleTerminalsOptions = createQueryOptions({
  apiFunction: getRouteDetailsByScheduleTerminals,
  queryKey: ["wsf", "schedule", "routeDetails", "getRouteDetailsByScheduleTerminals"],
  cacheStrategy: "DAILY_STATIC",
});

export const routeDetailsByRouteOptions = createQueryOptions({
  apiFunction: getRouteDetailsByRoute,
  queryKey: ["wsf", "schedule", "routeDetails", "getRouteDetailsByRoute"],
  cacheStrategy: "DAILY_STATIC",
});

export const routeDetailsOptions = createQueryOptions({
  apiFunction: getRouteDetails,
  queryKey: ["wsf", "schedule", "routeDetails", "getRouteDetails"],
  cacheStrategy: "DAILY_STATIC",
});
