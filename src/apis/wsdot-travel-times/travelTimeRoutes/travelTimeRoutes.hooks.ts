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

export const useTravelTimeById = hooks.useTravelTimeById as (
  params?: TravelTimeByIdInput,
  options?: QueryHookOptions<TravelTimeRoute>
) => UseQueryResult<TravelTimeRoute, Error>;

export const useTravelTimes = hooks.useTravelTimes as (
  params?: TravelTimesInput,
  options?: QueryHookOptions<TravelTimeRoute[]>
) => UseQueryResult<TravelTimeRoute[], Error>;
