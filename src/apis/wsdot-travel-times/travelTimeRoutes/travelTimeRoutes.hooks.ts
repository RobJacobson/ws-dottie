import type { UseQueryResult } from "@tanstack/react-query";
import { createHooks, type FetchFunctionParams, type QueryHookOptions } from "@/shared/factories";
import { wsdotTravelTimesApi } from "@/apis/wsdot-travel-times/apiDefinition";
import { travelTimeRoutesGroup } from "./travelTimeRoutes.endpoints";
import * as fetchFunctions from "./travelTimeRoutes.fetch";
import type {
  TravelTimeByIdInput,
  TravelTimesInput,
} from "./travelTimeRoutes.input";
import type { TravelTimeRoute } from "./travelTimeRoutes.output";

const hooks = createHooks(
  wsdotTravelTimesApi,
  travelTimeRoutesGroup,
  fetchFunctions
);

export const useTravelTimeById: (
  params?: FetchFunctionParams<TravelTimeByIdInput>,
  options?: QueryHookOptions<TravelTimeRoute>
) => UseQueryResult<TravelTimeRoute, Error> = hooks.useTravelTimeById;

export const useTravelTimes: (
  params?: FetchFunctionParams<TravelTimesInput>,
  options?: QueryHookOptions<TravelTimeRoute[]>
) => UseQueryResult<TravelTimeRoute[], Error> = hooks.useTravelTimes;
