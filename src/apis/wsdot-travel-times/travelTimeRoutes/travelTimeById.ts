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
} satisfies EndpointMeta<TravelTimeByIdInput, TravelTimeRoute>;

/**
 * Fetch function for retrieving travel time data for a specific route by ID
 */
export const fetchTravelTimeById: FetchFactory<
  TravelTimeByIdInput,
  TravelTimeRoute
> = createFetchFunction({
  api: wsdotTravelTimesApiMeta,
  endpoint: travelTimeByIdMeta,
});

/**
 * React Query hook for retrieving travel time data for a specific route by ID
 */
export const useTravelTimeById: HookFactory<
  TravelTimeByIdInput,
  TravelTimeRoute
> = createHook({
  apiName: wsdotTravelTimesApiMeta.name,
  endpointName: travelTimeByIdMeta.functionName,
  fetchFn: fetchTravelTimeById,
  cacheStrategy: travelTimeRoutesGroup.cacheStrategy,
});
