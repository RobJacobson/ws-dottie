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
    resourceDescription:
      "Each TravelTimeRoute item represents current travel time data for a specific route in Washington State, including average and current travel times, distance information, and start/end point locations. These routes cover major corridors in Seattle, Tacoma, and Snoqualmie Pass areas, helping travelers make informed routing decisions.",
    businessContext:
      "Use to plan travel routes and estimate arrival times by providing current travel times, average times, distance, and route location information for Washington State highways. Compare current conditions against historical averages to identify traffic delays and optimize departure times.",
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
  endpointDescription:
    "Returns a TravelTimeRoute object containing travel time data for a specified route ID.",
});

export const fetchTravelTimes = createEndpoint({
  api: apis.wsdotTravelTimes,
  group: travelTimeRoutesGroup,
  functionName: "fetchTravelTimes",
  endpoint: "/getTravelTimesAsJson",
  inputSchema: travelTimesInputSchema,
  outputSchema: travelTimeRouteSchema.array(),
  sampleParams: {},
  endpointDescription:
    "Returns an array of TravelTimeRoute objects containing travel time data for all available routes.",
});
