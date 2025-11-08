import { createFetchFunctions, type FetchFunctionParams } from "@/shared/factories";
import { wsdotTravelTimesApi } from "@/apis/wsdot-travel-times/apiDefinition";
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
