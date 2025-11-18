import type { UseQueryResult } from "@tanstack/react-query";
import { apis } from "@/apis/shared/apis";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories/metaEndpointFactory";
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
export const fetchTravelTimeById: (
  params?: FetchFunctionParams<TravelTimeByIdInput>
) => Promise<TravelTimeRoute> = createFetchFunction(
  apis.wsdotTravelTimes,
  travelTimeRoutesGroup,
  travelTimeByIdMeta
);

/**
 * React Query hook for retrieving travel time data for a specific route by ID
 */
export const useTravelTimeById: (
  params?: FetchFunctionParams<TravelTimeByIdInput>,
  options?: QueryHookOptions<TravelTimeRoute>
) => UseQueryResult<TravelTimeRoute, Error> = createHook(
  apis.wsdotTravelTimes,
  travelTimeRoutesGroup,
  travelTimeByIdMeta
);
