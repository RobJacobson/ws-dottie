import { z } from "zod";
import { travelTimeRouteSchema } from "@/schemas/wsdot-travel-times";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getTravelTime */
const travelTimeInput = z.object({
  travelTimeId: z.number().int().positive(),
});

/** Endpoint metadata for getTravelTime */
export const getTravelTimeMeta = defineEndpoint({
  api: "wsdot-travel-times",
  function: "getTravelTime",
  endpoint:
    "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimeAsJson?TravelTimeID={travelTimeId}",
  inputSchema: travelTimeInput,
  outputSchema: travelTimeRouteSchema,
  sampleParams: { travelTimeId: 1 },
  cacheStrategy: "DAILY_STATIC",
});

// Type exports
export type TravelTimeInput = z.infer<typeof travelTimeInput>;
