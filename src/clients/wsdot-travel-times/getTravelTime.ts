import { z } from "zod";

import {
  type TravelTimeRoute,
  travelTimeRouteSchema,
} from "@/schemas/wsdot-travel-times/travelTimeRoute.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getTravelTime */
const travelTimeInput = z.object({
  TravelTimeID: z.number().int().positive(),
});

/** Endpoint metadata for getTravelTime */
export const getTravelTimeMeta: EndpointDefinition<
  TravelTimeInput,
  TravelTimeRoute
> = {
  api: "wsdot-travel-times",
  function: "getTravelTime",
  endpoint:
    "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimeAsJson?TravelTimeID={TravelTimeID}",
  inputSchema: travelTimeInput,
  outputSchema: travelTimeRouteSchema,
  sampleParams: { TravelTimeID: 1 },
  cacheStrategy: "STATIC",
};

// Type exports
export type TravelTimeInput = z.infer<typeof travelTimeInput>;
