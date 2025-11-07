import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsdotTollRatesApi } from "../apiDefinition";
import { tollTripRatesResource } from "./tollTripRates.endpoints";
import type {
  TollTripRatesInput,
  TripRatesByDateInput,
  TripRatesByVersionInput,
} from "./tollTripRates.input";
import type { TollTripsRates } from "./tollTripRates.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotTollRatesApi,
  tollTripRatesResource
);

export const fetchTollTripRates: (
  params?: FetchFunctionParams<TollTripRatesInput>
) => Promise<TollTripsRates> = fetchFunctions.fetchTollTripRates;

export const fetchTripRatesByDate: (
  params?: FetchFunctionParams<TripRatesByDateInput>
) => Promise<TollTripsRates[]> = fetchFunctions.fetchTripRatesByDate;

export const fetchTripRatesByVersion: (
  params?: FetchFunctionParams<TripRatesByVersionInput>
) => Promise<TollTripsRates> = fetchFunctions.fetchTripRatesByVersion;
