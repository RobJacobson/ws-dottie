import { z } from "zod";
import { travelTimesSchema } from "@/schemas/wsdot-travel-times";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTravelTimes */
export const getTravelTimesParamsSchema = z.object({});

/** GetTravelTimes params type */
export type GetTravelTimesParams = z.infer<typeof getTravelTimesParamsSchema>;

/** Endpoint definition for getTravelTimes */
export const getTravelTimesDef = defineEndpoint({
  moduleGroup: "wsdot-travel-times",
  functionName: "getTravelTimes",
  endpoint: "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson",
  inputSchema: getTravelTimesParamsSchema,
  outputSchema: travelTimesSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
