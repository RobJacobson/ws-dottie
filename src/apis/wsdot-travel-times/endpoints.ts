import { z } from "zod";
import type { ApiDefinition, EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const wsdotTravelTimesApi: ApiDefinition = {
  name: "wsdot-travel-times",
  baseUrl:
    "http://www.wsdot.wa.gov/traffic/api/traveltimes/traveltimesrest.svc",
  endpoints: [
    /**
     * TravelTimeRoute response
     */
    {
      function: "getTravelTime",
      endpoint: "/getTravelTimeAsJson?TravelTimeID={TravelTimeID}",
      inputSchema: i.getTravelTimeSchema,
      outputSchema: o.travelTimeRouteSchema,
      sampleParams: { TravelTimeID: 1 },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.GetTravelTimeInput, o.TravelTimeRoute>,
    {
      function: "getTravelTimes",
      endpoint: "/getTravelTimesAsJson",
      inputSchema: i.getTravelTimesSchema,
      outputSchema: z.array(o.travelTimeRouteSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.GetTravelTimesInput, o.TravelTimeRoute[]>,
  ],
};
