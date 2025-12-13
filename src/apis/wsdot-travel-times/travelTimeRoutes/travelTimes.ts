import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotTravelTimesApiMeta } from "../apiMeta";
import {
  type TravelTimesInput,
  travelTimesInputSchema,
} from "./shared/travelTimeRoutes.input";
import {
  type TravelTimeRoute,
  travelTimeRouteSchema,
} from "./shared/travelTimeRoutes.output";

/**
 * Metadata for the fetchTravelTimes endpoint
 */
export const travelTimesMeta = {
  functionName: "fetchTravelTimes",
  endpoint: "/getTravelTimesAsJson",
  inputSchema: travelTimesInputSchema,
  outputSchema: travelTimeRouteSchema.array(),
  sampleParams: {},
  endpointDescription: "List travel time data for all available routes.",
  toolDescription: {
    purpose: "List travel time data for all available routes.",
    useWhen: [
      "route planning with current travel times",
      "comparing travel times across multiple routes",
      "finding available travel time routes for mapping",
    ],
    avoidWhen: ["you only need one route's data (prefer fetchTravelTimeById)"],
    inputsHighlights: "none",
    returns: "array — one item per travel time route",
    outputHighlights: [
      "Route identity: TravelTimeID, Name (display name), Description",
      "Travel times: CurrentTime (current minutes), AverageTime (historical average minutes)",
      "Distance: route length in miles from start to end",
      "Locations: StartPoint and EndPoint with coordinates, road names, mileposts",
      "Timing: TimeUpdated (UTC timestamp of last update)",
    ],
    chaining: [
      "fetchTravelTimes → extract TravelTimeID → call fetchTravelTimeById with { TravelTimeID: ... }",
    ],
  },
} satisfies EndpointMeta<TravelTimesInput, TravelTimeRoute[]>;

/**
 * Factory result for travel times
 */
const travelTimesFactory = createFetchAndHook<
  TravelTimesInput,
  TravelTimeRoute[]
>({
  api: wsdotTravelTimesApiMeta,
  endpoint: travelTimesMeta,
  getEndpointGroup: () =>
    require("./shared/travelTimeRoutes.endpoints").travelTimeRoutesGroup,
});

/**
 * Fetch function and React Query hook for retrieving travel time data for all available routes
 */
export const { fetch: fetchTravelTimes, hook: useTravelTimes } =
  travelTimesFactory;
