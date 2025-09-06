import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  travelTimeRouteSchema,
  travelTimesSchema,
  type TravelTimeRoute,
  type TravelTimes,
} from "@/schemas/wsdot-travel-times";

// Re-export schemas and types for convenience
export { travelTimeRouteSchema, travelTimesSchema };
export type { TravelTimeRoute, TravelTimes };

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
// API Functions
//
// getTravelTimeById (single item)
// getTravelTimes (array)
// ============================================================================

const ENDPOINT_BASE =
  "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimeAsJson?TravelTimeID={travelTimeId}";

export const getTravelTimeById = zodFetch<
  GetTravelTimeByIdParams,
  TravelTimeRoute
>(ENDPOINT_BASE, getTravelTimeByIdParamsSchema, travelTimeRouteSchema);

export const getTravelTimes = zodFetch<GetTravelTimesParams, TravelTimes>(
  "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson",
  getTravelTimesParamsSchema,
  travelTimesSchema
);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const travelTimeByIdOptions = createQueryOptions({
  apiFunction: getTravelTimeById,
  queryKey: ["wsdot", "travel-times", "getTravelTimeById"],
  cacheStrategy: "DAILY_STATIC",
});

export const travelTimesOptions = createQueryOptions({
  apiFunction: getTravelTimes,
  queryKey: ["wsdot", "travel-times", "getTravelTimes"],
  cacheStrategy: "DAILY_STATIC",
});
