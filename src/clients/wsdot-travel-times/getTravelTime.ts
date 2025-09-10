import { z } from "zod";
import { travelTimeRouteSchema } from "@/schemas/wsdot-travel-times";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTravelTime */
export const getTravelTimeParamsSchema = z.object({
  travelTimeId: z.number().int().positive(),
});

/** GetTravelTime params type */
export type GetTravelTimeParams = z.infer<typeof getTravelTimeParamsSchema>;

/** Endpoint definition for getTravelTime */
export const getTravelTimeDef = defineEndpoint({
  moduleGroup: "wsdot-travel-times",
  functionName: "getTravelTime",
  endpoint:
    "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimeAsJson?TravelTimeID={travelTimeId}",
  inputSchema: getTravelTimeParamsSchema,
  outputSchema: travelTimeRouteSchema,
  sampleParams: { travelTimeId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
