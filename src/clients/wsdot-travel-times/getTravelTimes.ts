import { z } from "zod";
import type { TravelTimes } from "@/schemas/wsdot-travel-times";
import { travelTimesSchema } from "@/schemas/wsdot-travel-times";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getTravelTimes */
const travelTimesInput = z.object({});

/** Endpoint metadata for getTravelTimes */
export const getTravelTimesMeta: Endpoint<TravelTimesInput, TravelTimes> = {
  api: "wsdot-travel-times",
  function: "getTravelTimes",
  endpoint: "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson",
  inputSchema: travelTimesInput,
  outputSchema: travelTimesSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type TravelTimesInput = z.infer<typeof travelTimesInput>;
