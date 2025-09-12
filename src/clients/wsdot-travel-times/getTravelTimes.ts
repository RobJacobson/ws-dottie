import { z } from "zod";
import { travelTimesSchema } from "@/schemas/wsdot-travel-times";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTravelTimes */
const getTravelTimesParamsSchema = z.object({});

/** GetTravelTimes params type */

/** Endpoint definition for getTravelTimes */
export const getTravelTimesDef = defineEndpoint({
  api: "wsdot-travel-times",
  function: "getTravelTimes",
  endpoint: "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson",
  inputSchema: getTravelTimesParamsSchema,
  outputSchema: travelTimesSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
