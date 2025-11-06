import { createEndpointGroupFetchFunctions } from "@/shared/utils/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/utils/fetchFunctionFactory";
import { wsdotTravelTimesApi } from "../apiDefinition";
import { travelTimeRoutesGroup } from "./travelTimeRoutes.endpoints";
import type {
  TravelTimeByIdInput,
  TravelTimesInput,
} from "./travelTimeRoutes.input";
import type { TravelTimeRoute } from "./travelTimeRoutes.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotTravelTimesApi,
  travelTimeRoutesGroup
);

export const fetchTravelTimeById = fetchFunctions.fetchTravelTimeById as (
  params?: FetchFunctionParams<TravelTimeByIdInput>
) => Promise<TravelTimeRoute>;

export const fetchTravelTimes = fetchFunctions.fetchTravelTimes as (
  params?: FetchFunctionParams<TravelTimesInput>
) => Promise<TravelTimeRoute[]>;
