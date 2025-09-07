import { z } from "zod";
import {
  type TravelTimes,
  travelTimesSchema,
} from "@/schemas/wsdot-travel-times";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export { travelTimesSchema };
export type { TravelTimes };

export const getTravelTimesParamsSchema = z.object({});

export type GetTravelTimesParams = z.infer<typeof getTravelTimesParamsSchema>;

export const getTravelTimes = async (
  params: GetTravelTimesParams
): Promise<TravelTimes> =>
  zodFetch({
    endpoint:
      "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson",
    inputSchema: getTravelTimesParamsSchema,
    outputSchema: travelTimesSchema,
    params,
  });

export const travelTimesOptions = createQueryOptions({
  apiFunction: getTravelTimes,
  queryKey: ["wsdot", "travel-times", "getTravelTimes"],
  cacheStrategy: "DAILY_STATIC",
});
