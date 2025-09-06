import { z } from "zod";
import {
  type TravelTimeRoute,
  travelTimeRouteSchema,
} from "@/schemas/wsdot-travel-times";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export { travelTimeRouteSchema };
export type { TravelTimeRoute };

export const getTravelTimeByIdParamsSchema = z.object({
  travelTimeId: z.number().int().positive(),
});

export type GetTravelTimeByIdParams = z.infer<
  typeof getTravelTimeByIdParamsSchema
>;

const ENDPOINT_BASE =
  "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimeAsJson?TravelTimeID={travelTimeId}";

export const getTravelTimeById = zodFetch<
  GetTravelTimeByIdParams,
  TravelTimeRoute
>(ENDPOINT_BASE, getTravelTimeByIdParamsSchema, travelTimeRouteSchema);

export const travelTimeByIdOptions = createQueryOptions({
  apiFunction: getTravelTimeById,
  queryKey: ["wsdot", "travel-times", "getTravelTimeById"],
  cacheStrategy: "DAILY_STATIC",
});
