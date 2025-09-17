import { z } from "zod";
import {
  type TravelTimes,
  travelTimesSchema,
} from "@/schemas/wsdot-travel-times/travelTimeRoute.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getTravelTimes */
const travelTimesInput = z.object({});

/** Endpoint metadata for getTravelTimes */
export const getTravelTimesMeta: EndpointDefinition<TravelTimesInput, TravelTimes> = {
  id: "wsdot-travel-times/getTravelTimes",
  endpoint: "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson",
  inputSchema: travelTimesInput,
  outputSchema: travelTimesSchema,
  sampleParams: {},
  cacheStrategy: "STATIC",
};

// Type exports
export type TravelTimesInput = z.infer<typeof travelTimesInput>;
