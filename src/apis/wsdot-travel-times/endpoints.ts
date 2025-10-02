import { createApiDefinition } from "../utils";
import {
  getTravelTimeInputSchema,
  getTravelTimesInputSchema,
} from "./original/inputSchemas.original";
import {
  travelTimeRouteSchema,
  travelTimeRoutesListSchema,
} from "./original/outputSchemas.original";

export const wsdotTravelTimesApi = createApiDefinition("wsdot-travel-times", [
  {
    function: "getTravelTime",
    endpoint:
      "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimeAsJson?TravelTimeID={TravelTimeID}",
    inputSchema: getTravelTimeInputSchema,
    outputSchema: travelTimeRouteSchema,
    sampleParams: { TravelTimeID: 1 },
    cacheStrategy: "STATIC",
  },
  {
    function: "getTravelTimes",
    endpoint:
      "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson",
    inputSchema: getTravelTimesInputSchema,
    outputSchema: travelTimeRoutesListSchema,
    sampleParams: {},
    cacheStrategy: "STATIC",
  },
]);
