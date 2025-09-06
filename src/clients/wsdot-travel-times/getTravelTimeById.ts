import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  travelTimeRouteSchema,
  type TravelTimeRoute,
} from "@/schemas/wsdot-travel-times";

// Re-export schemas and types for convenience
export { travelTimeRouteSchema };
export type { TravelTimeRoute };

// ============================================================================
// Input Schema & Types
// ============================================================================

export const getTravelTimeByIdParamsSchema = z.object({
  travelTimeId: z.number().int().positive(),
});

export type GetTravelTimeByIdParams = z.infer<
  typeof getTravelTimeByIdParamsSchema
>;

// ============================================================================
// API Function
// ============================================================================

const ENDPOINT_BASE =
  "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimeAsJson?TravelTimeID={travelTimeId}";

export const getTravelTimeById = zodFetch<
  GetTravelTimeByIdParams,
  TravelTimeRoute
>(ENDPOINT_BASE, getTravelTimeByIdParamsSchema, travelTimeRouteSchema);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const travelTimeByIdOptions = createQueryOptions({
  apiFunction: getTravelTimeById,
  queryKey: ["wsdot", "travel-times", "getTravelTimeById"],
  cacheStrategy: "DAILY_STATIC",
});
