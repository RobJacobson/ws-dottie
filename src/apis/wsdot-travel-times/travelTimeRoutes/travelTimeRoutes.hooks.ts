import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsdotTravelTimesApi } from "../apiDefinition";
import { travelTimeRoutesGroup } from "./travelTimeRoutes.endpoints";
import * as fetchFunctions from "./travelTimeRoutes.fetch";
import type {
  TravelTimeByIdInput,
  TravelTimesInput,
} from "./travelTimeRoutes.input";
import type { TravelTimeRoute } from "./travelTimeRoutes.output";

const hooks = createEndpointGroupHooks(
  wsdotTravelTimesApi,
  travelTimeRoutesGroup,
  fetchFunctions
);

export const useTravelTimeById: (
  params?: TravelTimeByIdInput,
  options?: QueryHookOptions<TravelTimeRoute>
) => UseQueryResult<TravelTimeRoute, Error> = hooks.useTravelTimeById;

export const useTravelTimes: (
  params?: TravelTimesInput,
  options?: QueryHookOptions<TravelTimeRoute[]>
) => UseQueryResult<TravelTimeRoute[], Error> = hooks.useTravelTimes;
