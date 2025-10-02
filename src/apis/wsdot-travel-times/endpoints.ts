import { createApiDefinition } from "../utils";
import { input, output } from "./schemas";

export const wsdotTravelTimesApi = createApiDefinition("wsdot-travel-times", [
  {
    function: "getTravelTime",
    endpoint:
      "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimeAsJson?TravelTimeID={TravelTimeID}",
    inputSchema: input.getTravelTimeSchema,
    outputSchema: output.travelTimeRouteSchema,
    sampleParams: { TravelTimeID: 1 },
    cacheStrategy: "STATIC",
  },
  {
    function: "getTravelTimes",
    endpoint:
      "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson",
    inputSchema: input.getTravelTimesSchema,
    outputSchema: output.travelTimeRoutesListSchema,
    sampleParams: {},
    cacheStrategy: "STATIC",
  },
]);
