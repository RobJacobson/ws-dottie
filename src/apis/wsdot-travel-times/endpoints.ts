import type { ApiDefinition } from "@/shared/endpoints";
import { input, output } from "./schemas";

export const wsdotTravelTimesApi: ApiDefinition = {
  name: "wsdot-travel-times",
  baseUrl:
    "http://www.wsdot.wa.gov/traffic/api/traveltimes/traveltimesrest.svc",
  endpoints: [
    {
      function: "getTravelTime",
      endpoint: "/getTravelTimeAsJson?TravelTimeID={TravelTimeID}",
      inputSchema: input.getTravelTimeSchema,
      outputSchema: output.travelTimeRouteSchema,
      sampleParams: { TravelTimeID: 1 },
      cacheStrategy: "STATIC",
    },
    {
      function: "getTravelTimes",
      endpoint: "/getTravelTimesAsJson",
      inputSchema: input.getTravelTimesSchema,
      outputSchema: output.travelTimeRoutesListSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    },
  ],
};
