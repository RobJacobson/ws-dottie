import { z } from "zod";
import {
  type TravelTimes,
  travelTimesSchema,
} from "@/schemas/wsdot-travel-times";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export { travelTimesSchema };
export type { TravelTimes };

export const getTravelTimesParamsSchema = z.object({});

export type GetTravelTimesParams = z.infer<typeof getTravelTimesParamsSchema>;

export const getTravelTimes = zodFetch<GetTravelTimesParams, TravelTimes>(
  "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson",
  getTravelTimesParamsSchema,
  travelTimesSchema
);

export const travelTimesOptions = createQueryOptions({
  apiFunction: getTravelTimes,
  queryKey: ["wsdot", "travel-times", "getTravelTimes"],
  cacheStrategy: "DAILY_STATIC",
});
