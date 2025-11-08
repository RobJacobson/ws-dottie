import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsdotTravelTimesApi } from "../apiDefinition";
import { travelTimeRoutesGroup } from "./travelTimeRoutes.endpoints";
import type {
  TravelTimeByIdInput,
  TravelTimesInput,
} from "./travelTimeRoutes.input";
import type { TravelTimeRoute } from "./travelTimeRoutes.output";

const fetchFunctions = createFetchFunctions(
  wsdotTravelTimesApi,
  travelTimeRoutesGroup
);

export const fetchTravelTimeById: (
  params?: FetchFunctionParams<TravelTimeByIdInput>
) => Promise<TravelTimeRoute> = fetchFunctions.fetchTravelTimeById;

export const fetchTravelTimes: (
  params?: FetchFunctionParams<TravelTimesInput>
) => Promise<TravelTimeRoute[]> = fetchFunctions.fetchTravelTimes;
