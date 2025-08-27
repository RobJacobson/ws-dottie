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

export const getTravelTimeByIdParamsSchema = z
  .object({
    travelTimeId: z.number().int().positive().describe(""),
  })
  .describe("");

export type GetTravelTimeByIdParams = z.infer<
  typeof getTravelTimeByIdParamsSchema
>;

export const getTravelTimesParamsSchema = z.object({}).describe("");

export type GetTravelTimesParams = z.infer<typeof getTravelTimesParamsSchema>;

// ============================================================================
// Output Schemas & Types
//
// travelTimeRoute (shared schema)
// travelTimesArray (array wrapper)
// ============================================================================

export const travelTimeEndpointSchema = z
  .object({
    Description: z.string().nullable().describe(""),
    Direction: z.string().nullable().describe(""),
    MilePost: z.number().describe(""),
    RoadName: z.string().nullable().describe(""),
  })
  
  .describe("");

export const travelTimeRouteSchema = z
  .object({
    AverageTime: z.number().describe(""),
    CurrentTime: z.number().describe(""),
    Description: z.string().nullable().describe(""),
    Distance: z.number().describe(""),
    EndPoint: travelTimeEndpointSchema.nullable().describe(""),
    Name: z.string().nullable().describe(""),
    StartPoint: travelTimeEndpointSchema.nullable().describe(""),
    TravelTimeID: z.number().int().positive().describe(""),
  })
  
  .describe("");

export const travelTimesArraySchema = z
  .array(travelTimeRouteSchema)
  .describe("");

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
