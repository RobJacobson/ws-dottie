import { z } from "zod";
import {
  type TravelTimeRoute,
  travelTimeRouteSchema,
} from "@/schemas/wsdot-travel-times";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export { travelTimeRouteSchema };
export type { TravelTimeRoute };

export const getTravelTimeParamsSchema = z.object({
  travelTimeId: z.number().int().positive(),
});

export type GetTravelTimeParams = z.infer<typeof getTravelTimeParamsSchema>;

export const getTravelTime = async (
  params: GetTravelTimeParams
): Promise<TravelTimeRoute> =>
  zodFetch({
    endpoint:
      "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimeAsJson?TravelTimeID={travelTimeId}",
    inputSchema: getTravelTimeParamsSchema,
    outputSchema: travelTimeRouteSchema,
    params,
  });

export const travelTimeOptions = createQueryOptions({
  apiFunction: getTravelTime,
  queryKey: ["wsdot", "travel-times", "getTravelTime"],
  cacheStrategy: "DAILY_STATIC",
});
