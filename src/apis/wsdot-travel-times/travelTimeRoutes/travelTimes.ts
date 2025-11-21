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
