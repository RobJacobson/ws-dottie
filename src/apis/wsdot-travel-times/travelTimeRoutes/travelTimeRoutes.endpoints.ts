import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import {
  travelTimeByIdInputSchema,
  travelTimesInputSchema,
} from "./travelTimeRoutes.input";
import { travelTimeRouteSchema } from "./travelTimeRoutes.output";

export const travelTimeRoutesGroup: EndpointGroup = {
  name: "travel-time-routes",
  cacheStrategy: "STATIC",
  documentation: {
    summary:
      "Current and average travel times for major Washington State highway routes.",
    description:
      "Travel time data for routes in Seattle, Tacoma, and Snoqualmie Pass areas, including distance, start/end points, and comparison of current vs. average times.",
    useCases: [
      "Plan travel routes and estimate arrival times.",
      "Compare current conditions against historical averages to identify delays.",
      "Optimize departure times based on real-time traffic conditions.",
    ],
    updateFrequency: "5m",
  },
};

export const fetchTravelTimeById = createEndpoint({
  api: apis.wsdotTravelTimes,
  group: travelTimeRoutesGroup,
  functionName: "fetchTravelTimeById",
  endpoint: "/getTravelTimeAsJson?TravelTimeID={TravelTimeID}",
  inputSchema: travelTimeByIdInputSchema,
  outputSchema: travelTimeRouteSchema,
  sampleParams: { TravelTimeID: 1 },
  endpointDescription: "Get travel time data for a specific route by ID.",
});

export const fetchTravelTimes = createEndpoint({
  api: apis.wsdotTravelTimes,
  group: travelTimeRoutesGroup,
  functionName: "fetchTravelTimes",
  endpoint: "/getTravelTimesAsJson",
  inputSchema: travelTimesInputSchema,
  outputSchema: travelTimeRouteSchema.array(),
  sampleParams: {},
  endpointDescription: "List travel time data for all available routes.",
});
