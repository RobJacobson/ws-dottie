import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Provides current travel times for many popular travel routes around Washington State. Coverage Area: Seattle, Tacoma, and Snoqualmie Pass areas.";

export const travelTimeRoutesResource = {
  name: "travel-time-routes",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    byId: {
      function: "getTravelTimeById",
      endpoint: "/getTravelTimeAsJson?TravelTimeID={TravelTimeID}",
      inputSchema: i.getTravelTimeSchema,
      outputSchema: o.travelTimeRouteSchema,
      sampleParams: { TravelTimeID: 1 },
      cacheStrategy: "STATIC",
      description: `Returns travel time data for a specific route by ID. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.GetTravelTimeInput, o.TravelTimeRoute>,
    all: {
      function: "getTravelTimes",
      endpoint: "/getTravelTimesAsJson",
      inputSchema: i.getTravelTimesSchema,
      outputSchema: z.array(o.travelTimeRouteSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns travel time data for all available routes. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.GetTravelTimesInput, o.TravelTimeRoute[]>,
  },
};
