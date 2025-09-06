import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  travelTimesSchema,
  type TravelTimes,
} from "@/schemas/wsdot-travel-times";

// Re-export schemas and types for convenience
export { travelTimesSchema };
export type { TravelTimes };

// ============================================================================
// Input Schema & Types
// ============================================================================

export const getTravelTimesParamsSchema = z.object({});

export type GetTravelTimesParams = z.infer<typeof getTravelTimesParamsSchema>;

// ============================================================================
// API Function
// ============================================================================

export const getTravelTimes = zodFetch<GetTravelTimesParams, TravelTimes>(
  "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson",
  getTravelTimesParamsSchema,
  travelTimesSchema
);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const travelTimesOptions = createQueryOptions({
  apiFunction: getTravelTimes,
  queryKey: ["wsdot", "travel-times", "getTravelTimes"],
  cacheStrategy: "DAILY_STATIC",
});
