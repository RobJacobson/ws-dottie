import type { UseQueryResult } from "@tanstack/react-query";
import { wsdotTravelTimesApi } from "../api";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
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
export const fetchTravelTimes: (
  params?: FetchFunctionParams<TravelTimesInput>
) => Promise<TravelTimeRoute[]> = createFetchFunction(
  wsdotTravelTimesApi.api,
  travelTimeRoutesGroup,
  travelTimesMeta
);

/**
 * React Query hook for retrieving travel time data for all available routes
 */
export const useTravelTimes: (
  params?: FetchFunctionParams<TravelTimesInput>,
  options?: QueryHookOptions<TravelTimeRoute[]>
) => UseQueryResult<TravelTimeRoute[], Error> = createHook(
  wsdotTravelTimesApi.api,
  travelTimeRoutesGroup,
  travelTimesMeta
);
