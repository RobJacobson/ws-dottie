import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsdotTravelTimesApi } from "../apiDefinition";
import {
  travelTimeByIdInputSchema,
  travelTimesInputSchema,
} from "./travelTimeRoutes.input";
import { travelTimeRouteSchema } from "./travelTimeRoutes.output";

export const travelTimeRoutesGroup = defineEndpointGroup({
  name: "travel-time-routes",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each TravelTimeRoute item represents current travel time data for a specific route in Washington State, including average and current travel times, distance information, and start/end point locations. These routes cover major corridors in Seattle, Tacoma, and Snoqualmie Pass areas, helping travelers make informed routing decisions.",
    businessContext:
      "Use to plan travel routes and estimate arrival times by providing current travel times, average times, distance, and route location information for Washington State highways. Compare current conditions against historical averages to identify traffic delays and optimize departure times.",
  },
});

export const fetchTravelTimeById = defineEndpoint({
  apiName: wsdotTravelTimesApi.name,
  baseUrl: wsdotTravelTimesApi.baseUrl,
  group: travelTimeRoutesGroup,
  functionName: "fetchTravelTimeById",
  endpoint: "/getTravelTimeAsJson?TravelTimeID={TravelTimeID}",
  inputSchema: travelTimeByIdInputSchema,
  outputSchema: travelTimeRouteSchema,
  sampleParams: { TravelTimeID: 1 },
  endpointDescription:
    "Returns a TravelTimeRoute object containing travel time data for a specified route ID.",
});

export const fetchTravelTimes = defineEndpoint({
  apiName: wsdotTravelTimesApi.name,
  baseUrl: wsdotTravelTimesApi.baseUrl,
  group: travelTimeRoutesGroup,
  functionName: "fetchTravelTimes",
  endpoint: "/getTravelTimesAsJson",
  inputSchema: travelTimesInputSchema,
  outputSchema: travelTimeRouteSchema.array(),
  sampleParams: {},
  endpointDescription:
    "Returns an array of TravelTimeRoute objects containing travel time data for all available routes.",
});

