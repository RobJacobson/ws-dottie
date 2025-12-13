import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotTravelTimesApiMeta } from "../apiMeta";
import {
  type TravelTimeByIdInput,
  travelTimeByIdInputSchema,
} from "./shared/travelTimeRoutes.input";
import {
  type TravelTimeRoute,
  travelTimeRouteSchema,
} from "./shared/travelTimeRoutes.output";

/**
 * Metadata for the fetchTravelTimeById endpoint
 */
export const travelTimeByIdMeta = {
  functionName: "fetchTravelTimeById",
  endpoint: "/getTravelTimeAsJson?TravelTimeID={TravelTimeID}",
  inputSchema: travelTimeByIdInputSchema,
  outputSchema: travelTimeRouteSchema,
  sampleParams: { TravelTimeID: 1 },
  endpointDescription: "Get travel time data for a specific route by ID.",
  toolDescription: {
    purpose: "Get travel time data for a specific route by ID.",
    useWhen: [
      "monitoring specific travel route",
      "getting detailed travel time for one route",
      "route-specific travel planning",
    ],
    avoidWhen: ["you need data for multiple routes (prefer fetchTravelTimes)"],
    inputs: [
      "TravelTimeID: numeric route identifier from fetchTravelTimes TravelTimeID field",
    ],
    returns: "object — travel time data for one specific route",
    outputHighlights: [
      "Route details: TravelTimeID, Name, Description of the travel route",
      "Current conditions: CurrentTime (real-time travel minutes), AverageTime (baseline)",
      "Route metrics: Distance (miles), start/end point coordinates and road information",
      "Location data: StartPoint and EndPoint with detailed roadway location info",
      "Data freshness: TimeUpdated (UTC timestamp of last measurement)",
    ],
    chaining: [
      "fetchTravelTimes → extract TravelTimeID → call fetchTravelTimeById with { TravelTimeID: ... }",
    ],
  },
} satisfies EndpointMeta<TravelTimeByIdInput, TravelTimeRoute>;

/**
 * Factory result for travel time by ID
 */
const travelTimeByIdFactory = createFetchAndHook<
  TravelTimeByIdInput,
  TravelTimeRoute
>({
  api: wsdotTravelTimesApiMeta,
  endpoint: travelTimeByIdMeta,
  getEndpointGroup: () =>
    require("./shared/travelTimeRoutes.endpoints").travelTimeRoutesGroup,
});

/**
 * Fetch function and React Query hook for retrieving travel time data for a specific route by ID
 */
export const { fetch: fetchTravelTimeById, hook: useTravelTimeById } =
  travelTimeByIdFactory;
