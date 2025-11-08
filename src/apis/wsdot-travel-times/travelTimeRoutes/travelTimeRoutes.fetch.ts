import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
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

export const fetchTravelTimeById: (
  params?: FetchFunctionParams<TravelTimeByIdInput>
) => Promise<TravelTimeRoute> = fetchFunctions.fetchTravelTimeById;

export const fetchTravelTimes: (
  params?: FetchFunctionParams<TravelTimesInput>
) => Promise<TravelTimeRoute[]> = fetchFunctions.fetchTravelTimes;
