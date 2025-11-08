import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod";
import {
  type TravelTimeByIdInput,
  type TravelTimesInput,
  travelTimeByIdInputSchema,
  travelTimesInputSchema,
} from "./travelTimeRoutes.input";
import {
  type TravelTimeRoute,
  travelTimeRouteSchema,
} from "./travelTimeRoutes.output";

export const travelTimeRoutesGroup = {
  name: "travel-time-routes",
  documentation: {
    resourceDescription:
      "Each TravelTimeRoute item represents current travel time data for a specific route in Washington State, including average and current travel times, distance information, and start/end point locations. These routes cover major corridors in Seattle, Tacoma, and Snoqualmie Pass areas, helping travelers make informed routing decisions.",
    businessContext:
      "Use to plan travel routes and estimate arrival times by providing current travel times, average times, distance, and route location information for Washington State highways. Compare current conditions against historical averages to identify traffic delays and optimize departure times.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    fetchTravelTimeById: {
      endpoint: "/getTravelTimeAsJson?TravelTimeID={TravelTimeID}",
      inputSchema: travelTimeByIdInputSchema,
      outputSchema: travelTimeRouteSchema,
      sampleParams: { TravelTimeID: 1 },
      endpointDescription:
        "Returns a TravelTimeRoute object containing travel time data for a specified route ID.",
    } satisfies EndpointDefinition<TravelTimeByIdInput, TravelTimeRoute>,
    fetchTravelTimes: {
      endpoint: "/getTravelTimesAsJson",
      inputSchema: travelTimesInputSchema,
      outputSchema: z.array(travelTimeRouteSchema),
      sampleParams: {},
      endpointDescription:
        "Returns an array of TravelTimeRoute objects containing travel time data for all available routes.",
    } satisfies EndpointDefinition<TravelTimesInput, TravelTimeRoute[]>,
  },
} satisfies EndpointGroup;
