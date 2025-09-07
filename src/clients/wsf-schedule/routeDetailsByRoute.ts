import { z } from "zod";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getRouteDetailsByRouteParamsSchema = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

export type GetRouteDetailsByRouteParams = z.infer<
  typeof getRouteDetailsByRouteParamsSchema
>;

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

export const getRouteDetailsByRoute = async (
  params: GetRouteDetailsByRouteParams
): Promise<RouteDetailsByRouteResponse> =>
  zodFetch({
    endpoint: "/ferries/api/schedule/rest/routedetails/{tripDate}/{routeId}",
    inputSchema: getRouteDetailsByRouteParamsSchema,
    outputSchema: routeDetailsByRouteResponseSchema,
    params,
  });

export const routeDetailsByRouteOptions = createQueryOptions({
  apiFunction: getRouteDetailsByRoute,
  queryKey: ["wsf", "schedule", "routeDetails", "getRouteDetailsByRoute"],
  cacheStrategy: "DAILY_STATIC",
});
