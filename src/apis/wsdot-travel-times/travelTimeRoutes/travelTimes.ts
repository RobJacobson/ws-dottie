import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsdotTravelTimesApiMeta } from "../apiMeta";
import { travelTimeRoutesGroup } from "./shared/travelTimeRoutes.endpoints";
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
 * Fetch function for retrieving travel time data for all available routes
 */
export const fetchTravelTimes: FetchFactory<
  TravelTimesInput,
  TravelTimeRoute[]
> = createFetchFunction({
  api: wsdotTravelTimesApiMeta,
  endpoint: travelTimesMeta,
});

/**
 * React Query hook for retrieving travel time data for all available routes
 */
export const useTravelTimes: HookFactory<TravelTimesInput, TravelTimeRoute[]> =
  createHook({
    apiName: wsdotTravelTimesApiMeta.name,
    endpointName: travelTimesMeta.functionName,
    fetchFn: fetchTravelTimes,
    cacheStrategy: travelTimeRoutesGroup.cacheStrategy,
  });
