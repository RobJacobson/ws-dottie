import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

// ============================================================================
// API Functions
//
// getTravelTimeById (single item)
// getTravelTimes (array)
// ============================================================================

const ENDPOINT_BASE =
  "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimeAsJson?TravelTimeID={travelTimeId}";
const ALL_TRAVEL_TIMES_ENDPOINT =
  "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson";

export const getTravelTimeById = async (
  params: GetTravelTimeByIdParams
): Promise<TravelTimeRoute> => {
  return zodFetch(
    ENDPOINT_BASE,
    {
      input: getTravelTimeByIdParamsSchema,
      output: travelTimeRouteSchema,
    },
    params
  );
};

export const getTravelTimes = async (
  params: GetTravelTimesParams = {}
): Promise<TravelTimeRoute[]> => {
  return zodFetch(
    ALL_TRAVEL_TIMES_ENDPOINT,
    {
      input: getTravelTimesParamsSchema,
      output: travelTimesArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getTravelTimeById (single item)
// getTravelTimes (array)
// ============================================================================

export const getTravelTimeByIdParamsSchema = z.object({
  travelTimeId: z.number().int().positive(),
});

export type GetTravelTimeByIdParams = z.infer<
  typeof getTravelTimeByIdParamsSchema
>;

export const getTravelTimesParamsSchema = z.object({});

export type GetTravelTimesParams = z.infer<typeof getTravelTimesParamsSchema>;

// ============================================================================
// Output Schemas & Types
//
// travelTimeRoute (shared schema)
// travelTimesArray (array wrapper)
// ============================================================================

export const travelTimeEndpointSchema = z.object({
  Description: z.string().nullable(),
  Direction: z.string().nullable(),
  MilePost: z.number(),
  RoadName: z.string().nullable(),
});

export const travelTimeRouteSchema = z.object({
  AverageTime: z.number(),
  CurrentTime: z.number(),
  Description: z.string().nullable(),
  Distance: z.number(),
  EndPoint: travelTimeEndpointSchema.nullable(),
  Name: z.string().nullable(),
  StartPoint: travelTimeEndpointSchema.nullable(),
  TravelTimeID: z.number().int().positive(),
});

export const travelTimesArraySchema = z.array(travelTimeRouteSchema);

export type TravelTimeEndpoint = z.infer<typeof travelTimeEndpointSchema>;

export type TravelTimeRoute = z.infer<typeof travelTimeRouteSchema>;

export type TravelTimesResponse = z.infer<typeof travelTimesArraySchema>;

// ============================================================================
// TanStack Query Hooks
//
// useTravelTimeById (single item)
// useTravelTimes (array)
// ============================================================================

export const useTravelTimeById = (
  params: GetTravelTimeByIdParams,
  options?: TanStackOptions<TravelTimeRoute>
): UseQueryResult<TravelTimeRoute, Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "travel-times",
      "getTravelTimeById",
      JSON.stringify(params),
    ],
    queryFn: () => getTravelTimeById(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

export const useTravelTimes = (
  params: GetTravelTimesParams = {},
  options?: TanStackOptions<TravelTimeRoute[]>
): UseQueryResult<TravelTimeRoute[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "travel-times",
      "getTravelTimes",
      JSON.stringify(params),
    ],
    queryFn: () => getTravelTimes(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
