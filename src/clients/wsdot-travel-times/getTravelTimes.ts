import { z } from "zod";
import { travelTimesSchema } from "@/schemas/wsdot-travel-times";

/** Input schema for getTravelTimes */
const travelTimesInput = z.object({});

/** Endpoint metadata for getTravelTimes */
export const getTravelTimesMeta = {
  api: "wsdot-travel-times",
  function: "getTravelTimes",
  endpoint: "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson",
  inputSchema: travelTimesInput,
  outputSchema: travelTimesSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports
export type TravelTimesInput = z.infer<typeof travelTimesInput>;
