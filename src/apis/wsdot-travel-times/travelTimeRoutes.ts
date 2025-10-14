import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const travelTimeRoutesResource = {
  name: "travel-time-routes",
  resourceDescription:
    "Provides current travel times for many popular travel routes around Washington State. Coverage Area: Seattle, Tacoma, and Snoqualmie Pass areas.",
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getTravelTimeById: {
      function: "getTravelTimeById",
      endpoint: "/getTravelTimeAsJson?TravelTimeID={TravelTimeID}",
      inputSchema: i.getTravelTimeSchema,
      outputSchema: o.travelTimeRouteSchema,
      sampleParams: { TravelTimeID: 1 },
      endpointDescription:
        "Returns travel time data for a specific route by ID.",
    } satisfies EndpointDefinition<i.GetTravelTimeInput, o.TravelTimeRoute>,
    getTravelTimes: {
      function: "getTravelTimes",
      endpoint: "/getTravelTimesAsJson",
      inputSchema: i.getTravelTimesSchema,
      outputSchema: z.array(o.travelTimeRouteSchema),
      sampleParams: {},
      endpointDescription: "Returns travel time data for all available routes.",
    } satisfies EndpointDefinition<i.GetTravelTimesInput, o.TravelTimeRoute[]>,
  },
};
